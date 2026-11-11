"""One run per user action and object, and the bulk writes that used to reach
neither the audit trail nor the events."""

import uuid

import pytest
from auditlog.cid import correlation_id

from core.models import AppliedControl, ComplianceAssessment, Framework, Perimeter
from core.models import RequirementAssessment, RequirementNode
from iam.models import Folder
from automation.workflows.events import dispatch_internal_event, payload_from_log_entry
from automation.workflows.models import WorkflowInstance, WorkflowTrigger
from automation.workflows.tests.test_event_triggers import (  # noqa: F401
    capture_runs,
    get_registration,
    make_workflow,
    payload,
)


SAME_OBJECT = str(uuid.uuid4())


def event(cid=None, object_id=SAME_OBJECT, **kwargs):
    body = payload(object_id=object_id, **kwargs)
    body["cid"] = cid or ""
    return body


@pytest.mark.django_db
class TestCorrelationCoalescing:
    def test_one_object_in_one_user_action_starts_one_run(self, capture_runs):
        workflow = make_workflow()
        cid = str(uuid.uuid4())
        first = dispatch_internal_event("appliedcontrol.updated", event(cid), None)
        rest = [
            dispatch_internal_event("appliedcontrol.updated", event(cid), None)
            for _ in range(5)
        ]
        assert len(first) == 1
        assert all(started == [] for started in rest)
        assert WorkflowInstance.objects.count() == 1
        assert (
            get_registration(workflow).last_result
            == WorkflowTrigger.Result.SKIPPED_COALESCED
        )

    def test_a_bulk_over_several_objects_still_runs_per_object(self, capture_runs):
        """The key is the object too: a bulk edit that touches 3 rows in one
        request is 3 runs, not 1. Only repeats of the same row collapse."""
        make_workflow()
        cid = str(uuid.uuid4())
        for _ in range(3):
            dispatch_internal_event(
                "appliedcontrol.updated", event(cid, object_id=str(uuid.uuid4())), None
            )
        assert WorkflowInstance.objects.count() == 3

    def test_separate_user_actions_each_get_a_run(self, capture_runs):
        make_workflow()
        dispatch_internal_event(
            "appliedcontrol.updated", event(str(uuid.uuid4())), None
        )
        dispatch_internal_event(
            "appliedcontrol.updated", event(str(uuid.uuid4())), None
        )
        assert WorkflowInstance.objects.count() == 2

    def test_events_without_a_correlation_id_are_not_coalesced(self, capture_runs):
        """Nothing to group by, so nothing may be dropped."""
        make_workflow()
        dispatch_internal_event("appliedcontrol.updated", event(""), None)
        dispatch_internal_event("appliedcontrol.updated", event(""), None)
        assert WorkflowInstance.objects.count() == 2

    def test_the_run_records_which_action_it_reacted_to(self, capture_runs):
        make_workflow()
        cid = str(uuid.uuid4())
        [instance] = dispatch_internal_event("appliedcontrol.updated", event(cid), None)
        assert instance.trigger_cid == cid
        assert instance.payload["cid"] == cid

    def test_coalescing_expires_so_a_reused_id_cannot_silence_a_trigger(
        self, capture_runs
    ):
        """The cid can come from an inbound header, so a client reusing one
        must not suppress a trigger for good."""
        from datetime import timedelta

        from django.utils import timezone

        from automation.workflows.events import COALESCE_WINDOW

        make_workflow()
        cid = "constant-header-value"
        dispatch_internal_event("appliedcontrol.updated", event(cid), None)
        WorkflowInstance.objects.update(
            created_at=timezone.now() - COALESCE_WINDOW - timedelta(minutes=1)
        )
        dispatch_internal_event("appliedcontrol.updated", event(cid), None)
        assert WorkflowInstance.objects.count() == 2

    def test_coalescing_is_per_trigger_not_global(self, capture_runs):
        make_workflow(name="First")
        make_workflow(name="Second")
        cid = str(uuid.uuid4())
        started = dispatch_internal_event("appliedcontrol.updated", event(cid), None)
        # Two workflows listening to the same event both run: they are
        # different subscribers, not a repeat of the same one.
        assert len(started) == 2
