import { p as push, T as attr, V as escape_html, a as pop, S as attr_class, X as stringify } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { FT as includeenclaves1, cq as domain, Jm as enclave, cy as perimeter } from './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';

function TreeChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "",
    tree
  } = $$props;
  const chart_id = `${name}_div`;
  if (tree.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col justify-center items-center h-full"><span class="text-center text-gray-600">Not enough data yet. Refresh when more content is available.</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)}></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="bg-white p-6 shadow-sm flex flex-col overflow-x-auto"><div class="flex items-center gap-4 mb-4"><label class="flex items-center gap-2 text-sm font-medium cursor-pointer"><input type="checkbox" class="checkbox"${attr("checked", data.includeEnclaves, true)}/> ${escape_html(includeenclaves1())}</label> <div class="flex items-center gap-4 text-sm text-gray-600"><span class="flex items-center gap-1"><span class="inline-block w-3 h-3 rounded-sm" style="background-color: #B0C4DE;"></span> ${escape_html(domain())}</span> <span class="flex items-center gap-1"><span class="inline-block w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px]" style="border-bottom-color: #6366f1;"></span> ${escape_html(enclave())}</span> <span class="flex items-center gap-1"><span class="inline-block w-2.5 h-2.5 rounded-full" style="background-color: #222436;"></span> ${escape_html(perimeter())}</span></div></div> <div class="w-full h-dvh"><!---->`;
  {
    TreeChart($$payload, {
      tree: data.data,
      name: "org_tree"
    });
  }
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CCFZ1_L4.js.map
