import uuid

from django.db.models import QuerySet

import logging
from app.models import Conversation, Customer, Lead, LeadSource, LeadStatus
from app.services.ai_service import ai_service
from app.services.notification_service import notification_service

logger = logging.getLogger(__name__)

_ACTIVE_STATUSES = (LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.QUALIFIED)


class LeadService:
    def get_active_lead(self, conversation_id: uuid.UUID) -> Lead | None:
        return Lead.objects.filter(conversation_id=conversation_id, status__in=_ACTIVE_STATUSES).first()

    def create_lead_if_needed(
        self,
        conversation: Conversation,
        customer: Customer,
        conversation_history: str,
        interested_in: str,
    ) -> Lead:
        """Creates a new lead for this conversation, or returns the existing
        active one - a customer sending multiple interested messages should
        not create duplicate leads.
        """
        existing = self.get_active_lead(conversation.id)
        if existing is not None:
            logger.info(
                "Active lead %s already exists for conversation %s; skipping duplicate", existing.id, conversation.id
            )
            return existing

        summary = ai_service.summarize_conversation(conversation_history)

        lead = Lead.objects.create(
            customer=customer,
            conversation=conversation,
            interested_in=interested_in,
            summary=summary,
            status=LeadStatus.NEW,
            source=LeadSource.WHATSAPP_AI,
        )

        logger.info("Lead created: %s for customer %s", lead.id, customer.phone_number)
        notification_service.notify_new_lead(lead, customer)
        return lead

    def get_by_id(self, lead_id: uuid.UUID) -> Lead | None:
        return Lead.objects.select_related("customer").filter(id=lead_id).first()

    def list_leads(self, status: LeadStatus | None = None) -> QuerySet[Lead]:
        # Returns an unevaluated queryset (not list(...)) so the caller's
        # paginator can slice it into a single LIMIT/OFFSET query instead of
        # every lead ever created being pulled into memory on every request.
        qs = Lead.objects.select_related("customer").order_by("-created_at")
        if status is not None:
            qs = qs.filter(status=status)
        return qs

    def update_status(self, lead_id: uuid.UUID, status: LeadStatus) -> Lead | None:
        lead = Lead.objects.select_related("customer").filter(id=lead_id).first()
        if lead is None:
            return None
        lead.status = status
        lead.save()
        return lead


lead_service = LeadService()
