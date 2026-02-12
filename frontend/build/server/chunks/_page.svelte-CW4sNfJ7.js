import { p as push, S as attr_class, V as escape_html, X as stringify, T as attr, W as ensure_array_like, ab as maybe_selected, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './runtime-BMNt81Gy.js';
import { g as getToastStore } from './stores4-JOwRngIp.js';
import './index-CRjgakYW.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  getToastStore();
  let selectedType = "assets";
  let itemsText = "";
  let selectedFolderId = "";
  let formSubmitted = form !== null && form !== void 0;
  const typeLabels = {
    assets: {
      singular: "Asset",
      plural: "Assets",
      icon: "fa-layer-group"
    },
    entities: {
      singular: "Entity",
      plural: "Entities",
      icon: "fa-building"
    },
    "feared-events": {
      singular: "Feared Event",
      plural: "Feared Events",
      icon: "fa-exclamation-triangle"
    }
  };
  $$payload.out += `<div class="grid grid-cols-4 gap-4"><div class="col-span-2 bg-white shadow-sm py-4 px-6 space-y-2"><div><h4 class="h4 font-bold"><i${attr_class(`fa-solid ${stringify(typeLabels[selectedType].icon)} mr-2`)}></i>Batch Creation</h4> <p class="text-sm">Create multiple ${escape_html(typeLabels[selectedType].plural.toLowerCase())} at once.</p></div> <div class="py-2"><label class="block text-sm font-medium text-gray-900 mb-2">Type *</label> <div class="flex gap-2"><button type="button"${attr_class(`btn ${stringify("preset-filled")}`)}><i class="fa-solid fa-layer-group mr-2"></i>Assets</button> <button type="button"${attr_class(`btn ${stringify("preset-outlined")}`)}><i class="fa-solid fa-building mr-2"></i>Entities</button> <button type="button"${attr_class(`btn ${stringify("preset-outlined")}`)}><i class="fa-solid fa-exclamation-triangle mr-2"></i>Feared Events</button></div></div> <div class="py-2"><h5 class="font-semibold mb-2 text-sm">Instructions:</h5> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<ol class="list-decimal list-inside space-y-1 text-sm"><li>Select the target folder</li> <li>Enter asset names (one per line)</li> <li>Use SP: prefix for Support assets (default)</li> <li>Use PR: prefix for Primary assets</li> <li>Indent with 2 spaces (tab works too) to create parent-child relationships</li> <li>Click Create</li></ol> <div class="mt-3 p-3 bg-gray-50 rounded text-xs"><p class="font-semibold mb-1">Example:</p> <pre class="font-mono">PR:Customer Database
  SP:User Data
    SP:Login Data
Web Application</pre></div>`;
  }
  $$payload.out += `<!--]--></div> <form method="post" class="space-y-4"><input type="hidden" name="type"${attr("value", selectedType)}/> `;
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.folders);
    $$payload.out += `<div class="rounded-lg p-4 border-2 border-green-500"><label for="folder" class="block text-sm font-medium text-gray-900">Target Folder *</label> <select id="folder" name="folder" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm" required>`;
    $$payload.select_value = selectedFolderId;
    $$payload.out += `<option value=""${maybe_selected($$payload, "")}>Select a folder</option><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let folder = each_array[$$index];
      $$payload.out += `<option${attr("value", folder.id)}${maybe_selected($$payload, folder.id)}>${escape_html(folder.str || folder.name)}</option>`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select></div>`;
  }
  $$payload.out += `<!--]--> <div class="rounded-lg p-4 border-2 border-pink-500"><label for="items" class="block text-sm font-medium text-gray-900">${escape_html(typeLabels[selectedType].plural)} List *</label> <textarea id="items" name="items_text" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm font-mono" rows="15" required>`;
  const $$body = escape_html(itemsText);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <p class="text-sm mt-1">${escape_html(itemsText.split("\n").filter((line) => line.trim()).length)}
					${escape_html(typeLabels[selectedType].plural.toLowerCase())} to create</p></div> <div class="flex gap-2"><button type="submit" class="btn preset-filled"><i class="fa-solid fa-plus mr-2"></i> Create ${escape_html(typeLabels[selectedType].plural)}</button> <button type="button" class="btn">Cancel</button></div></form></div> <div class="col-span-2 p-4"><h4 class="font-semibold mb-2">Results</h4> `;
  if (formSubmitted) {
    $$payload.out += "<!--[-->";
    if (form?.success) {
      $$payload.out += "<!--[-->";
      const formType = form.type || selectedType;
      const label = typeLabels[formType];
      const routePath = formType === "assets" ? "/assets" : formType === "entities" ? "/entities" : "/feared-events";
      $$payload.out += `<div class="alert alert-success preset-filled-success-500 mb-4"><div>`;
      if (form.created > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `Created ${escape_html(form.created)} ${escape_html(label.plural.toLowerCase())}`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (form.created > 0 && form.skipped > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `,`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (form.skipped > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `Skipped ${escape_html(form.skipped)} existing ${escape_html(label.plural.toLowerCase())}`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div> `;
      if (form.items && form.items.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_2 = ensure_array_like(form.items);
        $$payload.out += `<div class="mb-4"><h5 class="font-semibold text-sm mb-2 text-green-600">Created ${escape_html(label.plural)}:</h5> <div class="space-y-1"><!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let item = each_array_2[$$index_2];
          $$payload.out += `<div class="text-sm"><a${attr("href", `${stringify(routePath)}/${stringify(item.id)}`)} class="text-indigo-600 hover:text-indigo-400">${escape_html(item.name)}</a> `;
          if (item.ref_id) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-gray-500 text-xs">(${escape_html(item.ref_id)})</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--> `;
          if (item.type) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-gray-500">(${escape_html(item.type)})</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--> `;
          if (item.parent) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-gray-400 text-xs">→ child of ${escape_html(item.parent)}</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (form.skipped_items && form.skipped_items.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_3 = ensure_array_like(form.skipped_items);
        $$payload.out += `<div class="mb-4"><h5 class="font-semibold text-sm mb-2 text-blue-600">Skipped Existing ${escape_html(label.plural)}:</h5> <div class="space-y-1"><!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let item = each_array_3[$$index_3];
          $$payload.out += `<div class="text-sm"><a${attr("href", `${stringify(routePath)}/${stringify(item.id)}`)} class="text-indigo-600 hover:text-indigo-400">${escape_html(item.name)}</a> `;
          if (item.ref_id) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-gray-500 text-xs">(${escape_html(item.ref_id)})</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--> `;
          if (item.type) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="text-gray-500">(${escape_html(item.type)})</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]--></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (form.errors && form.errors.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_4 = ensure_array_like(form.errors);
        $$payload.out += `<div class="alert alert-error preset-filled-error-500 mb-4"><div>Errors: ${escape_html(form.errors.length)}</div></div> <div class="space-y-2"><!--[-->`;
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let error = each_array_4[$$index_4];
          $$payload.out += `<div class="text-sm p-2 bg-gray-50 rounded"><span class="font-mono">${escape_html(error.line)}</span> <span class="text-red-600">- ${escape_html(JSON.stringify(error.errors || error.error))}</span></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="alert alert-error preset-filled-error-500 mb-4"><div>${escape_html(form?.error || "An error occurred")}</div></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-sm text-gray-500">Results will appear here after submission</p>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CW4sNfJ7.js.map
