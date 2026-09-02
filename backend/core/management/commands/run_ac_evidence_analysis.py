"""
Attach a (new, indexed) evidence to an Applied Control, then run BOTH analyses
against it end to end:

    1. Create an Evidence + revision, upload a file, link it to the Applied
       Control, and index it in the Gemini File Search Store (same synchronous
       flow as check_evidence_indexing).
    2. Run *control analysis*  -> AppliedControl.run_ai_analysis  (Muraji).
    3. Run *requirement analysis* -> RequirementAssessment.run_ai_analysis
       (Muraji) for every requirement assessment linked to the Applied Control.

Both analyses are invoked through the real DRF viewset actions (authenticated as
a user that actually has access to the control's folder), so this exercises the
exact production code path, including Muraji + RBAC.

Prints a GREEN line per successful step and a RED line on failure. Exits 0 if
every requested analysis succeeded, 1 otherwise.

Usage:
    poetry run python manage.py run_ac_evidence_analysis <applied_control_id>

    # Upload a real file instead of the generated sample text
    poetry run python manage.py run_ac_evidence_analysis <ac_id> --file ./proof.pdf

    # Run the analyses as a specific user (must have access to the AC folder)
    poetry run python manage.py run_ac_evidence_analysis <ac_id> --user admin@example.com

    # Only one of the two analyses
    poetry run python manage.py run_ac_evidence_analysis <ac_id> --skip-requirement
    poetry run python manage.py run_ac_evidence_analysis <ac_id> --skip-control

    # Delete the test evidence + indexed document afterwards (default: keep it)
    poetry run python manage.py run_ac_evidence_analysis <ac_id> --cleanup
"""

import os
import time
from datetime import datetime, timezone as dt_timezone

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError

from iam.models import Folder, RoleAssignment, Permission

from core.gemini_file_search import GEMINI_ENABLED, get_gemini_client
from core.models import AppliedControl, Evidence, EvidenceRevision, FileSearchTable
from core.tasks_gemini import (
    _build_evidence_custom_metadata,
    _materialize_attachment,
)

User = get_user_model()

SAMPLE_EVIDENCE_TEXT = (
    "Applied control evidence - automated analysis check.\n\n"
    "This document is auto-generated to verify that evidence upload, Gemini File "
    "Search indexing, and the AI analysis pipeline (control analysis + requirement "
    "analysis) work end to end on this server.\n\n"
    "Control statement: access to production systems is restricted to authorized "
    "personnel only. Access is granted through a formal request-and-approval "
    "workflow, reviewed on a quarterly basis, and revoked immediately upon role "
    "change or termination. Evidence of each access review is retained for audit "
    "purposes for at least 12 months.\n"
)


class Command(BaseCommand):
    help = (
        "Attach an indexed evidence to an Applied Control, then run control "
        "analysis and requirement analysis against it (real Muraji flow)."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "applied_control_id",
            type=str,
            help="UUID of the Applied Control to attach the evidence to.",
        )
        parser.add_argument(
            "--file",
            type=str,
            default=None,
            help="Path to a real file to upload as evidence (default: sample text).",
        )
        parser.add_argument(
            "--user",
            type=str,
            default=None,
            help=(
                "Email of the user to run the analyses as. Must have access to "
                "the control's folder. Default: auto-pick an admin with access."
            ),
        )
        parser.add_argument(
            "--additional-prompt",
            type=str,
            default="",
            help="Optional extra instruction passed to Muraji for both analyses.",
        )
        parser.add_argument(
            "--skip-control",
            action="store_true",
            help="Do not run the control analysis.",
        )
        parser.add_argument(
            "--skip-requirement",
            action="store_true",
            help="Do not run the requirement analysis.",
        )
        parser.add_argument(
            "--cleanup",
            action="store_true",
            help=(
                "Delete the test evidence + indexed document after the run. "
                "Default: keep the evidence attached to the control."
            ),
        )
        parser.add_argument(
            "--max-wait",
            type=int,
            default=None,
            help="Override GEMINI_INDEX_MAX_WAIT_SECONDS for indexing (seconds).",
        )
        parser.add_argument(
            "--poll-interval",
            type=int,
            default=3,
            help="Indexing poll interval in seconds (default: 3).",
        )

    # -- small colored helpers -------------------------------------------------
    def _ok(self, msg):
        self.stdout.write(self.style.SUCCESS(msg))

    def _warn(self, msg):
        self.stdout.write(self.style.WARNING(msg))

    def _err(self, msg):
        self.stdout.write(self.style.ERROR(msg))

    def handle(self, *args, **options):
        ac_id = options["applied_control_id"]
        file_path_opt = options["file"]
        user_email = options["user"]
        additional_prompt = options["additional_prompt"] or ""
        skip_control = options["skip_control"]
        skip_requirement = options["skip_requirement"]
        cleanup = options["cleanup"]
        max_wait = options["max_wait"]
        poll_interval = options["poll_interval"]

        evidence = None
        fs_row = None
        client = None
        results = []  # (label, ok, detail)

        try:
            # 0. Resolve the applied control -----------------------------------
            self.stdout.write("Step 1/5: resolving applied control...")
            try:
                applied_control = AppliedControl.objects.get(id=ac_id)
            except (AppliedControl.DoesNotExist, ValueError):
                raise CommandError(f"Applied Control '{ac_id}' not found.")
            folder = applied_control.folder
            self._ok(
                f"  OK - AC '{applied_control.name}' "
                f"(id={applied_control.id}, folder={folder})"
            )

            # 1. Validate Gemini configuration ---------------------------------
            self.stdout.write("Step 2/5: validating Gemini configuration...")
            if not GEMINI_ENABLED:
                raise CommandError(
                    "GEMINI_API_KEY is missing in this process's environment - "
                    "cannot index. If running under PM2, restart the worker so it "
                    "reloads backend/.env (pm2 restart dev-huey dev-backend)."
                )
            client = get_gemini_client()
            if not client or not client.store_name:
                raise CommandError(
                    "Gemini File Search store is not configured "
                    "(GEMINI_FILE_SEARCH_STORE_NAME)."
                )
            self._ok(f"  OK - Gemini configured (store={client.store_name})")

            # 2. Resolve the acting user (RBAC) --------------------------------
            self.stdout.write("Step 3/5: resolving acting user (RBAC)...")
            user = self._resolve_user(user_email, applied_control)
            self._ok(f"  OK - running analyses as '{user}'")

            # 3. Create + link + index the evidence ----------------------------
            self.stdout.write("Step 4/5: creating, linking and indexing evidence...")
            evidence, fs_row = self._create_and_index_evidence(
                applied_control=applied_control,
                folder=folder,
                client=client,
                file_path_opt=file_path_opt,
                max_wait=max_wait,
                poll_interval=poll_interval,
            )
            applied_control.evidences.add(evidence)
            self._ok(
                f"  OK - evidence '{evidence.name}' linked to AC and indexed "
                f"({fs_row.chunk_count} document(s))"
            )

            # 4. Run the analyses ---------------------------------------------
            self.stdout.write("Step 5/5: running analyses (Muraji)...")

            if skip_control:
                self._warn("  - control analysis skipped (--skip-control)")
            else:
                ok, detail = self._run_control_analysis(
                    applied_control, user, additional_prompt
                )
                results.append(("control analysis", ok, detail))
                (self._ok if ok else self._err)(f"  control analysis: {detail}")

            if skip_requirement:
                self._warn("  - requirement analysis skipped (--skip-requirement)")
            else:
                ras = list(applied_control.requirement_assessments.all())
                if not ras:
                    self._warn(
                        "  - requirement analysis skipped: this AC is not linked "
                        "to any requirement assessment."
                    )
                for ra in ras:
                    label = f"requirement analysis [{ra.requirement.ref_id or ra.id}]"
                    ok, detail = self._run_requirement_analysis(
                        ra, user, additional_prompt
                    )
                    results.append((label, ok, detail))
                    (self._ok if ok else self._err)(f"  {label}: {detail}")

            # 5. Summary -------------------------------------------------------
            self.stdout.write("")
            all_ok = bool(results) and all(ok for _, ok, _ in results)
            if all_ok:
                self._ok("========================================")
                self._ok("  PASS - evidence uploaded and analyses ran")
                self._ok(f"  applied control: {applied_control.name}")
                self._ok(f"  evidence id: {evidence.id}")
                for label, _ok, detail in results:
                    self._ok(f"  {label}: {detail}")
                self._ok("========================================")
            else:
                self._err("========================================")
                self._err("  FAIL - one or more analyses did not succeed")
                for label, ok, detail in results:
                    line = f"  {label}: {detail}"
                    (self._ok if ok else self._err)(line)
                self._err("========================================")

            self._cleanup(evidence, fs_row, client, cleanup)
            if not all_ok:
                raise SystemExit(1)

        except SystemExit:
            raise
        except Exception as exc:
            self.stdout.write("")
            self._err("========================================")
            self._err("  FAIL - run_ac_evidence_analysis errored")
            self._err(f"  reason: {exc}")
            self._err("========================================")
            self._cleanup(evidence, fs_row, client, cleanup)
            raise SystemExit(1)

    # -- helpers ---------------------------------------------------------------
    def _resolve_user(self, user_email, applied_control):
        """Pick a user that can access the AC's folder (RBAC has no superuser bypass).

        get_object() only requires the AC to be in the user's *view* list; the
        POST object-permission check then requires ``add_appliedcontrol`` on the
        AC folder. We prefer a user that satisfies both, but fall back to a
        view-only user so the real per-analysis HTTP status is what gets
        reported (instead of failing to pick anyone).
        """
        if user_email:
            user = User.objects.filter(email=user_email).first()
            if not user:
                raise CommandError(f"User '{user_email}' not found.")
            if not self._can_view(user, applied_control):
                raise CommandError(
                    f"User '{user_email}' cannot access the control's folder "
                    "(get_object would 404). Assign them the Administrator role "
                    "on that domain."
                )
            if not self._can_write(user, applied_control):
                self._warn(
                    f"  note: '{user_email}' can view but may lack write "
                    "permission on the control folder; the analysis call may 403."
                )
            return user

        # Auto-pick: superusers first, then everyone else. Prefer a user with
        # full write access; otherwise fall back to any user that can view it.
        candidates = list(User.objects.filter(is_superuser=True).order_by("id"))
        candidates += list(User.objects.filter(is_superuser=False).order_by("id"))
        view_only = None
        for user in candidates:
            if self._can_write(user, applied_control):
                return user
            if view_only is None and self._can_view(user, applied_control):
                view_only = user
        if view_only is not None:
            self._warn(
                f"  note: '{view_only}' can view the control but may lack write "
                "permission; the analysis call may 403. Pass --user to override."
            )
            return view_only
        raise CommandError(
            "Could not find any user with access to this control's folder. "
            "A superuser WITHOUT an Administrator role assignment has no RBAC "
            "access. Pass --user <email> for a user that has the Administrator "
            "role on this domain."
        )

    @staticmethod
    def _can_view(user, applied_control):
        """True if get_object() would return the AC for this user."""
        view_ids = RoleAssignment.get_accessible_object_ids(
            Folder.get_root_folder(), user, AppliedControl
        )[0]
        return applied_control.id in view_ids

    @classmethod
    def _can_write(cls, user, applied_control):
        """True if the user also passes the POST object-permission check on the AC."""
        if not cls._can_view(user, applied_control):
            return False
        try:
            add_ac = Permission.objects.get(codename="add_appliedcontrol")
        except Permission.DoesNotExist:
            return False
        return RoleAssignment.is_access_allowed(
            user, add_ac, applied_control.folder
        )

    def _create_and_index_evidence(
        self, applied_control, folder, client, file_path_opt, max_wait, poll_interval
    ):
        stamp = datetime.now(dt_timezone.utc).strftime("%Y%m%d-%H%M%S")
        evidence = Evidence.objects.create(
            name=f"[analysis check] {applied_control.name} {stamp}",
            description="Auto-generated by run_ac_evidence_analysis.",
            folder=folder,
        )
        revision = EvidenceRevision.objects.create(
            evidence=evidence,
            folder=folder,
            version=1,
        )

        if file_path_opt:
            if not os.path.isfile(file_path_opt):
                raise CommandError(f"--file '{file_path_opt}' does not exist.")
            with open(file_path_opt, "rb") as fh:
                content = fh.read()
            filename = os.path.basename(file_path_opt)
        else:
            content = SAMPLE_EVIDENCE_TEXT.encode("utf-8")
            filename = f"analysis-check-{stamp}.txt"

        revision.attachment.save(filename, ContentFile(content), save=True)

        fs_row = FileSearchTable.objects.create(
            evidence_revision=revision,
            upload_status=FileSearchTable.UploadStatus.UPLOADING,
            gemini_document_id="",
            gemini_store_id="",
        )

        display_name = f"{evidence.name} - {revision.filename()}"
        custom_metadata = _build_evidence_custom_metadata(revision)
        upload_kwargs = {
            "file_path": None,
            "display_name": display_name,
            "custom_metadata": custom_metadata,
            "poll_interval": poll_interval,
        }
        if max_wait is not None:
            upload_kwargs["max_wait_seconds"] = max_wait

        with _materialize_attachment(revision.attachment) as fp:
            upload_kwargs["file_path"] = fp
            result = client.upload_evidence_file_and_wait(**upload_kwargs)

        if result.get("status") != "completed":
            fs_row.upload_status = FileSearchTable.UploadStatus.FAILED
            fs_row.error_message = result.get("error", "Unknown error")
            fs_row.save()
            raise CommandError(
                f"Indexing did not complete: {result.get('error', 'unknown error')}"
            )

        doc_ids = result.get("gemini_document_ids") or (
            [result["gemini_document_id"]] if result.get("gemini_document_id") else []
        )
        fs_row.gemini_document_ids = doc_ids
        fs_row.gemini_document_id = doc_ids[0] if doc_ids else ""
        fs_row.chunk_count = result.get("chunk_count", len(doc_ids))
        fs_row.gemini_store_id = result.get("gemini_store_id", "")
        fs_row.operation_id = result.get("operation_id", "") or fs_row.operation_id
        fs_row.upload_status = FileSearchTable.UploadStatus.COMPLETED
        fs_row.error_message = None
        fs_row.save()

        fs_row.refresh_from_db()
        if not fs_row.is_indexed():
            raise CommandError(
                "Evidence indexed upload finished but is_indexed() is False "
                f"(status={fs_row.upload_status})."
            )
        return evidence, fs_row

    def _run_control_analysis(self, applied_control, user, additional_prompt):
        from core.views import AppliedControlViewSet

        resp = self._call_action(
            AppliedControlViewSet, applied_control.id, user, additional_prompt
        )
        return self._interpret(resp)

    def _run_requirement_analysis(self, requirement_assessment, user, additional_prompt):
        from core.views import RequirementAssessmentViewSet

        resp = self._call_action(
            RequirementAssessmentViewSet,
            requirement_assessment.id,
            user,
            additional_prompt,
        )
        return self._interpret(resp)

    @staticmethod
    def _call_action(viewset_cls, pk, user, additional_prompt):
        from rest_framework.test import APIRequestFactory, force_authenticate

        factory = APIRequestFactory()
        body = {"additional_prompt": additional_prompt} if additional_prompt else {}
        request = factory.post(
            f"/api/run-ai-analysis/{pk}/", body, format="json"
        )
        force_authenticate(request, user=user)
        view = viewset_cls.as_view({"post": "run_ai_analysis"})
        response = view(request, pk=str(pk))
        if hasattr(response, "render") and not getattr(response, "is_rendered", True):
            response.render()
        return response

    @staticmethod
    def _interpret(resp):
        """Turn a DRF response into (ok, human-readable detail)."""
        code = getattr(resp, "status_code", None)
        data = getattr(resp, "data", None)
        if code == 200 and isinstance(data, dict):
            analysis = data.get("ai_analysis") or {}
            overall = analysis.get("overallAssessment", {}) if isinstance(
                analysis, dict
            ) else {}
            score = overall.get("score")
            comp = overall.get("status", "")
            # Requirement analysis also exposes these at the top level.
            if score is None:
                score = data.get("score")
            if not comp:
                comp = data.get("compliance_status", "") or ""
            bits = []
            if score is not None:
                bits.append(f"score={score}")
            if comp:
                bits.append(f"status={comp}")
            return True, f"OK ({', '.join(bits) or 'completed'})"
        # Non-200: surface the message the viewset returned.
        msg = ""
        if isinstance(data, dict):
            msg = data.get("message") or data.get("detail") or str(data)
        elif data is not None:
            msg = str(data)
        return False, f"HTTP {code}: {msg}"

    def _cleanup(self, evidence, fs_row, client, cleanup):
        if not cleanup:
            if evidence is not None:
                self._warn(
                    f"  keeping test evidence attached to the control (id={evidence.id}). "
                    "Pass --cleanup to remove it."
                )
            return
        try:
            if client is not None and fs_row is not None:
                doc_ids = fs_row.all_document_ids()
                if doc_ids:
                    client.delete_store_documents(doc_ids)
        except Exception as exc:  # noqa: BLE001
            self._warn(f"  cleanup: could not delete store documents: {exc}")
        try:
            if evidence is not None:
                ev_id = evidence.id
                evidence.delete()
                self.stdout.write(f"  cleanup: deleted test evidence {ev_id}")
        except Exception as exc:  # noqa: BLE001
            self._warn(f"  cleanup: could not delete test evidence: {exc}")
