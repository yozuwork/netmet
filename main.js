import './assets/scss/all.scss';
import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';

const swiper = new Swiper('.swiper', {
    // 默認設置（手機版）
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: 1,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    // 響應式斷點
    breakpoints: {
        // >= 768px (平板)
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        // >= 992px (桌面)
        992: {
            slidesPerView: 2.5,
            spaceBetween: 80,
        }
    }
});

// 綁定自定義導航按鈕事件
document.querySelector('.custom-prev').addEventListener('click', () => {
    swiper.slidePrev();
});

document.querySelector('.custom-next').addEventListener('click', () => {
    swiper.slideNext();
});




// JavaScript
const navbar = document.querySelector('.navbar-gradient-bottom');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// 簡單直接的平滑滾動
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // 處理回到頂部的情況
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            // 處理滾動到特定元素
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 更具體地選擇元素
    const menuToggle = document.getElementById('menuToggle');
    const mobileToggle = document.querySelector('.navbar-toggler');
    const airContact = document.getElementById('airContact');
    const navbar = document.querySelector('.navbar');
    
    // 使用多個選擇器確保能找到關閉按鈕
    const closeButton = document.querySelector('.air-contact .close-button, .close-button');
    
    // 確保元素存在
    if (!airContact) {
        console.error('Air contact element not found');
        return;
    }
    
    // 新增: 處理選單項目導航
    function handleMenuItemClick(e) {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            // 獲取選單項目的文字內容
            const menuText = menuItem.querySelector('h1').textContent.trim();
            
            // 根據選單項目文字決定導航位置
            let targetSection;
            switch (menuText) {
                case '關於我們':
                    targetSection = '#about';
                    break;
                case '服務項目':
                    targetSection = '#server';
                    break;
                case '專案時機':
                    targetSection = '#work';
                    break;
                // 可以根據需要添加更多案例
            }
            
            // 如果找到對應的區段，進行導航
            if (targetSection) {
                const targetElement = document.querySelector(targetSection);
                if (targetElement) {
                    // 關閉選單
                    closeAirContact();
                    
                    // 平滑滾動到目標位置
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // 等待選單關閉動畫完成
                }
            }
        }
    }

    function openAirContact(e) {
        e.preventDefault();
        e.stopPropagation();
        airContact.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeAirContact(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        airContact.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 桌面版選單按鈕
    if (menuToggle) {
        menuToggle.addEventListener('click', openAirContact);
    }
    
    // 手機版選單按鈕
    if (mobileToggle) {
        mobileToggle.removeAttribute('data-bs-toggle');
        mobileToggle.removeAttribute('data-bs-target');
        mobileToggle.addEventListener('click', openAirContact);
    }
    
    // 關閉按鈕 - 使用事件委派
    document.addEventListener('click', function(e) {
        const closeBtn = e.target.closest('.close-button');
        if (closeBtn && airContact.contains(closeBtn)) {
            closeAirContact(e);
        }
    });
    
    // 修改: 選單項目點擊處理
    airContact.addEventListener('click', handleMenuItemClick);
    
    // 點擊外部關閉 - 改進版本
    airContact.addEventListener('click', function(e) {
        if (e.target === airContact) {
            closeAirContact(e);
        }
    });
    
    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && airContact.classList.contains('active')) {
            closeAirContact();
        }
    });
    
    // 處理滾動效果
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(function() {
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    });
    
    // 添加觸摸事件支持
    let touchStartY = 0;
    airContact.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    airContact.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const yDiff = touchEndY - touchStartY;
        
        if (yDiff > 50 && e.target === airContact) {
            closeAirContact();
        }
    });
});




//使用JQ抓取視窗滑鼠位置

//滑鼠正在移動的時候 抓取一個事件
$(window).mousemove(function(evt){
    var x = evt.pageX; //滑鼠移動時X座標
    var y = evt.pageY; //滑鼠移動時Y座標
    console.log(`${x},${y}`);
    
   $("#cross").css("left",x+"px");
   $("#cross").css("top",y+"px");
 
   var about_cat = $(".about_cat").offset().left + $(".about_cat").width()/2 ;

    //中間位置
 
   
 
   if(Math.abs(x-about_cat)<80){
      $(".about_cat").css("bottom","0px");
   }else{
     $(".about_cat").css("bottom","-100px");
   }

  
   
 
   
   
 });