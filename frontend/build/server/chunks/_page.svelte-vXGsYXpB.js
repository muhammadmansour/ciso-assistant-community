import { p as push, a as pop, X as stringify, V as escape_html } from './index2-9icAqEyj.js';
import { C as CalendarHeatmap } from './CalendarHeatmap-DPOVb_hX.js';

function _page($$payload, $$props) {
  push();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  let selectedDate = null;
  let selectedValue = null;
  function handleDateClick(date, value) {
    selectedDate = date;
    selectedValue = value;
  }
  $$payload.out += `<main class="p-8 space-y-8"><div><h1 class="text-3xl font-bold mb-2">Calendar Activity Heatmap</h1> <p class="text-gray-600 mb-8">Experimental calendar heatmap using ECharts 6 - GitHub-style activity visualization</p></div> <div class="bg-white rounded-lg shadow p-6">`;
  CalendarHeatmap($$payload, {
    name: "current_year",
    year: currentYear,
    title: `Current Year Activity (${stringify(currentYear)})`,
    height: "h-80",
    onDateClick: handleDateClick
  });
  $$payload.out += `<!----></div> <div class="bg-gray-50 rounded-lg p-6"><h3 class="text-lg font-semibold mb-3">Selected Date Info</h3> `;
  if (selectedDate) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="space-y-2"><p><span class="font-medium">Date:</span> ${escape_html(new Date(selectedDate).toLocaleDateString())}</p> <p><span class="font-medium">Activity Value:</span> ${escape_html(selectedValue)}</p> <p><span class="font-medium">Day of Week:</span> ${escape_html(new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" }))}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-500">Click on a date in the calendar to see details</p>`;
  }
  $$payload.out += `<!--]--></div></main>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-vXGsYXpB.js.map
