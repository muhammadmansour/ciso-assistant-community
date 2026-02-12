import { p as push, V as escape_html, T as attr, X as stringify, W as ensure_array_like, Z as attr_style, a as pop, S as attr_class } from './index2-9icAqEyj.js';
import { S9 as back, Jg as editattributes1, Jf as editlayout1, Bl as nowidgetsyet2, pI as target, BX as nodataavailable2, gu as timestamp, hX as value, cQ as category, Oj as count } from './_index-DEXNURl5.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './runtime-BMNt81Gy.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';

function DashboardWidgetChart($$payload, $$props) {
  push();
  let {
    widget,
    samples = [],
    builtinSamples = [],
    height = "h-full"
  } = $$props;
  const isBuiltinMetric = widget.is_builtin_metric || !!widget.target_content_type;
  const chartId = `widget-chart-${widget.id}`;
  const metricDefinition = widget.metric_instance?.metric_definition;
  const isQualitative = isBuiltinMetric ? false : metricDefinition?.category === "qualitative";
  const builtinMetricType = isBuiltinMetric ? getBuiltinMetricType(widget.metric_key) : null;
  const isBreakdownMetric = builtinMetricType === "breakdown";
  const unitName = isBuiltinMetric ? builtinMetricType === "percentage" ? "percentage" : "" : metricDefinition?.unit?.name || "";
  const HIDDEN_UNITS = ["score", "count"];
  const unitSymbol = unitName === "percentage" ? "%" : HIDDEN_UNITS.includes(unitName) ? "" : unitName;
  const targetValue = widget.metric_instance?.target_value;
  const higherIsBetter = metricDefinition?.higher_is_better ?? true;
  function getBuiltinMetricType(metricKey) {
    if (!metricKey) return "number";
    if (metricKey === "progress") return "percentage";
    if (metricKey.endsWith("_breakdown")) return "breakdown";
    return "number";
  }
  const BREAKDOWN_COLORS = [];
  function formatBreakdownKey(key) {
    const translated = safeTranslate(key);
    if (translated !== key) return translated;
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function formatValueWithUnit(value2) {
    if (unitName === "percentage") return `${value2}%`;
    if (unitSymbol) return `${value2} ${unitSymbol}`;
    return String(value2);
  }
  const customChartData = samples.map((sample) => {
    try {
      const value2 = typeof sample.value === "string" ? JSON.parse(sample.value) : sample.value;
      if (isQualitative) {
        return [sample.timestamp, value2?.choice_index ?? null];
      } else {
        return [sample.timestamp, value2?.result ?? null];
      }
    } catch {
      return [sample.timestamp, null];
    }
  }).filter((item) => item[1] !== null).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
  const builtinChartData = builtinSamples.map((sample) => {
    const metricKey = widget.metric_key;
    const metrics = sample.metrics || {};
    const value2 = metrics[metricKey];
    if (builtinMetricType === "breakdown") {
      return [sample.date, value2 ?? {}];
    }
    return [sample.date, value2 ?? null];
  }).filter((item) => item[1] !== null).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
  const chartData = isBuiltinMetric ? builtinChartData : customChartData;
  const choiceNames = isQualitative ? metricDefinition?.choices_definition?.map((c) => c.name) || [] : [];
  const latestValue = chartData.length > 0 ? chartData[chartData.length - 1][1] : null;
  const latestBreakdown = isBreakdownMetric && chartData.length > 0 ? chartData[chartData.length - 1][1] : null;
  const pieChartData = latestBreakdown && typeof latestBreakdown === "object" ? Object.entries(latestBreakdown).map(([key, value2]) => ({ name: formatBreakdownKey(key), value: value2 })) : [];
  function formatValueOnly(value2) {
    if (value2 === null || value2 === void 0) return "N/A";
    if (isQualitative && choiceNames[value2 - 1]) {
      return choiceNames[value2 - 1];
    }
    return String(value2);
  }
  function formatValue(value2) {
    if (value2 === null || value2 === void 0) return "N/A";
    if (isQualitative && choiceNames[value2 - 1]) {
      return choiceNames[value2 - 1];
    }
    return formatValueWithUnit(value2);
  }
  if (widget.chart_type === "text") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="h-full overflow-auto p-2">`;
    MarkdownRenderer($$payload, { content: widget.text_content });
    $$payload.out += `<!----></div>`;
  } else if (widget.chart_type === "kpi_card" && !isBreakdownMetric) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="flex items-center justify-center h-full"><div class="flex items-baseline gap-3"><div class="flex items-baseline gap-1"><span class="text-4xl font-bold text-primary-600">${escape_html(formatValueOnly(latestValue))}</span> `;
    if (unitSymbol) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-2xl font-medium text-primary-500 lowercase">${escape_html(safeTranslate(unitSymbol))}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (chartData.length > 1) {
      $$payload.out += "<!--[-->";
      const prevValue = chartData[chartData.length - 2]?.[1];
      const change = prevValue ? ((latestValue - prevValue) / prevValue * 100).toFixed(1) : null;
      const isPositiveChange = Number(change) >= 0;
      const isGood = higherIsBetter ? isPositiveChange : !isPositiveChange;
      if (change !== null) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr_class(`text-base font-medium px-2 py-0.5 rounded ${stringify(isGood ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100")}`)}>${escape_html(isPositiveChange ? "↑" : "↓")}
						${escape_html(Math.abs(Number(change)))}%</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> `;
    if (widget.show_target && targetValue) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-sm text-surface-500 text-center -mt-2">${escape_html(target())}: ${escape_html(formatValue(targetValue))}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (widget.chart_type === "kpi_card" && isBreakdownMetric) {
    $$payload.out += "<!--[2-->";
    if (pieChartData.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("id", chartId)}${attr_class(`w-full ${stringify(height)}`)}></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="flex items-center justify-center h-full bg-gray-50 rounded-lg"><p class="text-gray-400 text-sm">${escape_html(nodataavailable2())}</p></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else if (widget.chart_type === "table" && !isBreakdownMetric) {
    $$payload.out += "<!--[3-->";
    const each_array = ensure_array_like([...chartData].reverse().slice(0, 20));
    $$payload.out += `<div class="overflow-auto h-full"><table class="w-full text-sm"><thead class="bg-gray-50 sticky top-0"><tr><th class="px-3 py-2 text-left font-medium text-gray-600">${escape_html(timestamp())}</th><th class="px-3 py-2 text-right font-medium text-gray-600">${escape_html(value())}</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [timestamp2, value2] = each_array[$$index];
      $$payload.out += `<tr class="hover:bg-gray-50"><td class="px-3 py-2 text-gray-600">${escape_html(new Date(timestamp2).toLocaleString())}</td><td class="px-3 py-2 text-right font-medium">${escape_html(formatValue(value2))}</td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table> `;
    if (chartData.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center justify-center h-32 text-gray-400">${escape_html(nodataavailable2())}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else if (widget.chart_type === "table" && isBreakdownMetric) {
    $$payload.out += "<!--[4-->";
    $$payload.out += `<div class="overflow-auto h-full">`;
    if (latestBreakdown && typeof latestBreakdown === "object") {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(Object.entries(latestBreakdown));
      $$payload.out += `<table class="w-full text-sm"><thead class="bg-gray-50 sticky top-0"><tr><th class="px-3 py-2 text-left font-medium text-gray-600">${escape_html(category())}</th><th class="px-3 py-2 text-right font-medium text-gray-600">${escape_html(count())}</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`;
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let [key, count2] = each_array_1[index];
        $$payload.out += `<tr class="hover:bg-gray-50"><td class="px-3 py-2 text-gray-600 flex items-center gap-2"><span class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length])}`)}></span> ${escape_html(formatBreakdownKey(key))}</td><td class="px-3 py-2 text-right font-medium">${escape_html(count2)}</td></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="flex items-center justify-center h-32 text-gray-400">${escape_html(nodataavailable2())}</div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else if (samples.length > 0 || builtinSamples.length > 0) {
    $$payload.out += "<!--[5-->";
    $$payload.out += `<div${attr("id", chartId)}${attr_class(`w-full ${stringify(height)}`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex items-center justify-center h-full bg-gray-50 rounded-lg"><p class="text-gray-400 text-sm">${escape_html(nodataavailable2())}</p></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const dashboard = data.data;
  const widgets = data.widgets || [];
  const GRID_COLS = 12;
  const ROW_HEIGHT = 150;
  const chartTypeLabels = {
    donut: "Donut"
  };
  function getEffectiveChartTypeDisplay(widget) {
    const isBreakdownMetric = widget.metric_key && widget.metric_key.endsWith("_breakdown");
    if (isBreakdownMetric) {
      if (widget.chart_type === "donut" || widget.chart_type === "pie" || widget.chart_type === "bar" || widget.chart_type === "table") {
        return widget.chart_type_display;
      }
      return chartTypeLabels["donut"];
    }
    return widget.chart_type_display;
  }
  function getWidgetStyle(widget) {
    const x = widget.position_x || 0;
    const y = widget.position_y || 0;
    const w = widget.width || 6;
    const h = widget.height || 2;
    return `
			grid-column: ${x + 1} / span ${w};
			grid-row: ${y + 1} / span ${h};
			min-height: ${h * ROW_HEIGHT}px;
		`;
  }
  const maxRow = Math.max(2, ...widgets.map((w) => (w.position_y || 0) + (w.height || 2)));
  $$payload.out += `<div class="p-6 space-y-4"><div class="flex justify-between items-center"><div class="flex items-center gap-4"><a href="/dashboards" class="btn preset-tonal"><i class="fa-solid fa-arrow-left"></i> ${escape_html(back())}</a> <h1 class="text-2xl font-bold">${escape_html(dashboard.name)}</h1> `;
  if (dashboard.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-surface-500">- ${escape_html(dashboard.description)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex items-center gap-2"><a${attr("href", `/dashboards/${stringify(dashboard.id)}/edit?next=/dashboards/${stringify(dashboard.id)}`)} class="btn preset-tonal"><i class="fa-solid fa-pencil"></i> ${escape_html(editattributes1())}</a> <a${attr("href", `/dashboards/${stringify(dashboard.id)}/layout`)} class="btn preset-filled-primary-500"><i class="fa-solid fa-grip"></i> ${escape_html(editlayout1())}</a></div></div> <div class="bg-surface-50-950 rounded-lg p-4 -mx-2">`;
  if (widgets.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(widgets);
    $$payload.out += `<div class="grid gap-4"${attr_style(`grid-template-columns: repeat(${stringify(GRID_COLS)}, 1fr); grid-template-rows: repeat(${stringify(maxRow)}, ${stringify(ROW_HEIGHT)}px);`)}><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let widget = each_array[$$index];
      $$payload.out += `<div class="card p-4 bg-white dark:bg-surface-900 shadow-sm flex flex-col"${attr_style(getWidgetStyle(widget))}>`;
      if (widget.display_title || widget.title) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mb-3"><h4 class="font-semibold text-base">${escape_html(widget.display_title || widget.title)}</h4> `;
        if (widget.chart_type !== "text") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="text-xs text-surface-500">${escape_html(getEffectiveChartTypeDisplay(widget))} | ${escape_html(widget.time_range_display)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="flex-1 min-h-0"><!---->`;
      {
        DashboardWidgetChart($$payload, {
          widget,
          samples: widget.samples || [],
          builtinSamples: widget.builtinSamples || []
        });
      }
      $$payload.out += `<!----></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="card p-12 bg-white dark:bg-surface-900 text-center"><i class="fa-solid fa-chart-line text-8xl text-surface-300 mb-6"></i> <p class="text-surface-500 text-lg mb-6">${escape_html(nowidgetsyet2())}</p> <a${attr("href", `/dashboards/${stringify(dashboard.id)}/layout`)} class="btn preset-filled-primary-500"><i class="fa-solid fa-pen-to-square"></i> ${escape_html(editlayout1())}</a></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DST0o8U0.js.map
