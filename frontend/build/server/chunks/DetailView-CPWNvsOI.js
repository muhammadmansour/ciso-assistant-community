import { p as push, W as ensure_array_like, V as escape_html, S as attr_class, U as clsx, X as stringify, T as attr, R as bind_props, a as pop, M as store_get, Y as spread_props, Q as unsubscribe_stores } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { F as Form, S as SuperDebug } from './Form-BDbIHs7i.js';
import { g as superForm } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { tI as riskacceptancenotyetsubmittedmessage5, tF as riskacceptancevalidatingreviewmessage4, o4 as validate, vq as reject, tG as riskacceptancevalidatedmessage3, tV as revoke, dl as syncedwith1, dn as remoteid1, dp as lastsynced1, cA as status, b as m, B6 as objectsnotvisible2, oy as undefined$1, Ai as p1, Ah as p2, Ag as p3, Af as p4, mL as viewmore1, rV as sendquestionnaire1, Kw as draft, Ks as duplicate, e as edit, tK as riskacceptancemissingapprovermessage4, kF as submit, O$ as confirmmodalmessage2, O_ as confirmmodaltitle2, bp as cancel } from './_index-D7NdhnXA.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { s as safeTranslate, t as toCamelCase } from './i18n-CMphL55V.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { i as isURL } from './helpers-Bm9n0CNG.js';
import { c as getListViewFields, g as getModelInfo } from './crud-C1TvVbAO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import { T as Tooltip } from './Tooltip-Li45R7zs.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { I as ISO_8601_REGEX } from './constants-QzmVibOJ.js';
import './string-BMZjP7XX.js';
import './schemas-DwUKC0vK.js';
import './stores-D-WMoATo.js';
import './breadcrumbs-BA0IMSh1.js';
import { M as ModelTable } from './ModelTable-f2ddGEod.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { c as countMasked, i as isMaskedPlaceholder } from './related-visibility-ukSq_O7b.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';

function ConfirmModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  const cBase = "card bg-white p-6 w-modal shadow-2xl space-y-4 rounded-2xl border border-gray-100";
  const cHeader = "text-xl font-bold text-gray-900";
  const cForm = "p-4 space-y-4 rounded-container";
  let {
    parent,
    _form = {},
    URLModel = "",
    id = "",
    formAction,
    bodyComponent,
    bodyProps = {},
    debug = false,
    schema
  } = $$props;
  const { form } = superForm(_form, {
    dataType: "json",
    id: `confirm-modal-form-${crypto.randomUUID()}`
  });
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)}><header${attr_class(clsx(cHeader))}>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> <article>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body ?? "(body missing)")}</article> `;
    if (bodyComponent) {
      $$payload.out += "<!--[-->";
      const SvelteComponent = bodyComponent;
      $$payload.out += `<div class="max-h-96 overflow-y-scroll scroll card"><!---->`;
      SvelteComponent($$payload, spread_props([bodyProps]));
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    Form($$payload, {
      dataType: "json",
      action: formAction,
      data: _form,
      class: `modal-form ${stringify(cForm)}`,
      validators: schema,
      children: ($$payload2) => {
        $$payload2.out += `<footer${attr_class(`modal-footer ${stringify(parent.regionFooter)}`)}><button type="button"${attr_class(`btn ${stringify(parent.buttonNeutral)}`)}>${escape_html(cancel())}</button> <input type="hidden" name="urlmodel"${attr("value", URLModel)}/> <input type="hidden" name="id"${attr("value", id)}/> <button class="btn preset-filled-error-500" type="submit">${escape_html(submit())}</button></footer>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (debug === true) {
      $$payload.out += "<!--[-->";
      SuperDebug($$payload, {
        data: store_get($$store_subs ??= {}, "$form", form)
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function DetailView($$payload, $$props) {
  push();
  const modalStore = getModalStore();
  const defaultExcludes = [
    "id",
    "is_published",
    "localization_dict",
    "str",
    "path",
    "sync_mappings"
  ];
  let {
    data = void 0,
    mailing = false,
    fields = [],
    exclude = [],
    displayModelTable = true,
    dateFieldsToFormat = [
      "created_at",
      "updated_at",
      "expiry_date",
      "accepted_at",
      "rejected_at",
      "revoked_at",
      "eta",
      "expiration_date",
      "validation_deadline",
      "timestamp",
      "reported_at",
      "due_date",
      "start_date"
    ],
    widgets,
    actions,
    disableCreate = false,
    disableEdit = false,
    disableDelete = false
  } = $$props;
  exclude = [...exclude, ...defaultExcludes];
  const getRelatedModelIndex = (model, relatedModel) => {
    if (!model.reverseForeignKeyFields) return -1;
    return model.reverseForeignKeyFields.findIndex((o) => o.urlModel === relatedModel.urlModel);
  };
  let filteredData = data.model?.detailViewFields ? Object.fromEntries(Object.entries(data.data).filter(([key, _]) => data.model.detailViewFields.filter((field) => field.field === key).length > 0)) : data.data;
  let orderedEntries = () => {
    if (data.model?.detailViewFields) {
      return data.model.detailViewFields.map((fieldConfig) => [
        fieldConfig.field,
        data.data[fieldConfig.field]
      ]).filter(([key, value]) => value !== void 0);
    } else {
      return Object.entries(filteredData);
    }
  };
  const getFieldConfig = (fieldName) => {
    return data.model?.detailViewFields?.find((field) => field.field === fieldName);
  };
  let hasWidgets = !!widgets;
  let relatedFieldNames = new Set(data.model?.foreignKeyFields?.map((field) => field.field) ?? []);
  const getExpectedCount = (urlmodel, field) => {
    const candidates = [
      field?.expectedCountField,
      urlmodel ? urlmodel.replace(/-/g, "_") : void 0,
      field?.field
    ].filter(Boolean);
    for (const candidate of candidates) {
      const value = data.data?.[candidate];
      if (Array.isArray(value)) {
        return value.filter((item) => isMaskedPlaceholder(item)).length;
      }
    }
    return void 0;
  };
  function modalConfirm(id, name, action) {
    const urlModel = getModelInfo("risk-acceptances").urlModel;
    const modalComponent = {
      ref: ConfirmModal,
      props: {
        _form: { id, urlmodel: urlModel },
        id,
        debug: false,
        URLModel: urlModel,
        formAction: action
      }
    };
    const modal = {
      type: "component",
      component: modalComponent,
      // Data
      title: confirmmodaltitle2(),
      body: `${confirmmodalmessage2()}: ${name}?`
    };
    modalStore.trigger(modal);
  }
  function getReverseForeignKeyEndpoint({
    parentModel,
    targetUrlModel,
    field,
    id,
    endpointUrl
  }) {
    if (endpointUrl?.startsWith("./")) {
      return `/${parentModel.urlModel}/${id}/${endpointUrl.slice(2)}`;
    }
    return `/${targetUrlModel}?${field}=${id}`;
  }
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: data.model.name,
    domain: data.model.name === "folder" ? data.data.id : data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
  });
  let displayEditButton = function() {
    return canEditObject && ![
      "Submitted",
      "Accepted",
      "Rejected",
      "Revoked"
    ].includes(data.data.state) && !data.data.urn && !data.data.builtin || data?.urlModel === "terminologies" || data?.urlModel === "entities";
  };
  function getSortedRelatedModels() {
    return Object.entries(data?.relatedModels ?? {}).sort((a, b) => {
      return getRelatedModelIndex(data.model, a[1]) - getRelatedModelIndex(data.model, b[1]);
    });
  }
  let relatedModels = getSortedRelatedModels();
  let group = Object.keys(data?.relatedModels ?? {}).length > 0 ? getSortedRelatedModels()[0][0] : void 0;
  function truncateString(str, maxLength = 50) {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }
  let openStateRA = false;
  let expandedTable = false;
  const MAX_ROWS = 10;
  const each_array = ensure_array_like(data.data?.sync_mappings);
  const each_array_1 = ensure_array_like(orderedEntries().filter(([key, _]) => (fields.length > 0 ? fields.includes(key) : true) && !exclude.includes(key)));
  $$payload.out += `<div class="flex flex-col space-y-2">`;
  if (data.urlModel === "risk-acceptances" && data.data.state === "Created") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-row items-center bg-yellow-100 rounded-container shadow-sm px-6 py-2"><div class="text-yelloW-900">${escape_html(riskacceptancenotyetsubmittedmessage5())}</div></div>`;
  } else if (data.data.state === "Submitted" && page.data.user.id === data.data.approver.id) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="flex flex-row space-x-4 items-center bg-yellow-100 rounded-container shadow-sm px-6 py-2 justify-between"><div class="text-yellow-900">${escape_html(riskacceptancevalidatingreviewmessage4())}</div> <div class="flex space-x-2"><button class="btn preset-filled-success-500"><i class="fas fa-check mr-2"></i> ${escape_html(validate())}</button> <button class="btn preset-filled-error-500"><i class="fas fa-xmark mr-2"></i> ${escape_html(reject())}</button></div></div>`;
  } else if (data.data.state === "Accepted") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<div class="flex flex-row items-center space-x-4 bg-green-100 rounded-container shadow-lg px-6 py-2 mt-2 justify-between"><div class="text-green-900">${escape_html(riskacceptancevalidatedmessage3())}</div> `;
    if (page.data.user.id === data.data.approver.id) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="ml-auto whitespace-nowrap"><button class="btn preset-filled-error-500"><i class="fas fa-xmark mr-2"></i> ${escape_html(revoke())}</button></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="wgrc-card"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let syncMapping = each_array[$$index];
    $$payload.out += `<div class="mb-4 p-4 bg-secondary-50 border-l-4 border-secondary-400"><h3 class="font-semibold text-secondary-800 mb-2">${escape_html(syncedwith1({
      integrationName: syncMapping.provider?.toUpperCase() ?? "UNKNOWN"
    }))}</h3> <dl class="grid grid-cols-1 gap-1 sm:grid-cols-2 text-secondary-700"><dt class="font-medium">${escape_html(remoteid1())}</dt> <dd>${escape_html(syncMapping.remote_id)}</dd> <dt class="font-medium">${escape_html(lastsynced1())}</dt> <dd>${escape_html(new Date(syncMapping.last_synced_at).toLocaleString(getLocale()))}</dd> <dt class="font-medium">${escape_html(status())}</dt> <dd>${escape_html(safeTranslate(syncMapping.sync_status))}</dd></dl></div>`;
  }
  $$payload.out += `<!--]--> <div${attr_class(clsx(hasWidgets ? "flex flex-row flex-wrap gap-4" : "w-full"))}><div${attr_class(`flow-root rounded-lg border border-gray-100 py-3 ${stringify(hasWidgets ? "flex-1 min-w-[300px]" : "w-full")}`)}><dl class="-my-3 divide-y divide-gray-100 text-sm"><!--[-->`;
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    let [key, value] = each_array_1[index];
    const isRelatedField = relatedFieldNames.has(key);
    const hiddenCountForValue = isRelatedField ? countMasked(value) : 0;
    $$payload.out += `<div${attr_class(`grid grid-cols-1 gap-1 py-3 px-2 even:bg-surface-50 sm:grid-cols-5 sm:gap-4 ${stringify(index >= MAX_ROWS && !expandedTable ? "hidden" : "")}`)}><dt class="font-medium text-gray-900 flex items-center gap-2"${attr("data-testid", `${stringify(key.replace("_", "-"))}-field-title`)}><span>${escape_html(safeTranslate(key))}</span> `;
    if (getFieldConfig(key)?.tooltip) {
      $$payload.out += "<!--[-->";
      const tooltipKey = getFieldConfig(key)?.tooltip;
      const tooltipText = m[tooltipKey] ? m[tooltipKey]() : tooltipKey;
      {
        let trigger = function($$payload2) {
          $$payload2.out += `<i class="fas fa-info-circle text-sm text-blue-500 hover:text-blue-600 cursor-help"></i>`;
        }, content = function($$payload2) {
          $$payload2.out += `<p class="text-sm">${escape_html(tooltipText)}</p>`;
        };
        Tooltip($$payload, {
          positioning: { placement: "right" },
          contentBase: "card bg-gray-800 text-white p-3 max-w-xs shadow-xl border border-gray-700",
          openDelay: 200,
          closeDelay: 100,
          arrow: true,
          arrowBase: "arrow bg-gray-800 border border-gray-700",
          trigger,
          content,
          $$slots: { trigger: true, content: true }
        });
      }
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></dt> <dd class="text-gray-700 sm:col-span-4"><ul><li class="list-none whitespace-pre-line"${attr("data-testid", !(value instanceof Array) ? key.replace("_", "-") + "-field-value" : null)}>`;
    if (value !== null && value !== void 0 && (value !== "" || hiddenCountForValue > 0)) {
      $$payload.out += "<!--[-->";
      if (hiddenCountForValue > 0 && isMaskedPlaceholder(value) && !Array.isArray(value)) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: hiddenCountForValue }))}</p>`;
      } else if (key === "asset_class") {
        $$payload.out += "<!--[1-->";
        if (typeof value === "object" && (value.str || value.name)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `${escape_html(safeTranslate(value.str || value.name))}`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `${escape_html(safeTranslate(value))}`;
        }
        $$payload.out += `<!--]-->`;
      } else if (key === "library") {
        $$payload.out += "<!--[2-->";
        const itemHref = `/loaded-libraries/${value.id}`;
        Anchor($$payload, {
          breadcrumbAction: "push",
          href: itemHref,
          class: "anchor",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(value.name)}`;
          },
          $$slots: { default: true }
        });
      } else if (key === "severity" && data.urlModel !== "incidents") {
        $$payload.out += "<!--[3-->";
        const stringifiedSeverity = !value ? "--" : safeTranslate(value) ?? undefined$1();
        $$payload.out += `${escape_html(stringifiedSeverity)}`;
      } else if (key === "children_assets") {
        $$payload.out += "<!--[4-->";
        if (Object.keys(value).length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_2 = ensure_array_like(value);
          $$payload.out += `<ul class="inline-flex flex-wrap space-x-4"><!--[-->`;
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let val = each_array_2[$$index_1];
            $$payload.out += `<li${attr("data-testid", key.replace("_", "-") + "-field-value")}>`;
            if (val.str && val.id) {
              $$payload.out += "<!--[-->";
              const itemHref = `/${data.model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel}/${val.id}`;
              Anchor($$payload, {
                breadcrumbAction: "push",
                href: itemHref,
                class: "anchor",
                children: ($$payload2) => {
                  $$payload2.out += `<!---->${escape_html(truncateString(val.str))}`;
                },
                $$slots: { default: true }
              });
            } else if (val.str) {
              $$payload.out += "<!--[1-->";
              $$payload.out += `${escape_html(safeTranslate(val.str))}`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `${escape_html(value)}`;
            }
            $$payload.out += `<!--]--></li>`;
          }
          $$payload.out += `<!--]--></ul>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]-->`;
      } else if (key === "translations") {
        $$payload.out += "<!--[5-->";
        if (Object.keys(value).length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_3 = ensure_array_like(Object.entries(value));
          $$payload.out += `<div class="flex flex-col gap-2"><!--[-->`;
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let [lang, translation] = each_array_3[$$index_2];
            $$payload.out += `<div class="flex flex-row gap-2"><strong>${escape_html(lang)}:</strong> <span>${escape_html(safeTranslate(translation))}</span></div>`;
          }
          $$payload.out += `<!--]--></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]-->`;
      } else if (Array.isArray(value)) {
        $$payload.out += "<!--[6-->";
        const visibleValues = isRelatedField ? value.filter((item) => !isMaskedPlaceholder(item)) : value;
        if (visibleValues.length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_4 = ensure_array_like([...visibleValues].sort((a, b) => {
            if (!a.str && typeof a === "object" || !b.str && typeof b === "object") return 0;
            return safeTranslate(a.str || a).localeCompare(safeTranslate(b.str || b));
          }));
          $$payload.out += `<ul><!--[-->`;
          for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
            let val = each_array_4[$$index_3];
            $$payload.out += `<li${attr("data-testid", key.replace("_", "-") + "-field-value")}>`;
            if (key === "purposes") {
              $$payload.out += "<!--[-->";
              const itemHref = `/${data.model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel ?? "purposes"}/${val.id}`;
              Anchor($$payload, {
                breadcrumbAction: "push",
                href: itemHref,
                class: "anchor",
                children: ($$payload2) => {
                  $$payload2.out += `<!---->${escape_html(val.name)}`;
                },
                $$slots: { default: true }
              });
              $$payload.out += `<!----> `;
              if (val.legal_basis) {
                $$payload.out += "<!--[-->";
                $$payload.out += `<span class="text-gray-600">- ${escape_html(safeTranslate(val.legal_basis))}</span>`;
              } else {
                $$payload.out += "<!--[!-->";
              }
              $$payload.out += `<!--]-->`;
            } else if (key === "security_objectives" || key === "security_capabilities") {
              $$payload.out += "<!--[1-->";
              const [securityObjectiveName, securityObjectiveValue] = Object.entries(val)[0];
              $$payload.out += `${escape_html(safeTranslate(securityObjectiveName).toUpperCase())}: ${escape_html(securityObjectiveValue)}`;
            } else if (val.str && val.id && key !== "qualifications" && key !== "relationship") {
              $$payload.out += "<!--[2-->";
              const itemHref = `/${data.model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel}/${val.id}`;
              Anchor($$payload, {
                breadcrumbAction: "push",
                href: itemHref,
                class: "anchor",
                children: ($$payload2) => {
                  $$payload2.out += `<!---->${escape_html(val.str)}`;
                },
                $$slots: { default: true }
              });
            } else if (val.str) {
              $$payload.out += "<!--[3-->";
              $$payload.out += `${escape_html(safeTranslate(val.str))}`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `${escape_html(value)}`;
            }
            $$payload.out += `<!--]--></li>`;
          }
          $$payload.out += `<!--]--></ul> `;
          if (hiddenCountForValue > 0) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<p class="mt-1 text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: hiddenCountForValue }))}</p>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else if (hiddenCountForValue > 0) {
          $$payload.out += "<!--[1-->";
          $$payload.out += `<p class="text-xs text-yellow-700">${escape_html(objectsnotvisible2({ count: hiddenCountForValue }))}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `--`;
        }
        $$payload.out += `<!--]-->`;
      } else if (value.id && !value.hexcolor) {
        $$payload.out += "<!--[7-->";
        const itemHref = `/${data.model?.foreignKeyFields?.find((item) => item.field === key)?.urlModel}/${value.id}`;
        if (key === "ro_to_couple") {
          $$payload.out += "<!--[-->";
          Anchor($$payload, {
            breadcrumbAction: "push",
            href: itemHref,
            class: "anchor",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(safeTranslate(toCamelCase(value.str.split(" - ")[0])))} - ${escape_html(value.str.split("-")[1])}`;
            },
            $$slots: { default: true }
          });
        } else {
          $$payload.out += "<!--[!-->";
          Anchor($$payload, {
            breadcrumbAction: "push",
            href: itemHref,
            class: "anchor",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(value.str || value.name)}`;
            },
            $$slots: { default: true }
          });
        }
        $$payload.out += `<!--]-->`;
      } else if (value === "P1") {
        $$payload.out += "<!--[8-->";
        $$payload.out += `<li class="fa-solid fa-flag text-red-500"></li> ${escape_html(p1())}`;
      } else if (value === "P2") {
        $$payload.out += "<!--[9-->";
        $$payload.out += `<li class="fa-solid fa-flag text-orange-500"></li> ${escape_html(p2())}`;
      } else if (value === "P3") {
        $$payload.out += "<!--[10-->";
        $$payload.out += `<li class="fa-solid fa-flag text-blue-500"></li> ${escape_html(p3())}`;
      } else if (value === "P4") {
        $$payload.out += "<!--[11-->";
        $$payload.out += `<li class="fa-solid fa-flag text-gray-500"></li> ${escape_html(p4())}`;
      } else if (key === "icon") {
        $$payload.out += "<!--[12-->";
        $$payload.out += `<i${attr_class(`text-lg fa ${stringify(data.data.icon_fa_class)}`)}></i> ${escape_html(safeTranslate((value.str || value.name) ?? value))}`;
      } else if (isURL(value) && !value.startsWith("urn")) {
        $$payload.out += "<!--[13-->";
        Anchor($$payload, {
          breadcrumbAction: "push",
          href: value,
          target: "_blank",
          class: "anchor",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(value)}`;
          },
          $$slots: { default: true }
        });
      } else if (ISO_8601_REGEX.test(value) && dateFieldsToFormat.includes(key)) {
        $$payload.out += "<!--[14-->";
        $$payload.out += `${escape_html(formatDateOrDateTime(value, getLocale()))}`;
      } else if (key === "description" || key === "observation" || key === "annotation") {
        $$payload.out += "<!--[15-->";
        MarkdownRenderer($$payload, { content: value });
      } else if (m[toCamelCase(value.str || value.name)]) {
        $$payload.out += "<!--[16-->";
        $$payload.out += `${escape_html(safeTranslate((value.str || value.name) ?? value))}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html((value.str || value.name) ?? value)}`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `--`;
    }
    $$payload.out += `<!--]--></li></ul></dd></div>`;
  }
  $$payload.out += `<!--]--></dl></div> `;
  if (hasWidgets) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex-1 min-w-[300px] flex flex-col"><div class="h-full">`;
    widgets?.($$payload);
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (orderedEntries().filter(([key, _]) => fields.length > 0 ? fields.includes(key) : !exclude.includes(key)).length > MAX_ROWS) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="m-5 text-blue-800"${attr("aria-expanded", expandedTable)}><i${attr_class(`${stringify("fas fa-chevron-down")} mr-3`)}></i> ${escape_html(viewmore1())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex flex-row justify-end mt-4 gap-2">`;
  if (mailing) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="btn preset-filled-primary-500 h-fit"><i class="fas fa-paper-plane mr-2"></i> ${escape_html(sendquestionnaire1())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.data.state === "Submitted" && canEditObject) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button class="btn preset-filled-primary-500"${attr("disabled", !data.data.approver, true)}><i class="fas fa-arrow-alt-circle-left mr-2"></i> ${escape_html(draft())}</button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (displayEditButton()) {
    $$payload.out += "<!--[-->";
    if (data.data.state === "Created") {
      $$payload.out += "<!--[-->";
      {
        let trigger = function($$payload2) {
          $$payload2.out += `<i class="fas fa-paper-plane mr-2"></i> ${escape_html(submit())}`;
        }, content = function($$payload2) {
          $$payload2.out += `<p>${escape_html(riskacceptancemissingapprovermessage4())}</p>`;
        };
        Tooltip($$payload, {
          open: openStateRA && !data.data.approver,
          onOpenChange: (e) => openStateRA = e.open,
          positioning: { placement: "top" },
          contentBase: "card preset-tonal-error p-4",
          openDelay: 200,
          closeDelay: 100,
          arrow: true,
          arrowBase: "arrow preset-tonal-surface border border-error-100",
          onclick: () => {
            if (data.data.approver) modalConfirm(data.data.id, data.data.name, "?/submit");
          },
          onkeydown: (_) => {
            if (data.data.approver) return modalConfirm(data.data.id, data.data.name, "?/submit");
          },
          triggerBase: data.data.approver ? "btn preset-filled-primary-500 *:pointer-events-none" : "btn preset-filled-primary-500 opacity-50 *:pointer-events-none cursor-not-allowed",
          disabled: data.data.approver,
          trigger,
          content,
          $$slots: { trigger: true, content: true }
        });
      }
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    Anchor($$payload, {
      breadcrumbAction: "push",
      href: `${page.url.pathname}/edit?next=${page.url.pathname}`,
      label: edit(),
      class: "btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2" data-testid="edit-button"></i>${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    if (data.urlModel === "applied-controls") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm" data-testid="duplicate-button"><i class="fa-solid fa-copy mr-2"></i> ${escape_html(duplicate())}</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  actions?.($$payload);
  $$payload.out += `<!----></div></div></div> `;
  if (relatedModels.length > 0 && displayModelTable) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wgrc-card mt-6">`;
    {
      let list = function($$payload2) {
        const each_array_5 = ensure_array_like(relatedModels);
        $$payload2.out += `<!--[-->`;
        for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
          let [urlmodel, model] = each_array_5[$$index_5];
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
        const each_array_6 = ensure_array_like(relatedModels);
        $$payload2.out += `<!--[-->`;
        for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
          let [urlmodel, model] = each_array_6[$$index_6];
          $$payload2.out += `<!---->`;
          Tabs.Panel($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<!---->`;
              {
                const field = data.model.reverseForeignKeyFields.find((item) => item.urlModel === urlmodel);
                const fieldsToUse = field?.tableFields || getListViewFields({
                  key: urlmodel,
                  featureFlags: page.data?.featureflags
                }).body.filter((v) => v !== field.field);
                $$payload3.out += `<div class="flex flex-row justify-between px-4 py-2"><h4 class="font-semibold lowercase capitalize-first my-auto">${escape_html(safeTranslate("associated-" + model.info.localNamePlural))}</h4></div>  `;
                if (model.table) {
                  $$payload3.out += "<!--[-->";
                  {
                    let addButton = function($$payload4) {
                      $$payload4.out += `<button class="btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] shadow-sm self-end my-auto" data-testid="add-button"><i class="fa-solid fa-plus mr-2 lowercase"></i>${escape_html(safeTranslate("add-" + model.info.localName))}</button>`;
                    };
                    ModelTable($$payload3, {
                      baseEndpoint: getReverseForeignKeyEndpoint({
                        parentModel: data.model,
                        targetUrlModel: urlmodel,
                        field: field.field,
                        id: data.data.id,
                        endpointUrl: field.endpointUrl
                      }),
                      source: model.table,
                      disableCreate: disableCreate || model.disableCreate,
                      disableEdit: disableEdit || model.disableEdit,
                      disableDelete: disableDelete || model.disableDelete,
                      deleteForm: model.deleteForm,
                      URLModel: urlmodel,
                      expectedCount: getExpectedCount(urlmodel, field),
                      fields: fieldsToUse,
                      defaultFilters: field.defaultFilters || {},
                      addButton,
                      $$slots: { addButton: true }
                    });
                  }
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              }
              $$payload3.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Tabs($$payload, {
        value: group,
        onValueChange: (e) => group = e.value,
        listJustify: "justify-center",
        listClasses: "flex flex-wrap",
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
  bind_props($$props, { data, exclude });
  pop();
}

export { DetailView as D };
//# sourceMappingURL=DetailView-CPWNvsOI.js.map
