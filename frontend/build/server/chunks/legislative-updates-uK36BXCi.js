const GRC_ADMIN_BASE_URL = (process.env.GRC_ADMIN_BASE_URL || "https://grc-admin.wathbah.dev").replace(/\/$/, "");
const LEGISLATIVE_UPDATES_API_URL = process.env.LEGISLATIVE_UPDATES_API_URL || `${GRC_ADMIN_BASE_URL}/api/ai-tools/pipeline-legislative-updates`;
const LEGISLATIVE_UPDATE_DETAIL_API_URL = process.env.LEGISLATIVE_UPDATE_DETAIL_API_URL || LEGISLATIVE_UPDATES_API_URL;
function extractItems(payload) {
  let raw = [];
  if (Array.isArray(payload)) raw = payload;
  else if (payload && typeof payload === "object") {
    const p = payload;
    if (Array.isArray(p.items)) raw = p.items;
    else if (Array.isArray(p.data)) raw = p.data;
    else if (Array.isArray(p.results)) raw = p.results;
  }
  return raw.filter((i) => isLegislativeUpdate(i));
}
function extractItem(payload) {
  if (!payload || typeof payload !== "object") return null;
  const p = payload;
  let raw = null;
  if (p.item && typeof p.item === "object") raw = p.item;
  else if (p.data && typeof p.data === "object" && !Array.isArray(p.data)) raw = p.data;
  else if (typeof p.id === "string") raw = p;
  return isLegislativeUpdate(raw) ? raw : null;
}
function isLegislativeUpdate(raw) {
  if (!raw || typeof raw !== "object") return false;
  const r = raw;
  return typeof r.id === "string" && !!r.id;
}
async function fetchLegislativeUpdates(fetchFn, _event) {
  try {
    const res = await fetchFn(LEGISLATIVE_UPDATES_API_URL, {
      headers: { accept: "application/json" }
    });
    if (res.status === 401 || res.status === 403) {
      return { items: [], upstreamStatus: "unauthorized" };
    }
    if (!res.ok) {
      console.error(
        `[legislative-updates] list upstream returned ${res.status} ${res.statusText}`
      );
      return { items: [], upstreamStatus: "error" };
    }
    const payload = await res.json();
    return { items: extractItems(payload), upstreamStatus: "ok" };
  } catch (err) {
    console.error("[legislative-updates] list upstream fetch failed", err);
    return { items: [], upstreamStatus: "error" };
  }
}
async function fetchLegislativeUpdateById(fetchFn, id, _event) {
  const detailUrl = `${LEGISLATIVE_UPDATE_DETAIL_API_URL.replace(/\/$/, "")}/${encodeURIComponent(id)}`;
  try {
    const res = await fetchFn(detailUrl, { headers: { accept: "application/json" } });
    if (res.status === 404) {
      return { item: null, upstreamStatus: "ok" };
    }
    if (res.status === 401 || res.status === 403) {
      return { item: null, upstreamStatus: "unauthorized" };
    }
    if (!res.ok) {
      console.error(
        `[legislative-updates] detail upstream returned ${res.status} ${res.statusText} for ${id}`
      );
      return { item: null, upstreamStatus: "error" };
    }
    const payload = await res.json();
    return { item: extractItem(payload), upstreamStatus: "ok" };
  } catch (err) {
    console.error("[legislative-updates] detail upstream fetch failed", err);
    const { items, upstreamStatus } = await fetchLegislativeUpdates(fetchFn);
    if (upstreamStatus !== "ok") return { item: null, upstreamStatus };
    return { item: items.find((i) => i.id === id) ?? null, upstreamStatus: "ok" };
  }
}

export { LEGISLATIVE_UPDATES_API_URL as L, fetchLegislativeUpdateById as a, LEGISLATIVE_UPDATE_DETAIL_API_URL as b, fetchLegislativeUpdates as f };
//# sourceMappingURL=legislative-updates-uK36BXCi.js.map
