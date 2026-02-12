import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { h as headData } from './crud-a52dcxCi.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './i18n-WNCV45cf.js';
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
  return {
    requirementAssessment,
    complianceAssessmentScore,
    requirement,
    parent,
    tables,
    title: requirementAssessment.name
  };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 139;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BIXTnId_.js')).default;
const server_id = "src/routes/(app)/(third-party)/requirement-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/139.DTF4shrV.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/Dne1jDS_.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=139-actKXJ9U.js.map
