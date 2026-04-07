import { l as listViewFields, u as urlParamModelDescriptionKey, a as urlParamModelVerboseName } from './crud-DvwwKulO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DZs3gE-i.js';
import './runtime-B_ICGJZJ.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './i18n-MfjzxjGF.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';

const load = async ({ fetch, params }) => {
  const headData = listViewFields[params.model].body.reduce(
    (obj, key, index) => {
      obj[key] = listViewFields[params.model].head[index];
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
    table,
    modelVerboseName: urlParamModelVerboseName(params.model),
    modelDescriptionKey: urlParamModelDescriptionKey(params.model)
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/+layout.server.ts";
const imports = ["_app/immutable/nodes/20.DZPoDZpG.js","_app/immutable/chunks/GWrdd0wS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Ck4BDG7B.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-B8qvac0S.js.map
