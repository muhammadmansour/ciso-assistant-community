import { h as handleErrorResponse } from './actions-k5zPah0t.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { g as getModelInfo } from './crud-a52dcxCi.js';
import { I as successfullydeletedobject2, J as successfullycreatedobject2, aq as samlkeysgenerated2, ar as featureflagsettingsupdated3, as as generalsettingsupdated2, at as ssosettingsupdated1, ai as settings, au as webhookendpoint1 } from './_index-DEXNURl5.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { w as webhookEndpointSchema, F as FeatureFlagsSchema, G as GeneralSettingsSchema, S as SSOSettingsSchema } from './schemas-BcDBvyDd.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate, m as message, a as setError } from './superValidate-jp4VH0Pt.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-D2ILrLnm.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ fetch }) => {
  const ssoSettings = await fetch(`${BASE_API_URL}/settings/sso/object/`).then((res) => res.json());
  const generalSettings = await fetch(`${BASE_API_URL}/settings/general/object/`).then(
    (res) => res.json()
  );
  const featureFlagSettings = await fetch(`${BASE_API_URL}/settings/feature-flags/`).then(
    (res) => res.json()
  );
  const webhookEndpoints = await fetch(`${BASE_API_URL}/webhooks/endpoints/`).then((res) => res.json()).then((res) => res.results);
  const selectOptions = {};
  const ssoModel = getModelInfo("sso-settings");
  const generalSettingModel = getModelInfo("general-settings");
  const featureFlagModel = getModelInfo("feature-flags");
  if (ssoModel.selectFields) {
    for (const selectField of ssoModel.selectFields) {
      const url = `${BASE_API_URL}/settings/sso/${selectField.field}/`;
      const response = await fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  ssoModel.selectOptions = selectOptions;
  if (featureFlagModel.selectFields) {
    for (const selectField of featureFlagModel.selectFields) {
      const url = `${BASE_API_URL}/settings/feature-flags/feature_flags/`;
      const response = await fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  featureFlagModel.selectOptions = selectOptions;
  if (generalSettingModel.selectFields) {
    for (const selectField of generalSettingModel.selectFields) {
      const url = `${BASE_API_URL}/settings/general/${selectField.field}/`;
      const response = await fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  generalSettingModel.selectOptions = selectOptions;
  const ssoForm = await superValidate(ssoSettings, zod(SSOSettingsSchema), { errors: false });
  const generalSettingForm = await superValidate(generalSettings, zod(GeneralSettingsSchema), {
    errors: false
  });
  const featureFlagForm = await superValidate(featureFlagSettings, zod(FeatureFlagsSchema), {
    errors: false
  });
  const webhookEndpointCreateForm = await superValidate(zod(webhookEndpointSchema), {
    errors: false
  });
  return {
    ssoSettings,
    ssoForm,
    ssoModel,
    generalSettings,
    generalSettingForm,
    generalSettingModel,
    featureFlagSettings,
    featureFlagForm,
    featureFlagModel,
    webhookEndpoints,
    webhookEndpointCreateForm,
    title: settings()
  };
};
const actions = {
  sso: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = SSOSettingsSchema;
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/settings/sso/`;
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    setFlash({ type: "success", message: ssosettingsupdated1() }, event);
    return { form };
  },
  general: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const conversionRate = formData.get("conversion_rate");
    const schema = GeneralSettingsSchema;
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/settings/general/`;
    const requestBody = {
      value: form.data
    };
    if (conversionRate) {
      const n = Number(conversionRate);
      if (Number.isFinite(n) && n > 0 && n !== 1) {
        requestBody.conversion_rate = n;
      }
    }
    const requestInitOptions = {
      method: "PUT",
      body: JSON.stringify(requestBody)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    setFlash({ type: "success", message: generalsettingsupdated2() }, event);
    return { form };
  },
  featureFlags: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = FeatureFlagsSchema;
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/settings/feature-flags/`;
    const requestInitOptions = {
      method: "PUT",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    setFlash({ type: "success", message: featureflagsettingsupdated3() }, event);
    return { form };
  },
  generateSamlKeys: async (event) => {
    const response = await event.fetch(`${BASE_API_URL}/accounts/saml/0/generate-keys/`, {
      method: "POST"
    });
    if (!response.ok) return fail(500, { error: "Generation failed" });
    const { cert } = await response.json();
    setFlash({ type: "success", message: samlkeysgenerated2() }, event);
    return { generatedKeys: { cert } };
  },
  createWebhookEndpoint: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = webhookEndpointSchema;
    const form = await superValidate(formData, zod(schema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/webhooks/endpoints/`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) return handleErrorResponse({ event, response, form });
    setFlash(
      { type: "success", message: successfullycreatedobject2({ object: webhookendpoint1() }) },
      event
    );
    return { form };
  },
  deleteWebhookEndpoint: async (event) => {
    const formData = await event.request.formData();
    const schema = objectType({ id: stringType() });
    const deleteForm = await superValidate(formData, zod(schema));
    const id = deleteForm.data.id;
    const endpoint = `${BASE_API_URL}/webhooks/endpoints/${id}/`;
    if (!deleteForm.valid) {
      console.error(deleteForm.errors);
      return message(deleteForm, { status: 400 });
    }
    const requestInitOptions = {
      method: "DELETE"
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      if (response.error) {
        const errorMessages = Array.isArray(response.error) ? response.error : [response.error];
        errorMessages.forEach((error) => {
          setFlash({ type: "error", message: safeTranslate(error) }, event);
        });
        return message(deleteForm, { status: res.status });
      }
      if (response.non_field_errors) {
        setError(deleteForm, "non_field_errors", response.non_field_errors);
      }
      return message(deleteForm, { status: res.status });
    }
    setFlash(
      {
        type: "success",
        message: successfullydeletedobject2({
          object: webhookendpoint1().toLowerCase()
        })
      },
      event
    );
    return message(deleteForm, { status: res.status });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 119;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bi2Wh1oN.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/119.YS6lO9p_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/Dne1jDS_.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CIYsOFIh.js","_app/immutable/chunks/BmuWuAAJ.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/D3LVFdiA.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=119-BdlJ_f32.js.map
