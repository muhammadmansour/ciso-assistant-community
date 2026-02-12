import { p as push, S as attr_class, T as attr, X as stringify, M as store_get, V as escape_html, _ as spread_attributes, Y as spread_props, a3 as store_set, W as ensure_array_like, Q as unsubscribe_stores, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { S as Switch } from './Switch-BHyFhQv_.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';

function Checkbox($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    label = void 0,
    field,
    valuePath = field,
    helpText = void 0,
    cachedValue = void 0,
    form,
    hidden = false,
    disabled = false,
    checkboxComponent = "checkbox",
    classes = "",
    classesContainer = "",
    onChange = () => {
    },
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label = label ?? field;
  const { value, errors, constraints } = formFieldProxy(form, valuePath);
  let classesHidden = (h) => h ? "hidden" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  $$payload.out += `<div${attr_class(`${stringify(classesContainer)} ${stringify(classesHidden(hidden))}`)}><div${attr_class(`flex flex-row space-x-2 items-center ${stringify(classesDisabled(disabled))}`)}${attr("aria-disabled", disabled)}>`;
  if (label !== void 0) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required) {
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
  $$payload.out += `<!--]--> <div class="control">`;
  if (checkboxComponent === "checkbox") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${spread_attributes(
      {
        name: field,
        type: "checkbox",
        class: "checkbox",
        "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
        checked: store_get($$store_subs ??= {}, "$value", value),
        ...store_get($$store_subs ??= {}, "$constraints", constraints),
        ...rest,
        disabled
      },
      null
    )}/>`;
  } else if (checkboxComponent === "switch") {
    $$payload.out += "<!--[1-->";
    Switch($$payload, spread_props([
      {
        name: field,
        classes,
        "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
        checked: Boolean(store_get($$store_subs ??= {}, "$value", value)),
        onCheckedChange: (e) => {
          store_set(value, e.checked);
          onChange(store_get($$store_subs ??= {}, "$value", value));
        }
      },
      store_get($$store_subs ??= {}, "$constraints", constraints),
      rest,
      { disabled }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
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
  $$payload.out += `<!--]--> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label, cachedValue });
  pop();
}

export { Checkbox as C };
//# sourceMappingURL=Checkbox-vxSpLW05.js.map
