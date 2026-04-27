import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { G as GraphExplorer } from './GraphExplorer-BQGqg_i9.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './i18n-DuIONS9Q.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set(data.data.meta.display_name);
  const {
    source_framework,
    target_framework,
    source_coverage,
    target_coverage,
    source_total,
    source_linked,
    target_total,
    target_linked
  } = data.data.meta;
  $$payload.out += `<div class="bg-white shadow-sm flex flex-col overflow-x-auto"><div class="px-4 py-2 border-b border-gray-200 flex flex-col gap-1 text-sm"><div><span class="text-gray-600">${escape_html(source_framework)} → ${escape_html(target_framework)}:</span> <span class="font-semibold">${escape_html(target_coverage ?? 0)}%</span> <span class="text-gray-400">(${escape_html(target_linked)}/${escape_html(target_total)})</span></div> <div><span class="text-gray-600">${escape_html(target_framework)} → ${escape_html(source_framework)}:</span> <span class="font-semibold">${escape_html(source_coverage ?? 0)}%</span> <span class="text-gray-400">(${escape_html(source_linked)}/${escape_html(source_total)})</span></div></div> <div class="w-full h-screen">`;
  GraphExplorer($$payload, { title: "Mapping Explorer", data: data.data });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-VhKQTCNt.js.map
