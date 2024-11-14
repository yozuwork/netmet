



// 檢查是否在有 Swiper 的頁面
if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
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
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 2.5,
                spaceBetween: 80,
            }
        }
    });

    // Swiper 導航按鈕
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');
    
    if (prevButton) prevButton.addEventListener('click', () => swiper.slidePrev());
    if (nextButton) nextButton.addEventListener('click', () => swiper.slideNext());
}

// 通用導航欄滾動效果
const navbar = document.querySelector('.navbar-gradient-bottom');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 選單系統初始化
function initializeMenu() {
    // 使用 querySelectorAll 來獲取所有 menuToggle 元素
    const menuToggles = document.querySelectorAll('.menuToggle');
    const mobileToggle = document.querySelector('.navbar-toggler');
    const airContact = document.getElementById('airContact');
    const navbar = document.querySelector('.navbar');
    
    if (!airContact) {
        console.warn('Air contact element not found');
        return;
    }

    // 選單開關函數
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

    // 處理選單項目點擊
    function handleMenuItemClick(e) {
        const menuItem = e.target.closest('.menu-item');
        if (!menuItem) return;

        const menuText = menuItem.querySelector('h1')?.textContent.trim();
        if (!menuText) return;

        // 根據選單文字決定導航位置
        let targetUrl;
        switch (menuText) {
            case '關於我們':
                targetUrl = '/netmet/#about';
                break;
            case '服務項目':
                targetUrl = '/netmet/#server';
                break;
            case '專案實績':
                targetUrl = '/netmet/#work';
                break;
        }

        if (targetUrl) {
            closeAirContact();
            window.location.href = targetUrl;
        }
    }

    // 為每個 menuToggle 元素綁定事件
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', openAirContact);
    });

    // 手機版選單綁定
    if (mobileToggle) {
        mobileToggle.removeAttribute('data-bs-toggle');
        mobileToggle.removeAttribute('data-bs-target');
        mobileToggle.addEventListener('click', openAirContact);
    }

    // 關閉按鈕
    document.addEventListener('click', function(e) {
        const closeBtn = e.target.closest('.close-button');
        if (closeBtn && airContact.contains(closeBtn)) {
            closeAirContact(e);
        }
    });

    // 選單項目點擊
    airContact.addEventListener('click', handleMenuItemClick);

    // 點擊外部關閉
    airContact.addEventListener('click', function(e) {
        if (e.target === airContact) {
            closeAirContact(e);
        }
    });

    // ESC 關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && airContact.classList.contains('active')) {
            closeAirContact();
        }
    });

    // 觸控支援
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

    // 滾動效果
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(function() {
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    });
}

// 平滑滾動
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// 處理頁面加載後的錨點滾動
function handleAnchorScroll() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
}

// DOM 載入完成後初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSmoothScroll();
    initializeMouseTracking();
    handleAnchorScroll();

    // 初始化 layoutDebug 調試功能
    
});
