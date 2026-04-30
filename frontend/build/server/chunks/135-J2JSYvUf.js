import { a as nestedWriteFormAction } from './actions-DRSM8X9N.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { a as loadValidationFlowFormData } from './load-y7adB23o.js';
import { b as ComplianceAssessmentSchema } from './schemas-5y-ookeO.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail, s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { s as setFlash } from './server-C682bpHT.js';
import { aH as synctoappliedcontrolssuccess4, aI as synctoappliedcontrolserror4, ba as createappliedcontrolsfromsuggestionssuccess5, bb as createappliedcontrolsfromsuggestionserror5 } from './_index-CqZWReca.js';
import './i18n-DuIONS9Q.js';
import './index-BWA_9C9m.js';
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
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "compliance-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const objectEndpoint = `${endpoint}object/`;
  const res = await fetch(endpoint);
  const compliance_assessment = await res.json();
  const object = await fetch(objectEndpoint).then((res2) => res2.json());
  const tree = await fetch(`${endpoint}tree/`).then((res2) => res2.json());
  const compliance_assessment_donut_values = await fetch(
    `${BASE_API_URL}/${URLModel}/${params.id}/donut_data/`
  ).then((res2) => res2.json());
  const global_score = await fetch(`${BASE_API_URL}/${URLModel}/${params.id}/global_score/`).then(
    (res2) => res2.json()
  );
  const threats = await fetch(`${BASE_API_URL}/${URLModel}/${params.id}/threats_metrics/`).then(
    (res2) => res2.json()
  );
  const initialData = { baseline: compliance_assessment.id };
  const auditCreateForm = await superValidate(initialData, zod(ComplianceAssessmentSchema), {
    errors: false
  });
  const cloneInitialData = {
    baseline: compliance_assessment.id,
    framework: compliance_assessment.framework.id,
    perimeter: compliance_assessment.perimeter?.id
  };
  const auditCloneForm = await superValidate(cloneInitialData, zod(ComplianceAssessmentSchema), {
    errors: false
  });
  const auditModel = getModelInfo("compliance-assessments");
  const selectOptions = {};
  const frameworksMappings = await fetch(`/compliance-assessments/${params.id}/frameworks`).then(
    (res2) => res2.json()
  );
  if (auditModel.selectFields) {
    for (const selectField of auditModel.selectFields) {
      const url = `${BASE_API_URL}/compliance-assessments/${selectField.field}/`;
      const response = await fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  auditModel.selectOptions = selectOptions;
  const form = await superValidate(zod(objectType({ id: stringType().uuid() })));
  const { validationFlowForm } = await loadValidationFlowFormData({
    event: { fetch },
    folderId: compliance_assessment.folder.id,
    targetField: "compliance_assessments",
    targetIds: [params.id]
  });
  const appliedControlsRes = await fetch(
    `${BASE_API_URL}/compliance-assessments/${params.id}/action-plan/`
  );
  const appliedControlsList = appliedControlsRes.ok ? await appliedControlsRes.json() : [];
  const appliedControlsCount = Array.isArray(appliedControlsList) ? appliedControlsList.length : appliedControlsList?.count ?? 0;
  return {
    URLModel,
    compliance_assessment,
    auditCreateForm,
    auditCloneForm,
    auditModel,
    object,
    tree,
    compliance_assessment_donut_values,
    global_score,
    threats,
    form,
    frameworksMappings,
    validationFlowForm,
    appliedControlsCount,
    title: compliance_assessment.name
  };
});
const actions = {
  create: async (event) => {
    const request = event.request.clone();
    const formData = await request.formData();
    const form = await superValidate(formData, zod(ComplianceAssessmentSchema));
    const redirectToWrittenObject = Boolean(form.data.baseline);
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject });
  },
  createSuggestedControls: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = objectType({ id: stringType().uuid() });
    const form = await superValidate(formData, zod(schema));
    const response = await event.fetch(
      `/compliance-assessments/${event.params.id}/suggestions/applied-controls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.ok) {
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
    }
    return { form };
  },
  syncToActions: async (event) => {
    const formData = await event.request.formData();
    if (!formData) {
      return fail(400, { form: null });
    }
    const schema = objectType({ id: stringType().uuid() });
    const form = await superValidate(formData, zod(schema));
    const response = await event.fetch(
      `${BASE_API_URL}/compliance-assessments/${event.params.id}/syncToActions/?dry_run=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.ok) {
      setFlash(
        {
          type: "success",
          message: synctoappliedcontrolssuccess4()
        },
        event
      );
    } else {
      setFlash(
        {
          type: "error",
          message: synctoappliedcontrolserror4()
        },
        event
      );
    }
    return { form, message: { requirementAssessmentsSync: await response.json() } };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 135;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Din6PXgM.js')).default;
const server_id = "src/routes/(app)/(third-party)/compliance-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/135.DrqJbTsX.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/Deyl9ay-.js","_app/immutable/chunks/-4awm6M-.js","_app/immutable/chunks/D99trX1L.js","_app/immutable/chunks/Cl_oEvk1.js","_app/immutable/chunks/Dea9XOCA.js","_app/immutable/chunks/mkRX5WOJ.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BSEOsfuJ.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CBfCH5ws.js","_app/immutable/chunks/C8p4xJpV.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BvW_XqK-.js","_app/immutable/chunks/Bl4BwNwO.js","_app/immutable/chunks/j0X-jfdg.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BvMdzt-B.js","_app/immutable/chunks/Di5GfQD3.js","_app/immutable/chunks/ncXU_OKR.js","_app/immutable/chunks/ly6CK_uH.js","_app/immutable/chunks/BgthYudD.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/Bk7CUWxy.js","_app/immutable/chunks/BX4P3H95.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/BDL0-YgU.js","_app/immutable/chunks/CAxVH4T4.js","_app/immutable/chunks/D6ZsipTG.js","_app/immutable/chunks/CCFlK9v1.js","_app/immutable/chunks/NY2KszIJ.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C2kKdnbo.js","_app/immutable/chunks/DFYAaWcd.js","_app/immutable/chunks/kvQsCn1f.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/BzlJcvAA.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/iDfVcCIr.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/qg3IKhzc.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=135-J2JSYvUf.js.map
