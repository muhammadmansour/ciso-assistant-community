import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-T40TopyM.js';
import { m as modelSchema } from './schemas-DWhEPmW4.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { b as defaultWriteFormAction } from './actions-D-d9MrSc.js';
import { e as edit } from './_index-B12BAPce.js';
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
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-D3bRixKV.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';
import './server-C682bpHT.js';

const load = async (event) => {
  const URLModel = "ro-to";
  const model = getModelInfo(URLModel);
  const schema = modelSchema(URLModel);
  const objectEndpoint = `${BASE_API_URL}/${model.endpointUrl}/${event.params.id}/object/`;
  const objectResponse = await event.fetch(objectEndpoint);
  const object = await objectResponse.json();
  const form = await superValidate(object, zod(schema), { errors: false });
  const selectFields = model.selectFields;
  const selectOptions = {};
  if (selectFields) {
    for (const selectField of selectFields) {
      const url = `${BASE_API_URL}/${model.endpointUrl}/${selectField.detail ? event.params.id + "/" : ""}${selectField.field}/`;
      const response = await event.fetch(url);
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
  }
  model.selectOptions = selectOptions;
  return { form, model, object, selectOptions, URLModel, title: edit() };
};
const actions = {
  default: async (event) => {
    return defaultWriteFormAction({ event, urlModel: "ro-to", action: "edit" });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 119;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bj5hlzbr.js')).default;
const server_id = "src/routes/(app)/(internal)/ro-to/[id=uuid]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/119.BOrPsCzZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CQ-I_rpG.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/DtcMLj97.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/DiXxokeg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CbkoIhbq.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/ByGmc6od.js","_app/immutable/chunks/eCSK0cWp.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BdvIZy2L.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/G2lGbBl3.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/BoGN8GaE.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B0Bm_D1r.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/0JDwt3lD.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/b814Xneb.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/DIpaV91E.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/DV3dWjIj.js","_app/immutable/chunks/TjnO645i.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/C9m63fBF.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Bnb3FT0W.js","_app/immutable/chunks/qE79hGBN.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=119-BsaDOn6V.js.map
