import { f as fetchLegislativeUpdates, L as LEGISLATIVE_UPDATES_API_URL } from './legislative-updates-CXWfP3P1.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-BR2qPtaG.js')).default;
const server_id = "src/routes/(app)/(internal)/legislative-updates/+page.server.ts";
const imports = ["_app/immutable/nodes/89.DM2Ir5im.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=89-DxA-8VSW.js.map
