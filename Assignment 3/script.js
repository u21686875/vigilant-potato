// year/month/day
var articles = [
    {title: "Kitchen hacks", author: "Mark Simon", date: "2023/01/12", views: 22321, rating: 4.4},
    {title: "Computer components out now", author: "Ayla Beckett", date: "2023/01/12", views: 8777, rating: 2.2},
    {title: "How to pass COS", author: "Some guy", date: "2023/04/02", views: 9345, rating: 3.3},
    {title: "What to eat when", author: "Ben Turner", date: "2023/04/22", views: 34, rating: 4.9},
    {title: "Where is the beef?", author: "Mark Robert", date: "2023/02/10", views: 3247, rating: 3.3},
    {title: "How old is your mind?", author: "Dylan Olker", date: "2023/02/02", views: 7833345, rating: 4.9},
    {title: "You are more awesome than you think", author: "Stewart", date: "2023/06/121", views: 1234567, rating: 5},
];

var handler = new ArticleHandler(articles);

// Uncomment these to test

console.log(handler.getArticlesbetweenViews(3000, 10000));
console.log(handler.getByMonth(2));
console.log(handler.getUniqueRatingAndSort());

/* Test for both cases here */
console.log(handler.getSummary());
console.log(handler.getSummary({title: "How old is your mind?", author: "Dylan Olker", date: "2023/02/02", views: 7833345, rating: 4.9}));

console.log(handler.getByMonth(4).getSummary());
console.log(handler.getArticlesbetweenViews(3000, 100000).getSummary());