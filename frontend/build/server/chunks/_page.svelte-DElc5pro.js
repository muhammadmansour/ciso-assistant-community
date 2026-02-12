import { p as push, a as pop } from './index2-9icAqEyj.js';
import './runtime-BMNt81Gy.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import './breadcrumbs-CG0qNTv3.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './_index-DEXNURl5.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-souGUgW5.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './index8-BWS1s5in.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './access-control-DaLcieub.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './crud-a52dcxCi.js';
import './stores-CMqbeBUT.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-B7HJg_JV.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4">`;
  Anchor($$payload, {
    href: "/compliance-assessments",
    breadcrumbAction: "push",
    class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
    children: ($$payload2) => {
      $$payload2.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-file-lines text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">View Assessments</p> <p class="text-xs text-gray-500">Browse all compliance assessments</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Anchor($$payload, {
    href: "/evidences",
    breadcrumbAction: "push",
    class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
    children: ($$payload2) => {
      $$payload2.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-cloud-arrow-up text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">Manage Evidence</p> <p class="text-xs text-gray-500">View uploaded documents</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Anchor($$payload, {
    href: "/applied-controls",
    breadcrumbAction: "push",
    class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
    children: ($$payload2) => {
      $$payload2.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-shield-halved text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">Data Requests</p> <p class="text-xs text-gray-500">See all compliance requests</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="mb-4"><h2 class="text-xl font-bold text-gray-900">My Assignments</h2> <p class="text-sm text-gray-500">Complete these tasks by uploading the required evidence</p></div> `;
  ModelTable($$payload, {
    source: data.controlsTable,
    URLModel: "applied-controls",
    hideFilters: true
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DElc5pro.js.map
