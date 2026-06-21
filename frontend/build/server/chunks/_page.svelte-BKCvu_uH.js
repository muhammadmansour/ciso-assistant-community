import { p as push, a as pop } from './index2-9icAqEyj.js';
import { M as ModelForm } from './ModelForm-CM5r70xn.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './Form-BvVZStO5.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-DiaVtc2Z.js';
import './runtime-BKo9q3Zd.js';
import './TextField-BQRX5bXK.js';
import './i18n-CxHbQmwN.js';
import './MarkdownField--WkD3prB.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-DzBk-fdF.js';
import './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './Select-ASEmNdiM.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';
import './machine.svelte-CNa8MjEx.js';
import './Checkbox-BWsW28Xu.js';
import './Switch-IjY5G1Ys.js';
import './index5-Brzv1W4u.js';
import './Score-CSpnV2pu.js';
import './ProgressRing-HAZcZKrs.js';
import './index6-Cn6jj1jH.js';
import './HiddenInput-D0PY8sFK.js';
import './RadioGroup-BatokiWT.js';
import './Anchor-vk0sCVou.js';
import './breadcrumbs-BKQh9F1q.js';
import './string-BMZjP7XX.js';
import './schemas-BwimqDbp.js';
import './OrderedEntryList-FoujbQyk.js';
import './zod-BTgf12zS.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="card p-4 bg-white shadow-lg">`;
  ModelForm($$payload, {
    customNameDescription: true,
    form: data.form,
    object: data.object,
    selectOptions: data.selectOptions,
    model: data.model,
    context: "edit"
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BKCvu_uH.js.map
