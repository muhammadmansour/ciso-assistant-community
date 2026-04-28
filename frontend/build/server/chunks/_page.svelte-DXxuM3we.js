import { p as push, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelTable } from './ModelTable-D9-j7Xao.js';
import { t as tableSourceMapper } from './crud-Dl9mduNa.js';
import { cy as perimeter, cr as findingsassessment1, fx as associatedappliedcontrols2, Yl as actionplanhelptext3, Ym as actionplan1, Ht as flashmode1 } from './_index-CqZWReca.js';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
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
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './i18n-DuIONS9Q.js';
import './Form-BuUIlHHA.js';
import './html-FW6Ia4bL.js';
import './breadcrumbs-D1ratxIQ.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './stores-D-WMoATo.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-C22czeYM.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const appliedControlsHead = {
    name: "name",
    status: "status",
    priority: "priority",
    category: "category",
    csf_function: "csfFunction",
    eta: "eta",
    expiry_date: "expiryDate",
    effort: "effort",
    cost: "cost",
    findings_count: "associated_findings"
  };
  const appliedControlsColumns = [
    "name",
    "status",
    "priority",
    "category",
    "csf_function",
    "eta",
    "expiry_date",
    "effort",
    "cost",
    "findings_count"
  ];
  const appliedControls = {
    head: appliedControlsHead,
    body: tableSourceMapper([], appliedControlsColumns),
    meta: []
  };
  $$payload.out += `<div class="bg-white p-2 shadow-sm rounded-lg space-x-2 flex flex-row justify-center mb-2"><p class="font-semibold text-lg">${escape_html(perimeter())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/perimeters/${stringify(data.findings_assessment.perimeter.id)}/`)}>${escape_html(data.findings_assessment.perimeter.str)}</a></p> <p>/</p> <p class="font-semibold text-lg">${escape_html(findingsassessment1())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/findings-assessments/${stringify(data.findings_assessment.id)}/`)}>${escape_html(data.findings_assessment.name)} - ${escape_html(data.findings_assessment.version)}</a></p> <p>/</p></div> <div class="flex flex-col space-y-4 bg-white p-4 shadow-sm rounded-lg space-x-2"><div class="flex justify-between items-center w-full"><div class="flex-1"><p class="text-xl font-extrabold">${escape_html(associatedappliedcontrols2())}</p> <p class="text-sm text-gray-500">${escape_html(actionplanhelptext3())}</p></div> <div class="flex gap-2 ml-auto">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/applied-controls/flash-mode?findings_assessments=${page.params.id}&backUrl=${encodeURIComponent(page.url.pathname)}&backLabel=${encodeURIComponent(actionplan1())}`,
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
    tags: false,
    baseEndpoint: `/applied-controls?findings_assessments=${stringify(page.params.id)}`,
    fields: [
      "name",
      "status",
      "priority",
      "category",
      "csf_function",
      "eta",
      "expiry_date",
      "effort",
      "cost",
      "findings_count"
    ]
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DXxuM3we.js.map
