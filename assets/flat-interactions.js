// Ski page only: original artwork clipped into unchanged movable silhouettes.
(()=>{
const root=document.querySelector('[data-flat-interactive]');if(!root)return;root.classList.add('ski-detail-layout');
const sheet=root.querySelector('.flat-sheet'),base=sheet.querySelector('img'),layer=root.querySelector('.flat-lift-layer'),svg=root.querySelector('.flat-connector'),path=svg.querySelector('path'),dot=svg.querySelector('circle'),articles=[...root.querySelectorAll('[data-flat-detail]')],ns='http://www.w3.org/2000/svg';
const captions=root.querySelector('.flat-captions');const hint=document.createElement('p');hint.className='flat-interaction-hint';hint.textContent=matchMedia('(hover: hover)').matches?'Наведите на деталь, чтобы увидеть её на рисунке':'Нажмите на деталь, чтобы увидеть её на рисунке';captions.prepend(hint);
function el(tag,attrs={}){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e;}
const art=el('svg',{viewBox:'0 0 1536 1024','aria-hidden':'true',class:'ski-contour-art'});
const skiShapes=[
'M705 222 C719 175 738 127 762 92 C798 40 843 20 904 20 C975 18 1025 48 1058 99 C1085 139 1104 188 1108 221 C1113 248 1100 269 1084 291 L1077 352 Q1074 389 1045 405 L1009 426 Q986 439 953 448 L953 480 L868 480 L868 449 Q836 439 809 426 L770 408 Q739 394 735 360 L728 293 Q699 266 705 222 Z',
'M1223 211 L1309 207 L1311 197 L1321 194 L1321 176 Q1321 170 1329 170 L1336 170 Q1341 170 1341 177 L1341 193 L1353 193 L1357 117 Q1357 104 1369 104 Q1381 104 1383 116 L1378 194 Q1396 194 1406 203 L1449 202 L1446 225 L1434 386 Q1433 403 1413 410 L1251 454 Q1236 458 1225 449 Z',
'M854 876 Q858 824 873 780 Q901 706 946 664 Q971 643 997 633 Q987 655 977 675 Q947 720 925 766 Q904 809 892 851 L882 878 L881 932 Q881 948 868 949 Q855 949 855 932 Z',
'M1104 818 Q1114 803 1128 806 L1201 826 Q1219 808 1239 802 Q1303 791 1369 842 L1390 859 L1358 959 Q1353 981 1337 986 Q1304 997 1257 989 Q1200 979 1154 952 Q1147 947 1155 931 L1178 891 L1110 874 Q1098 870 1102 856 Z'
];
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
articles.forEach((a,n)=>{const button=a.querySelector('button');a.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')show(n);});a.addEventListener('pointerleave',()=>show(pinned));button.addEventListener('focus',()=>show(n));button.addEventListener('blur',()=>show(pinned));button.addEventListener('click',()=>{pinned=pinned===n?-1:n;show(pinned);});});root.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=-1;show(-1);}});document.addEventListener('click',e=>{if(!root.contains(e.target)){pinned=-1;show(-1);}});new ResizeObserver(position).observe(root);window.addEventListener('scroll',position,{passive:true});base.addEventListener('load',position);position();
})();

