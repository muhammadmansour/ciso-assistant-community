import { p as push, T as attr, V as escape_html, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { O as OperatingModeGraph } from './OperatingModeGraph-DiqhMnPb.js';
import { tO as returntomo2, GJ as graphstop1, GL as graphanimate1, GK as graphmohelp2 } from './_index-DEXNURl5.js';
import '@unovis/ts';
import './single-container-DALt_tMs.js';
import './index-server-D2ILrLnm.js';
import './graph-Cnm7M5Fr.js';
import './runtime-BMNt81Gy.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const data2 = {
    nodes: data.data.nodes,
    links: data.data.links
  };
  const panelNodes = data.data.panelNodes;
  const linkFlow = data.animated;
  $$payload.out += `<div class="flex justify-between items-center mb-4"><a class="text-primary-800 hover:text-primary-500 cursor-pointer"${attr("href", `/operating-modes/${stringify(data.data.mo_id)}/`)}><i class="fa-solid fa-arrow-left mr-2"></i>${escape_html(returntomo2())}</a> `;
  if (data.animated) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", `/operating-modes/${stringify(data.data.mo_id)}/graph`)} data-sveltekit-reload="" class="text-primary-800 hover:text-primary-500 cursor-pointer">${escape_html(graphstop1())}</a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<a${attr("href", `/operating-modes/${stringify(data.data.mo_id)}/graph?animated=true`)} data-sveltekit-reload="" class="text-primary-800 hover:text-primary-500 cursor-pointer">${escape_html(graphanimate1())}</a>`;
  }
  $$payload.out += `<!--]--></div> <div class="rounded-xl w-full bg-linear-to-r from-slate-50 to-white shadow mb-4 p-2 text-xs text-slate-600 whitespace-pre-line mr-auto"><i class="fa-solid fa-circle-info"></i> ${escape_html(graphmohelp2())}</div> `;
  OperatingModeGraph($$payload, { data: data2, panelNodes, linkFlow });
  $$payload.out += `<!---->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C_t5B_Gs.js.map
