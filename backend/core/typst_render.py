"""Minimal stubs for upstream typst/mermaid helpers (full typst stack optional)."""

import structlog

logger = structlog.get_logger(__name__)


def render_mermaid_svg(source: str) -> bytes | None:
    """Render Mermaid to SVG when typst/merman is available; otherwise skip."""
    try:
        import tempfile
        from pathlib import Path

        import typst

        MERMAID_MAX_SOURCE_CHARS = 20_000
        if len(source) > MERMAID_MAX_SOURCE_CHARS:
            logger.warning("Mermaid diagram too large to render", chars=len(source))
            return None
        TEMPLATE_DIR = Path(__file__).resolve().parent / "typst"
        VENDORED_PACKAGES = TEMPLATE_DIR / "packages"
        MERMAID_TEMPLATE = """#import "@preview/merman:0.3.0": mermaid
#set page(width: auto, height: auto, margin: 0pt, fill: none)
#mermaid(sys.inputs.source)
"""
        with tempfile.TemporaryDirectory() as root:
            entrypoint = Path(root) / "main.typ"
            entrypoint.write_text(MERMAID_TEMPLATE)
            return typst.compile(
                entrypoint,
                root=root,
                format="svg",
                sys_inputs={"source": source},
                package_path=str(VENDORED_PACKAGES),
                package_cache_path=root,
            )
    except Exception as e:
        logger.warning("Mermaid diagram could not be rendered", error=e)
        return None