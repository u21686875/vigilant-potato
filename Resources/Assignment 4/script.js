$(document).ready(function() 
{
	$(".submit").on('click', function(event) 
	{
	var currentValue = $('#message').val();
	// use regex, check if there is a youtube link in the text area
	var valid = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/;
	// if true, append iframe, else just normal message
	let side = $(this).attr("id");
	if(valid.test(currentValue)) 
	{
		//append iframe to bottom of message

		let url = currentValue.match(valid)[0];
		url = url.split('v=')[1];

		/* console.log(url); */

		$(".messages")
		.addClass('row')
		.append(
			$("<div></div>")
			.addClass(side + ' col-4 offset-4 mb-3 rounded')
			.html(currentValue)
			.append(
				$("<iframe>", {
					width: "100%",
					height: "315px",
					src: "https://www.youtube.com/embed/"+url,
					frameborder: "0",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				})
			)
		)
	}
	else {
		$(".messages")
		.addClass('row')
		.append(
			$("<div></div>")
			.addClass(side +' col-4 offset-4 mb-3 rounded')
			.html(currentValue)
		)		
	}
	});//end function
});//end function