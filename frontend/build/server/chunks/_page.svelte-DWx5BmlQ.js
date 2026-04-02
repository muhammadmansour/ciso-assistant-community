import { p as push, M as store_get, V as escape_html, T as attr, W as ensure_array_like, Y as spread_props, Q as unsubscribe_stores, a as pop, X as stringify, S as attr_class, Z as attr_style } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-D3bRixKV.js';
import { d as RequirementAssessmentSchema } from './schemas-DWhEPmW4.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as AutocompleteSelect } from './crud-T40TopyM.js';
import { F as Form } from './Form-CU-l-bUF.js';
import { H as HiddenInput } from './HiddenInput-D0PY8sFK.js';
import { S as Score } from './Score-CSpnV2pu.js';
import { S as Select } from './Select-MWTH723S.js';
import { M as MarkdownField } from './MarkdownField-BFmeXBjN.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { Eh as lockedassessment1, Ee as lockedrequirementassessmentmessage3, bo as description, VR as additionalinformation1, oB as typicalevidence1, qG as suggestedreferencecontrols2, pr as threatscovered1, Dr as mappinginference1, Dq as mappinginferencehelptext3, Ou as coveragecolon1, su as scoresemicolon2, qE as suggestioncolon1, cA as status, e9 as result, v0 as requirementappliedcontrolhelptext4, kl as suggestcontrols1, gk as addappliedcontrol2, V9 as appliedcontrolsplaceholder2, uT as requirementevidencehelptext3, Xu as addevidence1, Wk as addsecurityexception2, dt as appliedcontrols1, cW as evidences, c4 as securityexceptions1, uX as requirementassessmentstatushelptext4, uY as requirementassessmentresulthelptext4, Ik as extendedresulthelptext3, ea as extendedresult1, KJ as documentationscore1, sq as scoringhelptext2 } from './_index-B12BAPce.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { C as Checkbox } from './Checkbox-BWsW28Xu.js';
import './runtime-BKo9q3Zd.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { b as complianceResultColorMap } from './constants-QzmVibOJ.js';
import './breadcrumbs-B1Us7xd5.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { h as hideSuggestions } from './stores-D-WMoATo.js';
import { j as computeRequirementScoreAndResult, c as isQuestionVisible, f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { M as ModelTable } from './ModelTable-CBxNmYiP.js';
import { c as countMasked } from './related-visibility-ukSq_O7b.js';
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
import './Anchor-B1pWCcQZ.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './DeleteConfirmModal-DmAIPnRV.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form, $$slots, $$events, ...rest } = $$props;
  const threats = data.requirementAssessment.requirement.associated_threats ?? [];
  const reference_controls = data.requirementAssessment.requirement.associated_reference_controls ?? [];
  const annotation = data.requirement.annotation;
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
  let auditEntries = data.auditLogEntries ?? [];
  let deletingAnalysisId = null;
  let localAiAnalyses = data.aiAnalyses || [];
  const ALLOWED_CHANGE_FIELDS = /* @__PURE__ */ new Set([
    "result",
    "status",
    "observation",
    "answers",
    "score"
  ]);
  let filteredAuditEntries = (() => {
    return (auditEntries || []).map((entry) => {
      const changes = entry.changes && typeof entry.changes === "object" ? entry.changes : {};
      const filtered = {};
      for (const [field, change] of Object.entries(changes)) {
        if (ALLOWED_CHANGE_FIELDS.has(field)) {
          filtered[field] = change;
        }
      }
      if (entry.action === "info") {
        return { ...entry, changes: filtered };
      }
      if (Object.keys(filtered).length === 0) return null;
      return { ...entry, changes: filtered };
    }).filter(Boolean);
  })();
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }
  if (data.requirementAssessment.compliance_assessment.is_locked) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg shadow-sm mb-4"><div class="flex items-center"><i class="fa-solid fa-lock text-yellow-600 mr-2"></i> <span class="font-medium">${escape_html(lockedassessment1())}</span> <span class="ml-2 text-sm">${escape_html(lockedrequirementassessmentmessage3())}</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex items-start justify-between mb-6 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5"><div class="flex items-start gap-3"><a class="mt-1.5 text-gray-400 hover:text-[#005FA3] transition-colors"${attr("href", complianceAssessmentURL)} aria-label="Go back"><i class="fa-solid fa-arrow-left text-lg"></i></a> <div><div class="flex items-center gap-3 mb-1"><h1 class="text-2xl font-bold text-gray-900">${escape_html(data.requirement.ref_id)}</h1> <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white border border-[#005FA3]/20 text-[#005FA3]">${escape_html(data.requirement.urn)}</span></div> <p class="text-sm text-gray-500">${escape_html(data.requirementAssessment.name)}</p></div></div> <button type="button" class="btn bg-[#005FA3] text-white hover:bg-[#004d85] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 rounded-lg px-5 py-2.5"${attr("disabled", data.requirementAssessment.compliance_assessment.is_locked, true)} title="Run AI Analysis on Associated Evidences">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i> <span>Run AI Analysis</span>`;
  }
  $$payload.out += `<!--]--></button></div> `;
  if (data.requirement?.implementation_groups?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.requirement.implementation_groups);
    $$payload.out += `<div class="mb-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ig = each_array[$$index];
      $$payload.out += `<span class="badge bg-blue-100 mr-2">${escape_html(getImplementationGroupName(ig))}</span>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    let children = function($$payload2, { form: form2, data: data2 }) {
      HiddenInput($$payload2, { form: form2, field: "folder" });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form: form2, field: "requirement" });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form: form2, field: "compliance_assessment" });
      $$payload2.out += `<!----> <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5"><div class="space-y-4 min-w-0">`;
      if (page.data.requirement.description) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="card bg-white shadow-sm border border-gray-200 rounded-xl p-5"><h2 class="flex items-center gap-2 font-semibold text-base text-gray-900 mb-3"><i class="fa-solid fa-circle-info text-[#005FA3]"></i> ${escape_html(description())}</h2> <div class="text-sm text-gray-600 leading-relaxed">`;
        MarkdownRenderer($$payload2, { content: page.data.requirement.description });
        $$payload2.out += `<!----></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (has_threats || has_reference_controls || annotation || mappingInference.result || typical_evidence) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="card bg-white shadow-sm border border-gray-200 rounded-xl p-5 text-sm"><div class="flex items-center justify-between mb-3"><h2 class="flex items-center gap-2 font-semibold text-base text-gray-900"><i class="fa-solid fa-circle-info text-[#005FA3]"></i> ${escape_html(additionalinformation1())}</h2> <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors">`;
        if (!hideSuggestion) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<i class="fa-solid fa-eye"></i>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<i class="fa-solid fa-eye-slash"></i>`;
        }
        $$payload2.out += `<!--]--></button></div> `;
        if (!hideSuggestion) {
          $$payload2.out += "<!--[-->";
          if (typical_evidence) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="mb-3"><p class="font-semibold text-xs uppercase tracking-wider text-[#1D53DA] mb-1.5"><i class="fa-solid fa-clipboard-list mr-1.5 text-[#1D53DA]"></i> ${escape_html(typicalevidence1())}</p> <div class="text-sm text-gray-600 leading-relaxed" dir="auto">`;
            MarkdownRenderer($$payload2, { content: typical_evidence });
            $$payload2.out += `<!----></div></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> `;
          if (annotation) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="text-sm text-gray-600 italic leading-relaxed mb-3" dir="auto">`;
            MarkdownRenderer($$payload2, { content: annotation });
            $$payload2.out += `<!----></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> `;
          if (has_threats || has_reference_controls) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="my-2 flex flex-col"><div class="flex-1">`;
            if (reference_controls.length > 0) {
              $$payload2.out += "<!--[-->";
              const each_array_1 = ensure_array_like(reference_controls);
              $$payload2.out += `<p class="font-medium"><i class="fa-solid fa-gears"></i> ${escape_html(suggestedreferencecontrols2())}</p> <ul class="list-disc ml-4"><!--[-->`;
              for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                let func = each_array_1[$$index_1];
                $$payload2.out += `<li>`;
                if (func.id) {
                  $$payload2.out += "<!--[-->";
                  $$payload2.out += `<a class="anchor"${attr("href", `/reference-controls/${stringify(func.id)}`)}>${escape_html(func.str)}</a>`;
                } else {
                  $$payload2.out += "<!--[!-->";
                  $$payload2.out += `<p>${escape_html(func.str)}</p>`;
                }
                $$payload2.out += `<!--]--></li>`;
              }
              $$payload2.out += `<!--]--></ul>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--></div> <div class="flex-1">`;
            if (threats.length > 0) {
              $$payload2.out += "<!--[-->";
              const each_array_2 = ensure_array_like(threats);
              $$payload2.out += `<p class="font-medium"><i class="fa-solid fa-gears"></i> ${escape_html(threatscovered1())}</p> <ul class="list-disc ml-4"><!--[-->`;
              for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                let threat = each_array_2[$$index_2];
                $$payload2.out += `<li>`;
                if (threat.id) {
                  $$payload2.out += "<!--[-->";
                  $$payload2.out += `<a class="anchor"${attr("href", `/threats/${stringify(threat.id)}`)}>${escape_html(threat.str)}</a>`;
                } else {
                  $$payload2.out += "<!--[!-->";
                  $$payload2.out += `<p>${escape_html(threat.str)}</p>`;
                }
                $$payload2.out += `<!--]--></li>`;
              }
              $$payload2.out += `<!--]--></ul>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--></div></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> `;
          if (mappingInference.result) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-link"></i> ${escape_html(mappinginference1())}</p> <span class="text-xs text-gray-500"><i class="fa-solid fa-circle-info"></i> ${escape_html(mappinginferencehelptext3())}</span> <ul class="list-disc ml-4"><li><p><a class="anchor"${attr("href", `/requirement-assessments/${stringify(mappingInference.sourceRequirementAssessment.id)}`)}>${escape_html(mappingInference.sourceRequirementAssessment.str)}</a></p> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(coveragecolon1())}</span> <span class="badge h-fit">${escape_html(safeTranslate(mappingInference.sourceRequirementAssessment.coverage))}</span></p> `;
            if (mappingInference.sourceRequirementAssessment.is_scored) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<p class="whitespace-pre-line py-1"><span class="italic">${escape_html(scoresemicolon2())}</span> <span class="badge h-fit">${escape_html(safeTranslate(mappingInference.sourceRequirementAssessment.score))}</span></p>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(suggestioncolon1())}</span> <span${attr_class(`badge ${stringify(classesText)} h-fit`)}${attr_style(`background-color: ${stringify(complianceResultColorMap[mappingInference.result])};`)}>${escape_html(safeTranslate(mappingInference.result))}</span></p> `;
            {
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
      $$payload2.out += `<!--]--> <div class="card shadow-sm bg-white border border-gray-200 rounded-xl">`;
      {
        let list = function($$payload3) {
          $$payload3.out += `<div class="flex border-b border-gray-200">`;
          if (!page.data.user.is_third_party) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<button type="button"${attr_class(`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${stringify(group === "applied_controls" ? "border-[#1D53DA] text-[#1D53DA]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>${escape_html(appliedcontrols1())}</button>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <button type="button"${attr_class(`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${stringify(group === "evidences" ? "border-[#1D53DA] text-[#1D53DA]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>${escape_html(evidences())}</button> <button type="button"${attr_class(`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${stringify(group === "security_exceptions" ? "border-[#1D53DA] text-[#1D53DA]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")}`)}>${escape_html(securityexceptions1())}</button></div>`;
        }, content = function($$payload3) {
          $$payload3.out += `<!---->`;
          Tabs.Panel($$payload3, {
            value: "applied_controls",
            children: ($$payload4) => {
              $$payload4.out += `<div class="flex items-center mb-2 px-2 text-xs space-x-2"><i class="fa-solid fa-info-circle"></i> <p>${escape_html(requirementappliedcontrolhelptext4())}</p></div> <div class="h-full flex flex-col space-y-2 rounded-container p-4"><span class="flex flex-row justify-end items-center space-x-2">`;
              if (Object.hasOwn(page.data.user.permissions, "add_appliedcontrol") && reference_controls.length > 0) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<button class="btn bg-[#005FA3] text-white hover:bg-[#1a2740] shadow-sm h-fit whitespace-normal" type="button"><span class="mr-2">`;
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
      if (page.data.requirementAssessment.requirement.questions != null && Object.keys(page.data.requirementAssessment.requirement.questions).length !== 0) {
        $$payload2.out += "<!--[-->";
        const reqQuestions = page.data.requirementAssessment.requirement.questions;
        const questionEntries = Object.entries(reqQuestions);
        $$payload2.out += `<div class="card bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden relative"><button type="button" class="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"><span class="flex items-center gap-2.5"><i class="fa-solid fa-robot text-[#005FA3]"></i> <span class="text-sm font-semibold text-gray-800">Assessment Questions</span> <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold bg-[#005FA3]/10 text-[#005FA3]">${escape_html(questionEntries.length)}</span></span> <i${attr_class(`fa-solid ${stringify("fa-chevron-up")} text-gray-400 text-xs`)}></i></button> `;
        {
          $$payload2.out += "<!--[-->";
          const each_array_3 = ensure_array_like(questionEntries);
          $$payload2.out += `<div class="px-5 pb-5 space-y-3"><!--[-->`;
          for (let idx = 0, $$length = each_array_3.length; idx < $$length; idx++) {
            let [urn, question] = each_array_3[idx];
            const currentAnswer = data2?.answers?.[urn];
            if (isQuestionVisible(question, data2?.answers || {})) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="border border-gray-200 rounded-xl px-5 py-4"><div class="flex items-start gap-4 mb-3"><div class="shrink-0 min-w-[60px]"><div class="text-sm font-bold text-gray-500">Q${escape_html(idx + 1)}</div> <div class="text-[11px] text-gray-400 capitalize whitespace-nowrap">${escape_html(question.type === "unique_choice" ? "Unique Choice" : question.type === "multiple_choice" ? "Multiple Choice" : question.type?.replace(/_/g, " ") || "")}</div></div> <div class="flex-1 text-sm text-gray-700 font-medium" dir="auto">${escape_html(question.text)}</div></div> `;
              if (question.type === "unique_choice") {
                $$payload2.out += "<!--[-->";
                const each_array_4 = ensure_array_like(question.choices);
                $$payload2.out += `<div class="flex flex-row flex-wrap gap-1.5"><!--[-->`;
                for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
                  let option = each_array_4[$$index_3];
                  const selected = currentAnswer === option.urn;
                  $$payload2.out += `<button type="button"${attr_class(`px-3 py-1 text-sm rounded-lg border transition-all duration-150 ${stringify(selected ? "text-white shadow-sm border-transparent" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200")}`)}${attr_style(selected ? `background-color: ${option.color || "#005FA3"}; border-color: ${option.color || "#005FA3"};` : "")}>${escape_html(option.value)}</button>`;
                }
                $$payload2.out += `<!--]--></div>`;
              } else if (question.type === "multiple_choice") {
                $$payload2.out += "<!--[1-->";
                const each_array_5 = ensure_array_like(question.choices);
                $$payload2.out += `<div class="flex flex-row flex-wrap gap-1.5"><!--[-->`;
                for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
                  let option = each_array_5[$$index_4];
                  const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option.urn);
                  $$payload2.out += `<button type="button"${attr_class(`px-3 py-1 text-sm rounded-lg border transition-all duration-150 ${stringify(selected ? "text-white shadow-sm border-transparent" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200")}`)}${attr_style(selected ? `background-color: ${option.color || "#005FA3"}; border-color: ${option.color || "#005FA3"};` : "")}>${escape_html(option.value)}</button>`;
                }
                $$payload2.out += `<!--]--></div>`;
              } else if (question.type === "date") {
                $$payload2.out += "<!--[2-->";
                $$payload2.out += `<input type="date" class="input w-fit"${attr("value", currentAnswer || "")}/>`;
              } else if (question.type === "text") {
                $$payload2.out += "<!--[3-->";
                $$payload2.out += `<textarea placeholder="" class="input w-full">`;
                const $$body = escape_html(currentAnswer || "");
                if ($$body) {
                  $$payload2.out += `${$$body}`;
                }
                $$payload2.out += `</textarea>`;
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]--></div>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }
          $$payload2.out += `<!--]--></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="relative bg-white rounded-xl border border-gray-100 shadow-sm p-5">`;
      MarkdownField($$payload2, {
        form: form2,
        field: "observation",
        label: "Observation"
      });
      $$payload2.out += `<!----></div> <div class="border border-gray-200 rounded-lg overflow-hidden bg-white"><button type="button" class="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"><span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><i class="fa-solid fa-clock-rotate-left text-gray-500"></i> Change History `;
      if (filteredAuditEntries.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">${escape_html(filteredAuditEntries.length)}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></span> <i${attr_class(`fa-solid ${stringify("fa-chevron-down")} text-gray-400 text-xs`)}></i></button> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> <div class="h-20"></div></div> <div class="space-y-4"><div class="card bg-white shadow-sm border border-gray-200 rounded-xl p-5 space-y-4"><div class="relative"><label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"><i class="fa-regular fa-clock text-[#005FA3]"></i> ${escape_html(status())} <span class="text-red-500">*</span></label> `;
      Select($$payload2, {
        form: form2,
        options: page.data.model.selectOptions["status"],
        field: "status",
        label: "",
        helpText: requirementassessmentstatushelptext4()
      });
      $$payload2.out += `<!----></div> <div class="border-t border-gray-100"></div> `;
      if (computedResult) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div><label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"><i class="fa-regular fa-circle-check text-[#005FA3]"></i> ${escape_html(result())}</label> <span class="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold"><span class="w-2 h-2 rounded-full"${attr_style(`background-color: ${stringify(complianceResultColorMap[computedResult || "not_assessed"] || "#ddd")}`)}></span> ${escape_html(safeTranslate(computedResult || "not_assessed"))}</span></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="relative"><label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"><i class="fa-regular fa-circle-check text-[#005FA3]"></i> ${escape_html(result())} <span class="text-red-500">*</span></label> `;
        Select($$payload2, {
          form: form2,
          options: page.data.model.selectOptions["result"],
          field: "result",
          label: "",
          helpText: requirementassessmentresulthelptext4()
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]--> `;
      if (page.data.requirementAssessment.compliance_assessment.extended_result_enabled) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="mt-1">`;
        Select($$payload2, {
          form: form2,
          options: page.data.model.selectOptions["extended_result"],
          field: "extended_result",
          label: extendedresult1(),
          helpText: extendedresulthelptext3()
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> <div class="card bg-white shadow-sm border border-gray-200 rounded-xl p-5"><label class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"><i class="fa-solid fa-chart-bar text-[#005FA3]"></i> Scoring</label> `;
      if (computedScore !== null) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex flex-row items-center space-x-4">`;
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
            label: "",
            disabled: !data2.is_scored || data2.result === "not_applicable",
            left,
            $$slots: { left: true }
          });
        }
        $$payload2.out += `<!----></div> `;
        if (page.data.compliance_assessment_score.show_documentation_score) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="mt-3">`;
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
          $$payload2.out += `<!----></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--></div> <div class="card bg-white shadow-sm border border-gray-200 rounded-xl p-5"><div class="flex items-center justify-between mb-3"><h3 class="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"><i class="fa-solid fa-wand-magic-sparkles text-[#005FA3]"></i> AI HISTORY</h3> `;
      if (localAiAnalyses?.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">${escape_html(localAiAnalyses.length)}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> `;
      if (localAiAnalyses?.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array_8 = ensure_array_like(localAiAnalyses);
        $$payload2.out += `<div class="space-y-1"><!--[-->`;
        for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
          let analysis = each_array_8[$$index_8];
          $$payload2.out += `<div class="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left group cursor-pointer"><span${attr_class(`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${stringify(analysis.status === "completed" ? "bg-emerald-500" : "bg-red-400")}`)}></span> <div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900">${escape_html(formatDate(analysis.created_at))}</p> <p class="text-xs text-gray-500">${escape_html(analysis.gemini_files_count || 0)} files analyzed</p></div> <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><button type="button" class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete analysis"${attr("disabled", deletingAnalysisId === analysis.id, true)}>`;
          if (deletingAnalysisId === analysis.id) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<i class="fa-solid fa-spinner fa-spin text-xs"></i>`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<i class="fa-solid fa-trash text-xs"></i>`;
          }
          $$payload2.out += `<!--]--></button></div></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="text-center py-6"><div class="inline-block p-3 rounded-full bg-[#005FA3]/5 mb-2"><i class="fa-solid fa-wand-magic-sparkles text-xl text-[#005FA3]/40"></i></div> <p class="text-sm text-gray-500">No analyses yet</p></div>`;
      }
      $$payload2.out += `<!--]--></div></div></div> <div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"><div class="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between"><button type="button" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</button> <div class="flex items-center gap-3"><button class="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-5 py-2 rounded-lg text-sm transition-colors" data-testid="save-no-continue-button" type="submit">Save and Continue</button> <button class="btn bg-[#005FA3] hover:bg-[#004d85] text-white font-medium px-8 py-2 rounded-lg text-sm transition-colors shadow-sm" data-testid="save-button" type="submit">Save</button></div></div></div>`;
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
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DWx5BmlQ.js.map
