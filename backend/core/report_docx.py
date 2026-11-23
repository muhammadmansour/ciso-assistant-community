import io

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

from core.branding import add_docx_branding

NAVY = RGBColor(0x19, 0x2A, 0x44)
BLUE = RGBColor(0x31, 0x6F, 0xD3)
GREY = RGBColor(0x64, 0x74, 0x8B)
CONTENT_WIDTH_CM = 17.4


def color(hex_value: str | None, default: str = "475569") -> RGBColor:
    value = (hex_value or "").lstrip("#")
    return RGBColor.from_string(value.upper() if len(value) == 6 else default)


class ReportDocument:
    """A4 portrait Word report with the Muhkam branding and the report PDFs' visual language."""

    def __init__(self, footer_title: str):
        self.document = Document()
        page = self.document.sections[0]
        page.orientation = WD_ORIENT.PORTRAIT
        page.page_width, page.page_height = Cm(21), Cm(29.7)
        page.left_margin = page.right_margin = Cm(1.8)
        page.top_margin = page.bottom_margin = Cm(1.8)
        add_docx_branding(self.document, footer_title)
        self.document.styles["Normal"].font.size = Pt(9.5)

    @staticmethod
    def shade(cell, fill: str) -> None:
        properties = cell._tc.get_or_add_tcPr()
        shading = OxmlElement("w:shd")
        shading.set(qn("w:val"), "clear")
        shading.set(qn("w:color"), "auto")
        shading.set(qn("w:fill"), fill.lstrip("#"))
        properties.append(shading)

    @staticmethod
    def text(paragraph, value, *, bold=False, color=None, size=None):
        run = paragraph.add_run("" if value is None else str(value))
        run.bold = bold
        if color is not None:
            run.font.color.rgb = color
        if size is not None:
            run.font.size = Pt(size)
        return run

    def paragraph(self, value: str, *, color=GREY, size=None):
        paragraph = self.document.add_paragraph()
        self.text(paragraph, value, color=color, size=size)
        return paragraph

    def title(self, eyebrow: str, title: str, subtitle: str) -> None:
        top = self.document.add_paragraph()
        top.paragraph_format.space_after = Pt(0)
        self.text(top, eyebrow.upper(), bold=True, color=BLUE, size=8.5)
        main = self.document.add_paragraph()
        main.paragraph_format.space_after = Pt(2)
        self.text(main, title, bold=True, color=NAVY, size=20)
        self.paragraph(subtitle, size=10)

    def heading(self, number, title: str, note: str) -> None:
        paragraph = self.document.add_paragraph()
        paragraph.paragraph_format.space_before = Pt(14)
        paragraph.paragraph_format.space_after = Pt(0)
        paragraph.paragraph_format.keep_with_next = True
        self.text(paragraph, f"{number}. ", bold=True, color=BLUE, size=13)
        self.text(paragraph, title, bold=True, color=NAVY, size=13)
        note_paragraph = self.paragraph(note, size=8)
        note_paragraph.paragraph_format.space_after = Pt(4)
        note_paragraph.paragraph_format.keep_with_next = True

    def subheading(self, value: str) -> None:
        paragraph = self.document.add_paragraph()
        paragraph.paragraph_format.space_before = Pt(10)
        paragraph.paragraph_format.keep_with_next = True
        self.text(paragraph, value, bold=True, color=NAVY, size=11)

    def grid(self, headers, rows, widths):
        """Cells are plain values, or ``(text, RGBColor)`` for a coloured bold label."""
        table = self.document.add_table(rows=1, cols=len(headers))
        table.style = "Table Grid"
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        for cell, header in zip(table.rows[0].cells, headers):
            self.shade(cell, "EEF3FB")
            self.text(cell.paragraphs[0], header, bold=True, color=NAVY, size=8)
        for values in rows:
            for cell, value in zip(table.add_row().cells, values):
                if isinstance(value, tuple):
                    self.text(cell.paragraphs[0], value[0], bold=True, color=value[1], size=8.5)
                else:
                    self.text(cell.paragraphs[0], value, size=8.5)
        self._widths(table, widths)
        return table

    def key_values(self, rows):
        table = self.document.add_table(rows=0, cols=2)
        table.style = "Table Grid"
        for key, value in rows:
            cells = table.add_row().cells
            self.shade(cells[0], "F8FAFC")
            self.text(cells[0].paragraphs[0], key, bold=True, color=NAVY, size=8.5)
            self.text(cells[1].paragraphs[0], value or "—", size=8.5)
        self._widths(table, [4.2, CONTENT_WIDTH_CM - 4.2])
        return table

    def heatmap(self, title: str, heatmap: dict) -> None:
        self.subheading(title)
        columns = heatmap["columns"]
        table = self.document.add_table(rows=0, cols=len(columns) + 1)
        table.style = "Table Grid"
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        for row in heatmap["rows"]:
            cells = table.add_row().cells
            self.shade(cells[0], "EEF3FB")
            self.text(cells[0].paragraphs[0], row["label"], bold=True, color=NAVY, size=7.5)
            for cell, value in zip(cells[1:], row["cells"]):
                self.shade(cell, value["color"])
                cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
                self.text(cell.paragraphs[0], "\n".join(value["refs"]), bold=True, color=color(value["text"]), size=7)
        axis = table.add_row().cells
        for cell, column in zip(axis[1:], columns):
            self.shade(cell, "EEF3FB")
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            self.text(cell.paragraphs[0], column["label"], bold=True, color=NAVY, size=7.5)
        first = 2.4
        self._widths(table, [first] + [(CONTENT_WIDTH_CM - first) / len(columns)] * len(columns))
        caption = self.paragraph(f"Rows: {heatmap['row_axis']} · Columns: {heatmap['col_axis']}", size=8)
        caption.alignment = WD_ALIGN_PARAGRAPH.CENTER

    @staticmethod
    def _widths(table, widths) -> None:
        for row in table.rows:
            for cell, width in zip(row.cells, widths):
                cell.width = Cm(width)

    def to_bytes(self) -> bytes:
        buffer = io.BytesIO()
        self.document.save(buffer)
        return buffer.getvalue()
