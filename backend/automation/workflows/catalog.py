"""Bundled workflow templates: gallery catalog and install helpers.

Templates live as YAML libraries under ``bundled_templates/``. The gallery
lists them; install imports one into a folder the same way as upload-YAML.
``app_url`` defaults are filled from ``CISO_ASSISTANT_URL`` at install time
so the same pack works on gov, stage, and local without hand edits.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

import yaml
from django.conf import settings

TEMPLATES_DIR = Path(__file__).resolve().parent / "bundled_templates"


@dataclass(frozen=True)
class WorkflowTemplate:
    id: str
    name: str
    description: str
    category: str
    tags: tuple[str, ...]
    file_name: str
    keywords: tuple[str, ...]

    @property
    def path(self) -> Path:
        return TEMPLATES_DIR / self.file_name


CATALOG: tuple[WorkflowTemplate, ...] = (
    WorkflowTemplate(
        id="evidence-reviewer-notice",
        name="Evidence uploaded → notify audit reviewers",
        description=(
            "When a file is uploaded to evidence, find the controls it backs and "
            "the audits those controls serve, then email each audit's reviewers "
            "a branded link to the assessment and the evidence."
        ),
        category="evidence",
        tags=("email", "reviewers", "evidence", "compliance"),
        file_name="evidence-reviewer-notice.yaml",
        keywords=(
            "evidence",
            "upload",
            "revision",
            "reviewer",
            "audit",
            "assessment",
            "notify",
            "دليل",
            "مراجع",
            "تقييم",
        ),
    ),
    WorkflowTemplate(
        id="evidence-control-owner-notice",
        name="Evidence changed → notify control owners",
        description=(
            "When evidence is updated or a new revision is uploaded, email the "
            "owners of every control that hosts that evidence."
        ),
        category="evidence",
        tags=("email", "owners", "evidence", "controls"),
        file_name="evidence-control-owner-notice.yaml",
        keywords=(
            "evidence",
            "owner",
            "control",
            "update",
            "revision",
            "notify",
            "مالك",
            "ضابط",
            "دليل",
        ),
    ),
    WorkflowTemplate(
        id="assessment-review-notice",
        name="Assessment moved to In review → notify GRC mailbox",
        description=(
            "When a compliance assessment moves to In review, tell the GRC "
            "mailbox. If no reviewer is set, ask them to assign one."
        ),
        category="compliance",
        tags=("email", "assessment", "review", "status"),
        file_name="assessment-review-notice.yaml",
        keywords=(
            "assessment",
            "in_review",
            "review",
            "mailbox",
            "grc",
            "status",
            "مراجعة",
            "تقييم",
        ),
    ),
    WorkflowTemplate(
        id="assessment-created-notice",
        name="Assessment created → notify GRC mailbox",
        description=(
            "When a compliance assessment is created, email the GRC mailbox "
            "with the name and a link."
        ),
        category="compliance",
        tags=("email", "assessment", "created"),
        file_name="assessment-created-notice.yaml",
        keywords=("assessment", "created", "grc", "notify", "تقييم", "إنشاء"),
    ),
    WorkflowTemplate(
        id="incident-created-notice",
        name="Incident created → notify security mailbox",
        description=(
            "When an incident is created, email the security mailbox with name, "
            "severity, and a link."
        ),
        category="incidents",
        tags=("email", "incident", "security"),
        file_name="incident-created-notice.yaml",
        keywords=("incident", "security", "severity", "notify", "حادث", "أمن"),
    ),
    WorkflowTemplate(
        id="vulnerability-created-notice",
        name="Vulnerability created → notify security mailbox",
        description=(
            "When a vulnerability is created, email security with name, "
            "severity, status, and a link."
        ),
        category="vulnerabilities",
        tags=("email", "vulnerability", "security"),
        file_name="vulnerability-created-notice.yaml",
        keywords=("vulnerability", "security", "severity", "notify", "ثغرة"),
    ),
    WorkflowTemplate(
        id="finding-created-notice",
        name="Finding created → notify GRC mailbox",
        description=(
            "When a finding is created, email the GRC mailbox with name, "
            "severity, priority, and a link."
        ),
        category="findings",
        tags=("email", "finding", "grc"),
        file_name="finding-created-notice.yaml",
        keywords=("finding", "grc", "severity", "priority", "notify", "نتيجة"),
    ),
    WorkflowTemplate(
        id="applied-control-updated-owners",
        name="Control updated → notify control owners",
        description=(
            "When an applied control is updated, email its owners with the "
            "control name and a link."
        ),
        category="controls",
        tags=("email", "owners", "controls"),
        file_name="applied-control-updated-owners.yaml",
        keywords=(
            "control",
            "owner",
            "applied",
            "update",
            "notify",
            "ضابط",
            "مالك",
        ),
    ),
    WorkflowTemplate(
        id="security-exception-created-notice",
        name="Security exception created → notify GRC mailbox",
        description=(
            "When a security exception is created, email GRC with name, "
            "severity, expiration, and a link."
        ),
        category="exceptions",
        tags=("email", "exception", "grc"),
        file_name="security-exception-created-notice.yaml",
        keywords=(
            "exception",
            "security",
            "grc",
            "expiration",
            "notify",
            "استثناء",
        ),
    ),
    WorkflowTemplate(
        id="asset-created-notice",
        name="Asset created → notify asset owners mailbox",
        description=(
            "When an asset is created, email the asset owners mailbox with the "
            "name, type, and a link."
        ),
        category="assets",
        tags=("email", "asset", "owners"),
        file_name="asset-created-notice.yaml",
        keywords=("asset", "created", "owners", "notify", "أصل"),
    ),
    WorkflowTemplate(
        id="create-validation-request",
        name="Create validation request",
        description=(
            "Manually create a validation request for an approver, optionally "
            "linking applied controls, evidence, tasks, and policies. The "
            "approver is notified when the request is submitted."
        ),
        category="validations",
        tags=("validation", "approver", "controls", "evidence", "tasks", "policies"),
        file_name="create-validation-request.yaml",
        keywords=(
            "validation",
            "validate",
            "approver",
            "approval",
            "request",
            "control",
            "evidence",
            "task",
            "policy",
            "تحقق",
            "موافقة",
            "مراجع",
            "ضابط",
            "دليل",
            "مهمة",
            "سياسة",
        ),
    ),
)


def list_templates() -> list[dict]:
    return [
        {
            "id": t.id,
            "name": t.name,
            "description": t.description,
            "category": t.category,
            "tags": list(t.tags),
        }
        for t in CATALOG
        if t.path.is_file()
    ]


def get_template(template_id: str) -> WorkflowTemplate | None:
    for template in CATALOG:
        if template.id == template_id and template.path.is_file():
            return template
    return None


@lru_cache(maxsize=32)
def load_template_document(template_id: str) -> dict:
    template = get_template(template_id)
    if template is None:
        raise FileNotFoundError(template_id)
    with template.path.open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"template '{template_id}' is not a mapping")
    return _with_app_url(data)


def _with_app_url(data: dict) -> dict:
    """Stamp CISO_ASSISTANT_URL onto every workflow's app_url default."""
    import copy

    document = copy.deepcopy(data)
    app_url = (getattr(settings, "CISO_ASSISTANT_URL", "") or "").rstrip("/")
    workflows = (document.get("objects") or {}).get("workflows") or []
    for entry in workflows:
        graph = entry.get("graph") or {}
        for variable in graph.get("variables") or []:
            if variable.get("key") == "app_url" and app_url:
                variable["default_value"] = app_url
    return document


def match_templates(prompt: str, *, limit: int = 5) -> list[dict]:
    """Score catalog entries against a free-text prompt (EN/AR keywords)."""
    text = (prompt or "").lower()
    scored = []
    for template in CATALOG:
        if not template.path.is_file():
            continue
        hits = sum(1 for word in template.keywords if word.lower() in text)
        if hits:
            scored.append((hits, template))
    scored.sort(key=lambda item: (-item[0], item[1].name))
    return [
        {
            "id": template.id,
            "name": template.name,
            "description": template.description,
            "category": template.category,
            "tags": list(template.tags),
            "score": hits,
        }
        for hits, template in scored[:limit]
    ]
