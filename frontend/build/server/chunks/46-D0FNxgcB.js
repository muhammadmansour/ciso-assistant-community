import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ fetch, params }) => {
  const biaResponse = await fetch(
    `${BASE_API_URL}/resilience/business-impact-analysis/${params.id}/`
  );
  const bia = await biaResponse.json();
  const timelineResponse = await fetch(
    `${BASE_API_URL}/resilience/business-impact-analysis/${params.id}/build-table/`
  );
  const timelineData = await timelineResponse.json();
  const metricsResponse = await fetch(
    `${BASE_API_URL}/resilience/business-impact-analysis/${params.id}/metrics/`
  );
  const metrics = await metricsResponse.json();
  const assetsResponse = await fetch(
    `${BASE_API_URL}/resilience/asset-assessments/?bia=${params.id}`
  );
  const assetsData = await assetsResponse.json();
  const assetAssessments = assetsData.results || [];
  const assetsWithDetails = await Promise.all(
    assetAssessments.map(async (assetAssessment) => {
      const assetResponse = await fetch(`${BASE_API_URL}/assets/${assetAssessment.asset.id}/`);
      const assetDetails = await assetResponse.json();
      return {
        ...assetAssessment,
        asset: assetDetails
      };
    })
  );
  assetsWithDetails.sort((a, b) => a.asset.name.localeCompare(b.asset.name));
  const allControls = /* @__PURE__ */ new Map();
  assetAssessments.forEach((aa) => {
    aa.associated_controls?.forEach((control) => {
      if (!allControls.has(control.id)) {
        allControls.set(control.id, control);
      }
    });
  });
  return {
    bia,
    timelineData,
    metrics,
    assets: assetsWithDetails,
    appliedControls: Array.from(allControls.values())
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 46;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DA7VqOWd.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/46.3a_WYwRN.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/BKmqnwh1.js","_app/immutable/chunks/BROUFoI7.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css","_app/immutable/assets/46.DMRD3Yfp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=46-D0FNxgcB.js.map
