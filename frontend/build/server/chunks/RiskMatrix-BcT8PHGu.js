import { p as push, W as ensure_array_like, V as escape_html, S as attr_class, Z as attr_style, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tooltip } from './Tooltip-Li45R7zs.js';
import { b as isDark } from './helpers-Bm9n0CNG.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import { p as page } from './index3-BwfRm5YV.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { tB as risklevels1, F3 as level, bo as description } from './_index-DZs3gE-i.js';

function Cell($$payload, $$props) {
  push();
  let {
    cell,
    cellData = [],
    dataItemComponent,
    useBubbles = true
  } = $$props;
  const bubbleMinCount = 1;
  const maxBubbleSize = 4.5;
  const bubbleSizeRanges = [
    { max: 3, value: 1.5 },
    { max: 5, value: 2 },
    { max: 8, value: 2.5 },
    { max: 13, value: 3 },
    { max: 21, value: 3.5 },
    { max: 34, value: 4 }
  ];
  let open = false;
  let classesBubbleSize = (itemCount) => {
    for (const range of bubbleSizeRanges) {
      if (itemCount <= range.max) {
        return `width: ${range.value}rem; height: ${range.value}rem`;
      }
    }
    return `width: ${maxBubbleSize}rem; height: ${maxBubbleSize}rem`;
  };
  let classesCellText = (backgroundHexColor) => {
    return isDark(backgroundHexColor) ? "text-white" : "";
  };
  if (useBubbles && cellData.length >= bubbleMinCount && dataItemComponent) {
    $$payload.out += "<!--[-->";
    {
      let trigger = function($$payload2) {
        $$payload2.out += `<div${attr_class(`flex flex-wrap items-center space-x-1 justify-center w-full h-full cursor-pointer whitespace-normal overflow-y-scroll hide-scrollbar group ${stringify(classesCellText(cell.level.hexcolor))}`)}${attr_style(`background-color: ${stringify(cell.level.hexcolor)};`)} data-testid="cell"><div class="bg-surface-900/70 rounded-full flex justify-center items-center text-center text-white transition-colors group-hover:bg-surface-900/100 duration-100"${attr_style(`${stringify(classesBubbleSize(cellData.length))};`)}>${escape_html(cellData.length)}</div></div>`;
      }, content = function($$payload2) {
        const each_array = ensure_array_like(cellData);
        $$payload2.out += `<div class="card bg-surface-300"><div class="p-4 max-h-56 overflow-y-auto"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          const SvelteComponent = dataItemComponent;
          $$payload2.out += `<!---->`;
          SvelteComponent($$payload2, { data: item });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]--> <div class="arrow bg-surface-300"></div></div></div>`;
      };
      Popover($$payload, {
        open,
        onOpenChange: (e) => open = e.open,
        triggerBase: "w-full h-full",
        positioning: {
          placement: "top",
          offset: { mainAxis: 0, crossAxis: 0 }
        },
        arrow: true,
        trigger,
        content,
        $$slots: { trigger: true, content: true }
      });
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`flex flex-wrap flex-col items-center justify-center h-full *:pointer-events-none whitespace-normal overflow-y-scroll hide-scrollbar ${stringify(classesCellText(cell.level.hexcolor))}`)}${attr_style(`background-color: ${stringify(cell.level.hexcolor)};`)} data-testid="cell">`;
    if (dataItemComponent) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(cellData);
      $$payload.out += `<!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        const SvelteComponent_1 = dataItemComponent;
        $$payload.out += `<!---->`;
        SvelteComponent_1($$payload, { data: item });
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="mx-auto text-center">${escape_html(cellData)}</div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function buildRiskMatrix(grid, levels) {
  return grid.map(
    (row, i) => row.map((cell, j) => ({
      level: levels[cell],
      row: i,
      col: j
    }))
  ).reverse();
}
function Legend($$payload, $$props) {
  push();
  let { parsedRiskMatrix } = $$props;
  let classesCellText = (backgroundHexColor) => {
    if (!backgroundHexColor) return "";
    return isDark(backgroundHexColor) ? "text-white" : "text-black";
  };
  const each_array = ensure_array_like(parsedRiskMatrix.risk);
  $$payload.out += `<div class="w-full flex flex-col justify-start mt-4"><h3 class="flex font-semibold p-2 m-2 text-md">${escape_html(risklevels1())}</h3> <div class="flex justify-start mx-2"><table class="w-auto border-separate" style="border-spacing: 0 4px;"><thead><tr><th class="text-left pb-2 px-2 font-semibold">${escape_html(level())}</th><th class="text-left pb-2 px-2 font-semibold">${escape_html(description())}</th></tr></thead><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let riskItem = each_array[$$index];
    $$payload.out += `<tr class="col"><td${attr_class(`w-auto text-center border-4 border-white p-2 font-semibold whitespace-nowrap rounded-l ${stringify(classesCellText(riskItem.hexcolor))}`)}${attr_style(`background-color: ${stringify(riskItem.hexcolor)}`)}>${escape_html(riskItem.name)}</td><td class="col italic pl-3 border-t-4 border-b-4 border-r-4 border-white rounded-r">${escape_html(riskItem.description)}</td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div></div>`;
  pop();
}
function RiskMatrix($$payload, $$props) {
  push();
  let {
    riskMatrix,
    wrapperClass = "",
    matrixName,
    showLegend: showRisks = false,
    useBubbles = false,
    data = void 0,
    dataItemComponent = void 0,
    swapAxes = page.data.settings.risk_matrix_swap_axes ?? false,
    flipVertical = page.data.settings.risk_matrix_flip_vertical ?? false,
    labelStandard = page.data.settings.risk_matrix_labels ?? "ISO"
  } = $$props;
  const parsedRiskMatrix = JSON.parse(riskMatrix.json_definition);
  const grid = parsedRiskMatrix.grid;
  const risk = parsedRiskMatrix.risk;
  const originalProbabilities = parsedRiskMatrix.probability;
  const originalImpacts = parsedRiskMatrix.impact;
  let finalMatrix = void 0;
  let yAxisHeaders = [];
  let xAxisHeaders = swapAxes ? originalProbabilities : originalImpacts;
  let popupHoverY = yAxisHeaders.map((_, i) => ({
    event: "hover",
    target: `popup-${matrixName}-y-${i}`,
    placement: swapAxes ? "right" : "bottom"
  }));
  let popupHoverX = xAxisHeaders.map((_, i) => ({
    event: "hover",
    target: `popup-${matrixName}-x-${i}`,
    placement: "bottom"
  }));
  let yAxisType = swapAxes ? "impact" : "probability";
  let xAxisType = swapAxes ? "probability" : "impact";
  let yAxisLabel = safeTranslate(`${yAxisType}${labelStandard}`);
  let xAxisLabel = safeTranslate(`${xAxisType}${labelStandard}`);
  buildRiskMatrix(grid, risk);
  data ? data.some((row) => row && row.length > 0) ? data : void 0 : void 0;
  let classesCellText = (backgroundHexColor) => {
    if (!backgroundHexColor) return "";
    return isDark(backgroundHexColor) ? "text-white" : "text-black";
  };
  function xAxisHeadersSnippet($$payload2) {
    const each_array = ensure_array_like(xAxisHeaders);
    $$payload2.out += `<!--[-->`;
    for (let j = 0, $$length = each_array.length; j < $$length; j++) {
      let xHeader = each_array[j];
      $$payload2.out += `<div${attr_class(`flex flex-col items-center justify-center bg-gray-200 min-h-20 border-dotted border-black border-2 text-center p-1 ${stringify(classesCellText(xHeader.hexcolor))}`)}${attr_style(`background: ${stringify(xHeader.hexcolor ?? "#FFFFFF")}`)}${attr("data-testid", `x-axis-header-${stringify(j)}`)}>`;
      {
        let content = function($$payload3) {
          $$payload3.out += `<div class="card bg-black p-4 shadow-lg rounded-sm w-max"${attr_style(`color: ${stringify(xHeader.hexcolor ?? "#FFFFFF")}; max-width: min(28rem, 90vw);`)}><p data-testid="x-header-description" class="font-semibold whitespace-pre-line break-words">${escape_html(xHeader.description)}</p> <div class="arrow bg-black"></div></div>`;
        }, trigger = function($$payload3) {
          $$payload3.out += `<span class="font-semibold p-1 break-all" data-testid="x-header-name">${escape_html(xHeader.name)}</span> `;
          if (xHeader.description) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<i class="fa-solid fa-circle-info cursor-help *:pointer-events-none mt-1"></i>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        };
        Tooltip($$payload2, {
          open: popupHoverX[j].open,
          onOpenChange: (e) => popupHoverX[j].open = e.open,
          openDelay: 0,
          closeDelay: 100,
          zIndex: "9999",
          content,
          trigger,
          $$slots: { content: true, trigger: true }
        });
      }
      $$payload2.out += `<!----></div>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  const each_array_1 = ensure_array_like(finalMatrix);
  $$payload.out += `<div class="flex flex-row items-center"><div class="flex font-semibold text-xl -rotate-90 whitespace-nowrap mx-auto" data-testid="y-label">${escape_html(yAxisLabel)}</div> <div class="flex flex-col w-full">`;
  if (flipVertical) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex font-semibold text-xl items-center justify-center p-2 mt-1" data-testid="x-label-flipped">${escape_html(xAxisLabel)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${attr_class(`${stringify(wrapperClass)} grid gap-1 w-full`)}${attr_style(`grid-template-columns: auto repeat(${stringify(xAxisHeaders.length)}, minmax(0, 1fr)); grid-template-rows: repeat(${stringify(yAxisHeaders.length)}, minmax(0, 1fr)) auto;`)} data-testid="risk-matrix">`;
  if (flipVertical) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div></div> `;
    xAxisHeadersSnippet($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let row = each_array_1[i];
    const yHeader = yAxisHeaders[finalMatrix.length - 1 - i];
    const each_array_2 = ensure_array_like(row);
    $$payload.out += `<div${attr_class(`flex flex-col items-center min-h-20 justify-center bg-gray-200 border-dotted border-black border-2 text-center p-1 ${stringify(classesCellText(yHeader.hexcolor))}`)}${attr_style(`background: ${stringify(yHeader.hexcolor ?? "#FFFFFF")}`)}${attr("data-testid", `y-axis-header-${stringify(i)}`)}>`;
    {
      let content = function($$payload2) {
        $$payload2.out += `<div class="card bg-black p-4 shadow-lg rounded-sm w-max"${attr_style(`color: ${stringify(yHeader.hexcolor ?? "#FFFFFF")}; max-width: min(28rem, 90vw);`)}><p data-testid="y-header-description" class="font-semibold whitespace-pre-line break-words">${escape_html(yHeader.description)}</p> <div class="arrow bg-black"></div></div>`;
      }, trigger = function($$payload2) {
        $$payload2.out += `<span class="font-semibold p-1" data-testid="y-header-name">${escape_html(yHeader.name)}</span> `;
        if (yHeader.description) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<i class="fa-solid fa-circle-info cursor-help *:pointer-events-none mt-1"></i>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      };
      Tooltip($$payload, {
        open: popupHoverY[i].open,
        onOpenChange: (e) => popupHoverY[i].open = e.open,
        openDelay: 0,
        closeDelay: 100,
        positioning: { placement: "bottom-end" },
        zIndex: "9999",
        content,
        trigger,
        $$slots: { content: true, trigger: true }
      });
    }
    $$payload.out += `<!----></div> <!--[-->`;
    for (let j = 0, $$length2 = each_array_2.length; j < $$length2; j++) {
      let cell = each_array_2[j];
      Cell($$payload, {
        cell,
        cellData: void 0,
        dataItemComponent,
        useBubbles
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (!flipVertical) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div></div> `;
    xAxisHeadersSnippet($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (!flipVertical) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex font-semibold text-xl items-center justify-center p-2 mt-1" data-testid="x-label">${escape_html(xAxisLabel)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  if (showRisks) {
    $$payload.out += "<!--[-->";
    Legend($$payload, { parsedRiskMatrix });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { RiskMatrix as R };
//# sourceMappingURL=RiskMatrix-BcT8PHGu.js.map
