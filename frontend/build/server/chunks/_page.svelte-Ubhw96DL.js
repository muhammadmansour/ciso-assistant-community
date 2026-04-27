import { p as push, V as escape_html, a as pop, S as attr_class, U as clsx, T as attr, X as stringify, ah as sanitize_props, ai as rest_props, ad as fallback, N as getContext, R as bind_props } from './index2-9icAqEyj.js';
import { TopoJSONMap, MapProjection } from '@unovis/ts';
import { WorldMapTopoJSON } from '@unovis/ts/maps.js';
import { S as Single_container, a as arePropsEqual } from './single-container-0JmqNCE_.js';
import { T as TreemapChart } from './TreemapChart-CuvisZnE.js';
import { D as DonutChart } from './DonutChart-LcZloe69.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { C9 as nodataavailable2, zE as personaldatacategoriesidentified3, KG as documentedprocessings1, Nz as datarecipients1, AO as openrightrequests2, AQ as opendatabreaches2, NF as databreachesbytype3, tQ as rightrequestsbytype3 } from './_index-D7NdhnXA.js';
import './index-server-DEEfjxiI.js';
import './runtime-BKo9q3Zd.js';

function Topojson_map($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["getComponent", "data"]);
  push();
  let data = fallback($$props["data"], void 0);
  let prevConfig;
  let config;
  let component;
  getContext("component");
  function getComponent() {
    return component;
  }
  config = Object.assign({}, $$restProps);
  if (!arePropsEqual(prevConfig, config)) {
    prevConfig = config;
  }
  $$payload.out += `<vis-component></vis-component>`;
  bind_props($$props, { data, getComponent });
  pop();
}
function Tooltip_1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["getComponent"]);
  push();
  let prevConfig;
  let config;
  let component;
  getContext("tooltip");
  function getComponent() {
    return component;
  }
  config = Object.assign({}, $$restProps);
  if (!arePropsEqual(prevConfig, config)) {
    prevConfig = config;
  }
  $$payload.out += `<vis-tooltip></vis-tooltip>`;
  bind_props($$props, { getComponent });
  pop();
}
function WorldMap($$payload, $$props) {
  push();
  let { data } = $$props;
  const mapData = { areas: data };
  const tooltipTriggers = {
    [TopoJSONMap.selectors.feature]: (d) => `${d.properties.name}: ${d.data?.count ? d.data?.count : "no data"}`
  };
  let useEqualEarth = true;
  const projection = MapProjection.EqualEarth();
  $$payload.out += `<div class="w-full"><div class="flex justify-end mb-2"><label class="flex items-center gap-2 text-sm text-surface-600 cursor-pointer"><input type="checkbox" class="checkbox"${attr("checked", useEqualEarth, true)}/> <span>${escape_html("Equal Earth")}</span></label></div> <!---->`;
  {
    Single_container($$payload, {
      data: mapData,
      height: 500,
      duration: 0,
      children: ($$payload2) => {
        Topojson_map($$payload2, { topojson: WorldMapTopoJSON, projection });
        $$payload2.out += `<!----> `;
        Tooltip_1($$payload2, { triggers: tooltipTriggers });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!----></div>`;
  pop();
}
function GDPRSankeyChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "gdpr_sankey",
    nodes = []
  } = $$props;
  nodes.map((node) => {
    if (node.name) {
      const parts = node.name.split(": ");
      if (parts.length === 2) {
        const [prefix, value] = parts;
        if (prefix === "LegalBasis") {
          const translatedPrefix2 = safeTranslate("legalBasis");
          const translatedValue = safeTranslate(value.toLowerCase());
          return {
            ...node,
            name: `${translatedPrefix2}: ${translatedValue}`
          };
        }
        const translatedPrefix = safeTranslate(prefix.toLowerCase());
        return {
          ...node,
          name: `${translatedPrefix}: ${value}`
        };
      }
      const translatedName = safeTranslate(node.name.toLowerCase());
      return { ...node, name: translatedName };
    }
    return node;
  });
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="width: 100%; height: 100%;"></div>`;
  pop();
}
function Card($$payload, $$props) {
  let { icon, text, count = 0 } = $$props;
  $$payload.out += `<div class="bg-white rounded-lg shadow-md p-4 min-h-20 flex items-center gap-4 transition-all hover:shadow-lg"><div class="text-5xl font-bold text-slate-800">${escape_html(count)}</div> <div class="flex flex-col items-end ml-auto"><div class="text-3xl text-slate-700 mb-1"><i${attr_class(clsx(icon))}></i></div> <div class="text-slate-500 text-xs font-medium">${escape_html(text)}</div></div></div>`;
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="grid grid-cols-12 gap-4"><div class="grid grid-cols-5 bg-slate-100 p-4 gap-4 col-span-12 rounded-lg">`;
  Card($$payload, {
    icon: "fa-solid fa-gem",
    text: personaldatacategoriesidentified3(),
    count: data.data.pd_cat_count
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    icon: "fa-solid fa-file-lines",
    text: documentedprocessings1(),
    count: data.data.processings_count
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    icon: "fa-solid fa-user-tie",
    text: datarecipients1(),
    count: data.data.recipients_count
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    icon: "fa-solid fa-user-shield",
    text: openrightrequests2(),
    count: data.data.open_right_requests_count
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    icon: "fa-solid fa-triangle-exclamation",
    text: opendatabreaches2(),
    count: data.data.open_data_breaches_count
  });
  $$payload.out += `<!----></div> <div class="col-span-7 flex items-center justify-center p-4 bg-white rounded-lg shadow">`;
  if (data?.data?.countries?.length > 0) {
    $$payload.out += "<!--[-->";
    WorldMap($$payload, { data: data.data.countries });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-slate-700">${escape_html(nodataavailable2())}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="col-span-5 min-h-96 p-4 bg-white rounded-lg shadow">`;
  TreemapChart($$payload, {
    tree: data.data.pd_categories,
    name: "pd_cat",
    translate: true
  });
  $$payload.out += `<!----></div> <div class="col-span-6 p-4 bg-white rounded-lg shadow">`;
  DonutChart($$payload, {
    name: "breach_types",
    title: databreachesbytype3(),
    values: data.data.breach_types || [],
    height: "h-96"
  });
  $$payload.out += `<!----></div> <div class="col-span-6 p-4 bg-white rounded-lg shadow">`;
  DonutChart($$payload, {
    name: "request_types",
    title: rightrequestsbytype3(),
    values: data.data.request_types || [],
    height: "h-96"
  });
  $$payload.out += `<!----></div> <div class="col-span-12 p-4 min-h-[600px] bg-white rounded-lg shadow">`;
  if (data.data.sankey_nodes?.length > 0) {
    $$payload.out += "<!--[-->";
    GDPRSankeyChart($$payload, {
      name: "gdpr_flow",
      nodes: data.data.sankey_nodes,
      links: data.data.sankey_links,
      height: "h-[600px]"
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex items-center justify-center h-96 text-slate-700">${escape_html(nodataavailable2())}</div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Ubhw96DL.js.map
