import { p as push, M as store_get, W as ensure_array_like, T as attr, V as escape_html, S as attr_class, Z as attr_style, X as stringify, Q as unsubscribe_stores, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { f as formFieldProxy } from './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { s as safeTranslate } from './i18n-WNCV45cf.js';
import { c as isQuestionVisible } from './helpers-Bm9n0CNG.js';
import { C5 as noanswer1 } from './_index-DEXNURl5.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { T as Tooltip } from './Tooltip-DrjF8lR0.js';

function Question($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "w-fit",
    label,
    shallow = false,
    form,
    questions = {},
    initialValue = {},
    field,
    helpText,
    onChange = () => {
    }
  } = $$props;
  const { value } = form ? formFieldProxy(form, field) : {};
  let internalAnswers = value ? store_get($$store_subs ??= {}, "$value", value) : initialValue;
  let questionBuffers = {};
  function sanitizeColor(color) {
    const validColorRegex = /^(#[0-9A-Fa-f]{3,6}|rgb\(|rgba\(|[a-z]+)$/;
    return validColorRegex.test(color) ? color : "";
  }
  const each_array = ensure_array_like(Object.entries(questions));
  $$payload.out += `<div>`;
  if (label) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label)}</label>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="control whitespace-pre-line"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
    let [urn, question] = each_array[$$index_3];
    if (isQuestionVisible(question, internalAnswers)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<li class="flex flex-col justify-between border rounded-xl px-2 pb-2"><p class="font-semibold p-2">${escape_html(question.text)} (${escape_html(safeTranslate(question.type))})</p> `;
      if (shallow) {
        $$payload.out += "<!--[-->";
        if (Array.isArray(internalAnswers[urn]) && internalAnswers[urn].length > 0) {
          $$payload.out += "<!--[-->";
          const each_array_1 = ensure_array_like(internalAnswers[urn]);
          $$payload.out += `<!--[-->`;
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let answerUrn = each_array_1[$$index];
            if (question.choices.find((choice) => choice.urn === answerUrn)) {
              $$payload.out += "<!--[-->";
              $$payload.out += `<p class="text-primary-500 font-semibold">${escape_html(question.choices.find((choice) => choice.urn === answerUrn).value)}</p>`;
            } else {
              $$payload.out += "<!--[!-->";
              $$payload.out += `<p class="text-primary-500 font-semibold">${escape_html(answerUrn)}</p>`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        } else if (question.choices?.find((choice) => choice.urn === internalAnswers[urn])) {
          $$payload.out += "<!--[1-->";
          $$payload.out += `<p class="text-primary-500 font-semibold">${escape_html(question.choices.find((choice) => choice.urn === internalAnswers[urn]).value)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<p class="text-gray-400 italic">${escape_html(noanswer1())}</p>`;
        }
        $$payload.out += `<!--]-->`;
      } else if (question.type === "unique_choice") {
        $$payload.out += "<!--[1-->";
        const each_array_2 = ensure_array_like(question.choices);
        $$payload.out += `<div class="flex flex-col gap-1 p-1 border border-surface-500 rounded-base"><!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let option = each_array_2[$$index_1];
          const selected = internalAnswers[urn] === option.urn;
          $$payload.out += `<button type="button" name="question"${attr_class(`shadow-sm p-1 rounded-base border border-gray-300 transition-all duration-150 ${stringify(selected ? "preset-filled-primary-500 rounded-base" : "bg-gray-100 rounded-base hover:bg-gray-300")}`)}${attr_style(selected ? `background-color: ${sanitizeColor(option.color) ?? ""}; color: white;` : "")}>${escape_html(option.value)} `;
          if (option.description) {
            $$payload.out += "<!--[-->";
            {
              let trigger = function($$payload2) {
                $$payload2.out += `<i class="ml-2 fa-solid fa-circle-info"></i>`;
              }, content = function($$payload2) {
                $$payload2.out += `<!---->${escape_html(option.description)}`;
              };
              Tooltip($$payload, {
                positioning: { placement: "top" },
                triggerBase: "underline",
                contentBase: "card preset-filled p-4",
                openDelay: 50,
                trigger,
                content,
                $$slots: { trigger: true, content: true }
              });
            }
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></button>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else if (question.type === "multiple_choice") {
        $$payload.out += "<!--[2-->";
        const each_array_3 = ensure_array_like(question.choices);
        $$payload.out += `<div class="flex flex-col gap-1 p-1 border border-surface-500 rounded-base"><!--[-->`;
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let option = each_array_3[$$index_2];
          const selected = Array.isArray(internalAnswers[urn]) && internalAnswers[urn].includes(option.urn);
          $$payload.out += `<button type="button" name="question"${attr_class(`shadow-sm p-1 rounded-base border border-gray-300 transition-all duration-150 ${stringify(selected ? "preset-filled-primary-500 rounded-base" : "bg-gray-100 rounded-base hover:bg-gray-300")}`)}${attr_style(selected ? `background-color: ${sanitizeColor(option.color) ?? ""}; color: white;` : "")}>${escape_html(option.value)} `;
          if (option.description) {
            $$payload.out += "<!--[-->";
            {
              let trigger = function($$payload2) {
                $$payload2.out += `<i class="ml-2 fa-solid fa-circle-info"></i>`;
              }, content = function($$payload2) {
                $$payload2.out += `<!---->${escape_html(option.description)}`;
              };
              Tooltip($$payload, {
                positioning: { placement: "top" },
                triggerBase: "underline",
                contentBase: "card preset-filled p-4",
                openDelay: 50,
                trigger,
                content,
                $$slots: { trigger: true, content: true }
              });
            }
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></button>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else if (question.type === "date") {
        $$payload.out += "<!--[3-->";
        $$payload.out += `<input type="date"${attr_class(`input ${stringify(_class)}`)}${attr("value", internalAnswers[urn])}/>`;
      } else if (question.type === "text") {
        $$payload.out += "<!--[4-->";
        if (form) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<textarea placeholder=""${attr_class(`input w-full ${stringify(_class)}`)}>`;
          const $$body = escape_html(internalAnswers[urn]);
          if ($$body) {
            $$payload.out += `${$$body}`;
          }
          $$payload.out += `</textarea>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<div><textarea placeholder=""${attr_class(`input w-full ${stringify(_class)}`)}>`;
          const $$body_1 = escape_html(questionBuffers[urn]);
          if ($$body_1) {
            $$payload.out += `${$$body_1}`;
          }
          $$payload.out += `</textarea> `;
          if (questionBuffers[urn] !== (internalAnswers[urn] || "")) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<button class="rounded-md w-8 h-8 border shadow-lg hover:bg-green-300 hover:text-green-500 duration-300" type="button" aria-label="Save observation"><i class="fa-solid fa-check opacity-70"></i></button> <button class="rounded-md w-8 h-8 border shadow-lg hover:bg-red-300 hover:text-red-500 duration-300" type="button" aria-label="Reset observation"><i class="fa-solid fa-xmark opacity-70"></i></button>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></li>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { Question as Q };
//# sourceMappingURL=Question-BCYMJ1mG.js.map
