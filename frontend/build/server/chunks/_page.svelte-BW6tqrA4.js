import { p as push, W as ensure_array_like, V as escape_html, X as stringify, Z as attr_style, a as pop } from './index2-9icAqEyj.js';
import './client-DqP3yP6V.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { Pl as complianceassessmentcomparison2, dK as framework, Sk as baseaudit1, Pq as comparisonaudit1, st as scoresandmetrics2, gf as maturity, uU as requirementdifferences1, v1 as requirement, uN as requirements, l4 as withdifferences1, e9 as result, sy as score, So as backtobaseaudit3, nQ as view, b_ as compliance, cV as progress, cA as status } from './_index-D7NdhnXA.js';
import { D as DonutChart } from './DonutChart-LcZloe69.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './breadcrumbs-BA0IMSh1.js';
import './index6-Cn6jj1jH.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const fieldsToCompare = [
    { key: "name", label: "Name" },
    { key: "version", label: "Version" },
    { key: "perimeter", label: "Perimeter" },
    { key: "status", label: "Status" },
    {
      key: "selected_implementation_groups",
      label: "Implementation Groups"
    },
    {
      key: "created_at",
      label: "Created At",
      format: "date"
    },
    {
      key: "updated_at",
      label: "Last Update",
      format: "date"
    },
    {
      key: "observation",
      label: "Observation",
      format: "markdown"
    }
  ];
  function getFieldValue(audit, field) {
    const value = audit[field.key];
    if (!value) return "--";
    if (field.format === "date") {
      return formatDateOrDateTime(value, getLocale());
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return "--";
      return value.map((v) => v.str ? v.str : v).join(", ");
    }
    if (value.str) return value.str;
    return safeTranslate(value);
  }
  const each_array = ensure_array_like(fieldsToCompare);
  const each_array_1 = ensure_array_like(fieldsToCompare);
  $$payload.out += `<div class="flex flex-col space-y-4"><div class="card p-4 bg-white shadow-lg"><div class="flex items-center justify-between mb-4"><div class="flex flex-col"><div class="h4 font-bold"><i class="fa-solid fa-code-compare mr-2"></i> ${escape_html(complianceassessmentcomparison2())}</div> <div class="text-sm text-gray-600 mt-1"><span class="font-medium">${escape_html(framework())}:</span> ${escape_html(data.framework.str)}</div></div> `;
  Anchor($$payload, {
    href: `/compliance-assessments/${stringify(data.baseAudit.id)}`,
    class: "btn preset-filled-primary-500",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left mr-2"></i> ${escape_html(backtobaseaudit3())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div class="card bg-white shadow-lg"><div class="grid grid-cols-2 divide-x divide-gray-200"><div class="p-6 space-y-4"><div class="flex items-center justify-between mb-4"><h2 class="h4 font-bold text-primary-500">${escape_html(baseaudit1())}</h2> `;
  Anchor($$payload, {
    href: `/compliance-assessments/${stringify(data.baseAudit.id)}`,
    class: "btn btn-sm preset-filled-secondary-500",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-external-link-alt mr-2"></i> ${escape_html(view())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let field = each_array[$$index];
    $$payload.out += `<div class="flex flex-col"><div class="text-sm font-medium text-gray-600">${escape_html(safeTranslate(field.key))}</div> `;
    if (field.format === "markdown") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-base text-gray-900">`;
      if (data.baseAudit[field.key]) {
        $$payload.out += "<!--[-->";
        MarkdownRenderer($$payload, { content: data.baseAudit[field.key] });
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `--`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-base font-semibold text-gray-900">${escape_html(getFieldValue(data.baseAudit, field))}</div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="p-6 space-y-4"><div class="flex items-center justify-between mb-4"><h2 class="h4 font-bold text-secondary-500">${escape_html(comparisonaudit1())}</h2> `;
  Anchor($$payload, {
    href: `/compliance-assessments/${stringify(data.compareAudit.id)}`,
    class: "btn btn-sm preset-filled-secondary-500",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-external-link-alt mr-2"></i> ${escape_html(view())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let field = each_array_1[$$index_1];
    $$payload.out += `<div class="flex flex-col"><div class="text-sm font-medium text-gray-600">${escape_html(safeTranslate(field.key))}</div> `;
    if (field.format === "markdown") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-base text-gray-900">`;
      if (data.compareAudit[field.key]) {
        $$payload.out += "<!--[-->";
        MarkdownRenderer($$payload, { content: data.compareAudit[field.key] });
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `--`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-base font-semibold text-gray-900">${escape_html(getFieldValue(data.compareAudit, field))}</div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div></div> <div class="card bg-white shadow-lg"><div class="px-6 py-4 border-b border-gray-200"><h2 class="h4 font-bold"><i class="fa-solid fa-chart-line mr-2"></i> ${escape_html(scoresandmetrics2())}</h2></div> <div class="grid grid-cols-2 divide-x divide-gray-200"><div class="p-6"><div class="flex flex-col items-center space-y-4"><div class="flex flex-col items-center h-48">`;
  if (data.baseAudit.global_score >= 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-sm font-medium text-gray-600 mb-2">${escape_html(maturity())}</span> `;
    ProgressRing($$payload, {
      strokeWidth: "20px",
      meterStroke: displayScoreColor(data.baseAudit.global_score, data.baseAudit.max_score),
      value: data.baseAudit.global_score * 100 / data.baseAudit.max_score,
      size: "size-40",
      children: ($$payload2) => {
        $$payload2.out += `<p class="font-semibold text-3xl">${escape_html(data.baseAudit.global_score)}</p>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="text-sm font-medium text-gray-400 mb-2">${escape_html(maturity())}</span> <div class="flex items-center justify-center size-40"><p class="text-gray-400 text-sm text-center">--</p></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="w-full flex flex-col gap-4 mt-4"><div class="w-full h-64">`;
  DonutChart($$payload, {
    s_label: result(),
    name: "base_compliance_result",
    title: compliance(),
    orientation: "horizontal",
    height: "h-full",
    values: data.baseAudit.donut_data.result.values,
    colors: data.baseAudit.donut_data.result.values.map((object) => object.itemStyle.color)
  });
  $$payload.out += `<!----></div> <div class="w-full h-64">`;
  DonutChart($$payload, {
    s_label: status(),
    name: "base_compliance_status",
    title: progress(),
    orientation: "horizontal",
    height: "h-full",
    values: data.baseAudit.donut_data.status.values,
    colors: data.baseAudit.donut_data.status.values.map((object) => object.itemStyle.color)
  });
  $$payload.out += `<!----></div></div></div></div> <div class="p-6"><div class="flex flex-col items-center space-y-4"><div class="flex flex-col items-center h-48">`;
  if (data.compareAudit.global_score >= 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-sm font-medium text-gray-600 mb-2">${escape_html(maturity())}</span> `;
    ProgressRing($$payload, {
      strokeWidth: "20px",
      meterStroke: displayScoreColor(data.compareAudit.global_score, data.compareAudit.max_score),
      value: data.compareAudit.global_score * 100 / data.compareAudit.max_score,
      size: "size-40",
      children: ($$payload2) => {
        $$payload2.out += `<p class="font-semibold text-3xl">${escape_html(data.compareAudit.global_score)}</p>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="text-sm font-medium text-gray-400 mb-2">${escape_html(maturity())}</span> <div class="flex items-center justify-center size-40"><p class="text-gray-400 text-sm text-center">--</p></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="w-full flex flex-col gap-4 mt-4"><div class="w-full h-64">`;
  DonutChart($$payload, {
    s_label: result(),
    name: "compare_compliance_result",
    title: compliance(),
    orientation: "horizontal",
    height: "h-full",
    values: data.compareAudit.donut_data.result.values,
    colors: data.compareAudit.donut_data.result.values.map((object) => object.itemStyle.color)
  });
  $$payload.out += `<!----></div> <div class="w-full h-64">`;
  DonutChart($$payload, {
    s_label: status(),
    name: "compare_compliance_status",
    title: progress(),
    orientation: "horizontal",
    height: "h-full",
    values: data.compareAudit.donut_data.status.values,
    colors: data.compareAudit.donut_data.status.values.map((object) => object.itemStyle.color)
  });
  $$payload.out += `<!----></div></div></div></div></div></div> `;
  if (data.differences && data.differences.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(data.differences);
    $$payload.out += `<div class="card bg-white shadow-lg"><div class="px-6 py-4 border-b border-gray-200"><h2 class="h4 font-bold"><i class="fa-solid fa-code-compare mr-2"></i> ${escape_html(requirementdifferences1())}</h2> <p class="text-sm text-gray-600 mt-1">${escape_html(data.differences.length)}
					${escape_html(data.differences.length === 1 ? requirement() : requirements())}
					${escape_html(withdifferences1())}</p></div> <div class="overflow-x-auto"><table class="table-auto w-full"><thead><tr class="bg-gray-50"><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">${escape_html(requirement())}</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">${escape_html(baseaudit1())}</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">${escape_html(comparisonaudit1())}</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let diff = each_array_2[$$index_2];
      $$payload.out += `<tr class="hover:bg-gray-50"><td class="px-6 py-4"><div class="flex flex-col">`;
      if (diff.requirement.ref_id) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="font-semibold text-sm">${escape_html(diff.requirement.ref_id)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (diff.requirement.name) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm text-gray-900">${escape_html(diff.requirement.name)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></td><td class="px-6 py-4"><div class="flex flex-col space-y-1"><div class="flex items-center space-x-2"><span class="text-xs text-gray-500">${escape_html(result())}:</span> <span class="badge text-xs"${attr_style(`background-color: ${stringify(diff.base.result === "compliant" ? "#86efac" : diff.base.result === "partially_compliant" ? "#fde047" : diff.base.result === "non_compliant" ? "#f87171" : diff.base.result === "not_applicable" ? "#000000" : "#d1d5db")}; color: ${stringify(diff.base.result === "not_applicable" ? "white" : "black")};`)}>${escape_html(safeTranslate(diff.base.result))}</span></div> `;
      if (diff.base.score !== null && diff.base.score !== void 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex items-center space-x-2"><span class="text-xs text-gray-500">${escape_html(score())}:</span> <span class="text-xs font-medium">${escape_html(diff.base.score)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></td><td class="px-6 py-4"><div class="flex flex-col space-y-1"><div class="flex items-center space-x-2"><span class="text-xs text-gray-500">${escape_html(result())}:</span> <span class="badge text-xs"${attr_style(`background-color: ${stringify(diff.compare.result === "compliant" ? "#86efac" : diff.compare.result === "partially_compliant" ? "#fde047" : diff.compare.result === "non_compliant" ? "#f87171" : diff.compare.result === "not_applicable" ? "#000000" : "#d1d5db")}; color: ${stringify(diff.compare.result === "not_applicable" ? "white" : "black")};`)}>${escape_html(safeTranslate(diff.compare.result))}</span></div> `;
      if (diff.compare.score !== null && diff.compare.score !== void 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="flex items-center space-x-2"><span class="text-xs text-gray-500">${escape_html(score())}:</span> <span class="text-xs font-medium">${escape_html(diff.compare.score)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BW6tqrA4.js.map
