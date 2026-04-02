import { p as push, W as ensure_array_like, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import { R as RiskMatrix } from './RiskMatrix-BFYZlZcu.js';
import { U as URL_MODEL_MAP } from './crud-CFDLlT9z.js';
import './breadcrumbs-Cdf8pK7r.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Tooltip-Li45R7zs.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './helpers-Bm9n0CNG.js';
import './Popover-PelKNyF8.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './i18n-B-ZrD2ao.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  const showRisks = true;
  let { data } = $$props;
  const riskMatrix = data.data;
  const each_array = ensure_array_like(Object.entries(riskMatrix).filter(([key, _]) => key !== "id" && key !== "json_definition" && key !== "is_enabled"));
  $$payload.out += `<div class="flex flex-row justify-between"><div class="flex flex-col space-y-2"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let [key, value] = each_array[$$index_1];
    $$payload.out += `<div class="flex flex-col"><div class="text-sm font-medium text-gray-800 capitalize-first">${escape_html(key.replace("_", " "))}</div> <ul class="text-sm"><li class="text-gray-600 list-none">`;
    if (value) {
      $$payload.out += "<!--[-->";
      if (Array.isArray(value)) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(value);
        $$payload.out += `<ul><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let val = each_array_1[$$index];
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
      } else if (value.id) {
        $$payload.out += "<!--[1-->";
        if (key === "library") {
          $$payload.out += "<!--[-->";
          const itemHref = `/loaded-libraries/${value.id}`;
          Anchor($$payload, {
            href: itemHref,
            class: "anchor",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(value.name)}`;
            },
            $$slots: { default: true }
          });
        } else {
          $$payload.out += "<!--[!-->";
          const itemHref = `/${URL_MODEL_MAP["risk-matrices"]["foreignKeyFields"]?.find((item) => item.field === key)?.urlModel}/${value.id}`;
          Anchor($$payload, {
            href: itemHref,
            class: "anchor",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(value.str)}`;
            },
            $$slots: { default: true }
          });
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(value.str ?? value)}`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `--`;
    }
    $$payload.out += `<!--]--></li></ul></div>`;
  }
  $$payload.out += `<!--]--></div></div> `;
  RiskMatrix($$payload, {
    riskMatrix,
    showLegend: showRisks,
    wrapperClass: "mt-8"
  });
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BJsFSkWY.js.map
