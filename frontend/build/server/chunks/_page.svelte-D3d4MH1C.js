import { p as push, a as pop, V as escape_html, S as attr_class, T as attr, U as clsx, M as store_get, W as ensure_array_like, X as stringify, Q as unsubscribe_stores, R as bind_props } from './index2-9icAqEyj.js';
import { F as Form } from './Form-BuUIlHHA.js';
import { eb as isactive1, fM as name, bo as description, oi as url, sl as secretalreadysethelptext4, uC as resetsecret1, bp as cancel, bq as save, lc as webhooksecrethelptext3, iC as secret, jh as generate, so as searchresourcesplaceholder2, IT as events } from './_index-CqZWReca.js';
import { T as TextField } from './TextField-6ZKq0gis.js';
import { M as MarkdownField } from './MarkdownField-JZPZO4SX.js';
import { f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { w as webhookEndpointSchema } from './schemas-BOdIHh1e.js';
import { C as Checkbox } from './Checkbox-BWsW28Xu.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import { U as URL_MODEL_MAP } from './crud-Dl9mduNa.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './utils-FiC4zhrQ.js';
import './breadcrumbs-D1ratxIQ.js';
import './client-DqP3yP6V.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { g as getFlash } from './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './runtime-BKo9q3Zd.js';
import './legacy-server-DMdb6ZTL.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Switch-IjY5G1Ys.js';
import './machine.svelte-CNa8MjEx.js';
import './index5-Brzv1W4u.js';
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './index3-BwfRm5YV.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import '@floating-ui/dom';

function WebhookSecretGenerator($$payload, $$props) {
  push();
  getFlash(page);
  let { form, field = "secret", valuePath = field } = $$props;
  formFieldProxy(form, valuePath);
  form?.form;
  $$payload.out += `<div class="w-full flex flex-col items-center gap-2"><div class="w-full flex flex-row gap-2 items-center">`;
  TextField($$payload, {
    form,
    field,
    valuePath,
    type: "password",
    label: secret(),
    helpText: webhooksecrethelptext3(),
    classesContainer: "w-full",
    autocomplete: "new-password"
  });
  $$payload.out += `<!----> <button type="button" class="btn px-2 py-1 preset-tonal-surface border border-surface-500 transition-transform active:scale-95">${escape_html(generate())}</button></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
const DISPLAY_EVENTS = false;
function EventTypesSelect($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    label = void 0,
    field,
    valuePath = field,
    options = [],
    displayEvents = DISPLAY_EVENTS,
    form,
    hidden = false,
    disabled = false,
    classes = "",
    classesContainer = ""
  } = $$props;
  label = label ?? field;
  let searchQuery = "";
  const { value, errors, constraints } = formFieldProxy(form, valuePath);
  const getModelName = (option) => {
    if (typeof option.value !== "string" || !option.value.includes(".")) {
      console.warn("Skipping option with invalid value:", option);
      return null;
    }
    return option.value.split(".")[0];
  };
  const optionsByModel = (options2) => {
    return options2.reduce(
      (acc, option) => {
        const modelName = getModelName(option);
        if (modelName) {
          (acc[modelName] = acc[modelName] || []).push(option);
        }
        return acc;
      },
      {}
    );
  };
  const modelNameLocaleMap = (options2) => {
    return Object.values(URL_MODEL_MAP).reduce(
      (acc, model) => {
        if (!model?.name) return acc;
        if (acc?.[model.name]) return acc;
        acc[model.name] = {
          i18nName: model.localName,
          options: optionsByModel(options2)[model.name] || []
        };
        return acc;
      },
      {}
    );
  };
  let allModelGroups = Object.values(modelNameLocaleMap(options)).filter((e) => e?.options?.length);
  let filteredModelGroups = allModelGroups.filter((model) => {
    return true;
  });
  const isModelAllSelected = (modelOptions) => {
    if (!store_get($$store_subs ??= {}, "$value", value) || modelOptions.length === 0) return false;
    return modelOptions.every((opt) => store_get($$store_subs ??= {}, "$value", value).includes(opt.value));
  };
  let classesDisabled = (d) => d ? "opacity-50" : "";
  $$payload.out += `<div${attr_class(clsx(classesContainer))}${attr("hidden", hidden, true)}><div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label !== void 0 && !hidden) {
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
  $$payload.out += `<!--]--></div> `;
  if (options.length) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(filteredModelGroups);
    $$payload.out += `<div class="mb-4 mt-2"><input type="text"${attr("value", searchQuery)}${attr("placeholder", searchresourcesplaceholder2())}${attr_class(`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${stringify(classesDisabled(disabled))}`)}${attr("disabled", disabled, true)}/></div> <!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let model = each_array_1[$$index_2];
      const allSelected = isModelAllSelected(model.options);
      const each_array_2 = ensure_array_like(model.options);
      $$payload.out += `<div class="flex items-center mt-4 mb-2"><input type="checkbox" class="mr-2 font-medium"${attr("id", `select-all-${model.i18nName}`)}${attr("checked", allSelected, true)}${attr("disabled", disabled, true)}/> <label${attr("for", `select-all-${model.i18nName}`)} class="font-medium cursor-pointer select-none">${escape_html(safeTranslate(model.i18nName))}</label></div> <div class="ml-6 border-l pl-3"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let option = each_array_2[$$index_1];
        const action = option.value.split(".")[1];
        $$payload.out += `<div${attr_class(`flex items-center mb-2 ${stringify(classes)} ${stringify(classesDisabled(disabled))} ${stringify(displayEvents ? "" : "hidden")}`)}><input type="checkbox"${attr("name", field)}${attr("id", option.value)}${attr("value", option.value)}${attr("checked", store_get($$store_subs ??= {}, "$value", value)?.includes(option.value), true)}${attr("checked", store_get($$store_subs ??= {}, "$value", value).includes(option.value), true)}${attr("disabled", disabled, true)} class="mr-2"/> <label${attr("for", option.value)}>${escape_html(safeTranslate(action))}</label></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--> `;
    if (filteredModelGroups.length === 0 && searchQuery) ;
    else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    LoadingSpinner($$payload);
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  data.form?.form;
  let showSecretField = !data.webhookEndpoint?.has_secret;
  let eventTypeOptions = [];
  {
    let children = function($$payload2, { form }) {
      Checkbox($$payload2, {
        form,
        field: "is_active",
        label: isactive1()
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "name",
        label: name(),
        "data-focusindex": "0"
      });
      $$payload2.out += `<!----> `;
      MarkdownField($$payload2, {
        form,
        field: "description",
        label: description(),
        "data-focusindex": "1"
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "url",
        label: url(),
        "data-focusindex": "2"
      });
      $$payload2.out += `<!----> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showSecretField) {
        $$payload2.out += "<!--[-->";
        WebhookSecretGenerator($$payload2, { form, field: "secret" });
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="w-full p-4 flex flex-row justify-evenly items-center preset-tonal-secondary"><p>${escape_html(secretalreadysethelptext4())}</p> <button class="btn preset-filled">${escape_html(resetsecret1())}</button></div>`;
      }
      $$payload2.out += `<!--]--> `;
      {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      EventTypesSelect($$payload2, {
        form,
        field: "event_types",
        label: events(),
        options: eventTypeOptions
      });
      $$payload2.out += `<!----> <div class="flex flex-row justify-between space-x-4"><button class="btn bg-gray-400 text-white font-semibold w-full" type="button">${escape_html(cancel())}</button> <button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="save-btn" type="submit">${escape_html(save())}</button></div>`;
    };
    Form($$payload, {
      class: "flex flex-col space-y-3",
      data: data?.form,
      dataType: "form",
      validators: zod(webhookEndpointSchema),
      children,
      $$slots: { default: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D3d4MH1C.js.map
