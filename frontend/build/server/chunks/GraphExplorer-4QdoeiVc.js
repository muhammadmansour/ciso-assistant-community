import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { g as getFlash } from './client.svelte-CxCno2aW.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { HZ as findanode2 } from './_index-DZs3gE-i.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';

function GraphExplorer($$payload, $$props) {
  push();
  getFlash(page);
  let {
    data,
    width = "",
    height = "h-full",
    classesContainer = "",
    title = "",
    layout = "force",
    initLayout = "circular",
    edgeLength = 50,
    name = "graph",
    zoom = 1,
    color = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc"
    ],
    maxLegendItems = 20,
    // Default max legend items
    showNodeLabels = false,
    legendPosition = "left",
    // Default legend position
    onNodeDoubleClick = () => {
    }
  } = $$props;
  let searchQuery = "";
  const chart_id = `${name}_div`;
  data.categories.map((c) => {
    return { ...c, name: safeTranslate(c.name) };
  });
  $$payload.out += `<div class="flex flex-col h-screen bg-white shadow-sm"><div class="relative p-2"><label for="graph-search" class="sr-only">Search</label> <input id="graph-search" type="text" class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-xs"${attr("value", searchQuery)}${attr("placeholder", findanode2())}/> <span class="absolute inset-y-0 end-0 grid w-10 place-content-center"><button type="button" class="text-gray-600 hover:text-gray-700" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></span></div> <div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)} p-4`)} role="presentation"></div></div>`;
  pop();
}

export { GraphExplorer as G };
//# sourceMappingURL=GraphExplorer-4QdoeiVc.js.map
