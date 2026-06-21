import { p as push, M as store_get, S as attr_class, U as clsx, T as attr, V as escape_html, X as stringify, W as ensure_array_like, Z as attr_style, _ as spread_attributes, Q as unsubscribe_stores, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-CZeYLK59.js';
import { kK as markdowncta3, kL as markdownhelptext2 } from './_index-DiaVtc2Z.js';

function MarkdownField($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    label = void 0,
    field,
    helpText = void 0,
    form,
    cachedValue = void 0,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    hidden = false,
    disabled = false,
    rows = 5,
    cols = 50,
    defaultMode = "preview",
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label = label ?? field;
  const { value, errors, constraints } = formFieldProxy(form, field);
  let showPreview = defaultMode === "preview";
  run(() => {
    cachedValue = store_get($$store_subs ??= {}, "$value", value);
  });
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  $$payload.out += `<div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label !== void 0 && !hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-between items-center">`;
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label>`;
    }
    $$payload.out += `<!--]--> <div class="flex space-x-2"><button type="button"${attr("data-testid", `markdown-edit-btn-${stringify(field)}`)}${attr_class(`btn btn-sm ${stringify(!showPreview ? "variant-filled-primary" : "variant-soft")}`)}><i class="fas fa-edit mr-1"></i> Edit</button> <button type="button"${attr_class(`btn btn-sm ${stringify(showPreview ? "variant-filled-primary" : "variant-soft")}`)}><i class="fas fa-eye mr-1"></i> Preview</button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="control">`;
  if (showPreview) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="p-3 border border-surface-300 rounded-md min-h-[120px] overflow-auto max-h-[75dvh] bg-surface-50" role="button" tabindex="0"${attr_style(`cursor: ${stringify(disabled ? "default" : "text")}; min-width: ${stringify(cols)}ch;`)}>`;
    if (store_get($$store_subs ??= {}, "$value", value)) {
      $$payload.out += "<!--[-->";
      MarkdownRenderer($$payload, {
        content: store_get($$store_subs ??= {}, "$value", value)
      });
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="text-gray-500 italic">${escape_html(markdowncta3())}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<textarea${spread_attributes(
      {
        class: `${stringify("input " + _class)} max-h-[75dvh] ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
        "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
        name: field,
        "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
        ...store_get($$store_subs ??= {}, "$constraints", constraints),
        ...rest,
        rows,
        cols,
        disabled
      },
      null
    )}>`;
    const $$body = escape_html(store_get($$store_subs ??= {}, "$value", value));
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (!showPreview) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-xs text-gray-400 mt-1">${escape_html(markdownhelptext2())}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label, cachedValue });
  pop();
}

export { MarkdownField as M };
//# sourceMappingURL=MarkdownField--WkD3prB.js.map
