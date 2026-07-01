import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-CGF820Nw.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/46.B8OqSDH7.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/yOLtTbA6.js","_app/immutable/chunks/DebkLtCV.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css","_app/immutable/assets/46.DMRD3Yfp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=46-DFD3RPZO.js.map
