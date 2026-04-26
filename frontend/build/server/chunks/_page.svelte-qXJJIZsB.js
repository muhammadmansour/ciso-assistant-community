import { p as push, V as escape_html, S as attr_class, X as stringify, W as ensure_array_like, a as pop, T as attr } from './index2-9icAqEyj.js';
import { vL as refidsemicolon3, KX as domainsemicolon2, vG as referenceentitysemicolon3, fY as ebiosrmmatrixhelptext4, w6 as quotationmethodsemicolon3, fZ as activityone1, Cm as nodescription1, cF as authors, Bm as objectsnotvisible2, Cu as noauthor1, cH as reviewers, BY as noreviewer1, f_ as activitytwo1, cM as observation, C6 as noobservation1, sh as selectasset1, Hk as gobacktoebiosrmstudy5, e as edit } from './_index-DZs3gE-i.js';
import { s as safeTranslate } from './i18n-MfjzxjGF.js';
import { p as page } from './index3-BwfRm5YV.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './crud-DvwwKulO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tabs } from './index7-DCQNjP6g.js';
import './runtime-B_ICGJZJ.js';
import './constants-B8vm30bZ.js';
import { A as Anchor } from './Anchor-L6GP3zar.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './stores-CMqbeBUT.js';
import './schemas-QFT6TgyO.js';
import './breadcrumbs-CnPDyFos.js';
import { M as ModelTable } from './ModelTable-CONiCTnn.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { c as countMasked } from './related-visibility-ukSq_O7b.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import './index-server-DEEfjxiI.js';
import './app-Ci0UE2-c.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './legacy-server-DMdb6ZTL.js';
import './helpers-Bm9n0CNG.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './machine.svelte-CNa8MjEx.js';
import './shared-server-BU2DVf8Q.js';
import './Popover-PelKNyF8.js';
import './index8-L4CsUepF.js';
import './Form-s4NDhsV8.js';
import './datetime-CDLVyquZ.js';
import './zod-BTgf12zS.js';
import './DeleteConfirmModal-KBvf9zHE.js';

function _page($$payload, $$props) {
  push();
  getModalStore();
  const statusMap = {
    planned: "bg-indigo-300 text-indigo-800",
    in_progress: "bg-yellow-300 text-yellow-800",
    in_review: "bg-cyan-300 text-cyan-800",
    done: "bg-lime-300 text-lime-800",
    deprecated: "bg-orange-300 text-orange-800"
  };
  let { data } = $$props;
  const ebiosRmStudy = data.data;
  let activeActivity = null;
  page.url.searchParams.forEach((value, key) => {
    if (key === "activity" && value === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value === "two") {
      activeActivity = "two";
    }
  });
  let group = Object.keys(data.relatedModels)[0];
  const user = page.data.user;
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: data.model.name,
    domain: data.model.name === "folder" ? data.data.id : data.data.folder?.id ?? data.data.folder ?? user.root_folder_id
  });
  $$payload.out += `<div class="card p-4 bg-white shadow-lg"><div class="flex flex-col space-y-4"><div class="flex flex-row justify-between items-center w-full">`;
  Anchor($$payload, {
    breadcrumbAction: "push",
    href: `/ebios-rm/${data.data.id}`,
    class: "flex items-center space-x-2 text-primary-800 hover:text-primary-600",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-arrow-left"></i> <p>${escape_html(gobacktoebiosrmstudy5())}</p>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="flex items-center space-x-2">`;
  if (ebiosRmStudy.ref_id) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="badge bg-pink-200 text-pink-800 font-medium">${escape_html(refidsemicolon3())}
						${escape_html(ebiosRmStudy.ref_id)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span class="text-2xl font-bold">${escape_html(ebiosRmStudy.name)} - v${escape_html(ebiosRmStudy.version)}</span> <span${attr_class(`badge text-xs ${stringify(statusMap[ebiosRmStudy.status])}`)}>${escape_html(safeTranslate(ebiosRmStudy.status))}</span></div> `;
  if (canEditObject) {
    $$payload.out += "<!--[-->";
    Anchor($$payload, {
      href: `${page.url.pathname}/edit?activity=${activeActivity}&next=${page.url.pathname}?activity=${activeActivity}`,
      class: "btn preset-filled-primary-500 h-fit",
      children: ($$payload2) => {
        $$payload2.out += `<i class="fa-solid fa-pen-to-square mr-2" data-testid="edit-button"></i> ${escape_html(edit())}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="flex justify-center items-center w-full gap-5"><span class="text-sm text-gray-500">${escape_html(domainsemicolon2())} `;
  Anchor($$payload, {
    class: "anchor",
    href: `/folders/${stringify(ebiosRmStudy.folder.id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(ebiosRmStudy.folder.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></span> <span class="text-sm text-gray-500">${escape_html(referenceentitysemicolon3())} `;
  Anchor($$payload, {
    class: "anchor",
    href: `/entities/${stringify(ebiosRmStudy.reference_entity.id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(ebiosRmStudy.reference_entity.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></span> <span class="text-sm text-gray-500">${escape_html(ebiosrmmatrixhelptext4())} `;
  Anchor($$payload, {
    class: "anchor",
    href: `/risk-matrices/${stringify(ebiosRmStudy.risk_matrix.id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(ebiosRmStudy.risk_matrix.str)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></span> <span class="text-sm text-gray-500">${escape_html(quotationmethodsemicolon3())} <span class="font-bold">${escape_html(safeTranslate(ebiosRmStudy.quotation_method))}</span></span></div> <div id="activityOne"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</span> `;
  if (ebiosRmStudy.description) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-600 text-justify w-full">`;
    MarkdownRenderer($$payload, { content: ebiosRmStudy.description });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(nodescription1())}</p>`;
  }
  $$payload.out += `<!--]--> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-user text-purple-500"></i> <span>${escape_html(authors())}</span></h3> `;
  if (ebiosRmStudy.authors && countMasked(ebiosRmStudy.authors) > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert text-yellow-700 mb-2"><i class="fa-solid fa-triangle-exclamation"></i> <span>${escape_html(objectsnotvisible2({ count: countMasked(ebiosRmStudy.authors) }))}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <ul class="list-disc list-inside text-gray-600">`;
  if (ebiosRmStudy.authors?.length) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(ebiosRmStudy.authors);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let author = each_array[$$index];
      if (author.id && author.str) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<li>`;
        Anchor($$payload, {
          class: "anchor",
          href: `/users/${stringify(author.id)}`,
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(author.str)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></li>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<li>${escape_html(noauthor1())}</li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-users text-blue-500"></i> <span>${escape_html(reviewers())}</span></h3> `;
  if (ebiosRmStudy.reviewers && countMasked(ebiosRmStudy.reviewers) > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert text-yellow-700 mb-2"><i class="fa-solid fa-triangle-exclamation"></i> <span>${escape_html(objectsnotvisible2({ count: countMasked(ebiosRmStudy.reviewers) }))}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <ul class="list-disc list-inside text-gray-600">`;
  if (ebiosRmStudy.reviewers?.length) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(ebiosRmStudy.reviewers);
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let reviewer = each_array_1[$$index_1];
      if (reviewer.id && reviewer.str) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<li>`;
        Anchor($$payload, {
          class: "anchor",
          href: `/users/${stringify(reviewer.id)}`,
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(reviewer.str)}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----></li>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<li>${escape_html(noreviewer1())}</li>`;
  }
  $$payload.out += `<!--]--></ul></div></div> <div id="activityTwo"${attr_class(`relative p-4 space-y-4 rounded-md w-full flex flex-col items-center ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><span${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</span> `;
  if (Object.keys(data.relatedModels).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card shadow-lg mt-8 bg-white w-full">`;
    {
      let list = function($$payload2) {
        const each_array_2 = ensure_array_like(Object.entries(data.relatedModels));
        $$payload2.out += `<!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let [urlmodel, model] = each_array_2[$$index_2];
          $$payload2.out += `<!---->`;
          Tabs.Control($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<!---->${escape_html(safeTranslate(model.info.localNamePlural))} `;
              if (model.table.body.length > 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<span class="badge preset-tonal-secondary">${escape_html(model.table.body.length)}</span>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      }, content = function($$payload2) {
        const each_array_3 = ensure_array_like(Object.entries(data.relatedModels));
        $$payload2.out += `<!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let [urlmodel, model] = each_array_3[$$index_3];
          $$payload2.out += `<!---->`;
          Tabs.Panel($$payload2, {
            value: urlmodel,
            children: ($$payload3) => {
              $$payload3.out += `<div class="flex flex-row justify-between px-4 py-2"><h4 class="font-semibold lowercase capitalize-first my-auto">${escape_html(safeTranslate("associated-" + model.info.localNamePlural))}</h4></div> `;
              if (model.table) {
                $$payload3.out += "<!--[-->";
                {
                  let selectButton = function($$payload4) {
                    $$payload4.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block p-3 btn-mini-secondary w-12 focus:relative" data-testid="select-button"${attr("title", selectasset1())}><i class="fa-solid fa-hand-pointer"></i></button></span></div>`;
                  }, addButton = function($$payload4) {
                    $$payload4.out += `<div><span class="inline-flex overflow-hidden rounded-md border bg-white shadow-xs"><button class="inline-block border-e p-3 btn-mini-primary w-12 focus:relative" data-testid="add-button"${attr("title", safeTranslate("add-" + data.model.localName))}><i class="fa-solid fa-file-circle-plus"></i></button></span></div>`;
                  };
                  ModelTable($$payload3, {
                    source: model.table,
                    deleteForm: model.deleteForm,
                    URLModel: urlmodel,
                    canSelectObject: canEditObject,
                    baseEndpoint: `/assets?ebios_rm_studies=${stringify(page.params.id)}`,
                    disableDelete: true,
                    selectButton,
                    addButton,
                    $$slots: { selectButton: true, addButton: true }
                  });
                }
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Tabs($$payload, {
        value: group,
        onValueChange: (e) => {
          group = e.value;
        },
        listJustify: "justify-center",
        list,
        content,
        $$slots: { list: true, content: true }
      });
    }
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="w-full p-4 bg-gray-50 border rounded-md shadow-xs"><h3 class="font-semibold text-lg text-gray-700 flex items-center space-x-2"><i class="fa-solid fa-eye text-gray-500 opacity-75"></i> <span>${escape_html(observation())}</span></h3> `;
  if (ebiosRmStudy.observation) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-600">`;
    MarkdownRenderer($$payload, { content: ebiosRmStudy.observation });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-gray-600">${escape_html(noobservation1())}</p>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-qXJJIZsB.js.map
