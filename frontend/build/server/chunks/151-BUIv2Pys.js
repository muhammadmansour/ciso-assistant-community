import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { A as ALLAUTH_API_URL, B as BASE_API_URL } from './constants-12fjCMiL.js';
import { l as loginSchema } from './schemas-vgtyOSI9.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-LwfqgnFj.js')).default;
const server_id = "src/routes/(authentication)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/151.BO92OztO.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DcPnfJif.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/D-ziLzu-.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/ClSU64eR.js","_app/immutable/chunks/BEAoixa4.js"];
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
//# sourceMappingURL=151-BUIv2Pys.js.map
