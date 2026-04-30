import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { l as loadDetail } from './load-y7adB23o.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-DRSM8X9N.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import { s as setFlash } from './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-DuIONS9Q.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';

const load = async (event) => {
  const modelInfo = getModelInfo("applied-controls");
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  const appliedControlSchema = modelSchema("applied-controls");
  const appliedControl = data.data;
  const initialDataDuplicate = {
    name: appliedControl.name,
    description: appliedControl.description
  };
  const appliedControlDuplicateForm = await superValidate(
    initialDataDuplicate,
    zod(appliedControlSchema),
    {
      errors: false
    }
  );
  let aiAnalyses = [];
  try {
    const analysesResponse = await event.fetch(
      `${BASE_API_URL}/applied-controls/${event.params.id}/ai-analyses/`
    );
    if (analysesResponse.ok) {
      aiAnalyses = await analysesResponse.json();
    }
  } catch (e) {
    console.error("Failed to load AI analyses:", e);
  }
  if (data.relatedModels?.["evidences"]) {
    const raIds = appliedControl.requirement_assessments ?? [];
    if (Array.isArray(raIds) && raIds.length > 0) {
      try {
        const raOptions = await Promise.all(
          raIds.map(async (raId) => {
            const raResp = await event.fetch(
              `${BASE_API_URL}/requirement-assessments/${raId}/`
            );
            if (raResp.ok) {
              const ra = await raResp.json();
              return { label: ra.str || ra.name || raId, value: raId };
            }
            return null;
          })
        );
        const filtered = raOptions.filter(Boolean);
        if (filtered.length > 0) {
          data.relatedModels["evidences"].requirementAssessmentOptions = filtered;
        }
      } catch (e) {
        console.error("Failed to load RA options for evidence form:", e);
      }
    }
  }
  return {
    ...data,
    duplicateForm: appliedControlDuplicateForm,
    aiAnalyses
  };
};
const actions = {
  create: async (event) => {
    return nestedWriteFormAction({ event, action: "create", redirectToWrittenObject: false });
  },
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  duplicate: async (event) => {
    const formData = await event.request.formData();
    const schema = modelSchema("applied-controls_duplicate");
    const form = await superValidate(formData, zod(schema));
    const endpoint = `${BASE_API_URL}/applied-controls/${event.params.id}/duplicate/`;
    if (!form.valid) {
      return fail(400, { form });
    }
    const response = await event.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form.data)
    });
    if (!response.ok) {
      return fail(400, { form });
    }
    setFlash({ type: "success", message: "Applied control duplicated successfully" }, event);
    return { form };
  },
  deleteAiAnalysis: async (event) => {
    const formData = await event.request.formData();
    const analysisId = formData.get("analysisId");
    if (!analysisId) {
      return fail(400, { error: "Missing analysis ID" });
    }
    const response = await event.fetch(
      `${BASE_API_URL}/applied-controls/${event.params.id}/ai-analyses/${analysisId}/delete/`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      return fail(response.status, { error: "Failed to delete analysis" });
    }
    return { deleted: true };
  },
  runAiAnalysis: async (event) => {
    const response = await event.fetch(
      `${BASE_API_URL}/applied-controls/${event.params.id}/run-ai-analysis/`,
      { method: "POST" }
    );
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return fail(response.status, { aiError: err.message || `Error ${response.status}` });
    }
    const result = await response.json();
    return { aiAnalysis: result };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 33;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C_rwLUhZ.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/33.CJIff2Bx.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/D8GN7Woh.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/Deyl9ay-.js","_app/immutable/chunks/-4awm6M-.js","_app/immutable/chunks/D99trX1L.js","_app/immutable/chunks/Cl_oEvk1.js","_app/immutable/chunks/CBfCH5ws.js","_app/immutable/chunks/C8p4xJpV.js","_app/immutable/chunks/CY_JNAng.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/BzlJcvAA.js","_app/immutable/chunks/j0X-jfdg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BvMdzt-B.js","_app/immutable/chunks/Di5GfQD3.js","_app/immutable/chunks/ncXU_OKR.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Bl4BwNwO.js","_app/immutable/chunks/BvW_XqK-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/ly6CK_uH.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BBSWRWbi.js","_app/immutable/chunks/BgthYudD.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/Bk7CUWxy.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BX4P3H95.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BSEOsfuJ.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/BDL0-YgU.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/CAxVH4T4.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/D6ZsipTG.js","_app/immutable/chunks/CCFlK9v1.js","_app/immutable/chunks/NY2KszIJ.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C2kKdnbo.js","_app/immutable/chunks/DFYAaWcd.js","_app/immutable/chunks/BOl5l214.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/D6s9Ol0c.js","_app/immutable/chunks/BYNJ0YHO.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=33-CtSZpZlw.js.map
