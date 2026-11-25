import pytest
from django.utils import translation

from core.templatetags.core_extras import num, pct


@pytest.mark.parametrize(
    "value, arabic",
    [
        (12, "١٢"),
        ("10.3", "١٠٫٣"),
        ("\u20c1 345,333", "\u20c1 ٣٤٥٬٣٣٣"),
        ("\u20c1 345k", "\u20c1 ٣٤٥ ألف"),
        ("5.13M", "٥٫١٣ مليون"),
        ("3 × 4", "٣ × ٤"),
        (None, "—"),
    ],
)
def test_num_uses_arabic_indic_digits_in_arabic(value, arabic):
    with translation.override("ar"):
        assert num(value) == arabic


def test_num_leaves_english_unchanged():
    with translation.override("en"):
        assert num("\u20c1 345k") == "\u20c1 345k"
        assert pct(70.1) == "70.1%"


def test_pct_in_arabic():
    with translation.override("ar"):
        assert pct(70.1) == "٧٠٫١٪"
        assert pct(None) == "—"
