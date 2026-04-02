import { p as push, a as pop, T as attr, W as ensure_array_like, S as attr_class, V as escape_html, X as stringify } from './index2-9icAqEyj.js';
import { on as updateavailable1, jJ as requirementmappingsets2, D2 as metricdefinitions1, cT as threats, tu as riskmatrices1, vz as referencecontrols1, Hi as frameworks, VV as addyourlibrary2 } from './_index-B12BAPce.js';
import { M as ModelTable } from './ModelTable-CBxNmYiP.js';
import './schemas-DWhEPmW4.js';
import './client-DqP3yP6V.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './runtime-BKo9q3Zd.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './Anchor-B1pWCcQZ.js';
import './breadcrumbs-B1Us7xd5.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './access-control-DaLcieub.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './crud-T40TopyM.js';
import './i18n-D3bRixKV.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-CU-l-bUF.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DmAIPnRV.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  getModalStore();
  const filterConfiguration = {
    frameworks: {
      type: "string",
      field: "object_type",
      icon: "fa-book-open",
      selectedClass: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200",
      hoverClass: "hover:border-blue-400 hover:bg-blue-50",
      label: frameworks()
    },
    reference_controls: {
      type: "string",
      field: "object_type",
      icon: "fa-shield-halved",
      selectedClass: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200",
      hoverClass: "hover:border-emerald-400 hover:bg-emerald-50",
      label: referencecontrols1()
    },
    risk_matrices: {
      type: "string",
      field: "object_type",
      icon: "fa-table-cells",
      selectedClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-200",
      hoverClass: "hover:border-amber-400 hover:bg-amber-50",
      label: riskmatrices1()
    },
    threats: {
      type: "string",
      field: "object_type",
      icon: "fa-triangle-exclamation",
      selectedClass: "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-red-200",
      hoverClass: "hover:border-red-400 hover:bg-red-50",
      label: threats()
    },
    metric_definitions: {
      type: "string",
      field: "object_type",
      icon: "fa-chart-line",
      selectedClass: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200",
      hoverClass: "hover:border-purple-400 hover:bg-purple-50",
      label: metricdefinitions1()
    },
    requirement_mapping_sets: {
      type: "string",
      field: "object_type",
      icon: "fa-diagram-project",
      selectedClass: "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-pink-200",
      hoverClass: "hover:border-pink-400 hover:bg-pink-50",
      label: requirementmappingsets2()
    },
    is_update: {
      type: "boolean",
      field: "is_update",
      icon: "fa-arrows-rotate",
      selectedClass: "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-pink-200",
      hoverClass: "hover:border-pink-400 hover:bg-pink-50",
      label: updateavailable1()
    }
  };
  const filterTypes = Object.keys(filterConfiguration);
  let quickFilterSelected = {};
  $$payload.out += `<div class="card bg-white py-2 shadow-sm">`;
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
      $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", addyourlibrary2())}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
    };
    ModelTable($$payload, {
      source: data.storedLibrariesTable,
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
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-5NdswHMS.js.map
