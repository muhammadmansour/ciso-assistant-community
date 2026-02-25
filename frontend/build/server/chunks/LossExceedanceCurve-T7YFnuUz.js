import { p as push, T as attr, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { Ej as lossexceedancecurve2, Eo as lossamount1, J3 as exceedanceprobability1 } from './_index-BNamVw9A.js';

function LossExceedanceCurve($$payload, $$props) {
  push();
  let {
    width = "w-auto",
    height = "h-full",
    classesContainer = "",
    name = "loss-exceedance",
    data = void 0,
    toleranceData = void 0,
    residualData = void 0,
    lossThreshold = void 0,
    currency = "€",
    title = lossexceedancecurve2(),
    showTitle = false,
    xAxisLabel = lossamount1(),
    yAxisLabel = exceedanceprobability1(),
    minorSplitLine = false,
    enableTooltip = false,
    showXGrid = true,
    showYGrid = true,
    xMax = 1e6,
    xMin = void 0,
    autoYMax = false,
    autoXMax = false,
    xAxisScale = "log",
    yAxisScale = "linear",
    enableZoom = false
  } = $$props;
  const chart_id = `${name}_div`;
  function getMaxLossFromData(...dataArrays) {
    let maxLoss = 0;
    for (const dataArray of dataArrays) {
      if (dataArray && dataArray.length > 0) {
        for (const [loss] of dataArray) {
          if (loss > maxLoss) {
            maxLoss = loss;
          }
        }
      }
    }
    return maxLoss > 0 ? maxLoss : void 0;
  }
  autoXMax ? getMaxLossFromData(data, toleranceData, residualData) ?? xMax : xMax;
  $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)} style="height: 400px; min-width: 600px;"></div>`;
  pop();
}

export { LossExceedanceCurve as L };
//# sourceMappingURL=LossExceedanceCurve-T7YFnuUz.js.map
