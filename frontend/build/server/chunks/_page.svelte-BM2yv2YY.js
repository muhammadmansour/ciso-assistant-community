import { p as push, W as ensure_array_like, V as escape_html, T as attr, ab as maybe_selected, X as stringify, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import { p as pageTitle } from './stores-D-WMoATo.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { kT as yearlytasksreview2, AK as periodto1, rg as startperiod1, KN as endperiod1, fY as folder, Xv as allfolders1, w3 as refresh, vh as reset, bJ as tasks, gY as frequency, dy as appliedcontrols1, CL as norecurrenttasksfound3, QW as completed, Hg as inprogress1, AQ as pending, Dd as nodata1, Gm as januaryshort1, Jo as februaryshort1, Eu as marchshort1, WJ as aprilshort1, Ej as mayshort1, Gd as juneshort1, Gg as julyshort1, Uf as augustshort1, sn as septembershort1, BY as octobershort1, Cc as novembershort1, OH as decembershort1 } from './_index-BQcvYRD4.js';
import './index-CRjgakYW.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  pageTitle.set(yearlytasksreview2());
  function getMonthName(monthIndex) {
    const monthNames = [
      januaryshort1(),
      februaryshort1(),
      marchshort1(),
      aprilshort1(),
      mayshort1(),
      juneshort1(),
      julyshort1(),
      augustshort1(),
      septembershort1(),
      octobershort1(),
      novembershort1(),
      decembershort1()
    ];
    return monthNames[monthIndex];
  }
  function toMonthFormat(year, month) {
    return `${year}-${String(month).padStart(2, "0")}`;
  }
  function parseMonthFormat(value) {
    const [year, month] = value.split("-").map(Number);
    return { year, month };
  }
  let startPeriod = toMonthFormat(data.startYear, data.startMonth);
  let endPeriod = toMonthFormat(data.endYear, data.endMonth);
  let selectedFolder = data.selectedFolder;
  function getMonthsInRange() {
    const result = [];
    const start = parseMonthFormat(startPeriod);
    const end = parseMonthFormat(endPeriod);
    let current = new Date(start.year, start.month - 1, 1);
    const endDate = new Date(end.year, end.month - 1, 1);
    while (current <= endDate) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      const label = getMonthName(month - 1);
      result.push({ year, month, label });
      current.setMonth(current.getMonth() + 1);
    }
    return result;
  }
  let monthsToDisplay = getMonthsInRange();
  let startFormatted = (() => {
    const { year, month } = parseMonthFormat(startPeriod);
    return {
      year,
      month,
      label: getMonthName(month - 1)
    };
  })();
  let endFormatted = (() => {
    const { year, month } = parseMonthFormat(endPeriod);
    return {
      year,
      month,
      label: getMonthName(month - 1)
    };
  })();
  function getStatusColor(status) {
    if (!status) return "bg-white";
    if (status === "completed") return "bg-green-200";
    if (status === "in_progress") return "bg-orange-200";
    if (status === "pending") return "bg-red-200";
    return "bg-white";
  }
  const each_array = ensure_array_like(data.allFolders);
  const each_array_1 = ensure_array_like(data.folders);
  $$payload.out += `<div class="bg-white p-8 space-y-8"><div><h1 class="text-3xl font-bold mb-2">${escape_html(yearlytasksreview2())}</h1> <p class="text-gray-600">${escape_html(startFormatted.label)}
			${escape_html(startFormatted.year)}
			${escape_html(periodto1())}
			${escape_html(endFormatted.label)}
			${escape_html(endFormatted.year)}</p></div> <div class="bg-gray-50 p-4 rounded-lg border"><div class="flex gap-4 items-end flex-wrap"><div class="min-w-[160px]"><label for="start-period-filter" class="block text-sm font-medium text-gray-700 mb-1">${escape_html(startperiod1())}</label> <input id="start-period-filter" type="month"${attr("value", startPeriod)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/></div> <div class="min-w-[160px]"><label for="end-period-filter" class="block text-sm font-medium text-gray-700 mb-1">${escape_html(endperiod1())}</label> <input id="end-period-filter" type="month"${attr("value", endPeriod)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/></div> <div class="flex-1 min-w-[200px]"><label for="folder-filter" class="block text-sm font-medium text-gray-700 mb-1">${escape_html(folder())}</label> <select id="folder-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">`;
  $$payload.select_value = selectedFolder;
  $$payload.out += `<option value=""${maybe_selected($$payload, "")}>${escape_html(allfolders1())}</option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let folder2 = each_array[$$index];
    $$payload.out += `<option${attr("value", folder2.id)}${maybe_selected($$payload, folder2.id)}>${escape_html(folder2.name)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select></div> <div class="flex gap-2"><button class="px-4 py-2 bg-[#0A1628] text-white rounded-md hover:bg-[#1a2740] focus:outline-none focus:ring-2 focus:ring-blue-500">${escape_html(refresh())}</button> <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">${escape_html(reset())}</button></div></div></div> <div class="space-y-8">`;
  if (each_array_1.length !== 0) {
    $$payload.out += "<!--[-->";
    for (let $$index_4 = 0, $$length = each_array_1.length; $$index_4 < $$length; $$index_4++) {
      let folder2 = each_array_1[$$index_4];
      const each_array_2 = ensure_array_like(monthsToDisplay);
      const each_array_3 = ensure_array_like(folder2.tasks);
      $$payload.out += `<div class="border rounded-lg overflow-hidden"><div class="bg-gray-100 px-6 py-3 border-b"><h2 class="text-xl font-semibold">${escape_html(folder2.folder_name)}</h2></div> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b bg-gray-50"><th class="px-4 py-3 text-left font-semibold min-w-[200px] sticky left-0 bg-gray-50 z-10">${escape_html(tasks())}</th><th class="px-2 py-3 text-center font-semibold w-16">${escape_html(frequency())}</th><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let monthInfo = each_array_2[$$index_1];
        $$payload.out += `<th class="px-2 py-3 text-center font-semibold w-16">${escape_html(monthInfo.label)} `;
        if (monthsToDisplay.length > 12 || startFormatted.year !== endFormatted.year) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-xs text-gray-500">${escape_html(monthInfo.year)}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></th>`;
      }
      $$payload.out += `<!--]--></tr></thead><tbody><!--[-->`;
      for (let $$index_3 = 0, $$length2 = each_array_3.length; $$index_3 < $$length2; $$index_3++) {
        let task = each_array_3[$$index_3];
        const each_array_4 = ensure_array_like(monthsToDisplay);
        $$payload.out += `<tr class="border-b hover:bg-gray-50"><td class="px-4 py-3 sticky left-0 bg-white z-10">`;
        if (task.ref_id) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div><span class="text-xs bg-slate-200 p-1 rounded">${escape_html(task.ref_id)}</span></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <a${attr("href", `/task-templates/${stringify(task.id)}`)} class="font-medium text-blue-600 hover:text-blue-800 hover:underline">${escape_html(task.name)}</a> `;
        if (task.assigned_to && task.assigned_to.length > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-xs text-gray-500 mt-1">${escape_html(task.assigned_to.map((user) => user.str).join(", "))}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (task.applied_controls && task.applied_controls.length > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="text-xs text-gray-700 mt-2"><span class="font-medium">${escape_html(appliedcontrols1())}:</span> ${escape_html(task.applied_controls.map((control) => control.str).join(", "))}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></td><td class="px-2 py-3 text-center text-xs">`;
        if (task.schedule && task.schedule.frequency) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">${escape_html(task.schedule.frequency.charAt(0))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></td><!--[-->`;
        for (let $$index_2 = 0, $$length3 = each_array_4.length; $$index_2 < $$length3; $$index_2++) {
          let monthInfo = each_array_4[$$index_2];
          const key = `${monthInfo.year}-${String(monthInfo.month).padStart(2, "0")}`;
          const status = task.monthly_status?.[key];
          $$payload.out += `<td class="px-2 py-3 text-center border-l"><div${attr_class(`w-full h-8 rounded ${stringify(getStatusColor(status))}`)}></div></td>`;
        }
        $$payload.out += `<!--]--></tr>`;
      }
      $$payload.out += `<!--]--></tbody></table></div></div>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-center py-12 text-gray-500">${escape_html(norecurrenttasksfound3())}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex gap-6 justify-center text-sm"><div class="flex items-center gap-2"><div class="w-6 h-6 bg-green-200 rounded border"></div> <span>${escape_html(completed())}</span></div> <div class="flex items-center gap-2"><div class="w-6 h-6 bg-orange-200 rounded border"></div> <span>${escape_html(inprogress1())}</span></div> <div class="flex items-center gap-2"><div class="w-6 h-6 bg-red-200 rounded border"></div> <span>${escape_html(pending())}</span></div> <div class="flex items-center gap-2"><div class="w-6 h-6 bg-white rounded border"></div> <span>${escape_html(nodata1())}</span></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BM2yv2YY.js.map
