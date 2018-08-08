/**
 *
 */

$a.page(function(){
	this.init = function(){

		var deleteHandler = function(e){
			var target = e.target;
			$(target).closest("tr").remove();
		};

		$("[data-action=add]").on('click', function(e){
			var $clone = $("#searchTable tr:last").clone();
			$clone.find(".Button").first().hide();
			$clone.find("th").text("");
			console.log($clone.find("[data-action=delete]"));
			$clone.find("[data-action=delete]").on('click', deleteHandler);
			$("#searchTable").find("tbody").append($clone[0]);
		});

		$("[data-action=delete]").on('click', deleteHandler);

		$("#expandBtn").on('click', function(e){
			var $a = $(e.target);
			if( $a.hasClass("btn-close")){
				$("#searchTable tr").not(":first").hide();
				$("#initBtn").hide();
				$a.removeClass("btn-close").addClass("btn-open");
			} else {
				$("#searchTable tr").not(":first").show();
				$("#initBtn").show();
				$a.removeClass("btn-open").addClass("btn-close");
			}
		});
        
/*파일업로드 공통 설정은 script/app/alopex-common.js 에서 설정 가능합니다.*/
		
		//파일업로드 개별 설정(멀티)
		var uploadObjA = $("#fileuploaderA").setOptions({
			fileName : 'uploadMultiFiles',
			dragDrop:true,
			onError : function (files, status, message, pd) {
				console.log(files)
				console.log(status)
				console.log(message)
				console.log(pd)
			},
			deleteCallback: function (data, pd) {
			       console.log(data)
			    

			},
			downloadCallback:function(filename,pd)
				{
					console.log(filename)
				}
		});
		
		$("#startUploadA").on('click', function(){
			$("#fileuploaderA").startUpload();
		});

		$("#stopUploadA").on('click', function(){
			$("#fileuploaderA").stopUpload();
		});

		$("#cancelAllA").on('click', function(){
			$("#fileuploaderA").cancelAll();
		});
		
		//파일업로드 개별 설정(싱글)
		var uploadObjB = $("#fileuploaderB").setOptions({
			fileName : 'uploadSingleFile',
			onError : function (files, status, message, pd) {
				console.log(files)
				console.log(status)
				console.log(message)
				console.log(pd)
			},
			onSuccess:function(files,data,xhr,pd)
			{
				console.log(files);
				console.log(data);
			}
		});
		 $("#startUploadB").on('click', function(){
     		$("#fileuploaderB").startUpload();
	     });
	}
});
