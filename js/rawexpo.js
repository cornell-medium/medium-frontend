// Code courtesy of CodePen: https://codepen.io/SitePoint/pen/MwNPVq
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	if(t < 0) {
		return {
			'total': 0,
			'days': 0,
			'hours': 0,
			'minutes': 0,
			'seconds': 0
		};
	}

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(endtime) {
	var daysSpan = document.getElementById('days');
	var hoursSpan = document.getElementById('hours');
	var minutesSpan = document.getElementById('minutes');
	var secondsSpan = document.getElementById('seconds');

	function updateClock() {
		var t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

initializeClock(new Date("April 27, 2017 19:30:00"));