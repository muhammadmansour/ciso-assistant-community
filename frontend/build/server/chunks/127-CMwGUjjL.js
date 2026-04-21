import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { g as getModelInfo } from './crud-CFDLlT9z.js';
import { aT as duedateupdatedsuccessfully3, aU as observationupdatedsuccessfully2, aV as statusupdatedsuccessfully2 } from './_index-Syqrsmaf.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as setFlash } from './server-C682bpHT.js';
import './string-BMZjP7XX.js';
import { a as nestedWriteFormAction } from './actions-CyUUnsJo.js';
import './schemas-DxPQoveO.js';
import { l as loadDetail } from './load-2WiqDzE7.js';
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
import './i18n-B-ZrD2ao.js';
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

const index = 127;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DI2SoeR4.js')).default;
const server_id = "src/routes/(app)/(internal)/task-nodes/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/127.BdU8cqNA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/D6t1Gbv3.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/Ds0cD9SD.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/VesEJn6I.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/C43KYMUz.js","_app/immutable/chunks/BBF8pxsr.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CL1MtWUI.js","_app/immutable/chunks/B1ISHYT8.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CVry4SXA.js","_app/immutable/chunks/DqI8LxJS.js","_app/immutable/chunks/CmwBA6gY.js","_app/immutable/chunks/B8qJaqJM.js","_app/immutable/chunks/DhtFfOXf.js","_app/immutable/chunks/CenfJXbu.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/FUON2Tb3.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/coRzUdqH.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/ZM_KH0ts.js","_app/immutable/chunks/89WkcCtK.js","_app/immutable/chunks/Dl4VVEB9.js","_app/immutable/chunks/BgVLPvlz.js","_app/immutable/chunks/BvfshpDU.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/DkP_2XjV.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/Yrr7u_J7.js","_app/immutable/chunks/B2d7Kn0g.js","_app/immutable/chunks/BJgYCOde.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CSHhC_AB.js","_app/immutable/chunks/DDxTzpKI.js","_app/immutable/chunks/G_-wXQMR.js","_app/immutable/chunks/DemrQNJa.js","_app/immutable/chunks/BbSGlnrT.js","_app/immutable/chunks/BnPM43dS.js","_app/immutable/chunks/62MrVLfz.js","_app/immutable/chunks/CuECpGv5.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BQtjeuej.js","_app/immutable/chunks/DZ-s9QyG.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=127-CMwGUjjL.js.map
