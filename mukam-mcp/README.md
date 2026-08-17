# mukam-mcp

A single-purpose MCP server exposing `get_user_activity_logs` from the Muhkam
/ CISO Assistant audit log.

It is separate from `cli/ca_mcp`, which exposes the full GRC toolset. Callers
**sign in on a login page** (OAuth). The server then mints a Personal Access
Token for that user — the same pattern as `cli/ca_mcp_http.py`. A static
`TOKEN` in `.env` is not required.

Reading the audit log still requires an **administrator** Muhkam account.

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/)
- A Muhkam instance serving `GET /api/activity-logs/`
- `MUKAM_MCP_PUBLIC_URL` set to the public HTTPS origin

## Setup

```bash
cd mukam-mcp
cp .env.example .env
# set API_URL and MUKAM_MCP_PUBLIC_URL; leave TOKEN empty
uv run server.py
```

The server listens on `127.0.0.1:8282` and is mounted at `MUKAM_MCP_PATH`
(default `/mukam-mcp`):

| Path | Role |
|---|---|
| `/mukam-mcp/mcp` | Streamable HTTP MCP endpoint (use this URL in Cursor) |
| `/mukam-mcp/login` | Sign-in page (opened by the OAuth flow) |

## nginx (same host as CISO MCP)

CISO MCP stays on port 8181 (`/mcp`, `/wathbah/login`). Proxy the whole
`/mukam-mcp` prefix to 8282 so OAuth metadata and the login page stay on this
process:

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

Set `MUKAM_MCP_PUBLIC_URL` to the origin only, e.g.
`https://muhkam-grc.wathbah.dev`. Do not reuse `cli/.mcp.env` — that file's
port is 8181 and would collide with CISO MCP.

## PM2

```bash
pm2 start uv --name muhkam-mcp --cwd /home/USER/ciso-assistant-community/mukam-mcp --interpreter none -- run server.py
pm2 save
```

## Cursor

```json
"muhkam": {
  "url": "https://muhkam-grc.wathbah.dev/mukam-mcp/mcp"
}
```

On first use, Cursor opens the Muhkam sign-in page. Use an administrator
account.

## The tool

`get_user_activity_logs(user, action, object_type, since, until, limit)`

| Argument | Meaning |
|---|---|
| `user` | Email, full or partial |
| `action` | `create`, `update`, `delete`, `access`, `login_failed` |
| `object_type` | e.g. `risk scenario`, `applied control`, `user` |
| `since` / `until` | ISO date or datetime bounds |
| `limit` | Default 50, capped by `MUKAM_MCP_MAX_ENTRIES` (200) |

## Limits

- Reads are not recorded. Empty results mean no tracked *changes*.
- Retention is bounded by `AUDITLOG_RETENTION_DAYS` / `AUDITLOG_MAX_RECORDS`.
- Some entries have no user (management commands, scheduled tasks).
