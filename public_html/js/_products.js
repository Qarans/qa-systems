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
				// console.log(msg); return false;
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
			complete:function() {
				_btnSubmit.button('reset');
			}
		});		
	});

});
$(window).load(function(){ 
	$("#imageChange").change(function(){
		$('#imageArea').show();
		$(document).scrollTop($(window).height() * 2).stop();
		// $('.blockImageArea').hide();
		readURL(this);
		setTimeout(function(){
			var jcrop_api;

			$('.target').Jcrop({
				aspectRatio: 800/800,
				minSize: [50],
				onChange: showCoords,
				onSelect: showCoords,
				onRelease: clearCoords
				},
				function(){
					jcrop_api = this;
				}
			);

			$('#coords').on('change','input',function(e){
				var x1 = $('#x1').val(),
				x2 = $('#x2').val(),
				y1 = $('#y1').val(),
				y2 = $('#y2').val();
				jcrop_api.setSelect([x1,y1,x2,y2]);
			});

			function showCoords(c) {
				$('#x1').val(c.x);
				$('#y1').val(c.y);
				$('#w').val(c.w);
				$('#h').val(c.h);
			};

			function clearCoords() {
				$('#x1').val('');
				$('#y1').val('');
				$('#w').val('');
				$('#h').val('');
			};
		}, 1000);
	});		
});	
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#imageArea').attr('src', e.target.result);
			}
		reader.readAsDataURL(input.files[0]);
		}
	}