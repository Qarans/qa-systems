$(function(){
	$('#birthday,  #tahun_masuk').datepicker({
		format : 'yyyy-mm-dd',
	});

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
				// console.log(msg);
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

	var _addAnotherEmail 	= $('.addAnotherEmail');
	var _anotherPhoneNumber	= $('.anotherPhoneNumber');
	var _phone_first		= $('.phone_first');
	var addId 				= 0;
	_addAnotherEmail.on('click', function(e) {
		e.preventDefault();
		var _id = $('.phone_numbers').length;
		if (_id < 10) {
			addId 	= addId + 1;
			_id 	= addId - 1;
			_phone_first.clone()
			.css('margin-top','10px')
			.removeClass('phone_first')
			.addClass('phoneNumber'+addId)
			.attr('id', addId)
			.appendTo(_anotherPhoneNumber);
			console.log(addId)
			$('.phoneNumber'+addId).find('.col-lg-12').addClass('col-lg-9').removeClass('col-lg-12')
			.after('<div class="col-lg-3"><div class="btn btn-sm btn-danger removeAdditional" id="'+addId+'">remove</div></div>')
			$('.phoneNumber'+addId).find('input').val('')
		}
		else{
			$(this).attr('disabled','disabled');
		}
	});

	var _addAnotherTugas 	= $('.addAnotherTugas');
	var _anotherTugas		= $('.anotherTugas');
	var tugas_first			= $('.tugas_first');
	var addId 				= 0;
	_addAnotherTugas.on('click', function(e) {
		e.preventDefault();
		var _id = $('.tugass').length;
		if (_id < 10) {
			addId 	= addId + 1;
			_id 	= addId - 1;
			tugas_first.clone()
			.css('margin-top','10px')
			.removeClass('tugas_first')
			.addClass('phoneNumber'+addId)
			.addClass('phone_other')
			.attr('id', addId)
			.appendTo(_anotherTugas);
			console.log(addId)
			$('.phoneNumber'+addId).find('.col-lg-12').addClass('col-lg-9').removeClass('col-lg-12')
			.after('<div class="col-lg-3"><div class="btn btn-sm btn-danger removeAdditional" id="'+addId+'">remove</div></div>')
			$('.phoneNumber'+addId).find('input').val('')
		}
		else{
			$(this).attr('disabled','disabled');
		}
	});

	$('.removeAdditional').live('click', function (e) {
		e.preventDefault();
		$(this).parent().parent().remove();
		if ($('.phone_numbers').length < 10 ) {
			_addAnotherEmail.attr('disabled',false);
		};
		if ($('.tugass').length < 10 ) {
			_addAnotherEmail.attr('disabled',false);
		};
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

});
