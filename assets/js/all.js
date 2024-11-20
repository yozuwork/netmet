




// 檢查是否在有 Swiper 的頁面
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: 0, // 確保從第一張開始
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    loop: false, // 如果希望到達末尾時不循環，設定為 false
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 2.5,
            spaceBetween: 80,
        }
    },
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    }
});

// Swiper 實例監聽滑動事件，更新按鈕狀態
swiper.on('slideChange', () => {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    // 當前是第一張時，禁用 prev 按鈕
    if (swiper.isBeginning) {
        prevButton.setAttribute('disabled', 'true');
    } else {
        prevButton.removeAttribute('disabled');
    }

    // 當前是最後一張時，禁用 next 按鈕
    if (swiper.isEnd) {
        nextButton.setAttribute('disabled', 'true');
    } else {
        nextButton.removeAttribute('disabled');
    }
});

// 初始化按鈕狀態（防止頁面加載後狀態不正確）
document.addEventListener('DOMContentLoaded', () => {
    if (swiper.isBeginning) {
        document.querySelector('.custom-prev').setAttribute('disabled', 'true');
    }
    if (swiper.isEnd) {
        document.querySelector('.custom-next').setAttribute('disabled', 'true');
    }
});



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

    // 處理選單項目點擊，加入平滑捲動
    function handleMenuItemClick(e) {
        e.preventDefault(); // 先阻止默認行為
        const menuItem = e.target.closest('.menu-item');
        if (!menuItem) return;

        const menuText = menuItem.querySelector('h1')?.textContent.trim();
        if (!menuText) return;

        let targetId;
        switch (menuText) {
            case '關於我們':
                targetId = 'about';
                break;
            case '服務項目':
                targetId = 'server';
                break;
            case '專案實績':
                targetId = 'work';
                break;
            case '回到主頁':
                closeAirContact();
                return;
        }

        if (targetId) {
            e.preventDefault(); // 防止預設行為
            closeAirContact();
            
            // 檢查是否在同一頁面
            if (window.location.pathname === '/netmet/') {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // 如果不在同一頁面，先導航再捲動
                window.location.href = `/netmet/#${targetId}`;
                // 當新頁面載入後自動捲動到目標位置
                window.location.href = `/netmet/#${targetId}`;
            }
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

    function openAirContact(e) {
        e.preventDefault();
        e.stopPropagation();
        airContact.classList.add('active');
        
    }
    
    function closeAirContact(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        airContact.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

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

    // 處理頁面載入時的錨點捲動
    window.addEventListener('load', function() {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
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
 // 禁用所有圖片的拖動功能
 document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      img.addEventListener("dragstart", event => {
        event.preventDefault(); // 禁止拖動
      });
    });
  });
// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSmoothScroll();
    handleAnchorScroll();
});