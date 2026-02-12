import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const [compliance_assessment, flashMode] = await Promise.all(
    [endpoint, `${endpoint}requirements_list/?assessable=True`].map(
      (endpoint2) => fetch(endpoint2).then((res) => res.json())
    )
  );
  const requirement_assessments = flashMode.requirement_assessments;
  const requirements = flashMode.requirements;
  return {
    URLModel,
    compliance_assessment,
    requirement_assessments,
    requirements
  };
});
const actions = {
  updateRequirementAssessment: async (event) => {
    const data = await event.request.json();
    const value = data;
    const URLModel = "requirement-assessments";
    const endpoint = `${BASE_API_URL}/${URLModel}/${value.id}/`;
    const requestInitOptions = {
      method: "PATCH",
      body: JSON.stringify(value)
    };
    const res = await event.fetch(endpoint, requestInitOptions);
    return { status: res.status, body: await res.json() };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 49;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BHRCJASg.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/49.B8L7wRlg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=49-B8kv_mYm.js.map
