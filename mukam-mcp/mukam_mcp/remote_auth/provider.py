"""OAuth 2.1 provider: authorize via the Muhkam login page, mint a PAT."""

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


class MuhkamAuthorizationCode(AuthorizationCode):
    pat: str


class MuhkamAccessToken(AccessToken):
    pat: str


class MuhkamRefreshToken(RefreshToken):
    pat: str


class MuhkamOAuthProvider(
    OAuthAuthorizationServerProvider[MuhkamAuthorizationCode, MuhkamRefreshToken, MuhkamAccessToken]
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
        return f"{config.ISSUER_URL}/login?login_id={login_id}"

    async def load_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: str
    ) -> MuhkamAuthorizationCode | None:
        code = store.authorization_codes.get(authorization_code)
        if code is None or code.client_id != client.client_id:
            return None
        return code

    async def exchange_authorization_code(
        self, client: OAuthClientInformationFull, authorization_code: MuhkamAuthorizationCode
    ) -> OAuthToken:
        store.authorization_codes.delete(authorization_code.code)

        access_token = secrets.token_urlsafe(32)
        refresh_token = secrets.token_urlsafe(32)
        expires_at = int(time.time()) + config.MCP_ACCESS_TOKEN_TTL

        store.access_tokens.put(
            access_token,
            MuhkamAccessToken(
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
            MuhkamRefreshToken(
                token=refresh_token,
                client_id=client.client_id,
                scopes=authorization_code.scopes,
                expires_at=None,
                pat=authorization_code.pat,
            ),
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
    ) -> MuhkamRefreshToken | None:
        token = store.refresh_tokens.get(refresh_token)
        if token is None or token.client_id != client.client_id:
            return None
        return token

    async def exchange_refresh_token(
        self,
        client: OAuthClientInformationFull,
        refresh_token: MuhkamRefreshToken,
        scopes: list[str],
    ) -> OAuthToken:
        new_access_token = secrets.token_urlsafe(32)
        expires_at = int(time.time()) + config.MCP_ACCESS_TOKEN_TTL
        effective_scopes = scopes or refresh_token.scopes

        store.access_tokens.put(
            new_access_token,
            MuhkamAccessToken(
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

    async def load_access_token(self, token: str) -> MuhkamAccessToken | None:
        return store.access_tokens.get(token)

    async def revoke_token(self, token: MuhkamAccessToken | MuhkamRefreshToken) -> None:
        if isinstance(token, MuhkamAccessToken):
            store.access_tokens.delete(token.token)
        else:
            store.refresh_tokens.delete(token.token)
