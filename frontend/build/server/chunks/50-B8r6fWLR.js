import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = (async ({ fetch, url }) => {
  const baseId = url.searchParams.get("base");
  const compareId = url.searchParams.get("compare");
  if (!baseId || !compareId) {
    throw error(400, "Both base and compare audit IDs are required");
  }
  const URLModel = "compliance-assessments";
  const comparisonEndpoint = `${BASE_API_URL}/${URLModel}/${baseId}/compare/?compare_id=${compareId}`;
  const comparisonData = await fetch(comparisonEndpoint).then((res) => {
    if (!res.ok) {
      if (res.status === 404) throw error(404, "One or both audits not found");
      if (res.status === 403) throw error(403, "Permission denied");
      if (res.status === 400) throw error(400, "Invalid comparison request");
      throw error(500, "Failed to load comparison data");
    }
    return res.json();
  });
  return {
    framework: comparisonData.framework,
    baseAudit: comparisonData.base,
    compareAudit: comparisonData.compare,
    differences: comparisonData.differences,
    title: `Compare: ${comparisonData.base.name} vs ${comparisonData.compare.name}`
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 50;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DjS-siws.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/compare/+page.server.ts";
const imports = ["_app/immutable/nodes/50.DodGhmfI.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/Dvzq4jwj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=50-B8r6fWLR.js.map
