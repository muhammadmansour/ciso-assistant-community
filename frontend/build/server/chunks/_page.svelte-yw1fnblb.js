import { p as push, a as pop, M as store_get, W as ensure_array_like, S as attr_class, T as attr, X as stringify, V as escape_html, Q as unsubscribe_stores, R as bind_props, U as clsx, a3 as store_set } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { S as Switch } from './Switch-IjY5G1Ys.js';
import { s as showAllEvents } from './stores-D-WMoATo.js';
import { w as writable } from './index-CRjgakYW.js';
import { h4 as monday, h5 as tuesday, h6 as wednesday, h7 as thursday, h8 as friday, h9 as saturday, ha as sunday, hc as january, hd as february, he as march, hf as april, hg as may, hh as june, hi as july, hj as august, hk as september, hl as october, hm as november, hn as december, pj as today, C4 as noevents1, rB as showallevents2 } from './_index-B12BAPce.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './breadcrumbs-B1Us7xd5.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index5-Brzv1W4u.js';
import './runtime-BKo9q3Zd.js';

function Day($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    day,
    month,
    year,
    info,
    showSidePanel
  } = $$props;
  const today2 = /* @__PURE__ */ new Date();
  const MAX_ITEMS = 3;
  let isToday = day === today2.getDate() && month === today2.getMonth() + 1 && year === today2.getFullYear();
  let isPast = year < today2.getFullYear() || year === today2.getFullYear() && month < today2.getMonth() + 1 || year === today2.getFullYear() && month === today2.getMonth() + 1 && day < today2.getDate();
  let dayInfo = info.filter((item) => item.date.getDate() === day && item.date.getMonth() + 1 === month && item.date.getFullYear() === year);
  let visibleItems = dayInfo.slice(0, MAX_ITEMS);
  let extraItemsCount = Math.max(0, dayInfo.length - MAX_ITEMS);
  function truncateLabel(label, maxLength) {
    if (label.length <= maxLength) {
      return label;
    }
    return label.slice(0, maxLength) + "...";
  }
  $$payload.out += `<!---->`;
  {
    $$payload.out += `<button${attr_class(`flex flex-col p-1 rounded-md text-sm h-32 max-h-32 border ${stringify(isPast ? "bg-gray-300 text-gray-500 cursor-pointer hover:bg-gray-400" : "border-gray-200 bg-white cursor-pointer hover:bg-gray-100")} ${stringify(isToday ? "border-gray-200 cursor-pointer hover:bg-gray-100" : "")}`)}><span${attr_class(clsx(isToday ? "font-bold bg-primary-500 w-fit text-white rounded-full py-0.5 px-1" : ""))}>${escape_html(day)}</span> `;
    if (dayInfo.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(visibleItems);
      $$payload.out += `<div class="flex flex-col justify-center h-full w-full space-y-1"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$payload.out += `<span${attr_class(`flex justify-center cursor-pointer unstyled px-1 rounded-md border-l-2 ${stringify(item.color === "primary" ? "hover:bg-primary-200 text-primary-700 bg-primary-50 border-l-primary-500" : "")} ${stringify(item.color === "secondary" ? "hover:bg-green-200 text-green-700 bg-green-50 border-l-green-500" : "")} ${stringify(item.color === "tertiary" ? "hover:bg-tertiary-200 text-tertiary-700 bg-tertiary-50 border-l-tertiary-500" : "")} ${stringify(item.color === "warning" ? "hover:bg-yellow-200 text-yellow-700 bg-yellow-50 border-l-yellow-500" : "")} `)}>`;
        Anchor($$payload, {
          href: item.link,
          stopPropagation: true,
          children: ($$payload2) => {
            if (store_get($$store_subs ??= {}, "$showSidePanel", showSidePanel)) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `${escape_html(truncateLabel(item.label, 15))}`;
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `${escape_html(truncateLabel(item.label, 25))}`;
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></span>`;
      }
      $$payload.out += `<!--]--> `;
      if (extraItemsCount > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button class="flex justify-center font-bold unstyled hover:bg-primary-200 text-primary-700 bg-primary-50 px-1 rounded-md">+${escape_html(extraItemsCount)}</button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></button>`;
  }
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Calendar($$payload, $$props) {
  push();
  var $$store_subs;
  const today$1 = /* @__PURE__ */ new Date();
  let {
    info,
    month = today$1.getMonth() + 1,
    year = today$1.getFullYear()
  } = $$props;
  const selectedDay = writable(null);
  const showSidePanel = writable(false);
  const daysOfWeek = [
    monday(),
    tuesday(),
    wednesday(),
    thursday(),
    friday(),
    saturday(),
    sunday()
  ];
  const monthNames = [
    january(),
    february(),
    march(),
    april(),
    may(),
    june(),
    july(),
    august(),
    september(),
    october(),
    november(),
    december()
  ];
  function currentMonth() {
    return `/calendar/${today$1.getFullYear()}/${today$1.getMonth() + 1}`;
  }
  function nextMonth(year2, month2) {
    if (month2 == 12) {
      return `/calendar/${year2 + 1}/1`;
    } else {
      return `/calendar/${year2}/${month2 + 1}`;
    }
  }
  function prevMonth(year2, month2) {
    if (month2 == 1) {
      return `/calendar/${year2 - 1}/12`;
    } else {
      return `/calendar/${year2}/${month2 - 1}`;
    }
  }
  const user = page.data.user;
  let filteredInfo = info;
  let daysInMonth = new Date(year, month, 0).getDate();
  let firstDay = new Date(year, month - 1, 1).getDay();
  run(() => {
    if (!store_get($$store_subs ??= {}, "$showAllEvents", showAllEvents)) {
      filteredInfo = info.filter((event) => event.users.some((userObj) => userObj.id === user.id));
    } else {
      filteredInfo = info;
    }
  });
  let selectedDayItems = store_get($$store_subs ??= {}, "$selectedDay", selectedDay) ? filteredInfo.filter((item) => item.date.getDate() === store_get($$store_subs ??= {}, "$selectedDay", selectedDay).day && item.date.getMonth() + 1 === store_get($$store_subs ??= {}, "$selectedDay", selectedDay).month && item.date.getFullYear() === store_get($$store_subs ??= {}, "$selectedDay", selectedDay).year) : [];
  const each_array = ensure_array_like(daysOfWeek);
  const each_array_3 = ensure_array_like(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  $$payload.out += `<div class="flex flex-row h-full space-x-2"><div${attr_class(`flex flex-col rounded-lg bg-white h-full ${stringify(store_get($$store_subs ??= {}, "$showSidePanel", showSidePanel) ? "w-2/3" : "w-full")} p-2 space-y-1 shadow-xl`)}><div class="flex flex-col items-center justify-center bg-linear-to-r from-primary-500 to-secondary-400 text-white rounded-lg p-2 text-3xl font-semibold shadow-md"><div class="flex flex-row justify-between w-3/4"><a class="sticky"${attr("href", prevMonth(year, month))}><i class="fas fa-chevron-left"></i></a> <!---->`;
  {
    $$payload.out += `<p>${escape_html(monthNames[month - 1].toUpperCase())}, ${escape_html(year)}</p>`;
  }
  $$payload.out += `<!----> <a${attr("href", nextMonth(year, month))}><i class="fas fa-chevron-right"></i></a></div></div> <div class="grid grid-cols-7 gap-5 font-semibold"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let dayName = each_array[$$index];
    $$payload.out += `<div class="flex justify-center">${escape_html(dayName)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="grid grid-cols-7 gap-1 h-full">`;
  if (firstDay > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(Array.from({ length: firstDay - 1 }, (_, i) => i + 1));
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      each_array_1[$$index_1];
      $$payload.out += `<div></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_2 = ensure_array_like(Array.from({ length: 6 }, (_, i) => i + 1));
    $$payload.out += `<!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      each_array_2[$$index_2];
      $$payload.out += `<div></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let day = each_array_3[$$index_3];
    $$payload.out += `<!---->`;
    {
      Day($$payload, {
        day,
        month,
        year,
        info: filteredInfo,
        showSidePanel
      });
    }
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-col bg-linear-to-r from-primary-500 to-secondary-400 rounded-lg p-2"><div class="flex w-full h-full justify-between items-center"><a${attr("href", currentMonth())} class="font-light text-lg border rounded-lg border-white p-2 hover:bg-white text-white hover:text-primary-500 transition duration-300"><i class="fas fa-calendar-day"></i> ${escape_html(today())}</a> `;
  Switch($$payload, {
    name: "tasks-toggle",
    checked: store_get($$store_subs ??= {}, "$showAllEvents", showAllEvents),
    onCheckedChange: (e) => store_set(showAllEvents, e.checked),
    active: "bg-green-500",
    children: ($$payload2) => {
      $$payload2.out += `<span class="text-white font-light text-lg">${escape_html(showallevents2())}</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div> `;
  if (store_get($$store_subs ??= {}, "$showSidePanel", showSidePanel) && store_get($$store_subs ??= {}, "$selectedDay", selectedDay)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col rounded-lg bg-white h-full w-1/3 p-4 space-y-3 shadow-xl"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold text-primary-700">${escape_html(store_get($$store_subs ??= {}, "$selectedDay", selectedDay).day)}
					${escape_html(monthNames[store_get($$store_subs ??= {}, "$selectedDay", selectedDay).month - 1])}, ${escape_html(store_get($$store_subs ??= {}, "$selectedDay", selectedDay).year)}</h2> <button class="text-gray-500 hover:text-gray-700 focus:outline-hidden"><i class="fas fa-times"></i></button></div> <div class="overflow-y-auto grow">`;
    if (selectedDayItems.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_4 = ensure_array_like(selectedDayItems);
      $$payload.out += `<ul class="space-y-2"><!--[-->`;
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let item = each_array_4[$$index_4];
        $$payload.out += `<li${attr_class(`p-3 rounded-md transition duration-200 border-l-2 ${stringify(item.color === "primary" ? "hover:bg-primary-200 text-primary-700 bg-primary-50 border-l-primary-500" : "")} ${stringify(item.color === "secondary" ? "hover:bg-green-200 text-green-700 bg-green-50 border-l-green-500" : "")} ${stringify(item.color === "tertiary" ? "hover:bg-tertiary-200 text-tertiary-700 bg-tertiary-50 border-l-tertiary-500" : "")} ${stringify(item.color === "warning" ? "hover:bg-yellow-200 text-yellow-700 bg-yellow-50 border-l-yellow-500" : "")} `)}>`;
        Anchor($$payload, {
          href: item.link,
          class: "block",
          children: ($$payload2) => {
            $$payload2.out += `<div class="font-medium">${escape_html(item.label)}</div> `;
            if (item.description) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<div class="text-sm text-gray-600 mt-1">${escape_html(item.description)}</div>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-center text-gray-500 py-8">${escape_html(noevents1())}</div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { selectedDay, showSidePanel });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let year = parseInt(page.params.year);
  let month = parseInt(page.params.month);
  function createCalendarEvents(appliedControls, riskAcceptances, audits, tasks) {
    const events = [
      ...appliedControls.map((control) => ({
        label: `AC: ${control.name}`,
        date: new Date(control.eta),
        link: `/applied-controls/${control.id}`,
        users: control.owner,
        color: "tertiary"
      })),
      ...riskAcceptances.map((ra) => ({
        label: `RA: ${ra.name}`,
        date: new Date(ra.expiry_date),
        link: `/risk-acceptances/${ra.id}`,
        users: ra.approver ? [ra.approver] : [],
        color: "secondary"
      })),
      ...audits.map((audit) => ({
        label: `AU: ${audit.name}`,
        date: new Date(audit.due_date),
        link: `/compliance-assessments/${audit.id}`,
        users: audit.authors || [],
        color: "warning"
      })),
      ...tasks.map((task) => ({
        label: `TA: ${task.name}`,
        date: new Date(task.due_date),
        link: !task.is_recurrent ? `/task-templates/${task.task_template.id}` : `/task-nodes/${task.id}`,
        users: task.assigned_to,
        color: "primary"
      }))
    ];
    return events;
  }
  let info = createCalendarEvents(data.appliedControls, data.riskAcceptances, data.audits, data.tasks);
  Calendar($$payload, { info, year, month });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-yw1fnblb.js.map
