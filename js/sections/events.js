$(document).ready(function() {
  // Disable normal scrolling
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

  var numEvents = $('.events__event').length;
  var selectedEventId = 0;
  var currentEventId = 0;
  var scrollInProgress = false;

  // Setup events
  var eventsAng = {};
  var curAngle = 90;
  $('.events__event').each( function() {
    var event = $(this);
    var id = event.data('event-id');
    eventsAng[id] = curAngle;

    var coords = calcCoords(curAngle);
    event.css('left', coords[0] + 'px');
    event.css('top', coords[1] + 'px');
    if(id === selectedEventId)
      event.addClass('active');
		curAngle += 30;
  });
  
  // Handle scrolling through events
  $('body').on('mousewheel wheel DOMMouseScroll', function(e) {
    if(!scrollInProgress) {
      if(e.originalEvent.deltaY > 0) {
        if(selectedEventId !== 0) {
          selectedEventId -= 1;
          scrollTo(selectedEventId);
        }
      } else {
        if(selectedEventId !== numEvents - 1) {
          selectedEventId += 1;
          scrollTo(selectedEventId);
        }
      }
    }
  });

  $('.events__event').click( function() {
    var id = $(this).data('event-id');
    selectedEventId = Number(id);
    scrollTo(selectedEventId);
  });

  $(document).keydown(function(key) {
    switch(key.which) {
      case 38: // up
        if(!scrollInProgress) {
          scrollReady = false;
          if(selectedEventId !== 0) {
            selectedEventId -= 1;
            scrollTo(selectedEventId);
          }
        }
      break;

      case 40: // down
        if(!scrollInProgress) {
          scrollReady = false;
          if(selectedEventId !== numEvents - 1) {
            selectedEventId += 1;
            scrollTo(selectedEventId);
          }
        }
      break;

      default: return; // exit this handler for other keys
    }
    key.preventDefault(); // prevent the default action (scroll / move caret)
  });
  
  $(window).resize(function() {
    $('.events__event').each( function() {
      var event = $(this);
      var angle = eventsAng[event.data('event-id')];
  
      var coords = calcCoords(angle);
      event.css('left', coords[0] + 'px');
      event.css('top', coords[1] + 'px');
    });
  });

  function scrollTo(eventId) {
    scrollInProgress = true;
    var deltaAng = (currentEventId - eventId) * 30;

    $('.events__event').each( function() {
      var event = $(this);
      var id = event.data('event-id');
      var eventAng = eventsAng[id];
      var targetAng = eventAng + deltaAng;
      eventsAng[id] = targetAng;

      var isOnScreen = eventAng > 5 && eventAng < 175;
      var willBeOnScreen = targetAng > 5 && targetAng < 175;
      if(isOnScreen || willBeOnScreen) {
        var wheelCenterX = (-0.75 * window.innerHeight) + (0.1 * window.innerWidth);
        var wheelCenterY = window.innerHeight/2;
        var wheelRadius = 0.75 * window.innerHeight;
        var direction = deltaAng > 0 ? 1 : -1;

        var arcParams = {
          center: [wheelCenterX, wheelCenterY],	
          radius: wheelRadius,	
          start: eventAng,
          end: targetAng, 
          dir: direction 
        }
        event.animate({path : new $.path.arc(arcParams)}, 300, function() {
          if(eventId === id)
            event.addClass('active');
          else
            event.removeClass('active');

          scrollInProgress = false;
        });
      }
    });

    currentEventId = selectedEventId;
  }

  function calcCoords(degAngle) {
    var wheelCenterX = (-0.75 * window.innerHeight) + (0.1 * window.innerWidth);
    var wheelCenterY = window.innerHeight/2.0;
    var wheelRadius = 0.75 * window.innerHeight;

    var radAngle = degAngle * (Math.PI/180);

    var x = (Math.sin(radAngle) * wheelRadius + wheelCenterX)|0;
    var y = (Math.cos(radAngle) * wheelRadius + wheelCenterY)|0;

    return [x, y];
  }
});