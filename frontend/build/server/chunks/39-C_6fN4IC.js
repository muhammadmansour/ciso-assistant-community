import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { fail } from 'assert';
import { s as setFlash } from './server-C682bpHT.js';
import { a3 as backuploadingerror2, a4 as backuplowerversionerror3, a5 as backupgreaterversionerror3, a6 as backupversionerror2, a7 as backuprestore1 } from './_index-DZs3gE-i.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-DP2gLfQi.js')).default;
const server_id = "src/routes/(app)/(internal)/backup-restore/+page.server.ts";
const imports = ["_app/immutable/nodes/39.Deew-4nZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/EKaN1WfC.js","_app/immutable/chunks/DpHB2XBH.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/zapE1iAe.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BHLmlRYN.js","_app/immutable/chunks/ZsCMuETm.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/C89Qma3L.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/Br4_de63.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DGYMovtU.js","_app/immutable/chunks/CHoarrqc.js","_app/immutable/chunks/DktzCmbB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=39-C_6fN4IC.js.map
