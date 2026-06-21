import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { l as loadDetail } from './load-AOnXJHgd.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { n as nestedDeleteFormAction, a as nestedWriteFormAction } from './actions-3TqTFyN3.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import { s as setFlash } from './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './_index-DiaVtc2Z.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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
      const message2 = err.message || `Error ${response.status}`;
      setFlash(
        {
          type: err.code === "all_indexing_failed" ? "warning" : "error",
          message: message2
        },
        event
      );
      return fail(response.status, { aiError: message2, aiErrorCode: err.code });
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

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BkNz7j4B.js')).default;
const server_id = "src/routes/(app)/(internal)/applied-controls/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/36.C2-uw79w.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/DriSB2LX.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DU7syaJG.js","_app/immutable/chunks/CjMwYMKi.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/C7f_eY7G.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=36-DgU8-Nvw.js.map
