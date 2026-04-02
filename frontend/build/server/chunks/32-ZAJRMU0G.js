import { a as UUID_LIST_REGEX, B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import { _ as composer } from './_index-B12BAPce.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, url }) => {
  const params = url.searchParams;
  if (!params.has("risk_assessment")) {
    error(400, "No risk_assessment found in the URL !");
  }
  const risk_assessment_string = params.get("risk_assessment");
  if (risk_assessment_string && !UUID_LIST_REGEX.test(risk_assessment_string)) {
    error(400, "Invalid risk_assessment UUID list");
  }
  const req = await fetch(
    `${BASE_API_URL}/composer_data/?risk_assessment=${risk_assessment_string}`
  );
  const resp = await req.json();
  if (resp.error) {
    error(req.status, resp.error);
  }
  return { ...resp.result, title: composer() };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 32;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B5mTR5AD.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/composer/+page.server.ts";
const imports = ["_app/immutable/nodes/32.X4v5lkux.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BwlpdCDo.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CM1u5Zf1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-ZAJRMU0G.js.map
