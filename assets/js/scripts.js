var scroller;
/*=====================================*
 * WINDOW EVENTS
/*=====================================*/
if ($('.home-hero').length) {
    setTimeout(onWindowLoad, 5000);
}
$(window)
    .on('load', onWindowLoad)
    .on('scroll', onWindowScroll)
    .on('resize', function () {
    })
/*=====================================*
* Actions
/*=====================================*/
$(document)
    .ready(onDocumentReady)
    .on('click', '.backtop', function () {
        $('html, body').animate({ scrollTop: 0 });
    })
    .on('click', 'header .menu-btn', function () {
        $(this).toggleClass('open');
        $('header').toggleClass('menu-opend');
    })

/*=====================================*
 * CURSOR 
/*=====================================*/
$(document)
    .on('mousemove', function (e) {
        setTimeout(() => {
            $('.cursor').css({ top: e.clientY + 20, left: e.clientX + 20 });
        }, 200);
    })

/*=====================================*
 * FUNCTIONS
/*=====================================*/
function onDocumentReady() {
    if (location.href.includes('127.0.0.1')) {
        $("header").load("partial/header.html", activateMenuLink);
        $("footer").load("partial/footer.html");
    }
    initScroll();
    slideShow();
}
function activateMenuLink() {
    var currentPath = window.location.pathname.replace('/', '');
    $('.navs-menu a').each(function () {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('active');
        }
    });
}
function initScroll() {
    scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        // lerp: 0.5,
        smooth: true,
        mobile: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });
    scroller.update();
    scroller.on('scroll', (event) => {
        // event.scroller.y
        headerTheme();
    });
}

function onWindowLoad() {
    if ($('body').hasClass('loaded')) return;
    $('body').addClass('loaded');
    $('#loading').fadeOut(function () {
        $('body').addClass('ready');
    });
    // Pages
    global();
    scroller.update();
}

function onWindowScroll() {
    if ($(window).scrollTop() > $(window).height() / 2) {
        $(".backtop").addClass('show');
    } else {
        $(".backtop").removeClass('show');
    }
    headerTheme();
}

function global() {
    headerTheme();
    startMarquee();
}
/*=====================================*/
function headerTheme() {
    $('header').removeClass('dark');
    let scroll = $(window).scrollTop() + ($('header').height() / 2);
    $('.dark-header').each((i, element) => {
        if (
            $(element).isInViewport() &&
            scroll >= $(element).offset().top &&
            (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            $('header').addClass('dark');
        }
    });
    $('.dark-bg').each((i, element) => {
        if (
            $(element).isInViewport() &&
            scroll >= $(element).offset().top &&
            (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            $('header').removeClass('dark');
        }
    });
}
function slideShow() {
    var activeIndx = 0,
        images = $('.slideshow img'),
        zIndx = 1,
        totalImages = images.length;

    function showNextImage() {
        if ($('.slideshow img.active').length == 3) {
            images.removeClass('active');
        }
        images.eq(activeIndx).addClass('active').css('z-index', zIndx);
        activeIndx = (activeIndx + 1) % totalImages;
        zIndx++;
        if (zIndx == 10) { zIndx = 1; }
        const randomTime = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        setTimeout(showNextImage, randomTime);
    }
    showNextImage();
}
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function startMarquee() {
    var $marquee = $('.marquee');
    var $contentWrap = $('.marquee-content');
    var $content = $('.marquee-content div');
    $content.clone().appendTo($contentWrap);
    $content.clone().appendTo($contentWrap);
    var totalWidth = $contentWrap.outerWidth();
    function animateMarquee() {
        $marquee.find('.marquee-content').first().animate(
            { left: -totalWidth },
            15000,
            'linear',
            function () {
                $(this).css('left', totalWidth);
                animateMarquee();
            }
        );
    }
    animateMarquee();
    $marquee.hover(
        function () {
            $marquee.find('.marquee-content').stop();
        },
        function () {
            animateMarquee();
        }
    );
}