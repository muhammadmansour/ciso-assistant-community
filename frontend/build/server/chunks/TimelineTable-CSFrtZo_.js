import { p as push, W as ensure_array_like, Z as attr_style, V as escape_html, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { fe as asset, pp as time, C9 as nodataavailable2, d as daycount1, h as hourcount1, m as minutecount1 } from './_index-Syqrsmaf.js';

function TimelineTable($$payload, $$props) {
  push();
  let { data } = $$props;
  const xAxisPoints = Array.isArray(data) && data.length > 0 ? Object.keys(data[0].data).map(Number).sort((a, b) => a - b) : [];
  const impactLevels = (() => {
    const levelsMap = /* @__PURE__ */ new Map();
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((entry) => {
        Object.values(entry.data).forEach((point) => {
          if (point.name && point.hexcolor && point.value >= 0 && point.name !== "--" && !levelsMap.has(point.value)) {
            levelsMap.set(point.value, {
              value: point.value,
              name: point.name,
              description: point.description || "",
              hexcolor: point.hexcolor
            });
          }
        });
      });
    }
    return Array.from(levelsMap.values()).sort((a, b) => a.value - b.value);
  })();
  function formatTimePoint(seconds) {
    if (seconds === 0) return "0";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const parts = [];
    if (days) parts.push(`${daycount1({ count: days })}`);
    if (hours) parts.push(`${hourcount1({ count: hours })}`);
    if (minutes) parts.push(`${minutecount1({ count: minutes })}`);
    return parts.join(" ");
  }
  function isImpactChange(entry, currentIndex) {
    if (currentIndex === 0) return true;
    const currentPoint = xAxisPoints[currentIndex];
    const previousPoint = xAxisPoints[currentIndex - 1];
    return entry.data[currentPoint].value !== entry.data[previousPoint].value;
  }
  $$payload.out += `<div class="space-y-4">`;
  if (impactLevels.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(impactLevels);
    $$payload.out += `<div class="bg-white shadow-sm rounded-lg p-4"><div class="flex flex-wrap gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let level = each_array[$$index];
      $$payload.out += `<div class="flex items-center gap-2"><div class="w-6 h-6 rounded border border-gray-300 flex-shrink-0"${attr_style(`background-color: ${stringify(level.hexcolor)}`)}></div> <div class="flex flex-col"><span class="text-sm font-semibold text-gray-800">${escape_html(level.name)}</span> `;
      if (level.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-xs text-gray-600">${escape_html(level.description)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (Array.isArray(data) && data.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(xAxisPoints);
    const each_array_2 = ensure_array_like(data);
    const each_array_4 = ensure_array_like(xAxisPoints);
    $$payload.out += `<div class="bg-white shadow-sm overflow-x-auto"><div class="w-full"><table class="min-w-full border-collapse svelte-1iokc1m"><thead class="svelte-1iokc1m"><tr class="bg-gray-100"><th class="sticky-col px-4 py-2 text-left font-medium text-gray-600 bg-gray-100 svelte-1iokc1m">${escape_html(asset())}</th><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      each_array_1[i];
      $$payload.out += `<th class="px-4 py-2 text-center font-medium text-gray-600 svelte-1iokc1m">T${escape_html(i)}</th>`;
    }
    $$payload.out += `<!--]--></tr></thead><tbody><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let entry = each_array_2[$$index_3];
      const each_array_3 = ensure_array_like(xAxisPoints);
      $$payload.out += `<tr class="border-t border-gray-200"><td class="sticky-col px-4 py-2 font-medium bg-white svelte-1iokc1m">${escape_html(entry.folder)}/${escape_html(entry.asset)}</td><!--[-->`;
      for (let i = 0, $$length2 = each_array_3.length; i < $$length2; i++) {
        let point = each_array_3[i];
        $$payload.out += `<td class="px-4 py-2 text-center svelte-1iokc1m"${attr_style(`background-color: ${stringify(entry.data[point].hexcolor || "#f9fafb")}; ${stringify(!isImpactChange(entry, i) ? "border-left: none;" : "")}`)}>`;
        if (isImpactChange(entry, i)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="font-medium">${escape_html(entry.data[point].name || "--")}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></td>`;
      }
      $$payload.out += `<!--]--></tr>`;
    }
    $$payload.out += `<!--]--></tbody><tfoot class="svelte-1iokc1m"><tr class="bg-gray-50 border-t-2 border-gray-200"><td class="sticky-col px-4 py-2 font-medium text-gray-600 capitalize bg-gray-50 svelte-1iokc1m">${escape_html(time())}</td><!--[-->`;
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let point = each_array_4[$$index_4];
      $$payload.out += `<td class="px-4 py-2 text-center text-sm text-gray-600 svelte-1iokc1m">${escape_html(formatTimePoint(point))}</td>`;
    }
    $$payload.out += `<!--]--></tr></tfoot></table></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="bg-white shadow-sm rounded-lg p-8 text-center text-gray-500">${escape_html(nodataavailable2())}</div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { TimelineTable as T };
//# sourceMappingURL=TimelineTable-CSFrtZo_.js.map
