import { d as defaultDeleteFormAction, b as defaultWriteFormAction } from './actions-DcWiM4jj.js';
import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { g as getModelInfo, b as urlParamModelSelectFields } from './crud-DA2NQw0x.js';
import { m as modelSchema } from './schemas-vgtyOSI9.js';
import './utils-FiC4zhrQ.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { f as fail, s as superValidate, w as withFiles, a as setError, m as message } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { s as setFlash } from './server-C682bpHT.js';
import { b9 as successfullyimportedfolder2, ba as missinglibrariesinimport3 } from './_index-BQcvYRD4.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import './index-BWA_9C9m.js';
import './helpers-Bm9n0CNG.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './index-server-DEEfjxiI.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';

const load = async ({ params, fetch: fetch2 }) => {
  const schema = objectType({ id: stringType().uuid() });
  const deleteForm = await superValidate(zod(schema));
  const URLModel = params.model;
  const createSchema = modelSchema(params.model);
  const createForm = await superValidate(zod(createSchema));
  const model = getModelInfo(params.model);
  const selectFields = urlParamModelSelectFields(params.model);
  const selectOptions = {};
  for (const selectField of selectFields) {
    if (selectField.detail) continue;
    const url = model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/${selectField.field}/` : `${BASE_API_URL}/${params.model}/${selectField.field}/`;
    const response = await fetch2(url);
    if (response.ok) {
      selectOptions[selectField.field] = await response.json().then(
        (data) => Object.entries(data).map(([key, value]) => ({
          label: value,
          value: selectField.valueType === "number" ? parseInt(key) : key
        }))
      );
    } else {
      console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
    }
  }
  model["selectOptions"] = selectOptions;
  if (model.urlModel === "folders") {
    const folderImportForm = await superValidate(zod(modelSchema("folders-import")), {
      errors: false
    });
    model["folderImportForm"] = folderImportForm;
    model["folderImportModel"] = { urlModel: "folders-import" };
  }
  return { createForm, deleteForm, model, URLModel };
};
const actions = {
  create: async (event) => {
    const redirectToWrittenObject = Boolean(
      event.params.model === "entity-assessments" || event.params.model === "quantitative-risk-hypotheses" || event.params.model === "quantitative-risk-studies" || event.params.model === "quantitative-risk-scenarios"
    );
    return defaultWriteFormAction({
      event,
      urlModel: event.params.model,
      action: "create",
      redirectToWrittenObject
    });
  },
  delete: async (event) => {
    return defaultDeleteFormAction({ event, urlModel: event.params.model });
  },
  deleteAll: async (event) => {
    const urlModel = event.params.model;
    const endpoint = `${BASE_API_URL}/${urlModel}/delete-all/`;
    const response = await event.fetch(endpoint, { method: "DELETE" });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setFlash({ type: "error", message: errorData.message || `Failed to delete all ${urlModel}` }, event);
      return fail(response.status);
    }
    const result = await response.json().catch(() => ({}));
    setFlash({ type: "success", message: result.message || `All ${urlModel} deleted successfully` }, event);
    return { status: 200 };
  },
  fetchMuraji: async (event) => {
    const MURAJI_API_BASE_URL = (process.env.MURAJI_API_BASE_URL || "https://muraji-api.wathbah.dev").replace(/\/$/, "");
    const MURAJI_API_URL = process.env.MURAJI_LIBRARIES_API_URL || `${MURAJI_API_BASE_URL}/api/libraries`;
    console.log(`[fetchMuraji] syncing libraries from ${MURAJI_API_URL}`);
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
            } else {
              successCount++;
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
        let message2 = `تم مزامنة ${totalProcessed} مكتبة من مراجع`;
        if (updateCount > 0 && successCount > 0) {
          message2 = `تم مزامنة ${totalProcessed} مكتبة (${successCount} جديدة، ${updateCount} محدثة)`;
        } else if (updateCount > 0) {
          message2 = `تم تحديث ${updateCount} مكتبة من مراجع`;
        } else {
          message2 = `تم إضافة ${successCount} مكتبة جديدة من مراجع`;
        }
        setFlash({ type: "success", message: message2 }, event);
      } else if (errorCount > 0) {
        setFlash({ type: "error", message: `فشل في المزامنة. الأخطاء: ${errorCount}` }, event);
      } else {
        setFlash({ type: "info", message: "لا توجد مكتبات للمزامنة" }, event);
      }
    } catch (error) {
      console.error("Error fetching from Muraji:", error);
      setFlash({ type: "error", message: "خطأ في الاتصال بمراجع API" }, event);
      return fail(500);
    }
  },
  importFolder: async (event) => {
    const formData = await event.request.formData();
    if (!formData) return fail(400, { error: "No form data" });
    const form = await superValidate(formData, zod(modelSchema("folders-import")));
    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }
    const { file } = Object.fromEntries(formData);
    const endpoint = `${BASE_API_URL}/folders/import/${form.data.load_missing_libraries ? "?load_missing_libraries=true" : ""}`;
    const response = await event.fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Content-Type": file.type,
        "X-CISOAssistantDomainName": form.data.name
      },
      body: file
    });
    const res = await response.json();
    if (!response.ok && res.missing_libraries) {
      setError(form, "file", missinglibrariesinimport3());
      for (let i = 0; i < res.missing_libraries.length; i += 2) {
        const urn = res.missing_libraries[i];
        const version = res.missing_libraries[i + 1];
        setError(form, "non_field_errors", `${urn} v${version}`);
      }
      return message(form, { status: response.status });
    }
    if (!response.ok) {
      if (res.error) {
        setFlash({ type: "error", message: safeTranslate(res.error) }, event);
        return withFiles({ form });
      }
      Object.entries(res).forEach(([key, value]) => {
        setError(form, key, safeTranslate(value));
      });
      return fail(400, withFiles({ form }));
    }
    setFlash(
      {
        type: "success",
        message: successfullyimportedfolder2()
      },
      event
    );
    return withFiles({ form });
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 138;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D1Vdue5G.js')).default;
const server_id = "src/routes/(app)/(internal)/[model=urlmodel]/+page.server.ts";
const imports = ["_app/immutable/nodes/138.COFywtJe.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/DtLmfH2W.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/Dd0AG25a.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BOCygUvM.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/Kwq5OM76.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/BmrkMQKx.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/-P7ZJSWS.js","_app/immutable/chunks/BRBsIFsK.js","_app/immutable/chunks/K3lHh_Jd.js","_app/immutable/chunks/BS9CHHPD.js","_app/immutable/chunks/BbbovJSy.js","_app/immutable/chunks/C2txvMk6.js","_app/immutable/chunks/j8r7vPVS.js","_app/immutable/chunks/CLo_fakv.js","_app/immutable/chunks/DKf1wLJ3.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/C1G9yzwG.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/DMaCeYTR.js","_app/immutable/chunks/C676ICGK.js","_app/immutable/chunks/Cu890w6c.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/S614vnmE.js","_app/immutable/chunks/Dh8-nY5L.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/EYtGmEnQ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css","_app/immutable/assets/ModelTable.DyQ9FL4y.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=138-BywXPSn5.js.map
