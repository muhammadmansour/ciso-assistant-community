import { p as push, V as escape_html, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { o as onDestroy } from './index-server-DEEfjxiI.js';
import { C9 as nodataavailable2 } from './_index-Syqrsmaf.js';
import { s as safeTranslate } from './i18n-B-ZrD2ao.js';

function TreemapChart($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    title = "",
    name = "",
    tree,
    translate = false
  } = $$props;
  tree.map((item) => ({
    ...item,
    name: translate ? safeTranslate(item.name?.toLowerCase() || item.name) : item.name,
    children: item.children?.map((child) => ({
      ...child,
      name: translate ? safeTranslate(child.name?.toLowerCase() || child.name) : child.name,
      children: child.children?.map((grandChild) => ({
        ...grandChild,
        name: translate ? safeTranslate(grandChild.name?.toLowerCase() || grandChild.name) : grandChild.name
      }))
    }))
  }));
  const chart_id = `${name}_div`;
  function handleResize() {
  }
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
    }
  });
  if (tree.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col justify-center items-center h-full"><span class="text-center text-gray-600">${escape_html(nodataavailable2())}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(width)} ${stringify(height)} ${stringify(classesContainer)}`)}></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { TreemapChart as T };
//# sourceMappingURL=TreemapChart-CwXUubEN.js.map
