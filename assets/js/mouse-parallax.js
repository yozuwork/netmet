let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

let windowCenterX = window.innerWidth / 2;
let windowCenterY = window.innerHeight / 2;

const objects = [
    { selector: '.one-obj', speed: 0.05, spreadFactor: 1.2, element: null, currentX: 0, currentY: 0 },
    { selector: '.two-obj', speed: 0.04, spreadFactor: 1.4, element: null, currentX: 0, currentY: 0 },
    { selector: '.three-obj', speed: 0.03, spreadFactor: 1.6, element: null, currentX: 0, currentY: 0 },
    { selector: '.four-obj', speed: 0.07, spreadFactor: 1.3, element: null, currentX: 0, currentY: 0 },
    { selector: '.five-obj', speed: 0.03, spreadFactor: 1.5, element: null, currentX: 0, currentY: 0 },
    { selector: '.six-obj', speed: 0.07, spreadFactor: 1.2, element: null, currentX: 0, currentY: 0 },
    { selector: '.seven-obj', speed: 0.06, spreadFactor: 1.4, element: null, currentX: 0, currentY: 0 },
    { selector: '.eight-obj', speed: 0.01, spreadFactor: 1.7, element: null, currentX: 0, currentY: 0 },
    { selector: '.nine-obj', speed: 0.05, spreadFactor: 1.3, element: null, currentX: 0, currentY: 0 },
    { selector: '.ten-obj', speed: 0.06, spreadFactor: 1.5, element: null, currentX: 0, currentY: 0 },
    { selector: '.pc', speed: 0.03, spreadFactor: 1, element: null, currentX: 0, currentY: 0 },
    // 新增的物件
    { selector: '.a01', speed: 0.05, spreadFactor: 1.3, element: null, currentX: 0, currentY: 0 },
    { selector: '.a02', speed: 0.04, spreadFactor: 1.5, element: null, currentX: 0, currentY: 0 },
    { selector: '.a03', speed: 0.06, spreadFactor: 1.4, element: null, currentX: 0, currentY: 0 },
    { selector: '.a04', speed: 0.03, spreadFactor: 1.6, element: null, currentX: 0, currentY: 0 },
    { selector: '.a05', speed: 0.07, spreadFactor: 1.2, element: null, currentX: 0, currentY: 0 },
    { selector: '.phone', speed: 0.03, spreadFactor: 1, element: null, currentX: 0, currentY: 0 }
];

function init() {
    objects.forEach(obj => {
        obj.element = document.querySelector(obj.selector);
        if (obj.element) {
            obj.element.style.willChange = 'transform';
            obj.element.style.transform = 'translate3d(0, 0, 0)';
        }
    });
}

function animate() {
    targetX += (mouseX - targetX) * 0.1;
    targetY += (mouseY - targetY) * 0.1;

    const distanceX = targetX - windowCenterX;
    const distanceY = targetY - windowCenterY;

    const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const normalizedX = distanceX / totalDistance;
    const normalizedY = distanceY / totalDistance;

    objects.forEach(obj => {
        if (!obj.element) return;

        let newX, newY;
        if (obj.selector === '.pc' || obj.selector === '.phone') {
            newX = distanceX * obj.speed;
            newY = distanceY * obj.speed;
        } else {
            newX = -distanceX * obj.speed * obj.spreadFactor;
            newY = -distanceY * obj.speed * obj.spreadFactor;

            newX += (normalizedY * totalDistance * obj.speed * (obj.spreadFactor - 1));
            newY -= (normalizedX * totalDistance * obj.speed * (obj.spreadFactor - 1));
        }

        obj.currentX += (newX - obj.currentX) * 0.1;
        obj.currentY += (newY - obj.currentY) * 0.1;

        obj.element.style.transform = `translate3d(${obj.currentX}px, ${obj.currentY}px, 0)`;
    });

    requestAnimationFrame(animate);
}

function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function handleResize() {
    windowCenterX = window.innerWidth / 2;
    windowCenterY = window.innerHeight / 2;
}

window.addEventListener('mousemove', handleMouseMove, { passive: true });
window.addEventListener('resize', handleResize);

init();
animate();