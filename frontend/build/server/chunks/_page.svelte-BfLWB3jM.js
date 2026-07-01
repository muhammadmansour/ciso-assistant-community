import { p as push, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import { M as ModelTable } from './ModelTable-Cwc6okqb.js';
import { cD as perimeter, cx as riskassessment1, fC as associatedappliedcontrols2, _m as actionplanhelptext3, _n as actionplan1, IS as flashmode1 } from './_index-BQcvYRD4.js';
import { A as Anchor } from './Anchor-BRS9PKeN.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './access-control-DaLcieub.js';
import './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './crud-DA2NQw0x.js';
import './stores-D-WMoATo.js';
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './Form-EyIMnhQb.js';
import './breadcrumbs-TPX_ebIH.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-BVIf1kgK.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const appliedControlsHead = {
    ref_id: "refId",
    name: "name",
    status: "status",
    priority: "priority",
    category: "category",
    csf_function: "csfFunction",
    owner: "owner",
    eta: "eta",
    expiry_date: "expiryDate",
    effort: "effort",
    annual_cost: "cost",
    risk_scenarios: "matchingScenarios"
  };
  const appliedControls = {
    head: appliedControlsHead,
    body: [],
    meta: []
  };
  let hasAppliedControls = data.scenariosTable.body.some((riskScenario) => riskScenario.applied_controls.length > 0);
  $$payload.out += `<div class="bg-white p-2 shadow rounded-lg space-x-2 flex flex-row justify-center mb-2"><p class="font-semibold text-lg">${escape_html(perimeter())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/perimeters/${stringify(data.risk_assessment.perimeter.id)}/`)}>${escape_html(data.risk_assessment.perimeter.str)}</a></p> <p>/</p> <p class="font-semibold text-lg">${escape_html(riskassessment1())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/risk-assessments/${stringify(data.risk_assessment.id)}/`)}>${escape_html(data.risk_assessment.name)} - ${escape_html(data.risk_assessment.version)}</a></p></div> <div class="flex flex-col space-y-4 bg-white p-4 shadow rounded-lg space-x-2"><div class="flex justify-between items-center w-full"><div class="flex-1"><p class="text-xl font-extrabold">${escape_html(associatedappliedcontrols2())}</p> <p class="text-sm text-gray-500">${escape_html(actionplanhelptext3())}</p></div> `;
  if (hasAppliedControls) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex gap-2 ml-auto">`;
    Anchor($$payload, {
      breadcrumbAction: "push",
      href: `/applied-controls/flash-mode?risk_assessments=${page.params.id}&backUrl=${encodeURIComponent(page.url.pathname)}&backLabel=${encodeURIComponent(actionplan1())}`,
      class: "btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-bolt mr-2"></i> ${escape_html(flashmode1())}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div>`;
  ModelTable($$payload, {
    URLModel: "applied-controls",
    source: appliedControls,
    search: true,
    rowsPerPage: true,
    orderBy: { identifier: "eta", direction: "desc" },
    baseEndpoint: `/risk-assessments/${stringify(page.params.id)}/action-plan`,
    fields: [
      "ref_id",
      "name",
      "status",
      "priority",
      "category",
      "csf_function",
      "owner",
      "eta",
      "expiry_date",
      "effort",
      "annual_cost",
      "risk_scenarios"
    ]
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BfLWB3jM.js.map
