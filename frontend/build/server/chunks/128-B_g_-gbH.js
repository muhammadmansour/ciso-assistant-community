import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { aU as librarysuccessfullyunloaded2, av as librarysuccessfullyloaded2, aV as errorunloadinglibrary2, aW as errorloadinglibrary2 } from './_index-DiaVtc2Z.js';
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

const index = 128;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DzksbbB4.js')).default;
const universal_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.ts";
const server_id = "src/routes/(app)/(internal)/stored-libraries/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/128.BFCtNhd2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/DjBCuBoH.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/Ce8GddNi.js","_app/immutable/chunks/Dh2mm3P_.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/5qkRTYXy.js","_app/immutable/chunks/t7e6SG61.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/C5wQ4rjm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/4PllBcGo.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/DeVVeh9d.js","_app/immutable/chunks/EdYiJvSh.js","_app/immutable/chunks/BAckc3pE.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/D00etpsY.js","_app/immutable/chunks/DOjjH3MO.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/UJ54l1Kr.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/BbXA0IV_.js","_app/immutable/chunks/DNQ91mby.js","_app/immutable/chunks/Bu07lyG3.js","_app/immutable/chunks/hfNZ_YqU.js","_app/immutable/chunks/Dr-oTBwn.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DmmQ8CLd.js","_app/immutable/chunks/8RL6gUyV.js","_app/immutable/chunks/BTJ8N5Tp.js","_app/immutable/chunks/Dpn6nGJr.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/CwPF8urc.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=128-B_g_-gbH.js.map
