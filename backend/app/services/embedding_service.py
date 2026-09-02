"""Generates embeddings for RAG knowledge chunks and query text via Gemini."""

from django.conf import settings
from google.genai import types

import logging
from app.services.ai_client import get_genai_client

logger = logging.getLogger(__name__)


class EmbeddingService:
    @property
    def is_configured(self) -> bool:
        return get_genai_client() is not None

    def embed_texts(self, texts: list[str], task_type: str = "RETRIEVAL_DOCUMENT") -> list[list[float]]:
        """`task_type` matters a lot for retrieval quality: knowledge chunks
        should be embedded as RETRIEVAL_DOCUMENT, and the customer's question
        as RETRIEVAL_QUERY (see embed_query) - using the same task type for
        both produces noticeably worse nearest-neighbour rankings, since the
        model optimizes the embedding space differently for each role.
        """
        client = get_genai_client()
        if client is None or not texts:
            logger.warning("Embedding service not configured or empty input; returning zero vectors")
            return [[0.0] * settings.EMBEDDING_DIMENSIONS for _ in texts]

        result = client.models.embed_content(
            model=settings.GEMINI_EMBEDDING_MODEL,
            contents=texts,
            config=types.EmbedContentConfig(task_type=task_type),
        )
        return [list(e.values) for e in result.embeddings]

    def embed_query(self, text: str) -> list[float]:
        vectors = self.embed_texts([text], task_type="RETRIEVAL_QUERY")
        return vectors[0]


embedding_service = EmbeddingService()
