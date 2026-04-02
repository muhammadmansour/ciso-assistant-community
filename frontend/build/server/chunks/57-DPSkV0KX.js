import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 57;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CoXR_O6r.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/57.hAPa7M4f.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/CYmlTePc.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/Rgjyzaqy.js","_app/immutable/chunks/CScoD9Pj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/C4DyGdAi.js","_app/immutable/chunks/Br8doqtw.js","_app/immutable/chunks/UDnCXAjM.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css","_app/immutable/assets/57.CEKUD8qm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=57-DPSkV0KX.js.map
