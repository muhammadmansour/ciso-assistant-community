import { p as push, aa as head, V as escape_html, af as await_block, a as pop, S as attr_class, X as stringify, T as attr, Z as attr_style, s as setContext, N as getContext, R as bind_props, M as store_get, W as ensure_array_like, Q as unsubscribe_stores, U as clsx, Y as spread_props, O as copy_payload, P as assign_payload } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { te as scenario, J1 as filterbyscenarioname3, FG as level, Xf as alllevels1, Pv as current, v6 as residual, Xo as ale, o5 as var95, o4 as var99, o3 as var999, AY as pthreshold1, FZ as keymetrics1, XA as advancedanalysismetrics2, TM as backtostudy2, wG as quantitativeriskstudylabel3, r2 as studyoverview1, tc as scenarios, t7 as scenarioswithcurrentdata3, t5 as scenarioswithresidualdata3, Ey as lossthresholdlabel2, t6 as scenarioswithcurrentlevel3, t4 as scenarioswithresiduallevel3, t8 as scenarioswithbothlevels3, t3 as scenarioswithtreatmentcontrols3, tG as riskscenariosanalysis2, Md as detailedmetricsforeachrisk4, QT as columnsofcolumns2, QU as columns, FM as legendnotes1, DV as metricsdefinitions1, WU as annuallossexpectancy2, o9 as valueatrisk2, xh as probabilityexceedingthreshold2, u1 as risklevels1, Pb as currentriskwithexistingcontrols4, uU as residualriskaftertreatment3, CL as nokeymetricsavailable3, Co as nosimulationdatafound3, Fi as loadingkeymetrics2, Xm as aleevolutiontimeline2 } from './_index-DiaVtc2Z.js';
import { h as html } from './html-FW6Ia4bL.js';
import { w as writable } from './index-CRjgakYW.js';
import { o as onDestroy } from './index-server-DEEfjxiI.js';
import './runtime-BKo9q3Zd.js';

function getEnv() {
  return {
    detect: () => true,
    addEvent: function(node, event, handler) {
      node.addEventListener(event, handler);
      return () => node.removeEventListener(event, handler);
    },
    addGlobalEvent: function(event, handler) {
      document.addEventListener(event, handler);
      return () => document.removeEventListener(event, handler);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
var env$1 = getEnv();
function setEnv(update) {
  Object.assign(env$1, update);
}
var id2 = (/* @__PURE__ */ new Date()).valueOf();
function uid() {
  id2 += 1;
  return id2;
}
function toFixed(num) {
  if (num < 10) return "0" + num;
  return num.toString();
}
function toFixedMs(num) {
  const temp = toFixed(num);
  return temp.length == 2 ? "0" + temp : temp;
}
function getDuodecade(year) {
  const start = Math.floor(year / 11) * 11;
  return {
    start,
    end: start + 11
  };
}
function getISOWeek(ndate) {
  let nday = ndate.getDay();
  if (nday === 0) {
    nday = 7;
  }
  const first_thursday = new Date(ndate.valueOf());
  first_thursday.setDate(ndate.getDate() + (4 - nday));
  const year_number = first_thursday.getFullYear();
  const ordinal_date = Math.floor(
    (first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 864e5
  );
  const weekNumber = 1 + Math.floor(ordinal_date / 7);
  return weekNumber;
}
var emptyAmPm = ["", ""];
function date2str(mask, date, locale2) {
  switch (mask) {
    case "%d":
      return toFixed(date.getDate());
    case "%m":
      return toFixed(date.getMonth() + 1);
    case "%j":
      return date.getDate();
    case "%n":
      return date.getMonth() + 1;
    case "%y":
      return toFixed(date.getFullYear() % 100);
    case "%Y":
      return date.getFullYear();
    case "%D":
      return locale2.dayShort[date.getDay()];
    case "%l":
      return locale2.dayFull[date.getDay()];
    case "%M":
      return locale2.monthShort[date.getMonth()];
    case "%F":
      return locale2.monthFull[date.getMonth()];
    case "%h":
      return toFixed((date.getHours() + 11) % 12 + 1);
    case "%g":
      return (date.getHours() + 11) % 12 + 1;
    case "%G":
      return date.getHours();
    case "%H":
      return toFixed(date.getHours());
    case "%i":
      return toFixed(date.getMinutes());
    case "%a":
      return ((date.getHours() > 11 ? locale2.pm : locale2.am) || emptyAmPm)[0];
    case "%A":
      return ((date.getHours() > 11 ? locale2.pm : locale2.am) || emptyAmPm)[1];
    case "%s":
      return toFixed(date.getSeconds());
    case "%S":
      return toFixedMs(date.getMilliseconds());
    case "%W":
      return toFixed(getISOWeek(date));
    case "%c": {
      let str = date.getFullYear() + "";
      str += "-" + toFixed(date.getMonth() + 1);
      str += "-" + toFixed(date.getDate());
      str += "T";
      str += toFixed(date.getHours());
      str += ":" + toFixed(date.getMinutes());
      str += ":" + toFixed(date.getSeconds());
      return str;
    }
    default:
      return mask;
  }
}
var formatFlags = /%[a-zA-Z]/g;
function dateToString(format, locale2) {
  if (typeof format == "function") return format;
  return function(date) {
    if (!date) return "";
    if (!date.getMonth) date = new Date(date);
    return format.replace(
      formatFlags,
      (s) => date2str(s, date, locale2)
    );
  };
}
function isObject(a) {
  return a && typeof a === "object" && !Array.isArray(a);
}
function extend(a, b2) {
  for (const key in b2) {
    const from = b2[key];
    if (isObject(a[key]) && isObject(from)) {
      a[key] = extend(
        { ...a[key] },
        b2[key]
      );
    } else {
      a[key] = b2[key];
    }
  }
  return a;
}
function locale(words) {
  return {
    getGroup(group) {
      const block = words[group];
      return (key) => {
        return block ? block[key] || key : key;
      };
    },
    getRaw() {
      return words;
    },
    extend(values, optional) {
      if (!values) return this;
      let data2;
      if (optional) {
        data2 = extend({ ...values }, words);
      } else {
        data2 = extend({ ...words }, values);
      }
      return locale(data2);
    }
  };
}
function Dropdown($$payload, $$props) {
  push();
  let {
    position = "bottom",
    align = "start",
    width = "100%",
    children
  } = $$props;
  $$payload.out += `<div${attr_class(`wx-dropdown ${stringify(`wx-${position}-${align}`)}`, "svelte-1jzzq2v")}${attr_style(`width:${stringify(width)}`)}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const lang = "en-US";
const calendar = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
};
const core = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
};
const formats = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
};
const data = {
  core,
  calendar,
  formats,
  lang
};
function defaultLocale() {
  return locale(data);
}
function SuggestDropdown($$payload, $$props) {
  push();
  let { items = [], children, onselect, onready } = $$props;
  (getContext("wx-i18n") || defaultLocale()).getGroup("core");
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Text$1($$payload, $$props) {
  push();
  let {
    value = "",
    id = uid(),
    readonly = false,
    focus = false,
    select = false,
    type = "text",
    placeholder = "",
    disabled = false,
    error = false,
    inputStyle = "",
    title = "",
    css = "",
    icon = "",
    clear = false,
    onchange
  } = $$props;
  let cssString = icon && css.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + css : css;
  let hasLeftIcon = icon && css.indexOf("wx-icon-left") !== -1;
  $$payload.out += `<div${attr_class(`wx-text ${stringify(cssString)}`, "svelte-9z0rem", {
    "wx-error": error,
    "wx-disabled": disabled,
    "wx-clear": clear
  })}>`;
  if (type == "password") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="password"${attr_style(inputStyle)}${attr("title", title)} class="svelte-9z0rem"/>`;
  } else if (type == "number") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="number"${attr_style(inputStyle)}${attr("title", title)} class="svelte-9z0rem"/>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${attr("value", value)}${attr("id", id)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)}${attr("title", title)}${attr_style(inputStyle)} class="svelte-9z0rem"/>`;
  }
  $$payload.out += `<!--]--> `;
  if (clear && !disabled && value) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="wx-icon wxi-close svelte-9z0rem"></i> `;
    if (hasLeftIcon) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-9z0rem")}></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (icon) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-9z0rem")}></i>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value });
  pop();
}
function Header($$payload, $$props) {
  push();
  const { calendar: calendar2, formats: formats2 } = getContext("wx-i18n").getRaw();
  let { date, type, part } = $$props;
  const year = date.getFullYear();
  const label = (() => {
    switch (type) {
      case "month":
        return dateToString(formats2.monthYearFormat, calendar2)(date);
      case "year":
        return dateToString(formats2.yearFormat, calendar2)(date);
      case "duodecade": {
        const { start, end } = getDuodecade(year);
        const yearFormat = dateToString(formats2.yearFormat, calendar2);
        return `${yearFormat(new Date(start, 0, 1))} - ${yearFormat(new Date(end, 11, 31))}`;
      }
    }
  })();
  $$payload.out += `<div class="wx-header svelte-wurt7c">`;
  if (part != "right") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="wx-pager wxi-angle-left svelte-wurt7c"></i>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="wx-spacer svelte-wurt7c"></span>`;
  }
  $$payload.out += `<!--]-->  <span class="wx-label svelte-wurt7c">${escape_html(label)}</span> `;
  if (part != "left") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="wx-pager wxi-angle-right svelte-wurt7c"></i>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="wx-spacer svelte-wurt7c"></span>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Button($$payload, $$props) {
  let { onclick, children } = $$props;
  $$payload.out += `<button class="svelte-1f88uh6">`;
  children?.($$payload);
  $$payload.out += `<!----></button>`;
}
function Month($$payload, $$props) {
  push();
  let {
    value,
    current: current2 = void 0,
    part = "",
    markers = null,
    oncancel,
    onchange
  } = $$props;
  const locale2 = (getContext("wx-i18n") || defaultLocale()).getRaw().calendar;
  const weekStart = (locale2.weekStart || 7) % 7;
  const weekdays = locale2.dayShort.slice(weekStart).concat(locale2.dayShort.slice(0, weekStart));
  const dv = (d, dm, dd) => new Date(d.getFullYear(), d.getMonth() + (dm || 0), d.getDate() + (dd || 0));
  let ranges = part !== "normal";
  function isWeekEnd(date2) {
    const d = date2.getDay();
    return d === 0 || d === 6;
  }
  function getStart() {
    const start = dv(current2, 0, 1 - current2.getDate());
    start.setDate(start.getDate() - (start.getDay() - (weekStart - 7)) % 7);
    return start;
  }
  function getEnd() {
    const end = dv(current2, 1, -current2.getDate());
    end.setDate(end.getDate() + (6 - end.getDay() + weekStart) % 7);
    return end;
  }
  const date = (() => {
    if (part == "normal") return [value ? dv(value).valueOf() : 0];
    return value ? [
      value.start ? dv(value.start).valueOf() : 0,
      value.end ? dv(value.end).valueOf() : 0
    ] : [0, 0];
  })();
  const days = (() => {
    const start = getStart();
    const end = getEnd();
    const curMonth = current2.getMonth();
    let days2 = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const day = {
        day: d.getDate(),
        in: d.getMonth() === curMonth,
        date: d.valueOf()
      };
      let css = "";
      css += !day.in ? " wx-inactive" : "";
      css += date.indexOf(day.date) > -1 ? " wx-selected" : "";
      if (ranges) {
        const s = day.date == date[0];
        const e = day.date == date[1];
        if (s && !e) css += " wx-left";
        else if (e && !s) css += " wx-right";
        if (day.date > date[0] && day.date < date[1]) css += " wx-inrange";
      }
      css += isWeekEnd(d) ? " wx-weekend" : "";
      if (markers) {
        const mark = markers(d);
        if (mark) css += " " + mark;
      }
      days2.push({ ...day, css });
    }
    return days2;
  })();
  const each_array = ensure_array_like(weekdays);
  const each_array_1 = ensure_array_like(days);
  $$payload.out += `<div><div class="wx-weekdays svelte-nq9zbf"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let day = each_array[$$index];
    $$payload.out += `<div class="wx-weekday svelte-nq9zbf">${escape_html(day)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="wx-days svelte-nq9zbf"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let day = each_array_1[$$index_1];
    $$payload.out += `<div${attr_class(`wx-day ${stringify(day.css)}`, "svelte-nq9zbf", { "wx-out": !day.in })}${attr("data-id", day.date)}>${escape_html(day.day)}</div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, { current: current2 });
  pop();
}
function Year($$payload, $$props) {
  push();
  let {
    value = void 0,
    current: current2 = void 0,
    part,
    oncancel,
    onchange,
    onshift
  } = $$props;
  const locale2 = getContext("wx-i18n").getRaw().calendar;
  const months = locale2.monthShort;
  const monthNum = (() => current2.getMonth())();
  function done() {
    const date = new Date(getPartValue(value, part) || current2);
    date.setMonth(current2.getMonth());
    date.setFullYear(current2.getFullYear());
    onchange && onchange(date);
  }
  const each_array = ensure_array_like(months);
  $$payload.out += `<div class="wx-months svelte-1mekhda"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let month = each_array[i];
    $$payload.out += `<div${attr_class("wx-month svelte-1mekhda", void 0, { "wx-current": monthNum === i })}${attr("data-id", i)}>${escape_html(month)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="wx-buttons svelte-1mekhda">`;
  Button($$payload, {
    onclick: done,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(locale2.done)}`;
    }
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value, current: current2 });
  pop();
}
function Duodecade($$payload, $$props) {
  push();
  const _ = getContext("wx-i18n").getRaw().calendar;
  let {
    value = void 0,
    current: current2 = void 0,
    oncancel,
    onchange,
    onshift,
    part
  } = $$props;
  const year = current2.getFullYear();
  const years = (() => {
    const { start, end } = getDuodecade(year);
    const years2 = [];
    for (let y = start; y <= end; ++y) {
      years2.push(y);
    }
    return years2;
  })();
  function done() {
    const date = new Date(getPartValue(value, part) || current2);
    date.setFullYear(current2.getFullYear());
    onchange && onchange(date);
  }
  const each_array = ensure_array_like(years);
  $$payload.out += `<div class="wx-years svelte-uftkmf"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let y = each_array[i];
    $$payload.out += `<div${attr_class("wx-year svelte-uftkmf", void 0, {
      "wx-current": year == y,
      "wx-prev-decade": i === 0,
      "wx-next-decade": i === 11
    })}${attr("data-id", y)}>${escape_html(y)}</div>`;
  }
  $$payload.out += `<!--]--></div> <div class="wx-buttons svelte-uftkmf">`;
  Button($$payload, {
    onclick: done,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(_.done)}`;
    }
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value, current: current2 });
  pop();
}
const configs = {
  month: {
    component: Month,
    next: nextMonth,
    prev: prevMonth
  },
  year: {
    component: Year,
    next: nextYear,
    prev: prevYear
  },
  duodecade: {
    component: Duodecade,
    next: nextDuodecade,
    prev: prevDuodecade
  }
};
function prevMonth(current2) {
  current2 = new Date(current2);
  current2.setMonth(current2.getMonth() - 1);
  return current2;
}
function nextMonth(current2) {
  current2 = new Date(current2);
  current2.setMonth(current2.getMonth() + 1);
  return current2;
}
function prevYear(current2) {
  current2 = new Date(current2);
  current2.setFullYear(current2.getFullYear() - 1);
  return current2;
}
function nextYear(current2) {
  current2 = new Date(current2);
  current2.setFullYear(current2.getFullYear() + 1);
  return current2;
}
function prevDuodecade(current2) {
  current2 = new Date(current2);
  current2.setFullYear(current2.getFullYear() - 10);
  return current2;
}
function nextDuodecade(current2) {
  current2 = new Date(current2);
  current2.setFullYear(current2.getFullYear() + 10);
  return current2;
}
function getPartValue(value, part) {
  let date;
  if (part === "normal") date = value;
  else {
    const { start, end } = value;
    if (part === "left") date = start;
    else if (part == "right") date = end;
    else date = start ? end : start;
  }
  return date;
}
function Panel($$payload, $$props) {
  push();
  const _ = getContext("wx-i18n").getGroup("calendar");
  let {
    value,
    current: current2 = void 0,
    part = "normal",
    markers = null,
    buttons = ["clear", "today"],
    onshift: shift,
    onchange: change
  } = $$props;
  let type = "month";
  let buttonList = (() => {
    if (Array.isArray(buttons)) return buttons;
    return buttons ? ["clear", "today"] : [];
  })();
  function selectDate(ev, date) {
    ev.preventDefault();
    change && change({ value: date });
  }
  function oncancel() {
    if (type === "duodecade") type = "year";
    else if (type === "year") type = "month";
  }
  function onshift(ev) {
    const { diff } = ev;
    if (diff === 0) {
      if (type === "month") type = "year";
      else if (type === "year") type = "duodecade";
      return;
    }
    if (diff) {
      const obj = configs[type];
      current2 = diff > 0 ? obj.next(current2) : obj.prev(current2);
    }
    shift && shift();
  }
  function onchange(value2) {
    type = "month";
    change && change({ select: true, value: value2 });
  }
  function getButtonValue(btn) {
    if (btn === "done") return -1;
    if (btn === "clear") return null;
    if (btn === "today") return /* @__PURE__ */ new Date();
  }
  const SvelteComponent = configs[type].component;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(`wx-calendar ${stringify(part !== "normal" && part !== "both" ? "wx-part" : "")}`, "svelte-avh7y")}><div class="wx-wrap svelte-avh7y">`;
    Header($$payload2, { date: current2, part, type });
    $$payload2.out += `<!----> <div><!---->`;
    SvelteComponent($$payload2, {
      value,
      part,
      markers,
      onchange,
      oncancel,
      onshift,
      get current() {
        return current2;
      },
      set current($$value) {
        current2 = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (type === "month" && buttonList.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(buttonList);
      $$payload2.out += `<div class="wx-buttons svelte-avh7y"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let btn = each_array[$$index];
        $$payload2.out += `<div class="wx-button-item svelte-avh7y">`;
        Button($$payload2, {
          onclick: (e) => selectDate(e, getButtonValue(btn)),
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(_(btn))}`;
          }
        });
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { current: current2 });
  pop();
}
function Locale($$payload, $$props) {
  push();
  let { words = null, optional = false, children } = $$props;
  let l = getContext("wx-i18n");
  if (!l || words !== null) {
    if (!l) {
      l = locale(data);
    }
    l = l.extend(words, optional);
    setContext("wx-i18n", l);
  }
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Calendar($$payload, $$props) {
  push();
  let {
    value = void 0,
    current: current2 = void 0,
    markers = null,
    buttons = ["clear", "today"],
    onchange
  } = $$props;
  function fixCurrent(force) {
    if (!current2 || force) current2 = value ? new Date(value) : /* @__PURE__ */ new Date();
    current2.setDate(1);
  }
  fixCurrent(value);
  function change(v2) {
    const x = v2.value;
    if (x) {
      value = new Date(x);
      fixCurrent(true);
    } else {
      value = null;
    }
    onchange && onchange({ value });
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Locale($$payload2, {
      children: ($$payload3) => {
        Panel($$payload3, {
          value,
          markers,
          buttons,
          onchange: change,
          get current() {
            return current2;
          },
          set current($$value) {
            current2 = $$value;
            $$settled = false;
          }
        });
      }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value, current: current2 });
  pop();
}
function RichSelect($$payload, $$props) {
  push();
  let {
    value = "",
    options = [],
    textOptions = null,
    placeholder = "",
    disabled = false,
    error = false,
    title = "",
    textField = "label",
    clear = false,
    children: kids,
    onchange
  } = $$props;
  let navigate;
  function ready(ev) {
    navigate = ev.navigate;
    ev.keydown;
  }
  let selected = value || value === 0 ? (textOptions || options).find((a) => a.id === value) : null;
  function select({ id }) {
    if (id || id === 0) {
      value = id;
      navigate(null);
      onchange && onchange({ value });
    }
  }
  $$payload.out += `<div${attr_class("wx-richselect svelte-1ccyn9c", void 0, {
    "wx-error": error,
    "wx-disabled": disabled,
    "wx-nowrap": !kids
  })}${attr("title", title)} tabindex="0"><div class="wx-label svelte-1ccyn9c">`;
  if (selected) {
    $$payload.out += "<!--[-->";
    if (kids) {
      $$payload.out += "<!--[-->";
      kids($$payload, selected);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(selected[textField])}`;
    }
    $$payload.out += `<!--]-->`;
  } else if (placeholder) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<span class="wx-placeholder svelte-1ccyn9c">${escape_html(placeholder)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += ` `;
  }
  $$payload.out += `<!--]--></div> `;
  if (clear && !disabled && value) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<i class="wx-icon wxi-close svelte-1ccyn9c"></i>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<i class="wx-icon wxi-angle-down svelte-1ccyn9c"></i>`;
  }
  $$payload.out += `<!--]--> `;
  if (!disabled) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, { option }) {
        if (kids) {
          $$payload2.out += "<!--[-->";
          kids($$payload2, option);
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `${escape_html(option[textField])}`;
        }
        $$payload2.out += `<!--]-->`;
      };
      SuggestDropdown($$payload, {
        items: options,
        onready: ready,
        onselect: select,
        children
      });
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { value });
  pop();
}
function FontOpenSans($$payload) {
  $$payload.out += `${html(`<style>
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff') format('woff');
}
  </style>`)}`;
}
function Willow($$payload, $$props) {
  push();
  let { fonts = true, children } = $$props;
  setContext("wx-theme", "willow");
  head($$payload, ($$payload2) => {
    if (fonts) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""/> `;
      FontOpenSans($$payload2);
      $$payload2.out += `<!----> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  });
  if (children) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wx-willow-theme" style="height:100%">`;
    children($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
(/* @__PURE__ */ new Date()).valueOf();
var EventBusRouter = class {
  constructor(dispatch) {
    this._nextHandler = null;
    this._dispatch = dispatch;
    this.exec = this.exec.bind(this);
  }
  async exec(name, ev) {
    this._dispatch(name, ev);
    if (this._nextHandler) await this._nextHandler.exec(name, ev);
    return ev;
  }
  setNext(next) {
    return this._nextHandler = next;
  }
};
var is_array = Array.isArray;
var define_property = Object.defineProperty;
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");
function rune_outside_svelte(rune) {
  if (dev_fallback_default) {
    const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
  }
}
var micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && true) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function without_reactive_context(fn) {
  try {
    return fn();
  } finally {
  }
}
function create_event(event_name, dom, handler, options = {}) {
  function target_handler(event2) {
    if (!options.capture) {
      handle_event_propagation.call(dom, event2);
    }
    if (!event2.cancelBubble) {
      return without_reactive_context(() => {
        return handler?.call(this, event2);
      });
    }
  }
  if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
    queue_micro_task(() => {
      dom.addEventListener(event_name, target_handler, options);
    });
  } else {
    dom.addEventListener(event_name, target_handler, options);
  }
  return target_handler;
}
function on(element2, type, handler, options = {}) {
  var target_handler = create_event(type, element2, handler, options);
  return () => {
    element2.removeEventListener(type, target_handler, options);
  };
}
var last_propagated_event = null;
function handle_event_propagation(event2) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event2.type;
  var path = event2.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event2.target
  );
  last_propagated_event = event2;
  var path_idx = 0;
  var handled_at = last_propagated_event === event2 && event2.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event2.target;
  if (current_target === handler_element) return;
  define_property(event2, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          if (is_array(delegated)) {
            var [fn, ...data2] = delegated;
            fn.apply(current_target, [event2, ...data2]);
          } else {
            delegated.call(current_target, event2);
          }
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event2.__root = handler_element;
    delete event2.currentTarget;
  }
}
if (dev_fallback_default) {
  let throw_rune_error = function(rune) {
    if (!(rune in globalThis)) {
      let value;
      Object.defineProperty(globalThis, rune, {
        configurable: true,
        // eslint-disable-next-line getter-return
        get: () => {
          if (value !== void 0) {
            return value;
          }
          rune_outside_svelte(rune);
        },
        set: (v2) => {
          value = v2;
        }
      });
    }
  };
  throw_rune_error("$state");
  throw_rune_error("$effect");
  throw_rune_error("$derived");
  throw_rune_error("$inspect");
  throw_rune_error("$props");
  throw_rune_error("$bindable");
}
var env = {
  addEvent: on
};
setEnv(env);
const en = {
  grid: {
    "Add before": "Add before",
    "Add after": "Add after",
    Copy: "Copy",
    Delete: "Delete"
  }
};
(/* @__PURE__ */ new Date()).valueOf();
function V(o, e) {
  if (Object.keys(o).length !== Object.keys(e).length) return false;
  for (const n in e) {
    const t = o[n], s = e[n];
    if (!b(t, s)) return false;
  }
  return true;
}
function b(o, e) {
  if (typeof o == "number" || typeof o == "string" || typeof o == "boolean" || o === null) return o === e;
  if (typeof o != typeof e || (o === null || e === null) && o !== e || o instanceof Date && e instanceof Date && o.getTime() !== e.getTime()) return false;
  if (typeof o == "object") if (Array.isArray(o) && Array.isArray(e)) {
    if (o.length !== e.length) return false;
    for (let n = o.length - 1; n >= 0; n--) if (!b(o[n], e[n])) return false;
    return true;
  } else return V(o, e);
  return o === e;
}
function R(o) {
  if (typeof o != "object" || o === null) return o;
  if (o instanceof Date) return new Date(o);
  if (o instanceof Array) return o.map(R);
  const e = {};
  for (const n in o) e[n] = R(o[n]);
  return e;
}
var I = 2, W = class {
  constructor(o) {
    o && (this._writable = o.writable, this._async = o.async), this._values = {}, this._state = {};
  }
  setState(o, e = 0) {
    const n = {};
    return this._wrapProperties(o, this._state, this._values, "", n, e), n;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(o, e, n, t, s, i) {
    for (const a in o) {
      const r = e[a], c = n[a], l = o[a];
      if (r && (c === l && typeof l != "object" || l instanceof Date && c instanceof Date && c.getTime() === l.getTime())) continue;
      const d = t + (t ? "." : "") + a;
      r ? (r.__parse(l, d, s, i) && (n[a] = l), i & I ? s[d] = r.__trigger : r.__trigger()) : (l && l.__reactive ? e[a] = this._wrapNested(l, l, d, s) : e[a] = this._wrapWritable(l), n[a] = l), s[d] = s[d] || null;
    }
  }
  _wrapNested(o, e, n, t) {
    const s = this._wrapWritable(o);
    return this._wrapProperties(o, s, e, n, t, 0), s.__parse = (i, a, r, c) => (this._wrapProperties(i, s, e, a, r, c), false), s;
  }
  _wrapWritable(o) {
    const e = [], n = function() {
      for (let t = 0; t < e.length; t++) e[t](o);
    };
    return { subscribe: (t) => (e.push(t), this._async ? setTimeout(t, 1, o) : t(o), () => {
      const s = e.indexOf(t);
      s >= 0 && e.splice(s, 1);
    }), __trigger: () => {
      e.length && (this._async ? setTimeout(n, 1) : n());
    }, __parse: function(t) {
      return o = t, true;
    } };
  }
}, F = class {
  constructor(o, e, n, t) {
    typeof o == "function" ? this._setter = o : this._setter = o.setState.bind(o), this._routes = e, this._parsers = n, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((s) => {
      s.in.forEach((i) => {
        const a = this._triggers.get(i) || [];
        a.push(s), this._triggers.set(i, a);
      }), s.out.forEach((i) => {
        const a = this._sources.get(i) || {};
        s.in.forEach((r) => a[r] = true), this._sources.set(i, a);
      });
    }), this._routes.forEach((s) => {
      s.length = Math.max(...s.in.map((i) => T(i, this._sources, 1)));
    }), this._bus = t;
  }
  init(o) {
    const e = {};
    for (const n in o) if (this._prev[n] !== o[n]) {
      const t = this._parsers[n];
      e[n] = t ? t(o[n]) : o[n];
    }
    this._prev = this._prev ? { ...this._prev, ...o } : { ...o }, this.setState(e), this._bus && this._bus.exec("init-state", e);
  }
  setStateAsync(o) {
    const e = this._setter(o, I);
    return this._async ? Object.assign(this._async.signals, e) : this._async = { signals: e, timer: setTimeout(this._applyState.bind(this), 1) }, e;
  }
  _applyState() {
    const o = this._async;
    if (o) {
      this._async = null, this._triggerUpdates(o.signals, []);
      for (const e in o.signals) {
        const n = o.signals[e];
        n && n();
      }
    }
  }
  setState(o, e = []) {
    const n = this._setter(o);
    return this._triggerUpdates(n, e), n;
  }
  _triggerUpdates(o, e) {
    const n = Object.keys(o), t = !e.length;
    e = e || [];
    for (let s = 0; s < n.length; s++) {
      const i = n[s], a = this._triggers.get(i);
      a && a.forEach((r) => {
        e.indexOf(r) == -1 && e.push(r);
      });
    }
    t && this._execNext(e);
  }
  _execNext(o) {
    for (; o.length; ) {
      o.sort((n, t) => n.length < t.length ? 1 : -1);
      const e = o[o.length - 1];
      o.splice(o.length - 1), e.exec(o);
    }
  }
};
function T(o, e, n) {
  const t = e.get(o);
  if (!t) return n;
  const s = Object.keys(t).map((i) => T(i, e, n + 1));
  return Math.max(...s);
}
var U = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(o, e, n) {
    let t = this._handlers[o];
    t ? n && n.intercept ? t.unshift(e) : t.push(e) : t = this._handlers[o] = [e], n && n.tag && this._tag.set(e, n.tag);
  }
  intercept(o, e, n) {
    this.on(o, e, { ...n, intercept: true });
  }
  detach(o) {
    for (const e in this._handlers) {
      const n = this._handlers[e];
      for (let t = n.length - 1; t >= 0; t--) this._tag.get(n[t]) === o && n.splice(t, 1);
    }
  }
  async exec(o, e) {
    const n = this._handlers[o];
    if (n) for (let t = 0; t < n.length; t++) {
      const s = n[t](e);
      if (s === false || s && s.then && await s === false) return;
    }
    return this._nextHandler && await this._nextHandler.exec(o, e), e;
  }
  setNext(o) {
    return this._nextHandler = o;
  }
};
function B(o) {
  return (e) => e[o];
}
function K(o) {
  return (e, n) => e[o] = n;
}
function S(o, e) {
  return (e.getter || B(e.id))(o);
}
function H(o, e, n) {
  return (e.setter || K(e.id))(o, n);
}
function D(o, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(o), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function v(o, e) {
  let n = S(o, e) ?? "";
  return e.template && (n = e.template(n, o, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((t) => e.optionsMap.get(t)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function q(o, e) {
  const n = /\n|"|;|,/;
  let t = "";
  const s = e.rows || `
`, i = e.cols || "	", a = o._columns, r = o.flatData;
  e.header !== false && a[0].header && (t = M("header", a, t, i, s));
  for (let c = 0; c < r.length; c++) {
    const l = [];
    for (let d = 0; d < a.length; d++) {
      let h = v(r[c], a[d]);
      n.test(h) && (h = '"' + h.replace(/"/g, '""') + '"'), l.push(h);
    }
    t += (t ? s : "") + l.join(i);
  }
  return e.footer !== false && a[0].footer && (t = M("footer", a, t, i, s)), t;
}
function M(o, e, n, t, s) {
  const i = /\n|"|;|,/;
  for (let a = 0; a < e[0][o].length; a++) {
    const r = [];
    for (let c = 0; c < e.length; c++) {
      let l = (e[c][o][a].text || "") + "";
      i.test(l) && (l = '"' + l.replace(/"/g, '""') + '"'), r.push(l);
    }
    n += (n ? s : "") + r.join(t);
  }
  return n;
}
function G(o, e, n) {
  const t = [], s = [], i = [];
  let a = [];
  const r = o._columns, c = o.flatData, l = o._sizes;
  for (const h of r) i.push({ width: h.flexgrow ? l.columnWidth : h.width });
  let d = 0;
  e.header !== false && r[0].header && (P("header", r, t, s, d, e, n), a = a.concat(l.headerRowHeights.map((h) => ({ height: h }))), d += r[0].header.length);
  for (let h = 0; h < c.length; h++) {
    const u = [];
    for (let f = 0; f < r.length; f++) {
      const g = c[h], p = r[f], w = S(g, p) ?? "";
      let m = v(g, p), x;
      e.cellStyle && (x = e.cellStyle(w, g, p)), e.cellTemplate && (m = e.cellTemplate(w, g, p) ?? m);
      const _ = z(m, 2, x, n);
      u.push(_);
    }
    t.push(u), a.push({ height: l.rowHeight });
  }
  return d += c.length, e.footer !== false && r[0].footer && (P("footer", r, t, s, d, e, n), a = a.concat(l.footerRowHeights.map((h) => ({ height: h })))), { cells: t, merged: s, rowSizes: a, colSizes: i, styles: n };
}
function P(o, e, n, t, s, i, a) {
  for (let r = 0; r < e[0][o].length; r++) {
    const c = [];
    for (let l = 0; l < e.length; l++) {
      const d = e[l][o][r], h = d.colspan ? d.colspan - 1 : 0, u = d.rowspan ? d.rowspan - 1 : 0;
      (h || u) && t.push({ from: { row: r + s, column: l }, to: { row: r + s + u, column: l + h } });
      let f = d.text ?? "", g;
      i.headerCellStyle && (g = i.headerCellStyle(f, d, e[l], o)), i.headerCellTemplate && (f = i.headerCellTemplate(f, d, e[l], o) ?? f);
      let p;
      o == "header" ? r == e[0][o].length - 1 ? p = 1 : p = 0 : r ? p = 4 : p = 3;
      const w = z(f, p, g, a);
      c.push(w);
    }
    n.push(c);
  }
}
function z(o, e, n, t) {
  let s = e;
  if (o && o instanceof Date && (o = Q(o), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...t[e], ...n };
    const i = t.findIndex((a) => b(a, n));
    i < 0 ? (t.push(n), s = t.length - 1) : s = i;
  }
  return { v: o + "", s };
}
function J(o) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, t = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, i = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, a = e[o], r = "0.5px solid " + i[o], c = { verticalAlign: "center", align: "left" }, l = { fontWeight: "bold", color: a, background: t[o], ...c, borderBottom: r, borderRight: r };
  return { cell: { color: a, background: n[o], borderBottom: s[o], borderRight: s[o], ...c }, header: { ...l }, footer: { ...l } };
}
function Q(o) {
  return o ? 25569 + (o.getTime() - o.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Y = "portrait", Z = 100, ee = "a4", te = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function se(o, e) {
  const n = [];
  let t = [], s = 0;
  const i = o.filter((r) => !r.hidden), a = ie(e);
  return i.forEach((r, c) => {
    s + r.width <= a ? (s += r.width, t.push(r)) : (t.length && n.push(t), t = [r], s = r.width), c === i.length - 1 && t.length && n.push(t);
  }), n;
}
function ne(o, e, n) {
  const t = [];
  return o.forEach((s, i) => {
    const a = s[e];
    for (let r = 0; r < n.length; r++) {
      t[r] || (t[r] = []);
      const c = { ...a[r] };
      if (t[r][i] !== null) {
        if (!i && !c.rowspan && !c.colspan) {
          let l = 1, d = o[i + l][e][r], h = c.width;
          for (; !d.rowspan && !d.colspan; ) l++, d = o[i + l][e][r], h += d.width;
          c.colspan = l, c.width = h, c.height = n[r];
        }
        if (t[r].push(c), !c.collapsed && c.colspan > 1) {
          let l = c.colspan - 1;
          if (c.colspan + i > o.length) {
            const d = c.colspan - (c.colspan + i - o.length);
            c.colspan = d, c.width = o.slice(i, i + l + 1).reduce((h, u) => h + u.width, 0), d > 1 && (l = d - 1);
          }
          for (let d = 0; d < l; d++) t[r].push(null);
        }
        if (c.rowspan > 1) {
          const l = c.rowspan;
          for (let d = 1; d < l; d++) t[r + d] || (t[r + d] = []), t[r + d].push(null);
        }
      }
    }
    if (s.collapsed) for (let r = 0; r < t.length; r++) {
      const c = t[r], l = c[i];
      if (l && l.collapsed) {
        if (c[i] = null, !r) break;
      } else {
        const d = l || c.findLast((h) => h?.colspan >= 1);
        d && (d.colspan = d.colspan - 1, d.width = d.width - s.width);
      }
    }
  }), t.map((s) => s.filter((i) => i && i.colspan !== 0));
}
function ie(o) {
  const { mode: e, ppi: n, paper: t } = o, { width: s, height: i } = te[t];
  return oe(e === "portrait" ? s : i, n);
}
function oe(o, e) {
  return o * e;
}
function re(o = {}) {
  const { mode: e, ppi: n, paper: t } = o;
  return { mode: e || Y, ppi: n || Z, paper: t || ee };
}
function ae(o, e) {
  return o.flexgrow ? `min-width:${e}px;width:auto` : `width:${o.width}px; max-width:${o.width}px; height:${o.height}px`;
}
function le(o, e, n) {
  let t = o[n.id];
  if (n.filter.type === "richselect" && t) {
    const s = n.filter.config?.options || e.find(({ id: i }) => i == n.id).options;
    s && (t = s.find(({ id: i }) => i == t).label);
  }
  return t ?? "";
}
const $ = ["resize-column", "hide-column", "update-cell"], ce = ["delete-row", "update-row", "update-cell"], de = ["move-item"], he = ["resize-column", "move-item"];
class ue {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, n, t) {
    this.in = e, this.getState = n, this.setState = t, this.setHandlers(), this.resetStateHistory();
  }
  getHandlers() {
    return { "add-row": { handler: (e) => ({ action: "delete-row", data: { id: e.id }, source: { action: "add-row", data: e } }) }, "delete-row": { handler: (e) => {
      const { id: n } = e, { data: t } = this.getPrev(), s = t.findIndex((i) => i.id == n);
      return { action: "add-row", data: { id: n, row: t[s], before: s < t.length - 1 ? t[s + 1].id : void 0 }, source: { action: "delete-row", data: e } };
    } }, "update-cell": { handler: (e) => {
      const { id: n, column: t } = e, s = this.getRow(n), i = this.getColumn(t), a = S(s, i);
      return b(a, e.value) ? null : { action: "update-cell", data: { id: n, column: t, value: a }, source: { action: "update-cell", data: e } };
    } }, "update-row": { handler: (e) => {
      const { id: n } = e, t = this.getRow(n);
      return { action: "update-row", data: { id: n, row: t }, source: { action: "update-row", data: e } };
    } }, "resize-column": { handler: (e) => {
      const { id: n, width: t } = e, s = this.getColumn(n), { _sizes: i } = this.getState();
      return { action: "resize-column", data: { id: n, width: s.width ?? i.columnWidth }, source: { action: "resize-column", data: { id: n, width: t } } };
    } }, "hide-column": { handler: (e) => {
      const { id: n } = e, t = this.getColumn(n);
      return { action: "hide-column", data: { id: n, mode: t.hidden }, source: { action: "hide-column", data: e } };
    } }, "collapse-column": { handler: (e) => {
      const { id: n, row: t, mode: s } = e;
      return { action: "collapse-column", data: { id: n, row: t, mode: typeof s == "boolean" ? !s : s }, source: { action: "collapse-column", data: e } };
    } }, "move-item": { handler: (e) => {
      const { id: n, target: t, mode: s } = e, { flatData: i } = this.getPrev(), a = i.findIndex((r) => r.id == n);
      return { action: "move-item", data: { id: n, target: i[a + (a ? -1 : 1)].id, mode: a ? "after" : "before" }, source: { action: "move-item", data: { id: n, target: t, mode: s } } };
    } }, "open-row": { handler: (e) => {
      const { id: n, nested: t } = e;
      return { action: "close-row", data: { id: n, nested: t }, source: { action: "open-row", data: e } };
    } }, "close-row": { handler: (e) => {
      const { id: n, nested: t } = e;
      return { action: "open-row", data: { id: n, nested: t }, source: { action: "close-row", data: e } };
    } } };
  }
  resetHistory() {
    this.undo = [], this.redo = [], this.progress = {}, this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const n in e) this.in.intercept(n, (t) => {
      if (!(t.eventSource === "undo" || t.eventSource === "redo" || t.skipUndo)) {
        if (he.includes(n)) {
          (t.inProgress && !this.progress[n] || typeof t.inProgress != "boolean") && (de.includes(n) && this.setPrev("flatData"), $.includes(n) && this.setPrev("columns")), this.progress[n] = t.inProgress;
          return;
        }
        ce.includes(n) && this.setPrev("data"), $.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (t) => {
      if (t.eventSource === "undo" || t.eventSource === "redo" || t.skipUndo || t.inProgress) return;
      const s = e[n].handler(t);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = R(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), this.redo = [], this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "undo" }), this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "redo" }), this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({ history: { undo: this.undo.length, redo: this.redo.length } });
  }
  getRow(e) {
    const { data: n } = this.getPrev();
    return this.getState().tree ? this.getTreeRow(n, e) : n.find((t) => t.id == e);
  }
  getTreeRow(e, n) {
    for (let t = 0; t < e.length; t++) {
      if (e[t].id == n) return e[t];
      if (e[t].data) {
        const s = this.getTreeRow(e[t].data, n);
        if (s) return s;
      }
    }
    return null;
  }
  getColumn(e) {
    const { columns: n } = this.getPrev();
    return n.find((t) => t.id == e);
  }
}
function A() {
  let o = true;
  return o = false, o;
}
function N(o, e) {
  return typeof o > "u" || o === null ? -1 : typeof e > "u" || e === null ? 1 : o === e ? 0 : o > e ? 1 : -1;
}
function ge(o, e) {
  return -N(o, e);
}
function pe(o, e) {
  const n = o === "asc" ? N : ge;
  return function(t, s) {
    return n(S(t, e), S(s, e));
  };
}
function we(o, e) {
  if (!o || !o.length) return;
  const n = o.map((t) => pe(t.order, e.find((s) => s.id == t.key)));
  return o.length === 1 ? n[0] : function(t, s) {
    for (let i = 0; i < n.length; i++) {
      const a = n[i](t, s);
      if (a !== 0) return a;
    }
    return 0;
  };
}
const k = 28, me = 20;
function xe() {
  if (typeof document > "u") return "willow";
  const o = document.querySelector('[class^="wx"][class$="theme"]');
  return o ? o.className.substring(3, o.className.length - 6) : "willow";
}
function C(o, e, n, t, s) {
  const i = document.createElement("div"), a = document.createElement("div"), r = document.body;
  s = s ? `${s}px` : "auto";
  let c, l;
  a.className = e, i.classList.add(`wx-${n}-theme`), i.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, i.appendChild(a), r.appendChild(i), typeof o != "object" && (o = [o]);
  for (let d = 0; d < o.length; d++) {
    a.innerText = o[d] + "";
    const h = i.getBoundingClientRect(), u = Math.ceil(h.width) + (t && t.length ? t[d] : 0), f = Math.ceil(h.height);
    c = Math.max(c || 0, u), l = Math.max(l || 0, f);
  }
  return i.remove(), { width: c, height: l };
}
function L(o, e, n, t, s) {
  const i = [];
  for (let a = 0; a < o.length; a++) {
    const r = o[a][e], c = r.length;
    for (let l = 0; l < c; l++) {
      const { text: d, vertical: h, collapsed: u, rowspan: f, css: g } = r[l];
      if (!d) {
        i[l] = Math.max(i[l] || 0, t);
        continue;
      }
      let p = 0;
      if (h && !u) {
        let w = `wx-measure-cell-${e}`;
        if (w += g ? ` ${g}` : "", p = C(d, w, s).width, (f > 1 || !r[l + 1]) && n > l + 1) {
          const m = f || n - l, x = i.slice(l, l + m).reduce((_, y) => _ + y, 0);
          if (x < p) {
            const _ = Math.ceil((p - x) / m);
            for (let y = l; y < l + m; y++) i[y] = (i[y] || t) + _;
          }
          continue;
        }
      }
      i[l] = Math.max(i[l] || t, p);
    }
  }
  return i;
}
function ye(o, e, n) {
  const t = [], s = [];
  let i = "wx-measure-cell-body";
  i += o.css ? ` ${o.css}` : "";
  for (let a = 0; a < e.length; a++) {
    const r = e[a], c = v(r, o);
    c && (t.push(c), o.treetoggle ? s.push(e[a].$level * k + (e[a].$count ? k : 0) + (o.draggable ? k : 0)) : o.draggable && s.push(k));
  }
  return C(t, i, n, s).width;
}
function _e(o, e) {
  const n = "wx-measure-cell-header", t = o.sort ? me : 0;
  let s = o.header;
  if (typeof s == "string") return C(s, n, e).width + t;
  let i;
  Array.isArray(s) || (s = [s]);
  for (let a = 0; a < s.length; a++) {
    const r = s[a], c = typeof r == "string" ? r : r.text, l = n + (typeof r == "string" ? "" : ` ${r.css}`);
    let d = C(c, l, e).width;
    a === s.length - 1 && (d += t), i = Math.max(i || 0, d);
  }
  return i;
}
const Se = { text: (o, e) => o ? o.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (o, e) => typeof e != "number" && !e ? true : o == e };
function be(o) {
  return Se[o];
}
class ve extends W {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: false });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new F(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: i, sizes: a, _skin: r } = this.getState(), c = this.copyColumns(i), l = c.reduce((u, f) => Math.max(f.header.length, u), 0), d = c.reduce((u, f) => Math.max(f.footer.length, u), 0);
      c.forEach(this.setCollapsibleColumns);
      const h = this.normalizeSizes(c, a, l, d, r);
      c.forEach((u, f) => {
        this.normalizeColumns(c, f, "header", l, h), this.normalizeColumns(c, f, "footer", d, h);
      }), this.setState({ _columns: c, _sizes: h }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData"], exec: (s) => {
      const { data: i, tree: a, _filterIds: r } = this.getState(), c = a ? this.flattenRows(i, [], r) : i.filter((l) => !r || r.includes(l.id));
      this.setState({ flatData: c }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const t = this.in = new U();
    t.on("close-editor", ({ ignore: s }) => {
      const { editor: i } = this.getState();
      i && (s || t.exec("update-cell", i), this.setState({ editor: null }));
    }), t.on("open-editor", ({ id: s, column: i }) => {
      let a = this.getState().editor;
      a && t.exec("close-editor", {});
      const r = this.getRow(s), c = i ? this.getColumn(i) : this.getNextEditor(r);
      if (c?.editor) {
        let l = c.editor;
        if (typeof l == "function" && (l = l(r, c)), !l) return;
        a = { column: c.id, id: s, value: S(r, c) ?? "", renderedValue: v(r, c) }, typeof l == "object" && l.config && (a.config = l.config, l.config.options && (a.options = l.config.options)), c.options && !a.options && (a.options = c.options), this.setState({ editor: a });
      }
    }), t.on("editor", ({ value: s }) => {
      const i = this.getState().editor;
      i && (i.value = s, this.setState({ editor: i }));
    }), t.on("add-row", (s) => {
      const i = this.getState();
      let { data: a } = i;
      const { select: r, _filterIds: c } = i, { row: l, before: d, after: h, select: u } = s;
      if (s.id = l.id = s.id || l.id || E(), d || h) {
        const g = d || h, p = a.findIndex((w) => w.id === g);
        a.splice(p + (h ? 1 : 0), 0, s.row), a = [...a];
      } else a = [...a, s.row];
      const f = { data: a };
      c && (f._filterIds = [...c, s.id]), this.setState(f), !(typeof u == "boolean" && !u) && (u || r) && t.exec("select-row", { id: l.id, show: true });
    }), t.on("delete-row", (s) => {
      const { data: i, selectedRows: a, focusCell: r } = this.getState(), { id: c } = s, l = { data: i.filter((d) => d.id !== c) };
      this.isSelected(c) && (l.selectedRows = a.filter((d) => d !== c)), this.setState(l), r?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), t.on("update-cell", (s) => {
      const i = this.getState();
      let { data: a } = i;
      a = [...a];
      const { tree: r } = i, { id: c, column: l, value: d } = s, h = this.getColumn(l);
      if (r) {
        const u = { ...this._branches[c] };
        H(u, h, d);
        const f = this.updateTreeRow(u);
        u.$parent === 0 && (a = f);
      } else {
        const u = a.findIndex((g) => g.id == c), f = { ...a[u] };
        H(f, h, d), a[u] = f;
      }
      this.setState({ data: a });
    }), t.on("update-row", (s) => {
      let { data: i } = this.getState();
      const { id: a, row: r } = s, c = i.findIndex((l) => l.id == a);
      i = [...i], i[c] = { ...i[c], ...r }, this.setState({ data: i });
    }), t.on("select-row", ({ id: s, toggle: i, range: a, mode: r, show: c, column: l }) => {
      const d = this.getState(), { focusCell: h } = d;
      let { selectedRows: u } = d;
      if (u.length || (a = i = false), a) {
        const { data: f } = this.getState();
        let g = f.findIndex((w) => w.id == u[u.length - 1]), p = f.findIndex((w) => w.id == s);
        g > p && ([g, p] = [p, g]), f.slice(g, p + 1).forEach((w) => {
          u.indexOf(w.id) === -1 && u.push(w.id);
        });
      } else if (i && this.isSelected(s)) {
        if (r === true) return;
        u = u.filter((f) => f !== s);
      } else if (i) {
        if (r === false) return;
        u.push(s);
      } else u = [s];
      this.setState({ selectedRows: u }), h?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), c && this.in.exec("scroll", { row: s, column: l });
    }), this.in.on("focus-cell", (s) => {
      const { row: i, column: a, eventSource: r } = s, { _columns: c, split: l } = this.getState();
      i && a ? (this.setState({ focusCell: { row: i, column: a } }), r !== "click" && ((!l.left || c.findIndex((d) => d.id == s.column) >= l.left) && (!l.right || c.findIndex((d) => d.id == s.column) < c.length - l.right) ? this.in.exec("scroll", { row: i, column: a }) : this.in.exec("scroll", { row: i }))) : this.setState({ focusCell: null });
    }), t.on("resize-column", (s) => {
      const { id: i, auto: a, maxRows: r, inProgress: c } = s;
      if (c === false) return;
      let l = s.width || 0;
      const d = [...this.getState().columns], h = d.find((u) => u.id == i);
      if (a) {
        if (a == "data" || a === true) {
          const { flatData: u, _skin: f } = this.getState();
          let g = u.length;
          r && (g = Math.min(r, g));
          const p = u.slice(0, g);
          l = ye(h, p, f);
        }
        if (a == "header" || a === true) {
          const { _skin: u } = this.getState();
          l = Math.max(_e(h, u), l);
        }
      }
      h.width = Math.max(17, l), delete h.flexgrow, this.setState({ columns: d });
    }), t.on("hide-column", (s) => {
      const { id: i, mode: a } = s, r = [...this.getState().columns], c = r.find((d) => d.id == i), l = r.reduce((d, h) => d + (h.hidden ? 0 : 1), 0);
      !a || l > 1 ? (c.hidden = !c.hidden, this.setState({ columns: r })) : s.skipUndo = true;
    }), t.on("sort-rows", (s) => {
      const { key: i, add: a } = s;
      let { order: r = "asc" } = s;
      const c = this.getState();
      let l = c.sortMarks;
      const { columns: d, data: h, tree: u } = c, f = Object.keys(l), g = f.length;
      l[i] && (r = l[i].order === "asc" ? "desc" : "asc"), !a || !g || g === 1 && l[i] ? l = { [i]: { order: r } } : (g === 1 && (l[f[0]] = { ...l[f[0]], index: 0 }), l = { ...l, [i]: { order: r, index: l[i]?.index ?? g } });
      const p = Object.keys(l).sort((m, x) => l[m].index - l[x].index).map((m) => ({ key: m, order: l[m].order }));
      this.setState({ sortMarks: l });
      const w = we(p, d);
      if (w) {
        const m = [...h];
        u ? this.sortTree(m, w) : m.sort(w), this.setState({ data: m });
      }
    }), t.on("filter-rows", (s) => {
      const { value: i, key: a, filter: r } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const c = this.getState(), { data: l, tree: d } = c;
      let h = c.filterValues;
      const u = {};
      a && (h = { ...h, [a]: i }, u.filterValues = h);
      const f = r ?? this.createFilter(h);
      let g = [];
      d ? g = this.filterTree(l, f, g) : l.forEach((p) => {
        f(p) && g.push(p.id);
      }), u._filterIds = g, this.setState(u);
    }), t.on("collapse-column", (s) => {
      const { id: i, row: a, mode: r } = s, c = [...this.getState().columns], l = this.getColumn(i).header, d = Array.isArray(l) ? l[a] : l;
      typeof d == "object" && (d.collapsed = r ?? !d.collapsed, this.setState({ columns: c }));
    }), t.on("move-item", (s) => {
      const { id: i, target: a, mode: r = "after", inProgress: c } = s, { data: l, flatData: d, tree: h } = this.getState(), u = d.findIndex((p) => p.id == i), f = d.findIndex((p) => p.id == a);
      if (u === -1 || f === -1 || c === false) return;
      let g;
      h ? g = this.moveItem(i, a, l, r) : g = this.moveItem(i, a, l, r), this.setState({ data: h ? this.normalizeTreeRows(g) : g });
    }), t.on("open-row", (s) => {
      const { id: i, nested: a } = s;
      this.toggleBranch(i, true, a);
    }), t.on("close-row", (s) => {
      const { id: i, nested: a } = s;
      this.toggleBranch(i, false, a);
    }), t.on("export", (s) => new Promise((i, a) => {
      const r = s.options || {}, c = `${r.fileName || "data"}.${r.format}`;
      if (r.format == "csv") {
        const l = q(this.getState(), r);
        r.download !== false ? D(new Blob(["\uFEFF" + l], { type: "text/csv" }), c) : s.result = l, i(true);
      } else if (r.format == "xlsx") {
        let l = r.styles;
        !l && l !== false && (l = J(this.getState()._skin));
        const d = l, h = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: u, merged: f, rowSizes: g, colSizes: p, styles: w } = G(this.getState(), r, h), m = r.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(m).then((x) => {
          x.onmessage = (_) => {
            if (_.data.type == "ready") {
              const y = _.data.blob;
              r.download !== false ? D(y, c) : s.result = y, i(true);
            }
          }, x.postMessage({ type: "convert", data: { data: [{ name: r.sheetName || "data", cells: u, cols: p, rows: g, merged: f }], styles: w } });
        });
      } else a();
    })), t.on("hotkey", ({ key: s, event: i, isInput: a }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: r, focusCell: c, select: l } = this.getState();
          if (i.preventDefault(), a) return;
          const d = c ? c.column : this._getFirstVisibleColumn()?.id, h = c ? this.getPrevRow(c.row)?.id : r[r.length - 1]?.id;
          d && h && (this.in.exec("focus-cell", { row: h, column: d, eventSource: "key" }), l && this.in.exec("select-row", { id: h }));
          break;
        }
        case "arrowdown": {
          const { flatData: r, focusCell: c, select: l } = this.getState();
          if (i.preventDefault(), a) return;
          const d = c ? c.column : this._getFirstVisibleColumn()?.id, h = c ? this.getNextRow(c.row)?.id : r[0]?.id;
          d && h && (this.in.exec("focus-cell", { row: h, column: d, eventSource: "key" }), l && this.in.exec("select-row", { id: h }));
          break;
        }
        case "arrowright": {
          const { focusCell: r } = this.getState();
          if (a) return;
          if (i.preventDefault(), r) {
            const c = this.getNextColumn(r.column, true)?.id;
            c && this.in.exec("focus-cell", { row: r.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: r } = this.getState();
          if (a) return;
          if (i.preventDefault(), r) {
            const c = this.getPrevColumn(r.column, true)?.id;
            c && this.in.exec("focus-cell", { row: r.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: r, focusCell: c, select: l } = this.getState();
          if (r) {
            i.preventDefault();
            const d = r.column;
            let h = r.id, u = this.getNextEditor(this.getRow(h), this.getColumn(d));
            if (!u) {
              const f = this.getNextRow(h);
              f && (h = f.id, u = this.getNextEditor(f));
            }
            u && (this.in.exec("open-editor", { id: h, column: u.id }), this.in.exec("focus-cell", { row: h, column: u.id, eventSource: "key" }), l && !this.isSelected(h) && this.in.exec("select-row", { id: h }));
          } else c && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: r, focusCell: c, select: l } = this.getState();
          if (r) {
            i.preventDefault();
            const d = r.column;
            let h = r.id, u = this.getPrevEditor(this.getRow(h), this.getColumn(d));
            if (!u) {
              const f = this.getPrevRow(h);
              f && (h = f.id, u = this.getPrevEditor(f));
            }
            u && (this.in.exec("open-editor", { id: h, column: u.id }), this.in.exec("focus-cell", { row: h, column: u.id, eventSource: "key" }), l && !this.isSelected(h) && this.in.exec("select-row", { id: h }));
          } else c && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: r } = this.getState();
          r && (this.in.exec("close-editor", { ignore: true }), this.in.exec("focus-cell", { row: r.id, column: r.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: r, focusCell: c } = this.getState();
          !r && c && this.in.exec("open-editor", { id: c.row, column: c.column });
          break;
        }
        case "enter": {
          const { focusCell: r, tree: c } = this.getState();
          if (!a && c && r && this.getColumn(r.column).treetoggle) {
            const l = this.getRow(r.row);
            if (!l.data) return;
            this.in.exec(l.open ? "close-row" : "open-row", { id: r.row, nested: true });
          }
          break;
        }
        case "home": {
          const { editor: r, focusCell: c } = this.getState();
          if (!r && c) {
            i.preventDefault();
            const l = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: c.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: r, focusCell: c, flatData: l, select: d } = this.getState();
          if (!r && c) {
            i.preventDefault();
            const h = l[0]?.id, u = this._getFirstVisibleColumn()?.id;
            h && u && (this.in.exec("focus-cell", { row: h, column: u, eventSource: "key" }), d && !this.isSelected(h) && this.in.exec("select-row", { id: h }));
          }
          break;
        }
        case "end": {
          const { editor: r, focusCell: c } = this.getState();
          if (!r && c) {
            i.preventDefault();
            const l = this._getLastVisibleColumn()?.id, d = c.row;
            this.in.exec("focus-cell", { row: d, column: l, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: r, focusCell: c, flatData: l, select: d } = this.getState();
          if (!r && c) {
            i.preventDefault();
            const h = l.at(-1).id, u = this._getLastVisibleColumn()?.id;
            h && u && (this.in.exec("focus-cell", { row: h, column: u, eventSource: "key" }), d && !this.isSelected(h) && this.in.exec("select-row", { id: h }));
          }
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    }), t.on("scroll", (s) => {
      const { _columns: i, split: a, _sizes: r, flatData: c, dynamic: l } = this.getState();
      let d = -1, h = -1, u = 0;
      if (s.column) {
        d = 0;
        const f = i.findIndex((g) => g.id == s.column);
        u = i[f].width;
        for (let g = a.left ?? 0; g < f; g++) {
          const p = i[g];
          p.hidden || (d += p.width);
        }
      }
      if (s.row && !l) {
        const f = c.findIndex((g) => g.id === s.row);
        f >= 0 && (h = r.rowHeight * f);
      }
      this.setState({ scroll: { top: h, left: d, width: u, height: r.rowHeight } });
    }), t.on("print", (s) => {
      const i = re(s);
      this.setState({ _print: i }), this.setStateAsync({ _print: null });
    }), t.on("undo", () => {
      this._historyManager?.handleUndo();
    }), t.on("redo", () => {
      this._historyManager?.handleRedo();
    }), this.initOnce();
  }
  getXlsxWorker(e) {
    if (!this._xlsxWorker) {
      const n = window.URL.createObjectURL(new Blob([`importScripts('${e}');`], { type: "text/javascript" }));
      this._xlsxWorker = new Promise((t) => {
        const s = new Worker(n);
        s.addEventListener("message", (i) => {
          i.data.type === "init" && t(s);
        });
      });
    }
    return this._xlsxWorker;
  }
  initOnce() {
    const e = { sortMarks: {}, _filterIds: null, data: [], filterValues: {}, scroll: null, editor: null, focusCell: null, _print: null, history: { undo: 0, redo: 0 } };
    this._router.init(e);
  }
  init(e) {
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = xe()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((t) => [t.id, t.label])));
    }), b(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {} }), this._historyManager && this._historyManager.resetHistory()), A() && (e.tree && (e.undo = false), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new ue(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
  }
  setState(e, n) {
    return this._router.setState(e, n);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getRow(e) {
    const { tree: n } = this.getState();
    return n ? this._branches[e] : this.getState().data.find((t) => t.id == e);
  }
  getRowIndex(e, n) {
    return n || (n = this.getState().flatData), n.findIndex((t) => t.id == e);
  }
  getNextRow(e) {
    const n = this.getState().flatData, t = this.getRowIndex(e, n);
    return n[t + 1];
  }
  getPrevRow(e) {
    const n = this.getState().flatData, t = this.getRowIndex(e, n);
    return n[t - 1];
  }
  getColumn(e) {
    return this.getState().columns.find((n) => n.id == e);
  }
  getNextColumn(e, n) {
    const t = this.getState()._columns, s = t.findIndex((i) => i.id == e);
    return n ? this._getFirstVisibleColumn(s + 1) : t[s + 1];
  }
  getPrevColumn(e, n) {
    const t = this.getState()._columns, s = t.findIndex((i) => i.id == e);
    return n ? this._getLastVisibleColumn(s - 1) : t[s - 1];
  }
  _getFirstVisibleColumn(e) {
    const n = this.getState()._columns;
    let t = e ?? 0;
    for (; t < n.length && (n[t]?.hidden || n[t]?.collapsed); ) t++;
    return n[t];
  }
  _getLastVisibleColumn(e) {
    const n = this.getState()._columns;
    let t = e ?? n.length - 1;
    for (; t < n.length && (n[t]?.hidden || n[t]?.collapsed); ) t--;
    return n[t];
  }
  isCellEditable(e, n) {
    const { editor: t, hidden: s } = n;
    return !t || s ? false : typeof t == "function" ? t(e, n) : true;
  }
  getNextEditor(e, n) {
    let t = this.getState().columns;
    if (n) {
      const s = t.findIndex((i) => i.id == n.id);
      t = t.slice(s + 1);
    }
    return t.find((s) => this.isCellEditable(e, s));
  }
  getPrevEditor(e, n) {
    let t = this.getState().columns;
    if (n) {
      const s = t.findLastIndex((i) => i.id == n.id);
      t = t.slice(0, s);
    }
    return t.findLast((s) => this.isCellEditable(e, s));
  }
  toggleBranch(e, n, t) {
    let s = this._branches[e], { data: i } = this.getState();
    if (i = [...i], e !== 0) {
      s = { ...s, open: n };
      const a = this.updateTreeRow(s);
      s.$parent === 0 && (i = a);
    }
    t && s.data?.length && s.data.forEach((a) => {
      const r = this.toggleKids(a, n, t);
      e === 0 && (i = r);
    }), this.setState({ data: i });
  }
  toggleKids(e, n, t) {
    e = { ...e, open: n };
    const s = this.updateTreeRow(e);
    return t && e.data?.length && e.data.forEach((i) => {
      this.toggleKids(i, n, t);
    }), s;
  }
  updateTreeRow(e) {
    const n = e.id;
    this._branches[n] = e;
    const t = this._branches[e.$parent], s = t.data.findIndex((i) => i.id == n);
    return t.data = [...t.data], t.data[s] = e, t.data;
  }
  isSelected(e) {
    return this.getState().selectedRows.indexOf(e) !== -1;
  }
  findAndRemove(e, n) {
    for (let t = 0; t < e.length; t++) {
      if (e[t].id == n) return e.splice(t, 1)[0];
      if (e[t].data) {
        const s = [...e[t].data], i = this.findAndRemove(s, n);
        if (i) return e[t] = { ...e[t], data: s }, i;
      }
    }
    return null;
  }
  insertItem(e, n, t, s) {
    for (let i = 0; i < e.length; i++) {
      if (e[i].id == n) {
        const a = e[i], r = s === "before" ? i : i + 1;
        if (a.data) {
          if (s === "before") {
            const c = i > 0 ? e[i - 1] : null;
            return c?.data && c.open ? e[i - 1] = { ...c, data: [...c.data, t] } : e.splice(r, 0, t), true;
          } else if (a.open) return e[i] = { ...a, data: [t, ...a.data] }, true;
        }
        return e.splice(r, 0, t), true;
      }
      if (e[i].data && (e[i] = { ...e[i], data: [...e[i].data] }, this.insertItem(e[i].data, n, t, s))) return true;
    }
    return false;
  }
  moveItem(e, n, t, s) {
    const i = [...t], a = this.findAndRemove(i, e);
    return this.insertItem(i, n, a, s), i;
  }
  copyColumns(e) {
    const n = [];
    return e.forEach((t) => {
      const s = { ...t };
      this.copyHeaderFooter(s, "header"), this.copyHeaderFooter(s, "footer"), n.push(s);
    }), n;
  }
  copyHeaderFooter(e, n) {
    let t = e[n];
    t = Array.isArray(t) ? [...t] : [t], t.forEach((s, i) => {
      t[i] = typeof s == "string" ? { text: s } : { ...s };
    }), e[n] = t;
  }
  setCollapsibleColumns(e, n, t) {
    let s = e.header;
    for (let i = 0; i < s.length; i++) {
      const a = s[i];
      if (a.collapsible && a.collapsed) {
        if (a.collapsible !== "first") {
          e.collapsed = true, e.width = 36, a.vertical = true;
          const c = s.length - i;
          s = s.slice(0, i + 1), s[i].rowspan = c;
        }
        const r = a.colspan;
        if (r) {
          const c = s[i + 1];
          let l = 1;
          c && c.colspan && !c.collapsed && (l = c.colspan);
          for (let d = l; d < r; d++) {
            const h = t[n + d];
            h && (h.hidden = true);
          }
        }
      }
    }
  }
  normalizeColumns(e, n, t, s, i) {
    const a = e[n];
    a.width || (a.width = a.flexgrow ? 17 : i.columnWidth), a._colindex = n + 1;
    const r = a[t], c = i[`${t}RowHeights`];
    for (let l = 0; l < s; l++) {
      const d = r[l];
      d.id = a.id, l === r.length - 1 && (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - l) : s - l);
      for (let h = 1; h < d.rowspan; h++) {
        r.splice(l + h, 0, { _hidden: true });
        for (let u = 1; u < d.colspan; u++) e[n + u][t].splice(l + h, 0, {});
      }
      if (d.rowspan) {
        const h = (d.rowspan === s ? c : c.slice(l, d.rowspan + l)).reduce((u, f) => u + f, 0);
        d.height = h, l + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let h = a.width, u = a.flexgrow || 0;
        const f = d.colspan;
        for (let g = 1; g < f; g++) {
          const p = e[n + g];
          p && (p.hidden ? d.colspan -= 1 : p.flexgrow ? u += p.flexgrow : h += p.width || i.columnWidth), u ? d.flexgrow = u : d.width = h;
        }
      } else d.width = a.width, d.flexgrow = a.flexgrow;
      t === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    r.length > s && (r.length = s), a[t] = r;
  }
  normalizeRows(e) {
    return e.forEach((n) => {
      n.id || (n.id = E());
    }), e;
  }
  normalizeTreeRows(e, n, t) {
    return e.forEach((s) => {
      s.id || (s.id = E()), s.$level = n || 0, s.$parent = t || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
    }), e;
  }
  sortTree(e, n) {
    e.sort(n), e.forEach((t) => {
      t.data && this.sortTree(t.data, n);
    });
  }
  filterTree(e, n, t) {
    return e.forEach((s) => {
      n(s) && t.push(s.id), s.data && this.filterTree(s.data, n, t);
    }), t;
  }
  flattenRows(e, n, t) {
    const s = n;
    return e.forEach((i) => {
      (!t || t.includes(i.id)) && s.push(i), i.data?.length && i.open !== false && this.flattenRows(i.data, s, t);
    }), s;
  }
  createFilter(e) {
    const { _columns: n } = this.getState(), t = [];
    for (const s in e) {
      const { config: i, type: a } = n.find((c) => c.id == s).header.find((c) => c.filter).filter, r = e[s];
      t.push((c) => i?.handler ? i.handler(c[s], r) : be(a)(c[s], r));
    }
    return (s) => {
      for (let i = 0; i < t.length; i++) if (!t[i](s)) return false;
      return true;
    };
  }
  normalizeSizes(e, n, t, s, i) {
    const a = L(e, "header", t, n.headerHeight, i), r = L(e, "footer", s, n.footerHeight, i), c = a.reduce((d, h) => d + h, 0), l = r.reduce((d, h) => d + h, 0);
    return { ...n, headerRowHeights: a, footerRowHeights: r, headerHeight: c, footerHeight: l };
  }
}
let ke = (/* @__PURE__ */ new Date()).valueOf();
function E() {
  return "temp://" + ke++;
}
(/* @__PURE__ */ new Date()).valueOf();
function getStyle(width, flexgrow, fixed, left, right, height) {
  const w = width ? `width:${width}px;` : "";
  const mw = width ? `min-width:${width}px;` : "";
  const fl = flexgrow ? `flex-grow:${flexgrow};` : "";
  const h = height ? `height:${height}px;` : "";
  let fx = "";
  if (fixed) {
    if (fixed.left) fx = `position:sticky;left:${left}px;`;
    if (fixed.right) fx = `position:sticky;right:${right}px;`;
  }
  return `${mw}${w}${h}${fl}${fx}`;
}
function getCssName(column, cell, columnStyle) {
  let css = "";
  if (column.fixed) {
    for (const pos in column.fixed) {
      css += column.fixed[pos] === -1 ? "wx-shadow " : "wx-fixed ";
    }
  }
  css += cell.rowspan > 1 ? "wx-rowspan " : "";
  css += cell.colspan > 1 ? "wx-colspan " : "";
  css += cell.vertical ? "wx-vertical " : "";
  css += columnStyle ? columnStyle(column) + " " : "";
  return css;
}
function Cell($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    row,
    column,
    cellStyle = null,
    columnStyle = null,
    children,
    reorder,
    focusable
  } = $$props;
  let style = getStyle(column.width, column.flexgrow, column.fixed, column.left, column.right), css = buildCellCss(columnStyle, cellStyle);
  const api = getContext("grid-store");
  const { focusCell } = api.getReactiveState();
  const isDraggable = typeof column.draggable === "function" ? column.draggable(row, column) !== false : column.draggable;
  function buildCellCss(columnStyle2, cellStyle2) {
    let css2 = "wx-cell";
    css2 += column.fixed ? " " + (column.fixed === -1 ? "wx-shadow" : "wx-fixed") : "";
    css2 += columnStyle2 ? " " + columnStyle2(column) : "";
    css2 += cellStyle2 ? " " + cellStyle2(row, column) : "";
    css2 += column.treetoggle ? " wx-tree-cell" : "";
    return css2;
  }
  onDestroy(() => {
    if (focusable && store_get($$store_subs ??= {}, "$focusCell", focusCell)) {
      api.exec("focus-cell", { eventSource: "destroy" });
      focusable = false;
    }
  });
  $$payload.out += `<div${attr_class(clsx(css), "svelte-1wkb0jq", {
    "wx-shadow": column.fixed && column.fixed.left === -1 || column.fixed.right === -1,
    "wx-fixed-right": column.fixed && column.fixed.right
  })}${attr_style(style)}${attr("data-row-id", row.id)}${attr("data-col-id", column.id)}${attr("tabindex", focusable ? "0" : "-1")} role="gridcell"${attr("aria-colindex", column._colindex)}${attr("aria-readonly", !column.editor ? true : void 0)}>`;
  if (reorder && column.draggable) {
    $$payload.out += "<!--[-->";
    if (isDraggable) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i draggable-data="true" class="wx-draggable wxi-drag svelte-1wkb0jq"></i>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<i class="wx-draggable-stub svelte-1wkb0jq"></i>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (column.treetoggle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span${attr_style(`margin-left:${stringify(row.$level * 28)}px;`)}></span> `;
    if (row.$count) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i data-action="toggle-row"${attr_class(`wx-table-tree-toggle wxi-menu-${stringify(row.open !== false ? "down" : "right")}`, "svelte-1wkb0jq")}></i>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (column.cell) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    column.cell($$payload, {
      api,
      row,
      column,
      onaction: ({ action, data: data2 }) => api.exec(action, data2)
    });
    $$payload.out += `<!---->`;
  } else if (children) {
    $$payload.out += "<!--[1-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(v(row, column))}`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Text_1($$payload, $$props) {
  push();
  let { filter, column, action, filterValue } = $$props;
  function filterRows({ value }) {
    action({ value, key: column.id });
  }
  Text$1($$payload, spread_props([
    filter.config ?? {},
    { value: filterValue, onchange: filterRows }
  ]));
  pop();
}
function Richselect$1($$payload, $$props) {
  push();
  var $$store_subs;
  let { filter, column, action, filterValue } = $$props;
  const api = getContext("grid-store");
  const { flatData: data2 } = api.getReactiveState();
  let options = filter?.config?.options || column.options || getOptions(store_get($$store_subs ??= {}, "$data", data2));
  let template = filter?.config?.template;
  function getOptions() {
    const options2 = [];
    store_get($$store_subs ??= {}, "$data", data2).forEach((d) => {
      const value = S(d, column);
      if (!options2.includes(value)) options2.push(value);
    });
    return options2.map((opt) => ({ id: opt, label: opt }));
  }
  function filterRows({ value }) {
    action({ value, key: column.id });
  }
  $$payload.out += `<div style="width:100%;">`;
  {
    let children = function($$payload2, option) {
      if (template) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `${escape_html(template(option))}`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(option.label)}`;
      }
      $$payload2.out += `<!--]-->`;
    };
    RichSelect($$payload, spread_props([
      { placeholder: "", clear: true },
      filter.config ?? {},
      {
        options,
        value: filterValue,
        onchange: filterRows,
        children,
        $$slots: { default: true }
      }
    ]));
  }
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
const filters = {
  text: Text_1,
  richselect: Richselect$1
};
function Filter($$payload, $$props) {
  push();
  var $$store_subs;
  let { filter, column } = $$props;
  const api = getContext("grid-store");
  const { filterValues } = api.getReactiveState();
  function filterRows(data2) {
    api.exec("filter-rows", data2);
  }
  const SvelteComponent = filters[filter.type];
  $$payload.out += `<!---->`;
  SvelteComponent($$payload, {
    filter,
    column,
    action: filterRows,
    filterValue: store_get($$store_subs ??= {}, "$filterValues", filterValues)[column.id]
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function HeaderCell($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    cell,
    column,
    row,
    lastRow,
    sortRow,
    columnStyle,
    bodyHeight,
    hasSplit
  } = $$props;
  const api = getContext("grid-store");
  const { sortMarks } = api.getReactiveState();
  let sortMark = store_get($$store_subs ??= {}, "$sortMarks", sortMarks)[column.id];
  let isCollapsed = cell.collapsed && column.collapsed;
  let overlay = isCollapsed && !hasSplit && cell.collapsible !== "header";
  let collapsedTextStyle = overlay ? `top:-${bodyHeight / 2}px;position:absolute;` : "";
  let style = getStyle(cell.width, cell.flexgrow, column.fixed, column.left, cell.right ?? column.right, cell.height + (isCollapsed && overlay ? bodyHeight : 0));
  const css = getCssName(column, cell, columnStyle);
  function getCell() {
    return Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell"));
  }
  if (isCollapsed) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")} wx-collapsed`, "svelte-1m17ldm")}${attr_style(style)} role="button"${attr("aria-label", `Expand column ${cell.text || ""}`)}${attr("aria-expanded", !cell.collapsed)} tabindex="0"${attr("data-header-id", column.id)}><div class="wx-text svelte-1m17ldm"${attr_style(collapsedTextStyle)}>${escape_html(cell.text || "")}</div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")}`, "svelte-1m17ldm", {
      "wx-filter": cell.filter,
      "wx-fixed-right": column.fixed && column.fixed.right
    })}${attr_style(style)}${attr("data-header-id", column.id)}${attr("tabindex", !cell._hidden && column.sort && !cell.filter ? "0" : void 0)} role="columnheader"${attr("aria-colindex", cell._colindex)}${attr("aria-colspan", cell.colspan > 1 ? cell.colspan : void 0)}${attr("aria-rowspan", cell.rowspan > 1 ? cell.rowspan : void 0)}${attr("aria-sort", !sortMark?.order || cell.filter ? "none" : sortMark?.order === "asc" ? "ascending" : "descending")}>`;
    if (cell.collapsible) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="wx-collapse svelte-1m17ldm" role="button"${attr("aria-label", cell.collapsed ? "Expand column" : "Collapse column")}${attr("aria-expanded", !cell.collapsed)} tabindex="0"><i${attr_class(`wxi-angle-${stringify(cell.collapsed ? "down" : "right")}`, "svelte-1m17ldm")}></i></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (cell.cell) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      cell.cell($$payload, {
        api,
        cell: getCell(),
        column,
        row,
        onaction: ({ action, data: data2 }) => api.exec(action, data2)
      });
      $$payload.out += `<!---->`;
    } else if (cell.filter) {
      $$payload.out += "<!--[1-->";
      Filter($$payload, { filter: cell.filter, column });
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="wx-text svelte-1m17ldm">${escape_html(cell.text || "")}</div>`;
    }
    $$payload.out += `<!--]--> `;
    if (column.resize && lastRow && !cell._hidden) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="wx-grip svelte-1m17ldm" role="presentation" aria-label="Resize column"><div class="svelte-1m17ldm"></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (sortRow) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="wx-sort svelte-1m17ldm">`;
      if (sortMark) {
        $$payload.out += "<!--[-->";
        if (typeof sortMark.index !== "undefined") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="wx-order svelte-1m17ldm">${escape_html(sortMark.index + 1)}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <i${attr_class(`wxi-arrow-${stringify(sortMark.order === "asc" ? "up" : "down")}`, "svelte-1m17ldm")}></i>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function FooterCell($$payload, $$props) {
  push();
  const api = getContext("grid-store");
  let { cell, column, row, columnStyle } = $$props;
  let style = getStyle(cell.width, cell.flexgrow, column.fixed, column.left, cell.right ?? column.right, cell.height);
  let css = getCssName(column, cell, columnStyle);
  function getCell() {
    return Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell"));
  }
  $$payload.out += `<div${attr_class(`wx-cell ${stringify(css)} ${stringify(cell.css || "")}`, "svelte-aecvi5", {
    "wx-fixed-right": column.fixed && column.fixed.right
  })}${attr_style(style)}>`;
  if (!column.collapsed && !cell.collapsed) {
    $$payload.out += "<!--[-->";
    if (cell.cell) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      cell.cell($$payload, {
        api,
        cell: getCell(),
        column,
        row,
        onaction: ({ action, data: data2 }) => api.exec(action, data2)
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="wx-text svelte-aecvi5">${escape_html(cell.text || "")}</div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function HeaderFooter$1($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    deltaLeft,
    contentWidth,
    columns: columns2,
    type = "header",
    columnStyle,
    bodyHeight
  } = $$props;
  const api = getContext("grid-store");
  const { _sizes: sizes, split } = api.getReactiveState();
  let rowHeights = store_get($$store_subs ??= {}, "$sizes", sizes)[`${type}RowHeights`];
  let renderedHeader = (() => {
    let res = [];
    if (columns2.length) {
      const rowsCount = columns2[0][type].length;
      for (let ri = 0; ri < rowsCount; ri++) {
        let inSpan = 0;
        res.push([]);
        columns2.forEach((col, ci) => {
          const cell = { ...col[type][ri] };
          if (!inSpan) {
            res[ri].push(cell);
          }
          if (cell.colspan > 1) {
            inSpan = cell.colspan - 1;
            if (!A()) {
              if (col.right) {
                let right = col.right;
                for (let i = 1; i < cell.colspan; i++) {
                  right -= columns2[ci + i].width;
                }
                cell.right = right;
              }
            }
          } else if (inSpan) inSpan--;
        });
      }
    }
    return res;
  })();
  const hasSplit = store_get($$store_subs ??= {}, "$split", split)?.left || store_get($$store_subs ??= {}, "$split", split)?.right;
  function getColumn(id) {
    return columns2.find((c) => c.id === id);
  }
  function isLast(cell, ind) {
    if (cell.rowspan) ind += cell.rowspan - 1;
    return ind === renderedHeader.length - 1;
  }
  function isSort(cell, ind, column) {
    if (!column.sort) return false;
    for (let i = renderedHeader.length - 1; i >= 0; i--) {
      const cell2 = column.header[i];
      if (!cell2.filter && !cell2._hidden) return ind === i;
    }
    return isLast(cell, ind);
  }
  const each_array = ensure_array_like(renderedHeader);
  $$payload.out += `<div${attr_class(`wx-${type}`, "svelte-f3sbch")}${attr_style(`padding-left:${stringify(deltaLeft)}px;width:${stringify(contentWidth)}px;`)} role="rowgroup"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let row = each_array[i];
    const each_array_1 = ensure_array_like(row);
    $$payload.out += `<div${attr_class(clsx(type === "header" ? "wx-h-row" : "wx-f-row"))}${attr_style(`height:${stringify(rowHeights[i])}px; display: flex`)} role="row"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let cell = each_array_1[$$index];
      const column = getColumn(cell.id);
      if (type === "header") {
        $$payload.out += "<!--[-->";
        HeaderCell($$payload, {
          cell,
          columnStyle,
          column,
          row: i,
          lastRow: isLast(cell, i),
          bodyHeight,
          sortRow: isSort(cell, i, column),
          hasSplit
        });
      } else {
        $$payload.out += "<!--[!-->";
        FooterCell($$payload, {
          cell,
          columnStyle,
          column: getColumn(cell.id),
          row: i
        });
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Overlay($$payload, $$props) {
  push();
  let { overlay } = $$props;
  const api = getContext("grid-store");
  function isComponent(prop) {
    return typeof prop === "function";
  }
  $$payload.out += `<div class="wx-overlay svelte-zjaxrx">`;
  if (isComponent(overlay)) {
    $$payload.out += "<!--[-->";
    const SvelteComponent = overlay;
    $$payload.out += `<!---->`;
    SvelteComponent($$payload, {
      onaction: ({ action, data: data2 }) => api.exec(action, data2)
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(overlay)}`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Text($$payload, $$props) {
  push();
  let { actions, editor } = $$props;
  let value = editor.value || "";
  $$payload.out += `<input class="wx-text svelte-1a713m7" type="text"${attr("value", value)}/>`;
  pop();
}
function Combo($$payload, $$props) {
  push();
  let { actions, editor, onaction } = $$props;
  let tmp = editor, value = tmp.value, text = tmp.renderedValue, filterOptions = tmp.options;
  let tmp_1 = editor?.config || {}, template = tmp_1.template, cell = tmp_1.cell;
  let index = filterOptions.findIndex((a) => a.id === value);
  function updateValue({ id }) {
    actions.updateValue(id);
    actions.save();
  }
  let navigate;
  function ready(ev) {
    navigate = ev.navigate;
    ev.keydown;
    navigate(index);
  }
  $$payload.out += `<input class="wx-input svelte-1s4pc76"${attr("value", text)}/> `;
  {
    let children = function($$payload2, { option }) {
      if (template) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `${escape_html(template(option))}`;
      } else if (cell) {
        $$payload2.out += "<!--[1-->";
        const SvelteComponent_1 = cell;
        $$payload2.out += `<!---->`;
        SvelteComponent_1($$payload2, { data: option, onaction });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(option.label)}`;
      }
      $$payload2.out += `<!--]-->`;
    };
    SuggestDropdown($$payload, {
      items: filterOptions,
      onready: ready,
      onselect: updateValue,
      children
    });
  }
  $$payload.out += `<!---->`;
  pop();
}
function Datepicker($$payload, $$props) {
  push();
  let { actions, editor, onaction } = $$props;
  let value = editor.value || /* @__PURE__ */ new Date();
  let template = editor.config?.template;
  let cell = editor.config?.cell;
  function updateValue({ value: value2 }) {
    actions.updateValue(value2);
    actions.save();
  }
  $$payload.out += `<div class="wx-value svelte-1eq9nh5" tabindex="0">`;
  if (template) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(template(value))}`;
  } else if (cell) {
    $$payload.out += "<!--[1-->";
    const SvelteComponent = cell;
    $$payload.out += `<!---->`;
    SvelteComponent($$payload, { data: editor.value, onaction });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="wx-text svelte-1eq9nh5">${escape_html(editor.renderedValue)}</span>`;
  }
  $$payload.out += `<!--]--></div> `;
  Dropdown($$payload, {
    width: "auto",
    children: ($$payload2) => {
      Calendar($$payload2, {
        value,
        onchange: updateValue,
        buttons: editor.config?.buttons
      });
    }
  });
  $$payload.out += `<!---->`;
  pop();
}
function Richselect($$payload, $$props) {
  push();
  let { actions, editor, onaction } = $$props;
  let data2 = editor.options.find((opt) => opt.id === editor.value);
  let tmp = editor, value = tmp.value, options = tmp.options;
  let tmp_1 = editor?.config || {}, template = tmp_1.template, cell = tmp_1.cell;
  let index = options.findIndex((a) => a.id === value);
  function updateValue({ id }) {
    actions.updateValue(id);
    actions.save();
  }
  let navigate;
  function ready(ev) {
    navigate = ev.navigate;
    ev.keydown;
    navigate(index);
  }
  $$payload.out += `<div class="wx-value svelte-z4gexz" tabindex="0">`;
  if (template) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(template(data2))}`;
  } else if (cell) {
    $$payload.out += "<!--[1-->";
    const SvelteComponent = cell;
    $$payload.out += `<!---->`;
    SvelteComponent($$payload, { data: data2, onaction });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="wx-text svelte-z4gexz">${escape_html(editor.renderedValue)}</span>`;
  }
  $$payload.out += `<!--]--></div> `;
  {
    let children = function($$payload2, { option }) {
      if (template) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `${escape_html(template(option))}`;
      } else if (cell) {
        $$payload2.out += "<!--[1-->";
        const SvelteComponent_1 = cell;
        $$payload2.out += `<!---->`;
        SvelteComponent_1($$payload2, { data: option, onaction });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(option.label)}`;
      }
      $$payload2.out += `<!--]-->`;
    };
    SuggestDropdown($$payload, {
      items: options,
      onready: ready,
      onselect: updateValue,
      children
    });
  }
  $$payload.out += `<!---->`;
  pop();
}
const editors = {
  text: Text,
  combo: Combo,
  datepicker: Datepicker,
  richselect: Richselect
};
function Editor($$payload, $$props) {
  push();
  var $$store_subs;
  let { column, row } = $$props;
  const api = getContext("grid-store");
  const { editor } = api.getReactiveState();
  function save(ignoreFocus) {
    const cell = ignoreFocus ? null : {
      row: store_get($$store_subs ??= {}, "$editor", editor).id,
      column: store_get($$store_subs ??= {}, "$editor", editor).column
    };
    closeEditor(false, cell);
  }
  function cancel() {
    closeEditor(true, {
      row: store_get($$store_subs ??= {}, "$editor", editor).id,
      column: store_get($$store_subs ??= {}, "$editor", editor).column
    });
  }
  function updateValue(value) {
    api.exec("editor", { value });
  }
  function closeEditor(ignore, cell) {
    api.exec("close-editor", { ignore });
    if (cell) {
      api.exec("focus-cell", { ...cell, eventSource: "click" });
    }
  }
  let style = getStyle(column.width, column.flexgrow, column.fixed, column.left, column.right);
  const SvelteComponent = (() => {
    let editor2 = column.editor;
    if (typeof editor2 === "function") editor2 = editor2(row, column);
    let type = typeof editor2 === "string" ? editor2 : editor2.type;
    return editors[type];
  })();
  $$payload.out += `<div class="wx-cell wx-editor svelte-sntz6"${attr_style(style)}${attr("role", typeof row.$parent !== "undefined" ? "gridcell" : "cell")}${attr("aria-readonly", typeof row.$parent !== "undefined" ? column.editor ? false : true : void 0)} tabindex="-1"><!---->`;
  SvelteComponent($$payload, {
    editor: store_get($$store_subs ??= {}, "$editor", editor),
    actions: { save, cancel, updateValue },
    onaction: ({ action, data: data2 }) => api.exec(action, data2)
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function HeaderFooter($$payload, $$props) {
  push();
  let { columns: columns2, type, columnStyle } = $$props;
  const api = getContext("grid-store");
  const { filterValues, _columns, _sizes: sizes } = api.getState();
  function getColumnCss(column) {
    return columnStyle ? " " + columnStyle(column) : "";
  }
  const each_array = ensure_array_like(columns2);
  $$payload.out += `<!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let row = each_array[i];
    const each_array_1 = ensure_array_like(row);
    $$payload.out += `<tr><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let cell = each_array_1[$$index];
      const column = _columns.find((c) => c.id == cell.id);
      $$payload.out += `<th${attr_style(ae(cell, sizes.columnWidth))}${attr_class(`wx-print-cell-${stringify(type)} ${stringify(getColumnCss(column))}`, void 0, {
        "wx-print-cell-filter": cell.filter,
        "wx-vertical": cell.vertical
      })}${attr("rowspan", cell.rowspan)}${attr("colspan", cell.colspan)}>`;
      if (cell.cell) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        cell.cell($$payload, {
          api,
          cell: Object.fromEntries(Object.entries(cell).filter(([key]) => key !== "cell")),
          column,
          row: i
        });
        $$payload.out += `<!---->`;
      } else if (cell.filter) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<div class="wx-print-filter">${escape_html(le(filterValues, _columns, cell))}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="wx-text">${escape_html(cell.text ?? "")}</div>`;
      }
      $$payload.out += `<!--]--></th>`;
    }
    $$payload.out += `<!--]--></tr>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Grid$1($$payload, $$props) {
  push();
  let {
    columns: columns2,
    rowStyle,
    columnStyle,
    cellStyle,
    header,
    footer,
    reorder
  } = $$props;
  const api = getContext("grid-store");
  const { flatData: data2, _sizes: sizes } = api.getState();
  const headerColumns = header && ne(columns2, "header", sizes.headerRowHeights);
  const footerColumns = footer && ne(columns2, "footer", sizes.footerRowHeights);
  function buildCellCss(row, column) {
    let css = "";
    css += columnStyle ? " " + columnStyle(column) : "";
    css += cellStyle ? " " + cellStyle(row, column) : "";
    return css;
  }
  function isDraggableIcon(row, column) {
    return typeof column.draggable === "function" ? column.draggable(row, column) !== false : column.draggable;
  }
  const each_array = ensure_array_like(data2);
  $$payload.out += `<table${attr_class("wx-print-grid svelte-15wlng7", void 0, {
    "wx-flex-columns": columns2.some((c) => c.flexgrow)
  })}>`;
  if (header) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<thead>`;
    HeaderFooter($$payload, {
      columns: headerColumns,
      type: "header",
      columnStyle
    });
    $$payload.out += `<!----></thead>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><tbody><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let row = each_array[$$index_1];
    const each_array_1 = ensure_array_like(columns2);
    $$payload.out += `<tr${attr_class("wx-row" + (rowStyle ? " " + rowStyle(row) : ""), "svelte-15wlng7")}><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let column = each_array_1[$$index];
      if (!column.collapsed) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<td${attr_class(`wx-print-cell wx-cell ${stringify(buildCellCss(row, column))}`, "svelte-15wlng7")}${attr_style(ae(column, sizes.columnWidth))}>`;
        if (reorder && column.draggable) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="wx-print-draggable">`;
          if (isDraggableIcon(row, column)) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<i class="wxi-drag"></i>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (column.treetoggle) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span${attr_style(`margin-left:${stringify(row.$level * 28)}px;`)}></span> `;
          if (row.$count) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<i${attr_class(`wx-print-grid-tree-toggle wxi-menu-${stringify(row.open !== false ? "down" : "right")}`)}></i>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (column.cell) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<!---->`;
          column.cell($$payload, { api, row, column });
          $$payload.out += `<!---->`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<span>${escape_html(v(row, column))}</span>`;
        }
        $$payload.out += `<!--]--></td>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></tr>`;
  }
  $$payload.out += `<!--]--></tbody>`;
  if (footer) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<tfoot>`;
    HeaderFooter($$payload, {
      columns: footerColumns,
      type: "footer",
      columnStyle
    });
    $$payload.out += `<!----></tfoot>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></table>`;
  pop();
}
function Print($$payload, $$props) {
  push();
  let { config, $$slots, $$events, ...restProps } = $$props;
  const api = getContext("grid-store");
  const { _skin: skin, _columns: columns2 } = api.getState();
  let grids = se(columns2, config);
  const each_array = ensure_array_like(grids);
  $$payload.out += `<div${attr_class(`wx-${stringify(skin)}-theme wx-print-container`)}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let cols = each_array[$$index];
    $$payload.out += `<div class="wx-print-grid-wrapper">`;
    Grid$1($$payload, spread_props([{ columns: cols }, restProps]));
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Layout($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    header,
    footer,
    overlay,
    multiselect,
    reorder,
    rowStyle,
    columnStyle,
    cellStyle,
    autoRowHeight,
    clientWidth,
    clientHeight
  } = $$props;
  const api = getContext("grid-store");
  const {
    dynamic,
    _columns,
    flatData: data2,
    split,
    _sizes,
    selectedRows,
    select,
    editor,
    scroll,
    tree,
    focusCell,
    _print,
    undo
  } = api.getReactiveState();
  let SCROLLSIZE = 0;
  let scrollLeft = 0, scrollTop = 0;
  const hasAny = (() => {
    return store_get($$store_subs ??= {}, "$_columns", _columns).some((col) => !col.hidden && col.flexgrow);
  })();
  const defaultRowHeight = store_get($$store_subs ??= {}, "$_sizes", _sizes).rowHeight;
  let dragItem = null, dragNode = null;
  const fullHeight = (() => {
    const count = store_get($$store_subs ??= {}, "$dynamic", dynamic) ? store_get($$store_subs ??= {}, "$dynamic", dynamic).rowCount : store_get($$store_subs ??= {}, "$data", data2).length;
    const base = count * defaultRowHeight;
    if (autoRowHeight) {
      return renderedHeight + renderRows.d + (count - renderEnd) * defaultRowHeight;
    } else {
      return base;
    }
  })();
  const fullWidth = store_get($$store_subs ??= {}, "$_columns", _columns).reduce(
    (acc, col) => {
      if (!col.hidden) {
        acc += col.width;
      }
      return acc;
    },
    0
  );
  const leftColumns = (() => {
    let columns2 = [];
    let width = 0;
    if (store_get($$store_subs ??= {}, "$split", split).left) {
      columns2 = store_get($$store_subs ??= {}, "$_columns", _columns).slice(0, store_get($$store_subs ??= {}, "$split", split).left).filter((c) => !c.hidden).map((a) => ({ ...a }));
      columns2.forEach((a) => {
        a.fixed = { left: 1 };
        a.left = width;
        width += a.width;
      });
      if (columns2.length) columns2[columns2.length - 1].fixed = { left: -1 };
    }
    return { columns: columns2, width };
  })();
  const rightColumns = (() => {
    let columns2 = [];
    let width = 0;
    if (store_get($$store_subs ??= {}, "$split", split).right) {
      columns2 = store_get($$store_subs ??= {}, "$_columns", _columns).slice(store_get($$store_subs ??= {}, "$split", split).right * -1).filter((c) => !c.hidden).map((a) => ({ ...a }));
      for (let i = columns2.length - 1; i >= 0; i--) {
        const col = columns2[i];
        col.fixed = { right: 1 };
        col.right = width;
        width += col.width;
      }
      if (columns2.length) columns2[0].fixed = { right: -1 };
    }
    return { columns: columns2, width };
  })();
  const centerColumns = (() => {
    const center = store_get($$store_subs ??= {}, "$_columns", _columns).slice(store_get($$store_subs ??= {}, "$split", split).left, store_get($$store_subs ??= {}, "$_columns", _columns).length - (store_get($$store_subs ??= {}, "$split", split).right ?? 0)).filter((c) => !c.hidden);
    center.forEach((a) => {
      a.fixed = 0;
    });
    return center;
  })();
  const EXTRACOLUMNS = 1;
  const renderColumns = (() => {
    let data3, header2, footer2;
    const left = scrollLeft;
    const right = scrollLeft + clientWidth;
    let start = 0;
    let end = 0;
    let sum = 0;
    let d = 0;
    centerColumns.forEach((col, index) => {
      if (left > sum) {
        start = index;
        d = sum;
      }
      sum = sum + col.width;
      if (right > sum) end = index + EXTRACOLUMNS;
    });
    const rightSpanDelta = { header: 0, footer: 0 };
    for (let i = end; i >= start; i--) {
      ["header", "footer"].forEach((key) => {
        if (centerColumns[i]) centerColumns[i][key].forEach((hCell) => {
          const colspan = hCell.colspan;
          if (colspan && colspan > 1) {
            const diff = colspan - (end - i + 1);
            if (diff > 0) {
              rightSpanDelta[key] = Math.max(rightSpanDelta[key], diff);
            }
          }
        });
      });
    }
    const headerPos = getHeaderPosition(start, d, "header");
    const footerPos = getHeaderPosition(start, d, "footer");
    const dh = headerPos.delta;
    const csH = headerPos.index;
    const df = footerPos.delta;
    const csF = footerPos.index;
    if (hasAny && fullWidth > clientWidth) {
      data3 = header2 = footer2 = [
        ...leftColumns.columns,
        ...centerColumns,
        ...rightColumns.columns
      ];
    } else {
      data3 = [
        ...leftColumns.columns,
        ...centerColumns.slice(start, end + 1),
        ...rightColumns.columns
      ];
      header2 = [
        ...leftColumns.columns,
        ...centerColumns.slice(csH, end + rightSpanDelta.header + 1),
        ...rightColumns.columns
      ];
      footer2 = [
        ...leftColumns.columns,
        ...centerColumns.slice(csF, end + rightSpanDelta.footer + 1),
        ...rightColumns.columns
      ];
    }
    return { data: data3, header: header2, footer: footer2, d, df, dh };
  })();
  const contentWidth = hasAny && fullWidth <= clientWidth ? clientWidth - (hasVScroll ? SCROLLSIZE : 0) : fullWidth;
  const headerHeight = header ? store_get($$store_subs ??= {}, "$_sizes", _sizes).headerHeight : 0;
  const footerHeight = footer ? store_get($$store_subs ??= {}, "$_sizes", _sizes).footerHeight : 0;
  const hasVScroll = clientWidth && clientHeight ? fullHeight + headerHeight + footerHeight >= clientHeight - (fullWidth >= clientWidth ? SCROLLSIZE : 0) : false;
  const hasHScroll = clientWidth && clientHeight ? fullWidth >= clientWidth : false;
  const globalWidth = hasAny && fullWidth <= clientWidth ? clientWidth : contentWidth < clientWidth ? fullWidth + (hasVScroll ? SCROLLSIZE : 0) : -1;
  const visibleRowsHeight = clientHeight - headerHeight - footerHeight - (hasHScroll ? SCROLLSIZE : 0);
  const visibleRows = Math.ceil(visibleRowsHeight / defaultRowHeight) + 1;
  const EXTRAROWS = 2;
  const renderRows = (() => {
    let start = 0, deltaTop = 0;
    if (autoRowHeight) {
      let st = scrollTop;
      while (st > 0) {
        st -= rowHeights[start] || defaultRowHeight;
        start++;
      }
      deltaTop = scrollTop - st;
      for (let i = Math.max(0, start - EXTRAROWS - 1); i < start; i++) deltaTop -= rowHeights[start - i] || defaultRowHeight;
      start = Math.max(0, start - EXTRAROWS);
    } else {
      start = Math.floor(scrollTop / defaultRowHeight);
      start = Math.max(0, start - EXTRAROWS);
      deltaTop = start * defaultRowHeight;
    }
    const end = Math.min(store_get($$store_subs ??= {}, "$dynamic", dynamic) ? store_get($$store_subs ??= {}, "$dynamic", dynamic).rowCount : store_get($$store_subs ??= {}, "$data", data2).length, start + visibleRows + EXTRAROWS);
    return { d: deltaTop, start, end };
  })();
  const dataRows = (() => {
    if (store_get($$store_subs ??= {}, "$dynamic", dynamic)) return store_get($$store_subs ??= {}, "$data", data2);
    else {
      return store_get($$store_subs ??= {}, "$data", data2).slice(renderRows.start, renderRows.end);
    }
  })();
  store_get($$store_subs ??= {}, "$selectedRows", selectedRows).filter((s) => dataRows.some((r) => r.id === s));
  let renderEnd = void 0;
  ({
    sense: autoRowHeight && dragNode ? dragNode.offsetHeight : Math.max(store_get($$store_subs ??= {}, "$_sizes", _sizes).rowHeight, 40)
  });
  function getHeaderPosition(start, deltaLeft, type) {
    let delta = deltaLeft;
    let index = start;
    if (centerColumns.length) {
      let spanStartInd = centerColumns.length;
      for (let i = start; i >= 0; i--) {
        const colHeader = centerColumns[i][type];
        colHeader.forEach((h) => {
          if (h.colspan > 1 && i > start - h.colspan && i < spanStartInd) {
            spanStartInd = i;
          }
        });
      }
      if (spanStartInd !== centerColumns.length && spanStartInd < start) {
        for (let i = spanStartInd; i < start; i++) {
          delta -= centerColumns[i].width;
        }
        index = spanStartInd;
      }
    }
    return { index, delta };
  }
  const style = globalWidth > 0 ? `width:${globalWidth}px;` : "";
  let rowHeights = [];
  let renderedHeight = 0;
  let focus = void 0;
  const each_array = ensure_array_like(dataRows);
  $$payload.out += `<div${attr_class(`wx-grid ${""}`, "svelte-d6gh8v")}${attr_style(`--header-height:${stringify(headerHeight)}px; --footer-height:${stringify(footerHeight)}px;--split-left-width:${stringify(leftColumns.width)}px; --split-right-width:${stringify(rightColumns.width)}px;`)}><div class="wx-table-box svelte-d6gh8v"${attr_style(style)}${attr("role", store_get($$store_subs ??= {}, "$tree", tree) ? "treegrid" : "grid")}${attr("aria-colcount", renderColumns.data.length)}${attr("aria-rowcount", dataRows.length)}${attr("aria-multiselectable", store_get($$store_subs ??= {}, "$tree", tree) && multiselect ? true : void 0)}><div class="wx-scroll svelte-d6gh8v"${attr_style(`overflow-x:${stringify(hasHScroll ? "scroll" : "hidden")};overflow-y:${stringify(hasVScroll ? "scroll" : "hidden")};`)}>`;
  if (header) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wx-header-wrapper svelte-d6gh8v">`;
    HeaderFooter$1($$payload, {
      contentWidth,
      deltaLeft: renderColumns.dh,
      columns: renderColumns.header,
      columnStyle,
      bodyHeight: visibleRowsHeight - +footer
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="wx-body svelte-d6gh8v"${attr_style(`width:${stringify(contentWidth)}px;height:${stringify(fullHeight)}px;`)}>`;
  if (overlay) {
    $$payload.out += "<!--[-->";
    Overlay($$payload, { overlay });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="wx-data svelte-d6gh8v"${attr_style(`padding-top:${stringify(renderRows.d)}px;padding-left:${stringify(renderColumns.d)}px;`)}><!--[-->`;
  for (let rIndex = 0, $$length = each_array.length; rIndex < $$length; rIndex++) {
    let row = each_array[rIndex];
    const each_array_1 = ensure_array_like(renderColumns.data);
    $$payload.out += `<div${attr_class("wx-row" + (rowStyle ? " " + rowStyle(row) : ""), "svelte-d6gh8v", {
      "wx-autoheight": autoRowHeight,
      "wx-selected": store_get($$store_subs ??= {}, "$selectedRows", selectedRows).indexOf(row.id) !== -1,
      "wx-inactive": dragItem === row.id
    })}${attr("data-id", row.id)}${attr("data-context-id", row.id)}${attr_style(`${autoRowHeight ? "min-height" : "height"}:${defaultRowHeight}px;`)} role="row"${attr("aria-rowindex", rIndex)}${attr("aria-expanded", row.open)}${attr("aria-level", store_get($$store_subs ??= {}, "$tree", tree) ? row.$level + 1 : void 0)}${attr("aria-selected", store_get($$store_subs ??= {}, "$tree", tree) ? store_get($$store_subs ??= {}, "$selectedRows", selectedRows).indexOf(row.id) !== -1 : void 0)} tabindex="-1"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let column = each_array_1[$$index];
      if (column.collapsed) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="wx-cell wx-collapsed svelte-d6gh8v"></div>`;
      } else if (store_get($$store_subs ??= {}, "$editor", editor)?.id === row.id && store_get($$store_subs ??= {}, "$editor", editor).column == column.id) {
        $$payload.out += "<!--[1-->";
        Editor($$payload, { row, column });
      } else {
        $$payload.out += "<!--[!-->";
        Cell($$payload, {
          row,
          column,
          columnStyle,
          cellStyle,
          reorder,
          focusable: focus?.row === row.id && focus?.column == column.id
        });
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> `;
  if (footer && store_get($$store_subs ??= {}, "$data", data2).length) {
    $$payload.out += "<!--[-->";
    HeaderFooter$1($$payload, {
      type: "footer",
      contentWidth,
      deltaLeft: renderColumns.df,
      columns: renderColumns.footer,
      columnStyle
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div> `;
  if (store_get($$store_subs ??= {}, "$_print", _print)) {
    $$payload.out += "<!--[-->";
    Print($$payload, {
      config: store_get($$store_subs ??= {}, "$_print", _print),
      rowStyle,
      columnStyle,
      cellStyle,
      header,
      footer,
      reorder
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Grid($$payload, $$props) {
  push();
  let {
    data: data2 = [],
    columns: columns2 = [],
    rowStyle = null,
    columnStyle = null,
    cellStyle = null,
    selectedRows = [],
    select = true,
    multiselect = false,
    header = true,
    footer = false,
    dynamic = null,
    overlay = null,
    reorder = false,
    onreorder = null,
    autoRowHeight = false,
    sizes = {},
    split = { left: 0 },
    tree = false,
    autoConfig = false,
    init = null,
    responsive = null,
    sortMarks = {},
    undo = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let clientWidth = 0;
  let clientHeight = 0;
  const dataStore = new ve(writable);
  let firstInRoute = dataStore.in;
  const dash = /-/g;
  let lastInRoute = new EventBusRouter((a, b2) => {
    const name = "on" + a.replace(dash, "");
    if (restProps[name]) {
      restProps[name](b2);
    }
  });
  firstInRoute.setNext(lastInRoute);
  const getState = dataStore.getState.bind(dataStore), getReactiveState = dataStore.getReactive.bind(dataStore), getStores = () => ({ data: dataStore }), exec = firstInRoute.exec, setNext = (ev) => lastInRoute = lastInRoute.setNext(ev), intercept = firstInRoute.intercept.bind(firstInRoute), on2 = firstInRoute.on.bind(firstInRoute), detach = firstInRoute.detach.bind(firstInRoute), getRow = (id) => dataStore.getRow(id), getColumn = (id) => dataStore.getColumn(id);
  const api = {
    exec,
    setNext,
    intercept,
    on: on2,
    detach,
    getRow,
    getColumn,
    getState,
    getReactiveState,
    getStores
  };
  setContext("grid-store", {
    getState: dataStore.getState.bind(dataStore),
    getReactiveState: dataStore.getReactive.bind(dataStore),
    exec: firstInRoute.exec.bind(firstInRoute),
    getRow: dataStore.getRow.bind(dataStore),
    getRowIndex: dataStore.getRowIndex.bind(dataStore)
  });
  const finalColumns = (() => {
    if (autoConfig && !columns2.length && data2.length) {
      const test = data2[0];
      const autoCols = [];
      for (let key in test) {
        if (key !== "id" && key[0] !== "$") {
          let col = {
            id: key,
            header: key[0].toUpperCase() + key.slice(1)
          };
          if (typeof autoConfig === "object") {
            col = { ...col, ...autoConfig };
          }
          autoCols.push(col);
        }
      }
      return autoCols;
    }
    return columns2;
  })();
  const finalSizes = sizes;
  const isReorderAvailable = (() => {
    let available = !tree;
    if (!A()) available = true;
    return available ? reorder : false;
  })();
  let _skin = getContext("wx-theme");
  let init_once = true;
  const reinitStore = () => {
    dataStore.init({
      data: data2,
      columns: finalColumns,
      split,
      sizes: finalSizes,
      selectedRows,
      dynamic,
      tree,
      sortMarks,
      select,
      undo,
      _skin
    });
    if (init_once && init) {
      init(api);
      init_once = false;
    }
  };
  reinitStore();
  Locale($$payload, {
    words: en,
    optional: true,
    children: ($$payload2) => {
      Layout($$payload2, {
        header,
        footer,
        overlay,
        rowStyle,
        columnStyle,
        cellStyle,
        reorder: isReorderAvailable,
        multiselect,
        autoRowHeight,
        clientWidth,
        clientHeight
      });
    }
  });
  bind_props($$props, {
    getState,
    getReactiveState,
    getStores,
    exec,
    setNext,
    intercept,
    on: on2,
    detach,
    getRow,
    getColumn
  });
  pop();
}
function Willow_1($$payload, $$props) {
  let { fonts = true, children } = $$props;
  if (children) {
    $$payload.out += "<!--[-->";
    Willow($$payload, {
      fonts,
      children: ($$payload2) => {
        children($$payload2);
        $$payload2.out += `<!---->`;
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
    Willow($$payload, { fonts });
  }
  $$payload.out += `<!--]-->`;
}
setEnv(env);
function ALETimelineRaceChart($$payload, $$props) {
  push();
  let {
    scenarios: scenarios2,
    title = "ALE Evolution Timeline",
    width = "w-full",
    height = "h-96",
    classesContainer = ""
  } = $$props;
  const chart_id = `ale_timeline_race_${Math.random().toString(36).substr(2, 9)}`;
  let currentFrameIndex = 0;
  const generateColors = (count) => {
    const colors = [
      "#3b82f6",
      // blue
      "#ef4444",
      // red
      "#10b981",
      // green
      "#f59e0b",
      // yellow
      "#8b5cf6",
      // purple
      "#06b6d4",
      // cyan
      "#f97316",
      // orange
      "#84cc16",
      // lime
      "#ec4899",
      // pink
      "#6366f1"
      // indigo
    ];
    while (colors.length < count) {
      const hue = colors.length * 137.508 % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors.slice(0, count);
  };
  const prepareTimelineData = () => {
    if (!scenarios2 || scenarios2.length === 0) {
      return [];
    }
    const allDates = /* @__PURE__ */ new Set();
    allDates.add("current");
    let hasAnyTreatmentControls = false;
    scenarios2.forEach((scenario2) => {
      if (scenario2.treatmentControls && scenario2.treatmentControls.length > 0) {
        hasAnyTreatmentControls = true;
        scenario2.treatmentControls.forEach((control) => {
          if (control.eta) {
            allDates.add(control.eta);
          }
        });
      }
    });
    const sortedDates = Array.from(allDates).sort((a, b2) => {
      if (a === "current") return -1;
      if (b2 === "current") return 1;
      return new Date(a).getTime() - new Date(b2).getTime();
    });
    sortedDates.push("residual");
    if (!hasAnyTreatmentControls && sortedDates.length === 2) {
      sortedDates.splice(-1, 0, "intermediate");
    }
    const frames = [];
    const colors = generateColors(scenarios2.length);
    sortedDates.forEach((date, frameIndex) => {
      const frameData = [];
      scenarios2.forEach((scenario2, scenarioIndex) => {
        let aleValue = scenario2.currentALE || 0;
        let status = "Current Risk";
        if (date === "residual") {
          aleValue = scenario2.residualALE || scenario2.currentALE || 0;
          status = "Residual Risk";
        } else if (date === "intermediate") {
          const currentALE = scenario2.currentALE || 0;
          const residualALE = scenario2.residualALE || currentALE;
          aleValue = currentALE - (currentALE - residualALE) * 0.5;
          status = "Treatments in Progress";
        } else if (date !== "current") {
          const implementedTreatments = scenario2.treatmentControls?.filter((control) => control.eta && new Date(control.eta) <= new Date(date)) || [];
          if (implementedTreatments.length > 0) {
            const totalTreatments = scenario2.treatmentControls?.length || 1;
            const implementedRatio = implementedTreatments.length / totalTreatments;
            const currentALE = scenario2.currentALE || 0;
            const residualALE = scenario2.residualALE || currentALE;
            aleValue = currentALE - (currentALE - residualALE) * implementedRatio;
            status = `${implementedTreatments.length}/${totalTreatments} treatments implemented`;
          }
        }
        frameData.push({
          name: scenario2.name,
          value: aleValue,
          status,
          scenarioId: scenario2.id,
          color: colors[scenarioIndex]
        });
      });
      frameData.sort((a, b2) => b2.value - a.value);
      frames.push({
        date,
        dateDisplay: date === "current" ? "Current State" : date === "residual" ? "All Treatments Implemented" : date === "intermediate" ? "Treatments in Progress" : new Date(date).toLocaleDateString(),
        data: frameData
      });
    });
    return frames;
  };
  let timelineData = prepareTimelineData();
  $$payload.out += `<div${attr_class(`${stringify(classesContainer)} ${stringify(width)} ${stringify(height)}`)}><div class="bg-white rounded-lg shadow-sm overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-900">${escape_html(title)}</h3> `;
  if (timelineData.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex items-center space-x-3"><div class="flex items-center space-x-2">`;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="btn btn-sm variant-filled-primary" title="Play Animation"><i class="fa-solid fa-play text-sm"></i></button>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex items-center space-x-2"><button class="btn btn-sm variant-ghost-surface"${attr("disabled", currentFrameIndex === 0, true)} title="Previous Frame"><i class="fa-solid fa-step-backward text-sm"></i></button> <span class="text-sm text-gray-600 px-2">${escape_html(currentFrameIndex + 1)} / ${escape_html(timelineData.length)}</span> <button class="btn btn-sm variant-ghost-surface"${attr("disabled", currentFrameIndex === timelineData.length - 1, true)} title="Next Frame"><i class="fa-solid fa-step-forward text-sm"></i></button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="p-4"><div${attr("id", chart_id)} class="w-full h-full min-h-[400px]"></div></div> `;
  if (timelineData.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="px-6 py-3 border-t border-gray-200 bg-gray-50"><div class="w-full"><input type="range" min="0"${attr("max", timelineData.length - 1)}${attr("value", currentFrameIndex)} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer svelte-1y1876m"${attr_style(`background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${stringify(currentFrameIndex / (timelineData.length - 1) * 100)}%, #e5e7eb ${stringify(currentFrameIndex / (timelineData.length - 1) * 100)}%, #e5e7eb 100%)`)}/> <div class="flex justify-between text-xs text-gray-500 mt-1"><span>Current State</span> <span>All Treatments</span></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (!scenarios2 || scenarios2.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="p-8 text-center"><div class="flex flex-col items-center space-y-3"><i class="fa-solid fa-chart-bar text-3xl text-gray-400"></i> <h4 class="text-lg font-medium text-gray-600">No Data Available</h4> <p class="text-gray-500 max-w-md">No scenarios with ALE data found. Please ensure scenarios have simulation data and
						treatment plans with ETA dates.</p></div></div>`;
  } else if (timelineData.length === 0) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="p-8 text-center bg-yellow-50 border border-yellow-200"><div class="flex flex-col items-center space-y-3"><i class="fa-solid fa-exclamation-triangle text-3xl text-yellow-600"></i> <h4 class="text-lg font-medium text-yellow-700">Chart Data Processing Issue</h4> <div class="text-left text-sm text-yellow-700 bg-yellow-100 p-4 rounded max-w-2xl"><p><strong>Scenarios received:</strong> ${escape_html(scenarios2?.length || 0)}</p> <p><strong>Timeline data processed:</strong> ${escape_html(timelineData?.length || 0)}</p> <details class="mt-2"><summary class="cursor-pointer font-medium">View scenario data</summary> <pre class="mt-2 text-xs overflow-auto">${escape_html(JSON.stringify(scenarios2, null, 2))}</pre></details></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data: data2 } = $$props;
  let columnVisibility = {
    scenario: true,
    level: true,
    ale: true,
    var_95: true,
    var_99: true,
    var_999: true,
    probability: true
  };
  function formatCurrency(value, currency) {
    if (value === null || value === void 0) return "N/A";
    const absValue = Math.abs(value);
    if (absValue >= 1e9) {
      const billions = value / 1e9;
      return `${currency}${billions.toFixed(billions >= 10 ? 1 : 2)}B`;
    } else if (absValue >= 1e6) {
      const millions = value / 1e6;
      return `${currency}${millions.toFixed(millions >= 10 ? 1 : 2)}M`;
    } else if (absValue >= 1e4) {
      const thousands = value / 1e3;
      return `${currency}${Math.round(thousands)}K`;
    } else if (absValue >= 1e3) {
      const thousands = value / 1e3;
      return `${currency}${thousands.toFixed(1)}K`;
    } else if (absValue >= 100) {
      return `${currency}${Math.round(value)}`;
    } else {
      return `${currency}${value.toFixed(value >= 10 ? 1 : 2)}`;
    }
  }
  function formatProbability(value) {
    if (value === null || value === void 0) return "N/A";
    const percentage = value * 100;
    if (percentage >= 10) {
      return `${percentage.toFixed(1)}%`;
    } else if (percentage >= 1) {
      return `${percentage.toFixed(2)}%`;
    } else if (percentage >= 0.1) {
      return `${percentage.toFixed(3)}%`;
    } else if (percentage > 0) {
      return percentage < 1e-3 ? `${percentage.toExponential(2)}%` : `${percentage.toFixed(4)}%`;
    } else {
      return "0%";
    }
  }
  function prepareGridData(keyMetricsData) {
    if (!keyMetricsData?.scenarios) return [];
    const gridData = [];
    keyMetricsData.scenarios.forEach((scenario2, index) => {
      if (scenario2.current_level) {
        gridData.push({
          id: `${scenario2.id}-current`,
          scenario: scenario2.name,
          level: "Current",
          ale: scenario2.current_level.ale,
          var_95: scenario2.current_level.var_95,
          var_99: scenario2.current_level.var_99,
          var_999: scenario2.current_level.var_999,
          probability: scenario2.current_level.proba_of_exceeding_threshold,
          scenario_id: scenario2.id,
          level_type: "current"
        });
      }
      if (scenario2.residual_level) {
        gridData.push({
          id: `${scenario2.id}-residual`,
          scenario: scenario2.name,
          level: "Residual",
          ale: scenario2.residual_level.ale,
          var_95: scenario2.residual_level.var_95,
          var_99: scenario2.residual_level.var_99,
          var_999: scenario2.residual_level.var_999,
          probability: scenario2.residual_level.proba_of_exceeding_threshold,
          scenario_id: scenario2.id,
          level_type: "residual"
        });
      }
    });
    return gridData;
  }
  function prepareTimelineChartData(keyMetricsData) {
    if (!keyMetricsData?.scenarios) return [];
    return keyMetricsData.scenarios.filter((scenario2) => {
      const hasCurrentALE = scenario2.current_level && scenario2.current_level.ale !== null && scenario2.current_level.ale !== void 0;
      scenario2.residual_level && scenario2.residual_level.ale !== null && scenario2.residual_level.ale !== void 0;
      return hasCurrentALE;
    }).map((scenario2) => ({
      id: scenario2.id,
      name: scenario2.name,
      currentALE: scenario2.current_level?.ale || 0,
      residualALE: scenario2.residual_level?.ale || scenario2.current_level?.ale || 0,
      treatmentControls: scenario2.treatment_controls || []
    }));
  }
  const getAllColumns = (currency = "€") => [
    {
      id: "scenario",
      header: {
        text: scenario(),
        filter: {
          type: "text",
          config: { placeholder: filterbyscenarioname3() }
        }
      },
      flexgrow: 2,
      sort: true,
      displayName: scenario()
    },
    {
      id: "level",
      header: {
        text: level(),
        filter: {
          type: "richselect",
          config: {
            placeholder: "Filter by level...",
            options: [
              { id: "", label: alllevels1() },
              { id: "Current", label: current() },
              { id: "Residual", label: residual() }
            ]
          }
        }
      },
      flexgrow: 1,
      sort: true,
      displayName: level()
    },
    {
      id: "ale",
      header: { text: ale() },
      flexgrow: 1,
      sort: true,
      template: (value, row, col) => formatCurrency(value, currency),
      displayName: ale()
    },
    {
      id: "var_95",
      header: { text: var95() },
      flexgrow: 1,
      sort: true,
      template: (value, row, col) => formatCurrency(value, currency),
      displayName: var95()
    },
    {
      id: "var_99",
      header: { text: var99() },
      flexgrow: 1,
      sort: true,
      template: (value, row, col) => formatCurrency(value, currency),
      displayName: var99()
    },
    {
      id: "var_999",
      header: { text: var999() },
      flexgrow: 1,
      sort: true,
      template: (value, row, col) => formatCurrency(value, currency),
      displayName: var999()
    },
    {
      id: "probability",
      header: { text: pthreshold1() },
      flexgrow: 1,
      sort: true,
      template: (value, row, col) => formatProbability(value),
      displayName: pthreshold1()
    }
  ];
  const allColumns = (() => getAllColumns("€"))();
  const visibleColumns = allColumns.filter((column) => columnVisibility[column.id]);
  function getVisibleColumnsCount() {
    return Object.values(columnVisibility).filter(Boolean).length;
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(keymetrics1())} - ${escape_html(quantitativeriskstudylabel3())}</title>`;
  });
  $$payload.out += `<div class="container mx-auto px-4 py-8"><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-gray-900">${escape_html(keymetrics1())}</h1> <p class="text-gray-600 mt-2">${escape_html(advancedanalysismetrics2())}</p></div> <button class="btn variant-ghost-surface"><i class="fa-solid fa-arrow-left mr-2"></i> ${escape_html(backtostudy2())}</button></div> `;
  await_block(
    $$payload,
    data2.stream.keyMetrics,
    () => {
      $$payload.out += `<div class="flex justify-center items-center h-64"><div class="flex flex-col items-center space-y-4"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div> <p class="text-gray-600">${escape_html(loadingkeymetrics2())}</p></div></div>`;
    },
    (keyMetricsData) => {
      if (keyMetricsData && keyMetricsData.scenarios) {
        $$payload.out += "<!--[-->";
        const timelineChartData = prepareTimelineChartData(keyMetricsData);
        $$payload.out += `<div class="bg-white rounded-lg p-6 shadow-sm mb-8"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-semibold text-gray-900">${escape_html(studyoverview1())}</h2> <div class="text-sm text-gray-600">${escape_html(keyMetricsData.currency)} • ${escape_html(keyMetricsData.total_scenarios)}
						${escape_html(scenarios())}</div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-blue-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-blue-600">${escape_html(keyMetricsData.scenarios_with_current_data)}</div> <div class="text-sm text-gray-600">${escape_html(scenarioswithcurrentdata3())}</div></div> <div class="bg-green-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-green-600">${escape_html(keyMetricsData.scenarios_with_residual_data)}</div> <div class="text-sm text-gray-600">${escape_html(scenarioswithresidualdata3())}</div></div> <div class="bg-purple-50 rounded-lg p-4 text-center"><div class="text-2xl font-bold text-purple-600">${escape_html(keyMetricsData.loss_threshold_display)}</div> <div class="text-sm text-gray-600">${escape_html(lossthresholdlabel2())}</div></div></div></div>  `;
        if (timelineChartData.length > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="mb-8">`;
          ALETimelineRaceChart($$payload, {
            scenarios: timelineChartData,
            currency: keyMetricsData.currency,
            title: aleevolutiontimeline2(),
            height: "h-auto"
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div class="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4"><h3 class="text-lg font-semibold text-yellow-800 mb-2"><i class="fa-solid fa-info-circle mr-2"></i> ALE Timeline Chart Debug Info</h3> <div class="text-sm text-yellow-700 space-y-1"><p><strong>Total ${escape_html(scenarios())}:</strong> ${escape_html(keyMetricsData?.scenarios?.length || 0)}</p> <p><strong>${escape_html(scenarioswithcurrentlevel3())}</strong> ${escape_html(keyMetricsData?.scenarios?.filter((s) => s.current_level)?.length || 0)}</p> <p><strong>${escape_html(scenarioswithresiduallevel3())}</strong> ${escape_html(keyMetricsData?.scenarios?.filter((s) => s.residual_level)?.length || 0)}</p> <p><strong>${escape_html(scenarioswithbothlevels3())}</strong> ${escape_html(keyMetricsData?.scenarios?.filter((s) => s.current_level && s.residual_level)?.length || 0)}</p> <p><strong>${escape_html(scenarioswithtreatmentcontrols3())}</strong> ${escape_html(keyMetricsData?.scenarios?.filter((s) => s.treatment_controls && s.treatment_controls.length > 0)?.length || 0)}</p> <details class="mt-2"><summary class="cursor-pointer font-medium">View raw scenario data</summary> <pre class="mt-2 p-2 bg-yellow-100 rounded text-xs overflow-auto">${escape_html(JSON.stringify(keyMetricsData?.scenarios, null, 2))}</pre></details></div></div>`;
        }
        $$payload.out += `<!--]--> <div class="bg-white rounded-lg shadow-sm overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><div class="flex justify-between items-start"><div><h2 class="text-xl font-semibold text-gray-900">${escape_html(riskscenariosanalysis2())}</h2> <p class="text-sm text-gray-600 mt-1">${escape_html(detailedmetricsforeachrisk4())}</p></div> <div class="flex items-center space-x-2"><span class="text-sm text-gray-500">${escape_html(getVisibleColumnsCount())}
								${escape_html(columnsofcolumns2())}
								${escape_html(allColumns.length)}
								${escape_html(columns())}</span> <div class="relative"><button class="btn btn-sm variant-ghost-surface column-controls-button" title="Show/Hide Columns"><i class="fa-solid fa-columns text-sm mr-1"></i> ${escape_html(columns())}</button> `;
        {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div></div></div></div> <div class="p-4"><div style="height: 500px; width: 100%;">`;
        Willow_1($$payload, {
          children: ($$payload2) => {
            Grid($$payload2, {
              data: prepareGridData(keyMetricsData),
              columns: visibleColumns,
              headerHeight: 40,
              rowHeight: 45
            });
          }
        });
        $$payload.out += `<!----></div></div></div> <div class="mt-8 bg-gray-50 rounded-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${escape_html(legendnotes1())}</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h4 class="font-medium text-gray-900 mb-2">${escape_html(metricsdefinitions1())}</h4> <ul class="text-sm text-gray-600 space-y-1"><li><strong>${escape_html(ale())}:</strong> ${escape_html(annuallossexpectancy2())}</li> <li><strong>VaR:</strong> ${escape_html(valueatrisk2())}</li> <li><strong>P(>Threshold):</strong> ${escape_html(probabilityexceedingthreshold2())}</li></ul></div> <div><h4 class="font-medium text-gray-900 mb-2">${escape_html(risklevels1())}</h4> <ul class="text-sm text-gray-600 space-y-1"><li><strong>${escape_html(current())}:</strong> ${escape_html(currentriskwithexistingcontrols4())}</li> <li><strong>${escape_html(residual())}:</strong> ${escape_html(residualriskaftertreatment3())}</li></ul></div></div></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div class="bg-white rounded-lg p-8 shadow-sm text-center"><div class="flex flex-col items-center space-y-4"><i class="fa-solid fa-chart-simple text-4xl text-gray-400"></i> <h3 class="text-lg font-semibold text-gray-600">${escape_html(nokeymetricsavailable3())}</h3> <p class="text-gray-500 max-w-md">${escape_html(nosimulationdatafound3())}</p></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    }
  );
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CW0WhP4t.js.map
