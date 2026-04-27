import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 42;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-pWvtdG__.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/42.DRm7s4Xi.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DXxYvcKc.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DAr8lmNi.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/BLS5LdYS.js","_app/immutable/chunks/gHRMhUr8.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/cXncnRiG.js","_app/immutable/chunks/Cutloik7.js","_app/immutable/chunks/DJUALYxg.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css","_app/immutable/assets/42.DMRD3Yfp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=42-9Djlhrpe.js.map
