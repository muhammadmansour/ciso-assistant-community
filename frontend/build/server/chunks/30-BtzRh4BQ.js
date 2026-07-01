import { g as getModelInfo } from './crud-DA2NQw0x.js';
import { l as loadDetail } from './load-Dnmys82m.js';
import './index2-9icAqEyj.js';
import './_index-BQcvYRD4.js';
import './runtime-BKo9q3Zd.js';
import './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './schemas-vgtyOSI9.js';
import './string-BMZjP7XX.js';
import './superValidate-BmtJFExL.js';
import './index-BWA_9C9m.js';
import './zod-BTgf12zS.js';
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

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Tf0o3ZS1.js')).default;
const server_id = "src/routes/(app)/(internal)/actors/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/30.EXIwHAvv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/sDI6exkH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-BtzRh4BQ.js.map
