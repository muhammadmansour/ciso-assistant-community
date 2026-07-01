import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { aK as inspect } from './_index-BQcvYRD4.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, url }) => {
  const includeEnclaves = url.searchParams.get("include_enclaves") === "true";
  const endpoint = `${BASE_API_URL}/folders/org_tree/?include_enclaves=${includeEnclaves ? "true" : "false"}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return { data, title: inspect(), includeEnclaves };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 137;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CBsoaMmQ.js')).default;
const server_id = "src/routes/(app)/(internal)/x-rays/inspect/+page.server.ts";
const imports = ["_app/immutable/nodes/137.a6un8j1h.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=137-k3caZwKY.js.map
