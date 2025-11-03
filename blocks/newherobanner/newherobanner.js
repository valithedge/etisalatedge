
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
    var bgImageSec = '';
    var topSec = '';
    var bottomSec = '';
    var content = '';
    //console.log("cols = " + cols[0].innerHTML);
    var slide = '<div class="inc-hero-banner bg-beige-light inc-inner-banner fullbleed " style="height: 967px;">';
    for (let j = 0; j < rows.length; j++) {
        cols = [...rows[j].children];
        for (let i = 0; i < cols.length; i++) {
            const collection = cols[i].children;
            if (i == 0) {
                // Build a plain <img> for the icon (no <picture> or srcset).
                // Try img src, data-src, picture>img, picture>source srcset, or inline background-image.
                var src = '';
                try {
                    // prefer direct img inside the cell
                    const directImg = cols[i].querySelector('img');
                    if (directImg) {
                        src = directImg.getAttribute('src') || directImg.getAttribute('data-src') || directImg.src || '';
                        //console.log("icon path src = " + src);
                    }
                    // if not found, check for <picture> > <img>
                    if (!src) {
                        const picture = cols[i].querySelector('picture');
                        if (picture) {
                            const picImg = picture.querySelector('img');
                            if (picImg) src = picImg.getAttribute('src') || picImg.getAttribute('data-src') || picImg.src || '';
                            else {
                                const source = picture.querySelector('source');
                                if (source) {
                                    const ss = source.getAttribute('srcset') || source.getAttribute('data-srcset') || '';
                                    if (ss) src = ss.split(',')[0].trim().split(' ')[0];
                                }
                            }
                        }
                    }
                    // fallback: any <source> in the cell
                    if (!src) {
                        const anySource = cols[i].querySelector('source');
                        if (anySource)  {
                            const ss = anySource.getAttribute('srcset') || anySource.getAttribute('data-srcset') || '';
                            if (ss) src = ss.split(',')[0].trim().split(' ')[0];
                        }
                    }
                    // fallback: inline style background-image
                    if (!src) {
                        const styled = cols[i].querySelector('[style]');
                        if (styled) {
                            const m = styled.getAttribute('style').match(/url\(["']?([^"')]+)["']?\)/);
                            if (m) src = m[1];
                        }
                    }
                } catch (e) {
                    // keep src empty on error and fall back below
                    //console.log('error extracting icon src', e);
                }

                if (src) {
                    // use alt from any img if available
                    var alt = '';
                    const anyImg = cols[i].querySelector('img');
                    if (anyImg) alt = anyImg.getAttribute('alt') || '';
                    iconSec = '<div class="inc-main-headings logo-icon"><img src="' + src + '" alt="' + (alt || '') + '"/></div>';
                } else {
                    // fallback to original innerHTML if we couldn't resolve a src
                    iconSec = '<div class="inc-main-headings logo-icon">' + cols[i].innerHTML + '</div>';
                }
            }
            if (i == 1) {
                title += '<div class="inc-main-headings semibold">' + cols[i].innerHTML + '</div>';
            }
            if (i == 2) {
                desc += '<div class="inc-paragraphs white regular"><div class="p1">' + cols[i].innerHTML + '</div></div>';
            }
            if (i == 3) {
                //console.log("CTA section = " + cols[i].innerHTML);
                var tagelement = '';
                Array.from(collection).forEach(function (element) {
                    const childelement = element.children;
                    tagelement = element.childNodes[0].getAttribute("href"); // it returns href value
                });
                //console.log("CTA text = " + cols[i].textContent);
                cta += '<div class="inc-cta red"><a href="' + tagelement + '" class="inc--btn btn-primary">' + cols[i].textContent + '</a></div>';
                //console.log("cols tag= "+cols[i].innerHTML);
            }
            if (i == 4) {
                bgImageSec += '<div class="image-wrapper"><div class="cover">' + cols[i].innerHTML + '</div></div>';
            }
        }
        if (iconSec != '' || title != '' || desc != '') {
            topSec += '<div class="top-part">' + iconSec + title + desc + '</div>';
            //console.log("titleDesc="+titleDesc);
        }
        if (cta != '') {
            bottomSec += '<div class="bottom-part">' + cta + '</div>';
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