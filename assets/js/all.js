// Swiper 初始化
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

    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');
    
    if (prevButton) prevButton.addEventListener('click', () => swiper.slidePrev());
    if (nextButton) nextButton.addEventListener('click', () => swiper.slideNext());
}

// 選單開關功能
function openAirContact(e) {
    const airContact = document.getElementById('airContact');
    if (!airContact) return;
    
    e.preventDefault();
    e.stopPropagation();
    airContact.classList.add('active');
   
}

function closeAirContact(e) {
    const airContact = document.getElementById('airContact');
    if (!airContact) return;
    
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    airContact.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 選單系統初始化
function initializeMenu() {
    const menuToggles = document.querySelectorAll('.menuToggle');
    const mobileToggle = document.querySelector('.navbar-toggler');
    const airContact = document.getElementById('airContact');
    const closeButtons = document.querySelectorAll('.close-button');
    const navbar = document.querySelector('.navbar');
    
    if (!airContact) {
        console.warn('Air contact element not found');
        return;
    }

    // 處理選單項目點擊
    function handleMenuItemClick(e) {
        const menuItem = e.target.closest('.menu-item');
        if (!menuItem) return;

        const menuText = menuItem.querySelector('h1')?.textContent.trim();
        if (!menuText) return;

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
            case '回到主頁':
                closeAirContact(); // 先關閉選單
                break;
        }

        if (targetUrl) {
            closeAirContact();
            window.location.href = targetUrl;
        }
    }

    // 綁定所有關閉按鈕
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAirContact);
    });

    // 綁定選單開啟按鈕
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', openAirContact);
    });

    // 手機版選單
    if (mobileToggle) {
        mobileToggle.removeAttribute('data-bs-toggle');
        mobileToggle.removeAttribute('data-bs-target');
        mobileToggle.addEventListener('click', openAirContact);
    }

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

    // 選單項目點擊
    airContact.addEventListener('click', handleMenuItemClick);

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

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSmoothScroll();
    handleAnchorScroll();
});