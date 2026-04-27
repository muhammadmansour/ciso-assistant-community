import { p as push, aa as head, af as await_block, a as pop, V as escape_html, W as ensure_array_like, X as stringify, T as attr } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { L as LossExceedanceCurve } from './LossExceedanceCurve-dnWbHif7.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { IJ as executivesummary1, cF as authors, cq as domain, cR as assets, Sn as backtostudy2, DB as lossthresholdlabel2, Db as maximumacceptableloss2, O1 as currentprofile1, wy as probabilitytoexceedthreshold3, uo as residualprofile1, pe as totaltreatmentcost2, ov as uniquecontrol1, ou as uniquecontrols1, zm as portfolioriskprofile2, nO as viewalebreakdownbyscenario4, Sh as breakdown, O6 as currentlabel1, ut as residuallabel1, sH as scenarios, Pu as combinedstudyriskprofile3, zn as portfoliooverview1, Cd as nocombinedlecdataavailable4, bo as description, cM as observation, Vs as andmore1, cG as more, cT as threats, fq as qualifications, hH as existingcontrols1, nv as viewcontroldetails2, VU as additionalcontrols1, Ox as costyear1, Oy as costperyear2, Od as currentale1, uz as residualale1, S4 as cannotcalculate1, tl as riskreduction1, oG as treatmentcostdisplay2, DZ as lossexceedancecurve2, sI as scenarioriskprofile2, BV as nolecdataavailableforscenario5, sP as runsimulationsonhypotheses3, BF as noselectedscenarios2, BG as noscenariosselectedinstudy4, I6 as failedtoloadexecutivesummary4, pz as therewasanerrorloadingexecutive5, u4 as retry, G as loading, Em as loadingexecutivesummary2 } from './_index-D7NdhnXA.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './breadcrumbs-BA0IMSh1.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(executivesummary1())} - Wathbah GRC</title>`;
  });
  $$payload.out += `<main class="p-6 space-y-6">`;
  await_block(
    $$payload,
    Promise.all([
      data.stream.executiveSummary,
      data.stream.combinedLec,
      data.stream.aleComparison
    ]),
    () => {
      $$payload.out += `<div class="bg-white p-2 shadow rounded-lg space-x-2 flex flex-row justify-center mb-2"><p class="font-semibold text-lg">${escape_html(loading())}</p></div> <div class="flex items-center justify-center h-64"><div class="text-center">`;
      LoadingSpinner($$payload);
      $$payload.out += `<!----> <p class="mt-4 text-gray-600">${escape_html(loadingexecutivesummary2())}</p></div></div>`;
    },
    ([
      summaryData,
      combinedLecData,
      aleComparisonData
    ]) => {
      if (summaryData) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="bg-white rounded-lg p-6 shadow-sm"><div class="flex justify-between items-start mb-4"><div><h1 class="text-2xl font-bold text-gray-900 mb-2">${escape_html(summaryData.study_name)}</h1> `;
        if (summaryData.study_authors && summaryData.study_authors.length > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="font-semibold text-gray-700 mb-2">${escape_html(authors())}: ${escape_html(summaryData.study_authors.join(" | "))}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (summaryData.study_folder) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="font-semibold text-gray-700 mb-2">${escape_html(domain())}: ${escape_html(summaryData.study_folder.name)}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (summaryData.study_description) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="mb-4">`;
          MarkdownRenderer($$payload, {
            content: summaryData.study_description,
            class: "text-gray-600"
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (summaryData.study_assets && summaryData.study_assets.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array = ensure_array_like(summaryData.study_assets);
          $$payload.out += `<div class="mb-4"><div class="text-sm font-medium text-gray-700 mb-2">${escape_html(assets())}:</div> <div class="flex flex-wrap gap-2"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let asset = each_array[$$index];
            Anchor($$payload, {
              href: `/assets/${stringify(asset.id)}`,
              class: "px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded cursor-pointer transition-colors",
              breadcrumbAction: "push",
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(asset.name)}`;
              },
              $$slots: { default: true }
            });
          }
          $$payload.out += `<!--]--></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div> `;
        Anchor($$payload, {
          href: `/quantitative-risk-studies/${page.params.id}`,
          class: "btn preset-ghost-surface",
          breadcrumbAction: "pop",
          children: ($$payload2) => {
            $$payload2.out += `<i class="fa-solid fa-arrow-left mr-2"></i>${escape_html(backtostudy2())}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">`;
        if (summaryData.loss_threshold) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-center"><div class="text-sm text-gray-600 font-medium mb-1">${escape_html(lossthresholdlabel2())}</div> <div class="text-lg font-bold text-red-600">${escape_html(summaryData.loss_threshold_display)}</div> <div class="text-xs text-gray-500">${escape_html(maximumacceptableloss2())}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (combinedLecData?.current_threshold_probability_display) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-center"><div class="text-sm text-gray-600 font-medium mb-1">${escape_html(currentprofile1())}</div> <div class="text-lg font-bold text-orange-600">${escape_html(combinedLecData.current_threshold_probability_display)}</div> <div class="text-xs text-gray-500">${escape_html(probabilitytoexceedthreshold3())}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (combinedLecData?.residual_threshold_probability_display) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-center"><div class="text-sm text-gray-600 font-medium mb-1">${escape_html(residualprofile1())}</div> <div class="text-lg font-bold text-green-600">${escape_html(combinedLecData.residual_threshold_probability_display)}</div> <div class="text-xs text-gray-500">${escape_html(probabilitytoexceedthreshold3())}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (summaryData.study_total_treatment_cost_display) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-center"><div class="text-sm text-gray-600 font-medium mb-1">${escape_html(totaltreatmentcost2())}</div> <div class="text-lg font-bold text-purple-600">${escape_html(summaryData.study_total_treatment_cost_display)}</div> <div class="text-xs text-gray-500">${escape_html(summaryData.unique_added_controls_count || 0)}
								${escape_html(summaryData.unique_added_controls_count === 1 ? uniquecontrol1() : uniquecontrols1())}</div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div></div> `;
        if (combinedLecData?.curves && combinedLecData.curves.length > 0) {
          $$payload.out += "<!--[-->";
          const curves = combinedLecData.curves;
          const currentRiskCurve = curves.find((c) => c.type === "combined_current");
          const residualRiskCurve = curves.find((c) => c.type === "combined_residual");
          const toleranceCurve = curves.find((c) => c.type === "tolerance");
          $$payload.out += `<div class="bg-white rounded-lg p-6 shadow-sm"><div class="flex justify-between items-center mb-4"><div class="flex items-center gap-3"><h2 class="text-xl font-semibold">${escape_html(portfolioriskprofile2())}</h2> `;
          if (aleComparisonData?.scenarios && aleComparisonData.scenarios.length > 0) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<button class="text-sm text-blue-600 hover:text-blue-800 underline flex items-center gap-1"${attr("title", viewalebreakdownbyscenario4())}><i class="fa-solid fa-chart-column"></i> ${escape_html(breakdown())}</button>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div> <div class="text-sm text-gray-600">${escape_html(currentlabel1())}: ${escape_html(combinedLecData.scenarios_with_current_data)} / ${escape_html(combinedLecData.total_scenarios)} `;
          if (combinedLecData.scenarios_with_residual_data) {
            $$payload.out += "<!--[-->";
            $$payload.out += `| ${escape_html(residuallabel1())}: ${escape_html(combinedLecData.scenarios_with_residual_data)} / ${escape_html(combinedLecData.total_scenarios)}
								${escape_html(scenarios())}`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div></div> <div class="w-full">`;
          LossExceedanceCurve($$payload, {
            name: "combined-study-lec",
            data: currentRiskCurve?.data || [],
            residualData: residualRiskCurve?.data || [],
            toleranceData: toleranceCurve?.data || [],
            lossThreshold: summaryData.loss_threshold,
            currency: combinedLecData.currency,
            title: combinedstudyriskprofile3(),
            showTitle: false,
            height: "h-96",
            width: "w-full",
            enableTooltip: true,
            autoYMax: true,
            autoXMax: true,
            classesContainer: "min-w-0"
          });
          $$payload.out += `<!----></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div class="bg-white rounded-lg p-8 shadow-sm text-center"><div class="flex flex-col items-center space-y-4"><i class="fa-solid fa-chart-area text-4xl text-gray-400"></i> <h3 class="text-lg font-semibold text-gray-600">${escape_html(portfoliooverview1())}</h3> <p class="text-gray-500">${escape_html(nocombinedlecdataavailable4())}</p></div></div>`;
        }
        $$payload.out += `<!--]--> `;
        if (summaryData.scenarios && summaryData.scenarios.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_1 = ensure_array_like(summaryData.scenarios);
          $$payload.out += `<div class="space-y-6"><!--[-->`;
          for (let $$index_6 = 0, $$length = each_array_1.length; $$index_6 < $$length; $$index_6++) {
            let scenario = each_array_1[$$index_6];
            $$payload.out += `<div class="card bg-white shadow-sm p-0"><div class="p-6 pb-4"><div class="flex justify-between items-start"><div class="flex-1"><div class="flex items-center justify-between mb-2"><div class="flex items-center gap-3">`;
            Anchor($$payload, {
              href: `/quantitative-risk-scenarios/${stringify(scenario.id)}`,
              class: "px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded cursor-pointer transition-colors",
              breadcrumbAction: "push",
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(scenario.ref_id)}`;
              },
              $$slots: { default: true }
            });
            $$payload.out += `<!----></div> <div class="flex items-center gap-2"><span class="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded capitalize">${escape_html(safeTranslate(scenario.status))}</span> `;
            if (scenario.priority) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<span class="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">P${escape_html(scenario.priority)}</span>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div></div> <h2 class="text-xl font-semibold text-gray-900 mb-2">${escape_html(scenario.name)}</h2> `;
            if (scenario.description || scenario.observation) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="mb-4"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`;
              if (scenario.description) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-2">${escape_html(description())}</h4> `;
                MarkdownRenderer($$payload, {
                  content: scenario.description,
                  class: "text-gray-600"
                });
                $$payload.out += `<!----></div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--> `;
              if (scenario.observation) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-2">${escape_html(observation())}</h4> `;
                MarkdownRenderer($$payload, {
                  content: scenario.observation,
                  class: "text-gray-600"
                });
                $$payload.out += `<!----></div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">`;
            if (scenario.assets && scenario.assets.length > 0) {
              $$payload.out += "<!--[-->";
              const each_array_2 = ensure_array_like(scenario.assets.slice(0, 3));
              $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-2"><i class="fa-solid fa-gem mr-1"></i>${escape_html(assets())} (${escape_html(scenario.assets.length)})</h4> <div class="space-y-1"><!--[-->`;
              for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
                let asset = each_array_2[$$index_1];
                $$payload.out += `<div class="text-sm text-gray-600">• ${escape_html(asset.name)}</div>`;
              }
              $$payload.out += `<!--]--> `;
              if (scenario.assets.length > 3) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<div class="text-sm text-gray-500">${escape_html(andmore1())}
														${escape_html(scenario.assets.length - 3)}
														${escape_html(more())}</div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (scenario.threats && scenario.threats.length > 0) {
              $$payload.out += "<!--[-->";
              const each_array_3 = ensure_array_like(scenario.threats.slice(0, 3));
              $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-2"><i class="fa-solid fa-exclamation-triangle mr-1"></i>${escape_html(threats())} (${escape_html(scenario.threats.length)})</h4> <div class="space-y-1"><!--[-->`;
              for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                let threat = each_array_3[$$index_2];
                $$payload.out += `<div class="text-sm text-gray-600">• ${escape_html(threat.name)}</div>`;
              }
              $$payload.out += `<!--]--> `;
              if (scenario.threats.length > 3) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<div class="text-sm text-gray-500">${escape_html(andmore1())}
														${escape_html(scenario.threats.length - 3)}
														${escape_html(more())}</div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--> `;
            if (scenario.qualifications && scenario.qualifications.length > 0) {
              $$payload.out += "<!--[-->";
              const each_array_4 = ensure_array_like(scenario.qualifications.slice(0, 3));
              $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-2"><i class="fa-solid fa-tags mr-1"></i>${escape_html(qualifications())} (${escape_html(scenario.qualifications.length)})</h4> <div class="space-y-1"><!--[-->`;
              for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
                let qualification = each_array_4[$$index_3];
                $$payload.out += `<div class="text-sm text-gray-600">• ${escape_html(qualification.name)}</div>`;
              }
              $$payload.out += `<!--]--> `;
              if (scenario.qualifications.length > 3) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<div class="text-sm text-gray-500">${escape_html(andmore1())}
														${escape_html(scenario.qualifications.length - 3)}
														${escape_html(more())}</div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div> `;
            if (scenario.existing_controls?.length > 0 || scenario.additional_controls?.length > 0) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<div class="px-6 pb-4 border-t border-gray-200"><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">`;
              if (scenario.existing_controls && scenario.existing_controls.length > 0) {
                $$payload.out += "<!--[-->";
                const each_array_5 = ensure_array_like(scenario.existing_controls);
                $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-3"><i class="fa-solid fa-shield-halved mr-1 text-green-600"></i>${escape_html(existingcontrols1())}
														(${escape_html(scenario.existing_controls.length)})</h4> <div class="space-y-2"><!--[-->`;
                for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
                  let control = each_array_5[$$index_4];
                  $$payload.out += `<div class="flex items-center justify-between p-2 bg-green-50 rounded text-sm hover:bg-green-100 transition-colors"><div class="flex-1">`;
                  Anchor($$payload, {
                    href: `/applied-controls/${stringify(control.id)}`,
                    class: "font-medium text-green-900 hover:text-green-700 cursor-pointer hover:underline",
                    breadcrumbAction: "push",
                    children: ($$payload2) => {
                      $$payload2.out += `<!---->${escape_html(control.name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload.out += `<!----> `;
                  if (control.category) {
                    $$payload.out += "<!--[-->";
                    $$payload.out += `<span class="text-green-600">• ${escape_html(control.category)}</span>`;
                  } else {
                    $$payload.out += "<!--[!-->";
                  }
                  $$payload.out += `<!--]--></div> <div class="flex items-center space-x-2"><span class="px-2 py-1 bg-green-200 text-green-800 text-xs rounded capitalize">${escape_html(safeTranslate(control.status))}</span> `;
                  Anchor($$payload, {
                    href: `/applied-controls/${stringify(control.id)}`,
                    class: "text-green-600 hover:text-green-800 p-1",
                    breadcrumbAction: "push",
                    title: viewcontroldetails2(),
                    children: ($$payload2) => {
                      $$payload2.out += `<i class="fa-solid fa-external-link text-xs"></i>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload.out += `<!----></div></div>`;
                }
                $$payload.out += `<!--]--></div></div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--> `;
              if (scenario.additional_controls && scenario.additional_controls.length > 0) {
                $$payload.out += "<!--[-->";
                const each_array_6 = ensure_array_like(scenario.additional_controls);
                $$payload.out += `<div><h4 class="text-sm font-medium text-gray-900 mb-3"><i class="fa-solid fa-plus-circle mr-1 text-blue-600"></i>${escape_html(additionalcontrols1())}
														(${escape_html(scenario.additional_controls.length)})</h4> <div class="space-y-2"><!--[-->`;
                for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
                  let control = each_array_6[$$index_5];
                  $$payload.out += `<div class="flex items-center justify-between p-2 bg-blue-50 rounded text-sm hover:bg-blue-100 transition-colors"><div class="flex-1">`;
                  Anchor($$payload, {
                    href: `/applied-controls/${stringify(control.id)}`,
                    class: "font-medium text-blue-900 hover:text-blue-700 cursor-pointer hover:underline",
                    breadcrumbAction: "push",
                    children: ($$payload2) => {
                      $$payload2.out += `<!---->${escape_html(control.name)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload.out += `<!----> `;
                  if (control.category) {
                    $$payload.out += "<!--[-->";
                    $$payload.out += `<span class="text-blue-600">• ${escape_html(control.category)}</span>`;
                  } else {
                    $$payload.out += "<!--[!-->";
                  }
                  $$payload.out += `<!--]--> `;
                  if (control.annual_cost && control.annual_cost > 0) {
                    $$payload.out += "<!--[-->";
                    $$payload.out += `<div class="text-xs text-blue-700 mt-1">${escape_html(costyear1())}
																			${escape_html(summaryData.currency)}${escape_html(control.annual_cost.toLocaleString())}${escape_html(costperyear2())}</div>`;
                  } else {
                    $$payload.out += "<!--[!-->";
                  }
                  $$payload.out += `<!--]--></div> <div class="flex items-center space-x-2"><span class="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded capitalize">${escape_html(safeTranslate(control.status))}</span> `;
                  Anchor($$payload, {
                    href: `/applied-controls/${stringify(control.id)}`,
                    class: "text-blue-600 hover:text-blue-800 p-1",
                    breadcrumbAction: "push",
                    title: viewcontroldetails2(),
                    children: ($$payload2) => {
                      $$payload2.out += `<i class="fa-solid fa-external-link text-xs"></i>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload.out += `<!----></div></div>`;
                }
                $$payload.out += `<!--]--></div></div>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]--></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
            }
            $$payload.out += `<!--]--></div> <div class="px-6 pb-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg"><div class="text-center"><div class="text-lg font-bold text-red-600 mb-1">${escape_html(scenario.current_ale_display)}</div> <div class="text-sm text-gray-600">${escape_html(currentale1())}</div></div> <div class="text-center"><div class="text-lg font-bold text-green-600 mb-1">${escape_html(scenario.residual_ale_display)}</div> <div class="text-sm text-gray-600">${escape_html(residualale1())}</div></div> <div class="text-center"><div class="text-lg font-bold text-purple-600 mb-1">${escape_html(scenario.risk_reduction_display || cannotcalculate1())}</div> <div class="text-sm text-gray-600">${escape_html(riskreduction1())}</div> <div class="text-xs text-gray-500">${escape_html(currentale1())} - ${escape_html(residualale1())}</div></div> <div class="text-center"><div class="text-lg font-bold text-blue-600 mb-1">${escape_html(scenario.treatment_cost_display || "N/A")}</div> <div class="text-sm text-gray-600">${escape_html(treatmentcostdisplay2())}</div></div></div> `;
            if (scenario.lec_curves && scenario.lec_curves.length > 0) {
              $$payload.out += "<!--[-->";
              const currentCurve = scenario.lec_curves.find((c) => c.type === "current");
              const residualCurve = scenario.lec_curves.find((c) => c.type === "residual");
              const toleranceCurve = scenario.lec_curves.find((c) => c.type === "tolerance");
              $$payload.out += `<div class="bg-white border rounded-lg p-4"><h4 class="text-lg font-medium text-gray-900 mb-4">${escape_html(lossexceedancecurve2())}</h4> <div class="w-full">`;
              LossExceedanceCurve($$payload, {
                name: `scenario-lec-${stringify(scenario.id)}`,
                data: currentCurve?.data || [],
                residualData: residualCurve?.data || [],
                toleranceData: toleranceCurve?.data || [],
                lossThreshold: summaryData.loss_threshold,
                currency: summaryData.currency,
                title: scenarioriskprofile2(),
                showTitle: false,
                height: "h-80",
                width: "w-full",
                enableTooltip: true,
                autoYMax: true,
                autoXMax: true,
                classesContainer: "min-w-0"
              });
              $$payload.out += `<!----></div></div>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<div class="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 text-center"><i class="fa-solid fa-chart-area text-3xl text-gray-400 mb-3"></i> <p class="text-gray-500">${escape_html(nolecdataavailableforscenario5())}</p> <p class="text-sm text-gray-400">${escape_html(runsimulationsonhypotheses3())}</p></div>`;
            }
            $$payload.out += `<!--]--></div></div>`;
          }
          $$payload.out += `<!--]--></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div class="bg-white rounded-lg p-12 shadow-sm text-center"><i class="fa-solid fa-clipboard-list text-4xl text-gray-400 mb-4"></i> <h3 class="text-xl font-semibold text-gray-600 mb-2">${escape_html(noselectedscenarios2())}</h3> <p class="text-gray-500 mb-4">${escape_html(noscenariosselectedinstudy4())}</p> <p class="text-sm text-gray-400">Select scenarios to see the executive summary.</p></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="bg-white rounded-lg p-12 shadow-sm text-center"><i class="fa-solid fa-exclamation-triangle text-4xl text-red-400 mb-4"></i> <h3 class="text-xl font-semibold text-gray-600 mb-2">${escape_html(failedtoloadexecutivesummary4())}</h3> <p class="text-gray-500 mb-4">${escape_html(therewasanerrorloadingexecutive5())}</p> <button class="btn preset-filled-primary-500"><i class="fa-solid fa-refresh mr-2"></i>${escape_html(retry())}</button></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
  );
  $$payload.out += `<!--]--></main> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CkxYsKJF.js.map
