const header = document.querySelector('.header');
const columnToggle = document.querySelector('.column-toggle');
const navToggle = document.querySelector('.nav-toggle');

const headerNav = document.querySelector('.header__nav');
const navUpper = document.querySelector('.header__nav-upper');
const navSocialIcons = document.querySelector('.header__nav-right');
const headerContainerBottom = document.querySelector('.header .header__container-bottom');



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

    // const headerMoveLinks = () => {
    //     if (window.innerWidth < 1200) {
    //         headerNav.append(navSocialIcons);
    //         navSocialIcons.style.display = "flex";
    //     } else {
    //         headerContainerBottom.append(navSocialIcons);
    //     }
    // }
    // headerMoveLinks();

    $(document).click(function (e) {
        if (!$(e.target).is('.panel-body')) {
            $('.collapse').collapse('hide');
        }
    });

    function headerOnScroll() {
        let prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            let currentScrollPos = window.pageYOffset;
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
                if (prevScrollpos > currentScrollPos) {
                    header.style.top = "0";
                    columnToggle.classList.remove('header-hidden')
                } else {
                    header.style.top = "-151px";
                    columnToggle.classList.add('header-hidden')
                }
                prevScrollpos = currentScrollPos;
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    const disableBodyScroll = () => {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
        body.style.overflow = `hidden`;
        // body.style.height = `100vh`;
    };
    const enableBodyScroll = () => {
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        body.style.overflow = `auto`;
        body.style.overflowX = `hidden`;
        // body.style.height = `auto`;
        // document.getElementById('dialog').classList.remove('show');
    };
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });





    window.addEventListener('resize', function (event) {
        headerMoveLinks();
    });

    // document.querySelectorAll('.owl-item').forEach(element => {
    //     element.addEventListener('click', function () {
    //         header.style.top = "0";
    //     });
    // });

    // const navLeft = document.querySelector('.header__nav-left');
    // if (window.innerWidth < 768) {
    //     document.querySelector('.header__search-input').addEventListener('focus', function () {
    //         navLeft.style.display = 'none';
    //     });
    //     document.querySelector('.header__search-input').addEventListener('focusout', function () {
    //         navLeft.style.display = 'block';
    //     });

    // }

    navToggle.addEventListener('click', function () {
        headerNav.classList.toggle('header__nav--entered');
        navToggle.classList.toggle('nav-toggle--entered');
        if (navToggle.classList.contains('nav-toggle--entered') || columnToggle.classList.contains('open')) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    });

    const rightColumn = document.querySelector('.right-column');
    columnToggle.addEventListener('click', function () {
        rightColumn.classList.toggle('open');
        columnToggle.classList.toggle('open');
        if (navToggle.classList.contains('nav-toggle--entered') || columnToggle.classList.contains('open')) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    });


    headerOnScroll();
    headerMoveLinks();
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    // document.querySelectorAll('.owl-carousel').forEach(element => {
    //     element.querySelectorAll('.owl-dot').forEach(function (owlDot, index) {
    //         owlDot.setAttribute('aria-label', index + 1)
    //     });
    // });




































































    // owlCarousels
    // const heroBigContainer = document.querySelector('.hero__big-container');

    // function centerGoMid(event) {
    //     if (innerWidth > 1200) {
    //         document.querySelectorAll('.owl-item').forEach(element => {
    //             if (element.classList.contains('center')) {
    //                 let centerCopy = element.innerHTML;
    //                 heroBigContainer.innerHTML = centerCopy;
    //             }
    //         });
    //     }

    // }

    // if (typeof (document.querySelector('.hero')) != 'undefined' && document.querySelector('.hero') != null) {
    //     $('.hero__carousel').owlCarousel({
    //         loop: true,
    //         autoplay: true,
    //         // autoplay: false,
    //         // lazyLoad: true,
    //         margin: 24,
    //         stagePadding: 0,
    //         center: true,
    //         nav: true,
    //         autoplayHoverPause: true,
    //         dots: false,
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //                 margin: 0,
    //                 dots: true,
    //                 nav: false
    //             },
    //             //zmiana
    //             1200: {
    //                 items: 3,
    //                 nav: true,
    //                 onInitialized: centerGoMid,
    //                 onTranslated: centerGoMid,
    //             }
    //         }
    //     });
    // };


    // if (typeof (document.querySelector('.standard-owl')) != 'undefined' && document.querySelector('.standard-owl') != null) {
    //     $('.standard-owl').owlCarousel({
    //         loop: true,
    //         // autoplay: true,
    //         autoplay: false,
    //         // lazyLoad: true,
    //         // items: 3,
    //         margin: 24,
    //         stagePadding: 0,
    //         autoplayHoverPause: true,
    //         dots: false,
    //         nav: true,
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //                 margin: 10,
    //                 stagePadding: 40,
    //                 dots: true
    //             },
    //             600: {
    //                 items: 2,
    //                 margin: 20
    //             },
    //             1200: {
    //                 items: 3
    //             },
    //             1610: {
    //                 items: 4
    //             }
    //         }
    //     })
    // }
    //////////













    // if (typeof (document.querySelector('.all-articles__content')) != 'undefined' && document.querySelector('.all-articles__content') != null) {
    //     if (window.innerWidth < 480) {
    //         document.querySelector('.pagination-container').prepend(document.querySelector('.pagination'));
    //     }
    // }


});