export default function decorate(block) {
    const rows = [...block.children];
    var slide = '<div class="container"><div class="special-offer-tile py-lg-32 px-xl-48 px-lg-32 px-24 py-24 rounded-16 position-relative overflow-hidden  bg-eand-primary-100 text-eand-white"><div class="content-wrapper row gx-0 gx-lg-24 align-items-center position-relative "><div class="col-12 col-lg-8"><div class="eand-badge bg-eand-online-exclusive text-eand-primary-100 px-12 px-lg-16 py-1 py-lg-6 mb-lg-8 mb-1 rounded-6 rounded-lg-8"><div class="d-flex flex-center"><span class="icon icon-16 me-1 lh-1"><img src="/icons/icons-star-black.svg" alt="icon"/></span><span>';
    //console.log(slide);
    for (let i = 0; i < rows.length; i++) {
        //console.log("child[" + i + "] = " + rows[i].tagName);
        //console.log("child = " + rows[i].children);
        const collection = rows[i].children;
        //console.log(element);
        if (i == 0) {
            Array.from(collection).forEach(function (element) {
                const childelement = element.children;
                Array.from(childelement).forEach(function (elementchild) {
                    //console.log("element child = " + elementchild.innerHTML);
                    slide += elementchild.innerHTML;
                });
            });
        }
        if (i == 1) {
            Array.from(collection).forEach(function (element) {
                const childelement = element.children;
                Array.from(childelement).forEach(function (elementchild) {
                    //console.log("element child = " + elementchild.innerHTML);
                    slide += '</span></div></div><div class="eand-main-headings"><h4>' + elementchild.innerHTML;
                });
            });
        }
        if (i == 2) {
            Array.from(collection).forEach(function (element) {
                const childelement = element.children;
                Array.from(childelement).forEach(function (elementchild) {
                    //console.log("element child = " + elementchild.innerHTML);
                    slide += '</h4></div></div><div class="col-12 col-lg-4 d-flex justify-content-lg-end"><div class="btn-wrapper d-none d-md-none d-lg-block d-xl-block">' + elementchild.innerHTML + '</div><!-- /* Right Arrow show only mobile screen */ --><a href="';
                    Array.from(elementchild.children).forEach(function (elementtag) {
                        slide += elementtag + '" class="rightarrow d-xl-none d-lg-none d-block" target="_self"><div class="icon icon-32 icon-lg-48 d-flex flex-center mt-12"><img src="/etc.clientlibs/etisalat/clientlibs/clientlib-nwtcon/resources/img/svg-icons/icon-right-arrow-white.svg" alt="right arrow icon"/></div></a></div></div></div></div></div>';
                        //console.log("log = "+elementtag)
                    });
                });
            });
        }
    }
    //console.log("after = " + slide);
    block.textContent = '';
    block.innerHTML=slide;
}