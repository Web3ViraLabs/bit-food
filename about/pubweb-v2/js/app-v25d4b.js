/*===========================
   For Background Videos   
===========================*/

// adding .is-playing class when the video starts
function initalizeVideoElements() {
  var fade_in_videos = document.querySelectorAll(".fade-in-video");
  if (fade_in_videos.length) {
    for (i = 0; i < fade_in_videos.length; i++) {
      fade_in_videos[i].addEventListener("playing", function() {
        this.classList.add("is-playing");
      });
    }
  }
}

/*===========================
   For Background Videos   
===========================*/
function carouselinit(carouselClass, carouselNavID) {
  if (jQuery(carouselClass).length) {
    var owl = jQuery(carouselClass).owlCarousel({
      items: 1,
      // autoplay: true,
      // autoplayTimeout: 5000,
      dotsContainer: carouselNavID,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      touchDrag: false,
      mouseDrag: false,
      rtl: document.querySelector("html").getAttribute("dir") == "rtl" ? -1 : 1
    });
    // owl.on('changed.owl.carousel', function(e) {
    //   console.log("test");
    // });

    $(".owl-dot").click(function() {
      owl.trigger("to.owl.carousel", [$(this).index(), 300]);
    });
  }
}

// Binds jQuery slick-slider plugin
function initalizeSlickSliderElement() {
  var sliderElem = $(".careem-slick-slider");

  if (sliderElem.length) {
    sliderElem.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".careem-slider-nav",
    });
    $(".careem-slider-nav").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".careem-slick-slider",
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            centerMode: false,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: false,
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
      prevArrow: '<div class="slick-prev"><i class="fa fa-caret-left"></i></div>',
      nextArrow: '<div class="slick-next"><i class="fa fa-caret-right"></i></div>'
    });
  }
}

function adjustHeight() {
  var getElemWidth = $(".square-element").width();
  var setElemHeight = getElemWidth + "px";
  $(".square-element").css("height", setElemHeight);
}

// calls adjustHeight anytime the browser window is resized
$(window).resize(function() {
  adjustHeight();
});

$(document).ready(function() {
  adjustHeight();
  carouselinit(".owl-carousel-1", "#carousel-custom-nav-1");
  carouselinit(".owl-carousel-2", "#carousel-custom-nav-2");
  $('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
    // var target = $(e.target).attr("href"); // get activated tab
    $(".owl-dot")
      .first()
      .trigger("click");
  });

  initalizeVideoElements();
  initalizeSlickSliderElement();
  
  // Select and loop the equalizer-container element of the elements you want to equalise
  $('.equalizer-container').each(function(){  
    // Cache the highest
    var highestBox = 0;
    // Select and loop the elements you want to equalise
    $('.equalize', this).each(function(){
      // If this box is higher than the cached highest then store it
      if($(this).height() > highestBox) {
        highestBox = $(this).height();
      }
    });  
    // Set the height of all those children to whichever was highest 
    $('.equalize',this).height(highestBox);           
  });
  
    var isIphone = navigator.userAgent.indexOf('iPhone') >= 0;
    if (isIphone) {
        var canvasVideo = new CanvasVideoPlayer({
            videoSelector: '.video',
            canvasSelector: '.canvas',
            timelineSelector: '.js-timeline',
            framesPerSecond: 25,
            hideVideo: true, // should script hide the video element
            autoplay: false,
            pauseOnClick: false,
            resetOnLastFrame: true,
            audio: false
        });
    } else {
        // Use HTML5 video
        if(document.querySelectorAll('.canvas').length){
            document.querySelectorAll('.canvas')[0].style.display = 'none';
        }
    }
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
});