import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-B_RoZuiq.js';
import { p as page } from './index3-BwfRm5YV.js';
import { uQ as requestvalidation1 } from './_index-DEXNURl5.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import './breadcrumbs-CG0qNTv3.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-BcDBvyDd.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-CbPSKmze.js';
import './Anchor-BbSdvrYd.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './i18n-WNCV45cf.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './index7-Dk-jItBW.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './Tooltip-DrjF8lR0.js';
import './index5-C1_XlIn1.js';
import './index8-BWS1s5in.js';
import '@floating-ui/dom';
import './ModelTable-2RGnpbgJ.js';
import './Popover-souGUgW5.js';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-DDazzCSM.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './shared-server-BU2DVf8Q.js';
import './Dropdown-7WWj3QLi.js';
import './index4-B6qGV9uj.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  getModalStore();
  const policy = data.data;
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2">`;
      if (page.data?.featureflags?.validation_flows) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit" data-testid="request-validation-button"><i class="fa-solid fa-check-circle mr-2"></i> ${escape_html(requestvalidation1())}</button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }, widgets = function($$payload2) {
      if (page.data?.featureflags?.validation_flows && policy.validation_flows) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        {
          ValidationFlowsSection($$payload2, { validationFlows: policy.validation_flows });
        }
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    };
    DetailView($$payload, {
      data,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-K1PyqJRF.js.map
