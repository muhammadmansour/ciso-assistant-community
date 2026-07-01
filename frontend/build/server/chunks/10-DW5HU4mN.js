import { l as loadDetail } from './load-Dnmys82m.js';
import { g as getModelInfo } from './crud-DA2NQw0x.js';
import './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index2-9icAqEyj.js';
import './schemas-vgtyOSI9.js';
import './_index-BQcvYRD4.js';
import './string-BMZjP7XX.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './superValidate-BmtJFExL.js';
import './index-BWA_9C9m.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './i18n-Y-FXalQc.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

const load = async (event) => {
  return await loadDetail({ event, model: getModelInfo("ebios-rm"), id: event.params.id });
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/+layout.server.ts";
const imports = ["_app/immutable/nodes/10.DsAuMeVr.js","_app/immutable/chunks/Cggp-D0v.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DrNqa-QT.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DW5HU4mN.js.map
