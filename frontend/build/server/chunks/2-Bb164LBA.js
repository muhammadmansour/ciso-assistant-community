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

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-zvT_DlGS.js')).default;
const server_id = "src/routes/(app)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.CRTcgx05.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BPxbLiAc.js","_app/immutable/chunks/zlp6oXm8.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/BuX6WnKy.js","_app/immutable/chunks/XJAwOsbJ.js","_app/immutable/chunks/QaaLfru0.js","_app/immutable/chunks/Bglazh2S.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/BsIcXRUC.js","_app/immutable/chunks/BkZ8p-97.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/aZy3C1lL.js","_app/immutable/chunks/Cg79WYI3.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/4hAK_6r2.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BX9gk6VB.js","_app/immutable/chunks/DqOcdrQH.js","_app/immutable/chunks/CxOQ_ZR3.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/5vTlhyT_.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/2.CMuSww40.css","_app/immutable/assets/app.CYIfpDLC.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Bb164LBA.js.map
