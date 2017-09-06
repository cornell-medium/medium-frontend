$(document).ready(function() {
  // *** Setup ***
  var numEvents = $('.desktop__event').length;
  var selectedEventId = 0;
  var currentEventId = 0;
  var scrollInProgress = false;
  var eventsAng = {};
  var curAngle = 90;
  $('.desktop__event').each(function() {
    var event = $(this);
    var id = event.data('event-id');
    eventsAng[id] = curAngle;

    var coords = calcCoords(curAngle);
    event.css('left', coords[0] + 'px');
    event.css('top', coords[1] + 'px');
    if(id === selectedEventId)
      event.addClass('active');
    event.fadeIn(250);
		curAngle += 30;
  });

  $('#event-' + selectedEventId).fadeIn(250);

  // Select the nearest event (calculated by the backend Python script on pageload)
  selectedEventId = initialEventId;
  scrollTo(initialEventId);
  
  // *** Action handlers ***
  // Disable normal scrolling
  $('body').on('scroll mousewheel wheel touchmove DOMMouseScroll', function(e) {
		if(window.innerWidth > 850) {
			e.preventDefault();
		    e.stopPropagation();
		    return false;
		}
		else {
			return true;
		}
	});

  // Handle scrolling through events on desktop
  $('body').on('mousewheel wheel DOMMouseScroll', function(e) {
    if(!scrollInProgress && window.innerWidth > 850) {
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

  // Trigger scroll to the selected event on desktop click
  $('.desktop__event').click( function() {
    var id = $(this).data('event-id');
    selectedEventId = Number(id);
    scrollTo(selectedEventId);
  });

  // Close the details modal
  $('.close').click( function() {
    var id = $(this).data('event-id');
    var target = $('#mobile-event-' + id);
    target.fadeOut(250, function() {
      target.find('.desc__img').css('display', 'block');
    });
  });

  // Open the details modal on mobile click
  $('.mobile__event').click( function() {
    var id = $(this).data('event-id');
    var target = $('#mobile-event-' + id);
    if(window.innerHeight < 600)
      target.find('.desc__img').css('display', 'none');
    target.fadeIn(250);
  });

  // Handle navigation by keypress
  $(document).keydown(function(key) {
    if(window.innerWidth > 850) {
      switch(key.which) {
        case 40: // down
          if(!scrollInProgress) {
            scrollReady = false;
            if(selectedEventId !== 0) {
              selectedEventId -= 1;
              scrollTo(selectedEventId);
            }
          }
        break;

        case 38: // up
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
    }
  });
  
  // Handle resize events (events will have to be repositioned)
  $(window).resize(function() {
    if(window.innerWidth > 850) {
      $('.desktop__event').each( function() {
        var event = $(this);
        var angle = eventsAng[event.data('event-id')];
    
        var coords = calcCoords(angle);
        event.css('left', coords[0] + 'px');
        event.css('top', coords[1] + 'px');
      });
    }
  });

  // *** Helper functions ***
  // Calculate an event's coordinates along the circle given its current angle
  function calcCoords(degAngle) {
    var wheelCenterX = (-0.75 * window.innerHeight) + (0.1 * window.innerWidth);
    var wheelCenterY = window.innerHeight/2.0;
    var wheelRadius = 0.75 * window.innerHeight;

    var radAngle = degAngle * (Math.PI/180);

    var x = (Math.sin(radAngle) * wheelRadius + wheelCenterX)|0;
    var y = (Math.cos(radAngle) * wheelRadius + wheelCenterY)|0;

    return [x, y];
  }

  // Adjust all events to move the given event into focus
  function scrollTo(eventId) {
    scrollInProgress = true;
    var deltaAng = (currentEventId - eventId) * 30;

    $('.desktop__event').each( function() {
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

        });
      }
    });

    $('#event-' + currentEventId).fadeOut(250, function() {
      $('#event-' + selectedEventId).slideDown(250);
      currentEventId = selectedEventId;
      scrollInProgress = false;
    });
  }
});