import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { ap as scoringassistant1 } from './_index-DEXNURl5.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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

const index = 117;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C5ZBXnTS.js')).default;
const server_id = "src/routes/(app)/(internal)/scoring-assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/117.DlaPBoK0.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=117-D0ItH9fB.js.map
