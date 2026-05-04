"""Invitation / first-login tokens.

Django 5.2+ includes ``last_login`` and ``email`` in PasswordResetTokenGenerator's
hash. Any login (or email drift) before the user completes the invite link then
invalidates the token. Invitation emails only need invalidation on password change
and timeout, matching older Django semantics.
"""

from django.contrib.auth.tokens import PasswordResetTokenGenerator


class InvitationPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    key_salt = "iam.InvitationPasswordResetTokenGenerator"

    def _make_hash_value(self, user, timestamp) -> str:
        return f"{user.pk}{user.password}{timestamp}"


invitation_token_generator = InvitationPasswordResetTokenGenerator()
