$(document).ready(function(){
	
	$('nav a').click(function(event){
		var url = $(this).attr('href');
		
		$('.content section').fadeOut();
		
		$(url).fadeIn();
		
		
		event.preventDefault();
	});
	
	
});