import { p as push, M as store_get, _ as spread_attributes, W as ensure_array_like, V as escape_html, Q as unsubscribe_stores, a as pop, ad as fallback, S as attr_class, Z as attr_style, X as stringify, ae as slot, R as bind_props, af as await_block } from './index2-9icAqEyj.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { r as readable, g as get } from './index-CRjgakYW.js';
import { h as html } from './html-FW6Ia4bL.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { bj as taintedformmessage2 } from './_index-DZs3gE-i.js';

function SuperDebug($$payload, $$props) {
  push();
  var $$store_subs;
  let themeStyle, debugData;
  let styleInit = false;
  let data = $$props["data"];
  let display = fallback($$props["display"], true);
  let status = fallback($$props["status"], true);
  let label = fallback($$props["label"], "");
  let stringTruncate = fallback($$props["stringTruncate"], 120);
  let ref = fallback($$props["ref"], void 0);
  let promise = fallback($$props["promise"], false);
  let raw = fallback($$props["raw"], false);
  let functions = fallback($$props["functions"], false);
  let theme = fallback($$props["theme"], "default");
  let collapsible = fallback($$props["collapsible"], false);
  let collapsed = fallback($$props["collapsed"], false);
  function syntaxHighlight(json) {
    switch (typeof json) {
      case "function": {
        return `<span class="function">[function ${json.name ?? "unnamed"}]</span>`;
      }
      case "symbol": {
        return `<span class="symbol">${json.toString()}</span>`;
      }
    }
    const encodedString = JSON.stringify(
      json,
      function(key, value) {
        if (value === void 0) {
          return "#}#undefined";
        }
        if (typeof this === "object" && this[key] instanceof Date) {
          return "#}D#" + (isNaN(this[key]) ? "Invalid Date" : value);
        }
        if (typeof value === "number") {
          if (value == Number.POSITIVE_INFINITY) return "#}#Inf";
          if (value == Number.NEGATIVE_INFINITY) return "#}#-Inf";
          if (isNaN(value)) return "#}#NaN";
        }
        if (typeof value === "bigint") {
          return "#}BI#" + value;
        }
        if (typeof value === "function" && functions) {
          return `#}F#[function ${value.name}]`;
        }
        if (value instanceof Error) {
          return `#}E#${value.name}: ${value.message || value.cause || "(No error message)"}`;
        }
        if (value instanceof Set) {
          return Array.from(value);
        }
        if (value instanceof Map) {
          return Array.from(value.entries());
        }
        if (typeof this === "object" && typeof this[key] == "object" && this[key] && "toExponential" in this[key]) {
          return "#}DE#" + this[key].toString();
        }
        return value;
      },
      2
    ).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return encodedString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function(match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
          match = match.slice(1, -2) + ":";
        } else {
          cls = "string";
          match = stringTruncate > 0 && match.length > stringTruncate ? match.slice(0, stringTruncate / 2) + `[..${match.length - stringTruncate}/${match.length}..]` + match.slice(-stringTruncate / 2) : match;
          if (match == '"#}#undefined"') {
            cls = "undefined";
            match = "undefined";
          } else if (match.startsWith('"#}D#')) {
            cls = "date";
            match = match.slice(5, -1);
          } else if (match == '"#}#NaN"') {
            cls = "nan";
            match = "NaN";
          } else if (match == '"#}#Inf"') {
            cls = "nan";
            match = "Infinity";
          } else if (match == '"#}#-Inf"') {
            cls = "nan";
            match = "-Infinity";
          } else if (match.startsWith('"#}BI#')) {
            cls = "bigint";
            match = match.slice(6, -1) + "n";
          } else if (match.startsWith('"#}F#')) {
            cls = "function";
            match = match.slice(5, -1);
          } else if (match.startsWith('"#}E#')) {
            cls = "error";
            match = match.slice(5, -1);
          } else if (match.startsWith('"#}DE#')) {
            cls = "number";
            match = match.slice(6, -1);
          }
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    });
  }
  function assertPromise(data2, raw2, promise2) {
    if (raw2) {
      return false;
    }
    return promise2 || typeof data2 === "object" && data2 !== null && "then" in data2 && typeof data2["then"] === "function";
  }
  function assertStore(data2, raw2) {
    if (raw2) {
      return false;
    }
    return typeof data2 === "object" && data2 !== null && "subscribe" in data2 && typeof data2["subscribe"] === "function";
  }
  themeStyle = theme === "vscode" ? `
      --sd-vscode-bg-color: #1f1f1f;
      --sd-vscode-label-color: #cccccc;
      --sd-vscode-code-default: #8c8a89;
      --sd-vscode-code-key: #9cdcfe;
      --sd-vscode-code-string: #ce9171;
      --sd-vscode-code-number: #b5c180;
      --sd-vscode-code-boolean: #4a9cd6;
      --sd-vscode-code-null: #4a9cd6;
      --sd-vscode-code-undefined: #4a9cd6;
      --sd-vscode-code-nan: #4a9cd6;
      --sd-vscode-code-symbol: #4de0c5;
      --sd-vscode-sb-thumb-color: #35373a;
      --sd-vscode-sb-thumb-color-focus: #4b4d50;
    ` : void 0;
  debugData = assertStore(data, raw) ? data : readable(data);
  if (!styleInit) {
    $$payload.out += "<!--[-->";
    styleInit = true;
    $$payload.out += `<style>
		.super-debug--absolute {
			position: absolute;
		}

		.super-debug--top-0 {
			top: 0;
		}

		.super-debug--inset-x-0 {
			left: 0px;
			right: 0px;
		}

		.super-debug--hidden {
			height: 0;
			overflow: hidden;
		}

		.super-debug--hidden:not(.super-debug--with-label) {
			height: 1.5em;
		}

		.super-debug--rotated {
			transform: rotate(180deg);
		}

		.super-debug {
			--_sd-bg-color: var(--sd-bg-color, var(--sd-vscode-bg-color, rgb(30, 41, 59)));
			position: relative;
			background-color: var(--_sd-bg-color);
			border-radius: 0.5rem;
			overflow: hidden;
		}

		.super-debug--pre {
			overflow-x: auto;
		}

		.super-debug--collapse {
			display: block;
			width: 100%;
			color: rgba(255, 255, 255, 0.25);
			background-color: rgba(255, 255, 255, 0.15);
			padding: 5px 0;
			display: flex;
			justify-content: center;
			border-color: transparent;
			margin: 0;
			padding: 3px 0;
		}

		.super-debug--collapse:focus {
			color: #fafafa;
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--collapse:is(:hover) {
			color: rgba(255, 255, 255, 0.35);
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--status {
			display: flex;
			padding: 1em;
			padding-bottom: 0;
			justify-content: space-between;
			font-family:
				Inconsolata, Monaco, Consolas, 'Lucida Console', 'Courier New', Courier, monospace;
		}

		.super-debug--right-status {
			display: flex;
			gap: 0.55em;
		}

		.super-debug--copy {
			margin: 0;
			padding: 0;
			padding-top: 2px;
			background-color: transparent;
			border: 0;
			color: #666;
			cursor: pointer;
		}

		.super-debug--copy:hover {
			background-color: transparent;
			color: #666;
		}

		.super-debug--copy:focus {
			background-color: transparent;
			color: #666;
		}

		.super-debug--label {
			color: var(--sd-label-color, var(--sd-vscode-label-color, white));
		}

		.super-debug--promise-loading {
			color: var(--sd-promise-loading-color, var(--sd-vscode-promise-loading-color, #999));
		}

		.super-debug--promise-rejected {
			color: var(--sd-promise-rejected-color, var(--sd-vscode-promise-rejected-color, #ff475d));
		}

		.super-debug pre {
			color: var(--sd-code-default, var(--sd-vscode-code-default, #999));
			background-color: var(--_sd-bg-color);
			font-size: 1em;
			margin-bottom: 0;
			padding: 1em 0 1em 1em;
		}

		.super-debug--info {
			color: var(--sd-info, var(--sd-vscode-info, rgb(85, 85, 255)));
		}

		.super-debug--success {
			color: var(--sd-success, var(--sd-vscode-success, #2cd212));
		}

		.super-debug--redirect {
			color: var(--sd-redirect, var(--sd-vscode-redirect, #03cae5));
		}

		.super-debug--error {
			color: var(--sd-error, var(--sd-vscode-error, #ff475d));
		}

		.super-debug--code .key {
			color: var(--sd-code-key, var(--sd-vscode-code-key, #eab308));
		}

		.super-debug--code .string {
			color: var(--sd-code-string, var(--sd-vscode-code-string, #6ec687));
		}

		.super-debug--code .date {
			color: var(--sd-code-date, var(--sd-vscode-code-date, #f06962));
		}

		.super-debug--code .boolean {
			color: var(--sd-code-boolean, var(--sd-vscode-code-boolean, #79b8ff));
		}

		.super-debug--code .number {
			color: var(--sd-code-number, var(--sd-vscode-code-number, #af77e9));
		}

		.super-debug--code .bigint {
			color: var(--sd-code-bigint, var(--sd-vscode-code-bigint, #af77e9));
		}

		.super-debug--code .null {
			color: var(--sd-code-null, var(--sd-vscode-code-null, #238afe));
		}

		.super-debug--code .nan {
			color: var(--sd-code-nan, var(--sd-vscode-code-nan, #af77e9));
		}

		.super-debug--code .undefined {
			color: var(--sd-code-undefined, var(--sd-vscode-code-undefined, #238afe));
		}

		.super-debug--code .function {
			color: var(--sd-code-function, var(--sd-vscode-code-function, #f06962));
		}

		.super-debug--code .symbol {
			color: var(--sd-code-symbol, var(--sd-vscode-code-symbol, #4de0c5));
		}

		.super-debug--code .error {
			color: var(--sd-code-error, var(--sd-vscode-code-error, #ff475d));
		}

		.super-debug pre::-webkit-scrollbar {
			width: var(--sd-sb-width, var(--sd-vscode-sb-width, 1rem));
			height: var(--sd-sb-height, var(--sd-vscode-sb-height, 1rem));
		}

		.super-debug pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color,
				var(--sd-vscode-sb-track-color, hsl(0, 0%, 40%, 0.2))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color-focus,
				var(--sd-vscode-sb-track-color-focus, hsl(0, 0%, 50%, 0.2))
			);
		}

		.super-debug pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color,
				var(--sd-vscode-sb-thumb-color, hsl(217, 50%, 50%, 0.5))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color-focus,
				var(--sd-vscode-sb-thumb-color-focus, hsl(217, 50%, 50%))
			);
		}
	</style>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (display) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class("super-debug", void 0, { "super-debug--collapsible": collapsible })}${attr_style(themeStyle)} dir="ltr"><div${attr_class(`super-debug--status ${stringify(label === "" ? "super-debug--absolute super-debug--inset-x-0 super-debug--top-0" : "")}`)}><div class="super-debug--label">${escape_html(label)}</div> <div class="super-debug--right-status"><button type="button" class="super-debug--copy">`;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path><path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"></path></g></svg>`;
    }
    $$payload.out += `<!--]--></button> `;
    if (status) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr_class("", void 0, {
        "super-debug--info": store_get($$store_subs ??= {}, "$page", page).status < 200,
        "super-debug--success": store_get($$store_subs ??= {}, "$page", page).status >= 200 && store_get($$store_subs ??= {}, "$page", page).status < 300,
        "super-debug--redirect": store_get($$store_subs ??= {}, "$page", page).status >= 300 && store_get($$store_subs ??= {}, "$page", page).status < 400,
        "super-debug--error": store_get($$store_subs ??= {}, "$page", page).status >= 400
      })}>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <pre${attr_class("super-debug--pre", void 0, {
      "super-debug--with-label": label,
      "super-debug--hidden": collapsed
    })}><code class="super-debug--code"><!---->`;
    slot($$payload, $$props, "default", {}, () => {
      if (assertPromise(store_get($$store_subs ??= {}, "$debugData", debugData), raw, promise)) {
        $$payload.out += "<!--[-->";
        await_block(
          $$payload,
          store_get($$store_subs ??= {}, "$debugData", debugData),
          () => {
            $$payload.out += `<div class="super-debug--promise-loading">Loading data...</div>`;
          },
          (result) => {
            $$payload.out += `${html(syntaxHighlight(assertStore(result, raw) ? get(result) : result))}`;
          }
        );
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${html(syntaxHighlight(store_get($$store_subs ??= {}, "$debugData", debugData)))}`;
      }
      $$payload.out += `<!--]-->`;
    });
    $$payload.out += `<!----></code></pre> `;
    if (collapsible) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button type="button" class="super-debug--collapse" aria-label="Collapse"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"${attr_class("", void 0, { "super-debug--rotated": collapsed })}><path fill="currentColor" d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"></path></svg></button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    display,
    status,
    label,
    stringTruncate,
    ref,
    promise,
    raw,
    functions,
    theme,
    collapsible,
    collapsed
  });
  pop();
}
function Form($$payload, $$props) {
  push();
  var $$store_subs;
  function handleFormUpdated({ form: form2, closeModal }) {
    if (form2.valid) {
      onUpdated(form2);
    }
  }
  let {
    data = {},
    dataType = "form",
    invalidateAll = true,
    validators = void 0,
    applyAction = true,
    resetForm = false,
    onSubmit = (submit_data) => {
    },
    taintedMessage = taintedformmessage2(),
    onUpdated = (_) => {
    },
    validationMethod = "auto",
    useFocusTrap = true,
    debug = false,
    _form = superForm(data, {
      dataType,
      invalidateAll,
      applyAction,
      resetForm,
      validators,
      onUpdated: ({ form: form2 }) => handleFormUpdated({ form: form2, closeModal: true }),
      onSubmit,
      taintedMessage,
      validationMethod
    }),
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const {
    form,
    message,
    tainted,
    delayed,
    errors,
    allErrors,
    enhance
  } = _form;
  if (debug) {
    $$payload.out += "<!--[-->";
    SuperDebug($$payload, {
      data: store_get($$store_subs ??= {}, "$form", form)
    });
    $$payload.out += `<!----> `;
    SuperDebug($$payload, {
      data: store_get($$store_subs ??= {}, "$tainted", tainted)
    });
    $$payload.out += `<!----> `;
    SuperDebug($$payload, {
      data: store_get($$store_subs ??= {}, "$errors", errors)
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form${spread_attributes({ method: "POST", ...rest }, null)}>`;
  if (store_get($$store_subs ??= {}, "$errors", errors)._errors) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors)._errors);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-sm font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors).non_field_errors) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-error-500 text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).non_field_errors)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  children?.($$payload, {
    form: _form,
    initialData: data?.data,
    data: store_get($$store_subs ??= {}, "$form", form),
    formData: store_get($$store_subs ??= {}, "$form", form),
    message: store_get($$store_subs ??= {}, "$message", message),
    errors: store_get($$store_subs ??= {}, "$errors", errors),
    allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors),
    delayed: store_get($$store_subs ??= {}, "$delayed", delayed),
    tainted: store_get($$store_subs ??= {}, "$tainted", tainted)
  });
  $$payload.out += `<!----></form>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { Form as F, SuperDebug as S };
//# sourceMappingURL=Form-s4NDhsV8.js.map
