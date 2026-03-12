import { O as copy_payload, P as assign_payload, T as attr } from './index2-9icAqEyj.js';
import { O as OrderedEntryList } from './OrderedEntryList-BIOrT-pQ.js';
import './_index-DZs3gE-i.js';
import './runtime-B_ICGJZJ.js';

function _page($$payload) {
  let entries = [
    { ref_id: "REF-001", name: "First Entry" },
    { ref_id: "REF-002", name: "Second Entry" },
    { ref_id: "REF-003", name: "Third Entry" }
  ];
  let debugMode = true;
  function handleChange(newEntries) {
    console.log("Entries updated:", newEntries);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="container mx-auto p-6 max-w-4xl"><div class="mb-6"><h1 class="text-3xl font-bold mb-2">Ordered Entry List - Test Page</h1> <p class="text-gray-600">Test the drag-and-drop ordered entry list component. Add, reorder, and delete entries.</p></div> <div class="mb-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox"${attr("checked", debugMode, true)} class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"/> <span>Enable Debug Mode</span></label></div> `;
    OrderedEntryList($$payload2, {
      debug: debugMode,
      onchange: handleChange,
      get entries() {
        return entries;
      },
      set entries($$value) {
        entries = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-T0ydY_jv.js.map
