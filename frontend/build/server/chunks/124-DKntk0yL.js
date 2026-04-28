import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo } from './crud-Dl9mduNa.js';
import { aT as duedateupdatedsuccessfully3, aU as observationupdatedsuccessfully2, aV as statusupdatedsuccessfully2 } from './_index-CqZWReca.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as setFlash } from './server-C682bpHT.js';
import './string-BMZjP7XX.js';
import { a as nestedWriteFormAction } from './actions-DRSM8X9N.js';
import './schemas-5y-ookeO.js';
import { l as loadDetail } from './load-y7adB23o.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
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
import './i18n-DuIONS9Q.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './app-Ci0UE2-c.js';
import './superValidate-BmtJFExL.js';
import './zod-BTgf12zS.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-BAkioOKb.js')).default;
const server_id = "src/routes/(app)/(internal)/task-nodes/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/124.BEChKklA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/vLHVOpPe.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/lKHeYNKL.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/bBjfn_pL.js","_app/immutable/chunks/C4KCxBn8.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Dr5TFleC.js","_app/immutable/chunks/C9h7wqLA.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CoJDK23Z.js","_app/immutable/chunks/CtCjae10.js","_app/immutable/chunks/DEGa2G7N.js","_app/immutable/chunks/BySE3870.js","_app/immutable/chunks/DY5QdkO9.js","_app/immutable/chunks/BoRmCqha.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/BUbJGAeA.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/BwJRdD6p.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/DPJHgQpn.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/DqFIBuaT.js","_app/immutable/chunks/Cs4kK__g.js","_app/immutable/chunks/D3ihKsHD.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/BHk3PUHp.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/BETfEQc-.js","_app/immutable/chunks/PMrw91N4.js","_app/immutable/chunks/DjUEmYqv.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DKm5eMHG.js","_app/immutable/chunks/BYkd_AKg.js","_app/immutable/chunks/rmUBtRKB.js","_app/immutable/chunks/D_0m4Nxo.js","_app/immutable/chunks/BPfKDjj4.js","_app/immutable/chunks/MYLUp9pp.js","_app/immutable/chunks/BGW4jFhp.js","_app/immutable/chunks/DYjlp5Cv.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BTJIjIBk.js","_app/immutable/chunks/n66UJIcb.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=124-DKntk0yL.js.map
