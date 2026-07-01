import { p as push, X as stringify, a as pop, V as escape_html, T as attr } from './index2-9icAqEyj.js';
import { M as ModelTable } from './ModelTable-Cwc6okqb.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { PI as current, v7 as residual, KV as ecosystemradar1, Il as gobacktoebiosrmstudy5 } from './_index-BQcvYRD4.js';
import 'marked';
import './crud-DA2NQw0x.js';
import { A as Accordion } from './index4-CU0xjTbD.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BpCge2eg.js';
import './runtime-BKo9q3Zd.js';
import './constants-12fjCMiL.js';
import { A as Anchor } from './Anchor-BRS9PKeN.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-vgtyOSI9.js';
import './breadcrumbs-TPX_ebIH.js';
import { E as EcosystemCircularRadarChart } from './EcosystemCircularRadarChart-BhrqzoOF.js';
import './Popover-PelKNyF8.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './access-control-DaLcieub.js';
import './Form-EyIMnhQb.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './datetime-CDLVyquZ.js';
import './helpers-Bm9n0CNG.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './DeleteConfirmModal-BVIf1kgK.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data } = $$props;
  const URLModel = data.URLModel;
  let value = [""];
  $$payload.out += `<div class="flex items-center justify-between mb-4">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/ebios-rm/${data.data.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="space-y-2">`;
  Accordion($$payload, {
    class: "bg-white rounded-md border hover:text-primary-700 text-gray-800",
    value,
    onValueChange: (e) => value = e.value,
    hover: "bg-white",
    collapsible: true,
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      {
        let control = function($$payload3) {
          $$payload3.out += `<i class="fa-solid fa-bullseye"></i> ${escape_html(ecosystemradar1())}`;
        }, panel = function($$payload3) {
          $$payload3.out += `<div class="bg-white flex flex-col space-y-4"><div class="flex w-full h-fit">`;
          EcosystemCircularRadarChart($$payload3, {
            title: current(),
            name: "c_ecosystem_circular",
            data: data.circularRadar,
            type: "current",
            classesContainer: "w-full",
            height: "h-screen"
          });
          $$payload3.out += `<!----> `;
          EcosystemCircularRadarChart($$payload3, {
            title: residual(),
            name: "r_ecosystem_circular",
            data: data.circularRadar,
            type: "residual",
            classesContainer: "w-full",
            height: "h-screen"
          });
          $$payload3.out += `<!----></div></div>`;
        };
        Accordion.Item($$payload2, {
          value: "summary",
          control,
          panel,
          $$slots: { control: true, panel: true }
        });
      }
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  {
    let addButton = function($$payload2) {
      $$payload2.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
    };
    ModelTable($$payload, {
      source: data.table,
      deleteForm: data.deleteForm,
      URLModel,
      baseEndpoint: `/stakeholders?ebios_rm_study=${stringify(page.params.id)}`,
      addButton,
      $$slots: { addButton: true }
    });
  }
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-tiKs--ng.js.map
