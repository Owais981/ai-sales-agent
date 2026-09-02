"""All API views, grouped by responsibility (mirrors the former FastAPI
routers under api/routes/*.py, now collected into one module per the DRF
project's minimal-structure convention).

Function-based views (@api_view) throughout, rather than APIView subclasses -
none of these share behavior via inheritance, so a plain decorated function
per route is less indirection for the same result.
"""

import logging
import re
import threading
import time
from collections import defaultdict

from django.conf import settings
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

from app.models import (
    Conversation,
    ConversationStatus,
    Lead,
    LeadStatus,
    User,
    create_access_token,
    verify_password,
)
from app.serializers import (
    ConversationDetailSerializer,
    ConversationListItemSerializer,
    CurrentUserSerializer,
    DashboardStatsSerializer,
    IngestSerializer,
    KnowledgeDocumentSerializer,
    LeadSerializer,
    LeadUpdateSerializer,
    LoginSerializer,
    MessageSerializer,
    ReindexSerializer,
    SendMessageSerializer,
    TokenSerializer,
)
from app.services.conversation_service import conversation_service
from app.services.knowledge_service import knowledge_service
from app.services.lead_service import lead_service
from app.services.push_service import push_service
from app.services.whatsapp_service import whatsapp_service

logger = logging.getLogger(__name__)

MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB - plenty for a text/JSON knowledge file

_SESSION_ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]{1,64}$")


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 500


def health(request):
    return JsonResponse({"status": "ok", "app": settings.APP_NAME, "environment": settings.ENVIRONMENT})


def custom_exception_handler(exc, context):
    """Reproduces the old FastAPI catch-all exception handler: known DRF
    exceptions still get their normal response, anything else becomes a
    generic 500 (never leaking internals to the client).
    """
    response = drf_exception_handler(exc, context)
    if response is not None:
        return response

    request = context.get("request")
    logger.exception(
        "Unhandled error on %s %s", getattr(request, "method", "?"), getattr(request, "path", "?")
    )
    return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ---- Auth ----
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    user = User.objects.filter(email=email).first()
    if user is None or not user.is_active or not verify_password(password, user.hashed_password):
        return Response({"detail": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    token = create_access_token(subject=user.email)
    return Response(TokenSerializer({"access_token": token, "token_type": "bearer"}).data)


@api_view(["GET"])
def me(request):
    user = request.user
    data = {"id": user.id, "email": user.email, "name": user.name, "is_admin": user.is_admin}
    return Response(CurrentUserSerializer(data).data)


# ---- Conversations ----
@api_view(["GET"])
def conversation_list(request):
    conversations = conversation_service.list_conversations()
    paginator = StandardPagination()
    page = paginator.paginate_queryset(conversations, request)
    return paginator.get_paginated_response(ConversationListItemSerializer(page, many=True).data)


@api_view(["GET"])
def conversation_detail(request, conversation_id):
    conversation = conversation_service.get_conversation(conversation_id)
    if conversation is None:
        return Response({"detail": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response(ConversationDetailSerializer(conversation).data)


@api_view(["POST"])
def conversation_takeover(request, conversation_id):
    conversation = conversation_service.get_conversation(conversation_id)
    if conversation is None:
        return Response({"detail": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
    conversation_service.takeover(conversation, request.user)
    conversation = conversation_service.get_conversation(conversation_id)
    return Response(ConversationDetailSerializer(conversation).data)


@api_view(["POST"])
def conversation_release(request, conversation_id):
    conversation = conversation_service.get_conversation(conversation_id)
    if conversation is None:
        return Response({"detail": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
    conversation_service.release_to_ai(conversation)
    conversation = conversation_service.get_conversation(conversation_id)
    return Response(ConversationDetailSerializer(conversation).data)


@api_view(["POST"])
def conversation_send_message(request, conversation_id):
    serializer = SendMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    conversation = conversation_service.get_conversation(conversation_id)
    if conversation is None:
        return Response({"detail": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)

    message = conversation_service.send_manager_message(conversation, serializer.validated_data["content"])
    return Response(MessageSerializer(message).data)


# ---- Dashboard ----
@api_view(["GET"])
def dashboard_stats(request):
    total_leads = Lead.objects.count()
    new_leads = Lead.objects.filter(status=LeadStatus.NEW).count()
    active_conversations = Conversation.objects.exclude(status=ConversationStatus.CLOSED).count()
    human_handovers = Conversation.objects.filter(
        status__in=[ConversationStatus.HUMAN_REQUESTED, ConversationStatus.HUMAN_ACTIVE]
    ).count()
    recent_leads = list(Lead.objects.select_related("customer").order_by("-created_at")[:5])

    data = {
        "total_leads": total_leads,
        "new_leads": new_leads,
        "active_conversations": active_conversations,
        "human_handovers": human_handovers,
        "recent_leads": recent_leads,
    }
    return Response(DashboardStatsSerializer(data).data)


# ---- Knowledge ----
@api_view(["GET"])
def knowledge_list(request):
    docs = knowledge_service.list_documents()
    out = []
    for doc in docs:
        data = KnowledgeDocumentSerializer(doc).data
        data["chunk_count"] = knowledge_service.chunk_count(doc.id)
        out.append(data)
    return Response(out)


@api_view(["POST"])
def knowledge_ingest(request):
    serializer = IngestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    url = serializer.validated_data["url"]

    doc = knowledge_service.get_or_create_document(url)
    threading.Thread(target=_ingest_url_in_background, args=(url,), daemon=True).start()
    return Response(KnowledgeDocumentSerializer(doc).data, status=status.HTTP_202_ACCEPTED)


@api_view(["POST"])
def knowledge_upload(request):
    file = request.FILES.get("file")
    if file is None or not file.name or not file.name.lower().endswith((".txt", ".json")):
        return Response({"detail": "Only .txt and .json files are supported"}, status=status.HTTP_400_BAD_REQUEST)

    raw_bytes = file.read()
    if len(raw_bytes) > MAX_UPLOAD_SIZE_BYTES:
        return Response({"detail": "File is too large (max 5 MB)"}, status=status.HTTP_400_BAD_REQUEST)
    if not raw_bytes:
        return Response({"detail": "File is empty"}, status=status.HTTP_400_BAD_REQUEST)

    # A pre-chunked knowledge base export can expand into several documents
    # (one per page) - create placeholder rows for all of them up front so
    # they're all visible immediately, before the background task does the
    # actual (potentially slow) embedding work.
    source_urls = knowledge_service.plan_file_source_urls(file.name, raw_bytes)
    docs = [knowledge_service.get_or_create_document(url) for url in source_urls]
    threading.Thread(target=_ingest_file_in_background, args=(file.name, raw_bytes), daemon=True).start()
    return Response(KnowledgeDocumentSerializer(docs, many=True).data, status=status.HTTP_202_ACCEPTED)


@api_view(["POST"])
def knowledge_reindex(request):
    serializer = ReindexSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    document_id = serializer.validated_data.get("document_id")

    if document_id is not None:
        threading.Thread(target=_reindex_one_in_background, args=(document_id,), daemon=True).start()
        return Response(
            {"status": "reindex_started", "document_id": str(document_id)}, status=status.HTTP_202_ACCEPTED
        )

    docs = knowledge_service.list_documents()
    for doc in docs:
        threading.Thread(target=_reindex_one_in_background, args=(doc.id,), daemon=True).start()
    return Response({"status": "reindex_started", "documents": len(docs)}, status=status.HTTP_202_ACCEPTED)


@api_view(["DELETE"])
def knowledge_delete(request, document_id):
    removed = knowledge_service.remove_document(document_id)
    if not removed:
        return Response({"detail": "Document not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response(status=status.HTTP_204_NO_CONTENT)


def _ingest_url_in_background(url: str) -> None:
    try:
        knowledge_service.ingest_url(url)
    except Exception:  # noqa: BLE001
        logger.exception("Background ingestion failed for %s", url)


def _ingest_file_in_background(filename: str, raw_bytes: bytes) -> None:
    try:
        knowledge_service.ingest_file(filename, raw_bytes)
    except Exception:  # noqa: BLE001
        logger.exception("Background file ingestion failed for %s", filename)


def _reindex_one_in_background(document_id) -> None:
    try:
        knowledge_service.reindex_document(document_id)
    except Exception:  # noqa: BLE001
        logger.exception("Background reindex failed for %s", document_id)


# ---- Leads ----
@api_view(["GET"])
def lead_list(request):
    status_param = request.query_params.get("status")
    status_filter = None
    if status_param is not None:
        try:
            status_filter = LeadStatus(status_param)
        except ValueError:
            return Response({"detail": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    leads = lead_service.list_leads(status_filter)
    paginator = StandardPagination()
    page = paginator.paginate_queryset(leads, request)
    return paginator.get_paginated_response(LeadSerializer(page, many=True).data)


@api_view(["GET", "PATCH"])
def lead_detail(request, lead_id):
    if request.method == "PATCH":
        serializer = LeadUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = lead_service.update_status(lead_id, serializer.validated_data["status"])
        if lead is None:
            return Response({"detail": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(LeadSerializer(lead).data)

    lead = lead_service.get_by_id(lead_id)
    if lead is None:
        return Response({"detail": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response(LeadSerializer(lead).data)


# ---- Test chat ----
# Lets a logged-in Sales Manager/admin converse with the AI agent directly
# from the dashboard, without needing a live WhatsApp number connected.
#
# Runs through the exact same pipeline a real WhatsApp message would
# (conversation_service.process_incoming_message: RAG retrieval, intent
# detection, lead creation, human-handover triggers) so it's a faithful test
# of the real agent, not a separate mock path. Test conversations use a
# synthetic "test-<session>" phone number, so they're clearly distinguishable
# from real customers in the Conversations/Leads dashboard views.
def _phone_for_session(session_id: str) -> str | None:
    if not _SESSION_ID_PATTERN.match(session_id):
        return None
    return f"test-{session_id}"


@api_view(["GET"])
def test_chat_get(request, session_id):
    phone = _phone_for_session(session_id)
    if phone is None:
        return Response({"detail": "Invalid session id"}, status=status.HTTP_400_BAD_REQUEST)

    conversation = conversation_service.find_active_conversation_by_phone(phone)
    if conversation is None:
        return Response(None)
    return Response(ConversationDetailSerializer(conversation).data)


@api_view(["POST"])
def test_chat_send_message(request, session_id):
    phone = _phone_for_session(session_id)
    if phone is None:
        return Response({"detail": "Invalid session id"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = SendMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    conversation = conversation_service.process_incoming_message(
        phone, serializer.validated_data["content"], f"Test Chat ({request.user.name})", None
    )
    refreshed = conversation_service.get_conversation(conversation.id)
    return Response(ConversationDetailSerializer(refreshed).data)


# ---- Website chat ----
# Public (unauthenticated) endpoint for the embeddable website chat widget.
#
# Reuses the exact same conversation_service pipeline as WhatsApp and the
# dashboard's Test Chat (RAG retrieval, intent detection, lead creation) -
# website visitors are identified by a synthetic "web-<session>" phone number
# so their conversations/leads are clearly distinguishable from real WhatsApp
# customers in the dashboard, the same pattern used for test-chat sessions.
#
# Unlike every other view in this app, this one is intentionally NOT behind
# dashboard auth - it's called directly from a public website by anonymous
# visitors. That makes it the one place in the API that needs its own abuse
# protection: session id validation, message length limits, and a simple
# per-session rate limit (protects both the LLM API budget and the database
# from being spammed by a script hitting this endpoint directly).
_WEB_SOURCE_PREFIX = "web-"
_MAX_MESSAGE_LENGTH = 2000

_RATE_LIMIT_WINDOW_SECONDS = 60
_RATE_LIMIT_MAX_MESSAGES = 8
_request_log: dict[str, list[float]] = defaultdict(list)


def _identifier_for_session(session_id: str) -> str | None:
    if not _SESSION_ID_PATTERN.match(session_id):
        return None
    return f"{_WEB_SOURCE_PREFIX}{session_id}"


def _rate_limit_exceeded(session_id: str) -> bool:
    now = time.monotonic()
    cutoff = now - _RATE_LIMIT_WINDOW_SECONDS
    timestamps = _request_log[session_id]
    while timestamps and timestamps[0] < cutoff:
        timestamps.pop(0)
    if len(timestamps) >= _RATE_LIMIT_MAX_MESSAGES:
        return True
    timestamps.append(now)
    return False


@api_view(["GET"])
@permission_classes([AllowAny])
def website_chat_get(request, session_id):
    identifier = _identifier_for_session(session_id)
    if identifier is None:
        return Response({"detail": "Invalid session id"}, status=status.HTTP_400_BAD_REQUEST)

    conversation = conversation_service.find_active_conversation_by_phone(identifier)
    if conversation is None:
        return Response(None)
    return Response(ConversationDetailSerializer(conversation).data)


@api_view(["POST"])
@permission_classes([AllowAny])
def website_chat_send_message(request, session_id):
    identifier = _identifier_for_session(session_id)
    if identifier is None:
        return Response({"detail": "Invalid session id"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = SendMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    content = serializer.validated_data["content"].strip()
    if not content:
        return Response({"detail": "Message cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
    if len(content) > _MAX_MESSAGE_LENGTH:
        return Response({"detail": "Message is too long"}, status=status.HTTP_400_BAD_REQUEST)

    if _rate_limit_exceeded(session_id):
        return Response(
            {"detail": "You're sending messages too quickly. Please wait a moment and try again."},
            status=status.HTTP_429_TOO_MANY_REQUESTS,
        )

    conversation = conversation_service.process_incoming_message(identifier, content, None, None)
    refreshed = conversation_service.get_conversation(conversation.id)
    return Response(ConversationDetailSerializer(refreshed).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def vapid_public_key(request):
    """Public so the widget can fetch the key without it being hardcoded into
    the embed script tag - one less required data-* attribute for site owners.
    """
    return Response({"public_key": settings.VAPID_PUBLIC_KEY})


@api_view(["POST"])
@permission_classes([AllowAny])
def push_subscribe(request, session_id):
    identifier = _identifier_for_session(session_id)
    if identifier is None:
        return Response({"detail": "Invalid session id"}, status=status.HTTP_400_BAD_REQUEST)

    endpoint = request.data.get("endpoint")
    keys = request.data.get("keys") or {}
    p256dh = keys.get("p256dh")
    auth = keys.get("auth")
    if not endpoint or not p256dh or not auth:
        return Response({"detail": "Invalid subscription payload"}, status=status.HTTP_400_BAD_REQUEST)

    customer = conversation_service.get_or_create_customer(identifier, None)
    push_service.save_subscription(customer, endpoint, p256dh, auth)
    return Response({"status": "subscribed"})


# ---- WhatsApp webhook ----
@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def whatsapp_webhook(request):
    if request.method == "GET":
        challenge = whatsapp_service.parse_verification_request(
            request.query_params.get("hub.mode"),
            request.query_params.get("hub.verify_token"),
            request.query_params.get("hub.challenge"),
        )
        if challenge is None:
            return Response({"detail": "Webhook verification failed"}, status=status.HTTP_403_FORBIDDEN)
        return HttpResponse(challenge, content_type="text/plain")

    raw_body = request.body
    signature = request.headers.get("X-Hub-Signature-256")
    if not whatsapp_service.verify_webhook_signature(raw_body, signature):
        return Response({"detail": "Invalid webhook signature"}, status=status.HTTP_403_FORBIDDEN)

    payload = request.data
    messages = whatsapp_service.extract_inbound_messages(payload)

    for msg in messages:
        threading.Thread(
            target=_process_message_in_background,
            args=(msg["from"], msg["text"], msg.get("name"), msg.get("wa_message_id")),
            daemon=True,
        ).start()

    # Acknowledge immediately (FR2: do not block the webhook) - actual AI
    # processing/reply happens in the background thread above.
    return Response({"status": "received"})


def _process_message_in_background(phone_number: str, text: str, name: str | None, wa_message_id: str | None) -> None:
    try:
        conversation_service.process_incoming_message(phone_number, text, name, wa_message_id)
    except IntegrityError:
        # external_message_id is unique - this indicates Meta re-delivered
        # a webhook event we already processed. Safe to ignore.
        logger.info("Duplicate webhook event for message %s ignored", wa_message_id)
    except Exception:  # noqa: BLE001
        logger.exception("Failed to process inbound WhatsApp message from %s", phone_number)
