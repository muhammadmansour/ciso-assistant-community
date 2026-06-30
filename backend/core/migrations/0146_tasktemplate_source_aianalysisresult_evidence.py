from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0145_filesearch_chunked_documents"),
    ]

    operations = [
        migrations.AddField(
            model_name="tasktemplate",
            name="source",
            field=models.CharField(
                blank=True,
                choices=[
                    ("requirement", "Requirement analysis"),
                    ("control", "Control analysis"),
                    ("evidence", "Evidence analysis"),
                ],
                default="",
                help_text="Analysis type that created this task",
                max_length=20,
                verbose_name="Source",
            ),
        ),
        migrations.AddField(
            model_name="aianalysisresult",
            name="evidence",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ai_analyses",
                to="core.evidence",
                verbose_name="Evidence",
            ),
        ),
        migrations.AddIndex(
            model_name="aianalysisresult",
            index=models.Index(
                fields=["evidence", "-created_at"],
                name="core_aianal_evidence_idx",
            ),
        ),
    ]
