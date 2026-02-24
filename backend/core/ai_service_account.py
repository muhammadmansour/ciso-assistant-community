"""
Utility to get or create the dedicated AI service account.

The service account is used as the authenticated actor when AI-proposed
values are written to RequirementAssessment records, so that the native
audit log clearly identifies AI as the actor (PRD 2.2).

The email is configurable via the AI_SERVICE_ACCOUNT_EMAIL env var,
defaulting to 'ai-service@wathbahs.com'.
"""

import os
import structlog
from django.db import transaction

logger = structlog.get_logger(__name__)

AI_SERVICE_EMAIL = os.environ.get(
    "AI_SERVICE_ACCOUNT_EMAIL", "ai-service@wathbahs.com"
)
AI_SERVICE_FIRST_NAME = "Wathbah AI"
AI_SERVICE_LAST_NAME = "Service"


def get_or_create_ai_service_user():
    """Return the AI service account User, creating it if it doesn't exist.

    The account is:
    - is_active=True  (so auditlog resolves the email)
    - is_superuser=False
    - has an unusable password (cannot log in interactively)
    - belongs to the root folder
    """
    from iam.models import User, Folder

    try:
        return User.objects.get(email__iexact=AI_SERVICE_EMAIL)
    except User.DoesNotExist:
        pass

    logger.info(
        "Creating AI service account",
        email=AI_SERVICE_EMAIL,
    )

    with transaction.atomic():
        root_folder = Folder.get_root_folder()
        user = User(
            email=AI_SERVICE_EMAIL,
            first_name=AI_SERVICE_FIRST_NAME,
            last_name=AI_SERVICE_LAST_NAME,
            is_active=True,
            is_superuser=False,
            folder=root_folder,
            first_login=False,
            is_published=True,
        )
        user.set_unusable_password()
        user.save()

    logger.info(
        "AI service account created",
        email=AI_SERVICE_EMAIL,
        user_id=str(user.pk),
    )
    return user
