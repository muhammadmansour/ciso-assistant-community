import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-CfR18Idq.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo, b as urlParamModelSelectFields, l as listViewFields } from './crud-C1TvVbAO.js';
import { m as modelSchema } from './schemas-DwUKC0vK.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './_index-D7NdhnXA.js';
import './runtime-BKo9q3Zd.js';
import './i18n-CMphL55V.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch }) => {
  const schema = objectType({ id: stringType().uuid() });
  const deleteForm = await superValidate(zod(schema));
  const URLModel = "ebios-rm";
  const createSchema = modelSchema(URLModel);
  const createForm = await superValidate(zod(createSchema));
  const model = getModelInfo(URLModel);
  const selectFields = urlParamModelSelectFields(URLModel);
  const selectOptions = {};
  for (const selectField of selectFields) {
    if (selectField.detail) continue;
    const url = `${BASE_API_URL}/${model.endpointUrl || URLModel}/${selectField.field}/`;
    const response = await fetch(url);
    if (response.ok) {
      selectOptions[selectField.field] = await response.json().then(
        (data2) => Object.entries(data2).map(([key, value]) => ({
          label: value,
          value: selectField.valueType === "number" ? parseInt(key) : key
        }))
      );
    } else {
      console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
    }
  }
  model["selectOptions"] = selectOptions;
  const endpoint = `${BASE_API_URL}/${model.endpointUrl}/`;
  const res = await fetch(endpoint);
  await res.json().then((res2) => res2.results);
  const headData = listViewFields[URLModel].body.reduce(
    (obj, key, index) => {
      obj[key] = listViewFields[URLModel].head[index];
      return obj;
    },
    {}
  );
  const table = {
    head: headData,
    body: [],
    meta: []
  };
  return { createForm, deleteForm, model, URLModel, table };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "ebios-rm",
      action: "create"
      // redirectToWrittenObject: redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "ebios-rm" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 52;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BnbaWJKJ.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/+page.server.ts";
const imports = ["_app/immutable/nodes/52.71lcOenM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CkOCGQaT.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/BF9nWzJO.js","_app/immutable/chunks/mj0iRK6K.js","_app/immutable/chunks/D8Gxr-3A.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BDxSJf1Y.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BjA36f5m.js","_app/immutable/chunks/ZaMO6TYE.js","_app/immutable/chunks/akXf4f6w.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/DFfMjrxh.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Cl-5TEJQ.js","_app/immutable/chunks/C-y7m8Xz.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/CupZpfII.js","_app/immutable/chunks/BwRFFv-D.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DYe3QhYO.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/R8gvUloL.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B3fg5SyU.js","_app/immutable/chunks/BQPgO4fI.js","_app/immutable/chunks/kPOY5a4k.js","_app/immutable/chunks/D-2uz2sc.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/DM-zsmsQ.js","_app/immutable/chunks/UiKbey2w.js","_app/immutable/chunks/CznNz8-D.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/B2i_P9wT.js","_app/immutable/chunks/rem04sBf.js","_app/immutable/chunks/CA7kDHvJ.js","_app/immutable/chunks/BdmqudGw.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=52-DrOj-5S_.js.map
