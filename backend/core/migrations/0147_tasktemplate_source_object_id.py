from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0146_tasktemplate_source_aianalysisresult_evidence"),
    ]

    operations = [
        migrations.AddField(
            model_name="tasktemplate",
            name="source_object_id",
            field=models.UUIDField(
                blank=True,
                help_text="Primary object the task was created from (requirement assessment, applied control, or evidence)",
                null=True,
                verbose_name="Source object",
            ),
        ),
    ]
