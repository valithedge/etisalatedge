export default function decorate(block) {
    const rows = [...block.children];
    //console.log("Box Card" + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var cols = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<section class="eand-box-card grid-view"><div class="container position-relative"><div class="swiper"><div class="swiper-wrapper">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        slide += '<div class="swiper-slide"><div class="eand-box box-card-tile border-2 border-eand-primary-10 hover-eand-dark-red rounded-16 h-100 ">';
    for (let i = 0; i < cols.length; i++) {
        const collection = cols[i].children;
        if (i == 0) {
            slide+='<a href="' + cols[i].textContent + '" class="link-full-view" target="_self"></a>';
        }
        if (i == 1) {
            slide += '<div class="content-wrapper text-center d-flex flex-column flex-center overflow-hidden rounded-16 px-lg-16 py-lg-24 px-12 py-16 h-100"><div class="icon icon-40 d-flex flex-center mb-lg-16 mb-8">';
            Array.from(collection).forEach(function (element) {
                slide += element.innerHTML;
            });
            slide += '</div>';
        }
        if(i == 2) {
            slide += '<div class="eand-main-headings">' + cols[i].innerHTML + '</div></div>';
        }
    }
    slide += '</div></div>';
}
    slide += '</div></div></div></section>';
    block.textContent = '';
    block.innerHTML=slide;
}