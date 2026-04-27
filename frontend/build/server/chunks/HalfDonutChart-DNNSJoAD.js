import { p as push, T as attr, S as attr_class, X as stringify, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import './runtime-BKo9q3Zd.js';

function HalfDonutChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    title = "",
    name,
    values = void 0,
    colors = []
  } = $$props;
  for (const index in values) {
    if (values[index].name) {
      values[index].name = safeTranslate(values[index].name);
    }
  }
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  bind_props($$props, { values });
  pop();
}

export { HalfDonutChart as H };
//# sourceMappingURL=HalfDonutChart-DNNSJoAD.js.map
