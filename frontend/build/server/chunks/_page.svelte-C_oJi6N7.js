import { p as push, M as store_get, V as escape_html, Z as attr_style, S as attr_class, X as stringify, W as ensure_array_like, T as attr, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelTable } from './ModelTable-veXZDKES.js';
import { f as complianceStatusColorMap, b as complianceResultColorMap } from './constants-QzmVibOJ.js';
import { e as getRequirementTitle, f as formatScoreValue, d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import { s as safeTranslate, t as toCamelCase } from './i18n-DuIONS9Q.js';
import { h as hideSuggestions } from './stores-D-WMoATo.js';
import { bo as description, VT as additionalinformation1, qG as suggestedreferencecontrols2, pr as threatscovered1, k9 as annotation, oB as typicalevidence1, Dr as mappinginference1, Dq as mappinginferencehelptext3, Ou as coveragecolon1, qE as suggestioncolon1, vZ as questions, cM as observation, Sp as back, v0 as requirementappliedcontrolhelptext4, uT as requirementevidencehelptext3, dt as appliedcontrols1, cW as evidences } from './_index-CqZWReca.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { c as countMasked } from './related-visibility-ukSq_O7b.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './Anchor-C2rLUn2N.js';
import './breadcrumbs-D1ratxIQ.js';
import './access-control-DaLcieub.js';
import './crud-7XzjN-Wp.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './Form-BuUIlHHA.js';
import './datetime-CDLVyquZ.js';
import './runtime-BKo9q3Zd.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-C22czeYM.js';
import './shared-server-BU2DVf8Q.js';
import './index6-Cn6jj1jH.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data } = $$props;
  const threats = data.requirementAssessment.requirement.associated_threats ?? [];
  const reference_controls = data.requirementAssessment.requirement.associated_reference_controls ?? [];
  const annotation$1 = data.requirement.annotation;
  const typical_evidence = data.requirement.typical_evidence;
  const typicalEvidenceLines = typical_evidence ? typical_evidence.split("\n") : [];
  const has_threats = threats.length > 0;
  const has_reference_controls = reference_controls.length > 0;
  let mappingInference = {
    sourceRequirementAssessment: data.requirementAssessment.mapping_inference.source_requirement_assessment,
    result: data.requirementAssessment.mapping_inference.result
  };
  getRequirementTitle(data.requirement.ref_id, data.requirement.name) ? getRequirementTitle(data.requirement.ref_id, data.requirement.name) : getRequirementTitle(data.parent.ref_id, data.parent.name);
  let requirementAssessmentsList = store_get($$store_subs ??= {}, "$hideSuggestions", hideSuggestions);
  let hideSuggestion = requirementAssessmentsList.includes(data.requirementAssessment.id) ? true : false;
  let classesText = complianceResultColorMap[mappingInference.result] === "#000000" ? "text-white" : "";
  const max_score = data.complianceAssessmentScore.max_score;
  const score = data.requirementAssessment.score;
  const documentationScore = data.requirementAssessment.documentation_score;
  let group = page.data.user.is_third_party ? "evidence" : "applied_controls";
  let auditEntries = data.auditLogEntries ?? [];
  const ALLOWED_CHANGE_FIELDS = /* @__PURE__ */ new Set([
    "result",
    "status",
    "observation",
    "answers",
    "score"
  ]);
  let filteredAuditEntries = (() => {
    return (auditEntries || []).map((entry) => {
      if (!entry.changes || typeof entry.changes !== "object") return null;
      const filtered = {};
      for (const [field, change] of Object.entries(entry.changes)) {
        if (ALLOWED_CHANGE_FIELDS.has(field)) {
          filtered[field] = change;
        }
      }
      if (Object.keys(filtered).length === 0) return null;
      return { ...entry, changes: filtered };
    }).filter(Boolean);
  })();
  $$payload.out += `<div class="card space-y-2 p-4 bg-white shadow-sm"><div class="flex flex-row space-x-2 items-center"><code class="code">${escape_html(data.requirement.urn)}</code> <span class="badge h-fit"${attr_style(`background-color: ${stringify(complianceStatusColorMap[data.requirementAssessment.status] ?? "#d1d5db")};`)}>${escape_html(safeTranslate(data.requirementAssessment.status))}</span> <span${attr_class(`badge ${stringify(classesText)} h-fit`)}${attr_style(`background-color: ${stringify(complianceResultColorMap[data.requirementAssessment.result] ?? "#d1d5db")};`)}>${escape_html(safeTranslate(data.requirementAssessment.result))}</span> `;
  if (data.requirement.implementation_groups?.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.requirement.implementation_groups);
    $$payload.out += `<div class="ml-3"><b class="mr-2">Implemetation Groups :</b> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ig = each_array[$$index];
      $$payload.out += `<span class="badge bg-blue-100">${escape_html(ig)}</span>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.requirementAssessment.is_scored) {
    $$payload.out += "<!--[-->";
    ProgressRing($$payload, {
      strokeWidth: "20px",
      meterStroke: displayScoreColor(score, max_score),
      value: formatScoreValue(score, max_score),
      classes: "shrink-0",
      size: "size-10",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(score)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (data.complianceAssessmentScore.show_documentation_score) {
      $$payload.out += "<!--[-->";
      ProgressRing($$payload, {
        strokeWidth: "20px",
        meterStroke: displayScoreColor(documentationScore, max_score),
        value: formatScoreValue(documentationScore, max_score),
        classes: "shrink-0",
        size: "size-10",
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(documentationScore)}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (data.requirement.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="font-light text-lg card p-4 preset-tonal-primary"><h2 class="font-semibold text-base flex flex-row justify-between"><div><i class="fa-solid fa-file-lines mr-2"></i>${escape_html(description())}</div></h2> `;
    MarkdownRenderer($$payload, { content: data.requirement.description });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (has_threats || has_reference_controls || annotation$1 || mappingInference.result) {
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
        const each_array_3 = ensure_array_like(typicalEvidenceLines);
        $$payload.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-pencil"></i> ${escape_html(typicalevidence1())}</p> <div class="py-1"><!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let line = each_array_3[$$index_3];
          if (line.trim().includes("[EXCLUDED]")) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<div class="opacity-50 flex items-start gap-1"><span class="inline-flex items-center shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200"><i class="fa-solid fa-ban mr-1 text-[8px]"></i>Excluded from AI Analysis</span> `;
            MarkdownRenderer($$payload, {
              content: line.replace("[EXCLUDED]", "").trim()
            });
            $$payload.out += `<!----></div>`;
          } else if (line.trim()) {
            $$payload.out += "<!--[1-->";
            MarkdownRenderer($$payload, { content: line });
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (mappingInference.result) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="my-2"><p class="font-medium"><i class="fa-solid fa-link"></i> ${escape_html(mappinginference1())}</p> <span class="text-xs text-gray-500"><i class="fa-solid fa-circle-info"></i> ${escape_html(mappinginferencehelptext3())}</span> <ul class="list-disc ml-4"><li><p><a class="anchor"${attr("href", `/requirement-assessments/${stringify(mappingInference.sourceRequirementAssessment.id)}`)}>${escape_html(mappingInference.sourceRequirementAssessment.str)}</a></p> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(coveragecolon1())}</span> <span class="badge h-fit">${escape_html(safeTranslate(toCamelCase(mappingInference.sourceRequirementAssessment.coverage)))}</span></p> <p class="whitespace-pre-line py-1"><span class="italic">${escape_html(suggestioncolon1())}</span> <span${attr_class(`badge ${stringify(classesText)} h-fit`)}${attr_style(`background-color: ${stringify(complianceResultColorMap[mappingInference.result])};`)}>${escape_html(safeTranslate(mappingInference.result))}</span></p> `;
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
  $$payload.out += `<!--]--> <div>`;
  {
    let list = function($$payload2) {
      if (!page.data.user.is_third_party) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Tabs.Control($$payload2, {
          value: "applied_controls",
          stateActive: "border-b-[#1D53DA] opacity-100",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(appliedcontrols1())}`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <!---->`;
      Tabs.Control($$payload2, {
        value: "evidence",
        stateActive: "border-b-[#1D53DA] opacity-100",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(evidences())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    }, content = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Panel($$payload2, {
        value: "applied_controls",
        children: ($$payload3) => {
          if (!page.data.user.is_third_party) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="flex items-center mb-2 px-2 text-xs space-x-2"><i class="fa-solid fa-info-circle"></i> <p>${escape_html(requirementappliedcontrolhelptext4())}</p></div> <div class="h-full flex flex-col space-y-2 rounded-container p-4">`;
            ModelTable($$payload3, {
              source: data.tables["applied-controls"],
              hideFilters: true,
              URLModel: "applied-controls",
              expectedCount: countMasked(data.requirementAssessment.applied_controls),
              baseEndpoint: `/applied-controls?requirement_assessments=${stringify(page.data.requirementAssessment.id)}`
            });
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Panel($$payload2, {
        value: "evidence",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex items-center mb-2 px-2 text-xs space-x-2"><i class="fa-solid fa-info-circle"></i> <p>${escape_html(requirementevidencehelptext3())}</p></div> <div class="h-full flex flex-col space-y-2 rounded-container p-4">`;
          ModelTable($$payload3, {
            source: data.tables["evidences"],
            hideFilters: true,
            URLModel: "evidences",
            expectedCount: countMasked(data.requirementAssessment.evidences),
            baseEndpoint: `/evidences?requirement_assessments=${stringify(page.data.requirementAssessment.id)}`
          });
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    };
    Tabs($$payload, {
      value: group,
      onValueChange: (e) => {
        group = e.value;
      },
      list,
      content,
      $$slots: { list: true, content: true }
    });
  }
  $$payload.out += `<!----></div> `;
  if (data.requirementAssessment.requirement.questions != null && Object.keys(data.requirementAssessment.requirement.questions).length !== 0) {
    $$payload.out += "<!--[-->";
    const each_array_4 = ensure_array_like(Object.entries(data.requirementAssessment.requirement.questions));
    $$payload.out += `<h1 class="font-semibold text-sm">${escape_html(questions())}</h1> <!--[-->`;
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let [urn, question] = each_array_4[$$index_4];
      $$payload.out += `<li${attr_class(`flex justify-between items-center border rounded-xl p-2 disabled ${stringify(question.excluded ? "opacity-50" : "")}`)}><p>${escape_html(question.text)} (${escape_html(safeTranslate(question.type))}) `;
      if (question.excluded) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200"><i class="fa-solid fa-ban mr-1 text-[8px]"></i>Excluded from AI Analysis</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></p></li>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.requirementAssessment.observation) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card p-4 space-y-2 preset-tonal-primary"><h1 class="font-semibold text-sm">${escape_html(observation())}</h1> <div class="text-sm">`;
    MarkdownRenderer($$payload, {
      content: data.requirementAssessment.observation
    });
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="border border-gray-200 rounded-lg overflow-hidden bg-white"><button type="button" class="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors"><span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><i class="fa-solid fa-clock-rotate-left text-gray-500"></i> Change History `;
  if (filteredAuditEntries.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">${escape_html(filteredAuditEntries.length)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span> <i${attr_class(`fa-solid ${stringify("fa-chevron-down")} text-gray-400 text-xs`)}></i></button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-row justify-between space-x-4"><button class="btn bg-gray-400 text-white font-semibold w-full" type="button">${escape_html(back())}</button></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C_oJi6N7.js.map
