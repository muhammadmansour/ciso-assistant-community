"""
Grant a user full access to the project-management module (sidebar + API).

Typical remote fix when Collections/Accreditations show but Projects and
Responsibility matrices do not: migrations ran before PM permissions existed,
or the user is not in the global administrators group.

Usage (from backend/, with env and database configured):

  poetry run python manage.py grant_project_management_permissions --email admin@admin.com

Or:

  poetry run grant-pm-permissions admin@admin.com
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.core.management.base import BaseCommand, CommandError

from core.startup import ADMINISTRATOR_PERMISSIONS_LIST, startup
from global_settings.models import GlobalSettings
from iam.models import Folder, Role, RoleAssignment, UserGroup

# Codenames required for the project-management sidebar and CRUD (pmbok).
PROJECT_MANAGEMENT_PERMISSIONS = [
    "view_genericcollection",
    "add_genericcollection",
    "change_genericcollection",
    "delete_genericcollection",
    "view_accreditation",
    "add_accreditation",
    "change_accreditation",
    "delete_accreditation",
    "view_project",
    "add_project",
    "change_project",
    "delete_project",
    "view_responsibilityrole",
    "view_responsibilitymatrix",
    "add_responsibilitymatrix",
    "change_responsibilitymatrix",
    "delete_responsibilitymatrix",
    "view_responsibilitymatrixactivity",
    "add_responsibilitymatrixactivity",
    "change_responsibilitymatrixactivity",
    "delete_responsibilitymatrixactivity",
    "view_responsibilitymatrixactor",
    "add_responsibilitymatrixactor",
    "change_responsibilitymatrixactor",
    "delete_responsibilitymatrixactor",
    "view_responsibilityassignment",
]


class Command(BaseCommand):
    help = (
        "Sync built-in admin role PM permissions, add user to BI-UG-ADM, "
        "and enable the project_management feature flag."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--email",
            default="admin@admin.com",
            help="Login email of the user to update (default: admin@admin.com).",
        )
        parser.add_argument(
            "--skip-startup",
            action="store_true",
            help="Do not re-run the full core startup handler (roles, terminologies, etc.).",
        )
        parser.add_argument(
            "--admin-group-only",
            action="store_true",
            help="Only add the user to BI-UG-ADM; skip role and feature-flag sync.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print planned changes without writing to the database.",
        )

    def handle(self, *args, **options):
        email = (options["email"] or "").strip().lower()
        if not email:
            raise CommandError("--email is required")

        dry_run = options["dry_run"]
        User = get_user_model()
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist as exc:
            raise CommandError(f"No user with email {email!r}") from exc

        self.stdout.write(f"User: {user.email} (id={user.id})")

        if not options["admin_group_only"]:
            self._ensure_pm_permissions_exist()
            if not options["skip_startup"]:
                if dry_run:
                    self.stdout.write("Would run core startup (roles, PM seeds, feature data).")
                else:
                    self.stdout.write("Running core startup to refresh built-in roles…")
                    startup(sender=None)
            else:
                self._sync_administrator_role(dry_run)

            self._enable_project_management_flag(dry_run)

        self._ensure_admin_group_role_assignment(dry_run)
        self._add_user_to_admin_group(user, dry_run)
        self._ensure_direct_admin_role(user, dry_run)
        self._report_effective_permissions(user)

    def _ensure_pm_permissions_exist(self):
        existing = set(
            Permission.objects.filter(
                codename__in=PROJECT_MANAGEMENT_PERMISSIONS
            ).values_list("codename", flat=True)
        )
        missing = sorted(set(PROJECT_MANAGEMENT_PERMISSIONS) - existing)
        if missing:
            raise CommandError(
                "PM permissions are missing in django.contrib.auth_permission. "
                f"Apply migrations first (pmbok + core). Missing: {', '.join(missing)}"
            )

    def _sync_administrator_role(self, dry_run: bool):
        role = Role.objects.filter(name="BI-RL-ADM", builtin=True).first()
        if role is None:
            raise CommandError("Built-in role BI-RL-ADM not found; run migrate or startup.")
        perms = Permission.objects.filter(codename__in=ADMINISTRATOR_PERMISSIONS_LIST)
        if dry_run:
            self.stdout.write(
                f"Would set BI-RL-ADM to {perms.count()} administrator permissions."
            )
            return
        role.permissions.set(perms)
        self.stdout.write(f"BI-RL-ADM permissions refreshed ({perms.count()} codenames).")

    def _enable_project_management_flag(self, dry_run: bool):
        name = GlobalSettings.Names.FEATURE_FLAGS
        gs = GlobalSettings.objects.filter(name=name).first()
        if gs is None:
            if dry_run:
                self.stdout.write("Would create feature-flags with project_management=true.")
                return
            gs = GlobalSettings.objects.create(name=name, value={"project_management": True})
            self.stdout.write("Created feature-flags with project_management=true.")
            return
        value = dict(gs.value or {})
        if value.get("project_management") is True:
            self.stdout.write("Feature flag project_management already enabled.")
            return
        if dry_run:
            self.stdout.write("Would set feature flag project_management=true.")
            return
        value["project_management"] = True
        gs.value = value
        gs.save(update_fields=["value"])
        self.stdout.write("Feature flag project_management enabled.")

    def _ensure_admin_group_role_assignment(self, dry_run: bool):
        root = Folder.get_root_folder()
        try:
            admin_group = UserGroup.objects.get(name="BI-UG-ADM", folder=root)
        except UserGroup.DoesNotExist as exc:
            raise CommandError(
                "User group BI-UG-ADM not found; run migrate or startup."
            ) from exc

        adm_role = Role.objects.filter(name="BI-RL-ADM", builtin=True).first()
        if adm_role is None:
            raise CommandError("Built-in role BI-RL-ADM not found; run migrate or startup.")

        has_ra = RoleAssignment.objects.filter(
            user_group=admin_group, role=adm_role
        ).exists()
        if has_ra:
            return
        if dry_run:
            self.stdout.write(
                "Would create missing BI-UG-ADM → BI-RL-ADM role assignment."
            )
            return
        ra = RoleAssignment.objects.create(
            user_group=admin_group,
            role=adm_role,
            is_recursive=True,
            builtin=True,
            folder=root,
        )
        ra.perimeter_folders.add(root)
        self.stdout.write("Created BI-UG-ADM → BI-RL-ADM role assignment.")

    def _ensure_direct_admin_role(self, user, dry_run: bool):
        root = Folder.get_root_folder()
        adm_role = Role.objects.get(name="BI-RL-ADM", builtin=True)
        if RoleAssignment.objects.filter(user=user, role=adm_role).exists():
            return
        if dry_run:
            self.stdout.write(f"Would assign BI-RL-ADM directly to {user.email}.")
            return
        ra = RoleAssignment.objects.create(
            user=user,
            role=adm_role,
            is_recursive=True,
            builtin=False,
            folder=root,
        )
        ra.perimeter_folders.add(root)
        self.stdout.write(f"Assigned BI-RL-ADM directly to {user.email}.")

    def _add_user_to_admin_group(self, user, dry_run: bool):
        root = Folder.get_root_folder()
        try:
            admin_group = UserGroup.objects.get(name="BI-UG-ADM", folder=root)
        except UserGroup.DoesNotExist as exc:
            raise CommandError(
                "User group BI-UG-ADM not found; run migrate or startup."
            ) from exc

        if user.user_groups.filter(pk=admin_group.pk).exists():
            self.stdout.write("User is already in BI-UG-ADM (global administrators).")
            return
        if dry_run:
            self.stdout.write("Would add user to BI-UG-ADM.")
            return
        user.user_groups.add(admin_group)
        self.stdout.write("Added user to BI-UG-ADM (global administrators).")

    def _report_effective_permissions(self, user):
        perms = RoleAssignment.get_permissions(user)
        checks = ("view_project", "view_responsibilitymatrix", "add_project")
        for codename in checks:
            ok = codename in perms
            mark = "OK" if ok else "MISSING"
            self.stdout.write(f"  [{mark}] {codename}")
        if not all(c in perms for c in checks):
            self.stdout.write(
                self.style.WARNING(
                    "Some checks failed. Ensure the user has a role assignment "
                    "covering their folder (BI-UG-ADM uses recursive global admin)."
                )
            )
        else:
            self.stdout.write(self.style.SUCCESS("Project management permissions are active for this user."))