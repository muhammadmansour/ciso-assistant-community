import { p as push, W as ensure_array_like, V as escape_html, X as stringify, a as pop, T as attr } from './index2-9icAqEyj.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { v3 as reminderwarningstrategicscenarios3, XN as addattackpathtodooperationalscenarios6, GR as gobacktoebiosrmstudy5 } from './_index-DEXNURl5.js';
import 'marked';
import './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-BcDBvyDd.js';
import './breadcrumbs-CG0qNTv3.js';
import './Popover-souGUgW5.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './index8-BWS1s5in.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-DDazzCSM.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data } = $$props;
  const URLModel = data.URLModel;
  $$payload.out += `<div class="flex items-center justify-between mb-4">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/ebios-rm/${data.data.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  if (data.scenariosWithoutAttackPath.count > 0) {
    $$payload.out += "<!--[-->";
    const missingScenarios = data.scenariosWithoutAttackPath.results;
    const each_array = ensure_array_like(missingScenarios);
    $$payload.out += `<section class="my-6"><div class="flex items-start gap-3 rounded-xl border border-warning-300 bg-warning-100 p-4 shadow-xs"><div class="text-warning-600 mt-1"><i class="fa-solid fa-triangle-exclamation text-xl"></i></div> <div><h2 class="font-semibold text-warning-800 text-md mb-1">${escape_html(reminderwarningstrategicscenarios3())}</h2> <p class="text-warning-700 text-sm leading-snug mb-1">${escape_html(addattackpathtodooperationalscenarios6())}</p> <ul class="list-disc list-inside text-warning-700 text-sm"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let scenario = each_array[$$index];
      $$payload.out += `<li>${escape_html(scenario.name ?? `ID: ${scenario.id}`)}</li>`;
    }
    $$payload.out += `<!--]--></ul></div></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    let addButton = function($$payload2) {
      $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
    };
    ModelTable($$payload, {
      source: data.table,
      deleteForm: data.deleteForm,
      URLModel,
      baseEndpoint: `/strategic-scenarios?ebios_rm_study=${stringify(page.params.id)}`,
      addButton,
      $$slots: { addButton: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CJljpWQp.js.map
