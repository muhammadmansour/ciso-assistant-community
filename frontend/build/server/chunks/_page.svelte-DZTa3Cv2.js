import { p as push, W as ensure_array_like, V as escape_html, T as attr, ab as maybe_selected, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-Y-FXalQc.js';
import { FV as legislativeupdatesdescription2, IC as fromdate1, pA as todate1, cF as status, Xp as allstatuses1, fw as impact, Xu as allimpactlevels2, rq as source, Xq as allsources1, Ri as clearfilters1, Jh as filter, FW as legislativeupdatesauthrequired3, rO as signintogrcadmin4, Jv as failedtoloadlegislativeupdates4, CV as nolegislativeupdates2, mH as vieworiginalsource2, np as viewdetails1, XJ as affectspoliciesnone2, XI as affectspoliciesone2, XH as affectspoliciesother2 } from './_index-BQcvYRD4.js';
import { W as WATHBAH_ADMIN_CONSOLE_URL } from './constants-12fjCMiL.js';
import './runtime-BKo9q3Zd.js';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const items = data.items ?? [];
  let fromDate = "";
  let toDate = "";
  let statusFilter = "all";
  let impactFilter = "all";
  let sourceFilter = "all";
  const allSources = Array.from(new Set(items.map((i) => i.source).filter((s) => !!s)));
  const allStatuses = Array.from(new Set(items.map((i) => i.status).filter((s) => !!s)));
  const allImpacts = Array.from(new Set(items.map((i) => i.impact_level).filter((s) => !!s)));
  const filtered = items.filter((item) => {
    if (item.published_at) ;
    return true;
  });
  function statusText(item) {
    const status2 = item.status ?? "";
    if (!status2) return item.status_label ?? "";
    const key = `status${status2.split("_").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("")}`;
    const translated = safeTranslate(key);
    return translated && translated !== key ? translated : item.status_label || status2;
  }
  function impactText(item) {
    const level = item.impact_level ?? "";
    if (!level) return item.impact_label ?? "";
    const key = `impact${level.charAt(0).toUpperCase() + level.slice(1)}`;
    const translated = safeTranslate(key);
    return translated && translated !== key ? translated : item.impact_label || level;
  }
  function statusClasses(status2) {
    switch (status2) {
      case "new":
        return "bg-emerald-100 text-emerald-700";
      case "under_analysis":
        return "bg-orange-100 text-orange-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  function impactClasses(level) {
    switch (level) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }
  function impactDotClass(level) {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  }
  function formatDate(iso, lang) {
    if (!iso) return "";
    try {
      const locale = lang === "ar" ? "ar-EG" : "en-US";
      return new Date(iso).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return iso;
    }
  }
  function affectedPoliciesLabel(n) {
    if (typeof n !== "number" || n <= 0) return affectspoliciesnone2();
    if (n === 1) return affectspoliciesone2();
    return affectspoliciesother2({ count: n });
  }
  const each_array = ensure_array_like(allStatuses);
  const each_array_1 = ensure_array_like(allImpacts);
  const each_array_2 = ensure_array_like(allSources);
  $$payload.out += `<div class="mb-4"><p class="text-sm text-gray-500 max-w-3xl">${escape_html(legislativeupdatesdescription2())}</p></div> <div class="wgrc-card mb-4 !p-4"><div class="flex flex-wrap items-end gap-3"><div class="flex flex-col"><label for="from-date" class="text-xs text-gray-500 mb-1">${escape_html(fromdate1())}</label> <input id="from-date" type="date"${attr("value", fromDate)} class="wgrc-input !py-1.5 !px-2 text-sm w-40"/></div> <div class="flex flex-col"><label for="to-date" class="text-xs text-gray-500 mb-1">${escape_html(todate1())}</label> <input id="to-date" type="date"${attr("value", toDate)} class="wgrc-input !py-1.5 !px-2 text-sm w-40"/></div> <div class="flex flex-col"><label for="status-filter" class="text-xs text-gray-500 mb-1">${escape_html(status())}</label> <select id="status-filter" class="wgrc-input !py-1.5 !px-2 text-sm w-44">`;
  $$payload.select_value = statusFilter;
  $$payload.out += `<option value="all"${maybe_selected($$payload, "all")}>${escape_html(allstatuses1())}</option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let st = each_array[$$index];
    $$payload.out += `<option${attr("value", st)}${maybe_selected($$payload, st)}>${escape_html(statusText({ status: st, status_label: st }))}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select></div> <div class="flex flex-col"><label for="impact-filter" class="text-xs text-gray-500 mb-1">${escape_html(impact())}</label> <select id="impact-filter" class="wgrc-input !py-1.5 !px-2 text-sm w-44">`;
  $$payload.select_value = impactFilter;
  $$payload.out += `<option value="all"${maybe_selected($$payload, "all")}>${escape_html(allimpactlevels2())}</option><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let lvl = each_array_1[$$index_1];
    $$payload.out += `<option${attr("value", lvl)}${maybe_selected($$payload, lvl)}>${escape_html(impactText({ impact_level: lvl, impact_label: lvl }))}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select></div> <div class="flex flex-col"><label for="source-filter" class="text-xs text-gray-500 mb-1">${escape_html(source())}</label> <select id="source-filter" class="wgrc-input !py-1.5 !px-2 text-sm w-52">`;
  $$payload.select_value = sourceFilter;
  $$payload.out += `<option value="all"${maybe_selected($$payload, "all")}>${escape_html(allsources1())}</option><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let src = each_array_2[$$index_2];
    $$payload.out += `<option${attr("value", src)}${maybe_selected($$payload, src)}>${escape_html(src)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select></div> <div class="flex items-center gap-2 ml-auto"><button type="button" class="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"><i class="fa-solid fa-rotate-left text-xs"></i> ${escape_html(clearfilters1())}</button> <button type="button" class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"><i class="fa-solid fa-filter text-xs"></i> ${escape_html(filter())}</button></div></div></div> `;
  if (data.upstreamUnauthorized) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wgrc-card !p-4 mb-4 border-amber-200 bg-amber-50/40"><div class="flex items-start gap-3"><i class="fa-solid fa-lock text-amber-500 mt-0.5"></i> <div class="flex-1"><p class="text-sm font-medium text-amber-800">${escape_html(legislativeupdatesauthrequired3())}</p> <p class="text-xs text-amber-700/80 mt-1 font-mono break-all">${escape_html(data.upstreamUrl)}</p></div> <a${attr("href", WATHBAH_ADMIN_CONSOLE_URL)} target="_blank" rel="noopener noreferrer" class="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${escape_html(signintogrcadmin4())}</a></div></div>`;
  } else if (data.upstreamError) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="wgrc-card !p-4 mb-4 border-red-200 bg-red-50/40"><div class="flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation text-red-500 mt-0.5"></i> <div><p class="text-sm font-medium text-red-700">${escape_html(failedtoloadlegislativeupdates4())}</p> <p class="text-xs text-red-500/80 mt-1 font-mono break-all">${escape_html(data.upstreamUrl)}</p></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (filtered.length === 0 && !data.upstreamError && !data.upstreamUnauthorized) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wgrc-card text-center py-14"><i class="fa-solid fa-inbox text-3xl text-gray-300 mb-3"></i> <p class="text-sm text-gray-500">${escape_html(nolegislativeupdates2())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_3 = ensure_array_like(filtered);
    $$payload.out += `<div class="space-y-4"><!--[-->`;
    for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
      let item = each_array_3[$$index_4];
      $$payload.out += `<a${attr("href", `/legislative-updates/${encodeURIComponent(item.id)}`)} class="wgrc-card block !p-6 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"${attr("aria-label", item.title)}><div class="flex items-start justify-between gap-4"><div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2 mb-2">`;
      if (item.source) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="wgrc-badge bg-red-100 text-red-700">${escape_html(item.source)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (item.impact_level) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class(`wgrc-badge border ${stringify(impactClasses(item.impact_level))} inline-flex items-center gap-1.5`)}><span${attr_class(`w-2 h-2 rounded-full ${stringify(impactDotClass(item.impact_level))}`)}></span> ${escape_html(impactText(item))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (item.status) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class(`wgrc-badge ${stringify(statusClasses(item.status))}`)}>${escape_html(statusText(item))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <h3 class="text-lg font-semibold text-gray-900 mb-1.5 leading-snug group-hover:text-blue-700 transition-colors"${attr("title", item.title ?? item.id)}>${escape_html(item.title || item.id)}</h3> `;
      if (item.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-sm text-gray-600 leading-relaxed line-clamp-2">${escape_html(item.description)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div> `;
      if (item.tags?.length) {
        $$payload.out += "<!--[-->";
        const each_array_4 = ensure_array_like(item.tags);
        $$payload.out += `<div class="mt-4 flex flex-wrap gap-1.5"><!--[-->`;
        for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
          let tag = each_array_4[$$index_3];
          $$payload.out += `<span class="inline-block px-2 py-0.5 rounded-md bg-gray-50 text-xs text-gray-500 border border-gray-100">#${escape_html(tag)}</span>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <div class="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500"><div class="flex flex-wrap items-center gap-x-5 gap-y-2">`;
      if (item.published_at) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="inline-flex items-center gap-1.5"><i class="fa-regular fa-calendar"></i> ${escape_html(formatDate(item.published_at, item.language))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (item.source) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-folder-open"></i> ${escape_html(source())}: ${escape_html(item.source)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <span class="inline-flex items-center gap-1.5"><i class="fa-solid fa-file-shield"></i> ${escape_html(affectedPoliciesLabel(item.affected_policies_count))}</span></div> <div class="flex items-center gap-4">`;
      if (item.external_url) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a${attr("href", item.external_url)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${escape_html(vieworiginalsource2())}</a>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <span class="inline-flex items-center gap-1.5 font-medium text-blue-600 group-hover:text-blue-800 group-hover:underline">${escape_html(viewdetails1())} <i class="fa-solid fa-arrow-right text-[10px] rtl:rotate-180"></i></span></div></div></a>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DZTa3Cv2.js.map
