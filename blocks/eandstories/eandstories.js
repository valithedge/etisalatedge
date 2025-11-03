export default function decorate(block) {
  // Improved decorator for eandstories: build DOM nodes (safer than string concat),
  // preserve rich HTML for body fields, normalize the image node, and add lazy loading.
  console.log('--- block dataset ---' + JSON.stringify(block.dataset.searchCategoryResultLbl));
  const rows = Array.from(block.children || []);
  if (!rows.length) return;

  // Create the outer container structure used by the site markup
  const root = document.createElement('div');
  root.className = 'cmp-articleSearch-search';
  // expose total items and a stable id used by consumers
  root.setAttribute('data-noof-items', String(rows.length || 0));
  root.setAttribute('id', 'articlelist-3082e3df30');

  const wrapper = document.createElement('div');
  wrapper.className = 'tile-boxes-section-wrapper tile-boxes-large filtering';
  root.appendChild(wrapper);

  // First container: Title and search form (only when we have items)
  if (rows.length > 0) {
    const headerContainer = document.createElement('div');
    headerContainer.className = 'container';
    wrapper.appendChild(headerContainer);

    const headerRow = document.createElement('div');
    headerRow.className = 'row';
    headerContainer.appendChild(headerRow);

    // Title column
    const titleCol = document.createElement('div');
    titleCol.className = 'col-xs-12 col-md-9';
    const titleElem = document.createElement(block.dataset.titleType || 'h2');
    if (block.dataset.articleTitle) {
      titleElem.textContent = block.dataset.articleTitle;
    }
    titleCol.appendChild(titleElem);
    headerRow.appendChild(titleCol);

    // Search form column (only when search is enabled)
    if (block.dataset.searchDisabled !== 'true') {
      const searchCol = document.createElement('div');
      searchCol.className = 'col-xs-12 col-md-3';

      const actionWrapper = document.createElement('div');
      actionWrapper.className = 'main-text-action-wrapper global-map-country-filter';

      const form = document.createElement('form');
      form.className = 'form wst-form';
      form.id = 'eventRegisteration';

      const formRow = document.createElement('div');
      formRow.className = 'row';

      const formGroup = document.createElement('div');
      formGroup.className = 'form-group floating-label-select floating-label-selected input-field col-xs-12';

      const select = document.createElement('select');
      select.className = 'form-control';

      // Add option if we have a category result label
      if (block.dataset.searchCategoryResultLbl) {
        const opt = document.createElement('option');
        opt.value = 'news-all';
        opt.textContent = `${block.dataset.searchCategoryResultLbl} 1`;
        select.appendChild(opt);
      }

      const label = document.createElement('label');
      label.className = 'floating-label';
      if (block.dataset.searchCategoryLbl) {
        label.textContent = `${block.dataset.searchCategoryLbl}*`;
      }

      formGroup.appendChild(select);
      formGroup.appendChild(label);
      formRow.appendChild(formGroup);
      form.appendChild(formRow);
      actionWrapper.appendChild(form);
      searchCol.appendChild(actionWrapper);
      headerRow.appendChild(searchCol);
    }
  }

  // Second container: Tiles section
  const container = document.createElement('div');
  container.className = 'container';
  wrapper.appendChild(container);

  const rowWrap = document.createElement('div');
  rowWrap.className = 'row';
  container.appendChild(rowWrap);

  const tileBoxesSection = document.createElement('div');
  tileBoxesSection.className = 'tile-boxes-section';
  rowWrap.appendChild(tileBoxesSection);

  const mobWrap = document.createElement('div');
  mobWrap.className = 'tileBoxMobCarWrap';
  tileBoxesSection.appendChild(mobWrap);

  const carousel = document.createElement('div');
  carousel.className = 'tileboxCarousal';
  mobWrap.appendChild(carousel);

  const filterBlock = document.createElement('div');
  filterBlock.className = 'block filter-news-results';
  carousel.appendChild(filterBlock);

  // Build each tile as DOM elements
  rows.forEach((r) => {
    const cols = Array.from(r.children || []);

    const categoryHTML = cols[0] ? cols[0].textContent.trim() : '';
    const titleHTML = cols[1] ? cols[1].textContent.trim() : '';
    const dateHTML = cols[2] ? cols[2].textContent.trim() : '';
    const descHTML = cols[3] ? cols[3].textContent.trim() : '';

    // Learn more link
    let learnHref = '#';
    let learnText = 'Learn more';
    if (cols[4]) {
      const a = cols[4].querySelector('a');
      if (a) {
        learnHref = a.getAttribute('href') || '#';
        learnText = a.textContent.trim() || learnText;
      } else if (cols[4].textContent.trim()) {
        learnText = cols[4].textContent.trim();
      }
    }

    // Image: prefer a picture or img node, clone it and normalize attributes
    let imageNode = null;
    if (cols[5]) {
      // Try to find picture or img inside the column
      const pic = cols[5].querySelector('picture');
      const img = cols[5].querySelector('img');
      if (pic) {
        imageNode = pic.cloneNode(true);
        normalizeImageAttrs(imageNode);
      } else if (img) {
        imageNode = img.cloneNode(true);
        normalizeImageAttrs(imageNode);
      } else if (cols[5].innerHTML.trim()) {
        // Fallback: parse innerHTML and take first element
        const tmp = document.createElement('div');
        tmp.innerHTML = cols[5].innerHTML.trim();
        if (tmp.firstElementChild) {
          imageNode = tmp.firstElementChild.cloneNode(true);
          normalizeImageAttrs(imageNode);
        }
      }
    }

    // Tile root
    const tileWrap = document.createElement('div');
    tileWrap.className = 'loading-tile col-xs-12 col-md-4 f-news-room temp';
    tileWrap.setAttribute('data-cat', escapeHtml(stripHtml(categoryHTML)));

    const tileBox = document.createElement('div');
    tileBox.className = 'tile-box-tile';
    tileWrap.appendChild(tileBox);

    // Image cover
    const imgCover = document.createElement('div');
    imgCover.className = 'img-cover';
    if (imageNode) imgCover.appendChild(imageNode);
    tileBox.appendChild(imgCover);

    // Body
    const body = document.createElement('div');
    body.className = 'tile-box-body';

    const h5 = document.createElement('h5');
    h5.className = 'annoucements';
    h5.innerHTML = categoryHTML;
    body.appendChild(h5);

    const h2 = document.createElement('h2');
    h2.innerHTML = titleHTML;
    body.appendChild(h2);

    if (dateHTML) {
      const span = document.createElement('span');
      span.className = 'annoucement-date';
      span.innerHTML = dateHTML;
      body.appendChild(span);
    }

    if (descHTML) {
      const desc = document.createElement('div');
      desc.className = 'paragraph-styling ul-list-cms';
      desc.innerHTML = descHTML;
      body.appendChild(desc);
    }

    tileBox.appendChild(body);

    // CTA
    const cta = document.createElement('a');
    cta.className = 'btn-text btn-green learn-more';
    cta.setAttribute('href', learnHref);
    cta.textContent = learnText;
    tileBox.appendChild(cta);

    filterBlock.appendChild(tileWrap);
  });

  // Static load more button (renders only when there are more than 6 items)
  if (rows.length > 6) {
    const loadMoreWrap = document.createElement('div');
    loadMoreWrap.className = 'col-xs-12 col-sm-4 col-sm-offset-4';
    const loadMore = document.createElement('a');
    loadMore.className = 'btn news-loadmore--btn btn-default ripple-effect';
    loadMore.setAttribute('href', '#');
    loadMore.setAttribute('id', 'loadMore');
    loadMore.textContent = 'loadMore';
    loadMoreWrap.appendChild(loadMore);
    rowWrap.appendChild(loadMoreWrap);
  }

  // Replace block content with our constructed DOM
  block.textContent = '';
  block.appendChild(root);

  // Helpers
  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeImageAttrs(node) {
    if (!node) return;
    // If it's a picture, ensure inner img has loading/decoding attributes
    if (node.tagName && node.tagName.toLowerCase() === 'picture') {
      const innerImg = node.querySelector('img');
      if (innerImg) {
        innerImg.setAttribute('loading', innerImg.getAttribute('loading') || 'lazy');
        innerImg.setAttribute('decoding', innerImg.getAttribute('decoding') || 'async');
      }
      return;
    }
    // If it's an img element
    if (node.tagName && node.tagName.toLowerCase() === 'img') {
      node.setAttribute('loading', node.getAttribute('loading') || 'lazy');
      node.setAttribute('decoding', node.getAttribute('decoding') || 'async');
      return;
    }
    // If it's a wrapper with an img inside, set attributes on the first img found
    const inner = node.querySelector && node.querySelector('img');
    if (inner) {
      inner.setAttribute('loading', inner.getAttribute('loading') || 'lazy');
      inner.setAttribute('decoding', inner.getAttribute('decoding') || 'async');
    }
  }
}
