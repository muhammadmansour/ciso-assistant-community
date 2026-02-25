import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';

function CalendarHeatmap($$payload, $$props) {
  push();
  let {
    name,
    data = [],
    year = (/* @__PURE__ */ new Date()).getFullYear(),
    title = "",
    width = "w-full",
    height = "h-96",
    classesContainer = "",
    colorRange = [
      "#ebedf0",
      "#c6e48b",
      "#7bc96f",
      "#239a3b",
      "#196127"
    ],
    onDateClick
  } = $$props;
  const chart_id = `${name}_calendar_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  pop();
}

export { CalendarHeatmap as C };
//# sourceMappingURL=CalendarHeatmap-DPOVb_hX.js.map
