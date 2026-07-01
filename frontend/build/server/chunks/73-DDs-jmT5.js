import { B as BASE_API_URL } from './constants-12fjCMiL.js';
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

const index = 73;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CQuhUUqY.js')).default;
const server_id = "src/routes/(app)/(internal)/experimental/batch-create/+page.server.ts";
const imports = ["_app/immutable/nodes/73.CDW0awrI.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CLo_fakv.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=73-DDs-jmT5.js.map
