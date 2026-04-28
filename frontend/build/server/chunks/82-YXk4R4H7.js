import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 82;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C-mBfifI.js')).default;
const server_id = "src/routes/(app)/(internal)/frameworks/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/82.Bd93uul7.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/Dea9XOCA.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/mkRX5WOJ.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DvHR2hVB.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/JkyNnoux.js","_app/immutable/chunks/Bn1B7sWx.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/Bisu60EG.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BHendfPR.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/Uz9Gfgi2.js","_app/immutable/chunks/DYFB3whk.js","_app/immutable/chunks/CumOB_G-.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/FLsuLDXF.js","_app/immutable/chunks/BBE2L2kR.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BCkqGufA.js","_app/immutable/chunks/D4Xh5k1E.js","_app/immutable/chunks/BmMs8hfm.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=82-YXk4R4H7.js.map
