import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-DA2NQw0x.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './_index-BQcvYRD4.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BpCge2eg.js';
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
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

const load = (async ({ fetch, params }) => {
  const URLModel = "requirement-assessments";
  const baseEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const requirementAssessment = await fetch(baseEndpoint).then((res) => res.json());
  const complianceAssessmentScore = await fetch(
    `${BASE_API_URL}/compliance-assessments/${requirementAssessment.compliance_assessment.id}/global_score/`
  ).then((res) => res.json());
  const requirement = requirementAssessment.requirement;
  const parent = requirementAssessment.requirement.parent_requirement;
  const tables = {};
  for (const key of ["applied-controls", "evidences"]) {
    const keyEndpoint = `${BASE_API_URL}/${key}/?requirement_assessments=${params.id}`;
    const response = await fetch(keyEndpoint);
    if (response.ok) {
      const table = {
        head: headData(key),
        body: [],
        meta: []
      };
      tables[key] = table;
    } else {
      console.error(`Failed to fetch data for ${key}: ${response.statusText}`);
    }
  }
  let auditLogEntries = [];
  try {
    const auditRes = await fetch(
      `${BASE_API_URL}/requirement-assessments/${params.id}/audit-log/`
    );
    if (auditRes.ok) {
      const data = await auditRes.json();
      auditLogEntries = Array.isArray(data) ? data : [];
    }
  } catch (e) {
    console.error("[RA-Detail] Failed to fetch audit log:", e);
  }
  return {
    requirementAssessment,
    complianceAssessmentScore,
    requirement,
    parent,
    tables,
    auditLogEntries,
    title: requirementAssessment.name
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 145;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DNz-2uMT.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/145.nTcMbGnu.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/Cu890w6c.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/S614vnmE.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/Dh8-nY5L.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/CGWWUgM5.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=145-C1zcnlXl.js.map
