import pytest

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
