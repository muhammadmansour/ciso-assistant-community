import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { f as fail } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = (async ({ fetch }) => {
  const foldersEndpoint = `${BASE_API_URL}/folders/`;
  const foldersRes = await fetch(foldersEndpoint);
  const foldersData = await foldersRes.json();
  const folders = foldersData.results || foldersData;
  const studiesEndpoint = `${BASE_API_URL}/ebios-rm/studies/`;
  const studiesRes = await fetch(studiesEndpoint);
  const studiesData = await studiesRes.json();
  const studies = studiesData.results || studiesData;
  return { folders, studies };
});
const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const type = formData.get("type");
    const itemsText = formData.get("items_text");
    const folderId = formData.get("folder");
    const studyId = formData.get("study");
    if (!itemsText || !itemsText.trim()) {
      return fail(400, {
        success: false,
        error: `Please enter at least one ${type}`
      });
    }
    let endpoint = "";
    let bodyKey = "";
    let containerKey = "";
    let containerId = "";
    let itemTypePlural = "";
    if (type === "assets") {
      if (!folderId) {
        return fail(400, { success: false, error: "Please select a folder" });
      }
      endpoint = `${BASE_API_URL}/assets/batch-create/`;
      bodyKey = "assets_text";
      containerKey = "folder";
      containerId = folderId;
      itemTypePlural = "assets";
    } else if (type === "entities") {
      if (!folderId) {
        return fail(400, { success: false, error: "Please select a folder" });
      }
      endpoint = `${BASE_API_URL}/entities/batch-create/`;
      bodyKey = "entities_text";
      containerKey = "folder";
      containerId = folderId;
      itemTypePlural = "entities";
    } else if (type === "feared-events") {
      if (!studyId) {
        return fail(400, { success: false, error: "Please select an EBIOS RM study" });
      }
      endpoint = `${BASE_API_URL}/ebios-rm/feared-events/batch-create/`;
      bodyKey = "feared_events_text";
      containerKey = "ebios_rm_study";
      containerId = studyId;
      itemTypePlural = "feared_events";
    } else {
      return fail(400, { success: false, error: "Invalid type" });
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          [bodyKey]: itemsText,
          [containerKey]: containerId
        })
      });
      const data = await response.json();
      if (!response.ok) {
        return fail(response.status, {
          success: false,
          error: data.error || `Failed to create ${itemTypePlural}`,
          type,
          ...data
        });
      }
      return {
        success: true,
        type,
        created: data.created,
        skipped: data.skipped || data.reused || 0,
        items: data[itemTypePlural] || data.assets,
        skipped_items: data[`skipped_${itemTypePlural}`] || data.reused_assets || [],
        errors: data.errors
      };
    } catch (error) {
      console.error(`Error creating ${itemTypePlural}:`, error);
      return fail(500, {
        success: false,
        type,
        error: `An error occurred while creating ${itemTypePlural}`
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 72;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CQuhUUqY.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/batch-create/+page.server.ts";
const imports = ["_app/immutable/nodes/72.DOIyFdar.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/2CZQ9Qas.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/FReDZ_qw.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/CMu4JNpn.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/DGKGIsrC.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=72-DCRIgl_x.js.map
