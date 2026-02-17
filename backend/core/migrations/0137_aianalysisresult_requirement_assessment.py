# Generated manually

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0136_rename_core_aianal_applied_idx_core_aianal_applied_6d43b6_idx_and_more'),
    ]

    operations = [
        # Make applied_control nullable (was required before)
        migrations.AlterField(
            model_name='aianalysisresult',
            name='applied_control',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='ai_analyses',
                to='core.appliedcontrol',
                verbose_name='Applied Control',
            ),
        ),
        # Add requirement_assessment FK
        migrations.AddField(
            model_name='aianalysisresult',
            name='requirement_assessment',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='ai_analyses',
                to='core.requirementassessment',
                verbose_name='Requirement Assessment',
            ),
        ),
    ]
