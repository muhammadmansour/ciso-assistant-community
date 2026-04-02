import { p as push, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelTable } from './ModelTable-BpBYEFsc.js';
import { fT as folder, w4 as quantitativeriskstudylabel3, Yk as actionplan1, OL as controlsfromquantitativerisk3, Ht as flashmode1 } from './_index-Syqrsmaf.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
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
import './access-control-DaLcieub.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './crud-CFDLlT9z.js';
import './stores-D-WMoATo.js';
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-DhMvl6-W.js';
import './breadcrumbs-Cdf8pK7r.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DOKttf10.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  getModalStore();
  const appliedControlsHead = {
    name: "name",
    status: "status",
    priority: "priority",
    category: "category",
    effort: "effort",
    annual_cost: "cost",
    control_impact: "controlImpact",
    eta: "eta",
    quantitative_risk_scenarios: "scenarios"
  };
  const appliedControls = {
    head: appliedControlsHead,
    body: [],
    meta: []
  };
  $$payload.out += `<div class="bg-white p-2 shadow rounded-lg space-x-2 flex flex-row justify-center mb-2"><p class="font-semibold text-lg">${escape_html(folder())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/folders/${stringify(data.quantitative_risk_study.folder.id)}/`)}>${escape_html(data.quantitative_risk_study.folder.str)}</a></p> <p>/</p> <p class="font-semibold text-lg">${escape_html(quantitativeriskstudylabel3())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/quantitative-risk-studies/${stringify(data.quantitative_risk_study.id)}/`)}>${escape_html(data.quantitative_risk_study.name)}</a></p></div> <div class="flex flex-col space-y-4 bg-white p-4 shadow rounded-lg space-x-2"><div class="flex justify-between items-center w-full"><div class="flex-1"><p class="text-xl font-extrabold">${escape_html(actionplan1())}</p> <p class="text-sm text-gray-500">${escape_html(controlsfromquantitativerisk3())}</p></div> <div class="flex gap-2 ml-auto">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/applied-controls/flash-mode?quantitative_risk_studies=${page.params.id}&backUrl=${encodeURIComponent(page.url.pathname)}&backLabel=${encodeURIComponent(actionplan1())}`,
    class: "btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-bolt mr-2"></i> ${escape_html(flashmode1())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div>`;
  ModelTable($$payload, {
    URLModel: "applied-controls",
    source: appliedControls,
    search: true,
    rowsPerPage: true,
    orderBy: { identifier: "eta", direction: "desc" },
    baseEndpoint: `/quantitative-risk-studies/${stringify(page.params.id)}/action-plan`,
    fields: [
      "name",
      "status",
      "priority",
      "category",
      "effort",
      "annual_cost",
      "control_impact",
      "eta",
      "quantitative_risk_scenarios"
    ]
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BABFi_YE.js.map
