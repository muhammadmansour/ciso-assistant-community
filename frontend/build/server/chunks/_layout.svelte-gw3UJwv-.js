import { p as push, aa as head, M as store_get, Z as attr_style, V as escape_html, Q as unsubscribe_stores, a as pop, S as attr_class, X as stringify, T as attr, _ as spread_attributes, Y as spread_props, R as bind_props, W as ensure_array_like, U as clsx } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { i as initializeToastStore, g as getToastStore } from './stores4-JOwRngIp.js';
import { i as initializeModalStore, g as getModalStore } from './stores2-D1NYwn5V.js';
import { s as safeTranslate } from './i18n-CnZlshhm.js';
import { M as ModelForm } from './ModelForm-BGzMREIU.js';
import { D as DeleteConfirmModal } from './DeleteConfirmModal-D06m6CiP.js';
import { g as getFlash } from './client.svelte-CxCno2aW.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { c as clientSideToast } from './stores-CMqbeBUT.js';
import './index-CRjgakYW.js';
import './_index-BNamVw9A.js';
import './runtime-B_ICGJZJ.js';
import './index-server-DEEfjxiI.js';
import './Form-D44apvvs.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './TextField--8TVvuvT.js';
import './MarkdownField-CYxeg9XD.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './LoadingSpinner-09kJChNn.js';
import './crud-BiYAuEEm.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './helpers-Bm9n0CNG.js';
import '@floating-ui/dom';
import './Select-6Wp9bM99.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';
import './machine.svelte-CNa8MjEx.js';
import './Checkbox-BWsW28Xu.js';
import './Switch-IjY5G1Ys.js';
import './index5-Brzv1W4u.js';
import './Score-CSpnV2pu.js';
import './ProgressRing-HAZcZKrs.js';
import './index6-Cn6jj1jH.js';
import './HiddenInput-D0PY8sFK.js';
import './RadioGroup-BatokiWT.js';
import './Anchor-CCjZl5ir.js';
import './breadcrumbs-DdEobqL1.js';
import './string-BMZjP7XX.js';
import './schemas-Cmsh2Wi5.js';
import './OrderedEntryList-D4nxTp-O.js';
import './zod-BTgf12zS.js';

function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [x_value, x_unit] = split_css_unit(x);
  const [y_value, y_unit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
  };
}
function Toast($$payload, $$props) {
  push();
  var $$store_subs;
  const toastStore = getToastStore();
  let {
    position = "b",
    max = 3,
    background = "preset-filled-secondary-500",
    width = "max-w-[640px]",
    color = "",
    padding = "p-4",
    spacing = "space-x-4",
    rounded = "rounded-container",
    shadow = "shadow-lg",
    zIndex = "z-888",
    buttonAction = "btn preset-filled",
    buttonDismiss = "btn-icon btn-icon-sm preset-filled",
    buttonDismissLabel = "✕"
  } = $$props;
  const cWrapper = "flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none";
  const cSnackbar = "flex flex-col gap-y-2";
  const cToast = "flex justify-between items-center pointer-events-auto";
  const cToastActions = "flex items-center space-x-2";
  let cPosition = void 0;
  let cAlign = void 0;
  switch (position) {
    case "t":
      cPosition = "justify-center items-start";
      cAlign = "items-center";
      break;
    case "b":
      cPosition = "justify-center items-end";
      cAlign = "items-center";
      break;
    case "l":
      cPosition = "justify-start items-center";
      cAlign = "items-start";
      break;
    case "r":
      cPosition = "justify-end items-center";
      cAlign = "items-end";
      break;
    case "tl":
      cPosition = "justify-start items-start";
      cAlign = "items-start";
      break;
    case "tr":
      cPosition = "justify-end items-start";
      cAlign = "items-end";
      break;
    case "bl":
      cPosition = "justify-start items-end";
      cAlign = "items-start";
      break;
    case "br":
      cPosition = "justify-end items-end";
      cAlign = "items-end";
      break;
  }
  let wrapperVisible = false;
  let classProp = "";
  let classesWrapper = `${cWrapper} ${cPosition} ${zIndex} ${classProp}`;
  let classesSnackbar = `${cSnackbar} ${cAlign} ${padding}`;
  let classesToast = `${cToast} ${width} ${color} ${padding} ${spacing} ${rounded} ${shadow}`;
  let filteredToasts = Array.from(store_get($$store_subs ??= {}, "$toastStore", toastStore)).slice(0, max);
  run(() => {
    if (filteredToasts.length) {
      wrapperVisible = true;
    }
  });
  if (filteredToasts.length > 0 || wrapperVisible) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(filteredToasts);
    $$payload.out += `<div${attr_class(`snackbar-wrapper ${stringify(classesWrapper)}`)} data-testid="snackbar-wrapper"><div${attr_class(`snackbar ${stringify(classesSnackbar)}`)}><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let t = each_array[i];
      $$payload.out += `<div${attr("role", t.hideDismiss ? "alert" : "alertdialog")} aria-live="polite"><div${attr_class(`toast ${stringify(classesToast)} ${stringify(t.background ?? background)} ${stringify(t.classes ?? "")}`)} data-testid="toast"><div class="text-base">${escape_html(t.message)}</div> `;
      if (t.action || !t.hideDismiss) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr_class(`toast-actions ${stringify(cToastActions)}`)}>`;
        if (t.action) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<button${attr_class(clsx(buttonAction))}>${escape_html(t.action.label)}</button>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (!t.hideDismiss) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<button${attr_class(clsx(buttonDismiss))} aria-label="Dismiss toast">${escape_html(buttonDismissLabel)}</button>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Modal($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    components = {},
    position = "items-center",
    background = "bg-surface-100-900",
    width = "w-modal",
    height = "h-auto",
    padding = "p-4",
    spacing = "space-y-4",
    rounded = "rounded-container",
    shadow = "shadow-xl",
    zIndex = "z-999",
    buttonNeutral = "preset-tonal-surface border border-surface-500",
    buttonPositive = "preset-filled",
    buttonTextCancel = "Cancel",
    buttonTextConfirm = "Confirm",
    buttonTextSubmit = "Submit",
    regionBackdrop = "",
    regionHeader = "text-2xl font-bold",
    regionBody = "max-h-[400px] overflow-y-auto whitespace-pre-line",
    regionFooter = "flex justify-end space-x-2",
    transitions = true,
    transitionIn = fly,
    transitionInParams = { duration: 150, opacity: 0, x: 0, y: 100 },
    transitionOut = fly,
    transitionOutParams = { duration: 150, opacity: 0, x: 0, y: 100 }
  } = $$props;
  const cBackdrop = "fixed top-0 left-0 right-0 bottom-0 bg-surface-950/50 p-4";
  const cTransitionLayer = "w-full h-fit min-h-full overflow-y-auto flex justify-center";
  const cModal = "block overflow-y-auto";
  const cModalImage = "w-full h-auto";
  let promptValue = void 0;
  const buttonTextDefaults = {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  };
  let currentComponent = void 0;
  let backdropOverflow = "overflow-y-auto";
  const modalStore = getModalStore();
  function handleModals(modals) {
    if (modals[0].type === "prompt") promptValue = modals[0].value;
    buttonTextCancel = modals[0].buttonTextCancel || buttonTextDefaults.buttonTextCancel;
    buttonTextConfirm = modals[0].buttonTextConfirm || buttonTextDefaults.buttonTextConfirm;
    buttonTextSubmit = modals[0].buttonTextSubmit || buttonTextDefaults.buttonTextSubmit;
    currentComponent = typeof modals[0].component === "string" ? components[modals[0].component] : modals[0].component;
  }
  function onClose() {
    if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].response) store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].response(false);
    modalStore.close();
  }
  function onConfirm() {
    if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].response) store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].response(true);
    modalStore.close();
  }
  let classProp = "";
  run(() => {
    if (store_get($$store_subs ??= {}, "$modalStore", modalStore).length) handleModals(store_get($$store_subs ??= {}, "$modalStore", modalStore));
  });
  run(() => {
  });
  let cPosition = store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.position ?? position;
  let classesBackdrop = `${cBackdrop} ${regionBackdrop} ${zIndex} ${classProp} ${store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.backdropClasses ?? ""}`;
  let classesTransitionLayer = `${cTransitionLayer} ${cPosition ?? ""}`;
  let classesModal = `${cModal} ${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow} ${store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.modalClasses ?? ""}`;
  let parent = {
    position,
    background,
    width,
    height,
    padding,
    spacing,
    rounded,
    shadow,
    buttonNeutral,
    buttonPositive,
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit,
    regionBackdrop,
    regionHeader,
    regionBody,
    regionFooter,
    onClose,
    onConfirm
  };
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      $$payload.out += `<div${attr_class(`modal-backdrop ${stringify(classesBackdrop)} ${stringify(backdropOverflow)}`)} data-testid="modal-backdrop" role="dialog" tabindex="0"><div${attr_class(`modal-transition ${stringify(classesTransitionLayer)}`)}>`;
      if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].type !== "component") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr_class(`modal ${stringify(classesModal)}`)} data-testid="modal" role="dialog" aria-modal="true"${attr("aria-label", store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "Modal")}>`;
        if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.title) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<header${attr_class(`modal-header ${stringify(regionHeader)} flex justify-between items-center`)}><span>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title)}</span> <button type="button" class="btn-icon btn-icon-sm text-gray-500 hover:text-gray-700" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></header>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.body) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<article${attr_class(`modal-body ${stringify(regionBody)}`)}>${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body)}</article>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.image && typeof store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.image === "string") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<img${attr_class(`modal-image ${stringify(cModalImage)}`)}${attr("src", store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.image)} alt="Modal"/>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].type === "alert") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<footer${attr_class(`modal-footer ${stringify(regionFooter)}`)}><button type="button"${attr_class(`btn ${stringify(buttonNeutral)}`)}>${escape_html(buttonTextCancel)}</button></footer>`;
        } else if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].type === "confirm") {
          $$payload.out += "<!--[1-->";
          $$payload.out += `<footer${attr_class(`modal-footer ${stringify(regionFooter)}`)}><button type="button"${attr_class(`btn ${stringify(buttonNeutral)}`)}>${escape_html(buttonTextCancel)}</button> <button type="button"${attr_class(`btn ${stringify(buttonPositive)}`)}>${escape_html(buttonTextConfirm)}</button></footer>`;
        } else if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].type === "prompt") {
          $$payload.out += "<!--[2-->";
          $$payload.out += `<form class="space-y-4"><input${spread_attributes(
            {
              class: "modal-prompt-input input",
              name: "prompt",
              type: "text",
              value: promptValue,
              ...store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].valueAttr
            },
            null
          )}/> <footer${attr_class(`modal-footer ${stringify(regionFooter)}`)}><button type="button"${attr_class(`btn ${stringify(buttonNeutral)}`)}>${escape_html(buttonTextCancel)}</button> <button type="submit"${attr_class(`btn ${stringify(buttonPositive)}`)}>${escape_html(buttonTextSubmit)}</button></footer></form>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div${attr_class(`modal contents ${stringify(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]?.modalClasses ?? "")}`)} data-testid="modal-component" role="dialog" aria-modal="true"${attr("aria-label", store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "Modal")}>`;
        if (currentComponent?.slot) {
          $$payload.out += "<!--[-->";
          const SvelteComponent = currentComponent?.ref;
          $$payload.out += `<!---->`;
          SvelteComponent($$payload, spread_props([
            currentComponent?.props,
            {
              parent,
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(currentComponent?.slot)}`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
          const SvelteComponent_1 = currentComponent?.ref;
          $$payload.out += `<!---->`;
          SvelteComponent_1($$payload, spread_props([currentComponent?.props, { parent }]));
          $$payload.out += `<!---->`;
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  });
  pop();
}
function DisplayJSONModal($$payload, $$props) {
  push();
  var $$store_subs;
  const cBase = "card bg-surface-50 p-4 w-modal shadow-xl space-y-4";
  const cHeader = "text-2xl font-bold";
  const modalStore = getModalStore();
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    const body = store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].body;
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)}><header${attr_class(clsx(cHeader))} data-testid="modal-title">${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> `;
    if (body) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(Object.entries(JSON.parse(body)));
      $$payload.out += `<div data-testid="key-value"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [key, value] = each_array[$$index];
        $$payload.out += `<div><div${attr("data-testid", `${stringify(key)}-key`)} class="font-bold">${escape_html(safeTranslate(key))}:</div> <div${attr("data-testid", `${stringify(key)}-value`)}>${escape_html(safeTranslate(value))}</div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
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
function CreateModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  let closeModal = true;
  const cBase = "card bg-white p-6 w-fit max-w-4xl shadow-2xl space-y-4 rounded-2xl border border-gray-100";
  const cHeader = "text-xl font-bold text-gray-900 whitespace-pre-line";
  let {
    parent,
    form,
    importFolder = false,
    model,
    customNameDescription = model.customNameDescription ?? false,
    duplicate = false,
    invalidateAll = true,
    formAction = "?/create",
    context = "create",
    origin = null,
    additionalInitialData = {},
    suggestions = {},
    taintedMessage = false,
    debug = false,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`modal-example-form ${stringify(cBase)}`)}><div class="flex items-center justify-between"><header${attr_class(clsx(cHeader))} data-testid="modal-title">${escape_html(store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].title ?? "(title missing)")}</header> <div role="button" tabindex="0" class="flex items-center hover:text-primary-500 cursor-pointer"><i class="fa-solid fa-xmark"></i></div></div> `;
    ModelForm($$payload, spread_props([
      {
        form,
        customNameDescription,
        importFolder,
        additionalInitialData,
        suggestions,
        parent,
        invalidateAll,
        model,
        closeModal,
        context,
        origin,
        duplicate,
        taintedMessage,
        caching: true,
        action: formAction,
        debug
      },
      rest
    ]));
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function ProblematicScenariosModal($$payload, $$props) {
  push();
  var $$store_subs;
  const modalStore = getModalStore();
  const cBase = "card bg-surface-50 p-4 w-modal shadow-xl space-y-4";
  const cHeader = "text-2xl font-bold";
  if (store_get($$store_subs ??= {}, "$modalStore", modalStore)[0]) {
    $$payload.out += "<!--[-->";
    const scenarios = store_get($$store_subs ??= {}, "$modalStore", modalStore)[0].meta?.scenarios || [];
    $$payload.out += `<div${attr_class(clsx(cBase))}><header${attr_class(clsx(cHeader))}>Unprocessed Scenarios</header> <p class="text-surface-600">The following scenarios have multiple residual hypotheses. Please select one residual
			hypothesis per scenario to include it in the action plan.</p> <section>`;
    if (scenarios && scenarios.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(scenarios);
      $$payload.out += `<div class="space-y-4"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let scenario = each_array[$$index_1];
        const each_array_1 = ensure_array_like(scenario.residual_hypotheses);
        $$payload.out += `<div class="card variant-ghost-warning p-4"><div class="flex items-center justify-between mb-3"><div><h4 class="h4 font-semibold">${escape_html(scenario.ref_id)}: ${escape_html(scenario.name)}</h4> <p class="text-sm text-surface-600">${escape_html(scenario.residual_hypotheses_count)} residual hypotheses found</p></div></div> <div class="space-y-2"><p class="text-sm font-medium">Residual Hypotheses:</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let hypothesis = each_array_1[$$index];
          $$payload.out += `<div${attr_class(`flex items-center space-x-2 p-2 rounded-lg ${stringify(hypothesis.is_selected ? "bg-success-100 border border-success-300" : "bg-surface-100")}`)}><div class="flex-1"><p class="font-medium text-sm">${escape_html(hypothesis.name)}</p></div> `;
          if (hypothesis.is_selected) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<span class="badge variant-filled-success text-xs">Selected</span>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<span class="badge variant-soft-surface text-xs">Not Selected</span>`;
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]--></div></div> <div class="mt-3 p-3 bg-warning-100 border border-warning-300 rounded-lg"><p class="text-sm text-warning-800"><i class="fas fa-exclamation-triangle mr-1"></i> To resolve this, go to the scenario and ensure only one residual hypothesis is selected.</p></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-center py-8"><p class="text-surface-600">No problematic scenarios found.</p></div>`;
    }
    $$payload.out += `<!--]--></section> <footer class="flex justify-end pt-4"><button type="button" class="btn variant-filled">Close</button></footer></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  initializeModalStore();
  initializeToastStore();
  const flash = getFlash(page);
  const toastStore = getToastStore();
  const toast = (message, options) => {
    const t = { message, ...options };
    toastStore.trigger(t);
  };
  function handleToast(flash2) {
    if (!flash2) return;
    toast(flash2.message, {
      background: flash2.type == "success" ? "preset-filled-success-500" : flash2.type === "error" ? "preset-filled-error-500" : flash2.type == "warning" ? "preset-filled-warning-500" : "preset-filled-primary-500"
    });
  }
  clientSideToast.subscribe((flash2) => {
    handleToast(flash2);
    clientSideToast.set(void 0);
  });
  flash.subscribe(($flash) => {
    handleToast($flash);
    flash.set(void 0);
  });
  let { children } = $$props;
  const modalRegistry = {
    // Set a unique modal ID, then pass the component reference
    displayJSONModal: { ref: DisplayJSONModal },
    createModal: { ref: CreateModal },
    deleteConfirmModal: { ref: DeleteConfirmModal },
    problematicScenariosModal: { ref: ProblematicScenariosModal }
  };
  run(() => {
  });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Wathbah GRC</title>`;
    $$payload2.out += `<link rel="icon" href="/favicon.ico"/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>`;
  });
  Modal($$payload, { components: modalRegistry });
  $$payload.out += `<!----> `;
  Toast($$payload, {});
  $$payload.out += `<!----> `;
  children?.($$payload);
  $$payload.out += `<!----> `;
  if (store_get($$store_subs ??= {}, "$flash", flash)) {
    $$payload.out += "<!--[-->";
    const bg = store_get($$store_subs ??= {}, "$flash", flash).type == "success" ? "#3D9970" : "#FF4136";
    $$payload.out += `<div class="flash"${attr_style("", { "background-color": bg })}>${escape_html(store_get($$store_subs ??= {}, "$flash", flash).message)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-gw3UJwv-.js.map
