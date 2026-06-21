import { p as push, V as escape_html, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-CZeYLK59.js';

function TableMarkdownField($$payload, $$props) {
  push();
  let {
    value = void 0,
    onSave,
    placeholder = "Double-click to add content..."
  } = $$props;
  let editValue = value ?? "";
  $$payload.out += `<div class="space-y-2">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="prose prose-sm max-w-none p-3 border border-surface-300 rounded-md min-h-[120px] bg-surface-50 cursor-text" role="button" tabindex="0">`;
    if (editValue) {
      $$payload.out += "<!--[-->";
      MarkdownRenderer($$payload, { content: editValue });
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="text-gray-500 italic">${escape_html(placeholder)}</p>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex justify-end items-center"><div class="flex space-x-2"><button type="button" class="btn btn-sm variant-soft"><i class="fas fa-edit mr-1"></i> Edit</button> <button class="btn btn-sm variant-filled-success" type="button"><i class="fa-solid fa-check mr-1"></i> Save</button> <button class="btn btn-sm variant-filled-error" type="button"><i class="fa-solid fa-xmark mr-1"></i> Cancel</button></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value });
  pop();
}

export { TableMarkdownField as T };
//# sourceMappingURL=TableMarkdownField-CcHv2H3D.js.map
