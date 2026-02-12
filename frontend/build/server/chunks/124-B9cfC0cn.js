import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import { g as getModelInfo } from './crud-a52dcxCi.js';
import { ay as duedateupdatedsuccessfully3, az as observationupdatedsuccessfully2, aA as statusupdatedsuccessfully2 } from './_index-DEXNURl5.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-F7m95JiK.js';
import { s as setFlash } from './server-C682bpHT.js';
import './string-BMZjP7XX.js';
import { a as nestedWriteFormAction } from './actions-k5zPah0t.js';
import './schemas-BcDBvyDd.js';
import { l as loadDetail } from './load-JUAUX7rj.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
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
import './i18n-WNCV45cf.js';
import './index-server-D2ILrLnm.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';
import './superValidate-jp4VH0Pt.js';
import './zod-CkM6Syoc.js';
import './access-control-DaLcieub.js';

const load = async (event) => {
  const modelInfo = getModelInfo("task-nodes");
  const data = await loadDetail({
    event,
    model: modelInfo,
    id: event.params.id
  });
  return data;
};
const updateStatus = async (status, { fetch, params, cookies }) => {
  const updateData = { status };
  const response = await fetch(`${BASE_API_URL}/task-nodes/${params.id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData)
  });
  if (response.ok) {
    setFlash({ type: "success", message: statusupdatedsuccessfully2() }, cookies);
    return { success: true };
  } else {
    try {
      const error = await response.json();
      return fail(400, { error });
    } catch {
      return fail(400, { error: "Failed to update status" });
    }
  }
};
const actions = {
  addEvidenceRevision: async (event) => {
    return nestedWriteFormAction({ event, action: "create" });
  },
  pending: async (event) => updateStatus("pending", event),
  inProgress: async (event) => updateStatus("in_progress", event),
  cancelled: async (event) => updateStatus("cancelled", event),
  completed: async (event) => updateStatus("completed", event),
  updateObservation: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const observation = formData.get("observation");
    if (typeof observation !== "string") {
      return fail(400, { error: "Invalid observation value" });
    }
    const updateData = {
      observation
    };
    const response = await fetch(`${BASE_API_URL}/task-nodes/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: observationupdatedsuccessfully2() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  removeEvidence: async (event) => {
    const formData = await event.request.formData();
    const evidenceId = formData.get("evidenceId");
    const move = formData.get("move");
    if (typeof evidenceId !== "string") {
      return fail(400, { error: "Invalid evidence ID" });
    }
    const response = await event.fetch(
      `${BASE_API_URL}/task-nodes/${event.params.id}/remove_evidence/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ evidence_id: evidenceId, move: move === "true" })
      }
    );
    if (response.ok) {
      return { success: true };
    }
    const error = await response.json();
    return fail(400, { error });
  },
  updateDueDate: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const dueDate = formData.get("due_date");
    if (typeof dueDate !== "string") {
      return fail(400, { error: "Invalid due date value" });
    }
    const updateData = {
      due_date: dueDate
    };
    const response = await fetch(`${BASE_API_URL}/task-nodes/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: duedateupdatedsuccessfully3() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 124;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CPpBMss4.js')).default;
const server_id = "src/routes/(app)/(internal)/task-nodes/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/124.C7oW5T-_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/CrTZFt5Y.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/Du06IfEv.js","_app/immutable/chunks/CcRQ8Flx.js","_app/immutable/chunks/D4UI_6Dy.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/55-SY6v6.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/D7OXZgze.js","_app/immutable/chunks/BkbPj8Yk.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DJjNQ7jU.js","_app/immutable/chunks/CvKZIfiS.js","_app/immutable/chunks/D4QPgErx.js","_app/immutable/chunks/CSDgL083.js","_app/immutable/chunks/CUUOiLt8.js","_app/immutable/chunks/CvGSkAiO.js","_app/immutable/chunks/ErX8XOfP.js","_app/immutable/chunks/BVKgJQpL.js","_app/immutable/chunks/C9L3xy59.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CDZlW3TP.js","_app/immutable/chunks/CIYsOFIh.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=124-B9cfC0cn.js.map
