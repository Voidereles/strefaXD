const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');

const headerNav = document.querySelector('.header__nav');
const navUpper = document.querySelector('.header__nav-upper');
const navFunctions = document.querySelector('.header__nav-upper-functions');
const headerContainerBottom = document.querySelector('.header .header__container-bottom');

const changeLogoColor = () => {
    document.querySelector('.header__logo-container').classList.toggle('opacity0');
    navToggle.classList.toggle('white');

};


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

    const headerMoveLinks = () => {
        if (window.innerWidth <= 992) {
            headerNav.append(headerContainerBottom);
            navUpper.prepend(navFunctions);
            document.querySelectorAll('.header__nav-bottom-li').forEach(element => {
                element.addEventListener('mouseover', function () {
                    changeLogoColor();
                });
                element.addEventListener('mouseout', function () {
                    changeLogoColor();
                });
            });
        }

    }
    headerMoveLinks();


    function headerOnScroll() {
        let prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            let currentScrollPos = window.pageYOffset;
            if (window.pageYOffset > 36) {
                header.classList.add('scrolled');
                if (prevScrollpos > currentScrollPos) {
                    header.style.top = "0";
                } else {
                    header.style.top = "-161px";
                }
                prevScrollpos = currentScrollPos;
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    const disableBodyScroll = () => {
        // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        // const body = document.body;
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.width = '100%';

        // body.style.top = `-${scrollY}`;
        // body.style.overflow = `hidden`;
        // body.style.height = `100vh`;

    };
    const enableBodyScroll = () => {
        document.documentElement.style.position = 'initial';
        document.documentElement.style.width = 'initial';
        // const body = document.body;
        // const scrollY = body.style.top;
        // body.style.position = '';
        // body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);
        // body.style.overflow = `auto`;
        // body.style.overflowX = `hidden`;
        // body.style.height = `auto`;
        // document.getElementById('dialog').classList.remove('show');
    };
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });

    document.querySelectorAll('.header__dropdown-close').forEach(element => {
        element.addEventListener('click', function () {
            $('.collapse').collapse('hide');
        });
    });

    window.addEventListener('resize', function (event) {
        headerMoveLinks();
    });



    navToggle.addEventListener('click', function () {
        headerNav.classList.toggle('header__nav--entered');
        navToggle.classList.toggle('nav-toggle--entered');
        if (navToggle.classList.contains('nav-toggle--entered')) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    });



    const allColors = document.querySelectorAll(".color-link");


    Array.from(allColors).forEach(element => {
        // element.style.transitionDelay = "0.01s";
        dataColor = element.getAttribute('data-color');
        element.style.backgroundColor = dataColor;

    });



    headerOnScroll();
    headerMoveLinks();
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);

    document.querySelectorAll('.owl-carousel').forEach(element => {
        element.querySelectorAll('.owl-dot').forEach(function (owlDot, index) {
            owlDot.setAttribute('aria-label', index + 1)
        });
    });


    if (typeof (document.querySelector('.mega-menu__new-products-carousel')) != 'undefined' && document.querySelector('.mega-menu__new-products-carousel') != null) {
        $('.mega-menu__new-products-carousel').owlCarousel({
            loop: true,
            // autoplay: true,
            autoplay: false,
            lazyLoad: true,
            // lazyLoad: true,
            // items: 3,
            margin: 10,
            stagePadding: 0,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                768: {
                    items: 2,
                    margin: 20
                }
            }
        });
    }

    if (typeof (document.querySelector('.mega-menu__banner-carousel')) != 'undefined' && document.querySelector('.mega-menu__banner-carousel') != null) {
        $('.mega-menu__banner-carousel').owlCarousel({
            loop: true,
            // autoplay: true,
            autoplay: false,
            lazyLoad: true,
            // lazyLoad: true,
            items: 1,
            margin: 40,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
        })
    }
    //////////


    if (typeof (document.querySelector('.hero')) != 'undefined' && document.querySelector('.hero') != null) {
        const heroOwlText = $('.hero__text-carousel')
        const heroOwlTextSettings = {
            items: 1,
            // singleItem: true,
            loop: true,
            lazyLoad: true,
            // margin: 10,
            dots: false,
            // pagination: false,
            nav: false,
            dots: false,
            margin: 50,
            // autoplay: true
            touchDrag: false,
            // slideBy: 2,
            mouseDrag: false
        };
        heroOwlText.owlCarousel(heroOwlTextSettings);

        const heroOwlImgs = $('.hero__img-carousel');
        heroOwlImgs.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            lazyLoad: true,
            dots: false,
            // autoplay: true,
            margin: 200,
            touchDrag: false,
            mouseDrag: false,
            responsiveClass: true,
            responsive: {
                0: {
                    margin: 250
                },
                480: {
                    margin: 50
                }
            }
        });



        const heroPrevBtn = document.querySelector('.hero__prev');
        const heroNextBtn = document.querySelector('.hero__next');

        heroPrevBtn.addEventListener('click', function () {
            heroOwlText.trigger('prev.owl.carousel');
            heroOwlImgs.trigger('prev.owl.carousel');
        });

        heroNextBtn.addEventListener('click', function () {
            heroOwlText.trigger('next.owl.carousel');
            heroOwlImgs.trigger('next.owl.carousel');
        });

    }



    if (typeof (document.querySelector('.products__carousel')) != 'undefined' && document.querySelector('.products__carousel') != null) {


        $('.products__carousel').owlCarousel({
            loop: true,
            autoplay: true,
            autoplay: false,
            // lazyLoad: true,
            items: 1,
            lazyLoad: true,
            margin: 16,
            autoplayHoverPause: true,
            dots: false,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 30,
                    margin: 0
                },
                600: {
                    items: 2,
                    margin: 16,
                    stagePadding: 0
                },
                900: {
                    items: 3,
                },
                1200: {
                    items: 4
                },
                1700: {
                    items: 5
                }
            }
        })

        //owl things need to be made on jquery objects
        $('.owl-prev').each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().children('.owl-carousel').trigger('prev.owl.carousel');
            });
        });

        $('.owl-next').each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().children('.owl-carousel').trigger('next.owl.carousel');
            });
        });
    }





    document.querySelectorAll('.toggle-favourite').forEach(element => {
        element.addEventListener('click', function () {
            element.classList.toggle('added');
        });
    });



    if (typeof (document.querySelector('.opinions__carousel')) != 'undefined' && document.querySelector('.opinions__carousel') != null) {
        $('.opinions__carousel').owlCarousel({
            loop: true,
            autoplay: true,
            lazyLoad: true,
            items: 1,
            margin: 32,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                600: {
                    items: 2
                },
                900: {
                    items: 3,
                },
                1200: {
                    items: 4
                },
                1700: {
                    items: 5
                }
            }
        });

        let numberOfStars;
        const star = document.querySelector('.opinions__stars').innerHTML;
        document.querySelectorAll('.opinions__stars').forEach(element => {
            numberOfStars = element.getAttribute('data-stars');
            for (i = 1; i < numberOfStars; i++) {
                element.innerHTML += star;
            };
        });
    }


    if (typeof (document.querySelector('.news__carousel')) != 'undefined' && document.querySelector('.news__carousel') != null) {
        $('.news__carousel, .instagram__carousel').owlCarousel({
            loop: true,
            autoplay: true,
            lazyLoad: true,
            items: 1,
            margin: 32,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                600: {
                    items: 2,
                },
                1200: {
                    items: 3
                },
                1700: {
                    items: 4
                }
            }
        });
    }



    if (typeof (document.querySelector('.partners__carousel')) != 'undefined' && document.querySelector('.partners__carousel') != null) {
        $('.partners__carousel').owlCarousel({
            loop: true,
            autoplay: true,
            lazyLoad: true,
            items: 1,
            margin: 32,
            autoplayHoverPause: true,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },

                600: {
                    items: 3
                },
                992: {
                    items: 2,
                },
                1200: {
                    items: 3
                }
            }
        });
    }


    $('.footer__carousel').owlCarousel({
        loop: true,
        autoplay: true,
        lazyLoad: true,
        items: 1,
        margin: 32,
        autoplayHoverPause: true,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                dots: true
            },

            600: {
                items: 3
            }
        }
    });


    if (typeof (document.querySelector('.filters')) != 'undefined' && document.querySelector('.filters') != null) {
        $('.select-color').select2({
            closeOnSelect: false,
            // allowHtml: true,
            // allowClear: true,
            placeholder: "Wybierz kolor",
            dropdownCssClass: 'filters__select-container'
        });

        $('.select-gender').select2({
            closeOnSelect: false,
            // allowHtml: true,
            // allowClear: true,
            placeholder: "Wybierz płeć",
            dropdownCssClass: 'filters__select-container'
        });

        $('.select-material').select2({
            closeOnSelect: false,
            // allowHtml: true,
            // allowClear: true,
            placeholder: "Materiał",
            dropdownCssClass: 'filters__select-container'
        });

        $('.select-available').select2({
            closeOnSelect: false,
            // allowHtml: true,
            // allowClear: true,
            placeholder: "Tylko dostępne",
            dropdownCssClass: 'filters__select-container'
        });

        if (window.innerWidth < 600) {
            document.querySelectorAll('.products__buttons').forEach(element => {
                element.parentElement.querySelector(".products__content").appendChild(element);
            });
        }

    }



    if (typeof (document.querySelector('.sticky-selector')) != 'undefined' && document.querySelector('.sticky-selector') != null) {
        var stickybit = stickybits(".sticky-selector", {
            useStickyClasses: true
        });
    }



});