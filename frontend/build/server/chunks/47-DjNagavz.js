import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CpmnuOUW.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/action-plan/+page.server.ts";
const imports = ["_app/immutable/nodes/47.ByhuNQqA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/BF9nWzJO.js","_app/immutable/chunks/mj0iRK6K.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/CkOCGQaT.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/D8Gxr-3A.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BDxSJf1Y.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BjA36f5m.js","_app/immutable/chunks/ZaMO6TYE.js","_app/immutable/chunks/akXf4f6w.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DFfMjrxh.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Cl-5TEJQ.js","_app/immutable/chunks/C-y7m8Xz.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CupZpfII.js","_app/immutable/chunks/BwRFFv-D.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DYe3QhYO.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/R8gvUloL.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B3fg5SyU.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=47-DjNagavz.js.map
