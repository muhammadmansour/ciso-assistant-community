import { a3 as store_set } from './index2-9icAqEyj.js';
import { L as LossExceedanceCurve } from './LossExceedanceCurve-C5idvvwh.js';
import { p as pageTitle } from './stores-CMqbeBUT.js';
import './_index-DEXNURl5.js';
import './runtime-BMNt81Gy.js';
import './index-CRjgakYW.js';

function _page($$payload) {
  store_set(pageTitle, "Loss Exceedance Curve");
  const generateMonteCarloSampleData = () => {
    const percentiles = [
      { loss: 1, exceedance: 0.6 },
      // 60% chance of exceeding $100 (10^2)
      { loss: 10, exceedance: 0.595 },
      // 60% chance of exceeding $100 (10^2)
      { loss: 100, exceedance: 0.59 },
      // 60% chance of exceeding $100 (10^2)
      { loss: 200, exceedance: 0.58 },
      // 58% chance of exceeding $200
      { loss: 500, exceedance: 0.55 },
      // 55% chance of exceeding $500
      { loss: 1e3, exceedance: 0.52 },
      // 52% chance of exceeding $1K (10^3)
      { loss: 2e3, exceedance: 0.49 },
      // 49% chance of exceeding $2K
      { loss: 5e3, exceedance: 0.45 },
      // 45% chance of exceeding $5K
      { loss: 1e4, exceedance: 0.42 },
      // 42% chance of exceeding $10K (10^4)
      { loss: 2e4, exceedance: 0.38 },
      // 38% chance of exceeding $20K
      { loss: 5e4, exceedance: 0.34 },
      // 34% chance of exceeding $50K
      { loss: 1e5, exceedance: 0.3 },
      // 30% chance of exceeding $100K (10^5)
      { loss: 2e5, exceedance: 0.26 },
      // 26% chance of exceeding $200K
      { loss: 5e5, exceedance: 0.22 },
      // 22% chance of exceeding $500K
      { loss: 1e6, exceedance: 0.18 },
      // 18% chance of exceeding $1M (10^6)
      { loss: 2e6, exceedance: 0.15 },
      // 15% chance of exceeding $2M
      { loss: 5e6, exceedance: 0.12 },
      // 12% chance of exceeding $5M
      { loss: 1e7, exceedance: 0.09 },
      // 9% chance of exceeding $10M (10^7)
      { loss: 2e7, exceedance: 0.07 },
      // 7% chance of exceeding $20M
      { loss: 5e7, exceedance: 0.05 },
      // 5% chance of exceeding $50M
      { loss: 1e8, exceedance: 0.035 },
      // 3.5% chance of exceeding $100M (10^8)
      { loss: 2e8, exceedance: 0.025 },
      // 2.5% chance of exceeding $200M
      { loss: 5e8, exceedance: 0.018 },
      // 1.8% chance of exceeding $500M
      { loss: 1e9, exceedance: 0.012 }
      // 1.2% chance of exceeding $1B (10^9)
    ];
    return percentiles.map((p) => [p.loss, p.exceedance]);
  };
  const sampleData = generateMonteCarloSampleData();
  $$payload.out += `<div class="space-y-8 p-6"><div class="text-center"><h1 class="text-3xl font-bold text-gray-900 mb-2">Loss Exceedance Curve Analysis</h1> <p class="text-gray-600 max-w-3xl mx-auto">Loss Exceedance Curves show the probability that losses will exceed a given amount. These
			curves are essential for risk quantification and help organizations understand their potential
			financial exposure to various risk scenarios.</p></div> <div class="bg-white rounded-lg shadow-lg p-6"><h2 class="text-xl font-semibold mb-4 text-center">Chart Comparison: Full vs Light Rendering</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-2"><h3 class="font-medium text-center">Full Rendering (Log X, Linear Y, Grids On)</h3> `;
  LossExceedanceCurve($$payload, {
    data: sampleData,
    name: "full-chart",
    title: "Full Feature Chart",
    enableTooltip: true,
    xAxisScale: "log",
    yAxisScale: "linear",
    showXGrid: true,
    showYGrid: true,
    minorSplitLine: true,
    autoXMax: true
  });
  $$payload.out += `<!----></div> <div class="space-y-2"><h3 class="font-medium text-center">Light Rendering (No Grids, No Tooltip, No Labels)</h3> `;
  LossExceedanceCurve($$payload, {
    data: sampleData,
    name: "light-chart",
    title: "Light Version",
    enableTooltip: false,
    xAxisScale: "log",
    yAxisScale: "linear",
    showXGrid: false,
    showYGrid: false,
    xAxisLabel: "",
    yAxisLabel: "",
    autoYMax: true,
    xMax: 1e5
  });
  $$payload.out += `<!----></div></div> <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-2"><h3 class="font-medium text-center">Linear X-Axis Scale</h3> `;
  LossExceedanceCurve($$payload, {
    data: sampleData,
    name: "linear-x-chart",
    title: "Linear X Scale",
    enableTooltip: true,
    xAxisScale: "linear",
    yAxisScale: "linear",
    showXGrid: true,
    showYGrid: true,
    autoXMax: true
  });
  $$payload.out += `<!----></div></div></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C8qYFKMZ.js.map
