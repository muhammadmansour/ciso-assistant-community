import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
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

const index = 46;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Da2s1R0Q.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/compare/+page.server.ts";
const imports = ["_app/immutable/nodes/46.Ded03jpH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/YAPe4s4R.js","_app/immutable/chunks/BlS_83n9.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DpLD00Kj.js","_app/immutable/chunks/BUZMx5XX.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/IOhIIUSe.js","_app/immutable/chunks/DXyLhOZC.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/D3DrPZr6.js","_app/immutable/chunks/C4bMywKL.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=46-D56C5g1W.js.map
