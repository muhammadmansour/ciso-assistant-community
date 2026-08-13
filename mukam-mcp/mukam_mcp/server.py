"""Mukam MCP server, served over streamable HTTP.

Authentication is a single static Personal Access Token from `.env`, so every
call is attributed to that one account. Bind to localhost and put a reverse
proxy in front of it: the server itself does not authenticate callers.
"""

from urllib.parse import urlparse

from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings

from . import config
from .tools import get_user_activity_logs


def _transport_security() -> TransportSecuritySettings | None:
    """Allow the public hostname through FastMCP's DNS-rebinding protection.

    Only localhost is trusted by default, so a proxied request arriving with the
    real public Host header would be rejected with HTTP 421.
    """
    if not config.PUBLIC_URL:
        return None

    parsed = urlparse(config.PUBLIC_URL)
    host = parsed.netloc
    return TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_hosts=[host, f"{host}:*", "127.0.0.1:*", "localhost:*"],
        allowed_origins=[f"{parsed.scheme}://{host}", "http://127.0.0.1:*", "http://localhost:*"],
    )


def build() -> FastMCP:
    config.validate()

    mcp = FastMCP(
        "mukam",
        host=config.HOST,
        port=config.PORT,
        transport_security=_transport_security(),
    )
    mcp.tool()(get_user_activity_logs)
    return mcp


def run() -> None:
    build().run(transport="streamable-http")
