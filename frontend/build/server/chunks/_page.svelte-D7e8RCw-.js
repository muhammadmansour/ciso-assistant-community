import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { G as GraphExplorer } from './GraphExplorer-ZRB096Lu.js';
import { Je as entitiesgraph1, Sm as backtotable2 } from './_index-D7NdhnXA.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './i18n-CMphL55V.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="bg-white shadow-sm flex flex-col overflow-x-auto"><div class="flex justify-between items-center p-4 border-b border-gray-200"><h1 class="text-2xl font-semibold text-gray-900"><i class="fa-solid fa-diagram-project mr-2"></i> ${escape_html(entitiesgraph1())}</h1> <a href="/entities" class="text-primary-800 hover:text-primary-500 cursor-pointer"><i class="fa-solid fa-arrow-left mr-2"></i> ${escape_html(backtotable2())}</a></div> <div class="w-full h-screen">`;
  GraphExplorer($$payload, {
    title: "Entities Graph",
    data: data.data,
    edgeLength: 120,
    maxLegendItems: 10,
    showNodeLabels: false
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D7e8RCw-.js.map
