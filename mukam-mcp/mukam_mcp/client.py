"""HTTP access to the CISO Assistant API."""

import requests

from . import config


def get(endpoint: str, params: dict | None = None) -> requests.Response:
    return requests.get(
        f"{config.API_URL}{endpoint}",
        headers={"Authorization": f"Token {config.TOKEN}"},
        params=params,
        verify=config.VERIFY_CERTIFICATE,
        timeout=config.HTTP_TIMEOUT,
    )


def results_of(payload) -> list:
    """Pull the rows out of a paginated or bare-list response."""
    if isinstance(payload, dict):
        return payload.get("results", [])
    if isinstance(payload, list):
        return payload
    return []
