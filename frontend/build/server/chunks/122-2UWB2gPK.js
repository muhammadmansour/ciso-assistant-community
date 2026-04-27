import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { aQ as librarysuccessfullyunloaded2, ar as librarysuccessfullyloaded2, aR as errorunloadinglibrary2, aS as errorloadinglibrary2 } from './_index-D7NdhnXA.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, params, url }) => {
  let endpoint = `/stored-libraries/${params.id}`;
  const queryParams = url.searchParams.toString();
  let library = await fetch(`${endpoint}?${queryParams}`).then((res) => res.json());
  const isExclusivelyLoaded = !library.builtin && Object.keys(library.objects).length === 0;
  if (isExclusivelyLoaded) {
    const loadedLibraryId = library.loaded_library;
    if (loadedLibraryId !== null) {
      endpoint = `/loaded-libraries/${loadedLibraryId}`;
      library = await fetch(`${endpoint}?${queryParams}`).then((res) => res.json());
    } else {
      console.error("Loaded library id not found.");
    }
  }
  return {
    tree: fetch(`${endpoint}/tree?${queryParams}`).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch tree: ${res.status}`);
      return res.json();
    }).catch((error) => {
      console.error("Error fetching tree:", error);
      return {};
    }),
    library,
    title: library.name
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const actions = {
  load: async (event) => {
    const endpoint = `${BASE_API_URL}/stored-libraries/${event.params.id}/import/`;
    const res = await event.fetch(endpoint, { method: "POST" });
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      setFlash({ type: "error", message: safeTranslate(response.error) }, event);
      return fail(400, { error: errorloadinglibrary2() });
    }
    setFlash(
      {
        type: "success",
        message: librarysuccessfullyloaded2()
      },
      event
    );
  },
  unload: async (event) => {
    const endpoint = `${BASE_API_URL}/stored-libraries/${event.params.id}/unload/`;
    const res = await event.fetch(endpoint, { method: "POST" });
    if (!res.ok) {
      const response = await res.json();
      console.error("server response:", response);
      setFlash({ type: "error", message: safeTranslate(response.error) }, event);
      return fail(400, { error: errorunloadinglibrary2() });
    }
    setFlash(
      {
        type: "success",
        message: librarysuccessfullyunloaded2()
      },
      event
    );
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 122;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BXHSWpYr.js')).default;
const universal_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.ts";
const server_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/122.BTqPoElR.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BwRFFv-D.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BpRvXDDW.js","_app/immutable/chunks/ZaMO6TYE.js","_app/immutable/chunks/BjA36f5m.js","_app/immutable/chunks/B8c8IZ2F.js","_app/immutable/chunks/akXf4f6w.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DYe3QhYO.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/CupZpfII.js","_app/immutable/chunks/BF9nWzJO.js","_app/immutable/chunks/mj0iRK6K.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/R8gvUloL.js","_app/immutable/chunks/BDxSJf1Y.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/CkOCGQaT.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/D8Gxr-3A.js","_app/immutable/chunks/DFfMjrxh.js","_app/immutable/chunks/Cl-5TEJQ.js","_app/immutable/chunks/C-y7m8Xz.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/B3fg5SyU.js","_app/immutable/chunks/BbwbtmDq.js","_app/immutable/chunks/0--ViT83.js","_app/immutable/chunks/BjX_gPKF.js","_app/immutable/chunks/DXX2oVrC.js","_app/immutable/chunks/Dsbjj89E.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=122-2UWB2gPK.js.map
