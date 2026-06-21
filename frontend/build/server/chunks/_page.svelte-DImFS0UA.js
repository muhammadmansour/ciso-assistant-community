import { p as push, V as escape_html, W as ensure_array_like, T as attr, X as stringify, S as attr_class, Z as attr_style, U as clsx, a as pop } from './index2-9icAqEyj.js';
import { A as Anchor } from './Anchor-vk0sCVou.js';
import { FS as latestupdates1, nU as viewallupdates2, Wj as assessmentsingular1, Wk as assessmentplural1, U6 as auditindays2, u0 as riskmap1, GD as internal, Jx as external, gM as low, E0 as medium, HQ as high, Cr as noriskscenarios2, Hs as impactiso3, gB as likelihood, HO as highestresidualriskbycategory4, Cz as noqualificationsyet2, A4 as policyviolationsbypolicy3, A3 as policyviolationscomingsoon3, pM as thirdpartyassessmentresults3, CX as noentityassessments2, Qz as compliancetrend6months2, TX as averagecompliance1, _2 as activeexceptionscount2, oM as trendnodataautocollect4, Qy as compliancetrendchartaria3 } from './_index-DiaVtc2Z.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import './breadcrumbs-BKQh9F1q.js';
import './index-CRjgakYW.js';
import './client2-CItqzqlw.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  function impactBadgeClass(level) {
    switch (level) {
      case "high":
        return "bg-red-50 text-red-800 ring-red-200/60";
      case "medium":
        return "bg-amber-50 text-amber-800 ring-amber-200/60";
      case "low":
        return "bg-emerald-50 text-emerald-800 ring-emerald-200/60";
      default:
        return "bg-slate-50 text-slate-600 ring-slate-200/60";
    }
  }
  function impactDotClass(level) {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-gray-400";
    }
  }
  function statusBadgeClass(status) {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-800 ring-blue-200/60";
      case "under_analysis":
        return "bg-amber-50 text-amber-800 ring-amber-200/60";
      case "pending_review":
        return "bg-orange-50 text-orange-800 ring-orange-200/60";
      case "completed":
        return "bg-emerald-50 text-emerald-800 ring-emerald-200/60";
      default:
        return "bg-slate-50 text-slate-600 ring-slate-200/60";
    }
  }
  function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateStr;
    }
  }
  const MATRIX = 5;
  function isExternalScenario(s) {
    for (const q of s.qualifications ?? []) {
      const name = typeof q === "string" ? q : q?.str ?? "";
      if (/third.?party|external|vendor|supplier|outsourc|خارج|طرف\s*ثالث|مورد/i.test(name)) {
        return true;
      }
    }
    return !!(s.name && /third.?party|external|vendor|supplier|outsourc|خارج|طرف\s*ثالث|مورد/i.test(s.name));
  }
  const scopedScenarios = (() => {
    const all = data.scenarios;
    return all.filter((s) => !isExternalScenario(s));
  })();
  function getProbaImpact(s) {
    const p = s.residual_proba?.value ?? -1;
    const imp = s.residual_impact?.value ?? -1;
    return { p, imp };
  }
  function scoreBucket(p, imp) {
    if (p < 0 || imp < 0) return null;
    const score = (p + 1) * (imp + 1);
    if (score >= 12) return "high";
    if (score >= 6) return "medium";
    return "low";
  }
  function cellBg(count, score) {
    if (count === 0) return "#f1f5f9";
    if (score >= 20) return "#dc2626";
    if (score >= 12) return "#ea580c";
    if (score >= 6) return "#f59e0b";
    if (score >= 2) return "#22c55e";
    return "#86efac";
  }
  function cellFg(count, score) {
    if (count === 0) return "#94a3b8";
    return score >= 7 ? "#fff" : "#1e293b";
  }
  function cellStyle(count, score) {
    const shadow = count > 0 ? "box-shadow: 0 2px 8px rgba(15,23,42,0.12);" : "";
    return `background-color: ${cellBg(count, score)}; color: ${cellFg(count, score)}; ${shadow}`;
  }
  const heatmapCellScenarios = (() => {
    const grid = Array.from({ length: MATRIX }, () => Array.from({ length: MATRIX }, () => []));
    for (const s of scopedScenarios) {
      const { p, imp } = getProbaImpact(s);
      if (p >= 0 && imp >= 0 && p < MATRIX && imp < MATRIX) grid[p][imp].push(s);
    }
    return grid;
  })();
  const heatmapGrid = (() => heatmapCellScenarios.map((row) => row.map((cell) => cell.length)))();
  const totalRisks = scopedScenarios.length;
  const riskLevelCounts = (() => {
    const counts = { low: 0, medium: 0, high: 0 };
    for (const s of scopedScenarios) {
      const { p, imp } = getProbaImpact(s);
      const bucket = scoreBucket(p, imp);
      if (bucket) counts[bucket]++;
    }
    return counts;
  })();
  const categoryRiskMax = (() => {
    const map = /* @__PURE__ */ new Map();
    for (const s of data.scenarios) {
      const rv = s.residual_level?.value ?? -1;
      const iv = s.inherent_level?.value ?? -1;
      const rScore = rv >= 0 ? (rv + 1) * 5 : 0;
      const iScore = iv >= 0 ? (iv + 1) * 5 : 0;
      for (const q of s.qualifications ?? []) {
        const name = typeof q === "string" ? q : q?.str ?? "";
        if (!name) continue;
        const cur = map.get(name) ?? { maxResidual: 0, maxInherent: 0 };
        cur.maxResidual = Math.max(cur.maxResidual, rScore);
        cur.maxInherent = Math.max(cur.maxInherent, iScore);
        map.set(name, cur);
      }
    }
    return Array.from(map.entries()).map(([category, v]) => ({ category, ...v })).sort((a, b) => b.maxResidual - a.maxResidual);
  })();
  function severityStyle(score) {
    if (score >= 15) return "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm shadow-red-200";
    if (score >= 7) return "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shadow-amber-200";
    return "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm shadow-emerald-200";
  }
  const tprmRows = (data.tprmMetrics ?? []).map((r) => ({
    ...r,
    score: typeof r.review_progress === "number" ? r.review_progress : typeof r.completion === "number" ? r.completion : 0
  })).sort((a, b) => b.score - a.score).slice(0, 8);
  function tprmBarColor(score) {
    if (score >= 80) return "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 shadow-sm shadow-emerald-200/80";
    if (score >= 60) return "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 shadow-sm shadow-amber-200/80";
    return "bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 shadow-sm shadow-red-200/80";
  }
  const policyViolationRows = (data.policyViolations ?? []).filter((r) => r.count > 0).sort((a, b) => b.count - a.count).slice(0, 8);
  const maxPolicyViolationCount = policyViolationRows.reduce((max, r) => Math.max(max, r.count), 0) || 1;
  function policyViolationBarColor(count) {
    if (count >= 5) return "bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 shadow-sm shadow-red-200/80";
    if (count >= 2) return "bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm shadow-amber-200/80";
    return "bg-gradient-to-r from-orange-400 to-amber-300 shadow-sm shadow-orange-200/60";
  }
  const ENGLISH_MONTHS = [
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
  ];
  function monthLabel(key) {
    const idx = parseInt(key.split("-")[1], 10) - 1;
    return ENGLISH_MONTHS[idx] ?? key;
  }
  function trendNum(n) {
    return n.toLocaleString(getLocale().startsWith("ar") ? "ar-EG" : void 0);
  }
  function buildLinePath(pts) {
    if (!pts.length) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], c = pts[i], cx = (p.x + c.x) / 2;
      d += ` C ${cx} ${p.y},${cx} ${c.y},${c.x} ${c.y}`;
    }
    return d;
  }
  function buildAreaPath(pts, maxY) {
    if (!pts.length) return "";
    return buildLinePath(pts) + ` L ${pts[pts.length - 1].x} ${maxY} L ${pts[0].x} ${maxY} Z`;
  }
  const PL = 20, PR = 8, PT = 14, PB = 28;
  const VW = 500, VH = 120;
  const CW = VW - PL - PR;
  const CH = VH - PT - PB;
  const trendPoints = (() => {
    const trend = data.complianceTrend ?? [];
    const n = trend.length;
    return trend.map((d, i) => ({
      label: monthLabel(d.month),
      value: d.value,
      x: PL + (n <= 1 ? CW / 2 : i / (n - 1) * CW),
      y: PT + (d.value !== null ? (1 - d.value / 100) * CH : CH)
    }));
  })();
  const hasAnyTrendData = (data.complianceTrend ?? []).some((p) => p.value !== null);
  function donutParams(score, size = 72, sw = 7) {
    const r = (size - sw) / 2;
    const circ = 2 * Math.PI * r;
    const fill = score / 100 * circ;
    const cx = size / 2;
    const cy = size / 2;
    const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
    const colorEnd = score >= 75 ? "#059669" : score >= 50 ? "#ea580c" : "#e11d48";
    return {
      r,
      circ,
      fill,
      cx,
      cy,
      color,
      colorEnd,
      size,
      sw
    };
  }
  function frameworkAccentClass(score) {
    if (score >= 75) return "border-t-emerald-500";
    if (score >= 50) return "border-t-amber-500";
    return "border-t-rose-500";
  }
  function categoryRowAccent(score) {
    if (score >= 15) return "border-l-red-500";
    if (score >= 7) return "border-l-amber-500";
    return "border-l-emerald-500";
  }
  function daysUntil(date) {
    if (!date) return null;
    const d = new Date(date).getTime();
    if (Number.isNaN(d)) return null;
    return Math.ceil((d - Date.now()) / (1e3 * 60 * 60 * 24));
  }
  $$payload.out += `<div class="brand-dashboard font-cairo space-y-6 p-5 md:p-6 svelte-fafr8m" dir="ltr"><div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header flex items-center justify-between px-5 py-4 svelte-fafr8m"><h2 class="dashboard-title-lg flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-blue-100 text-blue-600 svelte-fafr8m"><i class="fa-solid fa-scale-balanced text-sm"></i></span> ${escape_html(latestupdates1())}</h2> <a href="/legislative-updates" class="dashboard-link text-sm font-semibold flex items-center gap-1.5 svelte-fafr8m">${escape_html(viewallupdates2())} <i class="fa-solid fa-chevron-right text-xs"></i></a></div> `;
  if (data.legislative.items.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-inbox text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">لا توجد مستجدات</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(data.legislative.items.slice(0, 5));
    $$payload.out += `<div class="divide-y divide-slate-100/80"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload.out += `<a${attr("href", `/legislative-updates/${stringify(item.id)}`)} class="dashboard-list-row flex items-center gap-4 px-5 py-5 group svelte-fafr8m"><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1.5">`;
      if (item.source) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm text-slate-400 font-medium">(${escape_html(item.source)})</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (item.published_at) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-sm text-slate-400 font-medium">${escape_html(formatDate(item.published_at))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <p class="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-700 transition-colors tracking-tight">${escape_html(item.title)}</p> `;
      if (item.description) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="text-sm text-slate-500 mt-1.5 line-clamp-1 leading-relaxed">${escape_html(item.description)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <div class="flex items-center gap-2.5 shrink-0">`;
      if (item.status) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class(`dashboard-badge text-sm px-3 py-1.5 rounded-lg font-semibold ring-1 ring-inset ${stringify(statusBadgeClass(item.status))}`, "svelte-fafr8m")}>${escape_html(item.status_label || item.status)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (item.impact_level) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span${attr_class(`dashboard-badge text-sm px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ring-1 ring-inset ${stringify(impactBadgeClass(item.impact_level))}`, "svelte-fafr8m")}><span${attr_class(`w-2 h-2 rounded-full ${stringify(impactDotClass(item.impact_level))} shadow-sm`, "svelte-fafr8m")}></span> ${escape_html(item.impact_label || item.impact_level)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <i class="fa-solid fa-arrow-up-right-from-square text-sm text-slate-300 group-hover:text-blue-500 transition-colors ml-1"></i></div></a>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (data.frameworks.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(data.frameworks.slice(0, 4));
    $$payload.out += `<div class="grid grid-cols-2 lg:grid-cols-4 gap-5"><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let fwk = each_array_1[i];
      const dp = donutParams(fwk.progress, 96, 8);
      const days = daysUntil(fwk.due_date);
      $$payload.out += `<a href="/compliance-assessments"${attr_class(`dashboard-card dashboard-card-hover border-t-4 ${stringify(frameworkAccentClass(fwk.progress))} p-5 min-h-[148px] text-left block`, "svelte-fafr8m")}><div class="flex items-start justify-between gap-3"><div class="flex-1 min-w-0"><h4 class="text-base font-bold text-slate-900 truncate tracking-tight">${escape_html(fwk.name)}</h4> <p class="text-sm text-slate-500 mt-1 font-medium tabular-nums">${escape_html(fwk.assessmentsCount)}
								${escape_html(fwk.assessmentsCount === 1 ? assessmentsingular1() : assessmentplural1())}</p> <div class="flex items-center gap-1.5 mt-2"><i class="fa-solid fa-arrow-trend-up text-xs text-emerald-500"></i> <span class="text-xs text-emerald-600 font-semibold">+0% مقارنة بالشهر الماضي</span></div> `;
      if (days !== null && days >= 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="mt-2.5"><span${attr_class(`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${stringify(days <= 14 ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200")}`)}><i class="fa-regular fa-calendar text-[10px]"></i> ${escape_html(auditindays2({ count: days }))}</span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <svg${attr("width", dp.size)}${attr("height", dp.size)}${attr("viewBox", `0 0 ${stringify(dp.size)} ${stringify(dp.size)}`)} class="shrink-0 drop-shadow-sm"><defs><linearGradient${attr("id", `donutGrad-${stringify(i)}`)} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%"${attr("stop-color", dp.color)}></stop><stop offset="100%"${attr("stop-color", dp.colorEnd)}></stop></linearGradient></defs><circle${attr("cx", dp.cx)}${attr("cy", dp.cy)}${attr("r", dp.r)} fill="none" stroke="#e2e8f0"${attr("stroke-width", dp.sw)}></circle><circle${attr("cx", dp.cx)}${attr("cy", dp.cy)}${attr("r", dp.r)} fill="none"${attr("stroke", `url(#donutGrad-${stringify(i)})`)}${attr("stroke-width", dp.sw)}${attr("stroke-dasharray", `${stringify(dp.fill)} ${stringify(dp.circ)}`)} stroke-linecap="round"${attr("transform", `rotate(-90 ${stringify(dp.cx)} ${stringify(dp.cy)})`)}></circle><text${attr("x", dp.cx)}${attr("y", dp.cy + 1)} text-anchor="middle" dominant-baseline="central" font-size="17" font-weight="800" fill="#0f172a" font-family="Cairo, sans-serif">${escape_html(fwk.progress)}%</text></svg></div></a>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header flex items-center justify-between px-5 py-4 gap-3 flex-wrap svelte-fafr8m"><h3 class="dashboard-title flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-violet-100 text-violet-600 svelte-fafr8m"><i class="fa-solid fa-table-cells text-xs"></i></span> ${escape_html(riskmap1())}</h3> <div class="flex items-center gap-3 flex-wrap"><div class="dashboard-toggle-group flex rounded-xl border border-slate-200/80 overflow-hidden shadow-sm"><button type="button"${attr_class(`px-3.5 py-2 text-xs font-bold transition-all ${stringify("bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner")}`)}>${escape_html(internal())}</button> <button type="button"${attr_class(`px-3.5 py-2 text-xs font-bold transition-all ${stringify("bg-white text-slate-500 hover:bg-slate-50")}`)}>${escape_html(external())}</button></div> <div class="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-50 ring-1 ring-slate-100"><span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span> ${escape_html(low())} <span class="font-extrabold text-slate-900 tabular-nums">${escape_html(riskLevelCounts.low)}</span></span> <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span class="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm"></span> ${escape_html(medium())} <span class="font-extrabold text-slate-900 tabular-nums">${escape_html(riskLevelCounts.medium)}</span></span> <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></span> ${escape_html(high())} <span class="font-extrabold text-slate-900 tabular-nums">${escape_html(riskLevelCounts.high)}</span></span></div></div></div> `;
  if (totalRisks === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-inbox text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">${escape_html(noriskscenarios2())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_2 = ensure_array_like([5, 4, 3, 2, 1]);
    const each_array_3 = ensure_array_like([5, 4, 3, 2, 1]);
    const each_array_6 = ensure_array_like([1, 2, 3, 4, 5]);
    $$payload.out += `<div class="p-4" dir="ltr"><div class="flex"><div class="flex flex-col gap-0.5 mr-1.5"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let l = each_array_2[$$index_2];
      $$payload.out += `<div class="h-10 flex items-center justify-center"><span class="text-[10px] font-bold text-slate-400 w-3 text-center tabular-nums">${escape_html(l)}</span></div>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex-1"><div class="grid grid-cols-5 gap-1.5"><!--[-->`;
    for (let $$index_5 = 0, $$length = each_array_3.length; $$index_5 < $$length; $$index_5++) {
      let l = each_array_3[$$index_5];
      const each_array_4 = ensure_array_like([1, 2, 3, 4, 5]);
      $$payload.out += `<!--[-->`;
      for (let $$index_4 = 0, $$length2 = each_array_4.length; $$index_4 < $$length2; $$index_4++) {
        let imp = each_array_4[$$index_4];
        const count = heatmapGrid[l - 1][imp - 1];
        const scenarios = heatmapCellScenarios[l - 1][imp - 1];
        const score = l * imp;
        const cellClass = "h-12 rounded-lg flex items-center justify-center text-sm font-extrabold tabular-nums transition-all duration-200";
        if (count === 1) {
          $$payload.out += "<!--[-->";
          Anchor($$payload, {
            href: `/risk-scenarios/${stringify(scenarios[0].id)}`,
            class: `${stringify(cellClass)} cursor-pointer hover:ring-2 hover:ring-blue-400/70`,
            style: cellStyle(count, score),
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(count)}`;
            },
            $$slots: { default: true }
          });
        } else if (count > 1) {
          $$payload.out += "<!--[1-->";
          {
            let trigger = function($$payload2) {
              $$payload2.out += `<button type="button"${attr_class(`${stringify(cellClass)} w-full cursor-pointer hover:ring-2 hover:ring-blue-400/70`, "svelte-fafr8m")}${attr_style(cellStyle(count, score))}>${escape_html(count)}</button>`;
            }, content = function($$payload2) {
              const each_array_5 = ensure_array_like(scenarios);
              $$payload2.out += `<div class="card bg-white border border-gray-200 shadow-lg p-3 min-w-[10rem]"><!--[-->`;
              for (let $$index_3 = 0, $$length3 = each_array_5.length; $$index_3 < $$length3; $$index_3++) {
                let scenario = each_array_5[$$index_3];
                Anchor($$payload2, {
                  href: `/risk-scenarios/${stringify(scenario.id)}`,
                  class: "block px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-50 rounded",
                  children: ($$payload3) => {
                    $$payload3.out += `<!---->${escape_html(scenario.ref_id ?? scenario.name ?? scenario.id)}`;
                  },
                  $$slots: { default: true }
                });
              }
              $$payload2.out += `<!--]--></div>`;
            };
            Popover($$payload, {
              triggerBase: "w-full",
              positioning: { placement: "top" },
              arrow: true,
              trigger,
              content,
              $$slots: { trigger: true, content: true }
            });
          }
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div${attr_class(clsx(cellClass), "svelte-fafr8m")}${attr_style(cellStyle(count, score))}></div>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> <div class="flex justify-between mt-2 px-1"><!--[-->`;
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let i = each_array_6[$$index_6];
      $$payload.out += `<span class="text-[10px] font-bold text-slate-400 tabular-nums">${escape_html(i)}</span>`;
    }
    $$payload.out += `<!--]--></div> <div class="text-center mt-1"><span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">${escape_html(impactiso3())}</span></div></div></div> <p class="text-[10px] font-semibold text-slate-400 mt-2 uppercase tracking-wider">${escape_html(likelihood())}</p></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header px-5 py-4 svelte-fafr8m"><h3 class="dashboard-title flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-orange-100 text-orange-600 svelte-fafr8m"><i class="fa-solid fa-layer-group text-xs"></i></span> ${escape_html(highestresidualriskbycategory4())}</h3></div> `;
  if (categoryRiskMax.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-inbox text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">${escape_html(noqualificationsyet2())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_7 = ensure_array_like(categoryRiskMax);
    $$payload.out += `<div class="divide-y divide-slate-100/80"><!--[-->`;
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let cat = each_array_7[$$index_7];
      $$payload.out += `<div${attr_class(`flex items-center justify-between px-5 py-4 border-l-4 ${stringify(categoryRowAccent(cat.maxResidual))} hover:bg-blue-50/40 transition-colors`, "svelte-fafr8m")}><span class="text-sm font-bold text-slate-800 flex-1 truncate tracking-tight">${escape_html(cat.category)}</span> <div class="flex items-center gap-3 shrink-0"><span class="text-xs font-medium text-slate-400 tabular-nums">مقابل ${escape_html(cat.maxInherent)}</span> <span${attr_class(`inline-flex items-center justify-center min-w-[40px] h-9 rounded-lg text-sm font-extrabold px-3 tabular-nums ${stringify(severityStyle(cat.maxResidual))}`, "svelte-fafr8m")}>${escape_html(cat.maxResidual)}</span></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header px-5 py-4 svelte-fafr8m"><h3 class="dashboard-title flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-rose-100 text-rose-600 svelte-fafr8m"><i class="fa-solid fa-shield-halved text-xs"></i></span> ${escape_html(policyviolationsbypolicy3())}</h3></div> `;
  if (policyViolationRows.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-inbox text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">${escape_html(policyviolationscomingsoon3())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_8 = ensure_array_like(policyViolationRows);
    $$payload.out += `<div class="px-5 py-5 space-y-5"><!--[-->`;
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let row = each_array_8[$$index_8];
      $$payload.out += `<div><div class="flex items-center justify-between mb-2.5"><span class="text-sm font-bold text-slate-800 truncate flex-1 tracking-tight">${escape_html(row.name)}</span> <span class="text-sm font-extrabold text-rose-600 shrink-0 ml-3 tabular-nums">${escape_html(row.count)}</span></div> <div class="dashboard-progress-track h-3.5 rounded-full overflow-hidden svelte-fafr8m" dir="ltr"><div${attr_class(`h-full rounded-full transition-all duration-500 ${stringify(policyViolationBarColor(row.count))}`, "svelte-fafr8m")}${attr_style("", {
        width: `${stringify(row.count / maxPolicyViolationCount * 100)}%`
      })}></div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header px-5 py-4 svelte-fafr8m"><h3 class="dashboard-title flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-teal-100 text-teal-600 svelte-fafr8m"><i class="fa-solid fa-building-shield text-xs"></i></span> ${escape_html(thirdpartyassessmentresults3())}</h3></div> `;
  if (tprmRows.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-inbox text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">${escape_html(noentityassessments2())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_9 = ensure_array_like(tprmRows);
    $$payload.out += `<div class="px-5 py-5 space-y-5"><!--[-->`;
    for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
      let row = each_array_9[$$index_9];
      $$payload.out += `<div><div class="flex items-center justify-between mb-2.5"><span class="text-sm font-bold text-slate-800 truncate flex-1 tracking-tight">${escape_html(row.provider)}</span> <div class="flex items-center gap-2.5 shrink-0 ml-3">`;
      if (row.due_date) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="text-xs font-medium text-slate-400">${escape_html(formatDate(row.due_date))}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> <span${attr_class(`text-sm font-extrabold tabular-nums ${stringify(row.score >= 80 ? "text-emerald-600" : row.score >= 60 ? "text-amber-600" : "text-red-600")}`)}>${escape_html(row.score)}%</span></div></div> <div class="dashboard-progress-track h-3.5 rounded-full overflow-hidden svelte-fafr8m" dir="ltr"><div${attr_class(`h-full rounded-full transition-all duration-500 ${stringify(tprmBarColor(row.score))}`, "svelte-fafr8m")}${attr_style("", { width: `${stringify(row.score)}%` })}></div></div></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="dashboard-card svelte-fafr8m"><div class="dashboard-card-header flex items-center justify-between px-5 py-4 flex-wrap gap-3 svelte-fafr8m"><h3 class="dashboard-title flex items-center gap-2.5 svelte-fafr8m"><span class="dashboard-icon-badge bg-blue-100 text-blue-600 svelte-fafr8m"><i class="fa-solid fa-chart-line text-xs"></i></span> ${escape_html(compliancetrend6months2())}</h3> <div class="flex items-center gap-4 text-xs font-semibold text-slate-500"><span class="flex items-center gap-2"><span class="w-5 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 inline-block shadow-sm"></span> ${escape_html(averagecompliance1())}</span> `;
  if ((data.counters.exceptions ?? 0) > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold text-[11px] ring-1 ring-red-200/60"><i class="fa-solid fa-triangle-exclamation text-[10px]"></i> ${escape_html(activeexceptionscount2({ count: data.counters.exceptions ?? 0 }))}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  if (!hasAnyTrendData) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-col items-center justify-center py-12 text-slate-400"><div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3"><i class="fa-solid fa-chart-line text-2xl text-slate-300"></i></div> <p class="text-sm font-medium">${escape_html(trendnodataautocollect4())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_10 = ensure_array_like([0, 25, 50, 75, 100]);
    const each_array_11 = ensure_array_like(trendPoints);
    const each_array_12 = ensure_array_like(trendPoints);
    $$payload.out += `<div class="px-3 pt-4 pb-3" dir="ltr"><svg${attr("viewBox", `0 0 ${stringify(VW)} ${stringify(VH)}`)} class="w-full dashboard-trend-chart svelte-fafr8m" style="height:160px" role="img"${attr("aria-label", compliancetrendchartaria3())}><defs><linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"></stop><stop offset="60%" stop-color="#6366f1" stop-opacity="0.12"></stop><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.02"></stop></linearGradient><linearGradient id="trendLineGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2563eb"></stop><stop offset="50%" stop-color="#4f46e5"></stop><stop offset="100%" stop-color="#7c3aed"></stop></linearGradient><filter id="trendGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><!--[-->`;
    for (let $$index_10 = 0, $$length = each_array_10.length; $$index_10 < $$length; $$index_10++) {
      let pct = each_array_10[$$index_10];
      const gy = PT + (1 - pct / 100) * CH;
      $$payload.out += `<line${attr("x1", PL)}${attr("y1", gy)}${attr("x2", VW - PR)}${attr("y2", gy)} stroke="#e2e8f0" stroke-width="1"${attr("stroke-dasharray", pct === 0 || pct === 100 ? "0" : "4 4")}></line><text${attr("x", PL - 6)}${attr("y", gy + 4)} text-anchor="end" font-size="8.5" fill="#64748b" font-weight="600" font-family="Cairo, sans-serif">${escape_html(trendNum(pct))}</text>`;
    }
    $$payload.out += `<!--]--><path${attr("d", buildAreaPath(trendPoints.filter((p) => p.value !== null), PT + CH))} fill="url(#trendGrad)"></path><path${attr("d", buildLinePath(trendPoints.filter((p) => p.value !== null)))} fill="none" stroke="url(#trendLineGrad)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.25" filter="url(#trendGlow)"></path><path${attr("d", buildLinePath(trendPoints.filter((p) => p.value !== null)))} fill="none" stroke="url(#trendLineGrad)" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"></path><!--[-->`;
    for (let $$index_11 = 0, $$length = each_array_11.length; $$index_11 < $$length; $$index_11++) {
      let pt = each_array_11[$$index_11];
      if (pt.value !== null) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<circle${attr("cx", pt.x)}${attr("cy", pt.y)} r="6" fill="#fff" stroke="url(#trendLineGrad)" stroke-width="2.5"></circle><circle${attr("cx", pt.x)}${attr("cy", pt.y)} r="2.5" fill="#4f46e5"></circle><text${attr("x", pt.x)}${attr("y", pt.y - 10)} text-anchor="middle" font-size="9.5" fill="#4338ca" font-weight="800" font-family="Cairo, sans-serif">${escape_html(trendNum(pt.value))}٪</text>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--><!--[-->`;
    for (let $$index_12 = 0, $$length = each_array_12.length; $$index_12 < $$length; $$index_12++) {
      let pt = each_array_12[$$index_12];
      $$payload.out += `<text${attr("x", pt.x)}${attr("y", PT + CH + 20)} text-anchor="middle" font-size="10" fill="#475569" font-weight="600" font-family="Cairo, sans-serif">${escape_html(pt.label)}</text>`;
    }
    $$payload.out += `<!--]--></svg></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DImFS0UA.js.map
