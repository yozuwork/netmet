// 選取目標元素
const aboutCat = document.querySelector('.about-cat');
const aboutHand = document.querySelector('.about-hand');

let catY = 100;  // 設定 .about-cat 初始 translateY 為 100px
let handY = 50; // 設定 .about-hand 初始 translateY 為 -30px
let isCatAtTop = false; // 標記 `.about-cat` 是否上升完成

// 初始化樣式
aboutCat.style.transform = `translateY(${catY}px)`;
aboutCat.style.transition = 'transform 0.5s'; // 加入平滑效果
aboutHand.style.transform = `translateY(${handY}px) rotate(0deg)`;
aboutHand.style.transition = 'transform 0.5s'; // 加入平滑效果
aboutHand.style.transformOrigin = 'center bottom'; // 設定旋轉基點

// 滑鼠移動事件
window.addEventListener('mousemove', (e) => {
    const catRect = aboutCat.getBoundingClientRect(); // 獲取 .about-cat 的位置

    // 計算滑鼠是否靠近 aboutCat 範圍（不包括下方）
    const isNearCat =
        e.clientX > catRect.left - 150 && e.clientX < catRect.right + 150 &&
        e.clientY > catRect.top - 150 && e.clientY < catRect.top;

    if (isNearCat && !isCatAtTop) {
        // 先執行 `.about-cat` 的上升動畫
        const catUpInterval = setInterval(() => {
            if (catY > 0) {
                catY -= 2; // 上升速度
                aboutCat.style.transform = `translateY(${catY}px)`;
               
            } else {
                clearInterval(catUpInterval);
                isCatAtTop = true; // 上升完成標記

                // 上升完成後，執行 `.about-hand` 的上升和旋轉動畫
                const handUpInterval = setInterval(() => {
                    if (handY < 50) {
                        handY += 2; // 上升速度
                        aboutHand.style.transform = `translateY(${handY}px) rotate(-20deg)`;
                    } else {
                        clearInterval(handUpInterval);
                        aboutHand.style.transform = `translateY(${handY}px) rotate(10deg)`; // 最後的旋轉效果
                    }
                }, 16);
            }
        }, 16);
    }

    // 滑鼠遠離時重置，並加入平滑過渡
    if (!isNearCat && isCatAtTop) {
        catY = 100; // 恢復到初始位置
        handY = 50; // 恢復到初始位置
        isCatAtTop = false;

        aboutCat.style.transform = `translateY(${catY}px)`; // 平滑回到初始位置
        aboutHand.style.transform = `translateY(${handY}px) rotate(0deg)`; // 平滑回到初始位置
    }
});
