"""Configuration for the Mukam MCP server.

Values are read from `.env` in the project root (see `.env.example`), falling
back to the process environment.
"""

import os

from dotenv import load_dotenv

load_dotenv(".env")

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
HOST = os.getenv("MUKAM_MCP_HOST", "127.0.0.1")
PORT = int(os.getenv("MUKAM_MCP_PORT", "8282"))

# Public URL this server is reachable at when it sits behind a reverse proxy,
# e.g. https://mukam-mcp.wathbah.dev. Required there because FastMCP's
# DNS-rebinding protection only trusts localhost Host headers and otherwise
# rejects proxied requests with HTTP 421.
PUBLIC_URL = os.getenv("MUKAM_MCP_PUBLIC_URL", "").rstrip("/")

# URL path the MCP endpoint is served on. Change it to share a hostname with
# another MCP server already answering on /mcp.
PATH = "/" + os.getenv("MUKAM_MCP_PATH", "/mcp").strip("/")

# Hard ceiling on rows returned per call, so an agent cannot pull the whole
# audit table into a model's context.
MAX_ENTRIES = int(os.getenv("MUKAM_MCP_MAX_ENTRIES", "200"))


def validate() -> None:
    """Fail fast with an actionable message rather than 401s at call time."""
    missing = [name for name, value in (("API_URL", API_URL), ("TOKEN", TOKEN)) if not value]
    if missing:
        raise RuntimeError(
            f"{', '.join(missing)} must be set in .env or the environment "
            "before starting mukam-mcp. See .env.example."
        )
