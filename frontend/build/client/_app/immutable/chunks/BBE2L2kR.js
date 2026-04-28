import"./Bzak7iHL.js";import"./69_IOA4Y.js";import{p as Oe,aV as pe,N as J,Q as L,ar as b,aW as We,f as h,i as I,g as u,s as C,a as c,b as ze,c as f,r as g,t as U,a9 as K,aF as he,q as O,av as H}from"./2pWo5_dW.js";import{s as be,e as fe}from"./C2HK-5eJ.js";import{a as Be}from"./7QhI6BBg.js";import{i as D}from"./CWz7oro_.js";import{h as X}from"./BNMuJmHr.js";import{s as Re}from"./BKGi4-1R.js";import{s as W}from"./B1TJtPpf.js";import{s as qe}from"./DkXIEkz8.js";import{b as Je}from"./Bi-WFMHF.js";import{p as Le}from"./94V-AE2z.js";import{i as He}from"./DVvhCpGc.js";import{p as l,a as ge,e as Pe,s as Ye}from"./DMjP-jzq.js";import{p as Ze}from"./Bn1B7sWx.js";import{r as ve,g as me}from"./DaFf4ri-.js";/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */function $(){return new DOMException("The request is not allowed","NotAllowedError")}async function Ge(v){if(!navigator.clipboard)throw $();return navigator.clipboard.writeText(v)}async function Qe(v){const t=document.createElement("span");t.textContent=v,t.style.whiteSpace="pre",t.style.webkitUserSelect="auto",t.style.userSelect="all",document.body.appendChild(t);const n=window.getSelection(),z=window.document.createRange();n==null||n.removeAllRanges(),z.selectNode(t),n==null||n.addRange(z);let i=!1;try{i=window.document.execCommand("copy")}finally{n==null||n.removeAllRanges(),window.document.body.removeChild(t)}if(!i)throw $()}async function Ue(v){try{await Ge(v)}catch(t){try{await Qe(v)}catch(n){throw n||t||$()}}}var Ke=h(`<style>.super-debug--absolute {
			position: absolute;
		}

		.super-debug--top-0 {
			top: 0;
		}

		.super-debug--inset-x-0 {
			left: 0px;
			right: 0px;
		}

		.super-debug--hidden {
			height: 0;
			overflow: hidden;
		}

		.super-debug--hidden:not(.super-debug--with-label) {
			height: 1.5em;
		}

		.super-debug--rotated {
			transform: rotate(180deg);
		}

		.super-debug {
			--_sd-bg-color: var(--sd-bg-color, var(--sd-vscode-bg-color, rgb(30, 41, 59)));
			position: relative;
			background-color: var(--_sd-bg-color);
			border-radius: 0.5rem;
			overflow: hidden;
		}

		.super-debug--pre {
			overflow-x: auto;
		}

		.super-debug--collapse {
			display: block;
			width: 100%;
			color: rgba(255, 255, 255, 0.25);
			background-color: rgba(255, 255, 255, 0.15);
			padding: 5px 0;
			display: flex;
			justify-content: center;
			border-color: transparent;
			margin: 0;
			padding: 3px 0;
		}

		.super-debug--collapse:focus {
			color: #fafafa;
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--collapse:is(:hover) {
			color: rgba(255, 255, 255, 0.35);
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--status {
			display: flex;
			padding: 1em;
			padding-bottom: 0;
			justify-content: space-between;
			font-family:
				Inconsolata, Monaco, Consolas, 'Lucida Console', 'Courier New', Courier, monospace;
		}

		.super-debug--right-status {
			display: flex;
			gap: 0.55em;
		}

		.super-debug--copy {
			margin: 0;
			padding: 0;
			padding-top: 2px;
			background-color: transparent;
			border: 0;
			color: #666;
			cursor: pointer;
		}

		.super-debug--copy:hover {
			background-color: transparent;
			color: #666;
		}

		.super-debug--copy:focus {
			background-color: transparent;
			color: #666;
		}

		.super-debug--label {
			color: var(--sd-label-color, var(--sd-vscode-label-color, white));
		}

		.super-debug--promise-loading {
			color: var(--sd-promise-loading-color, var(--sd-vscode-promise-loading-color, #999));
		}

		.super-debug--promise-rejected {
			color: var(--sd-promise-rejected-color, var(--sd-vscode-promise-rejected-color, #ff475d));
		}

		.super-debug pre {
			color: var(--sd-code-default, var(--sd-vscode-code-default, #999));
			background-color: var(--_sd-bg-color);
			font-size: 1em;
			margin-bottom: 0;
			padding: 1em 0 1em 1em;
		}

		.super-debug--info {
			color: var(--sd-info, var(--sd-vscode-info, rgb(85, 85, 255)));
		}

		.super-debug--success {
			color: var(--sd-success, var(--sd-vscode-success, #2cd212));
		}

		.super-debug--redirect {
			color: var(--sd-redirect, var(--sd-vscode-redirect, #03cae5));
		}

		.super-debug--error {
			color: var(--sd-error, var(--sd-vscode-error, #ff475d));
		}

		.super-debug--code .key {
			color: var(--sd-code-key, var(--sd-vscode-code-key, #eab308));
		}

		.super-debug--code .string {
			color: var(--sd-code-string, var(--sd-vscode-code-string, #6ec687));
		}

		.super-debug--code .date {
			color: var(--sd-code-date, var(--sd-vscode-code-date, #f06962));
		}

		.super-debug--code .boolean {
			color: var(--sd-code-boolean, var(--sd-vscode-code-boolean, #79b8ff));
		}

		.super-debug--code .number {
			color: var(--sd-code-number, var(--sd-vscode-code-number, #af77e9));
		}

		.super-debug--code .bigint {
			color: var(--sd-code-bigint, var(--sd-vscode-code-bigint, #af77e9));
		}

		.super-debug--code .null {
			color: var(--sd-code-null, var(--sd-vscode-code-null, #238afe));
		}

		.super-debug--code .nan {
			color: var(--sd-code-nan, var(--sd-vscode-code-nan, #af77e9));
		}

		.super-debug--code .undefined {
			color: var(--sd-code-undefined, var(--sd-vscode-code-undefined, #238afe));
		}

		.super-debug--code .function {
			color: var(--sd-code-function, var(--sd-vscode-code-function, #f06962));
		}

		.super-debug--code .symbol {
			color: var(--sd-code-symbol, var(--sd-vscode-code-symbol, #4de0c5));
		}

		.super-debug--code .error {
			color: var(--sd-code-error, var(--sd-vscode-code-error, #ff475d));
		}

		.super-debug pre::-webkit-scrollbar {
			width: var(--sd-sb-width, var(--sd-vscode-sb-width, 1rem));
			height: var(--sd-sb-height, var(--sd-vscode-sb-height, 1rem));
		}

		.super-debug pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color,
				var(--sd-vscode-sb-track-color, hsl(0, 0%, 40%, 0.2))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color-focus,
				var(--sd-vscode-sb-track-color-focus, hsl(0, 0%, 50%, 0.2))
			);
		}

		.super-debug pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color,
				var(--sd-vscode-sb-thumb-color, hsl(217, 50%, 50%, 0.5))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color-focus,
				var(--sd-vscode-sb-thumb-color-focus, hsl(217, 50%, 50%))
			);
		}</style>`),Xe=he('<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path><path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"></path></g></svg>'),$e=he('<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 12v6m-3-3h6"></path><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></g></svg>'),er=h("<div> </div>"),rr=h('<span class="super-debug--promise-rejected">Rejected:</span> <!>',1),or=h('<div class="super-debug--promise-loading">Loading data...</div>'),sr=h('<button type="button" class="super-debug--collapse" aria-label="Collapse"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"></path></svg></button>'),tr=h('<div dir="ltr"><div><div class="super-debug--label"> </div> <div class="super-debug--right-status"><button type="button" class="super-debug--copy"><!></button> <!></div></div> <pre><code class="super-debug--code"><!></code></pre> <!></div>'),dr=h("<!> <!>",1);function kr(v,t){Oe(t,!1);const[n,z]=Ye(),i=()=>ge(Ze,"$page",n),E=()=>ge(u(re),"$debugData",n),ee=L(),re=L();let ye=L(!1),B=l(t,"data",8),we=l(t,"display",8,!0),_e=l(t,"status",8,!0),P=l(t,"label",8,""),j=l(t,"stringTruncate",8,120),oe=l(t,"ref",12,void 0),se=l(t,"promise",8,!1),y=l(t,"raw",8,!1),ke=l(t,"functions",8,!1),te=l(t,"theme",8,"default"),Y=l(t,"collapsible",8,!1),w=l(t,"collapsed",12,!1);Y()&&de();function de(o=void 0){let s;const e=i().route.id??"";try{sessionStorage.SuperDebug&&(s=JSON.parse(sessionStorage.SuperDebug)),s={collapsed:s&&s.collapsed?s.collapsed:{}},s.collapsed[e]=o===void 0?s.collapsed[e]??w():o}catch{s={collapsed:{[e]:w()}}}o!==void 0&&(sessionStorage.SuperDebug=JSON.stringify(s)),w(s.collapsed[e])}let R=L();async function xe(o){if(!o.target)return;const s=o.target.closest(".super-debug");if(!s)return;const e=s.querySelector(".super-debug--code");e&&(clearTimeout(u(R)),await Ue(e.innerText),J(R,setTimeout(()=>J(R,void 0),900)))}function ae(o){return{name:o.name,size:o.size,type:o.type,lastModified:new Date(o.lastModified)}}function Z(o){switch(typeof o){case"function":return`<span class="function">[function ${o.name??"unnamed"}]</span>`;case"symbol":return`<span class="symbol">${o.toString()}</span>`}return JSON.stringify(o,function(e,r){if(r===void 0)return"#}#undefined";if(typeof this=="object"&&this[e]instanceof Date)return"#}D#"+(isNaN(this[e])?"Invalid Date":r);if(typeof r=="number"){if(r==Number.POSITIVE_INFINITY)return"#}#Inf";if(r==Number.NEGATIVE_INFINITY)return"#}#-Inf";if(isNaN(r))return"#}#NaN"}if(typeof r=="bigint")return"#}BI#"+r;if(typeof r=="function"&&ke())return`#}F#[function ${r.name}]`;if(r instanceof Error)return`#}E#${r.name}: ${r.message||r.cause||"(No error message)"}`;if(r instanceof Set)return Array.from(r);if(r instanceof Map)return Array.from(r.entries());if(typeof this=="object"&&typeof this[e]=="object"&&this[e]&&"toExponential"in this[e])return"#}DE#"+this[e].toString();if(typeof this=="object"&&this[e]instanceof File)return ae(this[e]);if(typeof this=="object"&&this[e]instanceof FileList){const _=this[e],q=[];for(let k=0;k<_.length;k++){const m=_.item(k);m&&q.push(ae(m))}return q}return r},2).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,function(e){let r="number";return/^"/.test(e)?/:$/.test(e)?(r="key",e=e.slice(1,-2)+":"):(r="string",e=j()>0&&e.length>j()?e.slice(0,j()/2)+`[..${e.length-j()}/${e.length}..]`+e.slice(-j()/2):e,e=='"#}#undefined"'?(r="undefined",e="undefined"):e.startsWith('"#}D#')?(r="date",e=e.slice(5,-1)):e=='"#}#NaN"'?(r="nan",e="NaN"):e=='"#}#Inf"'?(r="nan",e="Infinity"):e=='"#}#-Inf"'?(r="nan",e="-Infinity"):e.startsWith('"#}BI#')?(r="bigint",e=e.slice(6,-1)+"n"):e.startsWith('"#}F#')?(r="function",e=e.slice(5,-1)):e.startsWith('"#}E#')?(r="error",e=e.slice(5,-1)):e.startsWith('"#}DE#')&&(r="number",e=e.slice(6,-1))):/true|false/.test(e)?r="boolean":/null/.test(e)&&(r="null"),'<span class="'+r+'">'+e+"</span>"})}function Ne(o,s,e){return s?!1:e||typeof o=="object"&&o!==null&&"then"in o&&typeof o.then=="function"}function ne(o,s){return s?!1:typeof o=="object"&&o!==null&&"subscribe"in o&&typeof o.subscribe=="function"}pe(()=>b(te()),()=>{J(ee,te()==="vscode"?`
      --sd-vscode-bg-color: #1f1f1f;
      --sd-vscode-label-color: #cccccc;
      --sd-vscode-code-default: #8c8a89;
      --sd-vscode-code-key: #9cdcfe;
      --sd-vscode-code-string: #ce9171;
      --sd-vscode-code-number: #b5c180;
      --sd-vscode-code-boolean: #4a9cd6;
      --sd-vscode-code-null: #4a9cd6;
      --sd-vscode-code-undefined: #4a9cd6;
      --sd-vscode-code-nan: #4a9cd6;
      --sd-vscode-code-symbol: #4de0c5;
      --sd-vscode-sb-thumb-color: #35373a;
      --sd-vscode-sb-thumb-color-focus: #4b4d50;
    `:void 0)}),pe(()=>(b(B()),b(y()),ve),()=>{Pe(J(re,ne(B(),y())?B():ve(B())),"$debugData",n)}),We(),He();var ce=dr(),ie=I(ce);{var Se=o=>{var s=Ke();c(o,s)};D(ie,o=>{u(ye)||o(Se)})}var Ie=C(ie,2);{var Ce=o=>{var s=tr();let e;var r=f(s),_=f(r),q=f(_,!0);g(_);var k=C(_,2),m=f(k),De=f(m);{var Ee=d=>{var a=Xe();c(d,a)},je=d=>{var a=$e();c(d,a)};D(De,d=>{u(R)?d(je,!1):d(Ee)})}g(m);var Ae=C(m,2);{var Te=d=>{var a=er();let x;var N=f(a,!0);g(a),U(T=>{x=W(a,1,"",null,x,T),be(N,(i(),O(()=>i().status)))},[()=>({"super-debug--info":i().status<200,"super-debug--success":i().status>=200&&i().status<300,"super-debug--redirect":i().status>=300&&i().status<400,"super-debug--error":i().status>=400})],K),c(d,a)};D(Ae,d=>{_e()&&d(Te)})}g(k),g(r);var A=C(r,2);let le;var ue=f(A),Me=f(ue);Re(Me,t,"default",{},d=>{var a=H(),x=I(a);{var N=S=>{var M=H(),G=I(M);Be(G,E,V=>{var p=or();c(V,p)},(V,p)=>{var F=H(),Q=I(F);X(Q,()=>(b(u(p)),b(y()),b(me),O(()=>Z(ne(u(p),y())?me(u(p)):u(p))))),c(V,F)},(V,p)=>{var F=rr(),Q=C(I(F),2);X(Q,()=>(b(u(p)),O(()=>Z(u(p))))),c(V,F)}),c(S,M)},T=S=>{var M=H(),G=I(M);X(G,()=>(E(),O(()=>Z(E())))),c(S,M)};D(x,S=>{E(),b(y()),b(se()),O(()=>Ne(E(),y(),se()))?S(N):S(T,!1)})}c(d,a)}),g(ue),g(A),Je(A,d=>oe(d),()=>oe());var Ve=C(A,2);{var Fe=d=>{var a=sr(),x=f(a);let N;g(a),U(T=>N=W(x,0,"",null,N,T),[()=>({"super-debug--rotated":w()})],K),fe("click",a,Le(()=>de(!w()))),c(d,a)};D(Ve,d=>{Y()&&d(Fe)})}g(s),U((d,a)=>{e=W(s,1,"super-debug",null,e,d),qe(s,u(ee)),W(r,1,`super-debug--status ${P()===""?"super-debug--absolute super-debug--inset-x-0 super-debug--top-0":""}`),be(q,P()),le=W(A,1,"super-debug--pre",null,le,a),s.dir=s.dir},[()=>({"super-debug--collapsible":Y()}),()=>({"super-debug--with-label":P(),"super-debug--hidden":w()})],K),fe("click",m,xe),c(o,s)};D(Ie,o=>{we()&&o(Ce)})}c(v,ce),ze(),z()}export{kr as S};
