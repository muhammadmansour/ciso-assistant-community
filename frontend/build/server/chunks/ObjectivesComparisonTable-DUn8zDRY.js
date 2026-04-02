import { p as push, S as attr_class, V as escape_html, X as stringify, W as ensure_array_like, a as pop } from './index2-9icAqEyj.js';
import { Ba as objective, S1 as capability, VF as alignment, C9 as nodataavailable2 } from './_index-Syqrsmaf.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { S as SECURITY_OBJECTIVE_SCALE_MAP } from './constants-QzmVibOJ.js';
import { p as page } from './index3-BwfRm5YV.js';

function ObjectivesComparisonTable($$payload, $$props) {
  push();
  let {
    comparisons,
    title,
    icon,
    uppercaseLabels = false
  } = $$props;
  const scale = page.data.settings?.security_objective_scale || "1-4";
  const scaleMap = SECURITY_OBJECTIVE_SCALE_MAP[scale];
  const getDisplayValue = (rawValue) => {
    if (rawValue === null || rawValue === void 0) return "--";
    if (typeof rawValue === "number" && rawValue >= 0 && rawValue <= 4) {
      return scaleMap[rawValue];
    }
    return String(rawValue);
  };
  $$payload.out += `<div class="mb-6"><div class="font-serif font-bold mb-3"><i${attr_class(`fa-solid ${stringify(icon)} mr-2`)}></i> ${escape_html(title)}</div> `;
  if (comparisons?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(comparisons);
    $$payload.out += `<div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200 rounded-lg"><thead class="bg-gray-100"><tr><th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"></th><th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">${escape_html(objective())}</th><th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">${escape_html(capability())}</th><th class="px-4 py-2 text-center text-sm font-semibold text-gray-700 border-b">${escape_html(alignment())}</th></tr></thead><tbody><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let comparison = each_array[$$index];
      $$payload.out += `<tr class="border-b hover:bg-gray-50"><td${attr_class("px-4 py-2 text-sm text-gray-900", void 0, { "uppercase": uppercaseLabels })}>${escape_html(safeTranslate(comparison.objective))}</td><td class="px-4 py-2 text-sm text-gray-700">${escape_html(getDisplayValue(comparison.expectation))}</td><td class="px-4 py-2 text-sm text-gray-700">${escape_html(getDisplayValue(comparison.reality))}</td><td class="px-4 py-2 text-center"><span${attr_class("inline-flex items-center justify-center w-6 h-6 rounded-full", void 0, {
        "bg-green-500": comparison.verdict === true,
        "bg-red-500": comparison.verdict === false,
        "bg-gray-400": comparison.verdict === null
      })}>`;
      if (comparison.verdict === true) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i class="fa-solid fa-check text-white text-xs"></i>`;
      } else if (comparison.verdict === false) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<i class="fa-solid fa-xmark text-white text-xs"></i>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-minus text-white text-xs"></i>`;
      }
      $$payload.out += `<!--]--></span></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center"><p class="text-gray-500 text-center">${escape_html(nodataavailable2())}</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { ObjectivesComparisonTable as O };
//# sourceMappingURL=ObjectivesComparisonTable-DUn8zDRY.js.map
