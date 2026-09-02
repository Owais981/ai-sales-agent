"""Ingests every .txt/.json file in a local folder into the knowledge base.

The "drop a file in a folder, run a script" pattern for feeding a dataset
into the agent - an alternative to adding pages one at a time via the
dashboard or API.

Usage:
    python manage.py ingest_folder                # ingests backend/data/
    python manage.py ingest_folder path/to/folder  # ingests a different folder
"""

from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from app.models import KnowledgeDocumentStatus
from app.services.knowledge_service import knowledge_service

DEFAULT_DATA_FOLDER = Path(settings.BASE_DIR) / "data"
SUPPORTED_SUFFIXES = {".txt", ".json"}


class Command(BaseCommand):
    help = "Ingests every .txt/.json file in a local folder into the knowledge base"

    def add_arguments(self, parser):
        parser.add_argument("folder", nargs="?", default=None)

    def handle(self, *args, **options):
        folder = Path(options["folder"]).resolve() if options["folder"] else DEFAULT_DATA_FOLDER
        if not folder.is_dir():
            raise CommandError(f"Folder not found: {folder}")

        files = sorted(p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED_SUFFIXES)
        if not files:
            self.stdout.write(f"No .txt/.json files found in {folder}")
            return

        self.stdout.write(f"Found {len(files)} file(s) in {folder}\n")

        for path in files:
            raw_bytes = path.read_bytes()
            docs = knowledge_service.ingest_file(path.name, raw_bytes)

            indexed = sum(1 for doc in docs if doc.status == KnowledgeDocumentStatus.INDEXED)
            if len(docs) > 1:
                self.stdout.write(f"  [OK]     {path.name} - {indexed}/{len(docs)} page(s) indexed")
                for doc in docs:
                    if doc.status != KnowledgeDocumentStatus.INDEXED:
                        self.stdout.write(f"           [FAILED] {doc.title or doc.source_url} - {doc.error_message}")
            elif docs[0].status == KnowledgeDocumentStatus.INDEXED:
                self.stdout.write(f"  [OK]     {path.name}")
            else:
                self.stdout.write(f"  [FAILED] {path.name} - {docs[0].error_message}")

        self.stdout.write("\nDone. Check the Knowledge Management dashboard page to review indexed content.")
