import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { fail } from 'assert';
import { s as setFlash } from './server-C682bpHT.js';
import { a3 as backuploadingerror2, a4 as backuplowerversionerror3, a5 as backupgreaterversionerror3, a6 as backupversionerror2, a7 as backuprestore1 } from './_index-CqZWReca.js';
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

const index = 39;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-99PSYsWf.js')).default;
const server_id = "src/routes/(app)/(internal)/backup-restore/+page.server.ts";
const imports = ["_app/immutable/nodes/39.Xt-eo8rp.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/Bisu60EG.js","_app/immutable/chunks/By7DWaiU.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/CjZ5x19u.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/DYFB3whk.js","_app/immutable/chunks/CumOB_G-.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/BcWYpVoJ.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/BBE2L2kR.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/Bn1B7sWx.js","_app/immutable/chunks/JkyNnoux.js","_app/immutable/chunks/DktzCmbB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-1GMWR8j4.js.map
