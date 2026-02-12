import { p as push, s as setContext, O as copy_payload, P as assign_payload, R as bind_props, a as pop, S as attr_class, T as attr, X as stringify } from './index2-9icAqEyj.js';

function RecursiveTreeView($$payload, $$props) {
  push();
  let {
    selection = false,
    multiple = false,
    relational = false,
    nodes = [],
    expandedNodes = [],
    disabledNodes = [],
    checkedNodes = [],
    indeterminateNodes = [],
    width = "w-full",
    spacing = "space-y-1",
    open = false,
    disabled = false,
    padding = "py-4 px-4",
    indent = "ml-4",
    hover = "hover:preset-tonal",
    rounded = "rounded-container",
    caretOpen = "",
    caretClosed = "-rotate-90",
    hyphenOpacity = "opacity-10",
    regionSummary = "",
    regionSymbol = "",
    regionChildren = "",
    labelledby = ""
  } = $$props;
  setContext("open", open);
  setContext("selection", selection);
  setContext("multiple", multiple);
  setContext("relational", relational);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("indent", indent);
  setContext("hover", hover);
  setContext("rounded-sm", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("hyphenOpacity", hyphenOpacity);
  setContext("regionSummary", regionSummary);
  setContext("regionSymbol", regionSymbol);
  setContext("regionChildren", regionChildren);
  let classProp = "";
  let classesBase = `${width} ${spacing} ${classProp}`;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(`tree ${stringify(classesBase)}`)} data-testid="tree" role="tree"${attr("aria-multiselectable", multiple)}${attr("aria-label", labelledby)}${attr("aria-disabled", disabled)}>`;
    {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="placeholder animate-pulse"></div>`;
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    expandedNodes,
    disabledNodes,
    checkedNodes,
    indeterminateNodes
  });
  pop();
}

export { RecursiveTreeView as R };
//# sourceMappingURL=RecursiveTreeView-CzjuAGIL.js.map
