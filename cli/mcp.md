## Claude Desktop

Note: MCP technology is still maturing so the instructions might vary.

### prerequisites

- python 3.12
- uv
- node
- Claude Desktop (other mcp clients should work but were not tested)

### instructions

1. Login to CISO Assistant and generate a PAT: click on the three dots next to the email -> my profile -> settings
2. Under the `cli` folder, copy the `.mcp.env.example` as `.mcp.env`
3. Under the `cli` folder, update the copied `.mcp.env` with your credentials
4. Update the settings of mcpServers of your Claude Desktop app. The path will vary depending on your OS. On MacOS it's under `~/Library/Application\ Support/Claude/claude_desktop_config.json`. Make sure to put the **full absolute paths** for `uv` binary and the `cli` folder of your cloned repo

Here is a sample:

```json
{
  "mcpServers": {
    "ciso-assistant": {
      "command": "/Users/abder/.cargo/bin/uv",
      "args": [
        "--directory",
        "/Users/abder/mydev/ituitem/ciso-assistant-community/cli",
        "run",
        "ca_mcp.py"
      ]
    }
  }
}
```

4. make sure to kill and restart Claude Desktop app to apply the settings
5. Start a new chat and if the settings are correct, you should see `ciso-assistant` under the chat extensions. You will see a count of the supported `tools` which reflect the currently supported data feeds from the app.

<img width="1538" alt="image" src="https://github.com/user-attachments/assets/1345eb19-3f5e-4a0c-8abe-dae5a86dd59a" />


6. You can now chat with your data, either by mentioning some keywords like applied controls or risks, or explicitly asking about ciso assistant.

## Remote server / "Custom Connector" (OAuth)

The setup above runs `ca_mcp.py` as a **local stdio process**: Claude Desktop starts it directly on your machine, using a single static Personal Access Token (PAT) from `.mcp.env`. That's why it can't be added via Claude's "Add custom connector" UI - that feature is for **remote** MCP servers reachable over HTTPS, which authenticate each user through OAuth rather than a config file.

To support that, this repo also ships `ca_mcp_http.py`, a remote HTTP transport with a built-in OAuth 2.1 authorization server. Instead of redirecting to a third-party identity provider, it presents a small login page backed by CISO Assistant's own email/password login, and mints a per-user PAT behind the scenes once you sign in - so every tool call is attributed to the actual user, not a shared token.

### Deploying `ca_mcp_http.py`

1. This must run somewhere reachable over **HTTPS** with a stable public URL (OAuth requires TLS and Claude will call back to this URL). A small VM/container behind a reverse proxy (nginx/Caddy) that terminates TLS and forwards to the app works well.
2. Set these in `.mcp.env` (in addition to `API_URL` / `VERIFY_CERTIFICATE`):

```
MCP_PUBLIC_URL=https://mcp.yourdomain.com
MCP_HTTP_HOST=0.0.0.0
MCP_HTTP_PORT=8181
MCP_PAT_EXPIRY_DAYS=30
```

`TOKEN` is not used by this transport (it's only for the stdio server) - each connecting user gets their own PAT after logging in.

3. Run it:

```bash
uv run ca_mcp_http.py
```

Point your reverse proxy at `127.0.0.1:${MCP_HTTP_PORT}` and expose it at `MCP_PUBLIC_URL`.

4. In Claude, use **Settings -> Connectors -> Add custom connector** and enter `https://mcp.yourdomain.com/mcp` as the server URL. Claude will register itself automatically (dynamic client registration), redirect you to the CISO Assistant sign-in page hosted by this server, and complete the OAuth flow after you log in.

### Notes / limitations

- Registered OAuth client metadata is persisted to `cli/.oauth_clients.json` (gitignored) so Claude doesn't need to re-register on every restart.
- Authorization codes and access/refresh tokens are kept in memory only; restarting the server requires users to re-authorize.
- Each authorization mints a new Personal Access Token on the user's CISO Assistant account (named `mcp-connector-<timestamp>`, visible/removable under *my profile -> settings*). CISO Assistant limits the number of active tokens per user, so occasionally pruning old ones may be necessary.
