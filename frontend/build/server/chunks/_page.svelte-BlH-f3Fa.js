import { p as push, V as escape_html, W as ensure_array_like, S as attr_class, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';
import { s as safeTranslate } from './i18n-CxHbQmwN.js';
import { FJ as legislativeupdatesauthrequired3, TN as backtolegislativeupdates3, rN as signintogrcadmin4, Ji as failedtoloadlegislativeupdates4, FL as legislativeupdatenotfound3, ov as updatesummary1, Hz as impactanalysis1, bI as tasks, wX as publishedon1, mG as vieworiginalsource2, Xp as aisummary1, F_ as keychanges1, CM as nokeychangesavailable3 } from './_index-DiaVtc2Z.js';
import './runtime-BKo9q3Zd.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const item = data.item ?? null;
  const pipeline = item?.pipeline ?? null;
  let activeTab = "summary";
  function statusText(it) {
    const status = it.status ?? "";
    if (!status) return it.status_label ?? "";
    const key = `status${status.split("_").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("")}`;
    const t = safeTranslate(key);
    return t && t !== key ? t : it.status_label || status;
  }
  function impactText(it) {
    const level = it.impact_level ?? "";
    if (!level) return it.impact_label ?? "";
    const key = `impact${level.charAt(0).toUpperCase() + level.slice(1)}`;
    const t = safeTranslate(key);
    return t && t !== key ? t : it.impact_label || level;
  }
  function statusClasses(status) {
    switch (status) {
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
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
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
      case "critical":
        return "bg-red-600";
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
  const impactsByPolicy = pipeline?.impacts_by_policy ?? [];
  const keyChanges = pipeline?.key_changes ?? [];
  const keyChangePoints = (() => {
    if (keyChanges.length) {
      return keyChanges.map((kc) => ({ id: kc.id, text: kc.point }));
    }
    const legacy = item?.metadata?.key_changes;
    if (Array.isArray(legacy)) {
      return legacy.filter((s) => typeof s === "string" && !!s).map((text) => ({ text }));
    }
    return [];
  })();
  const derivedTasks = (() => {
    const out = [];
    for (const policy of impactsByPolicy) {
      for (const pt of policy.matched_points ?? []) {
        if (!pt.requires_amendment) continue;
        const amendments = pt.amendments ?? [];
        if (amendments.length === 0) {
          out.push({
            key: `${policy.policy_id}::${pt.point_id}::summary`,
            title: pt.impact_summary,
            policyTitle: policy.policy_title,
            severity: pt.severity
          });
          continue;
        }
        amendments.forEach((am, i) => {
          out.push({
            key: `${policy.policy_id}::${pt.point_id}::${i}`,
            title: am.required_change,
            policyTitle: policy.policy_title,
            severity: pt.severity,
            changeType: am.change_type,
            policySection: am.policy_section
          });
        });
      }
    }
    return out;
  })();
  (() => {
    const c = (typeof item?.metadata?.f1_confidence === "number" ? item.metadata.f1_confidence : void 0) ?? pipeline?.f1_relevance?.confidence;
    return typeof c === "number" ? Math.round(c * 100) : null;
  })();
  (() => {
    const m1 = item?.metadata?.policy_count_indexed;
    if (typeof m1 === "number") return m1;
    const m2 = pipeline?.policy_count_indexed;
    return typeof m2 === "number" ? m2 : null;
  })();
  item?.analyzed_policies_count ?? 0;
  if (!item) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="wgrc-card text-center py-14">`;
    if (data.upstreamUnauthorized) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<i class="fa-solid fa-lock text-3xl text-amber-400 mb-3"></i> <p class="text-sm text-gray-600 mb-4">${escape_html(legislativeupdatesauthrequired3())}</p> <div class="flex items-center justify-center gap-3"><a href="/legislative-updates" class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-secondary"><i class="fa-solid fa-arrow-left rtl:rotate-180"></i> ${escape_html(backtolegislativeupdates3())}</a> <a href="https://grc-admin.wathbah.dev/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"><i class="fa-solid fa-arrow-up-right-from-square text-xs"></i> ${escape_html(signintogrcadmin4())}</a></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<i class="fa-solid fa-triangle-exclamation text-3xl text-amber-400 mb-3"></i> <p class="text-sm text-gray-600 mb-4">${escape_html(data.upstreamError ? failedtoloadlegislativeupdates4() : legislativeupdatenotfound3())}</p> <a href="/legislative-updates" class="inline-flex items-center gap-2 px-4 py-2 text-sm wgrc-btn-primary"><i class="fa-solid fa-arrow-left rtl:rotate-180"></i> ${escape_html(backtolegislativeupdates3())}</a>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like([
      {
        key: "summary",
        label: updatesummary1(),
        icon: "fa-file-lines",
        count: null
      },
      {
        key: "impact",
        label: impactanalysis1(),
        icon: "fa-chart-line",
        count: impactsByPolicy.length || null
      },
      {
        key: "tasks",
        label: tasks(),
        icon: "fa-list-check",
        count: derivedTasks.length || null
      }
    ]);
    $$payload.out += `<a href="/legislative-updates" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-4 group"><i class="fa-solid fa-arrow-left text-xs rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"></i> ${escape_html(backtolegislativeupdates3())}</a> <section class="wgrc-card !p-6 mb-4"><div class="flex flex-wrap items-center gap-2 mb-3">`;
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
    $$payload.out += `<!--]--></div> <h2 class="text-2xl font-bold text-gray-900 leading-snug mb-3">${escape_html(item.title || item.id)}</h2> <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">`;
    if (item.published_at) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="inline-flex items-center gap-1.5"><i class="fa-regular fa-calendar"></i> ${escape_html(publishedon1())}: ${escape_html(formatDate(item.published_at, item.language))}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (item.external_url) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", item.external_url)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${escape_html(vieworiginalsource2())}</a>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></section> <div class="wgrc-card !p-0 mb-4 overflow-hidden"><div class="flex border-b border-gray-100 px-2" role="tablist"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$payload.out += `<button type="button" role="tab"${attr("aria-selected", activeTab === tab.key)}${attr_class(`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors inline-flex items-center gap-2 ${stringify(activeTab === tab.key ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200")}`)}><i${attr_class(`fa-solid ${stringify(tab.icon)} text-xs`)}></i> ${escape_html(tab.label)} `;
      if (tab.count) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class(`ml-1 rtl:ml-0 rtl:mr-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-semibold ${stringify(activeTab === tab.key ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}`)}>${escape_html(tab.count)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></button>`;
    }
    $$payload.out += `<!--]--></div></div> `;
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<section class="wgrc-card !p-6 mb-4"><div class="flex items-center gap-2 mb-3"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600"><i class="fa-solid fa-wand-magic-sparkles text-xs"></i></span> <h3 class="text-sm font-semibold text-blue-700">${escape_html(aisummary1())}</h3></div> `;
      if (item.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">${escape_html(item.description)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<p class="text-sm text-gray-400 italic">—</p>`;
      }
      $$payload.out += `<!--]--></section> <section class="wgrc-card !p-6 mb-4"><div class="flex items-center justify-between gap-3 mb-4"><div class="flex items-center gap-2"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50 text-amber-600"><i class="fa-solid fa-list-ul text-xs"></i></span> <h3 class="text-sm font-semibold text-amber-700">${escape_html(keychanges1())}</h3></div> `;
      if (keyChangePoints.length) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">${escape_html(keyChangePoints.length)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (keyChangePoints.length) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(keyChangePoints);
        $$payload.out += `<ul class="space-y-2.5"><!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let kc = each_array_1[$$index_1];
          $$payload.out += `<li class="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span> <span class="flex-1">${escape_html(kc.text)}</span></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<p class="text-sm text-gray-400 italic">${escape_html(nokeychangesavailable3())}</p>`;
      }
      $$payload.out += `<!--]--></section> `;
      if (item.external_url) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<section class="wgrc-card !p-5 mb-4"><div class="flex items-center gap-2 mb-2"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-600"><i class="fa-solid fa-file-pdf text-xs"></i></span> <h3 class="text-sm font-semibold text-gray-700">${escape_html(vieworiginalsource2())}</h3></div> <a${attr("href", item.external_url)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> ${escape_html(item.external_url)}</a></section>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BlH-f3Fa.js.map
