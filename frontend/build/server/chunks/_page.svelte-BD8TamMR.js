import { p as push, a as pop, af as await_block, V as escape_html, W as ensure_array_like, Z as attr_style, X as stringify, S as attr_class, T as attr, R as bind_props, U as clsx } from './index2-9icAqEyj.js';
import { D as DonutChart } from './DonutChart-DQ7xqHik.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { g as goto } from './client2-CItqzqlw.js';
import { p as page } from './index3-BwfRm5YV.js';
import { B as BarChart } from './BarChart-cPYkEv7y.js';
import { H as HalfDonutChart } from './HalfDonutChart-DNKKmYV2.js';
import { V8 as appliedcontrolsstatus2, HB as findingsassessmentdistribution2, pt as threatradarchart2, BA as nothreatsmapped2, wf as qualificationscharttitle2, BO as noqualificationsfoundonriskscenarios5, FE as inherentrisklevelperscenario4, NX as currentrisklevelperscenario4, ui as residualrisklevelperscenario4, Pm as complianceanalytics1, nj as viewdetailedrecap2, Sw as averageprogress1, Cc as nocompliancedata2, Op as createcomplianceassessment2, Or as createassessment1, qD as summary, GW as governance, tO as risk, b_ as compliance, bN as operations, qU as statistics, Yb as activitycalendar1, sg as securityexceptionflow2, C1 as noexceptiondata2, c6 as inherentrisk1, O0 as currentrisk1, un as residualrisk1, lp as vulnerabilitydistribution1, Vc as appliedcontrolsdistribution2, pR as tasksstatus1, HA as findingsbreakdown1, BZ as nofindingsdata2, FW as incidentseveritybreakdown2, FX as incidentqualificationsradar2, BP as noqualificationsdata2, CK as monthlyincidentmetrics2, FY as incidentdetectionbreakdown2, BR as nooperationsdata2, On as createincidents1, Oo as createincident1, Bh as nothingtoshowyet3, ql as sumpagesectioncontrols2, qm as sumpagesectioncompliance2, qk as sumpagesectionrisk2, qi as sumpagetitlecurrentrisks3, qh as sumpagetitleresidualrisks3, KC as domains, Hi as frameworks, dt as appliedcontrols1, h_ as policies, c4 as securityexceptions1, c2 as riskacceptances1, UQ as assessmentsperstatus2, FV as incidentsummary1, qf as sumpagetotal1, qC as sumpageactive1, qx as sumpagedeprecated1, qg as sumpagetodo2, qt as sumpageinprogress2, qq as sumpageonhold2, qp as sumpagep11, qw as sumpageetamissed2, of as usedframeworks1, qB as sumpageactiveaudits2, qz as sumpageavgprogress2, qr as sumpagenoncompliantitems3, qv as sumpageevidences1, qu as sumpageexpiredevidences2, qA as sumpageassessments1, qn as sumpagescenarios1, qs as sumpagemappedthreats2, qo as sumpageriskaccepted2, pg as totalincidents1, FU as incidentsthismonth2, AP as openincidents1 } from './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import { C as CalendarHeatmap } from './CalendarHeatmap-DPOVb_hX.js';
import './breadcrumbs-Cdf8pK7r.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './constants-QzmVibOJ.js';
import './stores-D-WMoATo.js';
import './crud-CFDLlT9z.js';
import 'marked';
import './string-BMZjP7XX.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import './exports-CA5lG8jS.js';
import './index-CRjgakYW.js';
import './state.svelte-B6YM-9h0.js';
import './client-DqP3yP6V.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './shared-server-BU2DVf8Q.js';
import './legacy-server-DMdb6ZTL.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';

function RadarChart($$payload, $$props) {
  push();
  let {
    s_label = "",
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    title = "",
    name = "",
    values = void 0,
    labels
  } = $$props;
  for (const index in values) {
    if (values[index].localName) {
      values[index].name = safeTranslate(values[index].localName);
    } else {
      const nameToTranslate = values[index].name?.toLowerCase();
      if (nameToTranslate) {
        const translatedName = safeTranslate(nameToTranslate);
        if (translatedName !== nameToTranslate) {
          values[index].name = translatedName;
        }
      }
    }
  }
  for (const index in labels) {
    if (typeof labels[index] === "object" && labels[index].name) {
      const nameToTranslate = labels[index].name?.toLowerCase();
      if (nameToTranslate) {
        const translatedName = safeTranslate(nameToTranslate);
        if (translatedName !== nameToTranslate) {
          labels[index].name = translatedName;
        }
      }
    } else if (typeof labels[index] === "string") {
      const nameToTranslate = labels[index]?.toLowerCase();
      if (nameToTranslate) {
        const translatedName = safeTranslate(nameToTranslate);
        if (translatedName !== nameToTranslate) {
          labels[index] = translatedName;
        }
      }
    }
  }
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  bind_props($$props, { values });
  pop();
}
function GroupedBarChart($$payload, $$props) {
  push();
  let {
    name,
    title = "",
    categories,
    series,
    width = "w-auto",
    height = "h-full",
    classesContainer = ""
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  pop();
}
function NightingaleChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = ""
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  pop();
}
function StackedBarsNormalized($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    data
  } = $$props;
  const chart_id = `stacked_div`;
  if (data.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex justify-center items-center h-full"><div class="font-semibold">${escape_html(nothingtoshowyet3())}</div></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function IncidentMonthlyChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "incident_monthly_chart"
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="width: 100%; height: 100%;"></div>`;
  pop();
}
function ExceptionSankeyChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "exception_sankey",
    nodes = []
  } = $$props;
  for (const node of nodes) {
    if (node.name) {
      const parts = node.name.split(": ");
      if (parts.length === 2) {
        const [prefix, value] = parts;
        const translatedPrefix = safeTranslate(prefix.toLowerCase());
        const translatedValue = safeTranslate(value.toLowerCase());
        node.name = `${translatedPrefix}: ${translatedValue}`;
      }
    }
  }
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="width: 100%; height: 100%;"></div>`;
  pop();
}
function FindingsSankeyChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "findings_sankey",
    nodes = []
  } = $$props;
  nodes.map((node) => {
    if (node.name) {
      const parts = node.name.split(": ");
      if (parts.length === 2) {
        const [prefix, value] = parts;
        const translatedPrefix = safeTranslate(prefix.toLowerCase());
        const translatedValue = safeTranslate(value.toLowerCase());
        return {
          ...node,
          name: `${translatedPrefix}: ${translatedValue}`
        };
      }
    }
    return node;
  });
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="width: 100%; height: 100%;"></div>`;
  pop();
}
function SunburstChart($$payload, $$props) {
  push();
  let {
    name,
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    data = []
  } = $$props;
  function translateData(nodes) {
    return nodes.map((node) => {
      const translatedNode = { ...node };
      if (translatedNode.children) {
        translatedNode.children = translateData(translatedNode.children);
      }
      return translatedNode;
    });
  }
  translateData(data);
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  pop();
}
function CardGroup($$payload, $$props) {
  let {
    title,
    icon = "",
    description = "",
    maxColumns = 4,
    children
  } = $$props;
  const gridClasses = () => {
    switch (maxColumns) {
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-3";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";
      case 4:
      default:
        return "grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-3";
    }
  };
  $$payload.out += `<div class="space-y-3"><div class="flex items-center gap-3 pb-2 border-b border-gray-200">`;
  if (icon) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-xl text-violet-600"><i${attr_class(clsx(icon))}></i></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div><h3 class="text-lg font-semibold text-gray-800">${escape_html(title)}</h3> `;
  if (description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-600">${escape_html(description)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div${attr_class(clsx(gridClasses()))}>`;
  children($$payload);
  $$payload.out += `<!----></div></div>`;
}
function SimpleCard($$payload, $$props) {
  let {
    count = "0",
    label,
    href = "#",
    emphasis = false,
    customClass = ""
  } = $$props;
  const emphasisClasses = emphasis ? "border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-25 to-white shadow-md" : "border border-gray-200";
  const baseCardClasses = `
		flex flex-col h-20 p-3 bg-white rounded-lg
		transition-all duration-200 ease-in-out
		group cursor-pointer
		hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-0.5
		${emphasisClasses} ${customClass}
	`;
  const formattedCount = () => {
    const countStr = String(count);
    if (countStr.includes("%") || countStr.includes("/")) {
      return countStr;
    }
    const numericCount = parseInt(countStr);
    return isNaN(numericCount) ? countStr : numericCount.toLocaleString();
  };
  function cardContent($$payload2) {
    $$payload2.out += `<div class="flex-1 flex flex-col justify-center"><div class="text-2xl font-bold text-gray-800 leading-none mb-1 group-hover:text-violet-800 transition-colors duration-200">${escape_html(formattedCount())}</div> <div class="text-xs font-medium text-gray-600 capitalize group-hover:text-violet-700 transition-colors duration-200">${escape_html(label)}</div></div>`;
  }
  if (href && href !== "#") {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href,
      label,
      class: `${stringify(baseCardClasses)} text-gray-800`,
      children: ($$payload2) => {
        cardContent($$payload2);
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`${stringify(baseCardClasses)} text-gray-800`)}>`;
    cardContent($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
}
function CounterCard($$payload, $$props) {
  push();
  let {
    count = 0,
    label,
    faIcon = "",
    iconColor = "",
    href = void 0,
    children
  } = $$props;
  $$payload.out += `<div${attr_class(`card p-4 w-full flex flex-col whitespace-normal group transition-all duration-200 ease-in-out bg-gradient-to-br from-white via-white to-violet-25 border border-gray-100 shadow-sm hover:shadow-lg hover:border-violet-200 ${stringify(href ? "cursor-pointer hover:scale-[1.02] hover:-translate-y-1" : "")}`)}${attr("role", href ? "button" : "")}><div class="text-xs font-medium text-gray-600 uppercase tracking-wide mb-3 group-hover:text-violet-700 transition-colors duration-200">${escape_html(label)}</div> <div class="flex flex-row items-center justify-between"><div class="flex flex-row items-center">`;
  if (faIcon) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`text-3xl ${stringify(iconColor || "text-violet-500")} mr-3 group-hover:scale-110 transition-transform duration-200`)}><i${attr_class(clsx(faIcon))}></i></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="text-4xl font-bold text-gray-800 group-hover:text-violet-800 transition-colors duration-200"${attr("data-testid", `card-${stringify(label)}`)}>${escape_html(count?.toLocaleString())}</div></div> `;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const cur_rsk_label = currentrisk1();
  const rsd_rsk_label = residualrisk1();
  function localizeChartLabels(labels) {
    return labels.map((label) => safeTranslate(label));
  }
  let group = page.url.searchParams.get("tab") || "summary";
  function handleTabChange(tabValue) {
    page.url.searchParams.set("tab", tabValue);
    goto(page.url);
  }
  {
    let list = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Control($$payload2, {
        value: "summary",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(summary())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "governance",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(governance())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "risk",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(risk())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "compliance",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(compliance())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "operations",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(operations())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    }, content = function($$payload2) {
      $$payload2.out += `<!---->`;
      {
        $$payload2.out += `<div class="px-4 pb-4 space-y-8"><!---->`;
        Tabs.Panel($$payload2, {
          value: "summary",
          children: ($$payload3) => {
            await_block(
              $$payload3,
              data.stream.metrics,
              () => {
                $$payload3.out += `<div class="col-span-3 lg:col-span-1"><div>Refreshing data ..</div> `;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (metrics) => {
                $$payload3.out += `<section id="summary" class="space-y-6"><div class="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start"><div class="xl:col-span-3">`;
                CardGroup($$payload3, {
                  title: sumpagesectioncontrols2(),
                  icon: "fa-solid fa-shield-halved",
                  children: ($$payload4) => {
                    SimpleCard($$payload4, {
                      count: metrics.controls.total,
                      label: sumpagetotal1(),
                      href: "/applied-controls/",
                      emphasis: true
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.active,
                      label: sumpageactive1(),
                      href: "/applied-controls/?status=active"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.deprecated,
                      label: sumpagedeprecated1(),
                      href: "/applied-controls/?status=deprecated"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.to_do,
                      label: sumpagetodo2(),
                      href: "/applied-controls/?status=to_do"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.in_progress,
                      label: sumpageinprogress2(),
                      href: "/applied-controls/?status=in_progress"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.on_hold,
                      label: sumpageonhold2(),
                      href: "/applied-controls/?status=on_hold"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.p1,
                      label: sumpagep11(),
                      href: "/applied-controls/?priority=1&status=to_do&status=deprecated&status=on_hold&status=in_progress&status=--",
                      emphasis: true
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.controls.eta_missed,
                      label: sumpageetamissed2(),
                      href: `/applied-controls/?status=to_do&status=deprecated&status=in_progress&status=--&status=on_hold&eta__lte=${stringify((/* @__PURE__ */ new Date()).toISOString().split("T")[0])}`,
                      emphasis: true
                    });
                    $$payload4.out += `<!---->`;
                  }
                });
                $$payload3.out += `<!----></div> <div class="xl:col-span-2"><div class="bg-white rounded-lg p-4 h-80 border border-gray-200">`;
                NightingaleChart($$payload3, {
                  name: "nightingale",
                  values: metrics.csf_functions
                });
                $$payload3.out += `<!----></div></div></div> <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start"><div class="xl:col-span-2">`;
                CardGroup($$payload3, {
                  title: sumpagesectioncompliance2(),
                  icon: "fa-solid fa-list-check",
                  maxColumns: 3,
                  children: ($$payload4) => {
                    SimpleCard($$payload4, {
                      count: metrics.compliance.used_frameworks,
                      label: usedframeworks1(),
                      href: "/frameworks/",
                      emphasis: true
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: `${stringify(metrics.compliance.active_audits)}/${stringify(metrics.compliance.audits)}`,
                      label: sumpageactiveaudits2(),
                      href: "/compliance-assessments/",
                      emphasis: true
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: `${stringify(metrics.compliance.progress_avg)}%`,
                      label: sumpageavgprogress2(),
                      href: "/compliance-assessments/"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.compliance.non_compliant_items,
                      label: sumpagenoncompliantitems3(),
                      href: "#"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.compliance.evidences,
                      label: sumpageevidences1(),
                      href: "/evidences/"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.compliance.expired_evidences,
                      label: sumpageexpiredevidences2(),
                      href: "/evidences/?status=expired",
                      emphasis: true
                    });
                    $$payload4.out += `<!---->`;
                  }
                });
                $$payload3.out += `<!----></div> <div class="xl:col-span-3"><div class="bg-white rounded-lg p-4 h-96 border border-gray-200">`;
                StackedBarsNormalized($$payload3, {
                  names: metrics.audits_stats.names,
                  data: metrics.audits_stats.data,
                  uuids: metrics.audits_stats.uuids
                });
                $$payload3.out += `<!----></div></div></div> <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start"><div class="xl:col-span-2">`;
                CardGroup($$payload3, {
                  title: sumpagesectionrisk2(),
                  icon: "fa-solid fa-biohazard",
                  children: ($$payload4) => {
                    SimpleCard($$payload4, {
                      count: metrics.risk.assessments,
                      label: sumpageassessments1(),
                      href: "/risk-assessments/",
                      emphasis: true
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.risk.scenarios,
                      label: sumpagescenarios1(),
                      href: "/risk-scenarios/"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.risk.threats,
                      label: sumpagemappedthreats2(),
                      href: "/analytics?tab=risk"
                    });
                    $$payload4.out += `<!----> `;
                    SimpleCard($$payload4, {
                      count: metrics.risk.acceptances,
                      label: sumpageriskaccepted2(),
                      href: "/risk-acceptances"
                    });
                    $$payload4.out += `<!---->`;
                  }
                });
                $$payload3.out += `<!----></div> <div class="xl:col-span-3"><div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="bg-white rounded-lg p-4 h-80 border border-gray-200">`;
                HalfDonutChart($$payload3, {
                  name: "current_h",
                  title: sumpagetitlecurrentrisks3(),
                  values: data.risks_count_per_level.current,
                  colors: data.risks_count_per_level.current.map((object) => object.color)
                });
                $$payload3.out += `<!----></div> <div class="bg-white rounded-lg p-4 h-80 border border-gray-200">`;
                HalfDonutChart($$payload3, {
                  name: "residual_h",
                  title: sumpagetitleresidualrisks3(),
                  values: data.risks_count_per_level.residual,
                  colors: data.risks_count_per_level.residual.map((object) => object.color)
                });
                $$payload3.out += `<!----></div></div></div></div></section>`;
              }
            );
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "governance",
          children: ($$payload3) => {
            await_block(
              $$payload3,
              data.stream.counters,
              () => {
                $$payload3.out += `<div class="col-span-3 lg:col-span-1"><div>Refreshing data ..</div> `;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (counters) => {
                $$payload3.out += `<section id="stats" class="mb-6"><span class="text-xl font-extrabold">${escape_html(statistics())}</span> <div class="flex justify-between flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">`;
                CounterCard($$payload3, {
                  count: counters.domains,
                  label: domains(),
                  faIcon: "fa-solid fa-sitemap",
                  href: "/folders"
                });
                $$payload3.out += `<!----> `;
                CounterCard($$payload3, {
                  count: counters.frameworks,
                  label: frameworks(),
                  faIcon: "fa-solid fa-book",
                  href: "/frameworks"
                });
                $$payload3.out += `<!----> `;
                CounterCard($$payload3, {
                  count: counters.applied_controls,
                  label: appliedcontrols1(),
                  faIcon: "fa-solid fa-fire-extinguisher",
                  href: "/applied-controls"
                });
                $$payload3.out += `<!----> `;
                CounterCard($$payload3, {
                  count: counters.policies,
                  label: policies(),
                  faIcon: "fa-solid fa-file-alt",
                  href: "/policies"
                });
                $$payload3.out += `<!----> `;
                CounterCard($$payload3, {
                  count: counters.exceptions,
                  label: securityexceptions1(),
                  faIcon: "fa-solid fa-circle-exclamation",
                  href: "/security-exceptions"
                });
                $$payload3.out += `<!----> `;
                CounterCard($$payload3, {
                  count: counters.risk_acceptances,
                  label: riskacceptances1(),
                  faIcon: "fa-solid fa-signature",
                  href: "/risk-acceptances"
                });
                $$payload3.out += `<!----></div></section>`;
              }
            );
            $$payload3.out += `<!--]--> `;
            await_block(
              $$payload3,
              data.stream.combinedAssessmentsStatus,
              () => {
                $$payload3.out += `<div class="col-span-3 lg:col-span-1"><div>Loading assessments data...</div> `;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (combinedAssessmentsStatus) => {
                if (combinedAssessmentsStatus) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<section class="bg-white rounded-lg p-4 border border-gray-200 mb-6">`;
                  GroupedBarChart($$payload3, {
                    name: "combined_assessments_status",
                    title: assessmentsperstatus2(),
                    categories: combinedAssessmentsStatus.status_labels.map((label) => safeTranslate(label)),
                    series: combinedAssessmentsStatus.series.map((s) => ({ name: safeTranslate(s.name), data: s.data })),
                    height: "h-80"
                  });
                  $$payload3.out += `<!----></section>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              }
            );
            $$payload3.out += `<!--]--> `;
            await_block(
              $$payload3,
              data.stream.governanceCalendarData,
              () => {
                $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(activitycalendar1())}</h3> <div class="flex items-center justify-center h-64">`;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div></div>`;
              },
              (calendarData) => {
                $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(activitycalendar1())}</h3> `;
                CalendarHeatmap($$payload3, {
                  name: "governance_activity",
                  data: calendarData,
                  year: (/* @__PURE__ */ new Date()).getFullYear(),
                  title: "",
                  height: "h-64"
                });
                $$payload3.out += `<!----></div>`;
              }
            );
            $$payload3.out += `<!--]--> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white rounded-lg p-4 border border-gray-200"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(appliedcontrolsstatus2())}</h3> <div class="h-80">`;
            if (data.applied_control_status) {
              $$payload3.out += "<!--[-->";
              DonutChart($$payload3, {
                name: "applied_controls_status",
                values: data.applied_control_status.values.map((v, i) => ({
                  ...v,
                  name: safeTranslate(data.applied_control_status.labels?.[i] || "")
                })),
                colors: data.applied_control_status.values?.map((v) => v.itemStyle.color)
              });
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>No applied controls data available</p></div>`;
            }
            $$payload3.out += `<!--]--></div></div> <div class="bg-white rounded-lg p-4 border border-gray-200"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(findingsassessmentdistribution2())}</h3> <div class="h-80">`;
            await_block(
              $$payload3,
              data.stream.findingsAssessmentSunburstData,
              () => {
                $$payload3.out += `<div class="flex items-center justify-center h-full">`;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (chartData) => {
                if (chartData && chartData.length > 0) {
                  $$payload3.out += "<!--[-->";
                  const statuses = [
                    ...new Set(chartData.flatMap((d) => d.children.map((c) => c.name)))
                  ].map((s) => safeTranslate(s));
                  const categoryColors = {
                    pentest: "#3b82f6",
                    audit: "#10b981",
                    self_identified: "#f59e0b",
                    "--": "#6b7280"
                  };
                  const series = chartData.map((category) => ({
                    name: safeTranslate(category.name),
                    data: statuses.map((status) => {
                      const originalStatus = chartData.flatMap((d) => d.children).find((c) => safeTranslate(c.name) === status)?.name;
                      return category.children.find((c) => c.name === originalStatus)?.value || 0;
                    }),
                    color: categoryColors[category.name] || "#999"
                  }));
                  GroupedBarChart($$payload3, {
                    name: "findings_assessment_grouped",
                    title: "",
                    categories: statuses,
                    series
                  });
                } else {
                  $$payload3.out += "<!--[!-->";
                  $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>No findings assessment data available</p></div>`;
                }
                $$payload3.out += `<!--]-->`;
              }
            );
            $$payload3.out += `<!--]--></div></div></div> `;
            await_block(
              $$payload3,
              data.stream.operationsAnalytics,
              () => {
                $$payload3.out += `<div class="col-span-3 lg:col-span-1"><div>Loading exceptions data...</div> `;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (operationsAnalytics) => {
                if (operationsAnalytics) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(securityexceptionflow2())}</h3> <div class="h-80">`;
                  if (operationsAnalytics.exception_sankey.nodes.length > 0) {
                    $$payload3.out += "<!--[-->";
                    ExceptionSankeyChart($$payload3, {
                      name: "exception_sankey",
                      nodes: operationsAnalytics.exception_sankey.nodes,
                      links: operationsAnalytics.exception_sankey.links
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                    $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>${escape_html(noexceptiondata2())}</p></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              }
            );
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "risk",
          children: ($$payload3) => {
            $$payload3.out += `<section><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">`;
            if (data.threats_count.results.labels.length > 0) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4"><h3 class="text-lg font-semibold text-gray-900 mb-2">${escape_html(threatradarchart2())}</h3> <div class="h-96">`;
              RadarChart($$payload3, {
                name: "threatRadar",
                title: "",
                labels: data.threats_count.results.labels,
                values: data.threats_count.results.values
              });
              $$payload3.out += `<!----></div></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center"><p class="text-gray-500">${escape_html(nothreatsmapped2())}</p></div>`;
            }
            $$payload3.out += `<!--]--> `;
            if (data.qualifications_count.results.labels.length > 0) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(qualificationscharttitle2())}</h3> <div class="h-80">`;
              BarChart($$payload3, {
                name: "qualificationsBar",
                title: "",
                labels: localizeChartLabels(data.qualifications_count.results.labels),
                values: data.qualifications_count.results.values,
                horizontal: true
              });
              $$payload3.out += `<!----></div></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center"><p class="text-gray-500">${escape_html(noqualificationsfoundonriskscenarios5())}</p></div>`;
            }
            $$payload3.out += `<!--]--></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"><div class="flex flex-wrap lg:flex-nowrap gap-6">`;
            if (page.data?.featureflags?.inherent_risk) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="h-96 flex-col grow lg:flex-1"><span class="text-sm font-semibold">${escape_html(inherentrisklevelperscenario4())}</span> `;
              DonutChart($$payload3, {
                s_label: inherentrisk1(),
                name: "inherent_risk_level",
                values: data.risks_count_per_level.inherent,
                colors: data.risks_count_per_level.inherent?.map((object) => object.color)
              });
              $$payload3.out += `<!----></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--> <div class="h-96 flex-col grow lg:flex-1"><span class="text-sm font-semibold">${escape_html(currentrisklevelperscenario4())}</span> `;
            DonutChart($$payload3, {
              s_label: cur_rsk_label,
              name: "current_risk_level",
              values: data.risks_count_per_level.current,
              colors: data.risks_count_per_level.current?.map((object) => object.color)
            });
            $$payload3.out += `<!----></div> <div class="h-96 flex-col grow lg:flex-1"><span class="text-sm font-semibold">${escape_html(residualrisklevelperscenario4())}</span> `;
            DonutChart($$payload3, {
              s_label: rsd_rsk_label,
              name: "residual_risk_level",
              values: data.risks_count_per_level.residual,
              colors: data.risks_count_per_level.residual?.map((object) => object.color)
            });
            $$payload3.out += `<!----></div></div></div> `;
            await_block(
              $$payload3,
              data.stream.vulnerabilitySankeyData,
              () => {
                $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(vulnerabilitydistribution1())}</h3> <div class="flex items-center justify-center h-80">`;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div></div>`;
              },
              (sankeyData) => {
                if (sankeyData && sankeyData.length > 0) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(vulnerabilitydistribution1())}</h3> <div class="h-96">`;
                  await_block(
                    $$payload3,
                    import('./VulnerabilitySankeyChart-eJu-8XX_.js'),
                    () => {
                      LoadingSpinner($$payload3);
                    },
                    ({ default: VulnerabilitySankeyChart }) => {
                      $$payload3.out += `<!---->`;
                      VulnerabilitySankeyChart($$payload3, { sankeyData });
                      $$payload3.out += `<!---->`;
                    }
                  );
                  $$payload3.out += `<!--]--></div></div>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              }
            );
            $$payload3.out += `<!--]--></section>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "compliance",
          children: ($$payload3) => {
            $$payload3.out += `<section class="space-y-6"><div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold text-gray-900">${escape_html(complianceanalytics1())}</h2> <a href="/recap" class="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors">${escape_html(viewdetailedrecap2())} <i class="fas fa-arrow-right text-xs"></i></a></div> `;
            if (data.complianceAnalytics && Object.keys(data.complianceAnalytics).length > 0) {
              $$payload3.out += "<!--[-->";
              const each_array = ensure_array_like(Object.entries(data.complianceAnalytics));
              $$payload3.out += `<div class="space-y-6"><!--[-->`;
              for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
                let [frameworkName, frameworkData] = each_array[$$index_2];
                const each_array_1 = ensure_array_like(frameworkData.domains);
                $$payload3.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"><div class="flex justify-between items-center"><div class="flex items-center gap-3"><div class="w-2 h-2 bg-blue-500 rounded-full"></div> <h3 class="text-lg font-semibold text-gray-900">${escape_html(frameworkName)}</h3></div> <div class="flex items-center gap-2"><span class="text-sm text-gray-600">${escape_html(averageprogress1())}:</span> <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm"><div class="w-32 bg-gray-200 rounded-full h-1.5"><div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"${attr_style(`width: ${stringify(frameworkData.framework_average)}%`)}></div></div> <span class="font-semibold text-blue-600 text-sm min-w-[2.5rem]">${escape_html(frameworkData.framework_average)}%</span></div></div></div></div> <div class="p-6 space-y-5"><!--[-->`;
                for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
                  let domain = each_array_1[$$index_1];
                  const each_array_2 = ensure_array_like(domain.assessments);
                  $$payload3.out += `<div class="relative"><div class="flex justify-between items-center mb-3 pb-2 border-b border-gray-100"><div class="flex items-center gap-2"><i class="fas fa-folder text-amber-500 text-sm"></i> <h4 class="font-medium text-gray-800">${escape_html(domain.domain)}</h4></div> <div class="flex items-center gap-2"><span class="text-xs text-gray-500">${escape_html(averageprogress1())}:</span> <div class="flex items-center gap-2"><div class="w-8 bg-gray-200 rounded-full h-1"><div class="bg-gradient-to-r from-amber-400 to-orange-500 h-1 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(domain.domain_average)}%`)}></div></div> <span class="font-medium text-amber-600 text-xs">${escape_html(domain.domain_average)}%</span></div></div></div> <div class="grid gap-3"><!--[-->`;
                  for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
                    let assessment = each_array_2[$$index];
                    $$payload3.out += `<div class="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200"><div class="flex justify-between items-start gap-4"><div class="flex-1 min-w-0"><div class="font-medium text-gray-900 mb-1 truncate">${escape_html(assessment.assessment_name)}</div> <div class="flex items-center gap-3 text-xs text-gray-500"><div class="flex items-center gap-1"><i class="fas fa-cubes text-gray-400"></i> <span>${escape_html(assessment.perimeter)}</span></div> <div class="flex items-center gap-1"><div${attr_class(`w-2 h-2 rounded-full ${stringify(assessment.status === "done" ? "bg-green-400" : assessment.status === "in_progress" ? "bg-blue-400" : assessment.status === "in_review" ? "bg-yellow-400" : "bg-gray-400")}`)}></div> <span class="capitalize">${escape_html(assessment.status?.replace("_", " ") || "No status")}</span></div></div></div> <div class="flex items-center gap-3"><div class="flex items-center gap-2"><div class="w-20 bg-gray-200 rounded-full h-2"><div${attr_class(`h-2 rounded-full transition-all duration-500 ${stringify(assessment.progress >= 80 ? "bg-gradient-to-r from-green-400 to-emerald-500" : assessment.progress >= 50 ? "bg-gradient-to-r from-blue-400 to-cyan-500" : assessment.progress >= 25 ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-pink-500")}`)}${attr_style(`width: ${stringify(assessment.progress)}%`)}></div></div> <span${attr_class(`font-semibold text-sm min-w-[3rem] text-right ${stringify(assessment.progress >= 80 ? "text-green-600" : assessment.progress >= 50 ? "text-blue-600" : assessment.progress >= 25 ? "text-orange-600" : "text-red-600")}`)}>${escape_html(assessment.progress)}%</span></div></div></div></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div>`;
                }
                $$payload3.out += `<!--]--></div></div>`;
              }
              $$payload3.out += `<!--]--></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<div class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300"><div class="text-gray-400 mb-4"><i class="fas fa-chart-bar text-6xl"></i></div> <div class="text-gray-600"><p class="text-xl font-semibold mb-2">${escape_html(nocompliancedata2())}</p> <p class="text-sm text-gray-500">${escape_html(createcomplianceassessment2())}</p></div> <a href="/compliance-assessments" class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors"><i class="fas fa-plus text-sm"></i> ${escape_html(createassessment1())}</a></div>`;
            }
            $$payload3.out += `<!--]--></section>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Tabs.Panel($$payload2, {
          value: "operations",
          children: ($$payload3) => {
            await_block(
              $$payload3,
              data.stream.operationsAnalytics,
              () => {
                $$payload3.out += `<div class="col-span-3 lg:col-span-1"><div>Refreshing data ..</div> `;
                LoadingSpinner($$payload3);
                $$payload3.out += `<!----></div>`;
              },
              (operationsAnalytics) => {
                if (operationsAnalytics) {
                  $$payload3.out += "<!--[-->";
                  $$payload3.out += `<section class="space-y-6"><div class="grid grid-cols-1 xl:grid-cols-3 gap-6"><div class="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(appliedcontrolsdistribution2())}</h3> <div class="h-96">`;
                  if (operationsAnalytics.applied_controls_sunburst && operationsAnalytics.applied_controls_sunburst.length > 0) {
                    $$payload3.out += "<!--[-->";
                    SunburstChart($$payload3, {
                      name: "applied_controls_sunburst",
                      data: operationsAnalytics.applied_controls_sunburst
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                    $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>No applied controls data available</p></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div> <div class="xl:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(tasksstatus1())}</h3> <div class="h-96">`;
                  if (data.task_template_status) {
                    $$payload3.out += "<!--[-->";
                    DonutChart($$payload3, {
                      name: "task_templates_status",
                      values: data.task_template_status.values.map((v, i) => ({
                        ...v,
                        localName: data.task_template_status.localLables[i]
                      })),
                      colors: data.task_template_status.values?.map((v) => v.itemStyle.color)
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                    $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>No tasks data available</p></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(findingsbreakdown1())}</h3> <div class="h-80">`;
                  if (operationsAnalytics.findings_sankey && operationsAnalytics.findings_sankey.nodes && operationsAnalytics.findings_sankey.nodes.length > 0) {
                    $$payload3.out += "<!--[-->";
                    FindingsSankeyChart($$payload3, {
                      name: "findings_sankey",
                      nodes: operationsAnalytics.findings_sankey.nodes,
                      links: operationsAnalytics.findings_sankey.links
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                    $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>${escape_html(nofindingsdata2())}</p></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div> <div class="grid grid-cols-1 xl:grid-cols-1 gap-6 items-start"><div class="xl:col-span-1">`;
                  CardGroup($$payload3, {
                    title: incidentsummary1(),
                    icon: "fa-solid fa-chart-simple",
                    children: ($$payload4) => {
                      SimpleCard($$payload4, {
                        count: operationsAnalytics.summary_stats.total_incidents,
                        label: totalincidents1(),
                        href: "/incidents/",
                        emphasis: true
                      });
                      $$payload4.out += `<!----> `;
                      SimpleCard($$payload4, {
                        count: operationsAnalytics.summary_stats.incidents_this_month,
                        label: incidentsthismonth2(),
                        href: "/incidents/",
                        emphasis: true
                      });
                      $$payload4.out += `<!----> `;
                      SimpleCard($$payload4, {
                        count: operationsAnalytics.summary_stats.open_incidents,
                        label: openincidents1(),
                        href: "/incidents/?status=new&status=ongoing&status=resolved",
                        emphasis: true
                      });
                      $$payload4.out += `<!---->`;
                    }
                  });
                  $$payload3.out += `<!----></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(incidentseveritybreakdown2())}</h3> <div class="h-80">`;
                  DonutChart($$payload3, {
                    name: "incident_severity",
                    values: operationsAnalytics.severity_breakdown
                  });
                  $$payload3.out += `<!----></div></div> <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(incidentqualificationsradar2())}</h3> <div class="h-80">`;
                  if (operationsAnalytics.qualifications_breakdown.labels.length > 0) {
                    $$payload3.out += "<!--[-->";
                    RadarChart($$payload3, {
                      name: "incident_qualifications",
                      title: "",
                      labels: operationsAnalytics.qualifications_breakdown.labels,
                      values: operationsAnalytics.qualifications_breakdown.values
                    });
                  } else {
                    $$payload3.out += "<!--[!-->";
                    $$payload3.out += `<div class="flex items-center justify-center h-full text-gray-500"><p>${escape_html(noqualificationsdata2())}</p></div>`;
                  }
                  $$payload3.out += `<!--]--></div></div></div> <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start"><div class="xl:col-span-3"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(monthlyincidentmetrics2())}</h3> <div class="h-80">`;
                  IncidentMonthlyChart($$payload3, {
                    name: "incident_monthly",
                    months: operationsAnalytics.monthly_metrics.months,
                    monthlyCount: operationsAnalytics.monthly_metrics.monthly_counts,
                    cumulativeCount: operationsAnalytics.monthly_metrics.cumulative_counts
                  });
                  $$payload3.out += `<!----></div></div></div> <div class="xl:col-span-2"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(incidentdetectionbreakdown2())}</h3> <div class="h-80">`;
                  DonutChart($$payload3, {
                    name: "incident_detection",
                    values: operationsAnalytics.incident_detection_breakdown,
                    colors: ["#3B82F6", "#EF4444"]
                  });
                  $$payload3.out += `<!----></div></div></div></div></section>`;
                } else {
                  $$payload3.out += "<!--[!-->";
                  $$payload3.out += `<div class="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300"><div class="text-gray-400 mb-4"><i class="fas fa-exclamation-triangle text-6xl"></i></div> <div class="text-gray-600"><p class="text-xl font-semibold mb-2">${escape_html(nooperationsdata2())}</p> <p class="text-sm text-gray-500">${escape_html(createincidents1())}</p></div> <a href="/incidents" class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors"><i class="fas fa-plus text-sm"></i> ${escape_html(createincident1())}</a></div>`;
                }
                $$payload3.out += `<!--]-->`;
              }
            );
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!---->`;
    };
    Tabs($$payload, {
      value: group,
      onValueChange: (e) => handleTabChange(e.value),
      list,
      content,
      $$slots: { list: true, content: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BD8TamMR.js.map
