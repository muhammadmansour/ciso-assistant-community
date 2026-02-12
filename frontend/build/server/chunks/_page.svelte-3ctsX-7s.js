import { p as push, O as copy_payload, P as assign_payload, a as pop, W as ensure_array_like, T as attr, V as escape_html, X as stringify, S as attr_class, Z as attr_style } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { p as page } from './index3-BwfRm5YV.js';
import { C as Checkbox } from './Checkbox-vxSpLW05.js';
import { Q as Question } from './Question-BCYMJ1mG.js';
import { R as RadioGroup } from './RadioGroup-B9fdfrn7.js';
import { S as Score } from './Score-wlwxdvqS.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { T as TableMarkdownField } from './TableMarkdownField-C98PgJKs.js';
import { i as invalidateAll } from './client2-CItqzqlw.js';
import { g as superForm } from './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { GT as gobacktoaudit3, UC as assessmentmode1, b3 as description, VC as additionalinformation1, jS as annotation, oh as typicalevidence1, Dc as mappinginference1, Db as mappinginferencehelptext3, Oh as coveragecolon1, sd as scoresemicolon2, qm as suggestioncolon1, Vc as annotationcolon1, cf as status, p1 as todo1, FO as inprogress1, FN as inreview1, Ko as done, dQ as result, B9 as notassessed1, Bf as noncompliant1, zT as partiallycompliant1, P2 as compliant, Bb as notapplicable1, sh as score, G1 as implementationscore1, G0 as implementationscoreresult2, Kv as documentationscoreresult2, se as scoreresult1, BE as noobservation1, C3 as noappliedcontrolyet3, BR as noevidences1, rb as showtableofcontents3, Gz as hidetableofcontents3, pL as tableofcontents2, s6 as searchsections1, cr as observation, g1 as addappliedcontrol2, rX as selectappliedcontrols2, y as appliedcontrol1, Xf as addevidence1, rP as selectevidence1, z as evidence, Ve as analyzing, qF as startanalysis1, Vg as analysisfailed1, Vh as analysiscomplete1, P3 as compliancescore1, vv as recommendations, Vw as aianalysis1, vK as questionnairemode1, Kw as documentationscore1, s9 as scoringhelptext2 } from './_index-DEXNURl5.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import './crud-a52dcxCi.js';
import { A as Accordion } from './index4-B6qGV9uj.js';
import { P as ProgressRing } from './ProgressRing-0SGrBrD4.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { S as Switch } from './Switch-BHyFhQv_.js';
import './runtime-BMNt81Gy.js';
import { b as complianceResultColorMap, d as complianceStatusTailwindColorMap, c as complianceResultTailwindColorMap } from './constants-BZXIbVIt.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-BcDBvyDd.js';
import './breadcrumbs-CG0qNTv3.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './Tooltip-DrjF8lR0.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './index5-C1_XlIn1.js';
import './index8-BWS1s5in.js';
import '@floating-ui/dom';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './index6-BrJh6zKa.js';
import './shared-server-BU2DVf8Q.js';

function TableOfContents($$payload, $$props) {
  push();
  let {
    items,
    isVisible = true,
    position = "right",
    className = ""
  } = $$props;
  let activeId = "";
  let searchQuery = "";
  let focusedIndex = -1;
  let filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  if (isVisible && items.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`toc-container fixed z-40 ${stringify(position === "right" ? "right-4" : "left-4")} top-1/2 transform -translate-y-1/2 max-h-[100vh] ${stringify(className)}`, "svelte-1mbaqqr")}><button${attr_class(`toc-toggle mb-2 p-2 bg-surface-200 hover:bg-surface-300 rounded-full shadow-lg transition-all duration-200 relative z-50 cursor-pointer ${stringify("hidden")}`, "svelte-1mbaqqr")}${attr("title", showtableofcontents3())}${attr("aria-label", showtableofcontents3())} style="pointer-events: auto;"><i class="fa-solid fa-list text-sm" aria-hidden="true"></i></button> `;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="toc-content bg-surface-50 border border-surface-300 rounded-lg shadow-lg p-4 w-64 max-h-[60vh] overflow-hidden flex flex-col relative svelte-1mbaqqr"><button class="absolute top-2 right-2 p-1 text-surface-400 hover:text-surface-600 hover:bg-surface-200 rounded transition-colors duration-150"${attr("title", hidetableofcontents3())}${attr("aria-label", hidetableofcontents3())}><i class="fa-solid fa-times text-sm" aria-hidden="true"></i></button> <h3 class="text-sm font-semibold text-surface-700 mb-3 flex items-center pr-8"><i class="fa-solid fa-list-ul mr-2" aria-hidden="true"></i> ${escape_html(tableofcontents2())}</h3> <div class="relative mb-3"><div class="relative"><input${attr("value", searchQuery)} type="text"${attr("placeholder", searchsections1())}${attr("aria-label", searchsections1())} class="w-full px-3 py-2 pr-8 text-sm border border-surface-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"/> <div class="absolute inset-y-0 right-0 flex items-center pr-3">`;
      {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<i class="fa-solid fa-search text-surface-400 text-xs" aria-hidden="true"></i>`;
      }
      $$payload.out += `<!--]--></div></div> <div class="mt-1 text-xs text-surface-400"><kbd class="px-1 py-0.5 bg-surface-200 rounded text-xs svelte-1mbaqqr">↑↓</kbd> navigate <kbd class="px-1 py-0.5 bg-surface-200 rounded text-xs ml-1 svelte-1mbaqqr">Enter</kbd> go <kbd class="px-1 py-0.5 bg-surface-200 rounded text-xs ml-1 svelte-1mbaqqr">Esc</kbd> close</div></div> <nav class="toc-nav flex-1 overflow-y-auto svelte-1mbaqqr" role="navigation"${attr("aria-label", tableofcontents2())}>`;
      if (filteredItems.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array = ensure_array_like(filteredItems);
        $$payload.out += `<ul class="space-y-1 text-sm" role="list"><!--[-->`;
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let item = each_array[index];
          $$payload.out += `<li role="listitem"><button${attr_class(`toc-link w-full text-left px-2 py-1 rounded transition-colors duration-150 ${stringify(activeId === item.id ? "bg-primary-100 text-primary-700 font-medium border-l-2 border-primary-500" : "text-surface-600 hover:bg-surface-100 hover:text-surface-800")} ${stringify(focusedIndex === index ? "ring-2 ring-primary-300" : "")}`, "svelte-1mbaqqr")}${attr_style(`padding-left: ${stringify(item.level * 8 + 8)}px`)}${attr("aria-label", `Jump to section: ${item.title}`)}${attr("aria-current", activeId === item.id ? "location" : false)}${attr("tabindex", focusedIndex === index ? 0 : -1)}><span class="truncate block"${attr("title", item.title)}>`;
          {
            $$payload.out += "<!--[!-->";
            $$payload.out += `${escape_html(item.title)}`;
          }
          $$payload.out += `<!--]--></span></button></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></nav> `;
      {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let analysisLoading = {};
  let analysisResults = {};
  let analysisErrors = {};
  let {
    data,
    form,
    shallow = false,
    actionPath = "",
    questionnaireOnly = false,
    invalidateAllBool = true
  } = $$props;
  const result_options = [
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
  const status_options = [
    { id: "to_do", label: todo1() },
    { id: "in_progress", label: inprogress1() },
    { id: "in_review", label: inreview1() },
    { id: "done", label: done() }
  ];
  const requirementHashmap = Object.fromEntries(data.requirements.map((requirement) => [requirement.id, requirement]));
  let hideSuggestionHashmap = {};
  let requirementAssessments = data.requirement_assessments;
  let complianceAssessment = data.compliance_assessment;
  const hasQuestions = requirementAssessments.some((requirementAssessment) => requirementAssessment.requirement.questions);
  requirementAssessments.forEach((ra) => {
    hideSuggestionHashmap[ra.id] = false;
  });
  const titleMap = /* @__PURE__ */ new Map();
  function getTitle(requirementAssessment) {
    if (titleMap.has(requirementAssessment.id)) {
      return titleMap.get(requirementAssessment.id);
    }
    const requirement = requirementHashmap[requirementAssessment.requirement] ?? requirementAssessment;
    const result2 = requirement.display_short ? requirement.display_short : requirement.name ?? "";
    titleMap.set(requirementAssessment.id, result2);
    return result2;
  }
  async function updateBulk(requirementAssessment, data2) {
    const form2 = document.getElementById(`tableModeForm-${requirementAssessment.id}`);
    const formData = { ...data2, id: requirementAssessment.id };
    const res = await fetch(form2.action, {
      method: "POST",
      body: JSON.stringify(formData)
    });
    return res;
  }
  async function update(requirementAssessment, field, answers = null) {
    const value = answers ? requirementAssessment.answers : requirementAssessment[field];
    await updateBulk(requirementAssessment, { [field]: value });
    if (invalidateAll) {
      await invalidateAll();
    }
    if (requirementAssessment.updateForm && requirementAssessment.updateForm.data) {
      requirementAssessment.updateForm.data[field] = value;
    }
  }
  let questionnaireMode = questionnaireOnly ? true : !hasQuestions ? false : page.data.user.is_third_party ? true : false;
  getModalStore();
  const requirementAssessmentScores = Object.fromEntries(
    // svelte-ignore state_referenced_locally
    requirementAssessments.map((requirement) => {
      return [
        requirement.id,
        [requirement.is_scored, requirement.score]
      ];
    })
  );
  async function updateScore(requirementAssessment) {
    const isScored = requirementAssessment.is_scored;
    const score2 = requirementAssessment.score;
    const documentationScore = requirementAssessment.documentation_score;
    requirementAssessmentScores[requirementAssessment.id] = [isScored, score2, documentationScore];
    setTimeout(
      async () => {
        const currentScoreValue = requirementAssessmentScores[requirementAssessment.id];
        if (isScored === currentScoreValue[0] && score2 === currentScoreValue[1] && documentationScore === currentScoreValue[2]) {
          await updateBulk(requirementAssessment, {
            is_scored: isScored,
            score: score2,
            documentation_score: documentationScore
          });
        }
      },
      500
    );
  }
  function getClassesText(mappingInferenceResult) {
    return complianceResultColorMap[mappingInferenceResult] === "#000000" ? "text-white" : "";
  }
  let scoreForms = {};
  let docScoreForms = {};
  let isScoredForms = {};
  run(() => {
    requirementAssessments.forEach((requirementAssessment, index) => {
      const id = requirementAssessment.id;
      if (!scoreForms[id]) {
        scoreForms[id] = superForm(requirementAssessment.scoreForm, { id: `requirement-score-${id}-${index}` });
      }
      if (!docScoreForms[id]) {
        docScoreForms[id] = superForm(requirementAssessment.scoreForm, {
          id: `requirement-documentation-score-${id}-${index}`
        });
      }
      if (!isScoredForms[id]) {
        isScoredForms[id] = superForm(requirementAssessment.scoreForm, { id: `requirement-is-scored-${id}-${index}` });
      }
    });
  });
  const accordionItems = (
    // svelte-ignore state_referenced_locally
    requirementAssessments.reduce((acc, requirementAssessment) => {
      requirementHashmap[requirementAssessment.requirement] ?? requirementAssessment;
      return { ...acc, [requirementAssessment.id]: [""] };
    })
  );
  let tocItems = [];
  let showToc = true;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(requirementAssessments);
    $$payload2.out += `<div class="flex flex-col space-y-4 whitespace-pre-line">`;
    TableOfContents($$payload2, {
      items: tocItems,
      isVisible: showToc,
      position: "right",
      className: "hidden lg:block"
    });
    $$payload2.out += `<!----> <div class="card px-6 py-4 bg-white flex flex-col justify-evenly shadow-lg w-full h-full space-y-2">`;
    if (!questionnaireOnly) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="sticky top-0 p-2 z-10 card bg-white items-center justify-evenly flex flex-row w-full"><a${attr("href", `/compliance-assessments/${stringify(complianceAssessment.id)}`)} class="flex items-center space-x-2 text-primary-800 hover:text-primary-600" data-testid="back-to-audit"><i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoaudit3())} ${escape_html(complianceAssessment.name)}</p></a> `;
      if (!hasQuestions) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex items-center justify-center space-x-4">`;
        if (questionnaireMode) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<p class="font-bold text-sm">${escape_html(assessmentmode1())}</p>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<p class="font-bold text-sm text-green-500">${escape_html(assessmentmode1())}</p>`;
        }
        $$payload2.out += `<!--]--> `;
        Switch($$payload2, {
          name: "questionnaireToggle",
          classes: "flex flex-row items-center justify-center",
          controlActive: "bg-primary-500",
          controlInactive: "bg-green-500",
          onCheckedChange: (e) => {
            questionnaireMode = e.checked;
          },
          children: ($$payload3) => {
            if (questionnaireMode) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<p class="font-bold text-sm text-primary-500">${escape_html(questionnairemode1())}</p>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<p class="font-bold text-sm">${escape_html(questionnairemode1())}</p>`;
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <ul data-testid="requirement-assessments"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let requirementAssessment = each_array[i];
      $$payload2.out += `<li class="list-none"><span class="relative flex justify-center py-4"${attr("id", `requirement-${stringify(requirementAssessment.id)}`)} data-toc=""${attr("data-toc-title", getTitle(requirementAssessment))} data-toc-level="0"><div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-linear-to-r from-transparent via-gray-500 to-transparent opacity-75"></div> <span class="relative z-10 bg-white px-6 text-orange-600 font-semibold text-xl">${escape_html(getTitle(requirementAssessment))}</span></span> <div class="h-2"></div> `;
      if (requirementAssessment.requirement.description || requirementAssessment.assessable) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex flex-col items-center justify-center border px-4 py-2 shadow-sm rounded-xl space-y-2">`;
        if (requirementAssessment.requirement.description) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="card w-full font-light text-lg p-4 preset-tonal-primary" data-testid="description"><h2 class="font-semibold text-base flex flex-row justify-between"><div><i class="fa-solid fa-file-lines mr-2"></i>${escape_html(description())}</div></h2> `;
          MarkdownRenderer($$payload2, {
            content: requirementAssessment.requirement.description
          });
          $$payload2.out += `<!----></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (requirementAssessment.assessable) {
          $$payload2.out += "<!--[-->";
          if (requirementAssessment.requirement.annotation || requirementAssessment.requirement.typical_evidence || requirementAssessment.mapping_inference?.result) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="card p-4 preset-tonal-secondary text-sm flex flex-col justify-evenly cursor-auto w-full"><h2 class="font-semibold text-base flex flex-row justify-between"><div><i class="fa-solid fa-circle-info mr-2"></i>${escape_html(additionalinformation1())}</div> <button>`;
            if (!hideSuggestionHashmap[requirementAssessment.id]) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<i class="fa-solid fa-eye"></i>`;
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `<i class="fa-solid fa-eye-slash"></i>`;
            }
            $$payload2.out += `<!--]--></button></h2> `;
            if (!hideSuggestionHashmap[requirementAssessment.id]) {
              $$payload2.out += "<!--[-->";
              if (requirementAssessment.requirement.annotation) {
                $$payload2.out += "<!--[-->";
                $$payload2.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-pencil"></i> ${escape_html(annotation())}</p> <div class="py-1">`;
                MarkdownRenderer($$payload2, {
                  content: requirementAssessment.requirement.annotation
                });
                $$payload2.out += `<!----></div></div>`;
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]--> `;
              if (requirementAssessment.requirement.typical_evidence) {
                $$payload2.out += "<!--[-->";
                $$payload2.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-pencil"></i> ${escape_html(typicalevidence1())}</p> <div class="py-1">`;
                MarkdownRenderer($$payload2, {
                  content: requirementAssessment.requirement.typical_evidence
                });
                $$payload2.out += `<!----></div></div>`;
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]--> `;
              if (requirementAssessment.mapping_inference?.result) {
                $$payload2.out += "<!--[-->";
                $$payload2.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-link"></i> ${escape_html(mappinginference1())}</p> <span class="text-xs text-gray-500"><i class="fa-solid fa-circle-info"></i> ${escape_html(mappinginferencehelptext3())}</span> <ul class="list-disc ml-4"><li><p><a class="anchor"${attr("href", `/requirement-assessments/${stringify(requirementAssessment.mapping_inference.source_requirement_assessment.id)}`)}>${escape_html(requirementAssessment.mapping_inference.source_requirement_assessment.str)}</a></p> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(coveragecolon1())}</span> <span class="badge h-fit">${escape_html(safeTranslate(requirementAssessment.mapping_inference.source_requirement_assessment.coverage))}</span></p> `;
                if (requirementAssessment.mapping_inference.source_requirement_assessment.is_scored) {
                  $$payload2.out += "<!--[-->";
                  $$payload2.out += `<p class="whitespace-pre-line py-1"><span class="italic">${escape_html(scoresemicolon2())}</span> <span class="badge h-fit">${escape_html(safeTranslate(requirementAssessment.mapping_inference.source_requirement_assessment.score))}</span></p>`;
                } else {
                  $$payload2.out += "<!--[!-->";
                }
                $$payload2.out += `<!--]--> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(suggestioncolon1())}</span> <span${attr_class(`badge ${stringify(getClassesText(requirementAssessment.mapping_inference.result))} h-fit`)}${attr_style(`background-color: ${stringify(complianceResultColorMap[requirementAssessment.mapping_inference.result])};`)}>${escape_html(safeTranslate(requirementAssessment.mapping_inference.result))}</span></p> `;
                if (requirementAssessment.mapping_inference.annotation) {
                  $$payload2.out += "<!--[-->";
                  $$payload2.out += `<p class="whitespace-pre-line py-1"><span class="italic">${escape_html(annotationcolon1())}</span> ${escape_html(requirementAssessment.mapping_inference.annotation)}</p>`;
                } else {
                  $$payload2.out += "<!--[!-->";
                }
                $$payload2.out += `<!--]--></li></ul></div>`;
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]-->`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <form class="flex flex-col space-y-2 items-center justify-evenly w-full table-mode-form"${attr("id", `tableModeForm-${stringify(requirementAssessment.id)}`)}${attr("action", `${stringify(actionPath)}?/updateRequirementAssessment`)} method="post">`;
          if (!questionnaireMode) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="flex flex-row w-full space-x-2 my-4"><div class="flex flex-col items-center w-1/2"><p class="flex items-center font-semibold text-blue-600 italic">${escape_html(status())}</p> `;
            RadioGroup($$payload2, {
              possibleOptions: status_options,
              key: "id",
              labelKey: "label",
              field: "status",
              colorMap: complianceStatusTailwindColorMap,
              initialValue: requirementAssessment.status,
              onChange: (newValue) => {
                const newStatus = requirementAssessment.status === newValue ? "to_do" : newValue;
                requirementAssessment.status = newStatus;
                update(requirementAssessment, "status");
              }
            });
            $$payload2.out += `<!----></div> <div class="flex flex-col items-center w-1/2"><p class="flex items-center font-semibold text-purple-600 italic">${escape_html(result())}</p> `;
            if (Object.values(requirementAssessment.requirement.questions || {}).some((question) => Array.isArray(question.choices) && question.choices.some((choice) => choice.compute_result !== void 0))) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<span class="badge text-sm font-semibold"${attr_style(`background-color: ${stringify(complianceResultColorMap[requirementAssessment.result] || "#ddd")}`)}>${escape_html(safeTranslate(requirementAssessment.result))}</span>`;
            } else {
              $$payload2.out += "<!--[!-->";
              RadioGroup($$payload2, {
                possibleOptions: result_options,
                key: "id",
                labelKey: "label",
                field: "result",
                colorMap: complianceResultTailwindColorMap,
                initialValue: requirementAssessment.result,
                onChange: (newValue) => {
                  const newResult = requirementAssessment.result === newValue ? "not_assessed" : newValue;
                  requirementAssessment.result = newResult;
                  update(requirementAssessment, "result");
                }
              });
            }
            $$payload2.out += `<!--]--></div></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> `;
          if (requirementAssessment.requirement.questions != null && Object.keys(requirementAssessment.requirement.questions).length !== 0) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="flex flex-col w-full space-y-2">`;
            Question($$payload2, {
              questions: requirementAssessment.requirement.questions,
              initialValue: requirementAssessment.answers,
              field: "answers",
              shallow,
              onChange: (urn, newAnswer) => {
                requirementAssessment.answers[urn] = newAnswer;
                update(requirementAssessment, "answers", requirementAssessment.answers);
              }
            });
            $$payload2.out += `<!----></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <div class="flex flex-col w-full place-items-center">`;
          if (!shallow) {
            $$payload2.out += "<!--[-->";
            if (Object.values(requirementAssessment.requirement.questions || {}).some((question) => Array.isArray(question.choices) && question.choices.some((choice) => choice.add_score !== void 0))) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="flex flex-row items-center space-x-4"><span class="font-medium">${escape_html(score())}</span> `;
              ProgressRing($$payload2, {
                strokeWidth: "20px",
                meterStroke: displayScoreColor(requirementAssessment.score, complianceAssessment.max_score),
                value: formatScoreValue(requirementAssessment.score, complianceAssessment.max_score),
                classes: "shrink-0",
                size: "size-10",
                children: ($$payload3) => {
                  $$payload3.out += `<!---->${escape_html(requirementAssessment.score)}`;
                },
                $$slots: { default: true }
              });
              $$payload2.out += `<!----></div>`;
            } else {
              $$payload2.out += "<!--[!-->";
              {
                let left = function($$payload3) {
                  $$payload3.out += `<div>`;
                  Checkbox($$payload3, {
                    form: isScoredForms[requirementAssessment.id],
                    field: "is_scored",
                    label: "",
                    helpText: scoringhelptext2(),
                    checkboxComponent: "switch",
                    classes: "h-full flex flex-row items-center justify-center my-1",
                    classesContainer: "h-full flex flex-row items-center space-x-4",
                    onChange: async () => {
                      requirementAssessment.is_scored = !requirementAssessment.is_scored;
                      await update(requirementAssessment, "is_scored");
                    }
                  });
                  $$payload3.out += `<!----></div>`;
                };
                Score($$payload2, {
                  form: scoreForms[requirementAssessment.id],
                  min_score: complianceAssessment.min_score,
                  max_score: complianceAssessment.max_score,
                  scores_definition: data.scores.scores_definition,
                  field: "score",
                  label: complianceAssessment.show_documentation_score ? implementationscore1() : score(),
                  styles: "w-full p-1",
                  onChange: (newScore) => {
                    requirementAssessment.score = newScore;
                    updateScore(requirementAssessment);
                  },
                  disabled: !requirementAssessment.is_scored || requirementAssessment.result === "not_applicable",
                  left,
                  $$slots: { left: true }
                });
              }
              $$payload2.out += `<!----> `;
              if (complianceAssessment.show_documentation_score) {
                $$payload2.out += "<!--[-->";
                Score($$payload2, {
                  form: docScoreForms[requirementAssessment.id],
                  min_score: complianceAssessment.min_score,
                  max_score: complianceAssessment.max_score,
                  scores_definition: data.scores.scores_definition,
                  field: "documentation_score",
                  label: documentationscore1(),
                  isDoc: true,
                  styles: "w-full p-1",
                  onChange: (newScore) => {
                    requirementAssessment.documentation_score = newScore;
                    updateScore(requirementAssessment);
                  },
                  disabled: !requirementAssessment.is_scored || requirementAssessment.result === "not_applicable"
                });
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]-->`;
            }
            $$payload2.out += `<!--]-->`;
          } else if (complianceAssessment.show_documentation_score && requirementAssessment.is_scored) {
            $$payload2.out += "<!--[1-->";
            $$payload2.out += `<div class="flex flex-row items-center space-x-2 w-full"><span>${escape_html(implementationscoreresult2())}</span> `;
            ProgressRing($$payload2, {
              strokeWidth: "20px",
              meterStroke: displayScoreColor(requirementAssessment.score, complianceAssessment.max_score),
              value: requirementAssessment.score * 100 / complianceAssessment.max_score,
              size: "size-10",
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(requirementAssessment.score ?? "--")}`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----> <span>${escape_html(documentationscoreresult2())}</span> `;
            ProgressRing($$payload2, {
              strokeWidth: "20px",
              meterStroke: displayScoreColor(requirementAssessment.documentation_score, complianceAssessment.max_score),
              value: requirementAssessment.documentation_score * 100 / complianceAssessment.max_score,
              size: "size-10",
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(requirementAssessment.documentation_score ?? "--")}`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----></div>`;
          } else if (requirementAssessment.is_scored) {
            $$payload2.out += "<!--[2-->";
            $$payload2.out += `<div class="flex flex-row items-center space-x-2 w-full"><span>${escape_html(scoreresult1())}</span> `;
            ProgressRing($$payload2, {
              strokeWidth: "20px",
              meterStroke: displayScoreColor(requirementAssessment.score, complianceAssessment.max_score),
              value: requirementAssessment.score * 100 / complianceAssessment.max_score,
              size: "size-10",
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(requirementAssessment.score ?? "--")}`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> `;
          Accordion($$payload2, {
            value: accordionItems[requirementAssessment.id],
            onValueChange: (e) => accordionItems[requirementAssessment.id] = e.value,
            children: ($$payload3) => {
              if (shallow) {
                $$payload3.out += "<!--[-->";
                if (requirementAssessment.observation) {
                  $$payload3.out += "<!--[-->";
                  MarkdownRenderer($$payload3, {
                    content: requirementAssessment.observation,
                    class: "text-primary-500"
                  });
                } else {
                  $$payload3.out += "<!--[!-->";
                  $$payload3.out += `<p class="text-gray-400 italic">${escape_html(noobservation1())}</p>`;
                }
                $$payload3.out += `<!--]-->`;
              } else {
                $$payload3.out += "<!--[!-->";
                $$payload3.out += `<!---->`;
                {
                  let control = function($$payload4) {
                    $$payload4.out += `<p class="flex">${escape_html(observation())}</p>`;
                  }, panel = function($$payload4) {
                    TableMarkdownField($$payload4, {
                      onSave: async (newValue) => {
                        await update(requirementAssessment, "observation");
                        requirementAssessment.observationBuffer = newValue;
                      },
                      get value() {
                        return requirementAssessment.observation;
                      },
                      set value($$value) {
                        requirementAssessment.observation = $$value;
                        $$settled = false;
                      }
                    });
                  };
                  Accordion.Item($$payload3, {
                    value: "observation",
                    control,
                    panel,
                    $$slots: { control: true, panel: true }
                  });
                }
                $$payload3.out += `<!---->`;
              }
              $$payload3.out += `<!--]--> `;
              if (requirementAssessment.applied_controls.length === 0 && shallow) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<p class="text-gray-400 italic">${escape_html(noappliedcontrolyet3())}</p>`;
              } else {
                $$payload3.out += "<!--[!-->";
                $$payload3.out += `<!---->`;
                {
                  let control = function($$payload4) {
                    $$payload4.out += `<p class="flex items-center space-x-2"><span>${escape_html(appliedcontrol1())}</span> <!---->`;
                    {
                      if (requirementAssessment.applied_controls != null) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<span class="badge preset-tonal-primary">${escape_html(requirementAssessment.applied_controls.length)}</span>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]-->`;
                    }
                    $$payload4.out += `<!----></p>`;
                  }, panel = function($$payload4) {
                    $$payload4.out += `<div class="flex flex-row space-x-2 items-center">`;
                    if (!shallow) {
                      $$payload4.out += "<!--[-->";
                      $$payload4.out += `<button class="btn preset-filled-primary-500 self-start" type="button"><i class="fa-solid fa-plus mr-2"></i>${escape_html(addappliedcontrol2())}</button> <button class="btn preset-filled-secondary-500 self-start" type="button"><i class="fa-solid fa-hand-pointer mr-2"></i>${escape_html(selectappliedcontrols2())}</button>`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--></div> <div class="flex flex-wrap space-x-2 items-center"><!---->`;
                    {
                      const each_array_1 = ensure_array_like(requirementAssessment.applied_controls);
                      $$payload4.out += `<!--[-->`;
                      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                        let ac = each_array_1[$$index];
                        $$payload4.out += `<p class="p-2">`;
                        Anchor($$payload4, {
                          class: "anchor",
                          href: `/applied-controls/${stringify(ac.id)}`,
                          label: ac.str,
                          children: ($$payload5) => {
                            $$payload5.out += `<i class="fa-solid fa-fire-extinguisher mr-2"></i>${escape_html(ac.str)}`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload4.out += `<!----></p>`;
                      }
                      $$payload4.out += `<!--]-->`;
                    }
                    $$payload4.out += `<!----></div>`;
                  };
                  Accordion.Item($$payload3, {
                    value: "appliedControl",
                    control,
                    panel,
                    $$slots: { control: true, panel: true }
                  });
                }
                $$payload3.out += `<!---->`;
              }
              $$payload3.out += `<!--]--> `;
              if (requirementAssessment.evidences.length === 0 && shallow) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<p class="text-gray-400 italic" data-testid="no-evidence">${escape_html(noevidences1())}</p>`;
              } else {
                $$payload3.out += "<!--[!-->";
                $$payload3.out += `<!---->`;
                {
                  let control = function($$payload4) {
                    $$payload4.out += `<p class="flex items-center space-x-2"><span>${escape_html(evidence())}</span> <!---->`;
                    {
                      if (requirementAssessment.evidences != null) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<span class="badge preset-tonal-primary" data-testid="evidence-count">${escape_html(requirementAssessment.evidences.length)}</span>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]-->`;
                    }
                    $$payload4.out += `<!----></p>`;
                  }, panel = function($$payload4) {
                    $$payload4.out += `<div class="flex flex-row space-x-2 items-center">`;
                    if (!shallow) {
                      $$payload4.out += "<!--[-->";
                      $$payload4.out += `<button class="btn preset-filled-primary-500 self-start" type="button" data-testid="create-evidence-button"><i class="fa-solid fa-plus mr-2"></i>${escape_html(addevidence1())}</button> <button class="btn preset-filled-secondary-500 self-start" type="button" data-testid="select-evidence-button"><i class="fa-solid fa-hand-pointer mr-2"></i>${escape_html(selectevidence1())}</button>`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--></div> <div class="flex flex-wrap space-x-2 items-center"><!---->`;
                    {
                      const each_array_2 = ensure_array_like(requirementAssessment.evidences);
                      $$payload4.out += `<!--[-->`;
                      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
                        let evidence2 = each_array_2[$$index_1];
                        $$payload4.out += `<p class="p-2">`;
                        Anchor($$payload4, {
                          class: "anchor",
                          href: `/evidences/${stringify(evidence2.id)}`,
                          label: evidence2.str,
                          "data-testid": "evidence-link",
                          children: ($$payload5) => {
                            $$payload5.out += `<i class="fa-solid fa-file-lines mr-2"></i>${escape_html(evidence2.str)}`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload4.out += `<!----></p>`;
                      }
                      $$payload4.out += `<!--]-->`;
                    }
                    $$payload4.out += `<!----></div>`;
                  };
                  Accordion.Item($$payload3, {
                    value: "evidence",
                    control,
                    panel,
                    $$slots: { control: true, panel: true }
                  });
                }
                $$payload3.out += `<!---->`;
              }
              $$payload3.out += `<!--]--> `;
              if (!shallow && requirementAssessment.assessable) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<!---->`;
                {
                  let control = function($$payload4) {
                    $$payload4.out += `<p class="flex items-center space-x-2"><span><i class="fa-solid fa-robot mr-1"></i> ${escape_html(aianalysis1())}</span> `;
                    if (analysisResults[requirementAssessment.id]) {
                      $$payload4.out += "<!--[-->";
                      $$payload4.out += `<span class="badge preset-tonal-success">✓</span>`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--></p>`;
                  }, panel = function($$payload4) {
                    $$payload4.out += `<div class="flex flex-col space-y-4"><div class="flex flex-row space-x-2 items-center"><button class="btn preset-filled-warning-500 self-start" type="button"${attr("disabled", analysisLoading[requirementAssessment.id], true)} data-testid="start-analysis-button">`;
                    if (analysisLoading[requirementAssessment.id]) {
                      $$payload4.out += "<!--[-->";
                      $$payload4.out += `<i class="fa-solid fa-spinner fa-spin mr-2"></i>${escape_html(analyzing())}`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                      $$payload4.out += `<i class="fa-solid fa-brain mr-2"></i>${escape_html(startanalysis1())}`;
                    }
                    $$payload4.out += `<!--]--></button></div> `;
                    if (analysisErrors[requirementAssessment.id]) {
                      $$payload4.out += "<!--[-->";
                      $$payload4.out += `<div class="card preset-tonal-error p-4"><p class="font-semibold text-red-600"><i class="fa-solid fa-exclamation-triangle mr-2"></i>${escape_html(analysisfailed1())}</p> <p class="text-sm">${escape_html(analysisErrors[requirementAssessment.id])}</p></div>`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--> `;
                    if (analysisResults[requirementAssessment.id]) {
                      $$payload4.out += "<!--[-->";
                      const result2 = analysisResults[requirementAssessment.id];
                      $$payload4.out += `<div class="card preset-tonal-success p-4 space-y-3"><h3 class="font-semibold text-green-700"><i class="fa-solid fa-check-circle mr-2"></i>${escape_html(analysiscomplete1())}</h3> <div class="flex flex-wrap items-center gap-4">`;
                      if (result2.score !== void 0) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div class="flex items-center space-x-2"><span class="font-medium">${escape_html(compliancescore1())}:</span> <span class="badge preset-filled-primary-500 text-lg px-3 py-1">${escape_html(result2.score)}%</span></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.compliance_status || result2.status) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div class="flex items-center space-x-2"><span class="font-medium">${escape_html(status())}:</span> <span class="badge preset-filled-secondary-500 px-2 py-1">${escape_html(result2.compliance_status || result2.status)}</span></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.effectiveness) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div class="flex items-center space-x-2"><span class="font-medium">Effectiveness:</span> <span class="badge preset-tonal px-2 py-1">${escape_html(result2.effectiveness)}</span></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.evidenceQuality) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div class="flex items-center space-x-2"><span class="font-medium">Evidence Quality:</span> <span class="badge preset-tonal px-2 py-1">${escape_html(result2.evidenceQuality)}</span></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--></div> `;
                      if (result2.summary) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div><p class="font-medium mb-1">Summary:</p> <div class="bg-white/50 rounded p-2">`;
                        MarkdownRenderer($$payload4, { content: result2.summary });
                        $$payload4.out += `<!----></div></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.strengths && result2.strengths.length > 0) {
                        $$payload4.out += "<!--[-->";
                        const each_array_3 = ensure_array_like(result2.strengths);
                        $$payload4.out += `<div><p class="font-medium mb-1 text-green-600"><i class="fa-solid fa-plus-circle mr-1"></i>Strengths:</p> <ul class="list-disc list-inside bg-white/50 rounded p-2 space-y-1"><!--[-->`;
                        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                          let strength = each_array_3[$$index_2];
                          $$payload4.out += `<li>${escape_html(strength)}</li>`;
                        }
                        $$payload4.out += `<!--]--></ul></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.weaknesses && result2.weaknesses.length > 0) {
                        $$payload4.out += "<!--[-->";
                        const each_array_4 = ensure_array_like(result2.weaknesses);
                        $$payload4.out += `<div><p class="font-medium mb-1 text-red-600"><i class="fa-solid fa-minus-circle mr-1"></i>Weaknesses:</p> <ul class="list-disc list-inside bg-white/50 rounded p-2 space-y-1"><!--[-->`;
                        for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
                          let weakness = each_array_4[$$index_3];
                          $$payload4.out += `<li>${escape_html(weakness)}</li>`;
                        }
                        $$payload4.out += `<!--]--></ul></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.recommendations && result2.recommendations.length > 0) {
                        $$payload4.out += "<!--[-->";
                        const each_array_5 = ensure_array_like(result2.recommendations);
                        $$payload4.out += `<div><p class="font-medium mb-1 text-blue-600"><i class="fa-solid fa-lightbulb mr-1"></i>${escape_html(recommendations())}:</p> <ul class="list-disc list-inside bg-white/50 rounded p-2 space-y-1"><!--[-->`;
                        for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
                          let recommendation = each_array_5[$$index_4];
                          $$payload4.out += `<li>${escape_html(recommendation)}</li>`;
                        }
                        $$payload4.out += `<!--]--></ul></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.nextSteps && result2.nextSteps.length > 0) {
                        $$payload4.out += "<!--[-->";
                        const each_array_6 = ensure_array_like(result2.nextSteps);
                        $$payload4.out += `<div><p class="font-medium mb-1 text-purple-600"><i class="fa-solid fa-arrow-right mr-1"></i>Next Steps:</p> <ul class="list-disc list-inside bg-white/50 rounded p-2 space-y-1"><!--[-->`;
                        for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
                          let step = each_array_6[$$index_5];
                          $$payload4.out += `<li>${escape_html(step)}</li>`;
                        }
                        $$payload4.out += `<!--]--></ul></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.detailedAnalysis) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div><p class="font-medium mb-1"><i class="fa-solid fa-file-alt mr-1"></i>Detailed Analysis:</p> <div class="bg-white/50 rounded p-2">`;
                        MarkdownRenderer($$payload4, { content: result2.detailedAnalysis });
                        $$payload4.out += `<!----></div></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.note) {
                        $$payload4.out += "<!--[-->";
                        $$payload4.out += `<div class="text-sm text-gray-600 italic"><i class="fa-solid fa-info-circle mr-1"></i>${escape_html(result2.note)}</div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--> `;
                      if (result2.filesAnalyzed && result2.filesAnalyzed.length > 0) {
                        $$payload4.out += "<!--[-->";
                        const each_array_7 = ensure_array_like(result2.filesAnalyzed);
                        $$payload4.out += `<div class="text-sm text-gray-500"><p class="font-medium"><i class="fa-solid fa-file mr-1"></i>Files Analyzed (${escape_html(result2.filesAnalyzed.length)}):</p> <ul class="list-inside ml-4"><!--[-->`;
                        for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
                          let file = each_array_7[$$index_6];
                          $$payload4.out += `<li>${escape_html(file.filename)} - <span class="text-xs">${escape_html(file.relevance)}</span></li>`;
                        }
                        $$payload4.out += `<!--]--></ul></div>`;
                      } else {
                        $$payload4.out += "<!--[!-->";
                      }
                      $$payload4.out += `<!--]--></div>`;
                    } else {
                      $$payload4.out += "<!--[!-->";
                    }
                    $$payload4.out += `<!--]--></div>`;
                  };
                  Accordion.Item($$payload3, {
                    value: "analysis",
                    control,
                    panel,
                    $$slots: { control: true, panel: true }
                  });
                }
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----></div></form>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]--></ul></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-3ctsX-7s.js.map
