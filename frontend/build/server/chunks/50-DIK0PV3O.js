import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CQRlhw_l.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/compare/+page.server.ts";
const imports = ["_app/immutable/nodes/50.BWEXTWVr.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/DGcHpMiH.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=50-DIK0PV3O.js.map
