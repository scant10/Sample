/**
 * File Upload를 처리하기 위한 메서드.
 * parameter
 * 	form : file input이 포함되어 form전송을 할 form 아이디
 * 	File_url : 파일업로드 처리를 전달할 url주소
 * 	successCallback : 성공 시 처리될 함수
 * 	errorCallback : 실패 시 처리될 함수
*/
function fileUpload(form, File_url, successCallback, errorCallback){
	if (successCallback == undefined)
		successCallback = null;
	if (errorCallback == undefined)
		errorCallback = null;

	var form = $(form);
		
	var fileArr = form.find('[type="file"]');
	if(fileArr == null){
		return false;
	}
	
	form.attr('enctype', 'multipart/form-data'); // form type을 multipart로 변경
	form.find('input[id]:not([name]), select[id]:not([name]), textarea[id]:not([name])').each(function() {
		var $this = form;
		$this.attr('name', $this.attr('id'));
	}); // 모든 id를 name에 넣어줌
	
	var formData = form.formSerialize();
	var setting = {
		url: File_url,
		type: 'POST',
		dataType: 'text',
		data: formData,
		cache:false,
		contentType: false,
		processData: false,
		success : function(data, textStatus, jqXHR){
			data = JSON.parse(data, textStatus, jqXHR);
			successCallback(data);
		},
		error :errorCallback,
		uploadProgress: function() {
		}
	 };

	form.submit(function(){
		form.ajaxSubmit(setting);
		return false;
	});
	form.ajaxSubmit(setting);
}

/**
 * File SeqNo를 토대로 파일정보를 DB에서 읽어온다.
 * parameter
 * 	div : 첨부된 파일을 보여줄 div영역
 * 	fileSeqNo : DB에서 파일을 조회할 fileSeqNo
 * 	deleteOption : delete 버튼 여부 (true : 보여줌, false : 숨김)
*/
function fileDownloadInit(div, fileGuid, deleteOption){
	$a.request('getFileList.json', {
		data: {
			// 파일을 조회하기 위한 file Seq No
			guid: fileGuid
		},
        success: function(res) {
        	var fileList = res.fileList
        	var list = '';
        	for (var i = 0; i < fileList.length; i ++) {
        		var fileObj = fileList[i];
        		var filePath = fileObj.filePath.replace(/\\/g, "/");
        		var downloadPath =  "../../download.json?fileName=" + fileObj.fileName + "&guid=" + fileObj.guid + "&fileId=" + fileObj.fileId;
        		var deleteTag = "<span class=\"Icon Remove\" onclick='$.fn.fileDelete(\"" + fileObj.guid + "\", \"" + fileObj.fileId + "\");' style=\"cursor: pointer;position: relative;\" ></span>";
        		if(deleteOption){
        			list += '<span class=\"Icon Download-alt\" style=\"position: relative;\" ></span><span id="' + fileObj.fileId + '" class=\"Padding-left-10 Padding-right-10\"><a href="' + downloadPath + '">' + fileObj.fileName + '(' + fileObj.fileSize + 'Bytes)</a></span>'+deleteTag+'<br>';
        		}else{
        			list += '<span class=\"Icon Download-alt\" style=\"position: relative;\" ></span><span id="' + fileObj.fileId + '" class=\"Padding-left-10 Padding-right-10\"><a href="' + downloadPath + '">' + fileObj.fileName + '(' + fileObj.fileSize + 'Bytes)</a></span>';
        		}
        	}
            //list += '</ul>';
            $(div).html(list);
        }
    });
}

/**
 * 실제 파일을 삭제
 * parameter
 * 	fileSeqNo : DB에서 파일을 조회할 fileSeqNo
 * 	fileId : 파일 Id
 * 	filePath : 파일 경로
*/
$.fn.fileDelete = function(fileGuid, fileId) {
	if(confirm("파일을 삭제 하시겠습니까?")){
		$a.request('deleteFile.json', {
			data: {
				guid: fileGuid,
				fileId: fileId
			},
			async: false,
			success: function(res) {
				alert('삭제되었습니다.');
				$('#'+fileId).html('');
			}
		});
	}
};
