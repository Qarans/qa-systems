$(function () {
	var _baseUrl = $('body').data('baseurl');
	 $.backstretch([
		_baseUrl + "/img/bg1.jpg",
		_baseUrl + "/img/bg2.jpg",
	  ], {duration: 5000, fade: 750});

});
