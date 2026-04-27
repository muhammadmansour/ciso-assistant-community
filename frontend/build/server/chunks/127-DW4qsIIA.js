import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { a as SetPasswordSchema } from './schemas-5y-ookeO.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aX as passwordsuccessfullyset2, aY as setpassword1 } from './_index-CqZWReca.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async (event) => {
  const form = await superValidate(event.request, zod(SetPasswordSchema));
  return { form, title: setpassword1() };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(SetPasswordSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/iam/set-password/`;
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
      return fail(res.status, { form });
    }
    setFlash({ type: "success", message: passwordsuccessfullyset2() }, event);
    redirect(302, "/users");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 127;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DH8uiSyt.js')).default;
const server_id = "src/routes/(app)/(internal)/users/[id=uuid]/edit/set-password/+page.server.ts";
const imports = ["_app/immutable/nodes/127.Bmag3tTV.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/aZy3C1lL.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/Cg79WYI3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QaaLfru0.js","_app/immutable/chunks/XJAwOsbJ.js","_app/immutable/chunks/Bglazh2S.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DqOcdrQH.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/5vTlhyT_.js","_app/immutable/chunks/BX9gk6VB.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=127-DW4qsIIA.js.map
