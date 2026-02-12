import { p as push, T as attr, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-B_RoZuiq.js';
import { mo as viewongraphexplorer3 } from './_index-DEXNURl5.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-BbSdvrYd.js';
import './breadcrumbs-CG0qNTv3.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-F7m95JiK.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-WNCV45cf.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-a52dcxCi.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './stores-CMqbeBUT.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-Dk-jItBW.js';
import './machine.svelte-CWLOiKlV.js';
import './Tooltip-DrjF8lR0.js';
import './index5-C1_XlIn1.js';
import './index8-BWS1s5in.js';
import './string-BMZjP7XX.js';
import './schemas-BcDBvyDd.js';
import './ModelTable-2RGnpbgJ.js';
import './Popover-souGUgW5.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';

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
//# sourceMappingURL=_page.svelte-Cr6OPvHB.js.map
