import { p as push, a as pop, W as ensure_array_like, V as escape_html, X as stringify, T as attr } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-BNMFNFYC.js';
import { p as page } from './index3-BpCge2eg.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './runtime-BKo9q3Zd.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import 'marked';
import './crud-DzBk-fdF.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import './constants-CbUNxZZz.js';
import './breadcrumbs-BKQh9F1q.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-D-WMoATo.js';
import './schemas-BwimqDbp.js';
import { M as ModelTable } from './ModelTable-BFWlDOTv.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './Anchor-vk0sCVou.js';
import './Form-BvVZStO5.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './_index-DiaVtc2Z.js';
import './MarkdownRenderer-CZeYLK59.js';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './Tooltip-Li45R7zs.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './client.svelte-CxCno2aW.js';
import './shared-server-BU2DVf8Q.js';
import './Popover-PelKNyF8.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-BXJYvcO9.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  let { data } = $$props;
  let group = Object.keys(data.relatedModels)[0];
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: data.model.name,
    domain: data.model.name === "folder" ? data.data.id : data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
  });
  DetailView($$payload, { data, displayModelTable: false });
  $$payload.out += `<!----> `;
  if (Object.keys(data.relatedModels).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card shadow-lg mt-8 bg-white w-full">`;
    {
      let list = function($$payload2) {
        const each_array = ensure_array_like(Object.entries(data.relatedModels).sort(([a], [b]) => a.localeCompare(b)));
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [urlmodel, model] = each_array[$$index];
          $$payload2.out += `<!---->`;
          Tabs.Control($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<!---->${escape_html(safeTranslate(model.info.localNamePlural))} `;
              if (model.table.body.length > 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<span class="badge preset-tonal-secondary">${escape_html(model.table.body.length)}</span>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      }, content = function($$payload2) {
        const each_array_1 = ensure_array_like(Object.entries(data.relatedModels));
        $$payload2.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let [urlmodel, model] = each_array_1[$$index_1];
          $$payload2.out += `<!---->`;
          Tabs.Panel($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<div class="flex flex-row justify-between px-4 py-2"><h4 class="font-semibold lowercase capitalize-first my-auto">${escape_html(safeTranslate("associated-" + model.info.localNamePlural))}</h4></div> `;
              if (model.table) {
                $$payload3.out += "<!--[-->";
                data.model.reverseForeignKeyFields?.find((item) => item.urlModel === urlmodel);
                {
                  let selectButton = function($$payload4) {
                    $$payload4.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-secondary w-12 focus:relative" data-testid="select-button"${attr("title", safeTranslate("select-" + urlmodel))}><i class="fa-solid fa-hand-pointer"></i></button></span></div>`;
                  }, addButton = function($$payload4) {
                    $$payload4.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block border-e p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + model.info.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
                  };
                  ModelTable($$payload3, {
                    source: model.table,
                    deleteForm: model.deleteForm,
                    URLModel: urlmodel,
                    canSelectObject: canEditObject,
                    baseEndpoint: `/${stringify(urlmodel)}?genericcollection=${stringify(page.params.id)}`,
                    disableDelete: true,
                    selectButton,
                    addButton,
                    $$slots: { selectButton: true, addButton: true }
                  });
                }
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Tabs($$payload, {
        value: group,
        onValueChange: (e) => {
          group = e.value;
        },
        listJustify: "justify-center flex flex-wrap gap-2",
        list,
        content,
        $$slots: { list: true, content: true }
      });
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-S7kKBeU4.js.map
