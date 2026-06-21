import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

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

const index = 53;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-pqWEQ1-L.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/53.yYuCbfni.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CsQxgAcg.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=53-BJZyNS7J.js.map
