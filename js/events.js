$(document).ready(function() {
	// Disable scrolling
	$('body').on('scroll mousewheel touchmove', function(e) {
		e.preventDefault();
	    e.stopPropagation();
	    return false;
	});

	/*** Run initializations ***/
	var fixedElems = ["header",
	 "#back-graphic"];
	updateFixed(fixedElems);

	var numEvents = $(".event").length;
	var selectedEvent = 1;
	var scrollInProgress = false;
	var scrollReady = true;
	var scrollReadyChecker;

	var polarMultiplier = getPolarMultiplier();

	$("#back-graphic").fadeIn(600);
	$("#indicator").css("left", ($(window).width() < 975) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 340) + "px")).fadeIn(600);

	// Append events
	var curY = $(window).height()/2 - 25; // this is the center
	$(".event").each( function() {
		$(this).css("top", curY + "px");
		curY += $(window).height()/4;
	});

	// Draw background arc along the sine wave
	var background = $("#back-graphic");
	var circWidth = 20; // width of the circle on-screen, out of 100
	var rad = (Math.pow(50, 2) + Math.pow(circWidth, 2))/(circWidth * 2);
	var circX = circWidth - rad;
	var circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circ.setAttribute("cx", circX);
	circ.setAttribute("cy", 50);
	circ.setAttribute("r", rad);
	background.append(circ);

	$(".event").each( function() {
		updateEvent(this);
	});

	scrollTo($("#event-" + selectedEvent));

	/*** Handle event navigation ***/
	$(".event").click( function() {
		scrollTo("#" + $(this).attr("id"));
	});

	/*** Handle window change events ***/
	$(window).resize(function() {
		updateFixed(fixedElems);

		polarMultiplier = getPolarMultiplier();

		$("#indicator").css("left", ($(window).width() < 976) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 350) + "px"));

		$(".event").each( function() {
			updateEvent(this);
		});
	});

	/*** Handle mouse scroll events (since normal scrolling is disabled) ***/
	$('body').bind('mousewheel', function(e) {
		// clearTimeout($.data(this, 'scrollActive'));
		// $.data(this, 'scrollActive', setTimeout(function() {
		// 	scrollReady = true;
		// }, 50));

		if(!scrollInProgress) {
			scrollReady = false;
	        if(e.originalEvent.wheelDelta > 0) {
	        	if(selectedEvent !== 0) {
	        		selectedEvent -= 1;
	        		scrollTo($("#event-" + selectedEvent));
	        	}
	        }
	        else {
	        	if(selectedEvent !== numEvents - 1) {
	            	selectedEvent += 1;
	            	scrollTo($("#event-" + selectedEvent));
	        	}
	        }
	    }
    });

    /*** Handle keyboard navigation events ***/
    $(document).keydown(function(key) {
	    switch(key.which) {
	        case 38: // up
	        	if(!scrollInProgress) {
					scrollReady = false;
					if(selectedEvent !== 0) {
	        			selectedEvent -= 1;
	        			scrollTo($("#event-" + selectedEvent));
					}
	        	}
	        break;

	        case 40: // down
	        	if(!scrollInProgress) {
					scrollReady = false;
					if(selectedEvent !== numEvents - 1) {
	        			selectedEvent += 1;
	        			scrollTo($("#event-" + selectedEvent));
					}
	        	}
	        break;

	        default: return; // exit this handler for other keys
	    }
	    key.preventDefault(); // prevent the default action (scroll / move caret)
	});

	/*** Animate scrolling to make events follow the circle ***/
	$(document).scroll(function() {
		$(".event").each( function() {
			updateEvent(this);
		});
	});

	// 	clearInterval(scrollStopChecker);
	// 	// clearTimeout($.data(this, 'scrollAdjust'));
		
	// 	// Get centermost event
	// 	var bestElem = $(".event").first();
	// 	var bestDelta = Math.abs( $(window).scrollTop() + $(window).height()/2 + 24 - $(bestElem).offset().top );
	// 	$(".event").each( function() {
	// 		var delta =  Math.abs( $(window).scrollTop() + $(window).height()/2 + 24 - $(this).offset().top );
	// 		if (delta < bestDelta) {
	// 			bestElem = this;
	// 			bestDelta = delta;
	// 		}
	// 	});

	// 	if( bestDelta > 5) {
	// 	// $.data(this, 'scrollAdjust', setTimeout(function() {
 //    	scrollStopChecker = setInterval(function() {
 //    		if( Math.abs(lastScrollTop - $(window).scrollTop()) < 10) {
	// 			clearInterval(scrollStopChecker);

	// 			// Get centermost event
	//     		var bestElem = $(".event").first();
	//     		var bestDelta = Math.abs( $(window).scrollTop() + $(window).height()/2 + 24 - $(bestElem).offset().top );
	//     		$(".event").each( function() {
	//     			var delta =  Math.abs( $(window).scrollTop() + $(window).height()/2 + 24 - $(this).offset().top );
	//     			if (delta < bestDelta) {
	//     				bestElem = this;
	//     				bestDelta = delta;
	//     			}
	// 			});

	// 			// "Snap" to the closest event
	// 			var viewY = $(bestElem).offset().top + 24 - $(window).height()/2;
	// 			scrollState = true;
	// 			$("html", "body").scrollTop(viewY);
	// 			$("html, body").animate({ scrollTop: viewY + "px" }, 300, function() {
	// 				lastScrollTop = viewY;
	// 			});
 //    		} else {
 //    			lastScrollTop = $(window).scrollTop();
 //    		}
    		
 //    	}, 50);
 //    	}

 //    	lastScrollTop = $(window).scrollTop();
	// });

	/*** Define helper functions ***/
	function getPolarMultiplier() {
		if( $(window).width() > 938 ) {
			return 900;
		} else {
			// var a = $(window).height();
			// var b = ($(window).width() - 76)/2;
			return ($(window).width() + 76);
		}
	}

	function parseID(id) {
		return id.split("-")[1];
	}

	function updateEvent(event) {
		// The svg is drawn over a 100x100 viewport, so we use that scale
		var y = 50 - ($(event).offset().top - $(window).scrollTop() + 24) * (100/$(window).height());

		// Calculate x using polar coordinates
		var theta = Math.asin(y / rad);
		var x = circX + (rad * Math.cos(theta));
		x *= polarMultiplier/100;

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

	function scrollTo(eventId) {
		scrollInProgress = true;
		$(".details").each( function() {
				if( parseID($(this).attr("id")) !== selectedEvent )
					$(this).fadeOut(300);
				// $(this).slideUp();
			});
		var viewY = $(eventId).offset().top + 24 - $(window).height()/2;
		$("html, body").animate({ scrollTop: viewY + "px" }, 300, function() {
			scrollInProgress = false;
			$("#details-" + selectedEvent).slideDown(200);
		});
	}
});