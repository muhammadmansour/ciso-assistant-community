import { p as push, a as pop, V as escape_html, T as attr, S as attr_class, X as stringify } from './index2-9icAqEyj.js';
import { D as DetailView } from './DetailView-B_RoZuiq.js';
import { NF as currentvalue1, su as sampletimeline1, BX as nodataavailable2 } from './_index-DEXNURl5.js';
import './exports-CA5lG8jS.js';
import './state.svelte-B6YM-9h0.js';
import { g as getModalStore } from './stores2-D1NYwn5V.js';
import './index3-BwfRm5YV.js';
import './client-DqP3yP6V.js';
import './client2-CItqzqlw.js';
import './index-CRjgakYW.js';
import './Anchor-BbSdvrYd.js';
import './breadcrumbs-CG0qNTv3.js';
import './Form-B7HJg_JV.js';
import './stores3-psVfZSQ7.js';
import './html-FW6Ia4bL.js';
import './formData-F7m95JiK.js';
import './index-server-D2ILrLnm.js';
import './app-Ci0UE2-c.js';
import './utils-FiC4zhrQ.js';
import './i18n-WNCV45cf.js';
import './MarkdownRenderer-B6VNWr3Z.js';
import 'marked';
import 'sanitize-html';
import './helpers-Bm9n0CNG.js';
import './crud-a52dcxCi.js';
import './legacy-server-DMdb6ZTL.js';
import './constants-BZXIbVIt.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BMNt81Gy.js';
import './stores-CMqbeBUT.js';
import './Tooltip.svelte_svelte_type_style_lang-BDvN8aCi.js';
import './client.svelte-CxCno2aW.js';
import '@floating-ui/dom';
import './index7-Dk-jItBW.js';
import './machine.svelte-CWLOiKlV.js';
import './Tooltip-DrjF8lR0.js';
import './index5-C1_XlIn1.js';
import './index8-BWS1s5in.js';
import './string-BMZjP7XX.js';
import './schemas-BcDBvyDd.js';
import './ModelTable-2RGnpbgJ.js';
import './Popover-souGUgW5.js';
import './access-control-DaLcieub.js';
import './datetime-CDLVyquZ.js';
import './related-visibility-ukSq_O7b.js';
import './zod-CkM6Syoc.js';
import './DeleteConfirmModal-DDazzCSM.js';

function MetricSampleChart($$payload, $$props) {
  push();
  let {
    samples = [],
    metricDefinition = null,
    width = "w-full",
    height = "h-96",
    classesContainer = ""
  } = $$props;
  const chart_id = `metric-sample-chart-${crypto.randomUUID()}`;
  metricDefinition?.category === "qualitative";
  metricDefinition?.unit?.name || "";
  if (samples.length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("id", chart_id)}${attr_class(`${stringify(height)} ${stringify(width)} ${stringify(classesContainer)}`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`flex items-center justify-center ${stringify(height)} ${stringify(width)} bg-gray-50 rounded-lg`)}><p class="text-gray-500 text-sm">${escape_html(nodataavailable2())}</p></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const metricInstance = data.data;
  const metricDefinition = metricInstance?.metric_definition;
  metricDefinition?.category === "qualitative";
  const samples = data.samples || [];
  getModalStore();
  {
    let widgets = function($$payload2) {
      $$payload2.out += `<div class="h-full flex flex-col space-y-4"><div class="card p-4 bg-white shadow-sm"><h3 class="text-lg font-semibold mb-3">${escape_html(currentvalue1())}</h3> <div class="text-3xl font-bold text-primary-600">${escape_html(metricInstance?.current_value || "N/A")}</div></div> <div class="card p-4 bg-white shadow-sm"><h3 class="text-lg font-semibold mb-3">${escape_html(sampletimeline1())}</h3> <!---->`;
      {
        MetricSampleChart($$payload2, { samples, metricDefinition, height: "h-80" });
      }
      $$payload2.out += `<!----></div></div>`;
    };
    DetailView($$payload, {
      data,
      form,
      widgets,
      $$slots: { widgets: true }
    });
  }
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CTpCPzAJ.js.map
