export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var cols = '';
    var flag = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<section class="eand-hero-banner"><div class="container position-relative"><div class="swiper"><div class="swiper-wrapper">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        if( cols[0] != 'null' || cols[1] != 'null' || cols[2] != 'null' || cols[3] != 'null')
        {
            flag='true'
        }
        slide += '<div class="swiper-slide"><div class="hero-banner-tile align-items-lg-center bg-eand-mimosa-light position-relative d-flex flex-column flex-lg-row rounded-24 overflow-hidden">';
    for (let i = 0; i < cols.length; i++) {
        const collection = cols[i].children;
        if (i == 0) {
            slide += '<div class="eand-badge gr-eand-orange text-eand-white px-12 px-lg-12 py-1 py-lg-6 rounded-6 rounded-lg-8 mb-12 mb-lg-16"><div class="d-flex flex-center"><span>' + cols[i].textContent + '</span></div></div>';
        }
        if (i == 1) {
            slide += '<div class="eand-main-headings">' + cols[i].innerHTML + '</div>';
        }
        if(i == 2) {
            slide += '<div class="eand-paragraph"><div class="p1">' + cols[i].innerHTML + '</div></div>';
        }
        if (i == 3) {
            slide += '<div class="btn-wrapper mt-12 mt-lg-16">';
            Array.from(collection).forEach(function (element) {
                console.log("hero element "+ element.childNodes[0].getAttribute("class"));
                element.childNodes[0].setAttribute("class","btn btn-eand-secondary-100 ripple-effect");
                slide += element.innerHTML;
            });
            slide += '</div>';
        }
        if (i == 4) {
            slide += '<div class="img-wrap order-1 order-lg-2"><div class="cover">' + cols[i].innerHTML + '</div></div>';

        }
    }
}
    slide += '</div></div></div><!-- swiper pagination | always same --><div class="swiper-pagination pagination-lg-left mb-12 mb-lg-32 generic"></div></div><!-- swiper arrows | always same --><div class="swiper-button-next generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-next.svg" alt=""></div><div class="swiper-button-prev generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-prev.svg" alt=""></div></div></section>';
    block.textContent = '';
    block.innerHTML=slide;
}