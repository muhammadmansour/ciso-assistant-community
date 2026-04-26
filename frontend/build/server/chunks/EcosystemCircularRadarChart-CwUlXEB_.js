import { p as push, T as attr, S as attr_class, X as stringify, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import './runtime-B_ICGJZJ.js';
import { p as page } from './index3-BwfRm5YV.js';

function EcosystemCircularRadarChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "border",
    title = "",
    name = "",
    data,
    type,
    max = page.data.settings.ebios_radar_max,
    greenZoneRadius = page.data.settings.ebios_radar_green_zone_radius,
    yellowZoneRadius = page.data.settings.ebios_radar_yellow_zone_radius,
    redZoneRadius = page.data.settings.ebios_radar_red_zone_radius
  } = $$props;
  const chart_id = `${name}_circular_div`;
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

export { EcosystemCircularRadarChart as E };
//# sourceMappingURL=EcosystemCircularRadarChart-CwUlXEB_.js.map
