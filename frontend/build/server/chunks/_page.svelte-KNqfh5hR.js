import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';

function TimeSeriesChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = ""
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="width: 400px; height:400px;"></div>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="bg-white p-6 shadow-sm flex overflow-x-auto"><div class="w-full h-96">`;
  TimeSeriesChart($$payload, {});
  $$payload.out += `<!----></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-KNqfh5hR.js.map
