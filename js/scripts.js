$(function(){
    //modal
    var active = false;

    // toggles modal when toggle element is clicked
    $(".toggle").click(function(e){
        if ($(e.target).hasClass("active")) {
            $(e.target).removeClass("active");
            $("body").removeClass("no-overflow");
        }
        else {
            $(e.target).children(".toggle").addClass("active");
            $("body").addClass("no-overflow");
        }
    });

    // prevents toggle from occurring while modal is active and user clicks within cart
    $(".no-propagate").click(function(e){
        e.stopPropagation();
    });
});