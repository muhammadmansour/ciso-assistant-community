import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const res = await fetch(endpoint);
  const compliance_assessment = await res.json();
  return { URLModel, compliance_assessment, title: "Associated Evidences" };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 51;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Da7woXaa.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/evidences-list/+page.server.ts";
const imports = ["_app/immutable/nodes/51.D2xsg2Ri.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/bSb9YpUT.js","_app/immutable/chunks/CHJQfzF4.js","_app/immutable/chunks/DUgD-rTx.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/udJ18Nar.js","_app/immutable/chunks/CL1YE52f.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/BGgFRArE.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CFQSVRMU.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/Dw1DiVSs.js","_app/immutable/chunks/Do4lXeSZ.js","_app/immutable/chunks/BlDq-91O.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/DUgNlWuZ.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/B7jerSYn.js","_app/immutable/chunks/DIh_kFsb.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/C4WPkiBL.js","_app/immutable/chunks/epMrVhTE.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Dkd-KlR9.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/BCazNoug.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Cud_L1fS.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=51-BIB04hYR.js.map
