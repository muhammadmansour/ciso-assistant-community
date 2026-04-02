import { p as push, T as attr, S as attr_class, U as clsx, a as pop } from './index2-9icAqEyj.js';
import './runtime-BKo9q3Zd.js';

function ActivityTracker($$payload, $$props) {
  push();
  let {
    classesContainer = "",
    name = "metrics_tracker",
    metrics
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(clsx(classesContainer))} style="width: 400px; height: 400px;"></div>`;
  pop();
}

export { ActivityTracker as A };
//# sourceMappingURL=ActivityTracker-B6p8G7mf.js.map
