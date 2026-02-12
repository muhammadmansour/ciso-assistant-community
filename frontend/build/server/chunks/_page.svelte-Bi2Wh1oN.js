import { p as push, a as pop, V as escape_html, W as ensure_array_like, S as attr_class, X as stringify, T as attr } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { H3 as general, qL as sso, HT as featureflags1, c0 as webhooks, H2 as generalsettingsdescription2, qJ as ssosettingsdescription2, OU as configurefeatureflags2, OS as configureoutgoingwebhooks2, kY as webhookendpoints1, au as webhookendpoint1, O8 as createwebhookendpoint2, X$ as active, II as events, e as edit, MV as _delete } from './_index-DEXNURl5.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-Dk-jItBW.js';
import { M as ModelForm } from './ModelForm-DjxM9Aif.js';
import { G as GeneralSettingsSchema, S as SSOSettingsSchema, F as FeatureFlagsSchema } from './schemas-BcDBvyDd.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './constants-BZXIbVIt.js';
import './stores-CMqbeBUT.js';
import { U as URL_MODEL_MAP } from './crud-a52dcxCi.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './runtime-BMNt81Gy.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './legacy-server-DMdb6ZTL.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './TextField-DpgyqBxf.js';
import './MarkdownField-aHT7_ag4.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './Select-DI34Ul6H.js';
import './Dropdown-7WWj3QLi.js';
import './index4-B6qGV9uj.js';
import './Checkbox-vxSpLW05.js';
import './Switch-BHyFhQv_.js';
import './index5-C1_XlIn1.js';
import './Score-wlwxdvqS.js';
import './helpers-Bm9n0CNG.js';
import './ProgressRing-0SGrBrD4.js';
import './index6-BrJh6zKa.js';
import './HiddenInput-CYg6fs2N.js';
import './RadioGroup-B9fdfrn7.js';
import './breadcrumbs-CG0qNTv3.js';
import './OrderedEntryList-vFR8cCfD.js';
import './zod-CkM6Syoc.js';
import './app-Ci0UE2-c.js';
import './shared-server-BU2DVf8Q.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';

function GeneralSettings($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div><span class="text-gray-500 block mb-6">${escape_html(generalsettingsdescription2())}</span> `;
  ModelForm($$payload, {
    form: data.generalSettingForm,
    schema: GeneralSettingsSchema,
    model: data.generalSettingModel,
    cancelButton: false,
    action: "/settings?/general"
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function SSOSettings($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div><span class="text-gray-500 block mb-6">${escape_html(ssosettingsdescription2())}</span> `;
  ModelForm($$payload, {
    form: data.ssoForm,
    schema: SSOSettingsSchema,
    model: data.ssoModel,
    cancelButton: false,
    action: "/settings?/sso"
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function FeatureFlagsSettings($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div><span class="text-gray-500 block mb-6">${escape_html(configurefeatureflags2())}</span> `;
  ModelForm($$payload, {
    form: data.featureFlagForm,
    schema: FeatureFlagsSchema,
    model: data.featureFlagModel,
    cancelButton: false,
    action: "/settings?/featureFlags"
  });
  $$payload.out += `<!----></div>`;
  pop();
}
const getModelName = (event) => {
  if (typeof event !== "string" || !event.includes(".")) {
    console.warn("Skipping event with invalid value:", event);
    return null;
  }
  return event.split(".")[0];
};
const eventsByModel = (events2) => {
  return events2.reduce((acc, event) => {
    const modelName = getModelName(event);
    if (modelName) {
      (acc[modelName] = acc[modelName] || []).push(event);
    }
    return acc;
  }, {});
};
const modelEventsMap = (events2) => Object.values(URL_MODEL_MAP).reduce((acc, model) => {
  if (!model?.name) {
    console.warn("Skipping model with no name:", model);
    return acc;
  }
  if (acc?.[model.name]) {
    return acc;
  }
  acc[model.name] = {
    i18nName: model.localName,
    events: eventsByModel(events2)[model.name] || []
  };
  return acc;
}, {});
function WebhooksSettings($$payload, $$props) {
  push();
  getModalStore();
  let { data, allowMultiple = false } = $$props;
  let displayedEndpoint = data?.webhookEndpoints?.length > 0 ? data.webhookEndpoints[0] : void 0;
  if (page.data?.featureflags?.outgoing_webhooks) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col gap-3"><span class="text-gray-500">${escape_html(configureoutgoingwebhooks2())}</span> <span class="flex flex-row justify-between"><h3 class="h3">${escape_html(allowMultiple ? webhookendpoints1() : webhookendpoint1())}</h3> `;
    if (data?.webhookEndpoints?.length == 0 || allowMultiple) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn preset-filled-primary-500 w-fit"><i class="fa-solid fa-plus mr-2"></i>${escape_html(createwebhookendpoint2())}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></span> `;
    if (displayedEndpoint) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(Object.values(modelEventsMap(displayedEndpoint.event_types)).filter((e) => e?.events?.length > 0));
      $$payload.out += `<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">`;
      if (allowMultiple) {
        $$payload.out += "<!--[-->";
        const each_array = ensure_array_like(data.webhookEndpoints);
        $$payload.out += `<div class="card p-2 bg-surface-50-950"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let endpoint = each_array[$$index];
          $$payload.out += `<span class="flex flex-row gap-4 items-center"><button${attr_class(`text-secondary-600 hover:underline ${stringify(JSON.stringify(displayedEndpoint) === JSON.stringify(endpoint) ? "font-semibold" : "")}`)}>${escape_html(endpoint.name)}</button> `;
          if (endpoint.is_active) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="badge preset-tonal-success">${escape_html(active())}</span>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></span>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="card p-2 lg:col-span-2"><div class="flex flex-col gap-4"><span class="flex flex-row gap-2 items-center"><h4 class="h4">${escape_html(displayedEndpoint.name)}</h4> `;
      if (displayedEndpoint.is_active) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="badge preset-tonal-success">${escape_html(active())}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></span> <a class="anchor"${attr("href", displayedEndpoint.url)}>${escape_html(displayedEndpoint.url)}</a> <div><p class="font-medium">${escape_html(events())}</p> <!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let model = each_array_1[$$index_2];
        const each_array_2 = ensure_array_like(model.events);
        $$payload.out += `<div class="flex flex-col gap-3"><span class="flex flex-row gap-3"><p class="font-medium">${escape_html(safeTranslate(model.i18nName))}</p> <span class="flex flex-row gap-2"><!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let event = each_array_2[$$index_1];
          const action = event.split(".")[1];
          $$payload.out += `<p>${escape_html(safeTranslate(action))}</p>`;
        }
        $$payload.out += `<!--]--></span></span></div>`;
      }
      $$payload.out += `<!--]--></div> <span class="flex flex-row gap-2">`;
      Anchor($$payload, {
        class: "btn preset-filled-primary-500 h-fit",
        href: `/settings/webhooks/endpoints/${stringify(displayedEndpoint.id)}?next=${stringify(page.url.pathname)}`,
        children: ($$payload2) => {
          $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2"></i>${escape_html(edit())}`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----> <button${attr("aria-label", _delete())} class="btn preset-filled-error-500 h-fit cursor-pointer" data-testid="tablerow-delete-button"><i class="fa-solid fa-trash mr-2"></i>${escape_html(_delete())}</button></span></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let group = "general";
  let { data } = $$props;
  {
    let list = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Control($$payload2, {
        value: "general",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-globe"></i> ${escape_html(general())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "sso",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-key"></i> ${escape_html(sso())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Control($$payload2, {
        value: "featureFlags",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-flag"></i> ${escape_html(featureflags1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      if (page.data?.featureflags?.outgoing_webhooks) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Tabs.Control($$payload2, {
          value: "webhooks",
          children: ($$payload3) => {
            $$payload3.out += `<span class="flex flex-row gap-2 items-center ml-0"><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>webhook</title><rect width="24" height="24" fill="none"></rect><path d="M10.46,19a4.59,4.59,0,0,1-6.37,1.15,4.63,4.63,0,0,1,2.49-8.38l0,1.43a3.17,3.17,0,0,0-2.36,1.36A3.13,3.13,0,0,0,5,18.91a3.11,3.11,0,0,0,4.31-.84,3.33,3.33,0,0,0,.56-1.44v-1l5.58,0,.07-.11a1.88,1.88,0,1,1,.67,2.59,1.77,1.77,0,0,1-.83-1l-4.07,0A5,5,0,0,1,10.46,19m7.28-7.14a4.55,4.55,0,1,1-1.12,9,4.63,4.63,0,0,1-3.43-2.21L14.43,18a3.22,3.22,0,0,0,2.32,1.45,3.05,3.05,0,1,0,.75-6.06,3.39,3.39,0,0,0-1.53.18l-.85.44L12.54,9.2h-.22a1.88,1.88,0,1,1,.13-3.76A1.93,1.93,0,0,1,14.3,7.39a1.88,1.88,0,0,1-.46,1.15l1.9,3.51a4.75,4.75,0,0,1,2-.19M8.25,9.14A4.54,4.54,0,1,1,16.62,5.6a4.61,4.61,0,0,1-.2,4.07L15.18,9a3.17,3.17,0,0,0,.09-2.73A3.05,3.05,0,1,0,9.65,8.6,3.21,3.21,0,0,0,11,10.11l.39.21-3.07,5a1.09,1.09,0,0,1,.1.19,1.88,1.88,0,1,1-2.56-.83,1.77,1.77,0,0,1,1.23-.17l2.31-3.77A4.41,4.41,0,0,1,8.25,9.14Z"></path></svg> ${escape_html(webhooks())}</span>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }, content = function($$payload2) {
      $$payload2.out += `<!---->`;
      Tabs.Panel($$payload2, {
        value: "general",
        children: ($$payload3) => {
          GeneralSettings($$payload3, { data });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Panel($$payload2, {
        value: "sso",
        children: ($$payload3) => {
          SSOSettings($$payload3, { data });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Panel($$payload2, {
        value: "featureFlags",
        children: ($$payload3) => {
          FeatureFlagsSettings($$payload3, { data });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs.Panel($$payload2, {
        value: "webhooks",
        children: ($$payload3) => {
          WebhooksSettings($$payload3, { data });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    };
    Tabs($$payload, {
      value: group,
      onValueChange: (e) => {
        group = e.value;
      },
      active: "bg-primary-100 text-primary-800 border-b border-primary-800",
      list,
      content,
      $$slots: { list: true, content: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bi2Wh1oN.js.map
