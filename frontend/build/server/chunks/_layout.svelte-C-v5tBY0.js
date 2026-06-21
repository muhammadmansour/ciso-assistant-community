import { p as push, W as ensure_array_like, S as attr_class, X as stringify, V as escape_html, T as attr, a as pop } from './index2-9icAqEyj.js';
import { p as page } from './index3-BpCge2eg.js';
import './client-DqP3yP6V.js';
import './state.svelte-B6YM-9h0.js';
import './exports-CA5lG8jS.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';

function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  const sidebarItems = [
    {
      category: "AI MANAGEMENT",
      icon: "fa-solid fa-brain",
      items: [
        {
          label: "Audit Sessions",
          href: "/admin",
          icon: "fa-regular fa-comment-dots"
        },
        {
          label: "Audit Studio",
          href: "/admin/audit-studio",
          icon: "fa-solid fa-terminal"
        }
      ]
    },
    {
      category: "AI TOOLS",
      icon: "fa-solid fa-gear",
      items: [
        {
          label: "Controls Studio",
          href: "/admin/controls-studio",
          icon: "fa-solid fa-shield-halved"
        },
        {
          label: "Merge Optimizer",
          href: "/admin/merge-optimizer",
          icon: "fa-solid fa-code-merge"
        },
        {
          label: "Org Contexts",
          href: "/admin/org-contexts",
          icon: "fa-solid fa-building"
        }
      ]
    },
    {
      category: "CONFIGURATION",
      icon: "fa-solid fa-sliders",
      items: [
        {
          label: "Prompts",
          href: "/admin/prompts",
          icon: "fa-solid fa-wand-magic-sparkles"
        },
        {
          label: "File Collections",
          href: "/admin/file-collections",
          icon: "fa-solid fa-folder-open"
        }
      ]
    }
  ];
  let sidebarOpen = {
    "AI MANAGEMENT": true,
    "AI TOOLS": true,
    "CONFIGURATION": true
  };
  function isActive(href) {
    return page.url.pathname === href;
  }
  const each_array = ensure_array_like(sidebarItems);
  $$payload.out += `<div class="flex h-screen bg-gray-50"><aside class="w-56 bg-[#0A1628] flex flex-col flex-shrink-0"><div class="px-4 py-5"><div class="flex items-center gap-2.5"><div class="w-8 h-8 bg-[#0077CC] rounded-lg flex items-center justify-center font-bold text-white text-sm">W</div> <div><div class="text-white font-bold text-sm tracking-tight">WathbaGRC</div> <div class="text-[#0077CC] text-[10px] font-semibold uppercase tracking-widest">Admin</div></div></div></div> <div class="px-3 mb-2"><a href="/admin"${attr_class(`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${stringify(isActive("/admin") ? "bg-[#0077CC] text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}`)}><i class="fa-solid fa-table-columns text-xs w-4 text-center"></i> Dashboard</a></div> <nav class="flex-1 overflow-y-auto px-3 space-y-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let group = each_array[$$index_1];
    $$payload.out += `<div><button class="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"><div class="flex items-center gap-2"><i${attr_class(`${stringify(group.icon)} text-[9px]`)}></i> ${escape_html(group.category)}</div> <i${attr_class(`fa-solid fa-chevron-down text-[8px] transition-transform ${stringify(sidebarOpen[group.category] ? "" : "-rotate-90")}`)}></i></button> `;
    if (sidebarOpen[group.category]) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(group.items);
      $$payload.out += `<div class="mt-1 space-y-0.5"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$payload.out += `<a${attr("href", item.href)}${attr_class(`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all ${stringify(isActive(item.href) ? "bg-[#0077CC] text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white")}`)}><i${attr_class(`${stringify(item.icon)} text-xs w-4 text-center`)}></i> ${escape_html(item.label)}</a>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></nav> <div class="px-3 py-4 border-t border-white/10"><a href="/recap" class="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-sm transition-colors"><i class="fa-solid fa-arrow-left text-xs"></i> Back to WathbahGRC</a></div></aside> <div class="flex-1 flex flex-col overflow-hidden"><header class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0"><div class="flex items-center gap-4"><div class="flex items-center gap-2 text-sm font-medium text-gray-700"><i class="fa-solid fa-gear text-gray-400"></i> WathbahGRC Admin</div> <div class="relative"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i> <input type="text" placeholder="Search admin..." class="pl-8 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077CC]/20 focus:border-[#0077CC] w-56"/></div></div> <div class="flex items-center gap-2"><span class="text-gray-400 text-xs">Powered by</span> <a href="https://wathbahs.com" target="_blank" rel="noopener noreferrer"><img src="/wathba_logo_full.png" alt="Wathbah" class="h-6 hover:opacity-90 transition-opacity"/></a></div></header> <main class="flex-1 overflow-auto p-6">`;
  children?.($$payload);
  $$payload.out += `<!----></main></div></div>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-C-v5tBY0.js.map
