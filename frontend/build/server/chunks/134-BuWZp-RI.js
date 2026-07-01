import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import { b1 as validationresubmitted1, b2 as changesrequested1, b3 as validationdropped1, b4 as validationrevoked1, b5 as validationrejected1, b6 as validationapproved1 } from './_index-BQcvYRD4.js';
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

const index = 134;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CYFNf23h.js')).default;
const server_id = "src/routes/(app)/(internal)/validation-flows/[id=uuid]/+page.server.ts";
const imports = ["_app/immutable/nodes/134.BCUtVdvt.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/CdUUvxK4.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/B5gBvFLv.js","_app/immutable/chunks/m3NcPNlD.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/P2L3tCS_.js","_app/immutable/chunks/DYumy1Ak.js","_app/immutable/chunks/CGQZIbVf.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Ba4v9qbf.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/DNR_s1hx.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/WsjUsqu8.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BEAoixa4.js","_app/immutable/chunks/BGXEvCyC.js","_app/immutable/chunks/DHiMRO1Z.js","_app/immutable/chunks/B3T8groU.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/DEoobfLV.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/BOk_ozZZ.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=134-BuWZp-RI.js.map
