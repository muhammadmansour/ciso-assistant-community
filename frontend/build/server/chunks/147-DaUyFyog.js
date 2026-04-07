import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { R as ResetPasswordSchema } from './schemas-QFT6TgyO.js';
import { bi as passwordsuccessfullyreset2 } from './_index-DZs3gE-i.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
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
    setFlash({ type: "success", message: passwordsuccessfullyreset2() }, event);
    redirect(302, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 147;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B3g-GnMv.js')).default;
const server_id = "src/routes/(authentication)/password-reset/confirm/+page.server.ts";
const imports = ["_app/immutable/nodes/147.Clk_kmuf.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BqaCZ_z-.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/C27n3hTy.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/C0F604xr.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Dcl9JJPO.js","_app/immutable/chunks/I45z91Uz.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/DvxHSXZr.js","_app/immutable/chunks/QiiJKCdK.js","_app/immutable/chunks/nhcCvQES.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/Bq_Ags-p.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/eKzdkxk1.js","_app/immutable/chunks/BfFLuDP9.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=147-DaUyFyog.js.map
