import { p as push, S as attr_class, V as escape_html, X as stringify, T as attr, W as ensure_array_like, a as pop, a6 as props_id, _ as spread_attributes } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-CkUgDz5l.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { A as Anchor } from './Anchor-C2rLUn2N.js';
import { PR as checklistprogress1, bo as description, dB as complianceassessments1, dC as riskassessments1, cc as quantitativeriskstudies2, dI as ebiosrmstudies2, hZ as entityassessments1, dD as findingsassessments1, cW as evidences, c4 as securityexceptions1, h_ as policies, Tc as associatedobjects1 } from './_index-CqZWReca.js';
import { s as safeTranslate } from './i18n-DuIONS9Q.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { c as connect, m as machine } from './index6-Cn6jj1jH.js';
import { u as useMachine, h as normalizeProps } from './machine.svelte-CNa8MjEx.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Form-BuUIlHHA.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-Dnvf_dKY.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './helpers-Bm9n0CNG.js';
import './crud-Dl9mduNa.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-lv6aycRl.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './stores-D-WMoATo.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-DCQNjP6g.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import './string-BMZjP7XX.js';
import './schemas-BOdIHh1e.js';
import './breadcrumbs-D1ratxIQ.js';
import './ModelTable-D9-j7Xao.js';
import './Popover-PelKNyF8.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-C22czeYM.js';
import 'marked';
import 'sanitize-html';

function Progress($$payload, $$props) {
  push();
  const id = props_id($$payload);
  const {
    // Root
    base = "flex items-center gap-4",
    height = "h-2",
    width = "w-full",
    classes = "",
    // Label
    labelBase = "whitespace-nowrap",
    labelText = "text-xs",
    labelClasses = "",
    // Track
    trackBase = "h-full w-full overflow-x-hidden",
    trackBg = "bg-surface-200-800",
    trackRounded = "rounded-base",
    trackClasses = "",
    // Meter
    meterBase = "h-full w-full",
    meterBg = "bg-surface-950-50",
    meterRounded = "rounded-base",
    meterTransition = "transition-[width]",
    meterAnimate = "animate-progress-indeterminate",
    meterClasses = "",
    // Snippets
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const service = useMachine(machine, () => ({ id, ...zagProps }));
  const api = connect(service, normalizeProps);
  const rxIndeterminate = api.indeterminate ? meterAnimate : "";
  $$payload.out += `<figure${spread_attributes(
    {
      ...api.getRootProps(),
      class: `${stringify(base)} ${stringify(height)} ${stringify(width)} ${stringify(classes)}`,
      "data-testid": "progress"
    },
    null
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...api.getLabelProps(),
        class: `${stringify(labelBase)} ${stringify(labelText)} ${stringify(labelClasses)}`,
        "data-testid": "progress-label"
      },
      null
    )}>`;
    children($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${spread_attributes(
    {
      ...api.getTrackProps(),
      class: `${stringify(trackBase)} ${stringify(trackBg)} ${stringify(trackRounded)} ${stringify(trackClasses)}`,
      "data-testid": "progress-track"
    },
    null
  )}><div${spread_attributes(
    {
      ...api.getRangeProps(),
      class: `${stringify(meterBase)} ${stringify(meterBg)} ${stringify(meterRounded)} ${stringify(meterTransition)} ${stringify(rxIndeterminate)} ${stringify(meterClasses)}`,
      "data-testid": "progress-meter"
    },
    null
  )}></div></div></figure>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const accreditation = data.data;
  const collection = accreditation.collection_data;
  const collectionSections = [
    {
      key: "compliance_assessments",
      label: complianceassessments1(),
      urlPattern: "/compliance-assessments/"
    },
    {
      key: "risk_assessments",
      label: riskassessments1(),
      urlPattern: "/risk-assessments/"
    },
    {
      key: "crq_studies",
      label: quantitativeriskstudies2(),
      urlPattern: "/quantitative-risk-studies/"
    },
    {
      key: "ebios_studies",
      label: ebiosrmstudies2(),
      urlPattern: "/ebios-rm/"
    },
    {
      key: "entity_assessments",
      label: entityassessments1(),
      urlPattern: "/entity-assessments/"
    },
    {
      key: "findings_assessments",
      label: findingsassessments1(),
      urlPattern: "/findings-assessments/"
    },
    {
      key: "documents",
      label: evidences(),
      urlPattern: "/evidences/"
    },
    {
      key: "security_exceptions",
      label: securityexceptions1(),
      urlPattern: "/security-exceptions/"
    },
    {
      key: "policies",
      label: policies(),
      urlPattern: "/policies/"
    }
  ];
  const statusColorMap = {
    draft: "bg-gray-300 text-gray-800",
    accredited: "bg-green-300 text-green-800",
    not_accredited: "bg-red-300 text-red-800",
    obsolete: "bg-orange-300 text-orange-800"
  };
  const categoryColorMap = {
    acc_simplified: "bg-blue-300 text-blue-800",
    acc_elaborated: "bg-indigo-300 text-indigo-800",
    acc_advanced: "bg-purple-300 text-purple-800",
    acc_sensitive: "bg-pink-300 text-pink-800",
    acc_restricted: "bg-red-300 text-red-800",
    other: "bg-gray-300 text-gray-800"
  };
  let checklistProgress = accreditation.checklist_progress ?? 0;
  {
    let actions = function($$payload2) {
      $$payload2.out += `<div class="flex flex-col space-y-2"></div>`;
    };
    DetailView($$payload, { data, actions, $$slots: { actions: true } });
  }
  $$payload.out += `<!----> <div class="card bg-white p-6 m-4 shadow-sm relative"><div class="absolute top-6 right-6 flex flex-col items-end gap-2"><div class="flex gap-2"><span${attr_class(`badge text-xs ${stringify(categoryColorMap[accreditation.category] || categoryColorMap.other)}`)}>${escape_html(safeTranslate(accreditation.category))}</span> <span${attr_class(`badge text-xs ${stringify(statusColorMap[accreditation.status] || statusColorMap.draft)}`)}>${escape_html(safeTranslate(accreditation.status))}</span></div> `;
  if (accreditation.checklist) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", `/compliance-assessments/${stringify(accreditation.checklist.id)}`)} class="w-48 block hover:opacity-80 transition-opacity cursor-pointer" title="View compliance assessment"><div class="flex items-center justify-between mb-1"><span class="text-xs font-semibold text-gray-700">${escape_html(checklistprogress1())}</span> <span class="text-xs text-gray-600">${escape_html(checklistProgress)}%</span></div> `;
    Progress($$payload, {
      value: checklistProgress,
      max: 100,
      height: "h-1.5",
      meter: "bg-primary-500"
    });
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mb-6 pr-48"><h2 class="text-2xl font-semibold">${escape_html(accreditation.name)}</h2> `;
  if (accreditation.ref_id) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-600 mt-1">${escape_html(accreditation.ref_id)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="grid grid-cols-2 gap-6"><div><h3 class="text-sm font-semibold text-gray-700 mb-2">${escape_html(description())}</h3> <div class="prose prose-sm max-w-none text-gray-900">`;
  if (accreditation.description) {
    $$payload.out += "<!--[-->";
    MarkdownRenderer($$payload, { content: accreditation.description });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic">No description provided</p>`;
  }
  $$payload.out += `<!--]--></div></div> <div><h3 class="text-sm font-semibold text-gray-700 mb-2">Observation</h3> <div class="prose prose-sm max-w-none text-gray-900">`;
  if (accreditation.observation) {
    $$payload.out += "<!--[-->";
    MarkdownRenderer($$payload, { content: accreditation.observation });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-400 italic">No observation provided</p>`;
  }
  $$payload.out += `<!--]--></div></div></div> `;
  if (collection) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(collectionSections);
    $$payload.out += `<div class="mt-8 pt-6 border-t border-gray-200"><h3 class="text-lg font-semibold text-gray-800 mb-4">${escape_html(associatedobjects1())}</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array[$$index_1];
      const items = collection[section.key];
      if (items && items.length > 0) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(items);
        $$payload.out += `<div class="bg-gray-50 rounded-lg p-4"><h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">${escape_html(section.label)} <span class="badge preset-tonal-secondary text-xs">${escape_html(items.length)}</span></h4> <ul class="space-y-2"><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let item = each_array_1[$$index];
          $$payload.out += `<li class="text-sm">`;
          Anchor($$payload, {
            href: `${stringify(section.urlPattern)}${stringify(item.id)}`,
            class: "text-primary-600 hover:text-primary-800 hover:underline",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(item.str || item.name || item.id)}`;
            },
            $$slots: { default: true }
          });
          $$payload.out += `<!----></li>`;
        }
        $$payload.out += `<!--]--></ul></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> `;
    if (!collectionSections.some((s) => collection[s.key]?.length > 0)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="text-gray-400 italic text-sm">No associated objects in this collection</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-0RRMePYf.js.map
