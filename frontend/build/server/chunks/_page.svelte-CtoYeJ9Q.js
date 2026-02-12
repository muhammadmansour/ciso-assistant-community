import { p as push, a as pop, T as attr, X as stringify } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { Ih as exportbutton1, FW as importmatrices1, FY as importframeworks1, FX as importmappings1 } from './_index-DEXNURl5.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import 'marked';
import './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client-DqP3yP6V.js';
import './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import './breadcrumbs-CG0qNTv3.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-BcDBvyDd.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';
import './Popover-souGUgW5.js';
import './machine.svelte-CWLOiKlV.js';
import './index8-BWS1s5in.js';
import './Anchor-BbSdvrYd.js';
import './access-control-DaLcieub.js';
import './Form-B7HJg_JV.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let URLModel = data.URLModel;
  getModalStore();
  if (data.table) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="shadow-lg"><!---->`;
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
          } else if (URLModel === "risk-matrices") {
            $$payload2.out += "<!--[4-->";
            $$payload2.out += `<a href="/libraries?object_type=risk_matrices" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importmatrices1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
          } else if (URLModel === "frameworks") {
            $$payload2.out += "<!--[5-->";
            $$payload2.out += `<a href="/libraries?object_type=frameworks" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importframeworks1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
          } else if (URLModel === "requirement-mapping-sets") {
            $$payload2.out += "<!--[6-->";
            $$payload2.out += `<a href="/libraries?object_type=requirement_mapping_sets" class="inline-block p-3 text-gray-50 bg-[#0A1628] hover:bg-[#1a2740] w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", importmappings1())}><i class="fa-solid fa-file-import mr-2"></i></a>`;
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
//# sourceMappingURL=_page.svelte-CtoYeJ9Q.js.map
