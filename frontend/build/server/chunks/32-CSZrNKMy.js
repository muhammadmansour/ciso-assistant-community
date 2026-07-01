import { a as UUID_LIST_REGEX, B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import { a2 as composer } from './_index-BQcvYRD4.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-BbvEC_tD.js')).default;
const server_id = "src/routes/(app)/(internal)/analytics/composer/+page.server.ts";
const imports = ["_app/immutable/nodes/32.UloPsJg1.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/DGcHpMiH.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D-2EjZbe.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=32-CSZrNKMy.js.map
