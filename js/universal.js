//stopScrolling() function courtesy of user AtheistP3ace at StackOverflow
//http://stackoverflow.com/questions/34792733/jquery-enable-and-disable-scrolling
function stopScrolling (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}
var _timeout = 0;

$(document).ready(function() {
	var desktop_mode = $(window).width() > $("#logo").width() + $("#nav-bar").width() + 100;
	if(desktop_mode) {
		$("#nav-bar").fadeIn(200);
	} else {
  		$("#hamburger-wrapper").fadeIn(200);
	}

	$(".nav-link").mouseover(function() {
		if($(window).width() > $("#logo").width() + $("#nav-bar").width() + 160) {
			var img_1 = static_path + "imgs/navigation/" + $(this).data('icon') + "_blue.png";
			var img_2 = static_path + "imgs/navigation/" + $(this).data('icon') + "_blue.png";
			$("#ind-1").attr("src", img_1);
			$("#ind-2").attr("src", img_2);
			$("#ind-3").attr("src", img_1);
			$(".indicator").fadeIn(100);
		}
	});
	$(".nav-link").mouseout(function() {
		$(".indicator").fadeOut(100);
	});

	$(".hamburger").click(function() {

		if($(this).hasClass("is-active")) {
		    // for some reason click was being called twice. This code blocks
		    // hamburger from being toggled within .5s of last toggle.
		    console.log(_timeout + " end")
		    if (_timeout < new Date().getTime()) {
                $(this).removeClass("is-active");
                $(this).css("position", "absolute");
                $("#nav-screen").fadeOut(100);
                $('body').off('scroll mousewheel touchmove', stopScrolling);
                _timeout = new Date().getTime() + 100;
		    }
		}
		else {

		    if (_timeout < new Date().getTime()) {
                _timeout = new Date().getTime() + 100;
                console.log(_timeout + " start")
                $(this).addClass("is-active");
                $(this).css("position", "fixed");
                $("#nav-screen").fadeIn(100);
                $('body').on('scroll mousewheel touchmove', stopScrolling);
            }
		}
	});

	$( window ).resize(function() {
  		if($(window).width() > $("#logo").width() + $("#nav-bar").width() + 100) {
  			if(!desktop_mode) {
  				$("#hamburger-wrapper").css("display", "none");
  				$("#nav-screen").css("display", "none");
  				$("#nav-bar").fadeIn(200);
  				desktop_mode = true;
  				$('body').off('scroll mousewheel touchmove', stopScrolling);
  			}
  		} else {
  			if(desktop_mode) {
  				$("#nav-bar").css("display", "none");
  				$("#hamburger-wrapper").fadeIn(200);
  				$(".hamburger").css("position", "absolute");
  				desktop_mode = false;
  			}
  		}
	});
});