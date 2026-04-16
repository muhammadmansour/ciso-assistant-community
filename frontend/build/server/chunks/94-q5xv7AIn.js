import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { C as ChangePasswordSchema } from './schemas-DxPQoveO.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import { s as setFlash } from './server-C682bpHT.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { ax as passwordsuccessfullychanged2 } from './_index-Syqrsmaf.js';
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
  const form = await superValidate(event.request, zod(ChangePasswordSchema));
  return { form };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(ChangePasswordSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    const endpoint = `${BASE_API_URL}/iam/change-password/`;
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      if (response) {
        setError(form, "old_password", response);
      }
      if (response.new_password) {
        setError(form, "new_password", response.new_password);
      }
      if (response.confirm_new_password) {
        setError(form, "confirm_new_password", response.confirm_new_password);
      }
      return fail(res.status, { form });
    }
    setFlash({ type: "success", message: passwordsuccessfullychanged2() }, event);
    redirect(302, "/my-profile");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 94;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-8kx_IrtF.js')).default;
const server_id = "src/routes/(app)/(internal)/my-profile/change-password/+page.server.ts";
const imports = ["_app/immutable/nodes/94.BUzX2aq1.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/B8mbPAmK.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/C1Av9eK7.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/RUegAlyn.js","_app/immutable/chunks/6DdwpPu7.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/B2uwPNtE.js","_app/immutable/chunks/BHWq1_kx.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DgolYVi2.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/euVcTVGJ.js","_app/immutable/chunks/C9yvPz1L.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=94-q5xv7AIn.js.map
