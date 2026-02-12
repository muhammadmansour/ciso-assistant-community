import { p as push, W as ensure_array_like, V as escape_html, X as stringify, a as pop, T as attr } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { E2 as lockedassessment1, E1 as lockedassessmentmessage2, c9 as refid1, cf as status, ck as authors, cm as reviewers, O6 as createdat1, o0 as updatedat1, cg as riskmatrix1, cu as ebiosrmstudy2, b3 as description, z1 as powerups1, Kg as duplicate, pR as synctoappliedcontrols3, uQ as requestvalidation1, SG as associatedriskscenarios2, ta as riskmatrixview2, bN as inherentrisk1, NO as currentrisk1, u7 as residualrisk1, e as edit, Y5 as actionplan1, Ou as converttoquantitative2, c7 as riskassessment1, UI as aspdf3, UK as ascsv3, UG as asxlsx4, Ih as exportbutton1, Wg as addriskscenario2 } from './_index-DEXNURl5.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { U as URL_MODEL_MAP, g as getModelInfo } from './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-souGUgW5.js';
import { g as getLocale } from './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './schemas-BcDBvyDd.js';
import './stores-CMqbeBUT.js';
import './breadcrumbs-CG0qNTv3.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import { R as RiskMatrix } from './RiskMatrix-DTKXKvL-.js';
import { R as RiskScenarioItem } from './RiskScenarioItem-D3SOJ7CX.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-CbPSKmze.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './legacy-server-DMdb6ZTL.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './machine.svelte-CWLOiKlV.js';
import './index8-BWS1s5in.js';
import './shared-server-BU2DVf8Q.js';
import './Form-B7HJg_JV.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';
import './Tooltip-DrjF8lR0.js';
import './index5-C1_XlIn1.js';
import './Dropdown-7WWj3QLi.js';
import './index4-B6qGV9uj.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let exportPopupOpen = false;
  const showRisks = true;
  const useBubbles = data.useBubbles;
  const risk_assessment = data.risk_assessment;
  getModalStore();
  const user = page.data.user;
  const model = URL_MODEL_MAP["risk-assessments"];
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: risk_assessment.folder.id
  });
  const buildRiskCluster = (scenarios, risk_matrix, risk) => {
    const parsedRiskMatrix = JSON.parse(risk_matrix.json_definition);
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
  const currentCluster = buildRiskCluster(risk_assessment.risk_scenarios, risk_assessment.risk_matrix, "current");
  const residualCluster = buildRiskCluster(risk_assessment.risk_scenarios, risk_assessment.risk_matrix, "residual");
  let fields = [
    "ref_id",
    "name",
    "threats",
    ...page.data?.featureflags?.inherent_risk ? ["inherent_level"] : [],
    "existing_applied_controls",
    "current_level",
    "within_tolerance",
    "applied_controls",
    "residual_level"
  ];
  const each_array = ensure_array_like(risk_assessment.authors);
  const each_array_1 = ensure_array_like(risk_assessment.reviewers);
  $$payload.out += `<main class="grow main"><div>`;
  if (risk_assessment.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mx-4 mt-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedassessmentmessage2())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="card bg-white p-4 m-4 shadow-sm flex space-x-2 relative"><div class="container w-1/3"><div id="name" class="text-lg font-semibold" data-testid="name-field-value">${escape_html(risk_assessment.perimeter.str)}/${escape_html(risk_assessment.name)} - ${escape_html(risk_assessment.version)}</div> <br/> <div class="text-sm"><ul class="leading-loose"><li><span class="font-semibold">${escape_html(refid1())}:</span> ${escape_html(risk_assessment.ref_id ?? "--")}</li> <li><span class="font-semibold">${escape_html(status())}:</span> ${escape_html(!risk_assessment.status ? "--" : safeTranslate(risk_assessment.status))}</li> <li><span class="font-semibold">${escape_html(authors())}:</span> <ul><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let author = each_array[$$index];
    $$payload.out += `<li>${escape_html(author.str)}</li>`;
  }
  $$payload.out += `<!--]--></ul></li> <li><span class="font-semibold">${escape_html(reviewers())}:</span> <ul><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let reviewer = each_array_1[$$index_1];
    $$payload.out += `<li>${escape_html(reviewer.str)}</li>`;
  }
  $$payload.out += `<!--]--></ul></li> <li><span class="font-semibold">${escape_html(createdat1())}:</span> ${escape_html(new Date(risk_assessment.created_at).toLocaleString(getLocale()))}</li> <li><span class="font-semibold">${escape_html(updatedat1())}:</span> ${escape_html(new Date(risk_assessment.updated_at).toLocaleString(getLocale()))}</li></ul></div> <br/> `;
  if (page.data?.featureflags?.validation_flows) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      ValidationFlowsSection($$payload, {
        validationFlows: risk_assessment.validation_flows
      });
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="container w-2/3"><div class="text-sm"><span class="font-semibold" data-testid="risk-matrix-field-title">${escape_html(riskmatrix1())}:</span> `;
  Anchor($$payload, {
    href: `/risk-matrices/${stringify(risk_assessment.risk_matrix.id)}`,
    class: "anchor",
    "data-testid": "risk-matrix-field-value",
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(risk_assessment.risk_matrix.name)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <br/> `;
  if (risk_assessment.ebios_rm_study) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-sm"><span class="font-semibold" data-testid="ebios-rm-field-title">${escape_html(ebiosrmstudy2())}:</span> `;
    Anchor($$payload, {
      href: `/ebios-rm/${stringify(risk_assessment.ebios_rm_study.id)}`,
      class: "anchor",
      "data-testid": "ebios-rm-field-value",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(risk_assessment.ebios_rm_study.name)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div> <br/>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="text-sm"><span class="font-semibold" data-testid="description-field-title">${escape_html(description())}:</span></div> <div class="text-sm" data-testid="description-field-value">`;
  MarkdownRenderer($$payload, { content: risk_assessment.description });
  $$payload.out += `<!----></div></div> <div class="flex flex-col space-y-2 ml-4"><div class="flex flex-row space-x-2">`;
  {
    let trigger = function($$payload2) {
      $$payload2.out += `<span data-testid="export-button"><i class="fa-solid fa-download mr-2"></i>${escape_html(exportbutton1())}</span>`;
    }, content = function($$payload2) {
      $$payload2.out += `<div class="card whitespace-nowrap bg-white py-2 w-fit shadow-lg space-y-1"><p class="block px-4 py-2 text-sm text-gray-800">${escape_html(riskassessment1())}</p> <a${attr("href", `/risk-assessments/${stringify(risk_assessment.id)}/export/pdf`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(aspdf3())}</a> <a${attr("href", `/risk-assessments/${stringify(risk_assessment.id)}/export/csv`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(ascsv3())}</a> <a${attr("href", `/risk-assessments/${stringify(risk_assessment.id)}/export/xlsx`)} class="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">... ${escape_html(asxlsx4())}</a> <p class="block px-4 py-2 text-sm text-gray-800">${escape_html(actionplan1())}</p> <a${attr("href", `/risk-assessments/${stringify(risk_assessment.id)}/action-plan/export/pdf`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(aspdf3())}</a> <a${attr("href", `/risk-assessments/${stringify(risk_assessment.id)}/action-plan/export/excel`)} class="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">... ${escape_html(asxlsx4())}</a></div>`;
    };
    Popover($$payload, {
      open: exportPopupOpen,
      onOpenChange: (e) => exportPopupOpen = e.open,
      triggerClasses: "btn preset-filled-primary-500 w-full",
      trigger,
      content,
      $$slots: { trigger: true, content: true }
    });
  }
  $$payload.out += `<!----> `;
  if (canEditObject) {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href: `/risk-assessments/${stringify(risk_assessment.id)}/edit?next=/risk-assessments/${stringify(risk_assessment.id)}`,
      label: edit(),
      class: "btn preset-filled-primary-500 w-full",
      "data-testid": "edit-button",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-edit mr-2"></i> ${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  Anchor($$payload, {
    label: actionplan1(),
    href: `/risk-assessments/${stringify(risk_assessment.id)}/action-plan`,
    class: "btn preset-filled-primary-500",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-heart-pulse mr-2"></i>${escape_html(actionplan1())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <span class="pt-4 font-light text-sm">${escape_html(powerups1())}</span> <button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm" data-testid="duplicate-button"><i class="fa-solid fa-copy mr-2"></i> ${escape_html(duplicate())}</button> `;
  if (!risk_assessment?.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit"><span class="mr-2">`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<i class="fa-solid fa-arrows-rotate mr-2"></i>`;
    }
    $$payload.out += `<!--]--></span> ${escape_html(synctoappliedcontrols3())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  Anchor($$payload, {
    href: `/risk-assessments/${stringify(risk_assessment.id)}/convert-to-quantitative`,
    label: converttoquantitative2(),
    class: "btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-calculator mr-2"></i> ${escape_html(converttoquantitative2())}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  if (!risk_assessment?.is_locked && page.data?.featureflags?.validation_flows) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm" data-testid="request-validation-button"><i class="fa-solid fa-check-circle mr-2"></i> ${escape_html(requestvalidation1())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div> <div class="card m-4 p-4 shadow-sm bg-white"><div class="bg-white"><div class="flex flex-row justify-between"><h4 class="text-lg font-semibold lowercase capitalize-first my-auto">${escape_html(associatedriskscenarios2())}</h4></div> `;
  {
    let addButton = function($$payload2) {
      if (!risk_assessment.is_locked) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button class="btn preset-filled-primary-500 self-end my-auto"><i class="fa-solid fa-plus mr-2 lowercase"></i> ${escape_html(addriskscenario2())}</button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    };
    ModelTable($$payload, {
      source: data.scenariosTable,
      deleteForm: data.scenarioDeleteForm,
      model: getModelInfo("risk-scenarios"),
      URLModel: "risk-scenarios",
      search: false,
      baseEndpoint: `/risk-scenarios?risk_assessment=${stringify(risk_assessment.id)}`,
      folderId: data.risk_assessment.folder.id,
      fields,
      disableCreate: risk_assessment.is_locked,
      disableEdit: risk_assessment.is_locked,
      disableDelete: risk_assessment.is_locked,
      addButton,
      $$slots: { addButton: true }
    });
  }
  $$payload.out += `<!----></div></div> <div class="card m-4 p-4 shadow-sm bg-white page-break"><div class="text-lg font-semibold">${escape_html(riskmatrixview2())}</div> <div class="flex flex-wrap justify-between gap-8 [&amp;>div]:basis-xl [&amp;>div]:grow">`;
  if (page.data?.featureflags?.inherent_risk) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div><h3 class="font-bold p-2 m-2 text-lg text-center">${escape_html(inherentrisk1())}</h3> `;
    RiskMatrix($$payload, {
      riskMatrix: risk_assessment.risk_matrix,
      matrixName: "inherent",
      data: buildRiskCluster(risk_assessment.risk_scenarios, risk_assessment.risk_matrix, "inherent"),
      dataItemComponent: RiskScenarioItem,
      useBubbles
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div><h3 class="font-bold p-2 m-2 text-lg text-center">${escape_html(currentrisk1())}</h3> `;
  RiskMatrix($$payload, {
    riskMatrix: risk_assessment.risk_matrix,
    matrixName: "current",
    data: currentCluster,
    dataItemComponent: RiskScenarioItem,
    useBubbles
  });
  $$payload.out += `<!----></div> <div><h3 class="font-bold p-2 m-2 text-lg text-center">${escape_html(residualrisk1())}</h3> `;
  RiskMatrix($$payload, {
    riskMatrix: risk_assessment.risk_matrix,
    matrixName: "residual",
    data: residualCluster,
    dataItemComponent: RiskScenarioItem,
    showLegend: showRisks,
    useBubbles
  });
  $$payload.out += `<!----></div></div></div></main>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dza7Jn5i.js.map
