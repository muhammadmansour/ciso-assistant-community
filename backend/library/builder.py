"""
Library builder helpers.

URN helpers shared by exporters that package objects as libraries.
"""

import re

_LEAF_FORBIDDEN = re.compile(r"[^0-9a-z\[\]\(\)\-\._]+")


def urn_safe_leaf(value: str) -> str:
    """Turn a ref_id into a string usable as the last URN segment."""
    leaf = _LEAF_FORBIDDEN.sub("-", str(value).lower().strip()).strip("-")
    return leaf


def library_urn(packager: str, ref_id: str) -> str:
    return f"urn:{packager}:risk:library:{ref_id}"
