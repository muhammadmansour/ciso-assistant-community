import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-CZxQOl29.js')).default;
const server_id = "src/routes/(app)/(internal)/business-impact-analysis/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/42.DyxCLzuz.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/Ck6bKgj5.js","_app/immutable/chunks/BZ-U0msf.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/TimelineTable.DVo8JVRr.css","_app/immutable/assets/42.DMRD3Yfp.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=42-eFmnHHQa.js.map
