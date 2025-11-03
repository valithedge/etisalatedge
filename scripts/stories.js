// register the event handlers
// stories-overview 
$(document).ready(function () {
console.log("stories overview js loaded");
    var allCategories = $('.filter-news-results .f-news-room').filter('[data-cat="news-all"]').prevObject;
    // extract and create a new array of all categories
    function createArrayOfCategories(catArr) {
        var categoryArr = [];
        for (var i = 0; i < catArr.length; i++) {
            categoryArr.push(catArr[i].attributes['data-cat'].value);
        }
        return categoryArr;
    }

    var categoriesArr = createArrayOfCategories(allCategories);

    // count each category and return an object
    var countEachCategory = categoriesArr.reduce(function (allNames, name) {
        if (name in allNames) {
            allNames[name]++;
        } else {
            allNames[name] = 1;
        }
        return allNames;
    }, {});

    // take array of categories and create an object format as per select2 dropdown
    function categoryObj(createCategoryObj) {
        var catTemp = [];
        var index = 0;
        for (var prop in createCategoryObj) {
            catTemp.push({
                id: prop,
                value: prop,
                text: prop.replace('-', ' ') + ' (' + createCategoryObj[prop] + ')'
            });
            index++;
        }
        return catTemp;
    }
    var categoryObjResult = categoryObj(countEachCategory);

    if ($('html').attr('lang') === 'ar') {
        if ($('select.form-control option').length) {
            $('select.form-control option')[0].text = 'جميع النتائج' + ' (' + categoriesArr.length + ')';
        }
    } else {
        if ($('select.form-control option').length) {
            $('select.form-control option')[0].text = 'All Results' + ' (' + categoriesArr.length + ')';
        }
    }
    if ($('select.form-control').length) {
        $('select.form-control').select2({
            data: categoryObjResult
        });
    }

    /*Load more content with jQuery */
    (function () {
        var x = 6;
        $('.loading-tile').slice(0, 6).addClass('active');
        $('.loading-tile').addClass('temp');
        if ($('.tile-boxes-section-wrapper').find('.temp').length <= 6) {
            $("#loadMore").css('display', 'none');
        }
        $("#loadMore").on('click', function (e) {
            e.preventDefault();
            var elements = $(this).closest('.tile-boxes-section-wrapper').find('.temp');
            //$(elements).slice(0, 6).addClass('active');
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1200);
            if (x + 6 <= elements.length) {
                x += 6;
                $(elements).slice(0, x).addClass('active');
            } else {
                $(elements).slice(0, elements.length).addClass('active');
                x = 6;
                $("#loadMore").css('display', 'none');
            }

        });
    })();

    /*Filters */
    var filterActive;
    function filterCategory(category) {
        if (filterActive != category) {
            // reset results list
            $('.filter-news-results .f-news-room').removeClass('active');
            $('.filter-news-results .f-news-room').removeClass('temp');
            // elements to be filtered
            var tempItems = $('.filter-news-results .f-news-room').filter('[data-cat="' + category + '"]').addClass('temp');
            if (tempItems.length > 6) {
                $("#loadMore").css('display', 'block');
            } else {
                $("#loadMore").css('display', 'none');
            }
            $('.filter-news-results .f-news-room').filter('[data-cat="' + category + '"]').slice(0, 6).addClass('active');
            // reset active filter
            filterActive = category;
        }
    }

    $('.filtering select').change(function () {
        if ($(this).val() == 'news-all') {
            $('.filter-news-results .f-news-room').removeClass('active');
            var allItems = $('.filter-news-results .f-news-room').filter('[data-cat="news-all"]').prevObject.addClass('temp');
            if (allItems.length > 6) {
                $("#loadMore").css('display', 'block');
            } else {
                $("#loadMore").css('display', 'none');
            }
            $('.filter-news-results .f-news-room').filter('[data-cat="news-all"]').prevObject.slice(0, 6).addClass('active');

            filterActive = 'news-all';
        } else {
            filterCategory($(this).val());
        }
    });

});
