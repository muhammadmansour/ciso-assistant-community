import { p as push, V as escape_html, T as attr, X as stringify, W as ensure_array_like, Z as attr_style, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { kW as workshops, l0 as workshop, Im as exportpdf1, cz as version, cA as status, Hk as framethestudy2, cR as assets, cq as domain, cM as observation, ab as fearedevents1, fV as gravity, fq as qualifications, bo as description, dB as complianceassessments1, cV as progress, cJ as eta, cL as duedate1, Gw as identifyrisksources2, ad as rotocouples2, f$ as motivation, g1 as resources, sX as rotoactivity1, zC as pertinence, kj as justification, af as studytheecosystem2, gq as stakeholders, Oa as currentcriticality1, uw as residualcriticality1, dt as appliedcontrols1, Js as ecosystemradar1, Oe as current, uA as residual, ah as strategicscenarios1, cu as refid1, SK as attackpaths1, UU as assesstheriskscenarios3, al as operationalscenarios1, fN as quotationmethod1, hw as operationalscenario1, gp as strategicscenario1, gt as attackpath1, kE as operatingmodesdescription2, gx as likelihood, tx as risklevel1, cT as threats, hv as operatingmodes1, aj as elementaryactions1, EW as killchain1, o3 as validatethetreatment2, cB as riskmatrix1, fM as name, c6 as inherentrisk1, O0 as currentrisk1, un as residualrisk1, oF as treatmentplan1, cX as priority, cU as owner, cs as riskassessment1, EM as legend, cS as riskorigin1, kx as targetobjective1, qZ as stakeholder, I0 as fearedevent1, fe as asset, Sn as backtostudy2 } from './_index-Syqrsmaf.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import { R as RiskMatrix } from './RiskMatrix-BFYZlZcu.js';
import { R as RiskScenarioItem } from './RiskScenarioItem-D3SOJ7CX.js';
import { E as EcosystemCircularRadarChart } from './EcosystemCircularRadarChart-CKN_PBsa.js';
import { O as OperatingModeGraph } from './OperatingModeGraph-DGqDkEo6.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './index-CRjgakYW.js';
import './runtime-BKo9q3Zd.js';
import './breadcrumbs-Cdf8pK7r.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Tooltip-Li45R7zs.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './helpers-Bm9n0CNG.js';
import './Popover-PelKNyF8.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import '@unovis/ts';
import './single-container-0JmqNCE_.js';
import './graph-D0nQYL_R.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';

function AttackPathFlowText($$payload, $$props) {
  push();
  let {
    attackPaths,
    fearedEvents,
    fearedEventsWithAssets
  } = $$props;
  const each_array = ensure_array_like(attackPaths);
  $$payload.out += `<div class="mb-4 space-y-3 bg-white p-4 rounded-lg border border-gray-200"><!--[-->`;
  for (let $$index_4 = 0, $$length = each_array.length; $$index_4 < $$length; $$index_4++) {
    let path = each_array[$$index_4];
    $$payload.out += `<div class="text-sm border-l-4 border-primary-500 pl-3 py-2">`;
    if (path.name) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="font-semibold text-gray-700 mb-2">${escape_html(path.name)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex flex-wrap items-center gap-2 font-mono text-xs"><span class="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold">${escape_html(safeTranslate(path.risk_origin) || "Unknown RO")}</span> <i class="fa-solid fa-arrow-right text-gray-400"></i> <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded font-semibold">${escape_html(path.target_objective || "Unknown TO")}</span> <i class="fa-solid fa-arrow-right text-gray-400"></i> `;
    if (path.stakeholders && path.stakeholders.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(path.stakeholders);
      $$payload.out += `<div class="flex flex-wrap items-center gap-2"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let stakeholder2 = each_array_1[$$index];
        $$payload.out += `<span class="px-2 py-1 bg-amber-100 text-amber-800 rounded">${escape_html(stakeholder2.str)} `;
        if (stakeholder2.entity) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="text-amber-600 font-semibold">(${escape_html(stakeholder2.entity.name)})</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></span> `;
        if (stakeholder2 !== path.stakeholders[path.stakeholders.length - 1]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="text-gray-300">|</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div> <i class="fa-solid fa-arrow-right text-gray-400"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (fearedEvents && fearedEvents.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_2 = ensure_array_like(fearedEvents);
      $$payload.out += `<div class="flex flex-wrap items-center gap-2"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let fe = each_array_2[$$index_1];
        $$payload.out += `<span class="px-2 py-1 bg-orange-100 text-orange-800 rounded">${escape_html(fe.name)}</span> `;
        if (fe !== fearedEvents[fearedEvents.length - 1]) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="text-gray-300">|</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div> <i class="fa-solid fa-arrow-right text-gray-400"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (fearedEventsWithAssets && fearedEventsWithAssets.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_3 = ensure_array_like(fearedEventsWithAssets);
      $$payload.out += `<div class="flex flex-wrap items-center gap-2"><!--[-->`;
      for (let $$index_3 = 0, $$length2 = each_array_3.length; $$index_3 < $$length2; $$index_3++) {
        let fe = each_array_3[$$index_3];
        const each_array_4 = ensure_array_like(fe.assets);
        $$payload.out += `<!--[-->`;
        for (let $$index_2 = 0, $$length3 = each_array_4.length; $$index_2 < $$length3; $$index_2++) {
          let asset2 = each_array_4[$$index_2];
          $$payload.out += `<span class="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">${escape_html(asset2.str)}</span>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-6 bg-white p-3 rounded-lg border border-gray-200"><h4 class="text-xs font-semibold text-gray-600 mb-2">${escape_html(legend())}:</h4> <div class="flex flex-wrap gap-3 text-xs"><span class="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold">${escape_html(riskorigin1())}</span> <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded font-semibold">${escape_html(targetobjective1())}</span> <span class="px-2 py-1 bg-amber-100 text-amber-800 rounded">${escape_html(stakeholder())}</span> <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded">${escape_html(fearedevent1())}</span> <span class="px-2 py-1 bg-cyan-100 text-cyan-800 rounded">${escape_html(asset())}</span></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set("EBIOS RM Study Report");
  const { reportData } = data;
  const study = reportData.study;
  const useBubbles = data.useBubbles;
  const inherentRiskEnabled = data.inherentRiskEnabled;
  const pertinenceColor = {
    undefined: "bg-gray-200 text-gray-700",
    irrelevant: "bg-green-200 text-green-700",
    partially_relevant: "bg-yellow-200 text-yellow-700",
    fairly_relevant: "bg-orange-200 text-orange-700",
    highly_relevant: "bg-red-200 text-red-700"
  };
  const buildRiskCluster = (scenarios, risk_matrix, risk) => {
    const parsedRiskMatrix = typeof risk_matrix.json_definition === "string" ? JSON.parse(risk_matrix.json_definition) : risk_matrix.json_definition;
    const grid = Array.from({ length: parsedRiskMatrix.probability.length }, () => Array.from({ length: parsedRiskMatrix.impact.length }, () => []));
    scenarios.forEach((scenario) => {
      const probabilityData = scenario[`${risk}_proba`];
      const impactData = scenario[`${risk}_impact`];
      const probability = probabilityData?.value ?? -1;
      const impact = impactData?.value ?? -1;
      probability >= 0 && impact >= 0 ? grid[probability][impact].push(scenario) : void 0;
    });
    return grid;
  };
  $$payload.out += `<div class="bg-white shadow-sm p-4 px-8 max-w-5xl mx-auto relative svelte-218iib"><div class="fixed top-24 right-8 z-10 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 no-print svelte-218iib"><div class="text-xs font-semibold text-gray-600 mb-2 text-center">${escape_html(workshops())}</div> <div class="flex flex-col gap-2 items-center"><a href="#workshop-1" class="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold transition-colors svelte-218iib"${attr("title", `${stringify(workshop())} 1`)}>1</a> <a href="#workshop-2" class="w-10 h-10 flex items-center justify-center rounded-lg bg-fuchsia-900 hover:bg-fuchsia-950 text-white font-bold transition-colors svelte-218iib"${attr("title", `${stringify(workshop())} 2`)}>2</a> <a href="#workshop-3" class="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-bold transition-colors svelte-218iib"${attr("title", `${stringify(workshop())} 3`)}>3</a> <a href="#workshop-4" class="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-bold transition-colors svelte-218iib"${attr("title", `${stringify(workshop())} 4`)}>4</a> <a href="#workshop-5" class="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors svelte-218iib"${attr("title", `${stringify(workshop())} 5`)}>5</a></div></div> <div class="mb-4 flex justify-between items-center no-print svelte-218iib">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/ebios-rm/${study.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left svelte-218iib"></i> <p>${escape_html(backtostudy2())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <button class="btn preset-filled-primary-500 flex items-center gap-2 no-print svelte-218iib"><i class="fa-solid fa-file-pdf"></i> <span>${escape_html(exportpdf1())}</span></button></div> <div class="mb-6"><h1 class="text-3xl font-bold text-gray-900 mb-2 svelte-218iib">${escape_html(study.name)}</h1> `;
  if (study.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-600 mb-4">`;
    MarkdownRenderer($$payload, { content: study.description });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm svelte-218iib"><div><span class="font-semibold text-gray-700">${escape_html(version())}:</span> <span class="ml-2">${escape_html(study.version || "N/A")}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(status())}:</span> <span class="ml-2">${escape_html(study.status ? safeTranslate(study.status) : "N/A")}</span></div></div></div> <div id="workshop-1" class="my-12 scroll-mt-20 workshop-divider svelte-218iib"><hr class="border-t-4 border-pink-600 svelte-218iib"/> <div class="text-center -mt-5 mb-12 svelte-218iib"><span class="bg-white px-6 py-2 text-xl font-bold text-pink-600 svelte-218iib">${escape_html(workshop())} 1 - ${escape_html(framethestudy2())}</span></div></div> <section class="mb-6 svelte-218iib">`;
  if (study.assets && study.assets.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(study.assets);
    $$payload.out += `<div class="mb-4"><h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2 svelte-218iib"><i class="fa-solid fa-server"></i> ${escape_html(assets())} <span class="badge preset-tonal-secondary text-xs svelte-218iib">${escape_html(study.assets.length)}</span></h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-3 svelte-218iib"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let asset2 = each_array[$$index];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:shadow-md transition-shadow svelte-218iib"><div class="flex items-start gap-2">`;
      if (asset2.type === "PR") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-briefcase text-blue-500 mt-1"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-cube text-blue-500 mt-1"></i>`;
      }
      $$payload.out += `<!--]--> <div class="flex-1"><div class="font-semibold text-gray-900">${escape_html(asset2.str)}</div> `;
      if (asset2.folder) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-xs text-gray-600"><span class="font-medium">${escape_html(domain())}:</span> <span class="ml-1">${escape_html(asset2.folder.str)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (study.observation) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg svelte-218iib"><h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2 svelte-218iib"><i class="fa-solid fa-eye text-gray-500"></i> <span>${escape_html(observation())}</span></h3> <div class="text-gray-600">`;
    MarkdownRenderer($$payload, { content: study.observation });
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section> `;
  if (reportData.feared_events.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(reportData.feared_events);
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2 svelte-218iib">${escape_html(fearedevents1())} <span class="badge preset-tonal-secondary text-xs svelte-218iib">${escape_html(reportData.feared_events.length)}</span></h2> <div class="space-y-4"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let event = each_array_1[$$index_1];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow svelte-218iib"><h3 class="text-lg font-semibold text-gray-800 mb-2 svelte-218iib">${escape_html(event.name)}</h3> <div class="flex flex-wrap gap-4 text-sm mb-3"><div><span class="font-semibold text-gray-700">${escape_html(gravity())}:</span> <span class="ml-2 px-2 py-1 rounded svelte-218iib"${attr_style(`background-color: ${stringify(event.gravity.hexcolor)}`)}>${escape_html(safeTranslate(event.gravity.name))}</span></div> `;
      if (event.assets.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(assets())}:</span> <span class="ml-2">${escape_html(event.assets.map((a) => a.str).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (event.qualifications.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(qualifications())}:</span> <span class="ml-2">${escape_html(event.qualifications.map((q) => safeTranslate(q.str)).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (event.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(description())}:</span> <p class="mt-1 text-gray-600">${escape_html(event.description)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (reportData.compliance_assessments && reportData.compliance_assessments.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(reportData.compliance_assessments);
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2 svelte-218iib">${escape_html(complianceassessments1())} <span class="badge preset-tonal-secondary text-xs svelte-218iib">${escape_html(reportData.compliance_assessments.length)}</span></h2> <div class="space-y-4"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let assessment = each_array_2[$$index_2];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow svelte-218iib"><div class="flex justify-between items-start mb-2"><div><h3 class="text-lg font-semibold text-gray-800 svelte-218iib">${escape_html(assessment.name)}</h3> `;
      if (assessment.framework) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-sm text-gray-600">${escape_html(assessment.framework)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (assessment.version) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="badge bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded svelte-218iib">v${escape_html(assessment.version)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (assessment.progress !== void 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mb-3"><div class="flex justify-between items-center mb-1"><span class="text-sm font-semibold text-gray-700">${escape_html(progress())}:</span> <span class="text-sm font-semibold text-gray-900">${escape_html(assessment.progress)}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2.5 svelte-218iib"><div${attr_class("h-2.5 rounded-full transition-all duration-300 svelte-218iib", void 0, {
          "bg-red-500": assessment.progress < 25,
          "bg-orange-500": assessment.progress >= 25 && assessment.progress < 50,
          "bg-yellow-500": assessment.progress >= 50 && assessment.progress < 75,
          "bg-green-500": assessment.progress >= 75
        })}${attr_style(`width: ${stringify(assessment.progress)}%`)}></div></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (assessment.result_counts) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3 svelte-218iib">`;
        if (assessment.result_counts.compliant !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="bg-green-50 border border-green-200 rounded p-2 text-center svelte-218iib"><div class="text-2xl font-bold text-green-700">${escape_html(assessment.result_counts.compliant)}</div> <div class="text-xs text-green-600">${escape_html(safeTranslate("compliant"))}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (assessment.result_counts.partially_compliant !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="bg-yellow-50 border border-yellow-200 rounded p-2 text-center svelte-218iib"><div class="text-2xl font-bold text-yellow-700">${escape_html(assessment.result_counts.partially_compliant)}</div> <div class="text-xs text-yellow-600">${escape_html(safeTranslate("partiallyCompliant"))}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (assessment.result_counts.non_compliant !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="bg-red-50 border border-red-200 rounded p-2 text-center svelte-218iib"><div class="text-2xl font-bold text-red-700">${escape_html(assessment.result_counts.non_compliant)}</div> <div class="text-xs text-red-600">${escape_html(safeTranslate("nonCompliant"))}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (assessment.result_counts.not_applicable !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="bg-gray-50 border border-gray-200 rounded p-2 text-center svelte-218iib"><div class="text-2xl font-bold text-gray-700">${escape_html(assessment.result_counts.not_applicable)}</div> <div class="text-xs text-gray-600">${escape_html(safeTranslate("notApplicable"))}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (assessment.result_counts.not_assessed !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="bg-blue-50 border border-blue-200 rounded p-2 text-center svelte-218iib"><div class="text-2xl font-bold text-blue-700">${escape_html(assessment.result_counts.not_assessed)}</div> <div class="text-xs text-blue-600">${escape_html(safeTranslate("notAssessed"))}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="flex flex-wrap gap-4 text-sm">`;
      if (assessment.eta) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(eta())}:</span> <span class="ml-2">${escape_html(formatDateOrDateTime(assessment.eta))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (assessment.due_date) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(duedate1())}:</span> <span class="ml-2">${escape_html(formatDateOrDateTime(assessment.due_date))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (assessment.status) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(status())}:</span> <span class="ml-2">${escape_html(safeTranslate(assessment.status))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div id="workshop-2" class="my-12 scroll-mt-20 workshop-divider svelte-218iib"><hr class="border-t-4 border-fuchsia-900 svelte-218iib"/> <div class="text-center -mt-5 mb-12 svelte-218iib"><span class="bg-white px-6 py-2 text-xl font-bold text-fuchsia-900 svelte-218iib">${escape_html(workshop())} 2 - ${escape_html(identifyrisksources2())}</span></div></div> `;
  if (reportData.ro_to_couples.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_3 = ensure_array_like(reportData.ro_to_couples);
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2 svelte-218iib">${escape_html(rotocouples2())} <span class="badge preset-tonal-secondary text-xs svelte-218iib">${escape_html(reportData.ro_to_couples.length)}</span></h2> <div class="space-y-4"><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let roto = each_array_3[$$index_3];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow svelte-218iib"><h3 class="text-lg font-semibold text-gray-800 mb-2 svelte-218iib">${escape_html(safeTranslate(roto.risk_origin))} - ${escape_html(roto.target_objective)}</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm svelte-218iib"><div><span class="font-semibold text-gray-700">${escape_html(motivation())}:</span> <span class="ml-2">${escape_html(safeTranslate(roto.motivation))}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(resources())}:</span> <span class="ml-2">${escape_html(safeTranslate(roto.resources))}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(rotoactivity1())}:</span> <span class="ml-2">${escape_html(safeTranslate(roto.activity))}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(pertinence())}:</span> <span${attr_class(`badge ml-2 ${stringify(pertinenceColor[roto.pertinence])}`, "svelte-218iib")}>${escape_html(safeTranslate(roto.pertinence))}</span></div></div> `;
      if (roto.feared_events.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(fearedevents1())}:</span> <span class="ml-2 text-gray-600">${escape_html(reportData.feared_events.filter((fe) => roto.feared_events.some((id) => id.id === fe.id)).map((fe) => fe.name).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (roto.justification) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(justification())}:</span> <span class="ml-2 text-gray-600">${escape_html(roto.justification)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div id="workshop-3" class="my-12 scroll-mt-20 workshop-divider svelte-218iib"><hr class="border-t-4 border-teal-500 svelte-218iib"/> <div class="text-center -mt-5 mb-12 svelte-218iib"><span class="bg-white px-6 py-2 text-xl font-bold text-teal-500 svelte-218iib">${escape_html(workshop())} 3 - ${escape_html(studytheecosystem2())}</span></div></div> `;
  if (reportData.stakeholders.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_4 = ensure_array_like(reportData.stakeholders);
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2 svelte-218iib">${escape_html(stakeholders())} <span class="badge preset-tonal-secondary text-xs svelte-218iib">${escape_html(reportData.stakeholders.length)}</span></h2> <div class="space-y-4"><!--[-->`;
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let stakeholder2 = each_array_4[$$index_4];
      $$payload.out += `<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow svelte-218iib"><h3 class="text-lg font-semibold text-gray-800 mb-3 svelte-218iib">${escape_html(stakeholder2.entity.str)} (${escape_html(safeTranslate(stakeholder2.category))})</h3> <div class="flex flex-wrap gap-6 text-sm mb-2"><div class="flex flex-col"><span class="text-xs text-gray-500 mb-1">${escape_html(currentcriticality1())}</span> <span class="badge bg-blue-100 text-blue-800 font-bold text-base px-3 py-1 svelte-218iib">${escape_html(stakeholder2.current_criticality)}</span></div> <div class="flex flex-col"><span class="text-xs text-gray-500 mb-1">${escape_html(residualcriticality1())}</span> <span class="badge bg-green-100 text-green-800 font-bold text-base px-3 py-1 svelte-218iib">${escape_html(stakeholder2.residual_criticality)}</span></div></div> `;
      if (stakeholder2.applied_controls.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(appliedcontrols1())}:</span> <span class="ml-2 text-gray-600">${escape_html(stakeholder2.applied_controls.map((c) => c.str).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (stakeholder2.justification) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(justification())}:</span> <span class="ml-2 text-gray-600">${escape_html(stakeholder2.justification)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (reportData.stakeholders.length > 0 && reportData.radar) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<section class="mb-6 radar-page svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 text-center svelte-218iib">${escape_html(ecosystemradar1())} - ${escape_html(current())}</h2> <div class="bg-white radar-chart-container svelte-218iib" data-chart="radar-current">`;
    EcosystemCircularRadarChart($$payload, {
      name: "c_ecosystem_report",
      data: reportData.radar,
      type: "current",
      classesContainer: "w-full",
      height: "h-[700px]"
    });
    $$payload.out += `<!----></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (reportData.stakeholders.length > 0 && reportData.radar) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<section class="mb-6 radar-page svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 text-center svelte-218iib">${escape_html(ecosystemradar1())} - ${escape_html(residual())}</h2> <div class="bg-white radar-chart-container svelte-218iib" data-chart="radar-residual">`;
    EcosystemCircularRadarChart($$payload, {
      name: "r_ecosystem_report",
      data: reportData.radar,
      type: "residual",
      classesContainer: "w-full",
      height: "h-[700px]"
    });
    $$payload.out += `<!----></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (reportData.strategic_scenarios.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_5 = ensure_array_like(reportData.strategic_scenarios);
    $$payload.out += `<section class="mb-6 strategic-scenarios-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-218iib">${escape_html(strategicscenarios1())}</h2> <div class="space-y-6"><!--[-->`;
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let scenario = each_array_5[$$index_5];
      const scenarioAttackPaths = reportData.attack_paths.filter((ap) => ap.strategic_scenario.id === scenario.id);
      $$payload.out += `<div class="border-2 border-purple-200 rounded-lg p-4"><div class="bg-purple-50 p-4 rounded-lg mb-4 svelte-218iib"><h3 class="text-lg font-semibold text-purple-900 mb-2 svelte-218iib"><i class="fa-solid fa-chess-knight mr-2"></i>${escape_html(scenario.name)}</h3> `;
      if (scenario.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-gray-700 text-sm mb-3">${escape_html(scenario.description)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="flex flex-wrap gap-4 text-sm"><div><span class="font-semibold text-gray-700">${escape_html(gravity())}:</span> <span class="ml-2 px-2 py-1 rounded svelte-218iib"${attr_style(`background-color: ${stringify(scenario.gravity.hexcolor)}`)}>${escape_html(safeTranslate(scenario.gravity.name))}</span></div> `;
      if (scenario.ref_id) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div><span class="font-semibold text-gray-700">${escape_html(refid1())}:</span> <span class="ml-2">${escape_html(scenario.ref_id)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div> `;
      if (scenarioAttackPaths.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<h4 class="text-md font-semibold text-gray-800 mb-3"><i class="fa-solid fa-route mr-2"></i>${escape_html(attackpaths1())}</h4> `;
        AttackPathFlowText($$payload, {
          attackPaths: scenarioAttackPaths,
          fearedEvents: reportData.feared_events.filter((fe) => scenario.feared_events?.some((sFe) => sFe.id === fe.id)),
          fearedEventsWithAssets: reportData.feared_events.filter((fe) => scenario.feared_events?.some((sFe) => sFe.id === fe.id))
        });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div id="workshop-4" class="my-12 scroll-mt-20 workshop-divider svelte-218iib"><hr class="border-t-4 border-yellow-600 svelte-218iib"/> <div class="text-center -mt-5 mb-12 svelte-218iib"><span class="bg-white px-6 py-2 text-xl font-bold text-yellow-600 svelte-218iib">${escape_html(workshop())} 4 - ${escape_html(assesstheriskscenarios3())}</span></div></div> `;
  if (reportData.operational_scenarios.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_6 = ensure_array_like(reportData.operational_scenarios);
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-218iib">${escape_html(operationalscenarios1())}</h2> `;
    if (study.quotation_method) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="mb-4 text-sm"><span class="font-semibold text-gray-700">${escape_html(quotationmethod1())}:</span> <span class="ml-2">${escape_html(safeTranslate(study.quotation_method))}</span></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="space-y-6"><!--[-->`;
    for (let $$index_7 = 0, $$length = each_array_6.length; $$index_7 < $$length; $$index_7++) {
      let opScenario = each_array_6[$$index_7];
      const opModes = reportData.operating_modes?.filter((om) => om.operational_scenario.id === opScenario.id) || [];
      const attackPath = reportData.attack_paths.find((ap) => ap.id === opScenario.attack_path?.id);
      const strategicScenario = attackPath ? reportData.strategic_scenarios.find((ss) => ss.id === attackPath.strategic_scenario?.id) : null;
      $$payload.out += `<div class="border-2 border-yellow-200 rounded-lg p-4 bg-yellow-50 svelte-218iib"><div class="mb-4"><h3 class="text-lg font-semibold text-yellow-900 mb-2 svelte-218iib"><i class="fa-solid fa-gears mr-2"></i>${escape_html(opScenario.ref_id || operationalscenario1())}</h3> `;
      if (strategicScenario) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-sm mb-3"><span class="font-semibold text-gray-700">${escape_html(strategicscenario1())}:</span> <span class="ml-2 text-gray-700">${escape_html(strategicScenario.name)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (opScenario.attack_path) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-sm mb-3"><span class="font-semibold text-gray-700">${escape_html(attackpath1())}:</span> <span class="ml-2 text-gray-700">${escape_html(opScenario.attack_path.name)}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (opScenario.operating_modes_description && opModes.length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-sm mb-3"><span class="font-semibold text-gray-700">${escape_html(operatingmodesdescription2())}:</span> <p class="ml-2 text-gray-700 mt-1">${escape_html(opScenario.operating_modes_description)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm svelte-218iib"><div><span class="font-semibold text-gray-700">${escape_html(likelihood())}:</span> <span class="ml-2 px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(opScenario.likelihood.hexcolor)}`)}>${escape_html(safeTranslate(opScenario.likelihood.name))}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(gravity())}:</span> <span class="ml-2 px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(opScenario.gravity.hexcolor)}`)}>${escape_html(safeTranslate(opScenario.gravity.name))}</span></div> <div><span class="font-semibold text-gray-700">${escape_html(risklevel1())}:</span> <span class="ml-2 px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(opScenario.risk_level.hexcolor || "#gray")}`)}>${escape_html(safeTranslate(opScenario.risk_level.name))}</span></div></div> `;
      if (opScenario.threats && opScenario.threats.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-3 text-sm"><span class="font-semibold text-gray-700">${escape_html(threats())}:</span> <span class="ml-2 text-gray-700">${escape_html(opScenario.threats.map((t) => t.str).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (opScenario.stakeholders && opScenario.stakeholders.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(stakeholders())}:</span> <span class="ml-2 text-gray-700">${escape_html(opScenario.stakeholders.map((s) => {
          const stakeholderData = reportData.stakeholders.find((st) => st.id === s.id);
          return stakeholderData ? `${stakeholderData.entity.str} (${safeTranslate(stakeholderData.category)})` : s.str;
        }).join(", "))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (opScenario.justification) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2 text-sm"><span class="font-semibold text-gray-700">${escape_html(justification())}:</span> <p class="ml-2 text-gray-600 mt-1">${escape_html(opScenario.justification)}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (opModes.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_7 = ensure_array_like(opModes);
        $$payload.out += `<div class="mt-4 pt-4 border-t border-yellow-300"><h4 class="text-md font-semibold text-gray-800 mb-3"><i class="fa-solid fa-cog mr-2"></i>${escape_html(operatingmodes1())}</h4> <div class="space-y-3"><!--[-->`;
        for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
          let mode = each_array_7[$$index_6];
          $$payload.out += `<div class="bg-white border border-gray-200 rounded p-3 svelte-218iib"><div class="flex items-start gap-2 mb-2">`;
          if (mode.is_selected) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-green-600 mt-0.5"><i class="fa-solid fa-check-circle"></i></span>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<span class="text-gray-400 mt-0.5"><i class="fa-regular fa-circle"></i></span>`;
          }
          $$payload.out += `<!--]--> <div class="flex-1"><div class="font-medium text-gray-900 text-sm">${escape_html(mode.name)}</div> `;
          if (mode.description) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="text-gray-600 text-xs mt-1">${escape_html(mode.description)}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div></div> <div class="flex flex-wrap gap-3 ml-6"><div class="text-xs"><span class="font-semibold text-gray-700">${escape_html(likelihood())}:</span> <span class="ml-1 px-2 py-0.5 rounded svelte-218iib"${attr_style(`background-color: ${stringify(mode.likelihood.hexcolor)}`)}>${escape_html(safeTranslate(mode.likelihood.name))}</span></div> `;
          if (mode.elementary_actions.length > 0) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="text-xs"><span class="font-semibold text-gray-700">${escape_html(elementaryactions1())}:</span> <span class="ml-1 text-gray-600">${escape_html(mode.elementary_actions.length)}</span></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div> `;
          if (mode.graph) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="mt-4 pt-4 border-t border-gray-200"><h5 class="text-xs font-semibold text-gray-700 mb-2">${escape_html(killchain1())}</h5> <div class="bg-gray-50 rounded p-2 svelte-218iib"${attr("data-chart", `operating-mode-${stringify(mode.id)}`)}>`;
            OperatingModeGraph($$payload, {
              data: {
                nodes: mode.graph.nodes,
                links: mode.graph.links
              },
              panelNodes: mode.graph.panelNodes,
              linkFlow: false,
              height: "400px",
              zoomLevel: 0.6
            });
            $$payload.out += `<!----></div></div>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div id="workshop-5" class="my-12 scroll-mt-20 workshop-divider svelte-218iib"><hr class="border-t-4 border-red-500 svelte-218iib"/> <div class="text-center -mt-5 mb-12 svelte-218iib"><span class="bg-white px-6 py-2 text-xl font-bold text-red-500 svelte-218iib">${escape_html(workshop())} 5 - ${escape_html(validatethetreatment2())}</span></div></div> `;
  if (reportData.risk_matrix_data) {
    $$payload.out += "<!--[-->";
    const riskMatrix = reportData.risk_matrix_data.risk_matrix;
    const riskScenarios = reportData.risk_matrix_data.risk_scenarios;
    const inherentCluster = buildRiskCluster(riskScenarios, riskMatrix, "inherent");
    const currentCluster = buildRiskCluster(riskScenarios, riskMatrix, "current");
    const residualCluster = buildRiskCluster(riskScenarios, riskMatrix, "residual");
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-218iib">${escape_html(riskmatrix1())} `;
    if (reportData.risk_matrix_data.risk_assessment) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-sm font-normal text-gray-600">- ${escape_html(reportData.risk_matrix_data.risk_assessment.name)} `;
      if (reportData.risk_matrix_data.risk_assessment.version) {
        $$payload.out += "<!--[-->";
        $$payload.out += `(v${escape_html(reportData.risk_matrix_data.risk_assessment.version)})`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></h2> `;
    if (riskScenarios.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_8 = ensure_array_like(riskScenarios);
      $$payload.out += `<div class="mb-6 overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 border border-gray-300 svelte-218iib"><thead class="bg-gray-50 svelte-218iib"><tr class="svelte-218iib"><th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r svelte-218iib">${escape_html(refid1())}</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r svelte-218iib">${escape_html(name())}</th>`;
      if (inherentRiskEnabled) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r svelte-218iib">${escape_html(inherentrisk1())}</th>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--><th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r svelte-218iib">${escape_html(currentrisk1())}</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider svelte-218iib">${escape_html(residualrisk1())}</th></tr></thead><tbody class="bg-white divide-y divide-gray-200 svelte-218iib"><!--[-->`;
      for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
        let scenario = each_array_8[$$index_8];
        $$payload.out += `<tr class="hover:bg-gray-50 svelte-218iib"><td class="px-4 py-3 text-sm font-medium text-gray-900 border-r svelte-218iib">${escape_html(scenario.ref_id || "--")}</td><td class="px-4 py-3 text-sm text-gray-700 border-r svelte-218iib">${escape_html(scenario.name)}</td>`;
        if (inherentRiskEnabled) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<td class="px-4 py-3 text-sm border-r svelte-218iib">`;
          if (scenario.inherent_level) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(scenario.inherent_level.hexcolor)}`)}>${escape_html(safeTranslate(scenario.inherent_level.name))}</span>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<span class="text-gray-400">--</span>`;
          }
          $$payload.out += `<!--]--></td>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--><td class="px-4 py-3 text-sm border-r svelte-218iib">`;
        if (scenario.current_level) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(scenario.current_level.hexcolor)}`)}>${escape_html(safeTranslate(scenario.current_level.name))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span class="text-gray-400">--</span>`;
        }
        $$payload.out += `<!--]--></td><td class="px-4 py-3 text-sm svelte-218iib">`;
        if (scenario.residual_level) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium svelte-218iib"${attr_style(`background-color: ${stringify(scenario.residual_level.hexcolor)}`)}>${escape_html(safeTranslate(scenario.residual_level.name))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span class="text-gray-400">--</span>`;
        }
        $$payload.out += `<!--]--></td></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="space-y-8">`;
    if (inherentRiskEnabled) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div data-chart="risk-matrix-inherent" class="svelte-218iib"><h3 class="font-bold p-2 m-2 text-lg text-center svelte-218iib">${escape_html(inherentrisk1())}</h3> `;
      RiskMatrix($$payload, {
        riskMatrix,
        matrixName: "inherent",
        data: inherentCluster,
        dataItemComponent: RiskScenarioItem,
        useBubbles
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div data-chart="risk-matrix-current" class="svelte-218iib"><h3 class="font-bold p-2 m-2 text-lg text-center svelte-218iib">${escape_html(currentrisk1())}</h3> `;
    RiskMatrix($$payload, {
      riskMatrix,
      matrixName: "current",
      data: currentCluster,
      dataItemComponent: RiskScenarioItem,
      useBubbles
    });
    $$payload.out += `<!----></div> <div data-chart="risk-matrix-residual" class="svelte-218iib"><h3 class="font-bold p-2 m-2 text-lg text-center svelte-218iib">${escape_html(residualrisk1())}</h3> `;
    RiskMatrix($$payload, {
      riskMatrix,
      matrixName: "residual",
      data: residualCluster,
      dataItemComponent: RiskScenarioItem,
      showLegend: true,
      useBubbles
    });
    $$payload.out += `<!----></div></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (reportData.compliance_action_plans?.length > 0 || reportData.risk_action_plan || reportData.stakeholders?.some((s) => s.applied_controls?.length > 0)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<section class="mb-6 page-break-section svelte-218iib"><h2 class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 svelte-218iib">${escape_html(treatmentplan1())}</h2> `;
    if (reportData.compliance_action_plans && reportData.compliance_action_plans.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_9 = ensure_array_like(reportData.compliance_action_plans);
      $$payload.out += `<div class="space-y-6"><!--[-->`;
      for (let $$index_10 = 0, $$length = each_array_9.length; $$index_10 < $$length; $$index_10++) {
        let actionPlan = each_array_9[$$index_10];
        if (actionPlan.applied_controls.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_10 = ensure_array_like(actionPlan.applied_controls);
          $$payload.out += `<div class="border border-blue-200 rounded-lg p-4 bg-blue-50 svelte-218iib"><h3 class="text-lg font-semibold text-blue-900 mb-3 svelte-218iib"><i class="fa-solid fa-clipboard-check mr-2"></i> ${escape_html(actionPlan.assessment_name)} `;
          if (actionPlan.framework) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-sm font-normal text-blue-700">(${escape_html(actionPlan.framework)})</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></h3> <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 bg-white rounded border svelte-218iib"><thead class="bg-gray-50 svelte-218iib"><tr class="svelte-218iib"><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(name())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(priority())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(status())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(owner())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(eta())}</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`;
          for (let $$index_9 = 0, $$length2 = each_array_10.length; $$index_9 < $$length2; $$index_9++) {
            let control = each_array_10[$$index_9];
            $$payload.out += `<tr class="hover:bg-gray-50 svelte-218iib"><td class="px-3 py-2 text-sm text-gray-900 svelte-218iib">`;
            Anchor($$payload, {
              href: `/applied-controls/${stringify(control.id)}`,
              class: "text-primary-600 hover:text-primary-800 hover:underline",
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(control.name)}`;
              },
              $$slots: { default: true }
            });
            $$payload.out += `<!----></td><td class="px-3 py-2 text-sm svelte-218iib">`;
            if (control.priority) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.priority))}</span>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `--`;
            }
            $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
            if (control.status) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.status))}</span>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `--`;
            }
            $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
            if (control.owner) {
              $$payload.out += "<!--[-->";
              $$payload.out += `${escape_html(control.owner.str)}`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `--`;
            }
            $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">${escape_html(control.eta ? formatDateOrDateTime(control.eta) : "--")}</td></tr>`;
          }
          $$payload.out += `<!--]--></tbody></table></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (reportData.stakeholders && reportData.stakeholders.some((s) => s.applied_controls?.length > 0)) {
      $$payload.out += "<!--[-->";
      const each_array_11 = ensure_array_like(reportData.stakeholders.filter((s) => s.applied_controls?.length > 0));
      $$payload.out += `<div class="space-y-6 mt-6"><!--[-->`;
      for (let $$index_12 = 0, $$length = each_array_11.length; $$index_12 < $$length; $$index_12++) {
        let stakeholder2 = each_array_11[$$index_12];
        const each_array_12 = ensure_array_like(stakeholder2.applied_controls);
        $$payload.out += `<div class="border border-teal-200 rounded-lg p-4 bg-teal-50 svelte-218iib"><h3 class="text-lg font-semibold text-teal-900 mb-3 svelte-218iib"><i class="fa-solid fa-users mr-2"></i> ${escape_html(stakeholder2.entity.str)} <span class="text-sm font-normal text-teal-700">(${escape_html(safeTranslate(stakeholder2.category))})</span></h3> <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 bg-white rounded border svelte-218iib"><thead class="bg-gray-50 svelte-218iib"><tr class="svelte-218iib"><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(name())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(priority())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(status())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(owner())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(eta())}</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`;
        for (let $$index_11 = 0, $$length2 = each_array_12.length; $$index_11 < $$length2; $$index_11++) {
          let control = each_array_12[$$index_11];
          $$payload.out += `<tr class="hover:bg-gray-50 svelte-218iib"><td class="px-3 py-2 text-sm text-gray-900 svelte-218iib">`;
          Anchor($$payload, {
            href: `/applied-controls/${stringify(control.id)}`,
            class: "text-primary-600 hover:text-primary-800 hover:underline",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(control.str)}`;
            },
            $$slots: { default: true }
          });
          $$payload.out += `<!----></td><td class="px-3 py-2 text-sm svelte-218iib">`;
          if (control.priority) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.priority))}</span>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `--`;
          }
          $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
          if (control.status) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.status))}</span>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `--`;
          }
          $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
          if (control.owner) {
            $$payload.out += "<!--[-->";
            $$payload.out += `${escape_html(control.owner.str)}`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `--`;
          }
          $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">${escape_html(control.eta ? formatDateOrDateTime(control.eta) : "--")}</td></tr>`;
        }
        $$payload.out += `<!--]--></tbody></table></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (reportData.risk_action_plan && reportData.risk_action_plan.applied_controls.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_13 = ensure_array_like(reportData.risk_action_plan.applied_controls);
      $$payload.out += `<div class="border border-red-200 rounded-lg p-4 bg-red-50 mt-6 svelte-218iib"><h3 class="text-lg font-semibold text-red-900 mb-3 svelte-218iib"><i class="fa-solid fa-shield-halved mr-2"></i> ${escape_html(reportData.risk_action_plan.risk_assessment_name)} <span class="text-sm font-normal text-red-700">(${escape_html(riskassessment1())})</span></h3> <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 bg-white rounded border svelte-218iib"><thead class="bg-gray-50 svelte-218iib"><tr class="svelte-218iib"><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(name())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(priority())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(status())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(owner())}</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase svelte-218iib">${escape_html(eta())}</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`;
      for (let $$index_13 = 0, $$length = each_array_13.length; $$index_13 < $$length; $$index_13++) {
        let control = each_array_13[$$index_13];
        $$payload.out += `<tr class="hover:bg-gray-50 svelte-218iib"><td class="px-3 py-2 text-sm text-gray-900 svelte-218iib">`;
        Anchor($$payload, {
          href: `/applied-controls/${stringify(control.id)}`,
          class: "text-primary-600 hover:text-primary-800 hover:underline",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(control.name)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></td><td class="px-3 py-2 text-sm svelte-218iib">`;
        if (control.priority) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.priority))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
        if (control.status) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="px-2 py-1 rounded text-xs font-medium">${escape_html(safeTranslate(control.status))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">`;
        if (control.owner) {
          $$payload.out += "<!--[-->";
          $$payload.out += `${escape_html(control.owner.str)}`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]--></td><td class="px-3 py-2 text-sm svelte-218iib">${escape_html(control.eta ? formatDateOrDateTime(control.eta) : "--")}</td></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></section>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-I8F9KLch.js.map
