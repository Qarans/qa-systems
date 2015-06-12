$(function(){

	var messageArea = $('.messageArea');

	var _submitUserData = $('.submitUserData');
	var _btnSubmit 		= $('.btn-submit');

	_submitUserData.submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			data: _submitUserData.serialize(),
			url: _submitUserData.attr('action'),
			success: function(msg){
				window.location.href = msg['message'];
			},
			error:function(msg) {
				console.log(msg);
				var error = JSON.parse(msg['responseText']);
				messageArea.html('');
				messageArea.html('<div class="alert alert-danger alertMessage"></div>')
				for (var i = 0; i < error['data'].length; i++) {
					$('.alertMessage').append('<li>'+error['data'][i]+'</li>');
				};
			},
			complete:function() {
				_btnSubmit.button('reset');
			}
		});		
	});

});
