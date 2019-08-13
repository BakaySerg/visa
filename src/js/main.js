$(document).ready(function () {
	"use strict";

	$("img, a").on("dragstart", function(e) {e.preventDefault();});

	// Scroll-anim (only desktop)
	var ww = $(window).width();

	if ( ww > 1023) {
		$('.anim-x,.anim--x,.anim-y').addClass("anim-wait").viewportChecker({
			classToAdd: 'anim-play',
			offset: 140
		});
	};

	// menu dropdown
	const nav = $('.navbar');
	const btn = $('.navbar-toggle');
	btn.on('click', function(e) {
		e.preventDefault();
		nav.toggleClass('navbar--open');
	});

	$(window).on('scroll', function() {
		if((parseInt($(window).scrollTop()) > 4)) {
			nav.removeClass('navbar--open');
		}
	});

	$('.scroll-top').click(function(){
		$("html, body").stop().animate({scrollTop: 0}, {duration: 800});
		return false;
	});

	$('.typal').click(function(e){
		$(this).find('[data-title]').removeClass('hover');
		if ($(e.target).is('[data-title]')) {
			$(e.target).addClass('hover');
		}
	});

	/**
	 * slider
	 */
	$('.slider').slick({
		dots: true,
		arrows:false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		// slidesToScroll: 2,
		touchThreshold: 100,
		responsive: [{
			breakpoint: 1023,
			settings: {slidesToShow: 4}
		}, {
			breakpoint: 767,
			settings: {slidesToShow: 3}
		}, {
			breakpoint: 640,
			settings: {slidesToShow: 2}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				// centerMode: true,
				arrows: false,
				// centerPadding: '12%'
			}
		}]
	});

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