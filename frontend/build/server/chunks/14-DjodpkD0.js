import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { t as tableSourceMapper, g as getModelInfo } from './crud-Dl9mduNa.js';
import { a as loadValidationFlowFormData } from './load-y7adB23o.js';
import { m as modelSchema } from './schemas-5y-ookeO.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './index2-9icAqEyj.js';
import './legacy-server-DMdb6ZTL.js';
import './_index-CqZWReca.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './stores-D-WMoATo.js';
import './stores2-D1NYwn5V.js';
import './i18n-DuIONS9Q.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import './client.svelte-CxCno2aW.js';
import './stores3-psVfZSQ7.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './access-control-DaLcieub.js';
import './app-Ci0UE2-c.js';
import './index-BWA_9C9m.js';

const load = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/risk-assessments/${params.id}/`;
  const risk_assessment = await fetch(endpoint).then((res) => res.json());
  const scenarios = await fetch(`${BASE_API_URL}/risk-scenarios/?risk_assessment=${params.id}`).then((res) => res.json()).then((res) => res.results);
  const risk_matrix = await fetch(
    `${BASE_API_URL}/risk-matrices/${risk_assessment.risk_matrix.id}/`
  ).then((res) => res.json());
  const interface_settings = await fetch(`${BASE_API_URL}/settings/general/object/`).then(
    (res) => res.json()
  );
  const headFields = [
    "ref_id",
    "name",
    "threats",
    "inherentLevel",
    "existingControls",
    "currentLevel",
    "withinTolerance",
    "extraAppliedControls",
    "residualLevel"
  ];
  const bodyFields = [
    "ref_id",
    "name",
    "threats",
    "inherent_level",
    "existing_applied_controls",
    "current_level",
    "within_tolerance",
    "applied_controls",
    "residual_level"
  ];
  const headData = bodyFields.reduce((obj, key, index) => {
    obj[key] = headFields[index];
    return obj;
  }, {});
  const scenariosTable = {
    head: headData,
    body: tableSourceMapper(scenarios, bodyFields),
    meta: scenarios
  };
  risk_assessment.risk_scenarios = scenarios;
  risk_assessment.risk_matrix = risk_matrix;
  const deleteSchema = objectType({ id: stringType() });
  const scenarioDeleteForm = await superValidate(zod(deleteSchema));
  const scenarioSchema = modelSchema("risk-scenarios");
  const initialData = {
    risk_assessment: params.id
  };
  const scenarioCreateForm = await superValidate(initialData, zod(scenarioSchema), {
    errors: false
  });
  const scenarioModel = getModelInfo("risk-scenarios");
  const selectOptions = {};
  if (scenarioModel.selectFields) {
    for (const selectField of scenarioModel.selectFields) {
      const url = `${BASE_API_URL}/risk-scenarios/${selectField.field}/`;
      const response = await fetch(url);
      if (response.ok) {
        selectOptions[selectField.field] = await response.json().then(
          (data) => Object.entries(data).map(([key, value]) => ({
            label: value,
            value: selectField.valueType === "number" ? parseInt(key) : key
          }))
        );
      } else {
        console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
      }
    }
  }
  scenarioModel.selectOptions = selectOptions;
  const riskAssessmentSchema = modelSchema("risk-assessments");
  const initialDataDuplicate = {
    name: risk_assessment.name,
    description: risk_assessment.description,
    version: risk_assessment.version
  };
  const riskAssessmentDuplicateForm = await superValidate(
    initialDataDuplicate,
    zod(riskAssessmentSchema),
    {
      errors: false
    }
  );
  const riskAssessmentModel = getModelInfo("risk-assessments");
  const { validationFlowForm, validationFlowModel } = await loadValidationFlowFormData({
    event: { fetch },
    folderId: risk_assessment.folder.id,
    targetField: "risk_assessments",
    targetIds: [params.id]
  });
  return {
    risk_assessment,
    scenarioModel,
    scenariosTable,
    scenarioDeleteForm,
    scenarioCreateForm,
    riskAssessmentDuplicateForm,
    riskAssessmentModel,
    validationFlowForm,
    validationFlowModel,
    title: risk_assessment.str,
    useBubbles: interface_settings.interface_agg_scenario_matrix
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-4V-_rMCU.js')).default;
const server_id = "src/routes/(app)/(internal)/risk-assessments/[id=uuid]/+layout.server.ts";
const imports = ["_app/immutable/nodes/14.DZPoDZpG.js","_app/immutable/chunks/GWrdd0wS.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/2pWo5_dW.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Ck4BDG7B.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-DjodpkD0.js.map
