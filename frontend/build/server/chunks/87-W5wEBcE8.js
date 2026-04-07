import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { au as librarysuccessfullyupdated2 } from './_index-DZs3gE-i.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, params, url }) => {
  const endpoint = `/loaded-libraries/${params.id}`;
  const queryParams = url.searchParams.toString();
  const library = await fetch(`${endpoint}?${queryParams}`).then((res) => res.json());
  return {
    tree: fetch(`${endpoint}/tree?${queryParams}`).then((res) => res.json()) ?? {},
    library,
    title: library.name
  };
};

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const actions = {
  update: async (event) => {
    const action = new URL(event.request.url).searchParams.get("action");
    const endpoint = `${BASE_API_URL}/loaded-libraries/${event.params.id}/update` + (action ? `?action=${action}` : "");
    const res = await event.fetch(endpoint);
    const result = await res.json();
    if (!res.ok) {
      if (result.error === "score_change_detected") {
        return fail(409, {
          error: "score_change_detected",
          choices: result.strategies
        });
      }
      setFlash(
        {
          type: "error",
          message: safeTranslate(result.error)
        },
        event
      );
    } else {
      setFlash(
        {
          type: "success",
          message: librarysuccessfullyupdated2()
        },
        event
      );
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 87;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BnuAVxxk.js')).default;
const universal_id = "src/routes/(app)/(internal)/loaded-libraries/[id=uuid]/+page.ts";
const server_id = "src/routes/(app)/(internal)/loaded-libraries/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/87.DI-Yqgzj.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BEk_uquL.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/CPdqmNzT.js","_app/immutable/chunks/7yfh3D8G.js","_app/immutable/chunks/Cokhj0i6.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DvxHSXZr.js","_app/immutable/chunks/QiiJKCdK.js","_app/immutable/chunks/Dcl9JJPO.js","_app/immutable/chunks/I45z91Uz.js","_app/immutable/chunks/nhcCvQES.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/COJRffFo.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/DCI0CEYj.js","_app/immutable/chunks/CZxxuQXT.js","_app/immutable/chunks/CVPAKgDb.js","_app/immutable/chunks/q10t23Jn.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C27n3hTy.js","_app/immutable/chunks/C0F604xr.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/D_hqV0xj.js","_app/immutable/chunks/CK5vqDQa.js","_app/immutable/chunks/Bc6Xdwc7.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/BM1KVRaL.js","_app/immutable/chunks/DxfjJhi7.js","_app/immutable/chunks/I0kP_jQg.js","_app/immutable/chunks/BppZ2EeA.js","_app/immutable/chunks/Cau80cIz.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BfFLuDP9.js","_app/immutable/chunks/Nj6b0sI-.js","_app/immutable/chunks/0--ViT83.js","_app/immutable/chunks/BjX_gPKF.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=87-W5wEBcE8.js.map
