import hashlib
from enum import Enum
import json
import re
from re import sub
from typing import Literal
from datetime import datetime, timedelta, date

from django.utils.translation import gettext_lazy as _
from django.conf import settings

from rest_framework.exceptions import ValidationError
import structlog
import calendar
from dateutil import relativedelta as rd

logger = structlog.get_logger(__name__)


def sizeof_json(obj) -> int:
    """
    Returns the size of a JSON-encoded object in bytes.
    If obj is already bytes (compressed), return its length directly.
    """
    if isinstance(obj, (bytes, bytearray, memoryview)):
        return len(obj)
    return len(json.dumps(obj).encode("utf-8"))


def camel_case(s):
    if not s:
        return ""
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")

    return "".join([s[0].lower(), s[1:]])


def sha256(string: bytes) -> str:
    """Return the SHA256-hashed hexadecimal representation of the bytes object given as argument."""
    h = hashlib.new("SHA256")
    h.update(string)
    return h.hexdigest()


class RoleCodename(Enum):
    ADMINISTRATOR = "BI-RL-ADM"
    DOMAIN_MANAGER = "BI-RL-DMA"
    ANALYST = "BI-RL-ANA"
    APPROVER = "BI-RL-APP"
    READER = "BI-RL-AUD"
    THIRD_PARTY_RESPONDENT = "BI-RL-TPR"

    def __str__(self) -> str:
        return self.value


class UserGroupCodename(Enum):
    ADMINISTRATOR = "BI-UG-ADM"
    GLOBAL_READER = "BI-UG-GAD"
    GLOBAL_APPROVER = "BI-UG-GAP"
    DOMAIN_MANAGER = "BI-UG-DMA"
    ANALYST = "BI-UG-ANA"
    APPROVER = "BI-UG-APP"
    READER = "BI-UG-AUD"
    THIRD_PARTY_RESPONDENT = "BI-UG-TPR"

    def __str__(self) -> str:
        return self.value


BUILTIN_ROLE_CODENAMES = {
    str(RoleCodename.ADMINISTRATOR): _("Administrator"),
    str(RoleCodename.DOMAIN_MANAGER): _("Domain manager"),
    str(RoleCodename.ANALYST): _("Analyst"),
    str(RoleCodename.APPROVER): _("Approver"),
    str(RoleCodename.READER): _("Reader"),
    str(RoleCodename.THIRD_PARTY_RESPONDENT): _("Third-party respondent"),
}

BUILTIN_USERGROUP_CODENAMES = {
    str(UserGroupCodename.ADMINISTRATOR): _("Administrator"),
    str(UserGroupCodename.GLOBAL_READER): _("Reader"),
    str(UserGroupCodename.GLOBAL_APPROVER): _("Approver"),
    str(UserGroupCodename.DOMAIN_MANAGER): _("Domain manager"),
    str(UserGroupCodename.ANALYST): _("Analyst"),
    str(UserGroupCodename.APPROVER): _("Approver"),
    str(UserGroupCodename.READER): _("Reader"),
    str(UserGroupCodename.THIRD_PARTY_RESPONDENT): _("Third-party respondent"),
}

# NOTE: This is set to "Main" now, but will be changed to a unique identifier
# for internationalization.
MAIN_ENTITY_DEFAULT_NAME = "Main"

COUNTRY_FLAGS = {
    "fr": "🇫🇷",
    "en": "🇬🇧",
}

LANGUAGES = {
    "fr": _("French"),
    "en": _("English"),
}


class VersionFormatError(Exception):
    """Raised when a version string is not properly formatted."""

    pass


def parse_version(version: str) -> list[int]:
    """
    Parses a version string that starts with 'v' and contains dot-separated numbers.
    Accepts strings like 'v1', 'v1.2', or 'v1.2.3'.
    """
    if not version.startswith("v"):
        raise VersionFormatError(f"Version must start with 'v': {version}")
    # Remove leading 'v' and split on dots
    parts = version.lstrip("v").split(".")
    try:
        return [int(part) for part in parts]
    except ValueError as e:
        raise VersionFormatError(f"Non-numeric version component in {version}") from e


def compare_versions(
    version_a: str, version_b: str, level: Literal["major", "minor", "patch"] = "patch"
) -> int:
    """
    Compares two version strings at the specified level of granularity.

    Parameters:
        version_a (str): A version string (e.g., 'v1.2.3' or 'v1.2').
        version_b (str): Another version string.
        level (str): Granularity to compare: 'major' (only the first component),
                     'minor' (first two components), or 'patch' (all three components).
                     For example, comparing 'v1.2' with 'v1.2.0' at level='minor' will be equal.

    Returns:
        int: -1 if version_a is lower than version_b;
             0 if they are equal (up to the specified level);
             1 if version_a is greater than version_b.

    Raises:
        VersionFormatError: if either version string is not formatted correctly.
        ValueError: if an invalid level is specified.

    Example:
        >>> compare_versions("v1.2", "v1.2.0", level="minor")
        0
        >>> compare_versions("v1.2.1", "v1.2.0", level="patch")
        1
        >>> compare_versions("v2", "v1.9.9", level="major")
        1
    """
    level_to_parts = {"major": 1, "minor": 2, "patch": 3}
    if level not in level_to_parts:
        raise ValueError(
            "Invalid level specified; choose 'major', 'minor', or 'patch'."
        )
    parts_to_check = level_to_parts[level]

    va = parse_version(version_a)
    vb = parse_version(version_b)

    # Pad with zeros if necessary
    while len(va) < parts_to_check:
        va.append(0)
    while len(vb) < parts_to_check:
        vb.append(0)

    # Compare component-wise using tuple comparison
    if tuple(va[:parts_to_check]) < tuple(vb[:parts_to_check]):
        return -1
    elif tuple(va[:parts_to_check]) > tuple(vb[:parts_to_check]):
        return 1
    return 0


def compare_schema_versions(
    schema_ver_a: int | None,
    version_a: str | None,
    version_b: str = settings.VERSION.split("-")[0],
    schema_ver_b: int = settings.SCHEMA_VERSION,
    level: Literal["major", "minor", "patch"] = "patch",
):
    """
    Compares the schema version in a backup with the current schema version,
    falling back to a semantic version comparison if no schema version is provided.

    Parameters:
        schema_ver_a (int): The schema version stored in the backup.
        version_a (str): The application version stored in the backup (e.g., '1.2.3').
        version_b (str, optional): The current application version. Defaults to
                                   `settings.VERSION.split("-")[0]`.
        schema_ver_b (int, optional): The current schema version. Defaults to
                                      `settings.SCHEMA_VERSION`.
        level (str, optional): Granularity to compare for the semantic version check:
                               'major' (first component), 'minor' (first two components),
                               or 'patch' (all three components). Defaults to 'patch'.

    Raises:
        ValidationError: If the backup's schema version is greater than the current schema version,
                        or if the backup's version is not compatible with the current version.

    Logs:
        - Logs an info message if a schema version is found in the backup.
        - Logs an error and raises a `ValidationError` if the backup's schema version
          is greater than the current schema version.
        - Logs an info message if no schema version is found and falls back to a
          semantic version comparison.
        - Logs an error and raises a `ValidationError` if the backup version is
          greater than or incompatible with the current version.

    Example:
        >>> compare_schema_versions(3, "1.2.0", "1.3.0", schema_ver_b=3, level="minor")
        # No error raised, schema versions match, versions are not checked.

        >>> compare_schema_versions(4, schema_ver_b=3, level="minor")
        ValidationError: {'error': 'backupGreaterVersionError'}

        >>> compare_schema_versions(None, "1.4.0", "1.3.0", level="minor")
        ValidationError: {'error': 'backupGreaterVersionError'}
    """
    if schema_ver_a is not None:
        logger.info(
            "Schema version found in backup",
            backup_schema_version=schema_ver_a,
        )
        if schema_ver_a > schema_ver_b:
            logger.error(
                "Backup schema version greater than current schema version",
                backup_schema_version=schema_ver_a,
                ciso_assistant_schema_version=schema_ver_b,
            )
            raise ValidationError({"error": "backupGreaterVersionError"})
        elif schema_ver_a < schema_ver_b:
            logger.info(
                "Backup schema version less than current schema version",
                backup_schema_version=schema_ver_a,
                ciso_assistant_schema_version=schema_ver_b,
            )
            raise ValidationError({"error": "backupLowerVersionError"})
        logger.info("Schema version in backup matches current schema version")
    else:
        logger.info(
            "Schema version not found in backup, using version instead",
            import_version=version_a,
        )
        current_version = version_b

        # Compare backup and current versions at the 'minor' level
        cmp_minor = compare_versions(version_a, current_version, level="minor")
        if cmp_minor == 1:
            logger.error(
                "Backup version greater than current version",
                version=version_a,
            )
            raise ValidationError({"error": "backupGreaterVersionError"})
        elif cmp_minor != 0:
            logger.error(
                f"Import version {version_a} not compatible with current version {current_version}"
            )
            raise ValidationError(
                {"error": "importVersionNotCompatibleWithCurrentVersion"}
            )


def time_state(date_str: str) -> dict:
    """
    Determine the state based on the provided date string.

    Args:
        date_str (str): Date string in ISO 8601 format.

    Returns:
        dict: A dictionary with 'name' and 'hexcolor' keys indicating the state.
              - 'incoming' if the date is in the future.
              - 'outdated' if the date is in the past.
              - 'today' if the date exactly matches the current time.
    """
    # Parse the date string
    eta = datetime.fromisoformat(date_str)
    # Get the current date and time. If eta contains timezone info, use it.
    now = datetime.now(eta.tzinfo) if eta.tzinfo else datetime.now()

    if eta > now:
        return {"name": "incoming", "hexcolor": "#93c5fd"}
    elif eta < now:
        return {"name": "outdated", "hexcolor": "#f87171"}
    else:
        return {"name": "today", "hexcolor": "#fbbf24"}


def _convert_to_python_weekday(day):
    """Converts from 0=Sunday to 0=Monday weekday format"""
    return (day - 1) % 7


def _get_month_range(year, month):
    """Returns first and last day of given month"""
    first_day = date(year, month, 1)
    last_day = date(year, month, calendar.monthrange(year, month)[1])
    return first_day, last_day


def _get_nth_weekday_of_month(year, month, weekday, n):
    """Gets the nth occurrence of a specific weekday in a month"""
    first_day, last_day = _get_month_range(year, month)

    if n < 0:  # Handle negative indexing (from end of month)
        current_date = last_day
        count = 0
        while current_date >= first_day:
            if current_date.weekday() == weekday:
                count -= 1
                if count == n:
                    return current_date
            current_date -= timedelta(days=1)
        return None
    else:  # Handle positive indexing (from start of month)
        current_date = first_day
        days_to_add = (weekday - current_date.weekday()) % 7
        first_occurrence = current_date + timedelta(days=days_to_add)
        target_date = first_occurrence + timedelta(days=(n - 1) * 7)

        # Check if still in same month
        return target_date if target_date.month == month else None


def _date_matches_schedule(task, date_to_check):
    """Checks if a given date matches the schedule pattern"""
    schedule = task.schedule
    frequency = schedule.get("frequency")

    if frequency == "DAILY":
        return True

    # Python's weekday() returns 0 for Monday, 6 for Sunday
    # Convert to 0=Sunday, 6=Saturday for our system
    weekday = date_to_check.weekday()
    adjusted_weekday = (weekday + 1) % 7

    if frequency == "WEEKLY":
        days_of_week = schedule.get("days_of_week", [])
        return not days_of_week or adjusted_weekday in days_of_week

    elif frequency == "MONTHLY":
        days_of_week = schedule.get("days_of_week", [])
        weeks_of_month = schedule.get("weeks_of_month", [])

        # If both are empty, any day matches
        if not days_of_week and not weeks_of_month:
            return True

        # Check days of week if specified
        if days_of_week and adjusted_weekday not in days_of_week:
            return False

        # Check weeks of month if specified
        if weeks_of_month:
            # Calculate which occurrence of the weekday it is in the month
            first_day = date(date_to_check.year, date_to_check.month, 1)
            first_matching_day = first_day

            while first_matching_day.weekday() != weekday:
                first_matching_day += timedelta(days=1)

            occurrence = ((date_to_check.day - first_matching_day.day) // 7) + 1

            # Check if it's the last occurrence (-1)
            if -1 in weeks_of_month:
                next_month = date(
                    date_to_check.year + (1 if date_to_check.month == 12 else 0),
                    1 if date_to_check.month == 12 else date_to_check.month + 1,
                    1,
                )
                last_day = next_month - timedelta(days=1)
                last_matching_day = last_day

                while last_matching_day.weekday() != weekday:
                    last_matching_day -= timedelta(days=1)

                if date_to_check == last_matching_day:
                    return True

            return occurrence in weeks_of_month

        return True

    elif frequency == "YEARLY":
        months_of_year = schedule.get("months_of_year", [])
        days_of_week = schedule.get("days_of_week", [])
        weeks_of_month = schedule.get("weeks_of_month", [])

        # Check month
        if months_of_year and date_to_check.month not in months_of_year:
            return False

        # If no further restrictions, any day in valid months matches
        if not days_of_week and not weeks_of_month:
            return True

        # Check day of week
        if days_of_week and adjusted_weekday not in days_of_week:
            return False

        # Check week of month
        if weeks_of_month:
            day = date_to_check.day
            week_of_month = ((day - 1) // 7) + 1

            # Check for last week special case (-1)
            if -1 in weeks_of_month:
                last_day = calendar.monthrange(date_to_check.year, date_to_check.month)[
                    1
                ]
                if last_day - date_to_check.day < 7:
                    return True

            return week_of_month in weeks_of_month

        return True

    return False


def _calculate_next_occurrence(task, base_date):
    """Calculates the next occurrence date based on the schedule"""
    if not task.schedule:
        return None

    schedule = task.schedule
    frequency = schedule.get("frequency")
    interval = schedule.get("interval", 1)

    if frequency == "DAILY":
        return base_date + timedelta(days=interval)

    elif frequency == "WEEKLY":
        days_of_week = schedule.get("days_of_week", [])

        if not days_of_week:
            return base_date + timedelta(weeks=interval)

        current_weekday = base_date.weekday()
        current_dow_adjusted = (current_weekday + 1) % 7
        sorted_days = sorted(days_of_week)

        # Find next day in the same week
        next_day = next(
            (day for day in sorted_days if day > current_dow_adjusted), None
        )

        if next_day is not None:
            # Calculate days to add
            python_weekday = _convert_to_python_weekday(next_day)
            days_to_add = (python_weekday - current_weekday) % 7
            if days_to_add == 0:  # Same day next week
                days_to_add = 7
            return base_date + timedelta(days=days_to_add)
        else:
            # Move to first day of next week
            first_day_next_week = sorted_days[0]
            python_weekday = _convert_to_python_weekday(first_day_next_week)
            days_to_add = (python_weekday - current_weekday) % 7
            if days_to_add == 0:  # Same day next week
                days_to_add = 7
            days_to_add += 7 * (interval - 1)  # Add interval weeks
            return base_date + timedelta(days=days_to_add)

    elif frequency == "MONTHLY":
        days_of_week = schedule.get("days_of_week", [])
        weeks_of_month = schedule.get("weeks_of_month", [])

        if not days_of_week and not weeks_of_month:
            return base_date + rd.relativedelta(months=interval)

        # Check remaining days in current month first
        next_date = base_date + timedelta(days=1)
        while next_date.month == base_date.month:
            if _date_matches_schedule(task, next_date):
                return next_date
            next_date += timedelta(days=1)

        # Calculate for next month(s)
        target_month = base_date.month + interval
        target_year = base_date.year

        # Adjust year if needed
        while target_month > 12:
            target_month -= 12
            target_year += 1

        possible_dates = []

        if weeks_of_month and days_of_week:
            for week in sorted(weeks_of_month):
                for day in sorted(days_of_week):
                    python_weekday = _convert_to_python_weekday(day)

                    if week < 0:  # Last occurrence of weekday
                        last_day = calendar.monthrange(target_year, target_month)[1]
                        last_date = date(target_year, target_month, last_day)

                        # Find last occurrence of this weekday
                        days_diff = (last_date.weekday() - python_weekday) % 7
                        if days_diff > 0:
                            target_date = last_date - timedelta(days=days_diff)
                        else:
                            target_date = last_date - timedelta(days=7 - days_diff)

                        if target_date.month == target_month:
                            possible_dates.append(target_date)
                    else:
                        target_date = _get_nth_weekday_of_month(
                            target_year, target_month, python_weekday, week
                        )
                        if target_date:
                            possible_dates.append(target_date)
        else:
            # Use same day in next month(s)
            day = min(base_date.day, calendar.monthrange(target_year, target_month)[1])
            possible_dates.append(date(target_year, target_month, day))

        # Return earliest date after base_date
        valid_dates = [d for d in possible_dates if d > base_date]
        if valid_dates:
            return min(valid_dates)

        # Try next interval if no valid dates found
        return _calculate_next_occurrence(
            task, base_date + rd.relativedelta(months=interval)
        )

    elif frequency == "YEARLY":
        months_of_year = schedule.get("months_of_year", [])
        days_of_week = schedule.get("days_of_week", [])
        weeks_of_month = schedule.get("weeks_of_month", [])

        if not months_of_year and not days_of_week and not weeks_of_month:
            return base_date + rd.relativedelta(years=interval)

        target_year = base_date.year

        # If we're past all months in current year, move to next year
        if months_of_year and base_date.month > max(months_of_year):
            target_year += interval
        elif base_date.month == 12:  # End of year case
            target_year += interval

        sorted_months = sorted(months_of_year) if months_of_year else [base_date.month]
        possible_dates = []

        for month in sorted_months:
            if not days_of_week and not weeks_of_month:
                # Same day each year
                last_day_of_month = calendar.monthrange(target_year, month)[1]
                day = min(base_date.day, last_day_of_month)
                possible_dates.append(date(target_year, month, day))
            elif weeks_of_month and days_of_week:
                # Specific week/day combinations
                for week in sorted(weeks_of_month):
                    for day in sorted(days_of_week):
                        python_weekday = _convert_to_python_weekday(day)

                        if week < 0:  # From end of month
                            target_date = _get_nth_weekday_of_month(
                                target_year, month, python_weekday, week
                            )
                            if target_date:
                                possible_dates.append(target_date)
                        else:
                            target_date = _get_nth_weekday_of_month(
                                target_year, month, python_weekday, week
                            )
                            if target_date:
                                possible_dates.append(target_date)
            elif days_of_week:
                # All occurrences of specified weekdays in month
                for day in range(1, calendar.monthrange(target_year, month)[1] + 1):
                    check_date = date(target_year, month, day)
                    adjusted_weekday = (check_date.weekday() + 1) % 7
                    if adjusted_weekday in days_of_week:
                        possible_dates.append(check_date)
            else:
                # Just specified weeks of month
                day = min(base_date.day, calendar.monthrange(target_year, month)[1])
                possible_dates.append(date(target_year, month, day))

        # Return earliest date after base_date
        valid_dates = [d for d in possible_dates if d > base_date]
        if valid_dates:
            return min(valid_dates)

        # If no valid dates, try next interval
        return date(target_year + interval, sorted_months[0], 1)

    return None


def _create_task_dict(task, task_date):
    """Creates a dictionary representing a future task based on the template."""

    # Create task dictionary with all necessary properties
    task_dict = {
        "id": task.id,
        "virtual": True,
        "name": task.name,
        "description": task.description,
        "due_date": task_date,
        "status": "pending",
        "task_template": task.id,
    }

    return task_dict


def _generate_occurrences(template, start_date, end_date):
    """Generates future occurrences for a task template."""
    occurrences = []

    if not template.schedule:
        return occurrences

    # Determine start date
    base_date = template.task_date or datetime.now().date()

    # Get recurrence settings
    end_recurrence_date = None
    end_recurrence_date_str = template.schedule.get("end_date")
    if end_recurrence_date_str:
        end_recurrence_date = datetime.strptime(
            end_recurrence_date_str, "%Y-%m-%d"
        ).date()
        if end_recurrence_date < start_date:
            return occurrences  # Recurrence ended before our range

    max_occurrences = template.schedule.get("occurrences")

    # Find first occurrence on or after start_date
    current_date = base_date
    while current_date < start_date:
        next_date = _calculate_next_occurrence(template, current_date)
        if not next_date or (end_recurrence_date and next_date > end_recurrence_date):
            return occurrences  # No occurrences in our range
        current_date = next_date

    occurrence_count = 0

    # Generate occurrences in the date range
    while current_date and current_date <= end_date:
        # Check if recurrence has ended
        if (end_recurrence_date and current_date > end_recurrence_date) or (
            max_occurrences and occurrence_count >= max_occurrences
        ):
            break

        # Generate task if date matches schedule pattern
        if _date_matches_schedule(template, current_date):
            occurrences.append(_create_task_dict(template, current_date))
            occurrence_count += 1

        # Calculate next date
        current_date = _calculate_next_occurrence(template, current_date)

    return occurrences


def _is_question_visible(question, answers):
    """Check if a question is visible based on depends_on logic."""
    depends_on = question.get("depends_on")
    if not depends_on:
        return True

    target_answer = answers.get(depends_on["question"])
    if not target_answer:
        return False

    if depends_on["condition"] == "any":
        if isinstance(target_answer, list):
            return any(a in depends_on["answers"] for a in target_answer)
        return target_answer in depends_on["answers"]

    if depends_on["condition"] == "all":
        if isinstance(target_answer, list):
            return all(a in target_answer for a in depends_on["answers"])
        return target_answer == depends_on["answers"][0]

    return True


def update_selected_implementation_groups(compliance_assessment):
    """Recalculate selected IGs based on all visible answers in the assessment."""
    igs_to_select = set()

    requirement_assessments = (
        compliance_assessment.requirement_assessments.select_related(
            "requirement", "requirement__framework"
        ).all()
    )
    for ra in requirement_assessments:
        answers = ra.answers or {}
        if not ra.requirement.questions:
            continue
        for question_urn, question in ra.requirement.questions.items():
            if not _is_question_visible(question, answers):
                continue

            question_answers = answers.get(question_urn)
            if not question_answers:
                continue
            if not isinstance(question_answers, list):
                question_answers = [question_answers]

            for choice in question["choices"]:
                if choice["urn"] in question_answers:
                    igs_to_select.update(choice.get("select_implementation_groups", []))

        for ig in ra.requirement.framework.implementation_groups_definition:
            if ig.get("default_selected"):
                igs_to_select.add(ig["ref_id"])

    compliance_assessment.selected_implementation_groups = list(igs_to_select)
    compliance_assessment.save(update_fields=["selected_implementation_groups"])


def get_report_timezone():
    """Timezone for document/report exports (upstream-compatible stub)."""
    from zoneinfo import ZoneInfo

    from global_settings.models import GlobalSettings

    general = GlobalSettings.objects.filter(name=GlobalSettings.Names.GENERAL).first()
    value = general.value if general and isinstance(general.value, dict) else {}
    try:
        return ZoneInfo(str(value.get("report_timezone") or "UTC"))
    except (ValueError, KeyError, OSError):
        return ZoneInfo("UTC")


def get_global_currency() -> str:
    """Get the currency from global settings, defaulting to SAR."""
    from global_settings.models import GlobalSettings

    general_settings = GlobalSettings.objects.filter(name="general").first()
    value = general_settings.value if general_settings else None
    return (value or {}).get("currency") or "SAR"


def escape_excel_formula(value):
    """
    Escape Excel formula injection by prefixing dangerous characters.
    Prevents CSV/Formula injection (OWASP) when values start with =+-@
    """
    if value is None:
        return ""
    s = str(value)
    if not s:
        return ""
    stripped = s.lstrip()
    if stripped and stripped[0] in ("=", "+", "-", "@"):
        return "'" + s
    return s


def unescape_excel_formula(value):
    """Undo escape_excel_formula, so an exported value re-imports unchanged."""
    if not isinstance(value, str) or not value.startswith("'"):
        return value
    stripped = value[1:].lstrip()
    if stripped and stripped[0] in ("=", "+", "-", "@"):
        return value[1:]
    return value



ILLEGAL_XLSX_CHARS_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")
XLSX_MAX_CELL_CHARS = 32_767


def sanitize_xlsx_value(value):
    """Strip ASCII control characters openpyxl refuses to write (tab/LF/CR are allowed)
    and cap strings at Excel's per-cell limit."""
    if isinstance(value, str):
        return ILLEGAL_XLSX_CHARS_RE.sub("", value)[:XLSX_MAX_CELL_CHARS]
    return value


def build_questions_dict(node):
    """Return questions from RequirementNode JSONField (this fork stores questions as JSON)."""
    if node is None:
        return None
    questions = getattr(node, "questions", None)
    return questions if isinstance(questions, dict) and questions else None


ANSWER_LINE_RE = re.compile(r"^\[(?P<urn>urn:[^\]]+)\]\s*(?P<rest>.*)$")

# Returned by the body parser for a line that must leave the stored answer alone
# (an untouched template hint, or one we could not make sense of). Distinct from
# None, which means "clear this answer".
_SKIP = object()

def _choice_values(choice):
    """Every string a choice may have been exported as: base value, then each
    translation. Matching on all of them is what lets a workbook exported in one
    language be re-imported under another."""
    values = []
    base = choice.get("value", "")
    if base:
        values.append(base)
    for translation in (choice.get("translations") or {}).values():
        value = (translation or {}).get("value")
        if value:
            values.append(value)
    return values


def _question_texts(qdef):
    """Same as `_choice_values`, for the pre-URN text-matching fallback."""
    texts = []
    base = qdef.get("text", "")
    if base:
        texts.append(base)
    for translation in (qdef.get("translations") or {}).values():
        text = (translation or {}).get("text")
        if text:
            texts.append(text)
    return texts


def _parse_answer_body(qdef, body, label):
    """Parse one "... >> answer" block into (value, warning).

    `value` is `_SKIP` to leave the stored answer untouched, None to clear it,
    otherwise a choice URN, a list of choice URNs, or a raw string.
    """
    if ">>" not in body:
        return _SKIP, f"No '>>' separator for {label}, line skipped"

    _, _, answer_part = body.partition(">>")
    # strip() drops the space after ">>" and the blank line before the next
    # block, but keeps the newlines inside a multi-line free-text answer.
    answer = answer_part.strip()

    if answer.startswith("[") and answer.endswith("]"):
        return _SKIP, None  # untouched template hint
    if not answer:
        return None, None  # emptied by hand: clear the answer

    q_type = qdef.get("type")
    if q_type in ("text", "date"):
        return answer, None

    value_to_urn = {}
    for choice in qdef.get("choices", []):
        for value in _choice_values(choice):
            value_to_urn.setdefault(value, choice["urn"])

    if q_type == "multiple_choice":
        selected = [v.strip() for v in answer.split("|") if v.strip()]
        urns = [value_to_urn[v] for v in selected if v in value_to_urn]
        unknown = [v for v in selected if v not in value_to_urn]
        warning = (
            f"Unknown choice(s) {', '.join(repr(v) for v in unknown)} for {label}"
            if unknown
            else None
        )
        if not urns:
            return _SKIP, warning
        return urns, warning

    if answer in value_to_urn:
        return value_to_urn[answer], None
    return _SKIP, f"Unknown choice '{answer}' for {label}"


def _parse_legacy_answers_cell(lines, questions_dict):
    """Cells exported before the URN prefix existed: one answer per line, matched
    on question text."""
    text_to_question = {}
    for q_urn, qdef in questions_dict.items():
        for text in _question_texts(qdef):
            text_to_question.setdefault(text, (q_urn, qdef))

    answers = {}
    warnings = []
    for line in lines:
        line = line.strip()
        if not line or ">>" not in line:
            continue
        q_part, _, _ = line.partition(">>")
        q_text = q_part.replace("(multiple)", "").strip()
        matched = text_to_question.get(q_text)
        if not matched:
            warnings.append(f"No question matches '{q_text}', line skipped")
            continue
        q_urn, qdef = matched
        value, warning = _parse_answer_body(qdef, line, f"'{q_text}'")
        if warning:
            warnings.append(warning)
        if value is not _SKIP:
            answers[q_urn] = value
    return answers, warnings


def parse_answers_cell(cell, questions_dict):
    """Parse an exported `answers` cell back into ({question_urn: value}, warnings).

    Blocks are delimited by the leading "[urn:...]" rather than by newlines, so a
    free-text answer keeps its own line breaks. Anything skipped is reported in
    `warnings` instead of vanishing.
    """
    if cell in (None, "") or not questions_dict:
        return {}, []

    blocks = []
    legacy_lines = []
    for raw_line in str(cell).split("\n"):
        match = ANSWER_LINE_RE.match(raw_line.lstrip())
        if match:
            blocks.append([match.group("urn"), match.group("rest")])
        elif blocks:
            blocks[-1][1] += "\n" + raw_line
        else:
            legacy_lines.append(raw_line)

    if not blocks:
        return _parse_legacy_answers_cell(legacy_lines, questions_dict)

    answers = {}
    warnings = []
    for q_urn, body in blocks:
        qdef = questions_dict.get(q_urn)
        if qdef is None:
            warnings.append(f"Unknown question '{q_urn}', line skipped")
            continue
        value, warning = _parse_answer_body(qdef, body, f"'{qdef.get('text', q_urn)}'")
        if warning:
            warnings.append(warning)
        if value is not _SKIP:
            answers[q_urn] = value
    return answers, warnings

