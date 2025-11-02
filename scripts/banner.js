import { swiperInit } from "../swiperInitialize";
//hero banner
$(document).ready(function() {

    initHeroSwiper();
    screenHeight();

});
//full-height-banner
function screenHeight() {
if(document.querySelector('.navbar-default')!==null && document.querySelector('.inc-hero-banner.fullbleed')!==null ){
	var heroBannerHeight = window.innerHeight -  document.querySelector('.navbar-default').clientHeight;
	document.querySelector('.inc-hero-banner.fullbleed').style.height = heroBannerHeight + "px"
}
}

// for multiple slides
function initHeroSwiper() {
    $(document).find('.inc-hero-banner-slider').each(function(index) {
        $(this).addClass('swiper-slider' + index);
        var $incHeroSlider = swiperInit('.swiper-slider' + index + ' .swiper-container',{
            //clickable: true,
            direction: 'horizontal',
            effect: 'fade',
            followFinger: false,
            nextButton: '.hero-next',
            prevButton: '.hero-prev',
            pagination: '.swiper-pagination',
            paginationType: 'bullets',
            paginationClickable: true,
            loop: true,
            slidesPerView: 1,
            autoplay: 5000,
            //   onClick: function(swiper, event){
            //     if ( $(event.target).hasClass('hero-bg-cta') ) {
            //       var url = $(swiper.clickedSlide).find('.hero-bg-cta').attr("data-label");
            //       if ( url !== "" && typeof(url) !== 'undefined'){
            //         window.location.href = url;
            //       }
            //     }
            //   }
        });
    });
}
