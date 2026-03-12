import { p as push, a6 as props_id, _ as spread_attributes, X as stringify, S as attr_class, T as attr, V as escape_html, a as pop } from './index2-9icAqEyj.js';
import { c as connect, m as machine } from './index6-Cn6jj1jH.js';
import { u as useMachine, h as normalizeProps } from './machine.svelte-CNa8MjEx.js';

function ProgressRing($$payload, $$props) {
  push();
  const id = props_id($$payload);
  const {
    label,
    showLabel = false,
    strokeWidth = "10px",
    strokeLinecap = "round",
    // Root
    base = "relative",
    size = "size-32",
    classes = "",
    // Slot
    childrenBase = "absolute top-0 left-0 z-[1] flex justify-center items-center",
    childrenClasses = "",
    // SVG
    svgBase = "absolute top-0 left-0 size-full rounded-full",
    svgClasses = "",
    // Track
    trackBase = "fill-none",
    trackStroke = "stroke-surface-200-800",
    trackClasses = "",
    // Meter
    meterBase = "fill-none",
    meterStroke = "stroke-primary-500",
    meterTransition = "transition-[stroke-dashoffset] transition-[stroke-dashoffset]",
    meterAnimate = "animate-ring-indeterminate",
    meterDuration = "duration-200",
    meterClasses = "",
    // Label
    labelBase = "",
    labelFill = "fill-surface-950-50",
    labelFontSize = 24,
    // px
    labelFontWeight = "bold",
    labelClasses = "",
    // Snippets
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const service = useMachine(machine, () => ({ id, ...zagProps }));
  const api = connect(service, normalizeProps);
  const rxAnimCircle = api.indeterminate ? "animate-spin" : "";
  const rxAnimMeter = api.indeterminate ? meterAnimate : "";
  $$payload.out += `<figure${spread_attributes(
    {
      ...api.getRootProps(),
      class: `${stringify(base)} ${stringify(size)} ${stringify(classes)}`,
      "data-testid": "progress-ring"
    },
    null
  )}><div${spread_attributes(
    {
      ...api.getLabelProps(),
      class: `${stringify(childrenBase)} ${stringify(size)} ${stringify(childrenClasses)}`,
      "data-testid": "progress-ring-children"
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div> <svg${spread_attributes(
    {
      ...api.getCircleProps(),
      viewBox: "0 0 100 100",
      class: `${stringify(svgBase)} ${stringify(svgClasses)} ${stringify(rxAnimCircle)}`,
      style: `--size:100px;--thickness:${stringify(strokeWidth)};`,
      "data-testid": "progress-ring-svg"
    },
    null,
    void 0,
    void 0,
    3
  )}><circle${spread_attributes(
    {
      ...api.getCircleTrackProps(),
      class: `${stringify(trackBase)} ${stringify(trackStroke)} ${stringify(trackClasses)}`,
      "data-testid": "progress-ring-track"
    },
    null,
    void 0,
    void 0,
    3
  )}></circle><circle${spread_attributes(
    {
      ...api.getCircleRangeProps(),
      class: `${stringify(meterBase)} ${stringify(meterStroke)} ${stringify(meterTransition)} ${stringify(meterDuration)} ${stringify(meterClasses)} ${stringify(rxAnimMeter)}`,
      "stroke-linecap": strokeLinecap,
      "data-testid": "progress-ring-meter"
    },
    null,
    void 0,
    void 0,
    3
  )}></circle>`;
  if (api.value !== null && !children && showLabel) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<text${attr_class(`${stringify(labelBase)} ${stringify(labelFill)} ${stringify(labelClasses)}`)} x="50%" y="50%"${attr("font-size", labelFontSize)}${attr("font-weight", labelFontWeight)} text-anchor="middle" dominant-baseline="central" data-testid="progress-label">${escape_html(label ?? api.value)}%</text>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></svg></figure>`;
  pop();
}

export { ProgressRing as P };
//# sourceMappingURL=ProgressRing-HAZcZKrs.js.map
