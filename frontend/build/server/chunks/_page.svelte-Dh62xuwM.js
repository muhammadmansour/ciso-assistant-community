import { p as push, V as escape_html, a as pop, T as attr, X as stringify } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-C9gOGqEv.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import { Eh as lockedassessment1, Eg as lockedassessmentmessage2, qD as summary, Hq as followupunresolvedhigh3, ds as severity, cV as progress, Yk as actionplan1, v4 as requestvalidation1, cr as findingsassessment1, UW as asxlsx4, UZ as asmarkdown1, UY as aspdf3, Ip as exportbutton1 } from './_index-B12BAPce.js';
import { H as HalfDonutChart } from './HalfDonutChart-trXcwoRo.js';
import { D as DonutChart } from './DonutChart-CZGYcz9C.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import './crud-T40TopyM.js';
import './runtime-BKo9q3Zd.js';
import './constants-QzmVibOJ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-DWhEPmW4.js';
import './breadcrumbs-B1Us7xd5.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-BAcdPP8q.js';
import './Form-CU-l-bUF.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './i18n-D3bRixKV.js';
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
import './ModelTable-CBxNmYiP.js';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-DmAIPnRV.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './shared-server-BU2DVf8Q.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let exportPopupOpen = false;
  getModalStore();
  const findings_assessment = data.data;
  if (data.data?.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mx-4 mt-4 mb-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedassessmentmessage2())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2">`;
      {
        let trigger = function($$payload3) {
          $$payload3.out += `<span data-testid="export-button"><i class="fa-solid fa-download mr-2"></i>${escape_html(exportbutton1())}</span>`;
        }, content = function($$payload3) {
          $$payload3.out += `<div><p class="block px-4 py-2 text-sm text-gray-800">${escape_html(findingsassessment1())}</p> <a${attr("href", `/findings-assessments/${stringify(data.data.id)}/export/xlsx`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(asxlsx4())}</a> <a${attr("href", `/findings-assessments/${stringify(data.data.id)}/export/md`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(asmarkdown1())}</a> <a${attr("href", `/findings-assessments/${stringify(data.data.id)}/export/pdf`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(aspdf3())}</a></div>`;
        };
        Popover($$payload2, {
          open: exportPopupOpen,
          onOpenChange: (e) => exportPopupOpen = e.open,
          positioning: { placement: "bottom" },
          triggerBase: "btn preset-filled-primary-500 w-full",
          contentBase: "card whitespace-nowrap bg-white py-2 w-fit shadow-lg space-y-1",
          zIndex: "1000",
          trigger,
          content,
          $$slots: { trigger: true, content: true }
        });
      }
      $$payload2.out += `<!----> `;
      Anchor($$payload2, {
        href: `${page.url.pathname}/action-plan`,
        class: "btn preset-filled-primary-500 h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-heart-pulse mr-2"></i>${escape_html(actionplan1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      if (!findings_assessment?.is_locked && page.data?.featureflags?.validation_flows) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit" data-testid="request-validation-button"><i class="fa-solid fa-check-circle mr-2"></i> ${escape_html(requestvalidation1())}</button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }, widgets = function($$payload2) {
      $$payload2.out += `<!---->`;
      {
        $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-gray-50 shadow-xs"><h3 class="text-lg font-semibold mb-2">${escape_html(summary())}</h3> <div class="grid grid-cols-2 gap-2"><div class="rounded-lg bg-primary-100 p-3 text-center"><p class="text-xs font-medium text-primary-800">Total</p> <p class="text-xl font-bold text-primary-900" data-testid="summary-total">${escape_html(data.findings_metrics.raw_metrics.total_count || "N/A")}</p></div> <div class="rounded-lg bg-primary-100 p-3 text-center"><p class="text-xs font-medium text-primary-800">${escape_html(followupunresolvedhigh3())}</p> <p class="text-xl font-bold text-primary-900" data-testid="summary-unresolved-hoc">${escape_html(data.findings_metrics.raw_metrics.unresolved_important_count || "N/A")}</p></div></div></div> <div class="card p-2 bg-gray-50 shadow-xs flex-1 flex flex-row gap-2"><!---->`;
        {
          $$payload2.out += `<div class="flex-1 min-h-0 min-w-0">`;
          HalfDonutChart($$payload2, {
            name: "current_h",
            title: severity(),
            classesContainer: "card p-2 bg-white h-full",
            values: data.findings_metrics.severity_chart_data,
            colors: data.findings_metrics.severity_chart_data.map((object) => object.color)
          });
          $$payload2.out += `<!----></div> <div class="flex-1 min-h-0 min-w-0">`;
          DonutChart($$payload2, {
            classesContainer: "card p-2 bg-white h-full",
            name: "f_treatment_progress",
            title: progress(),
            values: data.findings_metrics.status_chart_data.values
          });
          $$payload2.out += `<!----></div>`;
        }
        $$payload2.out += `<!----></div> `;
        if (page.data?.featureflags?.validation_flows) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          {
            ValidationFlowsSection($$payload2, {
              validationFlows: findings_assessment.validation_flows
            });
          }
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!---->`;
    };
    DetailView($$payload, {
      data,
      disableCreate: data.data?.is_locked,
      disableDelete: data.data?.is_locked,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dh62xuwM.js.map
