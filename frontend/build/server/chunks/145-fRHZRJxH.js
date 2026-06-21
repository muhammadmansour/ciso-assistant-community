import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-DzBk-fdF.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './_index-DiaVtc2Z.js';
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
import './i18n-CxHbQmwN.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DBpQYIYR.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/145.BSe9nVsM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/UJ54l1Kr.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/DNQ91mby.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/Bu07lyG3.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/DjBCuBoH.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/4PllBcGo.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/C7f_eY7G.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=145-fRHZRJxH.js.map
