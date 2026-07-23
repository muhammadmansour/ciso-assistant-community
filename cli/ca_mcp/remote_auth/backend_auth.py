"""Bridges an end user's CISO Assistant login into a durable API token.

Used by the OAuth login page: once the user submits their email and password,
we log them in against the CISO Assistant API to obtain a short-lived Knox
session token, then immediately mint a longer-lived Personal Access Token
(PAT). That PAT becomes the durable credential behind the OAuth access/refresh
tokens handed back to the MCP client, so every tool call made on that user's
behalf is authenticated as them (not as some shared service account).
"""

import requests

from .. import config


class BackendAuthError(Exception):
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


def login_and_mint_pat(email: str, password: str, token_name: str) -> str:
    """Authenticate against the CISO Assistant API and return a fresh PAT."""
    if not config.API_URL:
        raise BackendAuthError("This MCP server is missing its API_URL configuration.")

    try:
        login_res = requests.post(
            f"{config.API_URL}/iam/login/",
            json={"username": email, "password": password},
            verify=config.VERIFY_CERTIFICATE,
            timeout=config.HTTP_TIMEOUT,
        )
    except requests.RequestException:
        raise BackendAuthError("Could not reach the CISO Assistant API. Please try again.")

    if login_res.status_code != 200:
        raise BackendAuthError("Invalid email or password.")

    session_token = login_res.json().get("token")
    if not session_token:
        raise BackendAuthError("Login succeeded but no session token was returned.")

    try:
        pat_res = requests.post(
            f"{config.API_URL}/iam/auth-tokens/",
            headers={
                "Authorization": f"Token {session_token}",
                "Content-Type": "application/json",
            },
            json={"name": token_name, "expiry": config.MCP_PAT_EXPIRY_DAYS},
            verify=config.VERIFY_CERTIFICATE,
            timeout=config.HTTP_TIMEOUT,
        )
    except requests.RequestException:
        raise BackendAuthError("Login succeeded but creating an MCP access token failed.")

    if pat_res.status_code not in (200, 201):
        raise BackendAuthError(
            "Login succeeded but creating an MCP access token failed "
            f"(HTTP {pat_res.status_code}). You may have too many active tokens; "
            "remove an old one from your CISO Assistant profile settings and try again."
        )

    pat = pat_res.json().get("token")
    if not pat:
        raise BackendAuthError("Login succeeded but no access token was returned.")

    return pat
