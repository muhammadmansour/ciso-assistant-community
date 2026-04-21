import { A as ALLAUTH_API_URL } from './constants-QzmVibOJ.js';
import { l as loginSchema } from './schemas-DxPQoveO.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './_index-Syqrsmaf.js';
import './utils-FiC4zhrQ.js';
import './index2-9icAqEyj.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';

const load = async ({ fetch, request, locals }) => {
  if (locals.user) {
    redirect(302, "/admin");
  }
  const form = await superValidate(request, zod(loginSchema));
  return { form, title: "WathbahGRC Admin" };
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
      return fail(res.status || 400, { form });
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
    redirect(302, "/admin");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 152;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Zg5_vuVn.js')).default;
const server_id = "src/routes/(authentication)/wathbah-grc-admin/+page.server.ts";
const imports = ["_app/immutable/nodes/152.BgmDOlVv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BCazNoug.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CFQSVRMU.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/Dw1DiVSs.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/Do4lXeSZ.js","_app/immutable/chunks/BlDq-91O.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/g8KyPnx_.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/DcDfgfhU.js","_app/immutable/chunks/Cud_L1fS.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/152.DwjoHwMR.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=152-D_jT9TxH.js.map
