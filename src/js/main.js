$(document).ready(function () {
	"use strict";

	$("img, a").on("dragstart", function(e) {e.preventDefault();});

	//top-show
	function showHeader(){
      $(window).scroll(function() {
        var hedHeight = $(".top").height();
        var winTop = $(window).scrollTop();

          if(winTop >= hedHeight + 40){
           $("#top-fixed").addClass("slideInDown");
         } else {
           $("#top-fixed").removeClass("slideInDown");
         }
      });
   }
	showHeader();

	// scroll to place
	$(".js-anchor").click(function() {
      $("html, body").animate({scrollTop: $($(this).closest('section').next('section')).offset().top - 30 +"px"}, {duration: 800});
      return false;
    });

	// parallax
	if (window.matchMedia('(min-width: 1025px)').matches) {
		skrollr.init({
		smoothScrolling: true,
		smoothScrollingDuration: 100,
		forceHeight: !1
		});
	};


	//mask
	$("[type=tel]").mask("+7 (999) 999-99-99");

	//Дата
	flatpickr("[name=date]",{
	  dateFormat: "d-M-Y",
	  // mode: "multiple",
	  mode: "range",
	  // -- выходные --
	  // "disable": [
	  //     function(date) {
	  //       var i
	  //         return (date.getDay() === 6 || date.getDay() === 0);
	  //     }
	  // ],
	  "locale": {"firstDayOfWeek": 1 }
	});

	$(".info").on('click', function() {
		var info = $(this);
		info.toggleClass('info--show');
		setTimeout(function(){info.removeClass('info--show')},8000);
	});

	// submit
	// var form = document.forms['feedback'];

	// $(form).on('submit', function (e) {
 //      e.preventDefault();
 //      $.ajax({
 //        type: 'POST',
 //        url: 'mail.php',
 //        data: $(this).serialize(),
 //        success: function(){
	// 		 $.magnificPopup.open({items: {src: '#popup-success'},type: 'inline',mainClass: 'mfp-fade'},0);
	// 		 setTimeout(function(){$.magnificPopup.close()},4200);
 //        },
 //        error: function() {
	// 		 $.magnificPopup.open({items: {src: '#popup-error'},type: 'inline',mainClass: 'mfp-fade'},0);
	// 		 setTimeout(function(){$.magnificPopup.close()},4200);
 //        }
 //      }).done(function() {
 //        $(form).trigger("reset");
 //      });
 //      return false;
 //   });

});

// $(function() {
// 	setTimeout(function() {
// 		document.body.classList.remove("initial")
// 	}, 400);
// });