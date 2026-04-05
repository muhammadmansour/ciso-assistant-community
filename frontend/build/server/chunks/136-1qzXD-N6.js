import { a as nestedWriteFormAction } from './actions-BkARH3Iu.js';
import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { g as getModelInfo } from './crud-BJ_TECqM.js';
import { m as modelSchema } from './schemas-QFT6TgyO.js';
import { bc as tablemode1 } from './_index-DZs3gE-i.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, n as numberType, d as booleanType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-MfjzxjGF.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const [compliance_assessment, tableMode, scores] = await Promise.all(
    [endpoint, `${endpoint}requirements_list/`, `${endpoint}global_score/`].map(
      (endpoint2) => fetch(endpoint2).then((res) => res.json())
    )
  );
  const frameworkEndpoint = `${BASE_API_URL}/frameworks/${compliance_assessment.framework.id}/`;
  const framework = await fetch(frameworkEndpoint).then((res) => res.json());
  compliance_assessment.framework = framework;
  const measureModel = getModelInfo("applied-controls");
  const measureCreateSchema = modelSchema("applied-controls");
  const evidenceModel = getModelInfo("evidences");
  const evidenceCreateSchema = modelSchema("evidences");
  const scoreSchema = objectType({
    is_scored: booleanType().optional(),
    score: numberType().optional().nullable(),
    documentation_score: numberType().optional().nullable()
  });
  const requirement_assessments = await Promise.all(
    tableMode.requirement_assessments.map(async (requirementAssessment) => {
      const measureInitialData = {
        requirement_assessments: [requirementAssessment.id],
        folder: requirementAssessment.folder.id
      };
      const measureCreateForm = await superValidate(measureInitialData, zod(measureCreateSchema), {
        errors: false
      });
      const evidenceInitialData = {
        requirement_assessments: [requirementAssessment.id],
        folder: requirementAssessment.folder.id
      };
      const evidenceCreateForm = await superValidate(
        evidenceInitialData,
        zod(evidenceCreateSchema),
        {
          errors: false
        }
      );
      const observationBuffer = requirementAssessment.observation;
      const scoreForm = await superValidate(
        {
          is_scored: requirementAssessment.is_scored,
          score: requirementAssessment.score,
          documentation_score: requirementAssessment.documentation_score
        },
        zod(scoreSchema)
      );
      const updateSchema = modelSchema("requirement-assessments");
      const updatedModel = getModelInfo("requirement-assessments");
      const object = {
        ...requirementAssessment,
        folder: requirementAssessment.folder.id,
        requirement: requirementAssessment.requirement.id,
        compliance_assessment: requirementAssessment.compliance_assessment.id,
        evidences: requirementAssessment.evidences.map((evidence) => evidence.id),
        applied_controls: requirementAssessment.applied_controls.map((ac) => ac.id)
      };
      const updateForm = await superValidate(object, zod(updateSchema), { errors: false });
      return {
        ...requirementAssessment,
        measureCreateForm,
        evidenceCreateForm,
        observationBuffer,
        scoreForm,
        updateForm,
        updatedModel,
        object
      };
    })
  );
  const requirementAssessmentsById = requirement_assessments.reduce(
    (acc, requirementAssessment) => {
      acc[requirementAssessment.requirement] = requirementAssessment;
      return acc;
    },
    {}
  );
  const requirements = tableMode.requirements.map((requirement) => {
    if (requirementAssessmentsById[requirement.id]) {
      return requirementAssessmentsById[requirement.id];
    }
    return requirement;
  });
  return {
    URLModel,
    compliance_assessment,
    scores,
    requirement_assessments,
    requirements,
    measureModel,
    evidenceModel,
    title: tablemode1()
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
  },
  createEvidence: async (event) => {
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject: false });
  },
  createAppliedControl: async (event) => {
    return nestedWriteFormAction({ event, action: "create" });
  },
  update: async (event) => {
    return nestedWriteFormAction({ event, action: "edit" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 136;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B7fXvKhY.js')).default;
const server_id = "src/routes/(app)/(third-party)/compliance-assessments/[id=uuid]/table-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/136.C4ju07w1.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/BHLmlRYN.js","_app/immutable/chunks/ZsCMuETm.js","_app/immutable/chunks/zapE1iAe.js","_app/immutable/chunks/DpHB2XBH.js","_app/immutable/chunks/DhsGNB-l.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CHoarrqc.js","_app/immutable/chunks/DGYMovtU.js","_app/immutable/chunks/EKaN1WfC.js","_app/immutable/chunks/Bjd8SqUI.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/u3IkIIpo.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/B0dbd_SC.js","_app/immutable/chunks/CTCWosux.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Br4_de63.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Qpqjqn02.js","_app/immutable/chunks/_LHTEM1-.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/BDveHrs8.js","_app/immutable/chunks/dZ3d2j4m.js","_app/immutable/chunks/Cu4Gnd5D.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DpGKrRW5.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/CSZOe4pX.js","_app/immutable/chunks/DmFawp5s.js","_app/immutable/chunks/Ct7MAyXU.js","_app/immutable/chunks/B2ADjPh9.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/4eNwiUv6.js","_app/immutable/chunks/hqNPRCvp.js","_app/immutable/chunks/C9h7wqLA.js","_app/immutable/chunks/BqHcqMtD.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/136.DVZmnp9I.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=136-1qzXD-N6.js.map
