import { p as push, a3 as store_set, W as ensure_array_like, V as escape_html, S as attr_class, X as stringify, af as await_block, a as pop } from './index2-9icAqEyj.js';
import { T as TreemapChart } from './TreemapChart-DxKF-v6O.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { dw as severity, J0 as filtervulnerabilitiesbyseverity3, kc as selectall1, R6 as clear, cE as status, I$ as filtervulnerabilitiesbystatus3, b7 as vulnerabilitytreemap1, C_ as nodatamatchesfilters3, R3 as clicktodrilldown3 } from './_index-DiaVtc2Z.js';
import './index-server-DEEfjxiI.js';
import './index-CRjgakYW.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  store_set(pageTitle, vulnerabilitytreemap1());
  const severityOptions = [
    "critical",
    "high",
    "medium",
    "low",
    "info",
    "undefined"
  ];
  const statusOptions = [
    "potential",
    "exploitable",
    "mitigated",
    "fixed",
    "not_exploitable",
    "unaffected",
    "--"
  ];
  let selectedSeverities = [
    "critical",
    "high",
    "medium",
    "low",
    "info"
  ];
  let selectedStatuses = [
    "potential",
    "exploitable",
    "mitigated",
    "fixed",
    "not_exploitable",
    "unaffected"
  ];
  function filterTreemapData(rawData) {
    if (!Array.isArray(rawData)) {
      return [];
    }
    return rawData.map((domain) => {
      const filteredChildren = domain.children.filter((severity2) => selectedSeverities.includes(severity2.name)).map((severity2) => ({
        ...severity2,
        name: safeTranslate(severity2.name),
        // Translate severity for display
        children: severity2.children.filter((status2) => selectedStatuses.includes(status2.name)).map((status2) => ({
          ...status2,
          name: safeTranslate(status2.name)
          // Translate status for display
        }))
      })).filter((severity2) => severity2.children.length > 0);
      return { ...domain, children: filteredChildren };
    }).filter((domain) => domain.children.length > 0);
  }
  const severityColors = {
    critical: "bg-red-500 text-white border-red-600 hover:bg-red-600",
    high: "bg-orange-500 text-white border-orange-600 hover:bg-orange-600",
    medium: "bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600",
    low: "bg-[#0A1628] text-white border-[#1a2740] hover:bg-[#1a2740]",
    info: "bg-gray-500 text-white border-gray-600 hover:bg-gray-600",
    undefined: "bg-slate-500 text-white border-slate-600 hover:bg-slate-600"
  };
  const severityColorsInactive = {
    critical: "bg-red-50 text-red-400 border-red-200 hover:bg-red-100",
    high: "bg-orange-50 text-orange-400 border-orange-200 hover:bg-orange-100",
    medium: "bg-yellow-50 text-yellow-400 border-yellow-200 hover:bg-yellow-100",
    low: "bg-blue-50 text-blue-400 border-blue-200 hover:bg-blue-100",
    info: "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100",
    undefined: "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
  };
  const statusColors = {
    potential: "bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600",
    exploitable: "bg-red-500 text-white border-red-600 hover:bg-red-600",
    mitigated: "bg-[#0A1628] text-white border-[#1a2740] hover:bg-[#1a2740]",
    fixed: "bg-green-500 text-white border-green-600 hover:bg-green-600",
    not_exploitable: "bg-teal-500 text-white border-teal-600 hover:bg-teal-600",
    unaffected: "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600",
    "--": "bg-slate-500 text-white border-slate-600 hover:bg-slate-600"
  };
  const statusColorsInactive = {
    potential: "bg-yellow-50 text-yellow-400 border-yellow-200 hover:bg-yellow-100",
    exploitable: "bg-red-50 text-red-400 border-red-200 hover:bg-red-100",
    mitigated: "bg-blue-50 text-blue-400 border-blue-200 hover:bg-blue-100",
    fixed: "bg-green-50 text-green-400 border-green-200 hover:bg-green-100",
    not_exploitable: "bg-teal-50 text-teal-400 border-teal-200 hover:bg-teal-100",
    unaffected: "bg-emerald-50 text-emerald-400 border-emerald-200 hover:bg-emerald-100",
    "--": "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
  };
  const each_array = ensure_array_like(severityOptions);
  const each_array_1 = ensure_array_like(statusOptions);
  $$payload.out += `<div class="bg-white p-6 h-screen overflow-auto"><div class="mb-6 space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div><div class="flex items-center justify-between mb-3"><div><label class="text-base font-semibold text-gray-900">${escape_html(severity())}</label> <p class="text-xs text-gray-500 mt-0.5">${escape_html(filtervulnerabilitiesbyseverity3())}</p></div> <div class="flex gap-2"><button class="text-xs px-3 py-1.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors font-medium shadow-sm">${escape_html(selectall1())}</button> <button class="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">${escape_html(clear())}</button></div></div> <div class="flex flex-wrap gap-2"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let severity2 = each_array[$$index];
    $$payload.out += `<button${attr_class(`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm shadow-sm ${stringify(selectedSeverities.includes(severity2) ? severityColors[severity2] + " ring-2 ring-offset-1 ring-current" : severityColorsInactive[severity2])}`)}>${escape_html(safeTranslate(severity2))} `;
    if (selectedSeverities.includes(severity2)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fas fa-check ml-1.5 text-xs"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></button>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="border-t border-gray-200"></div> <div><div class="flex items-center justify-between mb-3"><div><label class="text-base font-semibold text-gray-900">${escape_html(status())}</label> <p class="text-xs text-gray-500 mt-0.5">${escape_html(filtervulnerabilitiesbystatus3())}</p></div> <div class="flex gap-2"><button class="text-xs px-3 py-1.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors font-medium shadow-sm">${escape_html(selectall1())}</button> <button class="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">${escape_html(clear())}</button></div></div> <div class="flex flex-wrap gap-2"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let status2 = each_array_1[$$index_1];
    $$payload.out += `<button${attr_class(`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium text-sm shadow-sm ${stringify(selectedStatuses.includes(status2) ? statusColors[status2] + " ring-2 ring-offset-1 ring-current" : statusColorsInactive[status2])}`)}>${escape_html(safeTranslate(status2))} `;
    if (selectedStatuses.includes(status2)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fas fa-check ml-1.5 text-xs"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></button>`;
  }
  $$payload.out += `<!--]--></div></div></div> <div class="h-[calc(100vh-400px)]">`;
  await_block(
    $$payload,
    data.stream.treemapData,
    () => {
      $$payload.out += `<div class="flex items-center justify-center h-full">`;
      LoadingSpinner($$payload);
      $$payload.out += `<!----></div>`;
    },
    (loadedData) => {
      $$payload.out += `<!---->`;
      {
        const filteredData = filterTreemapData(loadedData);
        if (filteredData.length === 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex items-center justify-center h-full text-gray-500">${escape_html(nodatamatchesfilters3())}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
          TreemapChart($$payload, {
            tree: filteredData,
            name: "vulnerability_treemap",
            title: clicktodrilldown3()
          });
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!---->`;
    }
  );
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-x7r2j7H5.js.map
