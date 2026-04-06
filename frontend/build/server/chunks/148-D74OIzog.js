import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { A as ALLAUTH_API_URL, B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { l as loginSchema } from './schemas-DxPQoveO.js';
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

const index = 148;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BwW68PYn.js')).default;
const server_id = "src/routes/(authentication)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/148.DTRgEYhz.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BRcXn3_a.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DP6h8Wu-.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/DNtCAAxP.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/DS-6KAjI.js","_app/immutable/chunks/BXmcmAv2.js","_app/immutable/chunks/b8SWVt-e.js","_app/immutable/chunks/Dp_Tn0TE.js","_app/immutable/chunks/BNe8ndVh.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/C0GJTWy1.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/TKeEwWBW.js","_app/immutable/chunks/CUl5Hafe.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DM6hxPHh.js","_app/immutable/chunks/DXF9TMZi.js","_app/immutable/chunks/DuNvfXXg.js","_app/immutable/chunks/D2Tc1qFD.js","_app/immutable/chunks/CBoLZ5_6.js"];
const stylesheets = ["_app/immutable/assets/OTPInput.DXvuddEn.css"];
const fonts = [];

var _148 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  component: component,
  fonts: fonts,
  imports: imports,
  index: index,
  server: _page_server_ts,
  server_id: server_id,
  stylesheets: stylesheets
});

export { _148 as _, mfaAuthenticateSchema as m };
//# sourceMappingURL=148-D74OIzog.js.map
