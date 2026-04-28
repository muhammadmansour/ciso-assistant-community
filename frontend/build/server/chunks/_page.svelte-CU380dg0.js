import { p as push, W as ensure_array_like, V as escape_html, Z as attr_style, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';
import { D as DonutChart } from './DonutChart-pNoLovcv.js';
import { B as BarChart } from './BarChart-cPYkEv7y.js';
import { kJ as yourselection1, Pa as composerhint1, P9 as composertitle1, P8 as composertitleplural2, NX as currentrisklevelperscenario4, qS as statusofassociatedmeasures3, ui as residualrisklevelperscenario4, Ho as fortheselectedscope3, oq as untreatedriskscenarios2, YC as acceptedriskscenarios2, t_ as reviewneeded1, A_ as ok, FQ as inconsistenciesfoundcomposer2, Oe as current, uA as residual, E$ as jumptoriskassessment3 } from './_index-CqZWReca.js';
import './i18n-DuIONS9Q.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let riskData = { ...data };
  riskData.risk_assessment_objects.forEach((risk_assessment) => {
    risk_assessment.show = false;
  });
  const each_array = ensure_array_like(riskData.riskscenarios.untreated);
  const each_array_1 = ensure_array_like(riskData.riskscenarios.accepted);
  const each_array_2 = ensure_array_like(riskData.risk_assessment_objects);
  $$payload.out += `<div class="flex flex-col space-y-4 p-2"><div><div class="px-2 mx-2 font-semibold text-xl">${escape_html(yourselection1())}</div> <div class="px-2 mx-2 text-sm"><i class="fa-solid fa-info-circle mr-2"></i>${escape_html(composerhint1())}</div></div> <div class="card p-4 bg-white shadow-sm"><div class="p-2 font-semibold text-lg">${escape_html(riskData.risk_assessment_objects.length <= 1 ? composertitle1() : composertitleplural2({
    number: riskData.risk_assessment_objects.length
  }))}:</div> <div class="flex space-x-2"><div class="w-1/3"><div><div class="p-2 text-sm font-semibold">${escape_html(currentrisklevelperscenario4())}</div> <div class="items-center h-96">`;
  DonutChart($$payload, {
    name: "current_risk_level",
    s_label: currentrisklevelperscenario4(),
    values: riskData.current_level,
    colors: riskData.current_level.map((object) => object.color)
  });
  $$payload.out += `<!----></div></div></div> <div class="w-1/3"><div class="p-2 text-sm font-semibold">${escape_html(statusofassociatedmeasures3())}</div> <div><div class="items-center justify-center h-96">`;
  BarChart($$payload, {
    name: "composer",
    labels: riskData.applied_control_status.labels,
    values: riskData.applied_control_status.values
  });
  $$payload.out += `<!----></div></div></div> <div class="w-1/3"><div class="p-2 text-sm font-semibold">${escape_html(residualrisklevelperscenario4())}</div> <div class="items-center h-96">`;
  DonutChart($$payload, {
    name: "residual_risk_level",
    s_label: residualrisklevelperscenario4(),
    values: riskData.residual_level,
    colors: riskData.residual_level.map((object) => object.color)
  });
  $$payload.out += `<!----></div></div></div> <div class="bg-zinc-100 shadow-sm rounded-sm p-3 flex flex-col space-y-2"><div><i class="far fa-lightbulb mr-1"></i> <span class="font-semibold">${escape_html(fortheselectedscope3())}:</span></div> <ul class="list-disc px-6"><li>${escape_html(untreatedriskscenarios2({
    count: riskData.counters.untreated,
    s: riskData.counters.untreated > 1 ? "s" : ""
  }))} <ul class="list-circle ml-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let scenario = each_array[$$index];
    $$payload.out += `<li>${escape_html(scenario.name)}</li>`;
  }
  $$payload.out += `<!--]--></ul></li> <li>${escape_html(acceptedriskscenarios2({
    count: riskData.counters.accepted,
    s: riskData.counters.accepted > 1 ? "s" : ""
  }))} <ul class="list-circle ml-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let scenario = each_array_1[$$index_1];
    $$payload.out += `<li>${escape_html(scenario.name)}</li>`;
  }
  $$payload.out += `<!--]--></ul></li></ul></div></div> <div class="flex flex-col space-y-2"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    let item = each_array_2[$$index_3];
    $$payload.out += `<div><div class="card bg-white overflow-hidden shadow-sm" id="headingOne"><div class="flex flex-row space-x-4 px-8 py-4 w-full hover:bg-gray-100 cursor-pointer items-center" role="button" tabindex="0"><div class="text-gray-700">`;
    if (item.show) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fas fa-angle-up"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<i class="fas fa-angle-down"></i>`;
    }
    $$payload.out += `<!--]--></div> <button class="text-gray-700 font-semibold focus:outline-hidden" type="button">${escape_html(item.risk_assessment.perimeter.str)}/${escape_html(item.risk_assessment.name)}</button> <div>`;
    if (item.risk_assessment.quality_check.count > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-xs px-2 py-1 rounded-sm bg-orange-200 shadow-sm">${escape_html(reviewneeded1())}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs px-2 py-1 rounded-sm bg-green-200 shadow-sm">${escape_html(ok())}</span>`;
    }
    $$payload.out += `<!--]--></div></div> `;
    if (item.show) {
      $$payload.out += "<!--[-->";
      const each_array_3 = ensure_array_like(item.synth_table);
      $$payload.out += `<div class="border-t px-10 py-4 bg-white flex flex-row space-x-4"><div><div class="pb-2">`;
      if (item.risk_assessment.quality_check.count > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `➡️ <span class="text-sm">${escape_html(inconsistenciesfoundcomposer2({
          count: item.risk_assessment.quality_check.count,
          s: item.risk_assessment.quality_check.count > 1 ? "s" : "",
          plural: item.risk_assessment.quality_check.count > 1 ? "ies" : "y"
        }))} <a class="simple-link hover:underline visited:text-indigo-600" href="/x-rays">x-rays</a></span>.`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <div><table class="border border-collapse my-2 p-2 rounded-sm"><thead><tr><th class="border p-2 bg-gray-200"></th><th class="border p-2 bg-gray-200">${escape_html(current())}</th><th class="border p-2 bg-gray-200">${escape_html(residual())}</th></tr></thead><tbody><!--[-->`;
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let lvl = each_array_3[$$index_2];
        $$payload.out += `<tr><td class="border p-2"${attr_style(`background-color: ${stringify(lvl.color)}`)}>${escape_html(lvl.lvl)}</td><td class="border p-2 text-center">${escape_html(lvl.current)}</td><td class="border p-2 text-center">${escape_html(lvl.residual)}</td></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table></div> <div><a class="text-indigo-800 hover:text-indigo-600 py-2 my-2"${attr("href", `/risk-assessments/${stringify(item.risk_assessment.id)}/`)}><i class="fas fa-external-link-square-alt"></i> ${escape_html(jumptoriskassessment3())}</a></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CU380dg0.js.map
