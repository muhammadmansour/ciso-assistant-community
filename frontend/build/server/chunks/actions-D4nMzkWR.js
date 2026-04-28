import { B as BASE_API_URL } from './constants-lv6aycRl.js';
import { g as getModelInfo, a as urlParamModelVerboseName } from './crud-CUvW5I-u.js';
import { a1 as successfullydeletedobject2, a2 as successfullycreatedobject2, L as successfullyupdatedobject2 } from './_index-D7NdhnXA.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { m as modelSchema } from './schemas-DwUKC0vK.js';
import { f as fail, r as redirect } from './index-BWA_9C9m.js';
import { s as setFlash } from './server-C682bpHT.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './formData-Dnvf_dKY.js';
import { s as superValidate, m as message, a as setError } from './superValidate-BmtJFExL.js';
import { o as objectType, s as stringType } from './string-BMZjP7XX.js';
import { z as zod } from './zod-BTgf12zS.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';

function getHTTPMethod({
  action,
  fileFields
}) {
  if (action === "create") return "POST";
  return Object.keys(fileFields).length > 0 ? "PATCH" : "PUT";
}
function getSuccessMessage({ action, urlModel }) {
  const modelVerboseName = urlModel ? urlParamModelVerboseName(urlModel) : "";
  if (action === "create") {
    return successfullycreatedobject2({
      object: safeTranslate(modelVerboseName).toLowerCase()
    });
  }
  if (action === "edit") {
    return successfullyupdatedobject2({
      object: safeTranslate(modelVerboseName).toLowerCase()
    });
  }
}
function getEndpoint({
  action,
  urlModel,
  event
}) {
  const model = getModelInfo(urlModel);
  if (action === "create") {
    return model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/` : `${BASE_API_URL}/${urlModel}/`;
  }
  const id = event.url.searchParams.get("id") || event.params.id;
  return model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/${id}/` : `${BASE_API_URL}/${urlModel}/${id}/`;
}
async function handleErrorResponse({
  event,
  response,
  form
}) {
  const contentType = response.headers.get("content-type") || "";
  let res;
  if (contentType.includes("application/json")) {
    try {
      res = await response.json();
    } catch (e) {
      console.error("Failed to parse error response as JSON:", e);
      setFlash({ type: "error", message: `Server error (${response.status})` }, event);
      return message(form, { status: response.status });
    }
  } else {
    console.error("Non-JSON error response:", response.status, response.statusText);
    setFlash({ type: "error", message: `Server error (${response.status})` }, event);
    return message(form, { status: response.status });
  }
  console.error(res);
  if (res.label) {
    res["filtering_labels"] = res.label;
  }
  if (res.warning) {
    setFlash({ type: "warning", message: safeTranslate(res.warning) }, event);
    return message(form, { warning: res.warning });
  }
  if (res.error || res.detail) {
    setFlash({ type: "error", message: safeTranslate(res.error || res.detail) }, event);
    return message(form, { error: res.error || res.detail });
  }
  Object.entries(res).forEach(([key, value]) => {
    setError(form, key, safeTranslate(value));
  });
  return message(form, { status: response.status });
}
async function defaultWriteFormAction({
  event,
  urlModel,
  action,
  doRedirect = true,
  redirectToWrittenObject = false
}) {
  const formData = await event.request.formData();
  if (!formData) {
    return fail(400, { form: null });
  }
  const schema = modelSchema(urlModel);
  const form = await superValidate(formData, zod(schema));
  if (!form.valid) {
    console.error(form.errors);
    return message(form, { status: 400 });
  }
  const endpoint = getEndpoint({ action, urlModel, event });
  const model = getModelInfo(urlModel);
  const fileFields = Object.fromEntries(
    Object.entries(form.data).filter(([key]) => model.fileFields?.includes(key) ?? false)
  );
  if (action === "create" && urlModel === "evidences") {
    const hasValidFile = Object.values(fileFields).some(
      (file) => file && file.size > 0
    );
    if (!hasValidFile) {
      setFlash({ type: "error", message: safeTranslate("attachmentRequired") }, event);
      setError(form, "attachment", safeTranslate("attachmentRequired"));
      return message(form, { status: 400 });
    }
  }
  Object.keys(fileFields).forEach((key) => {
    form.data[key] = void 0;
  });
  const requestInitOptions = {
    method: getHTTPMethod({ action, fileFields }),
    body: JSON.stringify(form.data)
  };
  const res = await event.fetch(endpoint, requestInitOptions);
  if (!res.ok) return await handleErrorResponse({ event, response: res, form });
  const writtenObject = await res.json();
  if (fileFields) {
    let fileUploadSuccess = true;
    let fileUploadError = null;
    for (const [fieldName, file] of Object.entries(fileFields)) {
      if (!file) continue;
      if (file.size <= 0) continue;
      const fileUploadEndpoint = `${BASE_API_URL}/${urlModel}/${writtenObject.id}/upload/`;
      const fileUploadRequestInitOptions = {
        headers: {
          "Content-Disposition": `attachment; filename=${encodeURIComponent(file.name)}`
        },
        method: "POST",
        body: file
      };
      const fileUploadRes = await event.fetch(fileUploadEndpoint, fileUploadRequestInitOptions);
      if (!fileUploadRes.ok) {
        fileUploadSuccess = false;
        fileUploadError = fileUploadRes;
        break;
      }
    }
    if (!fileUploadSuccess && fileUploadError) {
      const deleteEndpoint = `${BASE_API_URL}/${urlModel}/${writtenObject.id}/`;
      await event.fetch(deleteEndpoint, { method: "DELETE" });
      setFlash({ type: "error", message: safeTranslate("fileUploadFailed") }, event);
      return await handleErrorResponse({ event, response: fileUploadError, form });
    }
  }
  let flashParams = {
    type: "success",
    message: getSuccessMessage({ urlModel, action })
  };
  if (urlModel == "users") {
    flashParams.type = "warning", flashParams.message += safeTranslate("userHasNoRights");
  }
  setFlash(flashParams, event);
  const next = getSecureRedirect(event.url.searchParams.get("next"));
  if (next && doRedirect) redirect(302, next);
  if (redirectToWrittenObject) {
    return message(form, { redirect: `/${urlModel}/${writtenObject.id}` });
  }
  return message(form, { object: writtenObject });
}
async function nestedWriteFormAction({
  event,
  action,
  redirectToWrittenObject = false
}) {
  const request = event.request.clone();
  const formData = await request.formData();
  const urlModel = formData.get("urlmodel");
  return defaultWriteFormAction({
    event,
    urlModel,
    action,
    doRedirect: false,
    redirectToWrittenObject
  });
}
async function defaultDeleteFormAction({
  event,
  urlModel
}) {
  const formData = await event.request.formData();
  const schema = objectType({ id: stringType().uuid() });
  const deleteForm = await superValidate(formData, zod(schema));
  const model = getModelInfo(urlModel);
  const id = deleteForm.data.id;
  const endpoint = model.endpointUrl ? `${BASE_API_URL}/${model.endpointUrl}/${id}/` : `${BASE_API_URL}/${model.urlModel}/${id}/`;
  if (!deleteForm.valid) {
    console.error(deleteForm.errors);
    return message(deleteForm, { status: 400 });
  }
  const requestInitOptions = {
    method: "DELETE"
  };
  const res = await event.fetch(endpoint, requestInitOptions);
  if (!res.ok) {
    const response = await res.json();
    if (response.error) {
      const errorMessages = Array.isArray(response.error) ? response.error : [response.error];
      errorMessages.forEach((error) => {
        setFlash({ type: "error", message: safeTranslate(error) }, event);
      });
      return message(deleteForm, { status: res.status });
    }
    if (response.non_field_errors) {
      setError(deleteForm, "non_field_errors", response.non_field_errors);
    }
    return message(deleteForm, { status: res.status });
  }
  setFlash(
    {
      type: "success",
      message: successfullydeletedobject2({
        object: safeTranslate(model.localName).toLowerCase()
      })
    },
    event
  );
  return message(deleteForm, { status: res.status });
}
async function nestedDeleteFormAction({ event }) {
  const request = event.request.clone();
  const formData = await request.formData();
  const urlModel = formData.get("urlmodel");
  return defaultDeleteFormAction({ event, urlModel });
}

export { nestedWriteFormAction as a, defaultWriteFormAction as b, defaultDeleteFormAction as d, handleErrorResponse as h, nestedDeleteFormAction as n };
//# sourceMappingURL=actions-D4nMzkWR.js.map
