"""Huey only autoloads ``<app>/tasks.py``.

The workflow tasks live in ``automation.workflows.tasks``. Importing them
here registers the same task names (``automation.workflows.tasks.*``) in
the consumer. Without this, ``run_huey`` dequeues
``dispatch_internal_event_task`` and raises "not found in TaskRegistry".
"""

from automation.workflows.tasks import (  # noqa: F401
    ai_call_task,
    dispatch_internal_event_task,
    process_workflow_schedules,
    reap_timed_out_runs,
    reap_undelivered_dispatches,
    retry_token_task,
    run_instance_task,
    send_email_task,
)
