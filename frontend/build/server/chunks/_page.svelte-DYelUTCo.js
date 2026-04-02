import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { G as GraphExplorer } from './GraphExplorer-BOwjLqJj.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { rA as showdomains1, GL as hidedomains1 } from './_index-Syqrsmaf.js';
import { g as goto } from './breadcrumbs-Cdf8pK7r.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './i18n-B-ZrD2ao.js';
import './runtime-BKo9q3Zd.js';
import './client2-CItqzqlw.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set("Assets Explorer");
  $$payload.out += `<div class="bg-white shadow-sm flex flex-col overflow-x-auto"><div class="flex justify-end items-center p-2 border-b border-gray-200">`;
  if (data.hideDomains) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a href="/assets/graph" data-sveltekit-reload="" class="text-primary-800 hover:text-primary-500 cursor-pointer text-sm"><i class="fa-solid fa-eye mr-1"></i> ${escape_html(showdomains1())}</a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a href="/assets/graph?hideDomains=true" data-sveltekit-reload="" class="text-primary-800 hover:text-primary-500 cursor-pointer text-sm"><i class="fa-solid fa-eye-slash mr-1"></i> ${escape_html(hidedomains1())}</a>`;
  }
  $$payload.out += `<!--]--></div> <div class="w-full h-screen">`;
  GraphExplorer($$payload, {
    title: "Assets Explorer",
    data: data.data,
    edgeLength: 100,
    maxLegendItems: 15,
    onNodeDoubleClick: (params) => {
      if (params.dataType === "node" && params.data?.value !== "Domain") {
        goto(`/assets/${params.data?.pk}`, {
          breadcrumbAction: "push",
          label: params.data?.name || "Asset Detail"
        });
      }
    }
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DYelUTCo.js.map
