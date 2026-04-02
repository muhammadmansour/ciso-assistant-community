import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { aK as scoringassistant1 } from './_index-B12BAPce.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch }) => {
  const req = await fetch(`${BASE_API_URL}/risk-matrices/`);
  const req_data = await req.json();
  const risk_matrices = req_data.results.map(
    (risk_matrix) => ({
      ...JSON.parse(risk_matrix.json_definition),
      name: risk_matrix.name
    })
  );
  return {
    risk_matrices,
    title: scoringassistant1()
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 120;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-H8PkfLft.js')).default;
const server_id = "src/routes/(app)/(internal)/scoring-assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/120.D8NBNBBe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=120-H2LKSbEn.js.map
