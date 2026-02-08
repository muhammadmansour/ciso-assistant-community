# Generated migration for AppliedControl AI analysis fields
# Made safe to handle pre-existing columns (idempotent)

from django.db import migrations, models


def add_columns_if_not_exist(apps, schema_editor):
    """Safely add columns that may already exist in the database."""
    from django.db import connection

    with connection.cursor() as cursor:
        if connection.vendor == 'postgresql':
            cursor.execute(
                "SELECT column_name FROM information_schema.columns "
                "WHERE table_name = 'core_appliedcontrol'"
            )
            existing = {row[0] for row in cursor.fetchall()}
        else:  # sqlite
            cursor.execute("PRAGMA table_info(core_appliedcontrol)")
            existing = {row[1] for row in cursor.fetchall()}

        if 'ai_analysis' not in existing:
            if connection.vendor == 'postgresql':
                cursor.execute(
                    'ALTER TABLE "core_appliedcontrol" ADD COLUMN "ai_analysis" jsonb NULL'
                )
            else:
                cursor.execute(
                    'ALTER TABLE "core_appliedcontrol" ADD COLUMN "ai_analysis" text NULL'
                )

        if 'ai_analysis_updated_at' not in existing:
            if connection.vendor == 'postgresql':
                cursor.execute(
                    'ALTER TABLE "core_appliedcontrol" ADD COLUMN "ai_analysis_updated_at" '
                    'timestamp with time zone NULL'
                )
            else:
                cursor.execute(
                    'ALTER TABLE "core_appliedcontrol" ADD COLUMN "ai_analysis_updated_at" '
                    'datetime NULL'
                )


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0134_filesearchtable'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.AddField(
                    model_name='appliedcontrol',
                    name='ai_analysis',
                    field=models.JSONField(
                        blank=True,
                        help_text='AI-generated analysis results from Muraji API',
                        null=True,
                        verbose_name='AI Analysis',
                    ),
                ),
                migrations.AddField(
                    model_name='appliedcontrol',
                    name='ai_analysis_updated_at',
                    field=models.DateTimeField(
                        blank=True,
                        help_text='When the AI analysis was last performed',
                        null=True,
                        verbose_name='AI Analysis Updated At',
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
