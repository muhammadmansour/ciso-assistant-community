import { a as nestedWriteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { a as loadValidationFlowFormData } from './load-2WiqDzE7.js';
import { b as ComplianceAssessmentSchema } from './schemas-DxPQoveO.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail, s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { s as setFlash } from './server-C682bpHT.js';
import { aH as synctoappliedcontrolssuccess4, aI as synctoappliedcontrolserror4, ba as createappliedcontrolsfromsuggestionssuccess5, bb as createappliedcontrolsfromsuggestionserror5 } from './_index-Syqrsmaf.js';
import './i18n-B-ZrD2ao.js';
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

const index = 138;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-uCmxOvUB.js')).default;
const server_id = "src/routes/(app)/(third-party)/compliance-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/138.D-XC89z2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/Bv_2KU7F.js","_app/immutable/chunks/B38biiEb.js","_app/immutable/chunks/DfMerXkE.js","_app/immutable/chunks/DPc86hvl.js","_app/immutable/chunks/C27yzQ8a.js","_app/immutable/chunks/CHE6uwuL.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/D_cG4Iw_.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CKyiSSpV.js","_app/immutable/chunks/CFGSA6tb.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BZUeUmPC.js","_app/immutable/chunks/BCQ_4ir1.js","_app/immutable/chunks/DgUJt_kM.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/ClCczQwO.js","_app/immutable/chunks/CDSdclhD.js","_app/immutable/chunks/BT1uoX9-.js","_app/immutable/chunks/bZ3s6vC_.js","_app/immutable/chunks/DyhKPlAd.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/jUpsI3X9.js","_app/immutable/chunks/C4ctzM00.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/DEONS-jP.js","_app/immutable/chunks/XoOWtvkw.js","_app/immutable/chunks/up1YRzoZ.js","_app/immutable/chunks/DD3o7T_z.js","_app/immutable/chunks/BhBSYlEl.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/wVoF9I3c.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/DP2-kJHy.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/D2WGgYph.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CbO8kgXY.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DARvfLxl.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=138-ClpW0qRI.js.map
