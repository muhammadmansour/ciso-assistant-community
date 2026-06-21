import { p as push, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import { M as ModelForm } from './ModelForm-CM5r70xn.js';
import { U as UserEditSchema } from './schemas-BwimqDbp.js';
import { sa as settemporarypassword12, sb as settemporarypassword2, s9 as settemporarypassword22 } from './_index-DiaVtc2Z.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './Form-BvVZStO5.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
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
import './runtime-BKo9q3Zd.js';
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
import './OrderedEntryList-FoujbQyk.js';
import './zod-BTgf12zS.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="card bg-white shadow-sm p-4">`;
  ModelForm($$payload, {
    form: data.form,
    schema: UserEditSchema,
    model: data.model
  });
  $$payload.out += `<!----></div> `;
  if (data.object.is_local) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-white shadow-sm p-4 mt-2"><p class="text-gray-500 text-sm">${escape_html(settemporarypassword12())} <a${attr("href", `${stringify(page.url.pathname)}/set-password`)} class="text-primary-700 hover:text-primary-500" data-testid="set-password-btn">${escape_html(settemporarypassword2())}</a>. ${escape_html(settemporarypassword22())}.</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bl-V1hWo.js.map
