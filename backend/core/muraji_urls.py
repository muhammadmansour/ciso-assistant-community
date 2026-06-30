"""
Muraji API endpoint URLs — override per environment via env vars.

Set ``MURAJI_API_BASE_URL`` to retarget every endpoint at once, or override
individual URLs (``MURAJI_ANALYSIS_API_URL``, etc.) when needed.
"""

import os

MURAJI_API_BASE_URL = os.getenv(
    "MURAJI_API_BASE_URL", "https://muraji-api.wathbah.dev"
).rstrip("/")


def _muraji_endpoint(env_key: str, path: str) -> str:
    return os.getenv(env_key) or f"{MURAJI_API_BASE_URL}{path}"


MURAJI_ANALYSIS_API_URL = _muraji_endpoint(
    "MURAJI_ANALYSIS_API_URL", "/api/audit/analyze"
)
MURAJI_LIBRARIES_API_URL = _muraji_endpoint(
    "MURAJI_LIBRARIES_API_URL", "/api/libraries"
)
MURAJI_ENTITY_EXTRACTION_API_URL = _muraji_endpoint(
    "MURAJI_ENTITY_EXTRACTION_API_URL", "/api/entity-extraction/extract"
)
MURAJI_MAIL_API_URL = _muraji_endpoint("MURAJI_MAIL_API_URL", "/api/mail/send")
