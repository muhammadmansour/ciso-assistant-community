import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { aO as scoringassistant1 } from './_index-BQcvYRD4.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-Bnh85U3D.js')).default;
const server_id = "src/routes/(app)/(internal)/scoring-assistant/+page.server.ts";
const imports = ["_app/immutable/nodes/123.yYi_mHUb.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=123-Dssq-T2f.js.map
