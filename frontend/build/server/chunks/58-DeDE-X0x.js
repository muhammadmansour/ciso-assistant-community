import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';

const load = async ({ params, fetch, parent }) => {
  const endpoint = `${BASE_API_URL}/ebios-rm/studies/${params.id}/report-data/`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const interface_settings = await fetch(`${BASE_API_URL}/settings/general/object/`).then(
    (res2) => res2.json()
  );
  const { featureflags } = await parent();
  return {
    reportData: data,
    useBubbles: interface_settings.interface_agg_scenario_matrix,
    inherentRiskEnabled: featureflags?.inherent_risk || false
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 58;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DbP_ySbr.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/58.B9bneihZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B5_J1eZO.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DhVUxA_H.js","_app/immutable/chunks/CxmTzuB0.js","_app/immutable/chunks/Hk7og739.js","_app/immutable/chunks/BlsBdC2V.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/7M20SbCD.js","_app/immutable/chunks/BpLHmG0c.js","_app/immutable/chunks/B46kGJGo.js","_app/immutable/chunks/BAD7lgiB.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/FmpJdKs2.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CuuGk-mn.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/h2h5Z7iA.js","_app/immutable/chunks/DrNqa-QT.js","_app/immutable/chunks/S6gTM6mH.js","_app/immutable/chunks/BjcWLFaf.js","_app/immutable/chunks/DiSjU30Z.js","_app/immutable/chunks/DHWxGz8F.js","_app/immutable/chunks/sDI6exkH.js","_app/immutable/chunks/D7rIMxhD.js","_app/immutable/chunks/Dllm2RtA.js","_app/immutable/chunks/Z4mTjYry.js","_app/immutable/chunks/CDQmVEem.js","_app/immutable/chunks/rcGBGF2I.js","_app/immutable/chunks/ClZdxLcz.js","_app/immutable/chunks/xb516GHm.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/Cfor-gEn.js","_app/immutable/chunks/CysSQ76A.js","_app/immutable/chunks/BYMx8iZ6.js","_app/immutable/chunks/20P_hKxl.js","_app/immutable/chunks/DxcoP9sf.js","_app/immutable/chunks/CE8FK2K_.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/h-3-RRtw.js","_app/immutable/chunks/DJX_slGO.js","_app/immutable/chunks/DlxJgXMU.js","_app/immutable/chunks/BeTtb8R-.js","_app/immutable/chunks/D_HHtX4o.js","_app/immutable/chunks/BgowPYUp.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CKVve4LJ.js","_app/immutable/chunks/Ba4v9qbf.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css","_app/immutable/assets/58.CEKUD8qm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=58-DeDE-X0x.js.map
