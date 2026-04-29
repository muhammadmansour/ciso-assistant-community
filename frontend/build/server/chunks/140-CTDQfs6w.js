import { a as nestedWriteFormAction, h as handleErrorResponse } from './actions-DRSM8X9N.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { a as urlParamModelVerboseName, g as getModelInfo, h as headData } from './crud-Dl9mduNa.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import { ba as createappliedcontrolsfromsuggestionssuccess5, bb as createappliedcontrolsfromsuggestionserror5, L as successfullyupdatedobject2, be as successfullysavedobject2 } from './_index-CqZWReca.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './i18n-DuIONS9Q.js';
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
import './utils-FiC4zhrQ.js';
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
  const acList = requirementAssessment.applied_controls;
  if (Array.isArray(acList) && acList.length > 0) {
    evidenceModel.appliedControlOptions = acList.filter((ac) => ac && ac.id && ac.str).map((ac) => ({
      label: ac.str,
      value: ac.id
    }));
  }
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
  const [aiAnalyses, auditLogEntries] = await Promise.all([
    fetchJson(`${baseUrl}/requirement-assessments/${params.id}/ai-analyses/`).then((d) => Array.isArray(d) ? d : []).catch(() => []),
    fetchJson(`${baseUrl}/requirement-assessments/${params.id}/audit-log/`).then((d) => {
      console.log("[RA-EDIT] audit-log result:", JSON.stringify(d)?.substring(0, 300));
      return Array.isArray(d) ? d : [];
    }).catch((e) => {
      console.error("[RA-EDIT] audit-log error:", e);
      return [];
    })
  ]);
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
    tables,
    aiAnalyses,
    auditLogEntries
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
  runAiAnalysis: async (event) => {
    try {
      const formData = await event.request.formData();
      const additionalPrompt = formData.get("additionalPrompt")?.toString() || "";
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(additionalPrompt ? { additional_prompt: additionalPrompt } : {})
      };
      const response2 = await event.fetch(
        `${BASE_API_URL}/requirement-assessments/${event.params.id}/run-ai-analysis/`,
        fetchOptions
      );
      if (!response2.ok) {
        const err = await response2.json().catch(() => ({}));
        return fail(response2.status, {
          aiError: err.message || err.detail || `Error ${response2.status}`
        });
      }
      const result = await response2.json();
      return { aiAnalysis: result };
    } catch (e) {
      console.error("[runAiAnalysis] Server action failed:", e);
      return fail(502, {
        aiError: e?.cause?.code === "ECONNREFUSED" ? "Backend server is not reachable. Please ensure the API server is running." : `Analysis request failed: ${e?.message || "Unknown error"}`
      });
    }
  },
  deleteAiAnalysis: async (event) => {
    const formData = await event.request.formData();
    const analysisId = formData.get("analysisId");
    if (!analysisId) {
      return fail(400, { error: "Missing analysis ID" });
    }
    const response2 = await event.fetch(
      `${BASE_API_URL}/requirement-assessments/${event.params.id}/ai-analyses/${analysisId}/delete/`,
      { method: "DELETE" }
    );
    if (!response2.ok) {
      return fail(response2.status, { error: "Failed to delete analysis" });
    }
    return { deleted: true };
  },
  applyAiAnalysis: async (event) => {
    const formData = await event.request.formData();
    const analysisId = formData.get("analysisId");
    if (!analysisId) {
      return fail(400, { error: "Missing analysis ID" });
    }
    const response2 = await event.fetch(
      `${BASE_API_URL}/requirement-assessments/${event.params.id}/apply-ai-analysis/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_id: analysisId })
      }
    );
    if (!response2.ok) {
      const err = await response2.json().catch(() => ({}));
      return fail(response2.status, { applyError: err.message || `Error ${response2.status}` });
    }
    const result = await response2.json();
    return { applyResult: result };
  },
  confirmAiWrite: async (event) => {
    const formData = await event.request.formData();
    const analysisId = formData.get("analysisId");
    const analysisDataStr = formData.get("analysisData");
    if (!analysisId && !analysisDataStr) {
      return fail(400, { confirmWriteError: "Missing analysis ID or analysis data" });
    }
    let body;
    if (analysisDataStr) {
      try {
        body = JSON.parse(analysisDataStr);
      } catch {
        return fail(400, { confirmWriteError: "Invalid analysis data" });
      }
    } else {
      body = { analysis_id: analysisId };
    }
    const response2 = await event.fetch(
      `${BASE_API_URL}/requirement-assessments/${event.params.id}/confirm-ai-write/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );
    if (!response2.ok) {
      const err = await response2.json().catch(() => ({}));
      return fail(response2.status, {
        confirmWriteError: err.message || `Error ${response2.status}`
      });
    }
    const result = await response2.json();
    setFlash(
      {
        type: "success",
        message: `AI values written successfully (${result.changed_fields?.join(", ") || "no changes"}). Status set to ${result.status}.`
      },
      event
    );
    return { confirmWriteResult: result };
  },
  logAiApply: async (event) => {
    const formData = await event.request.formData();
    const analysisId = formData.get("analysisId")?.toString() || "";
    const appliedFieldsStr = formData.get("appliedFields")?.toString() || "[]";
    const fieldChangesStr = formData.get("fieldChanges")?.toString() || "{}";
    let appliedFields = [];
    try {
      appliedFields = JSON.parse(appliedFieldsStr);
    } catch {
      appliedFields = [];
    }
    let fieldChanges = {};
    try {
      fieldChanges = JSON.parse(fieldChangesStr);
    } catch {
      fieldChanges = {};
    }
    const response2 = await event.fetch(
      `${BASE_API_URL}/requirement-assessments/${event.params.id}/log-ai-apply/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis_id: analysisId,
          applied_fields: appliedFields,
          field_changes: fieldChanges
        })
      }
    );
    if (!response2.ok) {
      return fail(response2.status, { logError: "Failed to log AI apply" });
    }
    return { logged: true };
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
const component = async () => component_cache ??= (await import('./_page.svelte-DZeRMzvA.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/140.C8P3KZgJ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/Bi_fmpDJ.js","_app/immutable/chunks/B6xGvAKi.js","_app/immutable/chunks/Rxart3gn.js","_app/immutable/chunks/DfJVBPAp.js","_app/immutable/chunks/Cry-brVu.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/gLPM1lLe.js","_app/immutable/chunks/CRiXYdiU.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BhEL2seE.js","_app/immutable/chunks/D60C9O1B.js","_app/immutable/chunks/CuLB3eUc.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DdLxYy2R.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BSlXmw9I.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DsdzjnHy.js","_app/immutable/chunks/DbbU6VTG.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BK6fI94v.js","_app/immutable/chunks/BX6nAo1d.js","_app/immutable/chunks/CClApH9G.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/JTiRBoea.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BDbwjVsq.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/Xaov5YdE.js","_app/immutable/chunks/Bri6rQyA.js","_app/immutable/chunks/DCxWm0lK.js","_app/immutable/chunks/DPHQtyJs.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DFYAaWcd.js","_app/immutable/chunks/DFQVLR12.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CepaMXkl.js","_app/immutable/chunks/DoShNErD.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/Dwr4wZVV.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=140-CTDQfs6w.js.map
