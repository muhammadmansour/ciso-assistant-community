import { B as BASE_API_URL, A as ALLAUTH_API_URL } from './constants-lv6aycRl.js';
import { f as fail } from './index-BWA_9C9m.js';
import { o as objectType, s as stringType, h as anyType } from './string-BMZjP7XX.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, m as message, a as setError } from './superValidate-BmtJFExL.js';
import { z as zod } from './zod-BTgf12zS.js';
import { s as setFlash } from './server-C682bpHT.js';
import { ay as successfullydeletedpersonalaccesstoken4, az as errorcreatingpersonalaccesstoken4, aA as errorregeneratingrecoverycodes3, aB as successfullydeactivatedtotp5, aC as successfullyactivatedtotp5, aD as settings } from './_index-CqZWReca.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { A as AuthTokenCreateSchema } from './schemas-5y-ookeO.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

const activateTOTPSchema = objectType({
  code: stringType().regex(/^\d{6}$/).min(6).max(6)
});

const load = async (event) => {
  const authenticatorsEndpoint = `${ALLAUTH_API_URL}/account/authenticators`;
  const authenticatorsResponse = await event.fetch(authenticatorsEndpoint).then((res) => res.json());
  if (authenticatorsResponse.status !== 200) {
    console.error("Could not get authenticators", authenticatorsResponse);
    fail(authenticatorsResponse.status, { error: "Could not get authenticators" });
  }
  const authenticators = authenticatorsResponse.data;
  let totp = null;
  let recoveryCodes = null;
  const totpEndpoint = `${authenticatorsEndpoint}/totp`;
  const totpResponse = await event.fetch(totpEndpoint).then((res) => res.json());
  totp = totpResponse.meta;
  if (authenticators.find((auth) => auth.type === "recovery_codes")) {
    const recoveryCodesEndpoint = `${authenticatorsEndpoint}/recovery-codes`;
    const recoveryCodesResponse = await event.fetch(recoveryCodesEndpoint).then((res) => res.json());
    if (recoveryCodesResponse.status === 200) {
      recoveryCodes = recoveryCodesResponse.data;
    }
  }
  const activateTOTPForm = await superValidate(zod(activateTOTPSchema));
  const personalAccessTokensEndpoint = `${BASE_API_URL}/iam/auth-tokens/`;
  const personalAccessTokensResponse = await event.fetch(personalAccessTokensEndpoint);
  if (!personalAccessTokensResponse.ok) {
    console.error("Could not get personal access tokens", personalAccessTokensResponse);
    fail(personalAccessTokensResponse.status, { error: "Could not get personal access tokens" });
  }
  const personalAccessTokens = await personalAccessTokensResponse.json();
  const personalAccessTokenCreateForm = await superValidate(zod(AuthTokenCreateSchema));
  const personalAccessTokenDeleteForm = await superValidate(zod(objectType({ id: stringType() })));
  return {
    authenticators,
    totp,
    activateTOTPForm,
    recoveryCodes,
    personalAccessTokens,
    personalAccessTokenCreateForm,
    personalAccessTokenDeleteForm,
    title: settings()
  };
};
const actions = {
  activateTOTP: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(formData, zod(activateTOTPSchema));
    if (!form.valid) return fail(400, { form });
    const endpoint = `${ALLAUTH_API_URL}/account/authenticators/totp`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    const data = await response.json();
    if (data.status !== 200) {
      console.error("Could not activate TOTP", data);
      if (Object.hasOwn(data, "errors")) {
        data.errors.forEach((error) => {
          console.log("error", error.param, safeTranslate(error.code));
          setError(form, error.param, error.message);
        });
      }
      return fail(data.status, { form });
    }
    try {
      const revokeResponse = await event.fetch(`${BASE_API_URL}/iam/revoke-sessions/`, {
        method: "POST"
      });
      if (!revokeResponse.ok) {
        console.error("Failed to revoke other sessions", await revokeResponse.text());
      }
    } catch (error) {
      console.error("Error revoking other sessions", error);
    }
    setFlash({ type: "success", message: successfullyactivatedtotp5() }, event);
    return { form };
  },
  deactivateTOTP: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(
      formData,
      zod(
        objectType({
          any: anyType()
        })
      )
    );
    const endpoint = `${ALLAUTH_API_URL}/account/authenticators/totp`;
    const requestInitOptions = {
      method: "DELETE"
    };
    const response = await event.fetch(endpoint, requestInitOptions).then((res) => res.json());
    if (response.status !== 200) {
      console.error("Could not deactivate TOTP", response);
      return fail(response.status, { error: "Could not deactivate TOTP" });
    }
    setFlash({ type: "success", message: successfullydeactivatedtotp5() }, event);
    return { form };
  },
  regenerateRecoveryCodes: async (event) => {
    const recoveryCodesEndpoint = `${ALLAUTH_API_URL}/account/authenticators/recovery-codes`;
    const requestInitOptions = {
      method: "POST"
    };
    const response = await event.fetch(recoveryCodesEndpoint, requestInitOptions).then((res) => res.json());
    if (response.status !== 200) {
      console.error("Could not regenerate recovery codes", response);
      setFlash({ type: "error", message: errorregeneratingrecoverycodes3() }, event);
      return fail(response.status, { error: "Could not regenerate recovery codes" });
    }
    return { recoveryCodes: response.data };
  },
  createPAT: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(formData, zod(AuthTokenCreateSchema));
    if (!form.valid) return fail(400, { form });
    const endpoint = `${BASE_API_URL}/iam/auth-tokens/`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) {
      console.error("Could not create PAT");
      try {
        const errorResponse = await response.json();
        const errorMessage = errorResponse?.error || errorcreatingpersonalaccesstoken4();
        setFlash({ type: "error", message: safeTranslate(errorMessage) }, event);
      } catch (e) {
        setFlash({ type: "error", message: errorcreatingpersonalaccesstoken4() }, event);
      }
      return fail(response.status, { form });
    }
    const data = await response.json();
    return message(form, { status: response.status, data });
  },
  deletePAT: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(formData, zod(objectType({ id: stringType() })));
    if (!form.valid) return fail(400, { form });
    const endpoint = `${BASE_API_URL}/iam/auth-tokens/${form.data.id}/`;
    const requestInitOptions = {
      method: "DELETE"
    };
    const response = await event.fetch(endpoint, requestInitOptions);
    if (!response.ok) {
      console.error("Could not delete PAT");
      return fail(response.status, { form });
    }
    setFlash({ type: "success", message: successfullydeletedpersonalaccesstoken4() }, event);
    return message(form, { status: response.status });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 92;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DquaffTq.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/92.B2l_25cY.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DsdzjnHy.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DbbU6VTG.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DfJVBPAp.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/Rxart3gn.js","_app/immutable/chunks/CRiXYdiU.js","_app/immutable/chunks/BIJQbCfJ.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B6xGvAKi.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Dwr4wZVV.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CnWJs3Ar.js","_app/immutable/chunks/BDbwjVsq.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BX6nAo1d.js","_app/immutable/chunks/Bi_fmpDJ.js","_app/immutable/chunks/BhEL2seE.js","_app/immutable/chunks/D60C9O1B.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/OTPInput.DXvuddEn.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=92-tUXuq3Mt.js.map
