$(document).ready(function(){	

	//left menu open close: sub에만 적용
	var lnbWrap = $('.spms-lnb__title > a');
	$(lnbWrap).click(function(e){
		e.preventDefault();

		if(lnbWrap.hasClass('lnb-close')){
			$(this).prev().hide().parent().siblings().hide();
			$(this).parent().parent().addClass('close');
			$(this).removeClass('lnb-close').addClass('lnb-open');
			$(this).text('메뉴열기');
		}else if(lnbWrap.hasClass('lnb-open')){
			$(this).parent().parent().removeClass('close');
			$(this).prev().show().parent().siblings().show();
			$(this).removeClass('lnb-open').addClass('lnb-close');
			$(this).text('메뉴닫기');
		};

		$('.alopexgrid').alopexGrid('viewUpdate');
	});
	
	//left sub menu toggle
	var lnbSub = $('.lnb-main > li');
	$(lnbSub).find('.lnb-sub').parent().addClass('expandable');
	
	if($(lnbSub).hasClass('expandable')){
		var lnbSubExpand = $('.lnb-main > li.expandable > a');
		$(lnbSubExpand).click(function(e){
			e.preventDefault();
			$(this).parent().find('.lnb-sub').slideToggle();
			$(this).parent().toggleClass('expanded');
			$(this).toggleClass('selected');
		});
	}; 	
	
	//메인 아코디언	
	$('.accordion > dd').hide();		
	//$('.accordion > dd:first-of-type').show();
	//$('.accordion > dt:first-of-type').addClass('accordion-active');	

	$('.actionBtn').on('click', function () {			
		$(this).parent().toggleClass('accordion-active');
		$(this).parent().next().slideToggle("fast").parent().siblings().children("dd").hide();
		$('.alopexgrid').alopexGrid('viewUpdate');
		return false;
		
	});	

});
