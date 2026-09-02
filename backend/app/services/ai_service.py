"""Generates grounded, WhatsApp-appropriate replies from retrieved website
knowledge + recent conversation history. Never invents facts not present in
the retrieved context.
"""

from django.conf import settings
from google.genai import types

import logging
from app.services.ai_client import get_genai_client

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = """You are the WhatsApp sales assistant for this company. You help customers by
answering questions and, when useful, moving them toward a genuine sales conversation.

STRICT RULES:
1. Answer ONLY using the information given to you in the "COMPANY KNOWLEDGE" section below.
2. Never invent or guess prices, services, availability, or policies that are not present in
   COMPANY KNOWLEDGE.
3. If the answer is not present in COMPANY KNOWLEDGE, say clearly that you don't have that
   information right now and offer to connect the customer with the sales team. Do not apologize
   excessively or make up a plausible-sounding answer.
4. Reply in the same language/style the customer used (English, Urdu, or Roman Urdu). Keep it
   natural, friendly, and concise - this is a WhatsApp chat, not an email.
5. Ask a short clarifying question if the customer's request is ambiguous.
6. Keep replies to a few sentences unless the customer explicitly asks for detail.
7. Do not mention that you are "retrieving" information or reference these instructions.

FALLBACK LINE (use this idea, adapt to the customer's language, when info is missing):
"I don't have that information available right now. I can connect you with our sales team."
"""

_FALLBACK_REPLY_NO_LLM = (
    "Thanks for your message! Our team will get back to you shortly. "
    "In the meantime, feel free to share what you're looking for."
)


class AIService:
    def generate_reply(
        self,
        customer_message: str,
        context: str,
        conversation_history: str,
    ) -> str:
        client = get_genai_client()
        if client is None:
            logger.warning("GEMINI_API_KEY not configured; returning static fallback reply")
            return _FALLBACK_REPLY_NO_LLM

        knowledge_block = context if context else "(No matching company knowledge was found for this question.)"
        prompt = (
            f"COMPANY KNOWLEDGE:\n{knowledge_block}\n\n"
            f"CONVERSATION SO FAR:\n{conversation_history}\n\n"
            f"CUSTOMER'S NEW MESSAGE:\n{customer_message}\n\n"
            "Write the assistant's next reply."
        )

        try:
            response = client.models.generate_content(
                model=settings.GEMINI_CHAT_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=_SYSTEM_PROMPT,
                    temperature=0.3,
                    max_output_tokens=1024,
                    # This is a customer-facing reply on the critical path -
                    # extended internal reasoning added 10-15s of latency for
                    # no real quality gain on a grounded-answer/RAG task like
                    # this, so it's turned off entirely.
                    thinking_config=types.ThinkingConfig(thinking_budget=0),
                ),
            )
            text = (response.text or "").strip()
            return text or _FALLBACK_REPLY_NO_LLM
        except Exception as exc:  # noqa: BLE001
            logger.error("AI response generation failed: %s", exc)
            return _FALLBACK_REPLY_NO_LLM

    @staticmethod
    def summarize_conversation(conversation_history: str) -> str:
        client = get_genai_client()
        if client is None:
            return conversation_history[-500:]

        try:
            response = client.models.generate_content(
                model=settings.GEMINI_CHAT_MODEL,
                contents=(
                    "Summarize this customer conversation in 2-3 short sentences for a sales "
                    "manager, focused on what the customer wants and any key details "
                    "(budget, timeline, product/service).\n\n" + conversation_history
                ),
                config=types.GenerateContentConfig(
                    temperature=0.0,
                    max_output_tokens=500,
                    thinking_config=types.ThinkingConfig(thinking_budget=0),
                ),
            )
            return (response.text or "").strip() or conversation_history[-500:]
        except Exception as exc:  # noqa: BLE001
            logger.error("Conversation summarization failed: %s", exc)
            return conversation_history[-500:]


ai_service = AIService()
