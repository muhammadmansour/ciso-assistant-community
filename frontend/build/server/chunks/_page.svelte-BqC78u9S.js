import { p as push, a as pop, V as escape_html, T as attr, W as ensure_array_like, S as attr_class, X as stringify } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { Kx as download, G as loading } from './_index-CqZWReca.js';
import './constants-lv6aycRl.js';
import { p as page } from './index3-BwfRm5YV.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import './crud-Dl9mduNa.js';
import 'marked';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
import { D as DetailView } from './DetailView-CkUgDz5l.js';
import './string-BMZjP7XX.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './runtime-BKo9q3Zd.js';
import './shared-server-BU2DVf8Q.js';
import './client-DqP3yP6V.js';
import './machine.svelte-CNa8MjEx.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-DuIONS9Q.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './breadcrumbs-D1ratxIQ.js';
import './Form-BuUIlHHA.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './schemas-BOdIHh1e.js';
import './ModelTable-D9-j7Xao.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-C22czeYM.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let analysisResult = data.aiAnalysis || null;
  let analysisSaving = false;
  let lastAnalyzedAt = data.aiAnalysisUpdatedAt || null;
  let auditResult = data.auditAnalysis || null;
  let auditSaving = false;
  let lastAuditAt = data.auditAnalysisUpdatedAt || null;
  let questions = data.questions || [];
  let typicalEvidence = data.typicalEvidence || [];
  data.requirementsContext || [];
  data.evidenceName || "";
  data.evidenceDescription || "";
  let activeTab = "preview";
  getModalStore();
  page.data.user;
  const entityTypeColors = {
    PERSON: "bg-blue-100 text-blue-800 border-blue-300",
    ORGANIZATION: "bg-green-100 text-green-800 border-green-300",
    STANDARD: "bg-purple-100 text-purple-800 border-purple-300",
    CONTROL: "bg-orange-100 text-orange-800 border-orange-300",
    POLICY: "bg-pink-100 text-pink-800 border-pink-300",
    LOCATION: "bg-yellow-100 text-yellow-800 border-yellow-300",
    DATE: "bg-cyan-100 text-cyan-800 border-cyan-300",
    DEFAULT: "bg-gray-100 text-gray-800 border-gray-300"
  };
  function getEntityColor(type) {
    return entityTypeColors[type] || entityTypeColors.DEFAULT;
  }
  DetailView($$payload, { data });
  $$payload.out += `<!----> `;
  if (data.data.attachment) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card mt-8 bg-white shadow-lg">`;
    {
      let list = function($$payload2) {
        $$payload2.out += `<!---->`;
        Tabs.Control($$payload2, {
          value: "preview",
          children: ($$payload3) => {
            $$payload3.out += `<i class="fa-solid fa-eye mr-2"></i> ${escape_html("Preview")}`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <!---->`;
        Tabs.Control($$payload2, {
          value: "ai-analysis",
          children: ($$payload3) => {
            $$payload3.out += `<i class="fa-solid fa-brain mr-2"></i> AI Analysis`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      }, content = function($$payload2) {
        $$payload2.out += `<!---->`;
        Tabs.Panel($$payload2, {
          value: "preview",
          children: ($$payload3) => {
            $$payload3.out += `<div class="p-6 space-y-4"><div class="flex flex-row justify-end"><div class="space-x-2">`;
            Anchor($$payload3, {
              href: `./${data.data.id}/attachment`,
              class: "btn preset-filled-primary-500 h-fit",
              "data-testid": "attachment-download-button",
              children: ($$payload4) => {
                $$payload4.out += `<i class="fa-solid fa-download mr-2"></i> ${escape_html(download())}`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></div></div> `;
            {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<span data-testid="loading-field">${escape_html(loading())}...</span>`;
            }
            $$payload3.out += `<!--]--></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "entity-extraction",
          children: ($$payload3) => {
            $$payload3.out += `<div class="p-6 space-y-6"><div class="flex flex-row justify-between items-center"><div><h4 class="h4 font-semibold">Entity Extraction</h4> <p class="text-sm text-gray-600">Extract entities, relationships, and key findings from the document</p> `;
            if (lastAnalyzedAt) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<p class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-clock mr-1"></i> Last analyzed: ${escape_html(new Date(lastAnalyzedAt).toLocaleString())}</p>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div> <div class="flex items-center gap-2">`;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> <button class="btn preset-filled-primary-500"${attr("disabled", analysisSaving, true)}>`;
            if (analysisResult) {
              $$payload3.out += "<!--[1-->";
              $$payload3.out += `<i class="fa-solid fa-rotate mr-2"></i> Re-run Extraction`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i> Run Extraction`;
            }
            $$payload3.out += `<!--]--></button></div></div> `;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            if (analysisResult && true) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="space-y-6">`;
              if (analysisResult.documentSummary) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><h5 class="font-semibold text-blue-800 mb-2"><i class="fa-solid fa-file-lines mr-2"></i> Document Summary</h5> <p class="text-gray-700">${escape_html(analysisResult.documentSummary)}</p></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (analysisResult.keyFindings && analysisResult.keyFindings.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array = ensure_array_like(analysisResult.keyFindings);
                $$payload3.out += `<div class="p-4 bg-green-50 border border-green-200 rounded-lg"><h5 class="font-semibold text-green-800 mb-3"><i class="fa-solid fa-lightbulb mr-2"></i> Key Findings</h5> <ul class="space-y-2"><!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let finding = each_array[$$index];
                  $$payload3.out += `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-green-600 mt-1"></i> <span class="text-gray-700">${escape_html(finding)}</span></li>`;
                }
                $$payload3.out += `<!--]--></ul></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (analysisResult.summary) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="p-4 bg-gray-50 border rounded-lg text-center"><p class="text-3xl font-bold text-primary-600">${escape_html(analysisResult.summary.totalEntities)}</p> <p class="text-sm text-gray-600">Total Entities</p></div> <div class="p-4 bg-gray-50 border rounded-lg text-center"><p class="text-3xl font-bold text-primary-600">${escape_html(Object.keys(analysisResult.summary.byType || {}).length)}</p> <p class="text-sm text-gray-600">Entity Types</p></div> <div class="p-4 bg-gray-50 border rounded-lg text-center"><p class="text-3xl font-bold text-primary-600">${escape_html(analysisResult.relationships?.length || 0)}</p> <p class="text-sm text-gray-600">Relationships</p></div></div> `;
                if (analysisResult.summary.byType && Object.keys(analysisResult.summary.byType).length > 0) {
                  $$payload3.out += "<!--[-->";
                  const each_array_1 = ensure_array_like(Object.entries(analysisResult.summary.byType));
                  $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-chart-pie mr-2"></i> Entities by Type</h5> <div class="flex flex-wrap gap-2"><!--[-->`;
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let [type, count] = each_array_1[$$index_1];
                    $$payload3.out += `<span${attr_class(`px-3 py-1 rounded-full text-sm font-medium border ${stringify(getEntityColor(type))}`)}>${escape_html(type)}: ${escape_html(count)}</span>`;
                  }
                  $$payload3.out += `<!--]--></div></div>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (analysisResult.entities && analysisResult.entities.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_2 = ensure_array_like(analysisResult.entities);
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-tags mr-2"></i> Extracted Entities</h5> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b bg-gray-50"><th class="text-left p-2">Entity</th><th class="text-left p-2">Type</th><th class="text-left p-2">Category</th><th class="text-left p-2">Confidence</th><th class="text-left p-2">Context</th></tr></thead><tbody><!--[-->`;
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let entity = each_array_2[$$index_2];
                  $$payload3.out += `<tr class="border-b hover:bg-gray-50"><td class="p-2 font-medium">${escape_html(entity.text)}</td><td class="p-2"><span${attr_class(`px-2 py-0.5 rounded text-xs font-medium border ${stringify(getEntityColor(entity.type))}`)}>${escape_html(entity.type)}</span></td><td class="p-2 text-gray-600">${escape_html(entity.category)}</td><td class="p-2"><span${attr_class(`px-2 py-0.5 rounded text-xs ${stringify(entity.confidence >= 0.9 ? "bg-green-100 text-green-800" : entity.confidence >= 0.7 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")}`)}>${escape_html(Math.round(entity.confidence * 100))}%</span></td><td class="p-2 text-gray-600 text-xs max-w-xs truncate">${escape_html(entity.context)}</td></tr>`;
                }
                $$payload3.out += `<!--]--></tbody></table></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (analysisResult.relationships && analysisResult.relationships.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_3 = ensure_array_like(analysisResult.relationships);
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-diagram-project mr-2"></i> Relationships</h5> <div class="space-y-2"><!--[-->`;
                for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                  let rel = each_array_3[$$index_3];
                  $$payload3.out += `<div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm"><span class="font-medium text-primary-700">${escape_html(rel.entity1)}</span> <i class="fa-solid fa-arrow-right text-gray-400"></i> <span class="px-2 py-0.5 bg-gray-200 rounded text-gray-700 italic">${escape_html(rel.relation)}</span> <i class="fa-solid fa-arrow-right text-gray-400"></i> <span class="font-medium text-primary-700">${escape_html(rel.entity2)}</span> <span class="ml-auto text-xs text-gray-500">${escape_html(Math.round(rel.confidence * 100))}% confidence</span></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            if (!analysisResult && true && true) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="flex flex-col items-center justify-center py-16 space-y-4 text-gray-500"><i class="fa-solid fa-tags text-6xl text-gray-300"></i> <p class="text-lg">No extraction results yet</p> <p class="text-sm">Click "Run Extraction" to extract entities and insights from this document</p> <p class="text-xs text-gray-400">Results will be saved and available next time you view this evidence</p></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "ai-analysis",
          children: ($$payload3) => {
            $$payload3.out += `<div class="p-6 space-y-6"><div class="flex flex-row justify-between items-center"><div><h4 class="h4 font-semibold">AI Compliance Analysis</h4> <p class="text-sm text-gray-600">Analyze evidence against audit questions and typical evidence requirements</p> `;
            if (lastAuditAt) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<p class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-clock mr-1"></i> Last analyzed: ${escape_html(new Date(lastAuditAt).toLocaleString())}</p>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div> <div class="flex items-center gap-2">`;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> <button class="btn preset-filled-primary-500"${attr("disabled", auditSaving, true)}>`;
            if (auditResult) {
              $$payload3.out += "<!--[1-->";
              $$payload3.out += `<i class="fa-solid fa-rotate mr-2"></i> Re-run Analysis`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<i class="fa-solid fa-wand-magic-sparkles mr-2"></i> Run Analysis`;
            }
            $$payload3.out += `<!--]--></button></div></div> `;
            if (questions.length > 0 || typicalEvidence.length > 0) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
              if (questions.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_4 = ensure_array_like(questions.slice(0, 5));
                $$payload3.out += `<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><h5 class="font-semibold text-blue-800 mb-2"><i class="fa-solid fa-circle-question mr-2"></i> Questions to Analyze (${escape_html(questions.length)})</h5> <ul class="text-sm text-gray-700 space-y-1"><!--[-->`;
                for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
                  let q = each_array_4[$$index_4];
                  $$payload3.out += `<li class="flex items-start gap-2"><i class="fa-solid fa-chevron-right text-blue-400 mt-1 text-xs"></i> <span>${escape_html(q)}</span></li>`;
                }
                $$payload3.out += `<!--]--> `;
                if (questions.length > 5) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<li class="text-blue-600 text-xs">+${escape_html(questions.length - 5)} more...</li>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--></ul></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (typicalEvidence.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_5 = ensure_array_like(typicalEvidence.slice(0, 5));
                $$payload3.out += `<div class="p-4 bg-green-50 border border-green-200 rounded-lg"><h5 class="font-semibold text-green-800 mb-2"><i class="fa-solid fa-file-circle-check mr-2"></i> Typical Evidence (${escape_html(typicalEvidence.length)})</h5> <ul class="text-sm text-gray-700 space-y-1"><!--[-->`;
                for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                  let e = each_array_5[$$index_5];
                  $$payload3.out += `<li class="flex items-start gap-2"><i class="fa-solid fa-chevron-right text-green-400 mt-1 text-xs"></i> <span>${escape_html(e)}</span></li>`;
                }
                $$payload3.out += `<!--]--> `;
                if (typicalEvidence.length > 5) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<li class="text-green-600 text-xs">+${escape_html(typicalEvidence.length - 5)} more...</li>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--></ul></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            if (auditResult && true) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="space-y-6">`;
              if (auditResult.overallAssessment) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<div class="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg"><div class="flex items-center justify-between mb-3"><h5 class="font-semibold text-primary-800"><i class="fa-solid fa-gauge-high mr-2"></i> Overall Assessment</h5> <div class="flex items-center gap-4"><span${attr_class(`px-3 py-1 rounded-full text-sm font-medium ${stringify(auditResult.overallAssessment.status === "Compliant" ? "bg-green-100 text-green-800" : auditResult.overallAssessment.status === "Partially Compliant" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")}`)}>${escape_html(auditResult.overallAssessment.status)}</span> <div class="flex items-center gap-2"><span class="text-2xl font-bold text-primary-600">${escape_html(auditResult.overallAssessment.score)}%</span></div></div></div> <p class="text-gray-700">${escape_html(auditResult.overallAssessment.summary)}</p></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.requirementEvaluation) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-clipboard-check mr-2"></i> Requirement Evaluation</h5> <div class="space-y-3"><div class="flex items-center gap-2"><span class="font-medium text-gray-700">Status:</span> <span${attr_class(`px-2 py-0.5 rounded text-sm ${stringify(auditResult.requirementEvaluation.requirementMet === "full" ? "bg-green-100 text-green-800" : auditResult.requirementEvaluation.requirementMet === "partial" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")}`)}>${escape_html(auditResult.requirementEvaluation.requirementMet === "full" ? "Fully Met" : auditResult.requirementEvaluation.requirementMet === "partial" ? "Partially Met" : "Not Met")}</span></div> <div><p class="font-medium text-gray-700 mb-1">Evidence Alignment:</p> <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">${escape_html(auditResult.requirementEvaluation.evidenceAlignment)}</p></div> <div><p class="font-medium text-gray-700 mb-1">Specific Findings:</p> <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">${escape_html(auditResult.requirementEvaluation.specificFindings)}</p></div></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.questionEvaluation && auditResult.questionEvaluation.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_6 = ensure_array_like(auditResult.questionEvaluation);
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-clipboard-question mr-2"></i> Question Evaluation</h5> <div class="space-y-3"><!--[-->`;
                for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
                  let qa = each_array_6[$$index_6];
                  $$payload3.out += `<div class="p-3 bg-gray-50 rounded-lg"><div class="flex items-start justify-between mb-2"><p class="font-medium text-gray-800"><span class="text-primary-600">Q${escape_html(qa.questionNumber)}:</span> ${escape_html(qa.question)}</p> <span${attr_class(`px-2 py-0.5 rounded text-sm font-medium ${stringify(qa.answered === "Yes" ? "bg-green-100 text-green-800" : qa.answered === "Partially" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")}`)}>${escape_html(qa.answered)}</span></div> <div class="text-sm text-gray-600 space-y-1"><p><span class="font-medium">Evidence:</span> ${escape_html(qa.evidenceFound)}</p> <p><span class="font-medium">Source:</span> ${escape_html(qa.sourceFile)}</p> `;
                  if (qa.notes) {
                    $$payload3.out += "<!--[-->";
                    $$payload3.out += `<p class="text-gray-500 italic"><i class="fa-solid fa-note-sticky mr-1"></i> ${escape_html(qa.notes)}</p>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--></div> <div class="flex items-center gap-2 mt-2"><span${attr_class(`text-xs px-2 py-0.5 rounded ${stringify(qa.confidence >= 0.8 ? "bg-green-100 text-green-700" : qa.confidence >= 0.5 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}`)}>${escape_html(Math.round(qa.confidence * 100))}% confidence</span></div></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.typicalEvidenceCheck && auditResult.typicalEvidenceCheck.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_7 = ensure_array_like(auditResult.typicalEvidenceCheck);
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-file-circle-check mr-2"></i> Typical Evidence Check</h5> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b bg-gray-50"><th class="text-left p-2">Evidence Item</th><th class="text-left p-2">Status</th><th class="text-left p-2">Found In</th><th class="text-left p-2">Details</th></tr></thead><tbody><!--[-->`;
                for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
                  let item = each_array_7[$$index_7];
                  const _statusLower = (item.status || "").toLowerCase();
                  const _isPartial = _statusLower.includes("partial") || _statusLower.includes("جزئ");
                  const _isNotFound = !_isPartial && (_statusLower.includes("غير") || _statusLower.includes("not ") || _statusLower.includes("missing") || _statusLower.includes("absent") || _statusLower.includes("not_found") || _statusLower.includes("notfound"));
                  const _isFound = !_isPartial && !_isNotFound && (_statusLower.includes("present") || _statusLower.includes("found") || _statusLower.includes("موجود") || _statusLower.includes("available") || _statusLower.includes("متوفر"));
                  $$payload3.out += `<tr class="border-b hover:bg-gray-50"><td class="p-2 font-medium">${escape_html(item.evidenceItem)}</td><td class="p-2"><span${attr_class(`px-2 py-0.5 rounded text-xs ${stringify(_isFound ? "bg-green-100 text-green-800" : _isPartial ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")}`)}>${escape_html(item.status)}</span></td><td class="p-2 text-gray-600">${escape_html(item.foundIn || "-")}</td><td class="p-2 text-gray-500 text-xs">${escape_html(item.details || "-")}</td></tr>`;
                }
                $$payload3.out += `<!--]--></tbody></table></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.fileAnalysis && auditResult.fileAnalysis.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_8 = ensure_array_like(auditResult.fileAnalysis);
                $$payload3.out += `<div class="p-4 bg-white border rounded-lg"><h5 class="font-semibold text-gray-800 mb-3"><i class="fa-solid fa-file-alt mr-2"></i> File Analysis</h5> <!--[-->`;
                for (let $$index_9 = 0, $$length = each_array_8.length; $$index_9 < $$length; $$index_9++) {
                  let file = each_array_8[$$index_9];
                  $$payload3.out += `<div class="p-3 bg-gray-50 rounded-lg"><p class="font-medium text-gray-800 mb-2"><i class="fa-solid fa-file-pdf mr-2 text-red-500"></i> ${escape_html(file.fileName)}</p> <p class="text-sm text-gray-600 mb-2">${escape_html(file.contentSummary)}</p> `;
                  if (file.relevantSections && file.relevantSections.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_9 = ensure_array_like(file.relevantSections);
                    $$payload3.out += `<div class="text-sm"><p class="font-medium text-gray-700 mb-1">Relevant Sections:</p> <ul class="list-disc list-inside text-gray-600 space-y-1"><!--[-->`;
                    for (let $$index_8 = 0, $$length2 = each_array_9.length; $$index_8 < $$length2; $$index_8++) {
                      let section = each_array_9[$$index_8];
                      $$payload3.out += `<li>${escape_html(section)}</li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--></div>`;
                }
                $$payload3.out += `<!--]--></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.gaps && auditResult.gaps.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_10 = ensure_array_like(auditResult.gaps);
                $$payload3.out += `<div class="p-4 bg-red-50 border border-red-200 rounded-lg"><h5 class="font-semibold text-red-800 mb-3"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Identified Gaps (${escape_html(auditResult.gaps.length)})</h5> <div class="space-y-3"><!--[-->`;
                for (let $$index_10 = 0, $$length = each_array_10.length; $$index_10 < $$length; $$index_10++) {
                  let gap = each_array_10[$$index_10];
                  $$payload3.out += `<div class="p-3 bg-white rounded-lg border border-red-100"><div class="flex items-start justify-between mb-2"><p class="font-medium text-gray-800">${escape_html(gap.gap)}</p> <span${attr_class(`text-xs px-2 py-0.5 rounded ${stringify(gap.severity === "High" ? "bg-red-200 text-red-800" : gap.severity === "Medium" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800")}`)}>${escape_html(gap.severity)}</span></div> <p class="text-sm text-gray-600 mb-2">${escape_html(gap.impact)}</p> <p class="text-sm text-blue-600 bg-blue-50 p-2 rounded"><i class="fa-solid fa-lightbulb mr-1"></i> ${escape_html(gap.recommendation)}</p></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.strengths && auditResult.strengths.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_11 = ensure_array_like(auditResult.strengths);
                $$payload3.out += `<div class="p-4 bg-green-50 border border-green-200 rounded-lg"><h5 class="font-semibold text-green-800 mb-3"><i class="fa-solid fa-circle-check mr-2"></i> Strengths (${escape_html(auditResult.strengths.length)})</h5> <ul class="space-y-2"><!--[-->`;
                for (let $$index_11 = 0, $$length = each_array_11.length; $$index_11 < $$length; $$index_11++) {
                  let strength = each_array_11[$$index_11];
                  $$payload3.out += `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-green-600 mt-1"></i> <span class="text-gray-700">${escape_html(strength)}</span></li>`;
                }
                $$payload3.out += `<!--]--></ul></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (auditResult.recommendations && auditResult.recommendations.length > 0) {
                $$payload3.out += "<!--[-->";
                const each_array_12 = ensure_array_like(auditResult.recommendations);
                $$payload3.out += `<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><h5 class="font-semibold text-blue-800 mb-3"><i class="fa-solid fa-list-check mr-2"></i> Recommendations (${escape_html(auditResult.recommendations.length)})</h5> <ul class="space-y-2"><!--[-->`;
                for (let i = 0, $$length = each_array_12.length; i < $$length; i++) {
                  let rec = each_array_12[i];
                  $$payload3.out += `<li class="flex items-start gap-3 p-2 bg-white rounded"><span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium flex items-center justify-center">${escape_html(i + 1)}</span> <span class="text-gray-700">${escape_html(rec)}</span></li>`;
                }
                $$payload3.out += `<!--]--></ul></div>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> `;
            if (!auditResult && true && true) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="flex flex-col items-center justify-center py-16 space-y-4 text-gray-500"><i class="fa-solid fa-brain text-6xl text-gray-300"></i> <p class="text-lg">No analysis results yet</p> <p class="text-sm">Click "Run Analysis" to analyze this evidence against audit criteria</p> `;
              if (questions.length === 0 && typicalEvidence.length === 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<p class="text-xs text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg"><i class="fa-solid fa-info-circle mr-1"></i> No questions or typical evidence linked. Link this evidence to a requirement assessment for better analysis.</p>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      };
      Tabs($$payload, {
        value: activeTab,
        onValueChange: (e) => activeTab = e.value,
        listJustify: "justify-center",
        listClasses: "flex flex-wrap border-b",
        list,
        content,
        $$slots: { list: true, content: true }
      });
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BqC78u9S.js.map
