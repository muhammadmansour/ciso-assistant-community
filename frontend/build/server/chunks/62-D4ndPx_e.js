import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-D4nMzkWR.js';
import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo, l as listViewFields } from './crud-CUvW5I-u.js';
import { m as modelSchema } from './schemas-DwUKC0vK.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { ag as ebiosrmstrategicscenariossubtitle4, ah as strategicscenarios1 } from './_index-D7NdhnXA.js';
import './i18n-CMphL55V.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
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
  const URLModel = "strategic-scenarios";
  const createSchema = modelSchema(URLModel);
  const objectEndpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/object/`;
  const objectResponse = await fetch(objectEndpoint);
  let object = {};
  if (objectResponse.ok) {
    object = await objectResponse.json();
  } else {
    console.error(`Failed to fetch study object: ${objectResponse.statusText}`);
  }
  const initialData = {
    ebios_rm_study: params.id,
    folder: object.folder
  };
  const createForm = await superValidate(initialData, zod(createSchema), { errors: false });
  const model = getModelInfo(URLModel);
  const selectOptions = {};
  if (model.selectFields) {
    await Promise.all(
      model.selectFields.map(async (selectField) => {
        const url = model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/${selectField.field}/` : `${BASE_API_URL}/${model.urlModel}/${selectField.field}/`;
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to fetch data from ${url}: ${response.statusText}`);
          return null;
        }
        const data = await response.json();
        if (data) {
          selectOptions[selectField.field] = Object.entries(data).map(([key, value]) => ({
            label: value,
            value: key
          }));
        }
      })
    );
  }
  model.selectOptions = selectOptions;
  const missingAttackPathResponse = await fetch(
    `${BASE_API_URL}/ebios-rm/strategic-scenarios/?ebios_rm_study=${params.id}&attack_paths__isnull=true`
  );
  const scenariosWithoutAttackPath = missingAttackPathResponse.ok ? await missingAttackPathResponse.json() : [];
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
  return {
    createForm,
    deleteForm,
    model,
    URLModel,
    table,
    scenariosWithoutAttackPath,
    title: strategicscenarios1(),
    modelVerboseName: ebiosrmstrategicscenariossubtitle4()
  };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "strategic-scenarios",
      action: "create"
      // redirectToWrittenObject: redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "strategic-scenarios" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 62;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-G0fobjll.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-3/strategic-scenarios/+page.server.ts";
const imports = ["_app/immutable/nodes/62.DZUXPqYW.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/CRyXR1_7.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/DBgftaV0.js","_app/immutable/chunks/B52KtIH2.js","_app/immutable/chunks/CAJjCORN.js","_app/immutable/chunks/ng3-XvhC.js","_app/immutable/chunks/BqCfcmu_.js","_app/immutable/chunks/BBfOVcXt.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/D7UX7pJP.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/I3BpkvBT.js","_app/immutable/chunks/C0MxnyOL.js","_app/immutable/chunks/D-5hzFoF.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/Y0uuF1Y2.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DxVupoGb.js","_app/immutable/chunks/D7dzO6Di.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BbEHMOl_.js","_app/immutable/chunks/DsAzGKm3.js","_app/immutable/chunks/LFsjc1vZ.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/C6vFO4ME.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/Qr19s6a2.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CFlp8yFl.js","_app/immutable/chunks/DxhplRce.js","_app/immutable/chunks/Dq6cAFhK.js","_app/immutable/chunks/xHolm7g8.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/D8LMfAQ1.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/9kmwKCQu.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/wZvLFMGa.js","_app/immutable/chunks/BKsd9-rb.js","_app/immutable/chunks/C1egAJgw.js","_app/immutable/chunks/r0XwSFUj.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=62-D4ndPx_e.js.map
