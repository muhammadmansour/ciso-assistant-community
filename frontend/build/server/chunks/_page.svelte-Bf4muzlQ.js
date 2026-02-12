import { p as push, W as ensure_array_like, V as escape_html, T as attr, X as stringify, Z as attr_style, a as pop } from './index2-9icAqEyj.js';
import { D as DonutChart } from './DonutChart-uwOXyN8e.js';
import { GW as globaloverall1, fB as name, dp as framework, Ih as exportbutton1, df as complianceassessments1, e as edit } from './_index-DEXNURl5.js';
import { p as page } from './index3-BwfRm5YV.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-0SGrBrD4.js';
import { f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { U as URL_MODEL_MAP } from './crud-a52dcxCi.js';
import './i18n-WNCV45cf.js';
import './runtime-BMNt81Gy.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './index6-BrJh6zKa.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './breadcrumbs-CG0qNTv3.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
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
  const each_array = ensure_array_like(data.perimeters);
  $$payload.out += `<div class="space-y-6"><div class="grid grid-cols-4 gap-4"><div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><i class="fa-regular fa-clock text-gray-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Not Started</span> <span class="wgrc-stat-number text-gray-700">0</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><i class="fa-solid fa-circle-info text-blue-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">In Progress</span> <span class="wgrc-stat-number text-blue-600">${escape_html(totalAssessments)}</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><i class="fa-solid fa-circle-check text-green-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Completed</span> <span class="wgrc-stat-number text-green-600">0</span></div> <div class="wgrc-stat-card"><div class="flex items-center gap-2 mb-2"><div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><i class="fa-solid fa-circle-xmark text-red-500 text-sm"></i></div></div> <span class="text-xs text-gray-500 font-medium">Needs Review</span> <span class="wgrc-stat-number text-red-500">0</span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="wgrc-card"><h3 class="text-lg font-bold text-gray-900 mb-6">Overall Progress</h3> <div class="flex items-center gap-8"><div class="relative">`;
  ProgressRing($$payload, {
    strokeWidth: "12px",
    meterStroke: "stroke-green-200",
    value: 0,
    size: "size-32",
    children: ($$payload2) => {
      $$payload2.out += `<p class="font-bold text-2xl text-gray-700">0%</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="space-y-3"><div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Total Controls</span> <span class="font-semibold text-gray-900">${escape_html(totalAssessments)}</span></div> <div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Completed</span> <span class="font-semibold text-green-600">0</span></div> <div class="flex items-center justify-between gap-8"><span class="text-sm text-gray-500">Remaining</span> <span class="font-semibold text-gray-900">${escape_html(totalAssessments)}</span></div></div></div></div> <div class="wgrc-card"><h3 class="text-lg font-bold text-gray-900 mb-6">Evidence Status</h3> <div class="space-y-4"><div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><span class="text-sm text-gray-600">Total Evidences</span> <span class="font-bold text-gray-900 text-lg">0</span></div> <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100"><span class="text-sm text-yellow-700">Pending Review</span> <span class="font-bold text-yellow-700 text-lg">0</span></div> <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"><span class="text-sm text-green-700">Approved</span> <span class="font-bold text-green-700 text-lg">0</span></div></div></div></div> <div class="space-y-6"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
    let perimeter = each_array[$$index_2];
    if (perimeter.compliance_assessments.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_2 = ensure_array_like(perimeter.compliance_assessments);
      $$payload.out += `<div class="wgrc-card overflow-hidden !p-0"><div class="p-4 bg-gradient-to-r from-[#0A1628] to-[#2a3a5c] text-white flex justify-between items-center"><a class="text-lg font-bold hover:underline text-white"${attr("href", `/perimeters/${stringify(perimeter.id)}`)}>${escape_html(perimeter.folder.str)}/${escape_html(perimeter.name)}</a></div> `;
      if (perimeter.overallCompliance?.values?.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(perimeter.overallCompliance.values.sort((a, b) => REQUIREMENT_ASSESSMENT_STATUS.indexOf(a.name) - REQUIREMENT_ASSESSMENT_STATUS.indexOf(b.name)));
        $$payload.out += `<div class="px-4 py-3 bg-blue-50"><p class="text-sm font-semibold text-blue-700 mb-2">${escape_html(globaloverall1())}</p> <div class="flex h-4 rounded-full overflow-hidden shadow-inner bg-gray-200"><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let sp = each_array_1[$$index];
          $$payload.out += `<div class="flex justify-center items-center text-xs font-semibold"${attr_style(` width: ${stringify(sp.percentage)}%; background-color: ${stringify(sp.itemStyle.color)}; color: ${stringify(sp.itemStyle.color === "#000000" ? "white" : "black")}; `)}>${escape_html(Number(sp.percentage) > 5 ? `${sp.percentage}%` : "")}</div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="p-4 space-y-4"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let assessment = each_array_2[$$index_1];
        $$payload.out += `<div class="bg-gray-50 rounded-xl p-4 border border-gray-100 transition hover:border-blue-200 hover:shadow-sm"><div class="flex justify-between items-center mb-4"><div><p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">${escape_html(name())}</p> <a class="text-blue-600 hover:underline text-lg font-bold"${attr("href", `/compliance-assessments/${stringify(assessment.id)}`)}>${escape_html(assessment.name)}</a></div> <div class="text-right"><p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">${escape_html(framework())}</p> <p class="text-sm text-gray-700">${escape_html(assessment.framework.str)}</p></div></div> <div class="flex flex-col lg:flex-row items-center justify-between gap-4">`;
        if (assessment.globalScore.score >= 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex justify-center items-center lg:order-1">`;
          ProgressRing($$payload, {
            strokeWidth: "12px",
            meterStroke: displayScoreColor(assessment.globalScore.score, assessment.globalScore.max_score),
            value: formatScoreValue(assessment.globalScore.score, assessment.globalScore.max_score),
            size: "size-24",
            children: ($$payload2) => {
              $$payload2.out += `<p class="font-bold text-2xl">${escape_html(assessment.globalScore.score)}</p>`;
            },
            $$slots: { default: true }
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="w-full lg:w-3/5 h-40 lg:h-32">`;
        DonutChart($$payload, {
          s_label: complianceassessments1(),
          name: assessment.name + "_donut",
          values: assessment.donut.result.values
        });
        $$payload.out += `<!----></div> <div class="flex flex-row lg:flex-col gap-2 lg:order-3">`;
        if (canEditObject(perimeter)) {
          $$payload.out += "<!--[-->";
          Anchor($$payload, {
            href: `/compliance-assessments/${stringify(assessment.id)}/edit?next=/recap`,
            class: "btn bg-[#0A1628] text-white hover:bg-[#1a2740] rounded-lg text-sm px-4 py-2",
            children: ($$payload2) => {
              $$payload2.out += `<i class="fa-solid fa-edit mr-2"></i> ${escape_html(edit())}`;
            },
            $$slots: { default: true }
          });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <a${attr("href", `/compliance-assessments/${stringify(assessment.id)}/export`)} class="btn bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm px-4 py-2"><i class="fa-solid fa-download mr-2"></i> ${escape_html(exportbutton1())}</a></div></div></div>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bf4muzlQ.js.map
