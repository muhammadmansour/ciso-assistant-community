import { p as push, a as pop } from './index2-9icAqEyj.js';
import { G as GraphExplorer } from './GraphExplorer-ruXYKSaP.js';
import { g as goto } from './breadcrumbs-DdEobqL1.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './_index-BNamVw9A.js';
import './runtime-B_ICGJZJ.js';
import './i18n-CnZlshhm.js';
import './client2-CItqzqlw.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="bg-white shadow-sm flex overflow-x-auto"><div class="w-full h-screen">`;
  GraphExplorer($$payload, {
    title: "Mapping Explorer",
    data: data.data,
    color: ["#5470c6", "#9ca3af"],
    onNodeDoubleClick: (params) => {
      if (params.dataType === "node") {
        console.log(params.data);
        goto(`/stored-libraries/${params.data?.pk}`, {
          breadcrumbAction: "push",
          label: params.data?.name || "Detail"
        });
      }
    },
    showNodeLabels: true
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B_GPvETi.js.map
