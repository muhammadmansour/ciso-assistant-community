# Generated manually for GenericCollection ↔ TaskTemplate M2M

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0154_objectclassification_and_doc_prereqs"),
        ("pmbok", "0005_genericcollection_documents_and_controls"),
    ]

    operations = [
        migrations.AddField(
            model_name="genericcollection",
            name="task_templates",
            field=models.ManyToManyField(blank=True, to="core.tasktemplate"),
        ),
    ]
