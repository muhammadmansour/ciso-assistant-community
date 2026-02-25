import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-Bt-6QslO.js';
import { p as page } from './index3-BwfRm5YV.js';
import { vf as requestvalidation1 } from './_index-BNamVw9A.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import './crud-BiYAuEEm.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './runtime-B_ICGJZJ.js';
import './constants-B8vm30bZ.js';
import './breadcrumbs-DdEobqL1.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-Cmsh2Wi5.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-uTkrwyO8.js';
import './Anchor-CCjZl5ir.js';
import './Form-D44apvvs.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './i18n-CnZlshhm.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './ModelTable-D1sEvsmt.js';
import './Popover-PelKNyF8.js';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-D06m6CiP.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './shared-server-BU2DVf8Q.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';

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
//# sourceMappingURL=_page.svelte-C5r4Z42z.js.map
