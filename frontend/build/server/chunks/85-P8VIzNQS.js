import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 85;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BfhjzsHg.js')).default;
const server_id = "src/routes/(app)/(internal)/frameworks/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/85.B3AralCv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/C27yzQ8a.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CHE6uwuL.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/DLw7-9tS.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/DEcTr0p1.js","_app/immutable/chunks/CeiJu8BG.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/BePFwegX.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BennqQSB.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/fcK6T74i.js","_app/immutable/chunks/DNW_qCUs.js","_app/immutable/chunks/C4dnATnP.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Bcvmpxf5.js","_app/immutable/chunks/DjdVUKFv.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/exXxy8zt.js","_app/immutable/chunks/BmVCPbbO.js","_app/immutable/chunks/e80p6tav.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=85-P8VIzNQS.js.map
