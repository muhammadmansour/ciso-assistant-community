import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { g as getModelInfo, h as headData } from './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { m as modelSchema } from './schemas-BcDBvyDd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-jp4VH0Pt.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './i18n-WNCV45cf.js';
import './index-server-D2ILrLnm.js';
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

const load = async ({ fetch, params }) => {
  const URLModel = "risk-matrices";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const model = getModelInfo(URLModel);
  const relatedModels = {};
  if (model.reverseForeignKeyFields) {
    await Promise.all(
      model.reverseForeignKeyFields.map(async (e) => {
        const table = {
          head: headData(e.urlModel),
          body: [],
          meta: []
        };
        const info = getModelInfo(e.urlModel);
        const urlModel = e.urlModel;
        const deleteForm = await superValidate(zod(objectType({ id: stringType().uuid() })));
        const createSchema = modelSchema(e.urlModel);
        const createForm = await superValidate(zod(createSchema));
        const selectOptions = {};
        if (info.selectFields) {
          for (const selectField of info.selectFields) {
            const url = `${BASE_API_URL}/${urlModel}/${selectField.field}/`;
            const response = await fetch(url);
            if (response.ok) {
              selectOptions[selectField.field] = await response.json().then(
                (data2) => Object.entries(data2).map(([key, value]) => ({
                  label: value,
                  value: selectField.valueType === "number" ? parseInt(key) : key
                }))
              );
            } else {
              console.error(
                `Failed to fetch data for ${selectField.field}: ${response.statusText}`
              );
            }
          }
        }
        relatedModels[e.urlModel] = {
          urlModel,
          info,
          table,
          deleteForm,
          createForm,
          selectOptions
        };
      })
    );
  }
  return { data, relatedModels, title: data.name };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-CUaIZceq.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-matrices/[id=uuid]/+layout.server.ts";
const imports = ["_app/immutable/nodes/15.JrAIqng2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C07P_6dm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15--lkqFdAd.js.map
