"""Lightweight regex-based detection of phone numbers and email addresses
typed into customer chat messages, so a human sales manager can follow up
outside the chat. Deliberately simple (no NLP/NER dependency) - the result
only feeds a CRM display field, never used to send anything automatically.
"""

import re

_EMAIL_PATTERN = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
# Permissive digit-run match (7-15 digits, optional +/spaces/dashes/parens) -
# fine for a display field, not meant to validate a real deliverable number.
_PHONE_PATTERN = re.compile(r"(?<!\w)(\+?\d[\d\s\-()]{6,14}\d)(?!\w)")
# Only fires on an explicit self-introduction phrase (English or Roman Urdu) -
# deliberately narrower than the email/phone patterns, since a loose "i am
# <rest of sentence>" match would capture whatever the customer says next as
# their "name".
_NAME_PATTERNS = [
    re.compile(r"\b(?:my name is|call me|this is)\s+([A-Za-z][A-Za-z .'\-]{1,40}?)(?=[.,!?\n]|$)", re.IGNORECASE),
    re.compile(r"\b(?:mera naam|naam)\s+([A-Za-z][A-Za-z .'\-]{1,40}?)\s+(?:hai|h)\b", re.IGNORECASE),
]


class ContactExtractionService:
    def extract_email(self, text: str) -> str | None:
        match = _EMAIL_PATTERN.search(text)
        return match.group(0) if match else None

    def extract_phone(self, text: str) -> str | None:
        match = _PHONE_PATTERN.search(text)
        if not match:
            return None
        digits_only = re.sub(r"\D", "", match.group(0))
        if len(digits_only) < 7:
            return None
        return match.group(0).strip()

    def extract_name(self, text: str) -> str | None:
        for pattern in _NAME_PATTERNS:
            match = pattern.search(text)
            if match:
                name = match.group(1).strip(" .'-")
                if name:
                    return name
        return None


contact_extraction_service = ContactExtractionService()
