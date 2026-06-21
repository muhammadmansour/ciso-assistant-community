import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { g as getModelInfo } from './crud-DzBk-fdF.js';
import { aX as duedateupdatedsuccessfully3, aY as observationupdatedsuccessfully2, aZ as statusupdatedsuccessfully2 } from './_index-DiaVtc2Z.js';
import { f as fail } from './index-BWA_9C9m.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as setFlash } from './server-C682bpHT.js';
import './string-BMZjP7XX.js';
import { a as nestedWriteFormAction } from './actions-3TqTFyN3.js';
import './schemas-BwimqDbp.js';
import { l as loadDetail } from './load-AOnXJHgd.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-CxHbQmwN.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './legacy-server-DMdb6ZTL.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-CZeYLK59.js';
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

const index = 130;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DBNnofX6.js')).default;
const server_id = "src/routes/(app)/(internal)/task-nodes/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/130.DqLWVjwl.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/CbP27WYF.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/B9gG0qtq.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/DB7rgoR2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/Cm8mSjyY.js","_app/immutable/chunks/CB96ZC_F.js","_app/immutable/chunks/TKFtXM0q.js","_app/immutable/chunks/D_OoL1YE.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/CT5IoWZ9.js","_app/immutable/chunks/BNG8HIYT.js","_app/immutable/chunks/PODQly3i.js","_app/immutable/chunks/Zs2aTo-p.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C3ZYXCXT.js","_app/immutable/chunks/BfhEHQRd.js","_app/immutable/chunks/Bzd_jF-N.js","_app/immutable/chunks/B7pOCnfB.js","_app/immutable/chunks/CzrWRdjp.js","_app/immutable/chunks/BuFOQPZq.js","_app/immutable/chunks/pvkK35q3.js","_app/immutable/chunks/G4scr1Wm.js","_app/immutable/chunks/Bg74xsip.js","_app/immutable/chunks/CtGtPgMi.js","_app/immutable/chunks/BmAd-6Be.js","_app/immutable/chunks/DKDkilA1.js","_app/immutable/chunks/DIsGU_v8.js","_app/immutable/chunks/B1O0E27L.js","_app/immutable/chunks/Dng2oCk7.js","_app/immutable/chunks/DsSu--El.js","_app/immutable/chunks/fYHZjfOi.js","_app/immutable/chunks/BcmpJNe6.js","_app/immutable/chunks/CuU99I97.js","_app/immutable/chunks/B8BqYPvm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BiYW9qHD.js","_app/immutable/chunks/D_ejIPzk.js","_app/immutable/chunks/p33gLDbP.js","_app/immutable/chunks/D5QX-4aR.js","_app/immutable/chunks/D9HMAGgu.js","_app/immutable/chunks/BIlR4BO0.js","_app/immutable/chunks/G43YWhym.js","_app/immutable/chunks/BhVUheFu.js","_app/immutable/chunks/C2QhPPT1.js","_app/immutable/chunks/BtyLsRRi.js","_app/immutable/chunks/vmd9RpvV.js","_app/immutable/chunks/CqOmBKYt.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CNY_sFlL.js","_app/immutable/chunks/BVqUYXkV.js","_app/immutable/chunks/DvbKPWuG.js","_app/immutable/chunks/CXj0N7zh.js","_app/immutable/chunks/D_6_3-HK.js","_app/immutable/chunks/Xt8AzWD-.js","_app/immutable/chunks/vysi3IdY.js","_app/immutable/chunks/XLE57W8F.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/BDXjeUwt.js","_app/immutable/chunks/RiEQExx9.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/CreateModal.tcW1Vve_.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=130-xwbPetF5.js.map
