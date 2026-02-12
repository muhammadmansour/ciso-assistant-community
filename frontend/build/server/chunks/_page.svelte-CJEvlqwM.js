import { p as push, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelForm } from './ModelForm-DjxM9Aif.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-D2ILrLnm.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-F7m95JiK.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';
import './TextField-DpgyqBxf.js';
import './i18n-WNCV45cf.js';
import './MarkdownField-aHT7_ag4.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-a52dcxCi.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './Select-DI34Ul6H.js';
import './Dropdown-7WWj3QLi.js';
import './index4-B6qGV9uj.js';
import './machine.svelte-CWLOiKlV.js';
import './Checkbox-vxSpLW05.js';
import './Switch-BHyFhQv_.js';
import './index5-C1_XlIn1.js';
import './Score-wlwxdvqS.js';
import './ProgressRing-0SGrBrD4.js';
import './index6-BrJh6zKa.js';
import './HiddenInput-CYg6fs2N.js';
import './RadioGroup-B9fdfrn7.js';
import './Anchor-BbSdvrYd.js';
import './breadcrumbs-CG0qNTv3.js';
import './string-BMZjP7XX.js';
import './schemas-BcDBvyDd.js';
import './OrderedEntryList-vFR8cCfD.js';
import './zod-CkM6Syoc.js';

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
//# sourceMappingURL=_page.svelte-CJEvlqwM.js.map
