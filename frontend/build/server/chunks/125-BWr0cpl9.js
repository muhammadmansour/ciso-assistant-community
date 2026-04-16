import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import { aQ as librarysuccessfullyunloaded2, ar as librarysuccessfullyloaded2, aR as errorunloadinglibrary2, aS as errorloadinglibrary2 } from './_index-Syqrsmaf.js';
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

const index = 125;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Kx9Hq0DF.js')).default;
const universal_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.ts";
const server_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/125.D27ALmJo.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/DLw7-9tS.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/Cmi2-9RM.js","_app/immutable/chunks/DEcTr0p1.js","_app/immutable/chunks/CeiJu8BG.js","_app/immutable/chunks/BTVavonq.js","_app/immutable/chunks/BePFwegX.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/BennqQSB.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/fcK6T74i.js","_app/immutable/chunks/DNW_qCUs.js","_app/immutable/chunks/C4dnATnP.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/Bcvmpxf5.js","_app/immutable/chunks/DjdVUKFv.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/DOvKn0aI.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/DmBWaf7C.js","_app/immutable/chunks/ScVvaQnh.js","_app/immutable/chunks/BmVCPbbO.js","_app/immutable/chunks/e80p6tav.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/Bm296bj5.js","_app/immutable/chunks/BEuWQ740.js","_app/immutable/chunks/C27yzQ8a.js","_app/immutable/chunks/CHE6uwuL.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/exXxy8zt.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=125-BWr0cpl9.js.map
