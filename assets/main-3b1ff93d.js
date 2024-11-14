import"https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const e of c)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(c){const e={};return c.integrity&&(e.integrity=c.integrity),c.referrerPolicy&&(e.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?e.credentials="include":c.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(c){if(c.ep)return;c.ep=!0;const e=r(c);fetch(c.href,e)}})();if(document.querySelector(".swiper")){const t=new Swiper(".swiper",{slidesPerView:1,centeredSlides:!0,spaceBetween:20,initialSlide:1,effect:"coverflow",coverflowEffect:{rotate:0,stretch:0,depth:100,modifier:1,slideShadows:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:30},992:{slidesPerView:2.5,spaceBetween:80}}}),n=document.querySelector(".custom-prev"),r=document.querySelector(".custom-next");n&&n.addEventListener("click",()=>t.slidePrev()),r&&r.addEventListener("click",()=>t.slideNext())}const g=document.querySelector(".navbar-gradient-bottom");g&&window.addEventListener("scroll",()=>{window.scrollY>0?g.classList.add("scrolled"):g.classList.remove("scrolled")});function x(){const t=document.querySelectorAll(".menuToggle"),n=document.querySelector(".navbar-toggler"),r=document.getElementById("airContact"),s=document.querySelector(".navbar");if(!r){console.warn("Air contact element not found");return}function c(o){o.preventDefault(),o.stopPropagation(),r.classList.add("active"),document.body.style.overflow="hidden"}function e(o){o&&(o.preventDefault(),o.stopPropagation()),r.classList.remove("active"),document.body.style.overflow="auto"}function l(o){var L;const d=o.target.closest(".menu-item");if(!d)return;const h=(L=d.querySelector("h1"))==null?void 0:L.textContent.trim();if(!h)return;let m;switch(h){case"關於我們":m="/netmet/#about";break;case"服務項目":m="/netmet/#server";break;case"專案實績":m="/netmet/#work";break}m&&(e(),window.location.href=m)}t.forEach(o=>{o.addEventListener("click",c)}),n&&(n.removeAttribute("data-bs-toggle"),n.removeAttribute("data-bs-target"),n.addEventListener("click",c)),document.addEventListener("click",function(o){const d=o.target.closest(".close-button");d&&r.contains(d)&&e(o)}),r.addEventListener("click",l),r.addEventListener("click",function(o){o.target===r&&e(o)}),document.addEventListener("keydown",function(o){o.key==="Escape"&&r.classList.contains("active")&&e()});let a=0;r.addEventListener("touchstart",function(o){a=o.touches[0].clientY},{passive:!0}),r.addEventListener("touchend",function(o){o.changedTouches[0].clientY-a>50&&o.target===r&&e()});let v;window.addEventListener("scroll",function(){v&&clearTimeout(v),v=setTimeout(function(){window.scrollY>0?s.classList.add("scrolled"):s.classList.remove("scrolled")},10)})}function C(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const r=t.getAttribute("href");if(r==="#"){window.scrollTo({top:0,behavior:"smooth"});return}const s=document.querySelector(r);s&&s.scrollIntoView({behavior:"smooth",block:"start"})})})}function k(){if(window.location.hash){const t=document.querySelector(window.location.hash);t&&setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},500)}}document.addEventListener("DOMContentLoaded",function(){x(),C(),initializeMouseTracking(),k()});let E=0,X=0,y=0,Y=0,F=window.innerWidth/2,S=window.innerHeight/2;const b=[{selector:".one-obj",speed:.05,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".two-obj",speed:.04,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".three-obj",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".four-obj",speed:.07,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".five-obj",speed:.03,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".six-obj",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".seven-obj",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".eight-obj",speed:.01,spreadFactor:1.7,element:null,currentX:0,currentY:0},{selector:".nine-obj",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".ten-obj",speed:.06,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".pc",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0},{selector:".a01",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".a02",speed:.04,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".a03",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".a04",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".a05",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".phone",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0}];function I(){b.forEach(t=>{t.element=document.querySelector(t.selector),t.element&&(t.element.style.willChange="transform",t.element.style.transform="translate3d(0, 0, 0)")})}function q(){y+=(E-y)*.1,Y+=(X-Y)*.1;const t=y-F,n=Y-S,r=Math.sqrt(t*t+n*n),s=t/r,c=n/r;b.forEach(e=>{if(!e.element)return;let l,a;e.selector===".pc"||e.selector===".phone"?(l=t*e.speed,a=n*e.speed):(l=-t*e.speed*e.spreadFactor,a=-n*e.speed*e.spreadFactor,l+=c*r*e.speed*(e.spreadFactor-1),a-=s*r*e.speed*(e.spreadFactor-1)),e.currentX+=(l-e.currentX)*.1,e.currentY+=(a-e.currentY)*.1,e.element.style.transform=`translate3d(${e.currentX}px, ${e.currentY}px, 0)`}),requestAnimationFrame(q)}function A(t){E=t.clientX,X=t.clientY}function T(){F=window.innerWidth/2,S=window.innerHeight/2}window.addEventListener("mousemove",A,{passive:!0});window.addEventListener("resize",T);I();q();const p=document.querySelector(".about-cat"),f=document.querySelector(".about-hand");let u=100,i=50,w=!1;p.style.transform=`translateY(${u}px)`;p.style.transition="transform 0.5s";f.style.transform=`translateY(${i}px) rotate(0deg)`;f.style.transition="transform 0.5s";f.style.transformOrigin="center bottom";window.addEventListener("mousemove",t=>{const n=p.getBoundingClientRect(),r=t.clientX>n.left-150&&t.clientX<n.right+150&&t.clientY>n.top-150&&t.clientY<n.top;if(r&&!w){const s=setInterval(()=>{if(u>0)u-=2,p.style.transform=`translateY(${u}px)`;else{clearInterval(s),w=!0;const c=setInterval(()=>{i<50?(i+=2,f.style.transform=`translateY(${i}px) rotate(-20deg)`):(clearInterval(c),f.style.transform=`translateY(${i}px) rotate(10deg)`)},16)}},16)}!r&&w&&(u=100,i=50,w=!1,p.style.transform=`translateY(${u}px)`,f.style.transform=`translateY(${i}px) rotate(0deg)`)});