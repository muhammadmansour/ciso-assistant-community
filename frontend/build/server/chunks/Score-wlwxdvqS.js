import { p as push, M as store_get, a3 as store_set, S as attr_class, U as clsx, W as ensure_array_like, V as escape_html, T as attr, _ as spread_attributes, Q as unsubscribe_stores, R as bind_props, a as pop } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { d as displayScoreColor } from './helpers-Bm9n0CNG.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-0SGrBrD4.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';

function Score($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    label = void 0,
    field,
    isDoc = false,
    inversedColors = false,
    styles = "",
    min_score = 0,
    max_score = 100,
    score_step = max_score === 100 ? 5 : 1,
    helpText = void 0,
    disabled = false,
    scores_definition = [],
    form,
    onChange = () => {
    },
    left
  } = $$props;
  const { value, errors, constraints } = formFieldProxy(form, field);
  store_get($$store_subs ??= {}, "$value", value);
  run(() => {
    store_set(value, !disabled ? store_get($$store_subs ??= {}, "$value", value) ?? min_score : store_get($$store_subs ??= {}, "$value", value));
  });
  left?.($$payload);
  $$payload.out += `<!----> `;
  if (!disabled) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(clsx(styles))}>`;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors).length > 0) {
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
    $$payload.out += `<!--]--> <div class="flex flex-row w-full items-center justify-evenly space-x-4"><div class="flex flex-col w-full align-top">`;
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
    $$payload.out += `<!--]--> <input${spread_attributes(
      {
        "data-testid": "range-slider-input",
        name: field,
        type: "range",
        class: "input px-0",
        value: store_get($$store_subs ??= {}, "$value", value),
        min: min_score,
        max: max_score,
        step: score_step,
        disabled,
        ...constraints
      },
      null
    )}/></div> `;
    ProgressRing($$payload, {
      meterStroke: displayScoreColor(store_get($$store_subs ??= {}, "$value", value), max_score, inversedColors),
      value: store_get($$store_subs ??= {}, "$value", value),
      label: store_get($$store_subs ??= {}, "$value", value),
      onValueChange: (e) => store_set(value, e.value),
      classes: "shrink-0",
      size: "size-12",
      min: min_score,
      max: max_score,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(store_get($$store_subs ??= {}, "$value", value))}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div> <div class="flex w-full items-center"><div class="flex space-x-8 w-full justify-center"><div class="w-full max-w-[80ch] justify-center text-center whitespace-pre-wrap">`;
    if (!disabled && scores_definition && store_get($$store_subs ??= {}, "$value", value) !== null) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(scores_definition);
      $$payload.out += `<!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let definition = each_array_1[$$index_1];
        if (definition.score === store_get($$store_subs ??= {}, "$value", value)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="font-bold">${escape_html(definition.name)}</p> `;
          if (isDoc && definition.description_doc) {
            $$payload.out += "<!--[-->";
            $$payload.out += `${escape_html(definition.description_doc)}`;
          } else if (definition.description) {
            $$payload.out += "<!--[1-->";
            $$payload.out += `${escape_html(definition.description)}`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> `;
    if (helpText) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { score_step });
  pop();
}

export { Score as S };
//# sourceMappingURL=Score-wlwxdvqS.js.map
