import { g as getModelInfo, b as urlParamModelSelectFields } from './crud-a52dcxCi.js';
import { l as loadDetail } from './load-JUAUX7rj.js';
import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { m as modelSchema } from './schemas-BcDBvyDd.js';
import { f as fail } from './index-BWA_9C9m.js';
import { a as nestedWriteFormAction, n as nestedDeleteFormAction } from './actions-k5zPah0t.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate } from './superValidate-jp4VH0Pt.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
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

const index = 51;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ZSsTFeJU.js')).default;
const server_id = "src/routes/(app)/(internal)/dashboards/[id=uuid]/layout/+page.server.ts";
const imports = ["_app/immutable/nodes/51.BGmIaQRH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CIYsOFIh.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/BMJr_BuD.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=51-Ce9Piin_.js.map
