$(function () {
	$("._files").change(function(event){
		var _file = event.target.files;
		var name = null;
		$('.file_list_name').html('');
		for (var i = 0; i < _file.length; i++) {
			name = _file[i]['name'];
			$('.file_list_name').append('<li>'+name+'</li>')
		};
	});

	$('.upload_file').submit(function(e) {
		e.preventDefault();
		var percentVal = null;
		var messageArea = $('.messageArea');
		$(this).ajaxSubmit({
			uploadProgress: function(event, position, total, percentComplete) {
				percentVal = percentComplete + '%';
				$('.progress-bar').width(percentVal);
				$('.progress-bar-status').text(percentVal + ' Complete');
			},
			success: function(msg) {
				// console.log(msg);
				if (msg['code'] == 200) {
					window.location = msg['message'];
				}
				else{
					alert('Cant upload file for this time');
				}
			},
			error: function (msg) {
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
	})

	$('.extract').submit(function(e) {
		$(this).find('.btn-submit').button('loading');
		e.preventDefault();
		var percentVal = null;
		$(this).ajaxSubmit({
			success: function(msg) {
				console.log(msg);
				if (msg['code'] == 200) {
					window.location = msg['message'];
				}
				else{
					alert('Cant upload file for this time');
				}				
			},
			error: function (msg) {
				console.log(msg);
			},
			complete:function(argument) {
				$('.btn-submit').button('reset');
			}
		});		
	})

})