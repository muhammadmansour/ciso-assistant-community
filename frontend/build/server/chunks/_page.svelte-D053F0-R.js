import { p as push, V as escape_html, a as pop, T as attr, X as stringify, M as store_get, Q as unsubscribe_stores } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { vY as quickstart1, a as m, Ht as flashmode1, G4 as importthreats1, G5 as importreferencecontrols2, G6 as importmetricdefinitions2, at as libraries, aG as inspect, Is as explorebutton1, lv as visualize, ls as visualizebutton1, G7 as importmatrices1, G9 as importframeworks1, G8 as importmappings1, U_ as ascsv3, UW as asxlsx4, Ip as exportbutton1 } from './_index-Syqrsmaf.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';
import 'marked';
import './crud-CFDLlT9z.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BKo9q3Zd.js';
import './constants-QzmVibOJ.js';
import { A as Anchor } from './Anchor-Bg6KSJgL.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import { d as driverInstance } from './stores-D-WMoATo.js';
import './schemas-DxPQoveO.js';
import './breadcrumbs-Cdf8pK7r.js';
import { M as ModelTable } from './ModelTable-BpBYEFsc.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './machine.svelte-CNa8MjEx.js';
import './index8-L4CsUepF.js';
import './client-DqP3yP6V.js';
import './shared-server-BU2DVf8Q.js';
import './access-control-DaLcieub.js';
import './Form-DhMvl6-W.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DOKttf10.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form } = $$props;
  let URLModel = data.URLModel;
  let exportPopupOpen = false;
  let isDeletingAll = false;
  let isFetchingMuraji = false;
  getModalStore();
  function handleClickForGT() {
    setTimeout(
      () => {
        store_get($$store_subs ??= {}, "$driverInstance", driverInstance)?.moveNext();
      },
      300
    );
  }
  const modelDescriptionKey = () => {
    if (!URLModel) return null;
    const camelCase = URLModel.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
    return `${camelCase}Description`;
  };
  const modelDescription = () => {
    const key = modelDescriptionKey();
    if (key && m[key]) {
      return m[key]();
    }
    return "";
  };
  if (data?.table) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div class="flex items-center justify-between px-6 py-5 border-b border-gray-100"><div><h2 class="text-lg font-bold text-gray-900">${escape_html(safeTranslate(data.model.localNamePlural))}</h2> `;
    if (modelDescription()) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-sm text-gray-500 mt-0.5">${escape_html(modelDescription())}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex items-center gap-2">`;
    if (URLModel === "compliance-assessments" && page.data?.user?.is_admin) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn bg-[#005FA3] text-white hover:bg-[#004d85] shadow-sm rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"><i class="fa-solid fa-plus mr-2"></i> ${escape_html(quickstart1())}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <!---->`;
    {
      {
        let addButton = function($$payload2) {
          $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">`;
          if (![
            "risk-matrices",
            "frameworks",
            "requirement-mapping-sets",
            "user-groups",
            "role-assignments",
            "qualifications"
          ].includes(URLModel)) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button" id="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}${attr("aria-label", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button> `;
            if ([
              "applied-controls",
              "assets",
              "incidents",
              "security-exceptions",
              "risk-scenarios",
              "processings",
              "task-templates"
            ].includes(URLModel)) {
              $$payload2.out += "<!--[-->";
              {
                let trigger = function($$payload3) {
                  $$payload3.out += `<span${attr("title", exportbutton1())} data-testid="export-button"><i class="fa-solid fa-download"></i></span>`;
                }, content = function($$payload3) {
                  $$payload3.out += `<div class="flex flex-col"><a${attr("href", `${stringify(URLModel)}/export/`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(ascsv3())}</a> <a${attr("href", `${stringify(URLModel)}/export/xlsx/`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(asxlsx4())}</a></div>`;
                };
                Popover($$payload2, {
                  open: exportPopupOpen,
                  onOpenChange: (e) => exportPopupOpen = e.open,
                  triggerBase: "inline-block p-3 btn-mini-tertiary w-12 focus:relative",
                  contentBase: "card whitespace-nowrap bg-white py-2 w-fit shadow-lg",
                  positioning: { placement: "bottom-end" },
                  zIndex: "1000",
                  trigger,
                  content,
                  $$slots: { trigger: true, content: true }
                });
              }
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "applied-controls") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<a${attr("href", `${stringify(URLModel)}/flash-mode/`)} class="inline-block p-3 btn-mini-secondary w-12 focus:relative"${attr("title", flashmode1())}${attr("aria-label", flashmode1())} data-testid="flash-mode-button"><i class="fa-solid fa-bolt mr-2"></i></a>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if ([
              "threats",
              "reference-controls",
              "metric-definitions"
            ].includes(URLModel)) {
              $$payload2.out += "<!--[-->";
              const title = URLModel === "threats" ? importthreats1() : URLModel === "reference-controls" ? importreferencecontrols2() : importmetricdefinitions2();
              Anchor($$payload2, {
                href: `/libraries?object_type=${URLModel.replace(/-/g, "_")}`,
                label: libraries(),
                class: "inline-block p-3 btn-mini-tertiary w-12 focus:relative",
                "data-testid": "import-button",
                id: "import-button",
                title,
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-file-import mr-2"></i>`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "assets") {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: "assets/graph/",
                class: "inline-block p-3 btn-mini-secondary w-12 focus:relative",
                title: explorebutton1(),
                label: inspect(),
                "data-testid": "viz-button",
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-diagram-project"></i>`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "entities") {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: "entities/graph/",
                class: "inline-block p-3 btn-mini-secondary w-12 focus:relative",
                title: explorebutton1(),
                label: inspect(),
                "data-testid": "viz-button",
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-diagram-project"></i>`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "folders") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<button class="text-gray-50 inline-block border-e p-3 bg-[#1a2740] hover:bg-[#2a3a66] w-12 focus:relative" data-testid="import-button"${attr("title", safeTranslate("importFolder"))}${attr("aria-label", safeTranslate("importFolder"))}><i class="fa-solid fa-file-import"></i></button> `;
              Anchor($$payload2, {
                href: "x-rays/inspect",
                class: "inline-block p-3 btn-mini-secondary w-12 focus:relative",
                title: explorebutton1(),
                label: inspect(),
                "data-testid": "viz-button",
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-diagram-project"></i>`;
                },
                $$slots: { default: true }
              });
              $$payload2.out += `<!---->`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "vulnerabilities") {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: "vulnerabilities/treemap/",
                class: "inline-block p-3 btn-mini-secondary w-12 focus:relative",
                title: visualizebutton1(),
                label: visualize(),
                "data-testid": "viz-button",
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-chart-pie"></i>`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          } else if ([
            "risk-matrices",
            "frameworks",
            "requirement-mapping-sets"
          ].includes(URLModel)) {
            $$payload2.out += "<!--[1-->";
            const href = `/libraries?object_type=${URLModel.replace(/-/g, "_")}`;
            const title = URLModel === "risk-matrices" ? importmatrices1() : URLModel === "frameworks" ? importframeworks1() : importmappings1();
            Anchor($$payload2, {
              href,
              onclick: handleClickForGT,
              label: libraries(),
              class: "inline-block p-3 btn-mini-tertiary w-12 focus:relative",
              "data-testid": "import-button",
              id: "add-button",
              title,
              children: ($$payload3) => {
                $$payload3.out += `<i class="fa-solid fa-file-import mr-2"></i>`;
              },
              $$slots: { default: true }
            });
            $$payload2.out += `<!----> `;
            if (URLModel === "frameworks") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<form method="POST" action="?/fetchMuraji"><button type="submit" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white font-medium text-sm shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", isFetchingMuraji, true)} title="مزامنة مع مراجع">`;
              {
                $$payload2.out += "<!--[!-->";
                $$payload2.out += `<i class="fa-solid fa-cloud-arrow-down"></i> <span>مزامنة مع مراجع</span>`;
              }
              $$payload2.out += `<!--]--></button></form> <form method="POST" action="?/deleteAll"><button type="submit" class="inline-block p-3 text-red-600 hover:bg-red-50 w-12 focus:relative" title="Delete all frameworks"${attr("disabled", isDeletingAll, true)}>`;
              {
                $$payload2.out += "<!--[!-->";
                $$payload2.out += `<i class="fa-solid fa-trash-can"></i>`;
              }
              $$payload2.out += `<!--]--></button></form>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (URLModel === "requirement-mapping-sets") {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: "requirement-mapping-sets/graph/",
                class: "inline-block p-3 btn-mini-secondary w-12 focus:relative",
                title: explorebutton1(),
                label: inspect(),
                "data-testid": "viz-button",
                children: ($$payload3) => {
                  $$payload3.out += `<i class="fa-solid fa-diagram-project"></i>`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></span></div>`;
        }, badge = function($$payload2, key, row) {
          if (URLModel === "risk-assessments") {
            $$payload2.out += "<!--[-->";
            if (key === "perimeter" && row.meta.ebios_rm_study) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<span class="badge inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-md border border-amber-200 rotate-[-6deg] font-semibold uppercase tracking-wide">ebios-rm</span>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        };
        ModelTable($$payload, {
          source: data.table,
          deleteForm: data.deleteForm,
          URLModel,
          disableEdit: ["user-groups", "validation-flows"].includes(URLModel),
          disableDelete: ["user-groups"].includes(URLModel),
          addButton,
          badge,
          children: ($$payload2) => {
            if (URLModel === "risk-assessments") {
              $$payload2.out += "<!--[-->";
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { addButton: true, badge: true, default: true }
        });
      }
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D053F0-R.js.map
