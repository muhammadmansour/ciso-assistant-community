import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { a as SetPasswordSchema } from './schemas-BwimqDbp.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { a$ as passwordsuccessfullyset2, b0 as setpassword1 } from './_index-DiaVtc2Z.js';
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

const index = 133;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CCAtdr_D.js')).default;
const server_id = "src/routes/(app)/(internal)/users/[id=uuid]/edit/set-password/+page.server.ts";
const imports = ["_app/immutable/nodes/133.CXmPesrM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DVwtFNnP.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CNFco8Jp.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=133-N-2nzVw0.js.map
