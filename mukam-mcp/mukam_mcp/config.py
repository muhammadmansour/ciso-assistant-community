"""Configuration for the Mukam MCP server.

Values come from the process environment, then from an env file: the one named
by MUKAM_MCP_ENV_FILE, else the first of `.env` or `.mcp.env` that exists.

`TOKEN` is optional. The HTTP server authenticates each caller through the
Muhkam login page (OAuth) and mints a Personal Access Token for that user,
the same way `cli/ca_mcp_http.py` does. A static TOKEN is only a fallback
for local debugging.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

_named = os.getenv("MUKAM_MCP_ENV_FILE")
for _candidate in ([_named] if _named else []) + [".env", ".mcp.env"]:
    if Path(_candidate).is_file():
        load_dotenv(_candidate)
        ENV_FILE = _candidate
        break
else:
    ENV_FILE = None


def _first(*names: str, default: str = "") -> str:
    for name in names:
        value = os.getenv(name)
        if value:
            return value
    return default


# CISO Assistant / Muhkam API base URL, including the /api prefix.
API_URL = os.getenv("API_URL", "").rstrip("/")

# Optional static PAT. Unused when the caller authorized via the login page.
TOKEN = os.getenv("TOKEN", "")

VERIFY_CERTIFICATE = os.getenv("VERIFY_CERTIFICATE", "true").lower() in (
    "true",
    "1",
    "yes",
    "on",
)

HTTP_TIMEOUT = int(os.getenv("HTTP_TIMEOUT", "30"))

HOST = _first("MUKAM_MCP_HOST", "MCP_HTTP_HOST", default="127.0.0.1")
PORT = int(_first("MUKAM_MCP_PORT", "MCP_HTTP_PORT", default="8282"))

# Public origin, e.g. https://muhkam-grc.wathbah.dev (no path).
PUBLIC_URL = _first("MUKAM_MCP_PUBLIC_URL", "MCP_PUBLIC_URL").rstrip("/")

# Nginx prefix so this server can share a hostname with CISO MCP on /mcp.
PATH = "/" + _first("MUKAM_MCP_PATH", default="/mukam-mcp").strip("/")

# OAuth issuer / resource, distinct from CISO MCP on the same host.
ISSUER_URL = f"{PUBLIC_URL}{PATH}" if PUBLIC_URL else ""

# Login form lives next to the MCP endpoint so one nginx location covers both.
LOGIN_PATH = f"{PATH}/login"

MCP_PAT_EXPIRY_DAYS = int(_first("MUKAM_MCP_PAT_EXPIRY_DAYS", "MCP_PAT_EXPIRY_DAYS", default="30"))
MCP_ACCESS_TOKEN_TTL = int(os.getenv("MCP_ACCESS_TOKEN_TTL", str(60 * 60)))
MCP_AUTH_CODE_TTL = int(os.getenv("MCP_AUTH_CODE_TTL", "300"))

MCP_OAUTH_CLIENTS_FILE = os.getenv(
    "MUKAM_MCP_OAUTH_CLIENTS_FILE",
    os.path.join(os.path.dirname(__file__), "..", ".oauth_clients.json"),
)

MAX_ENTRIES = int(os.getenv("MUKAM_MCP_MAX_ENTRIES", "200"))


def resolve_token() -> str:
    """PAT for the current request: OAuth-minted if present, else static TOKEN."""
    try:
        from mcp.server.auth.middleware.auth_context import get_access_token

        access_token = get_access_token()
    except Exception:
        access_token = None

    if access_token is not None:
        pat = getattr(access_token, "pat", None)
        if pat:
            return pat

    return TOKEN


def validate() -> None:
    missing = []
    if not API_URL:
        missing.append("API_URL")
    if not PUBLIC_URL:
        missing.append("MUKAM_MCP_PUBLIC_URL")
    if missing:
        source = f"in {ENV_FILE}" if ENV_FILE else "in an env file (none was found)"
        raise RuntimeError(
            f"{', '.join(missing)} must be set {source} or in the environment "
            "before starting mukam-mcp. See .env.example. TOKEN is not required; "
            "callers sign in on the Muhkam login page."
        )
