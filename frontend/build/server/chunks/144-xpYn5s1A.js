import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { R as ResetPasswordSchema } from './schemas-BcDBvyDd.js';
import { aW as passwordsuccessfullysetwelcome3 } from './_index-DEXNURl5.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate, a as setError } from './superValidate-jp4VH0Pt.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  event.cookies.delete("token", { path: "/" });
  event.cookies.delete("allauth_session_token", { path: "/" });
  const form = await superValidate(event.request, zod(ResetPasswordSchema));
  return { form };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(ResetPasswordSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/iam/password-reset/confirm/`;
    form.data.token = event.url.searchParams.get("token");
    form.data.uidb64 = event.url.searchParams.get("uidb64");
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
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

const index = 144;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CrvLCq2X.js')).default;
const server_id = "src/routes/(authentication)/first-connexion/+page.server.ts";
const imports = ["_app/immutable/nodes/144.mINRO6e3.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DGyHVit_.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D4QPgErx.js"];
const stylesheets = ["_app/immutable/assets/144.DBnVuQ2m.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=144-xpYn5s1A.js.map
