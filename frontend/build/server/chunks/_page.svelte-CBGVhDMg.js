import { p as push, W as ensure_array_like, T as attr, V as escape_html, X as stringify, S as attr_class, Z as attr_style, a as pop } from './index2-9icAqEyj.js';
import { AM as operationalscenariorefid3, G_ as gobacktoebiosrmstudy5, gj as selected, Bk as notselected1, e as edit, fP as activityone1, JF as ebiosws4_11, C6 as nodescription1, gt as attackpath1, cS as riskorigin1, gq as stakeholders, BD as nostakeholders1, kx as targetobjective1, cT as threats, B6 as objectsnotvisible2, BB as nothreat1, fQ as activitytwo1, JE as ebiosws4_21, kj as justification, BY as nojustification1, gx as likelihood, fV as gravity, tx as risklevel1 } from './_index-D7NdhnXA.js';
import { p as page } from './index3-BwfRm5YV.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { M as ModelTable } from './ModelTable-f2ddGEod.js';
import { c as countMasked } from './related-visibility-ukSq_O7b.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import { U as URL_MODEL_MAP } from './crud-C1TvVbAO.js';
import './runtime-BKo9q3Zd.js';
import './constants-QzmVibOJ.js';
import './breadcrumbs-BA0IMSh1.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './schemas-DwUKC0vK.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './Anchor-u--4IyDz.js';
import './Form-BDbIHs7i.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-Ba0Wju_d.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data } = $$props;
  const operationalScenario = data.data;
  pageTitle.set(operationalscenariorefid3({ refId: operationalScenario.ref_id }));
  let activeActivity = null;
  page.url.searchParams.forEach((value, key) => {
    if (key === "activity" && value === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value === "two") {
      activeActivity = "two";
    } else if (key === "activity" && value === "three") {
      activeActivity = "three";
    }
  });
  let likelihoodPopupOpen = false;
  let gravityPopupOpen = false;
  let riskLevelPopupOpen = false;
  const user = page.data.user;
  const model = URL_MODEL_MAP["operational-scenarios"];
  const canEditObject = (operational_scenarios) => canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: operational_scenarios.folder?.id
  });
  let group = Object.keys(data.relatedModels)[0];
  const each_array = ensure_array_like(operationalScenario.stakeholders);
  $$payload.out += `<div class="card p-4 bg-white shadow-lg"><div class="flex flex-col space-y-4 items-center"><div class="flex items-center justify-between w-full"><a${attr("href", `/ebios-rm/${stringify(operationalScenario.ebios_rm_study.id)}`)} class="flex items-center space-x-2 text-primary-800 hover:text-primary-600"><i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p></a> <div class="flex font-bold text-2xl space-x-2"><span><a class="text-primary-700 hover:text-primary-500"${attr("href", `/ebios-rm/${stringify(operationalScenario.ebios_rm_study.id)}`)}>${escape_html(operationalScenario.ebios_rm_study.str)}</a> - ${escape_html(operationalscenariorefid3({ refId: operationalScenario.ref_id }))}</span> <p class="flex items-center">`;
  if (operationalScenario.is_selected) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="badge bg-green-200 text-green-700">${escape_html(selected())}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="badge bg-red-200 text-red-700">${escape_html(notselected1())}</span>`;
  }
  $$payload.out += `<!--]--></p></div> `;
  if (canEditObject(operationalScenario)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", `${page.url.pathname}/edit?activity=${activeActivity}&next=${page.url.pathname}?activity=${activeActivity}`)} class="btn preset-filled-primary-500 h-fit justify-self-end"><i class="fa-solid fa-pen-to-square mr-2" data-testid="edit-button"></i> ${escape_html(edit())}</a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div id="activityOne"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center justify-center ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</span> <h1${attr_class(`font-bold text-xl ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(ebiosws4_11())}</h1> `;
  if (operationalScenario.operating_modes_description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(operationalScenario.operating_modes_description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(nodescription1())}</p>`;
  }
  $$payload.out += `<!--]--> <div class="flex flex-col space-y-2 items-center"><div class="flex flex-col items-center space-x-2"><span class="font-semibold text-lg text-gray-700"><i class="fa-solid fa-shuffle"></i> ${escape_html(attackpath1())}</span> <p class="text-gray-600">${escape_html(operationalScenario.attack_path.name)}</p> `;
  if (operationalScenario.attack_path.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(operationalScenario.attack_path.description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="grid grid-cols-3 gap-12 items-center"><div class="flex flex-col space-y-4 p-4 bg-red-200 border-red-400 border rounded-md shadow-xs text-center"><h4 class="font-semibold text-gray-600">${escape_html(riskorigin1())}</h4> <i class="fa-solid fa-skull-crossbones text-3xl"></i> <p class="badge text-white bg-red-500 capitalize">${escape_html(safeTranslate(operationalScenario.ro_to.risk_origin.str))}</p></div> <div class="flex flex-col space-y-4 p-4 bg-violet-200 border-violet-400 border rounded-md shadow-xs text-center"><h4 class="font-semibold text-gray-600">${escape_html(stakeholders())}</h4> <i class="fa-solid fa-globe text-3xl"></i> `;
  if (each_array.length !== 0) {
    $$payload.out += "<!--[-->";
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stakeholder = each_array[$$index];
      $$payload.out += `<p class="badge text-white bg-violet-500"><a class="anchor text-white"${attr("href", `/stakeholders/${stringify(stakeholder.id)}`)}>${escape_html(stakeholder.str)}</a></p>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-500 italic">${escape_html(nostakeholders1())}</p>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-col space-y-4 p-4 bg-blue-200 border-blue-400 border rounded-md shadow-xs text-center"><h4 class="font-semibold text-gray-600">${escape_html(targetobjective1())}</h4> <i class="fa-solid fa-bullseye text-3xl"></i> <p class="badge text-white bg-blue-500">${escape_html(operationalScenario.ro_to.target_objective)}</p></div></div></div> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-biohazard text-red-500"></i> <span>${escape_html(threats())}</span></h3> `;
  if (operationalScenario.threats && countMasked(operationalScenario.threats) > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert variant-soft-warning mb-2"><i class="fa-solid fa-triangle-exclamation"></i> <span>${escape_html(objectsnotvisible2({
      count: countMasked(operationalScenario.threats)
    }))}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <ul class="list-disc list-inside text-gray-600">`;
  if (operationalScenario.threats?.length) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(operationalScenario.threats);
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let threat = each_array_1[$$index_1];
      if (threat.id && threat.str) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<li><a class="anchor"${attr("href", `/threats/${stringify(threat.id)}`)}>${escape_html(threat.str)}</a></li>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<li>${escape_html(nothreat1())}</li>`;
  }
  $$payload.out += `<!--]--></ul></div> `;
  if (Object.keys(data.relatedModels).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card shadow-lg mt-8 bg-white w-full">`;
    {
      let list = function($$payload2) {
        const each_array_2 = ensure_array_like(Object.entries(data.relatedModels));
        $$payload2.out += `<!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let [urlmodel, model2] = each_array_2[$$index_2];
          $$payload2.out += `<!---->`;
          Tabs.Control($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<!---->${escape_html(safeTranslate(model2.info.localNamePlural))} `;
              if (model2.table.body.length > 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<span class="badge preset-tonal-secondary">${escape_html(model2.table.body.length)}</span>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      }, content = function($$payload2) {
        const each_array_3 = ensure_array_like(Object.entries(data.relatedModels));
        $$payload2.out += `<!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let [urlmodel, model2] = each_array_3[$$index_3];
          $$payload2.out += `<!---->`;
          Tabs.Panel($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<div class="flex flex-row justify-between px-4 py-2"><h4 class="font-semibold lowercase capitalize-first my-auto">${escape_html(safeTranslate("associated-" + model2.info.localNamePlural))}</h4></div> `;
              if (model2.table) {
                $$payload3.out += "<!--[-->";
                {
                  let addButton = function($$payload4) {
                    $$payload4.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block border-e p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + model2.info.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
                  };
                  ModelTable($$payload3, {
                    source: model2.table,
                    deleteForm: model2.deleteForm,
                    URLModel: urlmodel,
                    baseEndpoint: `/operating-modes?operational_scenario=${stringify(page.params.id)}`,
                    addButton,
                    $$slots: { addButton: true }
                  });
                }
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Tabs($$payload, {
        value: group,
        onValueChange: (e) => {
          group = e.value;
        },
        listJustify: "justify-center",
        list,
        content,
        $$slots: { list: true, content: true }
      });
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div id="activityTwo"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</span> <h1${attr_class(`font-bold text-xl ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(ebiosws4_21())}</h1> <div class="flex items-center w-full p-4 bg-gray-50 border rounded-md shadow-xs space-x-4 justify-between"><div${attr_style(`background-color: ${stringify(operationalScenario.likelihood.hexcolor)}`)} class="flex flex-col items-center justify-center border rounded-md p-4 font-semibold w-full">`;
  {
    let trigger = function($$payload2) {
      $$payload2.out += `<h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2">`;
      if (operationalScenario.likelihood.description) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<i class="fa-solid fa-dice text-black opacity-75"></i>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <span>${escape_html(likelihood())}</span></h3> <span>${escape_html(operationalScenario.likelihood.name)}</span> <i class="fa-solid fa-circle-info cursor-pointer hover:opacity-70"></i>`;
    }, content = function($$payload2) {
      $$payload2.out += `<div class="card bg-black text-gray-200 p-4 z-20"${attr_style(`color: ${stringify(operationalScenario.likelihood.hexcolor)}`)}><p data-testid="likelihood-description" class="font-semibold">${escape_html(operationalScenario.likelihood.description)}</p> <div class="arrow bg-black"></div></div>`;
    };
    Popover($$payload, {
      open: likelihoodPopupOpen,
      onOpenChange: (e) => likelihoodPopupOpen = operationalScenario.likelihood.description ? e.open : false,
      positioning: { placement: "bottom" },
      zIndex: "100",
      contentBase: "max-w-sm",
      trigger,
      content,
      $$slots: { trigger: true, content: true }
    });
  }
  $$payload.out += `<!----></div> <i class="fa-solid fa-xmark"></i> <div${attr_style(`background-color: ${stringify(operationalScenario.gravity.hexcolor)}`)} class="flex flex-col items-center justify-center border rounded-md p-4 font-semibold w-full">`;
  {
    let trigger = function($$payload2) {
      $$payload2.out += `<h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2">`;
      if (operationalScenario.gravity.description) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<i class="fa-solid fa-bomb text-black opacity-75"></i>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <span>${escape_html(gravity())}</span></h3> <span>${escape_html(operationalScenario.gravity.name)}</span> <i class="fa-solid fa-circle-info cursor-pointer hover:opacity-70"></i>`;
    }, content = function($$payload2) {
      $$payload2.out += `<div class="card bg-black text-gray-200 p-4 z-20"${attr_style(`color: ${stringify(operationalScenario.gravity.hexcolor)}`)}><p data-testid="gravity-description" class="font-semibold">${escape_html(operationalScenario.gravity.description)}</p> <div class="arrow bg-black"></div></div>`;
    };
    Popover($$payload, {
      open: gravityPopupOpen,
      onOpenChange: (e) => gravityPopupOpen = operationalScenario.gravity.description ? e.open : false,
      positioning: { placement: "bottom" },
      zIndex: "100",
      contentBase: "max-w-sm",
      trigger,
      content,
      $$slots: { trigger: true, content: true }
    });
  }
  $$payload.out += `<!----></div> <i class="fa-solid fa-equals"></i> <div${attr_style(`background-color: ${stringify(operationalScenario.risk_level.hexcolor)}`)} class="flex flex-col items-center justify-center border rounded-md p-4 font-semibold w-full">`;
  {
    let trigger = function($$payload2) {
      $$payload2.out += `<h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2">`;
      if (operationalScenario.risk_level.description) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<i class="fa-solid fa-circle-radiation text-black opacity-75"></i>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <span>${escape_html(risklevel1())}</span></h3> <span>${escape_html(operationalScenario.risk_level.name)}</span> <i class="fa-solid fa-circle-info cursor-pointer hover:opacity-70"></i>`;
    }, content = function($$payload2) {
      $$payload2.out += `<div class="card bg-black text-gray-200 p-4 z-20"${attr_style(`color: ${stringify(operationalScenario.risk_level.hexcolor)}`)}><p data-testid="riskLevel-description" class="font-semibold">${escape_html(operationalScenario.risk_level.description)}</p> <div class="arrow bg-black"></div></div>`;
    };
    Popover($$payload, {
      open: riskLevelPopupOpen,
      onOpenChange: (e) => riskLevelPopupOpen = operationalScenario.risk_level.description ? e.open : false,
      positioning: { placement: "bottom" },
      zIndex: "100",
      contentBase: "max-w-sm",
      trigger,
      content,
      $$slots: { trigger: true, content: true }
    });
  }
  $$payload.out += `<!----></div></div> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-eye text-gray-500 opacity-75"></i> <span>${escape_html(justification())}</span></h3> `;
  if (operationalScenario.justification) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(operationalScenario.justification)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(nojustification1())}</p>`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CBGVhDMg.js.map
