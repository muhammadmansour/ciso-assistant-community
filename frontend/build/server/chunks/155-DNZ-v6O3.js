import { A as ALLAUTH_API_URL } from './constants-12fjCMiL.js';
import { l as loginSchema } from './schemas-vgtyOSI9.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, a as setError } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './_index-BQcvYRD4.js';
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

const index = 155;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B0Hdpdgm.js')).default;
const server_id = "src/routes/(authentication)/wathbah-grc-admin/+page.server.ts";
const imports = ["_app/immutable/nodes/155.BMQ7K25P.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/155.DwjoHwMR.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=155-DNZ-v6O3.js.map
