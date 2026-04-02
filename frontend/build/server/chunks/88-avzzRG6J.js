import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { d as defaultDeleteFormAction } from './actions-D-d9MrSc.js';
import { s as safeTranslate } from './i18n-D3bRixKV.js';
import { L as LibraryUploadSchema } from './schemas-DWhEPmW4.js';
import { l as listViewFields } from './crud-T40TopyM.js';
import { aq as libraryloadingerror2, ar as librarysuccessfullyloaded2, as as nolibrarydetected2, at as libraries } from './_index-B12BAPce.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './helpers-Bm9n0CNG.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
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

const load = (async ({ fetch }) => {
  const storedLibrariesEndpoint = `${BASE_API_URL}/stored-libraries/`;
  const storedLibrariesResponse = await fetch(storedLibrariesEndpoint);
  const storedLibraries = await storedLibrariesResponse.json();
  const prepareRow = (row) => {
    row.overview = [
      `Packager: ${row.packager}`,
      `Version: ${row.version}`,
      ...Object.entries(row.objects_meta).map(([key, value]) => `${key}: ${value}`)
    ];
    row.allowDeleteLibrary = row.allowDeleteLibrary = row.reference_count && row.reference_count > 0 ? false : true;
  };
  storedLibraries.results.forEach(prepareRow);
  const makeHeadData = (URLModel) => {
    return listViewFields[URLModel].body.reduce((obj, key, index) => {
      obj[key] = listViewFields[URLModel].head[index];
      return obj;
    }, {});
  };
  const storedLibrariesTable = {
    head: makeHeadData("stored-libraries"),
    meta: { urlmodel: "stored-libraries", ...storedLibraries },
    body: []
  };
  const schema = objectType({ id: stringType() });
  const deleteForm = await superValidate(zod(schema));
  const uploadForm = await superValidate({}, zod(LibraryUploadSchema), { errors: false });
  return {
    storedLibrariesTable,
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
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 88;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5NdswHMS.js')).default;
const server_id = "src/routes/(app)/(internal)/libraries/+page.server.ts";
const imports = ["_app/immutable/nodes/88.OWbFwJVJ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BC0dUqy6.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DbavOtMe.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/Bwzqz9Gt.js","_app/immutable/chunks/DiXxokeg.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/CbkoIhbq.js","_app/immutable/chunks/ByGmc6od.js","_app/immutable/chunks/eCSK0cWp.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/BKebV0sf.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/0JDwt3lD.js","_app/immutable/chunks/BoGN8GaE.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/B0Bm_D1r.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/DtcMLj97.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/C9m63fBF.js","_app/immutable/chunks/Bnb3FT0W.js","_app/immutable/chunks/DV3dWjIj.js","_app/immutable/chunks/OXcUsewa.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=88-avzzRG6J.js.map
