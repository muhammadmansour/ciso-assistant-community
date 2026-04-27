import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import { aZ as validationresubmitted1, a_ as changesrequested1, a$ as validationdropped1, b0 as validationrevoked1, b1 as validationrejected1, b2 as validationapproved1 } from './_index-D7NdhnXA.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/validation-flows/${params.id}/`;
  const validation_flow = await fetch(endpoint).then((res) => res.json());
  return {
    validation_flow,
    title: validation_flow.str
  };
};
const actions = {
  approve: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "accepted",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: validationapproved1() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  reject: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "rejected",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: validationrejected1() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  revoke: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "revoked",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: validationrevoked1() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  drop: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "dropped",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: validationdropped1() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  request_changes: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "change_requested",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: changesrequested1() }, cookies);
      return { success: true };
    } else {
      const error = await response.json();
      return fail(400, { error });
    }
  },
  resubmit: async ({ request, fetch, params, cookies }) => {
    const formData = await request.formData();
    const event_notes = formData.get("notes");
    const updateData = {
      status: "submitted",
      event_notes
    };
    const response = await fetch(`${BASE_API_URL}/validation-flows/${params.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    });
    if (response.ok) {
      setFlash({ type: "success", message: validationresubmitted1() }, cookies);
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

const index = 128;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-e_O0N5O8.js')).default;
const server_id = "src/routes/(app)/(internal)/validation-flows/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/128.CFpvFzpT.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/BNmjC1ss.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DYGjK4nM.js","_app/immutable/chunks/Cutloik7.js","_app/immutable/chunks/DJUALYxg.js","_app/immutable/chunks/_VPPwb57.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/BYxLdih2.js","_app/immutable/chunks/DXxYvcKc.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/DAr8lmNi.js","_app/immutable/chunks/u59svrt3.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BwPKvNLF.js","_app/immutable/chunks/CWLnyJ9Y.js","_app/immutable/chunks/DWYV-l9u.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/CXqJwRWy.js","_app/immutable/chunks/BljBstM0.js","_app/immutable/chunks/BioysWky.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/BNMuJmHr.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/D_fj9-71.js","_app/immutable/chunks/R6PLPTc0.js","_app/immutable/chunks/cXncnRiG.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DktzCmbB.js","_app/immutable/chunks/56bwJ4Jb.js","_app/immutable/chunks/BOy2Mbul.js","_app/immutable/chunks/7QhI6BBg.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/94V-AE2z.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=128-BiJq2-3t.js.map
