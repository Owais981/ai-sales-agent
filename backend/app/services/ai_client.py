"""Thin wrapper around the Google Gemini SDK shared by ai_service and
embedding_service, so API-key/client setup lives in exactly one place.
"""

from django.conf import settings
from google import genai

_client: genai.Client | None = None


def get_genai_client() -> genai.Client | None:
    global _client
    if not settings.GEMINI_API_KEY:
        return None
    if _client is None:
        _client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _client
