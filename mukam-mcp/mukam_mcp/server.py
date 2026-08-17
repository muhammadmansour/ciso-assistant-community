"""Mukam MCP server over streamable HTTP with a login page (OAuth).

Callers sign in with their Muhkam email and password. The server mints a
Personal Access Token for that user, the same way `cli/ca_mcp_http.py` does.
A static TOKEN in `.env` is optional and only used as a fallback.
"""

from urllib.parse import urlparse

from mcp.server.auth.settings import AuthSettings, ClientRegistrationOptions, RevocationOptions
from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings
from starlette.requests import Request
from starlette.responses import Response

from . import config
from .remote_auth.login_page import handle_login
from .remote_auth.provider import MuhkamOAuthProvider
from .tools import get_user_activity_logs


def _transport_security():
    if not config.PUBLIC_URL:
        return None

    parsed = urlparse(config.PUBLIC_URL)
    host = parsed.netloc
    return TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_hosts=[host, f"{host}:*", "127.0.0.1:*", "localhost:*", "[::1]:*"],
        allowed_origins=[
            f"{parsed.scheme}://{host}",
            "http://127.0.0.1:*",
            "http://localhost:*",
            "http://[::1]:*",
        ],
    )


def build() -> FastMCP:
    config.validate()

    mcp = FastMCP(
        "mukam",
        auth_server_provider=MuhkamOAuthProvider(),
        auth=AuthSettings(
            issuer_url=config.ISSUER_URL,
            resource_server_url=config.ISSUER_URL,
            client_registration_options=ClientRegistrationOptions(
                enabled=True,
                valid_scopes=["mcp"],
                default_scopes=["mcp"],
            ),
            revocation_options=RevocationOptions(enabled=True),
        ),
        host=config.HOST,
        port=config.PORT,
        streamable_http_path="/mcp",
        transport_security=_transport_security(),
    )
    mcp.tool()(get_user_activity_logs)

    @mcp.custom_route("/login", methods=["GET", "POST"])
    async def muhkam_login(request: Request) -> Response:
        return await handle_login(request)

    return mcp


def run() -> None:
    mcp = build()
    inner = mcp.streamable_http_app()

    import uvicorn
    from starlette.applications import Starlette
    from starlette.routing import Mount

    prefix = config.PATH.rstrip("/") or "/mukam-mcp"
    lifespan = getattr(inner, "lifespan", None)
    if lifespan is None:
        lifespan = inner.router.lifespan_context

    app = Starlette(routes=[Mount(prefix, app=inner)], lifespan=lifespan)
    uvicorn.run(app, host=config.HOST, port=config.PORT)
