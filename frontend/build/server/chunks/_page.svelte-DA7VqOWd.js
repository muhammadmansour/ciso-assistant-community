import { p as push, V as escape_html, W as ensure_array_like, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { JA as exportpdf1, cD as version, cE as status, w3 as referencescale1, cV as assets, cu as domain, Hn as impactovertime2, wd as recoveryinsights1, fi as asset, LX as documented, pY as tested, BU as objectivesmet1, BS as objectivesvscapabilities2, jT as security, wi as recovery, Xj as alignment, BV as objective, To as capability, dx as appliedcontrols1, fQ as name, fX as folder, cN as eta, TP as back } from './_index-DiaVtc2Z.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { A as Anchor } from './Anchor-vk0sCVou.js';
import { T as TimelineTable } from './TimelineTable-Du5dnf8v.js';
import { A as ActivityTracker } from './ActivityTracker-B6p8G7mf.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-CZeYLK59.js';
import { S as SECURITY_OBJECTIVE_SCALE_MAP } from './constants-CbUNxZZz.js';
import { p as page } from './index3-BpCge2eg.js';
import './index-CRjgakYW.js';
import './runtime-BKo9q3Zd.js';
import './breadcrumbs-BKQh9F1q.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './shared-server-BU2DVf8Q.js';
import './client-DqP3yP6V.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set("Business Impact Analysis Report");
  const {
    bia,
    timelineData,
    metrics,
    assets: assets$1,
    appliedControls
  } = data;
  const scale = page.data.settings?.security_objective_scale || "1-4";
  const scaleMap = SECURITY_OBJECTIVE_SCALE_MAP[scale];
  function getDisplayValue(rawValue) {
    if (rawValue === null || rawValue === void 0) return "--";
    if (typeof rawValue === "number" && rawValue >= 0 && rawValue <= 4) {
      return scaleMap[rawValue];
    }
    return String(rawValue);
  }
  function formatComparison(comparison, field) {
    const items = comparison.map((c) => {
      const value = c[field];
      if (value === null || value === void 0) return null;
      return `${safeTranslate(c.objective)}: ${getDisplayValue(value)}`;
    }).filter((item) => item !== null);
    return items.length > 0 ? items.join("\n") : "";
  }
  function getSecurityObjectives(asset2) {
    return formatComparison(asset2.security_objectives_comparison || [], "expectation");
  }
  function getSecurityCapabilities(asset2) {
    return formatComparison(asset2.security_objectives_comparison || [], "reality");
  }
  function getRecoveryObjectives(asset2) {
    return formatComparison(asset2.recovery_objectives_comparison || [], "expectation");
  }
  function getRecoveryCapabilities(asset2) {
    return formatComparison(asset2.recovery_objectives_comparison || [], "reality");
  }
  function getOverallVerdict(asset2) {
    const securityComparison = asset2.security_objectives_comparison || [];
    const recoveryComparison = asset2.recovery_objectives_comparison || [];
    const allComparisons = [...securityComparison, ...recoveryComparison];
    if (allComparisons.length === 0) return null;
    const hasFailed = allComparisons.some((c) => c.verdict === false);
    if (hasFailed) return false;
    const hasPassed = allComparisons.some((c) => c.verdict === true);
    if (hasPassed) return true;
    return null;
  }
  $$payload.out += `<div class="bg-white shadow-sm p-4 px-8 mx-auto relative svelte-cgcn80"><div class="mb-4 flex justify-between items-center no-print">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/business-impact-analysis/${bia.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(back())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <button class="btn preset-filled-primary-500 flex items-center gap-2 no-print"><i class="fa-solid fa-file-pdf"></i> <span>${escape_html(exportpdf1())}</span></button></div> <section class="mb-8 svelte-cgcn80"><h1 class="text-3xl font-bold text-gray-900 mb-2 svelte-cgcn80">${escape_html(bia.name)}</h1> `;
  if (bia.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-600 mb-4">`;
    MarkdownRenderer($$payload, { content: bia.description });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6"><div><span class="font-semibold text-gray-700">${escape_html(version())}:</span> <span class="ml-2">${escape_html(bia.version || "N/A")}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(status())}:</span> <span class="ml-2">${escape_html(bia.status ? safeTranslate(bia.status) : "N/A")}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(referencescale1())}:</span> <span class="ml-2">${escape_html(bia.risk_matrix?.str || "N/A")}</span></div></div> `;
  if (assets$1 && assets$1.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(assets$1);
    $$payload.out += `<div class="mb-4"><h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2 svelte-cgcn80"><i class="fa-solid fa-server"></i> ${escape_html(assets())} <span class="badge preset-tonal-secondary text-xs svelte-cgcn80">${escape_html(assets$1.length)}</span></h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let assetAssessment = each_array[$$index];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:shadow-md transition-shadow svelte-cgcn80"><div class="flex items-start gap-2">`;
      if (assetAssessment.asset.type === "PR") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-briefcase text-blue-500 mt-1"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-cube text-blue-500 mt-1"></i>`;
      }
      $$payload.out += `<!--]--> <div class="flex-1"><div class="font-semibold text-gray-900">${escape_html(assetAssessment.asset.name)}</div> `;
      if (assetAssessment.asset.folder) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-xs text-gray-600"><span class="font-medium">${escape_html(domain())}:</span> <span class="ml-1">${escape_html(assetAssessment.asset.folder.str)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section> <section class="mb-8 page-break-section svelte-cgcn80"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-cgcn80">${escape_html(impactovertime2())}</h2> `;
  TimelineTable($$payload, { data: timelineData });
  $$payload.out += `<!----></section> <section class="mb-8 page-break-section svelte-cgcn80"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-cgcn80">${escape_html(recoveryinsights1())}</h2> <div class="flex items-center justify-center bg-gray-50 rounded-lg p-6 mb-6 svelte-cgcn80">`;
  ActivityTracker($$payload, { metrics });
  $$payload.out += `<!----></div> `;
  if (assets$1 && assets$1.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(assets$1);
    $$payload.out += `<div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200 rounded-lg svelte-cgcn80"><thead class="bg-gray-100 svelte-cgcn80"><tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(asset())}</th><th class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(documented())}</th><th class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(tested())}</th><th class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(objectivesmet1())}</th></tr></thead><tbody><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let assetAssessment = each_array_1[$$index_1];
      $$payload.out += `<tr class="border-b hover:bg-gray-50 svelte-cgcn80"><td class="px-4 py-3 text-sm font-medium text-gray-900 svelte-cgcn80">${escape_html(assetAssessment.asset.name)}</td><td class="px-4 py-3 text-center svelte-cgcn80"><span${attr_class("inline-flex items-center justify-center w-6 h-6 rounded-full svelte-cgcn80", void 0, {
        "bg-green-500": assetAssessment.recovery_documented,
        "bg-gray-400": !assetAssessment.recovery_documented
      })}>`;
      if (assetAssessment.recovery_documented) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-check text-white text-xs"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-xmark text-white text-xs"></i>`;
      }
      $$payload.out += `<!--]--></span></td><td class="px-4 py-3 text-center svelte-cgcn80"><span${attr_class("inline-flex items-center justify-center w-6 h-6 rounded-full svelte-cgcn80", void 0, {
        "bg-green-500": assetAssessment.recovery_tested,
        "bg-gray-400": !assetAssessment.recovery_tested
      })}>`;
      if (assetAssessment.recovery_tested) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-check text-white text-xs"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-xmark text-white text-xs"></i>`;
      }
      $$payload.out += `<!--]--></span></td><td class="px-4 py-3 text-center svelte-cgcn80"><span${attr_class("inline-flex items-center justify-center w-6 h-6 rounded-full svelte-cgcn80", void 0, {
        "bg-green-500": assetAssessment.recovery_targets_met,
        "bg-gray-400": !assetAssessment.recovery_targets_met
      })}>`;
      if (assetAssessment.recovery_targets_met) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-check text-white text-xs"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-xmark text-white text-xs"></i>`;
      }
      $$payload.out += `<!--]--></span></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section> <section class="mb-8 page-break-section svelte-cgcn80"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-cgcn80">${escape_html(objectivesvscapabilities2())}</h2> `;
  if (assets$1 && assets$1.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(assets$1);
    $$payload.out += `<div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200 rounded-lg svelte-cgcn80"><thead class="bg-gray-100 svelte-cgcn80"><tr><th rowspan="2" class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b align-middle svelte-cgcn80">${escape_html(asset())}</th><th colspan="2" class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-l svelte-cgcn80">${escape_html(security())}</th><th colspan="2" class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-l svelte-cgcn80">${escape_html(recovery())}</th><th rowspan="2" class="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-l align-middle svelte-cgcn80">${escape_html(alignment())}</th></tr><tr><th class="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l svelte-cgcn80">${escape_html(objective())}</th><th class="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b svelte-cgcn80">${escape_html(capability())}</th><th class="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l svelte-cgcn80">${escape_html(objective())}</th><th class="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b svelte-cgcn80">${escape_html(capability())}</th></tr></thead><tbody><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let assetAssessment = each_array_2[$$index_2];
      const verdict = getOverallVerdict(assetAssessment.asset);
      const securityObjectives = getSecurityObjectives(assetAssessment.asset);
      const securityCapabilities = getSecurityCapabilities(assetAssessment.asset);
      const recoveryObjectives = getRecoveryObjectives(assetAssessment.asset);
      const recoveryCapabilities = getRecoveryCapabilities(assetAssessment.asset);
      $$payload.out += `<tr class="border-b hover:bg-gray-50 svelte-cgcn80"><td class="px-4 py-3 text-sm font-medium text-gray-900 svelte-cgcn80">${escape_html(assetAssessment.asset.name)}</td><td class="px-4 py-3 text-xs text-gray-700 border-l whitespace-pre-line align-top svelte-cgcn80">${escape_html(securityObjectives || "--")}</td><td class="px-4 py-3 text-xs text-gray-700 whitespace-pre-line align-top svelte-cgcn80">${escape_html(securityCapabilities || "--")}</td><td class="px-4 py-3 text-xs text-gray-700 border-l whitespace-pre-line align-top svelte-cgcn80">${escape_html(recoveryObjectives || "--")}</td><td class="px-4 py-3 text-xs text-gray-700 whitespace-pre-line align-top svelte-cgcn80">${escape_html(recoveryCapabilities || "--")}</td><td class="px-4 py-3 text-center border-l align-middle svelte-cgcn80">`;
      if (verdict !== null) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class("inline-flex items-center justify-center w-6 h-6 rounded-full svelte-cgcn80", void 0, {
          "bg-green-500": verdict === true,
          "bg-red-500": verdict === false
        })}>`;
        if (verdict === true) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<i class="fa-solid fa-check text-white text-xs"></i>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<i class="fa-solid fa-xmark text-white text-xs"></i>`;
        }
        $$payload.out += `<!--]--></span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section> `;
  if (appliedControls && appliedControls.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_3 = ensure_array_like(appliedControls);
    $$payload.out += `<section class="mb-8 page-break-section svelte-cgcn80"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-cgcn80">${escape_html(appliedcontrols1())}</h2> <div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200 rounded-lg svelte-cgcn80"><thead class="bg-gray-100 svelte-cgcn80"><tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(name())}</th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(folder())}</th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(status())}</th><th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b svelte-cgcn80">${escape_html(eta())}</th></tr></thead><tbody><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let control = each_array_3[$$index_3];
      $$payload.out += `<tr class="border-b hover:bg-gray-50 svelte-cgcn80"><td class="px-4 py-3 text-sm text-gray-900 svelte-cgcn80">${escape_html(control.str || control.name)}</td><td class="px-4 py-3 text-sm text-gray-900 svelte-cgcn80">${escape_html(control.folder.str)}</td><td class="px-4 py-3 text-sm text-gray-700 svelte-cgcn80">${escape_html(control.status ? safeTranslate(control.status) : "--")}</td><td class="px-4 py-3 text-sm text-gray-700 svelte-cgcn80">${escape_html(control.eta ? formatDateOrDateTime(control.eta) : "--")}</td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DA7VqOWd.js.map
