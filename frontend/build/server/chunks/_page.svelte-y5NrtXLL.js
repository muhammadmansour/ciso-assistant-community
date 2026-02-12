import { p as push, W as ensure_array_like, V as escape_html, Z as attr_style, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import './client-DqP3yP6V.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { g as getToastStore } from './stores4-JOwRngIp.js';
import { Ot as converttoquantitativerisk3, Os as converttoquantitativeriskdescription4, qN as sourceriskassessment2, fB as name, c5 as domain, cg as riskmatrix1, ws as probabilityanchoring1, wr as probabilityanchoringdescription2, ux as requirements, wj as probabilityrequirements1, Gd as impactanchoring1, Gc as impactanchoringdescription2, G5 as impactrequirements1, ki as lossthreshold1, Do as lossthresholddescription2, Ou as converttoquantitative2, b4 as cancel } from './_index-DEXNURl5.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './runtime-BMNt81Gy.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  getToastStore();
  const risk_assessment = data.risk_assessment;
  const parsedMatrix = JSON.parse(risk_assessment.risk_matrix.json_definition);
  const probabilityOptions = parsedMatrix.probability;
  const impactOptions = parsedMatrix.impact;
  let probabilityAnchors = {};
  let impactAnchors = {};
  let lossThreshold = "";
  let isSubmitting = false;
  probabilityOptions.forEach((_, index) => {
    probabilityAnchors[index] = "";
  });
  impactOptions.forEach((_, index) => {
    impactAnchors[index] = "";
  });
  const each_array = ensure_array_like(probabilityOptions);
  const each_array_1 = ensure_array_like(impactOptions);
  $$payload.out += `<main class="grow main relative">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="card bg-white p-6 m-4 shadow-sm"><div class="mb-6"><h2 class="text-2xl font-bold">${escape_html(converttoquantitativerisk3())}</h2> <p class="text-gray-600 mt-2">${escape_html(converttoquantitativeriskdescription4())}</p></div> <div class="space-y-6"><div class="p-4 bg-gray-50 rounded-lg"><h3 class="font-semibold mb-2">${escape_html(sourceriskassessment2())}</h3> <p class="text-sm"><span class="font-medium">${escape_html(name())}:</span> ${escape_html(risk_assessment.name)}</p> <p class="text-sm"><span class="font-medium">${escape_html(domain())}:</span> ${escape_html(risk_assessment.folder.str)}</p> <p class="text-sm"><span class="font-medium">${escape_html(riskmatrix1())}:</span> ${escape_html(risk_assessment.risk_matrix.name)}</p></div> <div class="space-y-4"><h3 class="text-lg font-semibold">${escape_html(probabilityanchoring1())}</h3> <p class="text-sm text-gray-600">${escape_html(probabilityanchoringdescription2())}</p> <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start space-x-2"><i class="fa-solid fa-info-circle mt-0.5"></i> <div><strong>${escape_html(requirements())}</strong> ${escape_html(probabilityrequirements1())}</div></div> <div class="space-y-3 max-w-2xl"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let prob = each_array[index];
    $$payload.out += `<div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200"><div class="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">${escape_html(index + 1)}</div> `;
    if (prob.hexcolor) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-6 h-6 rounded border border-gray-300"${attr_style(`background-color: ${stringify(prob.hexcolor)};`)}${attr("title", `${stringify(prob.name)} color`)}></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label class="flex-1 font-medium text-sm"${attr("for", `prob-${stringify(index)}`)}>${escape_html(prob.name)} `;
    if (prob.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-xs text-gray-500 block mt-1">${escape_html(prob.description)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></label> <input${attr("id", `prob-${stringify(index)}`)} type="number" step="0.1" min="0.1" max="99.9"${attr("value", probabilityAnchors[index])} class="input w-32" placeholder="0 - 100 %" required/></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="space-y-4"><h3 class="text-lg font-semibold">${escape_html(impactanchoring1())}</h3> <p class="text-sm text-gray-600">${escape_html(impactanchoringdescription2())}</p> <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start space-x-2"><i class="fa-solid fa-info-circle mt-0.5"></i> <div><strong>${escape_html(requirements())}</strong> ${escape_html(impactrequirements1())}</div></div> <div class="space-y-3 max-w-2xl"><!--[-->`;
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    let impact = each_array_1[index];
    $$payload.out += `<div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200"><div class="flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-full font-semibold text-sm">${escape_html(index + 1)}</div> `;
    if (impact.hexcolor) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="w-6 h-6 rounded border border-gray-300"${attr_style(`background-color: ${stringify(impact.hexcolor)};`)}${attr("title", `${stringify(impact.name)} color`)}></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label class="flex-1 font-medium text-sm"${attr("for", `impact-${stringify(index)}`)}>${escape_html(impact.name)} `;
    if (impact.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-xs text-gray-500 block mt-1">${escape_html(impact.description)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></label> <input${attr("id", `impact-${stringify(index)}`)} type="number" step="1000" min="1"${attr("value", impactAnchors[index])} class="input w-40" placeholder="e.g., 25000" required/></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold">${escape_html(lossthreshold1())}</h3> <p class="text-sm text-gray-600">${escape_html(lossthresholddescription2())}</p> <input type="number" step="1000" min="1"${attr("value", lossThreshold)} class="input max-w-md" placeholder="e.g., 100000" required/></div> <form method="POST"><input type="hidden" name="data" value=""/> <div class="flex space-x-4 pt-4 border-t"><button type="submit" class="btn preset-filled-primary-500"${attr("disabled", isSubmitting, true)}>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<i class="fa-solid fa-exchange-alt mr-2"></i> ${escape_html(converttoquantitative2())}`;
  }
  $$payload.out += `<!--]--></button> <button type="button" class="btn preset-outlined"${attr("disabled", isSubmitting, true)}><i class="fa-solid fa-arrow-left mr-2"></i> ${escape_html(cancel())}</button></div></form></div></div></main>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-y5NrtXLL.js.map
