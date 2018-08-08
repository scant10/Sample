/**
 *  @Description : Alopex와 관계없는 공통 script
 *  @Create User : HHM
 *  @Create Date : 2015.11.11
 */
// Validate 공통함수
function getValidateResult(validator) {
	var $target;
	var result = validator.validate();
	if (!result) {
		var errorstr = '',
			errormessages = validator.getErrorMessage();
		for(var name in errormessages) {
			$target = $('[name='+name+']');
			var item = $('[for='+name+']').text();
			errorstr = item + ': ' + errormessages[name][0];
			break;
		}
		alert(errorstr); //[AMS ISSUE]수정해야 함.
		$target.focus();
		return false;
	}
	return true;
}

/**
 * Validate 관련 class추가.
 * @param formValidator
 */
function setValidationCss(formValidator){
	var valAddClass = formValidator.validate();
	if (!valAddClass) {
		var errormessages = formValidator.getErrorMessage();
		for(var name in errormessages) {
			$target = $('[name='+name+']');
			$target.addClass('Warning');
		}
		
		$('.Warning').on('change', function(e){
			if($(this).val() == ''){
				$(this).removeClass('Warning').addClass('Warning');
			}
			else{
				$(this).removeClass('Warning');
			}
		});
	}
}

// 비밀번호 유효성 확인
function isValidFormPassword(pw) {
	var check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
	
	if (pw.length < 8 || pw.length > 16) {
		alert(getUIMessage('U1000026'));
		return false;
	}
	if (!check.test(pw))	 {
		alert(getUIMessage('U1000027'));
		return false;
	}
	
	return true;
}

jQuery.download = function(url, data, method){
	// url과 data를 입력받음
	if( url && data ){ 
		// data 는  string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 파라미터를 form의  input으로 만든다.
		var inputDatas = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputDatas+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
		});
		// request를 보낸다.
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+ decodeURI(inputDatas)+'</form>')
		.appendTo('body').submit().remove();
	};
};