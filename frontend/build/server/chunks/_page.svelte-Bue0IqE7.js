import { p as push, X as stringify, S as attr_class, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { fU as activityone1, Lj as ebiosws2_11, cX as riskorigin1, kC as targetobjective1, fV as activitytwo1, Li as ebiosws2_21, g4 as motivation, g6 as resources, Aw as pertinence, tt as rotoactivity1, g9 as activitythree1, Lg as ebiosws2_31, go as selected, Cg as notselected1, af as fearedevents1, ko as justification, C_ as nojustification1, Il as gobacktoebiosrmstudy5, e as edit } from './_index-BQcvYRD4.js';
import { p as page } from './index3-BpCge2eg.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { M as ModelTable } from './ModelTable-Cwc6okqb.js';
import { A as Anchor } from './Anchor-BRS9PKeN.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { U as URL_MODEL_MAP } from './crud-DA2NQw0x.js';
import './runtime-BKo9q3Zd.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './constants-12fjCMiL.js';
import './shared-server-BU2DVf8Q.js';
import './Form-EyIMnhQb.js';
import './html-FW6Ia4bL.js';
import './breadcrumbs-TPX_ebIH.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-BVIf1kgK.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const roto = data.data;
  let activeActivity = null;
  page.url.searchParams.forEach((value, key) => {
    if (key === "activity" && value === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value === "two") {
      activeActivity = "two";
    } else if (key === "activity" && value === "three") {
      activeActivity = "three";
    }
  });
  const pertinenceColor = {
    undefined: "bg-gray-200 text-gray-700",
    irrelevant: "bg-green-200 text-green-700",
    partially_relevant: "bg-yellow-200 text-yellow-700",
    fairly_relevant: "bg-orange-200 text-orange-700",
    highly_relevant: "bg-red-200 text-red-700"
  };
  const user = page.data.user;
  pageTitle.set(data.title);
  const model = URL_MODEL_MAP["ro-to"];
  const canEditObject = (roto2) => canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: roto2.folder?.id
  });
  $$payload.out += `<div class="card p-4 bg-white shadow-lg"><div class="flex flex-col space-y-4"><div class="flex justify-between">`;
  Anchor($$payload, {
    href: `/ebios-rm/${stringify(roto.ebios_rm_study.id)}`,
    label: roto.ebios_rm_study.str,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  if (canEditObject(roto)) {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href: `${page.url.pathname}/edit?activity=${activeActivity}&next=${page.url.pathname}?activity=${activeActivity}`,
      class: "btn preset-filled-primary-500 h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2" data-testid="edit-button"></i> ${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div id="activityOne"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center justify-center ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</span> <h1${attr_class(`font-bold text-xl ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(ebiosws2_11())}</h1> <div class="flex flex-row space-x-1 items-center"><p class="flex flex-col items-center"><span class="text-xs text-gray-500">${escape_html(riskorigin1())}</span> <span class="font-bold">${escape_html(safeTranslate(roto.risk_origin))}</span></p> <span class="text-gray-500 font-bold text-lg">/</span> <p class="flex flex-col items-center"><span class="text-xs text-gray-500">${escape_html(targetobjective1())}</span> <span class="font-bold">${escape_html(roto.target_objective)}</span></p></div></div> <div id="activityTwo"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</span> <h1${attr_class(`font-bold text-xl ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(ebiosws2_21())}</h1> <div class="flex space-x-6"><p class="flex flex-col items-center"><span class="text-xs text-gray-500">${escape_html(motivation())}</span> <span class="badge text-sm font-bold">${escape_html(safeTranslate(roto.motivation))}</span></p> <i class="fa-solid fa-xmark"></i> <p class="flex flex-col items-center"><span class="text-xs text-gray-500">${escape_html(resources())}</span> <span class="badge text-sm font-bold">${escape_html(safeTranslate(roto.resources))}</span></p> <i class="fa-solid fa-equals"></i> <p class="flex flex-col items-center"><span class="text-xs text-gray-500">${escape_html(pertinence())}</span> <span${attr_class(`badge text-sm font-bold ${stringify(pertinenceColor[roto.pertinence])}`)}>${escape_html(safeTranslate(roto.pertinence))}</span></p></div> <p><span class="badge bg-violet-200 text-violet-700">${escape_html(rotoactivity1())}</span> <span>=</span> <span class="font-bold">${escape_html(safeTranslate(roto.activity))}</span></p></div> <div id="activityThree"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center ${stringify(activeActivity === "three" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "three" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitythree1())}</span> <h1${attr_class(`font-bold text-xl ${stringify(activeActivity === "three" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(ebiosws2_31())}</h1> <p>`;
  if (roto.is_selected) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="badge bg-green-200 text-green-700">${escape_html(selected())}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="badge bg-red-200 text-red-700">${escape_html(notselected1())}</span>`;
  }
  $$payload.out += `<!--]--></p> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-table text-gray-500 opacity-75"></i> <span>${escape_html(fearedevents1())}</span></h3> `;
  ModelTable($$payload, {
    backgroundColor: "bg-gray-50",
    regionBody: "bg-gray-50",
    regionHeadCell: "uppercase bg-gray-50 text-gray-700",
    source: data.table,
    URLModel: "feared-events",
    baseEndpoint: "feared-events/?ro_to_couples=" + roto.id,
    pagination: false,
    search: false,
    hideFilters: true,
    fields: [
      "name",
      "assets",
      "description",
      "qualifications",
      "gravity"
    ]
  });
  $$payload.out += `<!----></div> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-eye text-gray-500 opacity-75"></i> <span>${escape_html(justification())}</span></h3> `;
  if (roto.justification) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(roto.justification)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(nojustification1())}</p>`;
  }
  $$payload.out += `<!--]--></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bue0IqE7.js.map
