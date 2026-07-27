"""Remote (HTTP + OAuth) transport for the CISO Assistant MCP server.

Unlike `ca_mcp.py` (a local stdio process spawned by an MCP client, using a
single static token from `.mcp.env`), this module runs a standalone HTTP
server that can be registered as a "custom connector" in MCP clients that
support remote servers (e.g. Claude Desktop/Web). Each end user authorizes via
OAuth (see `remote_auth/`), and a Personal Access Token minted for them during
that flow is used behind the scenes for every tool call they make - so calls
are attributed to the actual user, not a shared service account.

Run with: `uv run ca_mcp_http.py` (see `mcp.md` for full setup, including the
required `MCP_PUBLIC_URL` environment variable).
"""

from urllib.parse import urlparse

from mcp.server.auth.settings import AuthSettings, ClientRegistrationOptions, RevocationOptions
from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings
from starlette.requests import Request
from starlette.responses import Response

from . import config
from .remote_auth.login_page import handle_login
from .remote_auth.provider import WathbahOAuthProvider
from .server import register_all_tools


def _require_public_url() -> str:
    if not config.MCP_PUBLIC_URL:
        raise RuntimeError(
            "MCP_PUBLIC_URL must be set (in .mcp.env or the environment) to the public "
            "HTTPS URL this server is reachable at, e.g. https://mcp.example.com, "
            "before starting the HTTP/OAuth transport."
        )
    return config.MCP_PUBLIC_URL


def _build_transport_security(public_url: str) -> TransportSecuritySettings:
    """
    Allow the public domain's Host/Origin headers through DNS-rebinding protection.

    FastMCP only auto-allows `127.0.0.1`/`localhost` Host headers. Since this server
    typically binds to 127.0.0.1 and sits behind a reverse proxy that forwards the
    real public Host header (e.g. `gov-grc.wathbah.dev`), we need to explicitly
    allow that host too, or every request gets rejected with HTTP 421.
    """
    parsed = urlparse(public_url)
    public_host = parsed.netloc

    allowed_hosts = [public_host, f"{public_host}:*", "127.0.0.1:*", "localhost:*", "[::1]:*"]
    allowed_origins = [
        f"{parsed.scheme}://{public_host}",
        "http://127.0.0.1:*",
        "http://localhost:*",
        "http://[::1]:*",
    ]
    return TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_hosts=allowed_hosts,
        allowed_origins=allowed_origins,
    )


def build_http_mcp() -> FastMCP:
    public_url = _require_public_url()

    http_mcp = FastMCP(
        "ciso-assistant",
        auth_server_provider=WathbahOAuthProvider(),
        auth=AuthSettings(
            issuer_url=public_url,
            resource_server_url=public_url,
            client_registration_options=ClientRegistrationOptions(
                enabled=True,
                valid_scopes=["mcp"],
                default_scopes=["mcp"],
            ),
            revocation_options=RevocationOptions(enabled=True),
        ),
        host=config.MCP_HTTP_HOST,
        port=config.MCP_HTTP_PORT,
        transport_security=_build_transport_security(public_url),
    )

    register_all_tools(http_mcp)

    @http_mcp.custom_route("/wathbah/login", methods=["GET", "POST"])
    async def wathbah_login(request: Request) -> Response:
        return await handle_login(request)

    return http_mcp


def run_http_server():
    """Run the MCP server over streamable HTTP with OAuth 2.1 authorization."""
    http_mcp = build_http_mcp()
    http_mcp.run(transport="streamable-http")


if __name__ == "__main__":
    run_http_server()
