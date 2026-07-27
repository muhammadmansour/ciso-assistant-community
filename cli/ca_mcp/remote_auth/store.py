"""Storage for the MCP OAuth bridge.

Registered OAuth client metadata is persisted to a small JSON file so Claude
doesn't need to re-register every time the server restarts. Authorization
codes and tokens are short-lived and kept in memory only; a server restart
simply forces affected users to re-authorize, which is an acceptable
trade-off for this bridge.
"""

import json
import os
import threading
import time
from dataclasses import dataclass, field
from typing import Optional

from mcp.shared.auth import OAuthClientInformationFull

from .. import config


class ClientStore:
    """File-backed store for dynamically registered OAuth clients."""

    def __init__(self, path: str):
        self._path = path
        self._lock = threading.Lock()
        self._clients: dict[str, OAuthClientInformationFull] = {}
        self._load()

    def _load(self) -> None:
        if not os.path.exists(self._path):
            return
        try:
            with open(self._path, "r", encoding="utf-8") as f:
                raw = json.load(f)
            for client_id, data in raw.items():
                self._clients[client_id] = OAuthClientInformationFull.model_validate(data)
        except (OSError, ValueError):
            # Corrupt or unreadable store; start fresh rather than crash the server.
            self._clients = {}

    def _save(self) -> None:
        try:
            directory = os.path.dirname(self._path)
            if directory:
                os.makedirs(directory, exist_ok=True)
            with open(self._path, "w", encoding="utf-8") as f:
                json.dump(
                    {cid: c.model_dump(mode="json") for cid, c in self._clients.items()},
                    f,
                    indent=2,
                )
        except OSError:
            pass

    def get(self, client_id: str) -> Optional[OAuthClientInformationFull]:
        with self._lock:
            return self._clients.get(client_id)

    def put(self, client: OAuthClientInformationFull) -> None:
        with self._lock:
            self._clients[client.client_id] = client
            self._save()


@dataclass
class PendingAuthorization:
    """State kept between the /authorize redirect and the login form submission."""

    client_id: str
    redirect_uri: str
    redirect_uri_provided_explicitly: bool
    state: Optional[str]
    code_challenge: str
    scopes: list[str]
    resource: Optional[str]
    created_at: float = field(default_factory=time.time)


class TTLStore:
    """Minimal in-memory store for short-lived objects, with lazy expiry."""

    def __init__(self):
        self._items: dict[str, tuple[float, object]] = {}
        self._lock = threading.Lock()

    def put(self, key: str, value: object, ttl_seconds: float) -> None:
        with self._lock:
            self._items[key] = (time.time() + ttl_seconds, value)

    def get(self, key: str) -> Optional[object]:
        with self._lock:
            entry = self._items.get(key)
            if entry is None:
                return None
            expires_at, value = entry
            if expires_at < time.time():
                del self._items[key]
                return None
            return value

    def delete(self, key: str) -> None:
        with self._lock:
            self._items.pop(key, None)


client_store = ClientStore(config.MCP_OAUTH_CLIENTS_FILE)
pending_authorizations = TTLStore()  # keyed by an opaque "login_id"
authorization_codes = TTLStore()  # keyed by the issued authorization code
access_tokens = TTLStore()  # keyed by the issued access token
refresh_tokens = TTLStore()  # keyed by the issued refresh token
