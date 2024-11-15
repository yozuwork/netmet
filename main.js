import './assets/scss/all.scss';
import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';
import './assets/js/all.js';
import './assets/js/mouse-parallax.js';
import './assets/js/cat-anime.js';





$('.air-content').mousemove(function(evt){
    $("#cross").css({
        "left": evt.pageX + "px",
        "top": evt.pageY + "px"
    });
});







