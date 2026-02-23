from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0138_aianalysisresult_question_answers"),
    ]

    operations = [
        migrations.AddField(
            model_name="requirementassessment",
            name="ai_analysis_data",
            field=models.JSONField(
                blank=True,
                help_text="Stores the complete AI analysis output including raw JSON, analysis run ID, model version, timestamp, and source metadata.",
                null=True,
                verbose_name="AI Analysis Data",
            ),
        ),
    ]
