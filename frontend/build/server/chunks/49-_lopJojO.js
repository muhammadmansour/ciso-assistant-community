import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 49;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B6tnGJA0.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/compare/+page.server.ts";
const imports = ["_app/immutable/nodes/49.GgUMnuKe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CHJQfzF4.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/B7jerSYn.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/DIh_kFsb.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/DP2-kJHy.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=49-_lopJojO.js.map
