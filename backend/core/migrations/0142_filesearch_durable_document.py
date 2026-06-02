from django.db import migrations, models


class Migration(migrations.Migration):
    """Add durable Gemini File Search Store document reference + Files API freshness tracking.

    Why:
    The `gemini_file_id` from Gemini's Files API expires after 48h, leaving the stored ID
    pointing to a missing resource. File Search Store *documents* don't expire — they live
    until explicitly deleted — so we add `gemini_document_id` as the durable identifier
    of "this evidence has been indexed for AI".

    `gemini_uploaded_at` is added to track when the (still-used, transient) Files API ID
    was last refreshed, so we can lazily re-upload it when it's about to expire.
    """

    dependencies = [
        ("core", "0141_requirementnode_admin_notes"),
    ]

    operations = [
        migrations.AddField(
            model_name="filesearchtable",
            name="gemini_document_id",
            field=models.CharField(
                blank=True,
                default="",
                help_text=(
                    "Durable File Search Store document name "
                    "(fileSearchStores/<store>/documents/<doc-id>). "
                    "Unlike Files API IDs, store documents do not expire."
                ),
                max_length=512,
                verbose_name="Gemini Store Document ID",
            ),
        ),
        migrations.AddField(
            model_name="filesearchtable",
            name="gemini_uploaded_at",
            field=models.DateTimeField(
                blank=True,
                null=True,
                help_text=(
                    "When `gemini_file_id` (Files API, transient) was last refreshed. "
                    "Files API IDs expire ~48h after upload — we re-upload before then."
                ),
                verbose_name="Files API Last Upload",
            ),
        ),
        migrations.AddIndex(
            model_name="filesearchtable",
            index=models.Index(
                fields=["gemini_document_id"],
                name="core_filese_gemini__idx",
            ),
        ),
    ]
