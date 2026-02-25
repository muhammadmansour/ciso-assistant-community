import { p as push, V as escape_html, a as pop, T as attr, X as stringify } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { w8 as quickstart1, b as m, IK as exportbutton1, Gt as importmatrices1, Gv as importframeworks1, Gu as importmappings1 } from './_index-BNamVw9A.js';
import { s as safeTranslate } from './i18n-CnZlshhm.js';
import 'marked';
import './crud-BiYAuEEm.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-B_ICGJZJ.js';
import './constants-B8vm30bZ.js';
import './breadcrumbs-DdEobqL1.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-Cmsh2Wi5.js';
import { M as ModelTable } from './ModelTable-D1sEvsmt.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './client-DqP3yP6V.js';
import './shared-server-BU2DVf8Q.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index8-L4CsUepF.js';
import './Anchor-CCjZl5ir.js';
import './access-control-DaLcieub.js';
import './Form-D44apvvs.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-D06m6CiP.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let URLModel = data.URLModel;
  getModalStore();
  const modelDescriptionKey = () => {
    if (!URLModel) return null;
    const camelCase = URLModel.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
    return `${camelCase}Description`;
  };
  const modelDescription = () => {
    const key = modelDescriptionKey();
    if (key && m[key]) {
      return m[key]();
    }
    return "";
  };
  if (data.table) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="flex items-center justify-between px-6 py-5 border-b border-gray-100"><div><h2 class="text-lg font-bold text-gray-900">${escape_html(safeTranslate(data.model.localNamePlural))}</h2> `;
    if (modelDescription()) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-sm text-gray-500 mt-0.5">${escape_html(modelDescription())}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex items-center gap-2">`;
    if (URLModel === "compliance-assessments" && page.data?.user?.is_admin) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn bg-[#005FA3] text-white hover:bg-[#004d85] shadow-sm rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"><i class="fa-solid fa-plus mr-2"></i> ${escape_html(quickstart1())}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <!---->`;
    {
      {
        let addButton = function($$payload2) {
          $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">`;
          if (![
            "risk-matrices",
            "frameworks",
            "requirement-mapping-sets",
            "user-groups",
            "role-assignments"
          ].includes(URLModel)) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<button class="inline-block border-e p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button> `;
            if (["applied-controls", "assets"].includes(URLModel)) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<a${attr("href", `${stringify(URLModel)}/export/`)} class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative"${attr("title", exportbutton1())} data-testid="export-button"><i class="fa-solid fa-download mr-2"></i></a>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          } else if (URLModel === "risk-matrices") {
            $$payload2.out += "<!--[1-->";
            $$payload2.out += `<a href="/libraries?object_type=risk_matrix" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importmatrices1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
          } else if (URLModel === "frameworks") {
            $$payload2.out += "<!--[2-->";
            $$payload2.out += `<a href="/libraries?object_type=frameworks" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importframeworks1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
          } else if (URLModel === "requirement-mapping-sets") {
            $$payload2.out += "<!--[3-->";
            $$payload2.out += `<a href="/libraries?object_type=requirement_mapping_set" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importmappings1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></span></div>`;
        };
        ModelTable($$payload, {
          source: data.table,
          deleteForm: data.deleteForm,
          URLModel,
          addButton,
          $$slots: { addButton: true }
        });
      }
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CTkR3lQd.js.map
