"""
Grant document-management access (Operations → Documents sidebar + API).

Run after doc_management migrations when BI-RL-ADM predates document codenames.

  poetry run python manage.py grant_document_management_permissions --email admin@admin.com
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.core.management.base import BaseCommand, CommandError

from core.startup import ADMINISTRATOR_PERMISSIONS_LIST, startup
from global_settings.models import GlobalSettings
from iam.models import Folder, Role, RoleAssignment, UserGroup

DOCUMENT_MANAGEMENT_PERMISSIONS = [
    "view_documentcontainer",
    "view_published_documentcontainer",
    "add_documentcontainer",
    "change_documentcontainer",
    "delete_documentcontainer",
    "view_manageddocument",
    "add_manageddocument",
    "change_manageddocument",
    "delete_manageddocument",
    "view_documentrevision",
    "add_documentrevision",
    "change_documentrevision",
    "delete_documentrevision",
    "view_documentattachment",
    "add_documentattachment",
    "change_documentattachment",
    "delete_documentattachment",
    "view_documenttemplate",
    "add_documenttemplate",
    "change_documenttemplate",
    "delete_documenttemplate",
    "view_documentedit",
]


class Command(BaseCommand):
    help = (
        "Refresh BI-RL-ADM with document permissions, enable document_management flag, "
        "and ensure the user is in BI-UG-ADM."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--email",
            default="admin@admin.com",
            help="Login email (default: admin@admin.com).",
        )
        parser.add_argument(
            "--skip-startup",
            action="store_true",
            help="Only refresh BI-RL-ADM from ADMINISTRATOR_PERMISSIONS_LIST.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print planned changes without writing.",
        )

    def handle(self, *args, **options):
        email = (options["email"] or "").strip().lower()
        dry_run = options["dry_run"]
        User = get_user_model()
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist as exc:
            raise CommandError(f"No user with email {email!r}") from exc

        self.stdout.write(f"User: {user.email} (id={user.id})")
        self._ensure_doc_permissions_exist()

        if not options["skip_startup"]:
            if dry_run:
                self.stdout.write("Would run core startup.")
            else:
                self.stdout.write("Running core startup…")
                startup(sender=None)
        else:
            self._sync_administrator_role(dry_run)

        self._enable_document_management_flag(dry_run)
        self._add_user_to_admin_group(user, dry_run)
        self._ensure_direct_admin_role(user, dry_run)
        self._report(user)

    def _ensure_doc_permissions_exist(self):
        existing = set(
            Permission.objects.filter(
                codename__in=DOCUMENT_MANAGEMENT_PERMISSIONS
            ).values_list("codename", flat=True)
        )
        missing = sorted(set(DOCUMENT_MANAGEMENT_PERMISSIONS) - existing)
        if missing:
            raise CommandError(
                "Document permissions missing. Run migrate (core 0154 + doc_management). "
                f"Missing: {', '.join(missing)}"
            )

    def _sync_administrator_role(self, dry_run: bool):
        role = Role.objects.filter(name="BI-RL-ADM", builtin=True).first()
        if role is None:
            raise CommandError("BI-RL-ADM not found; run migrate or startup.")
        perms = Permission.objects.filter(codename__in=ADMINISTRATOR_PERMISSIONS_LIST)
        if dry_run:
            self.stdout.write(f"Would set BI-RL-ADM to {perms.count()} permissions.")
            return
        role.permissions.set(perms)
        self.stdout.write(f"BI-RL-ADM refreshed ({perms.count()} codenames).")

    def _enable_document_management_flag(self, dry_run: bool):
        name = GlobalSettings.Names.FEATURE_FLAGS
        gs = GlobalSettings.objects.filter(name=name).first()
        if gs is None:
            if dry_run:
                self.stdout.write("Would create feature-flags with document_management=true.")
                return
            GlobalSettings.objects.create(
                name=name, value={"document_management": True, "policy_documents": True}
            )
            self.stdout.write("Created feature-flags (document_management=true).")
            return
        value = dict(gs.value or {})
        changed = False
        for key in ("document_management", "policy_documents"):
            if value.get(key) is not True:
                value[key] = True
                changed = True
        if not changed:
            self.stdout.write("Feature flags document_management / policy_documents already on.")
            return
        if dry_run:
            self.stdout.write("Would enable document_management and policy_documents.")
            return
        gs.value = value
        gs.save(update_fields=["value"])
        self.stdout.write("Feature flags document_management and policy_documents enabled.")

    def _add_user_to_admin_group(self, user, dry_run: bool):
        root = Folder.get_root_folder()
        try:
            admin_group = UserGroup.objects.get(name="BI-UG-ADM", folder=root)
        except UserGroup.DoesNotExist as exc:
            raise CommandError("BI-UG-ADM not found; run migrate or startup.") from exc
        if user.user_groups.filter(pk=admin_group.pk).exists():
            self.stdout.write("User already in BI-UG-ADM.")
            return
        if dry_run:
            self.stdout.write("Would add user to BI-UG-ADM.")
            return
        user.user_groups.add(admin_group)
        self.stdout.write("Added user to BI-UG-ADM.")

    def _ensure_direct_admin_role(self, user, dry_run: bool):
        root = Folder.get_root_folder()
        adm_role = Role.objects.get(name="BI-RL-ADM", builtin=True)
        if RoleAssignment.objects.filter(user=user, role=adm_role).exists():
            return
        if dry_run:
            self.stdout.write(f"Would assign BI-RL-ADM to {user.email}.")
            return
        ra = RoleAssignment.objects.create(
            user=user,
            role=adm_role,
            is_recursive=True,
            builtin=False,
            folder=root,
        )
        ra.perimeter_folders.add(root)
        self.stdout.write(f"Assigned BI-RL-ADM to {user.email}.")

    def _report(self, user):
        perms = RoleAssignment.get_permissions(user)
        checks = ("view_documentcontainer", "view_published_documentcontainer")
        for codename in checks:
            ok = codename in perms
            self.stdout.write(f"  [{'OK' if ok else 'MISSING'}] {codename}")
        if all(c in perms for c in checks):
            self.stdout.write(
                self.style.SUCCESS("Document permissions active — re-login to refresh the sidebar.")
            )
        else:
            self.stdout.write(self.style.WARNING("Some checks failed; verify BI-UG-ADM / role assignments."))