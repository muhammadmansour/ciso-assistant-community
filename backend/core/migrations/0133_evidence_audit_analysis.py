# Generated migration for audit_analysis fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0132_evidence_ai_analysis'),
    ]

    operations = [
        migrations.AddField(
            model_name='evidence',
            name='audit_analysis',
            field=models.JSONField(blank=True, help_text='AI-generated audit compliance analysis results', null=True, verbose_name='Audit Analysis'),
        ),
        migrations.AddField(
            model_name='evidence',
            name='audit_analysis_updated_at',
            field=models.DateTimeField(blank=True, help_text='When the audit analysis was last performed', null=True, verbose_name='Audit Analysis Updated At'),
        ),
    ]
