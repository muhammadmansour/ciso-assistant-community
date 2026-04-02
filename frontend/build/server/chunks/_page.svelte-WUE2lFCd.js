import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-C9gOGqEv.js';
import { Ps as comparehypotheses1, DY as lossexceedancecurves2, Cb as nocurvedataavailable3 } from './_index-B12BAPce.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-B1pWCcQZ.js';
import './breadcrumbs-B1Us7xd5.js';
import './Form-CU-l-bUF.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-D3bRixKV.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-T40TopyM.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-DWhEPmW4.js';
import './ModelTable-CBxNmYiP.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DmAIPnRV.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  {
    let widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4 bg-slate-100 rounded-xl p-4">`;
      if (data.lec?.curves?.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="bg-white rounded-lg p-4 shadow-sm w-full"><h5 class="text-lg font-semibold text-gray-700 mb-4">${escape_html(comparehypotheses1())}</h5> <div id="combined-lec-chart" style="height: 400px; width: 100%;"></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="bg-white rounded-lg p-8 shadow-sm text-center"><div class="flex flex-col items-center space-y-4"><i class="fa-solid fa-chart-area text-4xl text-gray-400"></i> <h5 class="text-lg font-semibold text-gray-600">${escape_html(lossexceedancecurves2())}</h5> <p class="text-gray-500">${escape_html(nocurvedataavailable3())}</p></div></div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    };
    DetailView($$payload, { data, widgets, $$slots: { widgets: true } });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-WUE2lFCd.js.map
