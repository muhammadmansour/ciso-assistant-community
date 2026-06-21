import { p as push, V as escape_html, S as attr_class, X as stringify, W as ensure_array_like, T as attr, a as pop } from './index2-9icAqEyj.js';
import { e as getRequirementTitle } from './helpers-Bm9n0CNG.js';
import { x as getOptions } from './crud-DzBk-fdF.js';

function TreeViewItemContent($$payload, $$props) {
  push();
  let {
    ref_id,
    name,
    description,
    threats = [],
    reference_controls = [],
    children,
    assessable,
    questions = {},
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const node = {
    ref_id,
    name,
    description,
    threats,
    reference_controls,
    children,
    assessable,
    questions,
    ...rest
  };
  const getAssessableNodes = (startNode, assessableNodes = []) => {
    if (startNode.assessable) assessableNodes.push(startNode);
    if (startNode.children) {
      for (const value of Object.values(startNode.children)) {
        getAssessableNodes(value, assessableNodes);
      }
    }
    return assessableNodes;
  };
  getAssessableNodes(node);
  const title = getRequirementTitle(ref_id, name);
  let showInfo = false;
  let classesShowInfo = (show) => "hidden" ;
  let classesShowInfoText = (show) => show ? "text-primary-500" : "";
  $$payload.out += `<div><span class="whitespace-pre-line" style="font-weight: 300;"><span class="max-w-[80ch]">`;
  if (title || description) {
    $$payload.out += "<!--[-->";
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span style="font-weight: 600;">${escape_html(title)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>${escape_html(description)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (node?.questions && Object.keys(node.questions).length > 0) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `${escape_html(Object.entries(node?.questions)[0][1].text)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span></span> `;
  if (threats && threats.length > 0 || reference_controls && reference_controls.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div role="button" tabindex="0"${attr_class(`underline text-sm hover:text-primary-400 ${stringify(classesShowInfoText(showInfo))}`)}><i class="text-xs fa-solid fa-info-circle"></i> Learn more</div> <div${attr_class(`card p-2 preset-tonal-primary border border-primary-500 text-sm flex flex-row cursor-auto ${stringify(classesShowInfo())}`)}><div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Suggested reference controls</p> `;
    if (reference_controls.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>--</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(getOptions({
        objects: reference_controls,
        extra_fields: [["folder", "str"]],
        label: "auto"
      }));
      $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let func = each_array[$$index];
        $$payload.out += `<li><p>${escape_html(func.label)}</p></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Threats covered</p> `;
    if (threats.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>--</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(threats);
      $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let threat = each_array_1[$$index_1];
        $$payload.out += `<li>`;
        if (threat.id) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<a class="anchor"${attr("href", `/threats/${stringify(threat.id)}`)}>${escape_html(threat.name)}</a>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<p>${escape_html(threat.name)}</p>`;
        }
        $$payload.out += `<!--]--></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { TreeViewItemContent as T };
//# sourceMappingURL=TreeViewItemContent-DCgVa5Gt.js.map
