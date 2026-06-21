import { p as push, V as escape_html, X as stringify, a as pop, T as attr } from './index2-9icAqEyj.js';
import { M as ModelTable } from './ModelTable-BFWlDOTv.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { Ls as ebiosoperationalscenariohelp3, I8 as gobacktoebiosrmstudy5 } from './_index-DiaVtc2Z.js';
import 'marked';
import './crud-DzBk-fdF.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BpCge2eg.js';
import './runtime-BKo9q3Zd.js';
import './constants-CbUNxZZz.js';
import { A as Anchor } from './Anchor-vk0sCVou.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-BwimqDbp.js';
import './breadcrumbs-BKQh9F1q.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './Form-BvVZStO5.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-BXJYvcO9.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data } = $$props;
  const URLModel = data.URLModel;
  let activeActivity = null;
  page.url.searchParams.forEach((value, key) => {
    if (key === "activity" && value === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value === "two") {
      activeActivity = "two";
    } else if (key === "activity" && value === "three") {
      activeActivity = "three";
    }
  });
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
  $$payload.out += `<!----></div> <div class="rounded-xl bg-linear-to-r from-slate-50 to-white shadow mb-4 p-2 text-xs text-slate-600 whitespace-pre-line ml-auto"><i class="fa-solid fa-circle-info"></i> ${escape_html(ebiosoperationalscenariohelp3())}</div> `;
  {
    let addButton = function($$payload2) {
      $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
    };
    ModelTable($$payload, {
      source: data.table,
      deleteForm: data.deleteForm,
      URLModel,
      detailQueryParameter: `activity=${activeActivity}`,
      baseEndpoint: `/operational-scenarios?ebios_rm_study=${stringify(page.params.id)}`,
      addButton,
      $$slots: { addButton: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte--rOjya6z.js.map
