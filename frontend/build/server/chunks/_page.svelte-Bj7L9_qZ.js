import { p as push, V as escape_html, a as pop, W as ensure_array_like, Z as attr_style, X as stringify } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-XH-WeaUm.js';
import { Eh as lockedassessment1, Aa as parentassessmentlocked2, TJ as assetdependencies1, Gj as impactovertime2, C9 as nodataavailable2, bu as securityobjectives1, vE as recoveryindicators1 } from './_index-CqZWReca.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { O as ObjectivesComparisonTable } from './ObjectivesComparisonTable-nNNeWLD3.js';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
import { p as page } from './index3-BwfRm5YV.js';
import './Form-BuUIlHHA.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-7XzjN-Wp.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-5y-ookeO.js';
import './breadcrumbs-D1ratxIQ.js';
import './ModelTable-veXZDKES.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './DeleteConfirmModal-C22czeYM.js';

function LineHeatmap($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="flex w-full border" data-testid="line-heatmap">`;
  if (!data || data.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="p-4 text-center w-full text-gray-500">${escape_html(nodataavailable2())}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(data);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let entry = each_array[$$index];
      $$payload.out += `<div class="p-2 grow"${attr_style(`background-color: ${stringify(entry?.impact?.hexcolor || "#f0f0f0")};`)}><div class="text-lg font-bold">${escape_html(safeTranslate(entry?.impact?.name || "unknown"))}</div> <div>${escape_html(safeTranslate(entry?.pit) || "-")}</div></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const asset_assessment = data.data;
  const isBiaLocked = asset_assessment.bia?.is_locked || false;
  if (isBiaLocked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mx-4 mt-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(parentassessmentlocked2({ parent: asset_assessment.bia.name }))}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    let widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-gray-50 shadow-xs grow">`;
      ObjectivesComparisonTable($$payload2, {
        comparisons: data.asset.security_objectives_comparison,
        title: securityobjectives1(),
        icon: "fa-shield-halved"
      });
      $$payload2.out += `<!----> `;
      ObjectivesComparisonTable($$payload2, {
        comparisons: data.asset.recovery_objectives_comparison,
        title: recoveryindicators1(),
        icon: "fa-bullseye",
        uppercaseLabels: true
      });
      $$payload2.out += `<!----> <div class="font-serif font-bold mb-2"><i class="fa-solid fa-chart-line mr-2"></i>${escape_html(impactovertime2())}</div> `;
      LineHeatmap($$payload2, { data: data.aaMetrics });
      $$payload2.out += `<!----></div></div>`;
    }, actions = function($$payload2) {
      Anchor($$payload2, {
        breadcrumbAction: "push",
        href: `${page.url.pathname}/dependencies`,
        class: "btn preset-filled-secondary-500 h-fit",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-sitemap mr-2"></i> ${escape_html(assetdependencies1())}`;
        },
        $$slots: { default: true }
      });
    };
    DetailView($$payload, {
      data,
      disableEdit: isBiaLocked,
      disableDelete: isBiaLocked,
      widgets,
      actions,
      $$slots: { widgets: true, actions: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bj7L9_qZ.js.map
