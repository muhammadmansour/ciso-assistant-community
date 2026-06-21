import { B as BASE_API_URL, U as UUID_REGEX } from './constants-CbUNxZZz.js';
import { l as listViewFields, g as getModelInfo, a as urlParamModelVerboseName } from './crud-DzBk-fdF.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { m as modelSchema } from './schemas-BwimqDbp.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { s as superValidate } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType, Z as ZodOptional, a as ZodNullable, b as ZodArray } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';

const loadValidationFlowFormData = async ({
  event,
  folderId,
  targetField,
  targetIds
}) => {
  const validationFlowSchema = modelSchema("validation-flows");
  const validationFlowInitialData = {
    folder: folderId,
    [targetField]: targetIds,
    ref_id: ""
  };
  const validationFlowForm = await superValidate(
    validationFlowInitialData,
    zod(validationFlowSchema),
    { errors: false }
  );
  const validationFlowModel = getModelInfo("validation-flows");
  const validationFlowSelectOptions = {};
  if (validationFlowModel.selectFields) {
    await Promise.all(
      validationFlowModel.selectFields.map(async (selectField) => {
        const url = `${BASE_API_URL}/validation-flows/${selectField.field}/`;
        const response = await event.fetch(url);
        if (response.ok) {
          validationFlowSelectOptions[selectField.field] = await response.json().then(
            (data) => Object.entries(data).map(([key, value]) => ({
              label: value,
              value: selectField.valueType === "number" ? parseInt(key) : key
            }))
          );
        } else {
          console.error(`Failed to fetch data for ${selectField.field}: ${response.statusText}`);
        }
      })
    );
  }
  validationFlowModel.selectOptions = validationFlowSelectOptions;
  return { validationFlowForm, validationFlowModel };
};
const loadDetail = async ({ event, model, id }) => {
  const endpoint = `${BASE_API_URL}/${model.endpointUrl ?? model.urlModel}/${id}/`;
  const res = await event.fetch(endpoint);
  const data = await res.json();
  const form = await superValidate(zod(objectType({ id: stringType().uuid() })));
  const relatedModels = {};
  if (model.reverseForeignKeyFields) {
    const initialData = {};
    await Promise.all(
      model.reverseForeignKeyFields.filter(
        (m) => !m?.folderPermsNeeded || canPerformAction({
          user: event.locals.user,
          action: "change",
          model: "folder",
          domain: model.name === "folder" ? data.id : data.folder?.id ?? data.folder ?? event.locals.user.root_folder_id
        })
      ).map(async (e) => {
        if (e.urlModel === "perimeters" && model.urlModel === "folders" && data.content_type === "GLOBAL")
          return;
        const tableFieldsRef = listViewFields[e.urlModel];
        const tableFields = {
          head: [...tableFieldsRef.head],
          body: [...tableFieldsRef.body]
        };
        const index = tableFields.body.indexOf(e.field);
        if (index > -1) {
          tableFields.head.splice(index, 1);
          tableFields.body.splice(index, 1);
        }
        const headData = tableFields.body.reduce((obj, key, index2) => {
          obj[key] = index2 < tableFields.head.length ? tableFields.head[index2] : key;
          return obj;
        }, {});
        const table = {
          head: headData,
          body: [],
          meta: []
        };
        const info = getModelInfo(e.urlModel);
        const urlModel = e.urlModel;
        const deleteForm = await superValidate(zod(objectType({ id: stringType().uuid() })));
        const createSchema = modelSchema(e.urlModel);
        const fieldSchema = createSchema.shape[e.field];
        let isArrayField = false;
        if (fieldSchema) {
          let currentSchema = fieldSchema;
          while (currentSchema instanceof ZodOptional || currentSchema instanceof ZodNullable) {
            currentSchema = currentSchema._def.innerType;
          }
          isArrayField = currentSchema instanceof ZodArray;
        }
        initialData[e.field] = isArrayField ? [data.id] : data.id;
        if (data.ebios_rm_study) {
          initialData["ebios_rm_study"] = data.ebios_rm_study.id;
        }
        if (data.folder) {
          if (!new RegExp(UUID_REGEX).test(data.folder) && !data?.folder?.id) {
            const objectEndpoint = `${endpoint}object/`;
            const objectResponse = await event.fetch(objectEndpoint);
            const objectData = await objectResponse.json();
            initialData["folder"] = objectData.folder;
          } else {
            initialData["folder"] = data?.folder?.id ?? data.folder;
          }
        }
        if (e.fieldForInitialData) {
          e.fieldForInitialData.forEach((fieldPath) => {
            const parts = fieldPath.split(".");
            let value = data;
            for (const part of parts) {
              value = value?.[part];
              if (!value) break;
            }
            if (value) {
              initialData[`_${fieldPath.replace(".", "_")}`] = value;
            }
          });
        }
        const createForm = await superValidate(initialData, zod(createSchema), { errors: false });
        const selectOptions = {};
        if (info.selectFields) {
          await Promise.all(
            info.selectFields.map(async (selectField) => {
              let url = `${BASE_API_URL}/${info.endpointUrl || info.urlModel}/${selectField.field}/`;
              if (selectField.formNestedField && selectField.detail === true) {
                url = `${BASE_API_URL}/${selectField.endpointUrl}/${initialData[selectField.formNestedField]}/${selectField.field}/`;
              }
              const response = await event.fetch(url);
              if (response.ok) {
                selectOptions[selectField.field] = await response.json().then(
                  (data2) => Object.entries(data2).map(([key, value]) => ({
                    label: value,
                    value: selectField.valueType === "number" ? parseInt(key) : key
                  }))
                );
              } else {
                console.error(
                  `Failed to fetch data for ${selectField.field}: ${response.statusText}`
                );
              }
            })
          );
        }
        relatedModels[e.urlModel] = {
          urlModel,
          info,
          table,
          deleteForm,
          createForm,
          selectOptions,
          initialData,
          disableCreate: e.disableCreate,
          disableDelete: e.disableDelete,
          disableEdit: e.disableEdit
        };
      })
    );
  }
  return {
    data,
    title: data.str || data.name || data.email || data.label || data.id,
    form,
    relatedModels,
    urlModel: model.urlModel,
    model,
    modelVerboseName: urlParamModelVerboseName(model.urlModel)
  };
};

export { loadValidationFlowFormData as a, loadDetail as l };
//# sourceMappingURL=load-AOnXJHgd.js.map
