from rest_framework import serializers

from core.serializers import BaseModelSerializer
from core.serializer_fields import FieldsRelatedField, PathField
from core.models import Terminology
from iam.models import Folder
from pmbok.models import (
    GenericCollection,
    Accreditation,
    Project,
    ResponsibilityRole,
    ResponsibilityMatrix,
    ResponsibilityMatrixActivity,
    ResponsibilityMatrixActor,
    ResponsibilityAssignment,
)


class GenericCollectionReadSerializer(BaseModelSerializer):
    path = PathField(read_only=True)
    folder = FieldsRelatedField()
    compliance_assessments = FieldsRelatedField(many=True)
    risk_assessments = FieldsRelatedField(many=True)
    crq_studies = FieldsRelatedField(many=True)
    ebios_studies = FieldsRelatedField(many=True)
    entity_assessments = FieldsRelatedField(many=True)
    findings_assessments = FieldsRelatedField(many=True)
    documents = FieldsRelatedField(many=True)
    document_containers = FieldsRelatedField(many=True)
    applied_controls = FieldsRelatedField(many=True)
    security_exceptions = FieldsRelatedField(many=True)
    policies = FieldsRelatedField(many=True)
    dependencies = FieldsRelatedField(many=True)
    filtering_labels = FieldsRelatedField(["id", "folder"], many=True)

    class Meta:
        model = GenericCollection
        fields = "__all__"


class GenericCollectionWriteSerializer(BaseModelSerializer):
    class Meta:
        model = GenericCollection
        fields = "__all__"


class AccreditationReadSerializer(BaseModelSerializer):
    path = PathField(read_only=True)
    folder = FieldsRelatedField()
    author = FieldsRelatedField()
    authority = FieldsRelatedField()
    linked_collection = FieldsRelatedField()
    collection_data = serializers.SerializerMethodField()
    checklist = FieldsRelatedField()
    filtering_labels = FieldsRelatedField(["id", "folder"], many=True)
    status = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    checklist_progress = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.status.get_name_translated

    def get_category(self, obj):
        return obj.category.get_name_translated

    def get_collection_data(self, obj):
        """Get the linked collection with all related objects"""
        if obj.linked_collection:
            return GenericCollectionReadSerializer(obj.linked_collection).data
        return None

    def get_checklist_progress(self, obj):
        """Get the progress percentage of the checklist compliance assessment"""
        if obj.checklist:
            return obj.checklist.get_progress()
        return None

    class Meta:
        model = Accreditation
        fields = "__all__"


class AccreditationWriteSerializer(BaseModelSerializer):
    class Meta:
        model = Accreditation
        fields = "__all__"


def _terminology_label(term):
    if term is None:
        return None
    return {
        "id": str(term.id),
        "name": term.name,
        "str": term.get_name_translated,
    }


class ProjectReadSerializer(BaseModelSerializer):
    path = PathField(read_only=True)
    folder = FieldsRelatedField()
    owner = FieldsRelatedField()
    sponsor = FieldsRelatedField()
    parent_project = FieldsRelatedField()
    sub_projects = FieldsRelatedField(many=True)
    linked_collection = FieldsRelatedField()
    collection_data = serializers.SerializerMethodField()
    responsibility_matrices = FieldsRelatedField(many=True)
    filtering_labels = FieldsRelatedField(["id", "folder"], many=True)
    status = serializers.SerializerMethodField()
    health = serializers.SerializerMethodField()

    def get_status(self, obj):
        return _terminology_label(obj.status)

    def get_health(self, obj):
        return _terminology_label(obj.health)

    def get_collection_data(self, obj):
        if obj.linked_collection_id:
            return GenericCollectionReadSerializer(obj.linked_collection).data
        return None

    class Meta:
        model = Project
        fields = "__all__"


class ProjectWriteSerializer(BaseModelSerializer):
    status = serializers.PrimaryKeyRelatedField(
        queryset=Terminology.objects.filter(
            field_path=Terminology.FieldPath.PROJECT_STATUS, is_visible=True
        ),
        required=False,
        allow_null=True,
    )
    health = serializers.PrimaryKeyRelatedField(
        queryset=Terminology.objects.filter(
            field_path=Terminology.FieldPath.PROJECT_HEALTH, is_visible=True
        ),
        required=False,
        allow_null=True,
    )
    responsibility_matrices = serializers.PrimaryKeyRelatedField(
        queryset=ResponsibilityMatrix.objects.all(),
        many=True,
        required=False,
    )
    create_collection = serializers.BooleanField(
        write_only=True, required=False, default=True
    )

    class Meta:
        model = Project
        fields = "__all__"

    def to_internal_value(self, data):
        if hasattr(data, "copy"):
            data = data.copy()
        else:
            data = dict(data)
        nullable = {
            "owner",
            "sponsor",
            "status",
            "health",
            "priority",
            "start_date",
            "end_date",
            "eta",
            "progress",
            "budget",
            "actual_cost",
            "linked_collection",
            "parent_project",
            "observation",
        }
        for key, value in list(data.items()):
            if value == "" and key in nullable:
                data[key] = None
            elif key == "kind" and value in ("", None):
                data[key] = Project.Kind.PROJECT
        if not data.get("folder"):
            root = Folder.get_root_folder()
            if root is not None:
                data["folder"] = str(root.id)
        return super().to_internal_value(data)

    def create(self, validated_data):
        create_collection = validated_data.pop("create_collection", True)
        explicit_collection = validated_data.get("linked_collection")
        instance = super().create(validated_data)
        if (
            not create_collection
            and not explicit_collection
            and instance.linked_collection_id
        ):
            instance.linked_collection.delete()
            instance.linked_collection = None
        return instance

    def update(self, instance, validated_data):
        validated_data.pop("create_collection", None)
        return super().update(instance, validated_data)

    def validate(self, data):
        instance = getattr(self, "instance", None)

        def current(field):
            return data.get(field, getattr(instance, field, None) if instance else None)

        start = current("start_date")
        end = current("end_date")
        eta = current("eta")
        if start and end and end < start:
            raise serializers.ValidationError(
                {"end_date": "End date cannot be earlier than start date."}
            )
        if start and eta and eta < start:
            raise serializers.ValidationError(
                {"eta": "ETA cannot be earlier than start date."}
            )
        return super().validate(data)

    def validate_parent_project(self, value):
        if value is None:
            return value
        instance = getattr(self, "instance", None)
        if instance is None:
            return value
        if value.pk == instance.pk:
            raise serializers.ValidationError("A project cannot be its own parent.")
        descendants = set()
        queue = list(
            Project.objects.filter(parent_project=instance.pk).values_list("pk", flat=True)
        )
        while queue:
            current = queue.pop()
            if current in descendants:
                continue
            descendants.add(current)
            queue.extend(
                Project.objects.filter(parent_project=current).values_list("pk", flat=True)
            )
        if value.pk in descendants:
            raise serializers.ValidationError(
                "Setting this project as parent would create a cycle."
            )
        return value


class ResponsibilityRoleReadSerializer(BaseModelSerializer):
    folder = FieldsRelatedField()

    class Meta:
        model = ResponsibilityRole
        fields = "__all__"


class ResponsibilityRoleWriteSerializer(BaseModelSerializer):
    class Meta:
        model = ResponsibilityRole
        fields = "__all__"


class ResponsibilityMatrixReadSerializer(BaseModelSerializer):
    path = PathField(read_only=True)
    folder = FieldsRelatedField()
    roles = FieldsRelatedField(
        ["id", "code", "name", "color", "order", "taxonomy"], many=True
    )
    projects = FieldsRelatedField(many=True)
    filtering_labels = FieldsRelatedField(["id", "folder"], many=True)
    activities_count = serializers.SerializerMethodField()

    def get_activities_count(self, obj):
        return obj.activities.count()

    class Meta:
        model = ResponsibilityMatrix
        fields = "__all__"


class ResponsibilityMatrixWriteSerializer(BaseModelSerializer):
    class Meta:
        model = ResponsibilityMatrix
        fields = "__all__"

    def to_internal_value(self, data):
        if hasattr(data, "copy"):
            data = data.copy()
        else:
            data = dict(data)
        if data.get("preset") in ("", None) and "preset" in data:
            data["preset"] = ResponsibilityMatrix.Preset.RACI
        if not data.get("folder"):
            root = Folder.get_root_folder()
            if root is not None:
                data["folder"] = str(root.id)
        return super().to_internal_value(data)

    def create(self, validated_data):
        roles = validated_data.pop("roles", None)
        instance = super().create(validated_data)
        if not roles and instance.preset != ResponsibilityMatrix.Preset.CUSTOM:
            instance.roles.set(
                ResponsibilityRole.objects.filter(
                    taxonomy=instance.preset, builtin=True, is_visible=True
                )
            )
        elif roles:
            instance.roles.set(roles)
        return instance


class ResponsibilityMatrixActivityReadSerializer(BaseModelSerializer):
    matrix = FieldsRelatedField()
    assets = FieldsRelatedField(many=True)
    applied_controls = FieldsRelatedField(many=True)
    task_templates = FieldsRelatedField(many=True)
    risk_assessments = FieldsRelatedField(many=True)
    compliance_assessments = FieldsRelatedField(many=True)
    findings_assessments = FieldsRelatedField(many=True)
    business_impact_analyses = FieldsRelatedField(many=True)

    class Meta:
        model = ResponsibilityMatrixActivity
        fields = "__all__"


class ResponsibilityMatrixActivityWriteSerializer(BaseModelSerializer):
    class Meta:
        model = ResponsibilityMatrixActivity
        fields = "__all__"

    def validate_matrix(self, value):
        self._ensure_immutable("matrix", value)
        return value


class ResponsibilityMatrixActorReadSerializer(BaseModelSerializer):
    matrix = FieldsRelatedField()
    actor = FieldsRelatedField()

    class Meta:
        model = ResponsibilityMatrixActor
        fields = "__all__"


class ResponsibilityMatrixActorWriteSerializer(BaseModelSerializer):
    class Meta:
        model = ResponsibilityMatrixActor
        fields = "__all__"

    def validate_matrix(self, value):
        self._ensure_immutable("matrix", value)
        return value


class ResponsibilityAssignmentReadSerializer(BaseModelSerializer):
    activity = FieldsRelatedField()
    actor = FieldsRelatedField()
    role = FieldsRelatedField(["id", "code", "name", "color"])

    class Meta:
        model = ResponsibilityAssignment
        fields = "__all__"


class ResponsibilityAssignmentWriteSerializer(BaseModelSerializer):
    class Meta:
        model = ResponsibilityAssignment
        fields = "__all__"
