import { p as push, af as await_block, a as pop, W as ensure_array_like, V as escape_html, X as stringify } from './index2-9icAqEyj.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { k_ as xraysemptymessage3, dG as complianceassessments1, dH as riskassessments1, kX as xraysissuetype3, kW as xraysissuetypes3, kZ as xraysfinding2, kY as xraysfindings2, kU as xraysview2, kV as xraysloadingdata3 } from './_index-BQcvYRD4.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { A as Anchor } from './Anchor-BRS9PKeN.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './runtime-BKo9q3Zd.js';
import './breadcrumbs-TPX_ebIH.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const aggregateQualityChecks = (item) => {
    const types = ["errors", "warnings", "info"];
    const result = {};
    if (!item?.objects || typeof item.objects !== "object") {
      types.forEach((type) => {
        result[type] = [];
      });
      return result;
    }
    types.forEach((type) => {
      result[type] = Object.entries(item.objects).reduce(
        (acc, [key, value]) => {
          if (key !== "object" && value?.quality_check?.[type]) {
            acc = [...acc, ...value.quality_check[type]];
          }
          return acc;
        },
        []
      );
    });
    return result;
  };
  const aggregateIssuesByType = (issues, assessmentType, assessmentId) => {
    if (!Array.isArray(issues) || issues.length === 0) {
      return [];
    }
    const grouped = /* @__PURE__ */ new Map();
    issues.forEach((issue) => {
      if (!issue?.msgid || !issue?.object) {
        return;
      }
      const key = issue.msgid;
      if (!grouped.has(key)) {
        grouped.set(key, { msgid: key, findings: [] });
      }
      const link = issue.link ? `/${issue.link}/edit` : `/${assessmentType}/${assessmentId}`;
      grouped.get(key).findings.push({ name: issue.object.name || "", link });
    });
    return Array.from(grouped.values());
  };
  let tabStates = {};
  const processPerimetersData = (rawData) => {
    if (!rawData || typeof rawData !== "object") {
      return [];
    }
    return Object.entries(rawData).map(([key, value]) => {
      const valueObj = value;
      return {
        id: key,
        ...valueObj,
        compliance_assessments: {
          ...valueObj.compliance_assessments,
          ...aggregateQualityChecks(valueObj.compliance_assessments)
        },
        risk_assessments: {
          ...valueObj.risk_assessments,
          ...aggregateQualityChecks(valueObj.risk_assessments)
        }
      };
    });
  };
  $$payload.out += `<div class="card bg-white p-6 shadow-md rounded-lg flex flex-col space-y-6">`;
  await_block(
    $$payload,
    data.stream.data,
    () => {
      $$payload.out += `<div class="flex flex-col items-center justify-center py-8"><div class="text-sm text-gray-600 mb-4">${escape_html(xraysloadingdata3())}</div> `;
      LoadingSpinner($$payload);
      $$payload.out += `<!----></div>`;
    },
    (rawData) => {
      const perimeters = processPerimetersData(rawData);
      const each_array = ensure_array_like(perimeters);
      if (perimeters.length == 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-2xl">${escape_html(xraysemptymessage3())}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let perimeter = each_array[index];
        const compliance_assessments = Object.values(perimeter.compliance_assessments.objects);
        const risk_assessments = Object.values(perimeter.risk_assessments.objects);
        $$payload.out += `<div class="border border-gray-200 rounded-lg p-6 bg-gray-50/50 hover:shadow-md transition-shadow"><div class="flex items-center gap-3 mb-4"><span class="text-3xl">💡</span> `;
        Anchor($$payload, {
          class: "text-2xl font-bold hover:underline text-blue-600 hover:text-blue-700 transition-colors",
          href: `/perimeters/${stringify(perimeter.perimeter.id)}`,
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(perimeter.perimeter.folder.str)}/${escape_html(perimeter.perimeter.name)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></div> `;
        {
          let list = function($$payload2) {
            $$payload2.out += `<!---->`;
            Tabs.Control($$payload2, {
              value: "compliance_assessments",
              labelBase: "inert px-2",
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(complianceassessments1())} `;
                if (perimeter.compliance_assessments.errors.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-error">${escape_html(perimeter.compliance_assessments.errors.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--> `;
                if (perimeter.compliance_assessments.warnings.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-warning">${escape_html(perimeter.compliance_assessments.warnings.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--> `;
                if (perimeter.compliance_assessments.info.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-secondary">${escape_html(perimeter.compliance_assessments.info.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----> <!---->`;
            Tabs.Control($$payload2, {
              value: "risk_assessments",
              labelBase: "inert px-2",
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(riskassessments1())} `;
                if (perimeter.risk_assessments.errors.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-error">${escape_html(perimeter.risk_assessments.errors.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--> `;
                if (perimeter.risk_assessments.warnings.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-warning">${escape_html(perimeter.risk_assessments.warnings.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]--> `;
                if (perimeter.risk_assessments.info.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<span class="badge preset-tonal-secondary">${escape_html(perimeter.risk_assessments.info.length)}</span>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!---->`;
          }, content = function($$payload2) {
            $$payload2.out += `<!---->`;
            Tabs.Panel($$payload2, {
              value: "compliance_assessments",
              children: ($$payload3) => {
                const each_array_1 = ensure_array_like(compliance_assessments);
                $$payload3.out += `<ul class="list-none pl-4 text-sm space-y-2"><!--[-->`;
                for (let index2 = 0, $$length2 = each_array_1.length; index2 < $$length2; index2++) {
                  let compliance_assessment = each_array_1[index2];
                  const quality_check = compliance_assessment.quality_check;
                  const aggregatedErrors = aggregateIssuesByType(quality_check.errors, "compliance-assessments", compliance_assessment.object.id);
                  const aggregatedWarnings = aggregateIssuesByType(quality_check.warnings, "compliance-assessments", compliance_assessment.object.id);
                  const aggregatedInfo = aggregateIssuesByType(quality_check.info, "compliance-assessments", compliance_assessment.object.id);
                  $$payload3.out += `<li class="h4 font-semibold mb-1">`;
                  Anchor($$payload3, {
                    href: `/compliance-assessments/${stringify(compliance_assessment.object.id)}`,
                    class: "hover:underline text-blue-600",
                    children: ($$payload4) => {
                      $$payload4.out += `<!---->${escape_html(compliance_assessment.object.name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload3.out += `<!----></li>   <div class="flex flex-col space-y-3">`;
                  if (aggregatedErrors.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_2 = ensure_array_like(aggregatedErrors);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-error rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-bug text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedErrors.length)}</span> <span>${escape_html(aggregatedErrors.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.errors.length)}
														${escape_html(quality_check.errors.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_1 = 0, $$length3 = each_array_2.length; $$index_1 < $$length3; $$index_1++) {
                      let error = each_array_2[$$index_1];
                      const each_array_3 = ensure_array_like(error.findings);
                      $$payload3.out += `<li class="border-l-4 border-error-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(error.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_3.length; idx < $$length4; idx++) {
                        let finding = each_array_3[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> `;
                  if (aggregatedWarnings.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_4 = ensure_array_like(aggregatedWarnings);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-warning rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-triangle-exclamation text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedWarnings.length)}</span> <span>${escape_html(aggregatedWarnings.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.warnings.length)}
														${escape_html(quality_check.warnings.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_3 = 0, $$length3 = each_array_4.length; $$index_3 < $$length3; $$index_3++) {
                      let warning = each_array_4[$$index_3];
                      const each_array_5 = ensure_array_like(warning.findings);
                      $$payload3.out += `<li class="border-l-4 border-warning-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(warning.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_5.length; idx < $$length4; idx++) {
                        let finding = each_array_5[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> `;
                  if (aggregatedInfo.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_6 = ensure_array_like(aggregatedInfo);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-secondary rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-circle-info text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedInfo.length)}</span> <span>${escape_html(aggregatedInfo.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.info.length)}
														${escape_html(quality_check.info.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_5 = 0, $$length3 = each_array_6.length; $$index_5 < $$length3; $$index_5++) {
                      let info = each_array_6[$$index_5];
                      const each_array_7 = ensure_array_like(info.findings);
                      $$payload3.out += `<li class="border-l-4 border-secondary-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(info.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_7.length; idx < $$length4; idx++) {
                        let finding = each_array_7[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--></div> `;
                  if (index2 != compliance_assessments.length - 1) {
                    $$payload3.out += "<!--[-->";
                    $$payload3.out += `<hr/>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]-->`;
                }
                $$payload3.out += `<!--]--></ul>`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----> <!---->`;
            Tabs.Panel($$payload2, {
              value: "risk_assessments",
              children: ($$payload3) => {
                const each_array_8 = ensure_array_like(risk_assessments);
                $$payload3.out += `<ul class="list-none pl-4 text-sm space-y-2"><!--[-->`;
                for (let index2 = 0, $$length2 = each_array_8.length; index2 < $$length2; index2++) {
                  let risk_assessment = each_array_8[index2];
                  const quality_check = risk_assessment.quality_check;
                  const aggregatedErrors = aggregateIssuesByType(quality_check.errors, "risk-assessments", risk_assessment.object.id);
                  const aggregatedWarnings = aggregateIssuesByType(quality_check.warnings, "risk-assessments", risk_assessment.object.id);
                  const aggregatedInfo = aggregateIssuesByType(quality_check.info, "risk-assessments", risk_assessment.object.id);
                  $$payload3.out += `<li class="h4 font-semibold mb-1">`;
                  Anchor($$payload3, {
                    href: `/risk-assessments/${stringify(risk_assessment.object.id)}`,
                    class: "hover:underline text-blue-600",
                    children: ($$payload4) => {
                      $$payload4.out += `<!---->${escape_html(risk_assessment.object.name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload3.out += `<!----></li>   <div class="flex flex-col space-y-3">`;
                  if (aggregatedErrors.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_9 = ensure_array_like(aggregatedErrors);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-error rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-bug text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedErrors.length)}</span> <span>${escape_html(aggregatedErrors.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.errors.length)}
														${escape_html(quality_check.errors.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_8 = 0, $$length3 = each_array_9.length; $$index_8 < $$length3; $$index_8++) {
                      let error = each_array_9[$$index_8];
                      const each_array_10 = ensure_array_like(error.findings);
                      $$payload3.out += `<li class="border-l-4 border-error-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(error.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_10.length; idx < $$length4; idx++) {
                        let finding = each_array_10[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> `;
                  if (aggregatedWarnings.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_11 = ensure_array_like(aggregatedWarnings);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-warning rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-triangle-exclamation text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedWarnings.length)}</span> <span>${escape_html(aggregatedWarnings.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.warnings.length)}
														${escape_html(quality_check.warnings.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_10 = 0, $$length3 = each_array_11.length; $$index_10 < $$length3; $$index_10++) {
                      let warning = each_array_11[$$index_10];
                      const each_array_12 = ensure_array_like(warning.findings);
                      $$payload3.out += `<li class="border-l-4 border-warning-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(warning.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_12.length; idx < $$length4; idx++) {
                        let finding = each_array_12[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--> `;
                  if (aggregatedInfo.length > 0) {
                    $$payload3.out += "<!--[-->";
                    const each_array_13 = ensure_array_like(aggregatedInfo);
                    $$payload3.out += `<div class="space-y-2"><div class="preset-tonal-secondary rounded-lg px-4 py-2 flex items-center gap-2"><i class="fa-solid fa-circle-info text-lg"></i> <span class="font-bold text-lg">${escape_html(aggregatedInfo.length)}</span> <span>${escape_html(aggregatedInfo.length === 1 ? xraysissuetype3() : xraysissuetypes3())}</span> <span class="text-sm opacity-75 ml-auto">${escape_html(quality_check.info.length)}
														${escape_html(quality_check.info.length === 1 ? xraysfinding2() : xraysfindings2())}</span></div> <ul class="list-none pl-2 text-sm space-y-4"><!--[-->`;
                    for (let $$index_12 = 0, $$length3 = each_array_13.length; $$index_12 < $$length3; $$index_12++) {
                      let info = each_array_13[$$index_12];
                      const each_array_14 = ensure_array_like(info.findings);
                      $$payload3.out += `<li class="border-l-4 border-secondary-500 pl-4 py-2"><div class="font-semibold mb-2 text-base">${escape_html(safeTranslate(info.msgid))}</div> <div class="space-y-1.5"><!--[-->`;
                      for (let idx = 0, $$length4 = each_array_14.length; idx < $$length4; idx++) {
                        let finding = each_array_14[idx];
                        $$payload3.out += `<div class="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"><span class="text-gray-400 text-xs font-mono min-w-[20px]">${escape_html(idx + 1)}.</span> `;
                        if (finding.name) {
                          $$payload3.out += "<!--[-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(finding.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        } else {
                          $$payload3.out += "<!--[!-->";
                          Anchor($$payload3, {
                            class: "anchor text-sm",
                            href: finding.link,
                            children: ($$payload4) => {
                              $$payload4.out += `<!---->${escape_html(xraysview2())}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload3.out += `<!--]--></div>`;
                      }
                      $$payload3.out += `<!--]--></div></li>`;
                    }
                    $$payload3.out += `<!--]--></ul></div>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]--></div> `;
                  if (index2 != risk_assessments.length - 1) {
                    $$payload3.out += "<!--[-->";
                    $$payload3.out += `<hr/>`;
                  } else {
                    $$payload3.out += "<!--[!-->";
                  }
                  $$payload3.out += `<!--]-->`;
                }
                $$payload3.out += `<!--]--></ul>`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!---->`;
          };
          Tabs($$payload, {
            value: tabStates[perimeter.id] || "compliance_assessments",
            onValueChange: (e) => {
              if (!tabStates[perimeter.id]) {
                tabStates[perimeter.id] = "compliance_assessments";
              }
              tabStates[perimeter.id] = e.value;
            },
            listJustify: "justify-center",
            list,
            content,
            $$slots: { list: true, content: true }
          });
        }
        $$payload.out += `<!----></div> `;
        if (index != perimeters.length - 1) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<hr/>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
  );
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CDHIl40C.js.map
