// Ski page only: original artwork clipped into unchanged movable silhouettes.
(()=>{
const root=document.querySelector('[data-flat-interactive]');if(!root)return;root.classList.add('ski-detail-layout');
const sheet=root.querySelector('.flat-sheet'),base=sheet.querySelector('img'),layer=root.querySelector('.flat-lift-layer'),svg=root.querySelector('.flat-connector'),path=svg.querySelector('path'),dot=svg.querySelector('circle'),articles=[...root.querySelectorAll('[data-flat-detail]')],ns='http://www.w3.org/2000/svg';
function el(tag,attrs={}){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e;}
const art=el('svg',{viewBox:'0 0 1536 1024','aria-hidden':'true',class:'ski-contour-art'});
const skiShapes=[
'M700 411 L747 389 C737 357 745 320 721 290 C684 244 711 187 739 134 C779 57 814 22 908 20 C1002 19 1034 49 1076 112 C1108 164 1125 224 1098 277 C1074 324 1095 363 1061 389 L1118 410 L1118 481 L700 481 Z',
'M1222 243 L1300 216 L1300 197 L1320 196 L1320 173 L1338 173 L1338 193 L1358 193 L1358 114 Q1359 104 1370 105 Q1384 104 1384 115 L1384 194 L1414 202 L1427 231 L1439 210 L1425 402 Q1339 450 1223 478 Z',
'M710 529 L798 523 L814 549 L848 531 L876 558 L936 524 L1128 524 L1126 590 L1089 654 L1034 716 L978 768 L934 783 L903 884 L893 942 L908 995 L710 995 L710 934 L740 860 L768 776 L766 703 L731 643 L710 631 Z',
'M1325 520 L1535 520 L1535 670 L1490 735 L1445 795 L1410 855 L1390 940 L1365 1008 L1140 1008 L1125 975 L1130 930 L1085 875 L1090 825 L1145 790 L1185 800 L1225 720 L1265 665 Z'];
const code=root.dataset.flatCode||'ski';
// Each detail occupies a separate region of the illustration sheet. Rounded organic masks
// retain the drawn contours and avoid a visibly lifted rectangular panel.
const sheetShapes=[
'M640 20 Q660 10 688 10 H1064 Q1090 10 1090 38 V454 Q1090 480 1064 480 H684 Q640 480 640 450 Z',
'M1100 20 Q1120 10 1140 10 H1510 Q1534 10 1534 36 V454 Q1534 480 1510 480 H1138 Q1100 480 1100 450 Z',
'M640 540 Q660 525 685 525 H1064 Q1090 525 1090 550 V983 Q1090 1010 1064 1010 H684 Q640 1010 640 980 Z',
'M1100 540 Q1120 525 1140 525 H1510 Q1534 525 1534 550 V983 Q1534 1010 1510 1010 H1138 Q1100 1010 1100 980 Z'];
const shapes=code==='ski'?skiShapes:sheetShapes;
const defs=el('defs'),mask=el('mask',{id:'ski-art-cutouts',maskUnits:'userSpaceOnUse',x:0,y:0,width:1536,height:1024});mask.append(el('rect',{width:1536,height:1024,fill:'white'}));shapes.forEach((d,n)=>{mask.append(el('path',{d,fill:'black'}));const clip=el('clipPath',{id:'ski-contour-'+n});clip.append(el('path',{d}));defs.append(clip);});defs.append(mask);art.append(defs);
function picture(){return el('image',{href:base.src,width:1536,height:1024});}const background=picture();background.setAttribute('mask','url(#ski-art-cutouts)');art.append(background);
const groups=shapes.map((_,n)=>{const g=el('g',{class:'ski-contour','data-contour':n}),clip=el('g',{'clip-path':`url(#ski-contour-${n})`});clip.append(picture());g.append(clip);art.append(g);return g;});layer.append(art);base.classList.add('ski-original-layout');
const arrowDefs=el('defs'),arrow=el('marker',{id:'ski-arrowhead',viewBox:'0 0 8 8',refX:7,refY:4,markerWidth:7,markerHeight:7,orient:'auto'});arrow.append(el('path',{d:'M1 1 L7 4 L1 7',fill:'none',stroke:'#456c55','stroke-width':1}));arrowDefs.append(arrow);svg.prepend(arrowDefs);path.setAttribute('marker-end','url(#ski-arrowhead)');
const tips=code==='ski'?[[1110,378],[1430,350],[1104,652],[1460,750]]:[[1072,240],[1514,240],[1072,760],[1514,760]];let active=-1,pinned=-1;
function position(){const r=root.getBoundingClientRect(),b=base.getBoundingClientRect();layer.style.height=b.height+'px';if(active<0)return;const a=articles[active].getBoundingClientRect(),[x,y]=tips[active],desktop=matchMedia('(min-width:992px)').matches,sx=a.left-r.left,sy=a.top-r.top,tx=b.left-r.left+x/1536*b.width,ty=b.top-r.top+y/1024*b.height,elbow=desktop?b.right-r.left+18:b.bottom-r.top+12;svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);path.setAttribute('d',desktop?`M ${sx} ${sy} L ${elbow} ${sy} L ${elbow} ${ty} L ${tx} ${ty}`:`M ${sx+16} ${sy} L ${sx+16} ${elbow} L ${tx} ${elbow} L ${tx} ${ty}`);dot.setAttribute('cx',tx);dot.setAttribute('cy',ty);}
function show(index){active=index;articles.forEach((a,n)=>{a.classList.toggle('is-active',n===index);a.querySelector('button').setAttribute('aria-pressed',String(n===pinned));groups[n].classList.toggle('is-active',n===index);});svg.classList.toggle('is-active',index>=0);position();}
articles.forEach((a,n)=>{const button=a.querySelector('button');a.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')show(n);});a.addEventListener('pointerleave',()=>show(pinned));button.addEventListener('focus',()=>show(n));button.addEventListener('blur',()=>show(pinned));button.addEventListener('click',()=>{pinned=pinned===n?-1:n;show(pinned);});});root.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=-1;show(-1);}});document.addEventListener('click',e=>{if(!root.contains(e.target)){pinned=-1;show(-1);}});new ResizeObserver(position).observe(root);base.addEventListener('load',position);position();
})();

