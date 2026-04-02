import { p as push, T as attr, V as escape_html, W as ensure_array_like, ab as maybe_selected, a as pop } from './index2-9icAqEyj.js';
import { fT as folder, cU as owner, pk as todo1, F$ as inprogress1, AY as onhold1, Ye as active, K$ as deprecated, cA as status, nS as verylow1, gI as low, D4 as medium, GH as high, nU as veryhigh1, d3 as controlimpact1, Ib as extrasmall1, r7 as small, EU as large, d1 as effort, Ai as p1, Ah as p2, Ag as p3, cX as priority, da as csffunction1, zg as previous, Cr as next } from './_index-Syqrsmaf.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import './runtime-BKo9q3Zd.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const appliedControls = data.applied_controls.filter((control) => control.name || control.description);
  let currentIndex = 0;
  let currentAppliedControl = appliedControls[currentIndex];
  const statusOptions = [
    { id: "--", label: "--" },
    { id: "to_do", label: todo1() },
    { id: "in_progress", label: inprogress1() },
    { id: "on_hold", label: onhold1() },
    { id: "active", label: active() },
    { id: "deprecated", label: deprecated() }
  ];
  const effortOptions = [
    { id: "--", label: "--", dbValue: null },
    {
      id: "Extra Small",
      label: extrasmall1(),
      dbValue: "XS"
    },
    {
      id: "Small",
      label: small(),
      dbValue: "S"
    },
    {
      id: "Medium",
      label: medium(),
      dbValue: "M"
    },
    {
      id: "Large",
      label: large(),
      dbValue: "L"
    },
    {
      id: "Extra Large",
      label: "Extra Large",
      dbValue: "XL"
    }
  ];
  const priorityOptions = [
    { id: "--", label: "--", dbValue: null },
    { id: "P1", label: p1(), dbValue: 1 },
    { id: "P2", label: p2(), dbValue: 2 },
    { id: "P3", label: p3(), dbValue: 3 },
    { id: "P4", label: "P4", dbValue: 4 }
  ];
  const impactOptions = [
    { id: "--", label: "--", dbValue: null },
    {
      id: "Very Low",
      label: verylow1(),
      dbValue: 1
    },
    { id: "Low", label: low(), dbValue: 2 },
    {
      id: "Medium",
      label: medium(),
      dbValue: 3
    },
    { id: "High", label: high(), dbValue: 4 },
    {
      id: "Very High",
      label: veryhigh1(),
      dbValue: 5
    }
  ];
  const csfFunctionOptions = [
    { id: "--", label: "--", dbValue: null },
    {
      id: "Govern",
      label: "Govern",
      dbValue: "govern"
    },
    {
      id: "Identify",
      label: "Identify",
      dbValue: "identify"
    },
    {
      id: "Protect",
      label: "Protect",
      dbValue: "protect"
    },
    {
      id: "Detect",
      label: "Detect",
      dbValue: "detect"
    },
    {
      id: "Respond",
      label: "Respond",
      dbValue: "respond"
    },
    {
      id: "Recover",
      label: "Recover",
      dbValue: "recover"
    }
  ];
  function displayIdFromDb(value, options) {
    if (value === null || value === void 0 || value === "") return "--";
    const match = options.find((o) => o.dbValue === value || o.id === value);
    return match ? String(match.id) : String(value);
  }
  $$payload.out += `<div class="flex flex-col min-h-screen justify-center items-center"><div class="flex flex-col bg-white w-3/4 max-w-4xl h-3/4 min-h-[600px] rounded-xl shadow-xl p-4 border-4 border-primary-500">`;
  if (currentAppliedControl) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-between items-center"><div><a${attr("href", data.backUrl)} class="flex items-center space-x-2 text-primary-800 hover:text-primary-600"><i class="fa-solid fa-arrow-left"></i> <p>${escape_html(data.backLabel)}</p></a></div> <div class="relative"><button class="font-semibold hover:bg-gray-100 px-2 py-1 rounded cursor-pointer border border-transparent hover:border-gray-300 transition-colors flex items-center space-x-1" title="Click to jump to specific item (or press G)"><span>${escape_html(currentIndex + 1)}/${escape_html(appliedControls.length)}</span> <i class="fa-solid fa-chevron-down text-xs opacity-60"></i> <span class="text-xs opacity-60">(G)</span></button> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="flex flex-col flex-1 justify-center overflow-hidden"><div class="flex flex-col items-center space-y-6 h-full"><div class="flex flex-col items-center space-y-2"><button class="font-semibold text-xl hover:text-primary-600 cursor-pointer flex-shrink-0 text-center" title="Click to edit this applied control">${escape_html(currentAppliedControl.name || "Unnamed Applied Control")}</button> <div class="flex flex-col items-center space-y-1 text-sm text-gray-600">`;
    if (currentAppliedControl.folder) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center space-x-1"><i class="fa-solid fa-folder text-xs"></i> <span><strong>${escape_html(folder())}</strong> ${escape_html(currentAppliedControl.folder.str)}</span></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (currentAppliedControl.owner && currentAppliedControl.owner.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex items-center space-x-1"><i class="fa-solid fa-user text-xs"></i> <span><strong>${escape_html(owner())}</strong> ${escape_html(currentAppliedControl.owner.map((o) => o.str).join(", "))}</span></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="flex flex-col space-y-4 overflow-y-auto flex-1 w-full max-w-4xl px-4">`;
    if (currentAppliedControl.description) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="whitespace-pre-wrap leading-relaxed text-gray-700 text-left">`;
      MarkdownRenderer($$payload, { content: currentAppliedControl.description });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> <div class="flex flex-col space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!---->`;
    {
      const each_array = ensure_array_like(statusOptions);
      $$payload.out += `<div class="flex flex-col space-y-1"><label class="text-sm font-semibold" for="status">${escape_html(status())}</label> <select id="status" class="select select-bordered w-full">`;
      $$payload.select_value = currentAppliedControl?.status || "--";
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        $$payload.out += `<option${attr("value", option.id)}${maybe_selected($$payload, option.id)}>${escape_html(option.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
      $$payload.select_value = void 0;
      $$payload.out += `</select></div>`;
    }
    $$payload.out += `<!----> <!---->`;
    {
      const each_array_1 = ensure_array_like(impactOptions);
      $$payload.out += `<div class="flex flex-col space-y-1"><label class="text-sm font-semibold" for="control_impact">${escape_html(controlimpact1())}</label> <select id="control_impact" class="select select-bordered w-full">`;
      $$payload.select_value = displayIdFromDb(currentAppliedControl?.control_impact, impactOptions);
      $$payload.out += `<!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let option = each_array_1[$$index_1];
        $$payload.out += `<option${attr("value", option.id)}${maybe_selected($$payload, option.id)}>${escape_html(option.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
      $$payload.select_value = void 0;
      $$payload.out += `</select></div>`;
    }
    $$payload.out += `<!----> <!---->`;
    {
      const each_array_2 = ensure_array_like(effortOptions);
      $$payload.out += `<div class="flex flex-col space-y-1"><label class="text-sm font-semibold" for="effort">${escape_html(effort())}</label> <select id="effort" class="select select-bordered w-full">`;
      $$payload.select_value = displayIdFromDb(currentAppliedControl?.effort, effortOptions);
      $$payload.out += `<!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let option = each_array_2[$$index_2];
        $$payload.out += `<option${attr("value", option.id)}${maybe_selected($$payload, option.id)}>${escape_html(option.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
      $$payload.select_value = void 0;
      $$payload.out += `</select></div>`;
    }
    $$payload.out += `<!----> <!---->`;
    {
      const each_array_3 = ensure_array_like(priorityOptions);
      $$payload.out += `<div class="flex flex-col space-y-1"><label class="text-sm font-semibold" for="priority">${escape_html(priority())}</label> <select id="priority" class="select select-bordered w-full">`;
      $$payload.select_value = displayIdFromDb(currentAppliedControl?.priority, priorityOptions);
      $$payload.out += `<!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let option = each_array_3[$$index_3];
        $$payload.out += `<option${attr("value", option.id)}${maybe_selected($$payload, option.id)}>${escape_html(option.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
      $$payload.select_value = void 0;
      $$payload.out += `</select></div>`;
    }
    $$payload.out += `<!----> <!---->`;
    {
      const each_array_4 = ensure_array_like(csfFunctionOptions);
      $$payload.out += `<div class="flex flex-col space-y-1"><label class="text-sm font-semibold" for="csf_function">${escape_html(csffunction1())}</label> <select id="csf_function" class="select select-bordered w-full">`;
      $$payload.select_value = displayIdFromDb(currentAppliedControl?.csf_function, csfFunctionOptions);
      $$payload.out += `<!--[-->`;
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let option = each_array_4[$$index_4];
        $$payload.out += `<option${attr("value", option.id)}${maybe_selected($$payload, option.id)}>${escape_html(option.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
      $$payload.select_value = void 0;
      $$payload.out += `</select></div>`;
    }
    $$payload.out += `<!----></div> <div class="flex justify-between"><button class="bg-gray-400 text-white px-4 py-2 rounded-sm flex items-center space-x-2"><span>${escape_html(previous())}</span> <span class="text-xs opacity-75">(H)</span></button> <button class="preset-filled-primary-500 px-4 py-2 rounded-sm flex items-center space-x-2"><span>${escape_html(next())}</span> <span class="text-xs opacity-75">(L)</span></button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-hnReBT2b.js.map
