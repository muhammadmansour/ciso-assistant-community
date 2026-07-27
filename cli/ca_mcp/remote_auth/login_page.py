"""Login bridge page for the OAuth flow.

Mounted at GET/POST /wathbah/login. This isn't part of the MCP protocol
itself; it's the small piece of UI needed to let a human complete the OAuth
authorization step against CISO Assistant's own login system rather than a
third-party identity provider.
"""

import html
import secrets
import time

from mcp.server.auth.provider import construct_redirect_uri
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse, Response

from .. import config
from . import store
from .backend_auth import BackendAuthError, login_and_mint_pat
from .provider import WathbahAuthorizationCode

_EXPIRED_MESSAGE = "This sign-in link has expired. Please retry from your MCP client."


def _render_form(login_id: str, error: str | None = None) -> str:
    error_html = f'<p class="error">{html.escape(error)}</p>' if error else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Sign in to CISO Assistant</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #f4f6f8; display: flex; align-items: center; justify-content: center;
    height: 100vh; margin: 0;
  }}
  .card {{
    background: #fff; padding: 32px 36px; border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,.08); width: 100%; max-width: 360px;
  }}
  h1 {{ font-size: 20px; margin: 0 0 4px; color: #1e3a5f; }}
  p.subtitle {{ color: #666; font-size: 13px; margin: 0 0 24px; }}
  p.error {{ color: #c0392b; font-size: 13px; margin: 0 0 16px; }}
  label {{ display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }}
  input {{
    width: 100%; padding: 10px 12px; margin-bottom: 16px; border: 1px solid #d5d9dd;
    border-radius: 6px; font-size: 14px; box-sizing: border-box;
  }}
  button {{
    width: 100%; padding: 11px; background: #1e3a5f; color: #fff; border: none;
    border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
  }}
  button:hover {{ background: #163050; }}
</style>
</head>
<body>
  <div class="card">
    <h1>CISO Assistant</h1>
    <p class="subtitle">Sign in to authorize this MCP connector</p>
    {error_html}
    <form method="POST" action="/wathbah/login">
      <input type="hidden" name="login_id" value="{html.escape(login_id)}" />
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="username" required autofocus />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <button type="submit">Sign in</button>
    </form>
  </div>
</body>
</html>"""


async def handle_login(request: Request) -> Response:
    if request.method == "GET":
        login_id = request.query_params.get("login_id", "")
        pending = store.pending_authorizations.get(login_id) if login_id else None
        if pending is None:
            return HTMLResponse(_render_form("", error=_EXPIRED_MESSAGE), status_code=400)
        return HTMLResponse(_render_form(login_id))

    form = await request.form()
    login_id = str(form.get("login_id", ""))
    email = str(form.get("email", "")).strip()
    password = str(form.get("password", ""))

    pending = store.pending_authorizations.get(login_id) if login_id else None
    if pending is None:
        return HTMLResponse(_render_form("", error=_EXPIRED_MESSAGE), status_code=400)

    try:
        pat = login_and_mint_pat(email, password, token_name=f"mcp-connector-{int(time.time())}")
    except BackendAuthError as exc:
        return HTMLResponse(_render_form(login_id, error=exc.message), status_code=401)

    store.pending_authorizations.delete(login_id)

    code = secrets.token_urlsafe(32)
    store.authorization_codes.put(
        code,
        WathbahAuthorizationCode(
            code=code,
            scopes=pending.scopes,
            expires_at=time.time() + config.MCP_AUTH_CODE_TTL,
            client_id=pending.client_id,
            code_challenge=pending.code_challenge,
            redirect_uri=pending.redirect_uri,
            redirect_uri_provided_explicitly=pending.redirect_uri_provided_explicitly,
            resource=pending.resource,
            pat=pat,
        ),
        ttl_seconds=config.MCP_AUTH_CODE_TTL,
    )

    redirect_url = construct_redirect_uri(pending.redirect_uri, code=code, state=pending.state)
    return RedirectResponse(url=redirect_url, status_code=302)
