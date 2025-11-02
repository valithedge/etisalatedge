
export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var cols = '';
    var title = '';
    var desc = '';
    var titleDesc = '';
    var iconSec = '';
    var cta = '';
    var bgImageSec='';
    var topSec='';
    var bottomSec='';
    var content = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<div class="inc-hero-banner bg-beige-light inc-inner-banner fullbleed " style="height: 967px;">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        for (let i = 0; i < cols.length; i++) {
            const collection = cols[i].children;
            if (i == 0) {
                
            }
            if (i == 1) {
                title += '<div class="inc-main-headings semibold">' + cols[i].innerHTML + '</div>';
            }
            if (i == 2) {
                desc += '<div class="inc-paragraphs white regular"><div class="p1">' + cols[i].innerHTML + '</div></div>';
            }
            if (i == 3) {
                var tagelement = '';
                Array.from(collection).forEach(function (element) {
                    const childelement = element.children;
                    tagelement = element.childNodes[0].getAttribute("href"); // it returns href value
                });
                cta += '<div class="inc-cta red"><a href="' + tagelement + '" class="inc--btn btn-primary"></a></div>';
                //console.log("cols tag= "+cols[i].innerHTML);
            }
            if (i == 4) {
                bgImageSec += '<div class="image-wrapper"><div class="cover">' + cols[i].innerHTML + '</div></div>';
            }
        }
        if (iconSec!='' || title != '' || desc != '') {
            topSec += '<div class="top-part">'+ iconSec + title + desc + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (cta != '') {
            bottomSec += '<div class="bottom-part">'+ cta + '</div>';
            //console.log("content="+content);
        }
        slide += '<div class="content-wrapper"><div class="container"><div class="content">' + topSec + bottomSec + '</div></div></div>' + bgImageSec;
        title = '';
        desc = '';
        titleDesc = '';
        content = '';
        iconSec = '';
        cta = '';

    }
    slide += '</div>';
    block.textContent = '';
    block.innerHTML = slide;
}