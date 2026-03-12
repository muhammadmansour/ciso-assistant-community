import { p as push, V as escape_html, a as pop } from './index2-9icAqEyj.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const license = data.license;
  $$payload.out += `<div class="card bg-white p-4 shadow-sm space-y-4"><table class="border-separate border-spacing-y-4"><tbody><tr class="py-6"><td class="text-lg font-bold px-6">Deployment mode</td><td>${escape_html(license.deployment_mode)}</td></tr><tr><td class="text-lg font-bold px-6">License type</td><td>${escape_html(license.type)}</td></tr><tr><td class="text-lg font-bold px-6">Used seats</td><td>${escape_html(license.users_number)} out of ${escape_html(license.users_number_limit)}</td></tr><tr><td class="text-lg font-bold px-6">Seats limit</td><td>Disabled</td></tr><tr><td class="text-lg font-bold px-6">Support</td><td>${escape_html(license.support)}</td></tr><tr><td class="text-lg font-bold px-6">Expiration date</td><td>${escape_html(license.expiration_date)}</td></tr></tbody></table></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CBtbjBUT.js.map
