
export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    //const cols = [...rows[0].children];
    var bgImageSec = '';
    var categorySec = '';
    var title = '';
    var dateSec = '';
    var desc = '';
    var cta = '';
    var learnmoreSec = '';
    var slideSec = '';
    var bottomSec = '';
    var content = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<div class="cmp-articleSearch-search"><div class="tile-boxes-section-wrapper tile-boxes-large filtering">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        for (let i = 0; i < cols.length; i++) {
            const collection = cols[i].children;
            if (i == 6) {
                bgImageSec += '<div class="img-cover">' + cols[i].innerHTML + '</div>';
            }
            if (i == 0) {
                categorySec += '<h5 class="annoucements">' + cols[i].innerHTML + '</h5>';
            }
            if (i == 1) {
                title += '<h2>' + cols[i].innerHTML + '</h2>';
            }
            if (i == 2) {
                dateSec += '<span class="annoucement-date">' + cols[i].innerHTML + '</span>';
            }
            if (i == 3) {
                desc += '<div class="paragraph-styling ul-list-cms">' + cols[i].innerHTML + '</div>';
            }
            if (i == 4) {
                //console.log("CTA section = " + cols[i].innerHTML);
                var tagelement = '';
                Array.from(collection).forEach(function (element) {
                    const childelement = element.children;
                    tagelement = element.childNodes[0].getAttribute("href"); // it returns href value
                });
                //console.log("CTA text = " + cols[i].textContent);
                cta += '<a href="' + tagelement + '" class="btn-text btn-green learn-more">' + cols[i].textContent + '</a>';
                //console.log("cols tag= "+cols[i].innerHTML);
            }
            if (i == 5) {
                learnmoreSec += '<a href="#" class="btn news-loadmore--btn btn-default ripple-effect" id="loadMore">' + cols[i].textContent + '</a>';
            }
        }
        if (categorySec != '' || title != '' || dateSec != '' || desc != '') {
            tileBoxBody += '<div class="tile-box-body">' + categorySec + title + dateSec + desc + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (bgImageSec != '' || tileBoxBody != '' || cta != '') {
            tileBoxcontent += '<div class="loading-tile col-xs-12 col-md-4 f-news-room temp "><div class="tile-box-tile">' + bgImageSec + tileBoxBody + cta + '</div></div>';
            //console.log("titleDesc="+titleDesc);
        }

        slideSec += tileBoxcontent;
        categorySec = '';
        title = '';
        dateSec = '';
        desc = '';
        bgImageSec = '';
        tileBoxBody = '';
        cta = '';
    }

    slide += '<div class="container"><div class="row"><div class="tile-boxes-section"><div class="tileBoxMobCarWrap"><div class="tileboxCarousal"><div class="block filter-news-results">' + slideSec + '</div></div></div></div></div></div></div></div>';
    block.textContent = '';
    block.innerHTML = slide;
}