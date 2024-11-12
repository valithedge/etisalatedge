export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows0 = " + rows[0].innerHTML);
    const cols = [...rows[0].children];
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<div class="container"><div class="special-offer-tile py-lg-32 px-xl-48 px-lg-32 px-24 py-24 rounded-16 position-relative overflow-hidden  bg-eand-primary-100 text-eand-white"><div class="content-wrapper row gx-0 gx-lg-24 align-items-center position-relative "><div class="col-12 col-lg-8">';
    for (let i = 0; i < cols.length; i++) {
        const collection = cols[i].children;
        if (i == 0) {
            slide += '<div class="eand-badge bg-eand-online-exclusive text-eand-primary-100 px-12 px-lg-16 py-1 py-lg-6 mb-lg-8 mb-1 rounded-6 rounded-lg-8"><div class="d-flex flex-center"><span class="icon icon-16 me-1 lh-1"><img src="/icons/icons-star-black.svg" alt="icon"/></span><span>' + cols[i].textContent + '</span></div></div>';
        }
        if (i == 1) {
            slide += '<div class="eand-main-headings"><h4>' + cols[i].textContent + '</h4></div></div>';
        }
        if (i == 2) {
            //console.log("i = " + i);
            var tagelement='';
            //console.log("child1 tag= "+tagelement.children.item(0));
            Array.from(collection).forEach(function (element) {
                const childelement = element.children;
                console.log("element tag= "+element.childNodes[0].getAttribute("href"));
                console.log("child tag= "+childelement);
                //tagelement =childelement.item(0); // it returns href value
                tagelement = element.childNodes[0].getAttribute("href"); // it returns href value
                // console.log("child1 tag= "+tagelement);
            });
            slide += '<div class="col-12 col-lg-4 d-flex justify-content-lg-end"><div class="btn-wrapper d-none d-md-none d-lg-block d-xl-block">' + cols[i].innerHTML + '</div><!-- /* Right Arrow show only mobile screen */ --><a href="'+ tagelement +'" class="rightarrow d-xl-none d-lg-none d-block" target="_self"></a></div>';
            //console.log("cols tag= "+cols[i].innerHTML);
        }
    }
    slide += '</div></div></div></div>';
    block.textContent = '';
    block.innerHTML=slide;
}