import { a as nestedWriteFormAction, h as handleErrorResponse } from './actions-k5zPah0t.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { a as urlParamModelVerboseName, g as getModelInfo, h as headData } from './crud-a52dcxCi.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { m as modelSchema } from './schemas-BcDBvyDd.js';
import { aR as createappliedcontrolsfromsuggestionssuccess5, aS as createappliedcontrolsfromsuggestionserror5, k as successfullyupdatedobject2, aV as successfullysavedobject2 } from './_index-DEXNURl5.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate } from './superValidate-jp4VH0Pt.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './i18n-WNCV45cf.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './index-server-D2ILrLnm.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "requirement-assessments";
  const baseUrl = BASE_API_URL;
  const endpoint = `${baseUrl}/${URLModel}/${params.id}/`;
  async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}: ${res.statusText}`);
      return null;
    }
    return res.json();
  }
  const requirementAssessment = await fetchJson(endpoint);
  const requirement = requirementAssessment.requirement;
  const compliance_assessment_score = await fetchJson(
    `${baseUrl}/compliance-assessments/${requirementAssessment.compliance_assessment.id}/global_score/`
  );
  const parent = requirementAssessment.requirement.parent_requirement;
  const model = getModelInfo(URLModel);
  const object = { ...requirementAssessment };
  Object.keys(object).forEach((key) => {
    if (object[key] instanceof Object && "id" in object[key]) {
      object[key] = object[key].id;
    }
  });
  const schema = modelSchema(URLModel);
  object.evidences = object.evidences.map((evidence) => evidence.id);
  object.applied_controls = object.applied_controls.map((applied_control) => applied_control.id);
  object.security_exceptions = object.security_exceptions?.map((security_exception) => security_exception.id) ?? [];
  const form = await superValidate(object, zod(schema), { errors: true });
  const selectOptions = {};
  if (model.selectFields) {
    await Promise.all(
      model.selectFields.map(async (selectField) => {
        const url = `${baseUrl}/${URLModel}/${selectField.field}/`;
        const data = await fetchJson(url);
        if (data) {
          selectOptions[selectField.field] = Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }));
        }
      })
    );
  }
  model.selectOptions = selectOptions;
  const measureCreateSchema = modelSchema("applied-controls");
  const measureCreateForm = await superValidate(
    { folder: requirementAssessment.folder.id },
    zod(measureCreateSchema),
    { errors: false }
  );
  const measureModel = getModelInfo("applied-controls");
  const measureSelectOptions = {};
  if (measureModel.selectFields) {
    await Promise.all(
      measureModel.selectFields.map(async (selectField) => {
        const url = `${baseUrl}/applied-controls/${selectField.field}/`;
        const data = await fetchJson(url);
        if (data) {
          measureSelectOptions[selectField.field] = Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }));
        } else {
          console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
        }
      })
    );
  }
  measureModel["selectOptions"] = measureSelectOptions;
  const tables = {};
  await Promise.all(
    ["applied-controls", "evidences", "security-exceptions"].map(async (key) => {
      const table = {
        head: headData(key),
        body: [],
        meta: []
      };
      tables[key] = table;
    })
  );
  const evidenceModel = getModelInfo("evidences");
  const evidenceCreateSchema = modelSchema("evidences");
  const evidenceCreateForm = await superValidate(
    { requirement_assessments: [params.id], folder: requirementAssessment.folder.id },
    zod(evidenceCreateSchema),
    { errors: false }
  );
  const evidenceSelectOptions = {};
  if (evidenceModel.selectFields) {
    await Promise.all(
      evidenceModel.selectFields.map(async (selectField) => {
        const url = `${baseUrl}/evidences/${selectField.field}/`;
        const data = await fetchJson(url);
        if (data) {
          evidenceSelectOptions[selectField.field] = Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }));
        }
      })
    );
  }
  evidenceModel.selectOptions = evidenceSelectOptions;
  const securityExceptionModel = getModelInfo("security-exceptions");
  const securityExceptionCreateSchema = modelSchema("security-exceptions");
  const securityExceptionCreateForm = await superValidate(
    { requirement_assessments: [params.id], folder: requirementAssessment.folder.id },
    zod(securityExceptionCreateSchema),
    { errors: false }
  );
  const securityExceptionSelectOptions = {};
  if (securityExceptionModel.selectFields) {
    await Promise.all(
      securityExceptionModel.selectFields.map(async (selectField) => {
        const url = `${baseUrl}/security-exceptions/${selectField.field}/`;
        const data = await fetchJson(url);
        if (data) {
          securityExceptionSelectOptions[selectField.field] = Object.entries(data).map(
            ([key, value]) => ({
              label: value,
              value: selectField.valueType === "number" ? parseInt(key) : key
            })
          );
        }
      })
    );
  }
  securityExceptionModel.selectOptions = securityExceptionSelectOptions;
  return {
    URLModel,
    title: requirementAssessment.name,
    requirementAssessment,
    compliance_assessment_score,
    requirement,
    parent,
    model,
    form,
    measureCreateForm,
    measureModel,
    evidenceModel,
    evidenceCreateForm,
    securityExceptionModel,
    securityExceptionCreateForm,
    tables
  };
});
const actions = {
  updateRequirementAssessment: async (event) => {
    const URLModel = "requirement-assessments";
    const schema = modelSchema(URLModel);
    const endpoint = `${BASE_API_URL}/${URLModel}/${event.params.id}/`;
    const form = await superValidate(event.request, zod(schema));
    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }
    const formData = form.data;
    const requestInitOptions = {
      method: "PUT",
      body: JSON.stringify(formData)
    };
    const response2 = await event.fetch(endpoint, requestInitOptions);
    if (!response2.ok) return handleErrorResponse({ event, response: response2, form });
    const object = await response2.json();
    const model = urlParamModelVerboseName(URLModel);
    setFlash({ type: "success", message: successfullysavedobject2({ object: model }) }, event);
    if (formData.noRedirect) return;
    redirect(
      302,
      getSecureRedirect(event.url.searchParams.get("next")) || `/compliance-assessments/${object.compliance_assessment}/`
    );
  },
  createAppliedControl: async (event) => {
    const URLModel = "applied-controls";
    const schema = modelSchema(URLModel);
    const endpoint = `${BASE_API_URL}/${URLModel}/`;
    const form = await superValidate(event.request, zod(schema));
    if (!form.valid) {
      console.log(form.errors);
      return fail(400, { form });
    }
    const requestInitOptions = {
      method: "POST",
      body: JSON.stringify(form.data)
    };
    const response2 = await event.fetch(endpoint, requestInitOptions);
    if (!response2.ok) return handleErrorResponse({ event, response: response2, form });
    const measure = await response2.json();
    const requirementAssessmentEndpoint = `${BASE_API_URL}/requirement-assessments/${event.params.id}/`;
    const requirementAssessment = await event.fetch(`${requirementAssessmentEndpoint}object/`).then((res) => res.json());
    const measures = [...requirementAssessment.applied_controls, measure.id];
    const patchRequestInitOptions = {
      method: "PATCH",
      body: JSON.stringify({ applied_controls: measures })
    };
    const patchRes = await event.fetch(requirementAssessmentEndpoint, patchRequestInitOptions);
    if (!patchRes.ok) return handleErrorResponse({ event, response: patchRes, form });
    const model = urlParamModelVerboseName(URLModel);
    setFlash(
      {
        type: "success",
        message: successfullyupdatedobject2({ object: model })
      },
      event
    );
    return { form, newControls: [measure.id] };
  },
  createEvidence: async (event) => {
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject: false });
  },
  createSecurityException: async (event) => {
    const result = await nestedWriteFormAction({ event, action: "create" });
    return { form: result.form, newSecurityException: result.form.message.object.id };
  },
  createSuggestedControls: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = objectType({ id: stringType().uuid() });
    const form = await superValidate(formData, zod(schema));
    const response2 = await event.fetch(
      `/requirement-assessments/${event.params.id}/suggestions/applied-controls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response2.ok) {
      setFlash(
        {
          type: "success",
          message: createappliedcontrolsfromsuggestionssuccess5()
        },
        event
      );
    } else {
      setFlash(
        {
          type: "error",
          message: createappliedcontrolsfromsuggestionserror5()
        },
        event
      );
      return fail(400, { form });
    }
    const newControls = await response2.json().then((data) => data.map((e) => e.id));
    return { form, newControls };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 140;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B0DYxkp2.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/140.CrlkXW2Q.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CIYsOFIh.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/Dne1jDS_.js","_app/immutable/chunks/B8xn_2Of.js","_app/immutable/chunks/Cc9NI9e2.js","_app/immutable/chunks/Bsj4-EOi.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=140-CaRRCHvr.js.map
