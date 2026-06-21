import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { aO as scoringassistant1 } from './_index-DiaVtc2Z.js';
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

const index = 123;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7ps-PNtf.js')).default;
const server_id = "src/routes/(app)/(internal)/scoring-assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/123.BYsOiCWZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=123-D1nLYW2k.js.map
