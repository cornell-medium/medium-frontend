$(document).ready(function() {
	$(function(){
		$("#typed").typed({
			strings: ["Dialogue through Design", "Building Design at Cornell", "What's your Medium?"],
			backDelay: 3000,
			typeSpeed: 25,
			cursorChar: ""
		});
  	});

    $("#main-wrap").blockScroll({
    	scrollDuration: "fast"
    }); 
});