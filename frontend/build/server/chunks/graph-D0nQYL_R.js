import { ah as sanitize_props, ai as rest_props, p as push, ad as fallback, N as getContext, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { a as arePropsEqual } from './single-container-0JmqNCE_.js';

function Graph_1($$payload, $$props) {
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

export { Graph_1 as G };
//# sourceMappingURL=graph-D0nQYL_R.js.map
