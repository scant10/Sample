var sample2 = $a.page(function() {
	this.init = function() {
		// TO-DO Initialize
	};
	
	this.makeCmmCdSelect = function(options) {
		$a.request('/sample2/cmmcd', {
			data: {grpCd: 'CM001'},
			success: function(res) {
				return createCmmCdSelect(res, options);
			}
		});
	};
	
	function createCmmCdSelect(cmmCds, options) {
		var cmmCd1 = cmmCds.filter(function(item) {
			return item.depth === 1;
		});
		
		var cmmCd2 = cmmCds.filter(function(item) {
			return item.depth === 2;
		});
		
		var cmmCd3 = cmmCds.filter(function(item) {
			return item.depth === 3;
		});
		
		var tdata = {cmmCd: '', cmmNm: '선택'};
		cmmCd1.unshift(tdata);
		
		$('.cmmcd-depth-1, .cmmcd-depth-2, .cmmcd-depth-3').each(function() {
			$(this).attr('data-bind-option', 'cmmCd: cmmNm');
			$(this).attr('data-bind', 'options: data, selectedOptions: ' + $(this).attr('id'));
		});
		
		$('.cmmcd-depth-1').setData({data: cmmCd1});
		$('.cmmcd-depth-2, .cmmcd-depth-3').setData({data: [tdata]});
		
		$('.cmmcd-depth-1').change(function() {
			var selected = $(this).val();
			var depth2 = cmmCd2.filter(function(item) {
				return item.parentCd === selected;
			});
			
			depth2.unshift(tdata);
			
			var $parentEl = $(this).parent();
			var $depth2El = $($parentEl.children('select')[1]);
			$depth2El.setData({data: depth2});
			
			var $depth3El = $($parentEl.children('select')[2]);
			$depth3El.setData({data: [tdata]});
		});
		
		$('.cmmcd-depth-2').change(function() {
			var selected = $(this).val();
			var depth3 = cmmCd3.filter(function(item) {
				return item.parentCd === selected;
			});
			
			depth3.unshift(tdata);
			
			var $parentEl = $(this).parent();
			var $depth3El = $($parentEl.children('select')[2]);
			$depth3El.setData({data: depth3});
		});
		
		if (options != undefined) {
			var _cmmCd3 = cmmCd3.filter(function(item) {
				return item.cmmCd === options.value;
			})[0];
			
			var _cmmCd2 = cmmCd2.filter(function(item) {
				return item.cmmCd === _cmmCd3.parentCd;
			})[0];
			
			var _cmmCd1 = cmmCd1.filter(function(item) {
				return item.cmmCd === _cmmCd2.parentCd;
			})[0];
			
			var $parentEl = $(options.selector);
			
			var $depth1El = $($parentEl.children('select')[0]);
			$depth1El.setSelected(_cmmCd1.cmmCd);
			
			var $depth2El = $($parentEl.children('select')[1]);
			$depth2El.setSelected(_cmmCd2.cmmCd);
			
			var $depth3El = $($parentEl.children('select')[2]);
			$depth3El.setSelected(_cmmCd3.cmmCd);
		}
	}
});
