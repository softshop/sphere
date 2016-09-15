 $(document).ready(function(){
 	$(function() {
 		$('a[href*="#"]:not([href="#"])').click(function() {
 			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
 				var target = $(this.hash);
 				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
 				if (target.length) {
 					$('html, body').animate({
 						scrollTop: target.offset().top
 					}, 1000);
 					return false;
 				}
 			}
 		});
 	});

 	$(window).scroll(function() {
 		if ($(window).scrollTop() + $(window).height() < 1400){
 			$('nav').hide();
 		} 
 		else {
 			$('nav').show();
 		}
 	});

 });

 function sendMail(){
 	var name = $('#name').val();
 	var emailFrom = $('#emailFrom').val();
 	var phoneNumber = $('#phoneNumber').val();
 	var message = $('#message').val();
 	if (name == "") {
 		$('#name').addClass("error");
 		return null;
 	}
 	else {
 		$('#name').removeClass("error");
 	}
 	if (emailFrom == "" || !validator.isEmail(emailFrom)){
 		$('#emailFrom').addClass("error");
 		return null;
 	}
 	else {
 		$('#emailFrom').removeClass("error");
 	}
 	if (phoneNumber == "")
 		phoneNumber = null;
 	if (phoneNumber != null && (!validator.isNumeric(phoneNumber) || !validator.isLength(phoneNumber, {min:10, max:15}))){
 		$('#phoneNumber').addClass("error");
 		return null;
 	}
 	else {
 		$('#phoneNumber').removeClass("error");
 	}
 	if (message == ""){
 		$('#message').addClass("error");
 		return null;
 	}
 	else {
 		$('#message').removeClass("error");
 	}	
 	$.post('/sendMail', {
 		name: name,
 		emailFrom: emailFrom,
 		phoneNumber: phoneNumber,
 		message: message
 	}, function (response) {
 		alert("Inquiry Sent!");
 		$('#contactForm')[0].reset();
 		console.log(response);
 	})
 }