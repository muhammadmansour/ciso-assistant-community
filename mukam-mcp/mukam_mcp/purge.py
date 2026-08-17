"""Delete persisted OAuth state for the Mukam MCP server.

Only on-disk state can be removed here: the registered OAuth clients file.
Access/refresh tokens live in the running server's memory, so restart the
process to clear those.
"""

import os

from . import config


def main() -> None:
    path = os.path.abspath(config.MCP_OAUTH_CLIENTS_FILE)
    if os.path.exists(path):
        os.remove(path)
        print(f"Deleted stored OAuth clients: {path}")
    else:
        print(f"Nothing to delete (no file at {path})")
    print("Restart mukam-mcp to clear in-memory access/refresh tokens.")


if __name__ == "__main__":
    main()
