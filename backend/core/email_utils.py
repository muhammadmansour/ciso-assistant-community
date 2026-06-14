"""
Email template utilities for CISO Assistant
"""

import re
from html import escape
from pathlib import Path
from string import Template
from typing import Dict, Optional

import yaml
from django.conf import settings
from django.utils.translation import get_language
import structlog

logger = structlog.getLogger(__name__)

TEMPLATE_BASE_PATH = Path(__file__).parent / "templates" / "emails"

# Logo lives in the frontend static root, served at <CISO_ASSISTANT_URL>/<file>.
LOGO_FILENAME = "wathba_logo_full.png"

_URL_RE = re.compile(r"(https?://[^\s<]+)")


def get_logo_url() -> str:
    """Public URL of the Wathbah logo, derived from CISO_ASSISTANT_URL (.env)."""
    base_url = getattr(
        settings, "CISO_ASSISTANT_URL", "http://localhost:5173"
    ).rstrip("/")
    return f"{base_url}/{LOGO_FILENAME}"


def render_audit_status_html_email(
    intro: str,
    action: str,
    assessment_name: str,
    framework_name: str,
    folder_name: str,
    old_status: str,
    new_status: str,
    assessment_url: str,
    logo_url: Optional[str] = None,
    *,
    details_heading: str = "Audit details",
    status_heading: str = "Status change",
    name_label: str = "Name",
    framework_label: str = "Framework",
    domain_label: str = "Domain",
    cta_label: str = "Open audit",
    greeting: str = "Hello,",
    closing: str = "Thank you.",
) -> str:
    """Rich HTML layout for audit status-change notifications."""
    if logo_url is None:
        logo_url = get_logo_url()

    safe_intro = escape(intro)
    safe_action = escape(action)
    safe_name = escape(assessment_name)
    safe_framework = escape(framework_name)
    safe_folder = escape(folder_name)
    safe_old = escape(old_status)
    safe_new = escape(new_status)
    safe_url = escape(assessment_url, quote=True)

    detail_row = (
        lambda label, value: f"""
              <tr>
                <td style="padding:8px 12px;color:#6b7280;font-size:13px;width:120px;vertical-align:top;">
                  <strong style="color:#374151;">{label}</strong>
                </td>
                <td style="padding:8px 12px;color:#111827;font-size:14px;vertical-align:top;">{value}</td>
              </tr>"""
    )

    details_table = f"""
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="margin:16px 0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#fafafa;">
              {detail_row(name_label, safe_name)}
              {detail_row(framework_label, safe_framework)}
              {detail_row(domain_label, safe_folder)}
            </table>"""

    cta_button = f"""<p style="margin:20px 0;"><a href="{safe_url}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;border-radius:6px;">{escape(cta_label)}</a></p>"""

    return (
        f'<!DOCTYPE html><html><head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        f'<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">'
        f'<div style="max-width:600px;margin:24px auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">'
        f'<div style="padding:20px 24px;text-align:center;border-bottom:1px solid #e5e7eb;">'
        f'<img src="{logo_url}" alt="Wathbah GRC" height="48" style="height:48px;border:0;">'
        f"</div>"
        f'<div style="padding:24px;color:#111827;font-size:14px;line-height:1.6;">'
        f"<p style=\"margin:0 0 8px;\">{escape(greeting)}</p>"
        f'<p style="margin:0 0 16px;font-weight:bold;">{safe_intro}</p>'
        f'<p style="margin:0 0 8px;font-size:12px;font-weight:bold;color:#374151;text-transform:uppercase;">{escape(details_heading)}</p>'
        f"{details_table}"
        f'<div style="margin:16px 0;padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">'
        f'<p style="margin:0 0 6px;font-size:12px;font-weight:bold;color:#1e40af;text-transform:uppercase;">{escape(status_heading)}</p>'
        f'<p style="margin:0;font-size:16px;font-weight:bold;">{safe_old} &rarr; {safe_new}</p>'
        f"</div>"
        f"<p style=\"margin:0 0 8px;\">{safe_action}</p>"
        f"{cta_button}"
        f'<p style="margin:0;color:#6b7280;">{escape(closing)}</p>'
        f"</div>"
        f'<div style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">Powered by Wathbah</div>'
        f"</div></body></html>"
    )


def render_html_email(body: str, logo_url: Optional[str] = None) -> str:
    """Wrap a plain-text email body in a simple, client-friendly HTML layout
    with the Wathbah logo as a header.

    The body is HTML-escaped, bare URLs are turned into links, and newlines are
    converted to <br> so the YAML templates remain the single source of content.
    """
    if logo_url is None:
        logo_url = get_logo_url()

    safe_body = escape(body)
    safe_body = _URL_RE.sub(
        r'<a href="\1" style="color:#2563eb;">\1</a>', safe_body
    )
    safe_body = safe_body.replace("\n", "<br>")

    return f"""\
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td align="center" style="padding:24px;background-color:#ffffff;border-bottom:1px solid #e5e7eb;">
                <img src="{logo_url}" alt="Wathbah GRC" height="48" style="height:48px;display:block;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px;color:#111827;font-size:14px;line-height:1.6;">
                {safe_body}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;background-color:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
                Powered by Wathbah
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def load_email_template(
    template_name: str, locale: Optional[str] = None
) -> Optional[Dict[str, str]]:
    """
    Load email template from YAML file

    Args:
        template_name: Name of the template (e.g., 'expired_controls')
        locale: Language code (e.g., 'en', 'fr'). If None, uses current Django language

    Returns:
        Dictionary with 'subject' and 'body' keys, or None if not found
    """
    if locale is None:
        locale = get_language() or "en"
        # Extract language code from locale like 'en-us' -> 'en'
        locale = locale.split("-")[0].lower()

    # Construct file path
    template_file = TEMPLATE_BASE_PATH / locale / f"{template_name}.yaml"

    # If locale-specific template doesn't exist, fall back to English
    if not template_file.exists():
        if locale != "en":
            logger.warning(
                f"Template {template_file} not found, falling back to English"
            )
            template_file = TEMPLATE_BASE_PATH / "en" / f"{template_name}.yaml"

        if not template_file.exists():
            logger.error(f"Template {template_file} not found")
            return None

    try:
        with open(template_file, "r", encoding="utf-8") as f:
            template_data = yaml.safe_load(f)

        # Validate template structure
        if (
            not isinstance(template_data, dict)
            or "subject" not in template_data
            or "body" not in template_data
        ):
            logger.error(f"Invalid template structure in {template_file}")
            return None

        return template_data
    except Exception as e:
        logger.error(f"Error loading template {template_file}: {str(e)}")
        return None


def render_email_template(
    template_name: str, context: Dict, locale: Optional[str] = None
) -> Dict[str, str]:
    """
    Render email template with context variables

    Args:
        template_name: Name of the template (e.g., 'expired_controls')
        context: Dictionary of variables to substitute in template
        locale: Language code. If None, uses current Django language

    Returns:
        Dictionary with 'subject' and 'body' keys, or empty dict if template not found
    """
    template_data = load_email_template(template_name, locale)
    if not template_data:
        logger.error(f"Failed to load template {template_name}")
        return {}

    try:
        # Add default context variables
        full_context = get_default_context()
        full_context.update(context)

        # Use string.Template for safe substitution
        subject = Template(template_data["subject"]).safe_substitute(full_context)
        body = Template(template_data["body"]).safe_substitute(full_context)

        rendered = {"subject": subject, "body": body}
        for optional_key in (
            "intro",
            "action",
            "details_heading",
            "status_heading",
            "name_label",
            "framework_label",
            "domain_label",
            "cta_label",
            "greeting",
            "closing",
        ):
            if optional_key in template_data:
                rendered[optional_key] = Template(
                    template_data[optional_key]
                ).safe_substitute(full_context)

        return rendered
    except Exception as e:
        logger.error(f"Error rendering template {template_name}: {str(e)}")
        return {}


def format_control_list(controls) -> str:
    """
    Format a list of controls for email templates

    Args:
        controls: List of AppliedControl objects

    Returns:
        Formatted string with control information
    """
    control_lines = []
    for control in controls:
        if hasattr(control, "eta") and control.eta:
            control_lines.append(f"- {control.name} (ETA: {control.eta})")
        else:
            control_lines.append(f"- {control.name}")

    return "\n".join(control_lines)


def format_assessment_list(assessments) -> str:
    """
    Format a list of assessments for email templates

    Args:
        assessments: List of ComplianceAssessment objects

    Returns:
        Formatted string with assessment information
    """
    assessment_lines = []
    for assessment in assessments:
        framework_name = (
            assessment.framework.name if assessment.framework else "No framework"
        )
        due_date = (
            assessment.due_date.strftime("%Y-%m-%d")
            if assessment.due_date
            else "Not set"
        )
        assessment_lines.append(
            f"- {assessment.name} (Framework: {framework_name}, Due: {due_date})"
        )

    return "\n".join(assessment_lines)


def format_evidence_list(evidences) -> str:
    """
    Format a list of evidences for email templates

    Args:
        evidences: List of Evidence objects

    Returns:
        Formatted string with evidence information
    """
    evidence_lines = []
    for evidence in evidences:
        expiry_date = (
            evidence.expiry_date.strftime("%Y-%m-%d")
            if evidence.expiry_date
            else "Not set"
        )
        status = (
            evidence.get_status_display()
            if hasattr(evidence, "get_status_display")
            else evidence.status
        )
        evidence_lines.append(
            f"- {evidence.name} (Status: {status}, Expiry: {expiry_date})"
        )

    return "\n".join(evidence_lines)


def format_validation_list(validations) -> str:
    """
    Format a list of validation flows for email templates

    Args:
        validations: List of ValidationFlow objects

    Returns:
        Formatted string with validation flow information
    """
    validation_lines = []
    for validation in validations:
        deadline = (
            validation.validation_deadline.strftime("%Y-%m-%d")
            if validation.validation_deadline
            else "Not set"
        )
        requester_name = (
            f"{validation.requester.first_name} {validation.requester.last_name}".strip()
            if validation.requester
            and (validation.requester.first_name or validation.requester.last_name)
            else validation.requester.email
            if validation.requester
            else "Unknown"
        )
        validation_lines.append(
            f"- {validation.ref_id} (Requester: {requester_name}, Deadline: {deadline})"
        )

    return "\n".join(validation_lines)


def get_default_context() -> Dict[str, str]:
    """
    Get default context variables for email templates

    Returns:
        Dictionary with default context variables
    """
    return {
        "ciso_assistant_url": getattr(
            settings, "CISO_ASSISTANT_URL", "http://localhost:5173"
        ),
    }


def send_templated_notification(
    template_name: str,
    context: Dict,
    recipient_email: str,
    locale: Optional[str] = None,
) -> bool:
    """
    Helper function to send a notification using a template

    Args:
        template_name: Name of the email template
        context: Context variables for the template
        recipient_email: Email address to send to
        locale: Language code for the template

    Returns:
        True if email was queued successfully, False otherwise
    """
    from .tasks import send_notification_email

    rendered = render_email_template(template_name, context, locale)
    if not rendered:
        return False

    send_notification_email(rendered["subject"], rendered["body"], recipient_email)
    return True
