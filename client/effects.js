$('document').ready(
	function()
	{
		$(window).scroll(
			function()
			{
				//console.log($(window).scrollTop()+"   "+$(".wrapper").offset().top);
				//console.log()
				//if()
				//if($(window).scrollTop()>$("#nav-eff").offset().top))
				$("#nav-eff").toggleClass("navbar-fixed-top",$(window).scrollTop()>$(".wrapper").offset().top);			
			}
			);
	}
);
console.log("Can any body find me ?")