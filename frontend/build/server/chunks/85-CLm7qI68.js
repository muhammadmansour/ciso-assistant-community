import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { d as defaultDeleteFormAction } from './actions-k5zPah0t.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { L as LibraryUploadSchema } from './schemas-BcDBvyDd.js';
import { l as listViewFields } from './crud-a52dcxCi.js';
import { a5 as libraryloadingerror2, a6 as librarysuccessfullyloaded2, a7 as nolibrarydetected2, a8 as libraries } from './_index-DEXNURl5.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as superValidate } from './superValidate-jp4VH0Pt.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-CkM6Syoc.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './helpers-Bm9n0CNG.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-CMqbeBUT.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-D2ILrLnm.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = (async ({ fetch: fetch2 }) => {
  const schema = objectType({ id: stringType() });
  const deleteForm = await superValidate(zod(schema));
  const uploadForm = await superValidate({}, zod(LibraryUploadSchema), { errors: false });
  const makeHeadData = (URLModel) => {
    return listViewFields[URLModel].body.reduce((obj, key, index) => {
      obj[key] = listViewFields[URLModel].head[index];
      return obj;
    }, {});
  };
  const storedLibrariesPromise = (async () => {
    const storedLibrariesEndpoint = `${BASE_API_URL}/stored-libraries/?ordering=-created_at`;
    const storedLibrariesResponse = await fetch2(storedLibrariesEndpoint);
    const storedLibraries = await storedLibrariesResponse.json();
    const prepareRow = (row) => {
      row.overview = [
        `Packager: ${row.packager}`,
        `Version: ${row.version}`,
        ...Object.entries(row.objects_meta).map(([key, value]) => `${key}: ${value}`)
      ];
      row.allowDeleteLibrary = row.reference_count && row.reference_count > 0 ? false : true;
    };
    storedLibraries.results.forEach(prepareRow);
    return {
      head: makeHeadData("stored-libraries"),
      meta: { urlmodel: "stored-libraries", ...storedLibraries },
      body: []
    };
  })();
  return {
    storedLibrariesTable: storedLibrariesPromise,
    deleteForm,
    uploadForm,
    title: libraries()
  };
});
const actions = {
  upload: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, zod(LibraryUploadSchema));
    if (formData.has("file")) {
      const { file } = Object.fromEntries(formData);
      const endpoint = `${BASE_API_URL}/stored-libraries/upload/`;
      const req = await event.fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Disposition": `attachment; filename=${file.name}`
        },
        body: file
      });
      if (!req.ok) {
        const response = await req.json();
        console.error(response);
        const translate_error = safeTranslate(response.error);
        const toast_error_message = translate_error ?? libraryloadingerror2() + "(" + response.error + ")";
        setFlash({ type: "error", message: toast_error_message }, event);
        delete form.data["file"];
        return fail(400, { form });
      }
      setFlash({ type: "success", message: librarysuccessfullyloaded2() }, event);
    } else {
      setFlash({ type: "error", message: nolibrarydetected2() }, event);
      return fail(400, { form });
    }
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: "stored-libraries" });
  },
  deleteAll: async (event) => {
    const endpoint = `${BASE_API_URL}/stored-libraries/delete-all/`;
    const response = await event.fetch(endpoint, { method: "DELETE" });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setFlash({ type: "error", message: errorData.message || "Failed to delete all libraries" }, event);
      return fail(500);
    }
    const result = await response.json().catch(() => ({}));
    setFlash({ type: "success", message: result.message || "All libraries deleted successfully" }, event);
    return { status: 200 };
  },
  fetchMuraji: async (event) => {
    const MURAJI_API_URL = "https://muraji-api.wathbahs.com/api/libraries";
    try {
      const murajiResponse = await fetch(MURAJI_API_URL);
      if (!murajiResponse.ok) {
        console.error("Failed to fetch from Muraji API:", murajiResponse.status);
        setFlash({ type: "error", message: "فشل في جلب المكتبات من مراجع" }, event);
        return fail(500);
      }
      const murajiData = await murajiResponse.json();
      if (!murajiData.success || !murajiData.data || murajiData.data.length === 0) {
        setFlash({ type: "warning", message: "لا توجد مكتبات متاحة في مراجع" }, event);
        return;
      }
      let successCount = 0;
      let updateCount = 0;
      let errorCount = 0;
      for (const library of murajiData.data) {
        try {
          const deleteEndpoint = `${BASE_API_URL}/stored-libraries/${encodeURIComponent(library.urn)}/`;
          const deleteResponse = await event.fetch(deleteEndpoint, { method: "DELETE" });
          const wasExisting = deleteResponse.ok;
          const libraryData = {
            urn: library.urn,
            locale: library.locale || "en",
            ref_id: library.ref_id,
            name: library.name,
            description: library.description || void 0,
            copyright: library.copyright || void 0,
            version: library.version,
            provider: library.provider || void 0,
            packager: library.packager || void 0,
            publication_date: library.publication_date ? library.publication_date.split("T")[0] : void 0,
            objects: library.content
          };
          Object.keys(libraryData).forEach((key) => {
            if (libraryData[key] === void 0) delete libraryData[key];
          });
          const jsonString = JSON.stringify(libraryData, null, 2);
          const filename = `${library.ref_id || "library"}.yaml`;
          const file = new Blob([jsonString], { type: "application/x-yaml" });
          const uploadEndpoint = `${BASE_API_URL}/stored-libraries/upload/`;
          const uploadResponse = await event.fetch(uploadEndpoint, {
            method: "POST",
            headers: {
              "Content-Disposition": `attachment; filename=${filename}`
            },
            body: file
          });
          if (uploadResponse.ok) {
            if (wasExisting) {
              updateCount++;
              console.log(`Updated library: ${library.name}`);
            } else {
              successCount++;
              console.log(`Added new library: ${library.name}`);
            }
          } else {
            const errorData = await uploadResponse.json().catch(() => ({}));
            console.error(`Failed to upload library ${library.name}:`, errorData);
            errorCount++;
          }
        } catch (libError) {
          console.error(`Error processing library ${library.name}:`, libError);
          errorCount++;
        }
      }
      const totalProcessed = successCount + updateCount;
      if (totalProcessed > 0) {
        let message = `تم مزامنة ${totalProcessed} مكتبة من مراجع`;
        if (updateCount > 0 && successCount > 0) {
          message = `تم مزامنة ${totalProcessed} مكتبة (${successCount} جديدة، ${updateCount} محدثة)`;
        } else if (updateCount > 0) {
          message = `تم تحديث ${updateCount} مكتبة من مراجع`;
        } else {
          message = `تم إضافة ${successCount} مكتبة جديدة من مراجع`;
        }
        setFlash({ type: "success", message }, event);
      } else if (errorCount > 0) {
        setFlash({
          type: "error",
          message: `فشل في المزامنة. الأخطاء: ${errorCount}`
        }, event);
      } else {
        setFlash({
          type: "info",
          message: "لا توجد مكتبات للمزامنة"
        }, event);
      }
    } catch (error) {
      console.error("Error fetching from Muraji:", error);
      setFlash({ type: "error", message: "خطأ في الاتصال بمراجع API" }, event);
      return fail(500);
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 85;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CGL-s4oN.js')).default;
const server_id = "src/routes/(app)/(internal)/libraries/+page.server.ts";
const imports = ["_app/immutable/nodes/85.Bz3GDOS0.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/Du06IfEv.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=85-CLm7qI68.js.map
