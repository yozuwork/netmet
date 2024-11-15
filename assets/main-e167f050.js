import"https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();function P(){const e=document.getElementById("loading");e&&(e.style.display="flex",document.body.style.overflow="hidden")}function b(){const e=document.getElementById("loading");e&&(e.style.display="none",document.body.style.overflow="")}function L(){return new Promise(e=>{const r=document.querySelectorAll("img"),t=r.length;let s=0;if(t===0){e();return}r.forEach(o=>{o.complete?(s++,s===t&&e()):(o.addEventListener("load",()=>{s++,s===t&&e()}),o.addEventListener("error",()=>{s++,s===t&&e()}))})})}document.addEventListener("DOMContentLoaded",function(){P(),X(),S(),Promise.all([L(),new Promise(e=>setTimeout(e,1e3))]).then(()=>{b(),F()})});window.addEventListener("load",function(){document.getElementById("loading").style.display!=="none"&&Promise.all([L(),new Promise(e=>setTimeout(e,1e3))]).then(b)});if(document.querySelector(".swiper")){let e=function(){document.querySelectorAll(".swiper-slide").forEach(t=>{t.classList.contains("swiper-slide-active")?t.setAttribute("draggable","true"):(t.setAttribute("draggable","false"),t.addEventListener("dragstart",s=>s.preventDefault()))})};new Swiper(".swiper",{slidesPerView:1,centeredSlides:!0,spaceBetween:20,initialSlide:1,effect:"coverflow",coverflowEffect:{rotate:0,stretch:0,depth:100,modifier:1,slideShadows:!1},breakpoints:{768:{slidesPerView:2,spaceBetween:30},992:{slidesPerView:2.5,spaceBetween:80}},on:{slideChange:function(){e()}}}),e()}function E(e){const r=document.getElementById("airContact");if(!r)return;e.preventDefault(),e.stopPropagation();const t=k(),s=window.scrollY;r.classList.add("active"),document.body.classList.add("menu-open"),document.body.style.position="fixed",document.body.style.width="100%",document.body.style.top=`-${s}px`,document.body.style.paddingRight=`${t}px`}function u(e){const r=document.getElementById("airContact");if(!r)return;e&&(e.preventDefault(),e.stopPropagation());const t=document.body.style.top;r.classList.remove("active"),document.body.classList.remove("menu-open"),document.body.style.position="",document.body.style.width="",document.body.style.top="",document.body.style.paddingRight="",window.scrollTo({top:parseInt(t||"0")*-1,behavior:"auto"})}function k(){return window.innerWidth-document.documentElement.clientWidth}function X(){const e=document.querySelectorAll(".menuToggle"),r=document.querySelector(".navbar-toggler"),t=document.getElementById("airContact"),s=document.querySelectorAll(".close-button"),o=document.querySelector(".navbar");if(!t){console.warn("Air contact element not found");return}function n(c){var Y;const y=c.target.closest(".menu-item");if(!y)return;const h=(Y=y.querySelector("h1"))==null?void 0:Y.textContent.trim();if(!h)return;let f;switch(h){case"關於我們":f="/netmet/#about";break;case"服務項目":f="/netmet/#server";break;case"專案實績":f="/netmet/#work";break;case"回到主頁":u();break}f&&(u(),window.location.href=f)}s.forEach(c=>{c.addEventListener("click",u)}),e.forEach(c=>{c.addEventListener("click",E)}),r&&(r.removeAttribute("data-bs-toggle"),r.removeAttribute("data-bs-target"),r.addEventListener("click",E)),t.addEventListener("click",function(c){c.target===t&&u(c)}),document.addEventListener("keydown",function(c){c.key==="Escape"&&t.classList.contains("active")&&u()}),t.addEventListener("click",n);let l=0;t.addEventListener("touchstart",function(c){l=c.touches[0].clientY},{passive:!0}),t.addEventListener("touchend",function(c){c.changedTouches[0].clientY-l>50&&c.target===t&&u()});let a;window.addEventListener("scroll",function(){a&&clearTimeout(a),a=setTimeout(function(){window.scrollY>0?o.classList.add("scrolled"):o.classList.remove("scrolled")},10)})}function S(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const t=e.getAttribute("href");if(t==="#"){window.scrollTo({top:0,behavior:"smooth"});return}const s=document.querySelector(t);s&&s.scrollIntoView({behavior:"smooth",block:"start"})})})}function F(){if(window.location.hash){const e=document.querySelector(window.location.hash);e&&setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},500)}}document.addEventListener("dragstart",function(e){e.target.tagName==="IMG"&&e.preventDefault()});document.addEventListener("DOMContentLoaded",function(){X(),S(),F()});let C=0,I=0,w=0,v=0,x=window.innerWidth/2,q=window.innerHeight/2;const A=[{selector:".one-obj",speed:.05,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".two-obj",speed:.04,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".three-obj",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".four-obj",speed:.07,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".five-obj",speed:.03,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".six-obj",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".seven-obj",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".eight-obj",speed:.01,spreadFactor:1.7,element:null,currentX:0,currentY:0},{selector:".nine-obj",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".ten-obj",speed:.06,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".pc",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0},{selector:".a01",speed:.05,spreadFactor:1.3,element:null,currentX:0,currentY:0},{selector:".a02",speed:.04,spreadFactor:1.5,element:null,currentX:0,currentY:0},{selector:".a03",speed:.06,spreadFactor:1.4,element:null,currentX:0,currentY:0},{selector:".a04",speed:.03,spreadFactor:1.6,element:null,currentX:0,currentY:0},{selector:".a05",speed:.07,spreadFactor:1.2,element:null,currentX:0,currentY:0},{selector:".phone",speed:.03,spreadFactor:1,element:null,currentX:0,currentY:0}];function B(){A.forEach(e=>{e.element=document.querySelector(e.selector),e.element&&(e.element.style.willChange="transform",e.element.style.transform="translate3d(0, 0, 0)")})}function T(){w+=(C-w)*.1,v+=(I-v)*.1;const e=w-x,r=v-q,t=Math.sqrt(e*e+r*r),s=e/t,o=r/t;A.forEach(n=>{if(!n.element)return;let l,a;n.selector===".pc"||n.selector===".phone"?(l=e*n.speed,a=r*n.speed):(l=-e*n.speed*n.spreadFactor,a=-r*n.speed*n.spreadFactor,l+=o*t*n.speed*(n.spreadFactor-1),a-=s*t*n.speed*(n.spreadFactor-1)),n.currentX+=(l-n.currentX)*.1,n.currentY+=(a-n.currentY)*.1,n.element.style.transform=`translate3d(${n.currentX}px, ${n.currentY}px, 0)`}),requestAnimationFrame(T)}function D(e){C=e.clientX,I=e.clientY}function M(){x=window.innerWidth/2,q=window.innerHeight/2}window.addEventListener("mousemove",D,{passive:!0});window.addEventListener("resize",M);B();T();const p=document.querySelector(".about-cat"),d=document.querySelector(".about-hand");let m=100,i=50,g=!1;const O=25;p.style.transform=`translateY(${m}px)`;p.style.transition="transform 0.5s";d.style.transform=`translateY(${i}px) rotate(0deg)`;d.style.transition="transform 0.5s";d.style.transformOrigin="center bottom";window.addEventListener("mousemove",e=>{const r=p.getBoundingClientRect(),t=e.clientX>r.left-150&&e.clientX<r.right+150&&e.clientY>r.top-150&&e.clientY<r.top;if(t&&!g){const s=setInterval(()=>{m>0?(m-=2,i>O&&(i-=1),p.style.transform=`translateY(${m}px)`,d.style.transform=`translateY(${i}px) rotate(0deg)`):(clearInterval(s),g=!0,setTimeout(()=>{d.style.transform=`translateY(${i}px) rotate(-20deg)`,setTimeout(()=>{d.style.transform=`translateY(${i}px) rotate(10deg)`},500)},100))},16)}!t&&g&&(m=100,i=50,g=!1,p.style.transform=`translateY(${m}px)`,d.style.transform=`translateY(${i}px) rotate(0deg)`)});$(".air-content").mousemove(function(e){$("#cross").css({left:e.pageX+"px",top:e.pageY+"px"})});