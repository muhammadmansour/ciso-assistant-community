import { p as push, W as ensure_array_like, V as escape_html, a as pop, T as attr, S as attr_class, X as stringify } from './index2-9icAqEyj.js';
import './runtime-BMNt81Gy.js';

function ReportTile($$payload, $$props) {
  push();
  let {
    title,
    description,
    icon,
    category,
    href,
    tags = []
  } = $$props;
  function getCategoryColor(category2) {
    const colors = {
      compliance: "bg-blue-50 border-blue-200 hover:border-blue-400",
      risk: "bg-red-50 border-red-200 hover:border-red-400",
      governance: "bg-green-50 border-green-200 hover:border-green-400",
      operations: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
      assets: "bg-purple-50 border-purple-200 hover:border-purple-400"
    };
    return colors[category2] || "bg-gray-50 border-gray-200 hover:border-gray-400";
  }
  function getCategoryIconColor(category2) {
    const colors = {
      compliance: "text-blue-600",
      risk: "text-red-600",
      governance: "text-green-600",
      operations: "text-yellow-600",
      assets: "text-purple-600"
    };
    return colors[category2] || "text-gray-600";
  }
  const baseClasses = "block text-left p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer";
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", href)}${attr_class(`${stringify(baseClasses)} ${stringify(getCategoryColor(category))}`)}><div class="flex items-start gap-4"><div class="flex-shrink-0"><div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm"><i${attr_class(`${stringify(icon)} text-2xl ${stringify(getCategoryIconColor(category))}`)}></i></div></div> <div class="flex-1 min-w-0 flex flex-col"><h3 class="text-lg font-semibold text-gray-900 mb-2">${escape_html(title)}</h3> <p class="text-sm text-gray-600 leading-relaxed mb-auto">${escape_html(description)}</p> <div class="mt-4"><div class="flex items-center justify-between"><div${attr_class(`flex items-center text-sm font-medium ${stringify(getCategoryIconColor(category))}`)}>${escape_html("Generate Report")} <i class="fas fa-arrow-right ml-2 text-xs"></i></div></div> `;
    if (tags.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(tags);
      $$payload.out += `<div class="flex flex-wrap gap-1 mt-3"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$payload.out += `<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">${escape_html(tag)}</span>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button type="button"${attr_class(`${stringify(baseClasses)} ${stringify(getCategoryColor(category))}`)}><div class="flex items-start gap-4"><div class="flex-shrink-0"><div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm"><i${attr_class(`${stringify(icon)} text-2xl ${stringify(getCategoryIconColor(category))}`)}></i></div></div> <div class="flex-1 min-w-0 flex flex-col"><h3 class="text-lg font-semibold text-gray-900 mb-2">${escape_html(title)}</h3> <p class="text-sm text-gray-600 leading-relaxed mb-auto">${escape_html(description)}</p> <div class="mt-4"><div class="flex items-center justify-between"><div${attr_class(`flex items-center text-sm font-medium ${stringify(getCategoryIconColor(category))}`)}>${escape_html("Generate Report")} <i class="fas fa-arrow-right ml-2 text-xs"></i></div></div> `;
    if (tags.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(tags);
      $$payload.out += `<div class="flex flex-wrap gap-1 mt-3"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tag = each_array_1[$$index_1];
        $$payload.out += `<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">${escape_html(tag)}</span>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div></button>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const reportTiles = [
    {
      id: "dora-roi",
      title: "DORA Register of Information",
      description: "Generate DORA-compliant Register of Information (ROI) containing entity data required by the Digital Operational Resilience Act",
      icon: "fa-solid fa-building-shield",
      category: "compliance",
      href: "/reports/dora-roi",
      tags: ["DORA", "Regulation", "Entities", "Beta"]
    }
  ];
  function handleTileClick(tile) {
    if (tile.onClick) {
      tile.onClick();
    } else {
      console.log(`Report tile clicked: ${tile.id}`);
    }
  }
  const each_array = ensure_array_like(reportTiles);
  $$payload.out += `<div class="px-4 py-6 space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tile = each_array[$$index];
    ReportTile($$payload, {
      title: tile.title,
      description: tile.description,
      icon: tile.icon,
      category: tile.category,
      href: tile.href,
      tags: tile.tags,
      onclick: tile.href ? void 0 : () => handleTileClick(tile)
    });
  }
  $$payload.out += `<!--]--></div></div> <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6"><div class="flex items-start gap-4"><div class="flex-shrink-0"><i class="fas fa-info-circle text-2xl text-blue-600"></i></div> <div><h3 class="text-lg font-semibold text-gray-900 mb-2">${escape_html("About Reports")}</h3> <p class="text-gray-700">${escape_html("Reports provide a simple tools to generate specialized reports useful for key insights or required by authorities for specific standards.\nMore specialized capabilities will be added as we identify specific cases.")}</p></div></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-5DMzRY_o.js.map
