"""
Muhkam brand helpers for document exports.

Central place for the Muhkam palette + logo assets and the small routines that
stamp that brand onto generated exports (Word, Excel, PDF/HTML). Kept
dependency-light: openpyxl / python-docx imports are done lazily inside the
helpers so importing this module never fails if a given backend is missing.

Brand tokens (from the supplied Muhkam asset pack):
    Ink   #192A44
    Blue  #316FD3
    White #FFFFFF
"""

import base64
from functools import lru_cache
from pathlib import Path

from django.conf import settings

# -- palette ------------------------------------------------------------------
# Hex WITHOUT the leading '#': this form is what openpyxl / python-docx want.
MUHKAM_INK = "192A44"
MUHKAM_BLUE = "316FD3"
MUHKAM_WHITE = "FFFFFF"

# CSS-friendly variants (with '#').
MUHKAM_INK_CSS = f"#{MUHKAM_INK}"
MUHKAM_BLUE_CSS = f"#{MUHKAM_BLUE}"
MUHKAM_WHITE_CSS = f"#{MUHKAM_WHITE}"

_STATIC_DIR = Path(settings.BASE_DIR) / "core" / "static" / "muhkam"
_LOGO_FILENAME = "muhkam-lockup-horizontal-1000w.png"
_LOGO_REVERSED_FILENAME = "muhkam-lockup-horizontal-reversed-1000w.png"
_MARK_FILENAME = "muhkam-mark-256w.png"


def logo_png_path() -> Path:
    """Absolute path to the horizontal lockup PNG (for light backgrounds)."""
    return _STATIC_DIR / _LOGO_FILENAME


def logo_reversed_png_path() -> Path:
    """Absolute path to the reversed lockup PNG (for dark/Ink backgrounds)."""
    return _STATIC_DIR / _LOGO_REVERSED_FILENAME


def mark_png_path() -> Path:
    """Absolute path to the square app mark PNG."""
    return _STATIC_DIR / _MARK_FILENAME


@lru_cache(maxsize=4)
def _data_uri(path_str: str) -> str:
    path = Path(path_str)
    if not path.is_file():
        return ""
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def logo_data_uri() -> str:
    """Base64 data URI for the horizontal lockup.

    Used by HTML/PDF templates so the logo embeds without depending on a
    WeasyPrint ``base_url`` / ``/static`` resolution.
    """
    return _data_uri(str(logo_png_path()))


def logo_reversed_data_uri() -> str:
    """Base64 data URI for the reversed lockup (dark backgrounds)."""
    return _data_uri(str(logo_reversed_png_path()))


# -- Excel (openpyxl) ---------------------------------------------------------
# Number of rows reserved at the top of a branded sheet (logo + title band).
XLSX_BRAND_ROWS = 3


def apply_xlsx_branding(worksheet, title: str, header_row: int) -> None:
    """Stamp the Muhkam brand onto an openpyxl worksheet.

    Assumes the data was written with ``startrow=XLSX_BRAND_ROWS`` so the top
    rows are free. Adds the logo, an Ink title band, and styles the data header
    row (Ink fill, white bold). Best-effort: never raises on styling issues.

    Args:
        worksheet: openpyxl worksheet with data already written below the band.
        title: human-readable document title shown in the band.
        header_row: 1-indexed row number of the data header (== XLSX_BRAND_ROWS + 1).
    """
    from openpyxl.drawing.image import Image as XLImage
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter

    max_col = worksheet.max_column or 1
    last_col_letter = get_column_letter(max_col)

    # Ink title band spanning all data columns on row 2.
    try:
        worksheet.merge_cells(f"A2:{last_col_letter}2")
    except Exception:
        pass
    band = worksheet["A2"]
    band.value = f"Muhkam   |   {title}"
    band.font = Font(name="Calibri", size=13, bold=True, color=MUHKAM_INK)
    band.alignment = Alignment(horizontal="left", vertical="center", indent=1)

    worksheet.row_dimensions[1].height = 40
    worksheet.row_dimensions[2].height = 22

    # Logo image anchored top-left (scaled to ~34px tall, native aspect ratio).
    try:
        img = XLImage(str(logo_png_path()))
        target_h = 34
        if img.height:
            ratio = target_h / float(img.height)
            img.width = int(img.width * ratio)
            img.height = target_h
        worksheet.add_image(img, "A1")
    except Exception:
        pass

    # Style the data header row: Ink fill, white bold, centered + wrapped.
    fill = PatternFill(start_color=MUHKAM_INK, end_color=MUHKAM_INK, fill_type="solid")
    font = Font(bold=True, color=MUHKAM_WHITE)
    for col in range(1, max_col + 1):
        cell = worksheet.cell(row=header_row, column=col)
        cell.fill = fill
        cell.font = font
        cell.alignment = Alignment(
            horizontal="center", vertical="center", wrap_text=True
        )
    worksheet.row_dimensions[header_row].height = 26


# -- Word (python-docx) -------------------------------------------------------
def add_docx_branding(document, title: str) -> None:
    """Add a Muhkam logo header and a brand footer to a python-docx Document.

    ``document`` is a python-docx ``Document`` (for a docxtpl ``DocxTemplate``
    pass ``tpl.docx`` after ``render``). Best-effort: never raises.
    """
    try:
        from docx.enum.text import WD_ALIGN_PARAGRAPH
        from docx.shared import Inches, Pt, RGBColor

        section = document.sections[0]

        header = section.header
        header.is_linked_to_previous = False
        hp = header.paragraphs[0] if header.paragraphs else header.add_paragraph()
        hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        logo = logo_png_path()
        if logo.is_file():
            hp.add_run().add_picture(str(logo), height=Inches(0.32))

        footer = section.footer
        footer.is_linked_to_previous = False
        fp = footer.paragraphs[0] if footer.paragraphs else footer.add_paragraph()
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run(f"Muhkam  \u00b7  {title}")
        frun.font.size = Pt(8)
        frun.font.color.rgb = RGBColor(0x19, 0x2A, 0x44)
    except Exception:
        # Branding is cosmetic; never break the export because of it.
        pass
