import { p as push, a as pop, S as attr_class, V as escape_html, T as attr, X as stringify, W as ensure_array_like, U as clsx } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { JA as ebiosws5_11, Jv as ebiosws5_tooltip1, Jz as ebiosws5_21, Jy as ebiosws5_31, Jx as ebiosws5_41, Jw as ebiosws5_51, JG as ebiosws4_01, JD as ebiosws4_2_tooltip1, JF as ebiosws4_11, JC as ebiosws4_3_tooltip1, JE as ebiosws4_21, JM as ebiosws3_11, JK as ebiosws3_2_tooltip1, JL as ebiosws3_21, JJ as ebiosws3_31, JS as ebiosws2_11, JQ as ebiosws2_2_tooltip1, JR as ebiosws2_21, JO as ebiosws2_3_tooltip1, JP as ebiosws2_31, JX as ebiosws1_11, JW as ebiosws1_21, JV as ebiosws1_31, JU as ebiosws1_41, Ye as activity, JY as ebiosws11, JT as ebiosws21, JN as ebiosws31, JH as ebiosws41, JB as ebiosws51, qD as summary, Di as markasinprogress3, Dj as markasdone2, lw as visualanalysis1, vf as report, Ip as exportbutton1, cR as assets, ab as fearedevents1, dB as complianceassessments1, ad as rotocouples2, gq as stakeholders, ah as strategicscenarios1, al as operationalscenarios1, Vb as appliedcontrolsfromaudits3, Va as appliedcontrolsfromriskassessment4 } from './_index-D7NdhnXA.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import 'marked';
import './crud-C1TvVbAO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './runtime-BKo9q3Zd.js';
import './constants-QzmVibOJ.js';
import './breadcrumbs-BA0IMSh1.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-DwUKC0vK.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { T as Tooltip } from './Tooltip-Li45R7zs.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';
import './machine.svelte-CNa8MjEx.js';
import './index8-L4CsUepF.js';
import './index5-Brzv1W4u.js';

/* empty css                                                          */
function Card($$payload, $$props) {
  let cEmphasis = "";
  let {
    count = "0",
    label,
    href = "#",
    icon = "",
    section = "",
    emphasis = false,
    customClass = ""
  } = $$props;
  if (emphasis) {
    cEmphasis = "border border-y-0 border-r-0 border-l-2 border-l-violet-600";
  }
  if (href && href !== "#") {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href,
      label,
      class: `flex flex-col shadow-lg text-purple-800 p-2 h-20 bg-white hover:bg-violet-50 ${stringify(cEmphasis)} ${stringify(customClass)}`,
      children: ($$payload2) => {
        $$payload2.out += `<div class="text-xs">`;
        if (icon) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span><i${attr_class(clsx(icon), "svelte-1s1q8ch")}></i></span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (section) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span>${escape_html(section)}</span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div> <div class="mt-auto"><p class="text-2xl font-bold text-left"${attr("data-testid", `card-${stringify(section)}-${stringify(label)}`)}>${escape_html(count)}</p> <div class="text-xs">${escape_html(label)}</div></div>`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`flex flex-col shadow-lg text-purple-800 p-2 h-20 bg-white ${stringify(cEmphasis)} ${stringify(customClass)}`, "svelte-1s1q8ch")}><div class="text-xs">`;
    if (icon) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span><i${attr_class(clsx(icon), "svelte-1s1q8ch")}></i></span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (section) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span>${escape_html(section)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="mt-auto"><p class="text-2xl font-bold text-left"${attr("data-testid", `card-${stringify(section)}-${stringify(label)}`)}>${escape_html(count)}</p> <div class="text-xs">${escape_html(label)}</div></div></div>`;
  }
  $$payload.out += `<!--]-->`;
}
function Tile($$payload, $$props) {
  push();
  let {
    title = "activity",
    meta = [],
    accent_color = "",
    borderColor = "",
    createRiskAnalysis = false,
    workshop = 0,
    startAtZero = false,
    action,
    content,
    addRiskAnalysis
  } = $$props;
  let open = Array(meta.length).fill(false);
  let actionsOpen = Array(meta.length).fill(false);
  let steps = meta;
  let workshopStatus = () => steps.every((step) => step.status === "done") ? "done" : steps.some((step) => step.status === "done") ? "in_progress" : "to_do";
  function getStepNumber(index) {
    return startAtZero ? index : index + 1;
  }
  $$payload.out += `<div${attr_class(`p-5 ${stringify(accent_color)}`)}><div class="rounded-lg bg-white p-4 flex flex-col justify-between h-full"><div class="flex justify-between mb-2"><div class="font-semibold">${escape_html(title)}</div> <div class="text-xl" role="status"${attr("title", safeTranslate(workshopStatus()))}>`;
  if (workshopStatus() === "to_do") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="fa-solid fa-exclamation" aria-hidden="true"></i>`;
  } else if (workshopStatus() === "in_progress") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<i class="fa-solid fa-spinner" aria-hidden="true"></i>`;
  } else if (workshopStatus() === "done") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<i class="fa-solid fa-check" aria-hidden="true"></i>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  action?.($$payload);
  $$payload.out += `<!----> `;
  if (content) {
    $$payload.out += "<!--[-->";
    content($$payload);
    $$payload.out += `<!---->`;
  } else if (meta) {
    $$payload.out += "<!--[1-->";
    const each_array = ensure_array_like(steps);
    $$payload.out += `<div class="flex mx-auto w-full px-6"><div><ol class="relative text-gray-500 border-s border-gray-200"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let step = each_array[i];
      $$payload.out += `<li class="flex flex-row justify-between items-start gap-8 mb-10 ms-6">`;
      if (createRiskAnalysis && i === 0) {
        $$payload.out += "<!--[-->";
        addRiskAnalysis?.($$payload);
        $$payload.out += `<!---->`;
      } else if (!step.disabled) {
        $$payload.out += "<!--[1-->";
        Anchor($$payload, {
          href: step.href,
          prefixCrumbs: [
            { label: safeTranslate(`ebiosWs${workshop}`) }
          ],
          label: safeTranslate(`ebiosWs${workshop}_${getStepNumber(i)}`),
          class: "hover:text-purple-800",
          "data-testid": `workshop-${stringify(workshop)}-step-${stringify(getStepNumber(i))}-link`,
          children: ($$payload2) => {
            $$payload2.out += `<span${attr_class(`absolute flex items-center justify-center w-8 h-8 ${stringify(step.status === "done" ? "bg-success-200" : "bg-surface-200")} rounded-full -start-4 ring-4 ring-white`)}><i${attr_class(`fa-solid ${stringify(step.status === "done" ? "fa-check" : "fa-clipboard-check")}`)} aria-hidden="true"></i></span> `;
            if (step.preliminary) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<h3 class="font-medium leading-tight">Preliminary step</h3> <p class="text-sm">${escape_html(step.title)}</p>`;
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `<h3 class="font-medium leading-tight">${escape_html(activity())} ${escape_html(getStepNumber(i))}</h3> <p class="text-sm">${escape_html(step.title)}</p>`;
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
        {
          let trigger = function($$payload2) {
            $$payload2.out += `<div class="text-gray-300 *:pointer-events-none"><span class="absolute flex items-center justify-center w-8 h-8 bg-surface-200 rounded-full -start-4 ring-4 ring-white"><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i></span> `;
            if (step.preliminary) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<h3 class="font-medium leading-tight text-start">Preliminary step</h3> <p class="text-sm text-start">${escape_html(step.title)}</p>`;
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `<h3 class="font-medium leading-tight text-start">${escape_html(activity())}
														${escape_html(getStepNumber(i))}</h3> <p class="text-sm text-start">${escape_html(step.title)}</p>`;
            }
            $$payload2.out += `<!--]--></div>`;
          }, content2 = function($$payload2) {
            $$payload2.out += `<div class="transition card bg-white shadow-lg p-4 z-20 duration-300"><p data-testid="activity-tooltip"${attr_class(`border-l-4 ${stringify(borderColor)} text-gray-500 p-2`)}>${escape_html(step.tooltip)}</p> <div class="arrow bg-white"></div></div>`;
          };
          Tooltip($$payload, {
            open: open[i],
            onOpenChange: (e) => open[i] = e.open,
            openDelay: 0,
            zIndex: "100",
            trigger,
            content: content2,
            $$slots: { trigger: true, content: true }
          });
        }
      }
      $$payload.out += `<!--]--> `;
      if (!step.disabled) {
        $$payload.out += "<!--[-->";
        {
          let trigger = function($$payload2) {
            $$payload2.out += `<span role="button" tabindex="0" class="btn bg-initial" aria-label="More options" data-testid="sidebar-more-btn"><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></span>`;
          }, content2 = function($$payload2) {
            $$payload2.out += `<div class="card whitespace-nowrap bg-white border border-gray-300 rounded-md py-2 w-fit shadow-lg space-y-1" data-testid="sidebar-more-panel"><form${attr("action", `/ebios-rm/${stringify(page.params.id)}?/changeStepState`)} method="POST"><input type="hidden" name="workshop"${attr("value", workshop)}/> <input type="hidden" name="step"${attr("value", getStepNumber(i))}/> <input type="hidden" name="status"${attr("value", step.status === "done" ? "in_progress" : "done")}/> <button type="submit" class="btn bg-initial">${escape_html(step.status === "done" ? markasinprogress3() : markasdone2())}</button></form></div>`;
          };
          Popover($$payload, {
            open: actionsOpen[i],
            onOpenChange: (e) => actionsOpen[i] = e.open,
            trigger,
            content: content2,
            $$slots: { trigger: true, content: true }
          });
        }
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></li>`;
    }
    $$payload.out += `<!--]--></ol></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="justify-end flex"></div></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data, form } = $$props;
  const workshopsData = {
    ws1: [
      {
        title: safeTranslate(ebiosws1_11()),
        status: data.data.meta.workshops[0].steps[0].status,
        href: `${page.url.pathname}/workshop-1/ebios-rm-study?activity=one&next=${page.url.pathname}`
      },
      {
        title: safeTranslate(ebiosws1_21()),
        status: data.data.meta.workshops[0].steps[1].status,
        href: `${page.url.pathname}/workshop-1/ebios-rm-study?activity=two&next=${page.url.pathname}`
      },
      {
        title: safeTranslate(ebiosws1_31()),
        status: data.data.meta.workshops[0].steps[2].status,
        href: `${page.url.pathname}/workshop-1/feared-events?next=${page.url.pathname}`
      },
      {
        title: safeTranslate(ebiosws1_41()),
        status: data.data.meta.workshops[0].steps[3].status,
        href: `${page.url.pathname}/workshop-1/baseline?next=${page.url.pathname}`
      }
    ],
    ws2: [
      {
        title: safeTranslate(ebiosws2_11()),
        status: data.data.meta.workshops[1].steps[0].status,
        href: `${page.url.pathname}/workshop-2/ro-to?activity=one&next=${page.url.pathname}`
      },
      {
        title: safeTranslate(ebiosws2_21()),
        status: data.data.meta.workshops[1].steps[1].status,
        href: `${page.url.pathname}/workshop-2/ro-to?activity=two&next=${page.url.pathname}`,
        disabled: data.data.roto_count < 1,
        tooltip: safeTranslate(ebiosws2_2_tooltip1())
      },
      {
        title: safeTranslate(ebiosws2_31()),
        status: data.data.meta.workshops[1].steps[2].status,
        href: `${page.url.pathname}/workshop-2/ro-to?activity=three&next=${page.url.pathname}`,
        disabled: data.data.roto_count < 1,
        tooltip: safeTranslate(ebiosws2_3_tooltip1())
      }
    ],
    ws3: [
      {
        title: safeTranslate(ebiosws3_11()),
        status: data.data.meta.workshops[2].steps[0].status,
        href: `${page.url.pathname}/workshop-3/ecosystem?activity=one&next=${page.url.pathname}`
      },
      {
        title: safeTranslate(ebiosws3_21()),
        status: data.data.meta.workshops[2].steps[1].status,
        href: `${page.url.pathname}/workshop-3/strategic-scenarios?next=${page.url.pathname}`,
        disabled: data.data.selected_roto_count < 1,
        tooltip: safeTranslate(ebiosws3_2_tooltip1())
      },
      {
        title: safeTranslate(ebiosws3_31()),
        status: data.data.meta.workshops[2].steps[2].status,
        href: `${page.url.pathname}/workshop-3/ecosystem?activity=three&next=${page.url.pathname}`
      }
    ],
    ws4: [
      {
        title: safeTranslate(ebiosws4_01()),
        status: data.data.meta.workshops[3].steps[0].status,
        href: `${page.url.pathname}/workshop-4/elementary-actions`
      },
      {
        title: safeTranslate(ebiosws4_11()),
        status: data.data.meta.workshops[3].steps[1].status,
        href: `${page.url.pathname}/workshop-4/operational-scenario?activity=one&next=${page.url.pathname}`,
        disabled: data.data.selected_attack_path_count < 1,
        tooltip: safeTranslate(ebiosws4_2_tooltip1())
      },
      {
        title: safeTranslate(ebiosws4_21()),
        status: data.data.meta.workshops[3].steps[2].status,
        href: `${page.url.pathname}/workshop-4/operational-scenario?activity=two&next=${page.url.pathname}`,
        disabled: data.data.operational_scenario_count < 1,
        tooltip: safeTranslate(ebiosws4_3_tooltip1())
      }
    ],
    ws5: [
      {
        title: safeTranslate(ebiosws5_11()),
        status: data.data.meta.workshops[4].steps[0].status,
        href: "#"
      },
      {
        title: safeTranslate(ebiosws5_21()),
        status: data.data.meta.workshops[4].steps[1].status,
        href: `/risk-assessments/${data.data.last_risk_assessment?.id}?activity=two&next=${page.url.pathname}`,
        disabled: data.data.last_risk_assessment == null,
        tooltip: safeTranslate(ebiosws5_tooltip1())
      },
      {
        title: safeTranslate(ebiosws5_31()),
        status: data.data.meta.workshops[4].steps[2].status,
        href: `/risk-assessments/${data.data.last_risk_assessment?.id}?activity=three&next=${page.url.pathname}`,
        disabled: data.data.last_risk_assessment == null,
        tooltip: safeTranslate(ebiosws5_tooltip1())
      },
      {
        title: safeTranslate(ebiosws5_41()),
        status: data.data.meta.workshops[4].steps[3].status,
        href: `/risk-assessments/${data.data.last_risk_assessment?.id}?activity=four&next=${page.url.pathname}`,
        disabled: data.data.last_risk_assessment == null,
        tooltip: safeTranslate(ebiosws5_tooltip1())
      },
      {
        title: safeTranslate(ebiosws5_51()),
        status: data.data.meta.workshops[4].steps[4].status,
        href: `/risk-assessments/${data.data.last_risk_assessment?.id}/action-plan?next=${page.url.pathname}`,
        disabled: data.data.last_risk_assessment == null,
        tooltip: safeTranslate(ebiosws5_tooltip1())
      }
    ]
  };
  $$payload.out += `<div class="h-full w-full p-8"><div class="card bg-white shadow-lg w-full h-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 p-8">`;
  Tile($$payload, {
    workshop: 1,
    title: ebiosws11(),
    accent_color: "bg-pink-600",
    borderColor: "border-pink-600",
    meta: workshopsData.ws1
  });
  $$payload.out += `<!----> `;
  Tile($$payload, {
    workshop: 2,
    title: ebiosws21(),
    accent_color: "bg-fuchsia-900",
    borderColor: "border-fuchsia-900",
    meta: workshopsData.ws2
  });
  $$payload.out += `<!----> `;
  Tile($$payload, {
    workshop: 3,
    title: ebiosws31(),
    accent_color: "bg-teal-500",
    borderColor: "border-teal-500",
    meta: workshopsData.ws3
  });
  $$payload.out += `<!----> `;
  Tile($$payload, {
    workshop: 4,
    startAtZero: true,
    title: ebiosws41(),
    accent_color: "bg-yellow-600",
    borderColor: "border-yellow-600",
    meta: workshopsData.ws4
  });
  $$payload.out += `<!----> `;
  {
    let addRiskAnalysis = function($$payload2) {
      $$payload2.out += `<div><button class="flex flex-col text-left hover:text-purple-800">`;
      if (data.data.meta.workshops[4].steps[0].status == "done") {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="absolute flex items-center justify-center w-8 h-8 bg-success-200 rounded-full -start-4 ring-4 ring-white"><i class="fa-solid fa-check"></i></span>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<span class="absolute flex items-center justify-center w-8 h-8 bg-surface-200 rounded-full -start-4 ring-4 ring-white"><i class="fa-solid fa-clipboard-check"></i></span>`;
      }
      $$payload2.out += `<!--]--> <h3 class="font-medium leading-tight">${escape_html(activity())} 1</h3> <p class="text-sm">${escape_html(safeTranslate(ebiosws5_11()))}</p></button></div>`;
    };
    Tile($$payload, {
      workshop: 5,
      title: ebiosws51(),
      accent_color: "bg-red-500",
      borderColor: "border-red-500",
      meta: workshopsData.ws5,
      createRiskAnalysis: true,
      addRiskAnalysis
    });
  }
  $$payload.out += `<!----> `;
  {
    let action = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col gap-3"><a class="bg-surface-600 hover:bg-purple-600 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"${attr("href", `${page.url.pathname}/visual/`)}><i class="fa-solid fa-chart-diagram"></i> <span>${escape_html(visualanalysis1())}</span></a> <a class="bg-surface-600 hover:bg-purple-600 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"${attr("href", `${page.url.pathname}/report/`)}><i class="fa-solid fa-file-lines"></i> <span>${escape_html(report())}</span></a> <div class="relative"><button class="bg-surface-600 hover:bg-purple-600 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full"><i class="fa-solid fa-download"></i> <span>${escape_html(exportbutton1())}</span> <i class="fa-solid fa-chevron-down text-xs"></i></button> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div>`;
    }, content = function($$payload2) {
      const counters = data.data?.counters || {};
      $$payload2.out += `<div class="grid grid-cols-2 gap-2">`;
      Card($$payload2, {
        count: String(counters.selected_asset_count ?? 0),
        label: assets(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.selected_feared_event_count ?? 0),
        label: fearedevents1(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.compliance_assessment_count ?? 0),
        label: complianceassessments1(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.roto_count ?? 0),
        label: rotocouples2(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.stakeholder_count ?? 0),
        label: stakeholders(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.strategic_scenario_count ?? 0),
        label: strategicscenarios1(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.operational_scenario_count ?? 0),
        label: operationalscenarios1(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.compliance_applied_control_count ?? 0),
        label: appliedcontrolsfromaudits3(),
        section: ""
      });
      $$payload2.out += `<!----> `;
      Card($$payload2, {
        count: String(counters.risk_assessment_applied_control_count ?? 0),
        label: appliedcontrolsfromriskassessment4(),
        section: ""
      });
      $$payload2.out += `<!----></div>`;
    };
    Tile($$payload, {
      title: summary(),
      accent_color: "bg-purple-800",
      action,
      content
    });
  }
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C-7ijDzE.js.map
