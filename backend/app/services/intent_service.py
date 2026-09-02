"""Classifies customer messages into a sales-relevant intent.

Uses the LLM (bilingual English/Urdu/Roman Urdu aware) as the primary
classifier, with a lightweight keyword fallback for HUMAN_REQUEST and
BUYING_INTENT so the system still degrades sensibly if the LLM call fails
or is not configured.
"""

import json
import re

from django.conf import settings
from google.genai import types

import logging
from app.models import IntentType
from app.services.ai_client import get_genai_client

logger = logging.getLogger(__name__)

_HUMAN_REQUEST_PATTERNS = [
    r"\btalk to (a |an )?(human|agent|person|someone|sales)\b",
    r"\bspeak (to|with) (a |an )?(human|agent|person|sales)\b",
    r"\bcustomer (support|service)\b",
    r"\bbandy?a\b",  # roman urdu filler guard, harmless if unmatched
    r"\binsan se bat\b",
    r"\breal (person|agent)\b",
]

_BUYING_INTENT_PATTERNS = [
    r"\bi want (this|it|to buy)\b",
    r"\bhow (do|can) i (buy|proceed|order|purchase)\b",
    r"\bquotation\b",
    r"\bplace an order\b",
    r"\bsign ?up\b",
    r"\bmujhe (ye|yeh) .*chahiye\b",
    r"\bmujhe .*leni hai\b",
    r"\bkaise .*proceed\b",
    r"\bkaise le sakta\b",
]

_PRICING_PATTERNS = [r"\bprice\b", r"\bcost\b", r"\bqeemat\b", r"\bkitni hai\b", r"\brate\b", r"\bcharges?\b"]
_AVAILABILITY_PATTERNS = [r"\bavailable\b", r"\bavailability\b", r"\bstock\b", r"\bmojood\b"]

_INTENT_SYSTEM_PROMPT = """You are an intent classifier for a WhatsApp sales assistant.
Classify the customer's latest message (which may be in English, Urdu, or Roman Urdu) into
exactly one of these intents:

- GENERAL_QUESTION: general chit-chat or unrelated question
- PRODUCT_INFORMATION: asking about services/products/features/how something works
- PRICING_QUERY: asking about price/cost/rates
- AVAILABILITY_QUERY: asking if something is available/in stock/when
- BUYING_INTENT: clear signal they want to purchase/proceed/order/get a quotation/move forward
- HUMAN_REQUEST: explicitly asking to talk to a human/agent/sales person
- UNKNOWN: cannot be determined

Consider the recent conversation context too, not just the last message in isolation.
Respond with ONLY a JSON object: {"intent": "<ONE_OF_THE_ABOVE>", "confidence": <0.0-1.0>}
"""


def _keyword_fallback(message: str) -> IntentType:
    text = message.lower()
    for pattern in _HUMAN_REQUEST_PATTERNS:
        if re.search(pattern, text):
            return IntentType.HUMAN_REQUEST
    for pattern in _BUYING_INTENT_PATTERNS:
        if re.search(pattern, text):
            return IntentType.BUYING_INTENT
    for pattern in _PRICING_PATTERNS:
        if re.search(pattern, text):
            return IntentType.PRICING_QUERY
    for pattern in _AVAILABILITY_PATTERNS:
        if re.search(pattern, text):
            return IntentType.AVAILABILITY_QUERY
    return IntentType.UNKNOWN


class IntentService:
    def detect_intent(self, message: str, conversation_history: str = "") -> IntentType:
        keyword_hit = _keyword_fallback(message)

        client = get_genai_client()
        if client is None:
            return keyword_hit

        prompt = f"Recent conversation:\n{conversation_history}\n\nLatest customer message:\n{message}"
        try:
            response = client.models.generate_content(
                model=settings.GEMINI_CHAT_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=_INTENT_SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    temperature=0.0,
                    # Runs on the customer's critical path (in parallel with
                    # the reply) - a single-label classification doesn't
                    # need extended reasoning, and thinking added seconds.
                    thinking_config=types.ThinkingConfig(thinking_budget=0),
                ),
            )
            data = json.loads(response.text)
            intent_str = data.get("intent", "UNKNOWN")
            return IntentType(intent_str)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Intent classification via LLM failed (%s); falling back to keyword match", exc)
            return keyword_hit

    @staticmethod
    def is_lead_worthy(intent: IntentType) -> bool:
        # Only genuine interest signals create a lead - a customer just
        # asking "what services do you offer" (PRODUCT_INFORMATION) or
        # checking stock (AVAILABILITY_QUERY) is normal browsing, not a
        # sales-ready lead, even across a long chat. Every message is still
        # saved to the conversation regardless of intent (see
        # ConversationService.save_message) - this only gates the separate
        # Lead record shown to the sales manager.
        return intent in (
            IntentType.BUYING_INTENT,
            IntentType.HUMAN_REQUEST,
            IntentType.PRICING_QUERY,
        )

    @staticmethod
    def wants_urgent_handover(intent: IntentType) -> bool:
        """Narrower than is_lead_worthy - only these should interrupt the
        chat with a "sales team will continue this" notice and flag the
        conversation as needing a human right now. A pricing/info question
        still creates a lead (see is_lead_worthy) but the AI keeps chatting
        normally instead of pre-announcing a handover nobody asked for.
        """
        return intent in (IntentType.BUYING_INTENT, IntentType.HUMAN_REQUEST)


intent_service = IntentService()
