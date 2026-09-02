import logging
import uuid
from concurrent.futures import ThreadPoolExecutor

from django.conf import settings
from django.db.models import QuerySet
from django.utils import timezone

from app.models import (
    Conversation,
    ConversationStatus,
    Customer,
    IntentType,
    Message,
    MessageDirection,
    SenderType,
    User,
)
from app.services.ai_service import ai_service
from app.services.contact_extraction_service import contact_extraction_service
from app.services.intent_service import intent_service
from app.services.lead_service import lead_service
from app.services.push_service import push_service
from app.services.rag_service import rag_service
from app.services.whatsapp_service import whatsapp_service

logger = logging.getLogger(__name__)

_HANDOVER_NOTICE = (
    "Thanks! I've shared your details with our sales team and they'll continue this "
    "conversation with you shortly."
)

_CONTACT_REQUEST_LINE = (
    "By the way, could you share your name and a WhatsApp number or email? That way "
    "our team can reach you directly if you're not online when they reply."
)

_CLOSED_LIKE_STATUSES = (ConversationStatus.CLOSED,)

# Website chat and dashboard test chat use synthetic phone_number identifiers
# ("web-<session>" / "test-<session>", see views.py) rather than real WhatsApp
# numbers - a manager's reply to these must not be sent through the WhatsApp API.
_SYNTHETIC_PHONE_PREFIXES = ("web-", "test-")


class ConversationService:
    def get_or_create_customer(self, phone_number: str, name: str | None) -> Customer:
        customer = Customer.objects.filter(phone_number=phone_number).first()
        if customer is None:
            customer = Customer.objects.create(phone_number=phone_number, name=name)
        elif name and not customer.name:
            customer.name = name
            customer.save()
        return customer

    def get_or_create_active_conversation(self, customer: Customer) -> Conversation:
        conversation = (
            Conversation.objects.select_related("customer")
            .filter(customer=customer)
            .exclude(status__in=_CLOSED_LIKE_STATUSES)
            .order_by("-last_message_at")
            .first()
        )
        if conversation is None:
            conversation = Conversation.objects.create(customer=customer, status=ConversationStatus.AI_ACTIVE)
        return conversation

    def get_conversation(self, conversation_id: uuid.UUID) -> Conversation | None:
        return (
            Conversation.objects.select_related("customer")
            .prefetch_related("messages")
            .filter(id=conversation_id)
            .first()
        )

    def find_active_conversation_by_phone(self, phone_number: str) -> Conversation | None:
        """Read-only lookup (unlike get_or_create_active_conversation, never
        creates a customer/conversation) - used by the dashboard's test chat
        to check for existing history without generating a phantom customer
        just by loading the page.
        """
        customer = Customer.objects.filter(phone_number=phone_number).first()
        if customer is None:
            return None

        return (
            Conversation.objects.select_related("customer")
            .prefetch_related("messages")
            .filter(customer=customer)
            .exclude(status__in=_CLOSED_LIKE_STATUSES)
            .order_by("-last_message_at")
            .first()
        )

    def list_conversations(self) -> QuerySet[Conversation]:
        # Unevaluated queryset - see lead_service.list_leads for why.
        return Conversation.objects.select_related("customer").order_by("-last_message_at")

    def save_message(
        self,
        conversation: Conversation,
        sender_type: str,
        content: str,
        direction: str,
        external_message_id: str | None = None,
    ) -> Message:
        message = Message.objects.create(
            conversation=conversation,
            sender_type=sender_type,
            content=content,
            direction=direction,
            external_message_id=external_message_id,
        )
        conversation.last_message_at = timezone.now()
        conversation.last_message_preview = content[:500]
        conversation.save()
        return message

    def build_history_text(self, conversation: Conversation, limit: int | None = None) -> str:
        limit = limit or settings.CONVERSATION_HISTORY_LIMIT
        messages = list(Message.objects.filter(conversation=conversation).order_by("-created_at")[:limit])
        messages.reverse()
        lines = [f"{m.sender_type}: {m.content}" for m in messages]
        return "\n".join(lines)

    def takeover(self, conversation: Conversation, manager: User) -> Conversation:
        conversation.status = ConversationStatus.HUMAN_ACTIVE
        conversation.assigned_sales_manager = manager
        conversation.save()
        logger.info("Conversation %s taken over by %s", conversation.id, manager.email)
        return conversation

    def release_to_ai(self, conversation: Conversation) -> Conversation:
        conversation.status = ConversationStatus.AI_ACTIVE
        conversation.assigned_sales_manager = None
        conversation.save()
        logger.info("Conversation %s released back to AI", conversation.id)
        return conversation

    def send_manager_message(self, conversation: Conversation, content: str) -> Message:
        message = self.save_message(conversation, SenderType.SALES_MANAGER, content, MessageDirection.OUTBOUND)
        phone = conversation.customer.phone_number
        if not phone.startswith(_SYNTHETIC_PHONE_PREFIXES):
            whatsapp_service.send_text_message(phone, content)
        else:
            # Website/test chat has no real phone number to deliver to - if
            # the visitor granted notification permission, reach them there
            # instead (they're also polled live if the widget is still open).
            push_service.notify_customer(conversation.customer, title="New reply", body=content[:120])
        return message

    def process_incoming_message(
        self,
        phone_number: str,
        text: str,
        customer_name: str | None,
        external_message_id: str | None,
    ) -> Conversation:
        """Core FR2/FR6/FR7/FR9 pipeline: identify -> save -> (maybe AI reply) ->
        detect intent -> maybe create lead + hand over to a human.
        """
        customer = self.get_or_create_customer(phone_number, customer_name)
        conversation = self.get_or_create_active_conversation(customer)

        self.save_message(conversation, SenderType.CUSTOMER, text, MessageDirection.INBOUND, external_message_id)
        self._capture_contact_details(customer, text)

        if conversation.status == ConversationStatus.HUMAN_ACTIVE:
            # A human has actually taken over from the CRM - AI stays silent (FR9).
            # HUMAN_REQUESTED (a lead was flagged but no one has taken over yet)
            # deliberately does NOT silence the AI - otherwise the customer gets
            # left hanging in silence whenever no manager is watching the CRM in
            # real time. The AI keeps the conversation going normally until a
            # manager explicitly clicks "Take Over".
            logger.info("Conversation %s is human-owned; AI auto-reply skipped", conversation.id)
            return conversation

        history_text = self.build_history_text(conversation)

        retrieved = rag_service.retrieve(text)
        context = rag_service.format_context(retrieved)

        # Reply generation and intent detection are two independent Gemini
        # calls that don't depend on each other's result - run them on
        # separate threads rather than back-to-back, since each one adds
        # real, noticeable latency to the customer's wait time (FR2/
        # performance: reply within a few seconds). Threads (not asyncio,
        # since Django views here are sync) still give real overlap because
        # both calls are I/O-bound (waiting on the network), which releases
        # the GIL.
        with ThreadPoolExecutor(max_workers=2) as executor:
            reply_future = executor.submit(ai_service.generate_reply, text, context, history_text)
            intent_future = executor.submit(intent_service.detect_intent, text, history_text)
            reply_text = reply_future.result()
            intent = intent_future.result()
        logger.info("Intent detected for conversation %s: %s", conversation.id, intent)

        # Whether this message is about to create a brand-new lead (vs. an
        # existing one already flagged earlier in this conversation) - only
        # ask for contact details once per conversation, not on every
        # lead-worthy message, and only if we don't already have a way to
        # reach them.
        is_new_lead = intent_service.is_lead_worthy(intent) and lead_service.get_active_lead(conversation.id) is None
        has_contact_on_file = bool(customer.email or customer.captured_phone)

        if intent_service.wants_urgent_handover(intent):
            reply_text = f"{reply_text}\n\n{_HANDOVER_NOTICE}"
        elif is_new_lead and not has_contact_on_file:
            # No live handover is happening yet, and there's currently no way
            # to reach this customer if they leave the site before a human
            # gets to them - ask now, while they're still here.
            reply_text = f"{reply_text}\n\n{_CONTACT_REQUEST_LINE}"

        if not phone_number.startswith(_SYNTHETIC_PHONE_PREFIXES):
            whatsapp_service.send_text_message(phone_number, reply_text)
        self.save_message(conversation, SenderType.AI, reply_text, MessageDirection.OUTBOUND)

        if intent_service.is_lead_worthy(intent):
            interested_in = self._infer_interest_label(intent, text)
            full_history = self.build_history_text(conversation)
            lead_service.create_lead_if_needed(conversation, customer, full_history, interested_in)
            if intent_service.wants_urgent_handover(intent):
                conversation.status = ConversationStatus.HUMAN_REQUESTED
                conversation.save()

        return conversation

    @staticmethod
    def _capture_contact_details(customer: Customer, text: str) -> None:
        """Only fills in name/email/captured_phone the first time they're
        seen - a later, possibly throwaway-looking message shouldn't clobber
        a genuine value already on file.
        """
        name = contact_extraction_service.extract_name(text)
        email = contact_extraction_service.extract_email(text)
        phone = contact_extraction_service.extract_phone(text)
        changed = False
        if name and not customer.name:
            customer.name = name
            changed = True
        if email and not customer.email:
            customer.email = email
            changed = True
        if phone and not customer.captured_phone:
            customer.captured_phone = phone
            changed = True
        if changed:
            customer.save()

    @staticmethod
    def _infer_interest_label(intent: IntentType, message: str) -> str:
        if intent == IntentType.HUMAN_REQUEST:
            return "Requested to speak with sales"
        snippet = message.strip()
        return snippet[:200] if snippet else "General interest"


conversation_service = ConversationService()
