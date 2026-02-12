import { p as push, V as escape_html, S as attr_class, T as attr, X as stringify, a as pop } from './index2-9icAqEyj.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './index3-BwfRm5YV.js';
import { Ij as exportbackup1, Ii as exportbackupdescription2, Ig as exportdatabase1, F$ as importbackup1, F_ as importbackupdescription2, n$ as upload } from './_index-DEXNURl5.js';
import './formData-F7m95JiK.js';
import './utils-FiC4zhrQ.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './runtime-BMNt81Gy.js';
import './stores3-psVfZSQ7.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  getModalStore();
  let isExporting = false;
  let isUploading = false;
  let uploadButtonStyles = "chip-disabled";
  let exportButtonStyles = "";
  const authorizedExtensions = [".bak"];
  const user = page.data.user;
  const canBackup = Object.hasOwn(user.permissions, "backup");
  if (canBackup) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="grid grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-4"><div class="card col-span-full lg:col-span-1 bg-white shadow-sm py-4 px-6 space-y-2"><h4 class="h4 font-semibold">${escape_html(exportbackup1())} <i class="fa-solid fa-download"></i></h4> <div class="py-4">${escape_html(exportbackupdescription2())}</div> <div><button type="button"${attr_class(`btn preset-filled-primary-500 ${stringify(exportButtonStyles)}`)}${attr("disabled", isExporting, true)}>`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(exportdatabase1())}`;
    }
    $$payload.out += `<!--]--></button></div></div> <div class="card col-span-full lg:col-span-1 bg-white shadow-sm py-4 px-6 space-y-2"><h4 class="h4 font-semibold">${escape_html(importbackup1())} <i class="fa-solid fa-upload"></i></h4> <div class="py-4">${escape_html(importbackupdescription2())}</div> <form enctype="multipart/form-data" method="post"><div class="flex flex-col sm:flex-row sm:items-end gap-3"><div class="flex-1"><input id="file" type="file" name="file" class="input"${attr("accept", authorizedExtensions.join(","))} required/></div> <button${attr_class(`btn preset-filled-secondary-500 ${stringify(uploadButtonStyles)}`)} type="button"${attr("disabled", isUploading, true)}>`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(upload())}`;
    }
    $$payload.out += `<!--]--></button></div></form></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BFGQQBMy.js.map
