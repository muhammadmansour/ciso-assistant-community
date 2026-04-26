import { p as push, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { h as html } from './html-FW6Ia4bL.js';

function MarkdownRenderer($$payload, $$props) {
  push();
  let { content, class: className = "" } = $$props;
  const sanitizeConfig = {
    allowedTags: [
      "p",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "a",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
      "hr",
      "br",
      "input"
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
        "loading"
      ],
      code: ["class"],
      input: ["type", "checked", "disabled"],
      li: ["class"],
      ul: ["class"]
    },
    allowedSchemes: ["http", "https"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }, true)
    }
  };
  function processContent(content2) {
    if (!content2 || content2.trim() === "") return "";
    let html2 = marked(content2);
    html2 = sanitizeHtml(html2, sanitizeConfig);
    html2 = html2.replace(/>\s+</g, "><").replace(
      /\n\s*\n/g,
      // Remove whitespace between tags
      "\n"
    ).replace(
      /<\/p>\s*<ul>/g,
      // Remove double line breaks
      "</p><ul>"
    ).replace(
      /<\/ul>\s*<p>/g,
      // Remove space between paragraphs and lists
      "</ul><p>"
    ).replace(
      /<\/p>\s*<ol>/g,
      // Remove space between lists and paragraphs
      "</p><ol>"
    ).replace(
      /<\/ol>\s*<p>/g,
      // Remove space between paragraphs and ordered lists
      "</ol><p>"
    );
    return html2;
  }
  let renderedContent = processContent(content);
  if (renderedContent) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`prose prose-sm max-w-none wrap-break-word whitespace-pre-line ${stringify(className)}`)}>${html(renderedContent)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="text-gray-500 italic">--</span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { MarkdownRenderer as M };
//# sourceMappingURL=MarkdownRenderer-B6VNWr3Z.js.map
