import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DWxdtpmm.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/53.02eVKopB.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=53-DaaeC3OC.js.map
