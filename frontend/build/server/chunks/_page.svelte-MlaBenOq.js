import { p as push, X as stringify, a as pop, V as escape_html, T as attr } from './index2-9icAqEyj.js';
import { M as ModelTable } from './ModelTable-BFxMEe_X.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { G_ as gobacktoebiosrmstudy5 } from './_index-D7NdhnXA.js';
import 'marked';
import './crud-CUvW5I-u.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BKo9q3Zd.js';
import './constants-lv6aycRl.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-DwUKC0vK.js';
import './breadcrumbs-BA0IMSh1.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './Form-BDbIHs7i.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-Ba0Wju_d.js';
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
  {
    let addButton = function($$payload2) {
      $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
    };
    ModelTable($$payload, {
      source: data.table,
      deleteForm: data.deleteForm,
      URLModel,
      baseEndpoint: `/feared-events?ebios_rm_study=${stringify(page.params.id)}`,
      addButton,
      $$slots: { addButton: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-MlaBenOq.js.map
