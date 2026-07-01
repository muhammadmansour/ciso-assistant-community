import { p as push, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-BGPkNWEf.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-BRS9PKeN.js';
import './breadcrumbs-TPX_ebIH.js';
import './_index-BQcvYRD4.js';
import './runtime-BKo9q3Zd.js';
import './Form-EyIMnhQb.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-Y-FXalQc.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-DA2NQw0x.js';
import './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
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
import './schemas-vgtyOSI9.js';
import './ModelTable-Cwc6okqb.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-BVIf1kgK.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  DetailView($$payload, {
    data,
    displayModelTable: data.data.is_recurrent,
    exclude: data.data.is_recurrent ? ["observation", "status"] : ["last_occurrence_status", "next_occurrence"]
  });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-dsWUifYk.js.map
