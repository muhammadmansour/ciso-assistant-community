"""Configuration for the Mukam MCP server.

Values come from the process environment, then from an env file: the one named
by MUKAM_MCP_ENV_FILE, else the first of `.env` or `.mcp.env` that exists.

The `MCP_HTTP_HOST`, `MCP_HTTP_PORT` and `MCP_PUBLIC_URL` names used by the
OAuth server in `cli/` are accepted as fallbacks, so one env file can drive
either server.
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


# CISO Assistant API base URL, including the /api prefix.
API_URL = os.getenv("API_URL", "").rstrip("/")

# Personal Access Token used for every request. The token owner must hold the
# administrator role, since /activity-logs/ spans all folders.
TOKEN = os.getenv("TOKEN", "")

VERIFY_CERTIFICATE = os.getenv("VERIFY_CERTIFICATE", "true").lower() in (
    "true",
    "1",
    "yes",
    "on",
)

HTTP_TIMEOUT = int(os.getenv("HTTP_TIMEOUT", "30"))

# Where the HTTP transport binds.
HOST = _first("MUKAM_MCP_HOST", "MCP_HTTP_HOST", default="127.0.0.1")
PORT = int(_first("MUKAM_MCP_PORT", "MCP_HTTP_PORT", default="8282"))

# Public URL this server is reachable at when it sits behind a reverse proxy,
# e.g. https://grc.wathbah.dev. Required there because FastMCP's DNS-rebinding
# protection only trusts localhost Host headers and otherwise rejects proxied
# requests with HTTP 421.
PUBLIC_URL = _first("MUKAM_MCP_PUBLIC_URL", "MCP_PUBLIC_URL").rstrip("/")

# URL path the MCP endpoint is served on. Change it to share a hostname with
# another MCP server already answering on /mcp.
PATH = "/" + _first("MUKAM_MCP_PATH", default="/mcp").strip("/")

# Hard ceiling on rows returned per call, so an agent cannot pull the whole
# audit table into a model's context.
MAX_ENTRIES = int(os.getenv("MUKAM_MCP_MAX_ENTRIES", "200"))


def validate() -> None:
    """Fail fast with an actionable message rather than 401s at call time."""
    missing = [name for name, value in (("API_URL", API_URL), ("TOKEN", TOKEN)) if not value]
    if missing:
        source = f"in {ENV_FILE}" if ENV_FILE else "in an env file (none was found)"
        raise RuntimeError(
            f"{', '.join(missing)} must be set {source} or in the environment "
            "before starting mukam-mcp. See .env.example."
        )
