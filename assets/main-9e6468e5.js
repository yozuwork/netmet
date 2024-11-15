import"https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(s){if(s.ep)return;s.ep=!0;const t=r(s);fetch(s.href,t)}})();if(document.querySelector(".swiper")){let e=function(){document.querySelectorAll(".swiper-slide").forEach(r=>{r.classList.contains("swiper-slide-active")?r.setAttribute("draggable","true"):(r.setAttribute("draggable","false"),r.addEventListener("dragstart",c=>c.preventDefault()))})};new Swiper(".swiper",{slidesPerView:1,centeredSlides:!0,spaceBetween:20,initialSlide:1,effect:"coverflow",coverflowEffect:{rotate:0,stretch:0,depth:100,modifier:1,slideShadows:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:30},992:{slidesPerView:2.5,spaceBetween:80}},on:{slideChange:function(){e()}}}),e()}function A(){const e=document.querySelectorAll(".menuToggle"),o=document.querySelector(".navbar-toggler"),r=document.getElementById("airContact"),c=document.querySelectorAll(".close-button"),s=document.querySelector(".navbar");if(!r){console.warn("Air contact element not found");return}function t(n){var E;n.preventDefault();const p=n.target.closest(".menu-item");if(!p)return;const f=(E=p.querySelector("h1"))==null?void 0:E.textContent.trim();if(!f)return;let d;switch(f){case"關於我們":d="about";break;case"服務項目":d="server";break;case"專案實績":d="work";break;case"回到主頁":l();return}if(d)if(n.preventDefault(),l(),window.location.pathname==="/netmet/"){const X=document.getElementById(d);X&&X.scrollIntoView({behavior:"smooth",block:"start"})}else window.location.href=`/netmet/#${d}`,window.location.href=`/netmet/#${d}`}c.forEach(n=>{n.addEventListener("click",l)}),e.forEach(n=>{n.addEventListener("click",a)});function a(n){n.preventDefault(),n.stopPropagation(),r.classList.add("active")}function l(n){n&&(n.preventDefault(),n.stopPropagation()),r.classList.remove("active"),document.body.style.overflow="auto"}o&&(o.removeAttribute("data-bs-toggle"),o.removeAttribute("data-bs-target"),o.addEventListener("click",a)),r.addEventListener("click",function(n){n.target===r&&l(n)}),document.addEventListener("keydown",function(n){n.key==="Escape"&&r.classList.contains("active")&&l()}),r.addEventListener("click",t);let y=0;r.addEventListener("touchstart",function(n){y=n.touches[0].clientY},{passive:!0}),r.addEventListener("touchend",function(n){n.changedTouches[0].clientY-y>50&&n.target===r&&l()});let g;window.addEventListener("scroll",function(){g&&clearTimeout(g),g=setTimeout(function(){window.scrollY>0?s.classList.add("scrolled"):s.classList.remove("scrolled")},10)}),window.addEventListener("load",function(){const n=window.location.hash;if(n){const p=n.substring(1),f=document.getElementById(p);f&&setTimeout(()=>{f.scrollIntoView({behavior:"smooth",block:"start"})},100)}})}function x(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const r=e.getAttribute("href");if(r==="#"){window.scrollTo({top:0,behavior:"smooth"});return}const c=document.querySelector(r);c&&c.scrollIntoView({behavior:"smooth",block:"start"})})})}function C(){if(window.location.hash){const e=document.querySelector(window.location.hash);e&&setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},500)}}document.addEventListener("dragstart",function(e){e.target.tagName==="IMG"&&e.preventDefault()});document.addEventListener("DOMContentLoaded",function(){A(),x(),C()});let L=0,b=0,v=0,Y=0,F=window.innerWidth/2,S=window.innerHeight/2;const I=[{selector:".one-obj",speed:.05,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".two-obj",speed:.04,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".three-obj",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".four-obj",speed:.07,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".five-obj",speed:.03,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".six-obj",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".seven-obj",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".eight-obj",speed:.01,spreadFactor:1.7,element:null,currentX:0,currentY:0},{selector:".nine-obj",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".ten-obj",speed:.06,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".pc",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0},{selector:".a01",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".a02",speed:.04,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".a03",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".a04",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".a05",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".phone",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0}];function T(){I.forEach(e=>{e.element=document.querySelector(e.selector),e.element&&(e.element.style.willChange="transform",e.element.style.transform="translate3d(0, 0, 0)")})}function q(){v+=(L-v)*.1,Y+=(b-Y)*.1;const e=v-F,o=Y-S,r=Math.sqrt(e*e+o*o),c=e/r,s=o/r;I.forEach(t=>{if(!t.element)return;let a,l;t.selector===".pc"||t.selector===".phone"?(a=e*t.speed,l=o*t.speed):(a=-e*t.speed*t.spreadFactor,l=-o*t.speed*t.spreadFactor,a+=s*r*t.speed*(t.spreadFactor-1),l-=c*r*t.speed*(t.spreadFactor-1)),t.currentX+=(a-t.currentX)*.1,t.currentY+=(l-t.currentY)*.1,t.element.style.transform=`translate3d(${t.currentX}px, ${t.currentY}px, 0)`}),requestAnimationFrame(q)}function k(e){L=e.clientX,b=e.clientY}function D(){F=window.innerWidth/2,S=window.innerHeight/2}window.addEventListener("mousemove",k,{passive:!0});window.addEventListener("resize",D);T();q();const h=document.querySelector(".about-cat"),u=document.querySelector(".about-hand");let m=100,i=50,w=!1;const P=25;h.style.transform=`translateY(${m}px)`;h.style.transition="transform 0.5s";u.style.transform=`translateY(${i}px) rotate(0deg)`;u.style.transition="transform 0.5s";u.style.transformOrigin="center bottom";window.addEventListener("mousemove",e=>{const o=h.getBoundingClientRect(),r=e.clientX>o.left-150&&e.clientX<o.right+150&&e.clientY>o.top-150&&e.clientY<o.top;if(r&&!w){const c=setInterval(()=>{m>0?(m-=2,i>P&&(i-=1),h.style.transform=`translateY(${m}px)`,u.style.transform=`translateY(${i}px) rotate(0deg)`):(clearInterval(c),w=!0,setTimeout(()=>{u.style.transform=`translateY(${i}px) rotate(-20deg)`,setTimeout(()=>{u.style.transform=`translateY(${i}px) rotate(10deg)`},500)},100))},16)}!r&&w&&(m=100,i=50,w=!1,h.style.transform=`translateY(${m}px)`,u.style.transform=`translateY(${i}px) rotate(0deg)`)});$(".air-content").mousemove(function(e){$("#cross").css({left:e.pageX+"px",top:e.pageY+"px"})});
