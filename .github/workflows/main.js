const root=document.querySelector('#content'), nav=document.querySelector('#nav');
const search=document.querySelector('#search'), unitFilter=document.querySelector('#unit'), empty=document.querySelector('#empty');
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
function render(){
 root.replaceChildren();nav.replaceChildren();let total=0;const q=search.value.toLowerCase().trim();
 COURSE.forEach((u,i)=>{
  if((unitFilter.value!=='all'&&unitFilter.value!==u.unit)|| (q&&!JSON.stringify(u).toLowerCase().includes(q)))return;
  total++;const id='unit-'+i,a=el('a','',u.title);a.href='#'+id;nav.append(a);
  const section=el('section','unit');section.id=id;
  section.append(el('div','unit-label',u.unit.toUpperCase()),el('h2','',u.title),el('p','desc',u.description));
  u.lessons.forEach(l=>{
   const card=el('article','card');card.append(el('h3','',l.heading),el('p','',l.explain));
   if(l.points){const ul=el('ul');l.points.forEach(x=>ul.append(el('li','',x)));card.append(ul)}
   if(l.code){const box=el('div','code'),pre=el('pre');pre.append(el('code','',l.code));const b=el('button','copy','COPY');
    b.onclick=async()=>{try{await navigator.clipboard.writeText(l.code);b.textContent='COPIED'}catch{b.textContent='SELECT CODE'}setTimeout(()=>b.textContent='COPY',1200)};
    box.append(b,pre);card.append(box)}
   if(l.result){const r=el('div','result');r.append(el('b','','EXAMPLE'),document.createTextNode(l.result));card.append(r)}
   section.append(card);
  });root.append(section);
 });
 empty.hidden=total>0;
}
search.addEventListener('input',render);unitFilter.addEventListener('change',render);render();
