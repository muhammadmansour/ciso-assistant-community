import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0143_filesearch_drop_transient_files_api"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="PolicyViolation",
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
                    models.DateTimeField(auto_now_add=True, verbose_name="Created at"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Updated at"),
                ),
                ("name", models.CharField(max_length=200, verbose_name="Name")),
                (
                    "description",
                    models.TextField(blank=True, null=True, verbose_name="Description"),
                ),
                (
                    "severity",
                    models.SmallIntegerField(
                        choices=[
                            (-1, "undefined"),
                            (0, "info"),
                            (1, "low"),
                            (2, "medium"),
                            (3, "high"),
                            (4, "critical"),
                        ],
                        default=2,
                        verbose_name="Severity",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("open", "Open"),
                            ("acknowledged", "Acknowledged"),
                            ("resolved", "Resolved"),
                            ("dismissed", "Dismissed"),
                        ],
                        default="open",
                        max_length=20,
                        verbose_name="Status",
                    ),
                ),
                (
                    "detected_at",
                    models.DateTimeField(
                        default=django.utils.timezone.now,
                        verbose_name="Detected at",
                    ),
                ),
                (
                    "source",
                    models.CharField(
                        blank=True,
                        default="manual",
                        help_text="Origin of the violation event (manual, siem, dlp, …)",
                        max_length=100,
                        verbose_name="Source",
                    ),
                ),
                (
                    "detected_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="reported_policy_violations",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Detected by",
                    ),
                ),
                (
                    "folder",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="%(class)s_folder",
                        to="core.folder",
                    ),
                ),
                (
                    "policy",
                    models.ForeignKey(
                        limit_choices_to={"category": "policy"},
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="violations",
                        to="core.appliedcontrol",
                        verbose_name="Policy",
                    ),
                ),
            ],
            options={
                "verbose_name": "Policy violation",
                "verbose_name_plural": "Policy violations",
                "ordering": ["-detected_at"],
            },
        ),
    ]
