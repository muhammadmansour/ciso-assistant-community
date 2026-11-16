from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("doc_management", "0009_published_read_permission"),
    ]

    operations = [
        migrations.AddField(
            model_name="documentattachment",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="documentcontainer",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="documentedit",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="documentreference",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="documentrevision",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="documenttemplate",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
        migrations.AddField(
            model_name="manageddocument",
            name="is_published",
            field=models.BooleanField(default=False, verbose_name="published"),
        ),
    ]
