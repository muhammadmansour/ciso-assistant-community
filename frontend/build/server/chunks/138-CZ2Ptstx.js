import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { l as loadDetail } from './load-y7adB23o.js';
import { f as fail } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { n as nestedDeleteFormAction } from './actions-DRSM8X9N.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './runtime-BKo9q3Zd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-DuIONS9Q.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-5y-ookeO.js';
import './string-BMZjP7XX.js';
import './superValidate-BmtJFExL.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';
import './server-C682bpHT.js';

const load = async (event) => {
  const detailData = await loadDetail({ event, model: getModelInfo("evidences"), id: event.params.id });
  let aiAnalysis = null;
  let aiAnalysisUpdatedAt = null;
  let auditAnalysis = null;
  let auditAnalysisUpdatedAt = null;
  let questions = [];
  let typicalEvidence = [];
  let requirementsContext = [];
  let evidenceName = "";
  let evidenceDescription = "";
  try {
    const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/ai-analysis/`);
    if (res.ok) {
      const data = await res.json();
      aiAnalysis = data.ai_analysis;
      aiAnalysisUpdatedAt = data.ai_analysis_updated_at;
      auditAnalysis = data.audit_analysis;
      auditAnalysisUpdatedAt = data.audit_analysis_updated_at;
      questions = data.questions || [];
      typicalEvidence = data.typical_evidence || [];
      requirementsContext = data.requirements_context || [];
      evidenceName = data.evidence_name || "";
      evidenceDescription = data.evidence_description || "";
    }
  } catch (err) {
    console.warn("Failed to load AI analysis:", err);
  }
  return {
    ...detailData,
    aiAnalysis,
    aiAnalysisUpdatedAt,
    auditAnalysis,
    auditAnalysisUpdatedAt,
    questions,
    typicalEvidence,
    requirementsContext,
    evidenceName,
    evidenceDescription
  };
};
const actions = {
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  saveAiAnalysis: async (event) => {
    const formData = await event.request.formData();
    const analysisJson = formData.get("analysis");
    if (!analysisJson) {
      return fail(400, { error: "Analysis data is required" });
    }
    try {
      const analysis = JSON.parse(analysisJson);
      const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/ai-analysis/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis })
      });
      if (!res.ok) {
        const error = await res.text();
        return fail(res.status, { error });
      }
      const result = await res.json();
      return { success: true, aiAnalysisUpdatedAt: result.ai_analysis_updated_at };
    } catch (err) {
      return fail(500, { error: String(err) });
    }
  },
  saveAuditAnalysis: async (event) => {
    const formData = await event.request.formData();
    const analysisJson = formData.get("analysis");
    if (!analysisJson) {
      return fail(400, { error: "Analysis data is required" });
    }
    try {
      const analysis = JSON.parse(analysisJson);
      const res = await event.fetch(`${BASE_API_URL}/evidences/${event.params.id}/audit-analysis/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis })
      });
      if (!res.ok) {
        const error = await res.text();
        return fail(res.status, { error });
      }
      const result = await res.json();
      return { success: true, auditAnalysisUpdatedAt: result.audit_analysis_updated_at };
    } catch (err) {
      return fail(500, { error: String(err) });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 138;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CoTcvAXS.js')).default;
const server_id = "src/routes/(app)/(third-party)/evidences/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/138.D3lutfa-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/yLJMMzJM.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BwJRdD6p.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/CtCjae10.js","_app/immutable/chunks/C4KCxBn8.js","_app/immutable/chunks/Dr5TFleC.js","_app/immutable/chunks/CoJDK23Z.js","_app/immutable/chunks/DEGa2G7N.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BUbJGAeA.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/D3ihKsHD.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BHk3PUHp.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BETfEQc-.js","_app/immutable/chunks/PMrw91N4.js","_app/immutable/chunks/DjUEmYqv.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/lKHeYNKL.js","_app/immutable/chunks/bBjfn_pL.js","_app/immutable/chunks/YzQxoAoy.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/DZD5FXeF.js","_app/immutable/chunks/BoRmCqha.js","_app/immutable/chunks/DPJHgQpn.js","_app/immutable/chunks/DqFIBuaT.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/rmUBtRKB.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BPfKDjj4.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/BGW4jFhp.js","_app/immutable/chunks/DYjlp5Cv.js","_app/immutable/chunks/DY5QdkO9.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BTJIjIBk.js","_app/immutable/chunks/n66UJIcb.js","_app/immutable/chunks/CPKr3I14.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/DwW3IWC7.js","_app/immutable/chunks/BoDIzGah.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/B0PrKUfg.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=138-CZ2Ptstx.js.map
