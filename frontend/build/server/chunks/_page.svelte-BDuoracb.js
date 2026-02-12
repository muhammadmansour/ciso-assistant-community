import { p as push, W as ensure_array_like, V as escape_html, X as stringify, Z as attr_style, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { U as URL_MODEL_MAP } from './crud-a52dcxCi.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { E2 as lockedassessment1, D_ as lockedriskscenariomessage3, c9 as refid1, fB as name, b3 as description, BU as nodescription1, pR as synctoappliedcontrols3, si as scope, cd as perimeter, c7 as riskassessment1, ce as version, hd as operationalscenario1, cf as status, EC as lastupdate1, cz as owner, ok as treatmentstatus1, cw as assets, cy as threats, bP as vulnerabilities, bL as securityexceptions1, cx as riskorigin1, od as undefined$1, V8 as antecedentscenarios1, C4 as noantecedentscenarios2, bN as inherentrisk1, wt as probability, fg as impact, Fr as inherentrisklevel2, NO as currentrisk1, ho as existingcontrols1, NM as currentrisklevel2, u7 as residualrisk1, I6 as extraappliedcontrols2, u4 as residualrisklevel2, ff as qualifications, qx as strengthofknowledge2, k0 as justification, BK as nojustification1, b6 as labels, e as edit } from './_index-DEXNURl5.js';
import { g as getLocale } from './runtime-BMNt81Gy.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import { b as isDark } from './helpers-Bm9n0CNG.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './string-BMZjP7XX.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './stores-CMqbeBUT.js';
import './index-server-D2ILrLnm.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './Popover-souGUgW5.js';
import './machine.svelte-CWLOiKlV.js';
import './index8-BWS1s5in.js';
import './Form-B7HJg_JV.js';
import './breadcrumbs-CG0qNTv3.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  getModalStore();
  const user = page.data.user;
  const model = URL_MODEL_MAP["risk-scenarios"];
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: data.scenario.perimeter.folder.id
  });
  let color_map = {};
  color_map["--"] = "#A9A9A9";
  data.riskMatrix.risk.forEach((risk, i) => {
    color_map[risk.name] = risk.hexcolor;
  });
  data.riskMatrix.probability.forEach((prob, i) => {
    color_map[prob.name] = prob.hexcolor;
  });
  data.riskMatrix.impact.forEach((impact2, i) => {
    color_map[impact2.name] = impact2.hexcolor;
  });
  let classesCellText = (backgroundHexColor) => {
    return isDark(backgroundHexColor) ? "text-white" : "";
  };
  const each_array = ensure_array_like(data.scenario.owner);
  const each_array_2 = ensure_array_like(data.scenario.qualifications.sort((a, b) => safeTranslate(a.str).localeCompare(safeTranslate(b.str))));
  $$payload.out += `<div class="flex flex-col space-y-3">`;
  if (data.scenario.risk_assessment?.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedriskscenariomessage3())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex flex-row card justify-between px-4 py-2 bg-white shadow-lg"><div class="flex flex-col space-y-4"><span class="flex flex-row space-x-8"><div><p class="text-sm font-semibold text-gray-400">${escape_html(refid1())}</p> <p class="font-semibold">${escape_html(data.scenario.ref_id)}</p></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(name())}</p> <p class="font-semibold">${escape_html(data.scenario.name)}</p></div></span> <div><p class="text-sm font-semibold text-gray-400">${escape_html(description())}</p> `;
  if (data.scenario.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="whitespace-pre-line">`;
    MarkdownRenderer($$payload, { content: data.scenario.description });
    $$payload.out += `<!----></p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic text-sm">${escape_html(nodescription1())}</p>`;
  }
  $$payload.out += `<!--]--></div></div> `;
  if (canEditObject) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col space-y-2 my-auto">`;
    Anchor($$payload, {
      href: `${page.url.pathname}/edit?next=${page.url.pathname}`,
      class: "btn preset-filled-primary-500 h-fit mt-1",
      "data-testid": "edit-button",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2"></i> ${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (!data.scenario.risk_assessment?.is_locked) {
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
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-row space-x-2"><div class="card px-4 py-2 bg-white shadow-lg w-1/2"><h4 class="h4 font-semibold">${escape_html(scope())}</h4> <div class="flex flex-row justify-between"><span><p class="text-sm font-semibold text-gray-400">${escape_html(perimeter())}</p> `;
  Anchor($$payload, {
    class: "anchor text-sm font-semibold",
    href: `/perimeters/${stringify(data.scenario.perimeter.id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(data.scenario.perimeter.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></span> <span><p class="text-sm font-semibold text-gray-400">${escape_html(riskassessment1())}</p> `;
  Anchor($$payload, {
    class: "anchor text-sm font-semibold",
    href: `/risk-assessments/${stringify(data.scenario.risk_assessment.id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(data.scenario.risk_assessment.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></span> <span><p class="text-sm font-semibold text-gray-400">${escape_html(version())}</p> <p class="text-sm font-semibold">${escape_html(data.scenario.version)}</p></span></div> `;
  if (data.scenario.operational_scenario) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-4 pt-4 border-t border-gray-200"><p class="text-sm font-semibold text-gray-400">${escape_html(operationalscenario1())}</p> `;
    Anchor($$payload, {
      class: "anchor text-sm font-semibold",
      href: `/operational-scenarios/${stringify(data.scenario.operational_scenario.id)}`,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(data.scenario.operational_scenario.name)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="card px-4 py-2 bg-white shadow-lg w-1/2"><h4 class="h4 font-semibold">${escape_html(status())}</h4> <div class="flex flex-row justify-between"><div><p class="text-sm font-semibold text-gray-400">${escape_html(lastupdate1())}</p> <p class="text-sm font-semibold">${escape_html(new Date(data.scenario.updated_at).toLocaleString(getLocale()))}</p></div> <div><span class="text-sm text-gray-400 font-semibold">${escape_html(owner())}</span> <ul><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let owner2 = each_array[$$index];
    $$payload.out += `<li class="text-xs font-semibold">${escape_html(owner2.str)}</li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(treatmentstatus1())}</p> <p class="text-sm font-semibold">${escape_html(safeTranslate(data.scenario.treatment))}</p></div></div></div></div> <div class="flex flex-row space-x-2"><div class="card px-4 py-2 bg-white shadow-lg w-1/2 max-h-96 overflow-y-auto"><h4 class="h4 font-semibold">${escape_html(assets())}</h4> `;
  ModelTable($$payload, {
    source: data.tables["assets"],
    hideFilters: true,
    URLModel: "assets",
    baseEndpoint: `/assets?risk_scenarios=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div> <div class="card px-4 py-2 bg-white shadow-lg space-y-4 w-1/2 max-h-96 overflow-y-auto"><h4 class="h4 font-semibold">${escape_html(threats())}</h4> `;
  ModelTable($$payload, {
    source: data.tables["threats"],
    hideFilters: true,
    URLModel: "threats",
    baseEndpoint: `/threats?risk_scenarios=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div></div> <div class="card px-4 py-2 bg-white shadow-lg max-w-full max-h-96 overflow-y-auto"><h4 class="h4 font-semibold">${escape_html(vulnerabilities())}</h4> `;
  ModelTable($$payload, {
    source: data.tables["vulnerabilities"],
    hideFilters: true,
    URLModel: "vulnerabilities",
    baseEndpoint: `/vulnerabilities?risk_scenarios=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div> <div class="card px-4 py-2 bg-white shadow-lg max-w-full max-h-96 overflow-y-auto"><h4 class="h4 font-semibold">${escape_html(securityexceptions1())}</h4> `;
  ModelTable($$payload, {
    source: data.tables["security-exceptions"],
    hideFilters: true,
    URLModel: "security-exceptions",
    baseEndpoint: `/security-exceptions?risk_scenarios=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div> <div class="flex flex-row space-x-2"><div class="card px-4 py-2 bg-white shadow-lg w-1/2"><h4 class="h4 font-semibold">${escape_html(riskorigin1())}</h4> `;
  if (data.scenario.risk_origin) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="font-semibold text-gray-600">${escape_html(safeTranslate(data.scenario.risk_origin.name))}</p> `;
    if (data.scenario.risk_origin.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-sm text-gray-500 mt-1">${escape_html(data.scenario.risk_origin.description)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic text-sm">${escape_html(undefined$1())}</p>`;
  }
  $$payload.out += `<!--]--></div> <div class="card px-4 py-2 bg-white shadow-lg w-1/2 max-h-96 overflow-y-auto"><h4 class="h4 font-semibold">${escape_html(antecedentscenarios1())}</h4> `;
  if (data.scenario.antecedent_scenarios && data.scenario.antecedent_scenarios.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(data.scenario.antecedent_scenarios);
    $$payload.out += `<ul class="space-y-1"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let antecedent = each_array_1[$$index_1];
      $$payload.out += `<li>`;
      Anchor($$payload, {
        class: "anchor text-sm font-semibold",
        href: `/risk-scenarios/${stringify(antecedent.id)}`,
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(antecedent.ref_id ? `${antecedent.ref_id} - ` : "")}${escape_html(antecedent.name)}`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic text-sm">${escape_html(noantecedentscenarios2())}</p>`;
  }
  $$payload.out += `<!--]--></div></div> `;
  if (page.data?.featureflags?.inherent_risk) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-row space-x-4 card px-4 py-2 bg-white shadow-lg justify-between"><div class="flex flex-col w-1/2"><h4 class="h4 font-semibold">${escape_html(inherentrisk1())}</h4></div> <div class="flex flex-row space-x-4 my-auto items-center justify-center w-1/2 h-full"><p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(probability())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.inherent_proba?.name ? color_map[data.scenario.inherent_proba.name] : color_map["--"])}`)}>${escape_html(data.scenario.inherent_proba ? safeTranslate(data.scenario.inherent_proba.name) : "--")}</span></p> <i class="fa-solid fa-xmark mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(impact())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.inherent_impact?.name ? color_map[data.scenario.inherent_impact.name] : color_map["--"])}`)}>${escape_html(data.scenario.inherent_impact ? safeTranslate(data.scenario.inherent_impact.name) : "--")}</span></p> <i class="fa-solid fa-equals mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400 whitespace-nowrap">${escape_html(inherentrisklevel2())}</span> <span${attr_class(`text-sm text-center font-semibold p-2 rounded-md w-20 ${stringify(data.scenario.inherent_level ? classesCellText(data.scenario.inherent_level.hexcolor) : "")}`)}${attr_style(`background-color: ${stringify(data.scenario.inherent_level?.hexcolor || color_map["--"])}`)}>${escape_html(data.scenario.inherent_level ? safeTranslate(data.scenario.inherent_level.name) : "--")}</span></p></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex flex-row space-x-4 card px-4 py-2 bg-white shadow-lg justify-between"><div class="flex flex-col w-1/2"><h4 class="h4 font-semibold">${escape_html(currentrisk1())}</h4> <p class="text-sm font-semibold text-gray-400">${escape_html(existingcontrols1())}</p> `;
  ModelTable($$payload, {
    source: data.tables["risk_scenarios_e"],
    URLModel: "applied-controls",
    baseEndpoint: `/applied-controls?risk_scenarios_e=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div> <div class="flex flex-row space-x-4 my-auto items-center justify-center w-1/2 h-full"><p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(probability())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.current_proba?.name ? color_map[data.scenario.current_proba.name] : color_map["--"])}`)}>${escape_html(data.scenario.current_proba ? safeTranslate(data.scenario.current_proba.name) : "--")}</span></p> <i class="fa-solid fa-xmark mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(impact())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.current_impact?.name ? color_map[data.scenario.current_impact.name] : color_map["--"])}`)}>${escape_html(data.scenario.current_impact ? safeTranslate(data.scenario.current_impact.name) : "--")}</span></p> <i class="fa-solid fa-equals mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400 whitespace-nowrap">${escape_html(currentrisklevel2())}</span> <span${attr_class(`text-sm text-center font-semibold p-2 rounded-md w-20 ${stringify(classesCellText(data.scenario.current_level.hexcolor))}`)}${attr_style(`background-color: ${stringify(data.scenario.current_level.hexcolor)}`)}>${escape_html(safeTranslate(data.scenario.current_level.name))}</span></p></div></div> <div class="flex flex-row space-x-4 card px-4 py-2 bg-white shadow-lg justify-between"><div class="flex flex-col w-1/2"><h4 class="h4 font-semibold">${escape_html(residualrisk1())}</h4> <p class="text-sm font-semibold text-gray-400">${escape_html(extraappliedcontrols2())}</p> `;
  ModelTable($$payload, {
    source: data.tables["risk_scenarios"],
    URLModel: "applied-controls",
    baseEndpoint: `/applied-controls?risk_scenarios=${stringify(page.params.id)}`
  });
  $$payload.out += `<!----></div> <div class="flex flex-row space-x-4 my-auto items-center justify-center w-1/2"><p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(probability())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.residual_proba?.name ? color_map[data.scenario.residual_proba.name] : color_map["--"])}`)}>${escape_html(data.scenario.residual_proba ? safeTranslate(data.scenario.residual_proba.name) : "--")}</span></p> <i class="fa-solid fa-xmark mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400">${escape_html(impact())}</span> <span class="inline-block text-xs font-semibold text-center px-2 py-1 rounded min-w-16"${attr_style(`background-color: ${stringify(data.scenario.residual_impact?.name ? color_map[data.scenario.residual_impact.name] : color_map["--"])}`)}>${escape_html(data.scenario.residual_impact ? safeTranslate(data.scenario.residual_impact.name) : "--")}</span></p> <i class="fa-solid fa-equals mt-5"></i> <p class="flex flex-col"><span class="text-sm font-semibold text-gray-400 whitespace-nowrap">${escape_html(residualrisklevel2())}</span> <span${attr_class(`text-sm text-center font-semibold p-2 rounded-md w-20 ${stringify(classesCellText(data.scenario.residual_level.hexcolor))}`)}${attr_style(`background-color: ${stringify(data.scenario.residual_level.hexcolor)}`)}>${escape_html(safeTranslate(data.scenario.residual_level.name))}</span></p></div></div> <div class="card px-4 py-2 bg-white shadow-lg space-y-2"><div><p class="text-sm font-semibold text-gray-400">${escape_html(qualifications())}</p> <p><span class="font-semibold"><!--[-->`;
  for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
    let qualification = each_array_2[i];
    if (i > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `,`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> ${escape_html(safeTranslate(qualification.str) || undefined$1())}`;
  }
  $$payload.out += `<!--]--></span></p></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(strengthofknowledge2())}</p> <p>`;
  if (data.scenario.strength_of_knowledge.symbol) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(data.scenario.strength_of_knowledge.symbol)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span class="font-semibold">${escape_html(safeTranslate(data.scenario.strength_of_knowledge.name) || undefined$1())}</span></p></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(justification())}</p> <p>`;
  if (data.scenario.justification) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>`;
    MarkdownRenderer($$payload, { content: data.scenario.justification });
    $$payload.out += `<!----></p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic text-sm">${escape_html(nojustification1())}</p>`;
  }
  $$payload.out += `<!--]--></p></div> `;
  if (data.scenario.filtering_labels && data.scenario.filtering_labels.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_3 = ensure_array_like(data.scenario.filtering_labels);
    $$payload.out += `<div><p class="text-sm font-semibold text-gray-400">${escape_html(labels())}</p> <div class="flex flex-wrap gap-2 mt-1"><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let label = each_array_3[$$index_3];
      Anchor($$payload, {
        href: `/filtering-labels/${stringify(label.id)}`,
        class: "anchor",
        children: ($$payload2) => {
          $$payload2.out += `<span class="badge preset-tonal-primary px-2 py-1 rounded text-xs">${escape_html(label.str)}</span>`;
        },
        $$slots: { default: true }
      });
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BDuoracb.js.map
