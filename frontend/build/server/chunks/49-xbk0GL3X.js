import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-C6GOGaMP.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/49.DdD6tT2X.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DCI0CEYj.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/Dh9-OhBV.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DvxHSXZr.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/QiiJKCdK.js","_app/immutable/chunks/Dcl9JJPO.js","_app/immutable/chunks/I45z91Uz.js","_app/immutable/chunks/nhcCvQES.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=49-xbk0GL3X.js.map
