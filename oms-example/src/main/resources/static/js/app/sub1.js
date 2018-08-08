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

	}
});
