import { p as push, W as ensure_array_like, V as escape_html, a as pop, S as attr_class, T as attr, X as stringify, Z as attr_style } from './index2-9icAqEyj.js';
import { C9 as nodataavailable2 } from './_index-D7NdhnXA.js';
import './runtime-BKo9q3Zd.js';

function FlippableCard($$payload, $$props) {
  push();
  let { entity_assessment } = $$props;
  function getProgressColor(progress) {
    if (progress < 50) return "bg-red-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  }
  function getConclusionColor(conclusion) {
    const lookup = {
      blocker: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      ok: "bg-green-100 text-green-800"
    };
    return lookup[conclusion.toLowerCase()] || "bg-gray-100 text-gray-800";
  }
  $$payload.out += `<div${attr_class(`perspective-1000 w-full h-full min-h-[420px] relative w-full h-full transition-transform duration-800 ${stringify("")}`, "svelte-1t0cxjv")} role="listitem" style="transform-style: preserve-3d;"><div class="absolute w-full h-full rounded-lg shadow-lg bg-white overflow-hidden" style="backface-visibility: hidden;"><button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-sm opacity-40 transition-all duration-200 hover:bg-black/5 hover:opacity-100 z-10" aria-label="Flip card" data-testid="flip-button-front"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" stroke-width="2" class="text-gray-500"><path d="M3 8l4 -4l4 4"></path><path d="M7 4l0 9"></path><path d="M13 16l4 4l4 -4"></path><path d="M17 10l0 10"></path></svg></button> <div class="p-4 h-full flex flex-col"><div class="flex justify-between items-center pb-3 border-b border-gray-200 mb-3"><h3 class="font-bold text-lg text-gray-900" data-testid="provider">${escape_html(entity_assessment.provider)}</h3> <span data-testid="conclusion-badge"${attr_class(`px-2 py-1 rounded-full text-xs font-medium mr-10 ${stringify(getConclusionColor(entity_assessment.conclusion))}`, "svelte-1t0cxjv")}><a${attr("href", `/entity-assessments/${stringify(entity_assessment.entity_assessment_id)}`)}>${escape_html(entity_assessment.conclusion)}</a></span></div> <div class="flex flex-col gap-3"><div class="mb-3"><span class="block text-sm text-gray-500">Solution(s)</span> <div class="font-semibold text-gray-800" data-testid="solutions">${escape_html(entity_assessment.solutions)}</div></div> <div class="mb-3"><span class="block text-sm text-gray-500">Baseline</span> <div class="inline-block bg-gray-100 px-2 py-1 rounded-sm text-sm font-mono overflow-hidden"><div class="line-clamp-2 min-h-[2.4em] flex items-center" data-testid="baseline">${escape_html(entity_assessment.baseline)}</div></div></div> <span class="block text-sm text-gray-500 mb-2">Compliance review progress</span> <div class="flex flex-col items-center" title="Any Compliance status except 'not assessed' counts"><div class="text-gray-900"><svg viewBox="0 0 100 100" width="80" height="80"><circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"></circle><circle cx="50" cy="50" r="45" fill="none"${attr("stroke", entity_assessment.review_progress < 50 ? "#ef4444" : entity_assessment.review_progress < 75 ? "#eab308" : "#22c55e")} stroke-width="8" stroke-dasharray="283"${attr("stroke-dashoffset", 283 - 283 * entity_assessment.review_progress / 100)} transform="rotate(-90 50 50)"></circle><text x="50" y="55" text-anchor="middle" font-size="20" font-weight="bold" fill="currentColor"><a data-testid="review_progress"${attr("href", `/compliance-assessments/${stringify(entity_assessment.compliance_assessment_id)}`)}>${escape_html(entity_assessment.review_progress)}%</a></text></svg></div></div> <div class="grid grid-cols-2 gap-2 text-sm text-gray-600"><div><span class="block text-gray-500" data-testid="last_update">Last update</span> ${escape_html(entity_assessment.last_update)}</div> <div><span class="block text-gray-500" data-testid="due_date">Due date</span> ${escape_html(entity_assessment.due_date)}</div></div></div></div></div> <div class="absolute w-full h-full rounded-lg shadow-md bg-white overflow-hidden" style="backface-visibility: hidden; transform: rotateX(180deg);"><button class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-sm opacity-40 transition-all duration-200 hover:bg-black/5 hover:opacity-100 z-10" aria-label="Flip card back" data-testid="flip-button-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" stroke-width="2" class="text-gray-500"><path d="M3 8l4 -4l4 4"></path><path d="M7 4l0 9"></path><path d="M13 16l4 4l4 -4"></path><path d="M17 10l0 10"></path></svg></button> <div class="p-4 h-full flex flex-col"><h3 class="font-bold text-lg text-gray-900 mb-3 pr-10">${escape_html(entity_assessment.provider)}</h3> <div class="mb-4"><div>`;
  if (entity_assessment?.has_questions) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-3 mb-6" title="Any answer of associated questions unless not set"><div class="flex justify-between items-center mb-1"><span class="text-sm text-gray-500">Questions completion</span> <span class="text-sm font-medium" data-testid="completion">${escape_html(entity_assessment.completion)}%</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full ${stringify(getProgressColor(entity_assessment.completion))}`, "svelte-1t0cxjv")}${attr_style(`width: ${stringify(entity_assessment.completion)}%`)}></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="w-full mt-4"><div class="flex mb-4"><div class="w-3 h-3 rounded-full bg-gray-300 mt-1 mr-3"></div> <div class="flex-1"><p class="font-semibold mb-1" data-testid="reviewers">${escape_html(entity_assessment.reviewers)}</p> <p class="text-gray-600">Reviewer(s)</p></div></div></div></div></div> <div class="mt-2"><span class="block text-sm text-gray-500 mb-2">Observation</span> <p class="text-gray-600 leading-relaxed text-xs" data-testid="observation">${escape_html(entity_assessment.observation)}</p></div></div></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  if (data.data && data.data.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.data);
    $$payload.out += `<div class="p-6 bg-white bg-opacity-95 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" data-testid="cards-list"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let entity_assessment = each_array[$$index];
      FlippableCard($$payload, { entity_assessment });
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="p-4" data-testid="no-data-available">${escape_html(nodataavailable2())}</div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cqy-aI-u.js.map
