import { p as push, T as attr, V as escape_html, W as ensure_array_like, S as attr_class, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { Bc as orderedentrylistrefidplaceholder5, Be as orderedentrylistnameplaceholder4, Bk as orderedentrylistaddbutton4, Bg as orderedentrylistemptystate4, Bh as orderedentrylistdeletearialabel5, Bi as orderedentrylistdebugtitle4 } from './_index-DiaVtc2Z.js';

function OrderedEntryList($$payload, $$props) {
  push();
  let { entries = [], debug = false, onchange } = $$props;
  let newRefId = "";
  let newName = "";
  let draggedIndex = null;
  $$payload.out += `<div class="space-y-4 border-2 border-dashed border-gray-300 rounded-lg p-4"><div class="flex gap-2"><input type="text"${attr("value", newRefId)}${attr("placeholder", orderedentrylistrefidplaceholder5())} class="input px-3 py-2 border border-gray-300 rounded w-1/3"/> <input type="text"${attr("value", newName)}${attr("placeholder", orderedentrylistnameplaceholder4())} class="input px-3 py-2 border border-gray-300 rounded w-2/3"/> <button type="button" class="btn bg-[#0A1628] text-white hover:bg-[#1a2740] px-4 py-2 rounded font-medium transition-colors whitespace-nowrap">${escape_html(orderedentrylistaddbutton4())}</button></div> <div class="space-y-2" role="list">`;
  if (entries.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-white p-4 shadow-sm text-center text-gray-500">${escape_html(orderedentrylistemptystate4())}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(entries);
    $$payload.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let entry = each_array[index];
      $$payload.out += `<div${attr_class("card bg-white p-4 shadow-sm flex items-center gap-3 cursor-move hover:bg-gray-50 transition-colors mx-2", void 0, { "opacity-50": draggedIndex === index })} draggable="true" role="listitem"><div class="flex-none"><span class="text-sm font-semibold text-gray-500 w-6 text-center">${escape_html(index + 1)}</span></div> <div class="flex-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path></svg></div> <div class="flex-1 flex gap-4"><div class="w-1/3"><input type="text"${attr("value", entry.ref_id)} class="input px-2 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded w-full font-medium bg-transparent"/></div> <div class="w-2/3"><input type="text"${attr("value", entry.name)} class="input px-2 py-1 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded w-full bg-transparent"/></div></div> <button type="button" class="btn-sm text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm transition-colors"${attr("aria-label", orderedentrylistdeletearialabel5())}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> `;
  if (debug) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-white p-4 shadow-sm"><h3 class="text-lg font-semibold mb-2">${escape_html(orderedentrylistdebugtitle4())}</h3> <pre class="bg-gray-100 p-3 rounded text-xs overflow-x-auto font-mono">${escape_html(JSON.stringify(entries, null, 2))}</pre></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { entries });
  pop();
}

export { OrderedEntryList as O };
//# sourceMappingURL=OrderedEntryList-FoujbQyk.js.map
