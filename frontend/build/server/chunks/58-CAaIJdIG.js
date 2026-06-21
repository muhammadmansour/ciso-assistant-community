import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ params, fetch, parent }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/report-data/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const interface_settings = await fetch(`${BASE_API_URL}/settings/general/object/`).then(
    (res2) => res2.json()
  );
  const { featureflags } = await parent();
  return {
    reportData: data,
    useBubbles: interface_settings.interface_agg_scenario_matrix,
    inherentRiskEnabled: featureflags?.inherent_risk || false
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 58;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DxbP7YaR.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/58.DEhhYpSL.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/8RL6gUyV.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/D4x4_U4v.js","_app/immutable/chunks/nKwNmrVU.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/C-aoICoi.js","_app/immutable/chunks/Dj-3zXYs.js","_app/immutable/chunks/wu99v29p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css","_app/immutable/assets/58.CEKUD8qm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=58-CAaIJdIG.js.map
