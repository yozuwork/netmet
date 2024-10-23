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

