from django.apps import AppConfig
from django.db.models.signals import post_migrate
import os

from .startup import startup


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
    verbose_name = "Core"

    def ready(self):
        self._require_postgres_search_path_schema()

        # This import runs the @webhook_registry.register decorator
        import core.webhooks

        # avoid post_migrate handler if we are in the main, as it interferes with restore
        if not os.environ.get("RUN_MAIN"):
            post_migrate.connect(startup, sender=self)

    def _require_postgres_search_path_schema(self):
        """Fail fast if POSTGRES_SEARCH_PATH names a schema that does not exist (avoids silent fallback to public)."""
        from django.conf import settings as dj_settings

        db = dj_settings.DATABASES.get("default") or {}
        if db.get("ENGINE") != "django.db.backends.postgresql_psycopg2":
            return
        sp = (os.environ.get("POSTGRES_SEARCH_PATH") or "").strip().strip("'\"")
        if not sp:
            return
        try:
            from django.db import connection

            connection.ensure_connection()
        except Exception:
            return
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT 1 FROM information_schema.schemata WHERE schema_name = %s",
                [sp],
            )
            if cursor.fetchone() is not None:
                return
        from ciso_assistant.settings import _postgres_schema_sql_ident
        from django.core.exceptions import ImproperlyConfigured

        db_name = os.environ.get("POSTGRES_NAME", "")
        pg_user = os.environ.get("POSTGRES_USER", "")
        try:
            sp_sql = _postgres_schema_sql_ident(sp)
        except ValueError:
            sp_sql = sp
        if pg_user:
            try:
                auth_sql = f" AUTHORIZATION {_postgres_schema_sql_ident(pg_user)}"
            except ValueError:
                auth_sql = f' AUTHORIZATION "{pg_user}"'
        else:
            auth_sql = ""
        raise ImproperlyConfigured(
            f"PostgreSQL schema {sp!r} does not exist (database name is {db_name!r}; they are not the same). "
            "PostgreSQL skips missing schemas in search_path and then uses public — which causes "
            '"permission denied for schema public". Create the schema first, for example:\n'
            f'  sudo -u postgres psql -d "{db_name}" -c \'CREATE SCHEMA IF NOT EXISTS {sp_sql}{auth_sql};\'\n'
            "Or set POSTGRES_SEARCH_PATH to match a schema you already created (e.g. grc-stage vs grc_stage)."
        )
