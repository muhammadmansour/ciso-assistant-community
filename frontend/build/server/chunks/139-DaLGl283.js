import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-7XzjN-Wp.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
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
import './i18n-DuIONS9Q.js';
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

const index = 139;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C_oJi6N7.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/139.B7-dVmo-.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/D3ZgDwhJ.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/Iw60iEWA.js","_app/immutable/chunks/ajpFLBfR.js","_app/immutable/chunks/ht1VpMBO.js","_app/immutable/chunks/Bsbn1dIn.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/gsEdW9eC.js","_app/immutable/chunks/D8xX82eC.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/Cg79WYI3.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/QaaLfru0.js","_app/immutable/chunks/XJAwOsbJ.js","_app/immutable/chunks/Bglazh2S.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/ETyirvYc.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/BPxbLiAc.js","_app/immutable/chunks/zlp6oXm8.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BkZ8p-97.js","_app/immutable/chunks/BuX6WnKy.js","_app/immutable/chunks/DBgPt7Gi.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BsIcXRUC.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/aZy3C1lL.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BX9gk6VB.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/CnDg-o9t.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=139-DaLGl283.js.map
