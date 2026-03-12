import { p as push, _ as spread_attributes, M as store_get, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';

function HiddenInput($$payload, $$props) {
  push();
  var $$store_subs;
  let { field, form, $$slots, $$events, ...rest } = $$props;
  const { value, constraints } = formFieldProxy(form, field);
  $$payload.out += `<div><div class="control"><input${spread_attributes(
    {
      hidden: true,
      name: field,
      placeholder: "",
      value: store_get($$store_subs ??= {}, "$value", value),
      ...store_get($$store_subs ??= {}, "$constraints", constraints),
      ...rest
    },
    null
  )}/></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { HiddenInput as H };
//# sourceMappingURL=HiddenInput-D0PY8sFK.js.map
