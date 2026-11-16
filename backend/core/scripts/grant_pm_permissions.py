"""Poetry entry point: grant project-management access to a user by email."""

import os
import sys


def main() -> None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ciso_assistant.settings")

    from django.core.management import execute_from_command_line

    argv = ["manage.py", "grant_project_management_permissions"]
    args = sys.argv[1:]
    if not args:
        argv.extend(["--email", "admin@admin.com"])
    elif args[0] == "--help" or args[0] == "-h":
        argv.append("--help")
    elif args[0] != "--email" and "@" in args[0] and not args[0].startswith("-"):
        argv.extend(["--email", args[0], *args[1:]])
    else:
        argv.extend(args)

    execute_from_command_line(argv)