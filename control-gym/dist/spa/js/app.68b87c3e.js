(function(e){function t(t){for(var a,n,c=t[0],i=t[1],l=t[2],u=0,d=[];u<c.length;u++)n=c[u],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&d.push(s[n][0]),s[n]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,n=1;n<r.length;n++){var c=r[n];0!==s[c]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var a={},n={2:0},s={2:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{1:"6b44677a",3:"6757c7d0",4:"5f43f472",5:"9ac8086f",6:"9d72078e",7:"76798fe7",8:"c2bef2e8",9:"ab91ac21",10:"d154c2b3",11:"b771caf0",12:"4338b4c2",13:"5edae911",14:"82182210"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[],r={1:1,3:1,4:1,5:1,6:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=new Promise((function(t,r){for(var a="css/"+({}[e]||e)+"."+{1:"91f325c7",3:"8ea13926",4:"b984a522",5:"e854e430",6:"e3e31e48",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0",10:"31d6cfe0",11:"31d6cfe0",12:"31d6cfe0",13:"31d6cfe0",14:"31d6cfe0"}[e]+".css",s=i.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var l=o[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===s))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],u=l.getAttribute("data-href");if(u===a||u===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete n[e],f.parentNode.removeChild(f),r(o)},f.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){n[e]=0})));var a=s[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,r){a=s[e]=[t,r]}));t.push(a[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=c(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var r=s[e];if(0!==r){if(r){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+n+")",d.name="ChunkLoadError",d.type=a,d.request=n,r[1](d)}s[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(r,a,function(t){return e[t]}.bind(null,a));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;o.push([0,0]),r()})({0:function(e,t,r){e.exports=r("2f39")},"0047":function(e,t,r){},"2f39":function(e,t,r){"use strict";r.r(t);var a={};r.r(a),r.d(a,"someGetter",(function(){return z}));var n={};r.r(n),r.d(n,"setUser",(function(){return x})),r.d(n,"token",(function(){return S}));var s={};r.r(s),r.d(s,"getUser",(function(){return E}));r("e6cf"),r("5319"),r("573e"),r("7d6e"),r("e54f"),r("985d"),r("0047");var o=r("2b0e"),c=r("1f91"),i=r("42d2"),l=r("b05d"),u=r("2a19"),d=r("18d6"),f=r("a639"),p=r("f508"),m=r("436b");o["default"].use(l["a"],{config:{},lang:c["a"],iconSet:i["a"],plugins:{Notify:u["a"],LocalStorage:d["a"],SessionStorage:f["a"],Loading:p["a"],Dialog:m["a"]}});var b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"q-app"}},[r("router-view")],1)},j=[],h=r("ded3"),g=r.n(h),v=r("2f62"),y={name:"App",computed:g()({},Object(v["d"])("example",["user"])),mounted(){0===Object.keys(this.user).length&&(this.$q.sessionStorage.remove("userData"),this.$q.sessionStorage.remove("user"),this.$router.push("/login"),close||window.location.reload(!1))}},w=y,k=r("2877"),P=Object(k["a"])(w,b,j,!1,null,null,null),O=P.exports,q=function(){return{user:{},tokenLogin:null,condominium:null}};function z(){}function x(e,t){e.user=t,t&&t.condominium&&(e.condominium=t.condominium)}async function S(e,t){e.tokenLogin=t}function E({commit:e,state:t,dispatch:r},a){return new Promise((async(e,t)=>{this._vm.$axios.get("http://localhost:4000/api/usuarios/"+a+"?").then((t=>{e(t)})).catch((e=>t(e)))}))}var _={namespaced:!0,getters:a,mutations:n,actions:s,state:q};o["default"].use(v["a"]);var $=function(){const e=new v["a"].Store({modules:{example:_},strict:!1});return e},U=r("8c4f");const L=[{path:"/login",component:()=>Promise.all([r.e(0),r.e(4)]).then(r.bind(null,"74db"))},{path:"/admin",component:()=>Promise.all([r.e(0),r.e(8)]).then(r.bind(null,"c74f")),children:[{path:"",component:()=>Promise.all([r.e(0),r.e(3)]).then(r.bind(null,"37c8"))}]},{path:"/",redirect:"/dashboard",component:()=>Promise.all([r.e(0),r.e(5)]).then(r.bind(null,"713b")),children:[{path:"/dashboard",component:()=>Promise.all([r.e(0),r.e(6)]).then(r.bind(null,"fad3"))},{path:"configuracion/mensualidades",component:()=>Promise.all([r.e(0),r.e(9)]).then(r.bind(null,"2adb"))},{path:"/usuarios",component:()=>Promise.all([r.e(0),r.e(14)]).then(r.bind(null,"2c53"))},{path:"/usuarios/crear",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"1e2d"))},{path:"/usuarios/crear/:id",component:()=>Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"1e2d"))},{path:"/usuarios/ver/:id",component:()=>Promise.all([r.e(0),r.e(7)]).then(r.bind(null,"6ddf"))},{path:"/pagos/generar",component:()=>Promise.all([r.e(0),r.e(11)]).then(r.bind(null,"879b"))},{path:"/pagos/listado",component:()=>Promise.all([r.e(0),r.e(12)]).then(r.bind(null,"042a"))},{path:"/reportes",component:()=>Promise.all([r.e(0),r.e(13)]).then(r.bind(null,"5e15"))}]},{path:"*",component:()=>Promise.all([r.e(0),r.e(10)]).then(r.bind(null,"e51e"))}];var A=L;o["default"].use(U["a"]);var C=function({store:e,ssrContext:t}){const r=new U["a"]({scrollBehavior:()=>({x:0,y:0}),routes:A,mode:"hash",base:""});return r.beforeEach(((t,r,a)=>{var n;return e.state.example.user&&(n=e.state.example.user.role),"/login"===t.path||f["a"].has("userData")?"/"==t.path&&"admin-general"==n?a("/admin"):"/admin"==t.path&&"admin"==n?a("/dashboard"):void a():a("/login")})),r},N=async function(){const e="function"===typeof $?await $({Vue:o["default"]}):$,t="function"===typeof C?await C({Vue:o["default"],store:e}):C;e.$router=t;const r={router:t,store:e,render:e=>e(O),el:"#q-app"};return{app:r,store:e,router:t}},I=r("a925"),T={failed:"Action failed",success:"Action was successful"},V={"en-us":T};o["default"].use(I["a"]);const D=new I["a"]({locale:"en-us",fallbackLocale:"en-us",messages:V});var J=({app:e})=>{e.i18n=D},M=r("bc3a"),R=r.n(M),B={apiUrl:"http://localhost:4000/api/",ioUrl:"http://localhost:4000",fileUrl:"http://localhost:4000/"},F=B.apiUrl;const G=R.a.create({baseURL:F});G.interceptors.response.use((function(e){return e.data}),(function(e){var t=e;if(e.response){if(401==e.response.status)return Promise.reject(t.response.data.error);t=e.response.data.error}else e.request?console.log("Error Request",e.request):console.log("Error message",e.message);return Promise.reject(t)})),G.interceptors.request.use((function(e){var t=f["a"].getItem("user");return t&&(e.params||(e.params={}),e.params.access_token=t.id),e}),(function(e){return Promise.reject(e)}));var H=async({Vue:e})=>{e.prototype.$axios=G,e.prototype.$gql=(e,t=null)=>new Promise(((r,a)=>{var n={},s=f["a"].getItem("token");s&&(n.access_token=s),R()({url:F+"/graphql",method:"post",data:{query:e,variables:t},params:n}).then((e=>{e.data.erros?a(e.data.errors):r(e.data.data)})).catch((e=>a(e)))}))},K=r("c1df"),Q=r.n(K),W=B.apiUrl;const X=R.a.create({baseURL:W});X.interceptors.response.use((function(e){return e.data}),(function(e){var t=e;if(e.response){if(401==e.response.status)return Promise.reject(t.response.data.error);t=e.response.data.error}else e.request?console.log("Error Request",e.request):console.log("Error message",e.message);return Promise.reject(t)})),X.interceptors.request.use((async function(e){if("get"==e.method){var t={};if(e.filter)for(let r=0;r<Object.keys(e.filter).length;r++)t[Object.keys(e.filter)[r]]=e.filter[Object.keys(e.filter)[r]];e.url=e.url+"?filter="+JSON.stringify({where:t})}var r=f["a"].getItem("user");return r&&(e.params||(e.params={}),e.params.access_token=r.id),e}),(function(e){return Promise.reject(e)}));var Y=async({Vue:e})=>{e.prototype.$axios2=X},Z=({Vue:e})=>{e.prototype.$moment=Q.a},ee=r("2ef0"),te=r.n(ee),re=function(e){var t=new FormData;return te.a.forEach(e,((e,r)=>{t.append(r,e)})),t},ae={set:(e,t)=>{var r=JSON.stringify({value:t});return localStorage.setItem(e,r)},get:e=>localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)).value:void 0,remove:e=>localStorage.removeItem(e)},ne={isLogued:()=>ae.get("token"),auth:(e,t)=>ie("auth").post({email:e,password:t}),saveToken:e=>ae.set("token",e),getToken:e=>ae.get("token"),logout:()=>{ae.remove("token"),ae.remove("cookieAc")}},se=function(e){const t=new o["default"]({});e.response?"string"==typeof e.response.data?(ne.logout(),window.location.href="/#/login",t.$q.notify(e.response.data.length>500?"Algo ha salido mal...":e.response.data)):te.a.forEach(e.response.data,((e,r)=>{var a=e;"string"!=typeof e&&(a=e[0]),t.$q.notify(a)})):e.request?(t.$q.notify("Error"),ne.logout(),window.location.href="/#/login"):"manual_cancel"!=e.message&&t.$q.notify(e.message)};const oe=R.a.create({baseURL:B.apiUrl});oe.interceptors.response.use((function(e){return e.data}),(function(e){var t=e;if(e.response){if(401==e.response.status)return Promise.reject(t.response.data.error);t=e.response.data.error,u["a"].create(e.response.data.error.message)}return Promise.reject(t)})),oe.interceptors.request.use((function(e){var t=f["a"].getItem("token");t&&(e.headers||(e.headers={}),e.headers["access-token"]=t);var r=f["a"].getItem("selected");return r&&(e.params||(e.params={}),e.params.hasOwnProperty("conf")||(e.params["conf"]={}),e.params["conf"]=r),e}),(function(e){return Promise.reject(e)}));var ce=oe,ie=function(e,t={}){const r=async(t,r,a={})=>new Promise((async(n,s)=>{const o=e=>{n(e.data)},c=e=>{se(e),s(null)},i={method:t,url:B.apiUrl+e,params:a,data:r};try{const e=await ce(i);o(e)}catch(l){c(l)}}));return{get:async e=>await r("get",null,e),post:async(e,t)=>await r("post",e,t),put:async(e,t)=>await r("put",e,t),delete:async function(e,t){return await r("delete",e,t)}}},le=r("b06b"),ue=({Vue:e})=>{e.prototype.$files=e=>({put(t){return new Promise((async(r,a)=>{try{await ie("usuarios/upload").post(re({path:e,file:t})),r(e)}catch(n){a(n)}}))},get(){Object(le["a"])(B.apiUrl+"/"+e)}})},de=({Vue:e})=>{e.prototype.$env=B},fe=({Vue:e})=>{e.prototype.$_=te.a},pe=(r("ace4"),r("5cc6"),e=>{e.Vue.prototype.$base642file=(e,t)=>{var r=e.split(","),a=r[0].match(/:(.*?);/)[1],n=atob(r[1]),s=n.length,o=new Uint8Array(s);while(s--)o[s]=n.charCodeAt(s);return new File([o],t,{type:a})}});const me="";async function be(){const{app:e,store:t,router:r}=await N();let a=!1;const n=e=>{a=!0;const t=Object(e)===e?r.resolve(e).route.fullPath:e;window.location.href=t},s=window.location.href.replace(window.location.origin,""),c=[J,H,Y,Z,ue,de,fe,pe];for(let l=0;!1===a&&l<c.length;l++)if("function"===typeof c[l])try{await c[l]({app:e,router:r,store:t,Vue:o["default"],ssrContext:null,redirect:n,urlPath:s,publicPath:me})}catch(i){return i&&i.url?void(window.location.href=i.url):void console.error("[Quasar] boot error:",i)}!0!==a&&new o["default"](e)}be()},4678:function(e,t,r){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=s(e);return r(t)}function s(e){if(!r.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=s,e.exports=n,n.id="4678"}});