function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callbackFunc();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

ready(function () {
    const bigProductOwl = $(".product__big-carousel");
    const smallProductOwl = $(".product__small-carousel");
    const slidesPerPage = 4; //globaly define number of elements per page
    const syncedSecondary = true;

    bigProductOwl.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        // autoplay: true,
        autoplay: false,
        dots: false,
        margin: 20,
        loop: true,
        nav: false,
        responsiveRefreshRate: 200
    }).on('changed.owl.carousel', syncPosition);

    smallProductOwl
        .on('initialized.owl.carousel', function () {
            smallProductOwl.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: false,
            nav: false,
            smartSpeed: 200,
            margin: 10,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 3,
                    stagePadding: 20
                },
                600: {
                    items: 4,
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }

        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        smallProductOwl
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = smallProductOwl.find('.owl-item.active').length - 1;
        var start = smallProductOwl.find('.owl-item.active').first().index();
        var end = smallProductOwl.find('.owl-item.active').last().index();

        if (current > end) {
            smallProductOwl.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            smallProductOwl.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            bigProductOwl.data('owl.carousel').to(number, 100, true);
        }
    }

    smallProductOwl.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        bigProductOwl.data('owl.carousel').to(number, 300, true);
    });

    document.querySelectorAll('.product__big-carousel .product__item').forEach(element => {
        element.addEventListener("mousemove", (e) => {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            element.querySelector('.product__img').style.transformOrigin = `${x}px ${y}px`;
            element.querySelector('.product__img').style.transform = `scale(2)`;
        });
        element.addEventListener("mouseleave", () => {
            element.querySelector('.product__img').style.transformOrigin = "center center";
            element.querySelector('.product__img').style.transform = "scale(1)";
        });
    });


});