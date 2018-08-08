/**
 * site validation utility
 */
(function ($) {
	$VAL_UTIL = {
		validation: function(isLimit) {
			// Validate 공통함수
			var args = arguments;
			var validator =null;
			var errorObj, objTxt;
			var errorStr = "", errorMessages = null;
			var isBreak = false;
			
			$.each(args,function(idx,itm){
				var frmId = itm;
				var msgStr = "";
				validator = $(frmId).validator();
				errorMessages = validator.getErrorMessage();
				for(var objNm in errorMessages) {
					
					if(!errorObj) {
						errorObj = $(frmId + " [name=" + objNm + "]");
					}
					
					/*objTxt = $(frmId + " [for=" + objNm + "]").text();
					if(!objTxt) {objTxt = objNm;}*/
					
					objTxt = $(frmId + " [name=" + objNm + "]").attr('data-alias');
					if(!objTxt) {
						objTxt = objNm;
					}
					
					for(var idx = 0; idx < errorMessages[objNm].length; idx++) {
						if(errorMessages[objNm].length > 1){
							if(idx == 0){
								msgStr += "\n" + errorMessages[objNm][idx];
							}else if(idx > 0){
								msgStr += "\n" + errorMessages[objNm][idx] + "\n\n";
							}	
						}else{
							msgStr = "\n" + errorMessages[objNm][idx] + "\n\n";
						}
					}
					errorStr += objTxt + ": " + msgStr;
					if(isLimit && errorStr != ""){
						isBreak = true;
						break;
					}
				}
				
				if(isBreak){
					return false;
				}
			});
			
			if(errorStr != "") {
 				errorObj.focus();
				$COM_UTIL.alertMsg(errorStr);
				return false;
			}
			return true;
		},
		validAllowCnt : function(frmId,allowCnt,msg){
			var validator = $(frmId).validator();
			var errorMessages = validator.getErrorMessage();
			var defValidCnt = $(frmId).find("[data-validation-rule]").length;
			var validCnt = 0;
			
			for(var objNm in errorMessages) {
				validCnt++;
			}
			
			if((defValidCnt - validCnt) < allowCnt){
				if($COM_UTIL.isEmpty(msg)){
					$COM_UTIL.alertMsg("조회조건을 "+allowCnt+"개이상 입력하세요");
					return false;
				}else{
					$COM_UTIL.alertMsg(msg);
					return false;
				}
				
			}
			return true;
			
		}
	};	//end of $VAL_UTIL object
})(jQuery);