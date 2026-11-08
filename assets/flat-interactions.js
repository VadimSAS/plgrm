// Progressive enhancement for the ski concept only; no runtime dependency.
(()=>{
const root=document.querySelector('[data-flat-interactive]');if(!root)return;
const sheet=root.querySelector('.flat-sheet'),base=sheet.querySelector('img'),layer=root.querySelector('.flat-lift-layer'),svg=root.querySelector('.flat-connector'),path=svg.querySelector('path'),dot=svg.querySelector('circle'),articles=[...root.querySelectorAll('[data-flat-detail]')];
const boxes=[[690,0,440,500],[1135,0,400,500],[700,520,430,500],[1130,520,406,500]];
const lifted=boxes.map(([x,y,w,h])=>{const box=document.createElement('div');box.className='flat-lift';Object.assign(box.style,{left:x/1536*100+'%',top:y/1024*100+'%',width:w/1536*100+'%',height:h/1024*100+'%'});const img=document.createElement('img');img.src=base.src;img.alt='';Object.assign(img.style,{width:1536/w*100+'%',left:-x/w*100+'%',top:-y/h*100+'%'});box.append(img);layer.append(box);return box;});
let active=-1,pinned=-1;
function position(){const r=root.getBoundingClientRect(),b=base.getBoundingClientRect();layer.style.height=b.height+'px';if(active<0)return;const a=articles[active].getBoundingClientRect(),[x,y,w,h]=boxes[active];const sx=a.left-r.left+16,sy=a.top-r.top,tx=b.left-r.left+(x+w/2)/1536*b.width,ty=b.top-r.top+(y+h)/1024*b.height-(matchMedia('(max-width:767px)').matches?4:8),elbow=b.bottom-r.top+12;svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);path.setAttribute('d',`M ${sx} ${sy} L ${sx} ${elbow} L ${tx} ${elbow} L ${tx} ${ty}`);dot.setAttribute('cx',tx);dot.setAttribute('cy',ty);}
function show(index){active=index;articles.forEach((a,n)=>{a.classList.toggle('is-active',n===index);a.querySelector('button').setAttribute('aria-pressed',String(n===pinned));lifted[n].classList.toggle('is-active',n===index);});svg.classList.toggle('is-active',index>=0);position();}
articles.forEach((a,n)=>{const button=a.querySelector('button');button.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')show(n);});button.addEventListener('pointerleave',()=>show(pinned));button.addEventListener('focus',()=>show(n));button.addEventListener('blur',()=>show(pinned));button.addEventListener('click',()=>{pinned=pinned===n?-1:n;show(pinned);});});
root.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=-1;show(-1);}});document.addEventListener('click',e=>{if(!root.contains(e.target)){pinned=-1;show(-1);}});
new ResizeObserver(position).observe(root);base.addEventListener('load',position);position();
})();
