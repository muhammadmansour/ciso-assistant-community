import { a as fetchLegislativeUpdateById, b as LEGISLATIVE_UPDATE_DETAIL_API_URL } from './legislative-updates-uK36BXCi.js';

const load = async (event) => {
  const { item, upstreamStatus } = await fetchLegislativeUpdateById(
    event.fetch,
    event.params.id
  );
  return {
    title: null,
    item,
    upstreamError: upstreamStatus === "error",
    upstreamUnauthorized: upstreamStatus === "unauthorized",
    upstreamUrl: `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, "")}/${encodeURIComponent(event.params.id)}`
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 90;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CyoU6XhC.js')).default;
const server_id = "src/routes/(app)/(internal)/legislative-updates/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/90.Cbpa_fsx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/WsjUsqu8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=90-CRHZe2Jk.js.map
