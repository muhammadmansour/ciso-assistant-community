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
const imports = ["_app/immutable/nodes/85.D7mwhz9O.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/C27yzQ8a.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CHE6uwuL.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/O7MCEOzF.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DlQ9YCu6.js","_app/immutable/chunks/CLT4AJSV.js","_app/immutable/chunks/j4BNBJWt.js","_app/immutable/chunks/BWLfG5pf.js","_app/immutable/chunks/Bc0oEgA2.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BRoi5QVb.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/DuJxmYY5.js","_app/immutable/chunks/CAxNJtcR.js","_app/immutable/chunks/CZu6t3m0.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/DcjGJeUQ.js","_app/immutable/chunks/ClW84I6a.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CRRNp8jH.js","_app/immutable/chunks/3wSHrJRj.js","_app/immutable/chunks/DsCJ-pRE.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=85-Ddan5kvp.js.map
