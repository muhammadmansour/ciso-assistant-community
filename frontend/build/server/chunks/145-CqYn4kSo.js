import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { A as ALLAUTH_API_URL, B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { l as loginSchema } from './schemas-Cmsh2Wi5.js';
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

const index = 145;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BTIrLZmH.js')).default;
const server_id = "src/routes/(authentication)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/145.9iOqfN7v.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DaHq2Akb.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/BcWVh4YE.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DoixOjwk.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QHYRbtIP.js","_app/immutable/chunks/DpLD00Kj.js","_app/immutable/chunks/BlS_83n9.js","_app/immutable/chunks/8YoL4k_b.js","_app/immutable/chunks/DYSo-yqh.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/Cr-E4oOt.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/B6c3wZRu.js","_app/immutable/chunks/C7wQRpjV.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/B1AfR19T.js","_app/immutable/chunks/YAPe4s4R.js","_app/immutable/chunks/Ds8o4w_v.js","_app/immutable/chunks/D2vrRTa1.js","_app/immutable/chunks/DktzCmbB.js"];
const stylesheets = ["_app/immutable/assets/OTPInput.DXvuddEn.css"];
const fonts = [];

var _145 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  component: component,
  fonts: fonts,
  imports: imports,
  index: index,
  server: _page_server_ts,
  server_id: server_id,
  stylesheets: stylesheets
});

export { _145 as _, mfaAuthenticateSchema as m };
//# sourceMappingURL=145-CqYn4kSo.js.map
