import { p as push, V as escape_html, W as ensure_array_like, X as stringify, af as await_block, a as pop, S as attr_class, T as attr } from './index2-9icAqEyj.js';
import { t as tableSourceMapper, x as getOptions } from './crud-CFDLlT9z.js';
import { D as Dropdown } from './Dropdown-DMQZzGLP.js';
import { M as ModelTable } from './ModelTable-BpBYEFsc.js';
import { R as RiskMatrix } from './RiskMatrix-BFYZlZcu.js';
import { R as RecursiveTreeView } from './RecursiveTreeView-CzjuAGIL.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { bo as description, cQ as provider, Ac as packager, cz as version, wl as publicationdate1, L1 as dependencies, OB as copyright, tu as riskmatrices1, vz as referencecontrols1, cT as threats, dK as framework, F as loading } from './_index-Syqrsmaf.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { e as getRequirementTitle } from './helpers-Bm9n0CNG.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-QzmVibOJ.js';
import './shared-server-BU2DVf8Q.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './i18n-B-ZrD2ao.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index4-CU0xjTbD.js';
import './machine.svelte-CNa8MjEx.js';
import './Popover-PelKNyF8.js';
import './index8-L4CsUepF.js';
import './Anchor-Bg6KSJgL.js';
import './breadcrumbs-Cdf8pK7r.js';
import './access-control-DaLcieub.js';
import './Form-DhMvl6-W.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-DOKttf10.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';
import 'marked';
import 'sanitize-html';

function TreeViewItemContent($$payload, $$props) {
  push();
  let {
    ref_id,
    name,
    description: description2,
    threats: threats2 = [],
    reference_controls = [],
    children,
    assessable,
    questions = {},
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const node = {
    ref_id,
    name,
    description: description2,
    threats: threats2,
    reference_controls,
    children,
    assessable,
    questions,
    ...rest
  };
  const getAssessableNodes = (startNode, assessableNodes = []) => {
    if (startNode.assessable) assessableNodes.push(startNode);
    if (startNode.children) {
      for (const value of Object.values(startNode.children)) {
        getAssessableNodes(value, assessableNodes);
      }
    }
    return assessableNodes;
  };
  getAssessableNodes(node);
  const title = getRequirementTitle(ref_id, name);
  let showInfo = false;
  let classesShowInfo = (show) => "hidden" ;
  let classesShowInfoText = (show) => show ? "text-primary-500" : "";
  $$payload.out += `<div><span class="whitespace-pre-line" style="font-weight: 300;"><span class="max-w-[80ch]">`;
  if (title || description2) {
    $$payload.out += "<!--[-->";
    if (title) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span style="font-weight: 600;">${escape_html(title)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (description2) {
      $$payload.out += "<!--[-->";
      MarkdownRenderer($$payload, { content: description2 });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (node?.questions && Object.keys(node.questions).length > 0) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `${escape_html(Object.entries(node?.questions)[0][1].text)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span></span> `;
  if (threats2 && threats2.length > 0 || reference_controls && reference_controls.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div role="button" tabindex="0"${attr_class(`underline text-sm hover:text-primary-400 ${stringify(classesShowInfoText(showInfo))}`)}><i class="text-xs fa-solid fa-info-circle"></i> Learn more</div> <div${attr_class(`card p-2 preset-tonal-primary border border-primary-500 text-sm flex flex-row cursor-auto ${stringify(classesShowInfo())}`)}><div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Suggested reference controls</p> `;
    if (reference_controls.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>--</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(getOptions({
        objects: reference_controls,
        extra_fields: [["folder", "str"]],
        label: "auto"
      }));
      $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let func = each_array[$$index];
        $$payload.out += `<li><p>${escape_html(func.label)}</p></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Threats covered</p> `;
    if (threats2.length === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p>--</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(threats2);
      $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let threat = each_array_1[$$index_1];
        $$payload.out += `<li>`;
        if (threat.id) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<a class="anchor"${attr("href", `/threats/${stringify(threat.id)}`)}>${escape_html(threat.name)}</a>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<p>${escape_html(threat.name)}</p>`;
        }
        $$payload.out += `<!--]--></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const showRisks = true;
  const libraryObjects = data?.library?.objects ?? [];
  const riskMatrices = libraryObjects["risk_matrix"] ?? [];
  const referenceControls = libraryObjects["reference_controls"] ?? [];
  const threats$1 = libraryObjects["threats"] ?? [];
  const framework$1 = libraryObjects["framework"];
  function transformToTreeView(nodes) {
    return nodes.map(([id, node]) => {
      return {
        id,
        content: TreeViewItemContent,
        contentProps: node,
        children: node.children ? transformToTreeView(Object.entries(node.children)) : []
      };
    });
  }
  const riskMatricesTable = {
    head: { name: "name", description: "description" },
    body: tableSourceMapper(riskMatrices, ["name", "description"]),
    meta: { count: riskMatrices.length }
  };
  const referenceControlsTable = {
    head: {
      ref_id: "ref",
      name: "name",
      description: "description",
      category: "category",
      csf_function: "csfFunction"
    },
    body: tableSourceMapper(referenceControls, [
      "ref_id",
      "name",
      "description",
      "category",
      "csf_function"
    ]),
    meta: { count: referenceControls.length }
  };
  const threatsTable = {
    head: {
      ref_id: "ref",
      name: "name",
      description: "description"
    },
    body: tableSourceMapper(threats$1, ["ref_id", "name", "description"]),
    meta: { count: threats$1.length }
  };
  function riskMatricesPreview(riskMatrices2) {
    let riskMatricesDumps = [];
    for (const riskMatrix of riskMatrices2) {
      const riskMatrixDump = {
        json_definition: JSON.stringify(riskMatrix)
      };
      riskMatricesDumps.push(riskMatrixDump);
    }
    return riskMatricesDumps;
  }
  $$payload.out += `<div class="card bg-white p-4 shadow-sm space-y-4"><div class="flex flex-col space-y-2"><span class="w-full flex flex-row justify-between"><h1 class="font-medium text-xl">${escape_html(data.library.name)}</h1></span> <div class="space-y-1"><p class="text-md leading-5 text-gray-700"><strong>${escape_html(description())}</strong>: ${escape_html(data.library.description)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(provider())}</strong>: ${escape_html(data.library.provider)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(packager())}</strong>: ${escape_html(data.library.packager)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(version())}</strong>: ${escape_html(data.library.version)}</p> `;
  if (data.library.publication_date) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-md leading-5 text-gray-700"><strong>${escape_html(publicationdate1())}</strong>: ${escape_html(formatDateOrDateTime(data.library.publication_date, getLocale()))}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.library.dependencies) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.library.dependencies);
    $$payload.out += `<p class="text-md leading-5 text-gray-700"><strong>${escape_html(dependencies())}</strong>:</p> <ul class="list-disc list-inside"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let dependency = each_array[$$index];
      $$payload.out += `<li>${escape_html(dependency.name)}</li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (data.library.copyright) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-md leading-5 text-gray-700"><strong>${escape_html(copyright())}</strong>: ${escape_html(data.library.copyright)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> `;
  if (riskMatrices.length > 0) {
    $$payload.out += "<!--[-->";
    Dropdown($$payload, {
      open: riskMatrices.length == 1,
      style: "hover:text-indigo-700",
      icon: "fa-solid fa-table-cells-large",
      header: `${stringify(riskMatrices.length)} ${stringify(riskmatrices1())}`,
      children: ($$payload2) => {
        const each_array_1 = ensure_array_like(riskMatricesPreview(riskMatrices));
        ModelTable($$payload2, {
          source: riskMatricesTable,
          displayActions: false,
          pagination: false,
          rowCount: false,
          rowsPerPage: false,
          search: false,
          interactive: false
        });
        $$payload2.out += `<!----> <!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let riskMatrix = each_array_1[$$index_1];
          RiskMatrix($$payload2, {
            riskMatrix,
            showLegend: showRisks,
            wrapperClass: "mt-8"
          });
        }
        $$payload2.out += `<!--]-->`;
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (referenceControls.length > 0) {
    $$payload.out += "<!--[-->";
    Dropdown($$payload, {
      style: "hover:text-indigo-700",
      icon: "fa-solid fa-gears",
      header: `${stringify(referenceControls.length)} ${stringify(referencecontrols1())}`,
      children: ($$payload2) => {
        ModelTable($$payload2, {
          source: referenceControlsTable,
          displayActions: false,
          pagination: false,
          rowCount: false,
          rowsPerPage: false,
          search: false,
          interactive: false
        });
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (threats$1.length > 0) {
    $$payload.out += "<!--[-->";
    Dropdown($$payload, {
      style: "hover:text-indigo-700",
      icon: "fa-solid fa-biohazard",
      header: `${stringify(threats$1.length)} ${stringify(threats())}`,
      children: ($$payload2) => {
        ModelTable($$payload2, {
          source: threatsTable,
          displayActions: false,
          pagination: false,
          rowCount: false,
          rowsPerPage: false,
          search: false,
          interactive: false
        });
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (framework$1) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h4 class="h4 font-medium">${escape_html(framework())}</h4> `;
    await_block(
      $$payload,
      data.tree,
      () => {
        $$payload.out += `<span data-testid="loading-field">${escape_html(loading())}...</span>`;
      },
      (tree) => {
        RecursiveTreeView($$payload, {
          nodes: transformToTreeView(Object.entries(tree)),
          hover: "hover:bg-initial"
        });
      }
    );
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DoR3R2pH.js.map
