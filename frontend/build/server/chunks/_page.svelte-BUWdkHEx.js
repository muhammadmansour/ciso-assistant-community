import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { G as GraphExplorer } from './GraphExplorer-ZRB096Lu.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { G_ as gobacktoebiosrmstudy5 } from './_index-D7NdhnXA.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './runtime-BKo9q3Zd.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './breadcrumbs-BA0IMSh1.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set("Visual Analysis");
  const color = [
    "#91cc75",
    "#fac858",
    "#e63946",
    "#ea7ccc",
    "#13B8A6",
    "#fc8452",
    "#ff006e",
    "#3a86ff",
    "#3d348b",
    "#9a60b4"
  ];
  const zoom = 1.5;
  const translatedGraphData = {
    ...data.data.graph,
    nodes: data.data.graph.nodes.map((node) => ({ ...node, name: safeTranslate(node.name) })),
    links: data.data.graph.links.map((link) => ({ ...link, value: safeTranslate(link.value) }))
  };
  $$payload.out += `<div class="flex items-center justify-between mb-4">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/ebios-rm/${page.params.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="bg-white shadow-sm flex overflow-x-auto"><div class="w-full h-screen">`;
  GraphExplorer($$payload, {
    title: "Visual Analysis (beta)",
    data: translatedGraphData,
    edgeLength: 150,
    color,
    zoom
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BUWdkHEx.js.map
