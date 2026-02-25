import { p as push, T as attr, S as attr_class, X as stringify, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-CnZlshhm.js';

function DonutChart($$payload, $$props) {
  push();
  let {
    name,
    s_label = "",
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    title = "",
    orientation = "vertical",
    values = void 0,
    colors = [],
    showPercentage = false
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
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  bind_props($$props, { values });
  pop();
}

export { DonutChart as D };
//# sourceMappingURL=DonutChart-7HS_3cYR.js.map
