import os
import re
import unicodedata

from django import template
from django.utils import translation
from django.utils.safestring import mark_safe

from ciso_assistant.settings import VERSION, BUILD, DEBUG
from core.utils import COUNTRY_FLAGS, LANGUAGES
from core.models import RequirementAssessment
from core.helpers import color_css_class
from core import branding

register = template.Library()


@register.simple_tag()
def muhkam_logo():
    """Base64 data URI of the Muhkam horizontal lockup for PDF/HTML headers."""
    return branding.logo_data_uri()


@register.simple_tag()
def muhkam_logo_reversed():
    """Base64 data URI of the reversed lockup (for dark/Ink backgrounds)."""
    return branding.logo_reversed_data_uri()


@register.simple_tag()
def cairo_font_css():
    """@font-face CSS registering the bundled Cairo font for PDF exports."""
    return mark_safe(branding.cairo_font_face_css())


@register.simple_tag()
def muhkam_ink():
    return branding.MUHKAM_INK_CSS


@register.simple_tag()
def muhkam_blue():
    return branding.MUHKAM_BLUE_CSS


@register.simple_tag()
def app_version():
    return VERSION


@register.simple_tag()
def app_build():
    return f"{BUILD} (dev)" if DEBUG else BUILD


@register.simple_tag()
def get_requirements(applied_control, compliance_assessment):
    return [
        str(req.requirement.display_short)
        for req in RequirementAssessment.objects.filter(
            compliance_assessment=compliance_assessment,
            applied_controls=applied_control.id,
        )
    ]


@register.filter("class")
def _class(obj):
    return obj.__class__.__name__ if obj else ""


@register.filter
def index(List, i):
    return List[int(i)]


@register.filter
def entry_num_array(List):
    return range(len(List))


@register.filter("country_flag")
def country_flag(country_code):
    return COUNTRY_FLAGS.get(country_code, "🌐")


@register.filter("language_name")
def country_name(country_code):
    return LANGUAGES.get(country_code, "Unknown")


@register.filter(name="isinstance")
def isinstance_filter(val, instance_type):
    return isinstance(val, eval(instance_type))


@register.filter(name="is_list")
def is_list(val):
    return isinstance(val, list)


@register.filter(name="is_string")
def is_string(val):
    return isinstance(val, str)


@register.filter(name="get_answers")
def get_answers(question, answers):
    if not answers:
        return None
    if isinstance(answers, list):
        return [get_answers(question, answer) for answer in answers]
    elif not answers.startswith("urn:"):
        return answers
    for choice in question["choices"]:
        if choice["urn"] == answers:
            return choice["value"]


@register.filter(name="get_item")
def get_item(dictionary, key):
    return dictionary.get(key)


@register.filter(name="text_dir")
def text_dir(value):
    """'rtl' or 'ltr' from the first strong character. WeasyPrint ignores dir="auto"."""
    for char in str(value or ""):
        direction = unicodedata.bidirectional(char)
        if direction in ("R", "AL"):
            return "rtl"
        if direction == "L":
            return "ltr"
    return "ltr"


ARABIC_INDIC_DIGITS = str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩")
ARABIC_COMPACT_UNITS = {"k": "ألف", "M": "مليون", "B": "مليار"}


def _arabic_digits() -> bool:
    return (translation.get_language() or "").startswith("ar")


@register.filter(name="num")
def num(value, fallback="—"):
    """A report figure in the reader's digits: Arabic-Indic (with ٫ ٬ separators) in Arabic.

    Only for values the report computes; reference IDs and user-entered names keep their digits.
    """
    if value is None or value == "":
        return fallback
    text = str(value)
    if not _arabic_digits():
        return text
    text = re.sub(r"([0-9])([kMB])\b", lambda m: f"{m[1]} {ARABIC_COMPACT_UNITS[m[2]]}", text)
    text = re.sub(r"([0-9])\.(?=[0-9])", "\\1٫", text)
    text = re.sub(r"([0-9]),(?=[0-9])", "\\1٬", text)
    text = re.sub(r"([0-9])%", "\\1٪", text)
    return text.translate(ARABIC_INDIC_DIGITS)


@register.filter(name="pct")
def pct(value):
    return "—" if value is None or value == "" else num(f"{value}%")


@register.simple_tag
def num_dir():
    """Arabic-Indic digits are right-to-left under bidi, so "a → b" spans flip with them."""
    return "rtl" if _arabic_digits() else "ltr"


@register.simple_tag
def num_arrow():
    return "←" if _arabic_digits() else "→"


@register.simple_tag
def num_counter_style():
    """CSS counter style for page numbers."""
    return "arabic-indic" if _arabic_digits() else "decimal"


@register.simple_tag
def num_separator():
    """Between two figures; the Arabic-Indic zero (٠) is a dot, so a middle dot would blur into it."""
    return "|" if _arabic_digits() else "·"


@register.filter(name="basename")
def basename_filter(file_path):
    """Extract the basename from a file path."""
    if not file_path:
        return ""
    return os.path.basename(str(file_path))


@register.simple_tag
def bar_graph(assessments, ancestors, node=None):
    compliance_assessments_result = []
    candidates = [
        c
        for c in assessments.filter(requirement__assessable=True)
        if not node or c == node or node in ancestors.get(c, set())
    ]
    total = len(candidates)
    if total > 0:
        for st in RequirementAssessment.Result:
            count = len([c for c in candidates if c.result == st])
            compliance_assessments_result.append((st, round(count * 100 / total)))

    content = '<div class="flex bg-gray-300 rounded-full overflow-hidden h-4 w-2/3">'
    for result, percentage in reversed(compliance_assessments_result):
        if percentage > 0:
            color = f"bg-{color_css_class(result)}"
            if color == "bg-black":
                color += " text-white dark:bg-white dark:text-black"
            content += f"""
            <div class="flex flex-col justify-center overflow-hidden text-xs font-semibold text-center {color}" style="width:{percentage}%">
            """
            if result != "to_do":
                content += f"{percentage}%"
            content += "</div>"
    content += "</div>"
    return mark_safe(content)
