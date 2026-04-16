import { g as getModelInfo, b as urlParamModelSelectFields } from './crud-CFDLlT9z.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { m as modelSchema } from './schemas-DxPQoveO.js';
import { f as fail } from './index-BWA_9C9m.js';
import { a as nestedWriteFormAction, n as nestedDeleteFormAction } from './actions-CyUUnsJo.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-Syqrsmaf.js';
import './runtime-BKo9q3Zd.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
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

const index = 54;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CJO7NyD0.js')).default;
const server_id = "src/routes/(app)/(internal)/dashboards/[id=uuid]/layout/+page.server.ts";
const imports = ["_app/immutable/nodes/54.CHuLjYnm.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/-5iaCzCy.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/B8mbPAmK.js","_app/immutable/chunks/C1Av9eK7.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/RUegAlyn.js","_app/immutable/chunks/6DdwpPu7.js","_app/immutable/chunks/ySrrMr8y.js","_app/immutable/chunks/B2uwPNtE.js","_app/immutable/chunks/BHWq1_kx.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DgolYVi2.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/C6-SvHKR.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/jBfvTNCt.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BgAO3hZG.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/BH2Jr0az.js","_app/immutable/chunks/G1TSsRS0.js","_app/immutable/chunks/jLGvEFfk.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/Dka4TfVj.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/CtHqGYBK.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/Ba9ppyKn.js","_app/immutable/chunks/gfSVmNt7.js","_app/immutable/chunks/hNQJxmIa.js","_app/immutable/chunks/CWqDUYCZ.js","_app/immutable/chunks/C9yvPz1L.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/euVcTVGJ.js","_app/immutable/chunks/DZ-s9QyG.js","_app/immutable/chunks/Nisa6kzK.js","_app/immutable/chunks/DGKGIsrC.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=54-ComrjCZ_.js.map
