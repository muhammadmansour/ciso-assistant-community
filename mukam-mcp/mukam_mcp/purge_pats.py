"""Delete Personal Access Tokens from the Muhkam/CISO Assistant backend.

Logs in with your Muhkam credentials, lists your PATs, and deletes the ones
minted by this MCP server (names starting with "mukam-mcp-"). Use --all to
delete every PAT, or --prefix to target a different name prefix.
"""

import argparse
import getpass
import os
import sys

import requests

from . import config


def _login(email: str, password: str) -> str:
    res = requests.post(
        f"{config.API_URL}/iam/login/",
        json={"username": email, "password": password},
        verify=config.VERIFY_CERTIFICATE,
        timeout=config.HTTP_TIMEOUT,
    )
    if res.status_code != 200:
        sys.exit("Login failed: invalid email or password.")
    token = res.json().get("token")
    if not token:
        sys.exit("Login succeeded but no session token was returned.")
    return token


def _list_pats(session_token: str) -> list[dict]:
    res = requests.get(
        f"{config.API_URL}/iam/auth-tokens/",
        headers={"Authorization": f"Token {session_token}"},
        verify=config.VERIFY_CERTIFICATE,
        timeout=config.HTTP_TIMEOUT,
    )
    res.raise_for_status()
    return res.json()


def _delete_pat(session_token: str, digest: str) -> bool:
    res = requests.delete(
        f"{config.API_URL}/iam/auth-tokens/{digest}/",
        headers={"Authorization": f"Token {session_token}"},
        verify=config.VERIFY_CERTIFICATE,
        timeout=config.HTTP_TIMEOUT,
    )
    return res.status_code in (200, 204)


def main() -> None:
    parser = argparse.ArgumentParser(description="Delete Muhkam Personal Access Tokens.")
    parser.add_argument("--email", default=os.getenv("MUKAM_MCP_EMAIL"))
    parser.add_argument(
        "--prefix",
        default="mukam-mcp-",
        help="Only delete PATs whose name starts with this.",
    )
    parser.add_argument("--all", action="store_true", help="Delete ALL PATs, ignoring --prefix.")
    parser.add_argument("--yes", action="store_true", help="Skip the confirmation prompt.")
    args = parser.parse_args()

    if not config.API_URL:
        sys.exit("API_URL is not configured (set it in the env file).")

    email = args.email or input("Muhkam email: ").strip()
    password = os.getenv("MUKAM_MCP_PASSWORD") or getpass.getpass("Muhkam password: ")

    session_token = _login(email, password)
    pats = _list_pats(session_token)

    targets = (
        pats if args.all else [p for p in pats if (p.get("name") or "").startswith(args.prefix)]
    )
    if not targets:
        print("No matching tokens to delete.")
        return

    print(f"About to delete {len(targets)} token(s):")
    for p in targets:
        print(f"  - {p.get('name')} (created {p.get('created')})")

    if not args.yes:
        if input("Proceed? [y/N] ").strip().lower() not in ("y", "yes"):
            print("Aborted.")
            return

    deleted = 0
    for p in targets:
        if _delete_pat(session_token, p["digest"]):
            deleted += 1
            print(f"Deleted {p.get('name')}")
        else:
            print(f"Failed to delete {p.get('name')}")
    print(f"Done. Deleted {deleted}/{len(targets)} token(s).")


if __name__ == "__main__":
    main()
