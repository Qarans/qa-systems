$(function () {
	var _deleteData = $('.deleteData'); 
	_deleteData.click(function (e) {
		var urlS = $(this).attr('href');
		e.preventDefault();
		if (confirm('Your data will be permanently deleted, sure?')) {
			window.location = urlS;
		}
	})
})	

