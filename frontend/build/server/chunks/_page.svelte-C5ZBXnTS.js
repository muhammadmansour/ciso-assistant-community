import { p as push, W as ensure_array_like, V as escape_html, T as attr, ab as maybe_selected, Y as spread_props, S as attr_class, X as stringify, Z as attr_style, a as pop } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { cg as riskmatrix1, pb as threatagentfactors2, l5 as vulnerabilityfactors1, RX as businessimpactfactors2, Gg as ignore, pu as technicalimpactfactors2, UB as assessmentvector1, wt as probability, th as risklevel1, fg as impact, sa as scoringassistantnomatrixerror4 } from './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';

function Selector($$payload, $$props) {
  push();
  let { text, id, choices, disabled = false } = $$props;
  let value = 0;
  run(() => {
  });
  const each_array = ensure_array_like(choices);
  $$payload.out += `<div>${escape_html(safeTranslate(text))}</div> <select class="select w-full"${attr("id", id)}${attr("disabled", disabled, true)}>`;
  $$payload.select_value = value;
  $$payload.out += `<!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let text2 = each_array[i];
    $$payload.out += `<option${attr_class(`text-${stringify(i)}`)}${attr("value", i)}${maybe_selected($$payload, i)}>${escape_html(i)}`;
    if (text2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `- ${escape_html(safeTranslate(text2))}`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select>`;
  pop();
}
const forms = {
  threat_agent: [
    {
      id: "skill_level",
      text: "skillLevelText",
      choices: [
        "NA",
        "skillLevelChoice1",
        null,
        "skillLevelChoice2",
        null,
        "skillLevelChoice3",
        "skillLevelChoice4",
        null,
        null,
        "skillLevelChoice5"
      ]
    },
    {
      id: "motive",
      text: "motiveText",
      choices: [
        "NA",
        "motiveChoice1",
        null,
        null,
        "motiveChoice2",
        null,
        null,
        null,
        null,
        "motiveChoice3"
      ]
    },
    {
      id: "opportunity",
      text: "opportunityText",
      choices: [
        "opportunityChoice1",
        null,
        null,
        null,
        "opportunityChoice2",
        null,
        null,
        "opportunityChoice3",
        null,
        "opportunityChoice4"
      ]
    },
    {
      id: "size",
      text: "sizeText",
      choices: [
        "NA",
        null,
        "sizeChoice1",
        null,
        "sizeChoice2",
        "sizeChoice3",
        "sizeChoice4",
        null,
        null,
        "sizeChoice5"
      ]
    }
  ],
  vulnerability: [
    {
      id: "ease_of_discovery",
      text: "easeOfDiscoveryText",
      choices: [
        "NA",
        "easeOfDiscoveryChoice1",
        null,
        "easeOfDiscoveryChoice2",
        null,
        null,
        null,
        "easeOfDiscoveryChoice3",
        null,
        "easeOfDiscoveryChoice4"
      ]
    },
    {
      id: "ease_of_exploit",
      text: "easeOfExploitText",
      choices: [
        "NA",
        "easeOfExploitChoice1",
        null,
        "easeOfExploitChoice2",
        null,
        "easeOfExploitChoice3",
        null,
        null,
        null,
        "easeOfExploitChoice4"
      ]
    },
    {
      id: "awareness",
      text: "awarenessText",
      choices: [
        "NA",
        "awarenessChoice1",
        null,
        null,
        "awarenessChoice2",
        null,
        "awarenessChoice3",
        null,
        null,
        "awarenessChoice4"
      ]
    },
    {
      id: "intrusion_detection",
      text: "intrusionDetectionText",
      choices: [
        "NA",
        "intrusionDetectionChoice1",
        null,
        "intrusionDetectionChoice2",
        null,
        null,
        null,
        null,
        "intrusionDetectionChoice3",
        "intrusionDetectionChoice4"
      ]
    }
  ],
  business_impact: [
    {
      id: "financial_damage",
      text: "financialDamageText",
      choices: [
        "NA",
        "financialDamageChoice1",
        null,
        "financialDamageChoice2",
        null,
        null,
        null,
        "financialDamageChoice3",
        null,
        "financialDamageChoice4"
      ]
    },
    {
      id: "reputation_damage",
      text: "reputationDamageText",
      choices: [
        "NA",
        "reputationDamageChoice1",
        null,
        null,
        "reputationDamageChoice2",
        "reputationDamageChoice3",
        null,
        null,
        null,
        "reputationDamageChoice4"
      ]
    },
    {
      id: "non_compliance",
      text: "nonComplianceText",
      choices: [
        "NA",
        null,
        "nonComplianceChoice1",
        null,
        null,
        "nonComplianceChoice2",
        null,
        "nonComplianceChoice3",
        null,
        "nonComplianceChoice4"
      ]
    },
    {
      id: "privacy_violation",
      text: "privacyViolationText",
      choices: [
        "NA",
        null,
        null,
        "privacyViolationChoice1",
        null,
        "privacyViolationChoice2",
        null,
        "privacyViolationChoice3",
        null,
        "privacyViolationChoice4"
      ]
    }
  ],
  technical_impact: [
    {
      id: "loss_of_confidentiality",
      text: "lossOfConfidentialityText",
      choices: [
        "NA",
        null,
        "lossOfConfidentialityChoice1",
        null,
        null,
        null,
        "lossOfConfidentialityChoice2",
        "lossOfConfidentialityChoice3",
        null,
        "lossOfConfidentialityChoice4"
      ]
    },
    {
      id: "loss_of_integrity",
      text: "lossOfIntegrityText",
      choices: [
        "NA",
        "lossOfIntegrityChoice1",
        null,
        "lossOfIntegrityChoice2",
        null,
        "lossOfIntegrityChoice3",
        null,
        "lossOfIntegrityChoice4",
        null,
        "lossOfIntegrityChoice5"
      ]
    },
    {
      id: "loss_of_availability",
      text: "lossOfAvailabilityText",
      choices: [
        "NA",
        "lossOfAvailabilityChoice1",
        null,
        null,
        null,
        "lossOfAvailabilityChoice2",
        null,
        "lossOfAvailabilityChoice3",
        null,
        "lossOfAvailabilityChoice4"
      ]
    },
    {
      id: "loss_of_accountability",
      text: "lossOfAccountabilityText",
      choices: [
        "NA",
        "lossOfAccountabilityChoice1",
        null,
        null,
        null,
        null,
        null,
        "lossOfAccountabilityChoice2",
        null,
        "lossOfAccountabilityChoice3"
      ]
    }
  ]
};
const round_precision = Math.pow(10, 3);
function average(data) {
  let res = 0;
  for (const value of data) {
    res += value;
  }
  return Math.round(res / data.length * round_precision) / round_precision;
}
function _page($$payload, $$props) {
  push();
  let { data, risk_matrices = data.risk_matrices } = $$props;
  let risk_matrix = risk_matrices[risk_matrix_index] ?? null;
  let is_business_impact_ignored = false;
  let risk_matrix_index = 0;
  let vector = void 0;
  let vector_string = void 0;
  let form_data = {
    threat_agent: [0, 0, 0, 0],
    business_impact: [0, 0, 0, 0],
    vulnerability: [0, 0, 0, 0],
    technical_impact: [0, 0, 0, 0]
  };
  let threat_agent_score = average(form_data.threat_agent);
  let business_impact_score = average(form_data.business_impact);
  let vulnerability_score = average(form_data.vulnerability);
  average(form_data.technical_impact);
  let impact_score = business_impact_score;
  let probability_score = average([threat_agent_score, vulnerability_score]);
  let risk_score = average([impact_score, probability_score]);
  run(() => {
    vector = [
      ...form_data.threat_agent,
      ...form_data.business_impact,
      ...form_data.vulnerability,
      ...form_data.technical_impact
    ];
  });
  run(() => {
    let strings = [];
    for (let i = 0; i < 4; i++) {
      strings.push(vector.slice(4 * i, 4 * (i + 1)).join(""));
    }
    vector_string = strings.join("-");
  });
  function update_scores(risk_score2, risk_matrix2) {
    if (!risk_matrix2) return;
    const probabilityPartitionSize = 10 / risk_matrix2["probability"].length;
    const impactPartitionSize = 10 / risk_matrix2["impact"].length;
    const riskPartitionSize = 10 / risk_matrix2["risk"].length;
    const probability_index = Math.floor(probability_score / probabilityPartitionSize);
    const impact_index = Math.floor(impact_score / impactPartitionSize);
    const risk_index = Math.floor(risk_score2 / riskPartitionSize);
    return {
      probability: risk_matrix2.probability[probability_index],
      impact: risk_matrix2.impact[impact_index],
      risk: risk_matrix2.risk[risk_index]
    };
  }
  let labels = update_scores(risk_score, risk_matrix);
  $$payload.out += `<main class="text-sm h-full flex flex-col">`;
  if (risk_matrix) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(risk_matrices);
    const each_array_1 = ensure_array_like(forms.threat_agent);
    const each_array_2 = ensure_array_like(forms.vulnerability);
    const each_array_3 = ensure_array_like(forms.business_impact);
    const each_array_4 = ensure_array_like(forms.technical_impact);
    $$payload.out += `<div class="mx-auto"><div class="flex flex-col"><p class="text-sm">${escape_html(riskmatrix1())}</p> <select class="select form-input w-fit pr-8">`;
    $$payload.select_value = risk_matrix_index;
    $$payload.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let risk_matrix2 = each_array[index];
      $$payload.out += `<option${attr("value", index)}${maybe_selected($$payload, index)}>${escape_html(risk_matrix2.name)}</option>`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select></div> <div class="grid lg:grid-cols-2"><div><div id="ta_div" class="px-4 py-2 mx-1 my-2 bg-white shadow-sm rounded-sm h-1/2 grid grid-cols-5"><div class="col-span-4 p-2"><!--[-->`;
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      let selector_data = each_array_1[index];
      Selector($$payload, spread_props([selector_data]));
    }
    $$payload.out += `<!--]--></div> <div class="my-auto ml-2 col-span 1 w-full"><div class="shadow-lg bg-indigo-700 px-2 py-4 rounded-xl"><div class="text-gray-100 text-xs">${escape_html(threatagentfactors2())}</div> <div class="font-bold text-white text-lg" id="threat_agent_score">${escape_html(threat_agent_score)}</div></div></div></div> <div id="vf_div" class="px-4 py-2 mx-1 my-2 bg-white shadow-sm rounded-sm h-1/2 grid grid-cols-5"><div class="col-span-4 p-2"><!--[-->`;
    for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
      let selector_data = each_array_2[index];
      Selector($$payload, spread_props([selector_data]));
    }
    $$payload.out += `<!--]--></div> <div class="my-auto ml-2 col-span 1 w-full"><div class="shadow-lg bg-indigo-700 px-2 py-4 rounded-xl"><div class="text-gray-100 text-xs">${escape_html(vulnerabilityfactors1())}</div> <div class="font-bold text-white text-lg" id="vulnerability_score">${escape_html(vulnerability_score)}</div></div></div></div></div> <div class="my-4 lg:my-0"><div id="bi_div"${attr_class(`px-4 py-2 mx-1 my-2 shadow rounded h-1/2 grid grid-cols-5 bg-white ${stringify("bg-white text-black")}`)}><div class="col-span-4 p-2"><!--[-->`;
    for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
      let selector_data = each_array_3[index];
      Selector($$payload, spread_props([
        selector_data,
        { disabled: is_business_impact_ignored }
      ]));
    }
    $$payload.out += `<!--]--></div> <div class="my-auto ml-2 col-span 1 w-full"><div class="shadow-lg bg-indigo-700 px-2 py-4 rounded-xl"><div class="text-gray-100 text-xs">${escape_html(businessimpactfactors2())}</div> <div class="font-bold text-white text-lg" id="business_impact_score">${escape_html(business_impact_score)}</div> <div class="flex flex-row space-x-2 items-center"><input id="ignore_business_impact" type="checkbox" class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"${attr("checked", is_business_impact_ignored, true)}/> <label class="ml-2 text-sm font-medium text-gray-100" for="ignore_business_impact">${escape_html(ignore())}</label></div></div></div></div> <div id="ti_div"${attr_class(`px-4 py-2 mx-1 my-2 bg-white shadow rounded h-1/2 grid grid-cols-5 ${stringify("bg-gray-100 text-gray-400")}`)}><div class="col-span-4 p-2"><!--[-->`;
    for (let index = 0, $$length = each_array_4.length; index < $$length; index++) {
      let selector_data = each_array_4[index];
      Selector($$payload, spread_props([
        selector_data,
        { disabled: !is_business_impact_ignored }
      ]));
    }
    $$payload.out += `<!--]--></div> <div class="my-auto ml-2 col-span 1 w-full"><div class="shadow-lg bg-indigo-700 px-2 py-4 rounded-xl mx-auto"><div class="text-gray-100 text-xs">${escape_html(technicalimpactfactors2())}</div> <div class="font-bold text-white text-lg" id="technical_impact_score">${escape_html("--")}</div></div></div></div></div></div> <div class="p-2 my-8 bg-white rounded-sm shadow-sm"><div class="p-1 m-1 text-xs">${escape_html(assessmentvector1())}: <span id="vector">${escape_html(vector_string)}</span></div> <div class="grid grid-cols-3 grid-rows-1 items-center justify-center"><div class="mx-auto w-full"><div class="bg-cyan-600 p-4 m-2 rounded-lg shadow-lg lg:mx-4"><div class="text-gray-100 font-semibold">${escape_html(probability())}</div> <div><span class="text-xl text-white font-bold" id="probability_label">${escape_html(labels.probability.name)}
									${escape_html(probability_score === 0 ? "--" : probability_score)}</span> <span class="text-white text-xs" id="probability_score"></span></div></div></div> <div class="text-2xl p-2 grid grid-rows-2 grid-cols-3 items-center text-center w-full mb-4" id="score"><div class="text-lg p-1 col-span-3">${escape_html(risklevel1())}</div> <i class="fas fa-arrow-alt-circle-right"></i> <span class="py-2 px-0 font-semibold rounded-sm shadow-sm" id="risk_label"${attr_style(`background-color: ${stringify(labels.risk.hexcolor)}`)}><p class="overflow-clip">${escape_html(labels.risk.name)}</p></span> <i class="fas fa-arrow-alt-circle-left"></i></div> <div class="mx-auto w-full"><div class="bg-cyan-600 p-4 m-2 rounded-lg shadow-lg lg:mx-4"><div class="text-gray-100 font-semibold">${escape_html(impact())}</div> <div><span class="text-xl text-white font-bold" id="impact_label">${escape_html(labels.impact.name)} ${escape_html(impact_score === 0 ? "--" : impact_score)}</span> <span class="text-white text-xs" id="impact_score"></span></div></div></div></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="mx-auto w-full font-bold text-2xl text-center">${escape_html(scoringassistantnomatrixerror4())}</div>`;
  }
  $$payload.out += `<!--]--></main>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C5ZBXnTS.js.map
