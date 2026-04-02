import { p as push, a as pop, W as ensure_array_like, V as escape_html, T as attr, X as stringify, Z as attr_style } from './index2-9icAqEyj.js';
import { D as DonutChart } from './DonutChart-CZGYcz9C.js';
import { H3 as globaloverall1, fM as name, dK as framework, dB as complianceassessments1, e as edit, Ip as exportbutton1, Cy as myassignments1 } from './_index-B12BAPce.js';
import { p as page } from './index3-BwfRm5YV.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { M as ModelTable } from './ModelTable-CBxNmYiP.js';
import { g as goto } from './client2-CItqzqlw.js';
import { U as URL_MODEL_MAP } from './crud-T40TopyM.js';
import './i18n-D3bRixKV.js';
import './runtime-BKo9q3Zd.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './index6-Cn6jj1jH.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './breadcrumbs-B1Us7xd5.js';
import './index-CRjgakYW.js';
import './Popover-PelKNyF8.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './Form-CU-l-bUF.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './stores-D-WMoATo.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DmAIPnRV.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  const REQUIREMENT_ASSESSMENT_STATUS = [
    "compliant",
    "partially_compliant",
    "in_progress",
    "non_compliant",
    "not_applicable",
    "to_do"
  ];
  const user = page.data.user;
  let { data } = $$props;
  const model = URL_MODEL_MAP["perimeters"];
  const canEditObject = (perimeter) => canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: perimeter.folder?.id
  });
  const totalAssessments = data.perimeters.reduce((sum, p) => sum + p.compliance_assessments.length, 0);
  let group = page.url.searchParams.get("tab") || "summary";
  function handleTabChange(tabValue) {
    const url = new URL(page.url);
    url.searchParams.set("tab", tabValue);
    goto(url.toString());
  }
  {
    let list = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Control($$payload2, {
        value: "summary",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-chart-pie mr-1.5 text-xs"></i> Summary`;
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
          value: "summary",
          children: ($$payload3) => {
            const each_array = ensure_array_like(data.perimeters);
            $$payload3.out += `<div class="space-y-6"><div class="grid grid-cols-4 gap-4"><div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><i class="fa-regular fa-clock text-gray-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Not Started</span> <span class="wgrc-stat-number text-gray-700">0</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><i class="fa-solid fa-circle-info text-blue-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">In Progress</span> <span class="wgrc-stat-number text-blue-600">${escape_html(totalAssessments)}</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><i class="fa-solid fa-circle-check text-green-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Completed</span> <span class="wgrc-stat-number text-green-600">0</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><i class="fa-solid fa-circle-xmark text-red-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Needs Review</span> <span class="wgrc-stat-number text-red-500">0</span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="wgrc-card"><h3 class="text-lg font-bold text-gray-900 mb-6">Overall Progress</h3> <div class="flex items-center gap-8"><div class="relative">`;
            ProgressRing($$payload3, {
              strokeWidth: "12px",
              meterStroke: "stroke-green-200",
              value: 0,
              size: "size-32",
              children: ($$payload4) => {
                $$payload4.out += `<p class="font-bold text-2xl text-gray-700">0%</p>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></div> <div class="space-y-3"><div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Total Controls</span> <span class="font-semibold text-gray-900">${escape_html(totalAssessments)}</span></div> <div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Completed</span> <span class="font-semibold text-green-600">0</span></div> <div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Remaining</span> <span class="font-semibold text-gray-900">${escape_html(totalAssessments)}</span></div></div></div></div> <div class="wgrc-card"><h3 class="text-lg font-bold text-gray-900 mb-6">Evidence Status</h3> <div class="space-y-4"><div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><span class="text-sm text-gray-600">Total Evidences</span> <span class="font-bold text-gray-900 text-lg">0</span></div> <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100"><span class="text-sm text-yellow-700">Pending Review</span> <span class="font-bold text-yellow-700 text-lg">0</span></div> <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"><span class="text-sm text-green-700">Approved</span> <span class="font-bold text-green-700 text-lg">0</span></div></div></div></div> <div class="space-y-6"><!--[-->`;
            for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
              let perimeter = each_array[$$index_2];
              if (perimeter.compliance_assessments.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_2 = ensure_array_like(perimeter.compliance_assessments);
                $$payload3.out += `<div class="wgrc-card overflow-hidden !p-0"><div class="p-4 bg-gradient-to-r from-[#0A1628] to-[#2a3a5c] text-white flex justify-between items-center"><a class="text-lg font-bold hover:underline text-white"${attr("href", `/perimeters/${stringify(perimeter.id)}`)}>${escape_html(perimeter.folder.str)}/${escape_html(perimeter.name)}</a></div> `;
                if (perimeter.overallCompliance?.values?.length > 0) {
                  $$payload3.out += "<!--[-->";
                  const each_array_1 = ensure_array_like(perimeter.overallCompliance.values.sort((a, b) => REQUIREMENT_ASSESSMENT_STATUS.indexOf(a.name) - REQUIREMENT_ASSESSMENT_STATUS.indexOf(b.name)));
                  $$payload3.out += `<div class="px-4 py-3 bg-blue-50"><p class="text-sm font-semibold text-blue-700 mb-2">${escape_html(globaloverall1())}</p> <div class="flex h-4 rounded-full overflow-hidden shadow-inner bg-gray-200"><!--[-->`;
                  for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                    let sp = each_array_1[$$index];
                    $$payload3.out += `<div class="flex justify-center items-center text-xs font-semibold"${attr_style(` width: ${stringify(sp.percentage)}%; background-color: ${stringify(sp.itemStyle.color)}; color: ${stringify(sp.itemStyle.color === "#000000" ? "white" : "black")}; `)}>${escape_html(Number(sp.percentage) > 5 ? `${sp.percentage}%` : "")}</div>`;
                  }
                  $$payload3.out += `<!--]--></div></div>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--> <div class="p-4 space-y-4"><!--[-->`;
                for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
                  let assessment = each_array_2[$$index_1];
                  $$payload3.out += `<div class="bg-gray-50 rounded-xl p-4 border border-gray-100 transition hover:border-blue-200 hover:shadow-sm"><div class="flex justify-between items-center mb-4"><div><p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">${escape_html(name())}</p> <a class="text-blue-600 hover:underline text-lg font-bold"${attr("href", `/compliance-assessments/${stringify(assessment.id)}`)}>${escape_html(assessment.name)}</a></div> <div class="text-right"><p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">${escape_html(framework())}</p> <p class="text-sm text-gray-700">${escape_html(assessment.framework.str)}</p></div></div> <div class="flex flex-col lg:flex-row items-center justify-between gap-4">`;
                  if (assessment.globalScore.score >= 0) {
                    $$payload3.out += "<!--[-->";
                    $$payload3.out += `<div class="flex justify-center items-center lg:order-1">`;
                    ProgressRing($$payload3, {
                      strokeWidth: "12px",
                      meterStroke: displayScoreColor(assessment.globalScore.score, assessment.globalScore.max_score),
                      value: formatScoreValue(assessment.globalScore.score, assessment.globalScore.max_score),
                      size: "size-24",
                      children: ($$payload4) => {
                        $$payload4.out += `<p class="font-bold text-2xl">${escape_html(assessment.globalScore.score)}</p>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload3.out += `<!----></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> <div class="w-full lg:w-3/5 h-40 lg:h-32">`;
                  DonutChart($$payload3, {
                    s_label: complianceassessments1(),
                    name: assessment.name + "_donut",
                    values: assessment.donut.result.values
                  });
                  $$payload3.out += `<!----></div> <div class="flex flex-row lg:flex-col gap-2 lg:order-3">`;
                  if (canEditObject(perimeter)) {
                    $$payload3.out += "<!--[-->";
                    Anchor($$payload3, {
                      href: `/compliance-assessments/${stringify(assessment.id)}/edit?next=/recap`,
                      class: "btn bg-[#0A1628] text-white hover:bg-[#1a2740] rounded-lg text-sm px-4 py-2",
                      children: ($$payload4) => {
                        $$payload4.out += `<i class="fa-solid fa-edit mr-2"></i> ${escape_html(edit())}`;
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> <a${attr("href", `/compliance-assessments/${stringify(assessment.id)}/export`)} class="btn bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm px-4 py-2"><i class="fa-solid fa-download mr-2"></i> ${escape_html(exportbutton1())}</a></div></div></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            }
            $$payload3.out += `<!--]--></div></div>`;
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
//# sourceMappingURL=_page.svelte-vl-rPgDb.js.map
