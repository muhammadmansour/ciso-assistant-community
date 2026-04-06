import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
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

const index = 52;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bhxc8Dc4.js')).default;
const server_id = "src/routes/(app)/(internal)/compliance-assessments/[id=uuid]/flash-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/52.BIX72LMO.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DVuF4Br3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/g7jbKG_1.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DbIb9Ju9.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Ff-ubNeT.js","_app/immutable/chunks/BCvTyX3A.js","_app/immutable/chunks/BGK2LtGf.js","_app/immutable/chunks/DAu9gq5O.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=52-0zelRj8q.js.map
