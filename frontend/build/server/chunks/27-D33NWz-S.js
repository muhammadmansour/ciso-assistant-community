import { g as getModelInfo } from './crud-a52dcxCi.js';
import { l as loadDetail } from './load-JUAUX7rj.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
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
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-BcDBvyDd.js';
import './string-BMZjP7XX.js';
import './superValidate-jp4VH0Pt.js';
import './index-BWA_9C9m.js';
import './zod-CkM6Syoc.js';
import './access-control-DaLcieub.js';

const load = async (event) => {
  const modelInfo = getModelInfo("actors");
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  return data;
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 27;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BqvQromP.js')).default;
const server_id = "src/routes/(app)/(internal)/actors/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/27.DBYRU84o.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/CPn7w5r0.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-D33NWz-S.js.map
