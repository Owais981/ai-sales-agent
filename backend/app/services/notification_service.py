"""Notifies the Sales Manager when a new lead is created.

Channel is selected via NOTIFICATION_CHANNEL (log | whatsapp | email) so the
delivery mechanism can grow later (e.g. dashboard push) without touching
callers.
"""

import smtplib
from email.message import EmailMessage

from django.conf import settings

import logging
from app.models import Customer, Lead
from app.services.whatsapp_service import whatsapp_service

logger = logging.getLogger(__name__)


class NotificationService:
    def notify_new_lead(self, lead: Lead, customer: Customer) -> None:
        message = (
            f"New Lead: {customer.name or 'Unknown'} ({customer.phone_number})\n"
            f"Interested in: {lead.interested_in}\n"
            f"Status: {lead.status}\n"
            f"Summary: {lead.summary}\n"
            f"Conversation: {lead.conversation_id}"
        )

        channel = settings.NOTIFICATION_CHANNEL
        try:
            if channel == "whatsapp" and settings.SALES_MANAGER_WHATSAPP_NUMBER:
                whatsapp_service.send_text_message(settings.SALES_MANAGER_WHATSAPP_NUMBER, message)
            elif channel == "email" and settings.SALES_MANAGER_EMAIL:
                self._send_email(message)
            else:
                logger.info("SALES MANAGER NOTIFICATION:\n%s", message)
        except Exception as exc:  # noqa: BLE001
            # Notification failure must never break the customer-facing flow -
            # the lead already exists and is visible in the dashboard regardless.
            logger.error("Failed to notify sales manager for lead %s: %s", lead.id, exc)

    def _send_email(self, body: str) -> None:
        if not settings.SALES_MANAGER_EMAIL:
            return
        msg = EmailMessage()
        msg["Subject"] = "New Sales Lead"
        msg["From"] = "noreply@ai-sales-agent.local"
        msg["To"] = settings.SALES_MANAGER_EMAIL
        msg.set_content(body)
        with smtplib.SMTP("localhost") as smtp:
            smtp.send_message(msg)


notification_service = NotificationService()
