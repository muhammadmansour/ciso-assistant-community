import { p as push, a as pop, V as escape_html, S as attr_class, U as clsx } from './index2-9icAqEyj.js';
import { A as Accordion } from './index4-CU0xjTbD.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';

function Dropdown($$payload, $$props) {
  push();
  let {
    header,
    open = false,
    icon,
    style,
    children
  } = $$props;
  let value = [open.toString()];
  {
    let iconOpen = function($$payload2) {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>`;
    }, iconClosed = function($$payload2) {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" class="-rotate-90" width="14px" height="14px" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>`;
    };
    Accordion($$payload, {
      value,
      onValueChange: (e) => value = e.value,
      collapsible: true,
      iconOpen,
      iconClosed,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        {
          let lead = function($$payload3) {
            $$payload3.out += `<i${attr_class(clsx(icon))}></i>`;
          }, control = function($$payload3) {
            $$payload3.out += `<p class="font-medium">${escape_html(header)}</p>`;
          }, panel = function($$payload3) {
            children?.($$payload3);
            $$payload3.out += `<!---->`;
          };
          Accordion.Item($$payload2, {
            value: "true",
            lead,
            control,
            panel,
            $$slots: { lead: true, control: true, panel: true }
          });
        }
        $$payload2.out += `<!---->`;
      },
      $$slots: {
        iconOpen: true,
        iconClosed: true,
        default: true
      }
    });
  }
  pop();
}

export { Dropdown as D };
//# sourceMappingURL=Dropdown-DMQZzGLP.js.map
