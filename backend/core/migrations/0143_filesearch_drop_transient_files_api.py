from django.db import migrations, models


class Migration(migrations.Migration):
    """Remove the transient Gemini Files API fields from FileSearchTable.

    The 48h-TTL ``gemini_file_id`` and its ``gemini_uploaded_at`` companion are
    no longer used: analysis now runs exclusively against the durable
    ``gemini_document_id`` (File Search Store document name), which never
    expires. Removing the obsolete columns keeps the schema minimal and lets us
    drop the now-unused supporting index.
    """

    dependencies = [
        ("core", "0142_filesearch_durable_document"),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name="filesearchtable",
            name="core_filese_gemini__0614d6_idx",
        ),
        migrations.RemoveField(
            model_name="filesearchtable",
            name="gemini_file_id",
        ),
        migrations.RemoveField(
            model_name="filesearchtable",
            name="gemini_uploaded_at",
        ),
        migrations.AlterField(
            model_name="filesearchtable",
            name="gemini_store_id",
            field=models.CharField(
                blank=True,
                default="",
                help_text="The File Search Store this document belongs to",
                max_length=255,
                verbose_name="Gemini File Search Store ID",
            ),
        ),
    ]
