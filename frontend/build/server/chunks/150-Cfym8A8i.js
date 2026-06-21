import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { R as ResetPasswordSchema } from './schemas-BwimqDbp.js';
import { r as resolveResetUidAndToken, c as clearPasswordResetLinkCookie, p as persistPasswordResetLinkCookie } from './password-reset-token-BZMTLZMl.js';
import { bj as passwordsuccessfullysetwelcome3 } from './_index-DiaVtc2Z.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  event.cookies.delete("token", { path: "/" });
  event.cookies.delete("allauth_session_token", { path: "/" });
  const qpUid = event.url.searchParams.get("uidb64") ?? "";
  const qpTok = event.url.searchParams.get("token") ?? "";
  if (qpUid && qpTok) {
    persistPasswordResetLinkCookie(event, qpUid, qpTok);
  }
  const form = await superValidate(
    {
      uidb64: qpUid,
      token: qpTok,
      new_password: "",
      confirm_new_password: ""
    },
    zod(ResetPasswordSchema),
    { errors: false }
  );
  return { form };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(ResetPasswordSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const { uidb64, token } = resolveResetUidAndToken(event, {
      ...form.data,
      uidb64: event.url.searchParams.get("uidb64") ?? form.data.uidb64 ?? "",
      token: event.url.searchParams.get("token") ?? form.data.token ?? ""
    });
    if (!uidb64 || !token) {
      setFlash(
        {
          type: "error",
          message: "This page must be opened using the full link from your email (including the text after ?)."
        },
        event
      );
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/iam/password-reset/confirm/`;
    const requestInitOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...form.data,
        uidb64,
        token
      })
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      if (response.new_password) {
        setError(form, "new_password", response.new_password);
      }
      if (response.confirm_new_password) {
        setError(form, "confirm_new_password", response.confirm_new_password);
      }
      if (response.error) {
        setFlash({ type: "error", message: safeTranslate(response.error) }, event);
        redirect(302, "/login");
      }
      return fail(400, { form });
    }
    clearPasswordResetLinkCookie(event);
    setFlash(
      {
        type: "success",
        message: passwordsuccessfullysetwelcome3()
      },
      event
    );
    redirect(302, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 150;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CixEoyU3.js')).default;
const server_id = "src/routes/(authentication)/first-connexion/+page.server.ts";
const imports = ["_app/immutable/nodes/150.BtJjAPKc.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DVwtFNnP.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CNFco8Jp.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/E2oaRlnd.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=150-Cfym8A8i.js.map
