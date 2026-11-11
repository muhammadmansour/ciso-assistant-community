import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0149_increase_finding_name_max_length"),
    ]

    operations = [
        migrations.AddField(
            model_name="finding",
            name="asset",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="findings",
                to="core.asset",
                verbose_name="Asset",
            ),
        ),
        migrations.AddField(
            model_name="finding",
            name="requirement_node",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="findings",
                to="core.requirementnode",
                verbose_name="Requirement",
            ),
        ),
        migrations.AlterField(
            model_name="findingsassessment",
            name="category",
            field=models.CharField(
                choices=[
                    ("--", "Undefined"),
                    ("pentest", "Pentest"),
                    ("audit", "Audit"),
                    ("self_identified", "Self-identified"),
                    ("posture", "Posture follow-up"),
                ],
                default="--",
                max_length=32,
                verbose_name="Category",
            ),
        ),
    ]
