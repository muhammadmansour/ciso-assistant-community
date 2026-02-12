import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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

const index = 54;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CNTEjFMC.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/54.BZhsK7WK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CbJYQrkZ.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/BHkN8qNU.js","_app/immutable/chunks/4hrXFEIY.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BO5yzyov.js","_app/immutable/chunks/7k5g5JBI.js","_app/immutable/chunks/BX_Kx2Mx.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/DxMLkaLG.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css","_app/immutable/assets/54.CEKUD8qm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=54-BbP_rUC9.js.map
