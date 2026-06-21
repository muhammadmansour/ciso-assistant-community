import { a as fetchLegislativeUpdateById, b as LEGISLATIVE_UPDATE_DETAIL_API_URL } from './legislative-updates-CXWfP3P1.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-BlH-f3Fa.js')).default;
const server_id = "src/routes/(app)/(internal)/legislative-updates/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/90.D1PagFhh.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=90-CTaR3Oh2.js.map
