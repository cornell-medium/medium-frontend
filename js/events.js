$(document).ready(function() {
	/*** Run initializations ***/
	var fixedElems = ["header",
	 "#back-graphic"];
	updateFixed(fixedElems);

	$("#back-graphic").fadeIn(600);
	$("#indicator").css("left", ($(window).width() < 975) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 375) + "px")).fadeIn(600);

	var curY = $(window).height()/2 - 25; // this is the center
	$(".event").each( function() {
		$(this).css("top", curY + "px");
		updateEvent(this);

		curY += $(window).height()/4;
	});

	// Draw background arc along the sine wave
	var background = $("#back-graphic");
	var amplitude = 100 / 8;
	for (i = 1; i < 100; i+=1) {
		var lineSeg = document.createElementNS("http://www.w3.org/2000/svg", "line");

		lineSeg.setAttribute('x1', amplitude * Math.sin( yToRads(i - 2) ));
		lineSeg.setAttribute('y1', i - 2);

		lineSeg.setAttribute('x2', amplitude * Math.sin( yToRads(i) ));
		lineSeg.setAttribute('y2', i);

		background.append(lineSeg);
	}

	/*** Handle event navigation ***/
	$(".event").click( function() {
		var viewY = $(this).offset().top + 24 - $(window).height()/2;
		$("html, body").animate({ scrollTop: viewY + "px" });
	});

	/*** Handle window change events ***/
	$(window).resize(function() {
		updateFixed(fixedElems);

		$("#indicator").css("left", ($(window).width() < 975) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 375) + "px"));

		$(".event").each( function() {
			updateEvent(this);
		});
	});

	$(document).scroll(function() {
		$(".event").each( function() {
			updateEvent(this);
		});
		
	});

	/*** Define helper functions ***/
	function updateEvent(event) {
		var calcY = $(event).offset().top - $(window).scrollTop() + 24;
		var y = calcY * (Math.PI / $("#back-graphic").height());
		var x = ($("#back-graphic").width() / 8) * Math.sin(y);
		if( $(window).width() <= 976 && $(window).width() > 915 )
			x += ((976 - $(window).width())/2);
		else if( $(window).width() <= 915 )
			x += 30;

		$(event).css("left", (x + "px"));
	}

	// Update fixed-width elements that would normally have max-width 900
	function updateFixed(elems) {
		elems.forEach( function(d) {
			if( $(window).width() > 976 )
				$(d).css("width", "900px");
			else
				$(d).css("width", ($(window).width() - 76) + "px");
		});
	}

	function yToRads(y) {
		return y * (Math.PI / 100);
	}
});