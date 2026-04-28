import { B as BASE_API_URL } from './constants-lv6aycRl.js';
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

const index = 54;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7VnWPEvo.js')).default;
const server_id = "src/routes/(app)/(internal)/ebios-rm/[id=uuid]/report/+page.server.ts";
const imports = ["_app/immutable/nodes/54.BZQ1V34B.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/C2HK-5eJ.js","_app/immutable/chunks/CWz7oro_.js","_app/immutable/chunks/CELL7CsF.js","_app/immutable/chunks/Dmqg17Dx.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/B1TJtPpf.js","_app/immutable/chunks/DkXIEkz8.js","_app/immutable/chunks/DqfuwWXu.js","_app/immutable/chunks/DaFf4ri-.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DW7cKldO.js","_app/immutable/chunks/ClXf1tSH.js","_app/immutable/chunks/CKgSh6nu.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/lKHeYNKL.js","_app/immutable/chunks/Ck4BDG7B.js","_app/immutable/chunks/DMjP-jzq.js","_app/immutable/chunks/bBjfn_pL.js","_app/immutable/chunks/C4KCxBn8.js","_app/immutable/chunks/Bik8CDZR.js","_app/immutable/chunks/Dr5TFleC.js","_app/immutable/chunks/YJ_tOyjd.js","_app/immutable/chunks/COWXugUk.js","_app/immutable/chunks/iAcsB3_-.js","_app/immutable/chunks/CUj5Yekk.js","_app/immutable/chunks/CyEYdE44.js","_app/immutable/chunks/CKMuRUic.js","_app/immutable/chunks/CFzvgu28.js","_app/immutable/chunks/GPqFdkZn.js","_app/immutable/chunks/PMrw91N4.js","_app/immutable/chunks/DjUEmYqv.js","_app/immutable/chunks/Scc84oWD.js","_app/immutable/chunks/Oz8s1pJr.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BUndx8-2.js","_app/immutable/chunks/Cc701ZM5.js","_app/immutable/chunks/DS7N4xG4.js","_app/immutable/chunks/BKGi4-1R.js","_app/immutable/chunks/Bi-WFMHF.js","_app/immutable/chunks/DVvhCpGc.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/CjH7Vkj0.js","_app/immutable/chunks/BNMuJmHr.js"];
const stylesheets = ["_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/single-container.CAySGR8g.css","_app/immutable/assets/OperatingModeGraph.C1K5fKrU.css","_app/immutable/assets/54.CEKUD8qm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=54-BmdFiSfo.js.map
