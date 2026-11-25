import pytest

from core.branding import pdf_html
from core.utils import SAUDI_RIYAL_SIGN, currency_symbol


@pytest.mark.parametrize(
    "stored, displayed",
    [
        ("SAR", SAUDI_RIYAL_SIGN),
        ("€", "€"),
        ("$", "$"),
        ("C$", "C$"),
        ("", ""),
        (None, ""),
    ],
)
def test_currency_symbol(stored, displayed):
    assert currency_symbol(stored) == displayed


def test_pdf_html_isolates_the_sign_in_text_but_leaves_attributes_alone():
    html = f'<td title="{SAUDI_RIYAL_SIGN} 5">{SAUDI_RIYAL_SIGN} 345</td>'

    rendered = pdf_html(html)

    assert rendered == (
        f'<td title="{SAUDI_RIYAL_SIGN} 5">'
        "<span style=\"font-family: 'Saudi Riyal'\">\ue900</span> 345</td>"
    )


def test_pdf_html_without_the_sign_is_unchanged():
    html = "<p>€ 5 &lt; 6</p>"
    assert pdf_html(html) is html
