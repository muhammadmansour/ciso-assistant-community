import { p as push, V as escape_html, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BwfRm5YV.js';
import { M as ModelTable } from './ModelTable-2RGnpbgJ.js';
import { cd as perimeter, c8 as complianceassessment1, dp as framework, T1 as associatedevidences1, IC as evidenceshelptext2 } from './_index-DEXNURl5.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './Popover-souGUgW5.js';
import './machine.svelte-CWLOiKlV.js';
import './index-server-D2ILrLnm.js';
import './index8-BWS1s5in.js';
import '@floating-ui/dom';
import './legacy-server-DMdb6ZTL.js';
import './formData-F7m95JiK.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './stores2-D1NYwn5V.js';
import './Anchor-BbSdvrYd.js';
import './breadcrumbs-CG0qNTv3.js';
import './access-control-DaLcieub.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './crud-a52dcxCi.js';
import './stores-CMqbeBUT.js';
import './i18n-WNCV45cf.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './Form-B7HJg_JV.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const evidencesHead = {
    name: "name",
    status: "status",
    last_update: "updatedAt",
    expiry_date: "expiryDate",
    owner: "owner",
    requirement_assessments: "matchingRequirements"
  };
  const evidences = { head: evidencesHead, body: [], meta: [] };
  $$payload.out += `<div class="bg-white p-2 shadow-sm rounded-lg space-x-2 flex flex-row justify-center mb-2"><p class="font-semibold text-lg">${escape_html(perimeter())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/perimeters/${stringify(data.compliance_assessment.perimeter.id)}/`)}>${escape_html(data.compliance_assessment.perimeter.str)}</a></p> <p>/</p> <p class="font-semibold text-lg">${escape_html(complianceassessment1())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/`)}>${escape_html(data.compliance_assessment.name)} - ${escape_html(data.compliance_assessment.version)}</a></p> <p>/</p> <p class="font-semibold text-lg">${escape_html(framework())}: <a class="unstyled text-primary-500 hover:text-primary-700 cursor-pointer"${attr("href", `/frameworks/${stringify(data.compliance_assessment.framework.id)}/`)}>${escape_html(data.compliance_assessment.framework.str)}</a></p></div> <div class="flex flex-col space-y-4 bg-white p-4 shadow-sm rounded-lg space-x-2"><div><p class="text-xl font-extrabold">${escape_html(associatedevidences1())}</p> <p class="text-sm text-gray-500">${escape_html(evidenceshelptext2())}</p></div> <div>`;
  ModelTable($$payload, {
    URLModel: "evidences",
    source: evidences,
    search: true,
    rowsPerPage: true,
    orderBy: { identifier: "name", direction: "asc" },
    baseEndpoint: `/compliance-assessments/${stringify(page.params.id)}/evidences-list`,
    fields: [
      "name",
      "status",
      "last_update",
      "expiry_date",
      "owner",
      "requirement_assessments"
    ]
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DDmQ45vJ.js.map
