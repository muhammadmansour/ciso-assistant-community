import { p as push, W as ensure_array_like, X as stringify, V as escape_html, S as attr_class, a as pop } from './index2-9icAqEyj.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import { D as Dropdown } from './Dropdown-DMQZzGLP.js';
import { s as safeTranslate } from './i18n-D3bRixKV.js';
import { bW as validationflows1, du as approver } from './_index-B12BAPce.js';

function ValidationFlowsSection($$payload, $$props) {
  push();
  let { validationFlows } = $$props;
  function getStatusIcon(status) {
    switch (status) {
      case "accepted":
        return "fa-check-circle text-green-600";
      case "rejected":
      case "revoked":
        return "fa-times-circle text-red-600";
      case "expired":
        return "fa-clock text-yellow-600";
      case "change_requested":
        return "fa-edit text-orange-600";
      case "submitted":
        return "fa-paper-plane text-blue-600";
      case "dropped":
        return "fa-circle-stop text-gray-600";
      default:
        return "fa-question-circle text-gray-600";
    }
  }
  function getApproverName(approver2) {
    if (approver2.first_name || approver2.last_name) {
      return `${approver2.first_name || ""} ${approver2.last_name || ""}`.trim();
    }
    return approver2.email;
  }
  (() => {
    const statusIcons = validationFlows.slice(0, 3).map((vf) => `<i class="fa-solid ${getStatusIcon(vf.status)} text-sm"></i>`).join(" ");
    return `${validationflows1()} (${validationFlows.length}) ${statusIcons}`;
  })();
  if (validationFlows && validationFlows.length > 0) {
    $$payload.out += "<!--[-->";
    Dropdown($$payload, {
      header: validationflows1(),
      icon: "fa-solid fa-check-double",
      style: "hover:text-primary-700",
      open: false,
      children: ($$payload2) => {
        const each_array = ensure_array_like(validationFlows);
        $$payload2.out += `<div class="space-y-3"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let validation_flow = each_array[$$index];
          $$payload2.out += `<div class="p-3 bg-gray-50 rounded-lg border border-gray-200"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-2 mb-2">`;
          Anchor($$payload2, {
            href: `/validation-flows/${stringify(validation_flow.id)}`,
            class: "anchor font-medium",
            "data-testid": "validation-flow-link",
            children: ($$payload3) => {
              $$payload3.out += `<!---->${escape_html(validation_flow.ref_id)}`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----> <span${attr_class("badge text-xs", void 0, {
            "preset-tonal-success": validation_flow.status === "accepted",
            "preset-tonal-error": validation_flow.status === "rejected" || validation_flow.status === "revoked",
            "preset-tonal-warning": validation_flow.status === "expired" || validation_flow.status === "change_requested",
            "preset-tonal-secondary": validation_flow.status === "submitted" || validation_flow.status === "dropped"
          })}>${escape_html(safeTranslate(validation_flow.status))}</span> <i${attr_class(`fa-solid ${stringify(getStatusIcon(validation_flow.status))} text-sm ml-1`)}></i></div> <div class="text-sm text-gray-600"><i class="fa-solid fa-user-check mr-1"></i> <span class="font-medium">${escape_html(approver())}:</span> ${escape_html(getApproverName(validation_flow.approver))}</div></div></div></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { ValidationFlowsSection as V };
//# sourceMappingURL=ValidationFlowsSection-BAcdPP8q.js.map
