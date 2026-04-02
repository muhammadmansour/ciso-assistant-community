import { p as push, _ as spread_attributes, a as pop } from './index2-9icAqEyj.js';
import './breadcrumbs-B1Us7xd5.js';

function Anchor($$payload, $$props) {
  push();
  let {
    href = "",
    breadcrumbAction = "push",
    label = "",
    prefixCrumbs = [],
    stopPropagation = false,
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  $$payload.out += `<a${spread_attributes({ href, ...rest }, null)}>`;
  children?.($$payload);
  $$payload.out += `<!----></a>`;
  pop();
}

export { Anchor as A };
//# sourceMappingURL=Anchor-B1pWCcQZ.js.map
