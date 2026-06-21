import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { A as ALLAUTH_API_URL, B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { l as loginSchema } from './schemas-BwimqDbp.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';

const mfaAuthenticateSchema = objectType({
  code: stringType().regex(/^\d{6,8}$/).min(6).max(8)
  // Recovery codes are 8 digits long
});

const load = async ({ fetch, request, locals }) => {
  if (locals.user) {
    redirect(302, "/recap");
  }
  const form = await superValidate(request, zod(loginSchema));
  const SSOInfo = await fetch(`${BASE_API_URL}/settings/sso/info/`).then((res) => res.json());
  const mfaAuthenticateForm = await superValidate(request, zod(mfaAuthenticateSchema));
  return { form, SSOInfo, mfaAuthenticateForm };
};
const actions = {
  login: async ({ request, fetch, cookies, url }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const email = form.data.username;
    const password = form.data.password;
    const login = {
      email,
      password
    };
    const endpoint = `${ALLAUTH_API_URL}/auth/login`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(login)
    };
    const res = await fetch(endpoint, requestInitOptions).then((res2) => res2.json());
    if (res.status !== 200) {
      console.error(res);
      if (res.errors) {
        res.errors.forEach((error) => {
          setError(form, error.param, error.code);
        });
        return fail(res.status, { form });
      }
      if (res.status === 401 && res.data) {
        const flows = res.data.flows;
        if (flows.length > 0) {
          const mfaFlow = flows.find((flow) => flow.id === "mfa_authenticate");
          const sessionToken = res.meta.session_token;
          if (sessionToken) {
            cookies.set("allauth_session_token", sessionToken, {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: true
            });
          }
          if (mfaFlow) {
            return {
              form,
              mfa: true,
              mfaFlow
            };
          }
        }
      }
      return { form };
    }
    cookies.set("token", res.meta.access_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true
    });
    cookies.set("allauth_session_token", res.meta.session_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true
    });
    cookies.set("show_first_login_modal", "true", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      secure: true
    });
    const next = url.searchParams.get("next");
    const secureNext = getSecureRedirect(next) || "/";
    redirect(302, secureNext);
  },
  mfaAuthenticate: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(formData, zod(mfaAuthenticateSchema));
    if (!form.valid) return fail(400, { form });
    const endpoint = `${ALLAUTH_API_URL}/auth/2fa/authenticate`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response = await event.fetch(endpoint, requestInitOptions).then((res) => res.json());
    if (response.status !== 200) {
      console.error("Could not authenticate using TOTP", response);
      if (Object.hasOwn(response, "errors")) {
        response.errors.forEach((error) => {
          setError(form, error.param, error.code);
        });
      }
      return fail(response.status, { form });
    }
    event.cookies.set("token", response.meta.access_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true
    });
    event.cookies.set("allauth_session_token", response.meta.session_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true
    });
    return { form };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 151;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DbWB8dIc.js')).default;
const server_id = "src/routes/(authentication)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/151.BD-eDO33.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/E2oaRlnd.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DVwtFNnP.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CNFco8Jp.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/D-ziLzu-.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/CQVjIaEI.js","_app/immutable/chunks/BtyLsRRi.js"];
const stylesheets = ["_app/immutable/assets/OTPInput.DXvuddEn.css"];
const fonts = [];

var _151 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  component: component,
  fonts: fonts,
  imports: imports,
  index: index,
  server: _page_server_ts,
  server_id: server_id,
  stylesheets: stylesheets
});

export { _151 as _, mfaAuthenticateSchema as m };
//# sourceMappingURL=151-CFCkCuaz.js.map
