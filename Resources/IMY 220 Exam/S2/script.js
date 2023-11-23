// Add your surname and position here

// Code here
document.addEventListener("DOMContentLoaded", () => {
const offset = 70; // Height of your fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
    });
    });
});
});

$(document).ready(function() {
$(window).scroll(function() {
    var scroll = $(window).scrollTop(),
        documentHeight = $(document).height(),
        windowHeight = $(window).height();
    var scrollPercentage = (scroll / (documentHeight - windowHeight)) * 100;
    $('#myBar').css('width', scrollPercentage + '%');
});
});
