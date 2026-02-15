"""
Custom Django email backend that sends emails via Microsoft Graph API.

Uses MSAL (Microsoft Authentication Library) with client credentials flow
to authenticate and send emails through Microsoft Graph API.

Required settings:
    MS_GRAPH_CLIENT_ID      - Azure AD Application (client) ID
    MS_GRAPH_TENANT_ID      - Azure AD Directory (tenant) ID
    MS_GRAPH_CLIENT_SECRET  - Azure AD Client Secret
    DEFAULT_FROM_EMAIL      - Sender email address (must be a valid mailbox in the tenant)

Required Azure AD API Permissions (Application type):
    Mail.Send
"""

import json
import logging
import base64

import msal
import requests
from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend

logger = logging.getLogger(__name__)

GRAPH_API_ENDPOINT = "https://graph.microsoft.com/v1.0"


class MicrosoftGraphEmailBackend(BaseEmailBackend):
    """
    Django email backend that sends emails using Microsoft Graph API.
    All existing send_mail() and EmailMessage calls will automatically
    use this backend when configured.
    """

    def __init__(self, fail_silently=False, **kwargs):
        super().__init__(fail_silently=fail_silently, **kwargs)
        self.client_id = getattr(settings, "MS_GRAPH_CLIENT_ID", "")
        self.tenant_id = getattr(settings, "MS_GRAPH_TENANT_ID", "")
        self.client_secret = getattr(settings, "MS_GRAPH_CLIENT_SECRET", "")
        self._access_token = None

    def _get_access_token(self):
        """Acquire an access token using MSAL client credentials flow."""
        if self._access_token:
            return self._access_token

        authority = f"https://login.microsoftonline.com/{self.tenant_id}"
        app = msal.ConfidentialClientApplication(
            client_id=self.client_id,
            client_credential=self.client_secret,
            authority=authority,
        )

        # Try to get token from cache first
        result = app.acquire_token_silent(
            scopes=["https://graph.microsoft.com/.default"],
            account=None,
        )

        if not result:
            result = app.acquire_token_for_client(
                scopes=["https://graph.microsoft.com/.default"]
            )

        if "access_token" in result:
            self._access_token = result["access_token"]
            return self._access_token
        else:
            error_msg = (
                f"Failed to acquire Microsoft Graph token: "
                f"{result.get('error')}: {result.get('error_description')}"
            )
            logger.error(error_msg)
            if not self.fail_silently:
                raise Exception(error_msg)
            return None

    def _build_recipients(self, email_list):
        """Convert a list of email addresses to Graph API recipient format."""
        return [
            {"emailAddress": {"address": email}}
            for email in email_list
            if email
        ]

    def _build_attachments(self, message):
        """Convert Django EmailMessage attachments to Graph API format."""
        attachments = []
        for attachment in message.attachments:
            if isinstance(attachment, tuple):
                filename, content, mimetype = attachment
                if isinstance(content, str):
                    content = content.encode("utf-8")
                attachments.append({
                    "@odata.type": "#microsoft.graph.fileAttachment",
                    "name": filename,
                    "contentType": mimetype or "application/octet-stream",
                    "contentBytes": base64.b64encode(content).decode("utf-8"),
                })
        return attachments

    def send_messages(self, email_messages):
        """
        Send one or more EmailMessage objects and return the number of email
        messages sent.
        """
        if not email_messages:
            return 0

        access_token = self._get_access_token()
        if not access_token:
            return 0

        num_sent = 0
        for message in email_messages:
            try:
                if self._send_message(message, access_token):
                    num_sent += 1
            except Exception as e:
                logger.error(
                    "Failed to send email via Microsoft Graph",
                    exc_info=True,
                )
                if not self.fail_silently:
                    raise
        return num_sent

    def _send_message(self, message, access_token):
        """Send a single EmailMessage via Microsoft Graph API."""
        from_email = str(message.from_email or settings.DEFAULT_FROM_EMAIL)

        # Build the message payload
        # Use str() to convert Django lazy strings (__proxy__) to regular strings
        body_type = "HTML" if hasattr(message, "alternatives") and message.alternatives else "Text"
        body_content = str(message.body)

        # If there are HTML alternatives, use the first one
        if hasattr(message, "alternatives") and message.alternatives:
            for content, mimetype in message.alternatives:
                if mimetype == "text/html":
                    body_content = str(content)
                    body_type = "HTML"
                    break

        # Also check if the body itself contains HTML (from html_message parameter in send_mail)
        if message.content_subtype == "html":
            body_type = "HTML"

        payload = {
            "message": {
                "subject": str(message.subject),
                "body": {
                    "contentType": body_type,
                    "content": body_content,
                },
                "from": {
                    "emailAddress": {"address": from_email}
                },
                "toRecipients": self._build_recipients(message.to),
                "ccRecipients": self._build_recipients(message.cc),
                "bccRecipients": self._build_recipients(message.bcc),
            },
            "saveToSentItems": "true",
        }

        # Add attachments if any
        if message.attachments:
            payload["message"]["attachments"] = self._build_attachments(message)

        # Send via Graph API
        # Use the from_email as the user to send on behalf of
        sender_email = from_email
        url = f"{GRAPH_API_ENDPOINT}/users/{sender_email}/sendMail"

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        response = requests.post(url, headers=headers, json=payload, timeout=30)

        if response.status_code == 202:
            logger.info(
                "Email sent successfully via Microsoft Graph",
                extra={
                    "recipient": ", ".join(message.to),
                    "subject": message.subject,
                },
            )
            return True
        else:
            error_msg = (
                f"Microsoft Graph API error {response.status_code}: "
                f"{response.text}"
            )
            logger.error(error_msg)
            if not self.fail_silently:
                raise Exception(error_msg)
            return False
