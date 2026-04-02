import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';

function BarChart($$payload, $$props) {
  push();
  let {
    name,
    values,
    labels,
    horizontal = false,
    title = "",
    width = "w-auto",
    height = "h-full",
    classesContainer = ""
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  pop();
}

export { BarChart as B };
//# sourceMappingURL=BarChart-cPYkEv7y.js.map
