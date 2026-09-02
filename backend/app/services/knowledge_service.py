import json
import uuid
from datetime import datetime, timezone

import logging
from app.models import KnowledgeChunk, KnowledgeDocument, KnowledgeDocumentStatus
from app.services.chunking import chunk_text
from app.services.embedding_service import embedding_service
from app.services.file_parser import FileParseError, PagePlan, plan_file_ingestion
from app.services.scraper_service import ScraperError, scraper_service

logger = logging.getLogger(__name__)

UPLOAD_SOURCE_PREFIX = "upload://"


class KnowledgeService:
    def list_documents(self) -> list[KnowledgeDocument]:
        return list(KnowledgeDocument.objects.order_by("-created_at"))

    def get_or_create_document(self, source_url: str) -> KnowledgeDocument:
        doc, _created = KnowledgeDocument.objects.get_or_create(
            source_url=source_url, defaults={"status": KnowledgeDocumentStatus.PENDING}
        )
        return doc

    def ingest_url(self, url: str) -> KnowledgeDocument:
        """Scrape the URL, chunk + embed the content, and (re)index it.

        Skips re-embedding if the content hasn't actually changed since the
        last successful index, so re-running ingestion is cheap.
        """
        doc = self.get_or_create_document(url)

        try:
            title, cleaned_text = scraper_service.fetch_and_clean(url)
        except ScraperError as exc:
            return self._mark_failed(doc, str(exc))

        return self._index_content(doc, title, cleaned_text=cleaned_text, source_label=url)

    def plan_file_source_urls(self, filename: str, raw_bytes: bytes) -> list[str]:
        """Previews the source_url(s) a file will produce without indexing
        anything - used by the upload endpoint to create placeholder rows
        synchronously before the (potentially slow) embedding work runs in
        the background.
        """
        try:
            plans = plan_file_ingestion(filename, raw_bytes)
        except FileParseError:
            return [f"{UPLOAD_SOURCE_PREFIX}{filename}"]
        return [self._source_url_for_plan(filename, plan, len(plans)) for plan in plans]

    def ingest_file(self, filename: str, raw_bytes: bytes) -> list[KnowledgeDocument]:
        """Parses an uploaded .txt/.json file and indexes it.

        A plain text file or a simple JSON file (facts/FAQ) becomes one
        knowledge document. A pre-chunked knowledge base export (a list of
        objects each with their own "content", grouped by "source_page")
        becomes one document per page, with its existing chunk boundaries
        preserved rather than re-split by word count.

        Re-uploading a file updates its existing document(s) (matching how
        re-ingesting a URL works), matched by the same source_url(s).
        """
        try:
            plans = plan_file_ingestion(filename, raw_bytes)
        except FileParseError as exc:
            placeholder = self.get_or_create_document(f"{UPLOAD_SOURCE_PREFIX}{filename}")
            return [self._mark_failed(placeholder, str(exc))]

        docs = []
        for plan in plans:
            source_url = self._source_url_for_plan(filename, plan, len(plans))
            doc = self.get_or_create_document(source_url)
            if plan.chunks:
                docs.append(self._index_content(doc, plan.title, prebuilt_chunks=plan.chunks, source_label=source_url))
            else:
                docs.append(self._index_content(doc, plan.title, cleaned_text=plan.raw_text, source_label=source_url))
        return docs

    @staticmethod
    def _source_url_for_plan(filename: str, plan: PagePlan, total_plans: int) -> str:
        if total_plans == 1:
            return f"{UPLOAD_SOURCE_PREFIX}{filename}"
        return f"{UPLOAD_SOURCE_PREFIX}{filename}#{plan.source_key}"

    def reindex_document(self, document_id: uuid.UUID) -> KnowledgeDocument | None:
        doc = KnowledgeDocument.objects.filter(id=document_id).first()
        if doc is None:
            return None

        if doc.source_url.startswith(UPLOAD_SOURCE_PREFIX):
            # No external source to re-fetch for an uploaded file - re-run
            # chunking/embedding on the content already stored from the
            # original upload. Pre-chunked uploads store their chunk list as
            # JSON so exact boundaries survive a reindex; plain uploads store
            # raw text and get re-chunked by word count as before.
            prebuilt_chunks = self._try_parse_stored_chunks(doc.content)
            if prebuilt_chunks is not None:
                return self._index_content(
                    doc, doc.title or doc.source_url, prebuilt_chunks=prebuilt_chunks, source_label=doc.source_url, force=True
                )
            return self._index_content(
                doc, doc.title or doc.source_url, cleaned_text=doc.content, source_label=doc.source_url, force=True
            )

        doc.status = KnowledgeDocumentStatus.PENDING
        doc.save()
        return self.ingest_url(doc.source_url)

    @staticmethod
    def _try_parse_stored_chunks(content: str) -> list[str] | None:
        try:
            data = json.loads(content)
        except (json.JSONDecodeError, TypeError):
            return None
        if isinstance(data, list) and all(isinstance(item, str) for item in data):
            return data
        return None

    def remove_document(self, document_id: uuid.UUID) -> bool:
        deleted, _ = KnowledgeDocument.objects.filter(id=document_id).delete()
        return deleted > 0

    def chunk_count(self, document_id: uuid.UUID) -> int:
        return KnowledgeChunk.objects.filter(document_id=document_id).count()

    def _mark_failed(self, doc: KnowledgeDocument, error_message: str) -> KnowledgeDocument:
        doc.status = KnowledgeDocumentStatus.FAILED
        doc.error_message = error_message
        doc.save()
        logger.error("Knowledge ingestion failed for %s: %s", doc.source_url, error_message)
        return doc

    def _index_content(
        self,
        doc: KnowledgeDocument,
        title: str,
        source_label: str,
        cleaned_text: str | None = None,
        prebuilt_chunks: list[str] | None = None,
        force: bool = False,
    ) -> KnowledgeDocument:
        # Pre-chunked input is stored as a JSON array (so reindex can recover
        # exact chunk boundaries); plain text is stored as-is.
        stored_content = json.dumps(prebuilt_chunks) if prebuilt_chunks is not None else (cleaned_text or "")

        new_hash = scraper_service.content_hash(stored_content)
        if not force and doc.content_hash == new_hash and doc.status == KnowledgeDocumentStatus.INDEXED:
            logger.info("Content unchanged for %s, skipping re-index", source_label)
            return doc

        doc.title = title
        doc.content = stored_content
        doc.content_hash = new_hash
        doc.error_message = None

        KnowledgeChunk.objects.filter(document=doc).delete()

        pieces = prebuilt_chunks if prebuilt_chunks is not None else chunk_text(cleaned_text or "")
        if not pieces:
            doc.status = KnowledgeDocumentStatus.FAILED
            doc.error_message = "No content to index"
            doc.save()
            return doc

        vectors = embedding_service.embed_texts(pieces)
        KnowledgeChunk.objects.bulk_create(
            [
                KnowledgeChunk(
                    document=doc,
                    content=piece,
                    chunk_index=idx,
                    embedding=vector,
                    chunk_metadata={"source_url": source_label, "title": title},
                )
                for idx, (piece, vector) in enumerate(zip(pieces, vectors, strict=True))
            ]
        )

        doc.status = KnowledgeDocumentStatus.INDEXED
        doc.last_indexed_at = datetime.now(timezone.utc).isoformat()
        doc.save()
        logger.info("Indexed %d chunks for %s", len(pieces), source_label)
        return doc


knowledge_service = KnowledgeService()
