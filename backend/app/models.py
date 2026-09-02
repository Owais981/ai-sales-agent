import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from django.conf import settings
from django.db import models
from jose import JWTError, jwt
from passlib.context import CryptContext
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return _pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, extra_claims: dict[str, Any] | None = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode: dict[str, Any] = {"sub": subject, "exp": expire}
    if extra_claims:
        to_encode.update(extra_claims)
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        return None


class ConversationStatus(models.TextChoices):
    AI_ACTIVE = "AI_ACTIVE"
    HUMAN_REQUESTED = "HUMAN_REQUESTED"
    HUMAN_ACTIVE = "HUMAN_ACTIVE"
    CLOSED = "CLOSED"


class SenderType(models.TextChoices):
    CUSTOMER = "CUSTOMER"
    AI = "AI"
    SALES_MANAGER = "SALES_MANAGER"
    SYSTEM = "SYSTEM"


class MessageDirection(models.TextChoices):
    INBOUND = "INBOUND"
    OUTBOUND = "OUTBOUND"


class LeadStatus(models.TextChoices):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    CONVERTED = "CONVERTED"
    LOST = "LOST"


class LeadSource(models.TextChoices):
    WHATSAPP_AI = "WHATSAPP_AI"
    MANUAL = "MANUAL"


class KnowledgeDocumentStatus(models.TextChoices):
    PENDING = "PENDING"
    INDEXED = "INDEXED"
    FAILED = "FAILED"
    STALE = "STALE"


class IntentType(models.TextChoices):
    GENERAL_QUESTION = "GENERAL_QUESTION"
    PRODUCT_INFORMATION = "PRODUCT_INFORMATION"
    PRICING_QUERY = "PRICING_QUERY"
    AVAILABILITY_QUERY = "AVAILABILITY_QUERY"
    BUYING_INTENT = "BUYING_INTENT"
    HUMAN_REQUEST = "HUMAN_REQUEST"
    UNKNOWN = "UNKNOWN"


class TimestampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(TimestampedModel):
    """Dashboard user (Sales Manager / Admin)."""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    hashed_password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # This isn't a Django auth.User (there's no session/permission system here -
    # just the custom JWT scheme in JWTAuthentication below), but DRF's
    # permission classes (e.g. IsAuthenticated) check request.user.is_authenticated,
    # so a resolved user must always report True here for those checks to work.
    is_authenticated = True
    is_anonymous = False

    class Meta:
        db_table = "users"


class JWTAuthentication(BaseAuthentication):
    """Reads the `Authorization: Bearer <token>` header and resolves it to a
    User - the same JWT scheme the FastAPI version used (see the former
    api/deps.py::get_current_user). Lives here rather than in views.py so that
    settings.REST_FRAMEWORK can point at it without a circular import (views.py
    imports rest_framework.views, which eagerly resolves that setting the
    moment it's first imported anywhere in the process).
    """

    keyword = "Bearer"

    def authenticate(self, request):
        header = request.META.get("HTTP_AUTHORIZATION", "")
        if not header:
            return None

        parts = header.split()
        if len(parts) != 2 or parts[0] != self.keyword:
            return None
        token = parts[1]

        credentials_error = AuthenticationFailed("Could not validate credentials")

        payload = decode_access_token(token)
        if payload is None or "sub" not in payload:
            raise credentials_error

        try:
            user = User.objects.get(email=payload["sub"])
        except User.DoesNotExist:
            raise credentials_error from None

        if not user.is_active:
            raise credentials_error

        return (user, None)

    def authenticate_header(self, request):
        return self.keyword


class Customer(TimestampedModel):
    name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=32, unique=True)
    # Contact details captured from message text (website/test chat sessions
    # use a synthetic phone_number, not a real one) - purely informational,
    # for a sales manager to follow up manually. Never used for routing.
    email = models.EmailField(max_length=255, null=True, blank=True)
    captured_phone = models.CharField(max_length=32, null=True, blank=True)

    class Meta:
        db_table = "customers"


class PushSubscription(TimestampedModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="push_subscriptions")
    endpoint = models.URLField(max_length=1000, unique=True)
    p256dh = models.CharField(max_length=255)
    auth = models.CharField(max_length=255)

    class Meta:
        db_table = "push_subscriptions"


class Conversation(TimestampedModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="conversations")
    status = models.CharField(
        max_length=32, choices=ConversationStatus.choices, default=ConversationStatus.AI_ACTIVE, db_index=True
    )
    assigned_sales_manager = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="+"
    )
    started_at = models.DateTimeField(auto_now_add=True)
    last_message_at = models.DateTimeField(auto_now_add=True)
    last_message_preview = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table = "conversations"


class Message(TimestampedModel):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender_type = models.CharField(max_length=32, choices=SenderType.choices)
    content = models.TextField()
    direction = models.CharField(max_length=16, choices=MessageDirection.choices)
    external_message_id = models.CharField(max_length=128, unique=True, null=True, blank=True)

    class Meta:
        db_table = "messages"
        ordering = ["created_at"]


class Lead(TimestampedModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="leads")
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="leads")
    interested_in = models.CharField(max_length=500)
    summary = models.TextField()
    status = models.CharField(max_length=32, choices=LeadStatus.choices, default=LeadStatus.NEW, db_index=True)
    source = models.CharField(max_length=32, choices=LeadSource.choices, default=LeadSource.WHATSAPP_AI)

    class Meta:
        db_table = "leads"


class KnowledgeDocument(TimestampedModel):
    source_url = models.CharField(max_length=1000, unique=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    content = models.TextField(default="", blank=True)
    content_hash = models.CharField(max_length=64, null=True, blank=True)
    status = models.CharField(
        max_length=32, choices=KnowledgeDocumentStatus.choices, default=KnowledgeDocumentStatus.PENDING, db_index=True
    )
    last_indexed_at = models.CharField(max_length=64, null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "knowledge_documents"


class KnowledgeChunk(TimestampedModel):
    document = models.ForeignKey(KnowledgeDocument, on_delete=models.CASCADE, related_name="chunks")
    content = models.TextField()
    chunk_index = models.IntegerField(default=0)
    # Stored as a plain JSON float array (rather than a native pgvector column) so the
    # same schema works on Postgres in production and SQLite in tests, with cosine
    # similarity computed in application code by rag_service. See services/rag_service.py.
    embedding = models.JSONField(null=True, blank=True)
    chunk_metadata = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "knowledge_chunks"
