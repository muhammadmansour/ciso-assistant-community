import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-CkUgDz5l.js';
import { GraphNodeShape, GraphLinkArrowStyle, GraphLayoutType } from '@unovis/ts';
import { SK as attackpaths1, Hs as focusedon1, Cg as noattackpathsdefined3, tm as riskorigins1, pZ as targetobjectives1, af as studytheecosystem2, ab as fearedevents1, cR as assets } from './_index-CqZWReca.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import { S as Single_container } from './single-container-0JmqNCE_.js';
import { G as Graph_1 } from './graph-D0nQYL_R.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-C2rLUn2N.js';
import './breadcrumbs-D1ratxIQ.js';
import './Form-BuUIlHHA.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-Dl9mduNa.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './stores-D-WMoATo.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './machine.svelte-CNa8MjEx.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-BOdIHh1e.js';
import './ModelTable-D9-j7Xao.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-C22czeYM.js';

function AttackPathGraph($$payload, $$props) {
  push();
  let {
    attackPaths,
    fearedEvents = [],
    height = "700px",
    maxLineLength = 20,
    disableZoom = false
  } = $$props;
  const graphData = (() => {
    const nodes = [];
    const links = [];
    const nodeIds = /* @__PURE__ */ new Set();
    attackPaths.forEach((path) => {
      if (path.risk_origin && !nodeIds.has(`ro-${path.risk_origin}`)) {
        nodes.push({
          id: `ro-${path.risk_origin}`,
          label: safeTranslate(path.risk_origin),
          type: "ro",
          shape: GraphNodeShape.Circle,
          size: 70
        });
        nodeIds.add(`ro-${path.risk_origin}`);
      }
    });
    attackPaths.forEach((path) => {
      if (path.target_objective && !nodeIds.has(`to-${path.target_objective}`)) {
        nodes.push({
          id: `to-${path.target_objective}`,
          label: safeTranslate(path.target_objective),
          type: "to",
          shape: GraphNodeShape.Hexagon,
          size: 70
        });
        nodeIds.add(`to-${path.target_objective}`);
      }
      if (path.risk_origin && path.target_objective) {
        links.push({
          source: `ro-${path.risk_origin}`,
          target: `to-${path.target_objective}`
        });
      }
    });
    attackPaths.forEach((path) => {
      path.stakeholders?.forEach((stakeholder) => {
        const nodeId = `stakeholder-${stakeholder.id}`;
        if (!nodeIds.has(nodeId)) {
          const label = stakeholder.entity ? `${stakeholder.str}
(${stakeholder.entity.name})` : stakeholder.str;
          nodes.push({
            id: nodeId,
            label,
            type: "stakeholder",
            shape: GraphNodeShape.Square,
            size: 60
          });
          nodeIds.add(nodeId);
        }
        if (path.target_objective) {
          const linkId = `${path.target_objective}-${stakeholder.id}`;
          if (!links.find((l) => `${l.source}-${l.target}` === linkId)) {
            links.push({
              source: `to-${path.target_objective}`,
              target: nodeId
            });
          }
        }
      });
    });
    fearedEvents.forEach((fearedEvent) => {
      const feNodeId = `fe-${fearedEvent.id}`;
      if (!nodeIds.has(feNodeId)) {
        nodes.push({
          id: feNodeId,
          label: fearedEvent.ref_id ? `${fearedEvent.ref_id}
${fearedEvent.name}` : fearedEvent.name,
          type: "feared_event",
          shape: GraphNodeShape.Hexagon,
          size: 65
        });
        nodeIds.add(feNodeId);
      }
    });
    attackPaths.forEach((path) => {
      if (path.stakeholders && path.stakeholders.length > 0) {
        path.stakeholders.forEach((stakeholder) => {
          fearedEvents.forEach((fearedEvent) => {
            const linkId = `${stakeholder.id}-${fearedEvent.id}`;
            if (!links.find((l) => `${l.source}-${l.target}` === linkId)) {
              links.push({
                source: `stakeholder-${stakeholder.id}`,
                target: `fe-${fearedEvent.id}`
              });
            }
          });
        });
      } else if (path.target_objective) {
        fearedEvents.forEach((fearedEvent) => {
          const linkId = `to-${path.target_objective}-${fearedEvent.id}`;
          if (!links.find((l) => `${l.source}-${l.target}` === linkId)) {
            links.push({
              source: `to-${path.target_objective}`,
              target: `fe-${fearedEvent.id}`
            });
          }
        });
      }
    });
    const assetIds = /* @__PURE__ */ new Set();
    fearedEvents.forEach((fearedEvent) => {
      fearedEvent.assets?.forEach((asset) => {
        const assetNodeId = `asset-${asset.id}`;
        if (!nodeIds.has(assetNodeId)) {
          nodes.push({
            id: assetNodeId,
            label: asset.str || asset.name || "",
            type: "asset",
            shape: GraphNodeShape.Triangle,
            size: 55
          });
          nodeIds.add(assetNodeId);
          assetIds.add(asset.id);
        }
        links.push({
          source: `fe-${fearedEvent.id}`,
          target: assetNodeId
        });
      });
    });
    return { nodes, links };
  })();
  const panels = [
    {
      label: riskorigins1(),
      nodes: graphData.nodes.filter((n) => n.type === "ro").map((n) => n.id),
      padding: { top: 60, right: 60, bottom: 60, left: 60 },
      dashedOutline: true,
      borderColor: "#dc2626",
      sideIconSymbol: "&#xf071;",
      sideIconShape: "circle",
      sideIconSymbolColor: "#dc2626"
    },
    {
      label: targetobjectives1(),
      nodes: graphData.nodes.filter((n) => n.type === "to").map((n) => n.id),
      padding: { top: 60, right: 60, bottom: 60, left: 60 },
      dashedOutline: true,
      borderColor: "#a855f7",
      sideIconSymbol: "&#xf140;",
      sideIconShape: "circle",
      sideIconSymbolColor: "#a855f7"
    },
    {
      label: studytheecosystem2(),
      nodes: graphData.nodes.filter((n) => n.type === "stakeholder").map((n) => n.id),
      padding: { top: 60, right: 60, bottom: 60, left: 60 },
      dashedOutline: true,
      borderColor: "#f59e0b",
      sideIconSymbol: "&#xf0c0;",
      sideIconShape: "circle",
      sideIconSymbolColor: "#f59e0b"
    },
    {
      label: fearedevents1(),
      nodes: graphData.nodes.filter((n) => n.type === "feared_event").map((n) => n.id),
      padding: { top: 60, right: 60, bottom: 60, left: 60 },
      dashedOutline: true,
      borderColor: "#16a34a",
      sideIconSymbol: "&#xf530;",
      sideIconShape: "circle",
      sideIconSymbolColor: "#16a34a"
    },
    {
      label: assets(),
      nodes: graphData.nodes.filter((n) => n.type === "asset").map((n) => n.id),
      padding: { top: 60, right: 60, bottom: 60, left: 60 },
      dashedOutline: true,
      borderColor: "#0891b2",
      sideIconSymbol: "&#xf1b2;",
      sideIconShape: "circle",
      sideIconSymbolColor: "#0891b2"
    }
  ];
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
    ...graphData,
    nodes: processNodesWithWrapping(graphData.nodes)
  };
  const layoutNodeGroup = (node) => {
    return node.type;
  };
  const nodeShape = (node) => node.shape ?? GraphNodeShape.Square;
  const nodeSize = (node) => node.size ?? 50;
  const nodeStrokeWidth = 3;
  const nodeStroke = (node) => {
    switch (node.type) {
      case "ro":
        return "#dc2626";
      case "to":
        return "#a855f7";
      case "stakeholder":
        return "#f59e0b";
      case "asset":
        return "#0891b2";
      case "feared_event":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };
  const nodeFill = () => "#ffffff";
  const linkStroke = "#8FA1B9";
  const linkArrow = GraphLinkArrowStyle.Single;
  const linkArrowColor = "#4D179A";
  const linkArrowSize = 8;
  const linkFlow = true;
  const linkBandWidth = 6;
  const layoutType = GraphLayoutType.Parallel;
  const layoutParallelGroupSpacing = 200;
  const layoutParallelNodesPerColumn = 8;
  const onRenderComplete = (g, nodes, links, config) => {
    g.selectAll(".custom-multiline-label").remove();
    const nodeMap = /* @__PURE__ */ new Map();
    g.selectAll("g").each(function() {
      const data = this.__data__;
      if (data?.id) {
        nodeMap.set(data.id, this);
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
  const focusedFearedEvent = data.data.focused_feared_event;
  {
    let widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-gray-50 shadow-xs grow"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold"><i class="fa-solid fa-route mr-2"></i> ${escape_html(attackpaths1())}</h3> `;
      if (focusedFearedEvent) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"><i class="fa-solid fa-crosshairs mr-2"></i> ${escape_html(focusedon1())}: ${escape_html(focusedFearedEvent.str)}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> <!---->`;
      {
        if (data.attackPaths && data.attackPaths.length > 0) {
          $$payload2.out += "<!--[-->";
          AttackPathGraph($$payload2, {
            attackPaths: data.attackPaths,
            fearedEvents: data.fearedEventsWithAssets || [],
            height: "700px"
          });
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div class="flex flex-col items-center justify-center py-12 text-center"><i class="fa-solid fa-diagram-project text-gray-300 text-6xl mb-4"></i> <p class="text-gray-500 text-sm">${escape_html(noattackpathsdefined3())}</p> <p class="text-gray-400 text-xs mt-2">Add attack paths to visualize the strategic scenario</p></div>`;
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!----></div></div>`;
    };
    DetailView($$payload, { data, widgets, $$slots: { widgets: true } });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DOyFoW3u.js.map
