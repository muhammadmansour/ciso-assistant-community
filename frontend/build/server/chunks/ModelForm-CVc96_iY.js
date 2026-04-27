import { p as push, M as store_get, s as setContext, O as copy_payload, P as assign_payload, Q as unsubscribe_stores, a as pop, W as ensure_array_like, V as escape_html, Y as spread_props, T as attr, S as attr_class, X as stringify, R as bind_props, a3 as store_set, _ as spread_attributes, ab as maybe_selected, U as clsx, Z as attr_style, ac as store_mutate } from './index2-9icAqEyj.js';
import { r as run } from './legacy-server-DMdb6ZTL.js';
import { o as onDestroy } from './index-server-DEEfjxiI.js';
import { F as Form } from './Form-BDbIHs7i.js';
import { T as TextField } from './TextField-BVNBwpE8.js';
import { M as MarkdownField } from './MarkdownField-BtAWDjt8.js';
import { L as LoadingSpinner } from './LoadingSpinner-09kJChNn.js';
import { A as AutocompleteSelect, g as getModelInfo } from './crud-C1TvVbAO.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as superForm, f as formFieldProxy, h as fileProxy } from './formData-Dnvf_dKY.js';
import './utils-FiC4zhrQ.js';
import { S as Select } from './Select-5PRB9c-j.js';
import { bj as taintedformmessage2, bk as missingmandatoyobjects12, bl as missingmandatoyobjects22, bm as referencecontrol1, bn as referencecontrolhelptext3, bo as description, bp as cancel, G as loading, bq as save, br as labels, bs as labelshelptext2, bt as disasterrecoveryobjectives2, bu as securityobjectives1, bv as recoverycapabilities1, bw as securitycapabilities1, bx as organisationobjectivesdescription2, by as organisationobjectives1, bz as organisationissuesdescription2, bA as organisationissues1, bB as organisationdescription1, bC as organization, bD as tasktemplatesdescription2, bE as tasks, bF as xraysdescription2, b4 as xrays1, bG as incidentsdescription1, bH as incidents, bI as findingsassessmentsdescription2, bJ as followup1, bK as metrologydescription1, bL as metrology, bM as operationsdescription1, bN as operations, bO as projectmanagementdescription2, bP as projectmanagement1, bQ as reportsdescription1, aF as reports, bR as thirdpartydescription2, bS as thirdparty1, bT as contractsdescription1, bU as contracts, bV as validationflowsdescription2, bW as validationflows1, bX as assetclassmanagementandgovernancedescription5, bY as assetclassmanagementandgovernance4, bZ as complianceassessmentsdescription2, b_ as compliance, b$ as privacydescription1, c0 as privacy, c1 as riskacceptancesdescription2, c2 as riskacceptances1, c3 as securityexceptionsdescription2, c4 as securityexceptions1, c5 as inherentrisklevelhelptext4, c6 as inherentrisk1, c7 as vulnerabilitiesdescription1, c8 as vulnerabilities, c9 as ebiosrmdescription2, ca as ebiosrm2, cb as quantitativeriskstudiesdescription3, cc as quantitativeriskstudies2, cd as scoringassistantdescription2, aK as scoringassistant1, ce as businessimpactanalysisdescription3, cf as businessimpactanalysis2, cg as complianceriskmanagementdescription3, ch as complianceriskmanagement2, ci as riskoriginhelptext3, cj as terminologies, ck as webhooksdescription1, cl as webhooks, cm as experimentalfeatures1, cn as experimental, co as extradescription1, cp as extra, cq as domain, cr as findingsassessment1, cs as riskassessment1, ct as complianceassessment1, cu as refid1, cv as lcstatus1, cw as defaultassignee1, cx as defaultassigneehelptext3, cy as perimeter, cz as version, cA as status, cB as riskmatrix1, cC as riskassessmentmatrixhelptext4, cD as risktolerancehelptext3, cE as risktolerance1, cF as authors, cG as more, cH as reviewers, cI as etahelptext2, cJ as eta, cK as duedatehelptext3, cL as duedate1, cM as observation, cN as islockedhelptext3, cO as islocked1, cP as ebiosrmstudy2, cQ as provider, cR as assets, cS as riskorigin1, cT as threats, cU as owner, cV as progress, cW as evidences, cX as priority, cY as startdatehelptext3, cZ as startdate1, c_ as expirydatehelptext3, c$ as expirydate1, d0 as efforthelptext2, d1 as effort, d2 as impacthelptext2, d3 as controlimpact1, d4 as observationhelptext2, d5 as cost, d6 as buildcosts1, d7 as runcosts1, d8 as relationships, d9 as category, da as csffunction1, db as objectives, dc as linkhelptext2, dd as link, de as integrations, df as integrationprovider1, dg as integrationproviderhelptext3, dh as remoteobject1, di as remoteobjecthelptext3, dj as createremoteobjecthelptext4, dk as createremoteobject2, dl as syncedwith1, dm as deletesyncmapping2, dn as remoteid1, dp as lastsynced1, dq as bringtheevidenceshelptext4, dr as bringtheevidences2, ds as severity, dt as appliedcontrols1, du as approver, dv as approverhelptext2, dw as riskscenarios1, dx as riskacceptanceriskscenarioshelptext5, dy as validationapproverhelptext3, dz as requestnotes1, dA as validationdeadline1, dB as complianceassessments1, dC as riskassessments1, dD as findingsassessments1, dE as attachment, dF as attachmentwarningtext2, dG as attachmenthelptext2, dH as baseline, dI as ebiosrmstudies2, dJ as targetframework1, dK as framework, dL as selectedimplementationgroups2, dM as versionhelptext2, dN as usedocumentationscorehelptext4, dO as usedocumentationscore2, dP as extendedresultenabledhelptext4, dQ as extendedresultenabled2, dR as progressstatusenabledhelptext4, dS as progressstatusenabled2, dT as perimeters, dU as campaigndomainhelptext3, dV as assetclass1, dW as parentassets1, dX as supportedassetshelptext3, dY as supportassets1, dZ as supportingassetshelptext3, b as m, d_ as doraspecific1, d$ as isbusinessfunction2, e0 as doralicencedactivity2, e1 as doracriticalityassessment2, e2 as doracriticalityjustification2, e3 as doradiscontinuingimpact2, e4 as appliedcontrolslinkedtoassethelptext6, e5 as overriddenchildrencapabilities2, e6 as overriddenchildrencapabilitieshelptext4, e7 as solutions, e8 as solutionslinkedtoassethelptext5, e9 as result, ea as extendedresult1, eb as isactive1, ec as relationship, ed as moreonterminologieshelptext4, ee as parententity1, ef as parententityhelptext3, eg as country, eh as currency, ei as doraproviderpersontype3, ej as referencelink1, ek as doraentitytype2, el as doraentityhierarchy2, em as doracompetentauthority2, en as createaudithelptext3, eo as createaudit1, ep as entity, eq as criticality, er as representatives, es as entityassessmentrepresentativeshelptext4, et as conclusion, U as evidence, eu as entityassessmentevidencehelptext4, ev as providerentity1, ew as doraassessment1, ex as doraictservicetype3, ey as storageofdata2, ez as datalocationstorage2, eA as datalocationprocessing2, eB as doradatasensitiveness2, eC as dorareliancelevel2, eD as dorasubstitutability1, eE as doranonsubstitutabilityreason3, eF as dorahasexitplan3, eG as dorareintegrationpossibility2, eH as doraalternativeprovidersidentified3, eI as doraalternativeproviders2, eJ as doracontractualarrangement2, eK as enddate1, eL as beneficiaryentity1, eM as documents, eN as overarchingcontract1, eO as overarchingcontracthelptext3, eP as terminationreason1, eQ as governinglawcountry2, eR as isintragroup1, eS as email, eT as userlinkedtorepresentative3, eU as createuserhelptext3, eV as createuser1, eW as firstname1, eX as lastname1, eY as phone, eZ as role, e_ as usergroups1, e$ as isactivehelptext3, f0 as keeplocalloginhelptext4, f1 as keeplocallogin2, f2 as userexpiryhelptext3, f3 as createduserwillhavenorights5, f4 as teamemail1, f5 as leader, f6 as deputies, f7 as members, f8 as enablessohelptext5, f9 as enablesso3, fa as forcessologinhelptext6, fb as forcessologin4, fc as forcessologinhelptext26, fd as label, fe as asset, ff as scopedasset1, fg as extradependencies1, fh as extradependencieshelptext3, fi as bia, fj as associatedcontrols1, fk as associatedcontrolsbiahelptext4, fl as recoverydocumented1, fm as recoverytested1, fn as recoverytargetsmet2, fo as evidencesbiahelptext3, fp as assetassessment1, fq as qualifications, fr as impact, fs as assignedto1, ft as processingnature1, fu as dpiarequired1, fv as dpiareferencehelptext3, fw as dpiareference1, fx as associatedappliedcontrols2, fy as legalbasis1, fz as processing, fA as retention, fB as deletionpolicy1, fC as issensitive1, fD as relationshiptype1, fE as documentationlink1, fF as requestedon1, fG as requesttype1, fH as processings, fI as discoveredon1, fJ as breachtype1, fK as databreachrisklevel3, fL as databreachrisklevelhelptext5, fM as name, fN as quotationmethod1, fO as ebiosrmmatrixhelptext4, fP as activityone1, fQ as activitytwo1, fR as studyassethelptext3, fS as fearedeventhelptext3, fT as folder, fU as gravityhelptext2, fV as gravity, fW as fearedeventassethelptext4, fX as fearedeventqualificationhelptext4, fY as fearedeventisselectedhelptext5, fZ as isselected1, f_ as motivationhelptext2, f$ as motivation, g0 as resourceshelptext2, g1 as resources, g2 as activityhelptext2, g3 as ro_activity, g4 as activitythree1, g5 as rotoisselectedhelptext5, ab as fearedevents1, g6 as rotofearedeventhelptext5, g7 as stakeholderentityhelptext3, g8 as stakeholdercategoryhelptext3, g9 as currentassessment1, ga as dependencyhelptext2, gb as dependency, gc as penetrationhelptext2, gd as penetration, ge as maturityhelptext2, gf as maturity, gg as trusthelptext2, gh as trust, gi as stakeholderisselectedhelptext4, gj as selected, gk as addappliedcontrol2, gl as targetassessment1, gm as strategicscenariohelptext3, gn as rotocouple2, go as focusedfearedevent2, gp as strategicscenario1, gq as stakeholders, gr as attackpathstakeholdershelptext4, gs as attackpathisselectedhelptext5, gt as attackpath1, gu as elementaryactionstechniques2, gv as operationalscenariothreatshelptext4, gw as likelihoodhelptext2, gx as likelihood, gy as operationalscenarioisselectedhelptext5, gz as owners, gA as expirationdate1, gB as reportedat1, gC as detectedby1, gD as unknown, gE as critical, gF as major, gG as moderate, gH as minor, gI as low, gJ as entities, gK as incident, gL as entrytype1, gM as entry, gN as timestamp, gO as date, gP as isrecurrenthelptext3, gQ as recurrent, gR as schedule, gS as each, gT as frequency, gU as day, gV as week, gW as month, gX as year, gY as the, gZ as weeks, g_ as first, g$ as second, h0 as third, h1 as fourth, h2 as last, h3 as days, h4 as monday, h5 as tuesday, h6 as wednesday, h7 as thursday, h8 as friday, h9 as saturday, ha as sunday, hb as of, hc as january, hd as february, he as march, hf as april, hg as may, hh as june, hi as july, hj as august, hk as september, hl as october, hm as november, hn as december, ho as taskscheduleinfo2, hp as tasktemplateevidencehelptext4, hq as enabled, hr as tasknodelegacyevidence3, hs as attackstage1, ht as threat, hu as icon, hv as operatingmodes1, hw as operationalscenario1, aj as elementaryactions1, hx as operatingmode1, W as elementaryaction1, hy as antecedents, hz as antecedentshelptext2, hA as logicoperatorhelptext3, hB as logicoperator1, hC as isselectedhelptext3, hD as quantriskpriorityhelptext4, hE as quantitativeriskscenario2, hF as hypothesisstage1, hG as treatment, hH as existingcontrols1, hI as addedcontrols1, hJ as removedcontrols1, hK as simulationparameters1, hL as probabilitypercent1, hM as probabilitypercenthelptext3, hN as lowerboundhelptext3, hO as expectedlosslowerbound3, hP as upperboundhelptext3, hQ as expectedlossupperbound3, hR as origin, hS as healthfieldhelptext3, hT as health, hU as metricinstances1, hV as tasktemplates1, hW as fieldpath1, hX as isvisiblehelptext3, hY as isvisible1, hZ as entityassessments1, h_ as policies, h$ as author, i0 as checklist, i1 as linkedcollection1, i2 as authority, i3 as regulatoryauthorityhelptext3, i4 as choicesdefinition1, i5 as unit, i6 as defaulttargethelptext3, i7 as defaulttarget1, i8 as higherisbetterhelptext4, i9 as higherisbetter2, ia as metricdefinition1, ib as collectionfrequency1, ic as targetvalue1, id as metricinstance1, ie as value, K as select, ig as dashboard, ih as widgettitle1, ii as charttype1, ij as timerange1, ik as showtarget1, il as textcontent1, im as targetobjecttype2, io as targetobject1, ip as metric, iq as legalidentifiers1, ir as addlegalidentifier2, is as nolegalidentifieradded3, it as identifiererrormessage2, iu as identifiertype1, iv as identifiervalue1, iw as enteridentifiervalue2, ix as removeidentifier1, iy as providerid2, iz as clientidhelptext4, iA as clientid2, iB as secrethelptext2, iC as secret, iD as clientsecretalreadysethelptext5, iE as resetclientsecret2, iF as oidcconfiguration1, iG as serverurl3, iH as idpconfiguration3, iI as oidctokenauthmethodhelptext5, iJ as tokenauthmethod2, iK as oidcpkceenabledhelptext7, iL as oauthpkceenabled5, iM as advancedsettings1, iN as idpentityid5, iO as fillmetadataurl4, iP as metadataurl3, iQ as or, iR as fillssoslourlx509cert9, iS as ssourl6, iT as slourl6, iU as x509cert1, iV as samlidpconfiguration7, iW as spentityid5, iX as spconfiguration3, iY as attributemappinguid4, iZ as attributemappingemailverified3, i_ as attributemappingemail2, i$ as allowrepeatattributename3, j0 as allowsinglelabeldomains3, j1 as digestalgorithm1, j2 as logoutrequestsigned2, j3 as logoutresponsesigned2, j4 as metadatasigned1, j5 as nameidencrypted3, j6 as rejectdeprecatedalgorithm2, j7 as rejectidpinitiatedsso6, j8 as signaturealgorithm1, j9 as wantassertionencrypted2, ja as wantassertionsigned2, jb as wantattributestatement2, jc as wantmessagesigned2, jd as wantnameid3, je as wantnameidencrypted4, jf as authnrequestsigned2, jg as samlauthnrequestsignedhelptext5, jh as generate, ji as downloadcertificate1, jj as samlcertificatehelptext3, jk as samlprivatekeyhelptext4, jl as privatekey1, jm as spprivatekeyalreadysethelptext6, jn as resetspprivatekey3, jo as settingsnotificationsmail2, jp as settingsnotifications1, jq as securityobjectivescale2, jr as securityobjectivescalehelptext4, js as settingsaggregatematrix2, jt as settingsriskmatrixswapaxeshelptext6, ju as settingsriskmatrixswapaxes4, jv as settingsriskmatrixflipverticalhelptext6, jw as settingsriskmatrixflipvertical4, jx as iso27005, jy as settingsriskmatrix2, jz as greenzoneradius2, jA as yellowzoneradius2, jB as redzoneradius2, jC as ebiosradarparameters2, jD as currencyhelptext2, jE as dailyratehelptext3, jF as dailyrate1, jG as financialsettings1, jH as mappingmaxdepthhelptext4, jI as mappingmaxdepth2, jJ as requirementmappingsets2, jK as allowselfvalidationhelptext4, jL as allowselfvalidation2, jM as workflows, jN as showwarningexternallinkshelptext5, jO as showwarningexternallinks3, jP as security, jQ as allowassignmentstoentitiesdescription4, jR as allowassignmentstoentities3, jS as assignmentsettings1, jT as affectedsubjectscount2, jU as affectedprocessings1, jV as affectedpersonaldata2, jW as affectedpersonaldatacount3, jX as potentialconsequences1, jY as authorities, jZ as authoritynotifiedon2, j_ as authoritynotificationref2, j$ as subjectsnotifiedon2, k0 as remediationmeasures1, k1 as translations, k2 as addtranslation1, k3 as notranslationadded2, k4 as translationerrormessage2, k5 as language, k6 as selectlanguageplaceholder2, k7 as deselectall1, k8 as selectall1, k9 as annotation, ka as onetimeimplementationcost3, kb as fixedcost1, kc as implementationhelptext2, kd as peopledays1, ke as amortizationperiodhelptext3, kf as amortizationperiod1, kg as annualoperationalcost2, kh as annualmandayshelptext4, ki as riskacceptancejusitficationhelptext4, kj as justification, kk as createappliedcontrolsfromsuggestionshelptext6, kl as suggestcontrols1, km as mission, kn as doraassetsvalue2, ko as annualexpense1, kp as noticeperiodentity2, kq as noticeperiodprovider2, kr as importfolderhelptext3, ks as file, kt as loadmissinglibrarieshelptext4, ku as loadmissinglibraries2, kv as guarantees, kw as targetobjectivehelptext3, kx as targetobjective1, ky as interval, kz as pointintime2, kA as lossthresholdhelptext3, kB as lossthreshold1, kC as permissions, kD as operatingmodesdescriptionhelptext4, kE as operatingmodesdescription2 } from './_index-D7NdhnXA.js';
import { D as Dropdown } from './Dropdown-DMQZzGLP.js';
import { C as Checkbox } from './Checkbox-BWsW28Xu.js';
import { S as Score } from './Score-CSpnV2pu.js';
import { p as page$1 } from './index3-BwfRm5YV.js';
import { s as safeTranslate, d as defaultLangLabels, l as language$1, L as LOCALE_MAP } from './i18n-CMphL55V.js';
import { g as getLocale, c as locales } from './runtime-BKo9q3Zd.js';
import { M as MarkdownRenderer } from './MarkdownRenderer-B6VNWr3Z.js';
import { H as HiddenInput } from './HiddenInput-D0PY8sFK.js';
import { S as SECURITY_OBJECTIVE_SCALE_MAP, c as complianceResultTailwindColorMap, b as complianceResultColorMap } from './constants-QzmVibOJ.js';
import { R as RadioGroup } from './RadioGroup-BatokiWT.js';
import { A as Accordion } from './index4-CU0xjTbD.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import { A as Anchor } from './Anchor-u--4IyDz.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './string-BMZjP7XX.js';
import './client-DqP3yP6V.js';
import { a as createModalCache } from './stores-D-WMoATo.js';
import 'marked';
import { m as modelSchema } from './schemas-DwUKC0vK.js';
import { g as goto } from './breadcrumbs-BA0IMSh1.js';
import { O as OrderedEntryList } from './OrderedEntryList-CrLSQJHa.js';
import { p as page } from './stores3-psVfZSQ7.js';
import { z as zod } from './zod-BTgf12zS.js';
import { g as getSecureRedirect } from './helpers-Bm9n0CNG.js';

function TextArea($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    label: label2 = void 0,
    field,
    helpText = void 0,
    form,
    cachedValue = void 0,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    hidden = false,
    disabled = false,
    rows = 5,
    cols = 50,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label2 = label2 ?? field;
  const { value: value2, errors, constraints } = formFieldProxy(form, field);
  run(() => {
    cachedValue = store_get($$store_subs ??= {}, "$value", value2);
  });
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  $$payload.out += `<div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label2 !== void 0 && !hidden) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)}</label>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="control"><textarea${spread_attributes(
    {
      class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
      "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
      name: field,
      "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
      placeholder: "",
      ...store_get($$store_subs ??= {}, "$constraints", constraints),
      ...rest,
      rows,
      cols,
      disabled
    },
    null
  )}>`;
  const $$body = escape_html(store_get($$store_subs ??= {}, "$value", value2));
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500 whitespace-pre-line">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label: label2, cachedValue });
  pop();
}
function RiskAssessmentForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let riskToleranceChoices = [];
  form.data?.is_locked || object?.is_locked || false;
  async function handleRiskMatrixChange(id) {
    riskToleranceChoices = [];
    if (id) {
      try {
        const response = await fetch(`/risk-matrices/${id}`);
        if (response.ok) {
          const data = await response.json();
          const riskMatrix = data.results && data.results.length > 0 ? data.results.find((item) => item.id === id) : null;
          if (riskMatrix && riskMatrix.json_definition) {
            const jsonDefinition = JSON.parse(riskMatrix.json_definition);
            const riskLevels = jsonDefinition.risk || [];
            riskToleranceChoices = [
              { label: "--", value: -1 },
              ...riskLevels.map((level, index) => ({ label: level.name, value: level.id ?? index }))
            ];
          }
        }
      } catch (error) {
        console.error("Error fetching risk matrix data:", error);
        riskToleranceChoices = [];
      }
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeter",
      cacheLock: cacheLocks["perimeter"],
      label: perimeter(),
      hidden: initialData.perimeter,
      get cachedValue() {
        return formDataCache["perimeter"];
      },
      set cachedValue($$value) {
        formDataCache["perimeter"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "version",
      label: version(),
      cacheLock: cacheLocks["version"],
      get cachedValue() {
        return formDataCache["version"];
      },
      set cachedValue($$value) {
        formDataCache["version"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!duplicate) {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        options: model.selectOptions["status"],
        translateOptions: false,
        field: "status",
        hide: true,
        label: status(),
        cacheLock: cacheLocks["status"],
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        translateOptions: false,
        disableDoubleDash: true,
        optionsEndpoint: "risk-matrices",
        field: "risk_matrix",
        cacheLock: cacheLocks["risk_matrix"],
        label: riskmatrix1(),
        helpText: object?.id ? riskassessmentmatrixhelptext4() : "",
        onChange: async (e) => await handleRiskMatrixChange(e),
        mount: async (e) => await handleRiskMatrixChange(e),
        get cachedValue() {
          return formDataCache["risk_matrix"];
        },
        set cachedValue($$value) {
          formDataCache["risk_matrix"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      if (riskToleranceChoices.length > 0) {
        $$payload2.out += "<!--[-->";
        Select($$payload2, {
          form,
          translateOptions: false,
          disableDoubleDash: true,
          options: riskToleranceChoices,
          field: "risk_tolerance",
          cacheLock: cacheLocks["risk_tolerance"],
          label: risktolerance1(),
          helpText: risktolerancehelptext3(),
          get cachedValue() {
            return formDataCache["risk_tolerance"];
          },
          set cachedValue($$value) {
            formDataCache["risk_tolerance"] = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "actors",
        optionsLabelField: "str",
        optionsInfoFields: {
          fields: [{ field: "type", translate: true }],
          position: "prefix"
        },
        field: "authors",
        cacheLock: cacheLocks["authors"],
        label: authors(),
        get cachedValue() {
          return formDataCache["authors"];
        },
        set cachedValue($$value) {
          formDataCache["authors"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-list",
        header: more(),
        children: ($$payload3) => {
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "actors",
            optionsLabelField: "str",
            optionsInfoFields: {
              fields: [{ field: "type", translate: true }],
              position: "prefix"
            },
            field: "reviewers",
            cacheLock: cacheLocks["reviewers"],
            label: reviewers(),
            get cachedValue() {
              return formDataCache["reviewers"];
            },
            set cachedValue($$value) {
              formDataCache["reviewers"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "eta",
            label: eta(),
            helpText: etahelptext2(),
            cacheLock: cacheLocks["eta"],
            get cachedValue() {
              return formDataCache["eta"];
            },
            set cachedValue($$value) {
              formDataCache["eta"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "due_date",
            label: duedate1(),
            helpText: duedatehelptext3(),
            cacheLock: cacheLocks["due_date"],
            get cachedValue() {
              return formDataCache["due_date"];
            },
            set cachedValue($$value) {
              formDataCache["due_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          MarkdownField($$payload3, {
            form,
            field: "observation",
            label: observation(),
            cacheLock: cacheLocks["observation"],
            get cachedValue() {
              return formDataCache["observation"];
            },
            set cachedValue($$value) {
              formDataCache["observation"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Checkbox($$payload3, {
            form,
            field: "is_locked",
            label: islocked1(),
            helpText: islockedhelptext3(),
            cacheLock: cacheLocks["is_locked"],
            get cachedValue() {
              return formDataCache["is_locked"];
            },
            set cachedValue($$value) {
              formDataCache["is_locked"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
      $$payload2.out += `<!----> `;
      if (initialData.ebios_rm_study) {
        $$payload2.out += "<!--[-->";
        AutocompleteSelect($$payload2, {
          form,
          field: "ebios_rm_study",
          cacheLock: cacheLocks["ebios_rm_study"],
          label: ebiosrmstudy2(),
          hidden: true,
          get cachedValue() {
            return formDataCache["ebios_rm_study"];
          },
          set cachedValue($$value) {
            formDataCache["ebios_rm_study"] = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function PerimeterForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["lc_status"],
      disableDoubleDash: true,
      field: "lc_status",
      label: lcstatus1(),
      cacheLock: cacheLocks["lc_status"],
      get cachedValue() {
        return formDataCache["lc_status"];
      },
      set cachedValue($$value) {
        formDataCache["lc_status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "default_assignee",
      cacheLock: cacheLocks["default_assignee"],
      label: defaultassignee1(),
      helpText: defaultassigneehelptext3(),
      get cachedValue() {
        return formDataCache["default_assignee"];
      },
      set cachedValue($$value) {
        formDataCache["default_assignee"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function ThreatForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "annotation",
      label: annotation(),
      cacheLock: cacheLocks["annotation"],
      get cachedValue() {
        return formDataCache["annotation"];
      },
      set cachedValue($$value) {
        formDataCache["annotation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "provider",
      label: provider(),
      cacheLock: cacheLocks["provider"],
      get cachedValue() {
        return formDataCache["provider"];
      },
      set cachedValue($$value) {
        formDataCache["provider"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      translateOptions: false,
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function RiskScenarioForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    updated_fields = /* @__PURE__ */ new Set(),
    object,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  object?.risk_assessment?.is_locked || false;
  async function fetchDefaultRefId(riskAssessmentId) {
    try {
      const response = await fetch(`/risk-scenarios/default-ref-id/?risk_assessment=${riskAssessmentId}`);
      const result2 = await response.json();
      if (response.ok && result2.results) {
        form.form.update((currentData) => {
          updated_fields.add("ref_id");
          return { ...currentData, ref_id: result2.results };
        });
      } else {
        console.error(result2.error || "Failed to fetch default ref_id");
      }
    } catch (error) {
      console.error("Error fetching default ref_id:", error);
    }
  }
  const scopeFolder = rest?.scopeFolder || { id: "" };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "risk-assessments",
      optionsExtraFields: [["perimeter", "str"]],
      optionsLabelField: "str",
      field: "risk_assessment",
      cacheLock: cacheLocks["risk_assessment"],
      label: riskassessment1(),
      hidden: initialData.risk_assessment,
      onChange: async (e) => {
        if (e) {
          await fetchDefaultRefId(e);
        }
      },
      get cachedValue() {
        return formDataCache["risk_assessment"];
      },
      set cachedValue($$value) {
        formDataCache["risk_assessment"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "assets",
      optionsExtraFields: [["folder", "str"]],
      optionsDetailedUrlParameters: [
        scopeFolder?.id ? ["scope_folder_id", scopeFolder.id] : ["", void 0]
      ],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      optionsLabelField: "auto",
      field: "assets",
      cacheLock: cacheLocks["assets"],
      label: assets(),
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "terminologies?field_path=ro_to.risk_origin&is_visible=true",
      optionsLabelField: "translated_name",
      field: "risk_origin",
      cacheLock: cacheLocks["risk_origin"],
      label: riskorigin1(),
      get cachedValue() {
        return formDataCache["risk_origin"];
      },
      set cachedValue($$value) {
        formDataCache["risk_origin"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "threats",
      optionsExtraFields: [["folder", "str"]],
      optionsDetailedUrlParameters: [
        scopeFolder?.id ? ["scope_folder_id", scopeFolder.id] : ["", void 0]
      ],
      optionsLabelField: "auto",
      field: "threats",
      cacheLock: cacheLocks["threats"],
      label: threats(),
      get cachedValue() {
        return formDataCache["threats"];
      },
      set cachedValue($$value) {
        formDataCache["threats"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function NumberField($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    label: label2 = void 0,
    step = 1,
    field,
    valuePath = field,
    helpText = void 0,
    cachedValue = void 0,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    form,
    hidden = false,
    disabled = false,
    required = false,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label2 = label2 ?? field;
  const { value: value2, errors, constraints } = formFieldProxy(form, valuePath);
  run(() => {
    cachedValue = store_get($$store_subs ??= {}, "$value", value2);
  });
  run(() => {
    if (store_get($$store_subs ??= {}, "$value", value2) === "") {
      store_set(value2, null);
    }
  });
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  $$payload.out += `<div><div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label2 !== void 0 && !hidden) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required || required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)}</label>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="control"><input${spread_attributes(
    {
      type: "number",
      step,
      class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
      "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
      name: field,
      "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
      placeholder: "",
      value: store_get($$store_subs ??= {}, "$value", value2),
      ...store_get($$store_subs ??= {}, "$constraints", constraints),
      ...rest,
      disabled,
      required
    },
    null
  )}/></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { label: label2, cachedValue });
  pop();
}
function AppliedControlPolicyForm($$payload, $$props) {
  push();
  var $$store_subs;
  let displayCurrency = page$1.data?.settings?.currency ?? "€";
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    schema = {},
    origin: origin2 = null,
    initialData = {},
    context = "default"
  } = $$props;
  const formStore = form.form;
  let syncMappings = page$1.data?.object?.sync_mappings ?? [];
  run(() => {
    if (model?.selectOptions?.priority) {
      model.selectOptions.priority.forEach((element) => {
        element.value = parseInt(element.value);
      });
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (!duplicate) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "actors",
        optionsLabelField: "str",
        optionsInfoFields: {
          fields: [{ field: "type", translate: true }],
          position: "prefix"
        },
        field: "owner",
        cacheLock: cacheLocks["owner"],
        label: owner(),
        get cachedValue() {
          return formDataCache["owner"];
        },
        set cachedValue($$value) {
          formDataCache["owner"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions?.status,
        disableDoubleDash: true,
        field: "status",
        label: status(),
        cacheLock: cacheLocks["status"],
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Score($$payload2, {
        form,
        label: progress(),
        field: "progress_field",
        fullDonut: true,
        min_score: 0,
        max_score: 100
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        type: "date",
        form,
        field: "eta",
        label: eta(),
        helpText: etahelptext2(),
        cacheLock: cacheLocks["eta"],
        get cachedValue() {
          return formDataCache["eta"];
        },
        set cachedValue($$value) {
          formDataCache["eta"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "evidences",
        optionsExtraFields: [["folder", "str"]],
        field: "evidences",
        cacheLock: cacheLocks["evidences"],
        label: evidences(),
        get cachedValue() {
          return formDataCache["evidences"];
        },
        set cachedValue($$value) {
          formDataCache["evidences"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-tasks",
        header: projectmanagement1(),
        children: ($$payload3) => {
          TextField($$payload3, {
            form,
            field: "ref_id",
            label: refid1(),
            cacheLock: cacheLocks["ref_id"],
            get cachedValue() {
              return formDataCache["ref_id"];
            },
            set cachedValue($$value) {
              formDataCache["ref_id"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions?.priority,
            field: "priority",
            label: priority(),
            cacheLock: cacheLocks["priority"],
            get cachedValue() {
              return formDataCache["priority"];
            },
            set cachedValue($$value) {
              formDataCache["priority"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "start_date",
            label: startdate1(),
            helpText: startdatehelptext3(),
            cacheLock: cacheLocks["start_date"],
            get cachedValue() {
              return formDataCache["start_date"];
            },
            set cachedValue($$value) {
              formDataCache["start_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "expiry_date",
            label: expirydate1(),
            helpText: expirydatehelptext3(),
            cacheLock: cacheLocks["expiry_date"],
            get cachedValue() {
              return formDataCache["expiry_date"];
            },
            set cachedValue($$value) {
              formDataCache["expiry_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions?.effort,
            field: "effort",
            label: effort(),
            helpText: efforthelptext2(),
            cacheLock: cacheLocks["effort"],
            get cachedValue() {
              return formDataCache["effort"];
            },
            set cachedValue($$value) {
              formDataCache["effort"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions?.control_impact,
            field: "control_impact",
            label: controlimpact1(),
            helpText: impacthelptext2(),
            cacheLock: cacheLocks["control_impact"],
            get cachedValue() {
              return formDataCache["control_impact"];
            },
            set cachedValue($$value) {
              formDataCache["control_impact"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          MarkdownField($$payload3, {
            form,
            field: "observation",
            label: observation(),
            helpText: observationhelptext2(),
            cacheLock: cacheLocks["observation"],
            get cachedValue() {
              return formDataCache["observation"];
            },
            set cachedValue($$value) {
              formDataCache["observation"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-money-bill-1",
        header: cost(),
        children: ($$payload3) => {
          $$payload3.out += `<div class="space-y-2"><h5 class="font-medium text-gray-600 my-2 py-2">${escape_html(buildcosts1())}</h5> <div class="grid grid-cols-2 gap-4">`;
          NumberField($$payload3, {
            form,
            field: "cost.build.fixed_cost",
            label: `${stringify(fixedcost1())} (${stringify(displayCurrency)})`,
            helpText: onetimeimplementationcost3(),
            min: 0,
            step: 1
          });
          $$payload3.out += `<!----> `;
          NumberField($$payload3, {
            form,
            field: "cost.build.people_days",
            label: peopledays1(),
            helpText: implementationhelptext2(),
            min: 0,
            step: 0.5
          });
          $$payload3.out += `<!----> `;
          NumberField($$payload3, {
            form,
            field: "cost.amortization_period",
            label: amortizationperiod1(),
            helpText: amortizationperiodhelptext3(),
            min: 1,
            max: 50,
            step: 1
          });
          $$payload3.out += `<!----></div></div> <div class="space-y-2"><h5 class="font-medium text-gray-600 my-2 py-2">${escape_html(runcosts1())}</h5> <div class="grid grid-cols-2 gap-4">`;
          NumberField($$payload3, {
            form,
            field: "cost.run.fixed_cost",
            label: `${stringify(fixedcost1())} (${stringify(displayCurrency)})`,
            helpText: annualoperationalcost2(),
            min: 0,
            step: 1
          });
          $$payload3.out += `<!----> `;
          NumberField($$payload3, {
            form,
            field: "cost.run.people_days",
            label: peopledays1(),
            helpText: annualmandayshelptext4(),
            min: 0,
            step: 0.5
          });
          $$payload3.out += `<!----></div></div>`;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-project-diagram",
        header: relationships(),
        children: ($$payload3) => {
          if (schema.shape.category) {
            $$payload3.out += "<!--[-->";
            Select($$payload3, {
              form,
              options: model.selectOptions?.category,
              field: "category",
              label: category(),
              cacheLock: cacheLocks["category"],
              get cachedValue() {
                return formDataCache["category"];
              },
              set cachedValue($$value) {
                formDataCache["category"] = $$value;
                $$settled = false;
              }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          Select($$payload3, {
            form,
            options: model.selectOptions?.csf_function,
            field: "csf_function",
            label: csffunction1(),
            cacheLock: cacheLocks["csf_function"],
            get cachedValue() {
              return formDataCache["csf_function"];
            },
            set cachedValue($$value) {
              formDataCache["csf_function"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "assets",
            optionsLabelField: "auto",
            optionsExtraFields: [["folder", "str"]],
            optionsInfoFields: {
              fields: [{ field: "type" }],
              classes: "text-blue-500"
            },
            field: "assets",
            cacheLock: cacheLocks["assets"],
            label: assets(),
            get cachedValue() {
              return formDataCache["assets"];
            },
            set cachedValue($$value) {
              formDataCache["assets"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "organisation-objectives",
            optionsExtraFields: [["folder", "str"]],
            field: "objectives",
            cacheLock: cacheLocks["objectives"],
            label: objectives(),
            get cachedValue() {
              return formDataCache["objectives"];
            },
            set cachedValue($$value) {
              formDataCache["objectives"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "security-exceptions",
            optionsExtraFields: [["folder", "str"]],
            field: "security_exceptions",
            cacheLock: cacheLocks["security_exceptions"],
            label: securityexceptions1(),
            get cachedValue() {
              return formDataCache["security_exceptions"];
            },
            set cachedValue($$value) {
              formDataCache["security_exceptions"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            multiple: true,
            form,
            createFromSelection: true,
            optionsEndpoint: "filtering-labels",
            translateOptions: false,
            optionsLabelField: "label",
            field: "filtering_labels",
            helpText: labelshelptext2(),
            label: labels(),
            allowUserOptions: "append"
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            form,
            field: "link",
            label: link(),
            helpText: linkhelptext2(),
            cacheLock: cacheLocks["link"],
            get cachedValue() {
              return formDataCache["link"];
            },
            set cachedValue($$value) {
              formDataCache["link"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (page$1.data.settings?.enabled_integrations?.some((integration) => integration.provider_type === "itsm" && integration.configurations?.length)) {
      $$payload2.out += "<!--[-->";
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-plug",
        header: integrations(),
        children: ($$payload3) => {
          if (!syncMappings.length) {
            $$payload3.out += "<!--[-->";
            AutocompleteSelect($$payload3, {
              form,
              optionsEndpoint: "settings/integrations/configs?provider__provider_type=itsm",
              optionsLabelField: "provider",
              field: "integration_config",
              helpText: integrationproviderhelptext3(),
              label: integrationprovider1()
            });
            $$payload3.out += `<!----> `;
            if (store_get($$store_subs ??= {}, "$formStore", formStore).integration_config) {
              $$payload3.out += "<!--[-->";
              if (context === "edit") {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<!---->`;
                {
                  AutocompleteSelect($$payload3, {
                    form,
                    optionsEndpoint: `settings/integrations/configs/${stringify(store_get($$store_subs ??= {}, "$formStore", formStore).integration_config)}/remote-objects`,
                    optionsLabelField: "summary",
                    optionsValueField: "key",
                    optionsInfoFields: {
                      fields: [{ field: "key" }],
                      position: "prefix"
                    },
                    field: "remote_object_id",
                    helpText: remoteobjecthelptext3(),
                    label: remoteobject1()
                  });
                }
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (context === "create") {
                $$payload3.out += "<!--[-->";
                Checkbox($$payload3, {
                  form,
                  field: "create_remote_object",
                  label: createremoteobject2(),
                  helpText: createremoteobjecthelptext4()
                });
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]-->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          } else {
            $$payload3.out += "<!--[!-->";
            const each_array = ensure_array_like(syncMappings);
            $$payload3.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let syncMapping = each_array[$$index];
              $$payload3.out += `<div class="mb-4 p-4 bg-secondary-50 border-l-4 border-secondary-400"><span class="flex flex-row justify-between items-center"><h3 class="font-semibold text-secondary-800 mb-2">${escape_html(syncedwith1({
                integrationName: syncMapping.provider?.toUpperCase() ?? "UNKNOWN"
              }))}</h3> <button class="text-secondary-500 hover:text-secondary-700" type="button"${attr("aria-label", deletesyncmapping2())}><i class="fa-solid fa-trash-can"></i></button></span> <dl class="grid grid-cols-1 gap-1 sm:grid-cols-2 text-secondary-700"><dt class="font-medium">${escape_html(remoteid1())}</dt> <dd>${escape_html(syncMapping.remote_id)}</dd> <dt class="font-medium">${escape_html(lastsynced1())}</dt> <dd>${escape_html(new Date(syncMapping.last_synced_at).toLocaleString(getLocale()))}</dd> <dt class="font-medium">${escape_html(status())}</dt> <dd>${escape_html(safeTranslate(syncMapping.sync_status))}</dd></dl></div>`;
            }
            $$payload3.out += `<!--]-->`;
          }
          $$payload3.out += `<!--]-->`;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (duplicate) {
      $$payload2.out += "<!--[-->";
      Checkbox($$payload2, {
        form,
        field: "duplicate_evidences",
        label: bringtheevidences2(),
        helpText: bringtheevidenceshelptext4()
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      optionsDetailedUrlParameters: origin2 === "requirement-assessments" ? [["scope_folder_id", initialData.folder]] : [],
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function VulnerabilitiesForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["severity"],
      field: "severity",
      label: severity(),
      cacheLock: cacheLocks["severity"],
      get cachedValue() {
        return formDataCache["severity"];
      },
      set cachedValue($$value) {
        formDataCache["severity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      field: "assets",
      label: assets()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "applied-controls",
      optionsExtraFields: [["folder", "str"]],
      field: "applied_controls",
      label: appliedcontrols1()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "security-exceptions",
      optionsExtraFields: [["folder", "str"]],
      field: "security_exceptions",
      cacheLock: cacheLocks["security_exceptions"],
      label: securityexceptions1(),
      get cachedValue() {
        return formDataCache["security_exceptions"];
      },
      set cachedValue($$value) {
        formDataCache["security_exceptions"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      translateOptions: false,
      optionsLabelField: "label",
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function RiskAcceptanceForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    object = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      type: "date",
      field: "expiry_date",
      label: expirydate1(),
      helpText: expirydatehelptext3(),
      cacheLock: cacheLocks["expiry_date"],
      get cachedValue() {
        return formDataCache["expiry_date"];
      },
      set cachedValue($$value) {
        formDataCache["expiry_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (object.id && page$1.data.user.id === object.approver) {
      $$payload2.out += "<!--[-->";
      TextArea($$payload2, {
        disabled: page$1.data.user.id !== object.approver,
        form,
        field: "justification",
        label: justification(),
        helpText: riskacceptancejusitficationhelptext4(),
        cacheLock: cacheLocks["justification"],
        get cachedValue() {
          return formDataCache["justification"];
        },
        set cachedValue($$value) {
          formDataCache["justification"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "users?is_approver=true",
      optionsLabelField: "email",
      field: "approver",
      cacheLock: cacheLocks["approver"],
      nullable: true,
      label: approver(),
      helpText: approverhelptext2(),
      get cachedValue() {
        return formDataCache["approver"];
      },
      set cachedValue($$value) {
        formDataCache["approver"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "risk-scenarios",
      optionsExtraFields: [
        ["perimeter", "str"],
        ["risk_assessment", "str"]
      ],
      field: "risk_scenarios",
      cacheLock: cacheLocks["risk_scenarios"],
      label: riskscenarios1(),
      helpText: riskacceptanceriskscenarioshelptext5(),
      multiple: true,
      get cachedValue() {
        return formDataCache["risk_scenarios"];
      },
      set cachedValue($$value) {
        formDataCache["risk_scenarios"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function ValidationFlowForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    object = {},
    initialData = {},
    updated_fields = /* @__PURE__ */ new Set()
  } = $$props;
  const hasPresetAssessments = initialData.risk_assessments || initialData.compliance_assessments || initialData.business_impact_analysis || initialData.crq_studies || initialData.ebios_studies || initialData.entity_assessments || initialData.findings_assessments;
  const allowSelfValidation = page$1.data?.settings?.allow_self_validation ?? false;
  const approverEndpoint = allowSelfValidation ? "users?is_approver=true" : "users?is_approver=true&exclude_current=true";
  async function fetchDefaultRefId() {
    try {
      const response = await fetch(`/validation-flows/default-ref-id/`);
      const result2 = await response.json();
      if (response.ok && result2.results) {
        form.form.update((currentData) => {
          updated_fields.add("ref_id");
          return { ...currentData, ref_id: result2.results };
        });
      } else {
        console.error(result2.error || "Failed to fetch default ref_id");
      }
    } catch (error) {
      console.error("Error fetching default ref_id:", error);
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: approverEndpoint,
      optionsLabelField: "email",
      field: "approver",
      cacheLock: cacheLocks["approver"],
      label: approver(),
      helpText: validationapproverhelptext3(),
      disabled: initialData.approver,
      get cachedValue() {
        return formDataCache["approver"];
      },
      set cachedValue($$value) {
        formDataCache["approver"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (object?.id) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="space-y-2"><span class="text-sm font-medium text-gray-700">${escape_html(requestnotes1())}</span> `;
      MarkdownRenderer($$payload2, {
        content: object.request_notes,
        class: "p-3 bg-gray-50 rounded-lg"
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      TextArea($$payload2, {
        form,
        field: "request_notes",
        label: requestnotes1(),
        cacheLock: cacheLocks["request_notes"],
        get cachedValue() {
          return formDataCache["request_notes"];
        },
        set cachedValue($$value) {
          formDataCache["request_notes"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (!object?.id) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "filtering-labels",
        field: "filtering_labels",
        optionsLabelField: "label",
        cacheLock: cacheLocks["filtering_labels"],
        label: labels(),
        multiple: true,
        get cachedValue() {
          return formDataCache["filtering_labels"];
        },
        set cachedValue($$value) {
          formDataCache["filtering_labels"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      onChange: async (e) => {
        if (e && !object?.id) {
          await fetchDefaultRefId();
        }
      },
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (object?.id) {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        field: "status",
        options: model.selectOptions["status"],
        cacheLock: cacheLocks["status"],
        label: status(),
        disableDoubleDash: true,
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (object?.id) {
      $$payload2.out += "<!--[-->";
      if (object.validation_deadline) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="space-y-2"><span class="text-sm font-medium text-gray-700">${escape_html(validationdeadline1())}</span> <p class="p-3 bg-gray-50 rounded-lg text-sm">${escape_html(object.validation_deadline)}</p></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      TextField($$payload2, {
        form,
        type: "date",
        field: "validation_deadline",
        label: validationdeadline1(),
        cacheLock: cacheLocks["validation_deadline"],
        disabled: initialData.validation_deadline,
        get cachedValue() {
          return formDataCache["validation_deadline"];
        },
        set cachedValue($$value) {
          formDataCache["validation_deadline"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (!hasPresetAssessments) {
      $$payload2.out += "<!--[-->";
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-list",
        header: more(),
        children: ($$payload3) => {
          TextField($$payload3, {
            form,
            field: "ref_id",
            label: refid1(),
            cacheLock: cacheLocks["ref_id"],
            disabled: initialData.ref_id,
            get cachedValue() {
              return formDataCache["ref_id"];
            },
            set cachedValue($$value) {
              formDataCache["ref_id"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            optionsEndpoint: "compliance-assessments",
            field: "compliance_assessments",
            cacheLock: cacheLocks["compliance_assessments"],
            label: complianceassessments1(),
            multiple: true,
            disabled: initialData.compliance_assessments,
            get cachedValue() {
              return formDataCache["compliance_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["compliance_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            optionsEndpoint: "risk-assessments",
            field: "risk_assessments",
            cacheLock: cacheLocks["risk_assessments"],
            label: riskassessments1(),
            multiple: true,
            disabled: initialData.risk_assessments,
            get cachedValue() {
              return formDataCache["risk_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["risk_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            optionsEndpoint: "business-impact-analysis",
            field: "business_impact_analysis",
            cacheLock: cacheLocks["business_impact_analysis"],
            label: businessimpactanalysis2(),
            multiple: true,
            disabled: initialData.business_impact_analysis,
            get cachedValue() {
              return formDataCache["business_impact_analysis"];
            },
            set cachedValue($$value) {
              formDataCache["business_impact_analysis"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            optionsEndpoint: "findings-assessments",
            field: "findings_assessments",
            cacheLock: cacheLocks["findings_assessments"],
            label: findingsassessments1(),
            multiple: true,
            disabled: initialData.findings_assessments,
            get cachedValue() {
              return formDataCache["findings_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["findings_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function ReferenceControlForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["category"],
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["csf_function"],
      field: "csf_function",
      label: csffunction1(),
      cacheLock: cacheLocks["csf_function"],
      get cachedValue() {
        return formDataCache["csf_function"];
      },
      set cachedValue($$value) {
        formDataCache["csf_function"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "annotation",
      label: annotation(),
      cacheLock: cacheLocks["annotation"],
      get cachedValue() {
        return formDataCache["annotation"];
      },
      set cachedValue($$value) {
        formDataCache["annotation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "provider",
      label: provider(),
      cacheLock: cacheLocks["provider"],
      get cachedValue() {
        return formDataCache["provider"];
      },
      set cachedValue($$value) {
        formDataCache["provider"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      translateOptions: false,
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FileInput($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    label: label2 = void 0,
    field,
    helpText = void 0,
    form,
    allowPaste = false,
    resetSignal = false,
    allowedExtensions,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const { errors, constraints } = formFieldProxy(form, field);
  let value2 = fileProxy(form, field);
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  run(() => {
    if (resetSignal) {
      const dataTransfer = new DataTransfer();
      store_set(value2, dataTransfer.files);
    }
  });
  $$payload.out += `<div>`;
  if (label2 !== void 0) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)}</label>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="control"><input${spread_attributes(
    {
      type: "file",
      name: field,
      class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
      "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}`,
      "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
      placeholder: "",
      accept: allowedExtensions === "*" ? null : Array.from(allowedExtensions).map((ext) => "." + ext).join(","),
      ...store_get($$store_subs ??= {}, "$constraints", constraints),
      ...rest
    },
    null
  )}/></div> `;
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
function EvidenceForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context
  } = $$props;
  function getFilename(path) {
    if (!path) return "";
    try {
      const withoutQuery = path.split("?")[0];
      return decodeURIComponent(withoutQuery.split("/").pop());
    } catch (e) {
      return path;
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (model.appliedControlOptions?.length > 0) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        translateOptions: false,
        options: model.appliedControlOptions,
        field: "applied_controls",
        label: safeTranslate("evidenceToAppliedControl"),
        cacheLock: cacheLocks["applied_controls"],
        get cachedValue() {
          return formDataCache["applied_controls"];
        },
        set cachedValue($$value) {
          formDataCache["applied_controls"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      HiddenInput($$payload2, { form, field: "applied_controls" });
    }
    $$payload2.out += `<!--]--> `;
    if (model.requirementAssessmentOptions?.length > 0) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        translateOptions: false,
        options: model.requirementAssessmentOptions,
        field: "requirement_assessments",
        label: safeTranslate("evidenceToRequirement"),
        cacheLock: cacheLocks["requirement_assessments"],
        get cachedValue() {
          return formDataCache["requirement_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["requirement_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      HiddenInput($$payload2, { form, field: "requirement_assessments" });
    }
    $$payload2.out += `<!--]--> `;
    HiddenInput($$payload2, { form, field: "findings" });
    $$payload2.out += `<!----> `;
    HiddenInput($$payload2, { form, field: "findings_assessments" });
    $$payload2.out += `<!----> `;
    HiddenInput($$payload2, { form, field: "timeline_entries" });
    $$payload2.out += `<!----> `;
    HiddenInput($$payload2, { form, field: "contracts" });
    $$payload2.out += `<!----> `;
    if (context !== "edit") {
      $$payload2.out += "<!--[-->";
      FileInput($$payload2, {
        form,
        allowPaste: true,
        helpText: object.attachment ? `${attachmentwarningtext2()}: ${getFilename(object.attachment)}` : attachmenthelptext2(),
        field: "attachment",
        label: attachment(),
        allowedExtensions: "*"
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (context !== "edit") {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        form,
        field: "link",
        label: link(),
        helpText: linkhelptext2(),
        cacheLock: cacheLocks["link"],
        get cachedValue() {
          return formDataCache["link"];
        },
        set cachedValue($$value) {
          formDataCache["link"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      translateOptions: false,
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions?.status,
      field: "status",
      label: status(),
      disableDoubleDash: true,
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "expiry_date",
      label: expirydate1(),
      cacheLock: cacheLocks["expiry_date"],
      get cachedValue() {
        return formDataCache["expiry_date"];
      },
      set cachedValue($$value) {
        formDataCache["expiry_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FrameworkResultSnippet($$payload, $$props) {
  push();
  let { option } = $$props;
  const REQUIREMENT_ASSESSMENT_RESULT = [
    "compliant",
    "non_compliant",
    "partially_compliant",
    "not_applicable"
  ];
  let resultCounts = option.results;
  const orderedResultPercentages = REQUIREMENT_ASSESSMENT_RESULT.map((result2) => {
    if (!resultCounts) return {
      result: result2,
      percentage: { value: 0, display: "0" }
    };
    const value2 = resultCounts[result2] || 0;
    const percentValue = value2 / option.assessable_requirements_count * 100;
    const percentage = {
      value: percentValue,
      display: percentValue.toFixed(0)
    };
    return { result: result2, percentage };
  });
  const each_array = ensure_array_like(orderedResultPercentages);
  $$payload.out += `<span class="w-full">${escape_html(option.label)} <div class="flex grow bg-gray-200 rounded-md overflow-hidden h-4 shrink self-center"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let rp = each_array[$$index];
    $$payload.out += `<div${attr_class(`flex flex-col justify-center overflow-hidden text-xs text-center ${stringify(complianceResultTailwindColorMap[rp.result])}`)}${attr_style(`width: ${stringify(rp.percentage.value)}%; background-color: ${stringify(complianceResultColorMap[rp.result])}`)}>${escape_html(rp.percentage.display)}%</div>`;
  }
  $$payload.out += `<!--]--></div></span>`;
  pop();
}
function ComplianceAssessmentForm($$payload, $$props) {
  push();
  let {
    form,
    model = void 0,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context
  } = $$props;
  let suggestions = false;
  let implementationGroupsChoices = [];
  let defaultImplementationGroups = [];
  let is_dynamic = false;
  form.data?.is_locked || object?.is_locked || false;
  async function handleFrameworkChange(id) {
    if (id) {
      await fetch(`/frameworks/${id}`).then((r) => r.json()).then((r) => {
        is_dynamic = r["is_dynamic"] || false;
        const implementation_groups = r["implementation_groups_definition"] || [];
        implementationGroupsChoices = implementation_groups.map((group) => ({ label: group.name, value: group.ref_id }));
        suggestions = r["reference_controls"].length > 0;
        defaultImplementationGroups = implementation_groups.filter((group) => group.default_selected).map((group) => group.ref_id);
        if (!object.id) {
          form.form.update((currentData) => {
            return {
              ...currentData,
              selected_implementation_groups: defaultImplementationGroups
            };
          });
        }
      });
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if ((context === "fromBaseline" || context === "clone") && initialData.baseline) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        field: "baseline",
        cacheLock: cacheLocks["baseline"],
        label: baseline(),
        optionsEndpoint: "compliance-assessments",
        hidden: true,
        get cachedValue() {
          return formDataCache["baseline"];
        },
        set cachedValue($$value) {
          formDataCache["baseline"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (initialData.ebios_rm_studies) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        field: "ebios_rm_studies",
        multiple: true,
        cacheLock: cacheLocks["ebios_rm_studies"],
        label: ebiosrmstudies2(),
        hidden: true,
        get cachedValue() {
          return formDataCache["ebios_rm_studies"];
        },
        set cachedValue($$value) {
          formDataCache["ebios_rm_studies"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeter",
      cacheLock: cacheLocks["perimeter"],
      label: perimeter(),
      hidden: initialData.perimeter && context !== "clone",
      get cachedValue() {
        return formDataCache["perimeter"];
      },
      set cachedValue($$value) {
        formDataCache["perimeter"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (context === "fromBaseline" && initialData.baseline) {
      $$payload2.out += "<!--[-->";
      {
        let optionSnippet = function($$payload3, option) {
          FrameworkResultSnippet($$payload3, { option });
        };
        AutocompleteSelect($$payload2, {
          form,
          disabled: object.id,
          optionsEndpoint: `compliance-assessments/${stringify(page$1.params.id)}/frameworks`,
          field: "framework",
          cacheLock: cacheLocks["framework"],
          optionsLabelField: "str",
          optionsValueField: "id",
          label: targetframework1(),
          onChange: async (e) => handleFrameworkChange(e),
          mount: async (e) => handleFrameworkChange(e),
          additionalMultiselectOptions: {
            liOptionClass: "flex items-center w-full border-t-8 border-b-8 border-transparent"
          },
          includeAllOptionFields: true,
          get cachedValue() {
            return formDataCache["framework"];
          },
          set cachedValue($$value) {
            formDataCache["framework"] = $$value;
            $$settled = false;
          },
          optionSnippet,
          $$slots: { optionSnippet: true }
        });
      }
    } else {
      $$payload2.out += "<!--[!-->";
      AutocompleteSelect($$payload2, {
        form,
        disabled: object.id || context === "clone",
        optionsEndpoint: "frameworks",
        optionsDetailedUrlParameters: context === "fromBaseline" ? [["baseline", initialData.baseline]] : [],
        field: "framework",
        cacheLock: cacheLocks["framework"],
        label: context === "clone" ? framework() : targetframework1(),
        onChange: async (e) => handleFrameworkChange(e),
        mount: async (e) => handleFrameworkChange(e),
        get cachedValue() {
          return formDataCache["framework"];
        },
        set cachedValue($$value) {
          formDataCache["framework"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    if (implementationGroupsChoices.length > 0 && !is_dynamic) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      {
        AutocompleteSelect($$payload2, {
          multiple: true,
          translateOptions: false,
          form,
          options: implementationGroupsChoices,
          field: "selected_implementation_groups",
          cacheLock: cacheLocks["selected_implementation_groups"],
          label: selectedimplementationgroups2(),
          get cachedValue() {
            return formDataCache["selected_implementation_groups"];
          },
          set cachedValue($$value) {
            formDataCache["selected_implementation_groups"] = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "authors",
      cacheLock: cacheLocks["authors"],
      label: authors(),
      get cachedValue() {
        return formDataCache["authors"];
      },
      set cachedValue($$value) {
        formDataCache["authors"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "version",
      label: version(),
      helpText: versionhelptext2(),
      cacheLock: cacheLocks["version"],
      get cachedValue() {
        return formDataCache["version"];
      },
      set cachedValue($$value) {
        formDataCache["version"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "eta",
      label: eta(),
      helpText: etahelptext2(),
      cacheLock: cacheLocks["eta"],
      get cachedValue() {
        return formDataCache["eta"];
      },
      set cachedValue($$value) {
        formDataCache["eta"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        $$payload3.out += `<div class="space-y-4">`;
        if (context === "create" && suggestions) {
          $$payload3.out += "<!--[-->";
          Checkbox($$payload3, {
            form,
            field: "create_applied_controls_from_suggestions",
            label: suggestcontrols1(),
            helpText: createappliedcontrolsfromsuggestionshelptext6(),
            cacheLock: cacheLocks["create_applied_controls_from_suggestions"],
            get cachedValue() {
              return formDataCache["create_applied_controls_from_suggestions"];
            },
            set cachedValue($$value) {
              formDataCache["create_applied_controls_from_suggestions"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        Checkbox($$payload3, {
          form,
          field: "show_documentation_score",
          label: usedocumentationscore2(),
          helpText: usedocumentationscorehelptext4(),
          cacheLock: cacheLocks["show_documentation_score"],
          get cachedValue() {
            return formDataCache["show_documentation_score"];
          },
          set cachedValue($$value) {
            formDataCache["show_documentation_score"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "extended_result_enabled",
          label: extendedresultenabled2(),
          helpText: extendedresultenabledhelptext4(),
          cacheLock: cacheLocks["extended_result_enabled"],
          get cachedValue() {
            return formDataCache["extended_result_enabled"];
          },
          set cachedValue($$value) {
            formDataCache["extended_result_enabled"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "progress_status_enabled",
          label: progressstatusenabled2(),
          helpText: progressstatusenabledhelptext4(),
          cacheLock: cacheLocks["progress_status_enabled"],
          get cachedValue() {
            return formDataCache["progress_status_enabled"];
          },
          set cachedValue($$value) {
            formDataCache["progress_status_enabled"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----></div> `;
        TextField($$payload3, {
          form,
          field: "ref_id",
          label: refid1(),
          cacheLock: cacheLocks["ref_id"],
          get cachedValue() {
            return formDataCache["ref_id"];
          },
          set cachedValue($$value) {
            formDataCache["ref_id"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "assets",
          optionsLabelField: "auto",
          optionsExtraFields: [["folder", "str"]],
          optionsInfoFields: {
            fields: [{ field: "type" }],
            classes: "text-blue-500"
          },
          field: "assets",
          label: assets()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "evidences",
          optionsLabelField: "auto",
          optionsExtraFields: [["folder", "str"]],
          field: "evidences",
          label: evidences()
        });
        $$payload3.out += `<!----> `;
        Select($$payload3, {
          form,
          options: model.selectOptions["status"],
          field: "status",
          label: status(),
          cacheLock: cacheLocks["status"],
          get cachedValue() {
            return formDataCache["status"];
          },
          set cachedValue($$value) {
            formDataCache["status"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "reviewers",
          cacheLock: cacheLocks["reviewers"],
          label: reviewers(),
          get cachedValue() {
            return formDataCache["reviewers"];
          },
          set cachedValue($$value) {
            formDataCache["reviewers"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "due_date",
          label: duedate1(),
          helpText: duedatehelptext3(),
          cacheLock: cacheLocks["due_date"],
          get cachedValue() {
            return formDataCache["due_date"];
          },
          set cachedValue($$value) {
            formDataCache["due_date"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        if (!page$1.data.user.is_third_party) {
          $$payload3.out += "<!--[-->";
          Checkbox($$payload3, {
            form,
            field: "is_locked",
            label: islocked1(),
            helpText: islockedhelptext3(),
            cacheLock: cacheLocks["is_locked"],
            get cachedValue() {
              return formDataCache["is_locked"];
            },
            set cachedValue($$value) {
              formDataCache["is_locked"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { model, formDataCache });
  pop();
}
function Duration($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    class: _class = "",
    label: label2 = void 0,
    field,
    valuePath = field,
    helpText = void 0,
    cachedValue = void 0,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    form,
    hidden = false,
    disabled = false,
    required = false,
    enabledUnits = ["hours", "minutes", "seconds"],
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label2 = label2 ?? field;
  const { value: value2, errors, constraints } = formFieldProxy(form, valuePath);
  const allTimeUnits = [
    {
      unit: "days",
      secondsMultiplier: 86400,
      enabled: false,
      value: 0
    },
    {
      unit: "hours",
      secondsMultiplier: 3600,
      enabled: false,
      value: 0
    },
    {
      unit: "minutes",
      secondsMultiplier: 60,
      enabled: false,
      value: 0
    },
    {
      unit: "seconds",
      secondsMultiplier: 1,
      enabled: false,
      value: 0
    },
    {
      unit: "milliseconds",
      secondsMultiplier: 1e-3,
      enabled: false,
      value: 0
    }
  ];
  const _timeUnits = allTimeUnits.map((unit2) => ({
    ...unit2,
    enabled: enabledUnits.includes(unit2.unit)
  }));
  function setInitialTimeUnitValues(value3, units) {
    let remainingValue = value3;
    units.forEach((timeUnit) => {
      if (timeUnit.enabled) {
        timeUnit.value = Math.floor(remainingValue / timeUnit.secondsMultiplier);
        remainingValue = remainingValue % timeUnit.secondsMultiplier;
      }
    });
    return units;
  }
  const timeUnits = setInitialTimeUnitValues(store_get($$store_subs ??= {}, "$value", value2) || 0, _timeUnits);
  let classesTextField = (errors2) => errors2 ? "input-error" : "";
  let classesDisabled = (d) => d ? "opacity-50" : "";
  run(() => {
    store_set(value2, timeUnits.reduce(
      (acc, timeUnit) => {
        return timeUnit.enabled ? acc + timeUnit.value * timeUnit.secondsMultiplier : acc;
      },
      0
    ));
  });
  run(() => {
    cachedValue = store_get($$store_subs ??= {}, "$value", value2);
  });
  const each_array_1 = ensure_array_like(timeUnits);
  $$payload.out += `<div><div${attr_class(clsx(classesDisabled(disabled)))}>`;
  if (label2 !== void 0 && !hidden) {
    $$payload.out += "<!--[-->";
    if (store_get($$store_subs ??= {}, "$constraints", constraints)?.required || required) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)} <span class="text-red-500">*</span></label>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<label class="text-sm font-semibold"${attr("for", field)}>${escape_html(label2)}</label>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-error-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="control flex flex-row space-x-2"${attr("data-testid", `form-input-${stringify(field.replaceAll("_", "-"))}`)}><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let timeUnit = each_array_1[$$index_1];
    if (timeUnit.enabled) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div><label class="text-sm"${attr("for", field)}>${escape_html(safeTranslate(timeUnit.unit))}</label> <input${spread_attributes(
        {
          type: "number",
          min: "0",
          class: `${stringify("input " + _class)} ${stringify(classesTextField(store_get($$store_subs ??= {}, "$errors", errors)))}`,
          "data-testid": `form-input-${stringify(field.replaceAll("_", "-"))}-${stringify(timeUnit.unit)}`,
          name: field,
          "aria-invalid": store_get($$store_subs ??= {}, "$errors", errors) ? "true" : void 0,
          placeholder: "",
          value: timeUnit.value,
          disabled,
          required,
          ...store_get($$store_subs ??= {}, "$constraints", constraints),
          ...rest
        },
        null
      )}/></div>`;
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
  bind_props($$props, { label: label2, cachedValue });
  pop();
}
function AssetForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    data = {}
  } = $$props;
  const scale = page$1.data.settings.security_objective_scale;
  const securityObjectiveScaleMap = SECURITY_OBJECTIVE_SCALE_MAP[scale];
  const reducedSecurityObjectiveMap = securityObjectiveScaleMap.filter((label2, index) => !securityObjectiveScaleMap.slice(0, index).includes(label2));
  let securityObjectives = [];
  let disasterRecoveryObjectives = [];
  const createOption = (label2) => ({
    label: label2,
    value: securityObjectiveScaleMap.findIndex((_label) => label2 === _label)
  });
  const securityObjectiveOptions = reducedSecurityObjectiveMap.map(createOption);
  const typeConfig = (() => {
    if (data.type === "PR") {
      return {
        securityKey: "security_objectives",
        recoveryKey: "disaster_recovery_objectives",
        securityLabel: securityobjectives1(),
        recoveryLabel: disasterrecoveryobjectives2()
      };
    } else if (data.type === "SP") {
      return {
        securityKey: "security_capabilities",
        recoveryKey: "recovery_capabilities",
        securityLabel: securitycapabilities1(),
        recoveryLabel: recoverycapabilities1()
      };
    }
    return null;
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "asset-class",
      optionsLabelField: "full_path",
      field: "asset_class",
      cacheLock: cacheLocks["asset_class"],
      label: assetclass1(),
      get cachedValue() {
        return formDataCache["asset_class"];
      },
      set cachedValue($$value) {
        formDataCache["asset_class"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      cacheLock: cacheLocks["ref_id"],
      label: refid1(),
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      pathField: "path",
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["type"],
      disableDoubleDash: true,
      field: "type",
      label: "Type",
      cacheLock: cacheLocks["type"],
      get cachedValue() {
        return formDataCache["type"];
      },
      set cachedValue($$value) {
        formDataCache["type"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "assets",
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      optionsDetailedUrlParameters: [["exclude_children", object.id]],
      optionsLabelField: "auto",
      pathField: "path",
      optionsSelf: object,
      field: "parent_assets",
      cacheLock: cacheLocks["parent_assets"],
      label: parentassets1(),
      helpText: supportedassetshelptext3(),
      get cachedValue() {
        return formDataCache["parent_assets"];
      },
      set cachedValue($$value) {
        formDataCache["parent_assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "assets",
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      optionsDetailedUrlParameters: [["exclude_parents", object.id]],
      optionsLabelField: "auto",
      pathField: "path",
      optionsSelf: object,
      field: "support_assets",
      cacheLock: cacheLocks["support_assets"],
      label: supportassets1(),
      helpText: supportingassetshelptext3(),
      get cachedValue() {
        return formDataCache["support_assets"];
      },
      set cachedValue($$value) {
        formDataCache["support_assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (typeConfig) {
      $$payload2.out += "<!--[-->";
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-shield-halved",
        header: typeConfig.securityLabel,
        children: ($$payload3) => {
          const each_array = ensure_array_like(securityObjectives);
          $$payload3.out += `<div class="flex flex-col space-y-4"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let objective = each_array[$$index];
            $$payload3.out += `<span class="flex flex-row items-end space-x-4">`;
            Checkbox($$payload3, {
              form,
              field: objective,
              label: "",
              valuePath: `${stringify(typeConfig.securityKey)}.objectives.${stringify(objective)}.is_enabled`,
              checkboxComponent: "switch",
              class: "h-full flex flex-row items-center justify-center my-1",
              classesContainer: "h-full"
            });
            $$payload3.out += `<!----> `;
            RadioGroup($$payload3, {
              possibleOptions: securityObjectiveOptions,
              form,
              label: safeTranslate(objective),
              labelKey: "label",
              key: "value",
              field: objective,
              valuePath: `${stringify(typeConfig.securityKey)}.objectives.${stringify(objective)}.value`,
              disabled: data[typeConfig.securityKey]?.objectives?.[objective]?.is_enabled === false
            });
            $$payload3.out += `<!----></span>`;
          }
          $$payload3.out += `<!--]--></div>`;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-indigo-700",
        icon: "fa-regular fa-clock",
        header: typeConfig.recoveryLabel,
        children: ($$payload3) => {
          const each_array_1 = ensure_array_like(disasterRecoveryObjectives);
          $$payload3.out += `<div class="flex flex-col space-y-4"><!--[-->`;
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let objective = each_array_1[$$index_1];
            Duration($$payload3, {
              form,
              field: objective,
              label: safeTranslate(objective),
              helpText: Object.hasOwn(m, `${objective}HelpText`) ? m[`${objective}HelpText`]() : "",
              valuePath: `${stringify(typeConfig.recoveryKey)}.objectives.${stringify(objective)}.value`
            });
          }
          $$payload3.out += `<!--]--></div>`;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (data.type === "PR") {
      $$payload2.out += "<!--[-->";
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-purple-700",
        icon: "fa-solid fa-building-columns",
        header: doraspecific1(),
        children: ($$payload3) => {
          Checkbox($$payload3, {
            form,
            field: "is_business_function",
            label: isbusinessfunction2(),
            cacheLock: cacheLocks["is_business_function"],
            get cachedValue() {
              return formDataCache["is_business_function"];
            },
            set cachedValue($$value) {
              formDataCache["is_business_function"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions["dora_licenced_activity"],
            field: "dora_licenced_activity",
            label: doralicencedactivity2(),
            cacheLock: cacheLocks["dora_licenced_activity"],
            get cachedValue() {
              return formDataCache["dora_licenced_activity"];
            },
            set cachedValue($$value) {
              formDataCache["dora_licenced_activity"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions["dora_criticality_assessment"],
            field: "dora_criticality_assessment",
            label: doracriticalityassessment2(),
            cacheLock: cacheLocks["dora_criticality_assessment"],
            disableDoubleDash: true,
            get cachedValue() {
              return formDataCache["dora_criticality_assessment"];
            },
            set cachedValue($$value) {
              formDataCache["dora_criticality_assessment"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            form,
            field: "dora_criticality_justification",
            label: doracriticalityjustification2(),
            cacheLock: cacheLocks["dora_criticality_justification"],
            get cachedValue() {
              return formDataCache["dora_criticality_justification"];
            },
            set cachedValue($$value) {
              formDataCache["dora_criticality_justification"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            options: model.selectOptions["dora_discontinuing_impact"],
            field: "dora_discontinuing_impact",
            label: doradiscontinuingimpact2(),
            cacheLock: cacheLocks["dora_discontinuing_impact"],
            disableDoubleDash: true,
            get cachedValue() {
              return formDataCache["dora_discontinuing_impact"];
            },
            set cachedValue($$value) {
              formDataCache["dora_discontinuing_impact"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        TextField($$payload3, {
          form,
          field: "reference_link",
          label: link(),
          helpText: linkhelptext2(),
          cacheLock: cacheLocks["reference_link"],
          get cachedValue() {
            return formDataCache["reference_link"];
          },
          set cachedValue($$value) {
            formDataCache["reference_link"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "applied-controls",
          optionsLabelField: "auto",
          field: "applied_controls",
          cacheLock: cacheLocks["applied_controls"],
          label: appliedcontrols1(),
          helpText: appliedcontrolslinkedtoassethelptext6(),
          get cachedValue() {
            return formDataCache["applied_controls"];
          },
          set cachedValue($$value) {
            formDataCache["applied_controls"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "security-exceptions",
          optionsLabelField: "auto",
          field: "security_exceptions",
          cacheLock: cacheLocks["security_exceptions"],
          label: securityexceptions1(),
          get cachedValue() {
            return formDataCache["security_exceptions"];
          },
          set cachedValue($$value) {
            formDataCache["security_exceptions"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        if (data.type === "SP") {
          $$payload3.out += "<!--[-->";
          AutocompleteSelect($$payload3, {
            multiple: true,
            form,
            optionsEndpoint: "asset-capabilities",
            field: "overridden_children_capabilities",
            cacheLock: cacheLocks["overridden_children_capabilities"],
            label: overriddenchildrencapabilities2(),
            helpText: overriddenchildrencapabilitieshelptext4(),
            get cachedValue() {
              return formDataCache["overridden_children_capabilities"];
            },
            set cachedValue($$value) {
              formDataCache["overridden_children_capabilities"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "solutions",
          optionsLabelField: "auto",
          optionsExtraFields: [["provider_entity", "str"]],
          field: "solutions",
          cacheLock: cacheLocks["solutions"],
          label: solutions(),
          helpText: solutionslinkedtoassethelptext5(),
          get cachedValue() {
            return formDataCache["solutions"];
          },
          set cachedValue($$value) {
            formDataCache["solutions"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          helpText: observationhelptext2(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          createFromSelection: true,
          optionsEndpoint: "filtering-labels",
          optionsLabelField: "label",
          field: "filtering_labels",
          helpText: labelshelptext2(),
          label: labels(),
          translateOptions: false,
          allowUserOptions: "append"
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    if (initialData.ebios_rm_studies) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        field: "ebios_rm_studies",
        multiple: true,
        cacheLock: cacheLocks["ebios_rm_studies"],
        label: ebiosrmstudies2(),
        hidden: true,
        get cachedValue() {
          return formDataCache["ebios_rm_studies"];
        },
        set cachedValue($$value) {
          formDataCache["ebios_rm_studies"] = $$value;
          $$settled = false;
        }
      });
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function RequirementAssessmentForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    context,
    object
  } = $$props;
  object?.compliance_assessment?.is_locked || false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (context === "selectEvidences") {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "evidences",
        optionsExtraFields: [["folder", "str"]],
        field: "evidences",
        label: evidences()
      });
    } else if (context === "selectAppliedControls") {
      $$payload2.out += "<!--[1-->";
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "applied-controls",
        optionsExtraFields: [["folder", "str"]],
        field: "applied_controls",
        label: appliedcontrols1()
      });
    } else {
      $$payload2.out += "<!--[!-->";
      Select($$payload2, {
        form,
        options: model.selectOptions["status"],
        field: "status",
        label: status(),
        cacheLock: cacheLocks["status"],
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions["result"],
        field: "result",
        label: result(),
        cacheLock: cacheLocks["result"],
        get cachedValue() {
          return formDataCache["result"];
        },
        set cachedValue($$value) {
          formDataCache["result"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      if (object?.compliance_assessment?.extended_result_enabled) {
        $$payload2.out += "<!--[-->";
        Select($$payload2, {
          form,
          options: model.selectOptions["extended_result"],
          field: "extended_result",
          label: extendedresult1(),
          cacheLock: cacheLocks["extended_result"],
          get cachedValue() {
            return formDataCache["extended_result"];
          },
          set cachedValue($$value) {
            formDataCache["extended_result"] = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      MarkdownField($$payload2, {
        form,
        field: "observation",
        label: observation(),
        cacheLock: cacheLocks["observation"],
        get cachedValue() {
          return formDataCache["observation"];
        },
        set cachedValue($$value) {
          formDataCache["observation"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form, field: "folder" });
      $$payload2.out += `<!----> `;
      HiddenInput($$payload2, { form, field: "compliance_assessment" });
      $$payload2.out += `<!---->`;
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function LegalIdentifierField($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    field,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    cachedValue = void 0
  } = $$props;
  const { value: value2, errors } = formFieldProxy(form, field);
  const initialValue = store_get($$store_subs ??= {}, "$value", value2) || {};
  let legalIdentifiers = cachedValue || initialValue;
  const identifierTypes = [
    {
      value: "LEI",
      label: "LEI (Legal Entity Identifier)"
    },
    {
      value: "EUID",
      label: "EUID (European Unique Identifier)"
    },
    { value: "DUNS", label: "DUNS Number" },
    { value: "VAT", label: "VAT Number" },
    { value: "OTHER", label: "Other" }
  ];
  const each_array_1 = ensure_array_like(Object.entries(legalIdentifiers));
  $$payload.out += `<div class="space-y-4 svelte-1aaw2i9"><div class="flex items-center justify-between svelte-1aaw2i9"><span class="text-sm font-semibold">${escape_html(legalidentifiers1())}</span> <button type="button" class="px-3 py-1 text-sm rounded bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"${attr("disabled", Object.keys(legalIdentifiers).length >= identifierTypes.length, true)}><i class="fa-solid fa-plus mr-1"></i>${escape_html(addlegalidentifier2())}</button></div> `;
  if (store_get($$store_subs ??= {}, "$errors", errors) && !Array.isArray(store_get($$store_subs ??= {}, "$errors", errors)) && typeof store_get($$store_subs ??= {}, "$errors", errors) === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 svelte-1aaw2i9">${escape_html(m[store_get($$store_subs ??= {}, "$errors", errors)] || store_get($$store_subs ??= {}, "$errors", errors))}</div>`;
  } else if (store_get($$store_subs ??= {}, "$errors", errors) && Array.isArray(store_get($$store_subs ??= {}, "$errors", errors)) && store_get($$store_subs ??= {}, "$errors", errors).length > 0) {
    $$payload.out += "<!--[1-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div class="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 svelte-1aaw2i9"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<div>${escape_html(m[error] || error)}</div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (Object.keys(legalIdentifiers).length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-500 text-sm italic text-center py-4 border-2 border-dashed border-gray-200 rounded svelte-1aaw2i9">${escape_html(nolegalidentifieradded3())}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="space-y-3 svelte-1aaw2i9"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let [type, identifier] = each_array_1[i];
    const each_array_2 = ensure_array_like(identifierTypes);
    $$payload.out += `<div class="flex gap-2 items-start p-3 bg-gray-50 rounded-lg svelte-1aaw2i9"><div class="flex-1">`;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors)[type]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-xs text-red-500 mb-1">${escape_html(identifiererrormessage2())}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label${attr("for", `identifier-type-${stringify(i)}`)} class="block text-xs font-medium text-gray-600 mb-1">${escape_html(identifiertype1())}</label> <select${attr("id", `identifier-type-${stringify(i)}`)} class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">`;
    $$payload.select_value = type;
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
      let idType = each_array_2[$$index_1];
      $$payload.out += `<option${attr("value", idType.value)}${maybe_selected($$payload, idType.value)}>${escape_html(idType.label)}</option>`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select></div> <div class="flex-[2]">`;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors)[type]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-xs text-red-500 mb-1 invisible">${escape_html(identifiererrormessage2())}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label${attr("for", `identifier-value-${stringify(i)}`)} class="block text-xs font-medium text-gray-600 mb-1">${escape_html(identifiervalue1())}</label> <input${attr("id", `identifier-value-${stringify(i)}`)} type="text"${attr("value", identifier)}${attr("placeholder", enteridentifiervalue2())} class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div> <div class="pt-6"><button type="button" class="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"${attr("title", removeidentifier1())}${attr("aria-label", removeidentifier1())}><i class="fa-solid fa-trash"></i></button></div></div> <input type="hidden"${attr("name", `legal_identifiers[${stringify(type)}]`)}${attr("value", identifier)} class="svelte-1aaw2i9"/>`;
  }
  $$payload.out += `<!--]--></div> <input type="hidden" name="legal_identifiers"${attr("value", JSON.stringify(legalIdentifiers))} class="svelte-1aaw2i9"/></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { cachedValue });
  pop();
}
function EntityForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_active",
      label: isactive1(),
      cacheLock: cacheLocks["is_active"],
      get cachedValue() {
        return formDataCache["is_active"];
      },
      set cachedValue($$value) {
        formDataCache["is_active"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!object.builtin) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "terminologies?field_path=entity.relationship",
        field: "relationship",
        cacheLock: cacheLocks["relationship"],
        label: relationship(),
        helpText: moreonterminologieshelptext4(),
        multiple: true,
        get cachedValue() {
          return formDataCache["relationship"];
        },
        set cachedValue($$value) {
          formDataCache["relationship"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    LegalIdentifierField($$payload2, {
      form,
      field: "legal_identifiers",
      cacheLock: cacheLocks["legal_identifiers"],
      get cachedValue() {
        return formDataCache["legal_identifiers"];
      },
      set cachedValue($$value) {
        formDataCache["legal_identifiers"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-ellipsis",
      header: more(),
      children: ($$payload3) => {
        TextArea($$payload3, {
          form,
          field: "mission",
          label: mission(),
          cacheLock: cacheLocks["mission"],
          get cachedValue() {
            return formDataCache["mission"];
          },
          set cachedValue($$value) {
            formDataCache["mission"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          optionsEndpoint: "entities",
          field: "parent_entity",
          optionsSelf: object,
          nullable: true,
          cacheLock: cacheLocks["parent_entity"],
          label: parententity1(),
          helpText: parententityhelptext3(),
          get cachedValue() {
            return formDataCache["parent_entity"];
          },
          set cachedValue($$value) {
            formDataCache["parent_entity"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "country",
          options: model.selectOptions?.country,
          label: country(),
          cacheLock: cacheLocks["country"],
          nullable: true,
          get cachedValue() {
            return formDataCache["country"];
          },
          set cachedValue($$value) {
            formDataCache["country"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "currency",
          options: model.selectOptions?.currency,
          label: currency(),
          cacheLock: cacheLocks["currency"],
          nullable: true,
          get cachedValue() {
            return formDataCache["currency"];
          },
          set cachedValue($$value) {
            formDataCache["currency"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_provider_person_type",
          options: model.selectOptions?.dora_provider_person_type,
          label: doraproviderpersontype3(),
          cacheLock: cacheLocks["dora_provider_person_type"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_provider_person_type"];
          },
          set cachedValue($$value) {
            formDataCache["dora_provider_person_type"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "reference_link",
          label: referencelink1(),
          helpText: linkhelptext2(),
          cacheLock: cacheLocks["reference_link"],
          get cachedValue() {
            return formDataCache["reference_link"];
          },
          set cachedValue($$value) {
            formDataCache["reference_link"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          createFromSelection: true,
          optionsEndpoint: "filtering-labels",
          optionsLabelField: "label",
          field: "filtering_labels",
          helpText: labelshelptext2(),
          label: labels(),
          translateOptions: false,
          allowUserOptions: "append",
          cacheLock: cacheLocks["filtering_labels"],
          get cachedValue() {
            return formDataCache["filtering_labels"];
          },
          set cachedValue($$value) {
            formDataCache["filtering_labels"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-scale-balanced",
      header: doraspecific1(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_entity_type",
          options: model.selectOptions?.dora_entity_type,
          label: doraentitytype2(),
          cacheLock: cacheLocks["dora_entity_type"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_entity_type"];
          },
          set cachedValue($$value) {
            formDataCache["dora_entity_type"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_entity_hierarchy",
          options: model.selectOptions?.dora_entity_hierarchy,
          label: doraentityhierarchy2(),
          cacheLock: cacheLocks["dora_entity_hierarchy"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_entity_hierarchy"];
          },
          set cachedValue($$value) {
            formDataCache["dora_entity_hierarchy"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        NumberField($$payload3, {
          form,
          field: "dora_assets_value",
          label: doraassetsvalue2(),
          cacheLock: cacheLocks["dora_assets_value"],
          get cachedValue() {
            return formDataCache["dora_assets_value"];
          },
          set cachedValue($$value) {
            formDataCache["dora_assets_value"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "dora_competent_authority",
          label: doracompetentauthority2(),
          cacheLock: cacheLocks["dora_competent_authority"],
          get cachedValue() {
            return formDataCache["dora_competent_authority"];
          },
          set cachedValue($$value) {
            formDataCache["dora_competent_authority"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function EntityAssessmentForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model = void 0,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {}
  } = $$props;
  const formStore = form.form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeter",
      cacheLock: cacheLocks["perimeter"],
      label: perimeter(),
      hidden: initialData.perimeter,
      get cachedValue() {
        return formDataCache["perimeter"];
      },
      set cachedValue($$value) {
        formDataCache["perimeter"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!data.compliance_assessment) {
      $$payload2.out += "<!--[-->";
      Checkbox($$payload2, {
        form,
        field: "create_audit",
        label: createaudit1(),
        helpText: createaudithelptext3()
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        disabled: !data.create_audit,
        mandatory: true,
        hidden: !data.create_audit,
        optionsEndpoint: "frameworks",
        field: "framework",
        cacheLock: cacheLocks["framework"],
        label: framework(),
        onChange: async (e) => {
          if (e) {
            await fetch(`/frameworks/${e}`).then((r) => r.json()).then((r) => {
              const implementation_groups = r["implementation_groups_definition"] || [];
              model.selectOptions["selected_implementation_groups"] = implementation_groups.map((group) => ({ label: group.name, value: group.ref_id }));
            });
          }
        },
        get cachedValue() {
          return formDataCache["framework"];
        },
        set cachedValue($$value) {
          formDataCache["framework"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      if (model.selectOptions["selected_implementation_groups"] && model.selectOptions["selected_implementation_groups"].length) {
        $$payload2.out += "<!--[-->";
        AutocompleteSelect($$payload2, {
          multiple: true,
          translateOptions: false,
          form,
          options: model.selectOptions["selected_implementation_groups"],
          field: "selected_implementation_groups",
          cacheLock: cacheLocks["selected_implementation_groups"],
          label: selectedimplementationgroups2(),
          get cachedValue() {
            return formDataCache["selected_implementation_groups"];
          },
          set cachedValue($$value) {
            formDataCache["selected_implementation_groups"] = $$value;
            $$settled = false;
          }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "entity",
      cacheLock: cacheLocks["entity"],
      label: entity(),
      hidden: initialData.entity,
      get cachedValue() {
        return formDataCache["entity"];
      },
      set cachedValue($$value) {
        formDataCache["entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <!---->`;
    {
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "solutions",
        optionsDetailedUrlParameters: [
          [
            "provider_entity",
            store_get($$store_subs ??= {}, "$formStore", formStore).entity
          ]
        ],
        field: "solutions",
        cacheLock: cacheLocks["solutions"],
        label: solutions(),
        get cachedValue() {
          return formDataCache["solutions"];
        },
        set cachedValue($$value) {
          formDataCache["solutions"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!----> `;
    Score($$payload2, {
      form,
      label: criticality(),
      field: "criticality",
      inversedColors: true,
      fullDonut: true,
      min_score: 1,
      max_score: 4
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "due_date",
      label: duedate1(),
      helpText: duedatehelptext3(),
      cacheLock: cacheLocks["due_date"],
      get cachedValue() {
        return formDataCache["due_date"];
      },
      set cachedValue($$value) {
        formDataCache["due_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (store_get($$store_subs ??= {}, "$formStore", formStore)?.entity) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      {
        AutocompleteSelect($$payload2, {
          form,
          multiple: true,
          optionsEndpoint: "users",
          optionsDetailedUrlParameters: [
            ["is_third_party", "true"],
            [
              "representative__entity",
              store_get($$store_subs ??= {}, "$formStore", formStore)?.entity || ""
            ]
          ],
          optionsLabelField: "email",
          field: "representatives",
          helpText: entityassessmentrepresentativeshelptext4(),
          cacheLock: cacheLocks["representatives"],
          label: representatives(),
          get cachedValue() {
            return formDataCache["representatives"];
          },
          set cachedValue($$value) {
            formDataCache["representatives"] = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["conclusion"],
      field: "conclusion",
      label: conclusion(),
      cacheLock: cacheLocks["conclusion"],
      get cachedValue() {
        return formDataCache["conclusion"];
      },
      set cachedValue($$value) {
        formDataCache["conclusion"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        Select($$payload3, {
          form,
          options: model.selectOptions["status"],
          field: "status",
          label: status(),
          cacheLock: cacheLocks["status"],
          get cachedValue() {
            return formDataCache["status"];
          },
          set cachedValue($$value) {
            formDataCache["status"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "eta",
          label: eta(),
          helpText: etahelptext2(),
          cacheLock: cacheLocks["eta"],
          get cachedValue() {
            return formDataCache["eta"];
          },
          set cachedValue($$value) {
            formDataCache["eta"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "version",
          label: version(),
          cacheLock: cacheLocks["version"],
          get cachedValue() {
            return formDataCache["version"];
          },
          set cachedValue($$value) {
            formDataCache["version"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "authors",
          cacheLock: cacheLocks["authors"],
          label: authors(),
          get cachedValue() {
            return formDataCache["authors"];
          },
          set cachedValue($$value) {
            formDataCache["authors"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "reviewers",
          cacheLock: cacheLocks["reviewers"],
          label: reviewers(),
          get cachedValue() {
            return formDataCache["reviewers"];
          },
          set cachedValue($$value) {
            formDataCache["reviewers"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          optionsEndpoint: "compliance-assessments",
          optionsExtraFields: [["folder", "str"]],
          field: "compliance_assessment",
          cacheLock: cacheLocks["compliance_assessment"],
          label: complianceassessment1(),
          disabled: data.create_audit,
          hidden: data.create_audit,
          get cachedValue() {
            return formDataCache["compliance_assessment"];
          },
          set cachedValue($$value) {
            formDataCache["compliance_assessment"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          optionsEndpoint: "evidences",
          optionsExtraFields: [["folder", "str"]],
          field: "evidence",
          cacheLock: cacheLocks["evidence"],
          label: evidence(),
          helpText: entityassessmentevidencehelptext4(),
          get cachedValue() {
            return formDataCache["evidence"];
          },
          set cachedValue($$value) {
            formDataCache["evidence"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextArea($$payload3, {
          form,
          field: "observation",
          label: observation(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "reference_link",
          label: referencelink1(),
          helpText: linkhelptext2(),
          cacheLock: cacheLocks["reference_link"],
          get cachedValue() {
            return formDataCache["reference_link"];
          },
          set cachedValue($$value) {
            formDataCache["reference_link"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { model, formDataCache });
  pop();
}
function SolutionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "provider_entity",
      cacheLock: cacheLocks["provider_entity"],
      label: providerentity1(),
      get cachedValue() {
        return formDataCache["provider_entity"];
      },
      set cachedValue($$value) {
        formDataCache["provider_entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Score($$payload2, {
      form,
      label: criticality(),
      field: "criticality",
      inversedColors: true,
      fullDonut: true,
      min_score: 1,
      max_score: 4
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      field: "assets",
      cacheLock: cacheLocks["assets"],
      label: assets(),
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      translateOptions: false,
      optionsLabelField: "label",
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-clipboard-check",
      header: doraassessment1(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_ict_service_type",
          options: model.selectOptions?.dora_ict_service_type,
          label: doraictservicetype3(),
          cacheLock: cacheLocks["dora_ict_service_type"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_ict_service_type"];
          },
          set cachedValue($$value) {
            formDataCache["dora_ict_service_type"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "storage_of_data",
          label: storageofdata2(),
          cacheLock: cacheLocks["storage_of_data"],
          classesContainer: "my-4",
          get cachedValue() {
            return formDataCache["storage_of_data"];
          },
          set cachedValue($$value) {
            formDataCache["storage_of_data"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "data_location_storage",
          options: model.selectOptions?.data_location_storage,
          label: datalocationstorage2(),
          cacheLock: cacheLocks["data_location_storage"],
          nullable: true,
          get cachedValue() {
            return formDataCache["data_location_storage"];
          },
          set cachedValue($$value) {
            formDataCache["data_location_storage"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "data_location_processing",
          options: model.selectOptions?.data_location_processing,
          label: datalocationprocessing2(),
          cacheLock: cacheLocks["data_location_processing"],
          nullable: true,
          get cachedValue() {
            return formDataCache["data_location_processing"];
          },
          set cachedValue($$value) {
            formDataCache["data_location_processing"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_data_sensitiveness",
          options: model.selectOptions?.dora_data_sensitiveness,
          label: doradatasensitiveness2(),
          cacheLock: cacheLocks["dora_data_sensitiveness"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_data_sensitiveness"];
          },
          set cachedValue($$value) {
            formDataCache["dora_data_sensitiveness"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_reliance_level",
          options: model.selectOptions?.dora_reliance_level,
          label: dorareliancelevel2(),
          cacheLock: cacheLocks["dora_reliance_level"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_reliance_level"];
          },
          set cachedValue($$value) {
            formDataCache["dora_reliance_level"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_substitutability",
          options: model.selectOptions?.dora_substitutability,
          label: dorasubstitutability1(),
          cacheLock: cacheLocks["dora_substitutability"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_substitutability"];
          },
          set cachedValue($$value) {
            formDataCache["dora_substitutability"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_non_substitutability_reason",
          options: model.selectOptions?.dora_non_substitutability_reason,
          label: doranonsubstitutabilityreason3(),
          cacheLock: cacheLocks["dora_non_substitutability_reason"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_non_substitutability_reason"];
          },
          set cachedValue($$value) {
            formDataCache["dora_non_substitutability_reason"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_has_exit_plan",
          options: model.selectOptions?.dora_has_exit_plan,
          label: dorahasexitplan3(),
          cacheLock: cacheLocks["dora_has_exit_plan"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_has_exit_plan"];
          },
          set cachedValue($$value) {
            formDataCache["dora_has_exit_plan"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_reintegration_possibility",
          options: model.selectOptions?.dora_reintegration_possibility,
          label: dorareintegrationpossibility2(),
          cacheLock: cacheLocks["dora_reintegration_possibility"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_reintegration_possibility"];
          },
          set cachedValue($$value) {
            formDataCache["dora_reintegration_possibility"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_discontinuing_impact",
          options: model.selectOptions?.dora_discontinuing_impact,
          label: doradiscontinuingimpact2(),
          cacheLock: cacheLocks["dora_discontinuing_impact"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_discontinuing_impact"];
          },
          set cachedValue($$value) {
            formDataCache["dora_discontinuing_impact"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "dora_alternative_providers_identified",
          options: model.selectOptions?.dora_alternative_providers_identified,
          label: doraalternativeprovidersidentified3(),
          cacheLock: cacheLocks["dora_alternative_providers_identified"],
          nullable: true,
          get cachedValue() {
            return formDataCache["dora_alternative_providers_identified"];
          },
          set cachedValue($$value) {
            formDataCache["dora_alternative_providers_identified"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "dora_alternative_providers",
          label: doraalternativeproviders2(),
          cacheLock: cacheLocks["dora_alternative_providers"],
          get cachedValue() {
            return formDataCache["dora_alternative_providers"];
          },
          set cachedValue($$value) {
            formDataCache["dora_alternative_providers"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function ContractForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      optionsEndpoint: "folders",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "status",
      options: model.selectOptions?.status,
      cacheLock: cacheLocks["status"],
      label: status(),
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "dora_contractual_arrangement",
      options: model.selectOptions?.dora_contractual_arrangement,
      label: doracontractualarrangement2(),
      nullable: false,
      cacheLock: cacheLocks["dora_contractual_arrangement"],
      get cachedValue() {
        return formDataCache["dora_contractual_arrangement"];
      },
      set cachedValue($$value) {
        formDataCache["dora_contractual_arrangement"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "start_date",
      label: startdate1(),
      cacheLock: cacheLocks["start_date"],
      get cachedValue() {
        return formDataCache["start_date"];
      },
      set cachedValue($$value) {
        formDataCache["start_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "end_date",
      label: enddate1(),
      cacheLock: cacheLocks["end_date"],
      get cachedValue() {
        return formDataCache["end_date"];
      },
      set cachedValue($$value) {
        formDataCache["end_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "provider_entity",
      cacheLock: cacheLocks["provider_entity"],
      label: providerentity1(),
      get cachedValue() {
        return formDataCache["provider_entity"];
      },
      set cachedValue($$value) {
        formDataCache["provider_entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "beneficiary_entity",
      cacheLock: cacheLocks["beneficiary_entity"],
      label: beneficiaryentity1(),
      get cachedValue() {
        return formDataCache["beneficiary_entity"];
      },
      set cachedValue($$value) {
        formDataCache["beneficiary_entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "solutions",
      optionsExtraFields: [["provider_entity", "str"]],
      field: "solutions",
      cacheLock: cacheLocks["solutions"],
      label: solutions(),
      get cachedValue() {
        return formDataCache["solutions"];
      },
      set cachedValue($$value) {
        formDataCache["solutions"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      field: "evidences",
      cacheLock: cacheLocks["evidences"],
      label: documents(),
      get cachedValue() {
        return formDataCache["evidences"];
      },
      set cachedValue($$value) {
        formDataCache["evidences"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      translateOptions: false,
      allowUserOptions: "append"
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-ellipsis",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "owner",
          cacheLock: cacheLocks["owner"],
          label: owner(),
          get cachedValue() {
            return formDataCache["owner"];
          },
          set cachedValue($$value) {
            formDataCache["owner"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "overarching_contract",
          optionsEndpoint: "contracts?dora_contractual_arrangement=eba_CO:x2",
          optionsExtraFields: [["folder", "str"]],
          optionsSelf: object,
          nullable: true,
          label: overarchingcontract1(),
          helpText: overarchingcontracthelptext3(),
          cacheLock: cacheLocks["overarching_contract"],
          get cachedValue() {
            return formDataCache["overarching_contract"];
          },
          set cachedValue($$value) {
            formDataCache["overarching_contract"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "currency",
          options: model.selectOptions?.currency,
          label: currency(),
          cacheLock: cacheLocks["currency"],
          get cachedValue() {
            return formDataCache["currency"];
          },
          set cachedValue($$value) {
            formDataCache["currency"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        NumberField($$payload3, {
          form,
          field: "annual_expense",
          label: annualexpense1(),
          cacheLock: cacheLocks["annual_expense"],
          get cachedValue() {
            return formDataCache["annual_expense"];
          },
          set cachedValue($$value) {
            formDataCache["annual_expense"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "termination_reason",
          options: model.selectOptions?.termination_reason,
          label: terminationreason1(),
          cacheLock: cacheLocks["termination_reason"],
          get cachedValue() {
            return formDataCache["termination_reason"];
          },
          set cachedValue($$value) {
            formDataCache["termination_reason"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          field: "governing_law_country",
          options: model.selectOptions?.governing_law_country,
          label: governinglawcountry2(),
          cacheLock: cacheLocks["governing_law_country"],
          get cachedValue() {
            return formDataCache["governing_law_country"];
          },
          set cachedValue($$value) {
            formDataCache["governing_law_country"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        NumberField($$payload3, {
          form,
          field: "notice_period_entity",
          label: noticeperiodentity2(),
          cacheLock: cacheLocks["notice_period_entity"],
          get cachedValue() {
            return formDataCache["notice_period_entity"];
          },
          set cachedValue($$value) {
            formDataCache["notice_period_entity"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        NumberField($$payload3, {
          form,
          field: "notice_period_provider",
          label: noticeperiodprovider2(),
          cacheLock: cacheLocks["notice_period_provider"],
          get cachedValue() {
            return formDataCache["notice_period_provider"];
          },
          set cachedValue($$value) {
            formDataCache["notice_period_provider"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "is_intragroup",
          label: isintragroup1(),
          cacheLock: cacheLocks["is_intragroup"],
          get cachedValue() {
            return formDataCache["is_intragroup"];
          },
          set cachedValue($$value) {
            formDataCache["is_intragroup"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function RepresentativeForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    object = {},
    context = "default"
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "email",
      label: email(),
      cacheLock: cacheLocks["email"],
      "data-focusindex": "2",
      get cachedValue() {
        return formDataCache["email"];
      },
      set cachedValue($$value) {
        formDataCache["email"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (context === "edit" && object.user) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex items-center gap-2 px-3 py-2.5 bg-secondary-50-950 rounded-md border-l-3 border-secondary-500"><svg class="w-4 h-4 text-secondary-600-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div class="text-sm text-secondary-900-100">${escape_html(userlinkedtorepresentative3())}</div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      Checkbox($$payload2, {
        form,
        field: "create_user",
        label: createuser1(),
        helpText: createuserhelptext3(),
        get cachedValue() {
          return formDataCache["create_user"];
        },
        set cachedValue($$value) {
          formDataCache["create_user"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "entity",
      cacheLock: cacheLocks["entity"],
      label: entity(),
      get cachedValue() {
        return formDataCache["entity"];
      },
      set cachedValue($$value) {
        formDataCache["entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "first_name",
      label: firstname1(),
      cacheLock: cacheLocks["first_name"],
      get cachedValue() {
        return formDataCache["first_name"];
      },
      set cachedValue($$value) {
        formDataCache["first_name"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "last_name",
      label: lastname1(),
      cacheLock: cacheLocks["last_name"],
      get cachedValue() {
        return formDataCache["last_name"];
      },
      set cachedValue($$value) {
        formDataCache["last_name"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "phone",
      label: phone(),
      cacheLock: cacheLocks["phone"],
      get cachedValue() {
        return formDataCache["phone"];
      },
      set cachedValue($$value) {
        formDataCache["phone"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "role",
      label: role(),
      cacheLock: cacheLocks["role"],
      get cachedValue() {
        return formDataCache["role"];
      },
      set cachedValue($$value) {
        formDataCache["role"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FrameworkForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["category"],
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function UserForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    shape = {},
    context
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "email",
      label: email(),
      cacheLock: cacheLocks["email"],
      "data-focusindex": "2",
      get cachedValue() {
        return formDataCache["email"];
      },
      set cachedValue($$value) {
        formDataCache["email"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (shape.first_name && shape.last_name) {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        form,
        field: "first_name",
        label: firstname1(),
        cacheLock: cacheLocks["first_name"],
        get cachedValue() {
          return formDataCache["first_name"];
        },
        set cachedValue($$value) {
          formDataCache["first_name"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "last_name",
        label: lastname1(),
        cacheLock: cacheLocks["last_name"],
        get cachedValue() {
          return formDataCache["last_name"];
        },
        set cachedValue($$value) {
          formDataCache["last_name"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (shape.user_groups) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "user-groups",
        field: "user_groups",
        pathField: "path",
        cacheLock: cacheLocks["user_groups"],
        label: usergroups1(),
        get cachedValue() {
          return formDataCache["user_groups"];
        },
        set cachedValue($$value) {
          formDataCache["user_groups"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (shape.is_active) {
      $$payload2.out += "<!--[-->";
      Checkbox($$payload2, {
        form,
        field: "is_active",
        label: isactive1(),
        helpText: isactivehelptext3()
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (context !== "create") {
      $$payload2.out += "<!--[-->";
      Checkbox($$payload2, {
        form,
        field: "keep_local_login",
        label: keeplocallogin2(),
        helpText: keeplocalloginhelptext4()
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (shape.expiry_date && !page$1.data.object?.is_superuser) {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        type: "date",
        form,
        field: "expiry_date",
        label: expirydate1(),
        helpText: userexpiryhelptext3(),
        cacheLock: cacheLocks["expiry_date"],
        get cachedValue() {
          return formDataCache["expiry_date"];
        },
        set cachedValue($$value) {
          formDataCache["expiry_date"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    TextArea($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <span class="text-gray-500 pt-5">⚠️ ${escape_html(createduserwillhavenorights5())}</span>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function TeamForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    shape = {},
    context
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "team_email",
      label: teamemail1(),
      cacheLock: cacheLocks["team_email"],
      "data-focusindex": "2",
      get cachedValue() {
        return formDataCache["team_email"];
      },
      set cachedValue($$value) {
        formDataCache["team_email"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "users?is_third_party=false",
      optionsLabelField: "email",
      field: "leader",
      cacheLock: cacheLocks["leader"],
      label: leader(),
      get cachedValue() {
        return formDataCache["leader"];
      },
      set cachedValue($$value) {
        formDataCache["leader"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "users?is_third_party=false",
      optionsLabelField: "email",
      field: "deputies",
      cacheLock: cacheLocks["deputies"],
      label: deputies(),
      get cachedValue() {
        return formDataCache["deputies"];
      },
      set cachedValue($$value) {
        formDataCache["deputies"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "users?is_third_party=false",
      optionsLabelField: "email",
      field: "members",
      cacheLock: cacheLocks["members"],
      label: members(),
      get cachedValue() {
        return formDataCache["members"];
      },
      set cachedValue($$value) {
        formDataCache["members"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function SsoSettingForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    data = {}
  } = $$props;
  form.form;
  const oidcAuthMethods = [
    "client_secret_basic",
    "client_secret_post",
    "client_secret_jwt",
    "private_key_jwt",
    "none"
  ];
  const oidcAuthMethodOptions = oidcAuthMethods.map((method) => ({ label: method, value: method }));
  let openAccordionItems = ["saml", "idp", "sp"];
  let showSecretField = !page$1.data?.ssoSettings.oidc_has_secret;
  let showPrivateKeyField = !page$1.data?.ssoSettings.saml_has_sp_private_key;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Accordion($$payload2, {
      value: openAccordionItems,
      onValueChange: (e) => openAccordionItems = e.value,
      multiple: true,
      children: ($$payload3) => {
        Checkbox($$payload3, {
          form,
          field: "is_enabled",
          label: enablesso3(),
          helpText: enablessohelptext5()
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "force_sso",
          label: forcessologin4(),
          helpText: forcessologinhelptext6(),
          disabled: !data.is_enabled
        });
        $$payload3.out += `<!----> <span class="text-orange-500 italic text-sm"><i class="fa-solid fa-circle-exclamation mr-1"></i>${escape_html(forcessologinhelptext26())}</span> `;
        RadioGroup($$payload3, {
          form,
          hidden: model.selectOptions["provider"].length < 2,
          field: "provider",
          cacheLock: cacheLocks["provider"],
          possibleOptions: model.selectOptions["provider"],
          label: provider(),
          disabled: !data.is_enabled
        });
        $$payload3.out += `<!----> `;
        if (data.provider !== "saml") {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<!---->`;
          {
            let control = function($$payload4) {
              $$payload4.out += `<span class="font-semibold">${escape_html(idpconfiguration3())}</span>`;
            }, panel = function($$payload4) {
              $$payload4.out += `<div class="p-4 space-y-4">`;
              HiddenInput($$payload4, {
                form,
                field: "provider_name",
                label: name(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["provider_name"]
              });
              $$payload4.out += `<!----> `;
              HiddenInput($$payload4, {
                form,
                field: "provider_id",
                label: providerid2(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["provider_id"]
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "client_id",
                label: clientid2(),
                helpText: clientidhelptext4(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["client_id"]
              });
              $$payload4.out += `<!----> `;
              if (showSecretField) {
                $$payload4.out += "<!--[-->";
                TextField($$payload4, {
                  form,
                  type: "password",
                  field: "secret",
                  label: secret(),
                  helpText: secrethelptext2(),
                  disabled: !data.is_enabled,
                  cacheLock: cacheLocks["secret"]
                });
              } else {
                $$payload4.out += "<!--[!-->";
                $$payload4.out += `<div class="w-full p-4 flex flex-row justify-evenly items-center preset-tonal-secondary"><p>${escape_html(clientsecretalreadysethelptext5())}</p> <button class="btn preset-filled">${escape_html(resetclientsecret2())}</button></div>`;
              }
              $$payload4.out += `<!--]--> `;
              TextField($$payload4, {
                form,
                field: "server_url",
                label: serverurl3(),
                helpText: oidcconfiguration1(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["server_url"]
              });
              $$payload4.out += `<!----></div>`;
            };
            Accordion.Item($$payload3, {
              value: "idp",
              control,
              panel,
              $$slots: { control: true, panel: true }
            });
          }
          $$payload3.out += `<!----> <!---->`;
          {
            let control = function($$payload4) {
              $$payload4.out += `<span class="font-semibold">${escape_html(advancedsettings1())}</span>`;
            }, panel = function($$payload4) {
              $$payload4.out += `<div class="p-4 space-y-4">`;
              Select($$payload4, {
                form,
                field: "token_auth_method",
                label: tokenauthmethod2(),
                disabled: !data.is_enabled,
                options: oidcAuthMethodOptions,
                cacheLock: cacheLocks["token_auth_method"],
                helpText: oidctokenauthmethodhelptext5()
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "oauth_pkce_enabled",
                label: oauthpkceenabled5(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["oauth_pkce_enabled"],
                helpText: oidcpkceenabledhelptext7()
              });
              $$payload4.out += `<!----></div>`;
            };
            Accordion.Item($$payload3, {
              value: "oidcAdvanced",
              control,
              panel,
              $$slots: { control: true, panel: true }
            });
          }
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (data.provider === "saml") {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<!---->`;
          {
            let control = function($$payload4) {
              $$payload4.out += `<span class="font-semibold">${escape_html(samlidpconfiguration7())}</span>`;
            }, panel = function($$payload4) {
              $$payload4.out += `<div class="p-4 space-y-4">`;
              TextField($$payload4, {
                form,
                field: "idp_entity_id",
                label: idpentityid5(),
                required: data.provider === "saml",
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["idp_entity_id"]
              });
              $$payload4.out += `<!----> <p class="text-gray-600 text-sm">${escape_html(fillmetadataurl4())}</p> `;
              TextField($$payload4, {
                form,
                field: "metadata_url",
                label: metadataurl3(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["metadata_url"]
              });
              $$payload4.out += `<!----> <div class="flex items-center justify-center w-full space-x-2"><hr class="w-1/2 items-center bg-gray-200 border-0"/> <span class="flex items-center text-gray-600 text-sm">${escape_html(or())}</span> <hr class="w-1/2 items-center bg-gray-200 border-0"/></div> <p class="text-gray-600 text-sm">${escape_html(fillssoslourlx509cert9())}</p> `;
              TextField($$payload4, {
                form,
                field: "sso_url",
                label: ssourl6(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["sso_url"]
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "slo_url",
                label: slourl6(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["slo_url"]
              });
              $$payload4.out += `<!----> `;
              TextArea($$payload4, {
                form,
                field: "x509cert",
                label: x509cert1(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["x509cert"]
              });
              $$payload4.out += `<!----></div>`;
            };
            Accordion.Item($$payload3, {
              value: "saml",
              control,
              panel,
              $$slots: { control: true, panel: true }
            });
          }
          $$payload3.out += `<!----> <!---->`;
          {
            let control = function($$payload4) {
              $$payload4.out += `<span class="font-semibold">${escape_html(spconfiguration3())}</span>`;
            }, panel = function($$payload4) {
              $$payload4.out += `<div class="p-4">`;
              TextField($$payload4, {
                form,
                field: "sp_entity_id",
                label: spentityid5(),
                required: data.provider === "saml",
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["sp_entity_id"]
              });
              $$payload4.out += `<!----></div>`;
            };
            Accordion.Item($$payload3, {
              value: "sp",
              control,
              panel,
              $$slots: { control: true, panel: true }
            });
          }
          $$payload3.out += `<!----> <!---->`;
          {
            let control = function($$payload4) {
              $$payload4.out += `<span class="font-semibold">${escape_html(advancedsettings1())}</span>`;
            }, panel = function($$payload4) {
              $$payload4.out += `<div class="p-4 space-y-4">`;
              TextField($$payload4, {
                form,
                field: "attribute_mapping_uid",
                label: attributemappinguid4(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["attribute_mapping_uid"]
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "attribute_mapping_email_verified",
                label: attributemappingemailverified3(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["attribute_mapping_email_verified"]
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "attribute_mapping_email",
                label: attributemappingemail2(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["attribute_mapping_email"]
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "allow_repeat_attribute_name",
                label: allowrepeatattributename3(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "allow_single_label_domains",
                label: allowsinglelabeldomains3(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "digest_algorithm",
                hidden: true,
                label: digestalgorithm1(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["digest_algorithm"]
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "logout_request_signed",
                hidden: true,
                label: logoutrequestsigned2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "logout_response_signed",
                hidden: true,
                label: logoutresponsesigned2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "metadata_signed",
                hidden: true,
                label: metadatasigned1(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "name_id_encrypted",
                hidden: true,
                label: nameidencrypted3(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                hidden: true,
                field: "reject_deprecated_algorithm",
                label: rejectdeprecatedalgorithm2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "reject_idp_initiated_sso",
                label: rejectidpinitiatedsso6(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              TextField($$payload4, {
                form,
                field: "signature_algorithm",
                hidden: true,
                label: signaturealgorithm1(),
                disabled: !data.is_enabled,
                cacheLock: cacheLocks["signature_algorithm"]
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_assertion_encrypted",
                hidden: true,
                label: wantassertionencrypted2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_assertion_signed",
                hidden: true,
                label: wantassertionsigned2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_attribute_statement",
                label: wantattributestatement2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_message_signed",
                hidden: true,
                label: wantmessagesigned2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_name_id",
                label: wantnameid3(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "want_name_id_encrypted",
                hidden: true,
                label: wantnameidencrypted4(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> `;
              Checkbox($$payload4, {
                form,
                field: "authn_request_signed",
                helpText: samlauthnrequestsignedhelptext5(),
                label: authnrequestsigned2(),
                disabled: !data.is_enabled
              });
              $$payload4.out += `<!----> <div class="w-full p-4 flex flex-col gap-4 border rounded-md mt-1"><div class="flex flex-row gap-4 items-center"><form method="post" action="?/generateSamlKeys"><button type="submit"${attr("disabled", !data.is_enabled || !data.authn_request_signed, true)} class="btn preset-filled-secondary-500">${escape_html(generate())}</button></form> `;
              if (data.is_enabled && data.authn_request_signed) {
                $$payload4.out += "<!--[-->";
                Anchor($$payload4, {
                  href: "settings/saml/download-cert",
                  class: "anchor text-secondary-500",
                  disabled: !data.is_enabled || !data.authn_request_signed,
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->${escape_html(downloadcertificate1())}`;
                  },
                  $$slots: { default: true }
                });
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--></div> <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">`;
              TextArea($$payload4, {
                form,
                field: "sp_x509cert",
                label: x509cert1(),
                helpText: samlcertificatehelptext3(),
                disabled: !data.is_enabled || !data.authn_request_signed,
                cacheLock: cacheLocks["sp_x509cert"],
                get cachedValue() {
                  return formDataCache["sp_x509cert"];
                },
                set cachedValue($$value) {
                  formDataCache["sp_x509cert"] = $$value;
                  $$settled = false;
                }
              });
              $$payload4.out += `<!----> `;
              if (showPrivateKeyField) {
                $$payload4.out += "<!--[-->";
                TextArea($$payload4, {
                  form,
                  field: "sp_private_key",
                  label: privatekey1(),
                  helpText: samlprivatekeyhelptext4(),
                  disabled: !data.is_enabled || !data.authn_request_signed,
                  cacheLock: cacheLocks["sp_private_key"],
                  get cachedValue() {
                    return formDataCache["sp_private_key"];
                  },
                  set cachedValue($$value) {
                    formDataCache["sp_private_key"] = $$value;
                    $$settled = false;
                  }
                });
              } else {
                $$payload4.out += "<!--[!-->";
                $$payload4.out += `<div class="w-full p-4 flex flex-col text-center items-center justify-center preset-tonal-secondary gap-2"><p>${escape_html(spprivatekeyalreadysethelptext6())}</p> <button class="btn preset-filled">${escape_html(resetspprivatekey3())}</button></div>`;
              }
              $$payload4.out += `<!--]--></div></div></div>`;
            };
            Accordion.Item($$payload3, {
              value: "samlAdvanced",
              control,
              panel,
              $$slots: { control: true, panel: true }
            });
          }
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FolderForm($$payload, $$props) {
  push();
  let {
    form,
    importFolder = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    model
  } = $$props;
  if (importFolder) {
    $$payload.out += "<!--[-->";
    FileInput($$payload, {
      form,
      allowPaste: true,
      field: "file",
      label: file(),
      allowedExtensions: ["bak", "zip"],
      helpText: importfolderhelptext3()
    });
    $$payload.out += `<!----> `;
    Checkbox($$payload, {
      form,
      field: "load_missing_libraries",
      label: loadmissinglibraries2(),
      helpText: loadmissinglibrarieshelptext4()
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    AutocompleteSelect($$payload, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      translateOptions: false,
      allowUserOptions: "append"
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function GeneralSettingForm($$payload, $$props) {
  push();
  var $$store_subs;
  let { form, model, cacheLocks = {} } = $$props;
  let formDataCache = {};
  const formStore = form.form;
  const modalStore = getModalStore();
  let flipVertically = formDataCache["risk_matrix_flip_vertical"] ?? false;
  let xAxis = formDataCache["risk_matrix_swap_axes"] ? "probability" : "impact";
  let yAxis = formDataCache["risk_matrix_swap_axes"] ? "impact" : "probability";
  let xAxisLabel = safeTranslate(`${xAxis}${store_get($$store_subs ??= {}, "$formStore", formStore).risk_matrix_labels ?? "ISO"}`);
  let yAxisLabel = safeTranslate(`${yAxis}${store_get($$store_subs ??= {}, "$formStore", formStore).risk_matrix_labels ?? "ISO"}`);
  let horizontalAxisPos = flipVertically ? "top-8" : "bottom-8";
  let horizontalLabelPos = flipVertically ? "top-2" : "bottom-2";
  let openAccordionItems = ["notifications", "financial"];
  let originalCurrency = store_get($$store_subs ??= {}, "$formStore", formStore).currency;
  let conversionRateValue = "1.0";
  function handleCurrencyChange(newCurrency) {
    if (originalCurrency && originalCurrency !== newCurrency) {
      const modal = {
        type: "prompt",
        title: "Currency Conversion Rate",
        body: `Converting from ${originalCurrency} to ${newCurrency}. Enter conversion rate (default: 1.0):`,
        value: "1.0",
        valueAttr: {
          type: "text",
          pattern: "[0-9]+([\\.][0-9]+)?",
          required: true,
          placeholder: "1.0"
        },
        response: (rate) => {
          if (rate !== false && rate !== null && rate !== "") {
            const n = Number(rate);
            if (Number.isFinite(n) && n > 0) {
              conversionRateValue = rate.toString();
              originalCurrency = newCurrency;
            } else {
              store_mutate($$store_subs ??= {}, "$formStore", formStore, store_get($$store_subs ??= {}, "$formStore", formStore).currency = originalCurrency);
              conversionRateValue = "1.0";
            }
          } else {
            store_mutate($$store_subs ??= {}, "$formStore", formStore, store_get($$store_subs ??= {}, "$formStore", formStore).currency = originalCurrency);
            conversionRateValue = "1.0";
          }
        }
      };
      modalStore.trigger(modal);
    } else {
      conversionRateValue = "1.0";
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<input type="hidden" name="conversion_rate"${attr("value", conversionRateValue)}/> `;
    Accordion($$payload2, {
      value: openAccordionItems,
      onValueChange: (e) => openAccordionItems = e.value,
      multiple: true,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-bell mr-2"></i>${escape_html(settingsnotifications1())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            Checkbox($$payload4, {
              form,
              field: "notifications_enable_mailing",
              label: settingsnotificationsmail2()
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "notifications",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-gem mr-2"></i>${escape_html(assets())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            Select($$payload4, {
              form,
              field: "security_objective_scale",
              cacheLock: cacheLocks["security_objective_scale"],
              options: model.selectOptions["security_objective_scale"],
              helpText: securityobjectivescalehelptext4(),
              label: securityobjectivescale2(),
              get cachedValue() {
                return formDataCache["security_objective_scale"];
              },
              set cachedValue($$value) {
                formDataCache["security_objective_scale"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "assets",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-table-cells-large mr-2"></i>${escape_html(settingsriskmatrix2())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4 flex flex-row gap-4"><div class="flex flex-col flex-1 space-y-4">`;
            Checkbox($$payload4, {
              form,
              field: "interface_agg_scenario_matrix",
              label: settingsaggregatematrix2()
            });
            $$payload4.out += `<!----> `;
            Checkbox($$payload4, {
              form,
              field: "risk_matrix_swap_axes",
              label: settingsriskmatrixswapaxes4(),
              helpText: settingsriskmatrixswapaxeshelptext6(),
              get cachedValue() {
                return formDataCache["risk_matrix_swap_axes"];
              },
              set cachedValue($$value) {
                formDataCache["risk_matrix_swap_axes"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Checkbox($$payload4, {
              form,
              field: "risk_matrix_flip_vertical",
              label: settingsriskmatrixflipvertical4(),
              helpText: settingsriskmatrixflipverticalhelptext6(),
              get cachedValue() {
                return formDataCache["risk_matrix_flip_vertical"];
              },
              set cachedValue($$value) {
                formDataCache["risk_matrix_flip_vertical"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            RadioGroup($$payload4, {
              possibleOptions: [
                { label: iso27005(), value: "ISO" },
                { label: ebiosrm2(), value: "EBIOS" }
              ],
              form,
              key: "value",
              labelKey: "label",
              field: "risk_matrix_labels"
            });
            $$payload4.out += `<!----></div> <div class="flex-1"><div class="relative w-full h-64 max-w-md bg-white rounded-lg shadow-md p-4"><div${attr_class(`absolute ${horizontalAxisPos} left-8 w-2 h-2 bg-black rounded-full`)}></div> <div${attr_class(`absolute ${horizontalAxisPos} left-8 w-4/5 h-0.5 bg-black`)}></div> <div${attr_class(`absolute ${horizontalLabelPos} left-1/2 transform -translate-x-1/2 text-center`)}><span class="font-medium">${escape_html(xAxisLabel)}</span></div> <div${attr_class(`absolute ${horizontalAxisPos} left-8 w-0.5 h-4/5 bg-black`)}></div> <div class="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 origin-left"><span class="font-medium">${escape_html(yAxisLabel)}</span></div></div></div></div>`;
          };
          Accordion.Item($$payload3, {
            value: "riskMatrix",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-gopuram mr-2"></i>${escape_html(ebiosradarparameters2())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4 space-y-4">`;
            NumberField($$payload4, {
              form,
              field: "ebios_radar_green_zone_radius",
              label: greenzoneradius2(),
              min: 0.1,
              max: 16,
              step: 0.1,
              cacheLock: cacheLocks["ebios_radar_green_zone_radius"],
              get cachedValue() {
                return formDataCache["ebios_radar_green_zone_radius"];
              },
              set cachedValue($$value) {
                formDataCache["ebios_radar_green_zone_radius"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            NumberField($$payload4, {
              form,
              field: "ebios_radar_yellow_zone_radius",
              label: yellowzoneradius2(),
              min: 0.5,
              max: 16,
              step: 0.1,
              cacheLock: cacheLocks["ebios_radar_yellow_zone_radius"],
              get cachedValue() {
                return formDataCache["ebios_radar_yellow_zone_radius"];
              },
              set cachedValue($$value) {
                formDataCache["ebios_radar_yellow_zone_radius"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            NumberField($$payload4, {
              form,
              field: "ebios_radar_red_zone_radius",
              label: redzoneradius2(),
              min: 1,
              max: 16,
              step: 0.1,
              cacheLock: cacheLocks["ebios_radar_red_zone_radius"],
              get cachedValue() {
                return formDataCache["ebios_radar_red_zone_radius"];
              },
              set cachedValue($$value) {
                formDataCache["ebios_radar_red_zone_radius"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "ebiosRadar",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-coins mr-2"></i>${escape_html(financialsettings1())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4 space-y-4">`;
            Select($$payload4, {
              form,
              field: "currency",
              options: [
                { label: "Euro (€)", value: "€" },
                { label: "US Dollar ($)", value: "$" },
                { label: "British Pound (£)", value: "£" },
                { label: "Japanese Yen (¥)", value: "¥" },
                { label: "Canadian Dollar (C$)", value: "C$" },
                { label: "Australian Dollar (A$)", value: "A$" },
                {
                  label: "New Zealand Dollar (NZ$)",
                  value: "NZ$"
                },
                { label: "Swiss Franc (CHF)", value: "CHF" }
              ],
              label: currency(),
              helpText: currencyhelptext2(),
              onchange: (e) => handleCurrencyChange(e.target.value)
            });
            $$payload4.out += `<!----> `;
            NumberField($$payload4, {
              form,
              field: "daily_rate",
              label: dailyrate1(),
              helpText: dailyratehelptext3(),
              min: 0,
              step: 1
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "financial",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-diagram-project mr-2"></i>${escape_html(requirementmappingsets2())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            NumberField($$payload4, {
              form,
              field: "mapping_max_depth",
              label: mappingmaxdepth2(),
              helpText: mappingmaxdepthhelptext4(),
              min: 2,
              max: 5,
              step: 1
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "mappings",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-code-branch mr-2"></i>${escape_html(workflows())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            Checkbox($$payload4, {
              form,
              field: "allow_self_validation",
              label: allowselfvalidation2(),
              helpText: allowselfvalidationhelptext4()
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "workflows",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-shield-halved mr-2"></i>${escape_html(security())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            Checkbox($$payload4, {
              form,
              field: "show_warning_external_links",
              label: showwarningexternallinks3(),
              helpText: showwarningexternallinkshelptext5()
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "security",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-clipboard-user mr-2"></i>${escape_html(assignmentsettings1())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="p-4">`;
            Checkbox($$payload4, {
              form,
              field: "allow_assignments_to_entities",
              label: allowassignmentstoentities3(),
              helpText: allowassignmentstoentitiesdescription4()
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "assignments",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
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
function BackgroundCheckbox($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    label: label2,
    field,
    valuePath = field,
    helpText,
    cachedValue,
    form,
    hidden = false,
    disabled = false,
    classes = "",
    classesContainer = "",
    onChange = () => {
    },
    $$slots,
    $$events,
    ...rest
  } = $$props;
  label2 = label2 ?? field;
  const { value: value2, errors } = formFieldProxy(form, valuePath);
  let classesHidden = (h) => h ? "hidden" : "";
  let classesDisabled = (d) => d ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  $$payload.out += `<div${attr_class(`${stringify(classesContainer)} ${stringify(classesHidden(hidden))}`)}><div${attr_class(`flex flex-col p-4 border rounded-lg transition-all duration-300 ease-in-out min-h-[150px] ${stringify(classesDisabled(disabled))} ${stringify(classes)} ${stringify(store_get($$store_subs ??= {}, "$value", value2) ? "bg-gradient-to-br from-primary-400 to-primary-500 border-primary text-white" : "bg-white border-gray-300")}`)} role="checkbox"${attr("aria-checked", store_get($$store_subs ??= {}, "$value", value2))} tabindex="0"><div class="flex justify-between items-center min-h-[2.5rem]"><span class="font-semibold">${escape_html(label2)}</span> `;
  if (store_get($$store_subs ??= {}, "$value", value2)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="w-6 h-6 flex items-center justify-center"><svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"></path></svg></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p${attr_class(`text-sm mt-1 transition-colors duration-300 ease-in-out ${stringify(store_get($$store_subs ??= {}, "$value", value2) ? "text-primary-100" : "text-gray-500")}`)}>${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  if (store_get($$store_subs ??= {}, "$errors", errors)?.length) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div class="mt-1"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<p class="text-red-500 text-xs font-medium">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function FeatureFlagsSettingForm($$payload, $$props) {
  push();
  let { form } = $$props;
  const featureFlagGroups = [
    {
      category: organization(),
      description: organisationdescription1(),
      fields: [
        {
          field: "organisation_objectives",
          label: organisationobjectives1(),
          description: organisationobjectivesdescription2()
        },
        {
          field: "organisation_issues",
          label: organisationissues1(),
          description: organisationissuesdescription2()
        }
      ]
    },
    {
      category: operations(),
      description: operationsdescription1(),
      fields: [
        {
          field: "tasks",
          label: tasks(),
          description: tasktemplatesdescription2()
        },
        {
          field: "xrays",
          label: xrays1(),
          description: xraysdescription2()
        },
        {
          field: "incidents",
          label: incidents(),
          description: incidentsdescription1()
        },
        {
          field: "follow_up",
          label: followup1(),
          description: findingsassessmentsdescription2()
        },
        {
          field: "metrology",
          label: metrology(),
          description: metrologydescription1()
        }
      ]
    },
    {
      category: assetclassmanagementandgovernance4(),
      description: assetclassmanagementandgovernancedescription5(),
      fields: [
        {
          field: "project_management",
          label: projectmanagement1(),
          description: projectmanagementdescription2()
        },
        {
          field: "reports",
          label: reports(),
          description: reportsdescription1()
        },
        {
          field: "tprm",
          label: thirdparty1(),
          description: thirdpartydescription2()
        },
        {
          field: "contracts",
          label: contracts(),
          description: contractsdescription1()
        },
        {
          field: "validation_flows",
          label: validationflows1(),
          description: validationflowsdescription2()
        }
      ]
    },
    {
      category: complianceriskmanagement2(),
      description: complianceriskmanagementdescription3(),
      fields: [
        {
          field: "compliance",
          label: compliance(),
          description: complianceassessmentsdescription2()
        },
        {
          field: "privacy",
          label: privacy(),
          description: privacydescription1()
        },
        {
          field: "risk_acceptances",
          label: riskacceptances1(),
          description: riskacceptancesdescription2()
        },
        {
          field: "exceptions",
          label: securityexceptions1(),
          description: securityexceptionsdescription2()
        },
        {
          field: "inherent_risk",
          label: inherentrisk1(),
          description: inherentrisklevelhelptext4()
        },
        {
          field: "vulnerabilities",
          label: vulnerabilities(),
          description: vulnerabilitiesdescription1()
        },
        {
          field: "ebiosrm",
          label: ebiosrm2(),
          description: ebiosrmdescription2()
        },
        {
          field: "quantitative_risk_studies",
          label: quantitativeriskstudies2(),
          description: quantitativeriskstudiesdescription3()
        },
        {
          field: "scoring_assistant",
          label: scoringassistant1(),
          description: scoringassistantdescription2()
        },
        {
          field: "bia",
          label: businessimpactanalysis2(),
          description: businessimpactanalysisdescription3()
        }
      ]
    },
    {
      category: extra(),
      description: extradescription1(),
      fields: [
        {
          field: "terminologies",
          label: terminologies(),
          description: riskoriginhelptext3()
        },
        {
          field: "outgoing_webhooks",
          label: webhooks(),
          description: webhooksdescription1()
        },
        {
          field: "experimental",
          label: experimental(),
          description: experimentalfeatures1()
        }
      ]
    }
  ];
  const each_array = ensure_array_like(featureFlagGroups);
  $$payload.out += `<div class="space-y-6"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let group = each_array[$$index_1];
    const each_array_1 = ensure_array_like(group.fields);
    $$payload.out += `<div class="bg-white shadow-sm rounded-xl p-6 border border-gray-200"><div class="mb-4"><h2 class="text-xl font-bold text-gray-800">${escape_html(group.category)}</h2> <p class="text-sm text-gray-500 mt-1">${escape_html(group.description)}</p></div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let { field, label: label2, description: description2 } = each_array_1[$$index];
      BackgroundCheckbox($$payload, { form, field, label: label2, helpText: description2 });
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function ProcessingForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "status",
      options: model.selectOptions["status"],
      cacheLock: cacheLocks["status"],
      label: status(),
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "assigned_to",
      cacheLock: cacheLocks["assigned_to"],
      label: assignedto1(),
      get cachedValue() {
        return formDataCache["assigned_to"];
      },
      set cachedValue($$value) {
        formDataCache["assigned_to"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "processing-natures",
      field: "nature",
      label: processingnature1()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      createFromSelection: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      translateOptions: false,
      field: "filtering_labels",
      helpText: labelshelptext2(),
      label: labels(),
      allowUserOptions: "append"
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "dpia_required",
      label: dpiarequired1(),
      cacheLock: cacheLocks["dpia_required"],
      get cachedValue() {
        return formDataCache["dpia_required"];
      },
      set cachedValue($$value) {
        formDataCache["dpia_required"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "dpia_reference",
      label: dpiareference1(),
      helpText: dpiareferencehelptext3(),
      cacheLock: cacheLocks["dpia_reference"],
      get cachedValue() {
        return formDataCache["dpia_reference"];
      },
      set cachedValue($$value) {
        formDataCache["dpia_reference"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "applied-controls",
      optionsExtraFields: [["folder", "str"]],
      field: "associated_controls",
      cacheLock: cacheLocks["associated_controls"],
      label: associatedappliedcontrols2(),
      get cachedValue() {
        return formDataCache["associated_controls"];
      },
      set cachedValue($$value) {
        formDataCache["associated_controls"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      field: "evidences",
      cacheLock: cacheLocks["evidences"],
      label: evidences(),
      get cachedValue() {
        return formDataCache["evidences"];
      },
      set cachedValue($$value) {
        formDataCache["evidences"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function PurposeForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "legal_basis",
      options: model.selectOptions["legal_basis"],
      cacheLock: cacheLocks["legal_basis"],
      label: legalbasis1(),
      get cachedValue() {
        return formDataCache["legal_basis"];
      },
      set cachedValue($$value) {
        formDataCache["legal_basis"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function PersonalDataForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "category",
      options: model.selectOptions["category"],
      cacheLock: cacheLocks["category"],
      label: category(),
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "retention",
      label: retention(),
      cacheLock: cacheLocks["retention"],
      get cachedValue() {
        return formDataCache["retention"];
      },
      set cachedValue($$value) {
        formDataCache["retention"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "deletion_policy",
      options: model.selectOptions["deletion_policy"],
      cacheLock: cacheLocks["deletion_policy"],
      label: deletionpolicy1(),
      get cachedValue() {
        return formDataCache["deletion_policy"];
      },
      set cachedValue($$value) {
        formDataCache["deletion_policy"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_sensitive",
      label: issensitive1(),
      cacheLock: cacheLocks["is_sensitive"],
      get cachedValue() {
        return formDataCache["is_sensitive"];
      },
      set cachedValue($$value) {
        formDataCache["is_sensitive"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "assets",
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        classes: "text-blue-500"
      },
      cacheLock: cacheLocks["assets"],
      label: assets(),
      multiple: true,
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DataSubjectForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "category",
      options: model.selectOptions["category"],
      cacheLock: cacheLocks["category"],
      label: category(),
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DataRecipientForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "category",
      options: model.selectOptions["category"],
      cacheLock: cacheLocks["category"],
      label: category(),
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DataContractorForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "relationship_type",
      options: model.selectOptions["relationship_type"],
      cacheLock: cacheLocks["relationship_type"],
      label: relationshiptype1(),
      get cachedValue() {
        return formDataCache["relationship_type"];
      },
      set cachedValue($$value) {
        formDataCache["relationship_type"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      translateOptions: false,
      field: "country",
      options: model.selectOptions["country"],
      cacheLock: cacheLocks["country"],
      label: country(),
      get cachedValue() {
        return formDataCache["country"];
      },
      set cachedValue($$value) {
        formDataCache["country"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "documentation_link",
      label: documentationlink1(),
      cacheLock: cacheLocks["documentation_link"],
      get cachedValue() {
        return formDataCache["documentation_link"];
      },
      set cachedValue($$value) {
        formDataCache["documentation_link"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "entity",
      optionsEndpoint: "entities",
      cacheLock: cacheLocks["entity"],
      label: entity(),
      optionsInfoFields: {
        fields: [
          {
            field: "relationship",
            display: (relationships2) => {
              if (!relationships2 || relationships2.length === 0) return "";
              return relationships2.map((r) => safeTranslate(r.str || r.name || r)).join(" | ");
            }
          }
        ],
        position: "suffix",
        separator: " | ",
        classes: "text-xs text-surface-500"
      },
      get cachedValue() {
        return formDataCache["entity"];
      },
      set cachedValue($$value) {
        formDataCache["entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DataTransferForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      translateOptions: false,
      field: "country",
      options: model.selectOptions["country"],
      cacheLock: cacheLocks["country"],
      label: country(),
      get cachedValue() {
        return formDataCache["country"];
      },
      set cachedValue($$value) {
        formDataCache["country"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "legal_basis",
      options: model.selectOptions["legal_basis"],
      cacheLock: cacheLocks["legal_basis"],
      label: legalbasis1(),
      get cachedValue() {
        return formDataCache["legal_basis"];
      },
      set cachedValue($$value) {
        formDataCache["legal_basis"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "guarantees",
      label: guarantees(),
      cacheLock: cacheLocks["guarantees"],
      get cachedValue() {
        return formDataCache["guarantees"];
      },
      set cachedValue($$value) {
        formDataCache["guarantees"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "documentation_link",
      label: documentationlink1(),
      cacheLock: cacheLocks["documentation_link"],
      get cachedValue() {
        return formDataCache["documentation_link"];
      },
      set cachedValue($$value) {
        formDataCache["documentation_link"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "entity",
      optionsEndpoint: "entities",
      cacheLock: cacheLocks["entity"],
      label: entity(),
      optionsInfoFields: {
        fields: [
          {
            field: "relationship",
            display: (relationships2) => {
              if (!relationships2 || relationships2.length === 0) return "";
              return relationships2.map((r) => safeTranslate(r.str || r.name || r)).join(" | ");
            }
          }
        ],
        position: "suffix",
        separator: " | ",
        classes: "text-xs text-surface-500"
      },
      get cachedValue() {
        return formDataCache["entity"];
      },
      set cachedValue($$value) {
        formDataCache["entity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processing",
      optionsEndpoint: "processings",
      cacheLock: cacheLocks["processing"],
      label: processing(),
      hidden: initialData.processing,
      get cachedValue() {
        return formDataCache["processing"];
      },
      set cachedValue($$value) {
        formDataCache["processing"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function RightRequestForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "requested_on",
      type: "date",
      label: requestedon1(),
      cacheLock: cacheLocks["requested_on"],
      get cachedValue() {
        return formDataCache["requested_on"];
      },
      set cachedValue($$value) {
        formDataCache["requested_on"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "request_type",
      options: model.selectOptions["request_type"],
      cacheLock: cacheLocks["request_type"],
      label: requesttype1(),
      get cachedValue() {
        return formDataCache["request_type"];
      },
      set cachedValue($$value) {
        formDataCache["request_type"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "status",
      options: model.selectOptions["status"],
      cacheLock: cacheLocks["status"],
      label: status(),
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "due_date",
      type: "date",
      label: duedate1(),
      cacheLock: cacheLocks["due_date"],
      get cachedValue() {
        return formDataCache["due_date"];
      },
      set cachedValue($$value) {
        formDataCache["due_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "processings",
      multiple: true,
      optionsEndpoint: "processings",
      optionsExtraFields: [["folder", "str"]],
      cacheLock: cacheLocks["processings"],
      label: processings(),
      get cachedValue() {
        return formDataCache["processings"];
      },
      set cachedValue($$value) {
        formDataCache["processings"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DataBreachForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let openAccordionItems = [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "assigned_to",
      cacheLock: cacheLocks["assigned_to"],
      label: assignedto1(),
      get cachedValue() {
        return formDataCache["assigned_to"];
      },
      set cachedValue($$value) {
        formDataCache["assigned_to"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "discovered_on",
      type: "datetime-local",
      label: discoveredon1(),
      cacheLock: cacheLocks["discovered_on"],
      get cachedValue() {
        return formDataCache["discovered_on"];
      },
      set cachedValue($$value) {
        formDataCache["discovered_on"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "breach_type",
      options: model.selectOptions["breach_type"],
      cacheLock: cacheLocks["breach_type"],
      label: breachtype1(),
      get cachedValue() {
        return formDataCache["breach_type"];
      },
      set cachedValue($$value) {
        formDataCache["breach_type"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "risk_level",
      options: model.selectOptions["risk_level"],
      cacheLock: cacheLocks["risk_level"],
      label: databreachrisklevel3(),
      helpText: databreachrisklevelhelptext5(),
      get cachedValue() {
        return formDataCache["risk_level"];
      },
      set cachedValue($$value) {
        formDataCache["risk_level"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "status",
      options: model.selectOptions["status"],
      cacheLock: cacheLocks["status"],
      label: status(),
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Accordion($$payload2, {
      value: openAccordionItems,
      onValueChange: (e) => openAccordionItems = e.value,
      multiple: true,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-chart-line mr-2"></i>${escape_html(riskassessment1())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="flex flex-col space-y-3 p-4">`;
            TextField($$payload4, {
              form,
              field: "affected_subjects_count",
              type: "number",
              label: affectedsubjectscount2(),
              cacheLock: cacheLocks["affected_subjects_count"],
              get cachedValue() {
                return formDataCache["affected_subjects_count"];
              },
              set cachedValue($$value) {
                formDataCache["affected_subjects_count"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            AutocompleteSelect($$payload4, {
              form,
              field: "affected_processings",
              multiple: true,
              optionsEndpoint: "processings",
              optionsExtraFields: [["folder", "str"]],
              cacheLock: cacheLocks["affected_processings"],
              label: affectedprocessings1(),
              get cachedValue() {
                return formDataCache["affected_processings"];
              },
              set cachedValue($$value) {
                formDataCache["affected_processings"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            AutocompleteSelect($$payload4, {
              form,
              field: "affected_personal_data",
              multiple: true,
              optionsEndpoint: "personal-data",
              optionsExtraFields: [["folder", "str"]],
              cacheLock: cacheLocks["affected_personal_data"],
              label: affectedpersonaldata2(),
              get cachedValue() {
                return formDataCache["affected_personal_data"];
              },
              set cachedValue($$value) {
                formDataCache["affected_personal_data"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            TextField($$payload4, {
              form,
              field: "affected_personal_data_count",
              type: "number",
              label: affectedpersonaldatacount3(),
              cacheLock: cacheLocks["affected_personal_data_count"],
              get cachedValue() {
                return formDataCache["affected_personal_data_count"];
              },
              set cachedValue($$value) {
                formDataCache["affected_personal_data_count"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            MarkdownField($$payload4, {
              form,
              field: "potential_consequences",
              label: potentialconsequences1(),
              cacheLock: cacheLocks["potential_consequences"],
              get cachedValue() {
                return formDataCache["potential_consequences"];
              },
              set cachedValue($$value) {
                formDataCache["potential_consequences"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "assessment",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-landmark mr-2"></i>${escape_html(authorities())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="flex flex-col space-y-3 p-4">`;
            AutocompleteSelect($$payload4, {
              form,
              field: "authorities",
              multiple: true,
              optionsEndpoint: "entities?relationship__name=regulatory_authority",
              cacheLock: cacheLocks["authorities"],
              label: authorities(),
              get cachedValue() {
                return formDataCache["authorities"];
              },
              set cachedValue($$value) {
                formDataCache["authorities"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            TextField($$payload4, {
              form,
              field: "authority_notified_on",
              type: "datetime-local",
              label: authoritynotifiedon2(),
              cacheLock: cacheLocks["authority_notified_on"],
              get cachedValue() {
                return formDataCache["authority_notified_on"];
              },
              set cachedValue($$value) {
                formDataCache["authority_notified_on"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            TextField($$payload4, {
              form,
              field: "authority_notification_ref",
              label: authoritynotificationref2(),
              cacheLock: cacheLocks["authority_notification_ref"],
              get cachedValue() {
                return formDataCache["authority_notification_ref"];
              },
              set cachedValue($$value) {
                formDataCache["authority_notification_ref"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "authority",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!----> <!---->`;
        {
          let control = function($$payload4) {
            $$payload4.out += `<i class="fa-solid fa-shield-halved mr-2"></i>${escape_html(treatment())}`;
          }, panel = function($$payload4) {
            $$payload4.out += `<div class="flex flex-col space-y-3 p-4">`;
            AutocompleteSelect($$payload4, {
              form,
              field: "incident",
              optionsEndpoint: "incidents",
              optionsExtraFields: [["folder", "str"]],
              cacheLock: cacheLocks["incident"],
              label: incident(),
              get cachedValue() {
                return formDataCache["incident"];
              },
              set cachedValue($$value) {
                formDataCache["incident"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            TextField($$payload4, {
              form,
              field: "subjects_notified_on",
              type: "datetime-local",
              label: subjectsnotifiedon2(),
              cacheLock: cacheLocks["subjects_notified_on"],
              get cachedValue() {
                return formDataCache["subjects_notified_on"];
              },
              set cachedValue($$value) {
                formDataCache["subjects_notified_on"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            AutocompleteSelect($$payload4, {
              form,
              field: "remediation_measures",
              multiple: true,
              optionsEndpoint: "applied-controls",
              optionsExtraFields: [["folder", "str"]],
              cacheLock: cacheLocks["remediation_measures"],
              label: remediationmeasures1(),
              get cachedValue() {
                return formDataCache["remediation_measures"];
              },
              set cachedValue($$value) {
                formDataCache["remediation_measures"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            TextField($$payload4, {
              form,
              field: "reference_link",
              type: "url",
              label: referencelink1(),
              cacheLock: cacheLocks["reference_link"],
              get cachedValue() {
                return formDataCache["reference_link"];
              },
              set cachedValue($$value) {
                formDataCache["reference_link"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            MarkdownField($$payload4, {
              form,
              field: "observation",
              label: observation(),
              cacheLock: cacheLocks["observation"],
              get cachedValue() {
                return formDataCache["observation"];
              },
              set cachedValue($$value) {
                formDataCache["observation"] = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div>`;
          };
          Accordion.Item($$payload3, {
            value: "treatment",
            control,
            panel,
            $$slots: { control: true, panel: true }
          });
        }
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function EbiosRmForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  let activeActivity = null;
  page$1.url.searchParams.forEach((value2, key) => {
    if (key === "activity" && value2 === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value2 === "two") {
      activeActivity = "two";
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (context != "selectAudit" && context != "selectAsset") {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        form,
        field: "name",
        label: name(),
        cacheLock: cacheLocks["name"],
        "data-focusindex": "0",
        get cachedValue() {
          return formDataCache["name"];
        },
        set cachedValue($$value) {
          formDataCache["name"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (context !== "ebiosRmStudy" && context !== "selectAudit" && context !== "selectAsset") {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        form,
        field: "version",
        label: version(),
        cacheLock: cacheLocks["version"],
        get cachedValue() {
          return formDataCache["version"];
        },
        set cachedValue($$value) {
          formDataCache["version"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "ref_id",
        label: refid1(),
        cacheLock: cacheLocks["ref_id"],
        get cachedValue() {
          return formDataCache["ref_id"];
        },
        set cachedValue($$value) {
          formDataCache["ref_id"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions["quotation_method"],
        field: "quotation_method",
        disableDoubleDash: true,
        label: quotationmethod1(),
        cacheLock: cacheLocks["quotation_method"],
        get cachedValue() {
          return formDataCache["quotation_method"];
        },
        set cachedValue($$value) {
          formDataCache["quotation_method"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "folders?content_type=DO",
        field: "folder",
        pathField: "path",
        cacheLock: cacheLocks["folder"],
        label: domain(),
        hidden: initialData.folder,
        get cachedValue() {
          return formDataCache["folder"];
        },
        set cachedValue($$value) {
          formDataCache["folder"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "risk-matrices",
        field: "risk_matrix",
        cacheLock: cacheLocks["risk_matrix"],
        label: riskmatrix1(),
        helpText: ebiosrmmatrixhelptext4(),
        get cachedValue() {
          return formDataCache["risk_matrix"];
        },
        set cachedValue($$value) {
          formDataCache["risk_matrix"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else if (context === "ebiosRmStudy") {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `<div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</p> `;
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "risk-matrices",
        field: "risk_matrix",
        cacheLock: cacheLocks["risk_matrix"],
        label: riskmatrix1(),
        helpText: ebiosrmmatrixhelptext4() + "\n" + riskassessmentmatrixhelptext4(),
        get cachedValue() {
          return formDataCache["risk_matrix"];
        },
        set cachedValue($$value) {
          formDataCache["risk_matrix"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      MarkdownField($$payload2, {
        form,
        field: "description",
        label: description(),
        cacheLock: cacheLocks["description"],
        "data-focusindex": "1",
        get cachedValue() {
          return formDataCache["description"];
        },
        set cachedValue($$value) {
          formDataCache["description"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "version",
        label: version(),
        cacheLock: cacheLocks["version"],
        get cachedValue() {
          return formDataCache["version"];
        },
        set cachedValue($$value) {
          formDataCache["version"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions["quotation_method"],
        field: "quotation_method",
        disableDoubleDash: true,
        label: quotationmethod1(),
        cacheLock: cacheLocks["quotation_method"],
        get cachedValue() {
          return formDataCache["quotation_method"];
        },
        set cachedValue($$value) {
          formDataCache["quotation_method"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "ref_id",
        label: refid1(),
        cacheLock: cacheLocks["ref_id"],
        get cachedValue() {
          return formDataCache["ref_id"];
        },
        set cachedValue($$value) {
          formDataCache["ref_id"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "actors",
        optionsLabelField: "str",
        optionsInfoFields: {
          fields: [{ field: "type", translate: true }],
          position: "prefix"
        },
        field: "authors",
        cacheLock: cacheLocks["authors"],
        label: authors(),
        get cachedValue() {
          return formDataCache["authors"];
        },
        set cachedValue($$value) {
          formDataCache["authors"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "actors",
        optionsLabelField: "str",
        optionsInfoFields: {
          fields: [{ field: "type", translate: true }],
          position: "prefix"
        },
        field: "reviewers",
        cacheLock: cacheLocks["reviewers"],
        label: reviewers(),
        get cachedValue() {
          return formDataCache["reviewers"];
        },
        set cachedValue($$value) {
          formDataCache["reviewers"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 bg-white font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</p> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "assets",
        optionsLabelField: "auto",
        optionsExtraFields: [["folder", "str"]],
        optionsDetailedUrlParameters: [
          rest?.scopeFolder?.id ? ["scope_folder_id", rest.scopeFolder.id] : ["", void 0]
        ],
        optionsInfoFields: {
          fields: [{ field: "type" }],
          classes: "text-blue-500"
        },
        field: "assets",
        label: assets(),
        helpText: studyassethelptext3()
      });
      $$payload2.out += `<!----></div> `;
      MarkdownField($$payload2, {
        form,
        field: "observation",
        label: observation(),
        cacheLock: cacheLocks["observation"],
        get cachedValue() {
          return formDataCache["observation"];
        },
        set cachedValue($$value) {
          formDataCache["observation"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else if (context === "selectAudit") {
      $$payload2.out += "<!--[2-->";
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "compliance-assessments",
        optionsExtraFields: [["perimeter", "str"]],
        optionsLabelField: "auto",
        field: "compliance_assessments",
        cacheLock: cacheLocks["compliance_assessments"],
        label: complianceassessment1(),
        get cachedValue() {
          return formDataCache["compliance_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["compliance_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectAsset") {
      $$payload2.out += "<!--[3-->";
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "assets",
        optionsExtraFields: [["folder", "str"]],
        optionsDetailedUrlParameters: [
          rest?.scopeFolder?.id ? ["scope_folder_id", rest.scopeFolder.id] : ["", void 0]
        ],
        optionsInfoFields: {
          fields: [{ field: "type" }],
          classes: "text-blue-500"
        },
        optionsLabelField: "auto",
        field: "assets",
        cacheLock: cacheLocks["assets"],
        label: assets(),
        get cachedValue() {
          return formDataCache["assets"];
        },
        set cachedValue($$value) {
          formDataCache["assets"] = $$value;
          $$settled = false;
        }
      });
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function FearedEventForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<p class="text-sm text-gray-500">${escape_html(fearedeventhelptext3())}</p> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "ebios_rm_study",
      cacheLock: cacheLocks["ebios_rm_study"],
      label: ebiosrmstudy2(),
      hidden: initialData.ebios_rm_study,
      get cachedValue() {
        return formDataCache["ebios_rm_study"];
      },
      set cachedValue($$value) {
        formDataCache["ebios_rm_study"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["gravity"],
      field: "gravity",
      label: gravity(),
      cacheLock: cacheLocks["gravity"],
      helpText: gravityhelptext2(),
      get cachedValue() {
        return formDataCache["gravity"];
      },
      set cachedValue($$value) {
        formDataCache["gravity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "assets",
      optionsDetailedUrlParameters: [
        [
          "ebios_rm_studies",
          initialData.ebios_rm_study
        ]
      ],
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      optionsLabelField: "auto",
      field: "assets",
      label: assets(),
      helpText: fearedeventassethelptext4()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "terminologies?field_path=qualifications&is_visible=true",
      field: "qualifications",
      optionsLabelField: "translated_name",
      label: qualifications(),
      helpText: fearedeventqualificationhelptext4()
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: isselected1(),
      helpText: fearedeventisselectedhelptext5()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function RoToForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context
  } = $$props;
  const activityBackground = context === "edit" ? "bg-white" : "bg-surface-100-900";
  let activeActivity = null;
  page$1.url.searchParams.forEach((value2, key) => {
    if (key === "activity" && value2 === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value2 === "two") {
      activeActivity = "two";
    } else if (key === "activity" && value2 === "three") {
      activeActivity = "three";
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "ebios_rm_study",
      cacheLock: cacheLocks["ebios_rm_study"],
      label: ebiosrmstudy2(),
      hidden: initialData.ebios_rm_study,
      get cachedValue() {
        return formDataCache["ebios_rm_study"];
      },
      set cachedValue($$value) {
        formDataCache["ebios_rm_study"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</p> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "terminologies?field_path=ro_to.risk_origin&is_visible=true",
      optionsLabelField: "translated_name",
      field: "risk_origin",
      label: riskorigin1(),
      cacheLock: cacheLocks["risk_origin"],
      helpText: riskoriginhelptext3(),
      get cachedValue() {
        return formDataCache["risk_origin"];
      },
      set cachedValue($$value) {
        formDataCache["risk_origin"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "target_objective",
      label: targetobjective1(),
      cacheLock: cacheLocks["target_objective"],
      helpText: targetobjectivehelptext3(),
      get cachedValue() {
        return formDataCache["target_objective"];
      },
      set cachedValue($$value) {
        formDataCache["target_objective"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</p> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["motivation"],
      field: "motivation",
      label: motivation(),
      cacheLock: cacheLocks["motivation"],
      helpText: motivationhelptext2(),
      get cachedValue() {
        return formDataCache["motivation"];
      },
      set cachedValue($$value) {
        formDataCache["motivation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["resources"],
      field: "resources",
      label: resources(),
      cacheLock: cacheLocks["resources"],
      helpText: resourceshelptext2(),
      get cachedValue() {
        return formDataCache["resources"];
      },
      set cachedValue($$value) {
        formDataCache["resources"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["activity"],
      field: "activity",
      label: ro_activity(),
      cacheLock: cacheLocks["activity"],
      helpText: activityhelptext2(),
      get cachedValue() {
        return formDataCache["activity"];
      },
      set cachedValue($$value) {
        formDataCache["activity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "three" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "three" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitythree1())}</p> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: isselected1(),
      helpText: rotoisselectedhelptext5()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "feared-events?is_selected=true",
      optionsDetailedUrlParameters: [
        ["ebios_rm_study", initialData.ebios_rm_study]
      ],
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "feared_events",
      label: fearedevents1(),
      helpText: rotofearedeventhelptext5()
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
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
  bind_props($$props, { formDataCache });
  pop();
}
function StakeholderForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context = "create"
  } = $$props;
  const formData = form.form;
  const activityBackground = context === "edit" ? "bg-white" : "bg-surface-100-900";
  const activeActivity = page$1.url.searchParams.get("activity") || "";
  const getCriticality = (dependency2, penetration2, maturity2, trust2) => {
    if (maturity2 === 0 || trust2 === 0) return 0;
    return (dependency2 * penetration2 / (maturity2 * trust2)).toFixed(2).replace(/\.?0+$/, "");
  };
  let currentCriticality = getCriticality(store_get($$store_subs ??= {}, "$formData", formData).current_dependency, store_get($$store_subs ??= {}, "$formData", formData).current_penetration, store_get($$store_subs ??= {}, "$formData", formData).current_maturity, store_get($$store_subs ??= {}, "$formData", formData).current_trust);
  let residualCriticality = getCriticality(store_get($$store_subs ??= {}, "$formData", formData).residual_dependency, store_get($$store_subs ??= {}, "$formData", formData).residual_penetration, store_get($$store_subs ??= {}, "$formData", formData).residual_maturity, store_get($$store_subs ??= {}, "$formData", formData).residual_trust);
  let selectedEntityOption = [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div${attr_class(`relative p-2 space-y-2 rounded-container ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</p> <div class="flex flex-wrap items-center gap-4"><div><span class="flex flex-row space-x-4">`;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "entities",
      field: "entity",
      cacheLock: cacheLocks["entity"],
      label: entity(),
      hidden: initialData.entity,
      helpText: stakeholderentityhelptext3(),
      includeAllOptionFields: true,
      optionsInfoFields: {
        fields: [
          {
            field: "relationship",
            display: (relationships2) => {
              if (!relationships2 || relationships2.length === 0) return "";
              return relationships2.map((r) => safeTranslate(r.str || r.name || r)).join(" | ");
            }
          }
        ],
        position: "suffix",
        separator: " | ",
        classes: "text-xs text-surface-500"
      },
      get cachedValue() {
        return formDataCache["entity"];
      },
      set cachedValue($$value) {
        formDataCache["entity"] = $$value;
        $$settled = false;
      },
      get cachedOptions() {
        return selectedEntityOption;
      },
      set cachedOptions($$value) {
        selectedEntityOption = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "terminologies",
      optionsDetailedUrlParameters: [
        ["field_path", "entity.relationship"],
        ["is_visible", "true"]
      ],
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      helpText: stakeholdercategoryhelptext3(),
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span> <h4 class="h4 font-semibold self-start">${escape_html(currentassessment1())}</h4> <div class="flex flex-row items-center space-x-4"><div class="flex flex-col space-y-4 w-fit items-center"><span class="flex flex-row items-center space-x-4">`;
    RadioGroup($$payload2, {
      form,
      possibleOptions: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ],
      label: dependency(),
      field: "current_dependency",
      labelKey: "label",
      key: "value",
      cacheLock: cacheLocks["current_dependency"],
      helpText: dependencyhelptext2(),
      get cachedValue() {
        return formDataCache["current_dependency"];
      },
      set cachedValue($$value) {
        formDataCache["current_dependency"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <i class="fa-solid fa-times"></i> `;
    RadioGroup($$payload2, {
      form,
      possibleOptions: [
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ],
      label: penetration(),
      field: "current_penetration",
      labelKey: "label",
      key: "value",
      cacheLock: cacheLocks["current_penetration"],
      helpText: penetrationhelptext2(),
      get cachedValue() {
        return formDataCache["current_penetration"];
      },
      set cachedValue($$value) {
        formDataCache["current_penetration"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span> <hr class="border-t-2! border-surface-900! self-stretch"/> <span class="flex flex-row items-center space-x-4">`;
    RadioGroup($$payload2, {
      form,
      possibleOptions: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ],
      label: maturity(),
      field: "current_maturity",
      labelKey: "label",
      key: "value",
      cacheLock: cacheLocks["current_maturity"],
      helpText: maturityhelptext2(),
      get cachedValue() {
        return formDataCache["current_maturity"];
      },
      set cachedValue($$value) {
        formDataCache["current_maturity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <i class="fa-solid fa-times"></i> `;
    RadioGroup($$payload2, {
      form,
      possibleOptions: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ],
      label: trust(),
      field: "current_trust",
      labelKey: "label",
      key: "value",
      cacheLock: cacheLocks["current_trust"],
      helpText: trusthelptext2(),
      get cachedValue() {
        return formDataCache["current_trust"];
      },
      set cachedValue($$value) {
        formDataCache["current_trust"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></span></div> <i class="fa-solid fa-equals"></i> <div class="flex flex-col mb-5"><label for="current_criticality" class="text-sm font-semibold">${escape_html(criticality())}</label> <span class="chip text-base text-center px-4 py-1 rounded-base preset-filled">${escape_html(currentCriticality)}</span></div></div></div> <div class="flex flex-col grow">`;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: selected(),
      helpText: stakeholderisselectedhelptext4()
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></div> `;
    if (context === "edit") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(`relative p-2 space-y-2 rounded-container ${stringify(activeActivity === "three" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "three" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitythree1())}</p> <div class="flex flex-row space-x-2"><div class="w-full">`;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "applied-controls",
        optionsExtraFields: [["folder", "str"]],
        field: "applied_controls",
        label: appliedcontrols1()
      });
      $$payload2.out += `<!----></div> <div class="flex items-end"><button class="btn input h-11 w-11"${attr("aria-label", addappliedcontrol2())} type="button"><i class="fa-solid fa-plus text-sm"></i></button></div></div> <h4 class="h4 font-semibold self-start">${escape_html(targetassessment1())}</h4> <div class="flex flex-row items-center space-x-4"><div class="flex flex-col space-y-4 w-fit items-center"><span class="flex flex-row items-center space-x-4">`;
      RadioGroup($$payload2, {
        form,
        possibleOptions: [
          { label: "0", value: 0 },
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 }
        ],
        label: dependency(),
        field: "residual_dependency",
        labelKey: "label",
        key: "value",
        cacheLock: cacheLocks["residual_dependency"],
        get cachedValue() {
          return formDataCache["residual_dependency"];
        },
        set cachedValue($$value) {
          formDataCache["residual_dependency"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> <i class="fa-solid fa-times"></i> `;
      RadioGroup($$payload2, {
        form,
        possibleOptions: [
          { label: "0", value: 0 },
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 }
        ],
        label: penetration(),
        field: "residual_penetration",
        labelKey: "label",
        key: "value",
        cacheLock: cacheLocks["residual_penetration"],
        get cachedValue() {
          return formDataCache["residual_penetration"];
        },
        set cachedValue($$value) {
          formDataCache["residual_penetration"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></span> <hr class="border-t-2! border-surface-900! self-stretch"/> <span class="flex flex-row items-center space-x-4">`;
      RadioGroup($$payload2, {
        form,
        possibleOptions: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 }
        ],
        label: maturity(),
        field: "residual_maturity",
        labelKey: "label",
        key: "value",
        cacheLock: cacheLocks["residual_maturity"],
        get cachedValue() {
          return formDataCache["residual_maturity"];
        },
        set cachedValue($$value) {
          formDataCache["residual_maturity"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> <i class="fa-solid fa-times"></i> `;
      RadioGroup($$payload2, {
        form,
        possibleOptions: [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 }
        ],
        label: trust(),
        field: "residual_trust",
        labelKey: "label",
        key: "value",
        cacheLock: cacheLocks["residual_trust"],
        get cachedValue() {
          return formDataCache["residual_trust"];
        },
        set cachedValue($$value) {
          formDataCache["residual_trust"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></span></div> <i class="fa-solid fa-equals"></i> <div class="flex flex-col mb-5"><label for="residual_criticality" class="text-sm font-semibold">${escape_html(criticality())}</label> <span class="chip text-base text-center px-4 py-1 rounded-base preset-filled">${escape_html(residualCriticality)}</span></div></div></div>`;
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function AttackPathForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    additionalInitialData = {}
  } = $$props;
  const formStore = form.form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "strategic-scenarios",
      optionsDetailedUrlParameters: [
        [
          "ebios_rm_study",
          additionalInitialData.ebios_rm_study
        ]
      ],
      field: "strategic_scenario",
      cacheLock: cacheLocks["strategic_scenario"],
      label: strategicscenario1(),
      hidden: initialData["strategic_scenario"],
      get cachedValue() {
        return formDataCache["strategic_scenario"];
      },
      set cachedValue($$value) {
        formDataCache["strategic_scenario"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "stakeholders",
      optionsDetailedUrlParameters: store_get($$store_subs ??= {}, "$formStore", formStore).ebios_rm_study ? [
        [
          "ebios_rm_study",
          store_get($$store_subs ??= {}, "$formStore", formStore).ebios_rm_study
        ]
      ] : void 0,
      optionsLabelField: "str",
      field: "stakeholders",
      cacheLock: cacheLocks["stakeholders"],
      label: stakeholders(),
      helpText: attackpathstakeholdershelptext4(),
      get cachedValue() {
        return formDataCache["stakeholders"];
      },
      set cachedValue($$value) {
        formDataCache["stakeholders"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: selected(),
      helpText: attackpathisselectedhelptext5()
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function SecurityExceptionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context = "default"
  } = $$props;
  getModalStore();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    HiddenInput($$payload2, { form, field: "requirement_assessments" });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owners",
      cacheLock: cacheLocks["owners"],
      label: owners(),
      get cachedValue() {
        return formDataCache["owners"];
      },
      set cachedValue($$value) {
        formDataCache["owners"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "users?is_approver=true",
      optionsLabelField: "email",
      field: "approver",
      cacheLock: cacheLocks["approver"],
      nullable: true,
      label: approver(),
      helpText: approverhelptext2(),
      get cachedValue() {
        return formDataCache["approver"];
      },
      set cachedValue($$value) {
        formDataCache["approver"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["severity"],
      field: "severity",
      label: severity(),
      cacheLock: cacheLocks["severity"],
      get cachedValue() {
        return formDataCache["severity"];
      },
      set cachedValue($$value) {
        formDataCache["severity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      disableDoubleDash: "true",
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      helpText: observationhelptext2(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "expiration_date",
      label: expirationdate1(),
      cacheLock: cacheLocks["expiration_date"],
      get cachedValue() {
        return formDataCache["expiration_date"];
      },
      set cachedValue($$value) {
        formDataCache["expiration_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      pathField: "path",
      field: "assets",
      cacheLock: cacheLocks["assets"],
      label: assets(),
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex flex-row space-x-2 items-center"><div class="w-full"><!---->`;
    {
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "applied-controls",
        optionsExtraFields: [["folder", "str"]],
        field: "applied_controls",
        label: appliedcontrols1()
      });
    }
    $$payload2.out += `<!----></div> `;
    if (context !== "create") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="mt-4"><button class="btn bg-gray-300 h-10 w-10"${attr("aria-label", addappliedcontrol2())} type="button"><i class="fa-solid fa-plus text-sm"></i></button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FindingForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context = "default",
    object
  } = $$props;
  object?.findings_assessment?.is_locked || false;
  getModalStore();
  getModelInfo("applied-controls");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["severity"],
      field: "severity",
      label: severity(),
      cacheLock: cacheLocks["severity"],
      get cachedValue() {
        return formDataCache["severity"];
      },
      set cachedValue($$value) {
        formDataCache["severity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["priority"],
      field: "priority",
      label: priority(),
      cacheLock: cacheLocks["priority"],
      get cachedValue() {
        return formDataCache["priority"];
      },
      set cachedValue($$value) {
        formDataCache["priority"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "eta",
      label: eta(),
      helpText: etahelptext2(),
      cacheLock: cacheLocks["eta"],
      get cachedValue() {
        return formDataCache["eta"];
      },
      set cachedValue($$value) {
        formDataCache["eta"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "findings-assessments",
      field: "findings_assessment",
      cacheLock: cacheLocks["findings_assessment"],
      label: findingsassessment1(),
      hidden: initialData.findings_assessment,
      get cachedValue() {
        return formDataCache["findings_assessment"];
      },
      set cachedValue($$value) {
        formDataCache["findings_assessment"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="flex flex-row space-x-2 items-center"><div class="w-full"><!---->`;
    {
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        optionsEndpoint: "applied-controls",
        optionsExtraFields: [["folder", "str"]],
        field: "applied_controls",
        label: appliedcontrols1()
      });
    }
    $$payload2.out += `<!----></div> `;
    if (context !== "create") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="mt-4"><button class="btn bg-gray-300 h-10 w-10"${attr("aria-label", addappliedcontrol2())} type="button"><i class="fa-solid fa-plus text-sm"></i></button></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "vulnerabilities",
          optionsExtraFields: [["folder", "str"]],
          field: "vulnerabilities",
          label: vulnerabilities()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "evidences",
          optionsExtraFields: [["folder", "str"]],
          optionsLabelField: "auto",
          field: "evidences",
          label: evidences(),
          cacheLock: cacheLocks["evidences"],
          get cachedValue() {
            return formDataCache["evidences"];
          },
          set cachedValue($$value) {
            formDataCache["evidences"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "due_date",
          label: duedate1(),
          helpText: duedatehelptext3(),
          cacheLock: cacheLocks["due_date"],
          get cachedValue() {
            return formDataCache["due_date"];
          },
          set cachedValue($$value) {
            formDataCache["due_date"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          createFromSelection: true,
          optionsEndpoint: "filtering-labels",
          optionsLabelField: "label",
          translateOptions: false,
          field: "filtering_labels",
          helpText: labelshelptext2(),
          label: labels(),
          allowUserOptions: "append"
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          helpText: observationhelptext2(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FindingsAssessmentForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  form.data?.is_locked || object?.is_locked || false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeter",
      cacheLock: cacheLocks["perimeter"],
      label: perimeter(),
      hidden: initialData.perimeter,
      get cachedValue() {
        return formDataCache["perimeter"];
      },
      set cachedValue($$value) {
        formDataCache["perimeter"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "version",
      label: version(),
      cacheLock: cacheLocks["version"],
      get cachedValue() {
        return formDataCache["version"];
      },
      set cachedValue($$value) {
        formDataCache["version"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["category"],
      field: "category",
      hide: true,
      label: category(),
      cacheLock: cacheLocks["category"],
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      hide: true,
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "authors",
      cacheLock: cacheLocks["authors"],
      label: authors(),
      get cachedValue() {
        return formDataCache["authors"];
      },
      set cachedValue($$value) {
        formDataCache["authors"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "evidences",
      label: evidences(),
      cacheLock: cacheLocks["evidences"],
      get cachedValue() {
        return formDataCache["evidences"];
      },
      set cachedValue($$value) {
        formDataCache["evidences"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "reviewers",
          cacheLock: cacheLocks["reviewers"],
          label: reviewers(),
          get cachedValue() {
            return formDataCache["reviewers"];
          },
          set cachedValue($$value) {
            formDataCache["reviewers"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "eta",
          label: eta(),
          helpText: etahelptext2(),
          cacheLock: cacheLocks["eta"],
          get cachedValue() {
            return formDataCache["eta"];
          },
          set cachedValue($$value) {
            formDataCache["eta"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "due_date",
          label: duedate1(),
          helpText: duedatehelptext3(),
          cacheLock: cacheLocks["due_date"],
          get cachedValue() {
            return formDataCache["due_date"];
          },
          set cachedValue($$value) {
            formDataCache["due_date"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Checkbox($$payload3, {
          form,
          field: "is_locked",
          label: islocked1(),
          helpText: islockedhelptext3(),
          cacheLock: cacheLocks["is_locked"],
          get cachedValue() {
            return formDataCache["is_locked"];
          },
          set cachedValue($$value) {
            formDataCache["is_locked"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function IncidentForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    schema = {},
    initialData = {}
  } = $$props;
  const disableDoubleDash = true;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "datetime-local",
      step: "1",
      form,
      field: "reported_at",
      label: reportedat1(),
      cacheLock: cacheLocks["reported_at"],
      get cachedValue() {
        return formDataCache["reported_at"];
      },
      set cachedValue($$value) {
        formDataCache["reported_at"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      disableDoubleDash,
      field: "detection",
      label: detectedby1(),
      options: model.selectOptions["detection"],
      cacheLock: cacheLocks["detection"],
      get cachedValue() {
        return formDataCache["detection"];
      },
      set cachedValue($$value) {
        formDataCache["detection"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      disableDoubleDash,
      field: "status",
      label: status(),
      options: model.selectOptions["status"],
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      disableDoubleDash,
      options: [
        { label: unknown(), value: 6 },
        { label: critical(), value: 1 },
        { label: major(), value: 2 },
        { label: moderate(), value: 3 },
        { label: minor(), value: 4 },
        { label: low(), value: 5 }
      ],
      field: "severity",
      label: severity(),
      cacheLock: cacheLocks["severity"],
      get cachedValue() {
        return formDataCache["severity"];
      },
      set cachedValue($$value) {
        formDataCache["severity"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "link",
      label: link(),
      helpText: linkhelptext2(),
      cacheLock: cacheLocks["link"],
      get cachedValue() {
        return formDataCache["link"];
      },
      set cachedValue($$value) {
        formDataCache["link"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "terminologies?field_path=qualifications&is_visible=true",
          field: "qualifications",
          optionsLabelField: "translated_name",
          label: qualifications()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "assets",
          optionsLabelField: "auto",
          optionsExtraFields: [["folder", "str"]],
          optionsInfoFields: {
            fields: [{ field: "type" }],
            classes: "text-blue-500"
          },
          field: "assets",
          label: assets()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "threats",
          field: "threats",
          cacheLock: cacheLocks["threats"],
          label: threats(),
          get cachedValue() {
            return formDataCache["threats"];
          },
          set cachedValue($$value) {
            formDataCache["threats"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "owners",
          cacheLock: cacheLocks["owners"],
          label: owners(),
          get cachedValue() {
            return formDataCache["owners"];
          },
          set cachedValue($$value) {
            formDataCache["owners"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "entities",
          field: "entities",
          cacheLock: cacheLocks["entities"],
          label: entities(),
          get cachedValue() {
            return formDataCache["entities"];
          },
          set cachedValue($$value) {
            formDataCache["entities"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function TimelineEntryForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    context,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  const { value: value2 } = formFieldProxy(form, "entry_type");
  const formStore = form.form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    HiddenInput($$payload2, { form, field: "folder" });
    $$payload2.out += `<!----> `;
    if (context != "edit") {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "incidents",
        field: "incident",
        cacheLock: cacheLocks["incident"],
        label: incident(),
        hidden: initialData.incident,
        get cachedValue() {
          return formDataCache["incident"];
        },
        set cachedValue($$value) {
          formDataCache["incident"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (!["severity_changed", "status_changed"].includes(store_get($$store_subs ??= {}, "$value", value2))) {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        disableDoubleDash: true,
        options: model.selectOptions["entry_type"],
        field: "entry_type",
        label: entrytype1(),
        cacheLock: cacheLocks["entry_type"],
        get cachedValue() {
          return formDataCache["entry_type"];
        },
        set cachedValue($$value) {
          formDataCache["entry_type"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "entry",
        label: entry(),
        cacheLock: cacheLocks["entry"],
        "data-focusindex": "0",
        get cachedValue() {
          return formDataCache["entry"];
        },
        set cachedValue($$value) {
          formDataCache["entry"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    TextField($$payload2, {
      type: "datetime-local",
      step: "1",
      form,
      field: "timestamp",
      label: timestamp(),
      cacheLock: cacheLocks["timestamp"],
      get cachedValue() {
        return formDataCache["timestamp"];
      },
      set cachedValue($$value) {
        formDataCache["timestamp"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "evidences",
      optionsDetailedUrlParameters: store_get($$store_subs ??= {}, "$formStore", formStore).folder ? [
        [
          "scope_folder_id",
          store_get($$store_subs ??= {}, "$formStore", formStore).folder
        ]
      ] : void 0,
      field: "evidences",
      cacheLock: cacheLocks["evidences"],
      label: evidences(),
      get cachedValue() {
        return formDataCache["evidences"];
      },
      set cachedValue($$value) {
        formDataCache["evidences"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function TaskTemplateForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    cacheLocks = {},
    context = "",
    formDataCache = {},
    initialData = {}
  } = $$props;
  const { value: is_recurrent } = formFieldProxy(form, "is_recurrent");
  const { value: frequency$1 } = formFieldProxy(form, "schedule.frequency");
  const { tainted: taskDateTainted } = formFieldProxy(form, "task_date");
  const { tainted: scheduleTainted } = formFieldProxy(form, "schedule");
  function scheduleTaintedHandler(data) {
    if (Array.isArray(data)) {
      return data.some((item) => scheduleTaintedHandler(item));
    } else if (data !== null && typeof data === "object") {
      return Object.values(data).some((value2) => scheduleTaintedHandler(value2));
    } else {
      return data === true || store_get($$store_subs ??= {}, "$taskDateTainted", taskDateTainted) === true;
    }
  }
  let isScheduleTainted = scheduleTaintedHandler(store_get($$store_subs ??= {}, "$scheduleTainted", scheduleTainted));
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!store_get($$store_subs ??= {}, "$is_recurrent", is_recurrent)) {
      $$payload2.out += "<!--[-->";
      TextField($$payload2, {
        type: "date",
        form,
        field: "task_date",
        label: date(),
        cacheLock: cacheLocks["task_date"],
        get cachedValue() {
          return formDataCache["task_date"];
        },
        set cachedValue($$value) {
          formDataCache["task_date"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Checkbox($$payload2, {
      form,
      field: "is_recurrent",
      label: recurrent(),
      helpText: isrecurrenthelptext3(),
      cacheLock: cacheLocks["is_recurrent"],
      get cachedValue() {
        return formDataCache["is_recurrent"];
      },
      set cachedValue($$value) {
        formDataCache["is_recurrent"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (store_get($$store_subs ??= {}, "$is_recurrent", is_recurrent)) {
      $$payload2.out += "<!--[-->";
      Dropdown($$payload2, {
        open: true,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-calendar-days",
        header: schedule(),
        children: ($$payload3) => {
          TextField($$payload3, {
            type: "date",
            form,
            field: "task_date",
            label: startdate1(),
            cacheLock: cacheLocks["task_date"],
            get cachedValue() {
              return formDataCache["task_date"];
            },
            set cachedValue($$value) {
              formDataCache["task_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> <div class="flex w-full items-center space-x-3"><span class="mt-5 font-semibold text-sm text-gray-800">${escape_html(each())}</span> `;
          NumberField($$payload3, {
            form,
            field: "interval",
            valuePath: "schedule.interval",
            label: interval(),
            cacheLock: cacheLocks["interval"],
            get cachedValue() {
              return formDataCache["interval"];
            },
            set cachedValue($$value) {
              formDataCache["interval"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          Select($$payload3, {
            form,
            field: "frequency",
            valuePath: "schedule.frequency",
            disableDoubleDash: true,
            options: [
              { value: "DAILY", label: day() },
              { value: "WEEKLY", label: week() },
              { value: "MONTHLY", label: month() },
              { value: "YEARLY", label: year() }
            ],
            cacheLock: cacheLocks["frequency"],
            label: frequency(),
            get cachedValue() {
              return formDataCache["frequency"];
            },
            set cachedValue($$value) {
              formDataCache["frequency"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----></div> <div class="flex w-full items-center space-x-3">`;
          if (store_get($$store_subs ??= {}, "$frequency", frequency$1) == "MONTHLY" || store_get($$store_subs ??= {}, "$frequency", frequency$1) == "YEARLY") {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span class="mt-5 font-semibold text-sm text-gray-800">${escape_html(the())}</span> `;
            AutocompleteSelect($$payload3, {
              form,
              multiple: true,
              baseClass: "w-full",
              translateOptions: false,
              field: "weeks_of_month",
              valuePath: "schedule.weeks_of_month",
              disableDoubleDash: true,
              options: [
                { value: 1, label: first() },
                { value: 2, label: second() },
                { value: 3, label: third() },
                { value: 4, label: fourth() },
                { value: -1, label: last() }
              ],
              cacheLock: cacheLocks["weeks_of_month"],
              label: weeks(),
              get cachedValue() {
                return formDataCache["weeks_of_month"];
              },
              set cachedValue($$value) {
                formDataCache["weeks_of_month"] = $$value;
                $$settled = false;
              }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (store_get($$store_subs ??= {}, "$frequency", frequency$1) == "WEEKLY" || store_get($$store_subs ??= {}, "$frequency", frequency$1) == "MONTHLY" || store_get($$store_subs ??= {}, "$frequency", frequency$1) == "YEARLY") {
            $$payload3.out += "<!--[-->";
            AutocompleteSelect($$payload3, {
              form,
              multiple: true,
              baseClass: "w-full",
              translateOptions: false,
              field: "days_of_week",
              valuePath: "schedule.days_of_week",
              disableDoubleDash: true,
              options: [
                { value: 1, label: monday() },
                { value: 2, label: tuesday() },
                { value: 3, label: wednesday() },
                { value: 4, label: thursday() },
                { value: 5, label: friday() },
                { value: 6, label: saturday() },
                { value: 7, label: sunday() }
              ],
              cacheLock: cacheLocks["days_of_week"],
              label: days(),
              get cachedValue() {
                return formDataCache["days_of_week"];
              },
              set cachedValue($$value) {
                formDataCache["days_of_week"] = $$value;
                $$settled = false;
              }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div> `;
          if (store_get($$store_subs ??= {}, "$frequency", frequency$1) == "YEARLY") {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="flex w-full items-center space-x-3"><span class="mt-5 font-semibold text-sm text-gray-800">${escape_html(of())}</span> `;
            AutocompleteSelect($$payload3, {
              form,
              multiple: true,
              translateOptions: false,
              field: "months_of_year",
              valuePath: "schedule.months_of_year",
              disableDoubleDash: true,
              options: [
                { value: 1, label: january() },
                { value: 2, label: february() },
                { value: 3, label: march() },
                { value: 4, label: april() },
                { value: 5, label: may() },
                { value: 6, label: june() },
                { value: 7, label: july() },
                { value: 8, label: august() },
                { value: 9, label: september() },
                { value: 10, label: october() },
                { value: 11, label: november() },
                { value: 12, label: december() }
              ],
              cacheLock: cacheLocks["months_of_year"],
              label: month(),
              get cachedValue() {
                return formDataCache["months_of_year"];
              },
              set cachedValue($$value) {
                formDataCache["months_of_year"] = $$value;
                $$settled = false;
              }
            });
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "end_date",
            valuePath: "schedule.end_date",
            label: enddate1(),
            cacheLock: cacheLocks["end_date"],
            get cachedValue() {
              return formDataCache["end_date"];
            },
            set cachedValue($$value) {
              formDataCache["end_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          if (context == "edit" && isScheduleTainted) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<span class="text-secondary-500 italic text-sm"><i class="fa-solid fa-circle-info mr-1"></i>${escape_html(taskscheduleinfo2())}</span>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      Select($$payload2, {
        form,
        field: "status",
        label: status(),
        options: model.selectOptions["status"],
        cacheLock: cacheLocks["status"],
        disableDoubleDash: true,
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      helpText: tasktemplateevidencehelptext4(),
      field: "evidences",
      label: evidences(),
      allowUserOptions: "append",
      translateOptions: false
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "assigned_to",
      cacheLock: cacheLocks["assigned_to"],
      label: assignedto1(),
      get cachedValue() {
        return formDataCache["assigned_to"];
      },
      set cachedValue($$value) {
        formDataCache["assigned_to"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        TextField($$payload3, {
          form,
          field: "ref_id",
          label: refid1(),
          cacheLock: cacheLocks["ref_id"],
          get cachedValue() {
            return formDataCache["ref_id"];
          },
          set cachedValue($$value) {
            formDataCache["ref_id"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "assets",
          optionsExtraFields: [["folder", "str"]],
          optionsInfoFields: {
            fields: [{ field: "type" }],
            classes: "text-blue-500"
          },
          optionsLabelField: "auto",
          field: "assets",
          label: assets()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          field: "applied_controls",
          label: appliedcontrols1()
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "compliance-assessments",
          field: "compliance_assessments",
          cacheLock: cacheLocks["compliance_assessments"],
          label: complianceassessments1(),
          get cachedValue() {
            return formDataCache["compliance_assessments"];
          },
          set cachedValue($$value) {
            formDataCache["compliance_assessments"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "risk-assessments",
          optionsExtraFields: [["perimeter", "str"]],
          optionsLabelField: "str",
          field: "risk_assessments",
          cacheLock: cacheLocks["risk_assessments"],
          label: riskassessments1(),
          get cachedValue() {
            return formDataCache["risk_assessments"];
          },
          set cachedValue($$value) {
            formDataCache["risk_assessments"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          optionsEndpoint: "findings-assessments",
          field: "findings_assessment",
          cacheLock: cacheLocks["findings_assessment"],
          label: findingsassessment1(),
          get cachedValue() {
            return formDataCache["findings_assessment"];
          },
          set cachedValue($$value) {
            formDataCache["findings_assessment"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "link",
          label: link(),
          helpText: linkhelptext2(),
          cacheLock: cacheLocks["link"],
          get cachedValue() {
            return formDataCache["link"];
          },
          set cachedValue($$value) {
            formDataCache["link"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "enabled",
      label: enabled()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function TaskNodeForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      type: "date",
      form,
      field: "due_date",
      label: duedate1(),
      helpText: duedatehelptext3(),
      cacheLock: cacheLocks["due_date"],
      disabled: true,
      get cachedValue() {
        return formDataCache["due_date"];
      },
      set cachedValue($$value) {
        formDataCache["due_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      field: "status",
      label: status(),
      options: model.selectOptions["status"],
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      disabled: true,
      form,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      helpText: tasknodelegacyevidence3(),
      optionsLabelField: "auto",
      field: "evidences",
      label: evidences()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function BusinessImpactAnalysisForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  form.data?.is_locked || object?.is_locked || false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeter",
      cacheLock: cacheLocks["perimeter"],
      label: perimeter(),
      hidden: initialData.perimeter,
      get cachedValue() {
        return formDataCache["perimeter"];
      },
      set cachedValue($$value) {
        formDataCache["perimeter"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "version",
      label: version(),
      cacheLock: cacheLocks["version"],
      get cachedValue() {
        return formDataCache["version"];
      },
      set cachedValue($$value) {
        formDataCache["version"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      hide: true,
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      disabled: object.id,
      optionsEndpoint: "risk-matrices",
      field: "risk_matrix",
      cacheLock: cacheLocks["risk_matrix"],
      label: riskmatrix1(),
      helpText: riskassessmentmatrixhelptext4(),
      hidden: initialData.risk_matrix,
      get cachedValue() {
        return formDataCache["risk_matrix"];
      },
      set cachedValue($$value) {
        formDataCache["risk_matrix"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "authors",
      cacheLock: cacheLocks["authors"],
      label: authors(),
      get cachedValue() {
        return formDataCache["authors"];
      },
      set cachedValue($$value) {
        formDataCache["authors"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "reviewers",
      cacheLock: cacheLocks["reviewers"],
      label: reviewers(),
      get cachedValue() {
        return formDataCache["reviewers"];
      },
      set cachedValue($$value) {
        formDataCache["reviewers"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "due_date",
      label: duedate1(),
      helpText: duedatehelptext3(),
      cacheLock: cacheLocks["due_date"],
      get cachedValue() {
        return formDataCache["due_date"];
      },
      set cachedValue($$value) {
        formDataCache["due_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        if (!page$1.data.user.is_third_party) {
          $$payload3.out += "<!--[-->";
          Checkbox($$payload3, {
            form,
            field: "is_locked",
            label: islocked1(),
            helpText: islockedhelptext3(),
            cacheLock: cacheLocks["is_locked"],
            get cachedValue() {
              return formDataCache["is_locked"];
            },
            set cachedValue($$value) {
              formDataCache["is_locked"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function AssetAssessmentForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "assets",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      field: "asset",
      cacheLock: cacheLocks["asset"],
      label: asset(),
      disabled: initialData.asset,
      helpText: scopedasset1(),
      get cachedValue() {
        return formDataCache["asset"];
      },
      set cachedValue($$value) {
        formDataCache["asset"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      field: "dependencies",
      cacheLock: cacheLocks["dependencies"],
      label: extradependencies1(),
      helpText: extradependencieshelptext3(),
      get cachedValue() {
        return formDataCache["dependencies"];
      },
      set cachedValue($$value) {
        formDataCache["dependencies"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "bia",
      optionsEndpoint: "business-impact-analysis",
      cacheLock: cacheLocks["bia"],
      label: bia(),
      hidden: initialData.bia,
      get cachedValue() {
        return formDataCache["bia"];
      },
      set cachedValue($$value) {
        formDataCache["bia"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "applied-controls",
      optionsExtraFields: [["folder", "str"]],
      field: "associated_controls",
      cacheLock: cacheLocks["associated_controls"],
      label: associatedcontrols1(),
      helpText: associatedcontrolsbiahelptext4(),
      get cachedValue() {
        return formDataCache["associated_controls"];
      },
      set cachedValue($$value) {
        formDataCache["associated_controls"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "recovery_documented",
      label: recoverydocumented1()
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "recovery_tested",
      label: recoverytested1()
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "recovery_targets_met",
      label: recoverytargetsmet2()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "evidences",
      optionsExtraFields: [["folder", "str"]],
      field: "evidences",
      cacheLock: cacheLocks["evidences"],
      label: evidences(),
      helpText: evidencesbiahelptext3(),
      get cachedValue() {
        return formDataCache["evidences"];
      },
      set cachedValue($$value) {
        formDataCache["evidences"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function EscalationThresholdForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Duration($$payload2, {
      form,
      field: "point_in_time",
      label: pointintime2(),
      cacheLock: cacheLocks["point_in_time"],
      enabledUnits: ["days", "hours", "minutes"],
      get cachedValue() {
        return formDataCache["point_in_time"];
      },
      set cachedValue($$value) {
        formDataCache["point_in_time"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "asset_assessment",
      optionsEndpoint: "asset-assessments",
      cacheLock: cacheLocks["asset_assessment"],
      label: assetassessment1(),
      hidden: initialData.asset_assessment,
      get cachedValue() {
        return formDataCache["asset_assessment"];
      },
      set cachedValue($$value) {
        formDataCache["asset_assessment"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "terminologies?field_path=qualifications&is_visible=true",
      field: "qualifications",
      optionsLabelField: "translated_name",
      label: qualifications()
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["quali_impact"],
      field: "quali_impact",
      label: impact(),
      cacheLock: cacheLocks["quali_impact"],
      get cachedValue() {
        return formDataCache["quali_impact"];
      },
      set cachedValue($$value) {
        formDataCache["quali_impact"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function CampaignForm($$payload, $$props) {
  push();
  let {
    form,
    model = void 0,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context
  } = $$props;
  let implementationGroupsChoices = [];
  async function handleFrameworkChange(ids) {
    if (ids) {
      const implementationGroups = await Promise.all(ids.map(async (id) => {
        const response = await fetch(`/frameworks/${id}`);
        const data = await response.json();
        const groups = data["implementation_groups_definition"] || [];
        return groups.map((group) => ({ ...group, framework_id: id }));
      }));
      implementationGroupsChoices = implementationGroups.flat().map((group) => ({
        label: group.name,
        value: {
          value: group.ref_id,
          framework: group.framework_id
        }
      }));
    } else {
      implementationGroupsChoices = [];
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "frameworks",
      field: "frameworks",
      cacheLock: cacheLocks["frameworks"],
      label: targetframework1(),
      hidden: initialData.frameworks,
      onChange: async (e) => handleFrameworkChange(e),
      mount: async (e) => handleFrameworkChange(e),
      get cachedValue() {
        return formDataCache["frameworks"];
      },
      set cachedValue($$value) {
        formDataCache["frameworks"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (implementationGroupsChoices.length > 0 && !initialData.frameworks) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        multiple: true,
        translateOptions: false,
        form,
        options: implementationGroupsChoices,
        field: "selected_implementation_groups",
        cacheLock: cacheLocks["selected_implementation_groups"],
        label: selectedimplementationgroups2(),
        get cachedValue() {
          return formDataCache["selected_implementation_groups"];
        },
        set cachedValue($$value) {
          formDataCache["selected_implementation_groups"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      multiple: true,
      form,
      optionsEndpoint: "perimeters",
      optionsExtraFields: [["folder", "str"]],
      field: "perimeters",
      cacheLock: cacheLocks["perimeters"],
      label: perimeters(),
      hidden: initialData.perimeters,
      get cachedValue() {
        return formDataCache["perimeters"];
      },
      set cachedValue($$value) {
        formDataCache["perimeters"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "start_date",
      label: startdate1(),
      cacheLock: cacheLocks["start_date"],
      get cachedValue() {
        return formDataCache["start_date"];
      },
      set cachedValue($$value) {
        formDataCache["start_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "due_date",
      label: duedate1(),
      cacheLock: cacheLocks["due_date"],
      get cachedValue() {
        return formDataCache["due_date"];
      },
      set cachedValue($$value) {
        formDataCache["due_date"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      helpText: campaigndomainhelptext3(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { model, formDataCache });
  pop();
}
function ElementaryActionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["attack_stage"],
      field: "attack_stage",
      label: attackstage1(),
      disableDoubleDash: true,
      cacheLock: cacheLocks["attack_stage"],
      get cachedValue() {
        return formDataCache["attack_stage"];
      },
      set cachedValue($$value) {
        formDataCache["attack_stage"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "threats",
      field: "threat",
      optionsLabelField: "auto",
      cacheLock: cacheLocks["threat"],
      label: threat(),
      get cachedValue() {
        return formDataCache["threat"];
      },
      set cachedValue($$value) {
        formDataCache["threat"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["icon"],
      field: "icon",
      label: icon(),
      cacheLock: cacheLocks["icon"],
      get cachedValue() {
        return formDataCache["icon"];
      },
      set cachedValue($$value) {
        formDataCache["icon"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "operating-modes",
      field: "operating_modes",
      cacheLock: cacheLocks["operating_modes"],
      label: operatingmodes1(),
      hidden: true,
      get cachedValue() {
        return formDataCache["operating_modes"];
      },
      set cachedValue($$value) {
        formDataCache["operating_modes"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function OperatingModeForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context = {},
    updated_fields = /* @__PURE__ */ new Set()
  } = $$props;
  async function fetchDefaultRefId(operationalScenarioId) {
    try {
      const response = await fetch(`/operating-modes/default-ref-id/?operational_scenario=${operationalScenarioId}`);
      const result2 = await response.json();
      if (response.ok && result2.results) {
        form.form.update((currentData) => {
          if (!currentData.ref_id || currentData.ref_id === "") {
            updated_fields.add("ref_id");
            return { ...currentData, ref_id: result2.results };
          }
          return currentData;
        });
      } else {
        console.error(result2.error || "Failed to fetch default ref_id");
      }
    } catch (error) {
      console.error("Error fetching default ref_id:", error);
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (context !== "selectElementaryActions") {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "operational-scenarios",
        field: "operational_scenario",
        cacheLock: cacheLocks["operational_scenario"],
        label: operationalscenario1(),
        hidden: true,
        onChange: async (e) => fetchDefaultRefId(e),
        mount: async (e) => fetchDefaultRefId(e),
        get cachedValue() {
          return formDataCache["operational_scenario"];
        },
        set cachedValue($$value) {
          formDataCache["operational_scenario"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "ref_id",
        label: refid1(),
        cacheLock: cacheLocks["ref_id"],
        get cachedValue() {
          return formDataCache["ref_id"];
        },
        set cachedValue($$value) {
          formDataCache["ref_id"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions["likelihood"],
        field: "likelihood",
        label: likelihood(),
        cacheLock: cacheLocks["likelihood"],
        helpText: likelihoodhelptext2(),
        get cachedValue() {
          return formDataCache["likelihood"];
        },
        set cachedValue($$value) {
          formDataCache["likelihood"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "elementary-actions",
        optionsInfoFields: {
          fields: [{ field: "attack_stage", translate: true }],
          classes: "text-yellow-700"
        },
        field: "elementary_actions",
        cacheLock: cacheLocks["elementary_actions"],
        label: elementaryactions1(),
        get cachedValue() {
          return formDataCache["elementary_actions"];
        },
        set cachedValue($$value) {
          formDataCache["elementary_actions"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function KillChainForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  const formStore = form.form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!initialData["operating_mode"]) {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "operating-modes",
        field: "operating_mode",
        cacheLock: cacheLocks["operating_mode"],
        label: operatingmode1(),
        hidden: true,
        get cachedValue() {
          return formDataCache["operating_mode"];
        },
        set cachedValue($$value) {
          formDataCache["operating_mode"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "elementary-actions",
      optionsDetailedUrlParameters: store_get($$store_subs ??= {}, "$formStore", formStore).operating_mode ? [
        [
          "operating_mode_available_actions",
          store_get($$store_subs ??= {}, "$formStore", formStore).operating_mode
        ]
      ] : void 0,
      optionsInfoFields: {
        fields: [{ field: "attack_stage", translate: true }],
        classes: "text-yellow-700"
      },
      field: "elementary_action",
      cacheLock: cacheLocks["elementary_action"],
      label: elementaryaction1(),
      hidden: initialData.elementary_action,
      get cachedValue() {
        return formDataCache["elementary_action"];
      },
      set cachedValue($$value) {
        formDataCache["elementary_action"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->    `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "elementary-actions",
      optionsDetailedUrlParameters: store_get($$store_subs ??= {}, "$formStore", formStore).operating_mode ? [
        [
          "operating_modes",
          store_get($$store_subs ??= {}, "$formStore", formStore).operating_mode
        ]
      ] : void 0,
      optionsInfoFields: {
        fields: [{ field: "attack_stage", translate: true }],
        classes: "text-yellow-700"
      },
      multiple: true,
      field: "antecedents",
      cacheLock: cacheLocks["antecedents"],
      helpText: antecedentshelptext2(),
      label: antecedents(),
      get cachedValue() {
        return formDataCache["antecedents"];
      },
      set cachedValue($$value) {
        formDataCache["antecedents"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["logic_operator"],
      field: "logic_operator",
      label: logicoperator1(),
      helpText: logicoperatorhelptext3(),
      cacheLock: cacheLocks["logic_operator"],
      disabled: formDataCache["antecedents"] && formDataCache["antecedents"].length <= 1,
      get cachedValue() {
        return formDataCache["logic_operator"];
      },
      set cachedValue($$value) {
        formDataCache["logic_operator"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function OrganisationIssueForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["origin"],
      field: "origin",
      label: origin(),
      cacheLock: cacheLocks["origin"],
      get cachedValue() {
        return formDataCache["origin"];
      },
      set cachedValue($$value) {
        formDataCache["origin"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["category"],
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "assets",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      field: "assets",
      cacheLock: cacheLocks["assets"],
      label: assets(),
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      helpText: observationhelptext2(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function OrganisationObjectiveForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "assigned_to",
      cacheLock: cacheLocks["assigned_to"],
      label: assignedto1(),
      get cachedValue() {
        return formDataCache["assigned_to"];
      },
      set cachedValue($$value) {
        formDataCache["assigned_to"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      disableDoubleDash: true,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "organisation-issues",
      field: "issues",
      optionsExtraFields: [["folder", "str"]],
      cacheLock: cacheLocks["issues"],
      label: organisationissues1(),
      get cachedValue() {
        return formDataCache["issues"];
      },
      set cachedValue($$value) {
        formDataCache["issues"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      type: "date",
      form,
      field: "eta",
      label: eta(),
      helpText: etahelptext2(),
      cacheLock: cacheLocks["eta"],
      get cachedValue() {
        return formDataCache["eta"];
      },
      set cachedValue($$value) {
        formDataCache["eta"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        Select($$payload3, {
          form,
          options: model.selectOptions["health"],
          field: "health",
          label: health(),
          helpText: healthfieldhelptext3(),
          cacheLock: cacheLocks["health"],
          get cachedValue() {
            return formDataCache["health"];
          },
          set cachedValue($$value) {
            formDataCache["health"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "metric-instances",
          field: "metrics",
          optionsExtraFields: [["folder", "str"]],
          cacheLock: cacheLocks["metrics"],
          label: metricinstances1(),
          get cachedValue() {
            return formDataCache["metrics"];
          },
          set cachedValue($$value) {
            formDataCache["metrics"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "due_date",
          label: duedate1(),
          helpText: duedatehelptext3(),
          cacheLock: cacheLocks["due_date"],
          get cachedValue() {
            return formDataCache["due_date"];
          },
          set cachedValue($$value) {
            formDataCache["due_date"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "assets",
          optionsLabelField: "auto",
          optionsExtraFields: [["folder", "str"]],
          optionsInfoFields: {
            fields: [{ field: "type" }],
            classes: "text-blue-500"
          },
          field: "assets",
          cacheLock: cacheLocks["assets"],
          label: assets(),
          get cachedValue() {
            return formDataCache["assets"];
          },
          set cachedValue($$value) {
            formDataCache["assets"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "task-templates",
          field: "tasks",
          optionsExtraFields: [["folder", "str"]],
          cacheLock: cacheLocks["tasks"],
          label: tasktemplates1(),
          get cachedValue() {
            return formDataCache["tasks"];
          },
          set cachedValue($$value) {
            formDataCache["tasks"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          helpText: observationhelptext2(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function QuantitativeRiskStudyForm($$payload, $$props) {
  push();
  let displayCurrency = page$1.data?.settings?.currency ?? "€";
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context = "default"
  } = $$props;
  form.form;
  let point1ProbabilityPercent = void 0;
  let point2ProbabilityPercent = void 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "authors",
      cacheLock: cacheLocks["authors"],
      label: authors(),
      get cachedValue() {
        return formDataCache["authors"];
      },
      set cachedValue($$value) {
        formDataCache["authors"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (!duplicate) {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        options: model.selectOptions["status"],
        translateOptions: false,
        field: "status",
        label: status(),
        cacheLock: cacheLocks["status"],
        get cachedValue() {
          return formDataCache["status"];
        },
        set cachedValue($$value) {
          formDataCache["status"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Select($$payload2, {
        form,
        options: model.selectOptions["distribution_model"],
        disableDoubleDash: true,
        translateOptions: false,
        field: "distribution_model",
        label: "Distribution Model",
        disabled: true,
        cacheLock: cacheLocks["distribution_model"],
        get cachedValue() {
          return formDataCache["distribution_model"];
        },
        set cachedValue($$value) {
          formDataCache["distribution_model"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-bullseye",
        header: "Tolerance settings",
        children: ($$payload3) => {
          NumberField($$payload3, {
            form,
            field: "loss_threshold",
            label: `${stringify(lossthreshold1())} (${stringify(displayCurrency)})`,
            min: 0,
            step: 1,
            helpText: lossthresholdhelptext3(),
            cacheLock: cacheLocks["loss_threshold"],
            get cachedValue() {
              return formDataCache["loss_threshold"];
            },
            set cachedValue($$value) {
              formDataCache["loss_threshold"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> <div class="space-y-2"><h5 class="font-medium text-gray-600 my-2 py-2">Risk Tolerance Points</h5> <div class="grid grid-cols-2 gap-4"><div class="form-control"><label class="label" for="point1_probability_percent"><span class="label-text">Point 1 - Probability (%)</span></label> <input type="number" id="point1_probability_percent" class="input input-bordered w-full"${attr("value", point1ProbabilityPercent)} step="0.1" min="1" max="99"/> <label class="label" for="point1_probability_percent"><span class="label-text-alt text-surface-500">Probability percentage (1-99%). You can start with 99% for the most frequent
							acceptable issues</span></label></div> `;
          NumberField($$payload3, {
            form,
            field: "risk_tolerance.points.point1.acceptable_loss",
            label: `Point 1 - Tolerable Loss (${stringify(displayCurrency)})`,
            min: 1,
            step: 1,
            helpText: "Acceptable loss amount for point 1"
          });
          $$payload3.out += `<!----></div> <div class="grid grid-cols-2 gap-4"><div class="form-control"><label class="label" for="point2_probability_percent"><span class="label-text">Point 2 - Probability (%)</span></label> <input type="number" id="point2_probability_percent" class="input input-bordered w-full"${attr("value", point2ProbabilityPercent)} step="0.1" min="1" max="99"/> <label class="label" for="point2_probability_percent"><span class="label-text-alt text-surface-500">Probability percentage (1-99%). You can close with 1% for the most rare acceptable
							cases</span></label></div> `;
          NumberField($$payload3, {
            form,
            field: "risk_tolerance.points.point2.acceptable_loss",
            label: `Point 2 - Tolerable Loss (${stringify(displayCurrency)})`,
            min: 1,
            step: 1,
            helpText: "Acceptable loss amount for point 2"
          });
          $$payload3.out += `<!----></div></div>`;
        }
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-list",
        header: more(),
        children: ($$payload3) => {
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "actors",
            optionsLabelField: "str",
            optionsInfoFields: {
              fields: [{ field: "type", translate: true }],
              position: "prefix"
            },
            field: "reviewers",
            cacheLock: cacheLocks["reviewers"],
            label: reviewers(),
            get cachedValue() {
              return formDataCache["reviewers"];
            },
            set cachedValue($$value) {
              formDataCache["reviewers"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "eta",
            label: eta(),
            helpText: etahelptext2(),
            cacheLock: cacheLocks["eta"],
            get cachedValue() {
              return formDataCache["eta"];
            },
            set cachedValue($$value) {
              formDataCache["eta"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          TextField($$payload3, {
            type: "date",
            form,
            field: "due_date",
            label: duedate1(),
            helpText: duedatehelptext3(),
            cacheLock: cacheLocks["due_date"],
            get cachedValue() {
              return formDataCache["due_date"];
            },
            set cachedValue($$value) {
              formDataCache["due_date"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          MarkdownField($$payload3, {
            form,
            field: "observation",
            label: observation(),
            cacheLock: cacheLocks["observation"],
            get cachedValue() {
              return formDataCache["observation"];
            },
            set cachedValue($$value) {
              formDataCache["observation"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function QuantitativeRiskScenarioForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  run(() => {
    if (model?.selectOptions?.priority) {
      model.selectOptions.priority.forEach((element) => {
        element.value = parseInt(element.value);
      });
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "quantitative-risk-studies",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "quantitative_risk_study",
      cacheLock: cacheLocks["quantitative_risk_study"],
      label: "Quantitative Risk Study",
      hidden: initialData.quantitative_risk_study,
      get cachedValue() {
        return formDataCache["quantitative_risk_study"];
      },
      set cachedValue($$value) {
        formDataCache["quantitative_risk_study"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: isselected1(),
      helpText: isselectedhelptext3()
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "assets",
      optionsExtraFields: [["folder", "str"]],
      optionsInfoFields: {
        fields: [{ field: "type" }],
        classes: "text-blue-500"
      },
      optionsLabelField: "auto",
      field: "assets",
      cacheLock: cacheLocks["assets"],
      label: assets(),
      get cachedValue() {
        return formDataCache["assets"];
      },
      set cachedValue($$value) {
        formDataCache["assets"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "threats",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "threats",
      cacheLock: cacheLocks["threats"],
      label: threats(),
      get cachedValue() {
        return formDataCache["threats"];
      },
      set cachedValue($$value) {
        formDataCache["threats"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        Select($$payload3, {
          form,
          options: model.selectOptions["priority"],
          field: "priority",
          label: priority(),
          helpText: quantriskpriorityhelptext4(),
          cacheLock: cacheLocks["priority"],
          get cachedValue() {
            return formDataCache["priority"];
          },
          set cachedValue($$value) {
            formDataCache["priority"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "vulnerabilities",
          optionsExtraFields: [["folder", "str"]],
          optionsLabelField: "auto",
          field: "vulnerabilities",
          cacheLock: cacheLocks["vulnerabilities"],
          label: vulnerabilities(),
          get cachedValue() {
            return formDataCache["vulnerabilities"];
          },
          set cachedValue($$value) {
            formDataCache["vulnerabilities"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "terminologies?field_path=qualifications&is_visible=true",
          optionsLabelField: "translated_name",
          field: "qualifications",
          cacheLock: cacheLocks["qualifications"],
          label: qualifications(),
          get cachedValue() {
            return formDataCache["qualifications"];
          },
          set cachedValue($$value) {
            formDataCache["qualifications"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "actors",
          optionsLabelField: "str",
          optionsInfoFields: {
            fields: [{ field: "type", translate: true }],
            position: "prefix"
          },
          field: "owner",
          cacheLock: cacheLocks["owner"],
          label: owner(),
          get cachedValue() {
            return formDataCache["owner"];
          },
          set cachedValue($$value) {
            formDataCache["owner"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        Select($$payload3, {
          form,
          options: model.selectOptions["status"],
          field: "status",
          label: status(),
          cacheLock: cacheLocks["status"],
          get cachedValue() {
            return formDataCache["status"];
          },
          set cachedValue($$value) {
            formDataCache["status"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        MarkdownField($$payload3, {
          form,
          field: "observation",
          label: observation(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function QuantitativeRiskHypothesisForm($$payload, $$props) {
  push();
  var $$store_subs;
  let displayCurrency = page$1.data?.settings?.currency ?? "€";
  let {
    form,
    model,
    duplicate = false,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context = "default"
  } = $$props;
  const formStore = form.form;
  let probabilityPercent = void 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "quantitative-risk-scenarios",
      field: "quantitative_risk_scenario",
      cacheLock: cacheLocks["quantitative_risk_scenario"],
      label: quantitativeriskscenario2(),
      hidden: initialData.quantitative_risk_scenario,
      get cachedValue() {
        return formDataCache["quantitative_risk_scenario"];
      },
      set cachedValue($$value) {
        formDataCache["quantitative_risk_scenario"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["risk_stage"],
      translateOptions: true,
      disableDoubleDash: true,
      field: "risk_stage",
      label: hypothesisstage1(),
      cacheLock: cacheLocks["risk_stage"],
      helpText: "You can have multiple residual (future) hypotheses but only one current (present) and one inherent (past)",
      get cachedValue() {
        return formDataCache["risk_stage"];
      },
      set cachedValue($$value) {
        formDataCache["risk_stage"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-shield-halved",
      header: treatment(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          field: "existing_applied_controls",
          cacheLock: cacheLocks["existing_applied_controls"],
          label: existingcontrols1(),
          helpText: "What do you currently have. It's part of your baseline and doesn't count on the treatment cost.",
          get cachedValue() {
            return formDataCache["existing_applied_controls"];
          },
          set cachedValue($$value) {
            formDataCache["existing_applied_controls"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          field: "added_applied_controls",
          cacheLock: cacheLocks["added_applied_controls"],
          label: addedcontrols1(),
          helpText: "What do you need to implement to reduce the risk.",
          get cachedValue() {
            return formDataCache["added_applied_controls"];
          },
          set cachedValue($$value) {
            formDataCache["added_applied_controls"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "applied-controls",
          optionsExtraFields: [["folder", "str"]],
          field: "removed_applied_controls",
          cacheLock: cacheLocks["removed_applied_controls"],
          label: removedcontrols1(),
          helpText: "Useful to simulate cost-saving opportunities or inherent risk posture",
          get cachedValue() {
            return formDataCache["removed_applied_controls"];
          },
          set cachedValue($$value) {
            formDataCache["removed_applied_controls"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-calculator",
      header: simulationparameters1(),
      children: ($$payload3) => {
        $$payload3.out += `<input type="hidden" name="impact.distribution" value="LOGNORMAL-CI90"/> <input type="hidden" name="probability"${attr("value", store_get($$store_subs ??= {}, "$formStore", formStore).probability)}/> <div class="form-control"><label class="label" for="probability_percent"><span class="label-text">${escape_html(probabilitypercent1())}</span></label> <input type="number" id="probability_percent" class="input input-bordered w-full"${attr("value", probabilityPercent)} step="0.1" min="0" max="100"/> `;
        if (probabilitypercenthelptext3()) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<label class="label" for="probability_percent"><span class="label-text-alt text-surface-500">${escape_html(probabilitypercenthelptext3())}</span></label>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--></div> `;
        TextField($$payload3, {
          form,
          field: "impact.lb",
          label: `${stringify(expectedlosslowerbound3())} (${stringify(displayCurrency)})`,
          type: "number",
          step: "10",
          min: "10",
          cacheLock: cacheLocks["impact.lb"],
          helpText: lowerboundhelptext3(),
          get cachedValue() {
            return formDataCache["impact.lb"];
          },
          set cachedValue($$value) {
            formDataCache["impact.lb"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          form,
          field: "impact.ub",
          label: `${stringify(expectedlossupperbound3())} (${stringify(displayCurrency)})`,
          type: "number",
          step: "10",
          min: "20",
          cacheLock: cacheLocks["impact.ub"],
          helpText: upperboundhelptext3(),
          get cachedValue() {
            return formDataCache["impact.ub"];
          },
          set cachedValue($$value) {
            formDataCache["impact.ub"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: isselected1(),
      helpText: isselectedhelptext3()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { formDataCache });
  pop();
}
function TranslationField($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    field,
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    cachedValue = void 0
  } = $$props;
  const { value: value2, errors } = formFieldProxy(form, field);
  const initialValue = store_get($$store_subs ??= {}, "$value", value2) || {};
  let translations$1 = cachedValue || initialValue;
  const each_array = ensure_array_like(Object.entries(translations$1));
  $$payload.out += `<div class="space-y-4 svelte-1aaw2i9"><div class="flex items-center justify-between svelte-1aaw2i9"><span class="text-sm font-semibold">${escape_html(translations())}</span> <button type="button" class="px-3 py-1 text-sm rounded bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"${attr("disabled", Object.keys(translations$1).length >= locales.length, true)}><i class="fa-solid fa-plus mr-1"></i>${escape_html(addtranslation1())}</button></div> `;
  if (Object.keys(translations$1).length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-gray-500 text-sm italic text-center py-4 border-2 border-dashed border-gray-200 rounded svelte-1aaw2i9">${escape_html(notranslationadded2())}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="space-y-3 svelte-1aaw2i9"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let [lang, text] = each_array[i];
    const each_array_1 = ensure_array_like(locales);
    $$payload.out += `<div class="flex gap-2 items-start p-3 bg-gray-50 rounded-lg svelte-1aaw2i9"><div class="flex-1">`;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors)[lang]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-xs text-red-500 mb-1">${escape_html(translationerrormessage2())}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label${attr("for", `translation-lang-${stringify(i)}`)} class="block text-xs font-medium text-gray-600 mb-1">${escape_html(language())}</label> <select${attr("id", `translation-lang-${stringify(i)}`)} class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">`;
    $$payload.select_value = lang;
    $$payload.out += `<option value=""${maybe_selected($$payload, "")}>${escape_html(selectlanguageplaceholder2())}</option><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let lang2 = each_array_1[$$index];
      $$payload.out += `<option${attr("value", lang2)}${maybe_selected($$payload, lang2)}>${escape_html(defaultLangLabels[lang2])} (${escape_html(language$1[LOCALE_MAP[lang2].name])})</option>`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select></div> <div class="flex-[2]">`;
    if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors)[lang]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-xs text-red-500 mb-1 invisible">${escape_html(translationerrormessage2())}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <label${attr("for", `translation-value-${stringify(i)}`)} class="block text-xs font-medium text-gray-600 mb-1">${escape_html(translations())}</label> <input${attr("id", `translation-value-${stringify(i)}`)} type="text"${attr("value", text)} placeholder="Enter translation..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/></div> <div class="pt-6"><button type="button" class="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors" title="Remove translation">✕</button></div></div> <input type="hidden"${attr("name", `translations[${stringify(lang)}]`)}${attr("value", text)} class="svelte-1aaw2i9"/>`;
  }
  $$payload.out += `<!--]--></div> <input type="hidden" name="translations"${attr("value", JSON.stringify(translations$1))} class="svelte-1aaw2i9"/></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { cachedValue });
  pop();
}
function TerminologyForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  formFieldProxy(form, "field_path");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (!object.builtin) {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        options: model.selectOptions["field_path"],
        field: "field_path",
        label: fieldpath1(),
        cacheLock: cacheLocks["field_path"],
        get cachedValue() {
          return formDataCache["field_path"];
        },
        set cachedValue($$value) {
          formDataCache["field_path"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        field: "name",
        label: name(),
        cacheLock: cacheLocks["name"],
        "data-focusindex": "0",
        get cachedValue() {
          return formDataCache["name"];
        },
        set cachedValue($$value) {
          formDataCache["name"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      MarkdownField($$payload2, {
        form,
        field: "description",
        label: description(),
        cacheLock: cacheLocks["description"],
        "data-focusindex": "1",
        get cachedValue() {
          return formDataCache["description"];
        },
        set cachedValue($$value) {
          formDataCache["description"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TranslationField($$payload2, {
        form,
        field: "translations",
        cacheLock: cacheLocks["translations"],
        get cachedValue() {
          return formDataCache["translations"];
        },
        set cachedValue($$value) {
          formDataCache["translations"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Checkbox($$payload2, {
      form,
      field: "is_visible",
      label: isvisible1(),
      helpText: isvisiblehelptext3()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function ListSelector($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    field,
    label: label2,
    helpText,
    optionsEndpoint,
    optionsLabelField = "name",
    groupBy = "",
    cacheLock = {
      promise: new Promise((res) => res(null)),
      resolve: (x) => x
    },
    cachedValue = void 0,
    translateOptions = true,
    disabled = false,
    mandatory = false,
    showGroupHeaders = true,
    collapsibleGroups = true,
    defaultCollapsed = true
  } = $$props;
  const { errors } = formFieldProxy(form, field);
  let nestedGroups = {};
  let collapsedGroups = /* @__PURE__ */ new Set();
  let selected2 = [];
  function getAllOptionsFromGroup(group) {
    let allOptions = [...group.options];
    Object.values(group.subGroups).forEach((subGroup) => {
      allOptions = [
        ...allOptions,
        ...getAllOptionsFromGroup(subGroup)
      ];
    });
    return allOptions;
  }
  function getGroupSelectionState(group) {
    const allOptions = getAllOptionsFromGroup(group);
    const groupValues = allOptions.map((opt) => opt.value);
    const selectedInGroup = groupValues.filter((val) => selected2.includes(val));
    if (selectedInGroup.length === 0) return "none";
    if (selectedInGroup.length === groupValues.length) return "all";
    return "partial";
  }
  onDestroy(() => {
    cacheLock.resolve(selected2);
  });
  function renderNestedGroups($$payload2, groups, depth, pathPrefix) {
    const each_array = ensure_array_like(Object.entries(groups));
    $$payload2.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let [groupName, group] = each_array[$$index_1];
      const currentPath = pathPrefix ? `${pathPrefix}>${groupName}` : groupName;
      const hasSubGroups = Object.keys(group.subGroups).length > 0;
      const hasDirectOptions = group.options.length > 0;
      const isCollapsed = collapsedGroups.has(currentPath);
      const totalOptions = getAllOptionsFromGroup(group).length;
      $$payload2.out += `<div class="border border-gray-200 rounded-lg"${attr_style(`margin-left: ${stringify(depth * 20)}px;`)}>`;
      if (showGroupHeaders && groupBy) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div${attr_class("px-3 py-2 border-b border-gray-200 flex items-center justify-between", void 0, {
          "bg-gray-50": depth === 0,
          "bg-gray-100": depth === 1,
          "bg-gray-200": depth >= 2
        })}><div class="flex items-center gap-2">`;
        if (collapsibleGroups) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<button type="button" aria-label="Toggle Group"${attr_class("text-gray-500 hover:text-gray-700 transition-transform duration-200", void 0, { "rotate-90": !isCollapsed })}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <h3${attr_class("text-sm font-medium text-gray-700", void 0, { "font-bold": depth === 0 })}>${escape_html(safeTranslate(groupName))}</h3> <span class="text-xs text-gray-500">(${escape_html(totalOptions)})</span></div> <button type="button"${attr_class("text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors", void 0, {
          "bg-blue-50": getGroupSelectionState(group) === "all",
          "border-blue-300": getGroupSelectionState(group) === "all",
          "bg-blue-25": getGroupSelectionState(group) === "partial",
          "border-blue-200": getGroupSelectionState(group) === "partial"
        })}${attr("disabled", disabled, true)}>`;
        if (getGroupSelectionState(group) === "all") {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `${escape_html(deselectall1())}`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `${escape_html(selectall1())}`;
        }
        $$payload2.out += `<!--]--></button></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (!collapsibleGroups || !isCollapsed) {
        $$payload2.out += "<!--[-->";
        if (hasDirectOptions) {
          $$payload2.out += "<!--[-->";
          const each_array_1 = ensure_array_like(group.options);
          $$payload2.out += `<div class="p-3 space-y-2"><!--[-->`;
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let opt = each_array_1[$$index];
            $$payload2.out += `<label class="flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"><input type="checkbox"${attr("value", opt.value)}${attr("checked", selected2.includes(opt.value), true)}${attr("disabled", disabled, true)} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/> <span class="text-sm">${escape_html(opt.translatedLabel ?? opt.label)}</span></label>`;
          }
          $$payload2.out += `<!--]--></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (hasSubGroups) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div class="py-2 px-1 space-y-2">`;
          renderNestedGroups($$payload2, group.subGroups, depth + 1, currentPath);
          $$payload2.out += `<!----></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  const each_array_3 = ensure_array_like(selected2);
  $$payload.out += `<div class="space-y-4">`;
  if (label2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-sm font-semibold">${escape_html(label2)}${escape_html(mandatory ? " *" : "")}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$errors", errors) && store_get($$store_subs ??= {}, "$errors", errors).length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors));
    $$payload.out += `<div><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let error = each_array_2[$$index_2];
      $$payload.out += `<p class="text-error-500 text-xs">${escape_html(error)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="space-y-3">`;
    renderNestedGroups($$payload, nestedGroups, 0, "");
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--> `;
  if (helpText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="text-sm text-gray-500">${escape_html(helpText)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let val = each_array_3[$$index_3];
    $$payload.out += `<input type="hidden"${attr("name", field)}${attr("value", val)}/>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { cachedValue });
  pop();
}
function RoleForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    updated_fields = /* @__PURE__ */ new Set(),
    context = "edit"
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (context === "edit") {
      $$payload2.out += "<!--[-->";
      ListSelector($$payload2, {
        form,
        field: "permissions",
        label: permissions(),
        optionsEndpoint: "permissions",
        optionsLabelField: "normalized_codename",
        groupBy: [
          {
            field: "content_type",
            path: ["app_label"]
          },
          { field: "normalized_model" }
        ],
        cacheLock: cacheLocks["permissions"],
        get cachedValue() {
          return formDataCache["permissions"];
        },
        set cachedValue($$value) {
          formDataCache["permissions"] = $$value;
          $$settled = false;
        }
      });
    } else {
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
  bind_props($$props, { formDataCache });
  pop();
}
function EvidenceRevisionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context
  } = $$props;
  function getFilename(path) {
    if (!path) return "";
    try {
      const withoutQuery = path.split("?")[0];
      return decodeURIComponent(withoutQuery.split("/").pop());
    } catch (e) {
      return path;
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    HiddenInput($$payload2, { form, field: "evidence" });
    $$payload2.out += `<!----> `;
    HiddenInput($$payload2, { form, field: "folder" });
    $$payload2.out += `<!----> `;
    HiddenInput($$payload2, { form, field: "task_node" });
    $$payload2.out += `<!----> `;
    if (context === "edit") {
      $$payload2.out += "<!--[-->";
      NumberField($$payload2, {
        form,
        field: "version",
        label: version(),
        cacheLock: cacheLocks["version"],
        get cachedValue() {
          return formDataCache["version"];
        },
        set cachedValue($$value) {
          formDataCache["version"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    FileInput($$payload2, {
      form,
      allowPaste: true,
      helpText: object.attachment ? `${attachmentwarningtext2()}: ${getFilename(object.attachment)}` : attachmenthelptext2(),
      field: "attachment",
      label: attachment(),
      allowedExtensions: "*"
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "link",
      label: link(),
      helpText: linkhelptext2(),
      cacheLock: cacheLocks["link"],
      get cachedValue() {
        return formDataCache["link"];
      },
      set cachedValue($$value) {
        formDataCache["link"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "observation",
      label: observation(),
      cacheLock: cacheLocks["observation"],
      get cachedValue() {
        return formDataCache["observation"];
      },
      set cachedValue($$value) {
        formDataCache["observation"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function GenericCollectionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {},
    context = ""
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (context === "selectComplianceAssessments") {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "compliance-assessments",
        optionsExtraFields: [["perimeter", "str"]],
        optionsLabelField: "auto",
        field: "compliance_assessments",
        cacheLock: cacheLocks["compliance_assessments"],
        label: complianceassessments1(),
        get cachedValue() {
          return formDataCache["compliance_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["compliance_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectRiskAssessments") {
      $$payload2.out += "<!--[1-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "risk-assessments",
        optionsExtraFields: [["perimeter", "str"]],
        optionsLabelField: "auto",
        field: "risk_assessments",
        cacheLock: cacheLocks["risk_assessments"],
        label: riskassessments1(),
        get cachedValue() {
          return formDataCache["risk_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["risk_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectCrqStudies") {
      $$payload2.out += "<!--[2-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "quantitative-risk-studies",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "crq_studies",
        cacheLock: cacheLocks["crq_studies"],
        label: quantitativeriskstudies2(),
        get cachedValue() {
          return formDataCache["crq_studies"];
        },
        set cachedValue($$value) {
          formDataCache["crq_studies"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectEbiosStudies") {
      $$payload2.out += "<!--[3-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "ebios-rm",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "ebios_studies",
        cacheLock: cacheLocks["ebios_studies"],
        label: ebiosrmstudies2(),
        get cachedValue() {
          return formDataCache["ebios_studies"];
        },
        set cachedValue($$value) {
          formDataCache["ebios_studies"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectEntityAssessments") {
      $$payload2.out += "<!--[4-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "entity-assessments",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "entity_assessments",
        cacheLock: cacheLocks["entity_assessments"],
        label: entityassessments1(),
        get cachedValue() {
          return formDataCache["entity_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["entity_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectFindingsAssessments") {
      $$payload2.out += "<!--[5-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "findings-assessments",
        optionsExtraFields: [["perimeter", "str"]],
        optionsLabelField: "auto",
        field: "findings_assessments",
        cacheLock: cacheLocks["findings_assessments"],
        label: findingsassessments1(),
        get cachedValue() {
          return formDataCache["findings_assessments"];
        },
        set cachedValue($$value) {
          formDataCache["findings_assessments"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectDocuments") {
      $$payload2.out += "<!--[6-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "evidences",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "documents",
        cacheLock: cacheLocks["documents"],
        label: documents(),
        get cachedValue() {
          return formDataCache["documents"];
        },
        set cachedValue($$value) {
          formDataCache["documents"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectSecurityExceptions") {
      $$payload2.out += "<!--[7-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "security-exceptions",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "security_exceptions",
        cacheLock: cacheLocks["security_exceptions"],
        label: securityexceptions1(),
        get cachedValue() {
          return formDataCache["security_exceptions"];
        },
        set cachedValue($$value) {
          formDataCache["security_exceptions"] = $$value;
          $$settled = false;
        }
      });
    } else if (context === "selectPolicies") {
      $$payload2.out += "<!--[8-->";
      AutocompleteSelect($$payload2, {
        form,
        multiple: true,
        optionsEndpoint: "policies",
        optionsExtraFields: [["folder", "str"]],
        optionsLabelField: "auto",
        field: "policies",
        cacheLock: cacheLocks["policies"],
        label: policies(),
        get cachedValue() {
          return formDataCache["policies"];
        },
        set cachedValue($$value) {
          formDataCache["policies"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      TextField($$payload2, {
        form,
        field: "ref_id",
        cacheLock: cacheLocks["ref_id"],
        label: refid1(),
        get cachedValue() {
          return formDataCache["ref_id"];
        },
        set cachedValue($$value) {
          formDataCache["ref_id"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "folders?content_type=DO&content_type=GL",
        pathField: "path",
        field: "folder",
        cacheLock: cacheLocks["folder"],
        label: domain(),
        hidden: initialData.folder,
        get cachedValue() {
          return formDataCache["folder"];
        },
        set cachedValue($$value) {
          formDataCache["folder"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      AutocompleteSelect($$payload2, {
        multiple: true,
        form,
        createFromSelection: true,
        optionsEndpoint: "filtering-labels",
        optionsLabelField: "label",
        field: "filtering_labels",
        helpText: labelshelptext2(),
        label: labels(),
        translateOptions: false,
        allowUserOptions: "append"
      });
      $$payload2.out += `<!----> `;
      Dropdown($$payload2, {
        open: false,
        style: "hover:text-primary-700",
        icon: "fa-solid fa-link",
        header: relationships(),
        children: ($$payload3) => {
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "compliance-assessments",
            optionsExtraFields: [["perimeter", "str"]],
            optionsLabelField: "auto",
            field: "compliance_assessments",
            cacheLock: cacheLocks["compliance_assessments"],
            label: complianceassessments1(),
            get cachedValue() {
              return formDataCache["compliance_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["compliance_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "risk-assessments",
            optionsExtraFields: [["perimeter", "str"]],
            optionsLabelField: "auto",
            field: "risk_assessments",
            cacheLock: cacheLocks["risk_assessments"],
            label: riskassessments1(),
            get cachedValue() {
              return formDataCache["risk_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["risk_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "quantitative-risk-studies",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "crq_studies",
            cacheLock: cacheLocks["crq_studies"],
            label: quantitativeriskstudies2(),
            get cachedValue() {
              return formDataCache["crq_studies"];
            },
            set cachedValue($$value) {
              formDataCache["crq_studies"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "ebios-rm",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "ebios_studies",
            cacheLock: cacheLocks["ebios_studies"],
            label: ebiosrmstudies2(),
            get cachedValue() {
              return formDataCache["ebios_studies"];
            },
            set cachedValue($$value) {
              formDataCache["ebios_studies"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "entity-assessments",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "entity_assessments",
            cacheLock: cacheLocks["entity_assessments"],
            label: entityassessments1(),
            get cachedValue() {
              return formDataCache["entity_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["entity_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "findings-assessments",
            optionsExtraFields: [["perimeter", "str"]],
            optionsLabelField: "auto",
            field: "findings_assessments",
            cacheLock: cacheLocks["findings_assessments"],
            label: findingsassessments1(),
            get cachedValue() {
              return formDataCache["findings_assessments"];
            },
            set cachedValue($$value) {
              formDataCache["findings_assessments"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "evidences",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "documents",
            cacheLock: cacheLocks["documents"],
            label: evidences(),
            get cachedValue() {
              return formDataCache["documents"];
            },
            set cachedValue($$value) {
              formDataCache["documents"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "security-exceptions",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "security_exceptions",
            cacheLock: cacheLocks["security_exceptions"],
            label: securityexceptions1(),
            get cachedValue() {
              return formDataCache["security_exceptions"];
            },
            set cachedValue($$value) {
              formDataCache["security_exceptions"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!----> `;
          AutocompleteSelect($$payload3, {
            form,
            multiple: true,
            optionsEndpoint: "policies",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            field: "policies",
            cacheLock: cacheLocks["policies"],
            label: policies(),
            get cachedValue() {
              return formDataCache["policies"];
            },
            set cachedValue($$value) {
              formDataCache["policies"] = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        }
      });
      $$payload2.out += `<!---->`;
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function AccreditationForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    object = {}
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      cacheLock: cacheLocks["ref_id"],
      label: refid1(),
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      pathField: "path",
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "actors?user__is_third_party=False",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "author",
      cacheLock: cacheLocks["author"],
      nullable: true,
      label: author(),
      get cachedValue() {
        return formDataCache["author"];
      },
      set cachedValue($$value) {
        formDataCache["author"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "terminologies?field_path=accreditation.category&is_visible=true",
      optionsLabelField: "translated_name",
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "compliance-assessments",
      optionsLabelField: "auto",
      optionsExtraFields: [["perimeter", "str"]],
      field: "checklist",
      cacheLock: cacheLocks["checklist"],
      nullable: true,
      label: checklist(),
      get cachedValue() {
        return formDataCache["checklist"];
      },
      set cachedValue($$value) {
        formDataCache["checklist"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "terminologies?field_path=accreditation.status&is_visible=true",
      optionsLabelField: "translated_name",
      field: "status",
      label: status(),
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "generic-collections",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      field: "linked_collection",
      cacheLock: cacheLocks["linked_collection"],
      nullable: true,
      label: linkedcollection1(),
      get cachedValue() {
        return formDataCache["linked_collection"];
      },
      set cachedValue($$value) {
        formDataCache["linked_collection"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      style: "hover:text-primary-700",
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          optionsEndpoint: "entities?relationship__name=accreditation_authority",
          field: "authority",
          cacheLock: cacheLocks["authority"],
          nullable: true,
          label: authority(),
          helpText: regulatoryauthorityhelptext3(),
          get cachedValue() {
            return formDataCache["authority"];
          },
          set cachedValue($$value) {
            formDataCache["authority"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        TextField($$payload3, {
          type: "date",
          form,
          field: "expiry_date",
          cacheLock: cacheLocks["expiry_date"],
          label: expirydate1(),
          get cachedValue() {
            return formDataCache["expiry_date"];
          },
          set cachedValue($$value) {
            formDataCache["expiry_date"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          multiple: true,
          form,
          createFromSelection: true,
          optionsEndpoint: "filtering-labels",
          optionsLabelField: "label",
          field: "filtering_labels",
          helpText: labelshelptext2(),
          label: labels(),
          translateOptions: false,
          allowUserOptions: "append"
        });
        $$payload3.out += `<!----> `;
        TextArea($$payload3, {
          form,
          field: "observation",
          label: observation(),
          helpText: observationhelptext2(),
          cacheLock: cacheLocks["observation"],
          get cachedValue() {
            return formDataCache["observation"];
          },
          set cachedValue($$value) {
            formDataCache["observation"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function MetricDefinitionForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {}
  } = $$props;
  const isQualitative = (() => {
    return data?.category === "qualitative";
  })();
  const { value: choicesDefinitionValue } = formFieldProxy(form, "choices_definition");
  let choicesEntries = [];
  function handleChoicesChange(entries) {
    store_set(choicesDefinitionValue, entries);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO&content_type=GL",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["category"],
      field: "category",
      label: category(),
      cacheLock: cacheLocks["category"],
      disableDoubleDash: true,
      get cachedValue() {
        return formDataCache["category"];
      },
      set cachedValue($$value) {
        formDataCache["category"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (isQualitative) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="form-group"><span class="text-sm font-semibold mb-2 block">${escape_html(choicesdefinition1())}</span> `;
      OrderedEntryList($$payload2, {
        onchange: handleChoicesChange,
        get entries() {
          return choicesEntries;
        },
        set entries($$value) {
          choicesEntries = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "terminologies?field_path=metric_definition.unit&is_visible=true",
        field: "unit",
        label: unit(),
        cacheLock: cacheLocks["unit"],
        get cachedValue() {
          return formDataCache["unit"];
        },
        set cachedValue($$value) {
          formDataCache["unit"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      TextField($$payload2, {
        form,
        type: "number",
        field: "default_target",
        label: defaulttarget1(),
        helpText: defaulttargethelptext3(),
        cacheLock: cacheLocks["default_target"],
        get cachedValue() {
          return formDataCache["default_target"];
        },
        set cachedValue($$value) {
          formDataCache["default_target"] = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!---->`;
    }
    $$payload2.out += `<!--]--> `;
    TextField($$payload2, {
      form,
      field: "provider",
      label: provider(),
      cacheLock: cacheLocks["provider"],
      get cachedValue() {
        return formDataCache["provider"];
      },
      set cachedValue($$value) {
        formDataCache["provider"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Checkbox($$payload2, {
      form,
      field: "higher_is_better",
      label: higherisbetter2(),
      helpText: higherisbetterhelptext4(),
      cacheLock: cacheLocks["higher_is_better"],
      get cachedValue() {
        return formDataCache["higher_is_better"];
      },
      set cachedValue($$value) {
        formDataCache["higher_is_better"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      cacheLock: cacheLocks["filtering_labels"],
      label: labels(),
      get cachedValue() {
        return formDataCache["filtering_labels"];
      },
      set cachedValue($$value) {
        formDataCache["filtering_labels"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function MetricInstanceForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    debug = false
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "metric-definitions",
      optionsLabelField: "auto",
      optionsExtraFields: [["folder", "str"]],
      field: "metric_definition",
      cacheLock: cacheLocks["metric_definition"],
      label: metricdefinition1(),
      disabled: !!initialData.metric_definition,
      get cachedValue() {
        return formDataCache["metric_definition"];
      },
      set cachedValue($$value) {
        formDataCache["metric_definition"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["status"],
      field: "status",
      label: status(),
      disableDoubleDash: true,
      cacheLock: cacheLocks["status"],
      get cachedValue() {
        return formDataCache["status"];
      },
      set cachedValue($$value) {
        formDataCache["status"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["collection_frequency"],
      field: "collection_frequency",
      label: collectionfrequency1(),
      cacheLock: cacheLocks["collection_frequency"],
      get cachedValue() {
        return formDataCache["collection_frequency"];
      },
      set cachedValue($$value) {
        formDataCache["collection_frequency"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      type: "number",
      field: "target_value",
      label: targetvalue1(),
      cacheLock: cacheLocks["target_value"],
      get cachedValue() {
        return formDataCache["target_value"];
      },
      set cachedValue($$value) {
        formDataCache["target_value"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "actors",
      optionsLabelField: "str",
      optionsInfoFields: {
        fields: [{ field: "type", translate: true }],
        position: "prefix"
      },
      field: "owner",
      cacheLock: cacheLocks["owner"],
      label: owner(),
      get cachedValue() {
        return formDataCache["owner"];
      },
      set cachedValue($$value) {
        formDataCache["owner"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Dropdown($$payload2, {
      open: false,
      icon: "fa-solid fa-list",
      header: more(),
      children: ($$payload3) => {
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "organisation-objectives",
          optionsLabelField: "auto",
          field: "organisation_objectives",
          cacheLock: cacheLocks["organisation_objectives"],
          label: organisationobjectives1(),
          get cachedValue() {
            return formDataCache["organisation_objectives"];
          },
          set cachedValue($$value) {
            formDataCache["organisation_objectives"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!----> `;
        AutocompleteSelect($$payload3, {
          form,
          multiple: true,
          optionsEndpoint: "filtering-labels",
          optionsLabelField: "label",
          field: "filtering_labels",
          cacheLock: cacheLocks["filtering_labels"],
          label: labels(),
          get cachedValue() {
            return formDataCache["filtering_labels"];
          },
          set cachedValue($$value) {
            formDataCache["filtering_labels"] = $$value;
            $$settled = false;
          }
        });
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function CustomMetricSampleForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    object = {},
    debug = false
  } = $$props;
  const { value: valueFieldProxy } = formFieldProxy(form, "value");
  const metricInstanceCache = Array.isArray(formDataCache["metric_instance"]) ? formDataCache["metric_instance"][0] : formDataCache["metric_instance"];
  const metricDefinition = metricInstanceCache?.metric_definition || data?.metric_instance?.metric_definition || initialData?._metric_definition;
  const isQualitative = metricDefinition?.category === "qualitative";
  const unitName = metricDefinition?.unit?.name || "";
  const choiceOptions = (() => {
    if (!isQualitative || !metricDefinition?.choices_definition) return [];
    return metricDefinition.choices_definition.map((choice, index) => ({
      label: `${index + 1}. ${choice.name}`,
      value: (index + 1).toString()
      // Store 1-based indices
    }));
  })();
  const selectedChoiceIndex = (() => {
    if (!isQualitative) return "";
    try {
      const parsed = typeof store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy) === "string" ? JSON.parse(store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy)) : store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy);
      return parsed?.choice_index?.toString() || "";
    } catch {
      return "";
    }
  })();
  const quantitativeValue = (() => {
    if (isQualitative) return "";
    try {
      const parsed = typeof store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy) === "string" ? JSON.parse(store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy)) : store_get($$store_subs ??= {}, "$valueFieldProxy", valueFieldProxy);
      return parsed?.result?.toString() || "";
    } catch {
      return "";
    }
  })();
  const maxTimestamp = () => {
    const now = /* @__PURE__ */ new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "metric-instances",
      optionsExtraFields: [
        ["folder", "str"],
        ["metric_definition", "fk"]
      ],
      field: "metric_instance",
      cacheLock: cacheLocks["metric_instance"],
      includeAllOptionFields: true,
      label: metricinstance1(),
      hidden: !!initialData.metric_instance,
      disabled: !!initialData.metric_instance,
      get cachedValue() {
        return formDataCache["metric_instance"];
      },
      set cachedValue($$value) {
        formDataCache["metric_instance"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      type: "datetime-local",
      field: "timestamp",
      label: timestamp(),
      cacheLock: cacheLocks["timestamp"],
      disabled: object.id,
      max: maxTimestamp(),
      get cachedValue() {
        return formDataCache["timestamp"];
      },
      set cachedValue($$value) {
        formDataCache["timestamp"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    if (debug) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="card bg-yellow-50 p-4 my-4 border-2 border-yellow-300"><h4 class="font-semibold mb-2">Debug Info:</h4> <div class="text-xs space-y-2"><div><strong>initialData.metric_instance:</strong> ${escape_html(initialData.metric_instance || "null")}</div> <div><strong>initialData._metric_definition:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(initialData._metric_definition, null, 2))}</pre></div> <div><strong>metricInstanceCache:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(metricInstanceCache, null, 2))}</pre></div> <div><strong>metricDefinition (resolved):</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(metricDefinition, null, 2))}</pre></div> <div><strong>isQualitative:</strong> ${escape_html(isQualitative)}</div> <div><strong>choiceOptions:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(choiceOptions, null, 2))}</pre></div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (isQualitative) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(choiceOptions);
      $$payload2.out += `<div class="form-group"><label for="value-select" class="text-sm font-semibold block mb-2">${escape_html(value())}</label> <select id="value-select" class="select w-full">`;
      $$payload2.select_value = selectedChoiceIndex;
      $$payload2.out += `<option value=""${maybe_selected($$payload2, "")}>-- ${escape_html(select())} --</option><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        $$payload2.out += `<option${attr("value", option.value)}${maybe_selected($$payload2, option.value)}>${escape_html(option.label)}</option>`;
      }
      $$payload2.out += `<!--]-->`;
      $$payload2.select_value = void 0;
      $$payload2.out += `</select></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="form-group"><label for="value-input" class="text-sm font-semibold block mb-2">${escape_html(value())} `;
      if (unitName) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="text-gray-500 font-normal">(${escape_html(unitName)})</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></label> <input id="value-input" type="number" step="any" class="input w-full"${attr("value", quantitativeValue)}/></div>`;
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
  bind_props($$props, { formDataCache });
  pop();
}
function DashboardForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    debug = false
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (debug) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="card bg-yellow-50 p-4 my-4 border-2 border-yellow-300"><h4 class="font-semibold mb-2">Debug Info:</h4> <div class="text-xs space-y-2"><div><strong>initialData:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(initialData, null, 2))}</pre></div> <div><strong>formDataCache:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(formDataCache, null, 2))}</pre></div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "filtering-labels",
      optionsLabelField: "label",
      field: "filtering_labels",
      cacheLock: cacheLocks["filtering_labels"],
      label: labels(),
      get cachedValue() {
        return formDataCache["filtering_labels"];
      },
      set cachedValue($$value) {
        formDataCache["filtering_labels"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DashboardWidgetForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    object = {},
    debug = false
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (debug) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="card bg-yellow-50 p-4 my-4 border-2 border-yellow-300"><h4 class="font-semibold mb-2">Debug Info:</h4> <div class="text-xs space-y-2"><div><strong>object:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(object, null, 2))}</pre></div> <div><strong>initialData:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(initialData, null, 2))}</pre></div> <div><strong>formDataCache:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(formDataCache, null, 2))}</pre></div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "dashboards",
      optionsLabelField: "name",
      field: "dashboard",
      cacheLock: cacheLocks["dashboard"],
      label: dashboard(),
      hidden: !!initialData.dashboard,
      disabled: !!initialData.dashboard,
      get cachedValue() {
        return formDataCache["dashboard"];
      },
      set cachedValue($$value) {
        formDataCache["dashboard"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "metric-instances",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "metric_instance",
      cacheLock: cacheLocks["metric_instance"],
      label: metricinstance1(),
      get cachedValue() {
        return formDataCache["metric_instance"];
      },
      set cachedValue($$value) {
        formDataCache["metric_instance"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "title",
      label: widgettitle1(),
      cacheLock: cacheLocks["title"],
      get cachedValue() {
        return formDataCache["title"];
      },
      set cachedValue($$value) {
        formDataCache["title"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="grid grid-cols-2 gap-4">`;
    Select($$payload2, {
      form,
      options: model.selectOptions["chart_type"],
      field: "chart_type",
      cacheLock: cacheLocks["chart_type"],
      label: charttype1(),
      disableDoubleDash: true,
      get cachedValue() {
        return formDataCache["chart_type"];
      },
      set cachedValue($$value) {
        formDataCache["chart_type"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    Select($$payload2, {
      form,
      options: model.selectOptions["time_range"],
      field: "time_range",
      cacheLock: cacheLocks["time_range"],
      label: timerange1(),
      get cachedValue() {
        return formDataCache["time_range"];
      },
      set cachedValue($$value) {
        formDataCache["time_range"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <input type="hidden" name="aggregation"${attr("value", formDataCache["aggregation"] || "none")}/> `;
    Checkbox($$payload2, {
      form,
      field: "show_target",
      label: showtarget1(),
      cacheLock: cacheLocks["show_target"],
      get cachedValue() {
        return formDataCache["show_target"];
      },
      set cachedValue($$value) {
        formDataCache["show_target"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DashboardTextWidgetForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    object = {},
    debug = false
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (debug) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="card bg-yellow-50 p-4 my-4 border-2 border-yellow-300"><h4 class="font-semibold mb-2">Debug Info:</h4> <div class="text-xs space-y-2"><div><strong>object:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(object, null, 2))}</pre></div> <div><strong>initialData:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(initialData, null, 2))}</pre></div> <div><strong>formDataCache:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(formDataCache, null, 2))}</pre></div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "dashboards",
      optionsLabelField: "name",
      field: "dashboard",
      cacheLock: cacheLocks["dashboard"],
      label: dashboard(),
      hidden: !!initialData.dashboard,
      disabled: !!initialData.dashboard,
      get cachedValue() {
        return formDataCache["dashboard"];
      },
      set cachedValue($$value) {
        formDataCache["dashboard"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "title",
      label: widgettitle1(),
      cacheLock: cacheLocks["title"],
      get cachedValue() {
        return formDataCache["title"];
      },
      set cachedValue($$value) {
        formDataCache["title"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    MarkdownField($$payload2, {
      form,
      field: "text_content",
      label: textcontent1(),
      cacheLock: cacheLocks["text_content"],
      rows: 8,
      defaultMode: "edit",
      get cachedValue() {
        return formDataCache["text_content"];
      },
      set cachedValue($$value) {
        formDataCache["text_content"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function DashboardBuiltinWidgetForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    data = {},
    object = {},
    debug = false,
    supportedModels = {}
  } = $$props;
  formFieldProxy(form, "target_model");
  formFieldProxy(form, "metric_key");
  formFieldProxy(form, "chart_type");
  let selectedModel = object?.target_content_type_display || "";
  let selectedMetricKey = object?.metric_key || "";
  let availableMetrics = [];
  let selectedChartType = object?.chart_type || "";
  const chartTypeLabels = {
    kpi_card: "KPI Card",
    gauge: "Gauge",
    sparkline: "Sparkline",
    line: "Line",
    area: "Area",
    bar: "Bar",
    donut: "Donut",
    pie: "Pie",
    table: "Table"
  };
  const availableChartTypes = (() => {
    if (!selectedMetricKey || availableMetrics.length === 0) {
      return [];
    }
    const metric2 = availableMetrics.find((m2) => m2.value === selectedMetricKey);
    if (!metric2) return [];
    return metric2.chart_types.map((ct) => ({ value: ct, label: chartTypeLabels[ct] || ct }));
  })();
  const modelTranslationKeys = {
    ComplianceAssessment: complianceassessment1,
    RiskAssessment: riskassessment1,
    FindingsAssessment: findingsassessment1,
    Folder: domain
  };
  const modelOptions = Object.keys(supportedModels).map((name2) => ({
    value: name2,
    label: modelTranslationKeys[name2]?.() || name2
  }));
  const targetObjectEndpoint = (() => {
    switch (selectedModel) {
      case "ComplianceAssessment":
        return "compliance-assessments";
      case "RiskAssessment":
        return "risk-assessments";
      case "FindingsAssessment":
        return "findings-assessments";
      case "Folder":
        return "folders?content_type=DO";
      default:
        return "";
    }
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(modelOptions);
    const each_array_2 = ensure_array_like(availableChartTypes);
    if (debug) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="card bg-yellow-50 p-4 my-4 border-2 border-yellow-300"><h4 class="font-semibold mb-2">Debug Info:</h4> <div class="text-xs space-y-2"><div><strong>object:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(object, null, 2))}</pre></div> <div><strong>supportedModels:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(supportedModels, null, 2))}</pre></div> <div><strong>availableChartTypes:</strong> <pre class="bg-white p-2 rounded mt-1">${escape_html(JSON.stringify(availableChartTypes, null, 2))}</pre></div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "folders?content_type=DO",
      field: "folder",
      pathField: "path",
      cacheLock: cacheLocks["folder"],
      label: domain(),
      hidden: initialData.folder,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "dashboards",
      optionsLabelField: "name",
      field: "dashboard",
      cacheLock: cacheLocks["dashboard"],
      label: dashboard(),
      hidden: !!initialData.dashboard,
      disabled: !!initialData.dashboard,
      get cachedValue() {
        return formDataCache["dashboard"];
      },
      set cachedValue($$value) {
        formDataCache["dashboard"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="space-y-4"><input type="hidden" name="target_model"${attr("value", selectedModel)}/> <div><label class="text-sm font-semibold" for="target_model_select">${escape_html(targetobjecttype2())}</label> <select id="target_model_select" class="select">`;
    $$payload2.select_value = selectedModel;
    $$payload2.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$payload2.out += `<option${attr("value", option.value)}${maybe_selected($$payload2, option.value)}>${escape_html(option.label)}</option>`;
    }
    $$payload2.out += `<!--]-->`;
    $$payload2.select_value = void 0;
    $$payload2.out += `</select></div> `;
    if (selectedModel && targetObjectEndpoint) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      {
        AutocompleteSelect($$payload2, {
          form,
          optionsEndpoint: targetObjectEndpoint,
          optionsLabelField: "auto",
          field: "target_object_id",
          cacheLock: cacheLocks["target_object_id"],
          label: targetobject1(),
          optionsInfoFields: selectedModel === "Folder" ? void 0 : {
            fields: [
              { field: "version", translate: true },
              {
                field: "perimeter",
                path: "str",
                translate: false
              },
              { field: "status", translate: true }
            ],
            position: "suffix",
            separator: " • ",
            classes: "text-surface-500"
          },
          get cachedValue() {
            return formDataCache["target_object_id"];
          },
          set cachedValue($$value) {
            formDataCache["target_object_id"] = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (availableMetrics.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(availableMetrics);
      $$payload2.out += `<div><label class="text-sm font-semibold" for="metric_key">${escape_html(metric())}</label> <select id="metric_key" name="metric_key" class="select">`;
      $$payload2.select_value = selectedMetricKey;
      $$payload2.out += `<!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let option = each_array_1[$$index_1];
        $$payload2.out += `<option${attr("value", option.value)}${maybe_selected($$payload2, option.value)}>${escape_html(option.label)}</option>`;
      }
      $$payload2.out += `<!--]-->`;
      $$payload2.select_value = void 0;
      $$payload2.out += `</select></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> `;
    TextField($$payload2, {
      form,
      field: "title",
      label: widgettitle1(),
      cacheLock: cacheLocks["title"],
      get cachedValue() {
        return formDataCache["title"];
      },
      set cachedValue($$value) {
        formDataCache["title"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="grid grid-cols-2 gap-4"><div><label class="text-sm font-semibold" for="chart_type">${escape_html(charttype1())}</label> <select id="chart_type" name="chart_type" class="select"${attr("disabled", availableChartTypes.length === 0, true)}>`;
    $$payload2.select_value = selectedChartType;
    $$payload2.out += `<!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let option = each_array_2[$$index_2];
      $$payload2.out += `<option${attr("value", option.value)}${maybe_selected($$payload2, option.value)}>${escape_html(option.label)}</option>`;
    }
    $$payload2.out += `<!--]-->`;
    $$payload2.select_value = void 0;
    $$payload2.out += `</select></div> `;
    if (model.selectOptions?.["time_range"]) {
      $$payload2.out += "<!--[-->";
      const each_array_3 = ensure_array_like(model.selectOptions["time_range"]);
      $$payload2.out += `<div><label class="text-sm font-semibold" for="time_range">${escape_html(timerange1())}</label> <select id="time_range" name="time_range" class="select">`;
      $$payload2.select_value = formDataCache["time_range"];
      $$payload2.out += `<!--[-->`;
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let option = each_array_3[$$index_3];
        $$payload2.out += `<option${attr("value", option.value)}${maybe_selected($$payload2, option.value)}>${escape_html(option.label)}</option>`;
      }
      $$payload2.out += `<!--]-->`;
      $$payload2.select_value = void 0;
      $$payload2.out += `</select></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <input type="hidden" name="aggregation"${attr("value", formDataCache["aggregation"] || "none")}/> `;
    Checkbox($$payload2, {
      form,
      field: "show_target",
      label: showtarget1(),
      cacheLock: cacheLocks["show_target"],
      get cachedValue() {
        return formDataCache["show_target"];
      },
      set cachedValue($$value) {
        formDataCache["show_target"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function FilteringLabelForm($$payload, $$props) {
  push();
  let { form, cacheLocks = {}, formDataCache = {} } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    TextField($$payload2, {
      form,
      field: "label",
      label: label(),
      cacheLock: cacheLocks["label"],
      get cachedValue() {
        return formDataCache["label"];
      },
      set cachedValue($$value) {
        formDataCache["label"] = $$value;
        $$settled = false;
      }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function OperationalScenarioForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context,
    object = null
    // Optional object for additional data
  } = $$props;
  const activityBackground = context === "edit" ? "bg-white" : "bg-surface-100-900";
  let activeActivity = null;
  page$1.url.searchParams.forEach((value2, key) => {
    if (key === "activity" && value2 === "one") {
      activeActivity = "one";
    } else if (key === "activity" && value2 === "two") {
      activeActivity = "two";
    } else if (key === "activity" && value2 === "three") {
      activeActivity = "three";
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    AutocompleteSelect($$payload2, {
      form,
      field: "ebios_rm_study",
      cacheLock: cacheLocks["ebios_rm_study"],
      label: ebiosrmstudy2(),
      hidden: initialData.ebios_rm_study,
      get cachedValue() {
        return formDataCache["ebios_rm_study"];
      },
      set cachedValue($$value) {
        formDataCache["ebios_rm_study"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "one" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "one" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activityone1())}</p> `;
    if (context !== "edit") {
      $$payload2.out += "<!--[-->";
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "attack-paths?is_selected=true&used=false",
        optionsDetailedUrlParameters: [
          ["ebios_rm_study", initialData.ebios_rm_study]
        ],
        optionsLabelField: "form_display_name",
        field: "attack_path",
        label: attackpath1() + ` (${strategicscenario1()})`
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    AutocompleteSelect($$payload2, {
      form,
      multiple: true,
      optionsEndpoint: "threats",
      optionsExtraFields: [["folder", "str"]],
      optionsLabelField: "auto",
      field: "threats",
      cacheLock: cacheLocks["threats"],
      label: elementaryactionstechniques2(),
      helpText: operationalscenariothreatshelptext4(),
      get cachedValue() {
        return formDataCache["threats"];
      },
      set cachedValue($$value) {
        formDataCache["threats"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextArea($$payload2, {
      form,
      field: "operating_modes_description",
      label: operatingmodesdescription2(),
      cacheLock: cacheLocks["operating_modes_description"],
      "data-focusindex": "1",
      helpText: operatingmodesdescriptionhelptext4(),
      get cachedValue() {
        return formDataCache["operating_modes_description"];
      },
      set cachedValue($$value) {
        formDataCache["operating_modes_description"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div${attr_class(`relative p-2 space-y-2 rounded-md ${stringify(activeActivity === "two" ? "border-2 border-primary-500" : "border-2 border-gray-300 border-dashed")}`)}><p${attr_class(`absolute -top-3 ${stringify(activityBackground)} font-bold ${stringify(activeActivity === "two" ? "text-primary-500" : "text-gray-500")}`)}>${escape_html(activitytwo1())}</p> `;
    if (object.quotation_method === "manual") {
      $$payload2.out += "<!--[-->";
      Select($$payload2, {
        form,
        options: model.selectOptions["likelihood"],
        field: "likelihood",
        label: likelihood(),
        cacheLock: cacheLocks["likelihood"],
        helpText: likelihoodhelptext2(),
        get cachedValue() {
          return formDataCache["likelihood"];
        },
        set cachedValue($$value) {
          formDataCache["likelihood"] = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    TextArea($$payload2, {
      form,
      field: "justification",
      label: justification(),
      cacheLock: cacheLocks["justification"],
      get cachedValue() {
        return formDataCache["justification"];
      },
      set cachedValue($$value) {
        formDataCache["justification"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> `;
    Checkbox($$payload2, {
      form,
      field: "is_selected",
      label: isselected1(),
      helpText: operationalscenarioisselectedhelptext5()
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function StrategicScenarioForm($$payload, $$props) {
  push();
  let {
    form,
    model,
    cacheLocks = {},
    formDataCache = {},
    initialData = {},
    context
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<p class="text-sm text-gray-500">${escape_html(strategicscenariohelptext3())}</p> `;
    AutocompleteSelect($$payload2, {
      form,
      optionsEndpoint: "ro-to?is_selected=true",
      optionsDetailedUrlParameters: [
        ["ebios_rm_study", initialData.ebios_rm_study]
      ],
      optionsLabelField: "str",
      field: "ro_to_couple",
      cacheLock: cacheLocks["ro_to_couple"],
      label: rotocouple2(),
      get cachedValue() {
        return formDataCache["ro_to_couple"];
      },
      set cachedValue($$value) {
        formDataCache["ro_to_couple"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <!---->`;
    {
      AutocompleteSelect($$payload2, {
        form,
        optionsEndpoint: "feared-events",
        optionsDetailedUrlParameters: [
          ["ebios_rm_study", initialData.ebios_rm_study],
          [
            "ro_to_couples",
            formDataCache["ro_to_couple"] || initialData.ro_to_couple
          ]
        ],
        optionsLabelField: "auto",
        field: "focused_feared_event",
        cacheLock: cacheLocks["focused_feared_event"],
        label: focusedfearedevent2(),
        nullable: true,
        get cachedValue() {
          return formDataCache["focused_feared_event"];
        },
        set cachedValue($$value) {
          formDataCache["focused_feared_event"] = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!----> `;
    AutocompleteSelect($$payload2, {
      form,
      field: "folder",
      cacheLock: cacheLocks["folder"],
      label: folder(),
      hidden: true,
      get cachedValue() {
        return formDataCache["folder"];
      },
      set cachedValue($$value) {
        formDataCache["folder"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> `;
    TextField($$payload2, {
      form,
      field: "ref_id",
      label: refid1(),
      cacheLock: cacheLocks["ref_id"],
      get cachedValue() {
        return formDataCache["ref_id"];
      },
      set cachedValue($$value) {
        formDataCache["ref_id"] = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { formDataCache });
  pop();
}
function ModelForm($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    form,
    invalidateAll = true,
    taintedMessage = taintedformmessage2(),
    model,
    context = "default",
    origin: origin2 = null,
    caching = false,
    closeModal = false,
    parent = {},
    suggestions = {},
    cancelButton = true,
    duplicate = false,
    importFolder = false,
    customNameDescription = false,
    additionalInitialData = {},
    schema = modelSchema(model.urlModel),
    object = {},
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const URLModel = model.urlModel;
  let shape = schema.shape || schema._def.schema.shape;
  let updated_fields = /* @__PURE__ */ new Set();
  function makeCacheLock() {
    let resolve = (_) => _;
    const promise = new Promise((res) => {
      resolve = res;
    });
    return { resolve, promise };
  }
  let cacheLocks = {};
  run(() => {
    if (shape) cacheLocks = Object.keys(shape).reduce(
      (acc, field) => {
        acc[field] = makeCacheLock();
        return acc;
      },
      {}
    );
  });
  let formDataCache = {};
  let urlModelFromPage = void 0;
  run(() => {
    if (store_get($$store_subs ??= {}, "$page", page)) {
      urlModelFromPage = `${store_get($$store_subs ??= {}, "$page", page).url}`.replace(/^.*:\/\/[^/]+/, "");
      createModalCache.setModelName(urlModelFromPage);
      if (caching) {
        const currentCache = createModalCache.data[model.urlModel];
        if (!currentCache) {
          createModalCache.data[model.urlModel] = formDataCache;
        } else {
          formDataCache = currentCache;
        }
      }
    }
  });
  run(() => {
    if (caching) {
      for (const key of Object.keys(cacheLocks)) {
        cacheLocks[key].resolve(formDataCache[key]);
      }
    }
  });
  let missingConstraints = [];
  function updateMissingConstraint(field, isMissing) {
    if (isMissing && !missingConstraints.includes(field)) {
      missingConstraints = [...missingConstraints, field];
    } else if (!isMissing) {
      missingConstraints = missingConstraints.filter((f) => f !== field);
    }
  }
  setContext("updateMissingConstraint", updateMissingConstraint);
  onDestroy(() => {
    missingConstraints = [];
    createModalCache.garbageCollect();
  });
  const _form = superForm(form, {
    dataType: shape?.attachment ? "form" : "json",
    enctype: shape?.attachment ? "multipart/form-data" : "application/x-www-form-urlencoded",
    invalidateAll,
    applyAction: rest.applyAction ?? true,
    resetForm: rest.resetForm ?? false,
    validators: zod(schema),
    taintedMessage,
    validationMethod: "auto",
    onUpdated: async ({ form: form2 }) => {
      if (form2.message?.redirect) {
        goto(getSecureRedirect(form2.message.redirect));
      }
      if (form2.valid) {
        if (parent && typeof parent.onConfirm === "function") {
          parent.onConfirm();
        }
        createModalCache.deleteCache(model.urlModel);
      }
    }
  });
  const { form: formData, errors, submitting } = _form;
  errors.subscribe((newErrors) => {
    Object.values(newErrors).reduce((acc, error) => acc += error ? 1 : 0, 0);
    JSON.stringify([Date.now(), newErrors]);
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (missingConstraints.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(missingConstraints);
      $$payload2.out += `<div class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">${escape_html(missingmandatoyobjects12({ model: safeTranslate(model.localName) }))}: <!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let key = each_array[$$index];
        $$payload2.out += `<li class="font-bold">${escape_html(safeTranslate(key))}</li>`;
      }
      $$payload2.out += `<!--]--> ${escape_html(missingmandatoyobjects22())}</div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    {
      let children = function($$payload3, { form: form2, data, initialData }) {
        $$payload3.out += `<input type="hidden" name="urlmodel"${attr("value", model.urlModel)}/> `;
        if (additionalInitialData?.genericcollection) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<input type="hidden" name="genericcollection"${attr("value", additionalInitialData.genericcollection)}/>`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->  `;
        if (shape.reference_control && !duplicate) {
          $$payload3.out += "<!--[-->";
          AutocompleteSelect($$payload3, {
            form: form2,
            optionsEndpoint: "reference-controls",
            optionsExtraFields: [["folder", "str"]],
            optionsLabelField: "auto",
            optionsSuggestions: suggestions["reference_control"],
            field: "reference_control",
            cacheLock: cacheLocks["reference_control"],
            label: referencecontrol1(),
            helpText: referencecontrolhelptext3(),
            nullable: true,
            onChange: async (e) => {
              if (e) {
                await fetch(`/reference-controls/${e}`).then((r) => r.json()).then((r) => {
                  form2.form.update((currentData) => {
                    if (context === "edit" && currentData["reference_control"] === initialData["reference_control"] && !updated_fields.has("reference_control")) {
                      return currentData;
                    }
                    updated_fields.add("reference_control");
                    const shouldUpdateName = !currentData.name || !updated_fields.has("name");
                    return {
                      ...currentData,
                      name: shouldUpdateName ? r.name : currentData.name,
                      category: r.category,
                      csf_function: r.csf_function,
                      ref_id: r.ref_id
                    };
                  });
                });
              }
            },
            get cachedValue() {
              return formDataCache["reference_control"];
            },
            set cachedValue($$value) {
              formDataCache["reference_control"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (shape.name && !customNameDescription) {
          $$payload3.out += "<!--[-->";
          TextField($$payload3, {
            form: form2,
            field: "name",
            label: name(),
            cacheLock: cacheLocks["name"],
            "data-focusindex": "0",
            oninput: () => {
              updated_fields.add("name");
            },
            get cachedValue() {
              return formDataCache["name"];
            },
            set cachedValue($$value) {
              formDataCache["name"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (shape.description && !customNameDescription) {
          $$payload3.out += "<!--[-->";
          MarkdownField($$payload3, {
            form: form2,
            field: "description",
            label: description(),
            cacheLock: cacheLocks["description"],
            "data-focusindex": "1",
            get cachedValue() {
              return formDataCache["description"];
            },
            set cachedValue($$value) {
              formDataCache["description"] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (URLModel === "perimeters") {
          $$payload3.out += "<!--[-->";
          PerimeterForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData
          });
        } else if (URLModel === "folders" || URLModel === "folders-import") {
          $$payload3.out += "<!--[1-->";
          FolderForm($$payload3, spread_props([
            {
              form: form2,
              importFolder,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object
            },
            rest
          ]));
        } else if (URLModel === "risk-assessments") {
          $$payload3.out += "<!--[2-->";
          RiskAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              duplicate,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              context,
              updated_fields
            },
            rest
          ]));
        } else if (URLModel === "threats") {
          $$payload3.out += "<!--[3-->";
          ThreatForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "risk-scenarios") {
          $$payload3.out += "<!--[4-->";
          RiskScenarioForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "applied-controls" || URLModel === "policies") {
          $$payload3.out += "<!--[5-->";
          AppliedControlPolicyForm($$payload3, spread_props([
            {
              form: form2,
              model,
              duplicate,
              cacheLocks,
              formDataCache,
              schema,
              origin: origin2,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "vulnerabilities") {
          $$payload3.out += "<!--[6-->";
          VulnerabilitiesForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "risk-acceptances") {
          $$payload3.out += "<!--[7-->";
          RiskAcceptanceForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              object,
              initialData,
              $page: store_get($$store_subs ??= {}, "$page", page)
            },
            rest
          ]));
        } else if (URLModel === "validation-flows") {
          $$payload3.out += "<!--[8-->";
          ValidationFlowForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              object,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "reference-controls") {
          $$payload3.out += "<!--[9-->";
          ReferenceControlForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "evidences") {
          $$payload3.out += "<!--[10-->";
          EvidenceForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              context
            },
            rest
          ]));
        } else if (URLModel === "compliance-assessments") {
          $$payload3.out += "<!--[11-->";
          ComplianceAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              context
            },
            rest
          ]));
        } else if (URLModel === "campaigns") {
          $$payload3.out += "<!--[12-->";
          CampaignForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              context
            },
            rest
          ]));
        } else if (URLModel === "assets") {
          $$payload3.out += "<!--[13-->";
          AssetForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              data
            },
            rest
          ]));
        } else if (URLModel === "requirement-assessments") {
          $$payload3.out += "<!--[14-->";
          RequirementAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context
            },
            rest
          ]));
        } else if (URLModel === "entities") {
          $$payload3.out += "<!--[15-->";
          EntityForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              object
            },
            rest
          ]));
        } else if (URLModel === "entity-assessments") {
          $$payload3.out += "<!--[16-->";
          EntityAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              data
            },
            rest
          ]));
        } else if (URLModel === "solutions") {
          $$payload3.out += "<!--[17-->";
          SolutionForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "contracts") {
          $$payload3.out += "<!--[18-->";
          ContractForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "representatives") {
          $$payload3.out += "<!--[19-->";
          RepresentativeForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              object,
              context
            },
            rest
          ]));
        } else if (URLModel === "frameworks") {
          $$payload3.out += "<!--[20-->";
          FrameworkForm($$payload3, spread_props([
            { form: form2, model, cacheLocks, formDataCache },
            rest
          ]));
        } else if (URLModel === "users") {
          $$payload3.out += "<!--[21-->";
          UserForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              shape,
              context
            },
            rest
          ]));
        } else if (URLModel === "teams") {
          $$payload3.out += "<!--[22-->";
          TeamForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              shape,
              context
            },
            rest
          ]));
        } else if (URLModel === "sso-settings") {
          $$payload3.out += "<!--[23-->";
          SsoSettingForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              data
            },
            rest
          ]));
        } else if (URLModel === "general-settings") {
          $$payload3.out += "<!--[24-->";
          GeneralSettingForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              data
            },
            rest
          ]));
        } else if (URLModel === "feature-flags") {
          $$payload3.out += "<!--[25-->";
          FeatureFlagsSettingForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              data
            },
            rest
          ]));
        } else if (URLModel === "filtering-labels") {
          $$payload3.out += "<!--[26-->";
          FilteringLabelForm($$payload3, spread_props([
            { form: form2, model, cacheLocks, formDataCache },
            rest
          ]));
        } else if (URLModel === "business-impact-analysis") {
          $$payload3.out += "<!--[27-->";
          BusinessImpactAnalysisForm($$payload3, spread_props([
            {
              form: form2,
              model,
              duplicate,
              cacheLocks,
              formDataCache,
              initialData,
              object,
              context,
              updated_fields
            },
            rest
          ]));
        } else if (URLModel === "asset-assessments") {
          $$payload3.out += "<!--[28-->";
          AssetAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "escalation-thresholds") {
          $$payload3.out += "<!--[29-->";
          EscalationThresholdForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "processings") {
          $$payload3.out += "<!--[30-->";
          ProcessingForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context
            },
            rest
          ]));
        } else if (URLModel === "purposes") {
          $$payload3.out += "<!--[31-->";
          PurposeForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "personal-data") {
          $$payload3.out += "<!--[32-->";
          PersonalDataForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "data-subjects") {
          $$payload3.out += "<!--[33-->";
          DataSubjectForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "data-recipients") {
          $$payload3.out += "<!--[34-->";
          DataRecipientForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "data-contractors") {
          $$payload3.out += "<!--[35-->";
          DataContractorForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "data-transfers") {
          $$payload3.out += "<!--[36-->";
          DataTransferForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "right-requests") {
          $$payload3.out += "<!--[37-->";
          RightRequestForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "data-breaches") {
          $$payload3.out += "<!--[38-->";
          DataBreachForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "ebios-rm") {
          $$payload3.out += "<!--[39-->";
          EbiosRmForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context
            },
            rest
          ]));
        } else if (URLModel === "feared-events") {
          $$payload3.out += "<!--[40-->";
          FearedEventForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData
            },
            rest
          ]));
        } else if (URLModel === "ro-to") {
          $$payload3.out += "<!--[41-->";
          RoToForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "stakeholders") {
          $$payload3.out += "<!--[42-->";
          StakeholderForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context
            },
            rest
          ]));
        } else if (URLModel === "strategic-scenarios") {
          $$payload3.out += "<!--[43-->";
          StrategicScenarioForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "attack-paths") {
          $$payload3.out += "<!--[44-->";
          AttackPathForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              additionalInitialData
            },
            rest
          ]));
        } else if (URLModel === "operational-scenarios") {
          $$payload3.out += "<!--[45-->";
          OperationalScenarioForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context,
              object
            },
            rest
          ]));
        } else if (URLModel === "security-exceptions") {
          $$payload3.out += "<!--[46-->";
          SecurityExceptionForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "findings") {
          $$payload3.out += "<!--[47-->";
          FindingForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "findings-assessments") {
          $$payload3.out += "<!--[48-->";
          FindingsAssessmentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "incidents") {
          $$payload3.out += "<!--[49-->";
          IncidentForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "timeline-entries") {
          $$payload3.out += "<!--[50-->";
          TimelineEntryForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: model.initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "task-templates") {
          $$payload3.out += "<!--[51-->";
          TaskTemplateForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "task-nodes") {
          $$payload3.out += "<!--[52-->";
          TaskNodeForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              context
            },
            rest
          ]));
        } else if (URLModel === "elementary-actions") {
          $$payload3.out += "<!--[53-->";
          ElementaryActionForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "operating-modes") {
          $$payload3.out += "<!--[54-->";
          OperatingModeForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: model.initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "kill-chains") {
          $$payload3.out += "<!--[55-->";
          KillChainForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: model.initialData,
              context
            },
            rest
          ]));
        } else if (URLModel === "quantitative-risk-studies") {
          $$payload3.out += "<!--[56-->";
          QuantitativeRiskStudyForm($$payload3, {
            form: form2,
            model,
            duplicate,
            cacheLocks,
            formDataCache,
            initialData,
            object,
            context
          });
        } else if (URLModel === "quantitative-risk-scenarios") {
          $$payload3.out += "<!--[57-->";
          QuantitativeRiskScenarioForm($$payload3, {
            form: form2,
            model,
            duplicate,
            cacheLocks,
            formDataCache,
            initialData,
            object,
            context
          });
        } else if (URLModel === "quantitative-risk-hypotheses") {
          $$payload3.out += "<!--[58-->";
          QuantitativeRiskHypothesisForm($$payload3, {
            form: form2,
            model,
            duplicate,
            cacheLocks,
            formDataCache,
            initialData,
            object,
            context
          });
        } else if (URLModel === "organisation-issues") {
          $$payload3.out += "<!--[59-->";
          OrganisationIssueForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData
          });
        } else if (URLModel === "organisation-objectives") {
          $$payload3.out += "<!--[60-->";
          OrganisationObjectiveForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData
          });
        } else if (URLModel === "terminologies") {
          $$payload3.out += "<!--[61-->";
          TerminologyForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData,
            object
          });
        } else if (URLModel === "roles") {
          $$payload3.out += "<!--[62-->";
          RoleForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            context
          });
        } else if (URLModel === "evidence-revisions") {
          $$payload3.out += "<!--[63-->";
          EvidenceRevisionForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData,
            object,
            context
          });
        } else if (URLModel === "generic-collections") {
          $$payload3.out += "<!--[64-->";
          GenericCollectionForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData,
            object,
            context
          });
        } else if (URLModel === "accreditations") {
          $$payload3.out += "<!--[65-->";
          AccreditationForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData,
            object
          });
        } else if (URLModel === "metric-definitions") {
          $$payload3.out += "<!--[66-->";
          MetricDefinitionForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData,
              data
            },
            rest
          ]));
        } else if (URLModel === "metric-instances") {
          $$payload3.out += "<!--[67-->";
          MetricInstanceForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: { ...initialData, ...additionalInitialData },
              data
            },
            rest
          ]));
        } else if (URLModel === "custom-metric-samples") {
          $$payload3.out += "<!--[68-->";
          CustomMetricSampleForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: { ...initialData, ...additionalInitialData },
              data,
              object
            },
            rest
          ]));
        } else if (URLModel === "dashboards") {
          $$payload3.out += "<!--[69-->";
          DashboardForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: { ...initialData, ...additionalInitialData },
              data
            },
            rest
          ]));
        } else if (URLModel === "dashboard-widgets") {
          $$payload3.out += "<!--[70-->";
          DashboardWidgetForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: { ...initialData, ...additionalInitialData },
              data,
              object
            },
            rest
          ]));
        } else if (URLModel === "dashboard-text-widgets") {
          $$payload3.out += "<!--[71-->";
          DashboardTextWidgetForm($$payload3, {
            form: form2,
            model,
            cacheLocks,
            formDataCache,
            initialData: { ...initialData, ...additionalInitialData },
            data,
            object
          });
        } else if (URLModel === "dashboard-builtin-widgets") {
          $$payload3.out += "<!--[72-->";
          DashboardBuiltinWidgetForm($$payload3, spread_props([
            {
              form: form2,
              model,
              cacheLocks,
              formDataCache,
              initialData: { ...initialData, ...additionalInitialData },
              data,
              object
            },
            rest
          ]));
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> <div class="flex flex-row justify-between space-x-4 mt-2">`;
        if (closeModal) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<button class="btn bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold w-full rounded-lg transition-colors" data-testid="cancel-button" type="button">${escape_html(cancel())}</button> <button${attr_class(`btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] font-semibold w-full rounded-lg shadow-sm transition-all ${stringify(store_get($$store_subs ??= {}, "$submitting", submitting) ? "cursor-wait opacity-75" : "")}`)} data-testid="save-button" type="submit"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>`;
          if (store_get($$store_subs ??= {}, "$submitting", submitting)) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `${escape_html(loading())} `;
            LoadingSpinner($$payload3);
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `${escape_html(save())}`;
          }
          $$payload3.out += `<!--]--></button>`;
        } else {
          $$payload3.out += "<!--[!-->";
          if (cancelButton) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<button class="btn bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold w-full rounded-lg transition-colors" data-testid="cancel-button" type="button">${escape_html(cancel())}</button>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <button${attr_class(`btn bg-gradient-to-r from-[#0A1628] to-[#1a2740] text-white hover:from-[#1a2740] hover:to-[#2a3a66] font-semibold w-full rounded-lg shadow-sm transition-all ${stringify(store_get($$store_subs ??= {}, "$submitting", submitting) ? "cursor-wait opacity-75" : "")}`)} data-testid="save-button" type="submit"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>`;
          if (store_get($$store_subs ??= {}, "$submitting", submitting)) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `${escape_html(loading())} `;
            LoadingSpinner($$payload3);
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `${escape_html(save())}`;
          }
          $$payload3.out += `<!--]--></button>`;
        }
        $$payload3.out += `<!--]--></div>`;
      };
      Form($$payload2, spread_props([
        {
          class: "flex flex-col space-y-3",
          dataType: shape.attachment ? "form" : "json",
          enctype: shape.attachment ? "multipart/form-data" : "application/x-www-form-urlencoded",
          data: form,
          _form,
          invalidateAll,
          validators: zod(schema),
          onUpdated: () => createModalCache.deleteCache(model.urlModel)
        },
        rest,
        { children, $$slots: { default: true } }
      ]));
    }
    $$payload2.out += `<!---->`;
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

export { ModelForm as M };
//# sourceMappingURL=ModelForm-CVc96_iY.js.map
