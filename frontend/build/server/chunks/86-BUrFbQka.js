import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "frameworks";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/object/`;
  const [framework, tree] = await Promise.all([
    fetch(endpoint).then((res) => res.json()),
    fetch(`${BASE_API_URL}/${URLModel}/${params.id}/tree/`).then((res) => res.json())
  ]);
  return { URLModel, framework, tree, title: framework.name };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 86;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BeSmA3_9.js')).default;
const server_id = "src/routes/(app)/(internal)/frameworks/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/86.BI99Tw-P.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/BTJ8N5Tp.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/Dpn6nGJr.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CmyMZvQS.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=86-BUrFbQka.js.map
