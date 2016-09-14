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
 	var options = [
    {selector: '#home', offset: 500, callback: function() {
      $('nav').show();
    } }
  ];
  Materialize.scrollFire(options);

  $(window).scroll(function() {
  	if ($(window).scrollTop() + $(window).height() < 1500){
  		$('nav').hide();
  	} 
  	else {
  		$('nav').show();
  	}
});

 });