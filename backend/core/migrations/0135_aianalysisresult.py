import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0134_filesearchtable"),
    ]

    operations = [
        migrations.CreateModel(
            name="AiAnalysisResult",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True,
                        verbose_name="Created at",
                    ),
                ),
                (
                    "applied_control",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="ai_analyses",
                        to="core.appliedcontrol",
                        verbose_name="Applied Control",
                    ),
                ),
                (
                    "result",
                    models.JSONField(
                        verbose_name="Analysis Result",
                        help_text="The full JSON result from the AI analysis",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        default="completed",
                        max_length=50,
                        verbose_name="Status",
                    ),
                ),
                (
                    "score",
                    models.IntegerField(
                        blank=True,
                        null=True,
                        verbose_name="Compliance Score",
                        help_text="Overall compliance score (0-100)",
                    ),
                ),
                (
                    "compliance_status",
                    models.CharField(
                        blank=True,
                        default="",
                        max_length=50,
                        verbose_name="Compliance Status",
                    ),
                ),
                (
                    "model_used",
                    models.CharField(
                        blank=True,
                        default="",
                        max_length=100,
                        verbose_name="AI Model Used",
                    ),
                ),
                (
                    "gemini_files_count",
                    models.IntegerField(
                        default=0,
                        verbose_name="Gemini Files Used",
                    ),
                ),
                (
                    "requirements_count",
                    models.IntegerField(
                        default=0,
                        verbose_name="Requirements Evaluated",
                    ),
                ),
                (
                    "error_message",
                    models.TextField(
                        blank=True,
                        null=True,
                        verbose_name="Error Message",
                    ),
                ),
            ],
            options={
                "verbose_name": "AI Analysis Result",
                "verbose_name_plural": "AI Analysis Results",
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(
                        fields=["applied_control", "-created_at"],
                        name="core_aianal_applied_idx",
                    ),
                ],
            },
        ),
    ]
