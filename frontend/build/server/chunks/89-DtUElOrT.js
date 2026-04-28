import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { av as home } from './_index-D7NdhnXA.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-Llc7Nd8e.js')).default;
const server_id = "src/routes/(app)/(internal)/my-assignments/+page.server.ts";
const imports = ["_app/immutable/nodes/89.BTj7NbRe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DxVupoGb.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D7dzO6Di.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/CRyXR1_7.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/CAJjCORN.js","_app/immutable/chunks/ng3-XvhC.js","_app/immutable/chunks/BqCfcmu_.js","_app/immutable/chunks/D7UX7pJP.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/I3BpkvBT.js","_app/immutable/chunks/C0MxnyOL.js","_app/immutable/chunks/D-5hzFoF.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Y0uuF1Y2.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BbEHMOl_.js","_app/immutable/chunks/DsAzGKm3.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/C6vFO4ME.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/Qr19s6a2.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CFlp8yFl.js","_app/immutable/chunks/B0PrKUfg.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=89-DtUElOrT.js.map
