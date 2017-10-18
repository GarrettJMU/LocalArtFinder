// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function()
{
	//Add Inactive Class To All Accordion Headers
	$('.accordion-header').toggleClass('inactive-header');

	//Set The Accordion Content Width
	var contentwidth = $('.accordion-header').width();
	$('.accordion-content').css({'width' : contentwidth });

	//Open The First Accordion Section When Page Loads
	// $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
	// $('.accordion-content').first().slideDown().toggleClass('open-content');

	// The Accordion Effect
	$('.accordion-header').click(function () {
		if($(this).is('.inactive-header')) {
			$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
			$(this).toggleClass('active-header').toggleClass('inactive-header');
			$(this).next().slideToggle().toggleClass('open-content');
		}

		else {
			$(this).toggleClass('active-header').toggleClass('inactive-header');
			$(this).next().slideToggle().toggleClass('open-content');
		}
	});

	return false;
});
