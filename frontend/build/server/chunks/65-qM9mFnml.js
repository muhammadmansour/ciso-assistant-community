import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-DRSM8X9N.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo, l as listViewFields } from './crud-Dl9mduNa.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { am as ebiosrmriskanalysessubtitle4, an as riskanalyses1 } from './_index-CqZWReca.js';
import './i18n-DuIONS9Q.js';
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
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch, url }) => {
  const schema = objectType({ id: stringType().uuid() });
  const deleteForm = await superValidate(zod(schema));
  const URLModel = "risk-assessments";
  const createSchema = modelSchema(URLModel);
  const ebiosMatrixRes = await fetch(`${BASE_API_URL}/ebios-rm/studies/${params.id}/risk-matrix/`);
  const risk_matrix_id = await ebiosMatrixRes.json().then((res) => res.id);
  const initialData = {
    ebios_rm_study: params.id,
    risk_matrix: risk_matrix_id
  };
  const createForm = await superValidate(initialData, zod(createSchema), { errors: false });
  const model = getModelInfo(URLModel);
  const selectFields = model.selectFields;
  const selectOptions = {};
  if (selectFields) {
    for (const selectField of selectFields) {
      const url2 = `${BASE_API_URL}/${URLModel}/${selectField.detail ? params.id + "/" : ""}${selectField.field}/`;
      const response = await fetch(url2);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  model["selectOptions"] = selectOptions;
  const headData = listViewFields[URLModel].body.reduce(
    (obj, key, index) => {
      obj[key] = listViewFields[URLModel].head[index];
      return obj;
    },
    {}
  );
  const table = {
    head: headData,
    body: [],
    meta: []
  };
  const riskAssessmentsRes = await fetch(
    `${BASE_API_URL}/risk-assessments/?ebios_rm_study=${params.id}`
  );
  let lastRiskAssessment = null;
  let riskAssessmentToSync = null;
  if (riskAssessmentsRes.ok) {
    const riskAssessments = await riskAssessmentsRes.json();
    if (riskAssessments.results && riskAssessments.results.length > 0) {
      lastRiskAssessment = riskAssessments.results[0];
    }
  }
  const syncId = url.searchParams.get("sync");
  if (syncId) {
    const syncRiskAssessmentRes = await fetch(`${BASE_API_URL}/risk-assessments/${syncId}/`);
    if (syncRiskAssessmentRes.ok) {
      riskAssessmentToSync = await syncRiskAssessmentRes.json();
    }
  }
  return {
    createForm,
    deleteForm,
    model,
    URLModel,
    table,
    lastRiskAssessment,
    riskAssessmentToSync,
    title: riskanalyses1(),
    modelVerboseName: ebiosrmriskanalysessubtitle4()
  };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "risk-assessments",
      action: "create"
      // redirectToWrittenObject: redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "risk-assessments" });
  },
  sync: async ({ request, fetch, params }) => {
    const formData = await request.formData();
    const riskAssessmentId = formData.get("risk_assessment_id");
    const response = await fetch(
      `${BASE_API_URL}/risk-assessments/${riskAssessmentId}/sync_from_ebios_rm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: `Synchronization complete: ${result.updated} updated, ${result.created} created, ${result.archived} archived`,
        result
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        message: error.error || "Synchronization failed"
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 65;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-_BL3nJVp.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-5/risk-analyses/+page.server.ts";
const imports = ["_app/immutable/nodes/65.C8Z0PkK7.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DhKfWlbp.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BTtl3X3J.js","_app/immutable/chunks/WpeF5x3B.js","_app/immutable/chunks/DiXVpoUi.js","_app/immutable/chunks/CpFnAMUI.js","_app/immutable/chunks/DftpLVPW.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/g_h12XRE.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/_5idpxm9.js","_app/immutable/chunks/eISZ6dvQ.js","_app/immutable/chunks/GX3nOdza.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Cyllo2R1.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CFI1T82Y.js","_app/immutable/chunks/DA9lfzba.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CIgI_RhK.js","_app/immutable/chunks/C2397wU4.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Dq7EhTmb.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/Dsu8Tylj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DvPuu-n_.js","_app/immutable/chunks/BGu8ncWJ.js","_app/immutable/chunks/Dw5vgcA8.js","_app/immutable/chunks/BYXxglA9.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/BkBp096Y.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BC-2JiHO.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/BWnHLJI6.js","_app/immutable/chunks/BfbFVIuQ.js","_app/immutable/chunks/DeptTlK1.js","_app/immutable/chunks/n66UJIcb.js","_app/immutable/chunks/DHl383Ih.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=65-qM9mFnml.js.map
