$(function(){

	var messageArea = $('.messageArea');

	var _submitUserData = $('.submitUserData');
	var _btnSubmit 		= $('.btn-submit');

	_submitUserData.submit(function(e) {
		e.preventDefault();
		$(this).ajaxSubmit({
			uploadProgress: function(event, position, total, percentComplete) {
				percentVal = percentComplete + '%';
				if (percentComplete == 100) {
					$('.progress-bar').width('0%');
				}
				$('.progress-bar').width(percentVal);
			},
			success: function(msg){
				console.log(msg);
				if (msg['code'] == 400) {
					messageArea.html('');
					messageArea.html('<div class="alert alert-danger alertMessage"></div>')
					for (var i = 0; i < msg['data'].length; i++) {
						$('.alertMessage').append('<li>'+msg['data'][i]+'</li>');
					};
				}
				else {
					window.location.href = msg['message'];
				}
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
			complete:function(msg) {
				$('.progress-bar').width('0%');
				$('.progress-bar-status').text('');
			}
		});
	});

});

