import { p as push, a as pop, s as setContext, S as attr_class, T as attr, X as stringify, R as bind_props, N as getContext, V as escape_html, M as store_get, Q as unsubscribe_stores } from './index2-9icAqEyj.js';
import { p as preloadData, b as pushState, g as goto } from './client2-CItqzqlw.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { D as DetailView } from './DetailView-Bt-6QslO.js';
import { wb as questionnaire } from './_index-BNamVw9A.js';
import _page$1 from './_page.svelte-kVj33IM6.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { m as mount } from './index-server-DEEfjxiI.js';
import './exports-CA5lG8jS.js';
import './index-CRjgakYW.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './Anchor-CCjZl5ir.js';
import './breadcrumbs-DdEobqL1.js';
import './Form-D44apvvs.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-CnZlshhm.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-BiYAuEEm.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './stores-CMqbeBUT.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-Cmsh2Wi5.js';
import './ModelTable-D1sEvsmt.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-D06m6CiP.js';
import './Checkbox-BWsW28Xu.js';
import './Switch-IjY5G1Ys.js';
import './RadioGroup-BatokiWT.js';
import './Score-CSpnV2pu.js';
import './ProgressRing-HAZcZKrs.js';
import './index6-Cn6jj1jH.js';
import './TableMarkdownField-C98PgJKs.js';
import './index4-CU0xjTbD.js';

function TreeView($$payload, $$props) {
  push();
  let {
    selection = false,
    multiple = false,
    width = "w-full",
    spacing = "space-y-1",
    open = false,
    disabled = false,
    padding = "py-4 px-4",
    indent = "ml-4",
    hover = "hover:preset-tonal",
    rounded = "rounded-container-token",
    caretOpen = "rotate-180",
    caretClosed = "",
    hyphenOpacity = "opacity-10",
    regionSummary = "",
    regionSymbol = "",
    regionChildren = "",
    labelledby = "",
    children
  } = $$props;
  function expandAll() {
    const detailsElements = tree.querySelectorAll("details.tree-item");
    detailsElements.forEach((details) => {
      if (!details.open) {
        const summary = details.querySelector("summary.tree-item-summary");
        if (summary) summary.click();
      }
    });
  }
  function collapseAll() {
    const detailsElements = tree.querySelectorAll("details.tree-item");
    detailsElements.forEach((details) => {
      if (details.open) {
        const summary = details.querySelector("summary.tree-item-summary");
        if (summary) summary.click();
      }
    });
  }
  setContext("open", open);
  setContext("selection", selection);
  setContext("multiple", multiple);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("indent", indent);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("hyphenOpacity", hyphenOpacity);
  setContext("regionSummary", regionSummary);
  setContext("regionSymbol", regionSymbol);
  setContext("regionChildren", regionChildren);
  let classesBase = `${width} ${spacing} `;
  let tree = void 0;
  $$payload.out += `<div${attr_class(`tree ${stringify(classesBase)}`)} data-testid="tree" role="tree"${attr("aria-multiselectable", multiple)}${attr("aria-label", labelledby)}${attr("aria-disabled", disabled)}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { expandAll, collapseAll });
  pop();
}
function TreeViewItem_1($$payload, $$props) {
  push();
  let {
    group = void 0,
    name = void 0,
    value = void 0,
    checked = false,
    childrenProp = void 0,
    mappingInference = void 0,
    spacing = "space-x-4",
    open = getContext("open"),
    selection = getContext("selection"),
    multiple = getContext("multiple"),
    disabled = getContext("disabled"),
    indeterminate = false,
    padding = getContext("padding"),
    indent = getContext("indent"),
    hover = getContext("hover"),
    rounded = getContext("rounded-sm"),
    caretOpen = getContext("caretOpen"),
    caretClosed = getContext("caretClosed"),
    hyphenOpacity = getContext("hyphenOpacity"),
    regionSummary = getContext("regionSummary"),
    regionSymbol = getContext("regionSymbol"),
    regionChildren = getContext("regionChildren"),
    alwaysDisplayCaret = false,
    hideLead = false,
    hideChildren = false,
    onToggle = () => {
    },
    children,
    classProp = "",
    lead,
    childrenSlot
  } = $$props;
  const cBase = "space-y-1";
  const cSummary = "list-none [&::-webkit-details-marker]:hidden items-center cursor-pointer flex";
  const cSymbol = "fill-current w-3 text-center transition-transform duration-200";
  const cChildren = "space-y-1";
  const cDisabled = "opacity-50 cursor-not-allowed!";
  let classesCaretState = open && (childrenProp && !hideChildren || alwaysDisplayCaret) ? caretOpen : caretClosed;
  let classesDisabled = disabled ? cDisabled : "";
  let classesBase = `${cBase} ${classProp}`;
  let classesSummary = `${cSummary} ${classesDisabled} ${spacing} ${rounded} ${padding} ${hover} ${regionSummary}`;
  let classesCaret = `${classesCaretState}`;
  let classesSymbol = `${cSymbol} ${classesCaret} ${regionSymbol}`;
  let classesHyphen = `${hyphenOpacity}`;
  let classesChildren = `${cChildren} ${indent} ${regionChildren}`;
  function updateCheckbox(group2, indeterminate2) {
    if (!Array.isArray(group2)) return;
    checked = group2.indexOf(value) >= 0;
  }
  function updateGroup(checked2, indeterminate2) {
    if (!Array.isArray(group)) return;
    const index = group.indexOf(value);
    if (checked2) {
      if (index < 0) {
        group.push(value);
        group = group;
      }
    } else {
      if (index >= 0) {
        group.splice(index, 1);
        group = group;
      }
    }
    if (!indeterminate2) onParentChange();
  }
  function updateRadio(group2) {
    checked = group2 === value;
  }
  function updateRadioGroup(checked2) {
    if (checked2 && group !== value) group = value;
    else if (!checked2 && group === value) group = "";
  }
  function onParentChange() {
    if (!multiple || !childrenProp || childrenProp.length === 0) return;
    if (!Array.isArray(group)) return;
    const index = group.indexOf(value);
    const checkChild = (child) => {
      if (!child || !Array.isArray(child.group)) return;
      child.indeterminate = false;
      if (child.group.indexOf(child.value) < 0) {
        child.group.push(child.value);
      }
    };
    const uncheckChild = (child) => {
      if (!child || !Array.isArray(child.group)) return;
      child.indeterminate = false;
      const childIndex = child.group.indexOf(child.value);
      if (childIndex >= 0) {
        child.group.splice(childIndex, 1);
      }
    };
    childrenProp.forEach((child) => {
      if (!child) return;
      index >= 0 ? checkChild(child) : uncheckChild(child);
      child.onParentChange();
    });
  }
  run(() => {
    if (multiple) updateCheckbox(group);
  });
  run(() => {
    if (multiple) updateGroup(checked, indeterminate);
  });
  run(() => {
    if (!multiple) updateRadio(group);
  });
  run(() => {
    if (!multiple) updateRadioGroup(checked);
  });
  run(() => {
    if (!multiple && group !== void 0 && childrenProp) {
      if (group !== value) {
        childrenProp.forEach((child) => {
          if (child) child.group = "";
        });
      }
    }
  });
  run(() => {
    childrenProp?.forEach((child) => {
      if (child) mount();
    });
  });
  $$payload.out += `<details${attr("open", open, true)}${attr_class(`tree-item ${stringify(classesBase)}`)} data-testid="tree-item"${attr("aria-disabled", disabled)}><summary${attr_class(`tree-item-summary ${stringify(classesSummary)}`)} role="treeitem"${attr("aria-selected", selection ? checked : void 0)}${attr("aria-expanded", childrenProp ? open : void 0)}><div${attr_class(`tree-summary-symbol ${stringify(classesSymbol)}`)}>`;
  if (childrenProp && !hideChildren || alwaysDisplayCaret) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"${attr_class(`w-3 ${stringify(classesHyphen)}`)}><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (selection && name && group !== void 0) {
    $$payload.out += "<!--[-->";
    if (multiple) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<input class="checkbox tree-item-checkbox" type="checkbox"${attr("name", name)}${attr("value", value)}${attr("checked", checked, true)}/>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<input class="radio tree-item-radio" type="radio"${attr("checked", group === value, true)}${attr("name", name)}${attr("value", value)}/>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="tree-item-content w-full" data-testid="tree-item-content">`;
  children?.($$payload);
  $$payload.out += `<!----></div> `;
  if (lead && !hideLead) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="tree-item-lead flex flex-row items-center space-x-2" data-testid="tree-item-lead">`;
    if (mappingInference) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fa-solid fa-diagram-project"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    lead?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></summary> <div${attr_class(`tree-item-children ${stringify(classesChildren)}`)} role="group">`;
  childrenSlot?.($$payload);
  $$payload.out += `<!----></div></details>`;
  bind_props($$props, {
    group,
    name,
    value,
    checked,
    childrenProp,
    open,
    indeterminate,
    onParentChange,
    mappingInference,
    spacing,
    multiple,
    disabled,
    padding,
    indent,
    hover,
    rounded,
    caretOpen,
    caretClosed,
    hyphenOpacity,
    regionSummary,
    regionSymbol,
    regionChildren,
    hideLead,
    hideChildren,
    classProp
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form } = $$props;
  const mailing = Boolean(data.data.compliance_assessment) && Boolean(data.data.representatives.length);
  $$payload.out += `<div class="flex flex-col space-y-4 whitespace-pre-line">`;
  DetailView($$payload, { data, mailing });
  $$payload.out += `<!----> `;
  if (data.data.compliance_assessment) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card px-6 py-4 bg-white flex flex-row justify-between shadow-lg w-full">`;
    TreeView($$payload, {
      children: ($$payload2) => {
        {
          let childrenSlot = function($$payload3) {
            if (Object.hasOwn(store_get($$store_subs ??= {}, "$page", page)?.state, "auditTableMode")) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<div class="max-h-192 overflow-y-scroll">`;
              _page$1($$payload3, {
                form,
                data: store_get($$store_subs ??= {}, "$page", page)?.state?.auditTableMode,
                actionPath: `/compliance-assessments/${data.data.compliance_assessment.id}/table-mode`,
                shallow: true,
                questionnaireOnly: true
              });
              $$payload3.out += `<!----></div>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          };
          TreeViewItem_1($$payload2, {
            alwaysDisplayCaret: true,
            caretOpen: "",
            caretClosed: "-rotate-90",
            onToggle: async () => {
              `/compliance-assessments/${data.data.compliance_assessment.id}/table-mode`;
              const result = await preloadData();
              if (result.type === "loaded" && result.status === 200) {
                pushState("", { auditTableMode: result.data });
              } else {
                goto();
              }
            },
            childrenSlot,
            children: ($$payload3) => {
              $$payload3.out += `<span class="font-semibold text-lg select-none">${escape_html(questionnaire())}</span>`;
            },
            $$slots: { childrenSlot: true, default: true }
          });
        }
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DmIA-w9r.js.map
