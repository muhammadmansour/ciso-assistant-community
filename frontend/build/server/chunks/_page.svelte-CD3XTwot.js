import { p as push, M as store_get, W as ensure_array_like, V as escape_html, T as attr, X as stringify, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { D as DetailView } from './DetailView-CkUgDz5l.js';
import { F as Form } from './Form-BuUIlHHA.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { m as modelSchema } from './schemas-BOdIHh1e.js';
import { po as timeline, ot as unknownordeleteduser3, Jp as edited, BS as noobservation1, Th as associatedevidences1, W4 as addtimelineentry2, gK as incident, gL as entrytype1, gN as timestamp, gM as entry, cM as observation, cW as evidences, bp as cancel, bq as save, UZ as asmarkdown1, UY as aspdf3, Ip as exportbutton1 } from './_index-CqZWReca.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { a as createModalCache } from './stores-D-WMoATo.js';
import { D as DataHandler, l as loadTableData, S as Search, R as RowsPerPage, T as TableRowActions, a as RowCount, P as Pagination } from './ModelTable-D9-j7Xao.js';
import { l as listViewFields, A as AutocompleteSelect } from './crud-Dl9mduNa.js';
import { p as page } from './index3-BwfRm5YV.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { S as Select } from './Select-Dvtp0860.js';
import { T as TextField } from './TextField-6ZKq0gis.js';
import { M as MarkdownField } from './MarkdownField-JZPZO4SX.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './constants-lv6aycRl.js';
import './breadcrumbs-D1ratxIQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './Anchor-C2rLUn2N.js';
import './helpers-Bm9n0CNG.js';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './related-visibility-ukSq_O7b.js';
import './stores3-psVfZSQ7.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './client-DqP3yP6V.js';
import './DeleteConfirmModal-C22czeYM.js';
import './client.svelte-CxCno2aW.js';
import 'marked';
import 'sanitize-html';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form } = $$props;
  const invalidateAll = true;
  const formAction = "?/create";
  const timelineForm = data.relatedModels["timeline-entries"].createForm;
  const model = data.relatedModels["timeline-entries"];
  const schema = modelSchema("timeline-entries");
  const _form = superForm(timelineForm, {
    dataType: "json",
    enctype: "application/x-www-form-urlencoded",
    invalidateAll,
    applyAction: true,
    resetForm: true,
    validators: zod(schema),
    taintedMessage: false,
    validationMethod: "auto",
    onUpdated: () => {
      createModalCache.deleteCache(model.urlModel);
      _form.form.update((current) => ({
        ...current,
        evidences: void 0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }));
    }
  });
  const source = data.relatedModels["timeline-entries"].table;
  const numberRowsPerPage = 10;
  const handler = new DataHandler(
    source.body.map((item, index) => {
      return {
        ...item,
        meta: source.meta ? source.meta.results ? { ...source.meta.results[index] } : { ...source.meta[index] } : void 0
      };
    }),
    {
      rowsPerPage: numberRowsPerPage,
      totalRows: source.meta.count
    }
  );
  const rows = handler.getRows();
  const field = data.model.reverseForeignKeyFields.find((item) => item.urlModel === "timeline-entries");
  handler.onChange((state) => loadTableData({
    state,
    URLModel: "timeline-entries",
    endpoint: `/timeline-entries?incident=${data.data.id}`,
    fields: listViewFields["timeline-entries"].body.filter((v) => v !== field.field)
  }));
  const preventDelete = (row) => ["severity_changed", "status_changed"].includes(row.meta.entry_type);
  getModalStore();
  let resetForm = true;
  let formStore = _form.form;
  run(() => {
    if (form?.newEvidence) {
      resetForm = false;
      _form.form.update(
        (current) => ({
          ...current,
          evidences: current.evidences ? [...current.evidences, form?.newEvidence] : [form?.newEvidence]
        }),
        { taint: false }
      );
      form.newEvidence = void 0;
      console.debug("formStore", store_get($$store_subs ??= {}, "$formStore", formStore));
    }
  });
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: data.model.name,
    domain: data.model.name === "folder" ? data.data.id : data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
  });
  let exportPopupOpen = false;
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$rows", rows));
  $$payload.out += `<div class="flex flex-col space-y-2">`;
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2">`;
      {
        let trigger = function($$payload3) {
          $$payload3.out += `<span data-testid="export-button"><i class="fa-solid fa-download mr-2"></i>${escape_html(exportbutton1())}</span>`;
        }, content = function($$payload3) {
          $$payload3.out += `<div><p class="block px-4 py-2 text-sm text-gray-800">${escape_html(incident())}</p> <a${attr("href", `/incidents/${stringify(data.data.id)}/export/md`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(asmarkdown1())}</a> <a${attr("href", `/incidents/${stringify(data.data.id)}/export/pdf`)} class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">... ${escape_html(aspdf3())}</a></div>`;
        };
        Popover($$payload2, {
          open: exportPopupOpen,
          onOpenChange: (e) => exportPopupOpen = e.open,
          positioning: { placement: "bottom" },
          triggerBase: "btn preset-filled-primary-500 w-full",
          contentBase: "card whitespace-nowrap bg-white py-2 w-fit shadow-lg space-y-1",
          zIndex: "1000",
          trigger,
          content,
          $$slots: { trigger: true, content: true }
        });
      }
      $$payload2.out += `<!----></div>`;
    }, widgets = function($$payload2) {
      $$payload2.out += `<div class="shadow-xl border-l border-t p-4 rounded-sm bg-linear-to-tl from-slate-50 to-white"${attr("hidden", !canEditObject, true)}>`;
      if (canEditObject) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<h1 class="text-xl font-bold mb-1">${escape_html(addtimelineentry2())}</h1> `;
        {
          let children = function($$payload3, { form: form2, data: data2, initialData }) {
            AutocompleteSelect($$payload3, {
              form: form2,
              optionsEndpoint: "incidents",
              field: "incident",
              label: incident(),
              hidden: initialData.incident
            });
            $$payload3.out += `<!----> `;
            Select($$payload3, {
              form: form2,
              disableDoubleDash: true,
              options: model.selectOptions["entry_type"],
              field: "entry_type",
              label: entrytype1()
            });
            $$payload3.out += `<!----> <!---->`;
            {
              TextField($$payload3, {
                type: "datetime-local",
                step: "1",
                form: form2,
                field: "timestamp",
                label: timestamp()
              });
            }
            $$payload3.out += `<!----> `;
            TextField($$payload3, {
              form: form2,
              field: "entry",
              label: entry(),
              "data-focusindex": "0"
            });
            $$payload3.out += `<!----> `;
            MarkdownField($$payload3, {
              form: form2,
              field: "observation",
              label: observation()
            });
            $$payload3.out += `<!----> <!---->`;
            {
              $$payload3.out += `<div class="flex items-end justify-center"><div class="w-full mr-2">`;
              AutocompleteSelect($$payload3, {
                form: form2,
                multiple: true,
                optionsEndpoint: "evidences",
                optionsDetailedUrlParameters: [
                  ["scope_folder_id", page.data.data?.folder?.id]
                ],
                field: "evidences",
                resetForm,
                label: evidences()
              });
              $$payload3.out += `<!----></div> <button class="btn bg-gray-300 h-11 w-10" type="button" data-testid="add-button-evidence"><i class="fa-solid fa-plus text-sm"></i></button></div>`;
            }
            $$payload3.out += `<!----> <div class="flex flex-row justify-between space-x-4"><button class="btn preset-filled-tertiary-500 font-semibold w-full" data-testid="reset-button" type="button">${escape_html(cancel())}</button> <button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="save-button-event" type="submit">${escape_html(save())}</button></div>`;
          };
          Form($$payload2, {
            class: "flex flex-col space-y-3",
            action: formAction,
            dataType: "json",
            enctype: "application/x-www-form-urlencoded",
            data: timelineForm,
            _form,
            invalidateAll,
            validators: zod(schema),
            children,
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    };
    DetailView($$payload, {
      data,
      displayModelTable: false,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  $$payload.out += `<!----> <div class="card shadow-lg bg-white p-4 space-y-2"><div class="flex flex-row justify-between items-center mb-4"><h1 class="text-xl font-bold">${escape_html(timeline())}</h1> `;
  Search($$payload, { handler });
  $$payload.out += `<!----> `;
  RowsPerPage($$payload, { handler });
  $$payload.out += `<!----></div> <ol class="relative border-s border-primary-500 dark:border-primary-700"><!--[-->`;
  for (let rowIndex = 0, $$length = each_array.length; rowIndex < $$length; rowIndex++) {
    let row = each_array[rowIndex];
    const meta = row?.meta ?? row;
    const actionsURLModel = "timeline-entries";
    $$payload.out += `<li class="ms-4"><div class="absolute w-3 h-3 bg-primary-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-primary-900 dark:bg-primary-700"></div> <div class="flex flex-col"><div class="flex flex-row items-center space-x-3 mb-1"><time class="text-sm font-normal leading-none text-gray-600 dark:text-gray-800">${escape_html(formatDateOrDateTime(meta.timestamp, getLocale()))} - `;
    if (meta.author) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(meta?.author?.str)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(unknownordeleteduser3())}`;
    }
    $$payload.out += `<!--]--></time> `;
    TableRowActions($$payload, {
      baseClass: "space-x-2 whitespace-nowrap flex flex-row items-center text-sm text-surface-700",
      deleteForm: data.relatedModels["timeline-entries"].deleteForm,
      model: model.info,
      URLModel: actionsURLModel,
      detailURL: `/${actionsURLModel}/${meta.id}`,
      editURL: `/${actionsURLModel}/${meta.id}/edit?next=${encodeURIComponent(page.url.pathname + page.url.search)}`,
      row,
      identifierField: "id",
      preventDelete: preventDelete(row)
    });
    $$payload.out += `<!----> `;
    if (formatDateOrDateTime(meta.updated_at, getLocale()) !== formatDateOrDateTime(meta.created_at, getLocale())) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-xs italic text-gray-500 dark:text-gray-400">(${escape_html(edited())})</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex mb-2"><span class="text-xs font-mono bg-violet-700 text-white py-1 px-2 rounded-sm mr-1">${escape_html(safeTranslate(meta.entry_type))}</span> <a${attr("href", `/${actionsURLModel}/${meta.id}`)} class="font-semibold capitalize"${attr("data-testid", `name-entry-${stringify(rowIndex)}`)}>${escape_html(safeTranslate(meta.entry))}</a></div> <div class="py-1 mb-2">`;
    if (meta.observation) {
      $$payload.out += "<!--[-->";
      MarkdownRenderer($$payload, {
        content: meta.observation,
        class: "bg-primary-50 rounded-lg p-2"
      });
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="italic text-gray-500 dark:text-gray-400">${escape_html(noobservation1())}</p>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (meta.evidences && meta.evidences.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(meta.evidences);
      $$payload.out += `<div class="mb-2"><p class="text-xs font-medium text-gray-700 mb-1">${escape_html(associatedevidences1())}:</p> <div class="flex flex-wrap gap-1"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let evidence = each_array_1[$$index];
        $$payload.out += `<a${attr("href", `/evidences/${evidence.id}`)} class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors max-w-50"${attr("title", evidence.str)}><i class="fa-solid fa-paperclip mr-1 flex-shrink-0"></i> <span class="truncate">${escape_html(evidence.str)}</span></a>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></li>`;
  }
  $$payload.out += `<!--]--></ol> <footer class="flex justify-between items-center space-x-8 p-2">`;
  {
    $$payload.out += "<!--[-->";
    RowCount($$payload, { handler });
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    Pagination($$payload, { handler });
  }
  $$payload.out += `<!--]--></footer></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CD3XTwot.js.map
