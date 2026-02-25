import { p as push, a as pop } from './index2-9icAqEyj.js';
import { M as ModelForm } from './ModelForm-BGzMREIU.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './Form-D44apvvs.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-BNamVw9A.js';
import './runtime-B_ICGJZJ.js';
import './TextField--8TVvuvT.js';
import './i18n-CnZlshhm.js';
import './MarkdownField-CYxeg9XD.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-BiYAuEEm.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './Select-6Wp9bM99.js';
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
import './Anchor-CCjZl5ir.js';
import './breadcrumbs-DdEobqL1.js';
import './string-BMZjP7XX.js';
import './schemas-Cmsh2Wi5.js';
import './OrderedEntryList-D4nxTp-O.js';
import './zod-BTgf12zS.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="card p-4 bg-white shadow-lg">`;
  ModelForm($$payload, {
    form: data.form,
    object: data.object,
    selectOptions: data.selectOptions,
    foreignKeys: data.foreignKeys,
    model: data.model,
    context: "edit"
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-t4Y2466G.js.map
