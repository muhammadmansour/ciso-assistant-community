import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { F as loading, Kx as download } from './_index-B12BAPce.js';
import './constants-QzmVibOJ.js';
import { p as page } from './index3-BwfRm5YV.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './crud-T40TopyM.js';
import 'marked';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import { D as DetailView } from './DetailView-C9gOGqEv.js';
import './string-BMZjP7XX.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './runtime-BKo9q3Zd.js';
import './shared-server-BU2DVf8Q.js';
import './client-DqP3yP6V.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-D3bRixKV.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './breadcrumbs-B1Us7xd5.js';
import './Form-CU-l-bUF.js';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './schemas-DWhEPmW4.js';
import './ModelTable-CBxNmYiP.js';
import './Popover-PelKNyF8.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DmAIPnRV.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  getModalStore();
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: data.model.name,
    domain: data.model.name === "folder" ? data.data.id : data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
  });
  DetailView($$payload, { data });
  $$payload.out += `<!----> `;
  if (data.data.attachment) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card mt-8 px-6 py-4 bg-white flex flex-col shadow-lg space-y-4"><div class="flex flex-row justify-between"><h4 class="h4 font-semibold" data-testid="attachment-name-title">${escape_html(data.data.attachment)}</h4> <div class="space-x-2">`;
    Anchor($$payload, {
      href: `./${data.data.id}/attachment`,
      class: "btn preset-filled-primary-500 h-fit",
      "data-testid": "attachment-download-button",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-download mr-2"></i> ${escape_html(download())}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (canEditObject) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn preset-filled-tertiary-500 h-full"><i class="fa-solid fa-trash"></i></button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> `;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span data-testid="loading-field">${escape_html(loading())}...</span>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DfBCbXHA.js.map
