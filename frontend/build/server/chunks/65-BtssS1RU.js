import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-3TqTFyN3.js';
import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo, l as listViewFields } from './crud-DzBk-fdF.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { ai as ebiosrmecosystemsubtitle3, aj as studytheecosystem2 } from './_index-DiaVtc2Z.js';
import './i18n-CxHbQmwN.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './index-server-DEEfjxiI.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch }) => {
  const schema = objectType({ id: stringType().uuid() });
  const deleteForm = await superValidate(zod(schema));
  const URLModel = "stakeholders";
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
  const radarEndpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/ecosystem_chart_data/`;
  const circularRadarEndpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/ecosystem_circular_chart_data/`;
  const radarRes = await fetch(radarEndpoint);
  const radar = await radarRes.json();
  const circularRadarRes = await fetch(circularRadarEndpoint);
  const circularRadar = await circularRadarRes.json();
  return {
    createForm,
    deleteForm,
    model,
    URLModel,
    table,
    radar,
    circularRadar,
    title: studytheecosystem2(),
    modelVerboseName: ebiosrmecosystemsubtitle3()
  };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "stakeholders",
      action: "create"
      // redirectToWrittenObject: redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "stakeholders" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 65;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Jm7zYu02.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-3/ecosystem/+page.server.ts";
const imports = ["_app/immutable/nodes/65.wWwthoBS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/BKB2mZIY.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/1tuvt7k8.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js","_app/immutable/chunks/qJq9xA7u.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=65-BtssS1RU.js.map
