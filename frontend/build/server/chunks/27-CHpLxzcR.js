import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { f as fail } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const load = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/organization-contexts/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    return {
      title: "Organization Contexts",
      contexts: [],
      sectorChoices: {},
      sizeChoices: {},
      maturityChoices: {},
      geoScopeChoices: {}
    };
  }
  const data = await res.json();
  const [sectorRes, sizeRes, maturityRes, geoRes] = await Promise.all([
    fetch(`${BASE_API_URL}/organization-contexts/sector/`).then(
      (r) => r.ok ? r.json() : {}
    ),
    fetch(`${BASE_API_URL}/organization-contexts/size/`).then(
      (r) => r.ok ? r.json() : {}
    ),
    fetch(`${BASE_API_URL}/organization-contexts/maturity_level/`).then(
      (r) => r.ok ? r.json() : {}
    ),
    fetch(`${BASE_API_URL}/organization-contexts/geographic_scope/`).then(
      (r) => r.ok ? r.json() : {}
    )
  ]);
  return {
    title: "Organization Contexts",
    contexts: data.results ?? data,
    sectorChoices: sectorRes,
    sizeChoices: sizeRes,
    maturityChoices: maturityRes,
    geoScopeChoices: geoRes
  };
};
const actions = {
  create: async ({ request, fetch }) => {
    const formData = await request.formData();
    const body = {
      name: formData.get("name"),
      name_ar: formData.get("name_ar"),
      sector: formData.get("sector"),
      size: formData.get("size"),
      geographic_scope: formData.get("geographic_scope"),
      maturity_level: formData.get("maturity_level"),
      notes: formData.get("notes"),
      regulatory_obligations: JSON.parse(
        formData.get("regulatory_obligations") || "[]"
      )
    };
    const res = await fetch(`${BASE_API_URL}/organization-contexts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to create organization context:", errorData);
      return fail(res.status, { error: errorData });
    }
    return { success: true };
  },
  delete: async ({ request, fetch }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const res = await fetch(`${BASE_API_URL}/organization-contexts/${id}/`, {
      method: "DELETE"
    });
    if (!res.ok) {
      return fail(res.status, { error: "Failed to delete" });
    }
    return { deleted: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 27;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-45Fwly-1.js')).default;
const server_id = "src/routes/(admin-panel)/admin/org-contexts/+page.server.ts";
const imports = ["_app/immutable/nodes/27.DUAki8CK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/M_q2dmUf.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/YZ_AKCUg.js","_app/immutable/chunks/BWMfAn3D.js","_app/immutable/chunks/BDDW1tWA.js","_app/immutable/chunks/BW8w74zF.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/JdlpyyE_.js","_app/immutable/chunks/D9F1RVaI.js","_app/immutable/chunks/D7MnntTo.js","_app/immutable/chunks/C0IL1f21.js","_app/immutable/chunks/cdlh7gjn.js","_app/immutable/chunks/CxQH0fo7.js","_app/immutable/chunks/BwNvm2aJ.js","_app/immutable/chunks/Cyd4__q3.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-CHpLxzcR.js.map
