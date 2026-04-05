import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { d as defaultDeleteFormAction } from './actions-BkARH3Iu.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { L as LibraryUploadSchema } from './schemas-QFT6TgyO.js';
import { l as listViewFields } from './crud-BJ_TECqM.js';
import { aq as libraryloadingerror2, ar as librarysuccessfullyloaded2, as as nolibrarydetected2, at as libraries } from './_index-DZs3gE-i.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
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
import './index-server-DEEfjxiI.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DQaEpYUs.js')).default;
const server_id = "src/routes/(app)/(internal)/libraries/+page.server.ts";
const imports = ["_app/immutable/nodes/85.i6erd7Ib.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/C_W-JG_Y.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/n18PuKtG.js","_app/immutable/chunks/4Lm9pDcu.js","_app/immutable/chunks/Ce-fgsa6.js","_app/immutable/chunks/1kTZNG77.js","_app/immutable/chunks/C_7zaqWu.js","_app/immutable/chunks/BzE5Q-bq.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C2mU7KV0.js","_app/immutable/chunks/v0c-4HEf.js","_app/immutable/chunks/D5QIDPln.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/CZOeAODB.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DyRPdjoK.js","_app/immutable/chunks/KjelKKpX.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/BlRS6pjX.js","_app/immutable/chunks/B-zKsLIX.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/DX1P9kZX.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/CjzEUlAP.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DUvkjWI4.js","_app/immutable/chunks/DgxEu-cK.js","_app/immutable/chunks/DkKKDhwg.js","_app/immutable/chunks/j0e32_lr.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=85-DzScR-jq.js.map
