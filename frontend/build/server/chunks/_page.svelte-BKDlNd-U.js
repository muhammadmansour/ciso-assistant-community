import { p as push, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-BNMFNFYC.js';
import { O as ObjectivesComparisonTable } from './ObjectivesComparisonTable-DrKRLoKY.js';
import { by as securityobjectives1, we as recoveryindicators1 } from './_index-DiaVtc2Z.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-vk0sCVou.js';
import './breadcrumbs-BKQh9F1q.js';
import './Form-BvVZStO5.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-CxHbQmwN.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-DzBk-fdF.js';
import './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './legacy-server-DMdb6ZTL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-BwimqDbp.js';
import './ModelTable-BFWlDOTv.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-BXJYvcO9.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  {
    let widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-gray-50 shadow-xs grow">`;
      ObjectivesComparisonTable($$payload2, {
        comparisons: data.data.security_objectives_comparison,
        title: securityobjectives1(),
        icon: "fa-shield-halved"
      });
      $$payload2.out += `<!----> `;
      ObjectivesComparisonTable($$payload2, {
        comparisons: data.data.recovery_objectives_comparison,
        title: recoveryindicators1(),
        icon: "fa-bullseye",
        uppercaseLabels: true
      });
      $$payload2.out += `<!----></div></div>`;
    };
    DetailView($$payload, { data, widgets, $$slots: { widgets: true } });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BKDlNd-U.js.map
