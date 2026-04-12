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

const index = 45;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BkNtBu2s.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/45.Br52I7vb.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/BGKdB4WI.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/BSbYCVpq.js","_app/immutable/chunks/Ba-Cv3Qc.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/DhtD2JrC.js","_app/immutable/chunks/DRDSBst5.js","_app/immutable/chunks/C6Q14IuE.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/FaQtFqmn.js","_app/immutable/chunks/Dk11K9yj.js","_app/immutable/chunks/BEJnMdRT.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css","_app/immutable/assets/45.DMRD3Yfp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=45-BJJBxOhc.js.map
