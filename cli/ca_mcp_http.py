"""
CISO Assistant MCP Server - Remote HTTP/OAuth entry point.

Run this (instead of `ca_mcp.py`) to expose the MCP server over HTTP with
OAuth 2.1 authorization, so it can be registered as a "custom connector" in
MCP clients that support remote servers.

See `mcp.md` for required environment variables and connector setup.
"""

from ca_mcp.http_server import run_http_server

if __name__ == "__main__":
    run_http_server()
