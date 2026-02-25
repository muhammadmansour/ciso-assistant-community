import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';

function RiskScenarioItem($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<p class="whitespace-nowrap">`;
  if (data.strength_of_knowledge && data.strength_of_knowledge.symbol !== void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="font-mono text-lg">${escape_html(data.strength_of_knowledge.symbol)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span>${escape_html(data.ref_id)}</span></p>`;
  pop();
}

export { RiskScenarioItem as R };
//# sourceMappingURL=RiskScenarioItem-D3SOJ7CX.js.map
