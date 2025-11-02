
export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var cols = '';
    var title = '';
    var desc = '';
    var topSec = '';
    var bottomSec = '';
    var imageSec = '';
    var icon = '';
    var cta = '';
    var content = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<div class="inc-hero-banner bg-beige-light inc-inner-banner fullbleed " style="height: 967px;">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        // slide += '';
        for (let i = 0; i < cols.length; i++) {
            const collection = cols[i].children;
            if (i == 0) {
                icon += '<div class="inc-main-headings logo-icon">' + cols[i].textContent + '</div>';
            }
            if (i == 1) {
                title += '<div class="inc-main-headings semibold">' + cols[i].innerHTML + '</div>';
            }
            if (i == 2) {
                desc += '<div class="inc-paragraphs white regular"><div class="p1">' + cols[i].innerHTML + '</div></div>';
            }
            if (i == 3) {
                cta += '<div class="bottom-part"><div class="inc-cta red">';
                Array.from(collection).forEach(function (element) {
                    element.childNodes[0].setAttribute("class", "inc--btn btn-primary");
                    cta += element.innerHTML;
                });
                cta += '</div></div>';
            }
            if (i == 4) {
                imageSec += '<div class="image-wrapper"><div class="cover">' + cols[i].innerHTML + '</div></div>';
            }
        }
        if (icon != '' || title != '' || desc != '') {
            topSec += '<div class="top-part">' + icon + title + desc + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (cta != '') {
            bottomSec += '<div class="bottom-part">' + cta + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (topSec != '' || bottomSec != '') {
            content += '<div class="content-wrapper"><div class="container"><div class="content">' + topSec + bottomSec + '</div></div></div>' + imageSec;
            //console.log("content="+content);
        }
        slide += content;
        title = '';
        desc = '';
        titleDesc = '';
        content = '';
        badge = '';
        cta = '';

    }
    slide += '</div>';
    //slide += '</div><!-- swiper pagination | always same --><div class="swiper-pagination pagination-lg-left mb-12 mb-lg-32 generic"></div></div><!-- swiper arrows | always same --><div class="swiper-button-next generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-next.svg" alt=""></div><div class="swiper-button-prev generic icon icon-lg-48 d-none d-lg-flex flex-center"><img src="https://www.etisalat.ae/content/dam/etisalat/consumer/nwt/resources/img/svg-icons/icon-carousel-prev.svg" alt=""></div></div></section>';
    block.textContent = '';
    block.innerHTML = slide;
}