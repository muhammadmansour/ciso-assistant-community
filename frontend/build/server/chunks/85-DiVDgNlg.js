import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { d as defaultDeleteFormAction } from './actions-CfR18Idq.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { L as LibraryUploadSchema } from './schemas-DwUKC0vK.js';
import { l as listViewFields } from './crud-C1TvVbAO.js';
import { aq as libraryloadingerror2, ar as librarysuccessfullyloaded2, as as nolibrarydetected2, at as libraries } from './_index-D7NdhnXA.js';
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

const index = 85;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DTTS7wDU.js')).default;
const server_id = "src/routes/(app)/(internal)/libraries/+page.server.ts";
const imports = ["_app/immutable/nodes/85.B7gPIfr6.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BNnCwY0U.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/Cutloik7.js","_app/immutable/chunks/DJUALYxg.js","_app/immutable/chunks/Bz2RmOUB.js","_app/immutable/chunks/BOy2Mbul.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BljBstM0.js","_app/immutable/chunks/CXqJwRWy.js","_app/immutable/chunks/BioysWky.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/D6-SytI5.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DXxYvcKc.js","_app/immutable/chunks/DAr8lmNi.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/cXncnRiG.js","_app/immutable/chunks/BwPKvNLF.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/D_fj9-71.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/56bwJ4Jb.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CEUy1qHb.js","_app/immutable/chunks/MtHulqPh.js","_app/immutable/chunks/BfGsPLmp.js","_app/immutable/chunks/DotR3P8f.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.DQGZ0UTY.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=85-DiVDgNlg.js.map
