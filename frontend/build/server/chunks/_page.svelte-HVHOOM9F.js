import { p as push, W as ensure_array_like, V as escape_html, S as attr_class, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { UT as approve, va as reject, uR as requestchanges1, Kj as drop, tF as revoke, tU as resubmit, C9 as noactionsavailableforthisstatus5, AF as onlyapprovercanmodify3, AE as onlyrequestercanmodify3, c5 as domain, HF as filteringlabels1, uP as requester, d8 as approver, de as validationdeadline1, O6 as createdat1, o0 as updatedat1, dd as requestnotes1, SY as associatedobjects1, hH as policies, bL as securityexceptions1, cB as evidences, dh as findingsassessments1, hG as entityassessments1, J_ as ebiosrmstudies3, bT as quantitativeriskstudies2, bW as businessimpactanalysis2, dg as riskassessments1, df as complianceassessments1, cd as perimeter, EC as lastupdate1, IH as eventshistory1 } from './_index-DEXNURl5.js';
import './constants-BZXIbVIt.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './stores-CMqbeBUT.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './crud-a52dcxCi.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { g as getLocale } from './runtime-BMNt81Gy.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './breadcrumbs-CG0qNTv3.js';
import './shared-server-BU2DVf8Q.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import 'marked';
import 'sanitize-html';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const user = page.data.user;
  const validation_flow = data.validation_flow;
  canPerformAction({
    user,
    action: "change",
    model: "validationflow",
    domain: validation_flow.folder.id
  });
  const isApprover = String(user.id) === String(validation_flow.approver?.id);
  const isRequester = String(user.id) === String(validation_flow.requester?.id);
  const modelDisplayNames = {
    compliance_assessments: complianceassessments1(),
    risk_assessments: riskassessments1(),
    business_impact_analysis: businessimpactanalysis2(),
    crq_studies: quantitativeriskstudies2(),
    ebios_studies: ebiosrmstudies3(),
    entity_assessments: entityassessments1(),
    findings_assessments: findingsassessments1(),
    evidences: evidences(),
    security_exceptions: securityexceptions1(),
    policies: policies()
  };
  const modelUrlNames = {
    compliance_assessments: "compliance-assessments",
    risk_assessments: "risk-assessments",
    business_impact_analysis: "business-impact-analysis",
    crq_studies: "quantitative-risk-studies",
    ebios_studies: "ebios-rm",
    entity_assessments: "entity-assessments",
    findings_assessments: "findings-assessments",
    evidences: "evidences",
    security_exceptions: "security-exceptions",
    policies: "policies"
  };
  const statusColors = {
    submitted: "bg-blue-100 text-blue-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    revoked: "bg-gray-100 text-gray-800",
    expired: "bg-orange-100 text-orange-800",
    dropped: "bg-gray-100 text-gray-800",
    change_requested: "bg-yellow-100 text-yellow-800"
  };
  const each_array_1 = ensure_array_like(Object.entries(validation_flow));
  $$payload.out += `<div class="flex flex-col space-y-4"><div class="card px-6 py-4 bg-white shadow-lg"><div class="flex justify-between items-start mb-4"><div class="flex flex-col space-y-2"><h1 class="text-2xl font-bold">${escape_html(validation_flow.str)}</h1> <span${attr_class(`badge ${stringify(statusColors[validation_flow.status] || "bg-gray-100 text-gray-800")} px-3 py-1 rounded-full text-sm font-medium w-fit`)}>${escape_html(safeTranslate(validation_flow.status))}</span></div> <div class="flex flex-col space-y-2">`;
  if (validation_flow.status === "submitted" && isApprover) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-wrap gap-2"><button type="button" class="btn preset-filled-success-500" data-testid="approve-button"><i class="fa-solid fa-check mr-2"></i> ${escape_html(approve())}</button> <button type="button" class="btn preset-filled-error-500" data-testid="reject-button"><i class="fa-solid fa-times mr-2"></i> ${escape_html(reject())}</button> <button type="button" class="btn preset-filled-warning-500" data-testid="request-changes-button"><i class="fa-solid fa-pencil mr-2"></i> ${escape_html(requestchanges1())}</button> <button type="button" class="btn preset-filled-surface-500" data-testid="drop-button"><i class="fa-solid fa-trash mr-2"></i> ${escape_html(drop())}</button></div>`;
  } else if (validation_flow.status === "accepted" && isApprover) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<button type="button" class="btn preset-filled-warning-500" data-testid="revoke-button"><i class="fa-solid fa-ban mr-2"></i> ${escape_html(revoke())}</button>`;
  } else if (validation_flow.status === "change_requested" && isRequester) {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<div class="flex flex-wrap gap-2"><button type="button" class="btn preset-filled-primary-500" data-testid="resubmit-button"><i class="fa-solid fa-paper-plane mr-2"></i> ${escape_html(resubmit())}</button> <button type="button" class="btn preset-filled-surface-500" data-testid="drop-button"><i class="fa-solid fa-trash mr-2"></i> ${escape_html(drop())}</button></div>`;
  } else if (["rejected", "revoked", "expired", "dropped"].includes(validation_flow.status)) {
    $$payload.out += "<!--[3-->";
    $$payload.out += `<div class="text-sm text-gray-500 italic">${escape_html(noactionsavailableforthisstatus5())}</div>`;
  } else if (validation_flow.status === "submitted" && isRequester) {
    $$payload.out += "<!--[4-->";
    $$payload.out += `<div class="flex flex-col gap-2"><button type="button" class="btn preset-filled-surface-500" data-testid="drop-button"><i class="fa-solid fa-trash mr-2"></i> ${escape_html(drop())}</button> <div class="alert bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded-lg text-xs"><i class="fa-solid fa-info-circle mr-2"></i> ${escape_html(onlyapprovercanmodify3())}</div></div>`;
  } else if (validation_flow.status === "submitted") {
    $$payload.out += "<!--[5-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg text-sm"><i class="fa-solid fa-exclamation-triangle mr-2"></i> ${escape_html(onlyapprovercanmodify3())}</div>`;
  } else if (validation_flow.status === "change_requested") {
    $$payload.out += "<!--[6-->";
    $$payload.out += `<div class="alert bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg text-sm"><i class="fa-solid fa-exclamation-triangle mr-2"></i> ${escape_html(onlyrequestercanmodify3())}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(domain())}</div> <div class="text-sm text-gray-600">`;
  Anchor($$payload, {
    href: `/folders/${stringify(validation_flow.folder.id)}`,
    class: "anchor",
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(validation_flow.folder.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> `;
  if (validation_flow.filtering_labels && validation_flow.filtering_labels.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(validation_flow.filtering_labels);
    $$payload.out += `<div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(filteringlabels1())}</div> <div class="flex flex-wrap gap-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let label = each_array[$$index];
      Anchor($$payload, {
        href: `/filtering-labels/${stringify(label.id)}`,
        class: "anchor",
        children: ($$payload2) => {
          $$payload2.out += `<span class="badge preset-tonal-primary px-2 py-1 rounded text-xs">${escape_html(label.str)}</span>`;
        },
        $$slots: { default: true }
      });
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(requester())}</div> <div class="text-sm text-gray-600">`;
  if (validation_flow.requester) {
    $$payload.out += "<!--[-->";
    if (validation_flow.requester.first_name || validation_flow.requester.last_name) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(validation_flow.requester.first_name)}
							${escape_html(validation_flow.requester.last_name)} <span class="text-gray-500">(${escape_html(validation_flow.requester.email)})</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(validation_flow.requester.email)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `--`;
  }
  $$payload.out += `<!--]--></div></div> <div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(approver())}</div> <div class="text-sm text-gray-600">`;
  if (validation_flow.approver) {
    $$payload.out += "<!--[-->";
    if (validation_flow.approver.first_name || validation_flow.approver.last_name) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(validation_flow.approver.first_name)}
							${escape_html(validation_flow.approver.last_name)} <span class="text-gray-500">(${escape_html(validation_flow.approver.email)})</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(validation_flow.approver.email)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `--`;
  }
  $$payload.out += `<!--]--></div></div> `;
  if (validation_flow.validation_deadline) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(validationdeadline1())}</div> <div class="text-sm text-gray-600">${escape_html(formatDateOrDateTime(validation_flow.validation_deadline, getLocale()))}</div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(createdat1())}</div> <div class="text-sm text-gray-600">${escape_html(formatDateOrDateTime(validation_flow.created_at, getLocale()))}</div></div> <div class="space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(updatedat1())}</div> <div class="text-sm text-gray-600">${escape_html(formatDateOrDateTime(validation_flow.updated_at, getLocale()))}</div></div></div> `;
  if (validation_flow.request_notes) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="mt-4 space-y-2"><div class="text-sm font-medium text-gray-700">${escape_html(requestnotes1())}</div> <div class="p-3 bg-gray-50 rounded-lg text-sm">`;
    MarkdownRenderer($$payload, { content: validation_flow.request_notes });
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="card px-6 py-4 bg-white shadow-lg mb-4"><h2 class="text-xl font-semibold mb-4">${escape_html(associatedobjects1())}</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let [key, value] = each_array_1[$$index_2];
    if (Array.isArray(value) && value.length > 0 && modelDisplayNames[key]) {
      $$payload.out += "<!--[-->";
      const each_array_2 = ensure_array_like(value);
      $$payload.out += `<div class="space-y-2"><h3 class="text-sm font-medium text-gray-700">${escape_html(modelDisplayNames[key])}</h3> <div class="space-y-2"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let item = each_array_2[$$index_1];
        $$payload.out += `<div class="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"><div class="flex items-start justify-between gap-2 mb-2">`;
        Anchor($$payload, {
          href: `/${stringify(modelUrlNames[key])}/${stringify(item.id)}`,
          class: "anchor text-sm font-medium",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(item.str)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----> `;
        if (item.status) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span${attr_class(`badge ${stringify(statusColors[item.status] || "bg-gray-100 text-gray-800")} px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0`)}>${escape_html(safeTranslate(item.status))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div> <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">`;
        if (item.perimeter) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex items-center gap-1"><i class="fa-solid fa-draw-polygon text-gray-400"></i> <span>${escape_html(perimeter())}:</span> `;
          Anchor($$payload, {
            href: `/perimeters/${stringify(item.perimeter.id)}`,
            class: "anchor",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(item.perimeter.str)}`;
            },
            $$slots: { default: true }
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (item.updated_at) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="flex items-center gap-1"><i class="fa-solid fa-clock text-gray-400"></i> <span>${escape_html(lastupdate1())}:</span> <span>${escape_html(formatDateOrDateTime(item.updated_at, getLocale()))}</span></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div></div>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div></div> `;
  if (validation_flow.events && validation_flow.events.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_3 = ensure_array_like(validation_flow.events);
    $$payload.out += `<div class="card px-6 py-4 bg-white shadow-lg"><h2 class="text-xl font-semibold mb-4">${escape_html(eventshistory1())}</h2> <div class="space-y-4"><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let event = each_array_3[$$index_3];
      $$payload.out += `<div class="border-l-4 border-primary-500 pl-4 py-2"><div class="flex justify-between items-start mb-2"><div><span${attr_class(`badge ${stringify(statusColors[event.event_type] || "bg-gray-100 text-gray-800")} px-2 py-1 rounded text-xs font-medium mr-2`)}>${escape_html(safeTranslate(event.event_type))}</span> <span class="text-sm font-medium text-gray-700">`;
      if (event.event_actor) {
        $$payload.out += "<!--[-->";
        if (event.event_actor.first_name || event.event_actor.last_name) {
          $$payload.out += "<!--[-->";
          $$payload.out += `${escape_html(event.event_actor.first_name)}
										${escape_html(event.event_actor.last_name)}`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `${escape_html(event.event_actor.email)}`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></span></div> <div class="text-xs text-gray-500">${escape_html(formatDateOrDateTime(event.created_at, getLocale()))}</div></div> `;
      if (event.event_notes) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="text-sm text-gray-600">`;
        MarkdownRenderer($$payload, { content: event.event_notes });
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-HVHOOM9F.js.map
