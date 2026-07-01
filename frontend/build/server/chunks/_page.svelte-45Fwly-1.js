import { p as push, W as ensure_array_like, V as escape_html, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';

function _page($$payload, $$props) {
  push();
  let { data, form: actionResult } = $$props;
  let searchQuery = "";
  let expandedId = null;
  const sectorOptions = [
    { value: "financial", label: "Financial" },
    { value: "government", label: "Government" },
    { value: "healthcare", label: "Healthcare" },
    { value: "energy", label: "Energy" },
    {
      value: "telecommunications",
      label: "Telecommunications"
    },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "technology", label: "Technology" },
    {
      value: "manufacturing",
      label: "Manufacturing"
    },
    { value: "other", label: "Other" }
  ];
  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "enterprise", label: "Enterprise" }
  ];
  const geoScopeOptions = [
    { value: "saudi_arabia", label: "Saudi Arabia" },
    { value: "gcc", label: "GCC" },
    {
      value: "middle_east_africa",
      label: "Middle East & Africa"
    },
    { value: "global", label: "Global" },
    { value: "regional", label: "Regional" },
    { value: "local", label: "Local" }
  ];
  const maturityOptions = [
    { value: "initial", label: "Initial" },
    { value: "developing", label: "Developing" },
    { value: "defined", label: "Defined" },
    { value: "managed", label: "Managed" },
    { value: "optimizing", label: "Optimizing" }
  ];
  const sectorColors = {
    financial: "text-blue-700 bg-blue-50",
    government: "text-emerald-700 bg-emerald-50",
    healthcare: "text-red-600 bg-red-50",
    energy: "text-amber-700 bg-amber-50",
    telecommunications: "text-purple-700 bg-purple-50",
    education: "text-indigo-700 bg-indigo-50",
    retail: "text-pink-600 bg-pink-50",
    technology: "text-cyan-700 bg-cyan-50",
    manufacturing: "text-orange-700 bg-orange-50",
    other: "text-gray-700 bg-gray-100"
  };
  const maturityColors = {
    initial: "text-orange-500 bg-orange-50",
    developing: "text-orange-600 bg-orange-50",
    defined: "text-blue-600 bg-blue-50",
    managed: "text-green-700 bg-green-50",
    optimizing: "text-emerald-700 bg-emerald-50"
  };
  function getSectorLabel(val) {
    return data.sectorChoices?.[val] || sectorOptions.find((o) => o.value === val)?.label || val;
  }
  function getSizeLabel(val) {
    return data.sizeChoices?.[val] || sizeOptions.find((o) => o.value === val)?.label || val;
  }
  function getMaturityLabel(val) {
    return data.maturityChoices?.[val] || maturityOptions.find((o) => o.value === val)?.label || val;
  }
  function getGeoScopeLabel(val) {
    return data.geoScopeChoices?.[val] || geoScopeOptions.find((o) => o.value === val)?.label || val;
  }
  const mockDocuments = {};
  const contexts = data.contexts ?? [];
  const totalContexts = contexts.length;
  const totalDocs = contexts.reduce((sum, c) => sum + (Array.isArray(c.regulatory_obligations) ? c.regulatory_obligations.length : 0), 0);
  const fullCoverage = contexts.filter((c) => c.maturity_level === "managed").length;
  const filteredContexts = searchQuery.trim() ? contexts.filter((c) => c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.name_ar?.includes(searchQuery) || getSectorLabel(c.sector).toLowerCase().includes(searchQuery.toLowerCase())) : contexts;
  const each_array = ensure_array_like(filteredContexts);
  $$payload.out += `<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Organization Contexts</h1> <p class="text-sm text-gray-500 mt-0.5">Manage client and entity profiles for AI-contextualized control suggestions</p></div> <button class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0077CC] text-white text-sm font-semibold rounded-lg hover:bg-[#005fa3] transition-colors shadow-sm"><i class="fa-solid fa-plus text-xs"></i> New Context</button></div> <div class="grid grid-cols-3 gap-4"><div class="bg-white rounded-xl border border-gray-200 p-5"><div class="flex items-center gap-2 mb-3"><i class="fa-solid fa-building text-[#0077CC] text-sm"></i> <span class="text-sm text-gray-500">Total Contexts</span></div> <div class="text-3xl font-bold text-gray-900">${escape_html(totalContexts)}</div></div> <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="flex items-center gap-2 mb-3"><i class="fa-solid fa-file-lines text-[#0077CC] text-sm"></i> <span class="text-sm text-gray-500">Total Obligations</span></div> <div class="text-3xl font-bold text-gray-900">${escape_html(totalDocs)}</div></div> <div class="bg-white rounded-xl border border-gray-200 p-5"><div class="flex items-center gap-2 mb-3"><i class="fa-regular fa-circle-check text-[#0077CC] text-sm"></i> <span class="text-sm text-gray-500">Full Regulatory Coverage</span></div> <div class="text-3xl font-bold text-gray-900">${escape_html(fullCoverage)}</div></div></div> <div class="relative"><i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i> <input type="text"${attr("value", searchQuery)} placeholder="Search by name, sector..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC]"/></div> <div class="space-y-3"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
    let ctx = each_array[$$index_2];
    const isExpanded = expandedId === ctx.id;
    const docs = mockDocuments[ctx.id] ?? [];
    $$payload.out += `<div${attr_class(`bg-white rounded-xl border transition-all group ${stringify(isExpanded ? "border-l-[3px] border-l-red-400 border-gray-200 shadow-sm" : "border-gray-200 hover:border-blue-200 hover:shadow-sm")}`)}><div class="flex items-center justify-between px-5 py-4 cursor-pointer"><div class="flex items-center gap-4"><div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-building text-gray-500"></i></div> <div><div class="flex items-center gap-2 mb-1"><span class="text-sm font-semibold text-gray-900">${escape_html(ctx.name)}</span> `;
    if (ctx.name_ar) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-sm text-gray-400">${escape_html(ctx.name_ar)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex items-center gap-1.5">`;
    if (ctx.sector) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`text-[11px] font-medium px-2 py-0.5 rounded-full ${stringify(sectorColors[ctx.sector] || "text-gray-700 bg-gray-100")}`)}>${escape_html(getSectorLabel(ctx.sector))}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (ctx.size) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-[11px] font-medium px-2 py-0.5 rounded-full text-gray-700 bg-gray-100">${escape_html(getSizeLabel(ctx.size))}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (ctx.maturity_level) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`text-[11px] font-medium px-2 py-0.5 rounded-full ${stringify(maturityColors[ctx.maturity_level] || "text-gray-700 bg-gray-100")}`)}>${escape_html(getMaturityLabel(ctx.maturity_level))}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> <div class="flex items-center gap-4">`;
    if (Array.isArray(ctx.regulatory_obligations) && ctx.regulatory_obligations.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(ctx.regulatory_obligations.slice(0, 2));
      $$payload.out += `<div class="flex items-center gap-1.5"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let obligation = each_array_1[$$index];
        $$payload.out += `<span class="text-[11px] font-medium px-2 py-0.5 rounded-full border text-teal-700 bg-teal-50 border-teal-200">${escape_html(obligation.length > 20 ? obligation.slice(0, 18) + "..." : obligation)}</span>`;
      }
      $$payload.out += `<!--]--> `;
      if (ctx.regulatory_obligations.length > 2) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-[11px] font-medium text-gray-500">+${escape_html(ctx.regulatory_obligations.length - 2)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (docs.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-xs text-gray-400">${escape_html(docs.length)} docs</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex items-center gap-1"><button class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"><i class="fa-solid fa-pen-to-square text-xs"></i></button> <button class="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"><i class="fa-solid fa-trash text-xs"></i></button></div> <i${attr_class(`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${stringify(isExpanded ? "text-gray-500" : "text-gray-300 -rotate-90 group-hover:text-gray-500")}`)}></i></div></div> `;
    if (isExpanded) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="border-t border-gray-100 px-5 py-5"><div class="grid grid-cols-2 gap-8"><div class="space-y-4"><h4 class="text-sm font-semibold text-gray-900">Details</h4> `;
      if (ctx.geographic_scope) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex items-start gap-2.5"><i class="fa-solid fa-location-dot text-gray-400 text-sm mt-0.5 w-4 text-center"></i> <span class="text-sm text-gray-700">${escape_html(getGeoScopeLabel(ctx.geographic_scope))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (Array.isArray(ctx.regulatory_obligations) && ctx.regulatory_obligations.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex items-start gap-2.5"><i class="fa-solid fa-shield-halved text-gray-400 text-sm mt-0.5 w-4 text-center"></i> <div><span class="text-xs font-medium text-gray-500 block mb-1">Regulatory:</span> <span class="text-sm text-gray-700">${escape_html(ctx.regulatory_obligations.join(", "))}</span></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (ctx.notes) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-3"><h4 class="text-sm font-semibold text-gray-900 mb-1.5">Notes</h4> <p class="text-sm text-gray-600 leading-relaxed">${escape_html(ctx.notes)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <div class="space-y-3"><h4 class="text-sm font-semibold text-gray-900">Documents (${escape_html(docs.length)})</h4> `;
      if (docs.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_2 = ensure_array_like(docs);
        $$payload.out += `<div class="space-y-2"><!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let doc = each_array_2[$$index_1];
          const ext = doc.name.split(".").pop()?.toLowerCase();
          const iconClass = ext === "pdf" ? "fa-solid fa-file-pdf text-red-400" : ext === "xlsx" || ext === "xls" ? "fa-solid fa-file-excel text-green-500" : ext === "docx" || ext === "doc" ? "fa-solid fa-file-word text-blue-500" : "fa-regular fa-file text-gray-400";
          $$payload.out += `<div class="flex items-center justify-between py-1.5"><div class="flex items-center gap-2.5 min-w-0"><i${attr_class(`${stringify(iconClass)} text-base w-5 text-center flex-shrink-0`)}></i> <span class="text-sm text-blue-600 hover:underline cursor-pointer truncate">${escape_html(doc.name)}</span></div> <span class="text-xs text-gray-400 flex-shrink-0 ml-3">${escape_html(doc.size)}</span></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="fa-regular fa-folder-open text-2xl text-gray-300 mb-2"></i> <p class="text-xs text-gray-400">No documents uploaded yet</p></div>`;
      }
      $$payload.out += `<!--]--></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--> `;
  if (filteredContexts.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center py-12 bg-white rounded-xl border border-gray-200"><i class="fa-solid fa-building text-4xl text-gray-300 mb-3"></i> <p class="text-gray-500 text-sm">No contexts found</p> `;
    if (contexts.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-gray-400 text-xs mt-1">Click "New Context" to create your first organization profile</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-45Fwly-1.js.map
