import { p as push, M as store_get, V as escape_html, T as attr, W as ensure_array_like, X as stringify, S as attr_class, Z as attr_style, Y as spread_props, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { d as RequirementAssessmentSchema } from './schemas-QFT6TgyO.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as AutocompleteSelect } from './crud-DvwwKulO.js';
import { F as Form } from './Form-s4NDhsV8.js';
import { H as HiddenInput } from './HiddenInput-D0PY8sFK.js';
import { S as Score } from './Score-CSpnV2pu.js';
import { S as Select } from './Select-C_sUsrMr.js';
import { M as MarkdownField } from './MarkdownField-BF4H_BAV.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { ED as lockedassessment1, EA as lockedrequirementassessmentmessage3, bo as description, Wf as additionalinformation1, qK as suggestedreferencecontrols2, pv as threatscovered1, kb as annotation, oF as typicalevidence1, DN as mappinginference1, DM as mappinginferencehelptext3, OS as coveragecolon1, sA as scoresemicolon2, qI as suggestioncolon1, e9 as result, sE as score, GA as implementationscore1, bp as cancel, sQ as saveandcontinue2, bq as save, vb as requirementappliedcontrolhelptext4, kn as suggestcontrols1, gm as addappliedcontrol2, Vy as appliedcontrolsplaceholder2, v2 as requirementevidencehelptext3, XU as addevidence1, WK as addsecurityexception2, dt as appliedcontrols1, cW as evidences, c4 as securityexceptions1, wd as questionsingular1, v6 as requirementassessmentstatushelptext4, cA as status, v7 as requirementassessmentresulthelptext4, IF as extendedresulthelptext3, ea as extendedresult1, L1 as documentationscore1, sw as scoringhelptext2 } from './_index-DZs3gE-i.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { C as Checkbox } from './Checkbox-BWsW28Xu.js';
import './runtime-B_ICGJZJ.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { b as complianceResultColorMap } from './constants-B8vm30bZ.js';
import './breadcrumbs-CnPDyFos.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as hideSuggestions } from './stores-CMqbeBUT.js';
import { j as computeRequirementScoreAndResult, f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { M as ModelTable } from './ModelTable-CONiCTnn.js';
import { c as countMasked } from './related-visibility-ukSq_O7b.js';
import { Q as Question } from './Question-Dka9SxH6.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './legacy-server-DMdb6ZTL.js';
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './app-Ci0UE2-c.js';
import './index6-Cn6jj1jH.js';
import './machine.svelte-CNa8MjEx.js';
import './Switch-IjY5G1Ys.js';
import './index5-Brzv1W4u.js';
import 'marked';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';
import './Popover-PelKNyF8.js';
import './index8-L4CsUepF.js';
import './Anchor-L6GP3zar.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './DeleteConfirmModal-KBvf9zHE.js';
import './Tooltip-Li45R7zs.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form, $$slots, $$events, ...rest } = $$props;
  const threats = data.requirementAssessment.requirement.associated_threats ?? [];
  const reference_controls = data.requirementAssessment.requirement.associated_reference_controls ?? [];
  const annotation$1 = data.requirement.annotation;
  const typical_evidence = data.requirement.typical_evidence;
  const has_threats = threats.length > 0;
  const has_reference_controls = reference_controls.length > 0;
  const implementationGroupsDefinition = data.requirementAssessment.compliance_assessment.framework?.implementation_groups_definition ?? [];
  function getImplementationGroupName(refId) {
    return implementationGroupsDefinition.find((g) => g.ref_id === refId)?.name ?? refId;
  }
  const complianceAssessmentURL = `/compliance-assessments/${data.requirementAssessment.compliance_assessment.id}`;
  const schema = RequirementAssessmentSchema;
  getModalStore();
  const requirementAssessmentForm = superForm(data.form, {
    dataType: "json",
    invalidateAll: true,
    applyAction: true,
    resetForm: false,
    validators: zod(schema),
    taintedMessage: false,
    validationMethod: "auto"
  });
  let mappingInference = {
    sourceRequirementAssessment: data.requirementAssessment.mapping_inference.source_requirement_assessment,
    result: data.requirementAssessment.mapping_inference.result
  };
  let requirementAssessmentsList = store_get($$store_subs ??= {}, "$hideSuggestions", hideSuggestions);
  let hideSuggestion = requirementAssessmentsList.includes(data.requirementAssessment.id) ? true : false;
  let classesText = complianceResultColorMap[mappingInference.result] === "#000000" ? "text-white" : "";
  let group = page.data.user.is_third_party ? "evidences" : "applied_controls";
  let formStore = requirementAssessmentForm.form;
  let computedScoreAndResult = computeRequirementScoreAndResult(data.requirementAssessment, store_get($$store_subs ??= {}, "$formStore", formStore).answers);
  let computedResult = computedScoreAndResult.result;
  let computedScore = computedScoreAndResult.score;
  let deletingAnalysisId = null;
  let localAiAnalyses = data.aiAnalyses || [];
  function getStatusColor(status2) {
    const s = (status2 || "").toLowerCase().replace(/[_\s-]+/g, "");
    if (s === "compliant") return "text-green-700 bg-green-100";
    if (s === "partiallycompliant") return "text-yellow-700 bg-yellow-100";
    if (s === "noncompliant") return "text-red-700 bg-red-100";
    if (s === "notassessed") return "text-gray-700 bg-gray-100";
    if (s === "notapplicable") return "text-blue-700 bg-blue-100";
    return "text-gray-700 bg-gray-100";
  }
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }
  if (data.requirementAssessment.compliance_assessment.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mb-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedrequirementassessmentmessage3())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="card space-y-2 p-4 bg-white shadow-sm"><div class="flex justify-between items-center"><div class="flex"><span class="code left h-min">${escape_html(data.requirement.urn)}</span></div> <div class="flex items-center gap-2"><form method="POST" action="?/runAiAnalysis"><button type="submit" class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"${attr("disabled", data.requirementAssessment.compliance_assessment.is_locked, true)} title="Start AI Analysis on Associated Evidences">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i> <span>Start AI Analysis</span>`;
  }
  $$payload.out += `<!--]--></button></form> <a class="text-pink-500 hover:text-pink-400"${attr("href", complianceAssessmentURL)} aria-label="Go to compliance assessment"><i class="fa-solid fa-turn-up"></i></a></div></div> `;
  if (data.requirement?.implementation_groups?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.requirement.implementation_groups);
    $$payload.out += `<div class="mb-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ig = each_array[$$index];
      $$payload.out += `<span class="badge bg-blue-100 mr-2">${escape_html(getImplementationGroupName(ig))}</span>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.requirement.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="font-light text-lg card p-4 preset-tonal-primary"><h2 class="font-semibold text-base flex flex-row justify-between"><div><i class="fa-solid fa-file-lines mr-2"></i>${escape_html(description())}</div></h2> `;
    MarkdownRenderer($$payload, { content: data.requirement.description });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (has_threats || has_reference_controls || annotation$1 || mappingInference.result || typical_evidence) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card p-4 preset-tonal-secondary text-sm flex flex-col justify-evenly cursor-auto"><h2 class="font-semibold text-base flex flex-row justify-between"><div><i class="fa-solid fa-circle-info mr-2"></i>${escape_html(additionalinformation1())}</div> <button>`;
    if (!hideSuggestion) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fa-solid fa-eye"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<i class="fa-solid fa-eye-slash"></i>`;
    }
    $$payload.out += `<!--]--></button></h2> `;
    if (!hideSuggestion) {
      $$payload.out += "<!--[-->";
      if (has_threats || has_reference_controls) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="my-2 flex flex-col"><div class="flex-1">`;
        if (reference_controls.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_1 = ensure_array_like(reference_controls);
          $$payload.out += `<p class="font-medium"><i class="fa-solid fa-gears"></i> ${escape_html(suggestedreferencecontrols2())}</p> <ul class="list-disc ml-4"><!--[-->`;
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let func = each_array_1[$$index_1];
            $$payload.out += `<li>`;
            if (func.id) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<a class="anchor"${attr("href", `/reference-controls/${stringify(func.id)}`)}>${escape_html(func.str)}</a>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<p>${escape_html(func.str)}</p>`;
            }
            $$payload.out += `<!--]--></li>`;
          }
          $$payload.out += `<!--]--></ul>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div> <div class="flex-1">`;
        if (threats.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_2 = ensure_array_like(threats);
          $$payload.out += `<p class="font-medium"><i class="fa-solid fa-gears"></i> ${escape_html(threatscovered1())}</p> <ul class="list-disc ml-4"><!--[-->`;
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let threat = each_array_2[$$index_2];
            $$payload.out += `<li>`;
            if (threat.id) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<a class="anchor"${attr("href", `/threats/${stringify(threat.id)}`)}>${escape_html(threat.str)}</a>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<p>${escape_html(threat.str)}</p>`;
            }
            $$payload.out += `<!--]--></li>`;
          }
          $$payload.out += `<!--]--></ul>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (annotation$1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-pencil"></i> ${escape_html(annotation())}</p> <div class="py-1">`;
        MarkdownRenderer($$payload, { content: annotation$1 });
        $$payload.out += `<!----></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (typical_evidence) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-pencil"></i> ${escape_html(typicalevidence1())}</p> <div class="py-1">`;
        MarkdownRenderer($$payload, { content: typical_evidence });
        $$payload.out += `<!----></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (mappingInference.result) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-link"></i> ${escape_html(mappinginference1())}</p> <span class="text-xs text-gray-500"><i class="fa-solid fa-circle-info"></i> ${escape_html(mappinginferencehelptext3())}</span> <ul class="list-disc ml-4"><li><p><a class="anchor"${attr("href", `/requirement-assessments/${stringify(mappingInference.sourceRequirementAssessment.id)}`)}>${escape_html(mappingInference.sourceRequirementAssessment.str)}</a></p> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(coveragecolon1())}</span> <span class="badge h-fit">${escape_html(safeTranslate(mappingInference.sourceRequirementAssessment.coverage))}</span></p> `;
        if (mappingInference.sourceRequirementAssessment.is_scored) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="whitespace-pre-line py-1"><span class="italic">${escape_html(scoresemicolon2())}</span> <span class="badge h-fit">${escape_html(safeTranslate(mappingInference.sourceRequirementAssessment.score))}</span></p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(suggestioncolon1())}</span> <span${attr_class(`badge ${stringify(classesText)} h-fit`)}${attr_style(`background-color: ${stringify(complianceResultColorMap[mappingInference.result])};`)}>${escape_html(safeTranslate(mappingInference.result))}</span></p> `;
        {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></li></ul></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="mt-4">`;
  {
    let children = function($$payload2, { form: form2, data: data2 }) {
      $$payload2.out += `<div class="card shadow-lg bg-white">`;
      {
        let list = function($$payload3) {
          if (!page.data.user.is_third_party) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Tabs.Control($$payload3, {
              value: "applied_controls",
              children: ($$payload4) => {
                $$payload4.out += `<!---->${escape_html(appliedcontrols1())}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Tabs.Control($$payload3, {
            value: "evidences",
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(evidences())}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Tabs.Control($$payload3, {
            value: "security_exceptions",
            children: ($$payload4) => {
              $$payload4.out += `<!---->${escape_html(securityexceptions1())}`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        }, content = function($$payload3) {
          $$payload3.out += `<!---->`;
          Tabs.Panel($$payload3, {
            value: "applied_controls",
            children: ($$payload4) => {
              $$payload4.out += `<div class="flex items-center mb-2 px-2 text-xs space-x-2"><i class="fa-solid fa-info-circle"></i> <p>${escape_html(requirementappliedcontrolhelptext4())}</p></div> <div class="h-full flex flex-col space-y-2 rounded-container p-4"><span class="flex flex-row justify-end items-center space-x-2">`;
              if (Object.hasOwn(page.data.user.permissions, "add_appliedcontrol") && reference_controls.length > 0) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit whitespace-normal" type="button"><span class="mr-2">`;
                {
                  $$payload4.out += "<!--[!-->";
                  $$payload4.out += `<i class="fa-solid fa-fire-extinguisher"></i>`;
                }
                $$payload4.out += `<!--]--></span> ${escape_html(suggestcontrols1())}</button>`;
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--> <button class="btn preset-filled-primary-500 self-end" type="button"><i class="fa-solid fa-plus mr-2"></i>${escape_html(addappliedcontrol2())}</button></span> <!---->`;
              {
                AutocompleteSelect($$payload4, {
                  multiple: true,
                  form: form2,
                  optionsEndpoint: "applied-controls",
                  optionsDetailedUrlParameters: [
                    [
                      "scope_folder_id",
                      page.data.requirementAssessment.folder.id
                    ]
                  ],
                  optionsExtraFields: [["folder", "str"]],
                  field: "applied_controls",
                  placeholder: appliedcontrolsplaceholder2()
                });
              }
              $$payload4.out += `<!----> `;
              ModelTable($$payload4, {
                baseEndpoint: `/applied-controls?requirement_assessments=${stringify(page.data.requirementAssessment.id)}`,
                source: page.data.tables["applied-controls"],
                hideFilters: true,
                URLModel: "applied-controls",
                expectedCount: countMasked(page.data.requirementAssessment.applied_controls)
              });
              $$payload4.out += `<!----></div>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Tabs.Panel($$payload3, {
            value: "evidences",
            children: ($$payload4) => {
              $$payload4.out += `<div class="flex items-center mb-2 px-2 text-xs space-x-2"><i class="fa-solid fa-info-circle"></i> <p>${escape_html(requirementevidencehelptext3())}</p></div> <div class="h-full flex flex-col space-y-2 rounded-container p-4"><span class="flex flex-row justify-end items-center"><button class="btn preset-filled-primary-500 self-end" type="button"><i class="fa-solid fa-plus mr-2"></i>${escape_html(addevidence1())}</button></span> <!---->`;
              {
                AutocompleteSelect($$payload4, {
                  multiple: true,
                  form: form2,
                  optionsEndpoint: "evidences",
                  optionsExtraFields: [["folder", "str"]],
                  optionsDetailedUrlParameters: [
                    [
                      "scope_folder_id",
                      page.data.requirementAssessment.folder.id
                    ]
                  ],
                  field: "evidences"
                });
              }
              $$payload4.out += `<!----> `;
              ModelTable($$payload4, {
                source: page.data.tables["evidences"],
                hideFilters: true,
                URLModel: "evidences",
                expectedCount: countMasked(page.data.requirementAssessment.evidences),
                baseEndpoint: `/evidences?requirement_assessments=${stringify(page.data.requirementAssessment.id)}`
              });
              $$payload4.out += `<!----></div>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Tabs.Panel($$payload3, {
            value: "security_exceptions",
            children: ($$payload4) => {
              $$payload4.out += `<div class="h-full flex flex-col space-y-2 rounded-container p-4"><span class="flex flex-row justify-end items-center"><button class="btn preset-filled-primary-500 self-end" type="button"><i class="fa-solid fa-plus mr-2"></i>${escape_html(addsecurityexception2())}</button></span> <!---->`;
              {
                AutocompleteSelect($$payload4, {
                  multiple: true,
                  form: form2,
                  optionsEndpoint: "security-exceptions",
                  optionsExtraFields: [["folder", "str"]],
                  field: "security_exceptions"
                });
              }
              $$payload4.out += `<!----> `;
              ModelTable($$payload4, {
                source: page.data.tables["security-exceptions"],
                hideFilters: true,
                URLModel: "security-exceptions",
                expectedCount: countMasked(page.data.requirementAssessment.security_exceptions),
                baseEndpoint: `/security-exceptions?requirement_assessments=${stringify(page.data.requirementAssessment.id)}`
              });
              $$payload4.out += `<!----></div>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        };
        Tabs($$payload2, {
          value: group,
          onValueChange: (e) => {
            group = e.value;
          },
          list,
          content,
          $$slots: { list: true, content: true }
        });
      }
      $$payload2.out += `<!----></div> `;
      HiddenInput($$payload2, { form: form2, field: "folder" });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form: form2, field: "requirement" });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form: form2, field: "compliance_assessment" });
      $$payload2.out += `<!----> <div class="flex flex-col my-8 space-y-6"><div class="card bg-white shadow-lg rounded-lg overflow-hidden"><div class="p-6">`;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="mb-4 flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-800"><i class="fa-solid fa-brain text-[#0A1628] mr-2"></i> AI Analysis History</h3> <span class="text-sm text-gray-500">${escape_html(localAiAnalyses?.length || 0)} analysis(es)</span></div> `;
      if (localAiAnalyses?.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array_3 = ensure_array_like(localAiAnalyses);
        $$payload2.out += `<div class="overflow-x-auto border border-gray-200 rounded-lg"><table class="w-full text-sm"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="text-left px-4 py-3 font-semibold text-gray-600">Date</th><th class="text-left px-4 py-3 font-semibold text-gray-600">Status</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Files</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Requirements</th><th class="text-center px-4 py-3 font-semibold text-gray-600">Actions</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let analysis = each_array_3[$$index_3];
          $$payload2.out += `<tr class="hover:bg-gray-50 transition-colors"><td class="px-4 py-3 text-gray-700">${escape_html(formatDate(analysis.created_at))}</td><td class="px-4 py-3"><span${attr_class(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stringify(getStatusColor(analysis.status))}`)}>`;
          if (analysis.status === "completed") {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<i class="fa-solid fa-circle-check mr-1"></i>`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<i class="fa-solid fa-circle-xmark mr-1"></i>`;
          }
          $$payload2.out += `<!--]--> ${escape_html(analysis.status)}</span></td><td class="px-4 py-3 text-center text-gray-600">${escape_html(analysis.gemini_files_count)}</td><td class="px-4 py-3 text-center text-gray-600">${escape_html(analysis.requirements_count)}</td><td class="px-4 py-3 text-center"><div class="flex items-center justify-center gap-1"><button type="button" class="btn btn-sm preset-tonal-primary" title="View full analysis"><i class="fa-solid fa-eye mr-1"></i> View</button> <button type="button" class="btn btn-sm preset-tonal-error" title="Delete analysis"${attr("disabled", deletingAnalysisId === analysis.id, true)}>`;
          if (deletingAnalysisId === analysis.id) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<i class="fa-solid fa-spinner fa-spin"></i>`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<i class="fa-solid fa-trash"></i>`;
          }
          $$payload2.out += `<!--]--></button></div></td></tr>`;
        }
        $$payload2.out += `<!--]--></tbody></table></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="text-center py-8"><div class="inline-block p-4 rounded-full bg-[#0A1628]/10 mb-3"><i class="fa-solid fa-brain text-3xl text-[#0A1628]"></i></div> <h3 class="text-lg font-semibold text-gray-800 mb-1">No AI Analyses Yet</h3> <p class="text-gray-600 text-sm">Click "Start AI Analysis" above to analyze all associated evidence files.</p></div>`;
      }
      $$payload2.out += `<!--]--></div></div> `;
      if (page.data.requirementAssessment.requirement.questions != null && Object.keys(page.data.requirementAssessment.requirement.questions).length !== 0) {
        $$payload2.out += "<!--[-->";
        Question($$payload2, {
          form: form2,
          field: "answers",
          questions: page.data.requirementAssessment.requirement.questions,
          label: questionsingular1()
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      Select($$payload2, {
        form: form2,
        options: page.data.model.selectOptions["status"],
        field: "status",
        label: status(),
        helpText: requirementassessmentstatushelptext4()
      });
      $$payload2.out += `<!----> `;
      if (computedResult) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="flex flex-row items-center space-x-4"><span class="font-medium">${escape_html(result())}</span> <span class="badge text-sm font-semibold"${attr_style(`background-color: ${stringify(complianceResultColorMap[computedResult || "not_assessed"] || "#ddd")}`)}>${escape_html(safeTranslate(computedResult || "not_assessed"))}</span></p>`;
      } else {
        $$payload2.out += "<!--[!-->";
        Select($$payload2, {
          form: form2,
          options: page.data.model.selectOptions["result"],
          field: "result",
          label: result(),
          helpText: requirementassessmentresulthelptext4()
        });
      }
      $$payload2.out += `<!--]--> `;
      if (page.data.requirementAssessment.compliance_assessment.extended_result_enabled) {
        $$payload2.out += "<!--[-->";
        Select($$payload2, {
          form: form2,
          options: page.data.model.selectOptions["extended_result"],
          field: "extended_result",
          label: extendedresult1(),
          helpText: extendedresulthelptext3()
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (computedScore !== null) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex flex-row items-center space-x-4"><span class="font-medium">${escape_html(score())}</span> `;
        ProgressRing($$payload2, {
          strokeWidth: "20px",
          meterStroke: displayScoreColor(computedScore, page.data.compliance_assessment_score.max_score),
          value: formatScoreValue(computedScore || 0, page.data.compliance_assessment_score.max_score),
          classes: "shrink-0",
          size: "size-10",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(computedScore)}`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="flex flex-col">`;
        {
          let left = function($$payload3) {
            $$payload3.out += `<div>`;
            Checkbox($$payload3, {
              form: form2,
              field: "is_scored",
              label: "",
              helpText: scoringhelptext2(),
              checkboxComponent: "switch",
              classes: "h-full flex flex-row items-center justify-center my-1",
              classesContainer: "h-full flex flex-row items-center space-x-4"
            });
            $$payload3.out += `<!----></div>`;
          };
          Score($$payload2, {
            form: form2,
            min_score: page.data.compliance_assessment_score.min_score,
            max_score: page.data.compliance_assessment_score.max_score,
            scores_definition: page.data.compliance_assessment_score.scores_definition,
            field: "score",
            label: page.data.compliance_assessment_score.show_documentation_score ? implementationscore1() : score(),
            disabled: !data2.is_scored || data2.result === "not_applicable",
            left,
            $$slots: { left: true }
          });
        }
        $$payload2.out += `<!----></div> `;
        if (page.data.compliance_assessment_score.show_documentation_score) {
          $$payload2.out += "<!--[-->";
          Score($$payload2, {
            form: form2,
            min_score: page.data.compliance_assessment_score.min_score,
            max_score: page.data.compliance_assessment_score.max_score,
            scores_definition: page.data.compliance_assessment_score.scores_definition,
            field: "documentation_score",
            label: documentationscore1(),
            isDoc: true,
            disabled: !data2.is_scored || data2.result === "not_applicable"
          });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      MarkdownField($$payload2, {
        form: form2,
        field: "observation",
        label: "Observation"
      });
      $$payload2.out += `<!----> <div class="flex flex-row justify-between space-x-4"><button class="btn bg-gray-400 text-white font-semibold w-full" type="button">${escape_html(cancel())}</button> <button class="btn preset-filled-secondary-500 font-semibold w-full" data-testid="save-no-continue-button" type="submit">${escape_html(saveandcontinue2())}</button> <button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="save-button" type="submit">${escape_html(save())}</button></div></div>`;
    };
    Form($$payload, spread_props([
      {
        class: "flex flex-col",
        _form: requirementAssessmentForm,
        data: data.form,
        action: "?/updateRequirementAssessment"
      },
      rest,
      { children, $$slots: { default: true } }
    ]));
  }
  $$payload.out += `<!----></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte--inAsKlj.js.map
