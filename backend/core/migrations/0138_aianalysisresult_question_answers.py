# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0137_aianalysisresult_requirement_assessment'),
    ]

    operations = [
        migrations.AddField(
            model_name='aianalysisresult',
            name='question_answers',
            field=models.JSONField(
                blank=True,
                null=True,
                verbose_name='Question Answers',
                help_text='Extracted question answers (Yes/No/Partial) stored separately from the AI response body',
            ),
        ),
    ]
