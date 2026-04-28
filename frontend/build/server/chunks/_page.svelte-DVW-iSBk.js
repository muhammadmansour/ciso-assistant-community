import { p as push, M as store_get, O as copy_payload, P as assign_payload, Q as unsubscribe_stores, a as pop, V as escape_html, X as stringify, S as attr_class, W as ensure_array_like, T as attr, Z as attr_style, R as bind_props } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { p as page } from './index3-BwfRm5YV.js';
import { R as RecursiveTreeView } from './RecursiveTreeView-CzjuAGIL.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { P as ProgressRing } from './ProgressRing-HAZcZKrs.js';
import { S as Switch } from './Switch-IjY5G1Ys.js';
import { P as Popover } from './Popover-PelKNyF8.js';
import './exports-CA5lG8jS.js';
import { d as derived } from './index-CRjgakYW.js';
import './state.svelte-B6YM-9h0.js';
import { e as extendedResultColorMap, b as complianceResultColorMap, f as complianceStatusColorMap } from './constants-lv6aycRl.js';
import { d as displayScoreColor, h as darkenColor, f as formatScoreValue, c as isQuestionVisible } from './helpers-Bm9n0CNG.js';
import { s as safeTranslate } from './i18n-CMphL55V.js';
import { Eh as lockedassessment1, Eg as lockedassessmentmessage2, dK as framework, cy as perimeter, Oj as createdat1, dt as appliedcontrols1, cA as status, gf as maturity, b_ as compliance, ea as extendedresult1, cV as progress, S_ as associatedrequirements1, PA as collapseall1, IC as expandall1, Dp as mappinginferencetip2, v4 as requestvalidation1, e as edit, cW as evidences, Ym as actionplan1, KB as domainscoverage1, zh as powerups1, Ht as flashmode1, bc as tablemode1, PE as cloneaudit1, Pr as comparetoaudit2, kl as suggestcontrols1, zi as potentialthreats1, w2 as questionplural1, w1 as questionsingular1, e9 as result, YK as showonlyassessable3, kN as yes, Co as no, HM as filters, ct as complianceassessment1, U_ as ascsv3, UW as asxlsx4, UX as asword1, UV as aszip3, UY as aspdf3, Ip as exportbutton1 } from './_index-D7NdhnXA.js';
import { f as auditFiltersStore, g as expandedNodesState } from './stores-D-WMoATo.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { U as URL_MODEL_MAP } from './crud-CUvW5I-u.js';
import { g as getLocale } from './runtime-BKo9q3Zd.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './schemas-DwUKC0vK.js';
import './breadcrumbs-BA0IMSh1.js';
import { D as DonutChart } from './DonutChart-LcZloe69.js';
import { f as formatDateOrDateTime } from './datetime-CDLVyquZ.js';
import { c as canPerformAction } from './access-control-DaLcieub.js';
import { V as ValidationFlowsSection } from './ValidationFlowsSection-DZtqSkMG.js';
import { i as isMaskedPlaceholder } from './related-visibility-ukSq_O7b.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index6-Cn6jj1jH.js';
import './machine.svelte-CNa8MjEx.js';
import './index-server-DEEfjxiI.js';
import './index5-Brzv1W4u.js';
import './index8-L4CsUepF.js';
import '@floating-ui/dom';
import './shared-server-BU2DVf8Q.js';
import 'marked';
import 'sanitize-html';
import './html-FW6Ia4bL.js';
import './stores3-psVfZSQ7.js';
import './app-Ci0UE2-c.js';
import './client.svelte-CxCno2aW.js';
import './Dropdown-DMQZzGLP.js';
import './index4-CU0xjTbD.js';

function TreeViewItemContent($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    ref_id,
    name,
    description,
    ra_id = void 0,
    threats = void 0,
    reference_controls = void 0,
    children = void 0,
    canEditRequirementAssessment,
    hasParentNode,
    showDocumentationScore,
    selectedStatus,
    resultCounts,
    assessable,
    max_score,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const node = {
    ref_id,
    name,
    description,
    ra_id,
    threats,
    reference_controls,
    children,
    canEditRequirementAssessment,
    max_score,
    resultCounts,
    assessable,
    ...rest
  };
  const pattern = (ref_id ? 2 : 0) + (name ? 1 : 0);
  const title = pattern == 3 ? `${ref_id} - ${name}` : pattern == 2 ? ref_id : pattern == 1 ? name : "";
  let showInfo = false;
  let id = page.params.id;
  let displayOnlyAssessableNodes = store_get($$store_subs ??= {}, "$auditFiltersStore", auditFiltersStore)[id]?.displayOnlyAssessableNodes ?? false;
  const getAssessableNodes = (startNode, assessableNodes2 = []) => {
    if (startNode.assessable) assessableNodes2.push(startNode);
    if (startNode.children) {
      for (const value of Object.values(startNode.children)) {
        getAssessableNodes(value, assessableNodes2);
      }
    }
    return assessableNodes2;
  };
  const assessableNodes = getAssessableNodes(node);
  const hasAssessableChildren = children && Object.keys(children).length > 0 && assessableNodes.length - (node.assessable ? 1 : 0) > 0;
  const REQUIREMENT_ASSESSMENT_RESULT = [
    "compliant",
    "non_compliant",
    "partially_compliant",
    "not_applicable"
  ];
  const orderedResultPercentages = REQUIREMENT_ASSESSMENT_RESULT.map((result2) => {
    if (!resultCounts) return {
      result: result2,
      percentage: { value: 0, display: "0" }
    };
    const value = resultCounts[result2] || 0;
    const percentValue = value / assessableNodes.length * 100;
    const percentage = {
      value: percentValue,
      display: percentValue.toFixed(0)
    };
    return { result: result2, percentage };
  });
  function nodeScore() {
    if (!resultCounts || !resultCounts.hasOwnProperty("total_score") || !resultCounts.hasOwnProperty("scored")) {
      return null;
    }
    let mean = resultCounts["total_score"] / resultCounts["scored"];
    return Math.floor(mean * 10) / 10;
  }
  function nodeDocumentationScore() {
    if (!resultCounts || !resultCounts.hasOwnProperty("total_documentation_score") || !resultCounts.hasOwnProperty("scored")) {
      return null;
    }
    let mean = resultCounts["total_documentation_score"] / resultCounts["scored"];
    return Math.floor(mean * 10) / 10;
  }
  let classesShowInfo = (show) => "hidden" ;
  let classesShowInfoText = (show) => show ? "text-primary-500" : "";
  let classesPercentText = (resultColor) => resultColor === "#000000" ? "text-white" : "";
  const getBadgeStyles = (answers, questions) => {
    const visibleQuestions = Object.entries(questions || {}).filter(([_, q]) => isQuestionVisible(q, answers));
    const answeredCount = visibleQuestions.filter(([urn, _]) => {
      const answer = answers[urn];
      if (Array.isArray(answer)) return answer.length > 0;
      return answer !== null && answer !== void 0 && answer !== "";
    }).length;
    const totalCount = visibleQuestions.length;
    const backgroundColor = answeredCount === 0 ? "#fca5a5" : answeredCount === totalCount ? "#bbf7d0" : "#fef08a";
    return {
      backgroundColor,
      color: darkenColor(backgroundColor, 0.6),
      answeredCount,
      totalCount
    };
  };
  if (!displayOnlyAssessableNodes || assessable || hasAssessableChildren) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-row justify-between space-x-8"><div class="flex flex-1 justify-center max-w-[80ch] flex-col"><div class="flex flex-row space-x-2 items-center" style="font-weight: 300;"><div>`;
    if (assessable) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="w-full h-full flex rounded-base hover:text-primary-500">`;
      if (canEditRequirementAssessment) {
        $$payload.out += "<!--[-->";
        Anchor($$payload, {
          breadcrumbAction: "push",
          href: `/requirement-assessments/${stringify(ra_id)}/edit?next=${stringify(page.url.pathname)}`,
          children: ($$payload2) => {
            if (title || description) {
              $$payload2.out += "<!--[-->";
              if (title) {
                $$payload2.out += "<!--[-->";
                $$payload2.out += `<span style="font-weight: 600;">${escape_html(title)}</span>`;
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]--> `;
              if (description) {
                $$payload2.out += "<!--[-->";
                MarkdownRenderer($$payload2, { content: description });
              } else {
                $$payload2.out += "<!--[!-->";
              }
              $$payload2.out += `<!--]-->`;
            } else if (Object.keys(node.questions).length > 0) {
              $$payload2.out += "<!--[1-->";
              $$payload2.out += `${escape_html(Object.entries(node.questions)[0][1].text)}`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
        Anchor($$payload, {
          breadcrumbAction: "push",
          href: `/requirement-assessments/${stringify(ra_id)}?next=${stringify(page.url.pathname)}`,
          children: ($$payload2) => {
            if (title) {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `<span style="font-weight: 600;">${escape_html(title)}</span>`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (description) {
              $$payload2.out += "<!--[-->";
              MarkdownRenderer($$payload2, { content: description });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
      }
      $$payload.out += `<!--]--></span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="max-w-[80ch] whitespace-pre-line">`;
      if (title) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span style="font-weight: 600;">${escape_html(title)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (description) {
        $$payload.out += "<!--[-->";
        MarkdownRenderer($$payload, { content: description });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></p>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (!assessable) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(orderedResultPercentages);
      $$payload.out += `<div class="flex flex-row items-end items-middle text-xs mr-2" style="width:6rem"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let rp = each_array[$$index];
        if (resultCounts && resultCounts[rp.result] !== void 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="rounded-md px-1 mx-1 leading-4"${attr_style(`background-color: ${stringify(complianceResultColorMap[rp.result])}; color: ${stringify(complianceResultColorMap[rp.result] === "#000000" ? "#ffffff" : "#111827")}`)}>${escape_html(resultCounts[rp.result])}</div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--> `;
      if (resultCounts && resultCounts["not_assessed"] !== void 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="rounded-md px-1 mx-1 leading-4"${attr_style(`background-color: ${stringify(complianceResultColorMap["not_assessed"])}; color: ${stringify("#111827")}`)}>${escape_html(resultCounts["not_assessed"])}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div>`;
    if (hasAssessableChildren) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(Object.entries(complianceStatusColorMap));
      $$payload.out += `<!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let [status2, color] = each_array_1[$$index_1];
        if (resultCounts?.status && (selectedStatus.includes(status2) || selectedStatus.length === 0)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<span class="badge mr-1"${attr_style(`background-color: ${stringify(color + "44")}; color: ${stringify(darkenColor(color, 0.3))}`)}>${escape_html(resultCounts[status2])}
									${escape_html(safeTranslate(status2))}</span>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (node.questions) {
      $$payload.out += "<!--[-->";
      const badgeStyles = getBadgeStyles(node.answers, node.questions);
      $$payload.out += `<span class="badge"${attr_style(`background-color: ${stringify(badgeStyles.backgroundColor)}; color: ${stringify(badgeStyles.color)}`)}>${escape_html(badgeStyles.answeredCount)}/${escape_html(badgeStyles.totalCount)}
							${escape_html(Object.keys(node.questions).length > 1 ? questionplural1() : questionsingular1())}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> `;
    if (threats && threats.length > 0 || reference_controls && reference_controls.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div role="button" tabindex="0"${attr_class(`select-none text-sm hover:text-primary-400 ${stringify(classesShowInfoText(showInfo))}`)}><i class="text-xs fa-solid fa-info-circle"></i> Learn more</div> <div${attr_class(`card p-2 preset-tonal-primary border border-primary-500 text-sm flex flex-row cursor-auto ${stringify(classesShowInfo())}`)}><div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Suggested reference controls</p> `;
      if (reference_controls?.length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p>--</p>`;
      } else if (reference_controls) {
        $$payload.out += "<!--[1-->";
        const each_array_2 = ensure_array_like(reference_controls);
        $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let func = each_array_2[$$index_2];
          $$payload.out += `<li>`;
          if (func.id) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<a class="anchor"${attr("href", `/reference-controls/${stringify(func.id)}?next=${stringify(page.url.pathname)}`)}>${escape_html(func.name)}</a>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<p>${escape_html(func.name)}</p>`;
          }
          $$payload.out += `<!--]--></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <div class="flex-1"><p class="font-medium"><i class="fa-solid fa-gears"></i> Threats covered</p> `;
      if (threats?.length === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p>--</p>`;
      } else if (threats) {
        $$payload.out += "<!--[1-->";
        const each_array_3 = ensure_array_like(threats);
        $$payload.out += `<ul class="list-disc ml-4"><!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let threat = each_array_3[$$index_3];
          $$payload.out += `<li>`;
          if (threat.id) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<a class="anchor"${attr("href", `/threats/${stringify(threat.id)}?next=${stringify(page.url.pathname)}`)}>${escape_html(threat.name)}</a>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<p>${escape_html(threat.name)}</p>`;
          }
          $$payload.out += `<!--]--></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (hasAssessableChildren) {
      $$payload.out += "<!--[-->";
      const each_array_4 = ensure_array_like(orderedResultPercentages);
      $$payload.out += `<div class="flex max-w-96 grow items-center space-x-2"><div class="flex max-w-96 grow bg-gray-200 rounded-full overflow-hidden h-4 shrink self-center"><!--[-->`;
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let rp = each_array_4[$$index_4];
        $$payload.out += `<div${attr_class(`flex flex-col justify-center overflow-hidden text-xs text-center ${stringify(classesPercentText(complianceResultColorMap[rp.result]))}`)}${attr_style(`width: ${stringify(rp.percentage.value)}%; background-color: ${stringify(complianceResultColorMap[rp.result])}`)}>${escape_html(rp.percentage.display)}%</div>`;
      }
      $$payload.out += `<!--]--></div> <div class="flex flex-row space-x-2 items-center">`;
      if (hasParentNode) {
        $$payload.out += "<!--[-->";
        if (nodeScore() !== null) {
          $$payload.out += "<!--[-->";
          ProgressRing($$payload, {
            strokeWidth: "20px",
            value: formatScoreValue(nodeScore(), node.max_score),
            meterStroke: displayScoreColor(nodeScore(), node.max_score),
            size: "size-12",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(nodeScore())}`;
            },
            $$slots: { default: true }
          });
          $$payload.out += `<!----> `;
          if (showDocumentationScore) {
            $$payload.out += "<!--[-->";
            ProgressRing($$payload, {
              strokeWidth: "20px",
              value: formatScoreValue(nodeDocumentationScore(), node.max_score),
              meterStroke: displayScoreColor(nodeDocumentationScore(), node.max_score),
              size: "size-12",
              children: ($$payload2) => {
                $$payload2.out += `<!---->${escape_html(nodeDocumentationScore())}`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else if (nodeScore() !== null) {
        $$payload.out += "<!--[1-->";
        ProgressRing($$payload, {
          strokeWidth: "20px",
          value: formatScoreValue(nodeScore(), node.max_score),
          meterStroke: displayScoreColor(nodeScore(), node.max_score),
          size: "size-12",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(nodeScore())}`;
          },
          $$slots: { default: true }
        });
        $$payload.out += `<!----> `;
        if (showDocumentationScore) {
          $$payload.out += "<!--[-->";
          ProgressRing($$payload, {
            strokeWidth: "20px",
            value: formatScoreValue(nodeDocumentationScore(), node.max_score),
            meterStroke: displayScoreColor(nodeDocumentationScore(), node.max_score),
            size: "size-12",
            children: ($$payload2) => {
              $$payload2.out += `<!---->${escape_html(nodeDocumentationScore())}`;
            },
            $$slots: { default: true }
          });
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { getBadgeStyles });
  pop();
}
function TreeViewItemLead($$payload, $$props) {
  push();
  let {
    statusI18n,
    resultI18n,
    statusColor,
    resultColor,
    assessable,
    score,
    documentationScore,
    isScored,
    showDocumentationScore,
    max_score,
    progressStatusEnabled = true,
    extendedResultEnabled = false,
    extendedResult = null,
    extendedResultColor = null
  } = $$props;
  const leadResult = safeTranslate(resultI18n);
  const lead = safeTranslate(statusI18n);
  const leadExtendedResult = extendedResult ? safeTranslate(extendedResult) : null;
  let classesText = resultColor == "#000000" ? "text-white" : "";
  if (assessable) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex flex-row space-x-2 items-center">`;
    if (progressStatusEnabled) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge h-fit"${attr_style(`color: ${stringify(statusColor ?? "#d1d5db")};`)}>${escape_html(lead)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <span${attr_class(`badge ${stringify(classesText)} h-fit`)}${attr_style(`background-color: ${stringify(resultColor ?? "#d1d5db")};`)}>${escape_html(leadResult)}</span> `;
    if (extendedResultEnabled && leadExtendedResult && extendedResultColor) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge text-white h-fit"${attr_style(`background-color: ${stringify(extendedResultColor)};`)}>${escape_html(leadExtendedResult)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (resultI18n !== "notApplicable" && isScored) {
      $$payload.out += "<!--[-->";
      ProgressRing($$payload, {
        strokeWidth: "20px",
        meterStroke: displayScoreColor(score, max_score),
        value: score * 100 / max_score,
        size: "size-12",
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(score)}`;
        },
        $$slots: { default: true }
      });
      $$payload.out += `<!----> `;
      if (showDocumentationScore) {
        $$payload.out += "<!--[-->";
        ProgressRing($$payload, {
          strokeWidth: "20px",
          meterStroke: displayScoreColor(documentationScore, max_score),
          value: documentationScore * 100 / max_score,
          size: "size-12",
          children: ($$payload2) => {
            $$payload2.out += `<!---->${escape_html(documentationScore)}`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data, form } = $$props;
  const compliance_assessment = data.compliance_assessment;
  const user = page.data.user;
  const model = URL_MODEL_MAP["compliance-assessments"];
  const canEditObject = canPerformAction({
    user,
    action: "change",
    model: model.name,
    domain: compliance_assessment.folder.id
  });
  const requirementAssessmentModel = URL_MODEL_MAP["requirement-assessments"];
  const canEditRequirementAssessment = !data.compliance_assessment.is_locked && canPerformAction({
    user,
    action: "change",
    model: requirementAssessmentModel.name,
    domain: data.compliance_assessment.folder.id
  });
  const has_threats = data.threats.total_unique_threats > 0;
  const countResults = (node, resultCounts = {}) => {
    if (node.result && node.assessable) {
      resultCounts[node.result] = (resultCounts[node.result] || 0) + 1;
    }
    if (node.status && node.assessable) {
      resultCounts[node.status] = (resultCounts[node.status] || 0) + 1;
    }
    if (node.is_scored && node.assessable && node.result !== "not_applicable") {
      resultCounts["scored"] = (resultCounts["scored"] || 0) + 1;
      const nodeDocumentationScore = data.compliance_assessment.show_documentation_score ? node.documentation_score : 0;
      resultCounts["total_documentation_score"] = (resultCounts["total_documentation_score"] || 0) + nodeDocumentationScore;
      resultCounts["total_score"] = (resultCounts["total_score"] || 0) + node.score;
    }
    if (node.children && Object.keys(node.children).length > 0) {
      for (const childId in node.children) {
        if (Object.prototype.hasOwnProperty.call(node.children, childId)) {
          const childNode = node.children[childId];
          countResults(childNode, resultCounts);
        }
      }
    }
    return resultCounts;
  };
  let id = page.params.id;
  derived(auditFiltersStore, ($f) => $f[id] ?? {});
  let selectedStatus = [];
  let selectedResults = [];
  let selectedExtendedResults = [];
  let displayOnlyAssessableNodes = false;
  function isNodeHidden(node, displayOnlyAssessableNodes2) {
    const hasAssessableChildren = Object.keys(node.children || {}).length > 0;
    return displayOnlyAssessableNodes2 && !node.assessable && !hasAssessableChildren || node.assessable && (selectedStatus.length > 0 && !selectedStatus.includes(node.status) || selectedResults.length > 0 && !selectedResults.includes(node.result) || selectedExtendedResults.length > 0 && !selectedExtendedResults.includes(node.extended_result));
  }
  function transformToTreeView(nodes, hasParentNode = false) {
    return nodes.map(([id2, node]) => {
      node.resultCounts = countResults(node);
      const hidden = isNodeHidden(node, displayOnlyAssessableNodes);
      return {
        id: id2,
        content: TreeViewItemContent,
        contentProps: {
          ...node,
          canEditRequirementAssessment,
          hasParentNode,
          showDocumentationScore: data.compliance_assessment.show_documentation_score,
          hidden,
          selectedStatus
        },
        lead: TreeViewItemLead,
        leadProps: {
          statusI18n: node.status_i18n,
          resultI18n: node.result_i18n,
          assessable: node.assessable,
          statusColor: complianceStatusColorMap[node.status],
          resultColor: complianceResultColorMap[node.result],
          score: node.score,
          documentationScore: node.documentation_score,
          isScored: node.is_scored,
          showDocumentationScore: data.compliance_assessment.show_documentation_score,
          max_score: node.max_score,
          progressStatusEnabled: data.compliance_assessment.progress_status_enabled,
          extendedResultEnabled: data.compliance_assessment.extended_result_enabled,
          extendedResult: node.extended_result,
          extendedResultColor: extendedResultColorMap[node.extended_result]
        },
        children: node.children ? transformToTreeView(Object.entries(node.children), true) : []
      };
    });
  }
  let treeViewNodes = void 0;
  function assessableNodesCount(nodes) {
    let count = 0;
    for (const node of nodes) {
      if (node.contentProps.assessable) {
        count++;
      }
      if (node.children) {
        count += assessableNodesCount(node.children);
      }
    }
    return count;
  }
  let expandedNodes = [];
  expandedNodes = store_get($$store_subs ??= {}, "$expandedNodesState", expandedNodesState);
  getModalStore();
  let tree = data.tree;
  let compliance_assessment_donut_values = data.compliance_assessment_donut_values;
  let exportPopupOpen = false;
  let filterPopupOpen = false;
  run(() => {
    if (tree) {
      treeViewNodes = transformToTreeView(Object.entries(tree));
    }
  });
  run(() => {
    expandedNodesState.set(expandedNodes);
  });
  run(() => {
  });
  run(() => {
  });
  let filterCount = (selectedStatus.length > 0 ? 1 : 0) + (selectedResults.length > 0 ? 1 : 0) + (selectedExtendedResults.length > 0 ? 1 : 0) + (displayOnlyAssessableNodes ? 1 : 0);
  function countTreeReqs(node) {
    let count = 0;
    if (node.assessable) count++;
    if (node.children) {
      for (const child of Object.values(node.children)) {
        count += countTreeReqs(child);
      }
    }
    return count;
  }
  let treeCategories = tree ? Object.entries(tree).map(([id2, node], index) => {
    const reqCount = countTreeReqs(node);
    return {
      id: id2,
      name: node.name || node.ref_id || `Category ${index + 1}`,
      reqCount,
      index: index + 1
    };
  }) : [];
  let totalTreeRequirements = treeCategories.reduce((sum, cat) => sum + cat.reqCount, 0);
  const progressStatusMap = {
    done: { label: "Done", dotColor: "bg-emerald-500" },
    in_progress: { label: "In Progress", dotColor: "bg-sky-500" },
    in_review: {
      label: "Needs Review",
      dotColor: "bg-amber-500"
    },
    to_do: { label: "Not Started", dotColor: "bg-gray-300" }
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-4">`;
    if (data.compliance_assessment.is_locked) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl shadow-sm"><div class="flex items-center gap-2"><i class="fa-solid fa-lock text-yellow-600"></i> <span class="font-medium text-sm">${escape_html(lockedassessment1())}</span> <span class="text-sm text-yellow-700">${escape_html(lockedassessmentmessage2())}</span></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="flex gap-6"><div class="flex-1 space-y-6 min-w-0"><div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"><div class="grid grid-cols-2 divide-x divide-gray-100"><div class="p-5 space-y-4"><div><div class="flex items-center gap-2 mb-1.5"><i class="fa-solid fa-shield-halved text-[13px] text-gray-400"></i> <span class="text-xs font-medium text-gray-500 uppercase tracking-wide" data-testid="framework-field-title">${escape_html(framework())}</span></div> <p class="text-sm font-medium text-gray-900" data-testid="framework-field-value">`;
    if (data.compliance_assessment.framework?.str && data.compliance_assessment.framework?.id) {
      $$payload2.out += "<!--[-->";
      if (!page.data.user.is_third_party) {
        $$payload2.out += "<!--[-->";
        Anchor($$payload2, {
          href: `/frameworks/${stringify(data.compliance_assessment.framework.id)}`,
          class: "text-[#0077CC] hover:underline",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(data.compliance_assessment.framework.str)}`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(data.compliance_assessment.framework.str)}`;
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span class="text-gray-400">-</span>`;
    }
    $$payload2.out += `<!--]--></p></div> <div><div class="flex items-center gap-2 mb-1.5"><i class="fa-solid fa-location-dot text-[13px] text-gray-400"></i> <span class="text-xs font-medium text-gray-500 uppercase tracking-wide" data-testid="perimeter-field-title">${escape_html(perimeter())}</span></div> <p class="text-sm text-gray-900" data-testid="perimeter-field-value">`;
    if (data.compliance_assessment.perimeter?.str && data.compliance_assessment.perimeter?.id) {
      $$payload2.out += "<!--[-->";
      if (!page.data.user.is_third_party) {
        $$payload2.out += "<!--[-->";
        Anchor($$payload2, {
          href: `/perimeters/${stringify(data.compliance_assessment.perimeter.id)}`,
          class: "text-[#0077CC] hover:underline",
          children: ($$payload3) => {
            $$payload3.out += `<!---->${escape_html(data.compliance_assessment.perimeter.str)}`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(data.compliance_assessment.perimeter.str)}`;
      }
      $$payload2.out += `<!--]-->`;
    } else if (data.compliance_assessment.perimeter?.str) {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `${escape_html(data.compliance_assessment.perimeter.str)}`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span class="text-gray-400">-</span>`;
    }
    $$payload2.out += `<!--]--></p></div> <div><div class="flex items-center gap-2 mb-1.5"><i class="fa-solid fa-clock text-[13px] text-gray-400"></i> <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(createdat1())}</span></div> <p class="text-sm text-gray-900">${escape_html(formatDateOrDateTime(data.compliance_assessment.created_at, getLocale()))}</p></div></div> <div class="p-5 space-y-4"><div><div class="flex items-center gap-2 mb-1.5"><i class="fa-solid fa-bullseye text-[13px] text-gray-400"></i> <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(appliedcontrols1())}</span></div> <p class="text-sm text-gray-900" data-testid="controls-field-value">`;
    if (data.appliedControlsCount > 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `${escape_html(data.appliedControlsCount)} ${escape_html(appliedcontrols1().toLowerCase())}`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span class="text-gray-400">0</span>`;
    }
    $$payload2.out += `<!--]--></p></div> <div><div class="flex items-center gap-2 mb-1.5"><i class="fa-regular fa-circle text-[13px] text-gray-400"></i> <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(status())}</span></div> `;
    if (data.compliance_assessment.status) {
      $$payload2.out += "<!--[-->";
      const statusValue = data.compliance_assessment.status;
      const statusLabel = safeTranslate(statusValue?.str ?? statusValue);
      $$payload2.out += `<span${attr_class(`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${stringify(statusValue === "active" || statusValue?.str === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : statusValue === "in_progress" || statusValue?.str === "In Progress" ? "bg-blue-50 text-blue-700 border border-blue-200" : statusValue === "done" || statusValue?.str === "Completed" || statusValue?.str === "Done" ? "bg-sky-50 text-sky-700 border border-sky-200" : "bg-gray-50 text-gray-600 border border-gray-200")}`)} data-testid="status-field-value">${escape_html(statusLabel)}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<span class="text-gray-400">-</span>`;
    }
    $$payload2.out += `<!--]--></div></div></div> `;
    if (data.compliance_assessment.description) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="px-5 pb-5 pt-2 border-t border-gray-100"><p class="text-sm text-gray-600 leading-relaxed">`;
      MarkdownRenderer($$payload2, {
        content: data.compliance_assessment.description
      });
      $$payload2.out += `<!----></p></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (data.compliance_assessment.authors?.length > 0 || data.compliance_assessment.reviewers?.length > 0 || data.compliance_assessment.version) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="px-5 pb-5 pt-2 border-t border-gray-100"><div class="grid grid-cols-2 gap-x-8 gap-y-3">`;
      if (data.compliance_assessment.version) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div><span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(safeTranslate("version"))}</span> <p class="text-sm text-gray-900 mt-1">${escape_html(data.compliance_assessment.version)}</p></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (data.compliance_assessment.authors?.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(data.compliance_assessment.authors.filter((a) => !isMaskedPlaceholder(a)));
        $$payload2.out += `<div><span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(safeTranslate("authors"))}</span> <p class="text-sm text-gray-900 mt-1"><!--[-->`;
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let author = each_array[i];
          if (author.str && author.id) {
            $$payload2.out += "<!--[-->";
            if (!page.data.user.is_third_party) {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: `/users/${stringify(author.id)}`,
                class: "text-[#0077CC] hover:underline",
                children: ($$payload3) => {
                  $$payload3.out += `<!---->${escape_html(author.str)}`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `${escape_html(author.str)}`;
            }
            $$payload2.out += `<!--]-->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `${escape_html(author.str || author)}`;
          }
          $$payload2.out += `<!--]--> `;
          if (i < data.compliance_assessment.authors.filter((a) => !isMaskedPlaceholder(a)).length - 1) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `,`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></p></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (data.compliance_assessment.reviewers?.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array_1 = ensure_array_like(data.compliance_assessment.reviewers.filter((r) => !isMaskedPlaceholder(r)));
        $$payload2.out += `<div><span class="text-xs font-medium text-gray-500 uppercase tracking-wide">${escape_html(safeTranslate("reviewers"))}</span> <p class="text-sm text-gray-900 mt-1"><!--[-->`;
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let reviewer = each_array_1[i];
          if (reviewer.str && reviewer.id) {
            $$payload2.out += "<!--[-->";
            if (!page.data.user.is_third_party) {
              $$payload2.out += "<!--[-->";
              Anchor($$payload2, {
                href: `/users/${stringify(reviewer.id)}`,
                class: "text-[#0077CC] hover:underline",
                children: ($$payload3) => {
                  $$payload3.out += `<!---->${escape_html(reviewer.str)}`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
              $$payload2.out += `${escape_html(reviewer.str)}`;
            }
            $$payload2.out += `<!--]-->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `${escape_html(reviewer.str || reviewer)}`;
          }
          $$payload2.out += `<!--]--> `;
          if (i < data.compliance_assessment.reviewers.filter((r) => !isMaskedPlaceholder(r)).length - 1) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `,`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></p></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (page.data?.featureflags?.validation_flows) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="px-5 pb-5 pt-2 border-t border-gray-100"><!---->`;
      {
        ValidationFlowsSection($$payload2, {
          validationFlows: compliance_assessment.validation_flows
        });
      }
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <!---->`;
    {
      $$payload2.out += `<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"><div class="flex items-start gap-6">`;
      if (data.global_score.score >= 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex flex-col justify-center items-center">`;
        ProgressRing($$payload2, {
          strokeWidth: "18px",
          meterStroke: displayScoreColor(data.global_score.score, data.global_score.max_score),
          value: data.global_score.score * 100 / data.global_score.max_score,
          size: "size-40",
          children: ($$payload3) => {
            $$payload3.out += `<p class="font-semibold text-3xl">${escape_html(data.global_score.score)}</p>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <div class="text-sm font-semibold py-2 text-gray-600">${escape_html(maturity())}</div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="flex-1 flex gap-4"><div class="flex-1">`;
      DonutChart($$payload2, {
        s_label: "Result",
        name: "compliance_result",
        title: compliance(),
        orientation: "horizontal",
        values: compliance_assessment_donut_values.result.values,
        colors: compliance_assessment_donut_values.result.values.map((object) => object.itemStyle.color),
        showPercentage: true
      });
      $$payload2.out += `<!----></div> `;
      if (data.compliance_assessment.extended_result_enabled && compliance_assessment_donut_values.extended_result?.values?.length > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex-1">`;
        DonutChart($$payload2, {
          s_label: "Extended Result",
          name: "compliance_extended_result",
          title: extendedresult1(),
          orientation: "horizontal",
          values: compliance_assessment_donut_values.extended_result.values,
          colors: compliance_assessment_donut_values.extended_result.values.map((object) => object.itemStyle.color),
          showPercentage: true
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (data.compliance_assessment.progress_status_enabled) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex-1">`;
        DonutChart($$payload2, {
          s_label: "Status",
          name: "compliance_status",
          title: progress(),
          orientation: "horizontal",
          values: compliance_assessment_donut_values.status.values,
          colors: compliance_assessment_donut_values.status.values.map((object) => object.itemStyle.color),
          showPercentage: true
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div></div></div>`;
    }
    $$payload2.out += `<!----> <div class="bg-white rounded-lg border border-gray-200 shadow-sm"><div class="p-5 border-b border-gray-200 flex items-center justify-between"><div class="flex items-center gap-3"><h2 class="text-base font-semibold text-gray-900">${escape_html(associatedrequirements1())}</h2> <span class="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">`;
    if (treeViewNodes) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `${escape_html(assessableNodesCount(treeViewNodes))}`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></span></div> <div class="flex items-center gap-3"><button class="text-sm text-[#0077CC] hover:text-[#005FA3] font-medium transition-colors">${escape_html(expandedNodes.length > 0 ? collapseall1() : expandall1())}</button> `;
    {
      let trigger = function($$payload3) {
        $$payload3.out += `<i class="fa-solid fa-filter mr-2 text-xs"></i> ${escape_html(filters())} `;
        if (filterCount) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<span class="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">${escape_html(filterCount)}</span>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      }, content = function($$payload3) {
        const each_array_2 = ensure_array_like(Object.entries(complianceResultColorMap));
        $$payload3.out += `<div><span class="text-sm font-bold">${escape_html(result())}</span> <div class="flex flex-wrap gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1"><!--[-->`;
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let [result2, color] = each_array_2[$$index_2];
          $$payload3.out += `<button type="button" class="px-2.5 py-1 rounded-md font-semibold transition-all"${attr_style(`background-color: ${stringify(selectedResults.includes(result2) ? color : "#e5e7eb")}; color: ${stringify(selectedResults.includes(result2) ? result2 === "not_applicable" ? "white" : "black" : "#6b7280")}; opacity: ${stringify(selectedResults.includes(result2) ? 1 : 0.6)};`)}>${escape_html(safeTranslate(result2))}</button>`;
        }
        $$payload3.out += `<!--]--></div></div> `;
        if (data.compliance_assessment.progress_status_enabled) {
          $$payload3.out += "<!--[-->";
          const each_array_3 = ensure_array_like(Object.entries(complianceStatusColorMap));
          $$payload3.out += `<div><span class="text-sm font-bold">${escape_html(status())}</span> <div class="flex flex-wrap w-fit gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1"><!--[-->`;
          for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
            let [status2, color] = each_array_3[$$index_3];
            $$payload3.out += `<button type="button" class="px-2.5 py-1 rounded-md font-semibold transition-all"${attr_style(`background-color: ${stringify(selectedStatus.includes(status2) ? color + "44" : "#e5e7eb")}; color: ${stringify(selectedStatus.includes(status2) ? darkenColor(color, 0.3) : "#6b7280")}; opacity: ${stringify(selectedStatus.includes(status2) ? 1 : 0.6)};`)}>${escape_html(safeTranslate(status2))}</button>`;
          }
          $$payload3.out += `<!--]--></div></div>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (data.compliance_assessment.extended_result_enabled) {
          $$payload3.out += "<!--[-->";
          const each_array_4 = ensure_array_like(Object.entries(extendedResultColorMap));
          $$payload3.out += `<div><span class="text-sm font-bold">${escape_html(extendedresult1())}</span> <div class="flex flex-wrap w-fit gap-2 text-xs bg-gray-50 border border-gray-200 p-2 rounded-lg mt-1"><!--[-->`;
          for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
            let [extendedResult, color] = each_array_4[$$index_4];
            $$payload3.out += `<button type="button" class="px-2.5 py-1 rounded-md font-semibold transition-all"${attr_style(`background-color: ${stringify(selectedExtendedResults.includes(extendedResult) ? color : "#e5e7eb")}; color: white; opacity: ${stringify(selectedExtendedResults.includes(extendedResult) ? 1 : 0.6)};`)}>${escape_html(safeTranslate(extendedResult))}</button>`;
          }
          $$payload3.out += `<!--]--></div></div>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> <div><span class="text-sm font-bold">${escape_html(showonlyassessable3())}</span> <div id="toggle" class="flex items-center space-x-4 text-xs mt-1">`;
        Switch($$payload3, {
          name: "questionnaireToggle",
          class: "flex flex-row items-center justify-center",
          active: "bg-[#0A1628]",
          onCheckedChange: (e) => displayOnlyAssessableNodes = e.checked,
          onclick: () => {
            displayOnlyAssessableNodes = !displayOnlyAssessableNodes;
            auditFiltersStore.setDisplayOnlyAssessableNodes(id, displayOnlyAssessableNodes);
          },
          children: ($$payload4) => {
            if (displayOnlyAssessableNodes) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<span class="font-bold text-xs text-[#0A1628]">${escape_html(yes())}</span>`;
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `<span class="font-bold text-xs text-gray-500">${escape_html(no())}</span>`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div></div>`;
      };
      Popover($$payload2, {
        open: filterPopupOpen,
        onOpenChange: (e) => filterPopupOpen = e.open,
        positioning: { placement: "bottom-start" },
        triggerBase: "btn bg-[#0A1628] text-white hover:bg-[#1a2740] text-sm px-4 py-2 rounded-lg",
        contentBase: "card p-3 bg-white w-fit shadow-lg space-y-3 border border-gray-200 z-10 rounded-xl",
        zIndex: "1000",
        autoFocus: false,
        onPointerDownOutside: () => filterPopupOpen = false,
        closeOnInteractOutside: false,
        trigger,
        content,
        $$slots: { trigger: true, content: true }
      });
    }
    $$payload2.out += `<!----></div></div> <div class="px-5 py-2"><div class="flex items-center text-xs text-gray-400 gap-2 py-2"><i class="fa-solid fa-diagram-project"></i> <p>${escape_html(mappinginferencetip2())}</p></div> <!---->`;
    {
      $$payload2.out += `<!---->`;
      {
        RecursiveTreeView($$payload2, {
          nodes: transformToTreeView(Object.entries(tree)),
          hover: "hover:bg-initial",
          get expandedNodes() {
            return expandedNodes;
          },
          set expandedNodes($$value) {
            expandedNodes = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!---->`;
    }
    $$payload2.out += `<!----></div></div></div> <div class="w-72 flex-shrink-0 space-y-4"><div class="space-y-2">`;
    if (canEditObject && !data.compliance_assessment.is_locked && page.data?.featureflags?.validation_flows) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="w-full px-4 py-3 bg-[#0077CC] text-white rounded-lg hover:bg-[#005FA3] transition-colors flex items-center justify-center gap-2 font-medium shadow-sm" data-testid="submit-assessment-button"><i class="fa-solid fa-paper-plane w-4 h-4"></i> ${escape_html(requestvalidation1())}</button>`;
    } else if (canEditObject) {
      $$payload2.out += "<!--[1-->";
      Anchor($$payload2, {
        breadcrumbAction: "push",
        href: `${page.url.pathname}/edit?next=${page.url.pathname}`,
        class: "unstyled w-full px-4 py-3 bg-[#0077CC] text-white rounded-lg hover:bg-[#005FA3] transition-colors flex items-center justify-center gap-2 font-medium shadow-sm",
        "data-testid": "edit-button",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-pen-to-square w-4 h-4"></i> <span>${escape_html(edit())}</span>`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      let trigger = function($$payload3) {
        $$payload3.out += `<span data-testid="export-button" class="flex items-center gap-2"><i class="fa-solid fa-download w-4 h-4"></i> <span>${escape_html(exportbutton1())}</span></span>`;
      }, content = function($$payload3) {
        $$payload3.out += `<div><p class="block px-4 py-2 text-sm font-medium text-gray-800">${escape_html(complianceassessment1())}</p> `;
        if (!page.data.user.is_third_party) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/export/csv`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(ascsv3())}</a> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/export/xlsx`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(asxlsx4())}</a> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/export/word`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(asword1())}</a>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/export`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(aszip3())}</a> `;
        if (!page.data.user.is_third_party) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<div class="border-t border-gray-100 my-1"></div> <p class="block px-4 py-2 text-sm font-medium text-gray-800">${escape_html(actionplan1())}</p> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/action-plan/export/csv`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(ascsv3())}</a> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/action-plan/export/xlsx`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(asxlsx4())}</a> <a${attr("href", `/compliance-assessments/${stringify(data.compliance_assessment.id)}/action-plan/export/pdf`)} class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">... ${escape_html(aspdf3())}</a>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--></div>`;
      };
      Popover($$payload2, {
        open: exportPopupOpen,
        onOpenChange: (e) => exportPopupOpen = e.open,
        positioning: { placement: "bottom" },
        triggerBase: "w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer",
        contentBase: "card whitespace-nowrap bg-white py-2 w-fit shadow-lg rounded-xl border border-gray-200",
        zIndex: "1000",
        trigger,
        content,
        $$slots: { trigger: true, content: true }
      });
    }
    $$payload2.out += `<!----> `;
    if (!page.data.user.is_third_party) {
      $$payload2.out += "<!--[-->";
      Anchor($$payload2, {
        href: `${page.url.pathname}/evidences-list`,
        breadcrumbAction: "push",
        class: "unstyled w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-paperclip w-4 h-4"></i> <span>${escape_html(evidences())}</span>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Anchor($$payload2, {
        href: `${page.url.pathname}/action-plan`,
        breadcrumbAction: "push",
        class: "unstyled w-full px-4 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm",
        "data-testid": "action-plan-button",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-box-archive w-4 h-4"></i> <span>${escape_html(actionplan1())}</span>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <!---->`;
    {
      $$payload2.out += `<div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"><h3 class="text-sm font-semibold text-gray-900 mb-4">${escape_html(progress())}</h3> `;
      if (data.global_score && data.global_score.score >= 0 && data.global_score.max_score > 0) {
        $$payload2.out += "<!--[-->";
        const progressPercent = Math.round(data.global_score.score * 100 / data.global_score.max_score);
        const circumference = 2 * Math.PI * 45;
        const strokeDashoffset = circumference - progressPercent / 100 * circumference;
        $$payload2.out += `<div class="flex items-center justify-center mb-4"><div class="relative w-28 h-28"><svg class="transform -rotate-90" viewBox="0 0 120 120"><circle cx="60" cy="60" r="45" fill="none" stroke="#E5E7EB" stroke-width="12"></circle><circle cx="60" cy="60" r="45" fill="none" stroke="#0891b2" stroke-width="12" stroke-linecap="round"${attr("stroke-dasharray", circumference)}${attr("stroke-dashoffset", strokeDashoffset)} class="transition-all duration-700 ease-out"></circle></svg> <div class="absolute inset-0 flex flex-col items-center justify-center"><div class="text-2xl font-bold text-gray-900">${escape_html(progressPercent)}%</div> <div class="text-[10px] text-gray-500 uppercase tracking-wide">completed</div></div></div></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (data.compliance_assessment.progress_status_enabled && compliance_assessment_donut_values?.status?.values) {
        $$payload2.out += "<!--[-->";
        const each_array_5 = ensure_array_like(compliance_assessment_donut_values.status.values);
        $$payload2.out += `<div class="space-y-2.5"><!--[-->`;
        for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
          let statusItem = each_array_5[$$index_5];
          const statusKey = statusItem.name;
          const mapped = progressStatusMap[statusKey];
          $$payload2.out += `<div class="flex items-center justify-between text-sm"><div class="flex items-center gap-2"><span${attr_class(`w-2.5 h-2.5 rounded-full ${stringify(mapped?.dotColor ?? "bg-gray-300")}`)}></span> <span class="text-gray-600">${escape_html(mapped?.label ?? safeTranslate(statusKey))}</span></div> <span class="font-medium text-gray-900">${escape_html(statusItem.value)}</span></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!----> `;
    if (treeCategories.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_6 = ensure_array_like(treeCategories);
      $$payload2.out += `<div class="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"><h3 class="text-sm font-semibold text-gray-900 mb-3">${escape_html(domainscoverage1())}</h3> <div class="space-y-2"><!--[-->`;
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let cat = each_array_6[$$index_6];
        const barWidth = totalTreeRequirements > 0 ? cat.reqCount / totalTreeRequirements * 100 : 0;
        $$payload2.out += `<div><div class="flex items-center justify-between text-xs mb-1"><span class="text-gray-600 truncate mr-2">${escape_html(cat.index)}. ${escape_html(cat.name)}</span> <span class="text-gray-400 flex-shrink-0">${escape_html(cat.reqCount)}</span></div> <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-[#0077CC] rounded-full transition-all duration-500"${attr_style(`width: ${stringify(barWidth)}%`)}></div></div></div>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="pt-2 space-y-2"><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">${escape_html(powerups1())}</p> `;
    if (!page.data.user.is_third_party && !data.compliance_assessment.is_locked) {
      $$payload2.out += "<!--[-->";
      Anchor($$payload2, {
        breadcrumbAction: "push",
        href: `${page.url.pathname}/flash-mode`,
        class: "unstyled w-full px-4 py-2.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors text-sm flex items-center gap-2",
        "data-testid": "flash-mode-button",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-bolt w-4"></i> ${escape_html(flashmode1())}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (!data.compliance_assessment.is_locked) {
      $$payload2.out += "<!--[-->";
      Anchor($$payload2, {
        breadcrumbAction: "push",
        href: `${page.url.pathname}/table-mode`,
        class: "unstyled w-full px-4 py-2.5 bg-[#0A1628] text-white rounded-lg hover:bg-[#1a2740] transition-colors text-sm flex items-center gap-2",
        "data-testid": "table-mode-button",
        children: ($$payload3) => {
          $$payload3.out += `<i class="fa-solid fa-table-list w-4"></i> ${escape_html(tablemode1())}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (!page.data.user.is_third_party) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2" data-testid="clone-audit-button"><i class="fa-solid fa-copy w-4"></i> ${escape_html(cloneaudit1())}</button> <button class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2" data-testid="compare-audit-button"><i class="fa-solid fa-code-compare w-4"></i> ${escape_html(comparetoaudit2())}</button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (Object.hasOwn(page.data.user.permissions, "add_appliedcontrol") && data.compliance_assessment.framework.reference_controls.length > 0 && !data.compliance_assessment.is_locked) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">`;
      {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<i class="fa-solid fa-wand-magic-sparkles w-4"></i>`;
      }
      $$payload2.out += `<!--]--> ${escape_html(suggestcontrols1())}</button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    if (has_threats && !page.data.user.is_third_party) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="w-full px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2"><i class="fa-solid fa-triangle-exclamation"></i> <span class="font-bold">${escape_html(data.threats.total_unique_threats)}</span> <span>${escape_html(potentialthreats1())}</span></button>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div></div> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
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

export { _page as default };
//# sourceMappingURL=_page.svelte-DVW-iSBk.js.map
