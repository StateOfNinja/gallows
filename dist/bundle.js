(()=>{"use strict";const e=[{question:"Чей крым?",answer:"Российский"},{question:"Что слышу?",answer:"Зов"},{question:"После ядерки на ...",answer:"Самосир"},{question:"Кто живёт в шкафу?",answer:"Купрынька"},{question:"Свадьба это дорого, значит свадьба это ...",answer:"Развод"},{question:"Место жительства Алмаза?",answer:"Будка"},{question:"Путин ...",answer:"Бог"},{question:"Слава ... ",answer:"Кочетков"},{question:'Зачем нужно ходить до барыгона"?',answer:"Пакэджесом"},{question:"Кто вернется до 15 числа?",answer:"Сергей"}];let t,n,o,s=[],i=6;const d=document.body,a=document.createElement("canvas");a.width=200,a.height=400;const c=a.getContext("2d"),l=[function(){c.beginPath(),c.arc(150,130,30,0,2*Math.PI,!0),c.stroke()},function(){c.beginPath(),c.moveTo(150,160),c.lineTo(150,250),c.stroke()},function(){c.beginPath(),c.moveTo(150,180),c.lineTo(120,220),c.stroke()},function(){c.beginPath(),c.moveTo(150,180),c.lineTo(180,220),c.stroke()},function(){c.beginPath(),c.moveTo(150,250),c.lineTo(120,300),c.stroke()},function(){c.beginPath(),c.moveTo(150,250),c.lineTo(180,300),c.stroke()}];function r(){d.innerHTML="",c.clearRect(0,0,a.width,a.height),c.beginPath(),c.moveTo(10,350),c.lineTo(150,350),c.moveTo(80,350),c.lineTo(80,50),c.lineTo(150,50),c.lineTo(150,100),c.stroke();const i=Math.floor(Math.random()*e.length);o=e[i],console.log(o),n=Array(o.answer.length).fill("_"),t=0,s=[],console.log(n);const l=document.createElement("div");l.classList.add("container");const r=document.createElement("h2");r.textContent=o.question;const h=document.createElement("div");h.classList.add("word"),h.textContent=n.join(" ");const p=document.createElement("div");p.classList.add("keyboard"),function(e){"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ".split("").forEach((t=>{const n=document.createElement("button");n.classList.add("keyboard__button"),n.id=`letter-${t}`,n.textContent=t,n.addEventListener("click",(()=>m(t))),e.appendChild(n)}))}(p),d.appendChild(l),l.appendChild(r),l.appendChild(h),l.appendChild(a),l.appendChild(p),document.addEventListener("keydown",u)}function u(e){const t=e.key.toUpperCase();/[А-Я]/.test(t)&&!s.includes(t)&&(console.log(t),m(t))}function m(e){s.push(e);const d=document.getElementById(`letter-${e}`);d&&(d.disabled=!0,d.classList.add("button__disabled")),o.answer.toUpperCase().includes(e)?o.answer.split("").forEach(((t,o)=>{t.toUpperCase()===e&&(n[o]=t)})):(t++,t<=l.length&&l[t-1]()),document.querySelector(".word").textContent=n.join(" "),t===i?h(!1):n.includes("_")||h(!0)}function h(e){const t=document.createElement("div");t.classList.add("modal"),t.style.display="flex";const n=document.createElement("div");n.classList.add("modal__content");const s=document.createElement("p");s.textContent=e?"Красава":"Nt бро";const i=document.createElement("p");i.textContent=`Ответ: ${o.answer}`;const a=document.createElement("button");a.textContent="Играть снова",a.addEventListener("click",r),n.appendChild(s),n.appendChild(i),n.appendChild(a),t.appendChild(n),d.appendChild(t)}r()})();