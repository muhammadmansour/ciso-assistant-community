import { p as push, a as pop, V as escape_html, T as attr } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-B_RoZuiq.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { N_ as currentalecombined2, sq as scenarios, ui as residualalecombined2, t5 as riskreduction1, N$ as currentale1, uj as residualale1, Sx as assumingindependentscenarios2, z8 as portfoliooverview1, Ph as combinedstudyriskprofile3, Pi as combinedlossexceedancecurve3, BI as nolecdataavailable3, Pk as combinedalemetrics2, C6 as noaledataavailablerunsimulations5, Y5 as actionplan1, IA as executivesummary1, EI as keymetrics1, tS as retriggerallsimulations2 } from './_index-DEXNURl5.js';
import { L as LossExceedanceCurve } from './LossExceedanceCurve-C5idvvwh.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { i as invalidateAll } from './client2-CItqzqlw.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { g as getToastStore } from './stores4-JOwRngIp.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index-CRjgakYW.js';
import './html-FW6Ia4bL.js';
import './formData-F7m95JiK.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './i18n-WNCV45cf.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-a52dcxCi.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './stores-CMqbeBUT.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-Dk-jItBW.js';
import './machine.svelte-CWLOiKlV.js';
import './Tooltip-DrjF8lR0.js';
import './index5-C1_XlIn1.js';
import './index8-BWS1s5in.js';
import './string-BMZjP7XX.js';
import './schemas-BcDBvyDd.js';
import './breadcrumbs-CG0qNTv3.js';
import './ModelTable-2RGnpbgJ.js';
import './Popover-souGUgW5.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './client-DqP3yP6V.js';
import './DeleteConfirmModal-DDazzCSM.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let retriggerIsLoading = false;
  getToastStore();
  run(() => {
    if (form?.message?.simulationsComplete) {
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
      $$payload2.out += `<div class="flex flex-col space-y-2">`;
      Anchor($$payload2, {
        href: `${page.url.pathname}/action-plan`,
        class: "btn preset-filled-primary-500 h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-heart-pulse mr-2 capitalize"></i>${escape_html(actionplan1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Anchor($$payload2, {
        href: `${page.url.pathname}/executive-summary`,
        class: "btn bg-emerald-500 hover:bg-emerald-600 text-white h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-chart-line mr-2"></i>${escape_html(executivesummary1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Anchor($$payload2, {
        href: `${page.url.pathname}/key-metrics`,
        class: "btn bg-amber-500 hover:bg-amber-600 text-white h-fit",
        breadcrumbAction: "push",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-chart-simple mr-2"></i>${escape_html(keymetrics1())}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <form method="POST" action="?/retriggerAllSimulations"><button type="submit" class="btn bg-violet-500 hover:bg-violet-600 text-white h-fit disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", retriggerIsLoading, true)} title="Retrigger all simulations for this study including hypotheses, portfolio data, and risk tolerance curve"><span class="mr-2">`;
      {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<i class="fa-solid fa-arrows-rotate"></i>`;
      }
      $$payload2.out += `<!--]--></span> ${escape_html(retriggerallsimulations2())}</button></form></div>`;
    }, widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4 bg-slate-100 rounded-xl p-4">`;
      if (data.combinedAle?.combined_metrics) {
        $$payload2.out += "<!--[-->";
        const metrics = data.combinedAle.combined_metrics;
        $$payload2.out += `<div class="bg-white rounded-lg p-6 shadow-sm"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="text-center"><div class="text-2xl font-bold text-blue-600 mb-2">${escape_html(metrics.current_ale_combined_display)}</div> <div class="text-sm text-gray-600">${escape_html(currentalecombined2())}</div> <div class="text-xs text-gray-500 mt-1">${escape_html(data.combinedAle.scenarios_with_current_ale)} / ${escape_html(data.combinedAle.total_scenarios)}
								${escape_html(scenarios())}</div></div> <div class="text-center"><div class="text-2xl font-bold text-green-600 mb-2">${escape_html(metrics.residual_ale_combined_display)}</div> <div class="text-sm text-gray-600">${escape_html(residualalecombined2())}</div> <div class="text-xs text-gray-500 mt-1">${escape_html(data.combinedAle.scenarios_with_residual_ale)} / ${escape_html(data.combinedAle.total_scenarios)}
								${escape_html(scenarios())}</div></div> <div class="text-center"><div class="text-2xl font-bold text-purple-600 mb-2">${escape_html(metrics.risk_reduction_display)}</div> <div class="text-sm text-gray-600">${escape_html(riskreduction1())}</div> <div class="text-xs text-gray-500 mt-1">${escape_html(currentale1())} - ${escape_html(residualale1())}</div></div></div> <div class="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600"><p class="text-center"><i class="fa-solid fa-circle-info"></i> ${escape_html(assumingindependentscenarios2())}</p></div></div> `;
        if (data.combinedLec?.curves && data.combinedLec.curves.length > 0) {
          $$payload2.out += "<!--[-->";
          const curves = data.combinedLec.curves;
          const currentRiskCurve = curves.find((c) => c.type === "combined_current");
          const residualRiskCurve = curves.find((c) => c.type === "combined_residual");
          const toleranceCurve = curves.find((c) => c.type === "tolerance");
          $$payload2.out += `<div class="bg-white rounded-lg p-6 shadow-sm"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold">${escape_html(portfoliooverview1())}</h3> <div class="text-sm text-gray-600">Current: ${escape_html(data.combinedLec.scenarios_with_current_data)} / ${escape_html(data.combinedLec.total_scenarios)} `;
          if (data.combinedLec.scenarios_with_residual_data) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `| Residual: ${escape_html(data.combinedLec.scenarios_with_residual_data)} / ${escape_html(data.combinedLec.total_scenarios)}
									${escape_html(scenarios())}`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></div></div> <div class="w-full">`;
          LossExceedanceCurve($$payload2, {
            data: currentRiskCurve?.data || [],
            residualData: residualRiskCurve?.data || [],
            toleranceData: toleranceCurve?.data || [],
            lossThreshold: data.data.loss_threshold,
            currency: data.combinedLec.currency,
            title: combinedstudyriskprofile3(),
            showTitle: false,
            height: "h-96",
            width: "w-full",
            enableTooltip: true,
            autoYMax: true,
            autoXMax: true,
            classesContainer: "min-w-0"
          });
          $$payload2.out += `<!----></div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div class="bg-white rounded-lg p-8 shadow-sm text-center"><div class="flex flex-col items-center space-y-4"><i class="fa-solid fa-chart-area text-4xl text-gray-400"></i> <h5 class="text-lg font-semibold text-gray-600">${escape_html(combinedlossexceedancecurve3())}</h5> <p class="text-gray-500">${escape_html(nolecdataavailable3())}</p></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="bg-white rounded-lg p-8 shadow-sm text-center"><div class="flex flex-col items-center space-y-4"><i class="fa-solid fa-chart-column text-4xl text-gray-400"></i> <h5 class="text-lg font-semibold text-gray-600">${escape_html(combinedalemetrics2())}</h5> <p class="text-gray-500">${escape_html(noaledataavailablerunsimulations5())}</p></div></div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    };
    DetailView($$payload, {
      data,
      actions,
      widgets,
      $$slots: { actions: true, widgets: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BZgxJWHd.js.map
