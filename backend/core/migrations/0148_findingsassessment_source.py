from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0147_tasktemplate_source_object_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="findingsassessment",
            name="source",
            field=models.CharField(
                blank=True,
                choices=[
                    ("requirement", "Requirement analysis"),
                    ("control", "Control analysis"),
                    ("evidence", "Evidence analysis"),
                ],
                default="",
                help_text="Analysis type that created this follow-up",
                max_length=20,
                verbose_name="Source",
            ),
        ),
        migrations.AddField(
            model_name="findingsassessment",
            name="source_object_id",
            field=models.UUIDField(
                blank=True,
                help_text="Primary object the follow-up was created from (requirement assessment, applied control, or evidence)",
                null=True,
                verbose_name="Source object",
            ),
        ),
    ]
