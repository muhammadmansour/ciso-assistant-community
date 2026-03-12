import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { av as home } from './_index-DZs3gE-i.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

const load = (async ({ parent, fetch }) => {
  const { user } = await parent();
  const complianceAnalytics = await fetch(`${BASE_API_URL}/compliance-assessments/analytics/`).then((res) => res.json()).catch((error) => {
    console.error("Failed to fetch compliance analytics:", error);
    return {};
  });
  return { user, complianceAnalytics, title: home() };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 89;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cra8TVXh.js')).default;
const server_id = "src/routes/(app)/(internal)/my-assignments/+page.server.ts";
const imports = ["_app/immutable/nodes/89.BQ2vnoVB.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/Cfkg7lxO.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DoPwhYM4.js","_app/immutable/chunks/CyuO_K9h.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/B38VhOn4.js","_app/immutable/chunks/B7sVGc0s.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/DutDFo5s.js","_app/immutable/chunks/DYotTY_m.js","_app/immutable/chunks/C5ITapJd.js","_app/immutable/chunks/RZeClddz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/dKQsoG8S.js","_app/immutable/chunks/dzzbPx5I.js","_app/immutable/chunks/BXiyLsbQ.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/ATWBsLVi.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/ukgCg5ra.js","_app/immutable/chunks/Cv4G-QpO.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/A2ruJfxM.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/DvSY28v2.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C8ZQAtcg.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=89-LCFoRFNF.js.map
