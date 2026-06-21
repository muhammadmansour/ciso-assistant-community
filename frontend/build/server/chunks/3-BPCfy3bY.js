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
const component = async () => component_cache ??= (await import('./_layout.svelte-Cx6bfFBg.js')).default;
const server_id = "src/routes/(app)/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.CRMTUlT5.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/DNTWqAnv.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/D-ziLzu-.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/3.VyDIDkkz.css","_app/immutable/assets/app.pf-7JUTG.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-BPCfy3bY.js.map
