"""Retrieval half of the RAG pipeline.

Embeddings are stored as plain JSON float arrays on KnowledgeChunk (see
models.py) rather than a native pgvector column, so similarity search is
done here in application code. This keeps the schema portable (Postgres in
production, SQLite in tests) at the cost of pulling all indexed chunks into
memory - perfectly fine for the "simple knowledge base" scope this project
targets (About Us / services / pricing / FAQ pages, not a large document
corpus).
"""

import math
from dataclasses import dataclass

from django.conf import settings

import logging
from app.models import KnowledgeChunk, KnowledgeDocumentStatus
from app.services.embedding_service import embedding_service

logger = logging.getLogger(__name__)


@dataclass
class RetrievedChunk:
    content: str
    source_url: str
    title: str | None
    score: float


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    if not a or not b or len(a) != len(b):
        return 0.0
    dot = sum(x * y for x, y in zip(a, b, strict=True))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


class RAGService:
    def retrieve(self, query: str, top_k: int | None = None) -> list[RetrievedChunk]:
        top_k = top_k or settings.RAG_TOP_K
        if not embedding_service.is_configured:
            logger.warning("Embedding service not configured; RAG retrieval returning no context")
            return []

        query_vector = embedding_service.embed_query(query)

        chunks = KnowledgeChunk.objects.select_related("document").filter(
            document__status=KnowledgeDocumentStatus.INDEXED
        )

        scored = [
            RetrievedChunk(
                content=chunk.content,
                source_url=chunk.document.source_url,
                title=chunk.document.title,
                score=_cosine_similarity(query_vector, chunk.embedding or []),
            )
            for chunk in chunks
        ]
        scored.sort(key=lambda c: c.score, reverse=True)
        return scored[:top_k]

    @staticmethod
    def format_context(chunks: list[RetrievedChunk]) -> str:
        if not chunks:
            return ""
        parts = []
        for i, c in enumerate(chunks, start=1):
            parts.append(f"[Source {i}: {c.title or c.source_url}]\n{c.content}")
        return "\n\n".join(parts)


rag_service = RAGService()
