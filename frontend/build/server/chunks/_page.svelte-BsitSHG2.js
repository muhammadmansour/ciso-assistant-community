import { p as push, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelForm } from './ModelForm-BstMjApL.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './Form-BuUIlHHA.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './TextField-6ZKq0gis.js';
import './i18n-DuIONS9Q.js';
import './MarkdownField-JZPZO4SX.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-7XzjN-Wp.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './Select-Dvtp0860.js';
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
import './Anchor-C2rLUn2N.js';
import './breadcrumbs-D1ratxIQ.js';
import './string-BMZjP7XX.js';
import './schemas-5y-ookeO.js';
import './OrderedEntryList-eO6e_-E9.js';
import './zod-BTgf12zS.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<!---->`;
  {
    ModelForm($$payload, {
      form: data.form,
      action: `?/updateStakeholder&next=${stringify(page.url.searchParams.get("next"))}`,
      object: data.object,
      selectOptions: data.selectOptions,
      model: data.model,
      context: "edit"
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BsitSHG2.js.map
