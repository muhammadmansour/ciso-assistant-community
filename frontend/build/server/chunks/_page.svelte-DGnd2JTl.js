import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';

function ForceCirclePacking($$payload, $$props) {
  push();
  let {
    width = "",
    height = "h-full",
    classesContainer = "",
    name = "graph"
  } = $$props;
  let searchQuery = "";
  const chart_id = `${name}_div`;
  $$payload.out += `<div class="relative p-2"><label for="graph-search" class="sr-only">Search</label> <input id="graph-search" type="text" class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-xs"${attr("value", searchQuery)} placeholder="Find a node ..."/> <span class="absolute inset-y-0 end-0 grid w-10 place-content-center"><button type="button" class="text-gray-600 hover:text-gray-700" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></span></div> <div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)} p-8`)} role="presentation"></div>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="h-screen">`;
  ForceCirclePacking($$payload, {});
  $$payload.out += `<!----></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DGnd2JTl.js.map
