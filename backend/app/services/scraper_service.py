"""Fetches and cleans a single web page's text content for the RAG pipeline.

Kept deliberately simple (single-page fetch, not a full crawler) - the admin
supplies the specific URLs to ingest (About Us, Services, Pricing, FAQ, etc.)
via the knowledge management screen.
"""

import hashlib

import httpx
from bs4 import BeautifulSoup

import logging

logger = logging.getLogger(__name__)

_NOISE_TAGS = ["script", "style", "nav", "footer", "header", "noscript", "svg", "form"]


class ScraperError(Exception):
    pass


class ScraperService:
    def fetch_and_clean(self, url: str) -> tuple[str, str]:
        """Returns (title, cleaned_text). Raises ScraperError on failure."""
        try:
            with httpx.Client(timeout=20, follow_redirects=True) as client:
                response = client.get(url, headers={"User-Agent": "AI-Sales-Lead-Agent/1.0"})
                response.raise_for_status()
        except httpx.HTTPError as exc:
            raise ScraperError(f"Failed to fetch {url}: {exc}") from exc

        soup = BeautifulSoup(response.text, "lxml")
        for tag in soup.find_all(_NOISE_TAGS):
            tag.decompose()

        title = soup.title.string.strip() if soup.title and soup.title.string else url
        main = soup.find("main") or soup.find("article") or soup.body or soup
        text = main.get_text(separator="\n", strip=True) if main else ""
        cleaned = "\n".join(line for line in (l.strip() for l in text.splitlines()) if line)

        if not cleaned:
            raise ScraperError(f"No readable content extracted from {url}")

        return title, cleaned

    @staticmethod
    def content_hash(content: str) -> str:
        return hashlib.sha256(content.encode("utf-8")).hexdigest()


scraper_service = ScraperService()
