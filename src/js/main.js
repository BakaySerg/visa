$(document).ready(function () {
	"use strict";

	$("img, a").on("dragstart", function(e) {e.preventDefault();});

	//top-show
	function sticky(){
      $(window).scroll(function() {
        var hedHeight = $(".header").height();
        var winTop = $(window).scrollTop();
      //   $('.navbar-collapse').collapse('hide');

          if(winTop >= hedHeight + 40){
           $("#top-fixed").addClass("slideInDown");
         } else {
           $("#top-fixed").removeClass("slideInDown");
         }
      });
   }
	sticky();

	//parallax
	// if (window.matchMedia('(min-width: 1025px)').matches) {
	// 	skrollr.init({
	// 	smoothScrolling: true,
	// 	smoothScrollingDuration: 100,
	// 	forceHeight: !1
	// 	});
	// };

	// Scroll-anim (only desktop)
	var ww = $(window).width();

	if ( ww > 1023) {
		$('.anim-x,.anim--x,.anim-y').addClass("anim-wait").viewportChecker({
			classToAdd: 'anim-play',
			offset: 140
		});
	};

	// $('.scroll-top').click(function(){
	// 	$("html, body").stop().animate({scrollTop: 0}, {duration: 800});
	// 	return false;
	// });


	// submit
	var form = document.forms['feedback'];

	$(form).on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mail.php',
        data: $(this).serialize(),
        success: function(){
			 $.magnificPopup.open({items: {src: '#popup-success'},type: 'inline',mainClass: 'mfp-fade'},0);
			 setTimeout(function(){$.magnificPopup.close()},4200);
        },
        error: function() {
			 $.magnificPopup.open({items: {src: '#popup-error'},type: 'inline',mainClass: 'mfp-fade'},0);
			 setTimeout(function(){$.magnificPopup.close()},4200);
        }
      }).done(function() {
        $(form).trigger("reset");
      });
      return false;
   });

});

// $(function() {
// 	setTimeout(function() {
// 		document.body.classList.remove("initial")
// 	}, 400);
// });