import { h as handleErrorResponse } from './actions-3TqTFyN3.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { a5 as successfullydeletedobject2, aP as webhookendpoint1, a6 as successfullycreatedobject2, aQ as samlkeysgenerated2, aR as featureflagsettingsupdated3, aS as generalsettingsupdated2, aT as ssosettingsupdated1, aH as settings } from './_index-DiaVtc2Z.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { w as webhookEndpointSchema, F as FeatureFlagsSchema, G as GeneralSettingsSchema, S as SSOSettingsSchema } from './schemas-BwimqDbp.js';
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
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 125;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C7gdqOeL.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/125.MFfrj4QS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/C7f_eY7G.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js","_app/immutable/chunks/CUPkHRlk.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/D8ErAM9e.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=125-BWwM2APv.js.map
