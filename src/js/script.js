
$(function() {

/* ------------  SCROLL ANIMATE  ------------ */
    $("#what-we-do").click(function() {
        $('html,body').animate({
            scrollTop: $(".whatwedo").offset().top},
            'slow');
    });

/* ------------  BORDER ACTIVE MENU LIST  ------------ */
    $(".borderactive").click(function(){
        $('.borderactive').removeClass("menulistactive"),
        $(this).addClass("menulistactive");
    })
   
    
/* ------------  FORM VALIDATION  ------------ */
    $('.inputs').on('blur', function() {
        var input = $(this);
        var subject_length = input.val().length;
        if(subject_length >= 3){
            input.removeClass("invalid").addClass("valid");
        }
        else{
            input.removeClass("valid").addClass("invalid");	
        }
    });
    $('#inputemail').on('blur', function() {
		var input = $(this);
		var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var is_email = pattern.test(input.val());
		if(is_email){
			input.removeClass("invalid").addClass("valid");
		}
		else{
			input.removeClass("valid").addClass("invalid");	
		}
});
    $('#phonenumber').on('blur', function() {
        var phonenumber = $(this);
        var numbers = phonenumber.val().length;
        if(numbers >= 9){
            phonenumber.removeClass("invalid").addClass("valid");
        }
        else{
            phonenumber.removeClass("valid").addClass("invalid");	
        }
    });
});
   
