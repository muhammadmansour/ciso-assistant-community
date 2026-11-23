from django.db import migrations


def link_gap_follow_ups(apps, schema_editor):
    FindingsAssessment = apps.get_model("core", "FindingsAssessment")
    RequirementAssessment = apps.get_model("core", "RequirementAssessment")
    follow_ups = FindingsAssessment.objects.filter(
        source="requirement",
        source_object_id__isnull=False,
        compliance_assessment__isnull=True,
    )
    for follow_up in follow_ups:
        audit_id = (
            RequirementAssessment.objects.filter(id=follow_up.source_object_id)
            .values_list("compliance_assessment_id", flat=True)
            .first()
        )
        if audit_id:
            follow_up.compliance_assessment_id = audit_id
            follow_up.save(update_fields=["compliance_assessment"])


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0155_finding_requirement_assessment_and_audit"),
    ]

    operations = [
        migrations.RunPython(link_gap_follow_ups, migrations.RunPython.noop),
    ]
