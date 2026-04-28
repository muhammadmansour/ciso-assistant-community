import { p as push, a as pop } from './index2-9icAqEyj.js';
import { M as ModelForm } from './ModelForm-Ci7ofigK.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './Form-BDbIHs7i.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-D7NdhnXA.js';
import './runtime-BKo9q3Zd.js';
import './TextField-BVNBwpE8.js';
import './i18n-CMphL55V.js';
import './MarkdownField-BtAWDjt8.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-CUvW5I-u.js';
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './Select-5PRB9c-j.js';
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
import './Anchor-u--4IyDz.js';
import './breadcrumbs-BA0IMSh1.js';
import './string-BMZjP7XX.js';
import './schemas-DwUKC0vK.js';
import './OrderedEntryList-CrLSQJHa.js';
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
//# sourceMappingURL=_page.svelte-DRSGSMYy.js.map
