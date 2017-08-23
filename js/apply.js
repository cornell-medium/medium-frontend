$(document).ready(function() {
	var cur_select = null;

	$('input[type=text]').focus(function() {
		$('#' + $(this).attr("id") + '-lbl').css('color', 'rgb(255, 78, 136)');
		$('#' + $(this).attr("id") + '-lbl').css('font-size', '10px');
		$('#' + $(this).attr("id") + '-lbl').css('margin-top', '-73px');
	});
	$('input[type=text]').focusout(function() {
		if($.trim($(this).val()) == "") {
			$(this).val("");
			$('#' + $(this).attr("id") + '-lbl').css('color', '#000000');
			$('#' + $(this).attr("id") + '-lbl').css('font-size', '15px');
			$('#' + $(this).attr("id") + '-lbl').css('margin-top', '-57px');
		} else {
			$('#' + $(this).attr("id") + '-lbl').css('color', '#888888');
		}
	});
	$('.position').click(function() {
		if(!$(this).data('selected')) {
			$('.description').slideUp(200);

			if(cur_select != null) {
				cur_select.css('background', 'white');
				cur_select.css('color', 'black');
				cur_select.data('selected', false);
			}

			$(this).css('background', 'rgb(255, 78, 136)');
			$(this).css('color', 'white');
			$(this).data('selected', true);
			cur_select = $(this);
			$(this).children('.role').click();

			$('.description').slideDown(200);
		}
	});
});