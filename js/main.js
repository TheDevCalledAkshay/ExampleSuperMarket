// SILSA — animation engine
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('preloader')?.classList.add('done'),900);});
gsap.registerPlugin(ScrollTrigger);
// reveals — IntersectionObserver (no GSAP transform fights, cards stay perfect)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// counters
document.querySelectorAll('[data-count]').forEach(el=>{
const end=+el.dataset.count;
ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{
let o={v:0};gsap.to(o,{v:end,duration:2,ease:'power2.out',onUpdate:()=>{el.textContent=Math.floor(o.v).toLocaleString()+(end>1000?'+':'');}});
}});
});
// tilt — only hero/world/quote cards, never product grid items
document.querySelectorAll('.tilt').forEach(card=>{
if(card.classList.contains('item')||card.classList.contains('prod'))return;
card.addEventListener('mousemove',e=>{
const r=card.getBoundingClientRect();
const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
card.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
});
card.addEventListener('mouseleave',()=>card.style.transform='');
});
// cursor
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
if(dot&&matchMedia('(pointer:fine)').matches){
let mx=0,my=0,rx=0,ry=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-4}px,${my-4}px)`;});
(function loop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;requestAnimationFrame(loop);})();
}
// magnetic buttons
document.querySelectorAll('.magnetic').forEach(b=>{
b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();
b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px)`;});
b.addEventListener('mouseleave',()=>b.style.transform='');
});
// burger
const burger=document.getElementById('burger'),mm=document.getElementById('mobileMenu');
burger?.addEventListener('click',()=>mm.classList.toggle('open'));
mm?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));
// floating emoji canvas
const c=document.getElementById('floaters');
if(c){const x=c.getContext('2d');let W,H,ps=[];
const em=['🍎','🥑','🍞','🧀','🍩','🥐','🍇','🧃'];
function size(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
size();addEventListener('resize',size);
for(let i=0;i<22;i++)ps.push({e:em[i%em.length],x:Math.random()*2000,y:Math.random()*1000,s:18+Math.random()*26,v:.4+Math.random()*.8,o:Math.random()*6.28});
(function draw(){if(!W)return;x.clearRect(0,0,W,H);x.globalAlpha=.5;
ps.forEach(p=>{p.y-=p.v;p.o+=.01;if(p.y<-40){p.y=H+40;p.x=Math.random()*W;}x.font=`${p.s}px serif`;x.fillText(p.e,(p.x+Math.sin(p.o)*20)%W,p.y);});
requestAnimationFrame(draw);})();
}
// grain
const g=document.getElementById('grain');
if(g){const gx=g.getContext('2d');g.width=200;g.height=200;
setInterval(()=>{const d=gx.createImageData(200,200);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}gx.putImageData(d,0,0);},120);}
// product filter
const btns=document.querySelectorAll('.cat-nav button');
btns.forEach(b=>b.addEventListener('click',()=>{
btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');
const t=document.querySelector(b.dataset.target);
t?.scrollIntoView({behavior:'smooth'});
gsap.fromTo(t,{scale:.97,opacity:.4},{scale:1,opacity:1,duration:.6,ease:'power2.out'});
}));
// hero intro
gsap.from('.mega',{y:100,opacity:0,duration:1.2,ease:'power4.out',delay:1});
gsap.from('.hero-visual',{x:100,opacity:0,duration:1.2,ease:'power3.out',delay:1.2});
