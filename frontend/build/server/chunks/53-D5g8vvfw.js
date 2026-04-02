import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
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
import './i18n-B-ZrD2ao.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './schemas-DxPQoveO.js';
import './string-BMZjP7XX.js';
import './superValidate-BmtJFExL.js';
import './index-BWA_9C9m.js';
import './zod-BTgf12zS.js';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';

const load = async (event) => {
  event.depends("dashboard:widgets");
  const detailData = await loadDetail({
    event,
    model: getModelInfo("dashboards"),
    id: event.params.id
  });
  const widgetsEndpoint = `${BASE_API_URL}/metrology/dashboard-widgets/?dashboard=${event.params.id}`;
  const widgetsResponse = await event.fetch(widgetsEndpoint);
  const widgetsData = widgetsResponse.ok ? await widgetsResponse.json() : { results: [] };
  const widgets = widgetsData.results || [];
  const widgetsWithSamples = await Promise.all(
    widgets.map(async (widget) => {
      const isBuiltinMetric = widget.is_builtin_metric || widget.target_content_type;
      if (isBuiltinMetric) {
        const targetContentType = widget.target_content_type;
        const targetObjectId = widget.target_object_id;
        if (!targetContentType || !targetObjectId) {
          return { ...widget, samples: [], builtinSamples: [] };
        }
        const builtinSamplesEndpoint = `${BASE_API_URL}/metrology/builtin-metric-samples/for_object/?content_type_id=${targetContentType}&object_id=${targetObjectId}`;
        const builtinSamplesResponse = await event.fetch(builtinSamplesEndpoint);
        const builtinSamplesData = builtinSamplesResponse.ok ? await builtinSamplesResponse.json() : [];
        return {
          ...widget,
          samples: [],
          builtinSamples: Array.isArray(builtinSamplesData) ? builtinSamplesData : []
        };
      } else {
        const metricInstanceId = widget.metric_instance?.id || widget.metric_instance;
        if (!metricInstanceId) return { ...widget, samples: [], builtinSamples: [] };
        const samplesEndpoint = `${BASE_API_URL}/metrology/custom-metric-samples/?metric_instance=${metricInstanceId}`;
        const samplesResponse = await event.fetch(samplesEndpoint);
        const samplesData = samplesResponse.ok ? await samplesResponse.json() : { results: [] };
        return {
          ...widget,
          samples: samplesData.results || [],
          builtinSamples: []
        };
      }
    })
  );
  return {
    ...detailData,
    widgets: widgetsWithSamples
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 53;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CVlI8n_j.js')).default;
const server_id = "src/routes/(app)/(internal)/dashboards/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/53.y0SO2tSH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=53-D5g8vvfw.js.map
