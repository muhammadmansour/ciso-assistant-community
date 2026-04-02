import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-CyUUnsJo.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo, b as urlParamModelSelectFields, l as listViewFields } from './crud-CFDLlT9z.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { ak as ebiosrmoperationalscenariossubtitle4, al as operationalscenarios1 } from './_index-Syqrsmaf.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
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
  const URLModel = "operational-scenarios";
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
  const selectFields = urlParamModelSelectFields(URLModel);
  const selectOptions = {};
  for (const selectField of selectFields) {
    if (selectField.detail) continue;
    const url = `${BASE_API_URL}/ebios-rm/studies/${params.id}/${selectField.field}/`;
    const response = await fetch(url);
    if (response.ok) {
      selectOptions[selectField.field] = await response.json().then(
        (data) => Object.entries(data).map(([key, value]) => ({
          label: value,
          value: selectField.valueType === "number" ? parseInt(key) : key
        }))
      );
    } else {
      console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
    }
  }
  const likelihoodChoicesEndpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/likelihood/`;
  const likelihoodChoicesResponse = await fetch(likelihoodChoicesEndpoint);
  if (likelihoodChoicesResponse.ok) {
    selectOptions["likelihood"] = await likelihoodChoicesResponse.json().then(
      (data) => Object.entries(data).map(([key, value]) => ({
        label: value,
        value: parseInt(key)
      }))
    );
  } else {
    console.error(`Failed to fetch data for likelihood: ${likelihoodChoicesResponse.statusText}`);
  }
  model["selectOptions"] = selectOptions;
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
    title: operationalscenarios1(),
    modelVerboseName: ebiosrmoperationalscenariossubtitle4()
  };
};
const actions = {
  create: async (event) => {
    return defaultWriteFormAction({
      event,
      urlModel: "operational-scenarios",
      action: "create"
      // redirectToWrittenObject: redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "operational-scenarios" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 67;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-kI5qwDAi.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/workshop-4/operational-scenario/+page.server.ts";
const imports = ["_app/immutable/nodes/67.2dJGjiXi.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/Dcq7aqT9.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/2CZQ9Qas.js","_app/immutable/chunks/FReDZ_qw.js","_app/immutable/chunks/BGbZf144.js","_app/immutable/chunks/cZfBtlpv.js","_app/immutable/chunks/BmquW6tW.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DnxS1xUl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CRXIl1sL.js","_app/immutable/chunks/GypDFm8U.js","_app/immutable/chunks/CMu4JNpn.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Cp6ZlS5W.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/m2JW8Yj9.js","_app/immutable/chunks/DId8Y7dd.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/S6ArlnII.js","_app/immutable/chunks/C8vWrQ0S.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/DZEa1wkz.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/Sm9Jgqru.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/smSB1e4k.js","_app/immutable/chunks/C7J2NfSz.js","_app/immutable/chunks/DDTQbaTq.js","_app/immutable/chunks/C1Sxa3Df.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/D2nSU3rO.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/B_8qo6Rv.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/CJTOR442.js","_app/immutable/chunks/CpM_1UxM.js","_app/immutable/chunks/DJ2RNDYD.js","_app/immutable/chunks/DZ-s9QyG.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=67-3HXD0K2s.js.map
