import{r as n,j as e}from"./globals-yvt4wxtg.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,a,o)=>o?o.toUpperCase():a.toLowerCase()),b=r=>{const s=j(r);return s.charAt(0).toUpperCase()+s.slice(1)},w=(...r)=>r.filter((s,a,o)=>!!s&&s.trim()!==""&&o.indexOf(s)===a).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var N={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=n.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:i="",children:c,iconNode:l,...x},p)=>n.createElement("svg",{ref:p,...N,width:s,height:s,stroke:r,strokeWidth:o?Number(a)*24/Number(s):a,className:w("lucide",i),...x},[...l.map(([m,t])=>n.createElement(m,t)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(r,s)=>{const a=n.forwardRef(({className:o,...i},c)=>n.createElement(y,{ref:c,iconNode:s,className:w(`lucide-${g(b(r))}`,`lucide-${r}`,o),...i}));return a.displayName=b(r),a};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],k=h("chevron-down",v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],_=h("github",C);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],A=h("instagram",$);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],S=h("search",I);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]],M=h("twitter",E);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],H=h("x",O);function f({label:r,items:s}){const[a,o]=n.useState(!1),i=n.useRef(null);return n.useEffect(()=>{function c(l){i.current&&!i.current.contains(l.target)&&o(!1)}return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[]),e.jsxs("div",{className:"relative",ref:i,children:[e.jsxs("button",{onClick:()=>o(!a),className:"flex items-center gap-1 text-white hover:text-white/80 transition-colors",style:{textShadow:"2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)"},children:[r,e.jsx(k,{className:`w-4 h-4 transition-transform ${a?"rotate-180":""}`})]}),a&&e.jsx("div",{className:"absolute top-full mt-2 left-0 backdrop-blur-md bg-[#2d7a5f]/70 rounded-lg shadow-lg py-2 min-w-[180px] z-50 border-2 border-[#67e0b8]",children:s.map((c,l)=>e.jsx("a",{href:c.href,className:"block px-4 py-2 text-white hover:bg-[#67e0b8]/30 transition-colors",onClick:()=>o(!1),children:c.label},l))})]})}const d="http://localhost:3000",u="/api";function R(){const[r,s]=n.useState(""),[a,o]=n.useState(!1),[i,c]=n.useState([]),[l,x]=n.useState([]),[p,m]=n.useState([]);return n.useEffect(()=>{fetch(`${u}/header/projects`).then(t=>t.json()).then(t=>{c([...t,{label:"すべて見る",href:"/project"}])}).catch(t=>console.error(t)),fetch(`${u}/header/tags`).then(t=>t.json()).then(t=>x(t)).catch(t=>console.error(t)),fetch(`${u}/header/writers`).then(t=>t.json()).then(t=>m(t)).catch(t=>console.error(t))},[]),e.jsx("header",{className:"sticky top-0 z-50",children:e.jsx("div",{className:"container mx-auto px-6 py-4",children:e.jsxs("div",{className:"flex items-center justify-between backdrop-blur-md bg-[#67e0b8]/40 rounded-xl px-6 py-3 border border-[#67e0b8]/50",children:[e.jsxs("a",{href:d,className:"flex items-center gap-3 text-white hover:opacity-80 transition-opacity",style:{textShadow:"2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)"},children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1708634421109-18f3309dffa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY0NTY3MDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",alt:"Opu Coder Logo",className:"w-10 h-10 rounded-lg object-cover"}),"Opu Coder Tech Blog"]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("a",{href:"https://twitter.com/opucoder",target:"_blank",rel:"noopener noreferrer",className:"text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full",children:e.jsx(M,{className:"w-5 h-5"})}),e.jsx("a",{href:"https://github.com/opucoder",target:"_blank",rel:"noopener noreferrer",className:"text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full",children:e.jsx(_,{className:"w-5 h-5"})}),e.jsx("a",{href:"https://instagram.com/opucoder",target:"_blank",rel:"noopener noreferrer",className:"text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full",children:e.jsx(A,{className:"w-5 h-5"})})]}),e.jsxs("nav",{className:"hidden lg:flex items-center gap-6",style:{textShadow:"2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)"},children:[e.jsx("a",{href:`${d}`,className:"text-white hover:text-white/80 transition-colors",children:"Home"}),e.jsx(f,{label:"Projects",items:i}),e.jsx(f,{label:"Tags",items:l}),e.jsx(f,{label:"Writers",items:p}),e.jsx("a",{href:`${d}#about`,className:"text-white hover:text-white/80 transition-colors",children:"About"}),e.jsx("a",{href:`${d}#footer`,className:"text-white hover:text-white/80 transition-colors",children:"Contact"})]}),e.jsxs("div",{className:"relative hidden lg:flex items-center",children:[e.jsx("input",{type:"text",placeholder:"記事を検索...",value:r,onChange:t=>s(t.target.value),onFocus:()=>o(!0),onKeyDown:t=>{t.key==="Enter"&&r.trim()&&(window.location.href=`${d}/search?q=${encodeURIComponent(r.trim())}`)},className:"bg-white/10 text-black placeholder-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#67e0b8]/20 transition-all w-48"}),e.jsx("button",{onClick:()=>{r&&(s(""),o(!1))},className:"absolute right-3 text-gray-700 hover:text-black transition-colors",children:r?e.jsx(H,{className:"w-4 h-4"}):e.jsx(S,{className:"w-4 h-4"})})]})]})]})})})}function T(){return e.jsx("footer",{id:"footer",className:"bg-black text-white py-12 border-t border-[#67e0b8]/20",children:e.jsxs("div",{className:"container mx-auto px-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("div",{className:"mb-4 text-[20px]",children:"OPUCoder"}),e.jsx("p",{className:"text-gray-300",children:"© 2025 OPUCoder - 岡山県立大学 技術系サークル"})]}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-6 text-gray-300",children:[e.jsx("a",{href:"#articles",className:"hover:text-[#67e0b8] transition-colors",children:"記事一覧"}),e.jsx("a",{href:"#tags",className:"hover:text-[#67e0b8] transition-colors",children:"タグ一覧"}),e.jsx("a",{href:"#privacy",className:"hover:text-[#67e0b8] transition-colors",children:"プライバシーポリシー"}),e.jsx("a",{href:"#analytics",className:"hover:text-[#67e0b8] transition-colors",children:"Google Analyticsについて"})]})]})})}export{u as A,T as F,R as H,h as c};
