let options = {};
console.log("Hero Banner 1");
if ($(".swiper-container .swiper-slide").length == 1) {
  console.log("Hero Banner 2");
  options = {
    direction: 'horizontal',
    loop: false,
    autoplayDisableOnInteraction: false,

    keyboardControl: true,
    mousewheelControl: true,

    pagination: '.swiper-pagination',
    paginationClickable: true,
  }
} else {
};

function initHeorBanner() {
  console.log("Hero Banner 4");
  $(document).find('.eand-hero-banner').each(function (index) {
    let delay = $(this).find("#delayTime").length > 0 && $(this).find("#delayTime").val() !== '' ? {
      delay: $(this).find("#delayTime").val()
    } : false;
    console.log(delay)
    $(this).addClass('hbSlider' + index);
    var $contextNavigation = $(this);
    $contextNavigation.find('.swiper-button-next').addClass('hbRight' + index);
    $contextNavigation.find('.swiper-button-prev').addClass('hbLeft' + index);
    $contextNavigation.find('.swiper-pagination').addClass('hbPagination' + index);
    var slideCount = $contextNavigation.find('.swiper-slide').length;


    // swiper options
    if (slideCount > 5) {
      options = {
        slidesPerView: 1,
        autoplay: delay,
        pagination: {
          el: '.swiper-pagination.hbPagination' + index,
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4
        },
        navigation: {
          nextEl: '.swiper-button-next.hbRight' + index,
          prevEl: '.swiper-button-prev.hbLeft' + index,
          clickable: true
        }
      }
      $(this).find('.swiper-pagination').addClass('pagination-lg-left');
    } else {
      options = {
        slidesPerView: 1,
        autoplay: delay,
        pagination: {
          el: '.swiper-pagination.hbPagination' + index,
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4
        },
        navigation: {
          nextEl: '.swiper-button-next.hbRight' + index,
          prevEl: '.swiper-button-prev.hbLeft' + index,
          clickable: true
        }
      }
    }

    // slide count 1 hide arrows/pagination
    if (slideCount <= 1) {
      $contextNavigation.addClass('remove-controls');
    }

    // swiper
    var HeroBannerSlider = new Swiper('.hbSlider' + index + ' .swiper', options);



  });
}

// register the event handlers
$(document).ready(function () {
  $('.eand-hero-banner .hero-banner-tile .btn-wrapper a').on("click", function () {
    sessionStorage.setItem("AddToBillManage", true)
    console.log("Hero Banner 5");
  })
  console.log("Hero Banner 3");
  initHeorBanner();
});