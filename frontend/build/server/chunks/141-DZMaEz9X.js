import { g as getModelInfo } from './crud-T40TopyM.js';
import { l as loadDetail } from './load-D8rN0pt8.js';
import { f as fail } from './index-BWA_9C9m.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { n as nestedDeleteFormAction } from './actions-D-d9MrSc.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-B12BAPce.js';
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
import './i18n-D3bRixKV.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-DWhEPmW4.js';
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

const index = 141;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-eKaQdsNb.js')).default;
const server_id = "src/routes/(app)/(third-party)/evidences/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/141.BBIhBc-C.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D_ziI6Or.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/DiXxokeg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CbkoIhbq.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/ByGmc6od.js","_app/immutable/chunks/eCSK0cWp.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DtcMLj97.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BoGN8GaE.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/B0Bm_D1r.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/0JDwt3lD.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/FlbqS3HT.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/B8oQ-m9L.js","_app/immutable/chunks/CQ-I_rpG.js","_app/immutable/chunks/BdvIZy2L.js","_app/immutable/chunks/G2lGbBl3.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/b814Xneb.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/DIpaV91E.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DV3dWjIj.js","_app/immutable/chunks/TjnO645i.js","_app/immutable/chunks/C9m63fBF.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Bnb3FT0W.js","_app/immutable/chunks/qE79hGBN.js","_app/immutable/chunks/BC0dUqy6.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/Bwzqz9Gt.js","_app/immutable/chunks/BKebV0sf.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=141-DZMaEz9X.js.map
