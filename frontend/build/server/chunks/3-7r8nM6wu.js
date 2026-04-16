import { r as redirect } from './index-BWA_9C9m.js';
import { l as loadFlash } from './server-C682bpHT.js';
import './utils-FiC4zhrQ.js';

const loginPageRegex = /^[a-zA-Z0-9]+:\/\/[^\/]+\/login\/?.*$/;
const load = loadFlash(async ({ locals, url, cookies, request }) => {
  if (!locals.user && !url.pathname.includes("/login")) {
    redirect(302, `/login?next=${url.pathname}`);
  } else {
    const referer = request.headers.get("referer") ?? "";
    const fromLogin = loginPageRegex.test(referer);
    if (fromLogin) {
      cookies.set("from_login", "true", {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true
      });
    }
  }
  return { user: locals.user, settings: locals.settings, featureflags: locals.featureflags };
});

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-DHt-uu7y.js')).default;
const server_id = "src/routes/(app)/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.ssuUrnqz.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/DNW_qCUs.js","_app/immutable/chunks/C4dnATnP.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BmVCPbbO.js","_app/immutable/chunks/e80p6tav.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/DLw7-9tS.js","_app/immutable/chunks/DEcTr0p1.js","_app/immutable/chunks/CeiJu8BG.js","_app/immutable/chunks/BePFwegX.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/BennqQSB.js","_app/immutable/chunks/fcK6T74i.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Bcvmpxf5.js","_app/immutable/chunks/DjdVUKFv.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/Da5SqbDp.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Bm296bj5.js","_app/immutable/chunks/BDbHoVt3.js","_app/immutable/chunks/BcwJ3xBb.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CTghNTP7.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/3.VyDIDkkz.css","_app/immutable/assets/app.CYIfpDLC.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-7r8nM6wu.js.map
