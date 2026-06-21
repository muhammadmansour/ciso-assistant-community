import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
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
const imports = ["_app/immutable/nodes/27.FIeiq44Z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xx1n7ESe.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BF-mf9wR.js","_app/immutable/chunks/CTUfBhix.js","_app/immutable/chunks/S5hNe3U-.js","_app/immutable/chunks/BQB9JtO2.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B6eKP47J.js","_app/immutable/chunks/DmI_R-rt.js","_app/immutable/chunks/CJexXmrz.js","_app/immutable/chunks/DkzCuznN.js","_app/immutable/chunks/f801B9C2.js","_app/immutable/chunks/B946-g2J.js","_app/immutable/chunks/DJKyldJs.js","_app/immutable/chunks/CB96ZC_F.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=27-C9D-6cRG.js.map
