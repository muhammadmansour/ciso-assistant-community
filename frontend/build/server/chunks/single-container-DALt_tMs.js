import { ah as sanitize_props, ai as rest_props, p as push, ad as fallback, s as setContext, S as attr_class, ae as slot, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { isEqual, SingleContainer } from '@unovis/ts';
import { o as onDestroy } from './index-server-D2ILrLnm.js';

function arePropsEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps);
}
function Single_container($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["data", "class"]);
  push();
  let props, shouldUpdate;
  let chart;
  let ref;
  let component;
  let tooltip;
  let annotations;
  let data = fallback($$props["data"], void 0);
  let className = fallback($$props["class"], "");
  let config;
  function initChart() {
    chart = new SingleContainer(ref, config, data);
  }
  function updateChart(forceUpdate = false) {
    if (forceUpdate) chart === null || chart === void 0 ? void 0 : chart.update(config, null, data);
    else if (shouldUpdate) chart === null || chart === void 0 ? void 0 : chart.updateContainer(config);
    shouldUpdate = false;
  }
  setContext("tooltip", () => ({
    update: (t) => {
      tooltip = t;
    },
    destroy: () => {
      tooltip = void 0;
    }
  }));
  setContext("component", () => ({
    update: (c) => {
      component = c;
    },
    destroy: () => {
      component = void 0;
    }
  }));
  setContext("annotations", () => ({
    update: (a) => {
      annotations = a;
    },
    destroy: () => {
      annotations = void 0;
    }
  }));
  onDestroy(() => chart === null || chart === void 0 ? void 0 : chart.destroy());
  props = $$restProps;
  config = Object.assign({ component, tooltip, annotations }, props);
  chart === null || chart === void 0 ? void 0 : chart.setData(data);
  shouldUpdate = Object.keys(props).some((k) => !arePropsEqual(chart === null || chart === void 0 ? void 0 : chart.config[k], props[k]));
  if (shouldUpdate) updateChart();
  if (component) chart === void 0 ? initChart() : updateChart(true);
  $$payload.out += `<vis-single-container${attr_class(`unovis-single-container ${className}`, "svelte-xvi08t")}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></vis-single-container>`;
  bind_props($$props, { data, class: className });
  pop();
}

export { Single_container as S, arePropsEqual as a };
//# sourceMappingURL=single-container-DALt_tMs.js.map
