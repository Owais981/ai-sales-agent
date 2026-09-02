"""Abstraction over the official WhatsApp Business Cloud API.

All outbound/inbound WhatsApp wire-format details are isolated here so the
rest of the application only deals with plain (phone_number, text) pairs.
"""

import hashlib
import hmac
from typing import Any

import httpx
from django.conf import settings
from tenacity import retry, stop_after_attempt, wait_exponential

import logging

logger = logging.getLogger(__name__)


class WhatsAppService:
    def __init__(self) -> None:
        self.access_token = settings.WHATSAPP_ACCESS_TOKEN
        self.phone_number_id = settings.WHATSAPP_PHONE_NUMBER_ID
        self.api_version = settings.WHATSAPP_API_VERSION
        self.app_secret = settings.WHATSAPP_APP_SECRET
        self.base_url = f"https://graph.facebook.com/{self.api_version}/{self.phone_number_id}"

    @property
    def is_configured(self) -> bool:
        return bool(self.access_token and self.phone_number_id)

    def verify_webhook_signature(self, payload_body: bytes, signature_header: str | None) -> bool:
        """Verify X-Hub-Signature-256 to ensure the webhook call really came from Meta."""
        if not self.app_secret:
            # No app secret configured (e.g. local dev without a real WhatsApp app) -
            # skip signature verification but log loudly so it's visible in prod checks.
            logger.warning("WHATSAPP_APP_SECRET not set; skipping webhook signature verification")
            return True
        if not signature_header or not signature_header.startswith("sha256="):
            return False
        expected = hmac.new(self.app_secret.encode(), payload_body, hashlib.sha256).hexdigest()
        provided = signature_header.removeprefix("sha256=")
        return hmac.compare_digest(expected, provided)

    @staticmethod
    def parse_verification_request(mode: str | None, token: str | None, challenge: str | None) -> str | None:
        if mode == "subscribe" and token == settings.WHATSAPP_VERIFY_TOKEN and challenge:
            return challenge
        return None

    @staticmethod
    def extract_inbound_messages(payload: dict[str, Any]) -> list[dict[str, Any]]:
        """Flatten a WhatsApp webhook payload into a list of simple inbound message dicts."""
        messages: list[dict[str, Any]] = []
        for entry in payload.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                contacts = {c["wa_id"]: c.get("profile", {}).get("name") for c in value.get("contacts", [])}
                for msg in value.get("messages", []):
                    if msg.get("type") != "text":
                        continue
                    from_number = msg.get("from")
                    messages.append(
                        {
                            "wa_message_id": msg.get("id"),
                            "from": from_number,
                            "name": contacts.get(from_number),
                            "text": msg.get("text", {}).get("body", ""),
                            "timestamp": msg.get("timestamp"),
                        }
                    )
        return messages

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=8))
    def send_text_message(self, to_phone_number: str, text: str) -> dict[str, Any] | None:
        if not self.is_configured:
            logger.info("WhatsApp not configured (dev mode) - would send to %s: %s", to_phone_number, text)
            return None

        url = f"{self.base_url}/messages"
        headers = {"Authorization": f"Bearer {self.access_token}", "Content-Type": "application/json"}
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone_number,
            "type": "text",
            "text": {"body": text},
        }
        with httpx.Client(timeout=15) as client:
            response = client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json()


whatsapp_service = WhatsAppService()
