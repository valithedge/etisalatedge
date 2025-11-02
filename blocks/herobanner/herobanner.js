
export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var cols = '';
    var title = '';
    var desc = '';
    var titleDesc = '';
    var badge = '';
    var cta = '';
    var content = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<section class="eand-hero-banner"><div class="container position-relative"><div class="swiper"><div class="swiper-wrapper">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        slide += '<div class="swiper-slide"><div class="hero-banner-tile align-items-lg-center bg-eand-mimosa-light position-relative d-flex flex-column flex-lg-row rounded-24 overflow-hidden">';
        for (let i = 0; i < cols.length; i++) {
            const collection = cols[i].children;
            if (i == 0) {
                badge += '<div class="eand-badge gr-eand-orange text-eand-white px-12 px-lg-12 py-1 py-lg-6 rounded-6 rounded-lg-8 mb-12 mb-lg-16"><div class="d-flex flex-center"><span>' + cols[i].textContent + '</span></div></div>';
            }
            if (i == 1) {
                title += '<div class="eand-main-headings new-class">' + cols[i].innerHTML + '</div>';
            }
            if (i == 2) {
                desc += '<div class="eand-paragraph"><div class="p1">' + cols[i].innerHTML + '</div></div>';
            }
            if (i == 3) {
                cta += '<div class="btn-wrapper mt-12 mt-lg-16">';
                Array.from(collection).forEach(function (element) {
                    element.childNodes[0].setAttribute("class", "btn btn-eand-secondary-100 ripple-effect");
                    cta += element.innerHTML;
                });
                cta += '</div>';
            }
            if (i == 4) {
                slide += '<div class="img-wrap order-1 order-lg-2"><div class="cover">' + cols[i].innerHTML + '</div></div>';
            }
        }
        if (title != '' || desc != '') {
            titleDesc += '<div class="content">' + title + desc + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (badge != '' || titleDesc != '' || cta != '') {
            content += '<div class="content-wrap d-flex flex-column justify-content-between order-2 order-lg-1 px-16 px-lg-32 px-xl-48 pt-16 pb-32 pt-lg-32 pb-lg-64">' + badge + titleDesc + cta + '</div>';
            //console.log("content="+content);
        }
        slide += content + '</div></div>';
        title = '';
        desc = '';
        titleDesc = '';
        content = '';
        badge = '';
        cta = '';

    }
    slide += '</div><!-- swiper pagination | always same --><div class="swiper-pagination pagination-lg-left mb-12 mb-lg-32 generic"></div></div><!-- swiper arrows | always same --><div class="swiper-button-next generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-next.svg" alt=""></div><div class="swiper-button-prev generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-prev.svg" alt=""></div></div></section>';
    block.textContent = '';
    block.innerHTML = slide;
}