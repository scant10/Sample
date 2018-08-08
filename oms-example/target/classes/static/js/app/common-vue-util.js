Vue.config.devtools = false;

Vue.directive('code', {
	bind: function (el, binding, vnode) {
		
		$.ajax({
	        url : '/sample1/api/getSample1Codes',
	        type : 'post',
	        dataType : 'json',
	        data : binding.value.code,
	        async : false,
	        contentType : 'application/json; charset=UTF-8',
	        success : function(res) {
	        	el.data = res;
        		
        		var option = '';
        		
        		if(binding.value.type === 'select'){
        			option += '<el-option value="" >선택</option>';
        		}else if(binding.value.type === 'all'){
        			option += '<el-option value="" >전체</option>';
        		} 
        		
        		$.each(el.data, function(index, item){
        			option += '<el-option value="' + item.codeValue + '" >' + item.codeName+ '</option>';
        		});
        		
        		el.innerHTML = option;
	        }
	    });
	}
})

Vue.directive('code-parent', {
	update: function (el, binding, vnode) {
		
		if(binding.value === binding.oldValue){
			return;
		}

		var modelExpression = '';
		var value = '';
		var type = '';
		
		$.each(vnode.data.directives, function(index, item){
			if(item.name === 'model'){
				value = item.value;
				modelExpression = item.expression;
			}
			if(item.name === 'code'){
				type = item.value.type;
			}
		});
		
		$(el).empty();
		
		var option = '';
		
		if(type === 'select'){
			option += '<option value="" >선택</option>';
		}else if(type === 'all'){
			option += '<option value="" >전체</option>';
		}
		
		$.each(el.data, function(index, item){
			if(item.parentCodeValue	=== binding.value){
				option += '<option value="' + item.codeValue + '" >' + item.codeName+ '</option>';
			}
		});
		
		el.innerHTML = option;
		
		if(binding.oldValue !== undefined){
			$.each(vm.$data, function (index, item){
				if(index === modelExpression.split('.')[0]){
					item[modelExpression.split('.')[1]] = $($(el).children()[0]).val();
				}
			});
		}
	}
});

Vue.directive('disabled', {
	update: function (el, binding, vnode) {
		console.log('disabled');
		
		$(el.children[0]).removeClass('is-disabled');
		
		var ti = $(el.children[0]).children('input')[0];
		$(ti).removeAttr('disabled');
		
		if(binding.value){
			$(el.children[0]).toggleClass('is-disabled');
			$(ti).attr('disabled', 'disabled');
		}
	}
});

Vue.directive('on', { 
	bind: function (el, binding, vnode) {
		console.log('asdf bind');
		el = el.children[0];
	}
});
