"""Run-authorization kernel access.

This module is the ONLY place in the workflows app allowed to touch iam
authorization primitives, so the engine's authz surface stays auditable in
one file.

Deliberately unoptimized for now (user decision — correctness first):
- no codename->Permission caching (one Permission query per check),
- no per-run memoization (loops re-check identical (codename, folder) pairs).
"""

from django.contrib.auth.models import Permission

from iam.models import Folder, RoleAssignment


def can(user, codename, folder) -> bool:
    """May ``user`` exercise ``codename`` in ``folder``?

    Fail-closed on missing or inactive identities. Superusers get NO special
    treatment here: every user's verdict comes from the
    iam kernel unchanged.
    """
    if user is None or not user.is_active:
        return False
    permission = Permission.objects.filter(codename=codename).first()
    if permission is None:
        return False
    return RoleAssignment.is_access_allowed(user=user, perm=permission, folder=folder)


def _accessible_ids(user, model):
    """Muhkam's iam answers view/change/delete in one call, from the root."""
    return RoleAssignment.get_accessible_object_ids(
        Folder.get_root_folder(), user, model
    )


def viewable_ids(user, model) -> set:
    """Ids of ``model`` rows ``user`` may view — the same primitive the API
    list views use (BaseModelViewSet.get_queryset), so engine reads see
    exactly what the API would show the identity."""
    if user is None or not user.is_active:
        return set()
    view_ids, _, _ = _accessible_ids(user, model)
    return set(view_ids)


def changeable_ids(user, model) -> set:
    """Ids of ``model`` rows ``user`` may change: the write counterpart of
    ``viewable_ids``."""
    if user is None or not user.is_active:
        return set()
    _, change_ids, _ = _accessible_ids(user, model)
    return set(change_ids)
