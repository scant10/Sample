$a.page(function() {
	//파일업로드 공통 설정
	$a.setup('fileupload', {
		url : 'http://loclahost/upload' //실제 사용할 url을 설정하세요.
	});
	
	var data = [
    	{
    		"name": "Vera",
    		"phone": "138-955-8109",
    		"email": "eu.odio@maurisblanditmattis.ca",
    		"birthday": "2015-07-18",
    		"zip": "467025",
    		"salary": 787197,
    		"absence": 100,
    		"country": "Bahamas",
    		"city": "Serrungarina",
    		"company": "Suspendisse Dui Fusce PC",
    		"type": 2
    	},
    	{
    		"name": "Autumn",
    		"phone": "369-405-2973",
    		"email": "Quisque@loremsemper.com",
    		"birthday": "2014-05-03",
    		"zip": "370659",
    		"salary": 168857,
    		"absence": 200,
    		"country": "Suriname",
    		"city": "Eigenbrakel",
    		"company": "Nibh Dolor Nonummy LLC",
    		"type": 9
    	},
    	{
    		"name": "Amy",
    		"phone": "693-6192",
    		"email": "sit@egetmagnaSuspendisse.ca",
    		"birthday": "2015-08-06",
    		"zip": "2794",
    		"salary": 235913,
    		"absence": 30,
    		"country": "Cocos (Keeling) Islands",
    		"city": "Chartres",
    		"company": "Tincidunt Consulting",
    		"type": 1
    	},
    	{
    		"name": "Thor",
    		"phone": "569-6512",
    		"email": "parturient.montes.nascetur@imperdietnon.edu",
    		"birthday": "2014-01-17",
    		"zip": "26962",
    		"salary": 853938,
    		"absence": 10,
    		"country": "Spain",
    		"city": "Beho",
    		"company": "Nulla LLC",
    		"type": 10
    	},
    	{
    		"name": "Dakota",
    		"phone": "270-477-0444",
    		"email": "sed.pede@tortordictumeu.edu",
    		"birthday": "2015-06-17",
    		"zip": "7374PU",
    		"salary": 575048,
    		"absence": 10,
    		"country": "Bonaire, Sint Eustatius and Saba",
    		"city": "Yahyalı",
    		"company": "Parturient Montes Nascetur Inc.",
    		"type": 1
    	},
    	{
    		"name": "Cooper",
    		"phone": "610-9420",
    		"email": "placerat.Cras.dictum@eratVivamus.net",
    		"birthday": "2015-07-20",
    		"zip": "73706",
    		"salary": 170683,
    		"absence": 100,
    		"country": "New Caledonia",
    		"city": "Deline",
    		"company": "Nulla Tincidunt Neque Ltd",
    		"type": 2
    	},
    	{
    		"name": "Bethany",
    		"phone": "949-378-7845",
    		"email": "erat@Morbiaccumsanlaoreet.edu",
    		"birthday": "2014-12-16",
    		"zip": "83245-257",
    		"salary": 998642,
    		"absence": 89,
    		"country": "Poland",
    		"city": "Milwaukee",
    		"company": "Vel Sapien Company",
    		"type": 1
    	},
    	{
    		"name": "Ronan",
    		"phone": "503-6165",
    		"email": "pellentesque@egestasDuisac.co.uk",
    		"birthday": "2015-03-23",
    		"zip": "1124",
    		"salary": 38416,
    		"absence": 65,
    		"country": "Aruba",
    		"city": "Calgary",
    		"company": "Donec PC",
    		"type": 7
    	},
    	{
    		"name": "Lamar",
    		"phone": "244-4542",
    		"email": "enim.sit@nonarcu.com",
    		"birthday": "2015-07-29",
    		"zip": "18214",
    		"salary": 106591,
    		"absence": 4,
    		"country": "Palau",
    		"city": "Portland",
    		"company": "Tristique Pharetra Quisque Corp.",
    		"type": 4
    	},
    	{
    		"name": "Gisela",
    		"phone": "203-196-7156",
    		"email": "porttitor.tellus@Sed.org",
    		"birthday": "2014-03-20",
    		"zip": "587048",
    		"salary": 255047,
    		"absence": 100,
    		"country": "Italy",
    		"city": "Aberystwyth",
    		"company": "Augue Eu Tempor Associates",
    		"type": 6
    	},
    	{
    		"name": "Nolan",
    		"phone": "694-889-2611",
    		"email": "Etiam.laoreet.libero@Aliquamadipiscing.ca",
    		"birthday": "2014-07-10",
    		"zip": "74-869",
    		"salary": 205358,
    		"absence": 30,
    		"country": "Gambia",
    		"city": "Coldstream",
    		"company": "Ac Fermentum Vel PC",
    		"type": 7
    	},
    	{
    		"name": "Vera",
    		"phone": "138-955-8109",
    		"email": "eu.odio@maurisblanditmattis.ca",
    		"birthday": "2015-07-18",
    		"zip": "467025",
    		"salary": 787197,
    		"absence": 6,
    		"country": "Bahamas",
    		"city": "Serrungarina",
    		"company": "Suspendisse Dui Fusce PC",
    		"type": 2
    	},
    	{
    		"name": "Autumn",
    		"phone": "369-405-2973",
    		"email": "Quisque@loremsemper.com",
    		"birthday": "2014-05-03",
    		"zip": "370659",
    		"salary": 168857,
    		"absence": 100,
    		"country": "Suriname",
    		"city": "Eigenbrakel",
    		"company": "Nibh Dolor Nonummy LLC",
    		"type": 9
    	},
    	{
    		"name": "Amy",
    		"phone": "693-6192",
    		"email": "sit@egetmagnaSuspendisse.ca",
    		"birthday": "2015-08-06",
    		"zip": "2794",
    		"salary": 235913,
    		"absence": 40,
    		"country": "Cocos (Keeling) Islands",
    		"city": "Chartres",
    		"company": "Tincidunt Consulting",
    		"type": 1
    	},
    	{
    		"name": "Thor",
    		"phone": "569-6512",
    		"email": "parturient.montes.nascetur@imperdietnon.edu",
    		"birthday": "2014-01-17",
    		"zip": "26962",
    		"salary": 853938,
    		"absence": 100,
    		"country": "Spain",
    		"city": "Beho",
    		"company": "Nulla LLC",
    		"type": 10
    	},
    	{
    		"name": "Dakota",
    		"phone": "270-477-0444",
    		"email": "sed.pede@tortordictumeu.edu",
    		"birthday": "2015-06-17",
    		"zip": "7374PU",
    		"salary": 575048,
    		"absence": 100,
    		"country": "Bonaire, Sint Eustatius and Saba",
    		"city": "Yahyalı",
    		"company": "Parturient Montes Nascetur Inc.",
    		"type": 1
    	},
    	{
    		"name": "Cooper",
    		"phone": "610-9420",
    		"email": "placerat.Cras.dictum@eratVivamus.net",
    		"birthday": "2015-07-20",
    		"zip": "73706",
    		"salary": 170683,
    		"absence": 10,
    		"country": "New Caledonia",
    		"city": "Deline",
    		"company": "Nulla Tincidunt Neque Ltd",
    		"type": 2
    	},
    	{
    		"name": "Bethany",
    		"phone": "949-378-7845",
    		"email": "erat@Morbiaccumsanlaoreet.edu",
    		"birthday": "2014-12-16",
    		"zip": "83245-257",
    		"salary": 998642,
    		"absence": 10,
    		"country": "Poland",
    		"city": "Milwaukee",
    		"company": "Vel Sapien Company",
    		"type": 1
    	},
    	{
    		"name": "Ronan",
    		"phone": "503-6165",
    		"email": "pellentesque@egestasDuisac.co.uk",
    		"birthday": "2015-03-23",
    		"zip": "1124",
    		"salary": 38416,
    		"absence": 80,
    		"country": "Aruba",
    		"city": "Calgary",
    		"company": "Donec PC",
    		"type": 7
    	},
    	{
    		"name": "Lamar",
    		"phone": "244-4542",
    		"email": "enim.sit@nonarcu.com",
    		"birthday": "2015-07-29",
    		"zip": "18214",
    		"salary": 106591,
    		"absence": 100,
    		"country": "Palau",
    		"city": "Portland",
    		"company": "Tristique Pharetra Quisque Corp.",
    		"type": 4
    	},
    	{
    		"name": "Gisela",
    		"phone": "203-196-7156",
    		"email": "porttitor.tellus@Sed.org",
    		"birthday": "2014-03-20",
    		"zip": "587048",
    		"salary": 255047,
    		"absence": 60,
    		"country": "Italy",
    		"city": "Aberystwyth",
    		"company": "Augue Eu Tempor Associates",
    		"type": 6
    	},
    	{
    		"name": "Nolan",
    		"phone": "694-889-2611",
    		"email": "Etiam.laoreet.libero@Aliquamadipiscing.ca",
    		"birthday": "2014-07-10",
    		"zip": "74-869",
    		"salary": 205358,
    		"absence": 40,
    		"country": "Gambia",
    		"city": "Coldstream",
    		"company": "Ac Fermentum Vel PC",
    		"type": 7
    	},
    	{
    		"name": "Vera",
    		"phone": "138-955-8109",
    		"email": "eu.odio@maurisblanditmattis.ca",
    		"birthday": "2015-07-18",
    		"zip": "467025",
    		"salary": 787197,
    		"absence": 50,
    		"country": "Bahamas",
    		"city": "Serrungarina",
    		"company": "Suspendisse Dui Fusce PC",
    		"type": 2
    	},
    	{
    		"name": "Autumn",
    		"phone": "369-405-2973",
    		"email": "Quisque@loremsemper.com",
    		"birthday": "2014-05-03",
    		"zip": "370659",
    		"salary": 168857,
    		"absence": 100,
    		"country": "Suriname",
    		"city": "Eigenbrakel",
    		"company": "Nibh Dolor Nonummy LLC",
    		"type": 9
    	},
    	{
    		"name": "Amy",
    		"phone": "693-6192",
    		"email": "sit@egetmagnaSuspendisse.ca",
    		"birthday": "2015-08-06",
    		"zip": "2794",
    		"salary": 235913,
    		"absence": 100,
    		"country": "Cocos (Keeling) Islands",
    		"city": "Chartres",
    		"company": "Tincidunt Consulting",
    		"type": 1
    	},
    	{
    		"name": "Thor",
    		"phone": "569-6512",
    		"email": "parturient.montes.nascetur@imperdietnon.edu",
    		"birthday": "2014-01-17",
    		"zip": "26962",
    		"salary": 853938,
    		"absence": 10,
    		"country": "Spain",
    		"city": "Beho",
    		"company": "Nulla LLC",
    		"type": 10
    	},
    	{
    		"name": "Dakota",
    		"phone": "270-477-0444",
    		"email": "sed.pede@tortordictumeu.edu",
    		"birthday": "2015-06-17",
    		"zip": "7374PU",
    		"salary": 575048,
    		"absence": 10,
    		"country": "Bonaire, Sint Eustatius and Saba",
    		"city": "Yahyalı",
    		"company": "Parturient Montes Nascetur Inc.",
    		"type": 1
    	},
    	{
    		"name": "Cooper",
    		"phone": "610-9420",
    		"email": "placerat.Cras.dictum@eratVivamus.net",
    		"birthday": "2015-07-20",
    		"zip": "73706",
    		"salary": 170683,
    		"absence": 100,
    		"country": "New Caledonia",
    		"city": "Deline",
    		"company": "Nulla Tincidunt Neque Ltd",
    		"type": 2
    	},
    	{
    		"name": "Bethany",
    		"phone": "949-378-7845",
    		"email": "erat@Morbiaccumsanlaoreet.edu",
    		"birthday": "2014-12-16",
    		"zip": "83245-257",
    		"salary": 998642,
    		"absence": 1,
    		"country": "Poland",
    		"city": "Milwaukee",
    		"company": "Vel Sapien Company",
    		"type": 1
    	}
    ];
    // 초기화 함수
    this.init = function(id, param) {
        gridInit();
    };
    function gridInit(){
    	
    	// 그리드 공통 설정 
    	AlopexGrid.setup({
    		fitTableWidth : true // 테이블의 너비를 그리드 너비에 맞춰 확장시키는 옵션
    	});
    	
    	$('#gr').alopexGrid({
    		pager: true,
    		paging: {
    			perPage: 10,
    			pagerCount: 5,
    			pagerSelect: true
    		},
    		autoColumnIndex: true,
    		columnMapping : [
    			{
    				align : 'center',
    				key : 'check',
    				width : '30px',
    				selectorColumn : true
    			}, {
    				key : 'name',
    				title : 'name',
    				width : '100px'
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : '100px'
    			}, {
    				key : 'email',
    				title : 'email',
    				width : '250px'
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : '100px'
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : '100px'
    			}, {
    				align : 'right',
    				key : 'salary',
    				title : 'salary',
    				width : '100px'
    			}, {
    				key : 'country',
    				title : 'country',
    				width : '200px'
    			}, {
    				key : 'city',
    				title : 'city',
    				width : '150px'
    			}, {
    				key : 'company',
    				title : 'company',
    				width : '200px'
    			}, {
    				key : 'type',
    				align: 'center',
    				title : 'type',
    				width : '50px'
    			}
    		],
    		data: data
    	});
    	
    	$('#gr2').alopexGrid({
    		height: 200,
    		autoColumnIndex: true,
    		columnMapping : [
    			{
    				align : 'center',
    				width : 30,
    				numberingColumn : true
    			}, {
    				key : 'name',
    				title : 'name',
    				width : 100
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : 100
    			}, {
    				key : 'email',
    				title : 'email',
    				width : 250
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : 100
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : 100
    			}
    		],
    		data: data
    	});
    	$('#gr3').alopexGrid({
    		height: 300,
    		autoColumnIndex: true,
    		columnMapping : [
    			{
    				align : 'center',
    				width : 30,
    				numberingColumn : true
    			}, {
    				key : 'name',
    				title : 'name',
    				width : 100
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : 100
    			}, {
    				key : 'email',
    				title : 'email',
    				width : 250
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : 100
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : 100
    			}
    		],
    		data: data
    	});
    	$('#gr-footer').alopexGrid({
    		height: 228,
    		footer : {
    			position : "bottom",
    			footerMapping : [
    				{columnIndex:1,render:"총원", align: "center"},
    				{columnIndex:2,render:"getValue(SERVER_TOTAL)", align: "right"},
    				{columnIndex:3,render:["월급 총합 ","sum(salary)"], align : "right"},
    				{columnIndex:5,title:"월급 평균",align:"center"},
    				{columnIndex:6,render:"average(salary)",align:"right", key: "AVE_DATA"},
    				{columnIndex:7,render:"방문횟수", align: "center"},
    				{columnIndex:8,render:"getValue(TRAVEL_TOTAL)", align: "right"}
    			]
    		},
    		autoColumnIndex: true,
    		columnMapping : [
    			{
    				align : 'center',
    				key : 'check',
    				width : '30px',
    				selectorColumn : true
    			}, {
    				key : 'name',
    				title : 'name',
    				width : '100px'
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : '100px'
    			}, {
    				key : 'email',
    				title : 'email',
    				width : '250px'
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : '100px'
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : '100px'
    			}, {
    				align : 'right',
    				key : 'salary',
    				title : 'salary',
    				width : '100px'
    			}, {
    				key : 'country',
    				title : 'country',
    				width : '200px'
    			}, {
    				key : 'city',
    				title : 'city',
    				width : '150px'
    			}, {
    				key : 'company',
    				title : 'company',
    				width : '200px'
    			}, {
    				key : 'type',
    				align: 'center',
    				title : 'type',
    				width : '50px'
    			}
    		],
    		data: data
    	});
    	$('#gr-hidden').alopexGrid({
    		pager: true,
    		paging: {
    			perPage: 5,
    			pagerCount: 5,
    			pagerTotal: true
    		},
    		
    		height: 400,
    		autoColumnIndex: true,
    		hiddenColumnArea: "숨길 컬럼을 여기로 드래그 해주십시오",
    		filteringHeader: true,
    		disableTextSelection: true,
    		filteringHeaderHeight: 15,
    		defaultColumnMapping : {
    			resizing: true,
    			headerDragDrop: true,
    			sorting:true
    		},
    		headerGroup: [
    		   			{fromIndex:1, toIndex:2, title:"Personal Info"},
    		   			{fromIndex:3, toIndex:5, title:"Extra Info"}
    		   		],
    		columnMapping : [
    			{
    				selectorColumn : true,
    				width : '30px'
    			}, {
    				key : 'name',
    				title : 'name',
    				width : '100px'
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : '100px'
    			}, {
    				key : 'email',
    				title : 'email',
    				width : '250px'
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : '100px'
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : '100px'
    			}, {
    				align : 'right',
    				key : 'salary',
    				title : 'salary',
    				width : '100px'
    			}, {
    				key : 'country',
    				title : 'country',
    				width : '200px'
    			}, {
    				key : 'city',
    				title : 'city',
    				width : '150px'
    			}, {
    				key : 'company',
    				title : 'company',
    				width : '200px'
    			}, {
    				key : 'type',
    				align: 'center',
    				title : 'type',
    				width : '50px'
    			}
    		],
    		data: data
    	});
    	$('#gr-hidden2').alopexGrid({
    		height: 400,
    		autoColumnIndex: true,
    		hiddenColumnArea: "숨길 컬럼을 여기로 드래그 해주십시오",
    		filteringHeader: true,
    		filteringHeaderHeight: 15,
    		disableTextSelection: true,
    		defaultColumnMapping : {
    			resizing: true,
    			headerDragDrop: true,
    			sorting:true
    		},
    		columnMapping : [
    			{
    				selectorColumn : true,
    				width : '30px'
    			}, {
    				key : 'name',
    				title : 'name',
    				width : '100px'
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : '100px'
    			}, {
    				key : 'email',
    				title : 'email',
    				width : '250px'
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : '100px'
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : '100px'
    			}, {
    				align : 'right',
    				key : 'salary',
    				title : 'salary',
    				width : '100px'
    			}, {
    				key : 'country',
    				title : 'country',
    				width : '200px'
    			}, {
    				key : 'city',
    				title : 'city',
    				width : '150px'
    			}, {
    				key : 'company',
    				title : 'company',
    				width : '200px'
    			}, {
    				key : 'type',
    				align: 'center',
    				title : 'type',
    				width : '50px'
    			}
    		],
    		data: data
    	});
    	$('#gr-hidden3').alopexGrid({
    		height: 400,
    		autoColumnIndex: true,
    		hiddenColumnArea: "숨길 컬럼을 여기로 드래그 해주십시오",
    		filteringHeader: true,
    		filteringHeaderHeight: 15,
    		disableTextSelection: true,
    		defaultColumnMapping : {
    			resizing: true,
    			headerDragDrop: true,
    			sorting:true
    		},
    		columnMapping : [
    			{
    				selectorColumn : true,
    				width : '30px'
    			}, {
    				key : 'name',
    				title : 'name',
    				width : '100px'
    			}, {
    				key : 'phone',
    				title : 'phone',
    				width : '100px'
    			}, {
    				key : 'email',
    				title : 'email',
    				width : '250px'
    			}, {
    				align : 'center',
    				key : 'birthday',
    				title : 'birthday',
    				width : '100px'
    			}, {
    				align : 'center',
    				key : 'zip',
    				title : 'zip',
    				width : '100px'
    			}, {
    				align : 'right',
    				key : 'salary',
    				title : 'salary',
    				width : '100px'
    			}, {
    				key : 'country',
    				title : 'country',
    				width : '200px'
    			}, {
    				key : 'city',
    				title : 'city',
    				width : '150px'
    			}, {
    				key : 'company',
    				title : 'company',
    				width : '200px'
    			}, {
    				key : 'type',
    				align: 'center',
    				title : 'type',
    				width : '50px'
    			}
    		],
    		data: data
    	});
    	
    	var treedata = [
    	        	{
    	        		"NODE_ID" : "1",
    	        		"PARENT_NODE_ID" : "",
    	        		"MENU_NAME" : "그룹1"
    	        	},
    	        		{
    	        			"NODE_ID" : "1A0",
    	        			"PARENT_NODE_ID" : "1",
    	        			"MENU_NAME" : "소그룹1"
    	        		},
    	        		{
    	        			"NODE_ID" : "1A1",
    	        			"PARENT_NODE_ID" : "1",
    	        			"MENU_NAME" : "소그룹2"
    	        		},

    	        	{
    	        		"NODE_ID" : "2",
    	        		"PARENT_NODE_ID" : "",
    	        		"MENU_NAME" : "그룹2",
    	        		"NODE_EXPANDED" : "true"
    	        	},
    	        		{
    	        			"NODE_ID" : "2A1",
    	        			"PARENT_NODE_ID" : "2",
    	        			"MENU_NAME" : "소그룹1"
    	        		},
    	        		{
    	        			"NODE_ID" : "2A2",
    	        			"PARENT_NODE_ID" : "2",
    	        			"MENU_NAME" : "소그룹2"
    	        		},
    	        		{
    	        			"NODE_ID" : "2A3",
    	        			"PARENT_NODE_ID" : "2",
    	        			"MENU_NAME" : "소그룹3"
    	        		},
    	        			{
    	        				"NODE_ID" : "2A3A1",
    	        				"PARENT_NODE_ID" : "2A3",
    	        				"MENU_NAME" : "멤버1"
    	        			},
    	        				{
    	        					"NODE_ID" : "2A3A1A1",
    	        					"PARENT_NODE_ID" : "2A3A1",
    	        					"MENU_NAME" : "소지품1"
    	        				},
    	        				{
    	        					"NODE_ID" : "2A3A1A2",
    	        					"PARENT_NODE_ID" : "2A3A1",
    	        					"MENU_NAME" : "소지품2"
    	        				},
    	        				{
    	        					"NODE_ID" : "2A3A1A3",
    	        					"PARENT_NODE_ID" : "2A3A1",
    	        					"MENU_NAME" : "소지품3"
    	        				},
    	        				{
    	        					"NODE_ID" : "2A3A1A4",
    	        					"PARENT_NODE_ID" : "2A3A1",
    	        					"MENU_NAME" : "소지품4"
    	        				},
    	        				{
    	        					"NODE_ID" : "2A3A1A5",
    	        					"PARENT_NODE_ID" : "2A3A1",
    	        					"MENU_NAME" : "소지품5"
    	        				},
    	        			{
    	        				"NODE_ID" : "2A3A2",
    	        				"PARENT_NODE_ID" : "2A3",
    	        				"MENU_NAME" : "멤버2"
    	        			},

    	        		{
    	        			"NODE_ID" : "2A4",
    	        			"PARENT_NODE_ID" : "2",
    	        			"MENU_NAME" : "소그룹4"
    	        		},

    	        	{
    	        		"NODE_ID" : "3",
    	        		"PARENT_NODE_ID" : "",
    	        		"MENU_NAME" : "그룹3"
    	        	}
    	        ];
    	
    	$("#gr-tree").alopexGrid({
    		autoColumnIndex : true,
    		height : 400,
    		disableTextSelection : true,
    		header: false,
    		columnMapping : [
    			{ 
    				key : "MENU_NAME", 
    				width : 150,
    				treeColumn : true, 
    				treeColumnHeader : false
    			}
    		],
    		tree : {
    			useTree : true,
    			idKey : "NODE_ID", //노드를 지시하는 유일한 값이 저장된 키값
    			parentIdKey : "PARENT_NODE_ID", //자신의 상위(parent) 노드를 지시하는 ID가 저장된 키값
    			expandedKey : "NODE_EXPANDED" //데이터가 그리드에 입력되는 시점에 초기 펼쳐짐 여부를 저장하고 있는 키값

    			//노드의 초기 펼쳐짐 여부를 인식하는 값의 형태는 expandedValue 옵션에 저장되어 있으며
    			//다른 형태의 값을 사용해야 한다면 이 옵션값을 변경하십시오. 순서대로 펼쳐짐/닫힘 입니다.
    			//expandedValue : ["true", "false"]

    			//최 상위 노드들의 parentIdKey 에 지정되어야 하는 값.
    			//rootNodeParentIdValue : ""
    		},
    		data : treedata
    	});

    	//dialog layout start
    	$('#dialog-layout1').click(function() {
    		$('#div-dialog').open({
    			title : "팝업타이틀",
    			width : 1000,    			
    			height : 700,
				resize:true,
				movable:true
    		});
    		$("#gr3").alopexGrid( "viewUpdate" );
    	});

		//alert
    	$('#dialog-alert').click(function() {
    		$('#div-dialog-alert').open({
    			title : "Alert Title",
    			width : 430,
    			height : 280,
				movable:true
    		});
    		$("#gr3").alopexGrid( "viewUpdate" );
    	});
    	
    	//아이프레임
    	$('#iframe-window').click( function() {
    	     $a.popup({
    	    	   title: "iframe window popup",
    	           url: "../sample/popup-iframe.html", // 팝업에 표시될 HTML
    			   iframe: true, // default
				   width : 1000,
     			   height : 700,
				   movable:true
    	    });
    	 });

		 //아이프레임2 
    	$('#iframe-window2').click( function() {
    	     $a.popup({
    	    	   title: "iframe window popup",
    	           url: "../sample/popup-iframe.html", // 팝업에 표시될 HTML
    			   iframe: true, // default
				   width : 700,
     			   height : 500,
				   movable:true
    	    });
    	 });
		
		//윈도우
    	$('#popup-window').click( function() {
    	     $a.popup({
    	         url: "../sample/popup-window.html", // 팝업에 표시될 HTML
    	         windowpopup: true,
    	         other: "top=50%,left=50%,scrollbars=no",
    	         width : 1000,
     			 height : 700
 	   	    });
 	   	 });
    	
    };
   
});