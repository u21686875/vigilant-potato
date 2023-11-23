function ArticleHandler(articles)
{
    this.articles = articles;

    this.getArticlesbetweenViews = function(min, max)
    {
		return this.articles.filter(function(articles){
			return articles.views >= min && articles.views <= max;
		});
	}

	this.getByMonth = function(month)
	{
		return this.articles.filter(function(articles)
		{
			return articles.date.substr(5,2) == month;
		});
	}

	this.getUniqueRatingAndSort = function()
	{
		return this.articles.sort(function(a, b){
			return a.date.substr(5,2) - b.date.substr(5,2);
		}).reduce((accumulator, currValue) =>
		{
			if(accumulator.every(function(article){return article.rating != currValue.rating || article.rating != currValue.rating})) accumulator.push(currValue);
			return accumulator;		
		},[]);

	}    

	this.getSummary = function(args)
	{
		let list;
		if(args && arguments[0].constructor === Array) 
			list = arguments[0];
		else list = args ? Array.prototype.slice.apply(arguments) : this.articles;
		return list.map(function(article){
			let response = "'" + article.title + "' was published on " + article.date + " by " + article.author + ". It was viewed " + article.views + " times";
			if(article.rating <= 3.5) response += " and was not highly rated";
			else response += " and was loved by all!"
			return response;
		});
	}
}

Array.prototype.getArticlesbetweenViews = function(start,end){
	return new ArticleHandler(this).getArticlesbetweenViews(start, end);
}

Array.prototype.getByMonth = function(month){
	return new ArticleHandler(this).getByMonth(month);
}

Array.prototype.getSummary = function(args){
	return new ArticleHandler(this).getSummary(args);
}
