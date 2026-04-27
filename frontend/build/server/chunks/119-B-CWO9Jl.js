import { h as handleErrorResponse } from './actions-CfR18Idq.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-C1TvVbAO.js';
import { a1 as successfullydeletedobject2, aL as webhookendpoint1, a2 as successfullycreatedobject2, aM as samlkeysgenerated2, aN as featureflagsettingsupdated3, aO as generalsettingsupdated2, aP as ssosettingsupdated1, aD as settings } from './_index-D7NdhnXA.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { w as webhookEndpointSchema, F as FeatureFlagsSchema, G as GeneralSettingsSchema, S as SSOSettingsSchema } from './schemas-DwUKC0vK.js';
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

const index = 119;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-YzjSn5rV.js')).default;
const server_id = "src/routes/(app)/(internal)/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/119.DlJWAANz.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Cutloik7.js","_app/immutable/chunks/DJUALYxg.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CnDg-o9t.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CXUkSZSY.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/56bwJ4Jb.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BOy2Mbul.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BljBstM0.js","_app/immutable/chunks/CXqJwRWy.js","_app/immutable/chunks/BioysWky.js","_app/immutable/chunks/JKHi6_e9.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/Cl7GIeU3.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BwPKvNLF.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/D_fj9-71.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/cXncnRiG.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/ChBYInxz.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BP_3gL5P.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/BfGsPLmp.js","_app/immutable/chunks/CaMAyKNP.js","_app/immutable/chunks/DXxYvcKc.js","_app/immutable/chunks/DAr8lmNi.js","_app/immutable/chunks/CEUy1qHb.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/MtHulqPh.js","_app/immutable/chunks/BdmqudGw.js","_app/immutable/chunks/BZDTOfGI.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/Bz2RmOUB.js","_app/immutable/chunks/BQFy11fT.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=119-B-CWO9Jl.js.map
