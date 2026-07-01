import { f as fetchLegislativeUpdates, L as LEGISLATIVE_UPDATES_API_URL } from './legislative-updates-uK36BXCi.js';

const load = async (event) => {
  const { items, upstreamStatus } = await fetchLegislativeUpdates(event.fetch);
  return {
    title: "legislativeUpdates",
    items,
    upstreamError: upstreamStatus === "error",
    upstreamUnauthorized: upstreamStatus === "unauthorized",
    upstreamUrl: LEGISLATIVE_UPDATES_API_URL
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 89;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DZTa3Cv2.js')).default;
const server_id = "src/routes/(app)/(internal)/legislative-updates/+page.server.ts";
const imports = ["_app/immutable/nodes/89.BugAoTtS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/WsjUsqu8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=89-CB9y-Crs.js.map
