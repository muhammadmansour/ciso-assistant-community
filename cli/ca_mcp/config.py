"""Configuration module for CISO Assistant MCP server"""

import os
from dotenv import load_dotenv

# Load environment variables from .mcp.env file
load_dotenv(".mcp.env")

# Configuration dictionary (for backward compatibility)
cli_cfg = dict()
auth_data = dict()
GLOBAL_FOLDER_ID = None

# Read TOKEN and VERIFY_CERTIFICATE from environment variables
API_URL = os.getenv("API_URL", "")
TOKEN = os.getenv("TOKEN", "")
VERIFY_CERTIFICATE = os.getenv("VERIFY_CERTIFICATE", "true").lower() in (
    "true",
    "1",
    "yes",
    "on",
)
HTTP_TIMEOUT = 30  # seconds

# --- Remote (HTTP/OAuth) MCP server settings ---
# These are only used when running the server via `ca_mcp_http.py`, which exposes
# the MCP server over HTTP so it can be added as a "custom connector" in clients
# like Claude Desktop/Web. The stdio server (`ca_mcp.py`) does not use these.

# Public base URL this MCP server is reachable at (e.g. https://mcp.example.com).
# Used as the OAuth issuer/resource URL and to build absolute redirect URLs.
MCP_PUBLIC_URL = os.getenv("MCP_PUBLIC_URL", "").rstrip("/")

# Host/port the HTTP server binds to.
MCP_HTTP_HOST = os.getenv("MCP_HTTP_HOST", "0.0.0.0")
MCP_HTTP_PORT = int(os.getenv("MCP_HTTP_PORT", "8181"))

# How long (in days) the Personal Access Tokens minted on behalf of a user during
# the OAuth login flow should live on the CISO Assistant backend.
MCP_PAT_EXPIRY_DAYS = int(os.getenv("MCP_PAT_EXPIRY_DAYS", "30"))

# How long (in seconds) issued OAuth access tokens / authorization codes stay valid.
MCP_ACCESS_TOKEN_TTL = int(os.getenv("MCP_ACCESS_TOKEN_TTL", str(60 * 60)))  # 1 hour
MCP_AUTH_CODE_TTL = int(os.getenv("MCP_AUTH_CODE_TTL", "300"))  # 5 minutes

# Where registered OAuth client metadata is persisted so Claude doesn't need to
# re-register every time the server restarts.
MCP_OAUTH_CLIENTS_FILE = os.getenv(
    "MCP_OAUTH_CLIENTS_FILE", os.path.join(os.path.dirname(__file__), "..", ".oauth_clients.json")
)


def resolve_token() -> str:
    """
    Resolve the CISO Assistant API token to use for outgoing requests.

    - When running as the local stdio server (`ca_mcp.py`), there is a single
      static token configured in `.mcp.env`, used for every request.
    - When running as the remote HTTP server (`ca_mcp_http.py`), each request is
      tied to a specific end user who authorized via OAuth. In that case the
      per-request Personal Access Token minted for that user is read from the
      MCP auth context instead of the static TOKEN.
    """
    try:
        # Import lazily: this module is only usable (and importable) when the
        # server is running under the MCP auth middleware, i.e. in HTTP mode.
        from mcp.server.auth.middleware.auth_context import get_access_token

        access_token = get_access_token()
    except Exception:
        access_token = None

    if access_token is not None:
        pat = getattr(access_token, "pat", None)
        if pat:
            return pat

    return TOKEN
