import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const res = await fetch(endpoint);
  const compliance_assessment = await res.json();
  return { URLModel, compliance_assessment, title: "Action Plan" };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 47;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-2m4ZiVMf.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/action-plan/+page.server.ts";
const imports = ["_app/immutable/nodes/47.BmiphTxo.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/PMrw91N4.js","_app/immutable/chunks/DjUEmYqv.js","_app/immutable/chunks/Dr5TFleC.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/C4KCxBn8.js","_app/immutable/chunks/CPKr3I14.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/DwW3IWC7.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BwJRdD6p.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/CtCjae10.js","_app/immutable/chunks/CoJDK23Z.js","_app/immutable/chunks/DEGa2G7N.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/BoDIzGah.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/lKHeYNKL.js","_app/immutable/chunks/bBjfn_pL.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BETfEQc-.js","_app/immutable/chunks/D3ihKsHD.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BHk3PUHp.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/BUbJGAeA.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DY5QdkO9.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=47-CO_fbEhv.js.map
