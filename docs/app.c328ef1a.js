// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/product.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  if (typeof document.querySelector('.product__big-carousel') != 'undefined' && document.querySelector('.product__big-carousel') != null) {
    var _bigProductOwl$owlCar;

    var bigProductOwl = $(".product__big-carousel");
    var smallProductOwl = $(".product__small-carousel");
    var slidesPerPage = 4; //globaly define number of elements per page

    var syncedSecondary = true;
    bigProductOwl.owlCarousel((_bigProductOwl$owlCar = {
      items: 1,
      slideSpeed: 2000,
      nav: true,
      // autoplay: true,
      autoplay: false,
      dots: false,
      margin: 20,
      loop: true
    }, _defineProperty(_bigProductOwl$owlCar, "nav", false), _defineProperty(_bigProductOwl$owlCar, "responsiveRefreshRate", 200), _bigProductOwl$owlCar)).on('changed.owl.carousel', syncPosition);
    smallProductOwl.on('initialized.owl.carousel', function () {
      smallProductOwl.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,
      smartSpeed: 200,
      margin: 10,
      slideSpeed: 500,
      slideBy: slidesPerPage,
      //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100,
      responsiveClass: true,
      responsive: {
        0: {
          items: 3,
          stagePadding: 20
        },
        600: {
          items: 4
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
      var current = Math.round(el.item.index - el.item.count / 2 - .5);

      if (current < 0) {
        current = count;
      }

      if (current > count) {
        current = 0;
      } //end block


      smallProductOwl.find(".owl-item").removeClass("current").eq(current).addClass("current");
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
    document.querySelectorAll('.product__big-carousel .product__item').forEach(function (element) {
      function getPosition(elm) {
        var xPos = 0,
            yPos = 0;

        while (elm) {
          xPos += elm.offsetLeft - elm.scrollLeft + elm.clientLeft;
          yPos += elm.offsetTop - elm.scrollTop + elm.clientTop;
          elm = elm.offsetParent;
        }

        return {
          x: xPos,
          y: yPos
        };
      }

      var distanceToTop = getPosition(element).y;
      var distanceToLeft = getPosition(element).x;
      distanceToLeftRect = document.querySelector('.product').getBoundingClientRect().left;
      element.addEventListener("mousemove", function (e) {
        var x = e.clientX - e.target.offsetLeft;
        var y = e.clientY - e.target.offsetTop;
        element.querySelector('.product__img').style.transformOrigin = "".concat(x - distanceToLeftRect, "px ").concat(y - distanceToTop, "px");
        element.querySelector('.product__img').style.transform = "scale(2)";
      });
      element.addEventListener("mouseleave", function () {
        element.querySelector('.product__img').style.transformOrigin = "center center";
        element.querySelector('.product__img').style.transform = "scale(1)";
      });
    }); // ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' +
  }
});
},{}],"app.js":[function(require,module,exports) {
"use strict";

require("./scripts/product.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import 'lazysizes';
// import a plugin
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
var header = document.querySelector('.header');
var navToggle = document.querySelector('.nav-toggle');
var headerNav = document.querySelector('.header__nav');
var navUpper = document.querySelector('.header__nav-upper');
var navFunctions = document.querySelector('.header__nav-upper-functions');
var headerContainerBottom = document.querySelector('.header .header__container-bottom');

var changeLogoColor = function changeLogoColor() {
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
} // Passive event listeners


jQuery.event.special.touchstart = {
  setup: function setup(_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault")
    });
  }
};
jQuery.event.special.touchmove = {
  setup: function setup(_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault")
    });
  }
};

if (typeof document.getElementsByClassName('popup')[0] != 'undefined' && document.getElementsByClassName('popup')[0] != null) {
  var popupToggle = function popupToggle() {
    document.getElementsByClassName('popup')[0].classList.toggle('show');
  };

  popupToggle();
  document.getElementsByClassName('popup__close')[0].addEventListener('click', function () {
    document.getElementsByClassName('popup')[0].classList.remove('show');
  });
}

ready(function () {
  document.querySelectorAll('.header__dropdown-close').forEach(function (element) {
    element.addEventListener('click', function () {
      $('.collapse').collapse('hide');
    });
    $(document).on('click', function (e) {
      if (!$(e.target).is(element)) {
        $('.collapse').collapse('hide');
      }
    });
  });

  var headerMoveLinks = function headerMoveLinks() {
    if (window.innerWidth <= 992) {
      if (typeof document.querySelector('.header .header__container-bottom') != 'undefined' && document.querySelector('.header .header__container-bottom') != null) {
        headerNav.append(headerContainerBottom);
        document.querySelectorAll('.header__nav-bottom-li').forEach(function (element) {
          element.addEventListener('mouseover', function () {
            changeLogoColor();
          });
          element.addEventListener('mouseout', function () {
            changeLogoColor();
          });
        });
      }

      if (typeof document.querySelector('.header__nav-upper-functions') != 'undefined' && document.querySelector('.header__nav-upper-functions') != null) {
        navUpper.prepend(navFunctions);
      }
    }
  };

  headerMoveLinks();

  function headerOnScroll() {
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;

      if (window.pageYOffset > 36) {
        header.classList.add('scrolled');

        if (prevScrollpos > currentScrollPos) {
          header.style.top = "0";
        } else {
          header.style.top = "-250px";
        }

        prevScrollpos = currentScrollPos;
      } else {
        header.classList.remove('scrolled');
      }
    };
  }

  var disableBodyScroll = function disableBodyScroll() {
    // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    // const body = document.body;
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%'; // body.style.top = `-${scrollY}`;
    // body.style.overflow = `hidden`;
    // body.style.height = `100vh`;
  };

  var enableBodyScroll = function enableBodyScroll() {
    document.documentElement.style.position = 'initial';
    document.documentElement.style.width = 'initial'; // const body = document.body;
    // const scrollY = body.style.top;
    // body.style.position = '';
    // body.style.top = '';
    // window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // body.style.overflow = `auto`;
    // body.style.overflowX = `hidden`;
    // body.style.height = `auto`;
    // document.getElementById('dialog').classList.remove('show');
  }; // window.addEventListener('scroll', () => {
  //     document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  // });


  window.addEventListener('resize', function (event) {
    if (window.matchMedia("(pointer: coarse)").matches == false) {
      headerMoveLinks();
      setInstagramHeight();
    }
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
  var allColors = document.querySelectorAll(".color-link");
  Array.from(allColors).forEach(function (element) {
    // element.style.transitionDelay = "0.01s";
    var dataColor = element.getAttribute('data-color');
    element.style.backgroundColor = dataColor;
  });
  headerOnScroll(); // headerMoveLinks();
  // window.scrollTo(0, parseInt(scrollY || '0') * -1);

  if (typeof document.querySelector('.mega-menu__new-products-carousel') != 'undefined' && document.querySelector('.mega-menu__new-products-carousel') != null) {
    $('.mega-menu__new-products-carousel').owlCarousel({
      loop: true,
      // autoplay: true,
      autoplay: false,
      // lazyLoad: true,
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

  if (typeof document.querySelector('.mega-menu__banner-carousel') != 'undefined' && document.querySelector('.mega-menu__banner-carousel') != null) {
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
      nav: false
    });
  } //////////


  if (typeof document.querySelector('.hero') != 'undefined' && document.querySelector('.hero') != null) {
    var _heroOwlTextSettings, _heroOwlImgs$owlCarou;

    var heroOwlText = $('.hero__text-carousel');
    var heroOwlTextSettings = (_heroOwlTextSettings = {
      items: 1,
      // singleItem: true,
      loop: true,
      // lazyLoad: true,
      // margin: 10,
      dots: false,
      // pagination: false,
      nav: false
    }, _defineProperty(_heroOwlTextSettings, "dots", false), _defineProperty(_heroOwlTextSettings, "margin", 50), _defineProperty(_heroOwlTextSettings, "touchDrag", false), _defineProperty(_heroOwlTextSettings, "mouseDrag", false), _heroOwlTextSettings);
    heroOwlText.owlCarousel(heroOwlTextSettings);
    var heroOwlImgs = $('.hero__img-carousel');
    heroOwlImgs.owlCarousel((_heroOwlImgs$owlCarou = {
      items: 1,
      loop: true,
      margin: 0,
      // lazyLoad: true,
      dots: false
    }, _defineProperty(_heroOwlImgs$owlCarou, "margin", 200), _defineProperty(_heroOwlImgs$owlCarou, "touchDrag", false), _defineProperty(_heroOwlImgs$owlCarou, "mouseDrag", false), _defineProperty(_heroOwlImgs$owlCarou, "animateOut", 'fadeOut'), _defineProperty(_heroOwlImgs$owlCarou, "animateIn", 'fadeIn'), _defineProperty(_heroOwlImgs$owlCarou, "pullDrag", false), _defineProperty(_heroOwlImgs$owlCarou, "responsiveClass", true), _defineProperty(_heroOwlImgs$owlCarou, "responsive", {
      0: {
        margin: 250
      },
      480: {
        margin: 50
      }
    }), _heroOwlImgs$owlCarou));
    var heroPrevBtn = document.querySelector('.hero__prev');
    var heroNextBtn = document.querySelector('.hero__next');
    heroPrevBtn.addEventListener('click', function () {
      heroOwlText.trigger('prev.owl.carousel');
      heroOwlImgs.trigger('prev.owl.carousel');
    });
    heroNextBtn.addEventListener('click', function () {
      heroOwlText.trigger('next.owl.carousel');
      heroOwlImgs.trigger('next.owl.carousel');
    });

    if (innerWidth <= 576) {
      document.querySelector('.hero .row').prepend(document.querySelector('.hero__right'));
    }
  }

  if (typeof document.querySelector('.products__carousel') != 'undefined' && document.querySelector('.products__carousel') != null) {
    var _$$owlCarousel;

    $('.products__carousel').owlCarousel((_$$owlCarousel = {
      loop: true,
      autoplay: true
    }, _defineProperty(_$$owlCarousel, "autoplay", false), _defineProperty(_$$owlCarousel, "lazyLoad", true), _defineProperty(_$$owlCarousel, "items", 1), _defineProperty(_$$owlCarousel, "lazyLoad", true), _defineProperty(_$$owlCarousel, "margin", 16), _defineProperty(_$$owlCarousel, "autoplayHoverPause", true), _defineProperty(_$$owlCarousel, "dots", false), _defineProperty(_$$owlCarousel, "nav", false), _defineProperty(_$$owlCarousel, "responsiveClass", true), _defineProperty(_$$owlCarousel, "responsive", {
      0: {
        items: 1,
        stagePadding: 30,
        margin: 0
      },
      480: {
        stagePadding: 80
      },
      576: {
        items: 2,
        stagePadding: 0
      },
      900: {
        items: 3,
        margin: 16
      },
      1200: {
        items: 4
      },
      1700: {
        items: 5
      }
    }), _$$owlCarousel)); //owl things need to be made on jquery objects
  }

  if (typeof document.querySelector('.owl-prev') != 'undefined' && document.querySelector('.owl-prev') != null) {
    $('.owl-prev').each(function () {
      $(this).on('click', function () {
        $(this).parent().parent().children('.owl-carousel').trigger('prev.owl.carousel');
      });
    });
  }

  if (typeof document.querySelector('.owl-next') != 'undefined' && document.querySelector('.owl-next') != null) {
    $('.owl-next').each(function () {
      $(this).on('click', function () {
        $(this).parent().parent().children('.owl-carousel').trigger('next.owl.carousel');
      });
    });
  }

  document.querySelectorAll('.toggle-favourite').forEach(function (element) {
    element.addEventListener('click', function () {
      element.classList.toggle('added');
    });
  });

  if (typeof document.querySelector('.opinions__carousel') != 'undefined' && document.querySelector('.opinions__carousel') != null) {
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
          items: 3
        },
        1200: {
          items: 4
        },
        1700: {
          items: 5
        }
      }
    });
    var numberOfStars;
    var star = document.querySelector('.opinions__stars').innerHTML;
    document.querySelectorAll('.opinions__stars').forEach(function (element) {
      numberOfStars = element.getAttribute('data-stars');

      for (var i = 1; i < numberOfStars; i++) {
        element.innerHTML += star;
      }

      ;
    });
  }

  if (typeof document.querySelector('.news__carousel') != 'undefined' && document.querySelector('.news__carousel') != null) {
    $('.news__carousel, .instagram__carousel').owlCarousel({
      loop: true,
      autoplay: true,
      lazyLoad: true,
      items: 1,
      margin: 32,
      autoplayHoverPause: true,
      dots: false,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          dots: false,
          stagePadding: 80
        },
        480: {
          items: 2,
          stagePadding: 0
        },
        600: {
          items: 3
        },
        1700: {
          items: 4
        }
      }
    });
  }

  var setInstagramHeight = function setInstagramHeight() {
    if (typeof document.querySelector('.instagram__carousel') != 'undefined' && document.querySelector('.instagram__carousel') != null && typeof document.querySelector('.delivery') != 'undefined' && document.querySelector('.delivery') != null) {
      if (innerWidth >= 992) {
        var deliveryHeight = document.querySelector('.delivery').clientHeight;
        document.querySelectorAll('.instagram__img').forEach(function (element) {
          element.style.height = "calc(" + document.querySelector('.delivery').clientHeight + "px - 1.5rem - 4px)";
        });
      }
    }
  };

  setInstagramHeight();

  if (typeof document.querySelector('.partners__carousel') != 'undefined' && document.querySelector('.partners__carousel') != null) {
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
        480: {
          items: 2
        },
        600: {
          items: 3
        },
        992: {
          items: 2
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

  if (typeof document.querySelector('.filters') != 'undefined' && document.querySelector('.filters') != null) {
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
      document.querySelectorAll('.products__buttons').forEach(function (element) {
        element.parentElement.querySelector(".products__content").appendChild(element);
      });
    }
  }

  if (typeof document.querySelector('.sticky-selector') != 'undefined' && document.querySelector('.sticky-selector') != null) {
    var stickybit = stickybits(".sticky-selector", {
      useStickyClasses: true
    });
  }

  document.querySelectorAll('.owl-carousel').forEach(function (element) {
    element.querySelectorAll('.owl-dot').forEach(function (owlDot, index) {
      owlDot.setAttribute('aria-label', 'dot' + index + 1);
    });
  });
  document.querySelectorAll('.owl-arrow-container').forEach(function (element) {
    element.querySelectorAll('.owl-prev').forEach(function (owlPrev, index) {
      owlPrev.setAttribute('aria-label', 'owl-prev-' + index + 1);
    });
  });
  document.querySelectorAll('.owl-arrow-container').forEach(function (element) {
    element.querySelectorAll('.owl-next').forEach(function (owlNext, index) {
      owlNext.setAttribute('aria-label', 'owl-next-' + index + 1);
    });
  });
  document.querySelectorAll('.products__item').forEach(function (element) {
    element.querySelectorAll('.toggle-favourite').forEach(function (toggleFavourite) {
      toggleFavourite.setAttribute('aria-label', 'toggle-favourite');
    });
  });
});
},{"./scripts/product.js":"scripts/product.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62576" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=app.c328ef1a.js.map