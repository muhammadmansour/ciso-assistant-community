import { g as getModelInfo, b as urlParamModelSelectFields } from './crud-DA2NQw0x.js';
import { l as loadDetail } from './load-Dnmys82m.js';
import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
import { f as fail } from './index-BWA_9C9m.js';
import { a as nestedWriteFormAction, n as nestedDeleteFormAction } from './actions-DcWiM4jj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './index2-9icAqEyj.js';
import './_index-BQcvYRD4.js';
import './runtime-BKo9q3Zd.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-Y-FXalQc.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './access-control-DaLcieub.js';
import './shared-server-BU2DVf8Q.js';
import './server-C682bpHT.js';
import './app-Ci0UE2-c.js';

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
  const firstFreeRow = widgets.length > 0 ? Math.max(...widgets.map((w) => (w.position_y || 0) + (w.height || 2))) : 0;
  const widgetModel = { ...getModelInfo("dashboard-widgets") };
  const widgetSchema = modelSchema("dashboard-widgets");
  const widgetCreateForm = await superValidate(
    {
      dashboard: event.params.id,
      folder: detailData.data.folder?.id || detailData.data.folder,
      position_y: firstFreeRow
    },
    zod(widgetSchema),
    { errors: false }
  );
  const textWidgetModel = { ...getModelInfo("dashboard-text-widgets") };
  const textWidgetSchema = modelSchema("dashboard-text-widgets");
  const textWidgetCreateForm = await superValidate(
    {
      dashboard: event.params.id,
      folder: detailData.data.folder?.id || detailData.data.folder,
      position_y: firstFreeRow,
      // Set text widget specific defaults
      chart_type: "text",
      time_range: "all_time",
      aggregation: "none",
      show_target: false,
      show_legend: false,
      height: 1
    },
    zod(textWidgetSchema),
    { errors: false }
  );
  const builtinWidgetModel = { ...getModelInfo("dashboard-builtin-widgets") };
  const builtinWidgetSchema = modelSchema("dashboard-builtin-widgets");
  const builtinWidgetCreateForm = await superValidate(
    {
      dashboard: event.params.id,
      folder: detailData.data.folder?.id || detailData.data.folder,
      position_y: firstFreeRow,
      time_range: "all_time",
      aggregation: "none",
      show_target: false
    },
    zod(builtinWidgetSchema),
    { errors: false }
  );
  const selectFields = urlParamModelSelectFields("dashboard-widgets");
  const selectOptions = {};
  for (const selectField of selectFields) {
    if (selectField.detail) continue;
    const url = `${BASE_API_URL}/${widgetModel.endpointUrl}/${selectField.field}/`;
    const response = await event.fetch(url);
    if (response.ok) {
      selectOptions[selectField.field] = await response.json().then(
        (data) => Object.entries(data).map(([key, value]) => ({
          label: value,
          value: selectField.valueType === "number" ? parseInt(key) : key
        }))
      );
    }
  }
  widgetModel.selectOptions = selectOptions;
  const supportedModelsEndpoint = `${BASE_API_URL}/metrology/builtin-metric-samples/supported_models/`;
  const supportedModelsResponse = await event.fetch(supportedModelsEndpoint);
  const supportedModels = supportedModelsResponse.ok ? await supportedModelsResponse.json() : {};
  builtinWidgetModel.selectOptions = selectOptions;
  return {
    ...detailData,
    widgets,
    widgetModel,
    widgetCreateForm,
    textWidgetModel,
    textWidgetCreateForm,
    builtinWidgetModel,
    builtinWidgetCreateForm,
    supportedModels
  };
};
const actions = {
  delete: async (event) => {
    return nestedDeleteFormAction({ event });
  },
  create: async (event) => {
    return nestedWriteFormAction({ event, action: "create" });
  },
  updateWidget: async (event) => {
    return nestedWriteFormAction({ event, action: "update" });
  },
  saveLayout: async (event) => {
    const formData = await event.request.formData();
    const widgetsJson = formData.get("widgets");
    if (!widgetsJson) {
      return fail(400, { error: "No widgets data provided" });
    }
    try {
      const widgets = JSON.parse(widgetsJson);
      const errors = [];
      for (const widget of widgets) {
        const response = await event.fetch(
          `${BASE_API_URL}/metrology/dashboard-widgets/${widget.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              position_x: widget.position_x,
              position_y: widget.position_y,
              width: widget.width,
              height: widget.height
            })
          }
        );
        if (!response.ok) {
          errors.push(`Failed to update widget ${widget.id}`);
        }
      }
      if (errors.length > 0) {
        return fail(500, { error: errors.join(", ") });
      }
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Failed to parse widgets data" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 55;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CqqPRQ_M.js')).default;
const server_id = "src/routes/(app)/(internal)/dashboards/[id=uuid]/layout/+page.server.ts";
const imports = ["_app/immutable/nodes/55.6qH3S35S.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/Dd0AG25a.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/Kwq5OM76.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/-P7ZJSWS.js","_app/immutable/chunks/BRBsIFsK.js","_app/immutable/chunks/K3lHh_Jd.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/BbbovJSy.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/j8r7vPVS.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C676ICGK.js","_app/immutable/chunks/S614vnmE.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=55-W_j-K1mo.js.map
