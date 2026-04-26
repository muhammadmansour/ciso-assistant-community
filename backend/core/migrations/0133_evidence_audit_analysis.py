# Generated migration for audit_analysis fields
# Made safe to handle pre-existing columns (idempotent)

from django.db import migrations, models


def add_columns_if_not_exist(apps, schema_editor):
    """Safely add columns that may already exist in the database."""
    from django.db import connection

    with connection.cursor() as cursor:
        # Get existing columns for core_evidence table
        if connection.vendor == 'postgresql':
            cursor.execute(
                "SELECT column_name FROM information_schema.columns "
                "WHERE table_name = 'core_evidence'"
            )
            existing = {row[0] for row in cursor.fetchall()}
        else:  # sqlite
            cursor.execute("PRAGMA table_info(core_evidence)")
            existing = {row[1] for row in cursor.fetchall()}

        if 'audit_analysis' not in existing:
            if connection.vendor == 'postgresql':
                cursor.execute(
                    'ALTER TABLE "core_evidence" ADD COLUMN "audit_analysis" jsonb NULL'
                )
            else:
                cursor.execute(
                    'ALTER TABLE "core_evidence" ADD COLUMN "audit_analysis" text NULL'
                )

        if 'audit_analysis_updated_at' not in existing:
            if connection.vendor == 'postgresql':
                cursor.execute(
                    'ALTER TABLE "core_evidence" ADD COLUMN "audit_analysis_updated_at" '
                    'timestamp with time zone NULL'
                )
            else:
                cursor.execute(
                    'ALTER TABLE "core_evidence" ADD COLUMN "audit_analysis_updated_at" '
                    'datetime NULL'
                )


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0132_evidence_ai_analysis'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.AddField(
                    model_name='evidence',
                    name='audit_analysis',
                    field=models.JSONField(
                        blank=True,
                        help_text='AI-generated audit compliance analysis results',
                        null=True,
                        verbose_name='Audit Analysis',
                    ),
                ),
                migrations.AddField(
                    model_name='evidence',
                    name='audit_analysis_updated_at',
                    field=models.DateTimeField(
                        blank=True,
                        help_text='When the audit analysis was last performed',
                        null=True,
                        verbose_name='Audit Analysis Updated At',
                    ),
                ),
            ],
            database_operations=[
                migrations.RunPython(
                    add_columns_if_not_exist,
                    migrations.RunPython.noop,
                ),
            ],
        ),
    ]
