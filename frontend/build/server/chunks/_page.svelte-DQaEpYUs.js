import { p as push, af as await_block, a as pop, W as ensure_array_like, S as attr_class, V as escape_html, X as stringify, T as attr } from './index2-9icAqEyj.js';
import { or as updateavailable1, jL as requirementmappingsets2, Do as metricdefinitions1, cT as threats, tA as riskmatrices1, vK as referencecontrols1, HE as frameworks, Wj as addyourlibrary2, G as loading } from './_index-DZs3gE-i.js';
import { M as ModelTable } from './ModelTable-BZ-7wwsg.js';
import './schemas-QFT6TgyO.js';
import './client-DqP3yP6V.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './runtime-B_ICGJZJ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './Anchor-L6GP3zar.js';
import './breadcrumbs-CnPDyFos.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './access-control-DaLcieub.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './crud-BJ_TECqM.js';
import './i18n-MfjzxjGF.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-s4NDhsV8.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-KBvf9zHE.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let isFetchingMuraji = false;
  let isDeletingAll = false;
  getModalStore();
  const filterConfiguration = {
    frameworks: {
      type: "string",
      field: "object_type",
      icon: "fa-book-open",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: frameworks()
    },
    reference_controls: {
      type: "string",
      field: "object_type",
      icon: "fa-shield-halved",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: referencecontrols1()
    },
    risk_matrices: {
      type: "string",
      field: "object_type",
      icon: "fa-table-cells",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: riskmatrices1()
    },
    threats: {
      type: "string",
      field: "object_type",
      icon: "fa-triangle-exclamation",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: threats()
    },
    metric_definitions: {
      type: "string",
      field: "object_type",
      icon: "fa-chart-line",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: metricdefinitions1()
    },
    requirement_mapping_sets: {
      type: "string",
      field: "object_type",
      icon: "fa-diagram-project",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: requirementmappingsets2()
    },
    is_update: {
      type: "boolean",
      field: "is_update",
      icon: "fa-arrows-rotate",
      selectedClass: "bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white shadow-md",
      hoverClass: "hover:border-[#0A1628]/40 hover:bg-[#0A1628]/5",
      label: updateavailable1()
    }
  };
  const filterTypes = Object.keys(filterConfiguration);
  let quickFilterSelected = {};
  $$payload.out += `<div class="wgrc-card min-h-[400px]">`;
  await_block(
    $$payload,
    data.storedLibrariesTable,
    () => {
      $$payload.out += `<div class="flex flex-col items-center justify-center py-20 gap-4"><div class="relative"><svg class="w-16 h-16 animate-spin" viewBox="0 0 50 50"><circle class="stroke-gray-200" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle><circle class="stroke-indigo-600" cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 94.2"></circle></svg></div> <p class="text-gray-600 font-medium">${escape_html(loading ? loading() : "Loading libraries...")}</p> <p class="text-gray-400 text-sm">جاري تحميل المكتبات...</p></div>`;
    },
    (storedLibrariesTable) => {
      {
        let quickFilters = function($$payload2, filterValues, form, invalidateTable) {
          const each_array = ensure_array_like(filterTypes);
          $$payload2.out += `<div class="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let key = each_array[$$index];
            const config = filterConfiguration[key];
            $$payload2.out += `<button${attr_class(`group relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${stringify(quickFilterSelected[key] ? config.selectedClass : `bg-white text-gray-700 border-2 border-gray-300 ${config.hoverClass}`)}`)}><span class="flex items-center gap-2"><i${attr_class(`fa-solid ${stringify(config.icon)} transition-transform duration-200 ${stringify(quickFilterSelected[key] ? "scale-110" : "group-hover:scale-110")}`)}></i> <span class="font-semibold">${escape_html(config.label)}</span> `;
            if (quickFilterSelected[key]) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<svg class="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--></span></button>`;
          }
          $$payload2.out += `<!--]--></div>`;
        }, addButton = function($$payload2) {
          $$payload2.out += `<div class="flex gap-2"><form method="POST" action="?/deleteAll"><button type="submit" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm shadow-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", isDeletingAll, true)} title="Delete all libraries">`;
          {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<i class="fa-solid fa-trash-can"></i> <span>حذف الكل</span>`;
          }
          $$payload2.out += `<!--]--></button></form> <form method="POST" action="?/fetchMuraji"><button type="submit" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-medium text-sm shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", isFetchingMuraji, true)} title="Fetch from Muraji">`;
          {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<i class="fa-solid fa-cloud-arrow-down"></i> <span>مزامنة مع مراجع</span>`;
          }
          $$payload2.out += `<!--]--></button></form> <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", addyourlibrary2())}${attr("aria-label", addyourlibrary2())}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
        };
        ModelTable($$payload, {
          source: storedLibrariesTable,
          URLModel: "stored-libraries",
          deleteForm: data.deleteForm,
          onFilterChange: (filters) => {
            Object.keys(quickFilterSelected).forEach((key) => quickFilterSelected[key] = false);
            for (const key in filterConfiguration) {
              const config = filterConfiguration[key];
              const filterValues = filters[config.field] ?? [];
              if (config.type === "string") {
                const filteredValues = filterValues.map((filter) => filter.value);
                if (filteredValues.includes(key)) {
                  quickFilterSelected[key] = true;
                }
              } else if (config.type === "boolean") {
                if (filterValues.some((f) => f.value === "true")) {
                  quickFilterSelected[key] = true;
                }
              }
            }
          },
          quickFilters,
          addButton,
          $$slots: { quickFilters: true, addButton: true }
        });
      }
    }
  );
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DQaEpYUs.js.map
