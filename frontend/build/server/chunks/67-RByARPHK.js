import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { g as getModelInfo } from './crud-BJ_TECqM.js';
import { l as loadDetail } from './load-Cwc3ScS1.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate, f as fail } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { ao as mailfailedtosend3, ap as mailsuccessfullysent2 } from './_index-DZs3gE-i.js';
import { s as setFlash } from './server-C682bpHT.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-QFT6TgyO.js';
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';

const load = async (event) => {
  return loadDetail({ event, model: getModelInfo("entity-assessments"), id: event.params.id });
};
const actions = {
  mailing: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();
    const schema = objectType({ urlmodel: stringType(), id: stringType().uuid() });
    const ComplianceAssessmentForm = await superValidate(formData, zod(schema));
    const urlmodel = ComplianceAssessmentForm.data.urlmodel;
    const id = ComplianceAssessmentForm.data.id;
    const endpoint = `${BASE_API_URL}/${urlmodel}/${id}/mailing/`;
    if (!ComplianceAssessmentForm.valid) {
      return fail(400, { form: ComplianceAssessmentForm });
    }
    const requestInitOptions = {
      method: "POST"
    };
    const res = await fetch(endpoint, requestInitOptions);
    if (!res.ok) {
      const response = await res.json();
      console.log(response.warning);
      if (response.warning) {
        for (const warning of response.warning) {
          setFlash({ type: "warning", message: safeTranslate(warning) }, cookies);
        }
        return fail(400, { form: ComplianceAssessmentForm });
      }
      setFlash({ type: "error", message: mailfailedtosend3() }, cookies);
      return fail(400, { form: ComplianceAssessmentForm });
    }
    setFlash({ type: "success", message: mailsuccessfullysent2() }, cookies);
    return { ComplianceAssessmentForm };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 67;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DjGn5B-t.js')).default;
const server_id = "src/routes/(app)/(internal)/entity-assessments/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/67.CHWJFqk4.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CyuO_K9h.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/B38VhOn4.js","_app/immutable/chunks/dKQsoG8S.js","_app/immutable/chunks/CuPblLYp.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DutDFo5s.js","_app/immutable/chunks/DYotTY_m.js","_app/immutable/chunks/Cfkg7lxO.js","_app/immutable/chunks/DoPwhYM4.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/nvK3-gr-.js","_app/immutable/chunks/Dm-jTGab.js","_app/immutable/chunks/RZeClddz.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/dzzbPx5I.js","_app/immutable/chunks/BXiyLsbQ.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DvSY28v2.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/5ZTKQjLk.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CWLGM_yx.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/DZmwvm-B.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/Cv4G-QpO.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/A2ruJfxM.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/ukgCg5ra.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DekCYVt1.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/pfsGfmwB.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/DIRO_7cb.js","_app/immutable/chunks/DQuhOwy3.js","_app/immutable/chunks/C8ZQAtcg.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/bMfKl0Bu.js","_app/immutable/chunks/hqNPRCvp.js","_app/immutable/chunks/B7sVGc0s.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/C5ITapJd.js","_app/immutable/chunks/ATWBsLVi.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CnDg-o9t.js","_app/immutable/nodes/136.beMuJbGc.js","_app/immutable/chunks/-yHsivc0.js","_app/immutable/chunks/C9h7wqLA.js","_app/immutable/chunks/DUuA4KWt.js","_app/immutable/chunks/BjX_gPKF.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.QcXBTdDg.css","_app/immutable/assets/136.DVZmnp9I.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=67-RByARPHK.js.map
