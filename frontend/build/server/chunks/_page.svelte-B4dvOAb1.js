import { p as push, R as bind_props, a as pop, X as stringify, V as escape_html, T as attr, M as store_get, S as attr_class, Z as attr_style, Q as unsubscribe_stores } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { A as AutocompleteSelect } from './crud-T40TopyM.js';
import { F as Form } from './Form-CU-l-bUF.js';
import { S as Select } from './Select-MWTH723S.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as superForm, f as formFieldProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { T as TextField } from './TextField-CLkXNHcD.js';
import { M as MarkdownField } from './MarkdownField-BFmeXBjN.js';
import { bj as taintedformmessage2, cy as perimeter, cs as riskassessment1, cB as riskmatrix1, cU as owner, oD as treatmentstatus1, cu as refid1, fM as name, bo as description, cR as assets, cT as threats, c8 as vulnerabilities, c4 as securityexceptions1, ci as riskoriginhelptext3, cS as riskorigin1, Vm as antecedentscenarioshelptext3, Vn as antecedentscenarios1, c6 as inherentrisk1, FG as inherentproba1, FI as inherentimpact1, O0 as currentrisk1, IE as existingcontrolshelper2, hH as existingcontrols1, tn as riskoptionhelper2, O2 as currentproba1, O8 as currentimpact1, un as residualrisk1, Id as extracontrolshelper2, Ie as extraappliedcontrols2, up as residualproba1, uu as residualimpact1, fq as qualifications, qP as strengthofknowledge2, kj as justification, br as labels, bs as labelshelptext2, bp as cancel, bq as save, FF as inherentrisklevel2, c5 as inherentrisklevelhelptext4, N_ as currentrisklevel2, NY as currentrisklevelhelptext4, uk as residualrisklevel2, uj as residualrisklevelhelptext4 } from './_index-B12BAPce.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { g as getSecureRedirect, b as isDark } from './helpers-Bm9n0CNG.js';
import { p as page } from './index3-BwfRm5YV.js';
import './runtime-BKo9q3Zd.js';
import 'marked';
import './constants-QzmVibOJ.js';
import { A as Anchor } from './Anchor-B1pWCcQZ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './stores-D-WMoATo.js';
import { m as modelSchema } from './schemas-DWhEPmW4.js';
import './breadcrumbs-B1Us7xd5.js';
import { s as safeTranslate } from './i18n-D3bRixKV.js';
import './index-server-DEEfjxiI.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './index-CRjgakYW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './client2-CItqzqlw.js';
import './app-Ci0UE2-c.js';
import './client-DqP3yP6V.js';
import './shared-server-BU2DVf8Q.js';

function RiskLevel($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    label = void 0,
    field,
    helpText = void 0,
    riskMatrix,
    probabilityField,
    impactField,
    form
  } = $$props;
  const { value: probabilityValue } = formFieldProxy(form, probabilityField);
  const { value: impactValue } = formFieldProxy(form, impactField);
  const gridPosition = (probabilityValue2, impactValue2) => {
    if (probabilityValue2 === void 0 || impactValue2 === void 0 || probabilityValue2 < 0 || probabilityValue2 > riskMatrix.grid.length || impactValue2 < 0 || impactValue2 > riskMatrix.grid[0].length) {
      return void 0;
    }
    return riskMatrix.grid[probabilityValue2][impactValue2];
  };
  let riskLevel = store_get($$store_subs ??= {}, "$probabilityValue", probabilityValue) >= 0 && store_get($$store_subs ??= {}, "$impactValue", impactValue) >= 0 ? riskMatrix.risk[gridPosition(store_get($$store_subs ??= {}, "$probabilityValue", probabilityValue), store_get($$store_subs ??= {}, "$impactValue", impactValue))] : void 0;
  run(() => {
    riskLevel = store_get($$store_subs ??= {}, "$probabilityValue", probabilityValue) >= 0 && store_get($$store_subs ??= {}, "$impactValue", impactValue) >= 0 ? riskMatrix.risk[gridPosition(store_get($$store_subs ??= {}, "$probabilityValue", probabilityValue), store_get($$store_subs ??= {}, "$impactValue", impactValue))] : void 0;
  });
  let classesCellText = (backgroundHexColor) => {
    return isDark(backgroundHexColor) ? "text-white" : "";
  };
  $$payload.out += `<div class="flex flex-col">`;
  if (label !== void 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (riskLevel) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(`flex font-medium w-32 justify-center p-2 rounded-base ${stringify(classesCellText(riskLevel.hexcolor))}`)}${attr_style(`background-color: ${stringify(riskLevel.hexcolor)}`)}>${escape_html(safeTranslate(riskLevel.name))}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex font-medium w-32 justify-center p-2 rounded-base bg-gray-300">--</div>`;
  }
  $$payload.out += `<!--]--> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500 w-64">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data, form = void 0 } = $$props;
  const schema = modelSchema(data.model.urlModel);
  const strengthOfKnowledgeFormChoices = Object.entries(data.strengthOfKnowledgeChoices).map(([key, value]) => ({ label: value.name, value: parseInt(key) })).sort((a, b) => a.value - b.value);
  getModalStore();
  const _form = superForm(data.form, {
    dataType: "json",
    invalidateAll: true,
    applyAction: true,
    resetForm: false,
    validators: zod(schema),
    taintedMessage: taintedformmessage2(),
    validationMethod: "auto"
  });
  run(() => {
    if (form?.newControl) {
      _form.form.update((current) => form?.newControl?.field ? {
        ...current,
        [form?.newControl?.field]: [
          ...current[form?.newControl?.field],
          form?.newControl?.appliedControl
        ]
      } : current);
      form = null;
    }
  });
  const next = getSecureRedirect(page.url.searchParams.get("next"));
  const probabilityColorMap = data.riskMatrix.probability.map((probability) => probability.hexcolor);
  const impactColorMap = data.riskMatrix.impact.map((impact) => impact.hexcolor);
  $$payload.out += `<div>`;
  Form($$payload, {
    class: "flex flex-col space-y-3",
    data: data.form,
    dataType: "json",
    _form,
    validators: zod(schema),
    action: `?/updateRiskScenario&next=${stringify(next)}`,
    children: ($$payload2) => {
      $$payload2.out += `<div class="flex flex-row space-x-2"><div class="card p-2 bg-white shadow-lg w-1/2"><div class="flex justify-between p-2"><div><p class="text-sm font-semibold text-gray-400">${escape_html(perimeter())}</p> `;
      Anchor($$payload2, {
        class: "anchor text-sm font-semibold",
        href: `/perimeters/${stringify(data.scenario.perimeter.id)}`,
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(data.scenario.perimeter.str)}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(riskassessment1())}</p> `;
      Anchor($$payload2, {
        class: "anchor text-sm font-semibold",
        href: `/risk-assessments/${stringify(data.scenario.risk_assessment.id)}`,
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(data.scenario.risk_assessment.name)} ${escape_html(data.scenario.version)}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div> <div><p class="text-sm font-semibold text-gray-400">${escape_html(riskmatrix1())}</p> `;
      Anchor($$payload2, {
        class: "anchor text-sm font-semibold",
        href: `/risk-matrices/${stringify(data.scenario.risk_matrix.id)}`,
        target: "_blank",
        rel: "noopener noreferrer",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(data.scenario.risk_matrix.str)}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></div></div> <div class="card px-4 py-2 bg-white shadow-lg w-1/2"><div class="flex flex-row justify-between items-stretch"><div class="px-2 w-2/3">`;
      AutocompleteSelect($$payload2, {
        form: _form,
        baseClass: "flex-1",
        multiple: true,
        optionsEndpoint: "actors",
        optionsLabelField: "str",
        optionsInfoFields: {
          fields: [{ field: "type", translate: true }],
          position: "prefix"
        },
        field: "owner",
        label: owner()
      });
      $$payload2.out += `<!----></div> <div class="w-1/3">`;
      Select($$payload2, {
        class: "flex-1",
        form: _form,
        options: data.treatmentChoices,
        field: "treatment",
        label: treatmentstatus1()
      });
      $$payload2.out += `<!----></div></div></div></div> <div class="flex flex-row space-x-2 min-h-72"><div class="card px-4 py-2 bg-white shadow-lg space-y-4 w-5/12"><span class="flex flex-row space-x-2">`;
      TextField($$payload2, {
        form: _form,
        field: "ref_id",
        label: refid1()
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form: _form,
        field: "name",
        label: name(),
        classesContainer: "w-full"
      });
      $$payload2.out += `<!----></span> `;
      MarkdownField($$payload2, {
        form: _form,
        field: "description",
        rows: 6,
        label: description()
      });
      $$payload2.out += `<!----></div> <div class="card px-4 py-2 bg-white shadow-lg w-7/12 max-h-96 overflow-y-auto">`;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form: _form,
        optionsEndpoint: "assets",
        optionsLabelField: "auto",
        optionsExtraFields: [["folder", "str"]],
        optionsInfoFields: {
          fields: [{ field: "type" }],
          classes: "text-blue-500"
        },
        field: "assets",
        optionsDetailedUrlParameters: [
          [
            "scope_folder_id",
            page.data.scenario.perimeter.folder.id
          ]
        ],
        label: assets()
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form: _form,
        multiple: true,
        optionsEndpoint: "threats",
        optionsDetailedUrlParameters: [
          [
            "scope_folder_id",
            page.data.scenario.perimeter.folder.id
          ]
        ],
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "threats",
        label: threats()
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form: _form,
        optionsEndpoint: "vulnerabilities",
        optionsDetailedUrlParameters: [
          [
            "scope_folder_id",
            page.data.scenario.perimeter.folder.id
          ]
        ],
        optionsExtraFields: [["folder", "str"]],
        field: "vulnerabilities",
        label: vulnerabilities()
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form: _form,
        optionsEndpoint: "security-exceptions",
        optionsExtraFields: [["folder", "str"]],
        field: "security_exceptions",
        label: securityexceptions1()
      });
      $$payload2.out += `<!----></div></div> <div class="flex flex-row space-x-2"><div class="card px-4 py-2 bg-white shadow-lg w-1/2">`;
      AutocompleteSelect($$payload2, {
        form: _form,
        nullable: true,
        optionsEndpoint: "terminologies?field_path=ro_to.risk_origin&is_visible=true",
        optionsLabelField: "translated_name",
        field: "risk_origin",
        label: riskorigin1(),
        helpText: riskoriginhelptext3()
      });
      $$payload2.out += `<!----></div> <div class="card px-4 py-2 bg-white shadow-lg w-1/2">`;
      AutocompleteSelect($$payload2, {
        form: _form,
        multiple: true,
        optionsEndpoint: "risk-scenarios",
        optionsExtraFields: [
          ["risk_assessment", "str"],
          ["ref_id", "str"]
        ],
        optionsDetailedUrlParameters: [["exclude", data.scenario.id]],
        optionsLabelField: "auto",
        field: "antecedent_scenarios",
        label: antecedentscenarios1(),
        helpText: antecedentscenarioshelptext3()
      });
      $$payload2.out += `<!----></div></div> <input type="hidden" name="urlmodel"${attr("value", data.model.urlModel)}/> `;
      if (page.data?.featureflags?.inherent_risk) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="card px-4 py-2 bg-white shadow-lg"><h4 class="h4 font-black mb-2">${escape_html(inherentrisk1())}</h4> <div class="flex flex-row space-x-8 justify-between"><div class="flex w-1/2"><div class="flex flex-row space-x-4 my-auto"><div class="min-w-36">`;
        Select($$payload2, {
          form: _form,
          options: data.probabilityChoices,
          color_map: probabilityColorMap,
          field: "inherent_proba",
          label: inherentproba1()
        });
        $$payload2.out += `<!----></div> <i class="fa-solid fa-xmark mt-8"></i> <div class="min-w-36">`;
        Select($$payload2, {
          form: _form,
          options: data.impactChoices,
          color_map: impactColorMap,
          field: "inherent_impact",
          label: inherentimpact1()
        });
        $$payload2.out += `<!----></div> <i class="fa-solid fa-equals mt-8"></i> <div class="min-w-38">`;
        RiskLevel($$payload2, {
          form: _form,
          field: "inherent_risk_level",
          label: inherentrisklevel2(),
          riskMatrix: data.riskMatrix,
          probabilityField: "inherent_proba",
          impactField: "inherent_impact",
          helpText: inherentrisklevelhelptext4()
        });
        $$payload2.out += `<!----></div></div></div></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="card px-4 py-2 bg-white shadow-lg"><h4 class="h4 font-black mb-2">${escape_html(currentrisk1())}</h4> <div class="flex flex-row space-x-8 justify-between"><div class="w-1/2"><div class="flex mb-2"><div class="w-full mr-2"><!---->`;
      {
        AutocompleteSelect($$payload2, {
          multiple: true,
          form: _form,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          optionsDetailedUrlParameters: [
            [
              "scope_folder_id",
              page.data.scenario.perimeter.folder.id
            ]
          ],
          field: "existing_applied_controls",
          label: existingcontrols1(),
          helpText: existingcontrolshelper2()
        });
      }
      $$payload2.out += `<!----></div> <div class="flex items-center justify-center"><div><button class="btn bg-gray-300 h-10 w-10" type="button"><i class="fa-solid fa-plus text-sm"></i></button></div></div></div></div> <div class="flex w-1/2"><div><div class="text-xs text-slate-500 mb-4"><i class="fa-solid fa-circle-info"></i> ${escape_html(riskoptionhelper2())}</div> <div class="flex flex-row space-x-4 my-auto"><div class="min-w-36">`;
      Select($$payload2, {
        form: _form,
        options: data.probabilityChoices,
        color_map: probabilityColorMap,
        field: "current_proba",
        label: currentproba1()
      });
      $$payload2.out += `<!----></div> <i class="fa-solid fa-xmark mt-8"></i> <div class="min-w-36">`;
      Select($$payload2, {
        form: _form,
        options: data.impactChoices,
        color_map: impactColorMap,
        field: "current_impact",
        label: currentimpact1()
      });
      $$payload2.out += `<!----></div> <i class="fa-solid fa-equals mt-8"></i> <div class="min-w-38">`;
      RiskLevel($$payload2, {
        form: _form,
        field: "current_risk_level",
        label: currentrisklevel2(),
        riskMatrix: data.riskMatrix,
        probabilityField: "current_proba",
        impactField: "current_impact",
        helpText: currentrisklevelhelptext4()
      });
      $$payload2.out += `<!----></div></div></div></div></div></div> <div class="card px-4 py-2 bg-white shadow-lg"><h4 class="h4 font-black mb-2">${escape_html(residualrisk1())}</h4> <div class="flex flex-row space-x-8"><div class="w-1/2"><div class="flex"><div class="w-full mr-2"><!---->`;
      {
        AutocompleteSelect($$payload2, {
          multiple: true,
          form: _form,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          optionsDetailedUrlParameters: [
            [
              "scope_folder_id",
              page.data.scenario.perimeter.folder.id
            ]
          ],
          field: "applied_controls",
          label: extraappliedcontrols2(),
          helpText: extracontrolshelper2()
        });
      }
      $$payload2.out += `<!----></div> <div class="flex items-center justify-center"><div><button class="btn bg-gray-300 h-10 w-10" type="button"><i class="fa-solid fa-plus text-sm"></i></button></div></div></div></div> <div class="flex w-1/2"><div class="flex flex-row space-x-4 my-auto"><div class="min-w-36">`;
      Select($$payload2, {
        form: _form,
        options: data.probabilityChoices,
        color_map: probabilityColorMap,
        field: "residual_proba",
        label: residualproba1()
      });
      $$payload2.out += `<!----></div> <i class="fa-solid fa-xmark mt-8"></i> <div class="min-w-36">`;
      Select($$payload2, {
        form: _form,
        options: data.impactChoices,
        color_map: impactColorMap,
        field: "residual_impact",
        label: residualimpact1()
      });
      $$payload2.out += `<!----></div> <i class="fa-solid fa-equals mt-8"></i> <div class="min-w-38">`;
      RiskLevel($$payload2, {
        form: _form,
        field: "current_risk_level",
        label: residualrisklevel2(),
        riskMatrix: data.riskMatrix,
        probabilityField: "residual_proba",
        impactField: "residual_impact",
        helpText: residualrisklevelhelptext4()
      });
      $$payload2.out += `<!----></div></div></div></div></div> <div class="card px-4 py-2 bg-white shadow-lg"><div class="flex space-x-4 mb-1"><div class="w-1/2">`;
      AutocompleteSelect($$payload2, {
        form: _form,
        multiple: true,
        optionsEndpoint: "terminologies?field_path=qualifications&is_visible=true",
        field: "qualifications",
        label: qualifications(),
        optionsLabelField: "translated_name",
        baseClass: "flex-1"
      });
      $$payload2.out += `<!----></div> <div class="w-1/2">`;
      Select($$payload2, {
        form: _form,
        options: strengthOfKnowledgeFormChoices,
        field: "strength_of_knowledge",
        label: strengthofknowledge2(),
        class: "flex-1"
      });
      $$payload2.out += `<!----></div></div> `;
      MarkdownField($$payload2, {
        form: _form,
        field: "justification",
        label: justification()
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form: _form,
        createFromSelection: true,
        optionsEndpoint: "filtering-labels",
        optionsLabelField: "label",
        field: "filtering_labels",
        helpText: labelshelptext2(),
        label: labels(),
        translateOptions: false,
        allowUserOptions: "append"
      });
      $$payload2.out += `<!----></div> <div class="flex flex-row justify-between space-x-4"><button class="btn bg-gray-400 text-white font-semibold w-full" data-testid="cancel-button" type="button">${escape_html(cancel())}</button> <button class="btn preset-filled-primary-500 font-semibold w-full" data-testid="save-button">${escape_html(save())}</button></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { form });
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B4dvOAb1.js.map
