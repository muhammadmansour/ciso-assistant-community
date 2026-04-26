import { p as push, M as store_get, S as attr_class, T as attr, U as clsx, V as escape_html, W as ensure_array_like, _ as spread_attributes, X as stringify, Q as unsubscribe_stores, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';

function TextField($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    type = "text",
    classesContainer = "",
    label = void 0,
    field,
    valuePath = field,
    helpText = void 0,
    cachedValue = void 0,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    form,
    hidden = false,
    disabled = false,
    required = false,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label = label ?? field;
  const { value, errors, constraints } = formFieldProxy(form, valuePath);
  let displayValue = void 0;
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  function formatDateForInput(utcDateString) {
    if (!utcDateString) return "";
    const date = new Date(utcDateString);
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
  }
  run(() => {
    if (type === "datetime-local" && store_get($$store_subs ??= {}, "$value", value) && !displayValue) {
      displayValue = formatDateForInput(store_get($$store_subs ??= {}, "$value", value));
    }
  });
  $$payload.out += `<div${attr_class(clsx(classesContainer))}${attr("hidden", hidden, true)}><div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label !== void 0 && !hidden) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required || required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label>`;
    }
    $$payload.out += `<!--]-->`;
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
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(safeTranslate(error))}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="control">`;
  if (type === "datetime-local") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${spread_attributes(
      {
        type: "datetime-local",
        class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
        "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
        id: `form-input-${stringify(field.replaceAll("_", "-"))}`,
        name: field,
        "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
        placeholder: "",
        value: displayValue,
        ...store_get($$store_subs ??= {}, "$constraints", constraints),
        ...rest,
        disabled,
        required
      },
      null
    )}/>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes(
      {
        ...{ type },
        class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
        "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
        id: `form-input-${stringify(field.replaceAll("_", "-"))}`,
        name: field,
        "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
        placeholder: "",
        value: store_get($$store_subs ??= {}, "$value", value),
        ...store_get($$store_subs ??= {}, "$constraints", constraints),
        ...rest,
        disabled,
        required
      },
      null
    )}/>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500 whitespace-pre-line">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label, cachedValue });
  pop();
}

export { TextField as T };
//# sourceMappingURL=TextField-CLgzMs6l.js.map
