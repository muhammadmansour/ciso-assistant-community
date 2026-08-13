"""The activity-log tool exposed by this server."""

import json

from . import client, config

ACTIONS = ("create", "update", "delete", "access", "login_failed")


def _ok(table: str, next_action: str) -> str:
    return (
        f"{table}\n\n"
        "[SUCCESS] get_user_activity_logs completed.\n"
        f"NEXT: {next_action}\n"
        "WARNING: Do not call this tool again with identical parameters.\n"
    )


def _fail(error_type: str, details: str, next_action: str, retry: bool = False) -> str:
    hint = (
        "HINT: You may retry with different parameters.\n"
        if retry
        else "WARNING: Do NOT retry - this request will fail again.\n"
    )
    return (
        f"[ERROR] {error_type}\n"
        f"Details: {details}\n\n"
        "[COMPLETED] Tool execution finished.\n"
        f"NEXT: {next_action}\n"
        f"{hint}"
    )


def _changed_fields(changes) -> str:
    if isinstance(changes, str):
        try:
            changes = json.loads(changes)
        except ValueError:
            return "--"
    if not isinstance(changes, dict) or not changes:
        return "--"

    names = list(changes.keys())
    summary = ", ".join(names[:5])
    if len(names) > 5:
        summary += f" (+{len(names) - 5} more)"
    return summary


async def get_user_activity_logs(
    user: str = None,
    action: str = None,
    object_type: str = None,
    since: str = None,
    until: str = None,
    limit: int = 50,
):
    """List user activity from the CISO Assistant audit log, newest first

    Records who created, updated or deleted what, plus failed sign-ins. Reads
    and page views are not recorded, so absence of an entry does not mean the
    user was inactive.

    Args:
        user: User email, full or partial (e.g. "khalid" or "khalid@example.com")
        action: One of create, update, delete, access, login_failed. Comma-separated for several.
        object_type: Type of object touched, e.g. "risk scenario", "applied control", "user"
        since: Only entries at or after this ISO date/time, e.g. "2026-08-01"
        until: Only entries at or before this ISO date/time, e.g. "2026-08-13"
        limit: Maximum number of entries to return (default 50, max 200)
    """
    try:
        params = {"ordering": "-timestamp"}
        described = {}

        if user:
            params["user"] = user
            described["user"] = user

        if action:
            names = [
                part.strip().lower().replace(" ", "_").replace("-", "_")
                for part in action.split(",")
                if part.strip()
            ]
            unknown = [name for name in names if name not in ACTIONS]
            if unknown:
                return _fail(
                    "Invalid Input",
                    f"Unknown action(s): {', '.join(unknown)}",
                    f"Retry using one or more of: {', '.join(ACTIONS)}",
                    retry=True,
                )
            params["action"] = ",".join(names)
            described["action"] = params["action"]

        if object_type:
            params["object_type"] = object_type
            described["object_type"] = object_type

        if since:
            params["since"] = since
            described["since"] = since

        if until:
            params["until"] = until
            described["until"] = until

        try:
            requested = int(limit)
        except (TypeError, ValueError):
            requested = 50
        params["limit"] = max(1, min(requested, config.MAX_ENTRIES))

        res = client.get("/activity-logs/", params=params)

        if res.status_code == 401:
            return _fail(
                "Authentication Failed",
                "The configured API token is invalid or expired",
                "Tell the user to refresh the TOKEN in the mukam-mcp .env file",
            )
        if res.status_code == 403:
            return _fail(
                "Permission Denied",
                "Reading the audit log requires administrator privileges",
                "Tell the user the configured token's account needs the administrator role",
            )
        if res.status_code == 404:
            return _fail(
                "Not Found",
                "The /activity-logs/ endpoint does not exist on this CISO Assistant instance",
                "Tell the user the backend needs the activity-log endpoint deployed",
            )
        if res.status_code == 400:
            return _fail(
                "Invalid Input",
                res.text[:300],
                "Check the date format (use ISO, e.g. 2026-08-01) and retry",
                retry=True,
            )
        if res.status_code != 200:
            return _fail(
                f"HTTP {res.status_code}",
                res.text[:300],
                "Report this error to the user",
            )

        payload = res.json()
        entries = client.results_of(payload)

        applied = (
            f" ({', '.join(f'{k}={v}' for k, v in described.items())})" if described else ""
        )

        if not entries:
            return (
                f"[RESULT] No activity log entries found{applied}.\n\n"
                "[SUCCESS] Search completed (0 results).\n"
                "This is a valid result, not an error.\n"
                "NEXT: Tell the user no recorded activity matches, and note that "
                "read-only actions such as viewing pages are never recorded.\n"
                "WARNING: Do not repeat the same search.\n"
            )

        table = f"Found {len(entries)} activity log entries{applied}\n\n"
        table += "|Timestamp|User|Action|Object Type|Object|Folder|Changed Fields|\n"
        table += "|---|---|---|---|---|---|---|\n"

        for entry in entries:
            timestamp = (entry.get("timestamp") or "N/A")[:19].replace("T", " ")
            table += (
                f"|{timestamp}"
                f"|{entry.get('user') or '--'}"
                f"|{entry.get('action') or 'N/A'}"
                f"|{entry.get('object_type') or 'N/A'}"
                f"|{(entry.get('object_repr') or '--')[:60]}"
                f"|{entry.get('folder') or '--'}"
                f"|{_changed_fields(entry.get('changes'))}|\n"
            )

        total = payload.get("count") if isinstance(payload, dict) else None
        if total is not None and total > len(entries):
            table += f"\nShowing {len(entries)} of {total} matching entries.\n"

        return _ok(
            table,
            "Use this table to answer the user's question about who did what and when",
        )
    except Exception as exc:  # noqa: BLE001 - a tool must always return a string
        return _fail("Internal Error", str(exc), "Report this error to the user")
