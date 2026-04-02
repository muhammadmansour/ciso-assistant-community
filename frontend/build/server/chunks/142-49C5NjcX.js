import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-CFDLlT9z.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
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
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
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

const index = 142;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D3sU5qyi.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/142.C1_Cvdya.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/2CZQ9Qas.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/FReDZ_qw.js","_app/immutable/chunks/BGbZf144.js","_app/immutable/chunks/cZfBtlpv.js","_app/immutable/chunks/Dcq7aqT9.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/BmquW6tW.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DnxS1xUl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CRXIl1sL.js","_app/immutable/chunks/GypDFm8U.js","_app/immutable/chunks/CMu4JNpn.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Cp6ZlS5W.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/m2JW8Yj9.js","_app/immutable/chunks/DId8Y7dd.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/S6ArlnII.js","_app/immutable/chunks/C8vWrQ0S.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DZEa1wkz.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Sm9Jgqru.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/smSB1e4k.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DffSj0ub.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=142-49C5NjcX.js.map
