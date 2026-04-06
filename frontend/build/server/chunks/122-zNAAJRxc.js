import { h as handleErrorResponse } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { a1 as successfullydeletedobject2, aL as webhookendpoint1, a2 as successfullycreatedobject2, aM as samlkeysgenerated2, aN as featureflagsettingsupdated3, aO as generalsettingsupdated2, aP as ssosettingsupdated1, aD as settings } from './_index-Syqrsmaf.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { w as webhookEndpointSchema, F as FeatureFlagsSchema, G as GeneralSettingsSchema, S as SSOSettingsSchema } from './schemas-DxPQoveO.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, m as message, a as setError } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
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

const index = 122;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CZZcGhcY.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/122.DedtLn9R.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BCSTHQzq.js","_app/immutable/chunks/DdsA8DlC.js","_app/immutable/chunks/C1-IpcD2.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/1nu9pTtQ.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DffSj0ub.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/C_OUmGos.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DhhXwsPy.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/DYqxThXf.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/DTRQZf7F.js","_app/immutable/chunks/BtBleIXK.js","_app/immutable/chunks/YY0LroAK.js","_app/immutable/chunks/hzSRjis5.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CAhEEQcX.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/D8SSpCwi.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/B9aaM-j5.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/DyCsBk5w.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/Tghmhnnt.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BPrj3p2N.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DRbqXJnV.js","_app/immutable/chunks/0NBavkwU.js","_app/immutable/chunks/DTrluGdp.js","_app/immutable/chunks/DyAz2aEz.js","_app/immutable/chunks/itGcJPn1.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CujjpgkH.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/BmeW7ldn.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/DeuzPoj4.js","_app/immutable/chunks/D8qCYd1R.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=122-zNAAJRxc.js.map
