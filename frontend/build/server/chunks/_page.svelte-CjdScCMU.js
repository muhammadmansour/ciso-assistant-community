import { p as push, a as pop, V as escape_html } from './index2-9icAqEyj.js';
import { Graph, GraphLayoutType } from '@unovis/ts';
import { S as Single_container } from './single-container-DALt_tMs.js';
import { G as Graph_1 } from './graph-Cnm7M5Fr.js';
import './index-server-D2ILrLnm.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const nodes = data.data.nodes;
  const links = data.data.links;
  const gdata = { nodes, links };
  const linkLabel = (l) => ({ text: l.coverage });
  const nodeLabel = (n) => n.label;
  const nodeShape = (n) => n.shape;
  const nodeStroke = (n) => n.color;
  const linkFlow = (l) => l.active;
  const nodeDisabled = (n, i) => n.counter < 1;
  const nodeSideLabels = (n) => n.counter ? [{ text: `${n.counter}` }] : [];
  const forceLayoutSettings = {
    forceXStrength: 0.1,
    forceYStrength: 0.1,
    charge: -800
  };
  let containerHeight = "80vh";
  let selectedNodeId = void 0;
  function handleNodeClick(node) {
    selectedNodeId = node.id;
    containerHeight = "80.1vh";
  }
  function handleBackgroundClick() {
    selectedNodeId = void 0;
    containerHeight = "80vh";
  }
  const events = {
    [Graph.selectors.node]: { click: handleNodeClick },
    [Graph.selectors.background]: { click: handleBackgroundClick }
  };
  $$payload.out += `<div class="bg-white p-4 h-full w-full">`;
  Single_container($$payload, {
    data: gdata,
    height: containerHeight,
    children: ($$payload2) => {
      Graph_1($$payload2, {
        layoutType: GraphLayoutType.Force,
        nodeSize: 40,
        forceLayoutSettings,
        linkLabel,
        nodeStroke,
        nodeLabel,
        nodeShape,
        linkFlow,
        nodeSideLabels,
        nodeDisabled,
        events,
        selectedNodeId
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  if (selectedNodeId) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Selected Node: ${escape_html(selectedNodeId)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CjdScCMU.js.map
