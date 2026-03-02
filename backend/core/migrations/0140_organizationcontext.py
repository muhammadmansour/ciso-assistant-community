import django.db.models.deletion
import uuid
from django.db import migrations, models
import iam.models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0139_requirementassessment_ai_analysis_data"),
        ("iam", "0017_alter_folder_is_published"),
    ]

    operations = [
        migrations.CreateModel(
            name="OrganizationContext",
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
                        auto_now_add=True, verbose_name="Created at"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Updated at"),
                ),
                (
                    "is_published",
                    models.BooleanField(default=False, verbose_name="published"),
                ),
                (
                    "name",
                    models.CharField(max_length=200, verbose_name="Name (EN)"),
                ),
                (
                    "name_ar",
                    models.CharField(
                        blank=True,
                        default="",
                        max_length=200,
                        verbose_name="Name (AR)",
                    ),
                ),
                (
                    "sector",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("financial", "Financial"),
                            ("government", "Government"),
                            ("healthcare", "Healthcare"),
                            ("energy", "Energy"),
                            ("telecommunications", "Telecommunications"),
                            ("education", "Education"),
                            ("retail", "Retail"),
                            ("technology", "Technology"),
                            ("manufacturing", "Manufacturing"),
                            ("other", "Other"),
                        ],
                        default="",
                        max_length=50,
                        verbose_name="Sector",
                    ),
                ),
                (
                    "size",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("small", "Small"),
                            ("medium", "Medium"),
                            ("large", "Large"),
                            ("enterprise", "Enterprise"),
                        ],
                        default="",
                        max_length=20,
                        verbose_name="Size",
                    ),
                ),
                (
                    "geographic_scope",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("saudi_arabia", "Saudi Arabia"),
                            ("gcc", "GCC"),
                            ("middle_east_africa", "Middle East & Africa"),
                            ("global", "Global"),
                            ("regional", "Regional"),
                            ("local", "Local"),
                        ],
                        default="",
                        max_length=50,
                        verbose_name="Geographic Scope",
                    ),
                ),
                (
                    "maturity_level",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("initial", "Initial"),
                            ("developing", "Developing"),
                            ("defined", "Defined"),
                            ("managed", "Managed"),
                            ("optimizing", "Optimizing"),
                        ],
                        default="",
                        max_length=20,
                        verbose_name="Maturity Level",
                    ),
                ),
                (
                    "regulatory_obligations",
                    models.JSONField(
                        blank=True,
                        default=list,
                        verbose_name="Regulatory Obligations",
                    ),
                ),
                (
                    "notes",
                    models.TextField(blank=True, default="", verbose_name="Notes"),
                ),
                (
                    "folder",
                    models.ForeignKey(
                        default=iam.models.Folder.get_root_folder_id,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="%(class)s_folder",
                        to="iam.folder",
                    ),
                ),
            ],
            options={
                "verbose_name": "Organization Context",
                "verbose_name_plural": "Organization Contexts",
                "ordering": ["name"],
            },
        ),
    ]
