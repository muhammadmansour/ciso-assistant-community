import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { fail } from 'assert';
import { s as setFlash } from './server-C682bpHT.js';
import { a7 as backuploadingerror2, a8 as backuplowerversionerror3, a9 as backupgreaterversionerror3, aa as backupversionerror2, ab as backuprestore1 } from './_index-DiaVtc2Z.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-p8zjLNus.js')).default;
const server_id = "src/routes/(app)/(internal)/backup-restore/+page.server.ts";
const imports = ["_app/immutable/nodes/42.CrOtKT4E.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CLuKt34k.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/BtyLsRRi.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=42-Cia84Ls4.js.map
