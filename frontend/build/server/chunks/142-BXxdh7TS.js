import { a as nestedWriteFormAction } from './actions-3TqTFyN3.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import { bg as tablemode1 } from './_index-DiaVtc2Z.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, n as numberType, d as booleanType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-CxHbQmwN.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 142;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-UG8h37yj.js')).default;
const server_id = "src/routes/(app)/(third-party)/compliance-assessments/[id=uuid]/table-mode/+page.server.ts";
const imports = ["_app/immutable/nodes/142.CaYhXsMe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/xTkX8pvu.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/CsQxgAcg.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/CQ6GKnZn.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/DVwtFNnP.js","_app/immutable/chunks/DDdh9g1Y.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/DjBCuBoH.js","_app/immutable/chunks/4PllBcGo.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/4XQSSWM9.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/BeLFEG_F.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CNFco8Jp.js","_app/immutable/chunks/B5eY5Twp.js","_app/immutable/chunks/BNG8HIYT.js","_app/immutable/chunks/QcaToWeB.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/142.DVZmnp9I.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=142-BXxdh7TS.js.map
