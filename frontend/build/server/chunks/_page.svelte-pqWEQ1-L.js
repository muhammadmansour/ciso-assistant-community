import { p as push, Z as attr_style, X as stringify, T as attr, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { c as complianceResultTailwindColorMap } from './constants-CbUNxZZz.js';
import { R as RadioGroup } from './RadioGroup-BatokiWT.js';
import { Ia as gobacktoaudit3, zU as previous, Dk as next, C7 as notassessed1, Cd as noncompliant1, AQ as partiallycompliant1, Qx as compliant, C9 as notapplicable1 } from './_index-DiaVtc2Z.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-CZeYLK59.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const possible_options = [
    {
      id: "not_assessed",
      label: notassessed1()
    },
    {
      id: "non_compliant",
      label: noncompliant1()
    },
    {
      id: "partially_compliant",
      label: partiallycompliant1()
    },
    { id: "compliant", label: compliant() },
    {
      id: "not_applicable",
      label: notapplicable1()
    }
  ];
  const requirementAssessments = data.requirement_assessments.filter((requirement2) => requirement2.name || requirement2.description);
  let currentIndex = 0;
  let currentRequirementAssessment = requirementAssessments[currentIndex];
  let color = complianceResultTailwindColorMap[currentRequirementAssessment.result];
  const requirementHashmap = Object.fromEntries(data.requirements.map((requirement2) => [requirement2.id, requirement2]));
  let requirement = requirementHashmap[currentRequirementAssessment.requirement.id];
  let parent = data.requirements.find((req) => req.urn === requirement.parent_urn);
  let title = requirement.display_short ? requirement.display_short : parent.display_short ? parent.display_short : parent.description;
  let result = currentRequirementAssessment.result;
  function updateResult(newResult) {
    currentRequirementAssessment.result = newResult;
    result = newResult;
    const form = document.getElementById("flashModeForm");
    const formData = {
      id: currentRequirementAssessment.id,
      result: newResult
    };
    fetch(form.action, {
      method: "POST",
      body: JSON.stringify(formData)
    });
  }
  $$payload.out += `<div class="flex flex-col min-h-screen justify-center items-center"><div${attr_style(`border-color: ${stringify(color)}`)} class="flex flex-col bg-white w-3/4 max-w-4xl h-3/4 min-h-[600px] rounded-xl shadow-xl p-4 border-4">`;
  if (currentRequirementAssessment) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-between items-center"><div><a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}`)} class="flex items-center space-x-2 text-primary-800 hover:text-primary-600"><i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoaudit3())}</p></a></div> <div class="relative"><button class="font-semibold hover:bg-gray-100 px-2 py-1 rounded cursor-pointer border border-transparent hover:border-gray-300 transition-colors flex items-center space-x-1" title="Click to jump to specific item (or press G)"><span>${escape_html(currentIndex + 1)}/${escape_html(requirementAssessments.length)}</span> <i class="fa-solid fa-chevron-down text-xs opacity-60"></i> <span class="text-xs opacity-60">(G)</span></button> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="flex flex-col flex-1 justify-center overflow-hidden"><div class="flex flex-col items-center text-center space-y-6 h-full"><p class="font-semibold text-xl flex-shrink-0">${escape_html(title)}</p> <div class="flex flex-col space-y-4 overflow-y-auto flex-1 w-full max-w-4xl px-4">`;
    if (currentRequirementAssessment.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="whitespace-pre-wrap leading-relaxed text-gray-700">`;
      MarkdownRenderer($$payload, {
        content: currentRequirementAssessment.description
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (requirement.annotation) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="whitespace-pre-wrap leading-relaxed text-gray-600 italic bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200 text-justify">`;
      MarkdownRenderer($$payload, { content: requirement.annotation });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> <div class="flex flex-col space-y-6"><div class="flex justify-center"><form id="flashModeForm" action="?/updateRequirementAssessment" method="post"><ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">`;
    RadioGroup($$payload, {
      possibleOptions: possible_options,
      initialValue: currentRequirementAssessment.result,
      classes: "w-full",
      colorMap: complianceResultTailwindColorMap,
      field: "result",
      onChange: (newValue) => {
        const newResult = result === newValue ? "not_assessed" : newValue;
        updateResult(newResult);
      },
      key: "id",
      labelKey: "label"
    });
    $$payload.out += `<!----></ul></form></div> <div class="flex justify-between"><button class="bg-gray-400 text-white px-4 py-2 rounded-sm flex items-center space-x-2"><span>${escape_html(previous())}</span> <span class="text-xs opacity-75">(H)</span></button> <button class="preset-filled-primary-500 px-4 py-2 rounded-sm flex items-center space-x-2"><span>${escape_html(next())}</span> <span class="text-xs opacity-75">(L)</span></button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-pqWEQ1-L.js.map
