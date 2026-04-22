from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0140_organizationcontext"),
    ]

    operations = [
        migrations.AddField(
            model_name="requirementnode",
            name="admin_notes",
            field=models.JSONField(
                blank=True,
                help_text=(
                    "Internal auditor/admin guidance attached to this requirement "
                    "(scope limits, accepted exceptions, interpretation hints). "
                    "Stored as a list of strings, loaded from the library and passed "
                    "to the AI analysis as authoritative auditor context."
                ),
                null=True,
                verbose_name="Admin notes",
            ),
        ),
    ]
