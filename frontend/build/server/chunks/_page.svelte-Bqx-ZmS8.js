import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { GraphNodeShape, GraphLinkArrowStyle, GraphLayoutType } from '@unovis/ts';
import { S as Single_container } from './single-container-0JmqNCE_.js';
import { G as Graph_1 } from './graph-D0nQYL_R.js';
import { TJ as assetdependencies1, TI as assetdependenciesdescription2, B9 as objectivesmet1, B8 as objectivesnotmet2, Ca as nodata1, C7 as nodependenciesfound2 } from './_index-CqZWReca.js';
import './index-server-DEEfjxiI.js';
import './runtime-BKo9q3Zd.js';

function AssetDependencyGraph($$payload, $$props) {
  push();
  const StatusMap = {
    true: { color: "#47e845", text: "✓" },
    // bright green with checkmark (objectives met)
    false: { color: "#ffc226", text: "⚠" },
    // yellow with warning (objectives not met)
    null: { color: "#dddddd", text: "" }
    // light gray, no icon
  };
  let {
    data,
    height = "70vh",
    maxLineLength = 20,
    disableZoom = false
  } = $$props;
  const panels = data.groups.map((group) => ({
    label: group.name,
    nodes: group.nodes,
    padding: { top: 50, right: 60, bottom: 50, left: 60 },
    dashedOutline: true,
    borderColor: "#4D179A"
  }));
  const DEFAULT_NODE_SHAPE = GraphNodeShape.Hexagon;
  const DEFAULT_NODE_SIZE = 55;
  function wrapText(text, maxLength = maxLineLength) {
    if (!text) return [];
    const paragraphs = text.split("\n");
    const wrappedLines = [];
    paragraphs.forEach((paragraph) => {
      if (paragraph.length <= maxLength) {
        wrappedLines.push(paragraph);
        return;
      }
      const words = paragraph.split(" ");
      let currentLine = "";
      words.forEach((word) => {
        if (currentLine.length + word.length + 1 > maxLength) {
          if (currentLine.trim()) {
            wrappedLines.push(currentLine.trim());
          }
          currentLine = word;
        } else {
          currentLine += (currentLine ? " " : "") + word;
        }
      });
      if (currentLine.trim()) {
        wrappedLines.push(currentLine.trim());
      }
    });
    return wrappedLines;
  }
  function processNodesWithWrapping(nodes) {
    return nodes.map((node) => ({
      ...node,
      label: node.label ? wrapText(node.label, maxLineLength).join("\n") : node.label
    }));
  }
  const processedData = {
    ...data,
    nodes: processNodesWithWrapping(data.nodes)
  };
  const layoutNodeGroup = (node) => {
    return node.folder;
  };
  const nodeShape = () => DEFAULT_NODE_SHAPE;
  const nodeSize = () => DEFAULT_NODE_SIZE;
  const nodeStrokeWidth = 3;
  const nodeStroke = (node) => {
    const status = String(node.verdict ?? "null");
    return StatusMap[status]?.color || StatusMap["null"].color;
  };
  const nodeFill = () => "#ffffff";
  const nodeSideLabels = (node) => {
    if (node.verdict === null || node.verdict === void 0) {
      return [];
    }
    const status = String(node.verdict);
    const statusConfig = StatusMap[status];
    if (!statusConfig) {
      return [];
    }
    return [
      {
        radius: 16,
        fontSize: 12,
        text: statusConfig.text
      }
    ];
  };
  const linkStroke = "#8FA1B9";
  const linkArrow = GraphLinkArrowStyle.Single;
  const linkArrowColor = "#4D179A";
  const linkArrowSize = 8;
  const linkFlow = true;
  const linkBandWidth = 8;
  const layoutType = GraphLayoutType.Parallel;
  const layoutParallelGroupSpacing = 200;
  const layoutParallelNodesPerColumn = 6;
  const onRenderComplete = (g, nodes, links, config) => {
    g.selectAll(".custom-multiline-label").remove();
    const nodeMap = /* @__PURE__ */ new Map();
    g.selectAll("g").each(function() {
      const data2 = this.__data__;
      if (data2?.id) {
        nodeMap.set(data2.id, this);
      }
    });
    nodes.forEach((node) => {
      if (node.label) {
        const groupElement = nodeMap.get(node.id);
        const targetGroup = groupElement ? g.select(() => groupElement) : null;
        if (targetGroup) {
          const lines = node.label.split("\n").filter((line) => line.trim() !== "");
          if (lines.length === 0 && node.label.trim()) {
            lines.push(node.label.trim());
          }
          const lineHeight = 12;
          lines.forEach((line, i) => {
            targetGroup.append("text").attr("class", "custom-multiline-label").attr("text-anchor", "middle").attr("x", 0).attr("y", i * lineHeight - lines.length * lineHeight / 2 + lineHeight / 2).attr("font-size", "11px").attr("font-weight", "500").attr("fill", "#0F1E57").style("font-family", "var(--vis-font-family)").text(line.trim());
          });
        }
      }
    });
  };
  const nodeLabel = () => "";
  $$payload.out += `<div class="chart bg-white rounded-lg shadow-sm svelte-1ekc70w">`;
  Single_container($$payload, {
    data: processedData,
    height,
    children: ($$payload2) => {
      Graph_1($$payload2, {
        nodeShape,
        nodeStroke,
        nodeSize,
        nodeFill,
        nodeStrokeWidth,
        nodeLabel,
        nodeSideLabels,
        onRenderComplete,
        layoutType,
        layoutNodeGroup,
        panels,
        disableZoom,
        layoutParallelGroupSpacing,
        layoutParallelNodesPerColumn,
        linkStroke,
        linkArrow,
        linkArrowSize,
        linkFlow,
        linkBandWidth,
        linkArrowColor
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div class="bg-white p-4 shadow-sm rounded-lg space-y-4"><div class="flex justify-between items-center"><div class="flex-1"><h1 class="text-2xl font-bold"><i class="fa-solid fa-sitemap mr-2"></i> ${escape_html(assetdependencies1())}</h1> <p class="text-sm text-gray-500 mt-1">${escape_html(assetdependenciesdescription2())}</p></div> <div class="flex items-center gap-6 text-sm"><div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-base" style="background-color: #47e845; color: white;">✓</div> <span class="text-gray-700">${escape_html(objectivesmet1())}</span></div> <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-base" style="background-color: #ffc226; color: white;">⚠</div> <span class="text-gray-700">${escape_html(objectivesnotmet2())}</span></div> <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full flex items-center justify-center" style="background-color: #dddddd;"></div> <span class="text-gray-700">${escape_html(nodata1())}</span></div></div></div> `;
  if (data.graphData.nodes.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card p-8 text-center"><i class="fa-solid fa-circle-info text-4xl text-gray-400 mb-4"></i> <p class="text-gray-600">${escape_html(nodependenciesfound2())}</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    AssetDependencyGraph($$payload, { data: data.graphData });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bqx-ZmS8.js.map
