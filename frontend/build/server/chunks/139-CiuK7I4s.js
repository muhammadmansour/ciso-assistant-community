import { a as nestedWriteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import { bc as tablemode1 } from './_index-Syqrsmaf.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, n as numberType, d as booleanType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-B-ZrD2ao.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
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

const index = 139;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-nD4rANrk.js')).default;
const server_id = "src/routes/(app)/(third-party)/compliance-assessments/[id=uuid]/table-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/139.C7UrC0di.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/Dk11K9yj.js","_app/immutable/chunks/BEJnMdRT.js","_app/immutable/chunks/DhtD2JrC.js","_app/immutable/chunks/Ba-Cv3Qc.js","_app/immutable/chunks/ClPBpG8N.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DVFUldjp.js","_app/immutable/chunks/BXujJ5-U.js","_app/immutable/chunks/Bh5SWhc2.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/BT_v-dPL.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/BraAeiRY.js","_app/immutable/chunks/C5JnEjnE.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/B-VWsbvK.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/BqDcLxVN.js","_app/immutable/chunks/X5Dq4-BJ.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/5PQrJApZ.js","_app/immutable/chunks/DbS8Mp2N.js","_app/immutable/chunks/FaQtFqmn.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/CZNc8zAS.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/BUPFC8VX.js","_app/immutable/chunks/BGKdB4WI.js","_app/immutable/chunks/BSbYCVpq.js","_app/immutable/chunks/C1wuS5n_.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BbE3Hwvy.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/B1ISHYT8.js","_app/immutable/chunks/DT_aNaaR.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/139.DVZmnp9I.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=139-CiuK7I4s.js.map
