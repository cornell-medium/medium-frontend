$(function() {

    var nav_open = false;
    $("#hamburger").click(function(e) {
        if (nav_open) {
            nav_open = false;
            $("#nav").addClass("no-display");
            $("body").removeClass("no-scroll");
            $("#hamburger").html("==");
        }
        else {
            nav_open = true;
            $("#nav").removeClass("no-display");
            $("body").addClass("no-scroll");
            $("#hamburger").html("X");
        }
    });
});