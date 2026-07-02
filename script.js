const WHATSAPP="5493516632278";
const canvas=document.getElementById("scratch"), ctx=canvas.getContext("2d");
const card=document.getElementById("card"), claim=document.getElementById("claim"), again=document.getElementById("again");
let drawing=false, revealed=false, selected;

function choosePrize(){
  let bag=[]; PREMIOS.forEach(p=>{for(let i=0;i<p.cantidad;i++)bag.push(p)});
  return bag[Math.floor(Math.random()*bag.length)];
}
function code(){return "MAMA-"+Math.random().toString(36).slice(2,8).toUpperCase()}
function setup(){
  selected=choosePrize(); const c=code();
  document.getElementById("emoji").textContent=selected.emoji;
  document.getElementById("prizeTitle").textContent=selected.gana?"¡FELICITACIONES!":"¡GRACIAS POR JUGAR!";
  document.getElementById("prizeText").textContent=selected.nombre;
  document.getElementById("code").textContent=selected.gana?"Código: "+c:"";
  const r=card.getBoundingClientRect(); canvas.width=r.width*devicePixelRatio;canvas.height=r.height*devicePixelRatio;
  ctx.scale(devicePixelRatio,devicePixelRatio);ctx.fillStyle="#aeb3b7";ctx.fillRect(0,0,r.width,r.height);
  ctx.fillStyle="#e9ecef";ctx.font="bold 25px Arial";ctx.textAlign="center";ctx.fillText("RASPA AQUÍ",r.width/2,r.height/2);
  ctx.font="18px Arial";ctx.fillText("✨ con tu dedo ✨",r.width/2,r.height/2+35);
  claim.onclick=()=>{let msg=selected.gana?`Hola! Gané: ${selected.nombre}. ${document.getElementById("code").textContent}`:"Hola! Participé en la raspadita de La Comida de Mamá.";window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg),"_blank")};
}
function point(e){let r=canvas.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return{x:p.clientX-r.left,y:p.clientY-r.top}}
function scratch(e){if(!drawing||revealed)return;e.preventDefault();let p=point(e);ctx.globalCompositeOperation="destination-out";ctx.beginPath();ctx.arc(p.x,p.y,30,0,Math.PI*2);ctx.fill();check()}
function check(){let data=ctx.getImageData(0,0,canvas.width,canvas.height).data,clear=0;for(let i=3;i<data.length;i+=80)if(data[i]===0)clear++;if(clear/(data.length/80)>.38){revealed=true;canvas.style.opacity=0;document.getElementById("hint").textContent="¡Ya descubriste tu resultado!";if(selected.gana)claim.hidden=false;again.hidden=false}}
canvas.addEventListener("pointerdown",e=>{drawing=true;scratch(e)});window.addEventListener("pointerup",()=>drawing=false);canvas.addEventListener("pointermove",scratch);
again.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
setup();