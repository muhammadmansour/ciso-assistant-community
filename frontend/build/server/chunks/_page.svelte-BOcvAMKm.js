import { p as push, T as attr, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { M as ModelTable } from './ModelTable-BFxMEe_X.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './_index-D7NdhnXA.js';
import './runtime-BKo9q3Zd.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './Anchor-u--4IyDz.js';
import './breadcrumbs-BA0IMSh1.js';
import './access-control-DaLcieub.js';
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './crud-CUvW5I-u.js';
import './stores-D-WMoATo.js';
import './i18n-CMphL55V.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-BDbIHs7i.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-Ba0Wju_d.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let searchInput = data.searchQuery || "";
  const searchSuffix = data.searchQuery ? `?search=${encodeURIComponent(data.searchQuery)}` : "";
  $$payload.out += `<div class="space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center"><i class="fa-solid fa-magnifying-glass text-[#0A1628] text-lg"></i></div> <div><h2 class="text-xl font-bold text-gray-900">Search</h2> <p class="text-sm text-gray-500">Search across Assessments, Controls, and Evidence</p></div></div> <div class="flex items-center gap-2"><div class="relative flex-1"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i> <input type="text" placeholder="Type your search query..."${attr("value", searchInput)} class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/30 focus:border-[#0077CC] focus:bg-white transition-all"/></div> <button class="px-6 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-lg hover:bg-[#1a2740] transition-colors flex items-center gap-2"><i class="fa-solid fa-magnifying-glass"></i> Search</button></div></div> `;
  if (data.searchQuery) {
    $$payload.out += "<!--[-->";
    if (data.searchError) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"><i class="fa-solid fa-circle-exclamation text-red-500 text-lg mt-0.5"></i> <div><h4 class="text-sm font-semibold text-red-800">Search encountered an error</h4> <p class="text-sm text-red-600 mt-1">Some results may be incomplete or unavailable. Please try again later.</p> <p class="text-xs text-red-400 mt-1">${escape_html(data.searchError)}</p></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center gap-2 mb-4"><i class="fa-solid fa-clipboard-check text-[#0077CC] text-lg"></i> <h3 class="text-lg font-bold text-gray-900">Assessments</h3> <span class="text-sm text-gray-400 ml-1">(${escape_html(data.assessmentsTable.meta?.count ?? 0)})</span></div> `;
    ModelTable($$payload, {
      source: data.assessmentsTable,
      URLModel: "compliance-assessments",
      baseEndpoint: `/compliance-assessments${searchSuffix}`,
      hideFilters: true,
      displayActions: false,
      search: false
    });
    $$payload.out += `<!----></div> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center gap-2 mb-4"><i class="fa-solid fa-shield-halved text-[#0077CC] text-lg"></i> <h3 class="text-lg font-bold text-gray-900">Controls</h3> <span class="text-sm text-gray-400 ml-1">(${escape_html(data.controlsTable.meta?.count ?? 0)})</span></div> `;
    ModelTable($$payload, {
      source: data.controlsTable,
      URLModel: "applied-controls",
      baseEndpoint: `/applied-controls${searchSuffix}`,
      hideFilters: true,
      displayActions: false,
      search: false
    });
    $$payload.out += `<!----></div> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center gap-2 mb-4"><i class="fa-solid fa-file-lines text-[#0077CC] text-lg"></i> <h3 class="text-lg font-bold text-gray-900">Evidence</h3> <span class="text-sm text-gray-400 ml-1">(${escape_html(data.evidenceTable.meta?.count ?? 0)})</span></div> `;
    ModelTable($$payload, {
      source: data.evidenceTable,
      URLModel: "evidences",
      baseEndpoint: `/evidences${searchSuffix}`,
      hideFilters: true,
      displayActions: false,
      search: false
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center"><i class="fa-solid fa-magnifying-glass text-gray-400 text-2xl"></i></div> <p class="text-gray-500 font-medium">Type a query above and press Enter or click Search</p> <p class="text-gray-400 text-sm mt-1">Results from Assessments, Controls, and Evidence will appear here</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BOcvAMKm.js.map
