# mukam-mcp

A single-purpose MCP server exposing one tool: `get_user_activity_logs`, which
reads user activity from the CISO Assistant audit log.

It is deliberately separate from `cli/ca_mcp`, which exposes the full GRC
toolset. Keeping the audit trail in its own server means it can be deployed,
restarted, and access-controlled on its own — useful because reading it requires
an administrator token, while most GRC tools do not.

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/)
- A CISO Assistant instance serving `GET /api/activity-logs/`
- A Personal Access Token belonging to an **administrator** account

## Setup

```bash
cd mukam-mcp
cp .env.example .env
# fill in API_URL and TOKEN
uv run server.py
```

Config is read from the environment first, then from an env file: whatever
`MUKAM_MCP_ENV_FILE` points at, else the first of `.env` or `.mcp.env` present.
`MCP_HTTP_HOST`, `MCP_HTTP_PORT` and `MCP_PUBLIC_URL` are accepted as fallbacks
for their `MUKAM_MCP_*` equivalents, so the `cli/.mcp.env` from the OAuth server
drives this one too once a `TOKEN` is added:

```bash
uv run --env-file ../cli/.mcp.env server.py    # or MUKAM_MCP_ENV_FILE=../cli/.mcp.env
```

Reusing that file means reusing its port, so only one of the two servers can run
at a time. To run both, give this one its own port and path (see below).

The server listens on `MUKAM_MCP_HOST:MUKAM_MCP_PORT` (default
`127.0.0.1:8282`) and speaks streamable HTTP at `MUKAM_MCP_PATH` (default
`/mcp`).

## Deploying behind a reverse proxy

The server does not authenticate its callers — anyone who can reach the port can
read the audit log with the configured admin token. Bind it to localhost and
terminate TLS in front of it, restricting access there.

It can share a hostname with the OAuth MCP server in `cli/`, which already
answers on `/mcp`. Give this one its own path with `MUKAM_MCP_PATH=/mukam-mcp`
so nginx passes the prefix straight through without rewriting:

```nginx
location /mukam-mcp {
    proxy_pass http://127.0.0.1:8282;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_read_timeout 300s;
}
```

Set `MUKAM_MCP_PUBLIC_URL` to the public origin, otherwise FastMCP's
DNS-rebinding protection rejects proxied requests with HTTP 421 — it trusts only
localhost `Host` headers by default.

Under pm2:

```bash
pm2 start "uv run server.py" --name mukam-mcp --cwd /path/to/mukam-mcp
```

## The tool

`get_user_activity_logs(user, action, object_type, since, until, limit)`

| Argument | Meaning |
|---|---|
| `user` | Email, full or partial. Also matches entries whose actor was not resolved. |
| `action` | `create`, `update`, `delete`, `access`, `login_failed`. Comma-separated for several. |
| `object_type` | Object type touched, e.g. `risk scenario`, `applied control`, `user` |
| `since` / `until` | ISO date or datetime bounds |
| `limit` | Rows to return, default 50, capped by `MUKAM_MCP_MAX_ENTRIES` (200) |

Returns a markdown table of timestamp, user, action, object type, object,
folder, and which fields changed.

## Limits worth knowing

- **Reads are not recorded.** Only create/update/delete, plus failed sign-ins.
  An empty result means no *tracked changes*, not that the user was inactive.
- **Retention is bounded.** The backend prunes entries older than
  `AUDITLOG_RETENTION_DAYS` (90 by default) and caps the table at
  `AUDITLOG_MAX_RECORDS`.
- **Some entries have no user.** Changes made outside a request — management
  commands, scheduled tasks, imports — are recorded without an actor and cannot
  be attributed.
- **Passwords are redacted** by the backend before they reach this server.
