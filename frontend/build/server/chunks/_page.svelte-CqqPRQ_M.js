import { p as push, T as attr, V as escape_html, X as stringify, W as ensure_array_like, Z as attr_style, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { U0 as back, e as edit, Z$ as addbuiltinwidget2, ZU as addcustomwidget2, Y5 as addtextwidget2, Pe as dashboardeditorinstructions2, OD as _delete, Yn as addrow1, Cw as nowidgetsyet2, Zk as addfirstwidget2 } from './_index-BQcvYRD4.js';
import 'marked';
import './crud-DA2NQw0x.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client-DqP3yP6V.js';
import './runtime-BKo9q3Zd.js';
import { g as getToastStore } from './stores4-JOwRngIp.js';
import './constants-12fjCMiL.js';
import './breadcrumbs-TPX_ebIH.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-vgtyOSI9.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './index3-BpCge2eg.js';
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const dashboard = data.data;
  data.widgetModel;
  data.widgetCreateForm;
  data.textWidgetModel;
  data.textWidgetCreateForm;
  data.builtinWidgetModel;
  data.builtinWidgetCreateForm;
  data.supportedModels || {};
  let widgets = data.widgets || [];
  let extraRows = 0;
  getModalStore();
  getToastStore();
  const GRID_COLS = 12;
  const ROW_HEIGHT = 150;
  const MIN_DIMENSIONS = {
    kpi_card: { width: 2, height: 1 },
    sparkline: { width: 3, height: 1 },
    gauge: { width: 3, height: 2 },
    donut: { width: 3, height: 2 },
    pie: { width: 3, height: 2 },
    line: { width: 4, height: 2 },
    bar: { width: 4, height: 2 },
    area: { width: 4, height: 2 },
    table: { width: 4, height: 2 },
    text: { width: 2, height: 1 }
  };
  const chartTypeLabels = {
    kpi_card: "KPI Card",
    gauge: "Gauge",
    sparkline: "Sparkline",
    line: "Line",
    area: "Area",
    bar: "Bar",
    table: "Table",
    donut: "Donut",
    pie: "Pie",
    text: "Text"
  };
  function getEffectiveChartTypeDisplay(widget) {
    const isBreakdownMetric = widget.metric_key && widget.metric_key.endsWith("_breakdown");
    if (isBreakdownMetric) {
      if (widget.chart_type === "donut" || widget.chart_type === "pie" || widget.chart_type === "bar" || widget.chart_type === "table") {
        return widget.chart_type_display || chartTypeLabels[widget.chart_type] || widget.chart_type;
      }
      return chartTypeLabels["donut"];
    }
    return widget.chart_type_display || chartTypeLabels[widget.chart_type] || widget.chart_type;
  }
  function getMinDimensions(chartType) {
    return MIN_DIMENSIONS[chartType] || { width: 2, height: 1 };
  }
  JSON.stringify(widgets.map((w) => ({
    id: w.id,
    position_x: w.position_x,
    position_y: w.position_y,
    width: w.width,
    height: w.height
  })));
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
  const minRequiredRows = Math.max(4, ...widgets.map((w) => (w.position_y || 0) + (w.height || 2)));
  const maxRow = minRequiredRows + extraRows;
  $$payload.out += `<div class="p-4 space-y-4"><div class="flex justify-between items-center"><div class="flex items-center gap-4"><a${attr("href", `/dashboards/${stringify(dashboard.id)}`)} class="btn preset-tonal"><i class="fa-solid fa-arrow-left"></i> ${escape_html(back())}</a> <h1 class="text-2xl font-bold">${escape_html(edit())}: ${escape_html(dashboard.name)}</h1></div> <div class="flex items-center gap-2"><button class="btn bg-indigo-500 hover:bg-indigo-600 text-white"><i class="fa-solid fa-chart-simple"></i> ${escape_html(addbuiltinwidget2())}</button> <button class="btn bg-violet-500 hover:bg-violet-600 text-white"><i class="fa-solid fa-sliders"></i> ${escape_html(addcustomwidget2())}</button> <button class="btn bg-teal-500 hover:bg-teal-600 text-white"><i class="fa-solid fa-font"></i> ${escape_html(addtextwidget2())}</button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="card p-3 preset-tonal-primary text-sm"><i class="fa-solid fa-circle-info mr-2"></i> ${escape_html(dashboardeditorinstructions2())}</div> <div class="bg-surface-50-950 rounded-lg p-4">`;
  if (widgets.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(GRID_COLS * maxRow));
    const each_array_1 = ensure_array_like(widgets);
    $$payload.out += `<div class="relative"><div class="absolute inset-0 grid gap-2 pointer-events-none opacity-20"${attr_style(`grid-template-columns: repeat(${stringify(GRID_COLS)}, 1fr); grid-template-rows: repeat(${stringify(maxRow)}, ${stringify(ROW_HEIGHT)}px);`)}><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$payload.out += `<div class="border border-dashed border-surface-400 rounded"></div>`;
    }
    $$payload.out += `<!--]--></div> <div class="relative grid gap-2"${attr_style(`grid-template-columns: repeat(${stringify(GRID_COLS)}, 1fr); grid-template-rows: repeat(${stringify(maxRow)}, ${stringify(ROW_HEIGHT)}px);`)} role="grid"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let widget = each_array_1[$$index_1];
      $$payload.out += `<div${attr_class(`card bg-white dark:bg-surface-900 shadow-md p-3 cursor-move relative group transition-shadow hover:shadow-lg ${stringify("")}`)}${attr_style(getWidgetStyle(widget))} draggable="true" role="gridcell"><div class="flex justify-between items-start mb-2"><div class="flex-1 min-w-0"><h4 class="font-semibold text-sm truncate">${escape_html(widget.display_title || widget.title || widget.metric_instance?.name || "Widget")}</h4> <p class="text-xs text-surface-500 truncate">${escape_html(getEffectiveChartTypeDisplay(widget))}</p></div> <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><a${attr("href", `/${stringify(widget.chart_type === "text" ? "dashboard-text-widgets" : widget.metric_key ? "dashboard-builtin-widgets" : "dashboard-widgets")}/${stringify(widget.id)}/edit?next=/dashboards/${stringify(dashboard.id)}/layout`)} class="btn btn-sm preset-tonal p-1"${attr("title", edit())}><i class="fa-solid fa-pencil text-sm"></i></a> <button class="btn btn-sm preset-filled-error-500 p-1"${attr("title", _delete())}><i class="fa-solid fa-trash text-sm"></i></button></div></div> <div class="flex-1 bg-surface-100-900 rounded flex items-center justify-center text-surface-400 min-h-[60px]"><i${attr_class(`text-4xl fa-solid ${stringify(widget.chart_type === "kpi_card" ? "fa-square-poll-vertical" : widget.chart_type === "bar" ? "fa-chart-bar" : widget.chart_type === "gauge" ? "fa-gauge-high" : widget.chart_type === "sparkline" ? "fa-chart-area" : widget.chart_type === "table" ? "fa-table" : widget.chart_type === "area" ? "fa-chart-area" : widget.chart_type === "text" ? "fa-font" : "fa-chart-line")}`)}></i></div> <div class="absolute bottom-1 left-1 text-xs text-surface-400 opacity-0 group-hover:opacity-100"${attr("title", `Position: ${stringify(widget.position_x)},${stringify(widget.position_y)} | Size: ${stringify(widget.width)}x${stringify(widget.height)} | Min: ${stringify(getMinDimensions(widget.chart_type).width)}x${stringify(getMinDimensions(widget.chart_type).height)}`)}>${escape_html(widget.width)}x${escape_html(widget.height)} (min: ${escape_html(getMinDimensions(widget.chart_type).width)}x${escape_html(getMinDimensions(widget.chart_type).height)})</div> <div class="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize opacity-0 group-hover:opacity-100 flex items-center justify-center" role="slider" aria-label="Resize widget" tabindex="0"><i class="fa-solid fa-up-right-and-down-left-from-center text-xs text-surface-400 rotate-90"></i></div></div>`;
    }
    $$payload.out += `<!--]--></div></div> <div class="flex gap-2 mt-2"><button class="flex-1 py-2 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg text-surface-400 hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"><i class="fa-solid fa-plus"></i> ${escape_html(addrow1())}</button> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center min-h-[400px] text-surface-500"><i class="fa-solid fa-chart-line text-6xl mb-4"></i> <p class="mb-4">${escape_html(nowidgetsyet2())}</p> <button class="btn preset-filled-primary-500"><i class="fa-solid fa-chart-simple"></i> ${escape_html(addfirstwidget2())}</button></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CqqPRQ_M.js.map
