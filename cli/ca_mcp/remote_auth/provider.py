"""OAuth 2.1 authorization server provider backing the remote MCP transport.

Bridges MCP's OAuth authorization-code flow to CISO Assistant's own
email/password login. There is no third-party redirect: `/authorize` sends the
end user to a small login form hosted by this same server (see
`login_page.py`), which authenticates them against the CISO Assistant API and
mints a Personal Access Token (PAT) that becomes the durable credential behind
the OAuth tokens handed back to the MCP client.
"""

import secrets
import time

from mcp.server.auth.provider import (
    AccessToken,
    AuthorizationCode,
    AuthorizationParams,
    OAuthAuthorizationServerProvider,
    RefreshToken,
)
from mcp.shared.auth import OAuthClientInformationFull, OAuthToken

from .. import config
from . import store


class WathbahAuthorizationCode(AuthorizationCode):
    """Authorization code carrying the PAT minted during the login step."""

    pat: str


class WathbahAccessToken(AccessToken):
    """Access token backed by a CISO Assistant Personal Access Token."""

    pat: str


class WathbahRefreshToken(RefreshToken):
    """Refresh token backed by a CISO Assistant Personal Access Token."""

    pat: str


class WathbahOAuthProvider(
    OAuthAuthorizationServerProvider[WathbahAuthorizationCode, WathbahRefreshToken, WathbahAccessToken]
):
    async def get_client(self, client_id: str) -> OAuthClientInformationFull | None:
        return store.client_store.get(client_id)

    async def register_client(self, client_info: OAuthClientInformationFull) -> None:
        store.client_store.put(client_info)

    async def authorize(self, client: OAuthClientInformationFull, params: AuthorizationParams) -> str:
        login_id = secrets.token_urlsafe(32)
        store.pending_authorizations.put(
            login_id,
            store.PendingAuthorization(
                client_id=client.client_id,
                redirect_uri=str(params.redirect_uri),
                redirect_uri_provided_explicitly=params.redirect_uri_provided_explicitly,
                state=params.state,
                code_challenge=params.code_challenge,
                scopes=params.scopes or [],
                resource=params.resource,
            ),
            ttl_seconds=600,
        )
        return f"{config.MCP_PUBLIC_URL}/wathbah/login?login_id={login_id}"

    async def load_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: str
    ) -> WathbahAuthorizationCode | None:
        code = store.authorization_codes.get(authorization_code)
        if code is None or code.client_id != client.client_id:
            return None
        return code

    async def exchange_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: WathbahAuthorizationCode
    ) -> OAuthToken:
        # Authorization codes are single-use.
        store.authorization_codes.delete(authorization_code.code)

        access_token = secrets.token_urlsafe(32)
        refresh_token = secrets.token_urlsafe(32)
        expires_at = int(time.time()) + config.MCP_ACCESS_TOKEN_TTL

        store.access_tokens.put(
            access_token,
            WathbahAccessToken(
                token=access_token,
                client_id=client.client_id,
                scopes=authorization_code.scopes,
                expires_at=expires_at,
                resource=authorization_code.resource,
                pat=authorization_code.pat,
            ),
            ttl_seconds=config.MCP_ACCESS_TOKEN_TTL,
        )
        store.refresh_tokens.put(
            refresh_token,
            WathbahRefreshToken(
                token=refresh_token,
                client_id=client.client_id,
                scopes=authorization_code.scopes,
                expires_at=None,
                pat=authorization_code.pat,
            ),
            # The refresh token can't outlive the underlying PAT.
            ttl_seconds=60 * 60 * 24 * config.MCP_PAT_EXPIRY_DAYS,
        )

        return OAuthToken(
            access_token=access_token,
            token_type="Bearer",
            expires_in=config.MCP_ACCESS_TOKEN_TTL,
            scope=" ".join(authorization_code.scopes) if authorization_code.scopes else None,
            refresh_token=refresh_token,
        )

    async def load_refresh_token(
        self, client: OAuthClientInformationFull, refresh_token: str
    ) -> WathbahRefreshToken | None:
        token = store.refresh_tokens.get(refresh_token)
        if token is None or token.client_id != client.client_id:
            return None
        return token

    async def exchange_refresh_token(
        self,
        client: OAuthClientInformationFull,
        refresh_token: WathbahRefreshToken,
        scopes: list[str],
    ) -> OAuthToken:
        new_access_token = secrets.token_urlsafe(32)
        expires_at = int(time.time()) + config.MCP_ACCESS_TOKEN_TTL
        effective_scopes = scopes or refresh_token.scopes

        store.access_tokens.put(
            new_access_token,
            WathbahAccessToken(
                token=new_access_token,
                client_id=client.client_id,
                scopes=effective_scopes,
                expires_at=expires_at,
                pat=refresh_token.pat,
            ),
            ttl_seconds=config.MCP_ACCESS_TOKEN_TTL,
        )

        return OAuthToken(
            access_token=new_access_token,
            token_type="Bearer",
            expires_in=config.MCP_ACCESS_TOKEN_TTL,
            scope=" ".join(effective_scopes) if effective_scopes else None,
            refresh_token=refresh_token.token,
        )

    async def load_access_token(self, token: str) -> WathbahAccessToken | None:
        return store.access_tokens.get(token)

    async def revoke_token(self, token: WathbahAccessToken | WathbahRefreshToken) -> None:
        if isinstance(token, WathbahAccessToken):
            store.access_tokens.delete(token.token)
        else:
            store.refresh_tokens.delete(token.token)
