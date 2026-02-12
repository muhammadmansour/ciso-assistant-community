import { p as push, W as ensure_array_like, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { R as RecursiveTreeView } from './RecursiveTreeView-CzjuAGIL.js';
import { U as URL_MODEL_MAP } from './crud-a52dcxCi.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { nX as urn, SK as associatedrequirements1 } from './_index-DEXNURl5.js';
import { T as TreeViewItemContent } from './TreeViewItemContent-DBEt25uM.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './breadcrumbs-CG0qNTv3.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const tree = data.tree;
  function transformToTreeView(nodes) {
    return nodes.map(([id, node]) => {
      node.id = id;
      return {
        id,
        content: TreeViewItemContent,
        contentProps: node,
        // lead: TreeViewItemLead,
        children: node.children ? transformToTreeView(Object.entries(node.children)) : []
      };
    });
  }
  let treeViewNodes = transformToTreeView(Object.entries(tree));
  function assessableNodesCount(nodes) {
    let count = 0;
    for (const node of nodes) {
      if (node.contentProps.assessable) {
        count++;
      }
      if (node.children) {
        count += assessableNodesCount(node.children);
      }
    }
    return count;
  }
  const each_array = ensure_array_like(Object.entries(data.framework).filter(([key, _]) => key !== "id" && key !== "created_at" && key !== "reference_controls"));
  $$payload.out += `<div class="flex flex-col space-y-4 whitespace-pre-line"><div class="card px-6 py-4 bg-white flex flex-row justify-between shadow-lg"><div><div class="flex flex-col space-y-2"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
    let [key, value] = each_array[$$index_3];
    $$payload.out += `<div class="flex flex-col"><div class="text-sm font-medium text-gray-800 capitalize-first">`;
    if (key === "urn") {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(urn())}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(safeTranslate(key))}`;
    }
    $$payload.out += `<!--]--></div> <ul class="text-sm"><li class="text-gray-600 list-none">`;
    if (value) {
      $$payload.out += "<!--[-->";
      if (key === "library") {
        $$payload.out += "<!--[-->";
        const itemHref = `/loaded-libraries/${value.id}`;
        Anchor($$payload, {
          href: itemHref,
          class: "anchor",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(value.str)}`;
          },
          $$slots: { default: true }
        });
      } else if (key === "scores_definition") {
        $$payload.out += "<!--[1-->";
        const each_array_1 = ensure_array_like(Object.entries(value));
        $$payload.out += `<!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let [key2, definition] = each_array_1[$$index];
          $$payload.out += `<div>${escape_html(definition.score)}.
												${escape_html(definition.name)}${escape_html(definition.description ? `: ${definition.description}` : "")}</div>`;
        }
        $$payload.out += `<!--]-->`;
      } else if (key === "implementation_groups_definition") {
        $$payload.out += "<!--[2-->";
        const each_array_2 = ensure_array_like(Object.entries(value));
        $$payload.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let [_, definition] = each_array_2[$$index_1];
          $$payload.out += `<div>** ${escape_html(definition.ref_id)} **
												${escape_html(definition.name)} `;
          if (Object.hasOwn(definition, "description") && definition.description) {
            $$payload.out += "<!--[-->";
            $$payload.out += `: ${escape_html(definition.description)}`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else if (Array.isArray(value)) {
        $$payload.out += "<!--[3-->";
        const each_array_3 = ensure_array_like(value);
        $$payload.out += `<ul><!--[-->`;
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let val = each_array_3[$$index_2];
          $$payload.out += `<li>`;
          if (val.str && val.id) {
            $$payload.out += "<!--[-->";
            const itemHref = `/${URL_MODEL_MAP[data.urlModel]["foreignKeyFields"]?.find((item) => item.field === key)?.urlModel}/${val.id}`;
            Anchor($$payload, {
              href: itemHref,
              class: "anchor",
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(val.str)}`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `${escape_html(value)}`;
          }
          $$payload.out += `<!--]--></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else if (value.str && value.id) {
        $$payload.out += "<!--[4-->";
        const itemHref = `/${URL_MODEL_MAP["frameworks"]["foreignKeyFields"]?.find((item) => item.field === key)?.urlModel}/${value.id}`;
        Anchor($$payload, {
          href: itemHref,
          class: "anchor",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(value.str)}`;
          },
          $$slots: { default: true }
        });
      } else if (key === "description") {
        $$payload.out += "<!--[5-->";
        MarkdownRenderer($$payload, { content: value });
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(value.str ?? value)}`;
      }
      $$payload.out += `<!--]-->`;
    } else if (value === 0 && key === "min_score") {
      $$payload.out += "<!--[1-->";
      $$payload.out += `${escape_html(value)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `--`;
    }
    $$payload.out += `<!--]--></li></ul></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div><a class="btn preset-filled-primary-500"${attr("href", `/frameworks/${stringify(data.framework.id)}/excel-template/`)}>Download Excel template</a></div></div> <div class="card px-6 py-4 bg-white flex flex-col shadow-lg"><h4 class="h4 flex items-center font-semibold">${escape_html(associatedrequirements1())} <span class="badge preset-tonal-primary ml-1">${escape_html(assessableNodesCount(treeViewNodes))}</span></h4> `;
  RecursiveTreeView($$payload, {
    nodes: treeViewNodes,
    hover: "hover:bg-initial"
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D05zZnLL.js.map
