import { p as push, M as store_get, W as ensure_array_like, T as attr, V as escape_html, S as attr_class, X as stringify, Q as unsubscribe_stores, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';

function RadioGroup($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    possibleOptions,
    classes = "",
    colorMap = {},
    label,
    helpText,
    form,
    disabled = false,
    initialValue,
    onChange = () => {
    },
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    cachedValue = void 0,
    field,
    valuePath = field,
    key = "value",
    labelKey = "label"
  } = $$props;
  const { value, errors } = form ? formFieldProxy(form, valuePath) : {};
  let internalValue = value ? store_get($$store_subs ??= {}, "$value", value) : initialValue;
  value ? store_get($$store_subs ??= {}, "$value", value) : void 0;
  let disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  let labeledOptions = possibleOptions.filter((option) => option[labelKey]);
  const each_array_1 = ensure_array_like(labeledOptions);
  $$payload.out += `<div class="control overflow-x-clip grow">`;
  if (label) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label><br/>`;
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
  $$payload.out += `<!--]--> <div${attr_class(`p-1 inline-flex gap-1 grow flex-wrap items-center bg-gray-200 border border-gray-400 rounded-md ${stringify(classes)} ${stringify(disabledClasses)}`)}><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let option = each_array_1[$$index_1];
    const color = colorMap[option.id] ?? "preset-filled-primary-500";
    $$payload.out += `<label${attr_class(`flex-auto rounded-lg ${stringify(option[key] === internalValue ? color : "")}`)}><div class="text-base text-center cursor-pointer px-4 py-1 hover:preset-tonal h-full"><div class="h-0 w-0 overflow-hidden"><input type="radio"${attr("name", field)} class="invisible"${attr("id", option.id)}${attr("value", option[key])}${attr("disabled", disabled, true)}/></div> ${escape_html(option[labelKey])}</div></label>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { cachedValue });
  pop();
}

export { RadioGroup as R };
//# sourceMappingURL=RadioGroup-BatokiWT.js.map
