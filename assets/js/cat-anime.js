// 選取目標元素
const aboutCat = document.querySelector('.about-cat');
const aboutHand = document.querySelector('.about-hand');

let catY = 100;  // 設定 .about-cat 初始 translateY 為 100px
let handY = 50; // 設定 .about-hand 初始 translateY 為 50px
let isCatAtTop = false; // 標記動畫是否完成
const handTargetY = 25; // 手部上升的目標位置（上升一半的距離）

// 初始化樣式
aboutCat.style.transform = `translateY(${catY}px)`;
aboutCat.style.transition = 'transform 0.5s';
aboutHand.style.transform = `translateY(${handY}px) rotate(0deg)`;
aboutHand.style.transition = 'transform 0.5s';
aboutHand.style.transformOrigin = 'center bottom';

// 滑鼠移動事件
window.addEventListener('mousemove', (e) => {
    const catRect = aboutCat.getBoundingClientRect();

    // 計算滑鼠是否靠近 aboutCat 範圍
    const isNearCat =
        e.clientX > catRect.left - 150 && e.clientX < catRect.right + 150 &&
        e.clientY > catRect.top - 150 && e.clientY < catRect.top;

    if (isNearCat && !isCatAtTop) {
        // 同時執行兩個元素的上升動畫
        const animationInterval = setInterval(() => {
            if (catY > 0) {
                // 更新貓的位置
                catY -= 2;
                
                // 更新手的位置，但只上升到目標高度
                if (handY > handTargetY) {
                    handY -= 1; // 較慢的上升速度，確保只上升一半
                }
                
                aboutCat.style.transform = `translateY(${catY}px)`;
                aboutHand.style.transform = `translateY(${handY}px) rotate(0deg)`;
            } else {
                clearInterval(animationInterval);
                isCatAtTop = true;
                
                // 上升完成後，執行手的旋轉動畫
                setTimeout(() => {
                    aboutHand.style.transform = `translateY(${handY}px) rotate(-20deg)`;
                    
                    setTimeout(() => {
                        aboutHand.style.transform = `translateY(${handY}px) rotate(10deg)`;
                    }, 500);
                }, 100);
            }
        }, 16);
    }

    // 滑鼠遠離時重置
    if (!isNearCat && isCatAtTop) {
        catY = 100;
        handY = 50;
        isCatAtTop = false;

        aboutCat.style.transform = `translateY(${catY}px)`;
        aboutHand.style.transform = `translateY(${handY}px) rotate(0deg)`;
    }
});