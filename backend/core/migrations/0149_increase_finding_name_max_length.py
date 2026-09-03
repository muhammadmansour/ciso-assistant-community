from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0148_findingsassessment_source"),
    ]

    operations = [
        migrations.AlterField(
            model_name="findingsassessment",
            name="name",
            field=models.CharField(max_length=1000, verbose_name="Name"),
        ),
        migrations.AlterField(
            model_name="finding",
            name="name",
            field=models.CharField(max_length=1000, verbose_name="Name"),
        ),
    ]
