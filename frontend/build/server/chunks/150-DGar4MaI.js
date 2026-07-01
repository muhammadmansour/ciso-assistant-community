import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { R as ResetPasswordSchema } from './schemas-vgtyOSI9.js';
import { r as resolveResetUidAndToken, c as clearPasswordResetLinkCookie, p as persistPasswordResetLinkCookie } from './password-reset-token-BZMTLZMl.js';
import { bj as passwordsuccessfullysetwelcome3 } from './_index-BQcvYRD4.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DPHEUszB.js')).default;
const server_id = "src/routes/(authentication)/first-connexion/+page.server.ts";
const imports = ["_app/immutable/nodes/150.BqOrpKb4.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DcPnfJif.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=150-DGar4MaI.js.map
