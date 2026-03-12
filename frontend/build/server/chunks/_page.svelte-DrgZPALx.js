import { p as push, V as escape_html, W as ensure_array_like, X as stringify, af as await_block, a as pop } from './index2-9icAqEyj.js';
import { t as tableSourceMapper } from './crud-BJ_TECqM.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './index3-BwfRm5YV.js';
import { D as Dropdown } from './Dropdown-DMQZzGLP.js';
import { M as ModelTable } from './ModelTable-BZ-7wwsg.js';
import { R as RiskMatrix } from './RiskMatrix-BcT8PHGu.js';
import { R as RecursiveTreeView } from './RecursiveTreeView-CzjuAGIL.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { bo as description, cQ as provider, As as packager, cz as version, wy as publicationdate1, Ln as dependencies, OZ as copyright, br as labels, tA as riskmatrices1, vK as referencecontrols1, cT as threats, Do as metricdefinitions1, dK as framework, G as loading } from './_index-DZs3gE-i.js';
import { g as getLocale } from './runtime-B_ICGJZJ.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as TreeViewItemContent } from './TreeViewItemContent-Dbxs6yoZ.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-B8vm30bZ.js';
import './shared-server-BU2DVf8Q.js';
import './stores-CMqbeBUT.js';
import './index-CRjgakYW.js';
import './stores2-D1NYwn5V.js';
import './formData-Dnvf_dKY.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './i18n-MfjzxjGF.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './client-DqP3yP6V.js';
import './index4-CU0xjTbD.js';
import './machine.svelte-CNa8MjEx.js';
import './Popover-PelKNyF8.js';
import './index8-L4CsUepF.js';
import './Anchor-L6GP3zar.js';
import './breadcrumbs-CnPDyFos.js';
import './access-control-DaLcieub.js';
import './Form-s4NDhsV8.js';
import './related-visibility-ukSq_O7b.js';
import './string-BMZjP7XX.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-KBvf9zHE.js';
import './Tooltip-Li45R7zs.js';
import './index5-Brzv1W4u.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const showRisks = true;
  const libraryObjects = data?.library?.objects ?? [];
  const riskMatrices = libraryObjects["risk_matrix"] ?? [];
  const referenceControls = libraryObjects["reference_controls"] ?? [];
  const threats$1 = libraryObjects["threats"] ?? [];
  const metricDefinitions = libraryObjects["metric_definitions"] ?? [];
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
  const metricDefinitionsTable = {
    head: {
      ref_id: "ref",
      name: "name",
      description: "description",
      category: "category",
      unit: "unit"
    },
    body: tableSourceMapper(metricDefinitions, [
      "ref_id",
      "name",
      "description",
      "category",
      "unit"
    ]),
    meta: { count: metricDefinitions.length }
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
  let displayImportButton = !(data.library?.is_loaded || data.library?.objects?.requirement_mapping_set || data.library?.objects?.requirement_mapping_sets);
  $$payload.out += `<div class="card bg-white p-4 shadow-sm space-y-4"><div class="flex flex-col space-y-2"><span class="w-full flex flex-row justify-between"><h1 class="font-medium text-xl">${escape_html(data.library.name)}</h1> <div>`;
  if (displayImportButton) {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<form method="post" action="?/load">`;
      if (page.data.user.is_admin) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button type="submit" class="p-1 btn text-xl hover:text-primary-500" aria-label="load library"><i class="fa-solid fa-file-import"></i></button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></form>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></span> <div class="space-y-1"><p class="text-md leading-5 text-gray-700"><strong>${escape_html(description())}</strong>: ${escape_html(data.library.description)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(provider())}</strong>: ${escape_html(data.library.provider)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(packager())}</strong>: ${escape_html(data.library.packager)}</p> <p class="text-md leading-5 text-gray-700"><strong>${escape_html(version())}</strong>: ${escape_html(data.library.version)}</p> `;
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
  $$payload.out += `<!--]--> `;
  if (data.library.filtering_labels && data.library.filtering_labels.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(data.library.filtering_labels);
    $$payload.out += `<p class="text-md leading-5 text-gray-700"><strong>${escape_html(labels())}</strong>:</p> <ul class="list-disc list-inside"><!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let label = each_array_1[$$index_1];
      $$payload.out += `<li>${escape_html(label.label)}</li>`;
    }
    $$payload.out += `<!--]--></ul>`;
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
        const each_array_2 = ensure_array_like(riskMatricesPreview(riskMatrices));
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
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let riskMatrix = each_array_2[$$index_2];
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
  if (metricDefinitions.length > 0) {
    $$payload.out += "<!--[-->";
    Dropdown($$payload, {
      style: "hover:text-indigo-700",
      icon: "fa-solid fa-chart-line",
      header: `${stringify(metricDefinitions.length)} ${stringify(metricdefinitions1())}`,
      children: ($$payload2) => {
        ModelTable($$payload2, {
          source: metricDefinitionsTable,
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
//# sourceMappingURL=_page.svelte-DrgZPALx.js.map
