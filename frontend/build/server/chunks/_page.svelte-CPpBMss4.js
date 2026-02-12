import { p as push, O as copy_payload, P as assign_payload, a as pop, W as ensure_array_like, V as escape_html, T as attr, X as stringify, S as attr_class } from './index2-9icAqEyj.js';
import { d7 as appliedcontrols1, df as complianceassessments1, cw as assets, dg as riskassessments1, dh as findingsassessments1, pA as tasktemplate1, fh as assignedto1, oe as unassigned, AP as occurrenceduedate2, v6 as relatedto1, Is as expectedevidence1, zI as pending, Ko as done, BR as noevidences1, cr as observation, cf as status, FO as inprogress1, RR as cancelled, Pb as completed, Ez as legacyevidencefield2, h8 as tasknodelegacyevidence3 } from './_index-DEXNURl5.js';
import { A as Anchor } from './Anchor-BbSdvrYd.js';
import { T as TableMarkdownField } from './TableMarkdownField-C98PgJKs.js';
import { i as invalidateAll } from './client2-CItqzqlw.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import './string-BMZjP7XX.js';
import 'marked';
import './crud-a52dcxCi.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BMNt81Gy.js';
import './constants-BZXIbVIt.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './stores-CMqbeBUT.js';
import './schemas-BcDBvyDd.js';
import './breadcrumbs-CG0qNTv3.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './exports-CA5lG8jS.js';
import './index-CRjgakYW.js';
import './state.svelte-B6YM-9h0.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './legacy-server-DMdb6ZTL.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './client-DqP3yP6V.js';
import './shared-server-BU2DVf8Q.js';

function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  getModalStore();
  let taskNode = data.data;
  async function submitObservationChange(observation2) {
    const formData = new FormData();
    formData.append("observation", observation2);
    const response = await fetch(`?/updateObservation`, { method: "POST", body: formData });
    if (!response.ok) {
      console.error("Failed to update observation");
      return;
    }
    invalidateAll();
  }
  const categories = [
    {
      label: appliedcontrols1(),
      items: taskNode.applied_controls,
      baseUrl: "/applied-controls"
    },
    {
      label: complianceassessments1(),
      items: taskNode.compliance_assessments,
      baseUrl: "/compliance-assessments"
    },
    {
      label: assets(),
      items: taskNode.assets,
      baseUrl: "/assets"
    },
    {
      label: riskassessments1(),
      items: taskNode.risk_assessments,
      baseUrl: "/risk-assessments"
    },
    {
      label: findingsassessments1(),
      items: taskNode.findings_assessment,
      baseUrl: "/finding-assessments"
    }
  ];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(taskNode.assigned_to);
    $$payload2.out += `<div class="bg-white p-4 m-4 shadow-sm rounded-lg space-y-6"><div class="flex flex-row justify-between"><div class="space-y-1"><p class="text-gray-700 text-md font-medium tracking-wide">${escape_html(tasktemplate1())}</p> `;
    Anchor($$payload2, {
      class: "text-md px-1.5 py-0.5 rounded anchor font-semibold hover:underline",
      href: `/task-templates/${taskNode.task_template.id}/`,
      children: ($$payload3) => {
        $$payload3.out += `<!---->${escape_html(taskNode.task_template.folder.str)}/${escape_html(taskNode.task_template.str)}`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> <div class="space-y-1"><p class="text-gray-700 text-md font-medium tracking-wide">${escape_html(assignedto1())}</p> <div class="flex flex-col">`;
    if (each_array.length !== 0) {
      $$payload2.out += "<!--[-->";
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let user = each_array[$$index];
        Anchor($$payload2, {
          class: "text-md px-1.5 py-0.5 rounded anchor font-semibold hover:underline",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(user.str)}`;
          },
          $$slots: { default: true }
        });
      }
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<p class="text-md px-1.5 py-0.5 font-light italic text-gray-500">${escape_html(unassigned())}</p>`;
    }
    $$payload2.out += `<!--]--></div></div> <div class="space-y-1"><p class="text-gray-700 text-md font-medium tracking-wide">${escape_html(occurrenceduedate2())}</p> <input type="date" class="px-2 py-1 border rounded text-md font-semibold"${attr("value", taskNode.due_date)}/></div></div> `;
    if (categories.some((cat) => cat.items?.length > 0)) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(categories);
      $$payload2.out += `<div><p class="text-gray-700 text-md font-medium mb-2">${escape_html(relatedto1())}</p> <div class="grid grid-cols-2 gap-6 border rounded-lg p-4 bg-gray-50 place-items-center"><!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let cat = each_array_1[$$index_2];
        if (cat.items?.length) {
          $$payload2.out += "<!--[-->";
          const each_array_2 = ensure_array_like(cat.items);
          $$payload2.out += `<div class="flex flex-col space-y-1"><p class="text-gray-700 text-md font-medium tracking-wide">${escape_html(cat.label)}</p> <!--[-->`;
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let item = each_array_2[$$index_1];
            Anchor($$payload2, {
              class: "text-md px-1.5 py-0.5 anchor font-semibold",
              href: `${stringify(cat.baseUrl)}/${stringify(item.id)}`,
              children: ($$payload3) => {
                $$payload3.out += `<!---->${escape_html(item.folder.str)}/${escape_html(item.str)}`;
              },
              $$slots: { default: true }
            });
          }
          $$payload2.out += `<!--]--></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <p class="text-gray-700 text-md font-medium mb-1">${escape_html(expectedevidence1())} `;
    if (taskNode.expected_evidence.length - taskNode.evidence_reviewed.length > 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="badge bg-amber-100 text-amber-700">${escape_html(taskNode.expected_evidence.length - taskNode.evidence_reviewed.length)}
				${escape_html(pending())}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (taskNode.evidence_reviewed.length > 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="badge bg-success-50 text-success-700">${escape_html(taskNode.evidence_reviewed.length)} ${escape_html(done())}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></p> `;
    if (taskNode.expected_evidence.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_3 = ensure_array_like(taskNode.expected_evidence);
      $$payload2.out += `<table class="ml-2"><tbody><!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let evidence = each_array_3[$$index_3];
        $$payload2.out += `<tr><td class="py-1 pr-2 w-8 text-center">`;
        if (!taskNode.evidence_reviewed.includes(evidence.id)) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<i class="fa-solid fa-clock text-amber-700"></i>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<i class="fa-solid fa-check text-success-700"></i>`;
        }
        $$payload2.out += `<!--]--></td><td class="py-1 font-semibold"><a${attr("href", `/evidences/${evidence.id}/`)} class="hover:underline">${escape_html(evidence.folder.str)}/${escape_html(evidence.str)}</a></td><td class="py-1 pl-2 w-8 text-center">`;
        if (!taskNode.evidence_reviewed.includes(evidence.id)) {
          $$payload2.out += "<!--[-->";
          if (page.data.user.permissions["add_evidencerevision"]) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<button class="text-primary-500 hover:text-primary-700"><i class="fa-solid fa-file-circle-plus"></i></button>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          const revisionId = taskNode.evidence_revisions_map?.[evidence.id];
          Anchor($$payload2, {
            href: revisionId ? `/evidence-revisions/${revisionId}/` : `/evidences/${evidence.id}/`,
            label: evidence.str,
            children: ($$payload3) => {
              $$payload3.out += `<i class="fa-solid fa-eye text-primary-500"></i>`;
            },
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!--]--></td></tr>`;
      }
      $$payload2.out += `<!--]--></tbody></table>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span class="text-md px-1.5 py-0.5 font-light italic text-gray-500">${escape_html(noevidences1())}</span>`;
    }
    $$payload2.out += `<!--]--> <div class="space-y-1"><p class="text-gray-700 text-md font-medium">${escape_html(observation())}</p> <div class="p-2 bg-gray-50 border border-gray-200 rounded">`;
    TableMarkdownField($$payload2, {
      onSave: async (observation2) => {
        submitObservationChange(observation2);
      },
      get value() {
        return taskNode.observation;
      },
      set value($$value) {
        taskNode.observation = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div> <div class="flex space-y-1 flex-col justify-self-end"><p class="text-gray-700 text-md font-medium">${escape_html(status())}</p> <!---->`;
    {
      $$payload2.out += `<div class="flex flex-wrap gap-1"><button${attr_class(`px-4 py-0.5 rounded-lg text-md border ${stringify(taskNode.status === "pending" ? "bg-amber-500 text-white border-amber-600" : "bg-white border-gray-300 text-gray-700 hover:bg-amber-50")}`)}>${escape_html(pending())}</button> <button${attr_class(`px-4 py-0.5 rounded-lg text-md border ${stringify(taskNode.status === "in_progress" ? "bg-blue-500 text-white border-blue-600" : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50")}`)}>${escape_html(inprogress1())}</button> <button${attr_class(`px-4 py-0.5 rounded-lg text-md border ${stringify(taskNode.status === "cancelled" ? "bg-error-500 text-white border-error-600" : "bg-white border-gray-300 text-gray-700 hover:bg-error-50")}`)}>${escape_html(cancelled())}</button> <button${attr_class(`px-4 py-0.5 rounded-lg text-md border ${stringify(taskNode.status === "completed" ? "bg-success-500 text-white border-success-600" : "bg-white border-gray-300 text-gray-700 hover:bg-success-50")}`)}>${escape_html(completed())}</button></div>`;
    }
    $$payload2.out += `<!----></div></div> `;
    if (taskNode.evidences.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_4 = ensure_array_like(taskNode.evidences);
      $$payload2.out += `<div class="bg-white p-4 m-4 shadow-sm rounded-lg space-y-6"><span class="text-gray-700 text-md font-medium mb-1">${escape_html(legacyevidencefield2())}</span> <p class="text-sm font-light text-gray-500 block mb-4 whitespace-pre-line">${escape_html(tasknodelegacyevidence3())} <i class="fa-solid fa-square-arrow-up-right"></i> <i class="fa-solid fa-square-minus"></i></p> <!--[-->`;
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let evidence = each_array_4[$$index_4];
        $$payload2.out += `<div class="flex flex-row items-center justify-start space-x-2 border-b pb-2 mb-2"><span class="font-semibold text-md">${escape_html(evidence.folder.str)}/${escape_html(evidence.str)}</span> `;
        Anchor($$payload2, {
          href: `/evidences/${evidence.id}/`,
          label: evidence.str,
          children: ($$payload3) => {
            $$payload3.out += `<i class="fa-solid fa-eye ml-2 text-primary-500"></i>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <button class="text-primary-500"><i class="fa-solid fa-square-arrow-up-right"></i></button> <button class="text-error-500"><i class="fa-solid fa-square-minus"></i></button></div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CPpBMss4.js.map
