import { V as escape_html, W as ensure_array_like, S as attr_class, X as stringify, T as attr } from './index2-9icAqEyj.js';
import './runtime-BMNt81Gy.js';

function _page($$payload, $$props) {
  let { data } = $$props;
  const { lintResults } = data;
  const errors = lintResults.results.filter((r) => r.severity === "error");
  const warnings = lintResults.results.filter((r) => r.severity === "warning");
  const oks = lintResults.results.filter((r) => r.severity === "ok");
  const canGenerate = errors.length === 0;
  function getSeverityColor(severity) {
    switch (severity) {
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "ok":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }
  function getSeverityIcon(severity) {
    switch (severity) {
      case "error":
        return "fa-circle-xmark";
      case "warning":
        return "fa-triangle-exclamation";
      case "ok":
        return "fa-circle-check";
      default:
        return "fa-circle-info";
    }
  }
  function getEditUrl(result) {
    if (!result.object_type || !result.object_id) {
      return null;
    }
    return `/${result.object_type}/${result.object_id}/edit?next=/reports/dora-roi`;
  }
  $$payload.out += `<div class="px-4 py-6 space-y-6 max-w-5xl mx-auto"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-gray-900">DORA Register of Information</h1> <p class="mt-2 text-gray-600">Validation check before generating the report</p></div> <a href="/reports" class="text-blue-600 hover:text-blue-800 flex items-center gap-2"><i class="fa-solid fa-arrow-left"></i> Back to Reports</a></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h2 class="text-xl font-semibold text-gray-900 mb-4">Validation Summary</h2> <div class="grid grid-cols-3 gap-4"><div class="text-center p-4 rounded-lg bg-red-50 border border-red-200"><div class="text-3xl font-bold text-red-600">${escape_html(lintResults.summary.errors)}</div> <div class="text-sm text-red-600 mt-1">Errors</div></div> <div class="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200"><div class="text-3xl font-bold text-yellow-600">${escape_html(lintResults.summary.warnings)}</div> <div class="text-sm text-yellow-600 mt-1">Warnings</div></div> <div class="text-center p-4 rounded-lg bg-green-50 border border-green-200"><div class="text-3xl font-bold text-green-600">${escape_html(lintResults.summary.ok)}</div> <div class="text-sm text-green-600 mt-1">Passed</div></div></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h2 class="text-xl font-semibold text-gray-900 mb-4">Validation Details</h2> <div class="space-y-3">`;
  if (errors.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(errors);
    $$payload.out += `<div class="space-y-2"><h3 class="text-sm font-semibold text-red-600 uppercase tracking-wide">Errors</h3> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let result = each_array[$$index];
      const editUrl = getEditUrl(result);
      $$payload.out += `<div${attr_class(`flex items-start gap-3 p-4 rounded-lg border ${stringify(getSeverityColor(result.severity))}`)}><i${attr_class(`fa-solid ${stringify(getSeverityIcon(result.severity))} mt-0.5`)}></i> <div class="flex-1"><div class="font-medium text-sm">${escape_html(result.category)}</div> <div class="text-sm mt-1">${escape_html(result.message)}</div> `;
      if (result.field) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-xs mt-1 opacity-75">Field: ${escape_html(result.field)}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (editUrl) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a${attr("href", editUrl)} class="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-2"><i class="fa-solid fa-pencil"></i> Fix</a>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (warnings.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(warnings);
    $$payload.out += `<div class="space-y-2"><h3 class="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Warnings</h3> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let result = each_array_1[$$index_1];
      const editUrl = getEditUrl(result);
      $$payload.out += `<div${attr_class(`flex items-start gap-3 p-4 rounded-lg border ${stringify(getSeverityColor(result.severity))}`)}><i${attr_class(`fa-solid ${stringify(getSeverityIcon(result.severity))} mt-0.5`)}></i> <div class="flex-1"><div class="font-medium text-sm">${escape_html(result.category)}</div> <div class="text-sm mt-1">${escape_html(result.message)}</div> `;
      if (result.field) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-xs mt-1 opacity-75">Field: ${escape_html(result.field)}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (editUrl) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a${attr("href", editUrl)} class="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-2"><i class="fa-solid fa-pencil"></i> Review</a>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (oks.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(oks);
    $$payload.out += `<div class="space-y-2"><h3 class="text-sm font-semibold text-green-600 uppercase tracking-wide">Passed Checks</h3> <!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let result = each_array_2[$$index_2];
      const editUrl = getEditUrl(result);
      $$payload.out += `<div${attr_class(`flex items-start gap-3 p-4 rounded-lg border ${stringify(getSeverityColor(result.severity))}`)}><i${attr_class(`fa-solid ${stringify(getSeverityIcon(result.severity))} mt-0.5`)}></i> <div class="flex-1"><div class="font-medium text-sm">${escape_html(result.category)}</div> <div class="text-sm mt-1">${escape_html(result.message)}</div> `;
      if (result.field) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-xs mt-1 opacity-75">Field: ${escape_html(result.field)}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (editUrl) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a${attr("href", editUrl)} class="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"><i class="fa-solid fa-eye"></i> View</a>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div>`;
  if (canGenerate) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-600">All validation checks passed. You can now generate the DORA ROI report.</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-sm text-red-600">Please fix all errors before generating the report.</p>`;
  }
  $$payload.out += `<!--]--></div> <button${attr("disabled", !canGenerate, true)}${attr_class(`px-6 py-3 rounded-lg font-medium transition-colors ${stringify(canGenerate ? "bg-[#0A1628] text-white hover:bg-[#1a2740]" : "bg-gray-300 text-gray-500 cursor-not-allowed")}`)}><i class="fa-solid fa-download mr-2"></i> Generate Report</button></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DeULVg_N.js.map
