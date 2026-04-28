import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-8qOpHxsw.js';
import { Eh as lockedassessment1, Eg as lockedassessmentmessage2, vD as recoveryinsights1, Gj as impactovertime2, vf as report, v4 as requestvalidation1 } from './_index-CqZWReca.js';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
import { p as page } from './index3-BwfRm5YV.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { A as ActivityTracker } from './ActivityTracker-B6p8G7mf.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import './crud-Dl9mduNa.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './runtime-BKo9q3Zd.js';
import './constants-lv6aycRl.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-5y-ookeO.js';
import './breadcrumbs-D1ratxIQ.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-CD-0VXMw.js';
import './Form-BuUIlHHA.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './i18n-DuIONS9Q.js';
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
import './ModelTable-D9-j7Xao.js';
import './Popover-PelKNyF8.js';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-C22czeYM.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './shared-server-BU2DVf8Q.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  getModalStore();
  const business_impact_analysis = data.data;
  if (business_impact_analysis.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mx-4 mt-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedassessmentmessage2())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2">`;
      Anchor($$payload2, {
        href: `${page.url.pathname}/visual`,
        class: "btn preset-filled-primary-500 h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-stopwatch mr-2"></i>${escape_html(impactovertime2())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Anchor($$payload2, {
        href: `${page.url.pathname}/report`,
        class: "btn preset-filled-primary-500 h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-file-lines mr-2"></i>${escape_html(report())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      if (!business_impact_analysis?.is_locked && page.data?.featureflags?.validation_flows) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit" data-testid="request-validation-button"><i class="fa-solid fa-check-circle mr-2"></i> ${escape_html(requestvalidation1())}</button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }, widgets = function($$payload2) {
      $$payload2.out += `<!---->`;
      {
        $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-gray-50 shadow-xs grow"><div class="font-bold text-xl mb-4">${escape_html(recoveryinsights1())}</div> <div class="flex items-center justify-center">`;
        ActivityTracker($$payload2, { metrics: data.metrics });
        $$payload2.out += `<!----></div></div> `;
        if (page.data?.featureflags?.validation_flows) {
          $$payload2.out += "<!--[-->";
          ValidationFlowsSection($$payload2, {
            validationFlows: business_impact_analysis.validation_flows
          });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!---->`;
    };
    DetailView($$payload, {
      data,
      disableCreate: business_impact_analysis.is_locked,
      disableEdit: business_impact_analysis.is_locked,
      disableDelete: business_impact_analysis.is_locked,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-RKNoEqGj.js.map
