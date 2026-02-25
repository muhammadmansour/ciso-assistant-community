import { p as push, T as attr, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-Bt-6QslO.js';
import { mN as viewongraphexplorer3 } from './_index-BNamVw9A.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-CCjZl5ir.js';
import './breadcrumbs-DdEobqL1.js';
import './Form-D44apvvs.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-CnZlshhm.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-BiYAuEEm.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './stores-CMqbeBUT.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-Cmsh2Wi5.js';
import './ModelTable-D1sEvsmt.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-D06m6CiP.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  DetailView($$payload, { data });
  $$payload.out += `<!----> `;
  if (data.model.name == "requirementmappingset" && data.data.frameworks_available) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card my-4 p-4 bg-white"><span class="bg-purple-700 text-white px-2 py-1 rounded-sm text-sm font-semibold">new</span><a class="ml-2 hover:text-purple-700"${attr("href", `/experimental/mapping/${data.data.id}`)}>${escape_html(viewongraphexplorer3())}</a></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CeGjxIbV.js.map
