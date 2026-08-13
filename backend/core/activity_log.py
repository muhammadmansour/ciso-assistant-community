"""Read-only API over the django-auditlog trail.

Surfaces who created, updated or deleted what, so activity can be reviewed
without shell access to the database. Administrator-only: the trail spans every
folder, so per-object RBAC does not apply to it.
"""

import json

import django_filters as df
from auditlog.models import LogEntry
from django.db.models import CharField, Q
from django.db.models.fields.json import KeyTextTransform
from django.db.models.functions import Cast
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, serializers, viewsets

from core.permissions import IsAdministrator

# django-auditlog ships codes 0-3; 4 is written by deployments that record
# failed sign-in attempts.
ACTION_LABELS = {
    0: "create",
    1: "update",
    2: "delete",
    3: "access",
    4: "login_failed",
}
ACTION_CODES = {label: code for code, label in ACTION_LABELS.items()}


class ActivityLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()
    object_type = serializers.SerializerMethodField()
    folder = serializers.SerializerMethodField()
    changes = serializers.SerializerMethodField()

    class Meta:
        model = LogEntry
        fields = [
            "id",
            "timestamp",
            "user",
            "action",
            "object_type",
            "object_pk",
            "object_repr",
            "folder",
            "remote_addr",
            "changes",
        ]

    def _additional_data(self, obj):
        data = obj.additional_data
        return data if isinstance(data, dict) else {}

    def get_user(self, obj):
        if obj.actor_id:
            return obj.actor.email
        # Failed sign-ins have no actor; the attempted address is all there is.
        extra = self._additional_data(obj)
        return extra.get("user_email") or extra.get("username")

    def get_action(self, obj):
        return ACTION_LABELS.get(obj.action, str(obj.action))

    def get_object_type(self, obj):
        return obj.content_type.model if obj.content_type_id else None

    def get_folder(self, obj):
        return self._additional_data(obj).get("folder")

    def get_changes(self, obj):
        # `changes` is a JSONField on recent django-auditlog but a text column on
        # older ones, so accept either rather than relying on changes_dict.
        changes = obj.changes
        if isinstance(changes, str):
            try:
                changes = json.loads(changes)
            except ValueError:
                return {}
        if not isinstance(changes, dict):
            return {}
        if "password" in changes:
            changes = {**changes, "password": ["[redacted]", "[redacted]"]}
        return changes


class ActivityLogFilterSet(df.FilterSet):
    user = df.CharFilter(method="filter_user")
    action = df.CharFilter(method="filter_action")
    object_type = df.CharFilter(
        field_name="content_type__model", lookup_expr="icontains"
    )
    since = df.IsoDateTimeFilter(field_name="timestamp", lookup_expr="gte")
    until = df.IsoDateTimeFilter(field_name="timestamp", lookup_expr="lte")

    class Meta:
        model = LogEntry
        fields = ["user", "action", "object_type", "since", "until"]

    def filter_user(self, queryset, name, value):
        if not value:
            return queryset
        # Entries with no actor keep the address in additional_data only, so
        # match there too rather than silently dropping failed sign-ins.
        return queryset.annotate(
            _logged_email=Cast(
                KeyTextTransform("user_email", "additional_data"), CharField()
            ),
            _logged_username=Cast(
                KeyTextTransform("username", "additional_data"), CharField()
            ),
        ).filter(
            Q(actor__email__icontains=value)
            | Q(_logged_email__icontains=value)
            | Q(_logged_username__icontains=value)
        )

    def filter_action(self, queryset, name, value):
        codes = [
            ACTION_CODES[label]
            for label in (part.strip().lower() for part in value.split(","))
            if label in ACTION_CODES
        ]
        if not codes:
            return queryset.none()
        return queryset.filter(action__in=codes)


class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    """User activity from the audit trail, newest first."""

    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdministrator]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ActivityLogFilterSet
    search_fields = ["object_repr", "actor__email", "content_type__model"]
    ordering_fields = ["timestamp", "action"]
    ordering = ["-timestamp"]

    def get_queryset(self):
        return LogEntry.objects.select_related("actor", "content_type")
