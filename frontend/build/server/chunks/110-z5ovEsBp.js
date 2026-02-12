import { B as BASE_API_URL } from './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';

const load = (async ({ fetch, params }) => {
  const URLModel = "risk-assessments";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const res = await fetch(endpoint);
  const risk_assessment = await res.json();
  return { URLModel, risk_assessment };
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 110;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Wr1uhy6B.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/action-plan/+page.server.ts";
const imports = ["_app/immutable/nodes/110.DOZTLv0R.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/stSixLta.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DtatPURh.js","_app/immutable/chunks/B6ld54w6.js","_app/immutable/chunks/C9Y2w_Ju.js","_app/immutable/chunks/MSPxrDcO.js","_app/immutable/chunks/CEj1gugw.js","_app/immutable/chunks/9qRfmEid.js","_app/immutable/chunks/CA4Wag9i.js","_app/immutable/chunks/BXci3RAA.js","_app/immutable/chunks/CPn7w5r0.js","_app/immutable/chunks/BfbMVm01.js","_app/immutable/chunks/C07P_6dm.js","_app/immutable/chunks/CmKwYUow.js","_app/immutable/chunks/TXCE8wzW.js","_app/immutable/chunks/2kxu_H0b.js","_app/immutable/chunks/jEV-0rEw.js","_app/immutable/chunks/D8bJaGfC.js","_app/immutable/chunks/DSRLWXRq.js","_app/immutable/chunks/gLrFaHef.js","_app/immutable/chunks/BOnj4S0p.js","_app/immutable/chunks/Dg07F0Iz.js","_app/immutable/chunks/DTilNBkO.js","_app/immutable/chunks/KWNxeSuZ.js","_app/immutable/chunks/HSmXHn9E.js","_app/immutable/chunks/BeNY9BWG.js","_app/immutable/chunks/BfbJVQUh.js","_app/immutable/chunks/DpCit0gg.js","_app/immutable/chunks/Cekucoq6.js","_app/immutable/chunks/CsIMpzsQ.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/C4niOJRc.js","_app/immutable/chunks/DxMLkaLG.js","_app/immutable/chunks/DzqOPh7h.js","_app/immutable/chunks/CFOraUKk.js","_app/immutable/chunks/DnUyVyNy.js","_app/immutable/chunks/C5bWV7q4.js","_app/immutable/chunks/DebWI5i8.js","_app/immutable/chunks/DKB8YqrH.js","_app/immutable/chunks/CnM3RobZ.js","_app/immutable/chunks/CV7tJNsC.js","_app/immutable/chunks/CEYPIpZK.js","_app/immutable/chunks/DhDID1P7.js","_app/immutable/chunks/f8DqAZKo.js","_app/immutable/chunks/CLwmy1uM.js","_app/immutable/chunks/BOk_ozZZ.js","_app/immutable/chunks/DZrrjmZd.js","_app/immutable/chunks/CSQWIZIx.js","_app/immutable/chunks/Cx5enT0W.js","_app/immutable/chunks/B-n4eeAc.js","_app/immutable/chunks/C-AgJVkw.js","_app/immutable/chunks/CmxaeTNq.js","_app/immutable/chunks/C10grkEj.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BoqNNIZt.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/G4f472Dc.js","_app/immutable/chunks/DOQCfxQu.js","_app/immutable/chunks/CEskAMGU.js","_app/immutable/chunks/CcRQ8Flx.js"];
const stylesheets = ["_app/immutable/assets/Tooltip.DXh0bXFJ.css","_app/immutable/assets/stores.CinladYX.css","_app/immutable/assets/table.CekrWxJS.css","_app/immutable/assets/ModelTable.QcXBTdDg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=110-z5ovEsBp.js.map
