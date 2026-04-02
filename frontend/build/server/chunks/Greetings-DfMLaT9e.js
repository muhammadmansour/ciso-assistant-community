import { p as push, W as ensure_array_like, S as attr_class, V as escape_html, X as stringify, T as attr, a as pop } from './index2-9icAqEyj.js';

function Greetings($$payload, $$props) {
  push();
  const features = [
    {
      icon: "fa-solid fa-shield-halved",
      title: "Framework Compliance",
      desc: "Qiyas, SAMA, NCA & national frameworks"
    },
    {
      icon: "fa-solid fa-clipboard-check",
      title: "Assessment Engine",
      desc: "Workflows for all 10 perspectives & 23 axes"
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Real-time Tracking",
      desc: "Monitor progress & control statuses live"
    },
    {
      icon: "fa-solid fa-brain",
      title: "AI Evidence Analysis",
      desc: "Auto-assess submissions against Qiyas criteria"
    },
    {
      icon: "fa-solid fa-users",
      title: "Team Collaboration",
      desc: "Assign tasks, share evidence & coordinate reviews"
    },
    {
      icon: "fa-solid fa-folder-open",
      title: "Structured Export",
      desc: "Organized folder structure mapped to Qiyas criteria"
    }
  ];
  let activeIndex = 0;
  const each_array = ensure_array_like(features);
  const each_array_1 = ensure_array_like(features);
  $$payload.out += `<div class="flex flex-col items-center text-center"><div class="text-5xl font-extrabold tracking-tight mb-3"><span class="text-[#0077CC]">W</span><span class="text-white">athbahGRC</span></div> <h1 class="text-3xl font-bold text-white leading-tight mb-4 whitespace-nowrap">Compliance Management Platform</h1> <p class="text-gray-400 text-base leading-relaxed max-w-md mb-10">Simplify compliance assessments, track requirements in real time, and ensure your organization
		meets national regulatory standards.</p> <div class="w-full max-w-2xl"><div class="relative h-14 overflow-hidden"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let feature = each_array[i];
    $$payload.out += `<div${attr_class(`absolute inset-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 ease-out ${stringify(i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}`)}><div class="w-9 h-9 rounded-lg bg-[#0077CC]/15 flex items-center justify-center flex-shrink-0"><i${attr_class(`${stringify(feature.icon)} text-[#00A3E0] text-[18px]`)}></i></div> <span class="text-white text-sm font-semibold whitespace-nowrap">${escape_html(feature.title)}</span> <span class="w-px h-4 bg-white/10 flex-shrink-0"></span> <span class="text-gray-400 text-sm whitespace-nowrap">${escape_html(feature.desc)}</span></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex items-center justify-center gap-2 mt-5"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    each_array_1[i];
    $$payload.out += `<button${attr_class(`h-1.5 rounded-full transition-all duration-300 ${stringify(i === activeIndex ? "w-6 bg-[#00A3E0]" : "w-1.5 bg-white/20 hover:bg-white/30")}`)}${attr("aria-label", `Feature ${stringify(i + 1)}`)}></button>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}

export { Greetings as G };
//# sourceMappingURL=Greetings-DfMLaT9e.js.map
