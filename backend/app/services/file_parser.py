"""Parses uploaded knowledge files (.txt, .json) into one or more "page
plans" ready for the same chunk/embed/index pipeline used for scraped web
pages.

Two JSON shapes are recognised:
  1. Pre-chunked knowledge base export - a list of objects each carrying its
     own "content" (optionally "title", "source_page", "chunk_index"). This
     is treated as already-chunked: chunks are used as-is, grouped into one
     page per distinct source_page/title, instead of being flattened and
     re-split by word count (which would blur boundaries someone already
     chose deliberately and dilute retrieval quality).
  2. Anything else (a single object of facts, a list of FAQ Q&A objects, a
     list of strings) - flattened to text and word-chunked, same as a .txt
     file.
"""

import json
from dataclasses import dataclass, field
from pathlib import Path

_SUPPORTED_EXTENSIONS = {".txt", ".json"}


class FileParseError(Exception):
    pass


@dataclass
class PagePlan:
    """One knowledge document's worth of content, ready to index.

    `chunks` is set only for pre-chunked input (chunks are used verbatim);
    otherwise it's empty and `raw_text` is chunked normally downstream.
    """

    source_key: str
    title: str
    raw_text: str = ""
    chunks: list[str] = field(default_factory=list)


def _json_to_text(data: object, prefix: str = "") -> str:
    """Flattens arbitrary JSON into readable "key: value" text."""
    if isinstance(data, dict):
        lines = [f"{prefix}{key}: {value}" for key, value in data.items() if not isinstance(value, (dict, list))]
        for key, value in data.items():
            if isinstance(value, (dict, list)):
                lines.append(_json_to_text(value, prefix=f"{key}."))
        return "\n".join(lines)

    if isinstance(data, list):
        blocks = []
        for item in data:
            if isinstance(item, (dict, list)):
                blocks.append(_json_to_text(item, prefix=prefix))
            else:
                blocks.append(f"{prefix}{item}")
        return "\n\n".join(blocks)

    return f"{prefix}{data}"


def _is_prechunked_knowledge_base(data: object) -> bool:
    return (
        isinstance(data, list)
        and len(data) > 0
        and all(isinstance(item, dict) and isinstance(item.get("content"), str) and item["content"].strip() for item in data)
    )


def _group_prechunked(data: list[dict]) -> list[PagePlan]:
    groups: dict[str, dict] = {}
    order: list[str] = []

    for item in data:
        key = str(item.get("source_page") or item.get("title") or "page")
        if key not in groups:
            groups[key] = {"title": item.get("title") or key, "items": []}
            order.append(key)
        groups[key]["items"].append(item)

    plans = []
    for key in order:
        group = groups[key]
        items = sorted(group["items"], key=lambda it: it.get("chunk_index", 0))
        chunks = [str(it["content"]).strip() for it in items if str(it.get("content", "")).strip()]
        if chunks:
            plans.append(PagePlan(source_key=key, title=group["title"], chunks=chunks))
    return plans


def plan_file_ingestion(filename: str, raw_bytes: bytes) -> list[PagePlan]:
    """Returns one or more PagePlans describing what to index for this file.
    Raises FileParseError on failure.
    """
    extension = Path(filename).suffix.lower()
    if extension not in _SUPPORTED_EXTENSIONS:
        raise FileParseError(f"Unsupported file type '{extension}'. Only .txt and .json are supported.")

    try:
        raw_text = raw_bytes.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise FileParseError(f"Could not read '{filename}' as UTF-8 text: {exc}") from exc

    if extension == ".json":
        try:
            data = json.loads(raw_text)
        except json.JSONDecodeError as exc:
            raise FileParseError(f"Invalid JSON in '{filename}': {exc}") from exc

        if _is_prechunked_knowledge_base(data):
            plans = _group_prechunked(data)
            if not plans:
                raise FileParseError(f"'{filename}' has no readable content")
            return plans

        cleaned_text = _json_to_text(data).strip()
    else:
        cleaned_text = "\n".join(line.strip() for line in raw_text.splitlines() if line.strip())

    if not cleaned_text:
        raise FileParseError(f"'{filename}' has no readable content")

    return [PagePlan(source_key=filename, title=filename, raw_text=cleaned_text)]
