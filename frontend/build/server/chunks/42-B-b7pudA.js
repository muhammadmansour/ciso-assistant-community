import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { fail } from 'assert';
import { s as setFlash } from './server-C682bpHT.js';
import { a3 as backuploadingerror2, a4 as backuplowerversionerror3, a5 as backupgreaterversionerror3, a6 as backupversionerror2, a7 as backuprestore1 } from './_index-Syqrsmaf.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async (event) => {
  return { title: backuprestore1() };
};
const actions = {
  default: async (event) => {
    const { request, fetch } = event;
    const formData = Object.fromEntries(await request.formData());
    if (!formData.file?.name || formData.file?.name === "undefined") {
      return fail(400, {
        error: true,
        message: "You must provide a file to upload"
      });
    }
    const { file } = formData;
    const endpoint = `${BASE_API_URL}/serdes/load-backup/`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Content-Type": file.type
      },
      body: file
    });
    const data = await response.json();
    if (response.status >= 400) {
      console.error(data);
      switch (data.error) {
        case "errorBackupInvalidVersion":
          setFlash({ type: "error", message: backupversionerror2() }, event);
          break;
        case "InvalidSchemaVersion":
          setFlash({ type: "error", message: backupversionerror2() }, event);
          break;
        case "GreaterBackupVersion":
          setFlash({ type: "error", message: backupgreaterversionerror3() }, event);
          break;
        case "LowerBackupVersion":
          setFlash({ type: "error", message: backuplowerversionerror3() }, event);
          break;
        default:
          setFlash({ type: "error", message: backuploadingerror2() }, event);
          break;
      }
    }
    return {
      status: response.status,
      body: JSON.stringify(data)
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 42;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DJppvFY3.js')).default;
const server_id = "src/routes/(app)/(internal)/backup-restore/+page.server.ts";
const imports = ["_app/immutable/nodes/42.Bn9ryTX_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/BT1uoX9-.js","_app/immutable/chunks/DPc86hvl.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/DfMerXkE.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/Bv_2KU7F.js","_app/immutable/chunks/B38biiEb.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/jiCjniJ3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/DgUJt_kM.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/ClCczQwO.js","_app/immutable/chunks/CDSdclhD.js","_app/immutable/chunks/CBoLZ5_6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=42-B-b7pudA.js.map
