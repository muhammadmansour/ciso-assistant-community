import { p as push, a as pop, V as escape_html, W as ensure_array_like, Z as attr_style, X as stringify, S as attr_class } from './index2-9icAqEyj.js';
import { Pm as complianceanalytics1, nj as viewdetailedrecap2, Sw as averageprogress1, Cc as nocompliancedata2, Op as createcomplianceassessment2, Or as createassessment1, Cy as myassignments1, av as home } from './_index-Syqrsmaf.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import { M as ModelTable } from './ModelTable-BpBYEFsc.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { g as goto } from './client2-CItqzqlw.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BKo9q3Zd.js';
import './breadcrumbs-Cdf8pK7r.js';
import './index-CRjgakYW.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './access-control-DaLcieub.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './crud-CFDLlT9z.js';
import './stores-D-WMoATo.js';
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-DhMvl6-W.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './DeleteConfirmModal-DOKttf10.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let group = page.url.searchParams.get("tab") || "home";
  function handleTabChange(tabValue) {
    page.url.searchParams.set("tab", tabValue);
    goto(page.url);
  }
  {
    let list = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Control($$payload2, {
        value: "home",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-house mr-1.5 text-xs"></i> ${escape_html(home())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "my-assignments",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-clipboard-list mr-1.5 text-xs"></i> ${escape_html(myassignments1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    }, content = function($$payload2) {
      $$payload2.out += `<!---->`;
      {
        $$payload2.out += `<div class="px-4 pb-4"><!---->`;
        Tabs.Panel($$payload2, {
          value: "home",
          children: ($$payload3) => {
            $$payload3.out += `<section class="space-y-6"><div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold text-gray-900">${escape_html(complianceanalytics1())}</h2> <a href="/recap" class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors">${escape_html(viewdetailedrecap2())} <i class="fas fa-arrow-right text-xs"></i></a></div> `;
            if (data.complianceAnalytics && Object.keys(data.complianceAnalytics).length > 0) {
              $$payload3.out += "<!--[-->";
              const each_array = ensure_array_like(Object.entries(data.complianceAnalytics));
              $$payload3.out += `<div class="space-y-6"><!--[-->`;
              for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
                let [frameworkName, frameworkData] = each_array[$$index_2];
                const each_array_1 = ensure_array_like(frameworkData.domains);
                $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"><div class="flex justify-between items-center"><div class="flex items-center gap-3"><div class="w-2 h-2 bg-blue-500 rounded-full"></div> <h3 class="text-lg font-semibold text-gray-900">${escape_html(frameworkName)}</h3></div> <div class="flex items-center gap-2"><span class="text-sm text-gray-600">${escape_html(averageprogress1())}:</span> <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm"><div class="w-32 bg-gray-200 rounded-full h-1.5"><div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"${attr_style(`width: ${stringify(frameworkData.framework_average)}%`)}></div></div> <span class="font-semibold text-blue-600 text-sm min-w-[2.5rem]">${escape_html(frameworkData.framework_average)}%</span></div></div></div></div> <div class="p-6 space-y-5"><!--[-->`;
                for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
                  let domain = each_array_1[$$index_1];
                  const each_array_2 = ensure_array_like(domain.assessments);
                  $$payload3.out += `<div class="relative"><div class="flex justify-between items-center mb-3 pb-2 border-b border-gray-100"><div class="flex items-center gap-2"><i class="fas fa-folder text-amber-500 text-sm"></i> <h4 class="font-medium text-gray-800">${escape_html(domain.domain)}</h4></div> <div class="flex items-center gap-2"><span class="text-xs text-gray-500">${escape_html(averageprogress1())}:</span> <div class="flex items-center gap-2"><div class="w-8 bg-gray-200 rounded-full h-1"><div class="bg-gradient-to-r from-amber-400 to-orange-500 h-1 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(domain.domain_average)}%`)}></div></div> <span class="font-medium text-amber-600 text-xs">${escape_html(domain.domain_average)}%</span></div></div></div> <div class="grid gap-3"><!--[-->`;
                  for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
                    let assessment = each_array_2[$$index];
                    $$payload3.out += `<div class="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200"><div class="flex justify-between items-start gap-4"><div class="flex-1 min-w-0"><div class="font-medium text-gray-900 mb-1 truncate">${escape_html(assessment.assessment_name)}</div> <div class="flex items-center gap-3 text-xs text-gray-500"><div class="flex items-center gap-1"><i class="fas fa-cubes text-gray-400"></i> <span>${escape_html(assessment.perimeter)}</span></div> <div class="flex items-center gap-1"><div${attr_class(`w-2 h-2 rounded-full ${stringify(assessment.status === "done" ? "bg-green-400" : assessment.status === "in_progress" ? "bg-blue-400" : assessment.status === "in_review" ? "bg-yellow-400" : "bg-gray-400")}`)}></div> <span class="capitalize">${escape_html(assessment.status?.replace("_", " ") || "No status")}</span></div></div></div> <div class="flex items-center gap-3"><div class="flex items-center gap-2"><div class="w-20 bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-500 ${stringify(assessment.progress >= 80 ? "bg-gradient-to-r from-green-400 to-emerald-500" : assessment.progress >= 50 ? "bg-gradient-to-r from-blue-400 to-cyan-500" : assessment.progress >= 25 ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-pink-500")}`)}${attr_style(`width: ${stringify(assessment.progress)}%`)}></div></div> <span${attr_class(`font-semibold text-sm min-w-[3rem] text-right ${stringify(assessment.progress >= 80 ? "text-green-600" : assessment.progress >= 50 ? "text-blue-600" : assessment.progress >= 25 ? "text-orange-600" : "text-red-600")}`)}>${escape_html(assessment.progress)}%</span></div></div></div></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<div class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300"><div class="text-gray-400 mb-4"><i class="fas fa-chart-bar text-6xl"></i></div> <div class="text-gray-600"><p class="text-xl font-semibold mb-2">${escape_html(nocompliancedata2())}</p> <p class="text-sm text-gray-500">${escape_html(createcomplianceassessment2())}</p></div> <a href="/compliance-assessments" class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors"><i class="fas fa-plus text-sm"></i> ${escape_html(createassessment1())}</a></div>`;
            }
            $$payload3.out += `<!--]--></section>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "my-assignments",
          children: ($$payload3) => {
            $$payload3.out += `<div class="space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4">`;
            Anchor($$payload3, {
              href: "/compliance-assessments",
              breadcrumbAction: "push",
              class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
              children: ($$payload4) => {
                $$payload4.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-file-lines text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">View Assessments</p> <p class="text-xs text-gray-500">Browse all compliance assessments</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Anchor($$payload3, {
              href: "/evidences",
              breadcrumbAction: "push",
              class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
              children: ($$payload4) => {
                $$payload4.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-cloud-arrow-up text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">Manage Evidence</p> <p class="text-xs text-gray-500">View uploaded documents</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Anchor($$payload3, {
              href: "/applied-controls",
              breadcrumbAction: "push",
              class: "unstyled flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer",
              children: ($$payload4) => {
                $$payload4.out += `<div class="w-10 h-10 rounded-lg bg-[#0A1628]/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-shield-halved text-[#0A1628] text-lg"></i></div> <div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 text-sm">Controls</p> <p class="text-xs text-gray-500">See all controls</p></div> <i class="fa-solid fa-arrow-right text-gray-300 group-hover:text-gray-500 transition-colors"></i>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="mb-4"><h2 class="text-xl font-bold text-gray-900">${escape_html(myassignments1())}</h2> <p class="text-sm text-gray-500">Complete these tasks by uploading the required evidence</p></div> `;
            ModelTable($$payload3, {
              URLModel: "applied-controls",
              baseEndpoint: `/applied-controls/?owner=${data.user.actor_id}`,
              hideFilters: true
            });
            $$payload3.out += `<!----></div></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!---->`;
    };
    Tabs($$payload, {
      value: group,
      onValueChange: (e) => handleTabChange(e.value),
      list,
      content,
      $$slots: { list: true, content: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CwRA9Xjx.js.map
