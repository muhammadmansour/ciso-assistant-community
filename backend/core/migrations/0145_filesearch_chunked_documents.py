from django.db import migrations, models


def populate_document_ids(apps, schema_editor):
    """Backfill gemini_document_ids from the legacy single-document field.

    Existing rows were uploaded as one whole document. Seed the new list with
    that id (when present and well-formed) and set chunk_count accordingly so
    they read as already-indexed single-chunk uploads.
    """
    FileSearchTable = apps.get_model("core", "FileSearchTable")
    for row in FileSearchTable.objects.all().iterator():
        doc = row.gemini_document_id or ""
        if doc.startswith("fileSearchStores/"):
            row.gemini_document_ids = [doc]
            row.chunk_count = 1
            row.save(update_fields=["gemini_document_ids", "chunk_count"])


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0144_policyviolation"),
    ]

    operations = [
        migrations.AddField(
            model_name="filesearchtable",
            name="gemini_document_ids",
            field=models.JSONField(
                blank=True,
                default=list,
                help_text=(
                    "All File Search Store document names for this revision. A large "
                    "PDF is split into overlapping page-range chunks at upload time and "
                    "each chunk becomes its own document in the SAME store, all tagged "
                    "with the same evidence_revision_id so retrieval (metadataFilter) "
                    "spans every chunk. A non-split upload stores a single id here."
                ),
                verbose_name="Gemini Store Document IDs",
            ),
        ),
        migrations.AddField(
            model_name="filesearchtable",
            name="chunk_count",
            field=models.PositiveIntegerField(
                default=0,
                help_text=(
                    "Number of File Search documents this revision was split into "
                    "(1 = uploaded whole, no splitting)."
                ),
                verbose_name="Chunk Count",
            ),
        ),
        migrations.RunPython(populate_document_ids, noop_reverse),
    ]
