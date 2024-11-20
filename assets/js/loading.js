// 立即執行函數來處理 loading 畫面
(function() {
    // 在所有內容載入前先創建並顯示 loading 元素
    function createLoadingElement() {
        if (!document.getElementById('loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'loading';
            loadingDiv.innerHTML = '<img src="path-to-your-loading-image.gif" alt="Loading...">';
            loadingDiv.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999;
            `;
            loadingDiv.querySelector('img').style.cssText = `
                max-width: 100px;
                height: auto;
            `;
            
            // 插入到 body 的最前面
            if (document.body) {
                document.body.insertBefore(loadingDiv, document.body.firstChild);
            } else {
                // 如果 body 還不存在，等待 DOM 完成後插入
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.insertBefore(loadingDiv, document.body.firstChild);
                });
            }
        }
    }

    // 立即創建 loading 元素
    createLoadingElement();
})();

// Loading 控制功能
let loadingTimeout;

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 等待圖片載入
function waitForImages() {
    return new Promise((resolve) => {
        const images = document.querySelectorAll('img');
        const totalImages = images.length;
        let loadedImages = 0;

        if (totalImages === 0) {
            resolve();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === totalImages) {
                    resolve();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        resolve();
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        resolve();
                    }
                });
            }
        });
    });
}

// 等待指定資源載入
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            return;
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

// DOM 載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 確保 loading 畫面顯示
    showLoading();
    
    // 等待關鍵元素和資源載入
    Promise.all([
        // 等待導航欄載入
        waitForElement('.navbar'),
        // 等待其他關鍵元素
        waitForElement('#airContact'),
        // 等待所有圖片
        waitForImages(),
        // 最小載入時間
        new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(() => {
        // 初始化功能
        initializeMenu();
        initializeSmoothScroll();
        
        // 隱藏 loading 畫面
        hideLoading();
        
        // 處理錨點滾動
        handleAnchorScroll();
    }).catch(error => {
        console.error('Error during initialization:', error);
        // 發生錯誤時也要隱藏 loading 畫面
        hideLoading();
    });
});

// 處理瀏覽器返回按鈕
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading && loading.style.display !== 'none') {
        Promise.all([
            waitForImages(),
            new Promise(resolve => setTimeout(resolve, 1000))
        ]).then(hideLoading);
    }
});