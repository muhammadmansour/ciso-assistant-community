import { p as push, V as escape_html, W as ensure_array_like, S as attr_class, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-CX_pbNu-.js';
import './runtime-B_ICGJZJ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-L6GP3zar.js';
import './breadcrumbs-CnPDyFos.js';
import './_index-DZs3gE-i.js';
import './Form-s4NDhsV8.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-MfjzxjGF.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-BJ_TECqM.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './stores-CMqbeBUT.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-QFT6TgyO.js';
import './ModelTable-BZ-7wwsg.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-KBvf9zHE.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let isAnalyzing = false;
  let deletingAnalysisId = null;
  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "compliant":
        return "text-green-700 bg-green-100";
      case "partially compliant":
        return "text-yellow-700 bg-yellow-100";
      case "non-compliant":
        return "text-red-700 bg-red-100";
      case "insufficient evidence":
        return "text-orange-700 bg-orange-100";
      case "failed":
        return "text-red-700 bg-red-100";
      case "completed":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  }
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }
  {
    let actions = function($$payload2) {
      $$payload2.out += `<form method="POST" action="?/runAiAnalysis"><button type="submit" class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"${attr("disabled", isAnalyzing, true)} title="Start AI Analysis on Associated Evidences">`;
      {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i> <span>Start AI Analysis</span>`;
      }
      $$payload2.out += `<!--]--></button></form>`;
    };
    DetailView($$payload, {
      data,
      exclude: [
        "folder",
        "reference_control",
        "category",
        "csf_function",
        "priority",
        "effort",
        "control_impact",
        "annual_cost_display",
        "status",
        "created_at",
        "updated_at",
        "name",
        "description",
        "ref_id",
        "annotation",
        "eta",
        "expiry_date",
        "link",
        "owner",
        "progress_field",
        "observation",
        "security_exceptions",
        "filtering_labels",
        "sync_mappings"
      ],
      actions,
      $$slots: { actions: true }
    });
  }
  $$payload.out += `<!----> <div class="card mt-8 bg-white shadow-lg"><div class="p-6">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mb-4 flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-800"><i class="fa-solid fa-brain text-[#0A1628] mr-2"></i> AI Analysis History</h3> <span class="text-sm text-gray-500">${escape_html(data.aiAnalyses?.length || 0)} analysis(es)</span></div> `;
  if (data.aiAnalyses?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.aiAnalyses);
    $$payload.out += `<div class="overflow-x-auto border border-gray-200 rounded-lg"><table class="w-full text-sm"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="text-left px-4 py-3 font-semibold text-gray-600">Date</th><th class="text-left px-4 py-3 font-semibold text-gray-600">Status</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Files</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Requirements</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Actions</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let analysis = each_array[$$index];
      $$payload.out += `<tr class="hover:bg-gray-50 transition-colors"><td class="px-4 py-3 text-gray-700">${escape_html(formatDate(analysis.created_at))}</td><td class="px-4 py-3"><span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stringify(getStatusColor(analysis.status))}`)}>`;
      if (analysis.status === "completed") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-circle-check mr-1"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-circle-xmark mr-1"></i>`;
      }
      $$payload.out += `<!--]--> ${escape_html(analysis.status)}</span></td><td class="px-4 py-3 text-center text-gray-600">${escape_html(analysis.gemini_files_count)}</td><td class="px-4 py-3 text-center text-gray-600">${escape_html(analysis.requirements_count)}</td><td class="px-4 py-3 text-center"><div class="flex items-center justify-center gap-1"><button class="btn btn-sm preset-tonal-primary" title="View full analysis"><i class="fa-solid fa-eye mr-1"></i> View</button> <form method="POST" action="?/deleteAiAnalysis"><input type="hidden" name="analysisId"${attr("value", analysis.id)}/> <button type="submit" class="btn btn-sm preset-tonal-error" title="Delete analysis"${attr("disabled", deletingAnalysisId === analysis.id, true)}>`;
      if (deletingAnalysisId === analysis.id) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-spinner fa-spin"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-trash"></i>`;
      }
      $$payload.out += `<!--]--></button></form></div></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-12"><div class="inline-block p-6 rounded-full bg-[#0A1628]/10 mb-4"><i class="fa-solid fa-brain text-4xl text-[#0A1628]"></i></div> <h3 class="text-xl font-semibold text-gray-800 mb-2">No AI Analyses Yet</h3> <p class="text-gray-600 mb-6">Click the "Start AI Analysis" button above to analyze all associated evidence files.</p> <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto"><p class="text-sm text-blue-800"><i class="fa-solid fa-info-circle mr-2"></i> Each analysis will be saved here for future reference.</p></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B3sZoPvl.js.map
