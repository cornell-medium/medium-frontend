$(document).ready(function() {
	// Disable scrolling on desktop devices
	$('body').on('scroll mousewheel wheel touchmove DOMMouseScroll', function(e) {
		if($(window).width() > 600) {
			e.preventDefault();
		    e.stopPropagation();
		    return false;
		}
		else {
			return true;
		}
	});

	/*** Run initializations ***/
	var fixedElems = ["header",
	 "#back-graphic"];
	updateFixed(fixedElems);

	var inModal = false;
	var lastWidth = $(window).width();
	var numEvents = $(".event").length;
	var scrollInProgress = false;
	var scrollReady = true;
	var scrollReadyChecker;

	$("#back-graphic").fadeIn(600);
	$("#indicator").css("left", ($(window).width() < 975) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 340) + "px")).fadeIn(600);

	// Append events
	var curY = window.innerHeight/2 - 25; // this is the center
	$(".event").each( function() {
		$(this).css("top", curY + "px");
		curY += window.innerHeight/4;
	});

	$("#page-extender").css("top", curY + window.innerHeight/3);

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
		var id = $(this).attr("id");
		selectedEvent = Number(parseID(id));
		scrollTo($("#event-" + selectedEvent));
	});

	/*** Handle readmore modals ***/
	// Read more button for desktop
	$("#readmore").click( function() {
		inModal = true;

		$("body").append("<div class='cover'></div>");
		$("#details-" + selectedEvent).wrap( "<div class='modal' style='display: none;'></div>" );
		$("#details-" + selectedEvent).css({"position": "relative", "top": "0px", "right": "0px",
											"transform": "none", "visibility": "visible"});
		$(".modal").prepend("<div class='close unselectable'>+</div>")

		$(".cover").fadeIn(300);
		$(".modal").fadeIn(300);

		// Has to be nested as .close does not exist on page load
		$(".close").click( function() {
			hideModal(false);
		});
	});

	$(".readmore").click( function() {
		selectedEvent = $(this).parent().data('details-id');

		console.log(selectedEvent);

		inModal = true;

		$("body").append("<div class='cover'></div>");
		$("#details-" + selectedEvent).wrap( "<div class='modal' style='display: none;'></div>" );
		$("#details-" + selectedEvent).css({"position": "relative", "top": "0px", "right": "0px",
											"transform": "none", "display": "block",
											"visibility": "visible"});
		$(".modal").prepend("<div class='close unselectable'>+</div>")

		$(".cover").fadeIn(300);
		$(".modal").fadeIn(300);

		// Has to be nested as .close does not exist on page load
		$(".close").click( function() {
			hideModal(false);
		});
	});

	/*** Handle window change events ***/
	$(window).resize(function() {
		updateFixed(fixedElems);

		$("#page-extender").css("top", curY + window.innerHeight/3);

		if($(window).width() > 600 && lastWidth < 600)
			scrollTo($("#event-" + selectedEvent));

		if($(window).width() > 875) {
			$(".details").each( function() {
				$(this).css("visibility", "visible");
			});

			if(inModal)
				hideModal(true);
		} else {
			if(!inModal) {
				$(".details").each( function() {
					$(this).css("visibility", "hidden");
				});
			}
		}

		if($(window).width() < 937) {
			$(".details").each( function() {
				$(this).css("right", "15px");
			});
		} else {
			$(".details").each( function() {
				$(this).css("right", "calc(50% - 450px)");
			});
		}

		$("#indicator").css("left", ($(window).width() < 975) ? 
			(($("#back-graphic").width() / 8)) + "px" : (($(window).width()/2 - 350) + "px"));

		$(".event").each( function() {
			updateEvent(this);
		});

		lastWidth = $(window).width();
	});

	/*** Handle mouse scroll events (since normal scrolling is disabled) ***/
	$('body').bind('mousewheel wheel DOMMouseScroll', function(e) {
		if($(window).width() > 600 && !scrollInProgress && !inModal) {
			scrollReady = false;
	        if(e.originalEvent.deltaY > 0) {
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
    	if($(window).width() > 600) {
		    switch(key.which) {
		        case 38: // up
		        	if(!scrollInProgress && !inModal) {
						scrollReady = false;
						if(selectedEvent !== 0) {
		        			selectedEvent -= 1;
		        			scrollTo($("#event-" + selectedEvent));
						}
		        	}
		        break;

		        case 40: // down
		        	if(!scrollInProgress && !inModal) {
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
		}
	});

	/*** Animate scrolling to make events follow the circle ***/
	$(document).scroll(function() {
		if($(window).width() > 600) {
			$(".event").each( function() {
				updateEvent(this);
			});
		}
	});

	/*** Define helper functions ***/
	function hideModal(resize) {
		inModal = false;

		$(".cover").fadeOut(300);
		$(".modal").fadeOut(300, function() {
			$(".close").remove();
			$("#details-" + selectedEvent).unwrap();
			$("#details-" + selectedEvent).css({"position": "fixed", "top": "50%", "right": "calc(50% - 450px)",
												"transform": "translateY(-50%)"});

			if(!resize)
				$("#details-" + selectedEvent).css("visibility", "hidden");
		});
	}

	function parseID(id) {
		return id.split("-")[1];
	}

	function updateEvent(event) {
		// The svg is drawn over a 100x100 viewport, so we use that scale
		var y = window.innerHeight/2 - ($(event).offset().top - $(window).scrollTop() + 24);
		var a = background.outerWidth() * rad/100; //from ellipse equation - width axis
		var b = background.outerHeight() * rad/100; //from ellipse equation - height axis

		var centerX = circX * background.outerWidth() / 100;
		if ( $(window).width() > 915 && $(window).width() < 975)
			centerX += 30 - (($(window).width() - 915)/2);
		else if( $(window).width() <= 929 )
			centerX += background.offset().left - 8;

		var x = centerX + Math.sqrt( (1 - (Math.pow(y, 2)/Math.pow(b, 2))) * Math.pow(a, 2) );

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

	function scrollTo(eventId) {
		// Account for odd cases in which a 0 is appended to the front
		scrollInProgress = true;
		$(".details").each( function() {
			if( parseID($(this).attr("id")) !== selectedEvent )
				$(this).fadeOut(300);
		});
		var viewY = $("#event-" + selectedEvent).offset().top + 24 - window.innerHeight/2;
		$("html, body").animate({ scrollTop: viewY + "px" }, 300, function() {
			scrollInProgress = false;
			$("#details-" + selectedEvent).slideDown(200);
		});
	}
});