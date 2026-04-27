import { p as push, M as store_get, O as copy_payload, P as assign_payload, Q as unsubscribe_stores, a as pop, S as attr_class, T as attr, X as stringify, V as escape_html, R as bind_props, W as ensure_array_like, U as clsx, a3 as store_set } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { p as page$1 } from './index3-BwfRm5YV.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { A as Accordion } from './index4-CU0xjTbD.js';
import { U as URL_MODEL_MAP } from './crud-C1TvVbAO.js';
import { p as pageTitle, m as modelName, b as modelDescription, l as lastAccordionItem, d as driverInstance } from './stores-D-WMoATo.js';
import { w as writable } from './index-CRjgakYW.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { b as breadcrumbs, g as goto } from './breadcrumbs-BA0IMSh1.js';
import 'driver.js';
import { g as getFlash } from './client.svelte-CxCno2aW.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import './client-DqP3yP6V.js';
import './constants-QzmVibOJ.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import 'marked';
import { b as m } from './_index-D7NdhnXA.js';
import './string-BMZjP7XX.js';
import './schemas-DwUKC0vK.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './helpers-Bm9n0CNG.js';
import './html-FW6Ia4bL.js';
import '@floating-ui/dom';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'sanitize-html';
import './client2-CItqzqlw.js';
import './shared-server-BU2DVf8Q.js';
import './app-Ci0UE2-c.js';

function SideBarFooter($$payload, $$props) {
  push();
  getModalStore();
  getLocale();
  $$payload.out += `<div class="border-t border-white/10 pt-3 mt-auto space-y-3">`;
  if (page$1.data.user?.is_admin) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a href="https://grc-admin.wathbah.dev/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/15 text-white/80 hover:bg-white/8 hover:text-white transition-all duration-150 group"><div class="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"><i class="fa-solid fa-gear text-xs text-white/70 group-hover:text-white"></i></div> <span class="text-[13px] font-medium tracking-wide">WathbahGRC Admin</span></a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="flex flex-row items-center justify-between"><div class="flex flex-col w-3/4 min-w-0">`;
  if (page$1.data.user) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-white text-sm whitespace-nowrap overflow-hidden truncate w-full font-medium" data-testid="sidebar-user-name-display">${escape_html(page$1.data.user.first_name)}
					${escape_html(page$1.data.user.last_name)}</span> <span class="font-normal text-xs whitespace-nowrap truncate text-white/50 w-full" data-testid="sidebar-user-email-display">${escape_html(page$1.data.user.email)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button class="btn bg-initial text-white/50" data-testid="sidebar-more-btn-disabled" aria-label="More options" id="sidebar-more-btn-disabled"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function SideBarHeader($$payload) {
  $$payload.out += `<header><a href="/recap" class="flex items-center gap-3 border-b border-white/10 pb-4 mb-2 px-1"><div class="w-9 h-9 rounded-lg bg-[#0077CC] flex items-center justify-center flex-shrink-0"><span class="text-lg font-bold text-white">W</span></div> <span class="text-lg font-bold text-white tracking-tight">WathbaGRC</span></a></header>`;
}
const navData = {
  items: [
    {
      name: "compliance",
      items: [
        {
          name: "complianceAssessments",
          fa_icon: "fa-solid fa-certificate",
          href: "/compliance-assessments"
        },
        {
          name: "evidences",
          fa_icon: "fa-solid fa-receipt",
          href: "/evidences"
        },
        {
          name: "rightRequests",
          fa_icon: "fa-solid fa-fire-extinguisher",
          href: "/applied-controls",
          permissions: ["view_appliedcontrol"]
        },
        {
          name: "calendar",
          fa_icon: "fa-solid fa-calendar-days",
          href: "/calendar",
          permissions: ["view_appliedcontrol", "view_riskacceptance", "view_riskassessment"]
        }
      ]
    },
    {
      name: "organization",
      items: [
        {
          name: "frameworks",
          fa_icon: "fa-solid fa-book",
          href: "/frameworks"
        },
        {
          name: "domains",
          fa_icon: "fa-solid fa-sitemap",
          href: "/folders",
          exclude: ["BI-RL-TPR"]
        },
        {
          name: "perimeters",
          fa_icon: "fa-solid fa-cubes",
          href: "/perimeters"
        },
        {
          name: "users",
          fa_icon: "fa-solid fa-user",
          href: "/users"
        },
        {
          name: "teams",
          fa_icon: "fa-solid fa-people-group",
          href: "/teams"
        },
        {
          name: "userGroups",
          fa_icon: "fa-solid fa-users",
          href: "/user-groups"
        }
      ]
    }
    // {
    // 	name: 'overview',
    // 	items: [
    // 		{
    // 			name: 'analytics',
    // 			fa_icon: 'fa-solid fa-gauge',
    // 			href: '/analytics',
    // 			permissions: [
    // 				'view_perimeter',
    // 				'view_riskscenario',
    // 				'view_referencecontrol',
    // 				'view_assessment',
    // 				'view_riskassessment'
    // 			]
    // 		},
    // 		{
    // 			name: 'reports',
    // 			fa_icon: 'fas fa-file-invoice',
    // 			href: '/reports',
    // 			permissions: [
    // 				'view_perimeter',
    // 				'view_riskscenario',
    // 				'view_referencecontrol',
    // 				'view_riskassessment'
    // 			]
    // 		},
    // 		{
    // 			name: 'myAssignments',
    // 			fa_icon: 'fa-solid fa-list-check',
    // 			href: '/my-assignments',
    // 			permissions: [
    // 				'view_perimeter',
    // 				'view_riskscenario',
    // 				'view_referencecontrol',
    // 				'view_assessment',
    // 				'view_riskassessment'
    // 			]
    // 		}
    // 	]
    // },
    // {
    // 	name: 'catalog',
    // 	items: [
    // 		{
    // 			name: 'threats',
    // 			fa_icon: 'fa-solid fa-biohazard',
    // 			href: '/threats'
    // 		},
    // 		{
    // 			name: 'referenceControls',
    // 			fa_icon: 'fa-solid fa-gears',
    // 			href: '/reference-controls'
    // 		},
    // 		{
    // 			name: 'requirementMappingSets',
    // 			fa_icon: 'fa-solid fa-diagram-project',
    // 			href: '/requirement-mapping-sets'
    // 		},
    // 		{
    // 			name: 'riskMatrices',
    // 			fa_icon: 'fa-solid fa-table-cells-large',
    // 			href: '/risk-matrices'
    // 		}
    // 	]
    // },
    // {
    // 	name: 'assetsManagement',
    // 	items: [
    // 		{
    // 			name: 'assets',
    // 			fa_icon: 'fa-solid fa-gem',
    // 			href: '/assets'
    // 		},
    // 		{
    // 			name: 'businessImpactAnalysis',
    // 			fa_icon: 'fa-solid fa-arrows-to-eye',
    // 			href: '/business-impact-analysis',
    // 			permissions: [
    // 				'view_businessimpactanalysis',
    // 				'view_assetassessment',
    // 				'view_escalationthreshold'
    // 			]
    // 		}
    // 	]
    // },
    // {
    // 	name: 'operations',
    // 	items: [
    // 		{
    // 			name: 'appliedControls',
    // 			fa_icon: 'fa-solid fa-fire-extinguisher',
    // 			href: '/applied-controls'
    // 		},
    // 		{
    // 			name: 'xRays',
    // 			fa_icon: 'fa-solid fa-bolt',
    // 			href: '/x-rays',
    // 			permissions: ['view_riskassessment', 'view_assessment']
    // 		},
    // 		{
    // 			name: 'incidents',
    // 			fa_icon: 'fa-solid fa-bug',
    // 			href: '/incidents'
    // 		},
    // 		{
    // 			name: 'tasks',
    // 			fa_icon: 'fa-solid fa-note-sticky',
    // 			href: '/task-templates'
    // 		}
    // 	]
    // },
    // {
    // 	name: 'governance',
    // 	items: [
    // 		{
    // 			name: 'libraries',
    // 			fa_icon: 'fa-solid fa-folder-plus',
    // 			href: '/libraries',
    // 			permissions: ['add_threat', 'add_riskmatrix', 'add_referencecontrol', 'add_framework']
    // 		},
    // 		{
    // 			name: 'policies',
    // 			fa_icon: 'fa-solid fa-file-alt',
    // 			href: '/policies',
    // 			permissions: ['view_appliedcontrol']
    // 		},
    // 		{
    // 			name: 'organisationIssues',
    // 			fa_icon: 'fa-solid fa-briefcase',
    // 			href: '/organisation-issues',
    // 			permissions: ['view_organisationissue']
    // 		},
    // 		{
    // 			name: 'organisationObjectives',
    // 			fa_icon: 'fa-solid fa-bullseye',
    // 			href: '/organisation-objectives',
    // 			permissions: ['view_organisationobjective']
    // 		},
    // 		{
    // 			name: 'riskAcceptances',
    // 			fa_icon: 'fa-solid fa-signature',
    // 			href: '/risk-acceptances'
    // 		},
    // 		{
    // 			name: 'validationFlows',
    // 			fa_icon: 'fa-solid fa-clipboard-check',
    // 			href: '/validation-flows',
    // 			permissions: ['view_validationflow']
    // 		},
    // 		{
    // 			name: 'securityExceptions',
    // 			fa_icon: 'fa-solid fa-circle-exclamation',
    // 			href: '/security-exceptions'
    // 		},
    // 		{
    // 			name: 'followUp',
    // 			fa_icon: 'fa-solid fa-clipboard-list',
    // 			href: '/findings-assessments'
    // 		},
    // 		{
    // 			name: 'roleAssignments',
    // 			fa_icon: 'fa-solid fa-user-tag',
    // 			href: '/role-assignments'
    // 		}
    // 	]
    // },
    // {
    // 	name: 'risk',
    // 	items: [
    // 		{
    // 			name: 'riskAssessments',
    // 			fa_icon: 'fa-solid fa-magnifying-glass-chart',
    // 			href: '/risk-assessments'
    // 		},
    // 		{
    // 			name: 'ebiosRM',
    // 			fa_icon: 'fa-solid fa-gopuram',
    // 			href: '/ebios-rm'
    // 		},
    // 		{
    // 			name: 'quantitativeRiskStudies',
    // 			fa_icon: 'fa-solid fa-calculator',
    // 			href: '/quantitative-risk-studies',
    // 			permissions: ['view_quantitativeriskstudy']
    // 		},
    // 		{
    // 			name: 'riskScenarios',
    // 			fa_icon: 'fa-solid fa-clone',
    // 			href: '/risk-scenarios'
    // 		},
    // 		{
    // 			name: 'scoringAssistant',
    // 			fa_icon: 'fa-solid fa-star-half-stroke',
    // 			href: '/scoring-assistant',
    // 			permissions: ['view_riskmatrix']
    // 		},
    // 		{
    // 			name: 'vulnerabilities',
    // 			fa_icon: 'fa-solid fa-triangle-exclamation',
    // 			href: '/vulnerabilities'
    // 		}
    // 	]
    // },
    // {
    // 	name: 'metrology',
    // 	items: [
    // 		{
    // 			name: 'metricDefinitions',
    // 			fa_icon: 'fa-solid fa-ruler',
    // 			href: '/metric-definitions',
    // 			permissions: ['view_metricdefinition']
    // 		},
    // 		{
    // 			name: 'metricInstances',
    // 			fa_icon: 'fa-solid fa-chart-line',
    // 			href: '/metric-instances',
    // 			permissions: ['view_metricinstance']
    // 		},
    // 		{
    // 			name: 'dashboards',
    // 			fa_icon: 'fa-solid fa-chart-bar',
    // 			href: '/dashboards',
    // 			permissions: ['view_dashboard']
    // 		}
    // 	]
    // },
    // {
    // 	name: 'thirdPartyCategory',
    // 	items: [
    // 		{
    // 			name: 'tprmOverview',
    // 			fa_icon: 'fa-solid fa-gauge',
    // 			href: '/analytics/tprm',
    // 			permissions: ['view_entity', 'view_solution', 'view_contract', 'view_entityassessment']
    // 		},
    // 		{
    // 			name: 'entities',
    // 			fa_icon: 'fa-solid fa-building',
    // 			href: '/entities'
    // 		},
    // 		{
    // 			name: 'representatives',
    // 			fa_icon: 'fa-solid fa-user-tie',
    // 			href: '/representatives'
    // 		},
    // 		{
    // 			name: 'solutions',
    // 			fa_icon: 'fa-solid fa-box',
    // 			href: '/solutions'
    // 		},
    // 		{
    // 			name: 'contracts',
    // 			fa_icon: 'fa-solid fa-file-contract',
    // 			href: '/contracts'
    // 		},
    // 		{
    // 			name: 'entityAssessments',
    // 			fa_icon: 'fa-solid fa-clipboard-list',
    // 			href: '/entity-assessments'
    // 		}
    // 	]
    // },
    // {
    // 	name: 'privacy',
    // 	items: [
    // 		{
    // 			name: 'overview',
    // 			fa_icon: 'fa-solid fa-gauge',
    // 			href: '/analytics/gdpr',
    // 			permissions: ['view_processing', 'view_purpose']
    // 		},
    // 		{
    // 			name: 'processingsRegister',
    // 			fa_icon: 'fa-solid fa-clipboard-list',
    // 			href: '/processings',
    // 			permissions: ['view_processing']
    // 		},
    // 		{
    // 			name: 'personalData',
    // 			fa_icon: 'fa-solid fa-users-viewfinder',
    // 			href: '/personal-data',
    // 			permissions: ['view_personaldata']
    // 		},
    // 		{
    // 			name: 'purposes',
    // 			fa_icon: 'fa-solid fa-diamond',
    // 			href: '/purposes',
    // 			permissions: ['view_purpose']
    // 		},
    // 		{
    // 			name: 'dataBreaches',
    // 			fa_icon: 'fa-solid fa-triangle-exclamation',
    // 			href: '/data-breaches',
    // 			permissions: ['view_databreach']
    // 		}
    // 	]
    // },
    // {
    // 	name: 'projectManagement',
    // 	items: [
    // 		{
    // 			name: 'genericCollections',
    // 			fa_icon: 'fa-solid fa-box-archive',
    // 			href: '/generic-collections',
    // 			permissions: ['view_genericcollection']
    // 		},
    // 		{
    // 			name: 'accreditations',
    // 			fa_icon: 'fa-solid fa-award',
    // 			href: '/accreditations',
    // 			permissions: ['view_accreditation']
    // 		}
    // 	]
    // },
    // {
    // 	name: 'extra',
    // 	items: [
    // 		{
    // 			name: 'labels',
    // 			fa_icon: 'fa-solid fa-tag',
    // 			href: '/filtering-labels',
    // 			permissions: ['view_filteringlabel']
    // 		},
    // 		{
    // 			name: 'recap',
    // 			fa_icon: 'fa-solid fa-clipboard-list',
    // 			href: '/recap',
    // 			permissions: ['view_perimeter']
    // 		},
    // 		{
    // 			name: 'terminologies',
    // 			fa_icon: 'fa-solid fa-language',
    // 			href: '/terminologies',
    // 			permissions: ['view_terminology']
    // 		},
    // 		{
    // 			name: 'settings',
    // 			fa_icon: 'fa-solid fa-cog',
    // 			href: '/settings',
    // 			permissions: ['change_globalsettings']
    // 		},
    // 		{
    // 			name: 'backupRestore',
    // 			fa_icon: 'fa-solid fa-floppy-disk',
    // 			href: '/backup-restore',
    // 			permissions: ['backup']
    // 		},
    // 		{
    // 			name: 'experimental',
    // 			fa_icon: 'fa-solid fa-flask',
    // 			href: '/experimental',
    // 			permissions: ['change_globalsettings']
    // 		}
    // 	]
    // }
  ]
};
function SideBarItem($$payload, $$props) {
  push();
  let { item = [], sideBarVisibleItems } = $$props;
  let classesActive = (href) => href === page$1.url.pathname ? "bg-[#0077CC] text-white font-medium" : "text-white/70 hover:bg-[#0077CC]/80 hover:text-white";
  const each_array = ensure_array_like(item);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item2 = each_array[$$index];
    if (sideBarVisibleItems[item2.name] !== false) {
      $$payload.out += "<!--[-->";
      Anchor($$payload, {
        href: item2.href,
        breadcrumbAction: "replace",
        class: `unstyled flex whitespace-nowrap items-center py-2 text-sm rounded-lg transition-all duration-150 ${stringify(classesActive(item2.href ?? ""))}`,
        "data-testid": "accordion-item-" + item2.href.substring(1),
        children: ($$payload2) => {
          $$payload2.out += `<span class="px-3 flex items-center w-full gap-3 text-xs"${attr("id", item2.name)}${attr("title", safeTranslate(item2.name))}><i${attr_class(`${stringify(item2.fa_icon)} w-4 text-center text-[13px] opacity-80`)}></i> <span class="text-[13px] tracking-wide truncate">${escape_html(safeTranslate(item2.name))}</span></span>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function SideBarCategory($$payload, $$props) {
  push();
  let { item } = $$props;
  $$payload.out += `<span class="whitespace-nowrap text-white/50 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-2"${attr("data-testid", "accordion-item-" + item.name.toLowerCase().replace(" ", "-"))}><i class="fa-solid fa-grip-vertical text-[8px] opacity-50"></i> ${escape_html(safeTranslate(item.name))}</span>`;
  pop();
}
function SideBarNavigation($$payload, $$props) {
  push();
  var $$store_subs;
  const user = page$1.data.user;
  const items = navData.items.map((item) => {
    const filteredSubItems = item.items.filter((subItem) => {
      if (subItem.alwaysShow) {
        return true;
      } else if (subItem.exclude) {
        return subItem.exclude.some((role) => user?.roles && !user.roles.includes(role));
      } else if (subItem.permissions) {
        return subItem.permissions?.some((permission) => user?.permissions && Object.hasOwn(user.permissions, permission));
      } else if (Object.hasOwn(URL_MODEL_MAP, subItem.href.split("/")[1])) {
        const model = URL_MODEL_MAP[subItem.href.split("/")[1]];
        const canViewObject = user?.permissions && Object.hasOwn(user.permissions, `view_${model.name}`);
        return canViewObject;
      }
      return false;
    });
    return { ...item, items: filteredSubItems };
  }).filter((item) => item.items.length > 0);
  if (!store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem).includes("governance")) {
    store_set(lastAccordionItem, [
      ...store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem),
      "governance"
    ]);
  }
  if (!store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem).includes("risk")) {
    store_set(lastAccordionItem, [
      ...store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem),
      "risk"
    ]);
  }
  if (!store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem).includes("metrology")) {
    store_set(lastAccordionItem, [
      ...store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem),
      "metrology"
    ]);
  }
  if (!store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem).includes("thirdPartyCategory")) {
    store_set(lastAccordionItem, [
      ...store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem),
      "thirdPartyCategory"
    ]);
  }
  let { sideBarVisibleItems } = $$props;
  function lastAccordionItemOpened(value) {
    lastAccordionItem.set(value);
  }
  function handleNavClick(item) {
    lastAccordionItemOpened(item.name);
    setTimeout(
      () => {
        store_get($$store_subs ??= {}, "$driverInstance", driverInstance)?.moveNext();
      },
      0
    );
  }
  $$payload.out += `<nav class="grow scrollbar mt-2">`;
  Anchor($$payload, {
    href: "/recap",
    breadcrumbAction: "replace",
    class: `unstyled flex items-center gap-3 px-4 py-2.5 mb-2 rounded-lg transition-all duration-150 ${stringify(page$1.url.pathname === "/recap" ? "bg-[#0077CC] text-white font-medium" : "text-white/70 hover:bg-[#0077CC]/80 hover:text-white")}`,
    "data-testid": "sidebar-home",
    children: ($$payload2) => {
      $$payload2.out += `<i class="fa-solid fa-house w-4 text-center text-[13px] opacity-80"></i> <span class="text-[13px] tracking-wide">Home</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  {
    let iconOpen = function($$payload2) {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 448 512" class="fill-white/50"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>`;
    }, iconClosed = function($$payload2) {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" class="-rotate-90 fill-white/50" width="12px" height="12px" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>`;
    };
    Accordion($$payload, {
      spaceY: "space-y-2",
      regionPanel: "space-y-0.5",
      caretClosed: "-rotate-90",
      caretOpen: "",
      value: store_get($$store_subs ??= {}, "$lastAccordionItem", lastAccordionItem),
      onValueChange: (e) => store_set(lastAccordionItem, e.value),
      multiple: true,
      collapsible: true,
      iconOpen,
      iconClosed,
      children: ($$payload2) => {
        const each_array = ensure_array_like(items);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          if (sideBarVisibleItems && sideBarVisibleItems[item.name] !== false) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<!---->`;
            {
              let control = function($$payload3) {
                SideBarCategory($$payload3, { item });
              }, panel = function($$payload3) {
                SideBarItem($$payload3, { item: item.items, sideBarVisibleItems });
              };
              Accordion.Item($$payload2, {
                id: item.name.toLowerCase().replace(" ", "-"),
                onClick: () => handleNavClick(item),
                value: item.name,
                controlHover: "hover:bg-white/8",
                controlPadding: "py-2 px-2",
                controlRounded: "rounded-lg",
                panelPadding: "py-0 px-0",
                control,
                panel,
                $$slots: { control: true, panel: true }
              });
            }
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: {
        iconOpen: true,
        iconClosed: true,
        default: true
      }
    });
  }
  $$payload.out += `<!----></nav>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function SideBarToggle($$payload, $$props) {
  push();
  let { open = void 0 } = $$props;
  let positionClasses = open ? "ltr:left-[15.3rem] rtl:right-[15.3rem]" : "ltr:left-5 rtl:right-5 ltr:rotate-180 rtl:-rotate-180";
  $$payload.out += `<button aria-label="Toggle sidebar"${attr_class(`${stringify(positionClasses)} z-20 fixed w-6 h-6 rounded-full content-center self-center bg-[#0A1628] shadow-lg border border-white/20 text-white hover:scale-110 hover:bg-[#2a3a5c] transition-all duration-300 top-1/2 bottom-1/2`)} data-testid="sidebar-toggle-btn"><i class="fa-solid ltr:fa-angle-left rtl:fa-angle-right text-xs"></i></button>`;
  bind_props($$props, { open });
  pop();
}
function SideBar($$payload, $$props) {
  push();
  var $$store_subs;
  let { open = void 0, sideBarVisibleItems } = $$props;
  store_get($$store_subs ??= {}, "$page", page).data?.user;
  getModalStore();
  getFlash(page);
  const loading = writable(false);
  let classesSidebarOpen = (open2) => open2 ? "" : "ltr:-ml-56 rtl:-mr-56 pointer-events-none";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div data-testid="sidebar" class="sidebar"><aside${attr_class(`flex w-64 shadow-xl transition-all duration-300 fixed h-screen overflow-visible top-0 ltr:left-0 rtl:right-0 z-20 ${stringify(classesSidebarOpen(open))}`)}><nav class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-[#0A1628] py-4 px-3">`;
    SideBarHeader($$payload2);
    $$payload2.out += `<!----> `;
    SideBarNavigation($$payload2, { sideBarVisibleItems });
    $$payload2.out += `<!----> `;
    SideBarFooter($$payload2);
    $$payload2.out += `<!----></nav></aside> `;
    if (store_get($$store_subs ??= {}, "$loading", loading)) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-1000"><div class="flex flex-col items-center space-y-2">`;
      LoadingSpinner($$payload2);
      $$payload2.out += `<!----></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    SideBarToggle($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { open });
  pop();
}
function Breadcrumbs($$payload, $$props) {
  push();
  var $$store_subs;
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$breadcrumbs", breadcrumbs));
  $$payload.out += `<ol class="flex items-center gap-2 h-6 overflow-hidden whitespace-nowrap"><li><a href="/recap" class="text-gray-400 hover:text-blue-600 transition-colors" title="Home"><i class="fa-solid fa-house text-sm"></i></a></li> <!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let c = each_array[i];
    $$payload.out += `<li class="text-gray-300 text-xs" aria-hidden="true">/</li> `;
    if (i == store_get($$store_subs ??= {}, "$breadcrumbs", breadcrumbs).length - 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<li><span class="max-w-[64ch] overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-500 font-medium" data-testid="crumb-item"${attr("title", safeTranslate(c.label))}>`;
      if (c.icon) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<i${attr_class(clsx(c.icon))}></i>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> ${escape_html(safeTranslate(c.label))}</span></li>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<li>`;
      if (c.href) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<a class="max-w-[64ch] block overflow-hidden whitespace-nowrap text-ellipsis text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" data-testid="crumb-item"${attr("href", c.href)}${attr("title", safeTranslate(c.label))}>`;
        if (c.icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<i${attr_class(clsx(c.icon))}></i>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> ${escape_html(safeTranslate(c.label))}</a>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<span class="max-w-[64ch] overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-500 font-medium" data-testid="crumb-item"${attr("title", safeTranslate(c.label))}>`;
        if (c.icon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<i${attr_class(clsx(c.icon))}></i>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> ${escape_html(safeTranslate(c.label))}</span>`;
      }
      $$payload.out += `<!--]--></li>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></ol>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function getSidebarVisibleItems(featureFlags) {
  return {
    xRays: featureFlags?.xrays ?? false,
    incidents: featureFlags?.incidents ?? false,
    tasks: featureFlags?.tasks ?? false,
    riskAcceptances: featureFlags?.risk_acceptances ?? false,
    securityExceptions: featureFlags?.exceptions ?? false,
    followUp: featureFlags?.follow_up ?? false,
    ebiosRM: featureFlags?.ebiosrm ?? false,
    scoringAssistant: featureFlags?.scoring_assistant ?? false,
    vulnerabilities: featureFlags?.vulnerabilities ?? false,
    compliance: featureFlags?.compliance ?? false,
    thirdPartyCategory: featureFlags?.tprm ?? false,
    privacy: featureFlags?.privacy ?? false,
    experimental: featureFlags?.experimental ?? false,
    organisationObjectives: featureFlags?.organisation_objectives ?? false,
    organisationIssues: featureFlags?.organisation_issues ?? false,
    quantitativeRiskStudies: featureFlags?.quantitative_risk_studies ?? false,
    terminologies: featureFlags?.terminologies ?? true,
    businessImpactAnalysis: featureFlags?.bia ?? true,
    projectManagement: featureFlags?.project_management ?? false,
    contracts: featureFlags?.contracts ?? false,
    reports: featureFlags?.reports ?? false,
    validationFlows: featureFlags?.validation_flows ?? false,
    metrology: featureFlags?.metrology ?? true
  };
}
const flattenNavData = (navData2) => {
  const result = [];
  if (!navData2?.items) return result;
  for (const section of navData2.items) {
    if (!section.items) continue;
    for (const item of section.items) {
      if (item.name && item.href) {
        result.push({
          label: item.name,
          href: item.href
        });
      }
    }
  }
  return result;
};
let navigationLinks = flattenNavData(navData);
navigationLinks.push({
  label: "myProfile",
  href: "/my-profile"
});
function CommandPalette($$payload, $$props) {
  push();
  let opened = false;
  const navigationCommands = navigationLinks.map((link) => ({
    label: safeTranslate(link.label),
    value: link.href,
    onSelect: () => {
      opened = false;
      goto(link.href, {
        label: link.label,
        breadcrumbAction: "replace"
      });
    }
  }));
  let selected = 0;
  let searchText = "";
  let filteredNavigationCommands = navigationCommands.filter((link) => link.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
  if (opened) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(filteredNavigationCommands);
    $$payload.out += `<div class="backdrop-blur-xs fixed inset-0 z-[9999] w-full h-full m-auto flex items-center justify-center bg-black/50"><div class="h-auto overflow-hidden flex flex-col max-h-88 w-md rounded-lg"><input class="w-full bg-white px-4 py-3 border-b border-gray-200 outline-none focus:border-blue-800" type="text"${attr("value", searchText)} placeholder="Type a command..."/> `;
    if (filteredNavigationCommands.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="bg-white py-2 px-4 text-xs uppercase text-gray-500">Navigation</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="bg-white py-2 px-1 text-black">No results found.</span>`;
    }
    $$payload.out += `<!--]--> <div class="overflow-auto flex flex-col"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let navigationCommand = each_array[index];
      if (navigationCommand.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button${attr_class(`navigation-btn text-left py-2 px-4 text-black ${stringify(selected === index ? "bg-gray-100" : "bg-white")}`)} data-cmdk-nav-btn="">${escape_html(navigationCommand.label)}</button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let sidebarOpen = true;
  let classesSidebarOpen = (open) => open ? "ltr:ml-64 rtl:mr-64" : "ltr:ml-7 rtl:mr-7";
  let {
    data,
    form,
    sideBarVisibleItems = getSidebarVisibleItems(data?.featureflags),
    children
  } = $$props;
  getModalStore();
  const displayTitle = store_get($$store_subs ??= {}, "$page", page).data?.title || store_get($$store_subs ??= {}, "$pageTitle", pageTitle);
  const urlModel = () => {
    const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const match = path.match(/^\/([a-z-]+)\/?$/);
    return match ? match[1] : null;
  };
  const urlDescriptionKey = () => {
    const model = urlModel();
    if (!model) return null;
    const camelCase = model.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
    return `${camelCase}Description`;
  };
  const matchesListUrl = !!urlModel();
  const hasObjectTitle = !!store_get($$store_subs ??= {}, "$page", page).data?.title;
  const displayModelName = hasObjectTitle ? store_get($$store_subs ??= {}, "$page", page).data?.modelVerboseName || store_get($$store_subs ??= {}, "$modelName", modelName) : "";
  const displayModelDescription = (() => {
    if (hasObjectTitle) return "";
    if (!matchesListUrl && !store_get($$store_subs ??= {}, "$page", page).data?.modelDescriptionKey) return "";
    const descKey = store_get($$store_subs ??= {}, "$page", page).data?.modelDescriptionKey || urlDescriptionKey();
    if (descKey && m[descKey]) {
      return m[descKey]();
    }
    return store_get($$store_subs ??= {}, "$modelDescription", modelDescription);
  })();
  run(() => {
  });
  let searchQuery = "";
  let langValue = getLocale();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="overflow-x-hidden min-h-screen bg-[#F9FAFB]">`;
    SideBar($$payload2, {
      sideBarVisibleItems,
      get open() {
        return sidebarOpen;
      },
      set open($$value) {
        sidebarOpen = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <header${attr_class(`sticky top-0 z-10 bg-white shadow-sm transition-all duration-300 ${stringify(classesSidebarOpen(sidebarOpen))}`)}><div class="flex items-center justify-between px-6 py-3"><div class="relative flex-1 max-w-xl"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i> <input type="text" placeholder="Search..."${attr("value", searchQuery)} class="w-full pl-10 pr-4 py-2 bg-[#f4f6f9] border-0 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"/></div> <div class="flex items-center gap-3 ml-4">`;
    if (data?.user?.is_admin) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white text-sm font-medium rounded-lg shadow-sm hover:from-[#1a2740] hover:to-[#2a3a66] transition-all duration-200"><i class="fa-solid fa-play text-xs"></i> Start Audit</button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="relative"><button class="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150" title="Change language"><i class="fa-solid fa-globe text-sm"></i> <span class="text-xs font-medium uppercase">${escape_html(langValue)}</span> <i class="fa-solid fa-chevron-down text-[10px] ml-0.5"></i></button> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <a href="https://wathbahs.com/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors ml-2"><span class="text-xs">Powered by</span> <img src="/wathbah.svg" alt="Wathbah" class="h-6"/></a></div></div></header> <div${attr_class(`transition-all duration-300 ${stringify(classesSidebarOpen(sidebarOpen))} px-6 pt-4`)}>`;
    Breadcrumbs($$payload2);
    $$payload2.out += `<!----> <div class="mt-2 mb-4"><h1 class="text-2xl font-bold text-gray-900" id="page-title">${escape_html(safeTranslate(displayTitle))}</h1> `;
    if (displayModelName) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p class="text-sm text-gray-500 mt-0.5">${escape_html(safeTranslate(displayModelName))}</p>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (displayModelDescription) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p class="text-xs text-gray-400 mt-0.5 italic">${escape_html(safeTranslate(displayModelDescription))}</p>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div> `;
    CommandPalette($$payload2);
    $$payload2.out += `<!----> <main${attr_class(`px-6 pb-8 transition-all duration-300 ${stringify(classesSidebarOpen(sidebarOpen))}`)}>`;
    children?.($$payload2);
    $$payload2.out += `<!----></main></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-BcjmQvxO.js.map
