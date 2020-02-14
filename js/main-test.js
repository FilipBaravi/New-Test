$(document).ready(function() {
  //Simple nav bar scroll animation.
  $(window).scroll(function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 50;
    if (y_scroll_pos > scroll_pos_test) {
	    $('nav').stop().animate({height: "60px", opacity: "1"}, 400);
      $('nav ul').stop().animate({padding: "9px"}, 400);
      $('nav ul li').stop().animate({padding: "5px"}, 400);
    }
    else {
      $('nav').stop().animate({height: "40px", opacity: ".8"}, 400);
      $('nav ul').stop().animate({padding: "0px"}, 400);
      $('nav ul li').stop().animate({padding: "0px"}, 400);
    }
  });
});
$(document).ready(function() {
  
    var $slider = $(".slider"),
        $slideBGs = $(".slide__bg"),
        diff = 0,
        curSlide = 0,
        numOfSlides = $(".slide").length-1,
        animating = false,
        animTime = 500,
        autoSlideTimeout,
        autoSlideDelay = 6000,
        $pagination = $(".slider-pagi");
    
    function createBullets() {
      for (var i = 0; i < numOfSlides+1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-"+i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };
    
    createBullets();
    
    function manageControls() {
      $(".slider-control").removeClass("inactive");
      if (!curSlide) $(".slider-control.left").addClass("inactive");
      if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };
    
    function autoSlide() {
      autoSlideTimeout = setTimeout(function() {
        curSlide++;
        if (curSlide > numOfSlides) curSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    };
    
    autoSlide();
    
    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass("animating");
        $slider.css("top");
        $(".slide").removeClass("active");
        $(".slide-"+curSlide).addClass("active");
        setTimeout(function() {
          $slider.removeClass("animating");
          animating = false;
        }, animTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $(".slider-pagi__elem").removeClass("active");
      $(".slider-pagi__elem-"+curSlide).addClass("active");
      $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
      diff = 0;
      autoSlide();
    }
  
    function navigateLeft() {
      if (animating) return;
      if (curSlide > 0) curSlide--;
      changeSlides();
    }
  
    function navigateRight() {
      if (animating) return;
      if (curSlide < numOfSlides) curSlide++;
      changeSlides();
    }
  
    $(document).on("mousedown touchstart", ".slider", function(e) {
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX,
          winW = $(window).width();
      diff = 0;
      
      $(document).on("mousemove touchmove", function(e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
        $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
      });
    });
    
    $(document).on("mouseup touchend", function(e) {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        navigateLeft();
      }
      if (diff >= 8) {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slider-control", function() {
      if ($(this).hasClass("left")) {
        navigateLeft();
      } else {
        navigateRight();
      }
    });
    
    $(document).on("click", ".slider-pagi__elem", function() {
      curSlide = $(this).data("page");
      changeSlides();
    });
    
  });
// siaxleebi
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);
// Banners
var items = document.querySelectorAll(".galleryItem");
var overlay = document.querySelector(".gallery__overlay");

function setActive(elementToSetActive) {
    overlay.classList.add("visible");
    elementToSetActive.classList.add("willMoveToFront");
    setTimeout(function() {
        elementToSetActive.classList.add("active");
    }, 100);
    setTimeout(function() {
        elementToSetActive.classList.add("contentVisible");
    }, 350);
}

function setInactive(elementToSetInactive, hideOverlay) {
    if (hideOverlay == undefined) {
        var hideOverlay = true;
    }
    if (hideOverlay == true) {
        overlay.classList.remove("visible");
    }
    elementToSetInactive.classList.remove("active");
    setTimeout(function() {
        elementToSetInactive.classList.remove("willMoveToFront");
    }, 300);
    setTimeout(function() {
        elementToSetInactive.classList.remove("contentVisible");
    }, 500);
}

for (var i = 0; i < items.length; i++) {
    var closeButton = items[i].querySelector(".galleryItem__close");
    
    
}