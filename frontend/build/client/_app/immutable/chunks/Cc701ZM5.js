const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./x3ogAcxn.js","./CPqTazQ0.js","./DDHWmqeV.js","./DhPhQCnN.js","./DS7N4xG4.js","./2pWo5_dW.js","./DIeogL5L.js","./Bzak7iHL.js","./69_IOA4Y.js","./Bik8CDZR.js","./C2HK-5eJ.js","./Ck4BDG7B.js","./BKGi4-1R.js","./B1TJtPpf.js","./MSPxrDcO.js","./Bi-WFMHF.js","./DVvhCpGc.js","./DMjP-jzq.js","./DaFf4ri-.js","./BosuxZz1.js","../assets/single-container.CAySGR8g.css","./1cTG7gyz.js"])))=>i.map(i=>d[i]);
import"./Bzak7iHL.js";import"./69_IOA4Y.js";import{o as si}from"./Bik8CDZR.js";import{p as ai,x as ri,aV as Re,aW as li,f as ci,a as di,b as ui,g as it,Q as Fe,N as Oe,ar as Vn}from"./2pWo5_dW.js";import{a as hi}from"./GPqFdkZn.js";import{T as fi,n as gi,c as pi,i as Un,a as jn,b as _i,e as an,f as Ct,g as vi,d as yo,h as bi,s as V,j as Xn,k as mo,l as He,m as We,y as ko,p as Kt,o as qn,C as yi,q as Ve,r as Yn,u as zt,v as Zn,w as xo,x as ye,z as mi,A as kn,B as ki,D as z,E as Te,U as xi,F as Se,G as j,H as xn,I as Q,J as So,K as Sn,L as Si,M as $n,N as pt,O as Mt,P as tt,Q as $o,R as $i,V as wi,W as Li,X as $e,Y as rn,Z as wo,_ as Lo,$ as Ei,a0 as Ni,a1 as Mi,a2 as Kn,a3 as pe,a4 as Ue,a5 as Pi,a6 as Ai}from"./DS7N4xG4.js";import{i as Ti}from"./DVvhCpGc.js";import{l as Qn,p as Ci}from"./DMjP-jzq.js";import{g as zi,c as Gi}from"./BosuxZz1.js";import{_ as we}from"./C1FmrZbK.js";class Ii extends Map{constructor(e,n=Ri){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),e!=null)for(const[o,i]of e)this.set(o,i)}get(e){return super.get(Jn(this,e))}has(e){return super.has(Jn(this,e))}set(e,n){return super.set(Di(this,e),n)}delete(e){return super.delete(Bi(this,e))}}function Jn({_intern:t,_key:e},n){const o=e(n);return t.has(o)?t.get(o):n}function Di({_intern:t,_key:e},n){const o=e(n);return t.has(o)?t.get(o):(t.set(o,n),n)}function Bi({_intern:t,_key:e},n){const o=e(n);return t.has(o)&&(n=t.get(o),t.delete(o)),n}function Ri(t){return t!==null&&typeof t=="object"?t.valueOf():t}function to(t){return t}function Fi(t,...e){return Oi(t,to,to,e)}function Oi(t,e,n,o){return(function i(s,r){if(r>=o.length)return n(s);const a=new Ii,l=o[r++];let c=-1;for(const u of s){const d=l(u,++c,s),p=a.get(d);p?p.push(u):a.set(d,[u])}for(const[u,d]of a)a.set(u,i(d,r));return e(a)})(t,0)}function J(t,e){let n;if(e===void 0)for(const o of t)o!=null&&(n<o||n===void 0&&o>=o)&&(n=o);else{let o=-1;for(let i of t)(i=e(i,++o,t))!=null&&(n<i||n===void 0&&i>=i)&&(n=i)}return n}function yt(t,e){let n;if(e===void 0)for(const o of t)o!=null&&(n>o||n===void 0&&o>=o)&&(n=o);else{let o=-1;for(let i of t)(i=e(i,++o,t))!=null&&(n>i||n===void 0&&i>=i)&&(n=i)}return n}function Hi(t,e){let n=0,o=0;if(e===void 0)for(let i of t)i!=null&&(i=+i)>=i&&(++n,o+=i);else{let i=-1;for(let s of t)(s=e(s,++i,t))!=null&&(s=+s)>=s&&(++n,o+=s)}if(n)return o/n}function Eo(t,e,n){t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n;for(var o=-1,i=Math.max(0,Math.ceil((e-t)/n))|0,s=new Array(i);++o<i;)s[o]=t+o*n;return s}function Wi(t,e){let n=0;if(e===void 0)for(let o of t)(o=+o)&&(n+=o);else{let o=-1;for(let i of t)(i=+e(i,++o,t))&&(n+=i)}return n}function Vi(t,e,n){var o=new fi,i=e;return o._restart=o.restart,o.restart=function(s,r,a){r=+r,a=a==null?gi():+a,o._restart(function l(c){c+=i,o._restart(l,i+=r,a),s(c)},r,a)},o.restart(t,e,n),o}function Ui(t,e){e||(e=[]);var n=t?Math.min(e.length,t.length):0,o=e.slice(),i;return function(s){for(i=0;i<n;++i)o[i]=t[i]*(1-s)+e[i]*s;return o}}function ji(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Xi(t,e){var n=e?e.length:0,o=t?Math.min(n,t.length):0,i=new Array(o),s=new Array(n),r;for(r=0;r<o;++r)i[r]=he(t[r],e[r]);for(;r<n;++r)s[r]=e[r];return function(a){for(r=0;r<o;++r)s[r]=i[r](a);return s}}function qi(t,e){var n=new Date;return t=+t,e=+e,function(o){return n.setTime(t*(1-o)+e*o),n}}function Yi(t,e){var n={},o={},i;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in t?n[i]=he(t[i],e[i]):o[i]=e[i];return function(s){for(i in n)o[i]=n[i](s);return o}}function he(t,e){var n=typeof e,o;return e==null||n==="boolean"?pi(e):(n==="number"?Un:n==="string"?(o=an(e))?(e=o,jn):_i:e instanceof an?jn:e instanceof Date?qi:ji(e)?Ui:Array.isArray(e)?Xi:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Yi:Un)(t,e)}var ln=Math.PI,cn=2*ln,Ft=1e-6,Zi=cn-Ft;function dn(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function wn(){return new dn}dn.prototype=wn.prototype={constructor:dn,moveTo:function(t,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},quadraticCurveTo:function(t,e,n,o){this._+="Q"+ +t+","+ +e+","+(this._x1=+n)+","+(this._y1=+o)},bezierCurveTo:function(t,e,n,o,i,s){this._+="C"+ +t+","+ +e+","+ +n+","+ +o+","+(this._x1=+i)+","+(this._y1=+s)},arcTo:function(t,e,n,o,i){t=+t,e=+e,n=+n,o=+o,i=+i;var s=this._x1,r=this._y1,a=n-t,l=o-e,c=s-t,u=r-e,d=c*c+u*u;if(i<0)throw new Error("negative radius: "+i);if(this._x1===null)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(d>Ft)if(!(Math.abs(u*a-l*c)>Ft)||!i)this._+="L"+(this._x1=t)+","+(this._y1=e);else{var p=n-s,y=o-r,_=a*a+l*l,x=p*p+y*y,g=Math.sqrt(_),v=Math.sqrt(d),m=i*Math.tan((ln-Math.acos((_+d-x)/(2*g*v)))/2),f=m/v,h=m/g;Math.abs(f-1)>Ft&&(this._+="L"+(t+f*c)+","+(e+f*u)),this._+="A"+i+","+i+",0,0,"+ +(u*p>c*y)+","+(this._x1=t+h*a)+","+(this._y1=e+h*l)}},arc:function(t,e,n,o,i,s){t=+t,e=+e,n=+n,s=!!s;var r=n*Math.cos(o),a=n*Math.sin(o),l=t+r,c=e+a,u=1^s,d=s?o-i:i-o;if(n<0)throw new Error("negative radius: "+n);this._x1===null?this._+="M"+l+","+c:(Math.abs(this._x1-l)>Ft||Math.abs(this._y1-c)>Ft)&&(this._+="L"+l+","+c),n&&(d<0&&(d=d%cn+cn),d>Zi?this._+="A"+n+","+n+",0,1,"+u+","+(t-r)+","+(e-a)+"A"+n+","+n+",0,1,"+u+","+(this._x1=l)+","+(this._y1=c):d>Ft&&(this._+="A"+n+","+n+",0,"+ +(d>=ln)+","+u+","+(this._x1=t+n*Math.cos(i))+","+(this._y1=e+n*Math.sin(i))))},rect:function(t,e,n,o){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +n+"v"+ +o+"h"+-n+"Z"},toString:function(){return this._}};function bt(t){return function(){return t}}var eo=Math.abs,rt=Math.atan2,Rt=Math.cos,Ki=Math.max,je=Math.min,$t=Math.sin,Xt=Math.sqrt,ut=1e-12,ce=Math.PI,Le=ce/2,Qi=2*ce;function Ji(t){return t>1?0:t<-1?ce:Math.acos(t)}function no(t){return t>=1?Le:t<=-1?-Le:Math.asin(t)}function ts(t){return t.innerRadius}function es(t){return t.outerRadius}function ns(t){return t.startAngle}function os(t){return t.endAngle}function is(t){return t&&t.padAngle}function ss(t,e,n,o,i,s,r,a){var l=n-t,c=o-e,u=r-i,d=a-s,p=d*l-u*c;if(!(p*p<ut))return p=(u*(e-s)-d*(t-i))/p,[t+p*l,e+p*c]}function _e(t,e,n,o,i,s,r){var a=t-n,l=e-o,c=(r?s:-s)/Xt(a*a+l*l),u=c*l,d=-c*a,p=t+u,y=e+d,_=n+u,x=o+d,g=(p+_)/2,v=(y+x)/2,m=_-p,f=x-y,h=m*m+f*f,k=i-s,S=p*x-_*y,N=(f<0?-1:1)*Xt(Ki(0,k*k*h-S*S)),L=(S*f-m*N)/h,b=(-S*m-f*N)/h,T=(S*f+m*N)/h,C=(-S*m+f*N)/h,w=L-g,$=b-v,P=T-g,E=C-v;return w*w+$*$>P*P+E*E&&(L=T,b=C),{cx:L,cy:b,x01:-u,y01:-d,x11:L*(i/k-1),y11:b*(i/k-1)}}function as(){var t=ts,e=es,n=bt(0),o=null,i=ns,s=os,r=is,a=null;function l(){var c,u,d=+t.apply(this,arguments),p=+e.apply(this,arguments),y=i.apply(this,arguments)-Le,_=s.apply(this,arguments)-Le,x=eo(_-y),g=_>y;if(a||(a=c=wn()),p<d&&(u=p,p=d,d=u),!(p>ut))a.moveTo(0,0);else if(x>Qi-ut)a.moveTo(p*Rt(y),p*$t(y)),a.arc(0,0,p,y,_,!g),d>ut&&(a.moveTo(d*Rt(_),d*$t(_)),a.arc(0,0,d,_,y,g));else{var v=y,m=_,f=y,h=_,k=x,S=x,N=r.apply(this,arguments)/2,L=N>ut&&(o?+o.apply(this,arguments):Xt(d*d+p*p)),b=je(eo(p-d)/2,+n.apply(this,arguments)),T=b,C=b,w,$;if(L>ut){var P=no(L/d*$t(N)),E=no(L/p*$t(N));(k-=P*2)>ut?(P*=g?1:-1,f+=P,h-=P):(k=0,f=h=(y+_)/2),(S-=E*2)>ut?(E*=g?1:-1,v+=E,m-=E):(S=0,v=m=(y+_)/2)}var M=p*Rt(v),A=p*$t(v),D=d*Rt(h),I=d*$t(h);if(b>ut){var R=p*Rt(m),G=p*$t(m),B=d*Rt(f),U=d*$t(f),W;if(x<ce&&(W=ss(M,A,B,U,R,G,D,I))){var Y=M-W[0],X=A-W[1],H=R-W[0],q=G-W[1],st=1/$t(Ji((Y*H+X*q)/(Xt(Y*Y+X*X)*Xt(H*H+q*q)))/2),Z=Xt(W[0]*W[0]+W[1]*W[1]);T=je(b,(d-Z)/(st-1)),C=je(b,(p-Z)/(st+1))}}S>ut?C>ut?(w=_e(B,U,M,A,p,C,g),$=_e(R,G,D,I,p,C,g),a.moveTo(w.cx+w.x01,w.cy+w.y01),C<b?a.arc(w.cx,w.cy,C,rt(w.y01,w.x01),rt($.y01,$.x01),!g):(a.arc(w.cx,w.cy,C,rt(w.y01,w.x01),rt(w.y11,w.x11),!g),a.arc(0,0,p,rt(w.cy+w.y11,w.cx+w.x11),rt($.cy+$.y11,$.cx+$.x11),!g),a.arc($.cx,$.cy,C,rt($.y11,$.x11),rt($.y01,$.x01),!g))):(a.moveTo(M,A),a.arc(0,0,p,v,m,!g)):a.moveTo(M,A),!(d>ut)||!(k>ut)?a.lineTo(D,I):T>ut?(w=_e(D,I,R,G,d,-T,g),$=_e(M,A,B,U,d,-T,g),a.lineTo(w.cx+w.x01,w.cy+w.y01),T<b?a.arc(w.cx,w.cy,T,rt(w.y01,w.x01),rt($.y01,$.x01),!g):(a.arc(w.cx,w.cy,T,rt(w.y01,w.x01),rt(w.y11,w.x11),!g),a.arc(0,0,d,rt(w.cy+w.y11,w.cx+w.x11),rt($.cy+$.y11,$.cx+$.x11),g),a.arc($.cx,$.cy,T,rt($.y11,$.x11),rt($.y01,$.x01),!g))):a.arc(0,0,d,h,f,g)}if(a.closePath(),c)return a=null,c+""||null}return l.centroid=function(){var c=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,u=(+i.apply(this,arguments)+ +s.apply(this,arguments))/2-ce/2;return[Rt(u)*c,$t(u)*c]},l.innerRadius=function(c){return arguments.length?(t=typeof c=="function"?c:bt(+c),l):t},l.outerRadius=function(c){return arguments.length?(e=typeof c=="function"?c:bt(+c),l):e},l.cornerRadius=function(c){return arguments.length?(n=typeof c=="function"?c:bt(+c),l):n},l.padRadius=function(c){return arguments.length?(o=c==null?null:typeof c=="function"?c:bt(+c),l):o},l.startAngle=function(c){return arguments.length?(i=typeof c=="function"?c:bt(+c),l):i},l.endAngle=function(c){return arguments.length?(s=typeof c=="function"?c:bt(+c),l):s},l.padAngle=function(c){return arguments.length?(r=typeof c=="function"?c:bt(+c),l):r},l.context=function(c){return arguments.length?(a=c??null,l):a},l}function No(t){this._context=t}No.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e);break}}};function rs(t){return new No(t)}function ls(t){return t[0]}function cs(t){return t[1]}function ds(){var t=ls,e=cs,n=bt(!0),o=null,i=rs,s=null;function r(a){var l,c=a.length,u,d=!1,p;for(o==null&&(s=i(p=wn())),l=0;l<=c;++l)!(l<c&&n(u=a[l],l,a))===d&&((d=!d)?s.lineStart():s.lineEnd()),d&&s.point(+t(u,l,a),+e(u,l,a));if(p)return s=null,p+""||null}return r.x=function(a){return arguments.length?(t=typeof a=="function"?a:bt(+a),r):t},r.y=function(a){return arguments.length?(e=typeof a=="function"?a:bt(+a),r):e},r.defined=function(a){return arguments.length?(n=typeof a=="function"?a:bt(!!a),r):n},r.curve=function(a){return arguments.length?(i=a,o!=null&&(s=i(o)),r):i},r.context=function(a){return arguments.length?(a==null?o=s=null:s=i(o=a),r):o},r}function oo(){}function un(t,e,n){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-n),t._x2,t._y2)}function Mo(t,e){this._context=t,this._k=(1-e)/6}Mo.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:un(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:un(this,t,e);break}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};const us=(function t(e){function n(o){return new Mo(o,e)}return n.tension=function(o){return t(+o)},n})(0);function Po(t,e){this._context=t,this._k=(1-e)/6}Po.prototype={areaStart:oo,areaEnd:oo,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x3,this._y3),this._context.closePath();break}case 2:{this._context.lineTo(this._x3,this._y3),this._context.closePath();break}case 3:{this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5);break}}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:un(this,t,e);break}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};const hs=(function t(e){function n(o){return new Po(o,e)}return n.tension=function(o){return t(+o)},n})(0);function me(t,e=6,n=2*Math.PI,o=!1){const i=e===4?Math.sqrt(.5)*t:t/3.6*2,s=e===4?Math.PI/4:0,r=n-s,a=(r<0?n:r)/(2*Math.PI),l=Math.ceil(e*a),c=1/e*Math.PI*2,u=(Math.PI-c)/2,d=Eo(l+(r>=0?1:0)).map((y,_)=>{const x=_===l||l===1&&r<0;let g=x&&a*e%1||1;r<0&&(g+=.5);const v=c*(_-1+g);let m;if(x){const f=Math.PI-u-c*g;m=i*Math.sin(u)/Math.sin(f)}else m=i;return{x:Math.sin(v+s)*m,y:-Math.cos(v+s)*m}});if(e===4){const y=c*-.5,_=Math.PI*.5,x=i*Math.sin(u)/Math.sin(_);d.unshift({x:Math.sin(y+s)*x,y:-Math.cos(y+s)*x})}return ds().x(y=>y.x).y(y=>y.y).curve((o?us:hs).tension(.95))(d)}function fs({x:t,y:e,w:n,h:o,r:i=0,score:s=1}){let r,c=s;const u=yt([n*.5*(c/.125)+i,n*.5-i]);if(r=`M${t+n*.5},${e}h${u}`,c=s-1/8,c>0){r+=`a${i},${i} 0 0 1 ${i},${i}`;const d=Ct(o*(c/.25)-i,0,o-2*i);r+=`v${d}`}if(c=s-3/8,c>0){r+=`a${i},${i} 0 0 1 ${-i},${i}`;const d=Ct(i-n*(c/.25),2*i-n,0);r+=`h${d}`}if(c=s-5/8,c>0){r+=`a${i},${i} 0 0 1 ${-i},${-i}`;const d=Ct(i-o*(c/.25),2*i-o,0);r+=`v${d}`}if(c=s-7/8,c>0){r+=`a${i},${i} 0 0 1 ${i},${-i}`;const d=J([n*.5*(c/.125)-i,0]);r+=`h${d}`}return r}var Wt;(function(t){t.Start="start",t.Middle="middle",t.End="end"})(Wt||(Wt={}));var io;(function(t){t.Top="top",t.Middle="middle",t.Bottom="bottom"})(io||(io={}));var so;(function(t){t.Wrap="wrap",t.Trim="trim"})(so||(so={}));var ao;(function(t){t.Left="left",t.Center="center",t.Right="right"})(ao||(ao={}));var Ao={exports:{}};(function(t){(function(e){if(typeof n!="function"){var n=function(_){return _};n.nonNative=!0}const o=n("plaintext"),i=n("html"),s=n("comment"),r=/<(\w*)>/g,a=/<\/?([^\s\/>]+)/;function l(_,x,g){_=_||"",x=x||[],g=g||"";let v=u(x,g);return d(_,v)}function c(_,x){_=_||[],x=x||"";let g=u(_,x);return function(m){return d(m||"",g)}}l.init_streaming_mode=c;function u(_,x){return _=p(_),{allowable_tags:_,tag_replacement:x,state:o,tag_buffer:"",depth:0,in_quote_char:""}}function d(_,x){if(typeof _!="string")throw new TypeError("'html' parameter must be a string");let g=x.allowable_tags,v=x.tag_replacement,m=x.state,f=x.tag_buffer,h=x.depth,k=x.in_quote_char,S="";for(let N=0,L=_.length;N<L;N++){let b=_[N];if(m===o)switch(b){case"<":m=i,f+=b;break;default:S+=b;break}else if(m===i)switch(b){case"<":if(k)break;h++;break;case">":if(k)break;if(h){h--;break}k="",m=o,f+=">",g.has(y(f))?S+=f:S+=v,f="";break;case'"':case"'":b===k?k="":k=k||b,f+=b;break;case"-":f==="<!-"&&(m=s),f+=b;break;case" ":case`
`:if(f==="<"){m=o,S+="< ",f="";break}f+=b;break;default:f+=b;break}else if(m===s)switch(b){case">":f.slice(-2)=="--"&&(m=o),f="";break;default:f+=b;break}}return x.state=m,x.tag_buffer=f,x.depth=h,x.in_quote_char=k,S}function p(_){let x=new Set;if(typeof _=="string"){let g;for(;g=r.exec(_);)x.add(g[1])}else!n.nonNative&&typeof _[n.iterator]=="function"?x=new Set(_):typeof _.forEach=="function"&&_.forEach(x.add,x);return x}function y(_){let x=a.exec(_);return x?x[1].toLowerCase():null}t.exports?t.exports=l:e.striptags=l})(Gi)})(Ao);var gs=Ao.exports;const ps=zi(gs);function _s(t,e=15){return t?t.length>e?`…${t.substr(t.length-e,e)}`:t:""}function vs(t,e=15){if(!t)return"";const n=Math.floor((e-3)/2);return t.length>e?`${t.substr(0,n)}…${t.substr(-n,n)}`:t}function bs(t,e=15){return t?t.length>e?`${t.substr(0,e)}…`:t:""}function Ee(t,e=15,n=Wt.Middle){if(!t)return"";let o=bs(t,e);return n===Wt.Start?o=_s(t,e):n===Wt.Middle&&(o=vs(t,e)),o}function ys(t,e,n=vi()){return t.length*e*n||0}const ms=["text","tspan","textPath","altGlyph","altGlyphDef","altGlyphItem","glyphRef","textRef","textArea"],ve=t=>()=>t;function hn(t,{sourceEvent:e,subject:n,target:o,identifier:i,active:s,x:r,y:a,dx:l,dy:c,dispatch:u}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:o,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:s,enumerable:!0,configurable:!0},x:{value:r,enumerable:!0,configurable:!0},y:{value:a,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:c,enumerable:!0,configurable:!0},_:{value:u}})}hn.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};function ks(t){return!t.ctrlKey&&!t.button}function xs(){return this.parentNode}function Ss(t,e){return e??{x:t.x,y:t.y}}function $s(){return navigator.maxTouchPoints||"ontouchstart"in this}function ws(){var t=ks,e=xs,n=Ss,o=$s,i={},s=yo("start","drag","end"),r=0,a,l,c,u,d=0;function p(h){h.on("mousedown.drag",y).filter(o).on("touchstart.drag",g).on("touchmove.drag",v,bi).on("touchend.drag touchcancel.drag",m).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function y(h,k){if(!(u||!t.call(this,h,k))){var S=f(this,e.call(this,h,k),h,k,"mouse");S&&(V(h.view).on("mousemove.drag",_,Xn).on("mouseup.drag",x,Xn),mo(h.view),He(h),c=!1,a=h.clientX,l=h.clientY,S("start",h))}}function _(h){if(We(h),!c){var k=h.clientX-a,S=h.clientY-l;c=k*k+S*S>d}i.mouse("drag",h)}function x(h){V(h.view).on("mousemove.drag mouseup.drag",null),ko(h.view,c),We(h),i.mouse("end",h)}function g(h,k){if(t.call(this,h,k)){var S=h.changedTouches,N=e.call(this,h,k),L=S.length,b,T;for(b=0;b<L;++b)(T=f(this,N,h,k,S[b].identifier,S[b]))&&(He(h),T("start",h,S[b]))}}function v(h){var k=h.changedTouches,S=k.length,N,L;for(N=0;N<S;++N)(L=i[k[N].identifier])&&(We(h),L("drag",h,k[N]))}function m(h){var k=h.changedTouches,S=k.length,N,L;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),N=0;N<S;++N)(L=i[k[N].identifier])&&(He(h),L("end",h,k[N]))}function f(h,k,S,N,L,b){var T=s.copy(),C=Kt(b||S,k),w,$,P;if((P=n.call(h,new hn("beforestart",{sourceEvent:S,target:p,identifier:L,active:r,x:C[0],y:C[1],dx:0,dy:0,dispatch:T}),N))!=null)return w=P.x-C[0]||0,$=P.y-C[1]||0,function E(M,A,D){var I=C,R;switch(M){case"start":i[L]=E,R=r++;break;case"end":delete i[L],--r;case"drag":C=Kt(D||A,k),R=r;break}T.call(M,h,new hn(M,{sourceEvent:A,subject:P,target:p,identifier:L,active:R,x:C[0]+w,y:C[1]+$,dx:C[0]-I[0],dy:C[1]-I[1],dispatch:T}),N)}}return p.filter=function(h){return arguments.length?(t=typeof h=="function"?h:ve(!!h),p):t},p.container=function(h){return arguments.length?(e=typeof h=="function"?h:ve(h),p):e},p.subject=function(h){return arguments.length?(n=typeof h=="function"?h:ve(h),p):n},p.touchable=function(h){return arguments.length?(o=typeof h=="function"?h:ve(!!h),p):o},p.on=function(){var h=s.on.apply(s,arguments);return h===s?p:h},p.clickDistance=function(h){return arguments.length?(d=(h=+h)*h,p):Math.sqrt(d)},p}const Xe=t=>()=>t;function Ls(t,{sourceEvent:e,target:n,selection:o,mode:i,dispatch:s}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},selection:{value:o,enumerable:!0,configurable:!0},mode:{value:i,enumerable:!0,configurable:!0},_:{value:s}})}function Es(t){t.stopImmediatePropagation()}function qe(t){t.preventDefault(),t.stopImmediatePropagation()}var ro={name:"drag"},Ye={name:"space"},Ut={name:"handle"},jt={name:"center"};const{abs:lo,max:lt,min:ct}=Math;function co(t){return[+t[0],+t[1]]}function fn(t){return[co(t[0]),co(t[1])]}var Ze={},Ke={},Ns={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(gn),input:function(t){return t==null?null:fn(t)},output:function(t){return t}},Nt={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},uo={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},ho={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},Ms={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},Ps={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function gn(t){return{type:t}}function As(t){return!t.ctrlKey&&!t.button}function Ts(){var t=this.ownerSVGElement||this;return t.hasAttribute("viewBox")?(t=t.viewBox.baseVal,[[t.x,t.y],[t.x+t.width,t.y+t.height]]):[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Cs(){return navigator.maxTouchPoints||"ontouchstart"in this}function Qe(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function zs(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Gs(){return Is(Ns)}function Is(t){var e=Ts,n=As,o=Cs,i=!0,s=yo("start","brush","end"),r=6,a;function l(g){var v=g.property("__brush",x).selectAll(".overlay").data([gn("overlay")]);v.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",Nt.overlay).merge(v).each(function(){var f=Qe(this).extent;V(this).attr("x",f[0][0]).attr("y",f[0][1]).attr("width",f[1][0]-f[0][0]).attr("height",f[1][1]-f[0][1])}),g.selectAll(".selection").data([gn("selection")]).enter().append("rect").attr("class","selection").attr("cursor",Nt.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var m=g.selectAll(".handle").data(t.handles,function(f){return f.type});m.exit().remove(),m.enter().append("rect").attr("class",function(f){return"handle handle--"+f.type}).attr("cursor",function(f){return Nt[f.type]}),g.each(c).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",p).filter(o).on("touchstart.brush",p).on("touchmove.brush",y).on("touchend.brush touchcancel.brush",_).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}l.move=function(g,v,m){g.tween?g.on("start.brush",function(f){u(this,arguments).beforestart().start(f)}).on("interrupt.brush end.brush",function(f){u(this,arguments).end(f)}).tween("brush",function(){var f=this,h=f.__brush,k=u(f,arguments),S=h.selection,N=t.input(typeof v=="function"?v.apply(this,arguments):v,h.extent),L=he(S,N);function b(T){h.selection=T===1&&N===null?null:L(T),c.call(f),k.brush()}return S!==null&&N!==null?b:b(1)}):g.each(function(){var f=this,h=arguments,k=f.__brush,S=t.input(typeof v=="function"?v.apply(f,h):v,k.extent),N=u(f,h).beforestart();qn(f),k.selection=S===null?null:S,c.call(f),N.start(m).brush(m).end(m)})},l.clear=function(g,v){l.move(g,null,v)};function c(){var g=V(this),v=Qe(this).selection;v?(g.selectAll(".selection").style("display",null).attr("x",v[0][0]).attr("y",v[0][1]).attr("width",v[1][0]-v[0][0]).attr("height",v[1][1]-v[0][1]),g.selectAll(".handle").style("display",null).attr("x",function(m){return m.type[m.type.length-1]==="e"?v[1][0]-r/2:v[0][0]-r/2}).attr("y",function(m){return m.type[0]==="s"?v[1][1]-r/2:v[0][1]-r/2}).attr("width",function(m){return m.type==="n"||m.type==="s"?v[1][0]-v[0][0]+r:r}).attr("height",function(m){return m.type==="e"||m.type==="w"?v[1][1]-v[0][1]+r:r})):g.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function u(g,v,m){var f=g.__brush.emitter;return f&&(!m||!f.clean)?f:new d(g,v,m)}function d(g,v,m){this.that=g,this.args=v,this.state=g.__brush,this.active=0,this.clean=m}d.prototype={beforestart:function(){return++this.active===1&&(this.state.emitter=this,this.starting=!0),this},start:function(g,v){return this.starting?(this.starting=!1,this.emit("start",g,v)):this.emit("brush",g),this},brush:function(g,v){return this.emit("brush",g,v),this},end:function(g,v){return--this.active===0&&(delete this.state.emitter,this.emit("end",g,v)),this},emit:function(g,v,m){var f=V(this.that).datum();s.call(g,this.that,new Ls(g,{sourceEvent:v,target:l,selection:t.output(this.state.selection),mode:m,dispatch:s}),f)}};function p(g){if(a&&!g.touches||!n.apply(this,arguments))return;var v=this,m=g.target.__data__.type,f=(i&&g.metaKey?m="overlay":m)==="selection"?ro:i&&g.altKey?jt:Ut,h=t===Ke?null:Ms[m],k=t===Ze?null:Ps[m],S=Qe(v),N=S.extent,L=S.selection,b=N[0][0],T,C,w=N[0][1],$,P,E=N[1][0],M,A,D=N[1][1],I,R,G=0,B=0,U,W=h&&k&&i&&g.shiftKey,Y,X,H=Array.from(g.touches||[g],F=>{const K=F.identifier;return F=Kt(F,v),F.point0=F.slice(),F.identifier=K,F});qn(v);var q=u(v,arguments,!0).beforestart();if(m==="overlay"){L&&(U=!0);const F=[H[0],H[1]||H[0]];S.selection=L=[[T=t===Ke?b:ct(F[0][0],F[1][0]),$=t===Ze?w:ct(F[0][1],F[1][1])],[M=t===Ke?E:lt(F[0][0],F[1][0]),I=t===Ze?D:lt(F[0][1],F[1][1])]],H.length>1&&dt(g)}else T=L[0][0],$=L[0][1],M=L[1][0],I=L[1][1];C=T,P=$,A=M,R=I;var st=V(v).attr("pointer-events","none"),Z=st.selectAll(".overlay").attr("cursor",Nt[m]);if(g.touches)q.moved=ht,q.ended=Lt;else{var ot=V(g.view).on("mousemove.brush",ht,!0).on("mouseup.brush",Lt,!0);i&&ot.on("keydown.brush",mt,!0).on("keyup.brush",ie,!0),mo(g.view)}c.call(v),q.start(g,f.name);function ht(F){for(const K of F.changedTouches||[F])for(const Et of H)Et.identifier===K.identifier&&(Et.cur=Kt(K,v));if(W&&!Y&&!X&&H.length===1){const K=H[0];lo(K.cur[0]-K[0])>lo(K.cur[1]-K[1])?X=!0:Y=!0}for(const K of H)K.cur&&(K[0]=K.cur[0],K[1]=K.cur[1]);U=!0,qe(F),dt(F)}function dt(F){const K=H[0],Et=K.point0;var _t;switch(G=K[0]-Et[0],B=K[1]-Et[1],f){case Ye:case ro:{h&&(G=lt(b-T,ct(E-M,G)),C=T+G,A=M+G),k&&(B=lt(w-$,ct(D-I,B)),P=$+B,R=I+B);break}case Ut:{H[1]?(h&&(C=lt(b,ct(E,H[0][0])),A=lt(b,ct(E,H[1][0])),h=1),k&&(P=lt(w,ct(D,H[0][1])),R=lt(w,ct(D,H[1][1])),k=1)):(h<0?(G=lt(b-T,ct(E-T,G)),C=T+G,A=M):h>0&&(G=lt(b-M,ct(E-M,G)),C=T,A=M+G),k<0?(B=lt(w-$,ct(D-$,B)),P=$+B,R=I):k>0&&(B=lt(w-I,ct(D-I,B)),P=$,R=I+B));break}case jt:{h&&(C=lt(b,ct(E,T-G*h)),A=lt(b,ct(E,M+G*h))),k&&(P=lt(w,ct(D,$-B*k)),R=lt(w,ct(D,I+B*k)));break}}A<C&&(h*=-1,_t=T,T=M,M=_t,_t=C,C=A,A=_t,m in uo&&Z.attr("cursor",Nt[m=uo[m]])),R<P&&(k*=-1,_t=$,$=I,I=_t,_t=P,P=R,R=_t,m in ho&&Z.attr("cursor",Nt[m=ho[m]])),S.selection&&(L=S.selection),Y&&(C=L[0][0],A=L[1][0]),X&&(P=L[0][1],R=L[1][1]),(L[0][0]!==C||L[0][1]!==P||L[1][0]!==A||L[1][1]!==R)&&(S.selection=[[C,P],[A,R]],c.call(v),q.brush(F,f.name))}function Lt(F){if(Es(F),F.touches){if(F.touches.length)return;a&&clearTimeout(a),a=setTimeout(function(){a=null},500)}else ko(F.view,U),ot.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);st.attr("pointer-events","all"),Z.attr("cursor",Nt.overlay),S.selection&&(L=S.selection),zs(L)&&(S.selection=null,c.call(v)),q.end(F,f.name)}function mt(F){switch(F.keyCode){case 16:{W=h&&k;break}case 18:{f===Ut&&(h&&(M=A-G*h,T=C+G*h),k&&(I=R-B*k,$=P+B*k),f=jt,dt(F));break}case 32:{(f===Ut||f===jt)&&(h<0?M=A-G:h>0&&(T=C-G),k<0?I=R-B:k>0&&($=P-B),f=Ye,Z.attr("cursor",Nt.selection),dt(F));break}default:return}qe(F)}function ie(F){switch(F.keyCode){case 16:{W&&(Y=X=W=!1,dt(F));break}case 18:{f===jt&&(h<0?M=A:h>0&&(T=C),k<0?I=R:k>0&&($=P),f=Ut,dt(F));break}case 32:{f===Ye&&(F.altKey?(h&&(M=A-G*h,T=C+G*h),k&&(I=R-B*k,$=P+B*k),f=jt):(h<0?M=A:h>0&&(T=C),k<0?I=R:k>0&&($=P),f=Ut),Z.attr("cursor",Nt[m]),dt(F));break}default:return}qe(F)}}function y(g){u(this,arguments).moved(g)}function _(g){u(this,arguments).ended(g)}function x(){var g=this.__brush||{selection:null};return g.extent=fn(e.apply(this,arguments)),g.dim=t,g}return l.extent=function(g){return arguments.length?(e=typeof g=="function"?g:Xe(fn(g)),l):e},l.filter=function(g){return arguments.length?(n=typeof g=="function"?g:Xe(!!g),l):n},l.touchable=function(g){return arguments.length?(o=typeof g=="function"?g:Xe(!!g),l):o},l.handleSize=function(g){return arguments.length?(r=+g,l):r},l.keyModifiers=function(g){return arguments.length?(i=!!g,l):i},l.on=function(){var g=s.on.apply(s,arguments);return g===s?l:g},l}class Ds extends yi{constructor(){super(...arguments),this._nodes=[],this._links=[],this._inputNodesMap=new Map,this._nodesMap=new Map,this.nodeId=e=>Ve(e.id)||isFinite(e.id)?`${e.id}`:void 0,this.linkId=e=>Ve(e.id)||isFinite(e.id)?`${e.id}`:void 0}getNodeById(e){return this._nodesMap.get(e)}get data(){return this._data}set data(e){var n,o;if(!e)return;this._data=e;const i=this.nodes,s=this.links;this._inputNodesMap.clear(),this._nodesMap.clear();const r=Yn((n=e==null?void 0:e.nodes)!==null&&n!==void 0?n:[]),a=Yn((o=e==null?void 0:e.links)!==null&&o!==void 0?o:[]);this.transferState(r,i,this.nodeId),this.transferState(a,s,this.linkId),r.forEach((l,c)=>{l._index=c,l._id=this.nodeId(l)||`${c}`,this._inputNodesMap.set(l,e.nodes[c]),this._nodesMap.set(l._id,l)}),zt(this.nodeSort)&&r.sort(this.nodeSort),a.forEach((l,c)=>{l._indexGlobal=c,l.source=this.findNode(r,l.source),l.target=this.findNode(r,l.target)}),a.forEach((l,c)=>{if(!Zn(l._index)&&!Zn(l._neighbours))return;const u=a.filter(d=>l.source===d.source&&l.target===d.target||l.source===d.target&&l.target===d.source);u.forEach((d,p)=>{var y,_;d._index=p,d._id=this.linkId(d)||`${(y=d.source)===null||y===void 0?void 0:y._id}-${(_=d.target)===null||_===void 0?void 0:_._id}-${p}`,d._neighbours=u.length,d._direction=l.source===d.source&&l.target===d.target?1:-1})}),r.forEach(l=>{l.links=a.filter(c=>c.source===l||c.target===l),l._isConnected=l.links.length!==0}),this._nonConnectedNodes=r.filter(l=>!l._isConnected),this._connectedNodes=xo(r,...this._nonConnectedNodes),this._nodes=r,this._links=a.filter(l=>l.source&&l.target)}get nodes(){return this._nodes}get links(){return this._links}get connectedNodes(){return this._connectedNodes}get nonConnectedNodes(){return this._nonConnectedNodes}findNode(e,n){let o;return ye(n)?o=e[n]:Ve(n)?o=e.find(i=>this.nodeId(i)===n):mi(n)&&(o=e.find(i=>kn(this._inputNodesMap.get(i),n))),o||console.warn(`Unovis | Graph Data Model: Node ${n} is missing from the nodes list`),o}transferState(e,n,o){for(const i of e){const s=n.find(r=>o(r)===o(i));s?i._state=Object.assign({},s._state):i._state={}}}setNodeStateById(e,n){const o=this.getNodeById(e);if(!o){console.warn(`Unovis | Graph Data Model: Node ${e} not found`);return}o._state=n}}function Ce(t,e,n,o){function i(s){return s instanceof n?s:new n(function(r){r(s)})}return new(n||(n=Promise))(function(s,r){function a(u){try{c(o.next(u))}catch(d){r(d)}}function l(u){try{c(o.throw(u))}catch(d){r(d)}}function c(u){u.done?s(u.value):i(u.value).then(a,l)}c((o=o.apply(t,e||[])).next())})}var at;(function(t){t.Circular="circular",t.Concentric="concentric",t.Parallel="parallel",t.ParallelHorizontal="parallel horizontal",t.Dagre="dagre",t.Force="force",t.Elk="elk",t.Precalculated="precalculated"})(at||(at={}));var Ne;(function(t){t.Dashed="dashed",t.Solid="solid"})(Ne||(Ne={}));var Qt;(function(t){t.Single="single",t.Double="double"})(Qt||(Qt={}));var nt;(function(t){t.Circle="circle",t.Square="square",t.Hexagon="hexagon",t.Triangle="triangle"})(nt||(nt={}));var qt;(function(t){t.None="none",t.Greyout="greyout",t.GreyoutNonConnected="greyout-non-connected"})(qt||(qt={}));var Tt;(function(t){t.Center="center",t.Top="top",t.Bottom="bottom",t.Left="left",t.Right="right"})(Tt||(Tt={}));const Bs=Object.assign(Object.assign({},ki),{duration:1e3,zoomScaleExtent:[.35,1.25],disableZoom:!1,zoomEventFilter:void 0,disableDrag:!1,disableBrush:!1,zoomThrottledUpdateNodeThreshold:100,layoutType:at.Force,layoutAutofit:!0,layoutAutofitTolerance:8,layoutNonConnectedAside:!1,fitViewPadding:50,fitViewAlign:Tt.Center,layoutGroupOrder:[],layoutParallelSubGroupsPerRow:1,layoutParallelNodesPerColumn:6,layoutParallelGroupSpacing:void 0,layoutParallelSortConnectionsByGroup:void 0,layoutNodeGroup:t=>t.group,layoutParallelNodeSubGroup:t=>t.subgroup,forceLayoutSettings:{linkDistance:60,linkStrength:.45,charge:-500,forceXStrength:.15,forceYStrength:.25,numIterations:void 0,fixNodePositionAfterSimulation:!1},dagreLayoutSettings:{rankdir:"BT",ranker:"longest-path"},layoutElkSettings:void 0,layoutElkNodeGroups:void 0,layoutElkGetNodeShape:void 0,linkFlowAnimDuration:2e4,linkFlowParticleSize:2,linkFlowParticleSpeed:void 0,linkWidth:1,linkStyle:Ne.Solid,linkBandWidth:0,linkArrow:void 0,linkStroke:void 0,linkFlow:!1,linkLabel:void 0,linkLabelShiftFromCenter:!0,linkNeighborSpacing:8,linkDisabled:!1,linkCurvature:0,linkHighlightOnHover:!0,linkSourcePointOffset:void 0,linkTargetPointOffset:void 0,selectedLinkId:void 0,nodeSize:30,nodeStrokeWidth:3,nodeShape:nt.Circle,nodeGaugeValue:0,nodeIcon:t=>t.icon,nodeIconSize:void 0,nodeLabel:t=>t.label,nodeLabelTrim:!0,nodeLabelTrimLength:15,nodeLabelTrimMode:Wt.Middle,nodeSubLabel:"",nodeSubLabelTrim:!0,nodeSubLabelTrimLength:15,nodeSubLabelTrimMode:Wt.Middle,nodeSideLabels:void 0,nodeBottomIcon:void 0,nodeDisabled:!1,nodeFill:t=>t.fill,nodeGaugeFill:void 0,nodeStroke:t=>t.stroke,nodeEnterPosition:void 0,nodeEnterScale:.75,nodeExitPosition:void 0,nodeExitScale:.75,nodeSort:void 0,nodeSelectionHighlightMode:qt.GreyoutNonConnected,nodeGaugeAnimDuration:1500,selectedNodeId:void 0,selectedNodeIds:void 0,panels:void 0,onNodeDragStart:void 0,onNodeDrag:void 0,onNodeDragEnd:void 0,onZoom:void 0,onZoomStart:void 0,onZoomEnd:void 0,onLayoutCalculated:void 0,onNodeSelectionBrush:void 0,onNodeSelectionDrag:void 0,onRenderComplete:void 0,shouldDataUpdate:(t,e)=>!kn(t,e)}),Ln=z`
  label: nodes;
`,Rs=Te`
  :root {
    /* Node Fill */
    --vis-graph-node-stroke-color: rgb(206, 211, 222);
    --vis-graph-node-fill-color: #fff;
    --vis-graph-node-gauge-color: #adb4c2;
    --vis-graph-node-selection-color: #acb3b8;

    --vis-dark-graph-node-stroke-color: rgba(30,30,30,.25);
    --vis-dark-graph-node-fill-color: #494b56;
    --vis-dark-graph-node-gauge-color: #989aa3;
    --vis-dark-graph-node-selection-color: #494b56;

    /* Node Central Icon */
    --vis-graph-node-icon-fill-color-bright: #ffffff;
    --vis-graph-node-icon-fill-color-dark: var(--vis-color-grey);
    --vis-graph-node-icon-fill-color: #9ea7b8;

    --vis-dark-graph-node-icon-fill-color: var(--vis-graph-node-icon-fill-color-bright);

    /* Node Bottom Icon */
    --vis-graph-node-bottom-icon-font-size: 14pt;
    --vis-graph-node-bottom-icon-fill-color: #a0a6ad;
    --vis-graph-node-bottom-icon-stroke-color: #fff;
    --vis-graph-node-bottom-icon-stroke-width: 2px;

    --vis-dark-graph-node-bottom-icon-fill-color: #a0a6ad;
    --vis-dark-graph-node-bottom-icon-stroke-color: #fff;

    /* Node Label */
    --vis-graph-node-label-font-size: 9pt;
    --vis-graph-node-label-background: #ffffff;
    --vis-graph-node-label-text-color: #0F1E57;
    --vis-graph-node-sublabel-text-color: #989aa3;
    --vis-graph-node-sublabel-font-size: 8pt;
    // Undefined by default to allow proper fallback to var(--vis-font-family)
    /* --vis-graph-node-label-font-family: */

    --vis-dark-graph-node-label-background: var(--vis-color-grey);
    --vis-dark-graph-node-label-text-color: #ffffff;
    --vis-dark-graph-node-sublabel-text-color: #989aa3;

    /* Node Side Labels (circular labels)*/
    --vis-graph-node-side-label-background-fill-color: #a0a9af;
    --vis-graph-node-side-label-background-stroke-color: #ffffff;
    --vis-graph-node-side-label-fill-color-bright: #ffffff;
    --vis-graph-node-side-label-fill-color-dark: #494b56;

    --vis-dark-graph-node-side-label-background-fill-color: #989aa3;
    --vis-dark-graph-node-side-label-background-stroke-color: var(--vis-color-grey);
    --vis-dark-graph-node-side-label-fill-color-bright: #f1f4f7;
    --vis-dark-graph-node-side-label-fill-color-dark: var(--vis-color-grey);

    /* Greyout */
    --vis-graph-node-greyout-opacity: 0.9;
    --vis-graph-node-greyout-filter: none;
    --vis-graph-node-greyout-color: #ebeff7;
    --vis-graph-node-icon-greyout-color: #c6cad1;
    --vis-graph-node-side-label-background-greyout-color: #f1f4f7;

    --vis-dark-graph-node-greyout-color: #494b56;
    --vis-dark-graph-node-icon-greyout-color: var(--vis-color-grey);
    --vis-dark-graph-node-side-label-background-greyout-color: #494B56;

    /* Brushed */
    --vis-graph-brushed-node-stroke-color: var(--vis-color-main);
    --vis-graph-brushed-node-label-text-color: var(--vis-color-main);
    --vis-graph-brushed-node-icon-fill-color: var(--vis-color-main);
    
    /* Misc */
    --vis-graph-node-dominant-baseline: middle;
  }

  body.theme-dark ${`.${Ln}`} {
    --vis-graph-node-stroke-color: var(--vis-dark-graph-node-stroke-color);
    --vis-graph-node-fill-color: var(--vis-dark-graph-node-fill-color);
    --vis-graph-node-gauge-color: var(--vis-dark-graph-node-gauge-color);
    --vis-graph-node-selection-color: var(--vis-dark-graph-node-selection-color);

    --vis-graph-node-icon-fill-color: var(--vis-dark-graph-node-icon-fill-color);

    --vis-graph-node-bottom-icon-fill-color: var(--vis-dark-graph-node-bottom-icon-fill-color);
    --vis-graph-node-bottom-icon-stroke-color: var(--vis-dark-graph-node-bottom-icon-stroke-color);

    --vis-graph-node-label-background: var(--vis-dark-graph-node-label-background);
    --vis-graph-node-label-text-color: var(--vis-dark-graph-node-label-text-color);
    --vis-graph-node-sublabel-text-color: var(--vis-dark-graph-node-sublabel-text-color);

    --vis-graph-node-side-label-background-fill-color: var(--vis-dark-graph-node-side-label-background-fill-color);
    --vis-graph-node-side-label-background-stroke-color: var(--vis-dark-graph-side-label-background-stroke-color);
    --vis-graph-node-side-label-fill-color-bright: var(--vis-dark-graph-node-side-label-fill-color-bright);
    --vis-graph-node-side-label-fill-color-dark: var(vis-dark-graph-node-side-label-fill-color-dark);

    --vis-graph-node-greyout-color: var(--vis-dark-graph-node-greyout-color);
    --vis-graph-node-icon-greyout-color: var(--vis-dark-graph-node-icon-greyout-color);
    --vis-graph-node-side-label-background-greyout-color: var(--vis-dark-graph-node-side-label-background-greyout-color);
  }
`,Jt=z`
  label: brushable;
`,xt=z`
  label: node-shape;

  stroke: var(--vis-graph-node-stroke-color);
  fill: var(--vis-graph-node-fill-color);

  :not(.${Jt}) {
    transition: .4s fill, 4s stroke;
  }
`,fe=z`
  label: icon;

  font-family: var(--vis-graph-icon-font-family), var(--vis-font-family);
  dominant-baseline: var(--vis-graph-node-dominant-baseline);
  text-anchor: middle;
  pointer-events: none;
  fill: var(--vis-graph-node-icon-fill-color);

  :not(.${Jt}) {
    transition: .4s all;
  }
`,En=z`
  label: node-bottom-icon;
  font-family: var(--vis-graph-icon-font-family), var(--vis-font-family);
  font-size: var(--vis-graph-node-bottom-icon-font-size);
  dominant-baseline: var(--vis-graph-node-dominant-baseline);
  text-anchor: middle;
  pointer-events: none;
  fill: var(--vis-graph-node-bottom-icon-fill-color);
  stroke: var(--vis-graph-node-bottom-icon-stroke-color);
  stroke-width: var(--vis-graph-node-bottom-icon-stroke-width);

  :not(.${Jt}) {
    transition: .4s all;
  }
`,Nn=z`
  label: dragged;
`,Bt=z`
  label: label;

  text-anchor: middle;
  font-weight: 300;
  font-size: var(--vis-graph-node-label-font-size);
`,To=z`
  label: background;

  opacity: 0.9;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  fill: var(--vis-graph-node-label-background);
`,Yt=z`
  label: label-text;
`,ze=z`
  label: label-text-content;

  fill: var(--vis-graph-node-label-text-color);
  font-family: var(--vis-graph-node-label-font-family, var(--vis-font-family));
`,Mn=z`
  label: sublabel-text-content;

  fill: var(--vis-graph-node-sublabel-text-color);
  font-family: var(--vis-graph-node-label-font-family, var(--vis-font-family));
  font-size: var(--vis-graph-node-sublabel-font-size);
`,Pn=z`
  label: side-labels-group;
`,te=z`
  label: side-label-background;

  stroke-opacity: 0.8;
  stroke: var(--vis-graph-node-side-label-background-stroke-color);
  fill: var(--vis-graph-node-side-label-background-fill-color);
`,ee=z`
  label: side-label;

  font-family: var(--vis-graph-icon-font-family), var(--vis-font-family);
  dominant-baseline: var(--vis-graph-node-dominant-baseline);
  text-anchor: middle;
  font-size: 16px;
  fill: var(--vis-graph-node-side-label-fill-color-bright);
`,An=z`
  label: side-label-group;
  cursor: default;
`,kt=z`
  label: g-node;

  transition: .25s opacity;
`,Co=z`
  label: draggable;

  &:hover {
    cursor: grab;
  }

  &${`.${Nn}`} {
    cursor: grabbing;
  }
`,ke=z`
  label: g-node-exit;
  pointer-events: none;
`,Ge=z`
  label: active;
`,Gt=z`
  label: node-selection;

  fill: none;
  stroke-width: 1;
  stroke-dasharray: 3 3;
  opacity: 0;
  transition: 350ms cubic-bezier(0.165, 0.840, 0.440, 1.000);
  transform: scale(.5);
  fill: var(--vis-graph-node-selection-color);
  fill-opacity: 0.1;
  stroke: var(--vis-graph-node-selection-color);
  stroke-opacity: 0.75;

  &${`.${Ge}`} {
    opacity: 1;
    transform: scale(1.2);
  }
`,It=z`
  label: node-gauge;

  fill: var(--vis-graph-node-gauge-color);
  transition: .4s fill;
`,zo=z`
  label: polygon;

  ${`.${It}`} {
    fill-opacity: 0;
    stroke-linecap: round;
    pointer-events: none;
  }
`,Me=z`
  label: custom-node;

  stroke-width: 0;
`,Tn=z`
  label: greyed-out;
  opacity: var(--vis-graph-node-greyout-opacity);
  filter: var(--vis-graph-node-greyout-filter);

  ${`.${xt}`} {
    fill: var(--vis-graph-node-greyout-color) !important;
    stroke: var(--vis-graph-node-greyout-color) !important;
  }

  ${`.${fe}`} {
     fill: var(--vis-graph-node-icon-greyout-color) !important;
  }

  ${`.${It}`} {
    fill: var(--vis-graph-node-greyout-color) !important;
    stroke: var(--vis-graph-node-greyout-color) !important;
  }

  ${`.${Bt}`} {
    opacity: 0.5;
  }

  ${`.${te}`} {
     fill: var(--vis-graph-node-side-label-background-greyout-color) !important;
     stroke-opacity: 0.5;
   }

   ${`.${ee}`} {
    fill: var(--vis-graph-node-side-label-fill-color-bright) !important;
    opacity: 0.25;
  }
`,ae=z`
  label: brushed-node;

  ${`.${xt}`} {
    stroke: var(--vis-graph-brushed-node-stroke-color);
  }
  ${`.${fe}`} {
    fill: var(--vis-graph-brushed-node-icon-fill-color);
  }
  ${`.${ze}`} {
    fill: var(--vis-graph-brushed-node-label-text-color);
  }
`,Fs=Object.freeze(Object.defineProperty({__proto__:null,brushable:Jt,brushed:ae,customNode:Me,draggable:Co,gNode:kt,gNodeExit:ke,greyedOutNode:Tn,label:Bt,labelBackground:To,labelText:Yt,labelTextContent:ze,node:xt,nodeBottomIcon:En,nodeGauge:It,nodeIcon:fe,nodeIsDragged:Nn,nodePolygon:zo,nodeSelection:Gt,nodeSelectionActive:Ge,nodes:Ln,sideLabel:ee,sideLabelBackground:te,sideLabelGroup:An,sideLabelsGroup:Pn,subLabelTextContent:Mn,variables:Rs},Symbol.toStringTag,{value:"Module"})),Go=z`
  label: links;
`;Te`
  :root {
    --vis-graph-link-stroke-color: #e6e9f3;
    --vis-graph-link-stroke-opacity: 1.0;
    --vis-graph-link-greyout-opacity: 0.3;
    --vis-graph-link-dashed-stroke-dasharray: 6 6;

    --vis-graph-link-label-font-size: 9pt;
    --vis-graph-link-label-background: #e6e9f3;
    --vis-graph-link-label-text-color-dark: #18181B;
    --vis-graph-link-label-text-color-bright: #fff;
    --vis-graph-link-label-text-color: var(--vis-graph-link-label-text-color-dark);

    --vis-graph-link-band-opacity: 0.35;
    --vis-graph-link-support-stroke-width: 10px;
    --vis-graph-link-flow-opacity: 1;

    --vis-dark-graph-link-stroke-color: #494b56;
    --vis-dark-graph-link-label-background: #3f3f45;
    --vis-dark-graph-link-label-text-color: var(--vis-graph-link-label-text-color-bright);


    --vis-graph-link-dominant-baseline: middle;
  }

  body.theme-dark ${`.${Go}`} {
    --vis-graph-link-stroke-color: var(--vis-dark-graph-link-stroke-color);
    --vis-graph-link-label-stroke-color: var(--vis-dark-graph-link-label-stroke-color);
    --vis-graph-link-label-text-color: var(--vis-dark-graph-link-label-text-color);
    --vis-graph-link-label-background: var(--vis-dark-graph-link-label-background);
  }
`;const ge=z`
  label: link-support;

  fill: none;
  stroke-linecap: round;
  stroke-width: var(--vis-graph-link-support-stroke-width);
  stroke-opacity: 0;
  stroke: var(--vis-graph-link-stroke-color);
  transition: stroke-opacity 0.2s;
`,Dt=z`
  label: link;

  fill: none;
  stroke: var(--vis-graph-link-stroke-color);
  stroke-opacity: var(--vis-graph-link-stroke-opacity);
  transition: stroke 800ms;
  stroke-linecap: round;
  pointer-events: none;
`,Os=z`
  label: dashed;

  ${`.${Dt}`} {
    stroke-dasharray: var(--vis-graph-link-dashed-stroke-dasharray);
  }
`,Io=z`
  label: link-arrow;
  fill: var(--vis-graph-link-stroke-color);
`,wt=z`
  label: g-link;
`,Je=z`
  label: g-link-exit;
  pointer-events: none;
`,Do=z`
  label: greyed-out;
  opacity: var(--vis-graph-link-greyout-opacity);
`,de=z`
  label: link-band;

  stroke-opacity: var(--vis-graph-link-band-opacity);
  pointer-events: none;
  stroke: var(--vis-graph-node-stroke-color);
  fill: none;
`,Ie=z`
  label: flow-group;
  
  pointer-events: none;
`,ne=z`
  label: flow-circle;

  fill: var(--vis-graph-link-stroke-color);
  opacity: var(--vis-graph-link-flow-opacity);
`,pn=z`
  label: label-group;
`,fo=z`
  label: label-background;

  fill: var(--vis-graph-link-label-background);
`,tn=z`
  label: label-content;

  font-size: var(--vis-graph-link-label-font-size);
  font-family: var(--vis-font-family);
  fill: var(--vis-graph-link-label-text-color);
  text-anchor: middle;
  dominant-baseline: var(--vis-graph-link-dominant-baseline);
  user-select: none;
`;Te`
  :root {
    --vis-graph-icon-font-family: ${xi};

    /* Brush */
    --vis-graph-brush-selection-opacity: 0.2;
  }
`;const Hs=z`
  label: graph-component;
`,Bo=z`
  label: background;
`,Ro=z`
  label: graph-group;
`,Ws=z`
  label: brush;

  :not(.active) {
    display: none;
  }

  .active {
    .selection {
      fill-opacity: 0;
      stroke: none;
    }

    .handle {
      display: none;
    }
  }
`,Vs=z`
  label: zoom-out-level-1;

  ${`.${Bt}`} {
    rect {
      stroke: none;
    }
  }
`,Cn=z`
  label: zoom-out-level-2;

  ${`.${Bt}`} {
    visibility: visible;
  }

  ${`.${It}`} {
    visibility: visible;
  }

  ${`.${xt}`} {
    stroke-width: 4px;
  }

  rect${`.${xt}`} {
    stroke-width: 2px;
  }

  ${`.${wt}`} {
    animation: none;
    stroke-dasharray: none;
  }

  ${`.${ne}`} {
    display: none;
  }

  ${`.${Gt}`} {
    &${`.${Ge}`} {
      transform: scale(1.15);
    }
  }
`,Fo=z`
  label: panels;
`;Te`
  :root {
    --vis-graph-panel-border-color: #E6E9F3;
    --vis-graph-panel-border-opacity: 0.9;
    --vis-graph-panel-fill-color: #ffffff;

    --vis-graph-panel-label-color: #6c778c;
    --vis-graph-panel-label-background: #ffffff;

    // Undefined by default to allow proper fallback to var(--vis-font-family)
    /* --vis-graph-panel-label-font-family: */
    --vis-graph-panel-label-font-size: 10pt;
    --vis-graph-panel-label-font-weight: 300;

    --vis-graph-panel-dashed-outline-color: #b7b7b7;

    --vis-graph-panel-side-icon-symbol-color: #9ea7b8;
    --vis-graph-panel-side-icon-shape-fill-color: #ffffff;

    --vis-dark-graph-panel-border-color: var(--vis-color-grey);
    --vis-dark-graph-panel-fill-color: #292b34;
    --vis-dark-graph-panel-label-color: #E6E9F3;
    --vis-dark-graph-panel-label-background: var(--vis-color-grey);
    --vis-dark-graph-panel-side-icon-symbol-color: #ffffff;
    --vis-dark-graph-panel-side-icon-shape-fill-color: #6c778c;
    --vis-dark-graph-panel-border-color: #a0a6ad;
  }

  body.theme-dark ${`.${Fo}`} {
    --vis-graph-panel-border-color: var(--vis-dark-graph-panel-border-color);
    --vis-graph-panel-fill-color: var(--vis-dark-graph-panel-fill-color);
    --vis-graph-panel-label-color: var(--vis-dark-graph-panel-label-color);
    --vis-graph-panel-label-background: var(--vis-dark-graph-panel-label-background);
    --vis-graph-panel-side-icon-symbol-color: var(--vis-dark-graph-panel-side-icon-symbol-color);
    --vis-graph-panel-side-icon-shape-fill-color: var(--vis-dark-graph-panel-side-icon-shape-fill-color);
    --vis-graph-panel-border-color:  var(--vis-dark-graph-panel-border-color);
  }
`;const _n=z`
  label: g-panel;
`,zn=z`
  label: panel;

  stroke: var(--vis-graph-panel-border-color);
  stroke-opacity: var(--vis-graph-panel-border-opacity);
  fill: var(--vis-graph-panel-fill-color);
`,Gn=z`
  label: label;

  fill: var(--vis-graph-panel-label-color);
`,Us=z`
  label: background;

  opacity: 0.9;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  fill: var(--vis-graph-panel-label-background);
  stroke: none;
`,re=z`
  label: label-text;

  text-anchor: middle;
  font-size: var(--vis-graph-panel-label-font-size);
  font-weight: var(--vis-graph-panel-label-font-weight);;
  cursor: default;
  stroke: none;
  font-family: var(--vis-graph-panel-label-font-family, var(--vis-font-family));
`,Oo=z`
  label: active;
`,In=z`
  label: panel-selection-outline;

  opacity: 0;
  stroke-width: 1;
  stroke-dasharray: 3 3;
  fill: var(--vis-graph-node-selection-color);
  fill-opacity: 0.1;
  stroke: var(--vis-graph-panel-dashed-outline-color);
  stroke-opacity: 0;

  &${`.${Oo}`} {
    opacity: 1;
    stroke-opacity: 0.75;
  }
`;z`
  label: greyout;
  opacity: 0.4;
`;const Dn=z`
  label: side-icon-group;
`,Bn=z`
  label: side-icon-shape;

  fill: var(--vis-graph-panel-side-icon-shape-fill-color);
  stroke-width: 2px;
`,js=z`
  label: side-icon-custom;
`,Rn=z`
  label: side-label-icon-text;
  font-family: var(--vis-graph-icon-font-family), var(--vis-font-family);
  fill: var(--vis-graph-panel-side-icon-symbol-color);
  stroke: none;
  dominant-baseline: middle;
  text-anchor: middle;
  pointer-events: none;
  cursor: default;
`,Ho=["svg","g","path","rect","circle","ellipse","line","polyline","polygon","defs","clipPath","use","symbol","image","marker","style","mask",...ms];function Xs(t,e=Ho){return ps(t,e)}function Fn(t){const e=new RegExp(`<(${Ho.join("|")})\\b`,"i"),n=/\b(d|fill|stroke|transform|viewBox)=/i;return e.test(t)||n.test(t)}const De=30,go=10,vn=4;function At(t,e,n){return j(t,e,n)||De}function Wo(t,e){t._animState={endAngle:0,nodeIndex:e}}function qs(t,e,n,o){var i;const{nodeStrokeWidth:s,nodeSize:r,nodeGaugeValue:a}=e;o._animState||Wo(o,t._index);const l=he(o._animState,{endAngle:2*Math.PI*((i=j(t,a,t._index))!==null&&i!==void 0?i:0)/100,nodeIndex:t._index,nodeSize:At(t,r,t._index),borderWidth:j(t,s,t._index)});return o._animState=l(0),c=>(o._animState=l(c),n(o._animState))}function en(t,e,n,o){var i;const{nodeShape:s,nodeGaugeValue:r}=e,a=At(t,e.nodeSize,t._index);let l;switch(Q(t,s,t._index)){case nt.Square:l=4;break;case nt.Triangle:l=3;break;case nt.Hexagon:default:l=6}o._animState||Wo(o,t._index);const c=he(o._animState,{endAngle:2*Math.PI*((i=j(t,r,t._index))!==null&&i!==void 0?i:0)/100,nodeIndex:t._index});return o._animState=c(0),u=>(o._animState=c(u),l===4?fs({x:-a/2,y:-a/2,w:a,h:a,r:5,score:o._animState.endAngle/(2*Math.PI)}):n(a,l,o._animState.endAngle,!0))}function Zt(t,e,n){const o=Si(e),s=t.select(`.${n}`).node().getBBox();return t.select("rect").attr("visibility",o?"hidden":null).attr("rx",4).attr("ry",4).attr("x",-s.width/2-go).attr("y","-0.64em").attr("width",s.width+2*go).attr("height",s.height+2*vn).style("transform",`translateY(${-vn}px)`)}function ft(t){return t._state&&!Se(t._state.fx)?t._state.fx:t.x}function gt(t){return t._state&&!Se(t._state.fy)?t._state.fy:t.y}function nn(t){return typeof t=="number"?t:De}function Pt(t,e){return J(t||[],(n,o)=>At(n,e,o))||De}function po(t,e){return Hi(t||[],(n,o)=>At(n,e,o))||De}function Vo(t,e){if(!t.color)return null;const n=So(t.color,e);return Sn(n)>.65?"var(--vis-graph-node-side-label-fill-color-dark)":"var(--vis-graph-node-side-label-fill-color-bright)"}function xe(t,e,n){var o;return(o=xn(t,e,n,!0))!==null&&o!==void 0?o:null}function Ys(t,e,n,o){const i=xe(t,e,n);if(!i)return null;const s=So(i,o);return Sn(s)>.65?"var(--vis-graph-node-icon-fill-color-dark)":"var(--vis-graph-node-icon-fill-color-bright)"}function bn(t){return/^#[^]+/.test(t)}function ue(t,e,n,o,i,s=":last-child"){t.each((r,a,l)=>{const c=V(l[a]),u=Q(r,e,i);let d;const p=Fn(u);if(p)d=c.insert("g",s).html(Xs(u));else switch(u){case nt.Square:d=c.insert("rect",s).attr("rx",5).attr("ry",5);break;case nt.Hexagon:case nt.Triangle:d=c.insert("path",s);break;case nt.Circle:default:d=c.insert("circle",s)}return d.classed(o,p),d.attr("class",n)})}function yn(t,e,n,o){if(t.size()===0)return;const i=t.datum(),s=At(i,n,o);t.filter("circle").attr("r",s/2),t.filter("rect").attr("width",s).attr("height",s).attr("x",-s/2).attr("y",-s/2),t.filter("path").attr("d",()=>{let r;switch(Q(i,e,o)){case nt.Square:r=4;break;case nt.Triangle:r=3;break;case nt.Hexagon:default:r=6}return me(s,r)}),t.filter("g").filter(()=>!Fn(Q(i,e,o))).html(Q(i,e,o)),t.filter("g").each((r,a,l)=>{const c=V(l[a]),u=c.node().getBBox();c.attr("transform",`translate(${-u.width/2},${-u.height/2})`)})}var St;(function(t){t[t.Level0=1]="Level0",t[t.Level1=.6]="Level1",t[t.Level2=.4]="Level2",t[t.Level3=.2]="Level3"})(St||(St={}));const on=10;function Zs(t,e,n,o=1){t.each((i,s,r)=>{const a=r[s],l=V(a);if(l.attr("transform",(d,p)=>{var y,_,x;const g=pt(d,e.nodeEnterPosition,p),v=(y=j(d,e.nodeEnterScale,p))!==null&&y!==void 0?y:0,m=(_=g==null?void 0:g[0])!==null&&_!==void 0?_:ft(d),f=(x=g==null?void 0:g[1])!==null&&x!==void 0?x:gt(d);return`translate(${m}, ${f}) scale(${v})`}).attr("opacity",0),e.nodeEnterCustomRenderFunction)e.nodeEnterCustomRenderFunction(i,l,e,n,o);else{const d=Q(i,e.nodeShape,i._index);a.nodeShape=d,ue(l,d,xt,Me,i._index),ue(l,d,Gt,Me,i._index),l.append("path").attr("class",It),l.append("g").attr("class",fe),l.append("g").attr("class",Pn),l.append("text").attr("class",En)}const c=l.append("g").attr("class",Bt);c.append("rect").attr("class",To);const u=c.append("text").attr("class",Yt).attr("dy","0.32em");u.append("tspan").attr("class",ze),u.append("tspan").attr("class",Mn).attr("dy","1.1em").attr("x","0")})}function le(t,e,n,o=1){const{nodeDisabled:i}=e;e.nodePartialUpdateCustomRenderFunction||e.nodeEnterCustomRenderFunction?t.each((s,r,a)=>{var l;const c=V(a[r]);(l=e.nodePartialUpdateCustomRenderFunction)===null||l===void 0||l.call(e,s,c,e,n,o)}):t.each((s,r,a)=>{const l=V(a[r]),c=Mt(s,i,s._index)||s._state.greyout;l.classed(Tn,c&&!s._state.brushed).classed(Co,!e.disableDrag),l.selectAll(`.${Gt}`).classed(Ge,s._state.selected||s._state.brushed),l.selectAll(`.${ee}`).style("fill",d=>c?null:Vo(d,t.node())),l.selectAll(`.${te}`).style("fill",d=>c?null:d.color)})}function Uo(t,e){return tt(t,e).attr("transform",n=>`translate(${ft(n)}, ${gt(n)}) scale(1)`).attr("opacity",1)}function se(t,e,n,o=1){const{nodeGaugeAnimDuration:i,nodeStrokeWidth:s,nodeShape:r,nodeSize:a,nodeGaugeValue:l,nodeGaugeFill:c,nodeIcon:u,nodeIconSize:d,nodeLabel:p,nodeLabelTrim:y,nodeLabelTrimMode:_,nodeLabelTrimLength:x,nodeSubLabel:g,nodeSubLabelTrim:v,nodeSubLabelTrimMode:m,nodeSubLabelTrimLength:f,nodeSideLabels:h,nodeStroke:k,nodeFill:S,nodeBottomIcon:N}=e,L=Uo(t,n);return e.nodeUpdateCustomRenderFunction?(t.each((b,T,C)=>{const w=V(C[T]);e.nodeUpdateCustomRenderFunction(b,w,e,n,o)}),le(t,e,n,o),L):(t.each((b,T,C)=>{const w=C[T],$=V(w),P=Q(b,r,b._index);w.nodeShape!==P&&($.select(`.${xt}`).remove(),ue($,r,xt,Me,b._index,`.${Gt}`),$.select(`.${Gt}`).remove(),ue($,P,Gt,null,b._index,`.${It}`),w.nodeShape=P)}),t.each((b,T,C)=>{var w,$,P;const E=C[T],M=V(E),A=M.select(`.${xt}`),D=M.select(`.${It}`),I=M.select(`.${fe}`),R=M.select(`.${Pn}`),G=M.select(`.${Bt}`),B=G.select(`.${ze}`),U=G.select(`.${Mn}`),W=M.select(`.${En}`),Y=M.select(`.${Gt}`),X=At(b,a,b._index),H=as().innerRadius(O=>O.nodeSize/2-O.borderWidth/2).outerRadius(O=>O.nodeSize/2+O.borderWidth/2).startAngle(0*(Math.PI/180)).endAngle(O=>O.endAngle);M.classed(Cn,o<St.Level2).classed(Nn,O=>O._state.isDragged),M.classed(zo,()=>{const O=Q(b,r,b._index);return O===nt.Triangle||O===nt.Hexagon||O===nt.Square}),A.call(yn,r,a,b._index).attr("stroke-width",(w=j(b,s,b._index))!==null&&w!==void 0?w:0).style("fill",xe(b,S,b._index)).style("stroke",($=xn(b,k,b._index,!0))!==null&&$!==void 0?$:null);const q=A.node().getBBox();D.attr("stroke-width",j(b,s,b._index)).style("display",j(b,l,b._index)?null:"none").style("fill",xe(b,c,b._index)).style("stroke",xe(b,c,b._index)).style("stroke-opacity",O=>Q(O,r,O._index)===nt.Circle?0:null),D.transition().duration(i).attrTween("d",(O,et,vt)=>{switch(Q(O,r,O._index)){case nt.Circle:return qs(O,e,H,vt[et]);case nt.Hexagon:return en(O,e,me,vt[et]);case nt.Square:return en(O,e,me,vt[et]);case nt.Triangle:return en(O,e,me,vt[et]);default:return null}}),yn(Y,r,a,b._index);const st=E.nodeIcon,Z=Q(b,u,b._index),ot=(P=j(b,d,b._index))!==null&&P!==void 0?P:2.5*Math.sqrt(X),ht=Ys(b,S,b._index,t.node()),dt=bn(Z);st!==Z&&(I.selectAll("*").remove(),I.append(dt?"use":"text"),E.nodeIcon=Z),dt?I.select("use").attr("href",Z).attr("x",-ot/2).attr("y",-ot/2).attr("width",ot).attr("height",ot).style("fill",ht):I.select("text").style("font-size",`${ot}px`).attr("dy","0.1em").style("fill",ht).html(Z);const Lt=pt(b,h,b._index)||[],mt=R.selectAll("g").data(Lt),ie=mt.enter().append("g").attr("class",An);ie.append("circle").attr("class",te).attr("r",O=>{var et;return(et=O.radius)!==null&&et!==void 0?et:on}),ie.append("text").attr("class",ee);const F=mt.merge(ie).style("cursor",O=>{var et;return(et=O.cursor)!==null&&et!==void 0?et:null});F.select(`.${ee}`).html(O=>O.text).attr("dy","0.1em").style("fill",O=>{var et;return(et=O.textColor)!==null&&et!==void 0?et:Vo(O,t.node())}).style("font-size",O=>{var et,vt;return(et=O.fontSize)!==null&&et!==void 0?et:`${(2+((vt=O.radius)!==null&&vt!==void 0?vt:on))/Math.pow(O.text.toString().length,.3)}px`}),F.select(`.${te}`).style("fill",O=>O.color),F.attr("transform",(O,et)=>{var vt;if(Lt.length===1)return`translate(${X/2.5}, ${-X/2.5})`;const Be=1.05*X/2,Wn=et*1.15*2*Math.atan2((vt=O.radius)!==null&&vt!==void 0?vt:on,Be)-Math.PI/3;return`translate(${Be*Math.cos(Wn)}, ${Be*Math.sin(Wn)})`}),mt.exit().remove();const K=Q(b,p,b._index),Et=Q(b,g,b._index),_t=Mt(b,y,b._index)?Ee(K,j(b,x,b._index),pt(b,_,b._index)):K,On=Mt(b,v,b._index)?Ee(Et,j(b,f,b._index),pt(b,m,b._index)):Et;B.text(_t),U.text(On),M.on("mouseenter",()=>{B.text(K),U.text(Et),Zt(G,K,Yt),M.raise()}).on("mouseleave",()=>{B.text(_t),U.text(On),Zt(G,_t,Yt)});const oi=parseFloat(window.getComputedStyle(E).getPropertyValue("--vis-graph-node-label-font-size"))||12,ii=vn+1.25*Math.pow(oi,1.03),Hn=Fn(Q(b,r,b._index))?q.height:X;G.attr("transform",`translate(0, ${Hn/2+ii})`),o>=St.Level3&&Zt(G,Q(b,p,b._index),Yt),W.html(Q(b,N,b._index)).attr("transform",`translate(0, ${Hn/2})`)}),le(t,e,n,o),L)}function Ks(t,e,n,o=1){tt(t,n/2).attr("opacity",0).attr("transform",(i,s)=>{var r,a,l;const c=pt(i,e.nodeExitPosition,s),u=(r=j(i,e.nodeExitScale,s))!==null&&r!==void 0?r:0,d=(a=c==null?void 0:c[0])!==null&&a!==void 0?a:ft(i),p=(l=c==null?void 0:c[1])!==null&&l!==void 0?l:gt(i);return`translate(${d}, ${p}) scale(${u})`}).remove(),e.nodeExitCustomRenderFunction&&t.each((i,s,r)=>{const a=V(r[s]);e.nodeExitCustomRenderFunction(i,a,e,n,o)})}function Qs(t,e){const{nodeLabel:n}=e;t.each((o,i,s)=>{const a=V(s[i]).select(`.${Bt}`);Zt(a,Q(o,n,i),Yt)})}const Js=$n(Qs,1e3);function jo(t,e,n){e.nodeOnZoomCustomRenderFunction||e.nodeEnterCustomRenderFunction?t.each((o,i,s)=>{var r;const a=V(s[i]);(r=e.nodeOnZoomCustomRenderFunction)===null||r===void 0||r.call(e,o,a,e,n)}):(t.classed(Vs,n<St.Level1),t.classed(Cn,n<St.Level2),t.selectAll(`${te}`).attr("transform",`scale(${1/Math.pow(n,.35)})`),t.selectAll(`.${ee}`).attr("transform",`scale(${1/Math.pow(n,.45)})`),n>=St.Level3&&t.call(Js,e))}const ta=$n(jo,500),Ht=9,Pe=7;function ea(t,e){const n=t.source,o=t.target,i=Math.atan2(gt(o)-gt(n),ft(o)-ft(n))-Math.PI/2,s=Math.cos(i)*e*t._direction*(t._index-(t._neighbours-1)/2),r=Math.sin(i)*e*t._direction*(t._index-(t._neighbours-1)/2);return{dx:s,dy:r}}function Xo(t,e){const{dx:n,dy:o}=ea(t,e);return`translate(${n}, ${o})`}function qo(t,e,n){return j(t,n.linkWidth,t._indexGlobal)/Math.pow(e,.5)}function Ae(t,e,n){const{nodeSize:o,linkBandWidth:i}=n,s=j(t.source,o,t.source._index),r=j(t.target,o,t.target._index),a=Math.min(s,r);return Math.min(a,j(t,i,t._indexGlobal)/Math.pow(e||1,.5))||0}function Yo(t,e){var n;const{linkStroke:o}=e;return((n=xn(t,o,t._indexGlobal,!0))!==null&&n!==void 0?n:"var(--vis-graph-link-stroke-color)")||null}function Zo(t,e){const n=pt(t,e.linkArrow,t._indexGlobal);if(n)return n===Qt.Double?n:Qt.Single}function na(){return`M${-Ht/2},${-Pe/2} V${Pe/2} L${Ht/2},0 Z`}function oa(){return`M${-Ht/2},0 L${Ht/2},${-Pe/2} L${Ht*1.5},0 L${Ht/2},${Pe/2} Z`}function ia(t){if(!t.color)return null;const e=an(t.color).hex();return Sn(e)>.65?"var(--vis-graph-link-label-text-color-dark)":"var(--vis-graph-link-label-text-color-bright)"}function sa(t){t.attr("opacity",0),t.append("path").attr("class",ge),t.append("path").attr("class",Dt),t.append("path").attr("class",de),t.append("use").attr("class",Io),t.append("g").attr("class",Ie).style("opacity",0).selectAll(`.${ne}`).data(Eo(0,6)).enter().append("circle").attr("class",ne)}function Ko(t,e,n){const o=(i,s)=>Mt(i,e.linkDisabled,s)||i._state.greyout;t.classed(Do,(i,s)=>o(i,s)),t.each((i,s,r)=>{const a=r[s],l=V(a);l.select(`.${Dt}`),l.select(`.${de}`),l.select(`.${ge}`).style("stroke-opacity",i._state.hovered||i._state.selected?.2:0).style("stroke-width",i._state.selected?Ae(i,n,e)+5:i._state.hovered?Ae(i,n,e)+10:null)})}function Qo(t,e,n,o=1,i,s){return t.each((r,a,l)=>{var c;const u=l[a],d=V(u),p=d.select(`.${Dt}`),y=d.select(`.${de}`),_=d.select(`.${ge}`),x=d.select(`.${Io}`),g=Yo(r,e),v=Xo(r,e.linkNeighborSpacing),m=$o(pt(r,e.linkLabel,r._indexGlobal)),f=pt(r,e.linkSourcePointOffset,a),h=pt(r,e.linkTargetPointOffset,a),k=ft(r.source)+((f==null?void 0:f[0])||0),S=gt(r.source)+((f==null?void 0:f[1])||0),N=ft(r.target)+((h==null?void 0:h[0])||0),L=gt(r.target)+((h==null?void 0:h[1])||0),b=(c=j(r,e.linkCurvature,a))!==null&&c!==void 0?c:0,T=k+(N-k)*.5*b,C=S+(L-S)*0*b,w=k+(N-k)*.5*b,$=S+(L-S)*1*b,P=`M${k},${S} C${T},${C} ${w},${$} ${N},${L}`,E=_.attr("d",P).node(),M=s.get(P),A=M??E.getTotalLength();M||s.set(P,A),_.style("stroke",g).attr("transform",v),p.attr("class",Dt).style("stroke-width",qo(r,o,e)).style("stroke",g).attr("transform",v),tt(p,n).attr("d",P),y.attr("class",de).attr("transform",v).style("stroke-width",Ae(r,o,e)).style("stroke",g),tt(y,n).attr("d",P);const D=Zo(r,e);if(D){const I=A*(m.length?.65:.5),R=E.getPointAtLength(I),G=E.getPointAtLength(I+1),B=Math.atan2(G.y-R.y,G.x-R.x)*(180/Math.PI),U=x.attr("href");x.attr("href",`#${i(D)}`),tt(x,U?n:0).attr("fill",g).attr("transform",`translate(${R.x}, ${R.y}) rotate(${B})`)}else x.attr("href",null)})}function sn(t,e,n,o=1,i,s){const{linkStyle:r,linkFlow:a,linkLabel:l,linkLabelShiftFromCenter:c}=e;t.size()&&(t.classed(Os,u=>pt(u,r,u._indexGlobal)===Ne.Dashed),Qo(t,e,n,o,i,s),t.each((u,d,p)=>{const y=p[d],_=V(y),x=_.select(`.${Ie}`),v=_.select(`.${ge}`).node(),m=Yo(u,e),f=Xo(u,e.linkNeighborSpacing),h=$o(pt(u,l,u._indexGlobal)),k=j(u,e.linkFlowParticleSize,u._indexGlobal);x.attr("transform",f).style("display",Mt(u,a,u._indexGlobal)?null:"none"),x.selectAll(`.${ne}`).attr("r",k/Math.sqrt(o)).style("fill",m),tt(x,n).style("opacity",o<St.Level2?0:1);const S=h.map(E=>{var M,A,D;const I=((M=E.text)===null||M===void 0?void 0:M.toString())||"",R=bn(I),G=(A=$i(E.fontSize))!==null&&A!==void 0?A:wi("var(--vis-graph-link-label-font-size)",_.node()),B=I.length<=2||R,U=4,W=B?U:8,Y=ys(I,G);return Object.assign(Object.assign({},E),{_shouldRenderUseElement:R,_fontSizePx:G,_shouldBeRenderedAsCircle:B,_paddingVertical:U,_paddingHorizontal:W,_estimatedWidthPx:Y,_borderRadius:(D=E.radius)!==null&&D!==void 0?D:B?G:4,_backgroundWidth:(B?G:Y)+W*2,_backgroundHeight:G+U*2})}),N=_.selectAll(`.${pn}`).data(S,E=>E.text),L=N.enter().append("g").attr("class",pn);L.each((E,M,A)=>{var D;const I=V(A[M]);I.append("rect").attr("class",fo);const R=E?(D=E.text)===null||D===void 0?void 0:D.toString():void 0,G=bn(R);I.select(`.${tn}`).remove(),I.append(G?"use":"text").attr("class",tn)}),L.style("opacity",0);const b=N.merge(L),T=1;let C=-Wi(S,E=>E._backgroundWidth+T)/2;const w=s.get(v.getAttribute("d")),$=w??v.getTotalLength(),P=Zo(u,e);b.each((E,M,A)=>{var D,I;const R=A[M],G=V(R),B=(D=E.text)===null||D===void 0?void 0:D.toString(),U=G.select(`.${tn}`),W=P?Ht*2:0,Y=Mt(u,c,u._indexGlobal)?-W+4:0,X=v.getPointAtLength($/2+Y+C+E._backgroundWidth/2),H=`translate(${X.x}, ${X.y})`,q=G.select(`.${fo}`);G.attr("transform")||G.attr("transform",`${H} scale(0)`);const st=(I=E.textColor)!==null&&I!==void 0?I:ia(E);E._shouldRenderUseElement?U.attr("href",B).attr("x",-E._fontSizePx/2).attr("y",-E._fontSizePx/2).attr("width",E._fontSizePx).attr("height",E._fontSizePx).style("fill",st):U.text(B).attr("dy","0.1em").style("font-size",E._fontSizePx).style("fill",st),G.attr("hidden",null).style("cursor",E.cursor),tt(G,n).attr("transform",`${H} scale(1)`).style("opacity",1),q.attr("x",-E._backgroundWidth/2).attr("y",-E._backgroundHeight/2).attr("width",E._backgroundWidth).attr("height",E._backgroundHeight).attr("rx",E._borderRadius).style("fill",E.color),C+=E._backgroundWidth+T}),tt(N.exit(),n).style("opacity",0).remove()}),n>0?(t.attr("pointer-events","none"),tt(t,n).attr("opacity",1).on("end interrupt",(d,p,y)=>{V(y[p]).attr("pointer-events","stroke").attr("opacity",1)})):t.attr("opacity",1),Ko(t,e,o))}function aa(t,e,n){tt(t,n/2).attr("opacity",0).remove()}function _o(t,e,n,o){const{linkFlow:i}=e;n<St.Level2||t.each((s,r,a)=>{const l=a[r],c=V(l),u=c.select(`.${Ie}`),d=c.select(`.${Dt}`).node(),p=o.get(d.getAttribute("d")),y=p??d.getTotalLength();if(!Mt(s,i,s._indexGlobal)||!y)return;const _=s._state.flowAnimTime,x=u.selectAll(`.${ne}`);x.attr("transform",g=>{const v=(_+ +g/(x.size()-1))%1,m=d.getPointAtLength(v*y);return`translate(${m.x}, ${m.y})`})})}function Jo(t,e,n){t.classed(Cn,n<St.Level2),t.select(`.${Ie}`).style("opacity",n<St.Level2?0:1),t.each((s,r,a)=>{const l=j(s,e.linkFlowParticleSize,s._indexGlobal)/Math.sqrt(n);V(a[r]).selectAll(`.${ne}`).attr("r",l)}),t.selectAll(`.${Dt}`).style("stroke-width",s=>qo(s,n,e)),t.selectAll(`.${de}`).style("stroke-width",s=>Ae(s,n,e))}const ra=$n(Jo,500),be=15,la=16,Ot=5,vo=25;function ca(t){var e,n,o,i;const s=$e(t);return{left:(e=s?t.left:t)!==null&&e!==void 0?e:be,right:(n=s?t.right:t)!==null&&n!==void 0?n:be,top:(o=s?t.top:t)!==null&&o!==void 0?o:be,bottom:(i=s?t.bottom:t)!==null&&i!==void 0?i:be}}function da(t){return(t??[]).map(n=>Object.assign(Object.assign({},n),{_padding:ca(n.padding)}))}function ua(t,e,n){t&&e.forEach(o=>{const i=t.filter(s=>s.nodes&&s.nodes.includes(o._id));o._panels=i})}function ha(t,e,n,o){const i=e.select(`.${xt}`);if(i.empty())return;const s=40,r=110,a=10;let l;i.each((c,u)=>{const d=At(c,n,u),p=Math.max(d,r),y=d+a+s,_=10,x={x1:ft(c)-p/2,y1:gt(c)-y/2+_,x2:ft(c)+p/2,y2:gt(c)+y/2+_};l?(l.x1>x.x1&&(l.x1=x.x1),l.y1>x.y1&&(l.y1=x.y1),l.x2<x.x2&&(l.x2=x.x2),l.y2<x.y2&&(l.y2=x.y2)):l=Object.assign({},x)}),t._x=l.x1-t._padding.left,t._y=l.y1-t._padding.top,t._width=l.x2-l.x1+t._padding.left+t._padding.right,t._height=l.y2-l.y1+t._padding.top+t._padding.bottom,t._disabled=i.data().map((c,u)=>Mt(c,o,c._index)||c._state.greyout).every(c=>c)}function fa(t,e){t._numNodes=e.size()}function ga(t,e,n){const{layoutNonConnectedAside:o}=n;e&&e.forEach(i=>{const s=t.filter(r=>(!o||r._isConnected)&&i.nodes.includes(r._id));ha(i,s,n.nodeSize,n.nodeDisabled)})}function pa(t,e,n){const{layoutNonConnectedAside:o}=n;e&&e.forEach(i=>{const s=t.filter(r=>(!o||r._isConnected)&&i.nodes.includes(r._id));fa(i,s)})}function ti(t){const e=t._width/2,n=la+(t.dashedOutline?Ot:0),o=t.labelPosition===Li.Bottom?t._height+n:-n;return`translate(${e}, ${o})`}function _a(t){t.attr("transform",o=>`translate(${o._x}, ${o._y})`).style("opacity",0),t.append("rect").attr("class",In).attr("rx",9).attr("ry",9).attr("width",o=>o._width).attr("height",o=>o._height),t.append("rect").attr("class",zn).attr("rx",7).attr("ry",7).attr("width",o=>o._width).attr("height",o=>o._height);const e=t.append("g").attr("class",Gn).attr("transform",ti);e.append("rect").attr("class",Us),e.append("text").attr("class",re).attr("dy","0.32em");const n=t.append("g").attr("class",Dn).attr("transform",(o,i,s)=>{const r=-Ot;return`translate(${o._width+r}, 5)`});ue(n,o=>o.sideIconShape,Bn,js),n.append("text").attr("class",Rn)}function va(t,e,n){tt(t,n).attr("transform",a=>`translate(${a._x}, ${a._y})`).style("opacity",a=>a._disabled?.4:1);const o=t.selectAll(`.${zn}`).data(a=>[a]);tt(o,n).attr("width",a=>a._width).attr("height",a=>a._height).style("stroke",a=>a.borderColor).style("fill",a=>a.fillColor).style("stroke-width",a=>a.borderWidth);const i=t.select(`.${In}`).classed(Oo,a=>a.dashedOutline);tt(i,n).attr("x",a=>-Ot).attr("y",a=>-Ot).attr("width",a=>a._width+Ot*2).attr("height",a=>a._height+Ot*2);const s=t.select(`.${Dn}`);s.select(`.${Bn}`).call(yn,a=>a.sideIconShape,a=>{var l;return(l=a.sideIconShapeSize)!==null&&l!==void 0?l:vo}).style("stroke",a=>a.sideIconShapeStroke).style("cursor",a=>{var l;return(l=a.sideIconCursor)!==null&&l!==void 0?l:null}).style("opacity",a=>a.sideIconShape?1:0),s.select(`.${Rn}`).html(a=>a.sideIconSymbol).attr("dy",1).style("fill",a=>a.sideIconSymbolColor).style("font-size",a=>{var l,c;return(l=a.sideIconFontSize)!==null&&l!==void 0?l:((c=a.sideIconShapeSize)!==null&&c!==void 0?c:vo)/2.5}),tt(s,n).attr("transform",a=>{const l=-Ot;return`translate(${a._width+l}, 5)`});const r=t.select(`.${Gn}`);r.select(`.${re}`).text(a=>Ee(a.label,a.labelTrimLength,a.labelTrimMode)),tt(r,n).attr("transform",ti),r.on("mouseover",(a,l)=>{const c=V(a.currentTarget),u=l.label;c.select("text").text(u),Zt(c,u,re)}).on("mouseleave",(a,l)=>{const c=V(a.currentTarget),u=Ee(l.label,l.labelTrimLength,l.labelTrimMode);c.select("text").text(u),Zt(c,u,re)})}function ba(t,e,n){tt(t,n/2).style("opacity",0).remove()}const mn={hierarchyHandling:"INCLUDE_CHILDREN","nodePlacement.strategy":"NETWORK_SIMPLEX","elk.padding":"[top=15.0,left=15.0,bottom=15.0,right=15.0]","spacing.nodeNodeBetweenLayers":"50","spacing.edgeNodeBetweenLayers":"50","spacing.nodeNode":"10"};function oe(t,e,n,o,i=0){t.forEach((s,r)=>{const a=n/2+r*n,l=o?Math.floor(a/o):0;s.y=e+l*n||0,s.x=o?a%o+i:a+i})}function ei(t,e){return t instanceof Map?Array.from(t.entries()).map(([o,i])=>{const s=ei(i,e);if(o){const r=$e(e)?rn(mn,e):rn(mn,pt(o,e));return{id:o,layoutOptions:r,children:s}}else return s}).flat():t}function ni(t){var e,n;const o=t.x,i=t.y;(e=t.edges)===null||e===void 0||e.forEach(s=>{var r,a;(r=s.sections)===null||r===void 0||r.forEach(l=>{var c;l.startPoint.x+=o,l.startPoint.y+=i,l.endPoint.x+=o,l.endPoint.y+=i,(c=l.bendPoints)===null||c===void 0||c.forEach(u=>{u.x+=o,u.y+=i})}),(a=s.labels)===null||a===void 0||a.forEach(l=>{l.x+=o,l.y+=i})}),(n=t.children)===null||n===void 0||n.forEach(s=>{s.x+=o,s.y+=i,ni(s)})}function ya(t,e,n,o){const{nonConnectedNodes:i,connectedNodes:s,nodes:r}=t,{layoutNonConnectedAside:a,nodeSize:l}=e,c=n,u=o,d=a?s:r,p=Pt(d,l),y=u/p,_=y<d.length/2?d.length/2/y:1,x=c/p,g=x<d.length/2?d.length/2/x:1,v=Math.max(g,_);if(d.forEach((m,f)=>{const h=v*c/2,k=v*u/2,S=2*f*Math.PI/d.length;m.x=c/2+h*Math.cos(S),m.y=u/2+k*Math.sin(S)}),a){const m=Pt(i,l),f=J(s.map(N=>N.y)),h=J(s.map(N=>N.x)),k=yt(s.map(N=>N.x)),S=h-k;oe(i,f+m*3,m*2.25,Math.max(S,n),k)}}function bo(t,e,n,o,i){const{nonConnectedNodes:s,connectedNodes:r,nodes:a}=t,{layoutNonConnectedAside:l,layoutGroupOrder:c,layoutParallelSortConnectionsByGroup:u,layoutParallelNodesPerColumn:d,layoutParallelSubGroupsPerRow:p,nodeSize:y,layoutNodeGroup:_,layoutParallelNodeSubGroup:x,layoutParallelGroupSpacing:g}=e,v=n-nn(y),m=o-nn(y)-(s.length?nn(y)*5:0),f=l?r:a,h=wo(f.map($=>Q($,_,$._index))),S=Lo(h,$=>c.indexOf($)).map($=>{const P=f.filter(A=>Q(A,_,A._index)===$),E=Ei(P,A=>Q(A,x,A._index)),M=Object.keys(E).map(A=>({nodes:E[A],name:A}));return{name:$,nodes:P,subgroups:M}}),N=S.find($=>$.name===u);if(N){const $={};let P=0;N.subgroups.forEach(E=>{E.nodes.forEach(M=>{M.links.forEach(A=>{const D=A==null?void 0:A.target._id;$[D]=P,P=P+1})})}),xo(S,N).forEach(E=>{E.subgroups.forEach(M=>{M.nodes.sort((A,D)=>($[A._id]||0)-($[D._id]||0))})})}const L=J(S,$=>{var P;return(P=$.nodes)===null||P===void 0?void 0:P.length}),b=40,T=10,C=40,w=Pt(f,y);if(i==="horizontal"){const $=2*w+T,P=3.5*w+T,E=Ct(v/(L-1),$,P),M=w*4+b,A=w*1.5+b,D=w+g||Ct(m/(S.length-1),A,M),I=w+b+T;let R=S.length<2?o/2:0;S.forEach(G=>{let B=0,U=0,W=0,Y=0,X=0,H=0;G.subgroups.forEach(q=>{const st=Math.ceil(q.nodes.length/d);let Z=0,ot=B,ht=R+U;q.nodes.forEach(mt=>{ot=ot+E,mt.x=ot,mt.y=ht,Y=Math.max(Y,ot),Z=Z+1,Z>=d&&(Z=0,ht+=I,ot=B)});const dt=Math.min(q.nodes.length,d)*E,Lt=st*I;W=Math.max(W,dt),U=U+Lt+C,H=H+1,H>=p&&(H=0,U=0,B=B+W+C,W=0),X=Math.max(X,ht)}),G.subgroups.forEach(q=>{q.nodes.forEach(st=>{st.x-=Y/2})}),Y=0,R=X+D})}else{const $=6*w+T,P=10*w+T,E=w+g||Ct(v/(L-1),$,P),M=w*2+b,A=w*1.5+b,D=Ct(m/(S.length-1),A,M),I=w*2;let R=S.length<2?n/2:0;S.forEach(G=>{let B=0,U=0,W=0,Y=0,X=0,H=0;G.subgroups.forEach(q=>{const st=Math.ceil(q.nodes.length/d);let Z=0,ot=B,ht=R+U;q.nodes.forEach(mt=>{ot=ot+D,mt.x=ht,mt.y=ot,X=Math.max(X,ot),Z=Z+1,Z>=d&&(Z=0,ht+=I,ot=B)});const dt=Math.min(q.nodes.length,d)*D,Lt=st*I;W=Math.max(W,dt),U=U+Lt+C,H=H+1,H>=p&&(H=0,U=0,B=B+W+C,W=0),Y=Math.max(Y,ht)}),G.subgroups.forEach(q=>{q.nodes.forEach(st=>{st.y-=X/2})}),X=0,R=Y+E})}if(l){const $=Pt(s,y),P=J(r.map(D=>D.y))||0,E=J(r.map(D=>D.x))||0,M=yt(r.map(D=>D.x))||0,A=E-M||n;oe(s,P+$*3,$*2.25,Math.max(A,n))}}function ma(t,e,n){return Ce(this,void 0,void 0,function*(){const{nonConnectedNodes:o,connectedNodes:i,nodes:s,links:r}=t,{nodeSize:a,layoutNonConnectedAside:l,dagreLayoutSettings:c,nodeStrokeWidth:u,nodeLabel:d}=e,{Graph:p}=yield we(()=>import("./x3ogAcxn.js"),__vite__mapDeps([0,1]),import.meta.url),{layout:y}=yield we(()=>import("./DDHWmqeV.js"),__vite__mapDeps([2,1]),import.meta.url),_=new p;_.setGraph(c),_.setDefaultEdgeLabel(()=>({}));const x=40;if((l?i:s).forEach(v=>{_.setNode(`${v._index}`,{label:Q(v,d,v._index),width:j(v,a,v._index)*1.5+j(v,u,v._index),height:x+j(v,a,v._index)*1.5,originalNode:v})}),r.forEach(v=>{_.setEdge(`${v.source._index}`,`${v.target._index}`)}),y(_),_.nodes().forEach(v=>{const m=_.node(v);m.originalNode.x=m.x,m.originalNode.y=m.y}),l){const v=Pt(o,a),m=J(i.map(S=>S.y)),f=J(i.map(S=>S.x)),h=yt(i.map(S=>S.x)),k=f-h;oe(o,m+v*3,v*2.25,Math.max(k,n),0)}})}function ka(t,e,n,o){var i,s;const{nonConnectedNodes:r,connectedNodes:a,nodes:l}=t,{layoutNonConnectedAside:c,layoutGroupOrder:u,nodeSize:d,layoutNodeGroup:p}=e,y=c?a:l,_=wo(y.map(f=>Q(f,p,f._index))),g=Lo(_,f=>u.indexOf(f)).map(f=>({name:f,nodes:y.filter(h=>Q(h,p,h._index)===f)}));let v=2*po((s=(i=g[0])===null||i===void 0?void 0:i.nodes)!==null&&s!==void 0?s:[],d);const m=n/o;if(g.forEach((f,h)=>{const k=po(f.nodes,d),S=1.1*k*f.nodes.length/Math.PI;v<S&&(v=S),f.nodes.forEach((L,b)=>{if(h===0&&f.nodes.length===1)L.x=n/2,L.y=o/2;else{let T=0;h===0&&f.nodes.length===3&&(T=Math.PI/6),h===0&&f.nodes.length===4&&(T=Math.PI/4);const C=2*b*Math.PI/f.nodes.length+h*Math.PI/12+T;L.x=n/2+v*Math.cos(C)*m,L.y=o/2+v*Math.sin(C)}});const N=k*3;v+=N}),c){const f=Pt(r,d),h=J(a.map(L=>L.y)),k=J(a.map(L=>L.x)),S=yt(a.map(L=>L.x)),N=k-S;oe(r,h+f*3,f*2.25,N,S)}}function xa(t,e,n){var o;return Ce(this,void 0,void 0,function*(){const{layoutNonConnectedAside:i,forceLayoutSettings:s,nodeSize:r}=e,{forceSimulation:a,forceLink:l,forceManyBody:c,forceX:u,forceY:d,forceCollide:p}=yield we(()=>import("./DhPhQCnN.js"),__vite__mapDeps([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]),import.meta.url),{nonConnectedNodes:y,connectedNodes:_,nodes:x,links:g}=t;s.fixNodePositionAfterSimulation?x.forEach(f=>{f.fx=Se(f._state.fx)?void 0:f._state.fx,f.fy=Se(f._state.fy)?void 0:f._state.fy}):x.forEach(f=>{delete f._state.fx,delete f._state.fy});const v=a(i?_:x).force("link",l(g).id(f=>String(f._id)).distance((f,h)=>zt(s.linkDistance)?s.linkDistance(f,h):s.linkDistance).strength((f,h)=>zt(s.linkStrength)?s.linkStrength(f,h):s.linkStrength)).force("charge",c().strength((f,h)=>{if(zt(s.charge))return s.charge(f,h);{const k=g.reduce((S,N)=>S+ +(N.source===f||N.target===f),0);return s.charge*Math.sqrt(k)}})).force("x",u().strength(s.forceXStrength)).force("y",d().strength(s.forceYStrength)).force("collide",p().radius((f,h)=>At(f,r,h)).iterations(1)).stop(),m=(o=s.numIterations)!==null&&o!==void 0?o:Math.ceil(Math.log(v.alphaMin())/Math.log(1-v.alphaDecay()));for(let f=0,h=m;f<h;++f)v.tick();if(s.fixNodePositionAfterSimulation&&x.forEach(f=>{delete f.fx,delete f.fy,f._state.fx=f.x,f._state.fy=f.y}),i){const f=Pt(y,r),h=J(_.map(L=>L.y)),k=J(_.map(L=>L.x)),S=yt(_.map(L=>L.x)),N=k-S;oe(y,h+f*6,f*2.25,Math.max(N,n),S)}})}function Sa(t,e,n){return Ce(this,void 0,void 0,function*(){const o=(yield we(()=>import("./1cTG7gyz.js").then(d=>d.e),__vite__mapDeps([21,19]),import.meta.url)).default,i=new o,s=30,r=t.nodes.map((d,p)=>Object.assign(Object.assign(Object.assign({},d),{id:d._id,width:j(d,e.nodeSize,d._index)+j(d,e.nodeStrokeWidth,d._index),height:j(d,e.nodeSize,d._index)+s}),e.layoutElkGetNodeShape?e.layoutElkGetNodeShape(d,p):{}));let a;if(e.layoutElkNodeGroups){const d=e.layoutElkNodeGroups.map(y=>_=>Q(_,y,_._index)),p=Fi(r,...d);a=ei(p,e.layoutElkSettings)}else a=r;const l="root",c={id:l,layoutOptions:rn(mn,pt(l,e.layoutElkSettings)),children:a,edges:t.links.map(d=>({id:d._id,sources:[d.source._id],targets:[d.target._id]}))},u=yield i.layout(c);if(ni(u),r.forEach((d,p)=>{const y=t.nodes.find(_=>_._id===d.id);y&&(y.x=d.x+d.width/2,y.y=d.y+d.height/2)}),e.layoutNonConnectedAside){const d=Pt(t.nonConnectedNodes,e.nodeSize),p=J(t.connectedNodes.map(g=>g.y))||0,y=J(t.connectedNodes.map(g=>g.x))||0,_=yt(t.connectedNodes.map(g=>g.x))||0,x=y-_||n;oe(t.nonConnectedNodes,p+d*3,d*2.25,Math.max(x,n))}})}class Vt extends Ni{constructor(e){super(),this._defaultConfig=Bs,this.config=this._defaultConfig,this.datamodel=new Ds,this._isFirstRender=!0,this._shouldRecalculateLayout=!1,this._shouldSetPanels=!1,this._isAutoFitDisabled=!1,this._isDragging=!1,this._linkPathLengthMap=new Map,this.events={[Vt.selectors.background]:{click:this._onBackgroundClick.bind(this)},[Vt.selectors.node]:{click:this._onNodeClick.bind(this),mouseover:this._onNodeMouseOver.bind(this),mouseout:this._onNodeMouseOut.bind(this)},[Vt.selectors.link]:{click:this._onLinkClick.bind(this),mouseover:this._onLinkMouseOver.bind(this),mouseout:this._onLinkMouseOut.bind(this)}},e&&this.setConfig(e),this._backgroundRect=this.g.append("rect").attr("class",Bo),this._graphGroup=this.g.append("g").attr("class",Ro),this._brush=this.g.append("g").attr("class",Ws),this._zoomBehavior=Mi().scaleExtent(this.config.zoomScaleExtent).on("zoom",n=>this._onZoom(n.transform,n)).on("start",n=>this._onZoomStart(n.transform,n)).on("end",n=>this._onZoomEnd(n.transform,n)),this._brushBehavior=Gs().on("start brush end",this._onBrush.bind(this)).filter(n=>n.shiftKey).keyModifiers(!1),this._panelsGroup=this._graphGroup.append("g").attr("class",Fo),this._linksGroup=this._graphGroup.append("g").attr("class",Go),this._nodesGroup=this._graphGroup.append("g").attr("class",Ln),this._defs=this._graphGroup.append("defs"),this._getLinkArrowDefId=this._getLinkArrowDefId.bind(this)}get selectedNode(){var e;return(e=this._selectedNodes)===null||e===void 0?void 0:e[0]}get selectedNodes(){return this._selectedNodes}get selectedLink(){return this._selectedLink}setData(e){const{config:n}=this;n.shouldDataUpdate(this.datamodel.data,e,this.datamodel)&&(this.datamodel.nodeSort=n.nodeSort,this.datamodel.data=e,this._shouldRecalculateLayout=!0,n.layoutAutofit&&(this._shouldFitLayout=!0),this._shouldSetPanels=!0,this._addSVGDefs())}setConfig(e){super.setConfig(e);const n=this._shouldLayoutRecalculate();this._shouldRecalculateLayout=this._shouldRecalculateLayout||n,this._shouldFitLayout=this._shouldFitLayout||n,this._shouldFitLayout&&(this._isAutoFitDisabled=!1),this._shouldSetPanels=!0}get bleed(){const e=this.config.fitViewPadding;return ye(e)?{top:e,bottom:e,left:e,right:e}:e}_render(e){const{config:{disableBrush:n,disableZoom:o,duration:i,layoutAutofit:s,zoomEventFilter:r},datamodel:a}=this;if(!a.nodes&&!a.links)return;const l=ye(e)?e:i;this._backgroundRect.attr("width",this._width).attr("height",this._height).attr("opacity",0),(this._prevWidth!==this._width||this._prevHeight!==this._height)&&s&&(this._shouldFitLayout=!0,this._prevWidth=this._width,this._prevHeight=this._height),n?(this._brush.on(".brush",null),V(window).on("keydown.unovis-graph",null).on("keyup.unovis-graph",null),this._brush.classed("active")&&this._clearBrush()):(this._brushBehavior.extent([[0,0],[this._width,this._height]]),this._brush.call(this._brushBehavior),V(window).on("keydown.unovis-graph",c=>c.key==="Shift"&&this._activateBrush()).on("keyup.unovis-graph",c=>c.key==="Shift"&&this._clearBrush()),this._zoomBehavior.filter(c=>!c.shiftKey)),(this._shouldRecalculateLayout||!this._layoutCalculationPromise)&&(this._layoutCalculationPromise=this._calculateLayout(),this._layoutCalculationPromise.then(()=>{var c,u;(u=(c=this.config).onLayoutCalculated)===null||u===void 0||u.call(c,a.nodes,a.links)})),this._zoomBehavior.filter(zt(r)?r:c=>(!c.ctrlKey||c.type==="wheel")&&!c.button&&!c.shiftKey),this._layoutCalculationPromise.then(()=>{var c,u,d;if(!this.isDestroyed()){if(this._initPanelsData(),this._isFirstRender?(this._fit(),this._shouldFitLayout=!1):this._shouldFitLayout&&!this._isAutoFitDisabled&&(this._fit(i),this._shouldFitLayout=!1),this._resetSelectionGreyoutState(),this.config.selectedNodeId||this.config.selectedNodeIds){const y=((c=this.config.selectedNodeIds)!==null&&c!==void 0?c:[this.config.selectedNodeId]).map(_=>a.getNodeById(_));this._setNodeSelectionState(y)}if(this.config.selectedLinkId){const p=a.links.find(y=>y.id===this.config.selectedLinkId);this._setLinkSelectionState(p)}this._drawNodes(l),this._drawLinks(l),this._timer||(this._timer=Vi(this._onLinkFlowTimerFrame.bind(this),35)),o?this.g.on(".zoom",null):this.g.call(this._zoomBehavior).on("dblclick.zoom",null),this._setUpComponentEventsThrottled(),this._setCustomAttributesThrottled(),(d=(u=this.config).onRenderComplete)===null||d===void 0||d.call(u,this.g,a.nodes,a.links,this.config,l,this._scale,this._containerWidth,this._containerHeight),this._isFirstRender=!1}})}_drawNodes(e){const{config:n,datamodel:o}=this,i=o.nodes,s=this._nodesGroup.selectAll(`.${kt}:not(.${ke})`).data(i,d=>String(d._id)),r=s.enter().append("g").attr("class",kt).call(Zs,n,e,this._scale),a=s.merge(r),l=se(a,n,e,this._scale);this._drawPanels(l,e),s.exit().classed(ke,!0).call(Ks,n,e,this._scale);const u=this;if(n.disableDrag)a.on(".drag",null);else{const d=ws().on("start drag end",function(p,y){u._handleDrag(y,p,V(this))});a.call(d)}}_drawLinks(e){const{config:n,datamodel:{links:o}}=this,i=this._linksGroup.selectAll(`.${wt}:not(.${Je}`).data(o,l=>String(l._id)),s=i.enter().append("g").attr("class",wt).call(sa,n,e);i.merge(s).call(sn,n,e,this._scale,this._getLinkArrowDefId,this._linkPathLengthMap),i.exit().attr("class",Je).call(aa,n,e)}_drawPanels(e,n){var o;const{config:i}=this;if(tt(this._panelsGroup,n/2).style("opacity",!((o=i.panels)===null||o===void 0)&&o.length?1:0),!this._panels)return;const s=e.duration?e.selection():e;pa(s,this._panels,i),ga(s,this._panels,i);const r=this._panels.filter(d=>d._numNodes),a=this._panelsGroup.selectAll(`.${_n}`).data(r,d=>d.label);a.exit().call(ba,i,n);const c=a.enter().append("g").attr("class",_n).call(_a,s),u=a.merge(c);this._updatePanels(u,n)}_updatePanels(e,n){const{config:o}=this;this._panels&&e.call(va,o,n)}_calculateLayout(){return Ce(this,void 0,void 0,function*(){const{config:e,datamodel:n}=this;if(this._currentLayoutType!==e.layoutType)for(const o of n.nodes)delete o._state.fx,delete o._state.fy;switch(e.layoutType){case at.Precalculated:break;case at.Parallel:bo(n,e,this._width,this._height);break;case at.ParallelHorizontal:bo(n,e,this._width,this._height,"horizontal");break;case at.Dagre:yield ma(n,e,this._width);break;case at.Force:yield xa(n,e,this._width);break;case at.Concentric:ka(n,e,this._width,this._height);break;case at.Elk:yield Sa(n,e,this._width);break;case at.Circular:default:ya(n,e,this._width,this._height);break}this._initPanelsData(),this._shouldRecalculateLayout=!1,this._currentLayoutType=e.layoutType})}_initPanelsData(){const{config:e,datamodel:n}=this;this._shouldSetPanels&&(this._panels=da(e.panels),ua(this._panels,n.nodes,this.config),this._shouldSetPanels=!1)}_fit(e=0,n,o=this.config.fitViewAlign){const{datamodel:{nodes:i}}=this,s=n!=null&&n.length?i.filter(a=>n.includes(a.id)):i,r=this._getTransform(s,o);tt(this.g,e).call(this._zoomBehavior.transform,r),this._onZoom(r)}_getTransform(e,n){const{nodeSize:o,zoomScaleExtent:i}=this.config,{left:s,top:r,right:a,bottom:l}=this.bleed,c=Pt(e,o),u=this._width,d=this._height,p=[yt(e,h=>ft(h)-c/2-(J((h._panels||[]).map(k=>k._padding.left))||0)),J(e,h=>ft(h)+c/2+(J((h._panels||[]).map(k=>k._padding.right))||0))],y=[yt(e,h=>gt(h)-c/2-(J((h._panels||[]).map(k=>k._padding.top))||0)),J(e,h=>gt(h)+c/2+(J((h._panels||[]).map(k=>k._padding.bottom))||0))];if(p.some(h=>h===void 0)||y.some(h=>h===void 0))return console.warn("Unovis | Graph: Some of the node coordinates are undefined. This can happen if you try to fit the graph before the layout has been calculated."),Kn;const _=u/(p[1]-p[0]+(s||0)+(a||0)),x=d/(y[1]-y[0]+(r||0)+(l||0)),g=Ct(yt([_,x]),i[0],i[1]);let v,m;switch(n){case Tt.Left:v=s-p[0]*g,m=this._height/2-(y[0]+(y[1]-y[0])/2)*g;break;case Tt.Right:v=this._width-(p[1]-p[0])*g-a,m=this._height/2-(y[0]+(y[1]-y[0])/2)*g;break;case Tt.Top:v=this._width/2-(p[0]+(p[1]-p[0])/2)*g,m=r-y[0]*g;break;case Tt.Bottom:v=this._width/2-(p[0]+(p[1]-p[0])/2)*g,m=this._height-(y[1]-y[0])*g-l;break;case Tt.Center:default:v=this._width/2-(p[0]+(p[1]-p[0])/2)*g,m=this._height/2-(y[0]+(y[1]-y[0])/2)*g}return Kn.translate(v,m).scale(g)}_setNodeSelectionState(e){const{config:n,datamodel:o}=this;for(const i of o.nodes)i._state.selected=!1,n.nodeSelectionHighlightMode!==qt.None&&(i._state.greyout=!0);for(const i of o.links)i._state.selected=!1,n.nodeSelectionHighlightMode!==qt.None&&(i._state.greyout=!0);this._selectedNodes=e.filter(i=>{const s=!!i;return s||console.warn("Unovis | Graph: Select Node: Not found"),s});for(const i of this._selectedNodes)i._state.selected=!0,i._state.greyout=!1;n.nodeSelectionHighlightMode===qt.GreyoutNonConnected&&o.links.filter(s=>this._selectedNodes.includes(s.source)||this._selectedNodes.includes(s.target)).forEach(s=>{s.source._state.greyout=!1,s.target._state.greyout=!1,s._state.greyout=!1})}_setLinkSelectionState(e){const{datamodel:{nodes:n,links:o}}=this;e||console.warn("Unovis: Graph: Select Link: Not found"),this._selectedLink=e;const i=e==null?void 0:e.source,s=e==null?void 0:e.target;n.forEach(r=>{r._state.selected=!1,r._state.greyout=!0,((s==null?void 0:s._id)===r._id||(i==null?void 0:i._id)===r._id)&&(e._state.greyout=!1)}),o.forEach(r=>{r._state.greyout=!0;const a=r.source,l=r.target;a._id===(i==null?void 0:i._id)&&l._id===(s==null?void 0:s._id)&&(a._state.greyout=!1,l._state.greyout=!1,r._state.greyout=!1)}),o.forEach(r=>{delete r._state.selected}),e&&(e._state.selected=!0)}_resetSelectionGreyoutState(){const{datamodel:{nodes:e,links:n}}=this;this._selectedNodes=[],this._selectedLink=void 0,e.forEach(o=>{delete o._state.selected,delete o._state.greyout}),n.forEach(o=>{delete o._state.greyout,delete o._state.selected})}_updateNodesLinksPartial(){const{config:e}=this;this._linksGroup.selectAll(`.${wt}`).call(Ko,e,this._scale),this._nodesGroup.selectAll(`.${kt}`).call(le,e,e.duration,this._scale)}_onBackgroundClick(){this._resetSelectionGreyoutState(),this._updateNodesLinksPartial()}_onNodeClick(e){}_onNodeMouseOut(e){this._updateNodesLinksPartial()}_onNodeMouseOver(e){this._updateNodesLinksPartial()}_onLinkClick(e){}_onLinkMouseOver(e){this._isDragging||(this.config.linkHighlightOnHover&&(e._state.hovered=!0),this._updateNodesLinksPartial())}_onLinkMouseOut(e){this._isDragging||(delete e._state.hovered,this._updateNodesLinksPartial())}_onLinkFlowTimerFrame(e=0){const{config:n,datamodel:{links:o}}=this;if(!o.some((r,a)=>Mt(r,n.linkFlow,a)))return;const s=this._linksGroup.selectAll(`.${wt}`);s.each((r,a,l)=>{var c;let u=j(r,n.linkFlowAnimDuration,r._indexGlobal);const d=j(r,n.linkFlowParticleSpeed,r._indexGlobal);if(d){const p=l[a].querySelector(`.${ge}`),y=p?(c=this._linkPathLengthMap.get(p.getAttribute("d")))!==null&&c!==void 0?c:p.getTotalLength():0;y>0&&(u=y/d*1e3)}r._state.flowAnimTime=e%u/u}),_o(s,this.config,this._scale,this._linkPathLengthMap)}_onZoom(e,n){const{config:o,datamodel:{nodes:i}}=this,s=e||n.transform;this._scale=s.k,this._graphGroup.attr("transform",s.toString()),zt(o.onZoom)&&o.onZoom(this._scale,o.zoomScaleExtent,n,s),this._initialTransform||(this._initialTransform=s),n!=null&&n.sourceEvent&&(Object.keys(s).reduce((a,l)=>{const c=s[l],u=this._initialTransform[l],d=Math.abs(c-u),p=l==="k"?20*d:d/15;return a+=p,a},0)>o.layoutAutofitTolerance?this._isAutoFitDisabled=!0:this._isAutoFitDisabled=!1),this._nodesGroup.selectAll(`.${kt}`).call(i.length>o.zoomThrottledUpdateNodeThreshold?ta:jo,o,this._scale),this._linksGroup.selectAll(`.${wt}`).call(i.length>o.zoomThrottledUpdateNodeThreshold?ra:Jo,o,this._scale,this._getLinkArrowDefId)}_onZoomStart(e,n){const{config:o}=this,i=e||n.transform;this._scale=i.k,zt(o.onZoomStart)&&o.onZoomStart(this._scale,o.zoomScaleExtent,n,i)}_onZoomEnd(e,n){const{config:o}=this,i=e||n.transform;this._scale=i.k,zt(o.onZoomEnd)&&o.onZoomEnd(this._scale,o.zoomScaleExtent,n,i)}_updateNodePosition(e,n,o){var i,s;const r=pe(this.g.node()),a=r.k,l=(s=(i=this._panels)===null||i===void 0?void 0:i.filter(_=>_.nodes.includes(e._id)))!==null&&s!==void 0?s:[],c=At(e,this.config.nodeSize,e._index),u=yt([(this._height-r.y)/a,...l.map(_=>_._y+_._height)])-c/2,d=yt([(this._width-r.x)/a,...l.map(_=>_._x+_._width)])-c/2,p=J([-r.y/a,...l.map(_=>_._y)])+c/2,y=J([-r.x/a,...l.map(_=>_._x)])+c/2;o<p?o=p:o>u&&(o=u),n<y?n=y:n>d&&(n=d),Math.sqrt(Math.pow(n-e.x,2)+Math.pow(o-e.y,2))<15&&(n=e.x,o=e.y),e._state.fx=n,e._state.fy=o,e._state.fx===e.x&&delete e._state.fx,e._state.fy===e.y&&delete e._state.fy}_onBrush(e){var n;if(!e.selection||!e.sourceEvent)return;const{config:o}=this,i=pe(this._graphGroup.node()),[s,r]=i.invert(e.selection[0]),[a,l]=i.invert(e.selection[1]);this._nodesGroup.selectAll(`.${kt}`).each(u=>{const d=ft(u),p=gt(u);u._state.brushed=d>=s&&d<=a&&p>=r&&p<=l}).classed(ae,u=>u._state.brushed);const c=this._nodesGroup.selectAll(`.${ae}`).call(le,o,0,this._scale);this._brush.classed("active",e.type!=="end"),(n=o.onNodeSelectionBrush)===null||n===void 0||n.call(o,c.data(),e)}_handleDrag(e,n,o){if(n.sourceEvent.shiftKey&&e._state.brushed)this._dragSelectedNodes(n);else if(!n.sourceEvent.shiftKey)switch(n.type){case"start":this._onDragStarted(e,n,o);break;case"drag":this._onDragged(e,n);break;case"end":this._onDragEnded(e,n,o);break}}_onDragStarted(e,n,o){var i;const{config:s}=this;this._isDragging=!0,e._state.isDragged=!0,o.call(se,s,0,this._scale),(i=s.onNodeDragStart)===null||i===void 0||i.call(s,e,n)}_onDragged(e,n){var o;const{config:i}=this,r=pe(this.g.node()).k,[a,l]=Kt(n,this._graphGroup.node());this._updateNodePosition(e,a,l),this._nodesGroup.selectAll(`.${kt}`).filter(_=>_._id===e._id).call(se,i,0,r);const p=this._linksGroup.selectAll(`.${wt}`).filter(_=>{const x=_.source,g=_.target;return x._id===e._id||g._id===e._id});p.call(sn,i,0,r,this._getLinkArrowDefId,this._linkPathLengthMap);const y=p.filter(_=>_._state.greyout);y.size()&&_o(y,i,this._scale,this._linkPathLengthMap),(o=i.onNodeDrag)===null||o===void 0||o.call(i,e,n)}_onDragEnded(e,n,o){var i;const{config:s}=this;this._isDragging=!1,e._state.isDragged=!1,o.call(se,s,0,this._scale),(i=s.onNodeDragEnd)===null||i===void 0||i.call(s,e,n)}_dragSelectedNodes(e){var n,o;const{config:i}=this,s=Kt(e,this._graphGroup.node()),r=tt(this._nodesGroup.selectAll(`.${ae}`));if(e.type==="start")this._groupDragInit=s,this._isDragging=!0,r.each(a=>{a.x=ft(a),a.y=gt(a),a._state.isDragged=!0});else if(e.type==="drag"){const a=s[0]-this._groupDragInit[0],l=s[1]-this._groupDragInit[1];r.each(u=>this._updateNodePosition(u,u.x+a,u.y+l)),tt(this._linksGroup.selectAll(`.${wt}`).filter(u=>{var d,p,y,_;return((p=(d=u.source)===null||d===void 0?void 0:d._state)===null||p===void 0?void 0:p.isDragged)||((_=(y=u.target)===null||y===void 0?void 0:y._state)===null||_===void 0?void 0:_.isDragged)})).call(sn,this.config,0,this._scale,this._getLinkArrowDefId,this._linkPathLengthMap)}else this._isDragging=!1,r.each(a=>{a._state.isDragged=!1});r.call(se,i,0,this._scale),(o=(n=this.config).onNodeSelectionDrag)===null||o===void 0||o.call(n,r.data(),e)}_activateBrush(){this._brush.classed("active",!0),this._nodesGroup.selectAll(`.${kt}`).classed(Jt,!0)}_clearBrush(){var e;this._brush.classed("active",!1).call((e=this._brushBehavior)===null||e===void 0?void 0:e.clear),this._nodesGroup.selectAll(`.${kt}`).classed(Jt,!1).classed(ae,!1).each(n=>{n._state.brushed=!1}).call(le,this.config,0,this._scale)}_shouldLayoutRecalculate(){const{prevConfig:e,config:n}=this;if(e.layoutType!==n.layoutType||e.layoutNonConnectedAside!==n.layoutNonConnectedAside)return!0;if(e.layoutType===at.Force){const o=Ue(e.forceLayoutSettings,n.forceLayoutSettings);if(Object.keys(o).length)return!0}if(e.layoutType===at.Dagre){const o=Ue(e.dagreLayoutSettings,n.dagreLayoutSettings);if(Object.keys(o).length)return!0}if(e.layoutType===at.Elk)if($e(e.layoutElkSettings)&&$e(n.layoutElkSettings)){const o=Ue(e.layoutElkSettings,n.layoutElkSettings);return!!Object.keys(o).length}else return e.layoutElkSettings!==n.layoutElkSettings;return(e.layoutType===at.Parallel||e.layoutType===at.ParallelHorizontal||e.layoutType===at.Concentric)&&(!kn(e.layoutGroupOrder,n.layoutGroupOrder)||e.layoutParallelNodesPerColumn!==n.layoutParallelNodesPerColumn||e.layoutParallelSortConnectionsByGroup!==n.layoutParallelSortConnectionsByGroup)}_getLinkArrowDefId(e){return e?`${this.uid}-${e}`:null}_addSVGDefs(){this._defs.selectAll("*").remove(),this._defs.append("path").attr("d",na()).attr("id",this._getLinkArrowDefId(Qt.Single)),this._defs.append("path").attr("d",oa()).attr("id",this._getLinkArrowDefId(Qt.Double))}zoomIn(e=.3){const n=1+e;tt(this.g,this.config.duration/2).call(this._zoomBehavior.scaleBy,n)}zoomOut(e=.3){const n=1-e;tt(this.g,this.config.duration/2).call(this._zoomBehavior.scaleBy,n)}setZoom(e){tt(this.g,this.config.duration/2).call(this._zoomBehavior.scaleTo,e)}getZoom(){return pe(this.g.node()).k}fitView(e=this.config.duration,n,o){var i;(i=this._layoutCalculationPromise)===null||i===void 0||i.then(()=>{this._fit(e,n,o)})}resetAutofitState(){this._isAutoFitDisabled=!1}getNodesCoordinates(){const{datamodel:{nodes:e}}=this;return e.map(n=>({id:n._id,x:n.x,y:n.y}))}getNodeCoordinatesById(e){const{datamodel:{nodes:n}}=this,o=n.find(i=>i._id===e);if(o)return{id:o._id,x:o.x,y:o.y};console.warn(`Unovis | Graph: Node ${e} not found`)}setNodeStateById(e,n){this.datamodel.setNodeStateById(e,n)}updateNodePositions(e){const{config:n}=this,o=ye(e)?e:n.duration,i=this._linksGroup.selectAll(`.${wt}:not(.${Je}`);Qo(i,n,o,this._scale,this._getLinkArrowDefId,this._linkPathLengthMap);const s=this._nodesGroup.selectAll(`.${kt}:not(.${ke})`);Uo(s,o)}}Vt.selectors={root:Hs,graphGroup:Ro,background:Bo,node:kt,nodeShape:xt,nodeGauge:It,nodeSideLabel:An,nodeLabel:Bt,dimmedNode:Tn,link:wt,linkLine:Dt,linkLabel:pn,dimmedLink:Do,panel:_n,panelRect:zn,panelSelection:In,panelLabel:Gn,panelLabelText:re,panelSideIcon:Dn,panelSideIconShape:Bn,panelSideIconSymbol:Rn};Vt.nodeSelectors=Fs;var $a=ci("<vis-component></vis-component>",2);function Ga(t,e){const n=Qn(e,["children","$$slots","$$events","$$legacy"]),o=Qn(n,["getComponent","data"]);ai(e,!1);let i=Ci(e,"data",8,void 0),s=Fe(),r=Fe(),a=Fe();const l=ri("component");si(()=>(Oe(a,new Vt(it(r))),()=>it(a)===null||it(a)===void 0?void 0:it(a).destroy()));function c(){return it(a)}Re(()=>Vn(o),()=>{Oe(r,Object.assign({},o))}),Re(()=>(it(a),Vn(i())),()=>{it(a)===null||it(a)===void 0||it(a).setData(i())}),Re(()=>(it(s),it(r),it(a)),()=>{Ai(it(s),it(r))||(it(a)===null||it(a)===void 0||it(a).setConfig(it(r)),Oe(s,it(r)))}),li(),Ti();var u=$a();return hi(u,(d,p)=>l==null?void 0:l(d,p),()=>it(a)),di(t,u),Pi(e,"getComponent",c),ui({getComponent:c})}export{Vt as G,Ga as a,at as b,nt as c,Qt as d};
