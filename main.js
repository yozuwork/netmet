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
console.log("Hello world!");



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
    const closeButton = document.querySelector('.air-contact .close-button'); // 改用 class 選擇器
    const airContact = document.getElementById('airContact');
    const navbar = document.querySelector('.navbar');
    
    function openAirContact(e) {
        e.preventDefault();
        airContact.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeAirContact() {
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
    
    // 關閉按鈕 - 使用新的選擇器
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeAirContact();
        });
    } else {
        console.error('Close button not found');
    }
    
    // 選單項目點擊後關閉
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', closeAirContact);
    });
    
    // 點擊外部關閉
    airContact.addEventListener('click', function(e) {
        if (e.target === airContact) {
            closeAirContact();
        }
    });
    
    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && airContact.classList.contains('active')) {
            closeAirContact();
        }
    });

    // 處理滾動效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 添加調試日誌
    console.log('Close button:', closeButton);
    console.log('Air contact:', airContact);
});