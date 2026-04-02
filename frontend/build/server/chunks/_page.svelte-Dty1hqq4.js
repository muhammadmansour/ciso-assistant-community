import { p as push, a as pop, V as escape_html, W as ensure_array_like, T as attr } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-C9gOGqEv.js';
import './client-DqP3yP6V.js';
import './breadcrumbs-B1Us7xd5.js';
import './runtime-BKo9q3Zd.js';
import { L as LossExceedanceCurve } from './LossExceedanceCurve-DA-88-JM.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { i as invalidateAll } from './client2-CItqzqlw.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { g as getToastStore } from './stores4-JOwRngIp.js';
import './index3-BwfRm5YV.js';
import './Anchor-B1pWCcQZ.js';
import './Form-CU-l-bUF.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './_index-B12BAPce.js';
import './stores2-D1NYwn5V.js';
import './i18n-D3bRixKV.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-T40TopyM.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './stores-D-WMoATo.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-DWhEPmW4.js';
import './ModelTable-CBxNmYiP.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DmAIPnRV.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let simulationIsLoading = false;
  getToastStore();
  run(() => {
    if (form?.message?.simulationComplete) {
      setTimeout(
        () => {
          invalidateAll();
        },
        100
      );
    }
  });
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2"><form method="POST" action="?/runSimulation"><button type="submit" class="btn bg-pink-500 text-white h-fit"${attr("disabled", simulationIsLoading, true)}><span class="mr-2">`;
      {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<i class="fa-solid fa-play"></i>`;
      }
      $$payload2.out += `<!--]--></span> Run simulation</button></form></div>`;
    }, widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4 bg-slate-100 rounded-xl p-4">`;
      if (data.lec?.data && Array.isArray(data.lec.data) && data.lec.data.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="bg-white rounded-lg p-4 shadow-sm w-full"><!---->`;
        {
          LossExceedanceCurve($$payload2, {
            data: data.lec.data,
            toleranceData: data.data.risk_tolerance_curve,
            lossThreshold: data.data.loss_threshold,
            currency: data.data.currency || "$",
            height: "h-96",
            width: "w-full",
            classesContainer: "min-w-0",
            enableTooltip: true,
            autoYMax: true,
            autoXMax: true
          });
        }
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="bg-white rounded-lg p-8 text-center shadow-sm">`;
        if (data.lec?.message) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-orange-600 mb-4"><i class="fa-solid fa-triangle-exclamation text-2xl mb-2"></i> <p class="font-medium">${escape_html(data.lec.message)}</p></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div class="text-gray-500"><i class="fa-solid fa-chart-line text-2xl mb-2"></i> <p>No LEC data available. Run a simulation to generate the chart.</p></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--> <div class="bg-white rounded-lg p-6 shadow-sm"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold">Risk Insights</h3> `;
      if (data.data.impact?.lb && data.data.impact?.ub) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button class="text-sm text-blue-600 hover:text-blue-800 underline">View Distribution</button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> `;
      if (data.lec?.metrics && Object.keys(data.lec.metrics).length > 0) {
        $$payload2.out += "<!--[-->";
        const metrics = data.lec.metrics;
        const currency = data.data.currency || "$";
        const formatCurrency = (value) => {
          if (value >= 1e9) return `${currency}${(value / 1e9).toFixed(1)}B`;
          if (value >= 1e6) return `${currency}${(value / 1e6).toFixed(1)}M`;
          if (value >= 1e3) return `${currency}${(value / 1e3).toFixed(0)}K`;
          return `${currency}${Math.round(value).toLocaleString()}`;
        };
        const scenarioLosses = Object.entries(metrics).filter(([key, _]) => key.startsWith("loss_with_") && key.endsWith("_percent")).map(([key, value]) => {
          const percentage = parseFloat(key.replace("loss_with_", "").replace("_percent", "").replace("_", "."));
          return { key, value, percentage };
        }).sort((a, b) => b.percentage - a.percentage);
        const each_array = ensure_array_like(scenarioLosses);
        $$payload2.out += `<div class="mb-8"><h4 class="text-md font-medium text-gray-700 mb-4">Value at Risk Metrics</h4> <div class="grid grid-cols-2 md:grid-cols-4 gap-6">`;
        if (metrics.mean_annual_loss !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-blue-600 mb-2">${escape_html(formatCurrency(metrics.mean_annual_loss))}</div> <div class="text-sm text-gray-600">Mean Annual Loss</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.var_95 !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-orange-600 mb-2">${escape_html(formatCurrency(metrics.var_95))}</div> <div class="text-sm text-gray-600">VaR 95%</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.var_99 !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-red-600 mb-2">${escape_html(formatCurrency(metrics.var_99))}</div> <div class="text-sm text-gray-600">VaR 99%</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.var_999 !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-red-800 mb-2">${escape_html(formatCurrency(metrics.var_999))}</div> <div class="text-sm text-gray-600">VaR 99.9%</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div></div> <div class="mb-8"><h4 class="text-md font-medium text-gray-700 mb-4">Loss Probabilities</h4> <div class="grid grid-cols-2 md:grid-cols-5 gap-6">`;
        if (metrics.prob_zero_loss !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-green-600 mb-2">${escape_html((metrics.prob_zero_loss * 100).toFixed(1))}%</div> <div class="text-sm text-gray-600">Zero Loss</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.prob_above_threshold !== void 0 && data.data.loss_threshold) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center p-3 bg-purple-50 border-2 border-purple-200 rounded-lg shadow-sm"><div class="text-2xl font-bold text-purple-600 mb-2">${escape_html((metrics.prob_above_threshold * 100).toFixed(2))}%</div> <div class="text-sm text-gray-600">Over ${escape_html(data.data.loss_threshold_display || `${currency}${data.data.loss_threshold.toLocaleString()}`)}</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.prob_above_10k !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-yellow-600 mb-2">${escape_html((metrics.prob_above_10k * 100).toFixed(2))}%</div> <div class="text-sm text-gray-600">Over ${escape_html(currency)}10K</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.prob_above_100k !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-orange-600 mb-2">${escape_html((metrics.prob_above_100k * 100).toFixed(2))}%</div> <div class="text-sm text-gray-600">Over ${escape_html(currency)}100K</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (metrics.prob_above_1M !== void 0) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-red-600 mb-2">${escape_html((metrics.prob_above_1M * 100).toFixed(2))}%</div> <div class="text-sm text-gray-600">Over ${escape_html(currency)}1M</div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div></div> <div><h4 class="text-md font-medium text-gray-700 mb-4">Scenario-Based Losses</h4> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let { key, value, percentage } = each_array[$$index];
          $$payload2.out += `<div class="text-center"><div class="text-2xl font-bold text-purple-600 mb-2">${escape_html(formatCurrency(value))}</div> <div class="text-sm text-gray-600">Loss with ${escape_html(percentage)}% chance</div></div>`;
        }
        $$payload2.out += `<!--]--></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="text-center text-gray-500">`;
        if (data.lec?.message) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<i class="fa-solid fa-calculator text-2xl mb-2"></i> <p>No metrics available. ${escape_html(data.lec.message)}</p>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<i class="fa-solid fa-calculator text-2xl mb-2"></i> <p>No metrics available. Run a simulation to see risk insights.</p>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    };
    DetailView($$payload, {
      data,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  $$payload.out += `<!----> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dty1hqq4.js.map
