import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import { aZ as validationresubmitted1, a_ as changesrequested1, a$ as validationdropped1, b0 as validationrevoked1, b1 as validationrejected1, b2 as validationapproved1 } from './_index-B12BAPce.js';
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

const index = 131;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-jxL0RSwe.js')).default;
const server_id = "src/routes/(app)/(internal)/validation-flows/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/131.BTV1sWiC.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/DXbkSYo8.js","_app/immutable/chunks/CIQ63Ha5.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/Cyd4__q3.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/CdLD3ETV.js","_app/immutable/chunks/CkxhXx0K.js","_app/immutable/chunks/D6XGj1zg.js","_app/immutable/chunks/BnXRXT6o.js","_app/immutable/chunks/C1-xTShl.js","_app/immutable/chunks/BoGN8GaE.js","_app/immutable/chunks/MSOi707i.js","_app/immutable/chunks/CnQvTYdL.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/ByGmc6od.js","_app/immutable/chunks/CbkoIhbq.js","_app/immutable/chunks/eCSK0cWp.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/ym4Iat4u.js","_app/immutable/chunks/B_hWMC4I.js","_app/immutable/chunks/CJsjzxZ1.js","_app/immutable/chunks/BVG-59OI.js","_app/immutable/chunks/DdTgDLj8.js","_app/immutable/chunks/CNzPnHg0.js","_app/immutable/chunks/B0Bm_D1r.js","_app/immutable/chunks/CWC1p4Hf.js","_app/immutable/chunks/0JDwt3lD.js","_app/immutable/chunks/DtoYsWkg.js","_app/immutable/chunks/CBoLZ5_6.js","_app/immutable/chunks/DtcMLj97.js","_app/immutable/chunks/DiXxokeg.js","_app/immutable/chunks/yMkN5qD0.js","_app/immutable/chunks/C8D69k2T.js","_app/immutable/chunks/C_aSl-9I.js","_app/immutable/chunks/DZQfXi9Y.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CYh7na8H.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=131-CmcPMBH7.js.map
