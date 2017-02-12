$(document).ready(function() {
	$(".hamburger").click(function() {
		if($(this).hasClass("is-active")) {
			$(this).removeClass("is-active");
			$("#nav-screen").fadeOut(100);
		} else {
			$(this).addClass("is-active");
			$("#nav-screen").fadeIn(100);
		}
	});
});