import { p as push, a as pop } from './index2-9icAqEyj.js';
import { GraphLayoutType, GraphNodeShape, GraphLinkArrowStyle } from '@unovis/ts';
import { K6 as ebiosreconnaissance1, Kd as ebiosinitialaccess2, Kf as ebiosdiscovery1, Ke as ebiosexploitation1 } from './_index-B12BAPce.js';
import { S as Single_container } from './single-container-0JmqNCE_.js';
import { G as Graph_1 } from './graph-D0nQYL_R.js';

function OperatingModeGraph($$payload, $$props) {
  push();
  let {
    data,
    panelNodes = {
      reconnaissance: [],
      initialAccess: [],
      discovery: [],
      exploitation: []
    },
    height = "80vh",
    maxLineLength = 30,
    disableZoom = false,
    linkFlow = false,
    layoutType = GraphLayoutType.Parallel,
    layoutParallelGroupSpacing = 250,
    // Increased from 200 for more space between columns
    layoutParallelNodesPerColumn = 5,
    // Reduced from 4 to spread nodes more
    layoutParallelSubGroupsPerRow = 3,
    // Control sub-groups per row
    zoomLevel = 1
    // Default zoom level
  } = $$props;
  const panels = [
    {
      label: ebiosreconnaissance1(),
      nodes: panelNodes.reconnaissance,
      padding: { top: 50, right: 80, bottom: 50, left: 80 },
      // Increased horizontal padding
      sideIconSymbol: "&#xf002;",
      sideIconShape: "circle",
      sideIconSymbolColor: "pink",
      sideIconFontSize: 30,
      dashedOutline: true,
      borderColor: "pink"
    },
    {
      label: ebiosinitialaccess2(),
      nodes: panelNodes.initialAccess,
      padding: { top: 50, right: 80, bottom: 50, left: 80 },
      // Increased horizontal padding
      sideIconSymbol: "&#xf504;",
      sideIconShape: "circle",
      sideIconSymbolColor: "violet",
      sideIconFontSize: 30,
      dashedOutline: true,
      borderColor: "violet"
    },
    {
      label: ebiosdiscovery1(),
      nodes: panelNodes.discovery,
      padding: { top: 50, right: 80, bottom: 50, left: 80 },
      // Increased horizontal padding
      sideIconSymbol: "&#xf140;",
      sideIconShape: "circle",
      sideIconSymbolColor: "orange",
      sideIconFontSize: 30,
      dashedOutline: true,
      borderColor: "orange"
    },
    {
      label: ebiosexploitation1(),
      nodes: panelNodes.exploitation,
      padding: { top: 50, right: 80, bottom: 50, left: 80 },
      // Increased horizontal padding
      sideIconSymbol: "&#xe4e9;",
      sideIconShape: "circle",
      sideIconSymbolColor: "red",
      sideIconFontSize: 30,
      borderColor: "red",
      dashedOutline: true
    }
  ];
  const DEFAULT_NODE_SHAPE = GraphNodeShape.Square;
  const DEFAULT_NODE_SIZE = 70;
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
      label: node.label ? wrapText(node.label, 22).join("\n") : node.label
    }));
  }
  const processedData = {
    ...data,
    nodes: processNodesWithWrapping(data.nodes)
  };
  const layoutNodeGroup = (node) => {
    if (panelNodes.reconnaissance.includes(node.id)) return "reconnaissance";
    if (panelNodes.initialAccess.includes(node.id)) return "initialAccess";
    if (panelNodes.discovery.includes(node.id)) return "discovery";
    if (panelNodes.exploitation.includes(node.id)) return "exploitation";
    return "other";
  };
  const layoutParallelNodeSubGroup = (node) => {
    return node.group || "default";
  };
  const nodeShape = (node) => node.shape ?? DEFAULT_NODE_SHAPE;
  const nodeSize = (node) => node.size ?? DEFAULT_NODE_SIZE;
  const nodeStrokeWidth = 1.5;
  const nodeStroke = "#4D179A";
  const nodeFill = "#FFFFFF";
  const linkStroke = "#8FA1B9";
  const linkArrow = GraphLinkArrowStyle.Single;
  const linkArrowSize = 8;
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
          lines.length * lineHeight;
          node.size ?? DEFAULT_NODE_SIZE;
          const startY = 0;
          lines.forEach((line, i) => {
            targetGroup.append("text").attr("class", "custom-multiline-label").attr("text-anchor", "middle").attr("x", 0).attr("y", startY + i * lineHeight).attr("font-size", "12px").attr("font-weight", "400").attr("fill", "#0F1E57").style("font-family", "var(--vis-font-family)").text(line.trim());
          });
        }
      }
    });
  };
  const nodeLabel = (n) => "";
  const nodeIcon = (n) => n.icon || "";
  $$payload.out += `<div class="bg-white">`;
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
        nodeIcon,
        onRenderComplete,
        layoutType,
        layoutNodeGroup,
        layoutParallelNodeSubGroup,
        panels,
        disableZoom,
        layoutParallelGroupSpacing,
        layoutParallelNodesPerColumn,
        layoutParallelSubGroupsPerRow,
        linkStroke,
        linkArrow,
        linkFlow,
        linkArrowSize,
        zoomScaleExtent: [zoomLevel, zoomLevel]
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { OperatingModeGraph as O };
//# sourceMappingURL=OperatingModeGraph-DjwzDUD7.js.map
