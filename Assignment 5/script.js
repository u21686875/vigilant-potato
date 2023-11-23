$(document).ready(function() {
	// page bottom stuff is for the bonus marks
	// $(window).on("scroll", async function(){
	getArticles("articles.json").then(articles => {
		// sort instead of shuffle
		articles = sortByDate(articles);

		let articleNumber = 2;
		articles.forEach(question => { 
			createArticleCard(question, articleNumber).appendTo("#articleList");
			articleNumber++;
		});
	});

	// Event listener

	$("body").on('click', '.form-check-input', function(article){
		if($(this).parent().parent().find('.alert').length){
			$(this).parent().parent().find('.alert').remove();

		}

		if($(this).parent().attr('data-correct') == "true"){
			$(this).parent().parent().append(
				$("<div></div>")
				.addClass('alert alert-success text-center')
				.html('Glad you liked it!')
			);

		} else {
			$(this).parent().parent().append(
				$("<div></div>")
				.addClass('alert alert-danger text-center')
				.html('We will take your feedback into account')
			);
		}
	});
});

const getArticles = url => {
	return new Promise((res, rej) => {
		$.getJSON(url, json => {
			res(json);
		});
	});
}

const sortByDate = articlesArray => {
	//can use sort or any other method that works

	for(let i=1; i< articlesArray.length; i++) {
        for(let j=0; j < i; j++) {
            if(articlesArray[i].date < articlesArray[j].date) {
                let x = articlesArray[i]
                articlesArray[i] = articlesArray[j]
                articlesArray[j] = x
            }
        }
	}
	return articlesArray;
}

const createArticleCard = ({title,description,date,liked}, articleNumber) => {
	return $("<div></div>")
	.addClass('card mb-3')
	.append(
		$("<div></div>")
		.addClass('card-header')
		.html(`${title}`)
	)
	.append(
		$("<div></div>")
		.addClass('card-body')
		.append(
			$('<p></p>')
			.html(`${description}`)	
		)
		.append(
			$('<b></b>')
			.html(`${date}`)		
		)
		.append(
			$('<p></p>')
			.html("Did you like the article?")
		)			
		.append(
			$("<div></div>")
			.addClass('form-check')
			.attr('data-correct', `${liked[0].correct}`)
			.append(
				$("<input />")
				.addClass('form-check-input')
				.attr('type', 'radio')
				.attr('name', `articleAttendance${articleNumber}`)
				.attr('id', `article${articleNumber}Attending1`)
			)
			.append(
				$("<label></label>")
				.addClass('form-check-label')
				.attr('for', `article${articleNumber}Attending1`)
				.html(`${liked[0].liked}`)
			)
		)
		.append(
			$("<div></div>")
			.addClass('form-check')
			.attr('data-correct', `${liked[1].correct}`)
			.append(
				$("<input />")
				.addClass('form-check-input')
				.attr('type', 'radio')
				.attr('name', `articleAttendance${articleNumber}`)
				.attr('id', `article${articleNumber}Attending2`)
			)
			.append(
				$("<label></label>")
				.addClass('form-check-label')
				.attr('for', `article${articleNumber}Attending2`)
				.html(`${liked[1].liked}`)
			)
		)
	)
}