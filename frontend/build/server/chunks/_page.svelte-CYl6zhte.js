import { p as push, a as pop, T as attr, S as attr_class, X as stringify, V as escape_html } from './index2-9icAqEyj.js';
import './runtime-B_ICGJZJ.js';
import { p as page } from './index3-BwfRm5YV.js';
import { OD as current, uL as residual } from './_index-BNamVw9A.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';

function EcosystemRadarChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "border",
    title = "",
    name = "",
    data,
    max = page.data.settings.ebios_radar_max,
    greenZoneRadius = page.data.settings.ebios_radar_green_zone_radius,
    yellowZoneRadius = page.data.settings.ebios_radar_yellow_zone_radius,
    redZoneRadius = page.data.settings.ebios_radar_red_zone_radius
  } = $$props;
  const chart_id = `${name}_div`;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div> `;
  if (data.not_displayed > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center">⚠️ ${escape_html(data.not_displayed)} items are not displayed as they are lacking data.</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="bg-white shadow-sm flex overflow-x-auto"><div class="w-full h-screen">`;
  EcosystemRadarChart($$payload, {
    title: current(),
    name: "c_ecosystem",
    data: data.data.current
  });
  $$payload.out += `<!----> `;
  EcosystemRadarChart($$payload, {
    title: residual(),
    name: "r_ecosystem",
    data: data.data.residual
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CYl6zhte.js.map
