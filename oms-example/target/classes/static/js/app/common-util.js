/**
 * common utility
 */
var _IS_DEBUG = true;
(function ($) {
	$COM_UTIL = {
		// define global key name
		KEY_MENU_CAT: "MENU_CAT",					// 사용자가 현재 진입한 메뉴 카테고리
		KEY_MENU_LIST: "MENU_LIST",					// 사용자가 현재 진입한 메뉴 목록
		KEY_USER_INFO: "USER_INFO",					// 사용자 정보
		KEY_CTGRY_MENU_AUTH: "CTGRY_MENU_AUTH",		// 사용자 카테고리별 권한 정의 (0: 없음, 1: 업무, 2: 관리, 3: 업무+관리)
		KEY_COST_CENTER: "COST_CENTER",

		SSN_DATA: "SSN_DATA",
		BASE_URL: "SITE_BASE_URL",
		ALL_GRID_ARR: [],
		ROLE_ARR: ['ROLE_ADMIN', 'ROLE_BA', 'ROLE_BP', 'ROLE_COMMON', 'ROLE_GP_ADMIN', 'ROLE_HQ_ADMIN', 'ROLE_RR', 'ROLE_SP_ADMIN', 'ROLE_TEAM_ADMIN', 'ROLE_USER'],
		ROLE_ADMIN: "ROLE_ADMIN",

		/**
		 * 페이지 초기화 함수
		 * 현재는 미사용
		 * @param id : $a.page.init 에서 받은 값
		 * @param param : $a.page.init 에서 받은 값
		 * @return 없음
		 */
		initialize: function(id, param) {
			this.debugLog("initialize() id [" + id + "], param [" + JSON.stringify(param) + "]");

			var menuObj = $COM_UTIL.getSsn($COM_UTIL.KEY_MENU_LIST);
			if(menuObj) {

				var currentUri = $(location).attr('href');
//				$(".ams-history > a").remove();
//				menuObj = JSON.parse(menuObj);
//				for(var idx = 0; idx < menuObj.length; idx++) {
//					if(menuObj[idx].menuId == param.levId1) {
//						$(".ams-history").append('<a href="#" onClick="return false;">' + menuObj[idx].menuName + '</a>');
//					}
//					else if(menuObj[idx].menuId == param.levId2) {
//						$(".ams-history").append(' <a href="#" onClick="return false;">' + menuObj[idx].menuName + '</a>');
//					}
//					else if(menuObj[idx].pageUri != '' && currentUri.indexOf(menuObj[idx].pageUri) > -1) {
//						$(".ams-history").append(' <a href="#" onClick="return false;">' + menuObj[idx].menuName + '</a>');
//					}
//				}

				//사용자 정의 keyFilter set
				this.userDefineKeyFilter();
			}

			$("#expandBtn").on('click', function(e) {
				e.preventDefault();
				var $a = $(e.target);
				var diffHeight = $a.offset().top;
				if( $a.hasClass("btn-close")){
					// 검색 영역 축소
					$("#searchTable tr").not(":first").hide();
					$("#initBtn").hide();
					$a.removeClass("btn-close").addClass("btn-open");
				} else {
					// 검색 영역 확장
					$("#searchTable tr").not(":first").show();
					$("#initBtn").show();
					$a.removeClass("btn-open").addClass("btn-close");
				}
				diffHeight -= $a.offset().top;
				$COM_UTIL.resetElementHeight(diffHeight);
			});

			$("#expandBtn1").on('click', function(e) {
				e.preventDefault();
				var $a = $(e.target);
				var diffHeight = $a.offset().top;
				if( $a.hasClass("btn-close")){
					// 검색 영역 축소
					$('#tab1').find("#searchTable1 tr").not(":first").hide();
					$('#tab1').find("#initBtn1").hide();
					$a.removeClass("btn-close").addClass("btn-open");
				} else {
					// 검색 영역 확장
					$('#tab1').find("#searchTable1 tr").not(":first").show();
					$('#tab1').find("#initBtn1").show();
					$a.removeClass("btn-open").addClass("btn-close");
				}
				diffHeight -= $a.offset().top;
				$COM_UTIL.resetElementHeight(diffHeight);
			});
			$("#expandBtn3").on('click', function(e) {
				e.preventDefault();
				var $a = $(e.target);
				var diffHeight = $a.offset().top;
				if( $a.hasClass("btn-close")){
					// 검색 영역 축소
					$("#searchTable3 tr").not(":first").hide();
					$("#initBtn3").hide();
					$a.removeClass("btn-close").addClass("btn-open");
				} else {
					// 검색 영역 확장
					$("#searchTable3 tr").not(":first").show();
					$("#initBtn3").show();
					$a.removeClass("btn-open").addClass("btn-close");
				}
				diffHeight -= $a.offset().top;
				$COM_UTIL.resetElementHeight(diffHeight);
			});

			// set button
			this.setButtonsBySecLevel();

			// set Masked Input
			this.setMaskedInput();

			// Reset Dateinput Place Holder
			this.resetDatePlaceHolder();
		},
		/**
		 * 검색 영역 확장/축소 에 따른 그리드 높이 조정
		 * @param diffHeight : 높이 변위 값
		 */
		resetElementHeight: function(diffHeight) {
			var controlGridArr = [];
			var gridObj, heightOpt, height, gridRowHeight = 34, topRange = 20, gridObjTop = 10000;

			if($COM_UTIL.isEmpty($COM_UTIL.ALL_GRID_ARR)) {
				// 화면의 전체 그리드 정보 저장
				var gridObjArr = $("DIV[data-bind^='grid']");
				if(gridObjArr.length == 0) {
					return;
				}
				$.each(gridObjArr, function(idx, obj) {
					heightOpt = $("#"+obj.id).alopexGrid("readOption").height;
					if($COM_UTIL.isEmpty(heightOpt)) {
						return;
					}
					$COM_UTIL.ALL_GRID_ARR.push({gridId: obj.id, heightOpt: heightOpt});
				});
				$COM_UTIL.debugLog("ALL_GRID_ARR: " + JSON.stringify($COM_UTIL.ALL_GRID_ARR));
			}

			// 화면에 보이는 그리드 대상으로 control할 그리드 목록 조회
			$COM_UTIL.ALL_GRID_ARR.forEach(function(gridObj) {
				$.each($("#"+gridObj.gridId), function(idx, obj) {
					var $obj = $(obj);
					if(!$obj.is(":visible")) {
						return;
					}
					if(Math.abs(gridObjTop - $obj.offset().top) < topRange) {
						// 동일 위치 grid
					}
					else if($obj.offset().top < gridObjTop) {
						// 새로운 상위 grid
						controlGridArr = [];
						gridObjTop = $obj.offset().top;
					}
					else {
						return;
					}
					controlGridArr.push({gridId: obj.id});
				});
			});

			$COM_UTIL.debugLog("controlGridArr: " + JSON.stringify(controlGridArr));
			if(controlGridArr.length == 0) {
				return;
			}

			// 그리드 높이 조정
			controlGridArr.forEach(function(gridObj) {
				for(var idx = 0; idx < $COM_UTIL.ALL_GRID_ARR.length; idx++) {
					if(gridObj.gridId == $COM_UTIL.ALL_GRID_ARR[idx].gridId) {
						heightOpt = $COM_UTIL.ALL_GRID_ARR[idx].heightOpt;
					}
				}

				if(diffHeight > 0) {
					// 검색 영역 축소
					if(typeof heightOpt === 'number') {
						height = heightOpt + diffHeight;
						$('#'+gridObj.gridId).alopexGrid('updateOption', {height : height});
						$COM_UTIL.debugLog("gridId: " + gridObj.gridId + ", height: " + height);
					}
					else if(typeof heightOpt === 'string') {
						if(heightOpt.indexOf("row") != -1) {
							height = parseInt(heightOpt.substring(0, heightOpt.indexOf("row")));
							var addRow = parseInt(diffHeight / gridRowHeight);
							if(addRow == 0) {
								addRow = 1;
							}
							height += addRow;
							$('#'+gridObj.gridId).alopexGrid('updateOption', {height : height + 'row'});
							$COM_UTIL.debugLog("gridId: " + gridObj.gridId + ", height(row): " + height);
						}
						else if(heightOpt.indexOf("px") != -1) {
							height = parseInt(heightOpt.substring(0, heightOpt.indexOf("px"))) + diffHeight;
							$('#'+gridObj.gridId).alopexGrid('updateOption', {height : height + 'px'});
							$COM_UTIL.debugLog("gridId: " + gridObj.gridId + ", height(px): " + height);
						}
						else {
							height = parseInt(heightOpt) + diffHeight;
							$('#'+gridObj.gridId).alopexGrid('updateOption', {height : height + 'px'});
							$COM_UTIL.debugLog("gridId: " + gridObj.gridId + ", height(px): " + height);
						}
					}
				}
				else {
					// 검색 영역 확장
					$('#'+gridObj.gridId).alopexGrid('updateOption', {height : heightOpt});
					$COM_UTIL.debugLog("return option, gridId: " + gridObj.gridId + ", heightOpt: " + heightOpt);
				}
			});
		},
		/**
		 * 사용자의 메뉴 목록 조회
		 */
		getMenuList: function() {
			var menuList = [];
			var menuObj = $COM_UTIL.getSsn($COM_UTIL.KEY_MENU_LIST);
//			if($COM_UTIL.isNotEmpty(menuObj)) {
//				menuList = JSON.parse(menuObj);
//				if($.isArray(menuList) && menuList.length > 0) {
//					return menuList;
//				}
//			}

			$a.request('cmm/menu/getLoginUserMenuList.json', {
				async: false,
				data: {dataSet: {fields: {menuCategory: $COM_UTIL.getSsn($COM_UTIL.KEY_MENU_CAT, "SPMS"), systemCategory: 'SPMS'}}},
				success: function(res) {
					//Navigation Menu Depth
					menuList = res.dataSet.recordSets['gridList'].list;
					if($COM_UTIL.isNotEmpty(menuList)) {
						$COM_UTIL.setSsn($COM_UTIL.KEY_MENU_LIST, JSON.stringify(menuList));
					}
					else {
						menuList = [];
					}
				}
			});

			return menuList;
		},
		/**
		 * 메뉴 화면으로 이동
		 * @param menuId
		 * @return (true : 성공, false : 실패)
		 */
		goMenuPage: function(menuId) {
			var menuAuth = false;
			var menuPageUri, menuLevId1, menuLevId2;
			var menuList = this.getMenuList();

			$.each(menuList, function(idx, item) {
				if(item.menuId == menuId) {
					//본인권한체크
					menuAuth = true;
					if(item.level == '2') {
						menuPageUri = item.pageUri;
						menuLevId1 = item.parentMenuId;
						menuLevId2 = item.parentMenuId;
					}
					else if(item.level == '3') {
						menuLevId2 = item.parentMenuId;
						menuPageUri = item.pageUri;
						$.each(menuList, function(idx, item) {
							if(item.menuId == menuLevId2) {
								menuLevId1 = item.parentMenuId;
								return false;
							}
						});
					}
					return false;
				}
			});
			if(!menuAuth) {
				//this.alertMsg("U1000053");//{id:'U1000053', msg:'해당 메뉴 권한이 없습니다.', type:'3'},
				this.alertMsgConfirm("U1000053", null, $COM_UTIL.afterErrPage, true);
				return;
			}
			if(this.isEmpty(menuPageUri)) {
				this.alertMsg("작업중인 메뉴 입니다.");
				return;
			}

			$a.session('menuId', menuId);
			$a.session('levId1', menuLevId1);
			$a.session('levId2', menuLevId2);
			
			$a.request('cmm/menu/addClickMenuLog.json', {
				async: false,
				data: {dataSet: {fields: {menuId:menuId}}},
				success: function(res) {
					if(res){
						if(menuPageUri.substring(0, 4) == "http" ) {
							$a.popup({
								url: menuPageUri,
								center: true,
								windowpopup: true,
								modal: false,
						        other: "width=1000,height=400,top=200,left=100,scrollbars=yes,resizable=yes"
							});
						} else if(menuPageUri.indexOf('Popup') > -1){
							var _width = menuPageUri.substring(menuPageUri.indexOf('width=')+6, menuPageUri.indexOf('height=')-1);
							var _height = menuPageUri.substring(menuPageUri.indexOf('height=')+7, menuPageUri.length);
							$a.popup({
								url: menuPageUri,
								center: true,
								windowpopup: false,
								modal: true,
								width: _width,
								height: _height
							});
						} else{
							$.each($('body').find(".alopexgrid"),function(idx,itm){
								var tmpGrdId = $(this).attr("id");
								$('#'+tmpGrdId).removeAlopexGrid();
							});
							$a.navigate(_CTX_PATH + menuPageUri, {levId1: menuLevId1, levId2: menuLevId2});
						}
					}
				}
			});

			//return true;
		},
		/**
		 * 첫번째 메뉴로 이동
		 */
		goFirstMenu: function(levMenuId1) {
			var menuList = this.getMenuList();
			var levId1 = '';
			var lvl2Idx = 0;
			for(var i = 0; i < menuList.length; i++) {
				var lev = menuList[i].level;
				var menuId = menuList[i].menuId;
				var parentMenuId = menuList[i].parentMenuId;
				var pageUri = menuList[i].pageUri;

				if('1' == lev) {
					levId1 = menuId;
					continue;
				}

				if(this.isNotEmpty(pageUri)) {
					if(this.isEmpty(levMenuId1)) {
						this.goMenuPage(menuId);
						return;
					}

					if(levMenuId1 == levId1) {
						this.goMenuPage(menuId);
						return;
					}
				}
			}
		},
		/**
		 * 메인 화면을 통한 링크로 화면 이동
		 * @param menuId
		 * @return (true : 성공, false : 실패)
		 */
		goMainLinkPage: function(menuId) {
			var menuAuth = false;
			var menuPageUri, menuLevId1, menuLevId2;
			var menuList = this.getMenuList();

			$.each(menuList, function(idx, item) {
				if(item.menuId == menuId) {
					//본인권한체크
					menuAuth = true;
					if(item.level == '2') {
						menuPageUri = item.pageUri;
						menuLevId1 = item.parentMenuId;
						menuLevId2 = item.parentMenuId;
					}
					else if(item.level == '3') {
						menuLevId2 = item.parentMenuId;
						menuPageUri = item.pageUri;
						$.each(menuList, function(idx, item) {
							if(item.menuId == menuLevId2) {
								menuLevId1 = item.parentMenuId;
								return false;
							}
						});
					}
					return false;
				}
			});
			if(!menuAuth) {
				//this.alertMsg("U1000053");//{id:'U1000053', msg:'해당 메뉴 권한이 없습니다.', type:'3'},
				this.alertMsgConfirm("U1000053", null, $COM_UTIL.afterErrPage, true);
				return;
			}
			if(this.isEmpty(menuPageUri)) {
				this.alertMsg("작업중인 메뉴 입니다.");
				return;
			}

			$a.session('menuId', menuId);
			$a.session('levId1', menuLevId1);
			$a.session('levId2', menuLevId2);
			
			$a.request('cmm/menu/addClickMenuLog.json', {
				async: false,
				data: {dataSet: {fields: {menuId:menuId}}},
				success: function(res) {
					if(res){
						$a.navigate(_CTX_PATH + menuPageUri, {levId1: menuLevId1, levId2: menuLevId2, mainLink : 'Y'});
					}
				}
			});
			
			return true;
		},
		/**
		 * Logout
		 * @param goInit (true : 초기화면 이동)
		 */
		logout: function(goInit) {
			$a.request('logout.json', {
				data: {},
				success: function(obj) {
					var menuCat = $COM_UTIL.getSsn($COM_UTIL.KEY_MENU_CAT);
					$a.session.clear();
					sessionStorage.clear();

					if(goInit) {
						$a.navigate(_CTX_PATH + "/login.do", {});
					}
				}
			});
		},
		/**
		 * go after error page
		 * @param goInit (true : 초기화면 이동)
		 */
		afterErrPage: function(goInit) {
			if (goInit) {
				$a.session.clear();
				sessionStorage.clear();
				location.href = '/logout';
			}
		},
		/**
		 * Progress 시작
		 * @param targetObj : Progress 대상 Object ($('body'), $('#gridList') ...)
		 * @return : progress 값
		 */
		startProgress: function(targetObj) {
			if(targetObj.selector == 'body') {
				return targetObj.progress();
			}
			targetObj.alopexGrid('showProgress');
			return null;
		},
		/**
		 * 전체 화면 Progress 정지
		 * @param prgrssInfo : _PROGRESS {progress: null, targetObj: null, reqCnt: 0}
		 */
		stopProgress: function(prgrssInfo, res) {
			if(arguments.length == 0) {return;}

			try {
				if(arguments.length == 2 && res.dataSet.attributes.noProgress) {
					return;
				}
			} catch(e) {}

			if(prgrssInfo.reqCnt > 0) {
				prgrssInfo.reqCnt--;
			}
			if(prgrssInfo.reqCnt == 0) {
				if(prgrssInfo.targetObj.selector == 'body') {
					prgrssInfo.progress.remove();
				}
				else {
					prgrssInfo.targetObj.alopexGrid('hideProgress');
				}
				//prgrssInfo.progress = null;
			}
		},
		/**
		 * Browser session storage에 data 저장
		 * @param key : 저장할 data 구분 key
		 * @param val : 저장할 data
		 * @return 없음
		 */
		setSsn: function(key, val) {
			//this.debugLog("setSsn() : key [" + key + "], val [" + val + "]");
			sessionStorage.setItem(key, val);
		},
		/**
		 * Browser session storage에 remove
		 * @param key : 저장할 data 구분 key
		 * @return 없음
		 */
		removeSsn: function(key) {
			this.debugLog("removeSsn() : key [" + key + "]");
			sessionStorage.removeItem(key);
		},
		/**
		 * Browser session storage에서 data 조회
		 * @param key : 조회할 data 구분 key
		 * @param defVal : 조회 실패시 return 할 data (optional)
		 * @return data object
		 */
		getSsn: function(key, defVal) {
			var val = sessionStorage.getItem(key);
			if(!val && defVal) {
				val = defVal;
			}
			//this.debugLog("getSsn() : key [" + key + "], val [" + val + "]");
			return val;
		},
		/**
		 * Browser session storage에서 user data 조회
		 * @param key : 조회할 user data 내 구분 key (optional)
		 * @return user data object (key가 없으면 전체 user data, key가 있으면 user data 중 해당 값)
		 */
		getSsnUserInfo: function(key) {
			var userInfo = this.getSsn(this.KEY_USER_INFO);
			if(this.isEmpty(userInfo)) {
				// get session data from server
				$a.request("cmm/user/getSsnUserInfo.json", {
					async: false,
					success: function(res) {
						//console.log(res.dataSet.fields.baseUser);
						if(res.dataSet.fields.baseUser) {
							$COM_UTIL.setSsn($COM_UTIL.KEY_USER_INFO, JSON.stringify(res.dataSet.fields.baseUser));
						}
						// 사용자 카테고리별 메뉴 갯수 점검
						var ctgryMenuAuth = 0;
						if(res.dataSet.fields["CNT_SPMS"] && parseInt(res.dataSet.fields["CNT_SPMS"]) > 0) {
							// 업무 카테고리별 메뉴 갯수 있음
							ctgryMenuAuth += 1;
						}
						if(res.dataSet.fields["CNT_SPIS"] && parseInt(res.dataSet.fields["CNT_SPIS"]) > 0) {
							// 업무 카테고리별 메뉴 갯수 있음
							ctgryMenuAuth += 1;
						}
						if(res.dataSet.fields["CNT_SYS"] && parseInt(res.dataSet.fields["CNT_SYS"]) > 0) {
							// 관리 카테고리별 메뉴 갯수 있음
							ctgryMenuAuth += 2;
						}
						$COM_UTIL.setSsn($COM_UTIL.KEY_CTGRY_MENU_AUTH, ctgryMenuAuth);
					},
					fail: function(response) {
						$COM_UTIL.debugLog("Error, getSsnUserInfo() : Can not receive data from server.");
					}
				});
				userInfo = this.getSsn(this.KEY_USER_INFO);
			}

			if(this.isEmpty(userInfo)) {
				this.debugLog("Error, getSsnUserInfo() : Session data is empty.");
				return null;
			}
			this.debugLog("getSsnUserInfo() : userInfo : " + userInfo);

			var userInfoObj = JSON.parse(userInfo);
			if(!key) {
				return userInfoObj;
			}

			this.debugLog("getSsnUserInfo() : key [" + key + "], val [" + JSON.stringify(userInfoObj[key]) + "]");
			return userInfoObj[key];
		},

		getSsnCostCenters: function() {
			var costCenters = this.getSsn(this.KEY_COST_CENTER);
			if (this.isEmpty(costCenters)) {
				$a.request("cmm/user/getSsnCostCenters.json", {
					async: false,
					success: function(resp) {
						if (resp.costCenters) {
							$COM_UTIL.setSsn($COM_UTIL.KEY_COST_CENTER, JSON.stringify(resp.costCenters));
						}
					},
					fail: function(resp) {
						if (console) {
							console.log(resp);
						}
					}
				});

				costCenters = this.getSsn(this.KEY_COST_CENTER);
			}
			if (this.isEmpty(costCenters)) {
				return null;
			} else {
				return JSON.parse(costCenters);
			}
		},
		/**
		 * get user role
		 * @return user role array
		 */
		getUserRoleArr: function() {
			return this.getSsnUserInfo("userRoles").split(",");
		},
		/**
		 * check user role
		 * @param checkRole
		 * @return boolean
		 */
		checkUserRole: function(checkRole) {
			var checkRoleArr = [];
			if(this.isEmpty(checkRole)) {
				return false;
			}
			if("string" === typeof checkRole) {
				checkRoleArr.push(checkRole);
			}
			else if($.isArray(checkRole)) {
				checkRoleArr = checkRole;
			}
			else {
				return false;
			}

			var userRoleArr = this.getUserRoleArr();
			if(this.isEmpty(userRoleArr)) {
				return false;
			}
			for(var idx = 0; idx < checkRoleArr.length; idx++) {
				for(var i = 0; i < userRoleArr.length; i++) {
					if(checkRoleArr[idx] == userRoleArr[i]) {
						return true;
					}
				}
			}
			return false;
		},
		/**
		 * get security level
		 */
		getSecLevel: function() {
			var ssnMenuList = JSON.parse($COM_UTIL.getSsn($COM_UTIL.KEY_MENU_LIST));
			if(ssnMenuList == null || ssnMenuList.length == 0) {
				return 0;
			}
			var curMenuId = $a.session('menuId');
			for(var idx = 0; idx < ssnMenuList.length; idx++) {
				if(ssnMenuList[idx].menuId == curMenuId) {
					return parseInt(ssnMenuList[idx].secLevel);
				}
			}
			return 0;
		},
		setButtonsBySecLevel: function() {
			var userLevel = this.getSecLevel();
			this.debugLog("SetButtonBySecLevel userLevel : " + userLevel);
			$("button").each(function(index) {
				try {
					// data-seclevel="5"
					var btnLevel = $(this).data("seclevel");
					var btnDispYn = $(this).data("secdisp");

					if(btnLevel == 0) {
						// allow button to user
						$(this).setEnabled(true);
						return;
					}
					if(btnLevel == undefined || btnLevel == "") {
						return;
					}

					btnLevel = parseInt(btnLevel);
					if(btnLevel > userLevel) {
						// not allow button to user
						$(this).setEnabled(false);
						$(this).off( "click");
						if(btnDispYn != "YES"){
							$(this).hide();
						}
					}
					else {
						// allow button to user
						if(btnDispYn != "YES"){
							$(this).show();
						}
						$(this).setEnabled(true);
					}
				}
				catch(e) {
					$(this).setEnabled(false);
					$(this).off( "click");
				}
			});
		},
		/**
		 * 입력 form 초기화
		 * @param inFrmId : 초기화할 form id
		 * @return 없음
		 */
		resetForm: function(inFrmId) {
			var frmId = inFrmId.replace(/^#/, "");
			//$("#" + frmId + " input:text").val("");
			$.each($("#" + frmId + " input:text"),function(idx,itm){
				if($(this).attr("data-reset") != "NO"){
					$(this).val("");
				}
			});

			$.each($("#" + frmId + " input:hidden"),function(idx,itm){
				if($(this).attr("data-reset") == "YES"){
					$(this).val("");
				}
			});

			$("#" + frmId + " select").setSelected("");
			//$("#" + frmId + " select").selectionInitialization();
			$("#" + frmId + " input:radio").removeAttr("checked");
			$("#" + frmId + " input:checkbox").removeAttr("checked");
		},
		/**
		 * customizing 된 alert 창 (comfirm 과 유사한 기능)
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @param closeCallbackFn : alert 창 종료 시 callback 함수
		 * @param closeFnArgObj : callback 함수 입력 값
		 * @return 없음
		 */
		alertMsgConfirm: function(msgId, msgArr, closeCallbackFn, closeFnArgObj) {
			this.alertMsg(msgId, msgArr, closeCallbackFn, closeFnArgObj, "confirm");
		},
		/**
		 * customizing 된 alert 창
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @param closeCallbackFn : alert 창 종료 시 callback 함수
		 * @param closeFnArgObj : callback 함수 입력 값
		 * @param typ : confirm 여부 파악
		 * @return 없음
		 */
		alertMsg: function(msgId, msgArr, closeCallbackFn, closeFnArgObj, typ) {
			//var msg = this.getMsg(msgId, msgArr);
			var msg = getUIMessage(msgId, msgArr);
			msg = this.convertBr(msg);
			var dialogTyp = "close";
			if(typ) {
				dialogTyp = typ;
			}

			// Dialog 조회 존재하면 제거 후 작성
			var dialogElement = $("#_alertWrapDialog");
			if(dialogElement.length) {
				$(dialogElement).close();
				$(dialogElement).remove();
			}

			// Dialog 생성
			dialogElement = document.createElement("div");
			$(dialogElement).attr({
				"id": "_alertWrapDialog",
				"class": "Dialog",
				"data-dialog-type": "blank",
				"data-resizable": "true",
				"data-dialog-modal": "true"
			});
			$(dialogElement).appendTo(document.body);

			var dialogCntntsDiv = document.createElement("div");
			$(dialogCntntsDiv).attr({"id": "_alertDialog", "class": "Dialog-contents"});
			$(dialogCntntsDiv).appendTo(dialogElement);
			$(dialogElement).convert();

			$("#_alertDialog").html(
				'<div class="alert-layout">' +
				'<p class="alert-img"><img src="/resources/images/img-alert.gif"></p>' +
				'<div id="_alertMsg" class="alert-txt"></div>' +
				'</div>' +
				'<div class="btn-center">' +
				'<button id="_btnAlert" type="button" class="Button dialog-btn Danger">확인</button>' +
				'</div>'
			);

			$("#_alertMsg").html(msg);
			$(dialogElement).open({
				title: "알림",
				width: "auto",
				height: "auto",
				resizable: false,
				movable: true,
			});
			$("#_btnAlert").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(dialogTyp == "confirm") {
					if(!$COM_UTIL.isEmpty(closeCallbackFn)) {closeCallbackFn(closeFnArgObj);}
				}
			});
		},
		/**
		 * customizing 된 comfirm 창
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @param okCallbackFn : "OK" 시 callback 함수
		 * @param okFnArgObj : ok callback 함수 입력 값
		 * @param cancelCallbackFn : "CANCEL" 시 callback 함수
		 * @param cancelFnArgObj : cancel callback 함수 입력 값
		 * @return 없음
		 */
		confirmMsg: function(msgId, msgArr, okCallbackFn, okFnArgObj, cancelCallbackFn, cancelFnArgObj) {
			//var msg = this.getMsg(msgId, msgArr);
			var msg = getUIMessage(msgId, msgArr);
			msg = this.convertBr(msg);

			// Dialog 조회 존재하면 제거 후 작성
			var dialogElement = $("#_confirmWrapDialog");
			if(dialogElement.length) {
				$(dialogElement).remove();
			}

			// Dialog 생성
			dialogElement = document.createElement("div");
			$(dialogElement).attr({
				"id": "_confirmWrapDialog",
				"class": "Dialog",
				"data-dialog-type": "blank",
				"data-resizable": "true",
				"data-dialog-modal": "true"
			});
			$(dialogElement).appendTo(document.body);

			var dialogCntntsDiv = document.createElement("div");
			$(dialogCntntsDiv).attr({"id": "_confirmDialog", "class": "Dialog-contents"});
			$(dialogCntntsDiv).appendTo(dialogElement);

			var dialogMsgDiv = document.createElement("div");
			$(dialogMsgDiv).attr({"id": "_confirmMsg", "class": "Margin-bottom-15", "style": "font-size: 14px;"});
			$(dialogMsgDiv).appendTo(dialogCntntsDiv);

			var dialogBtnDiv = document.createElement("div");
			$(dialogBtnDiv).attr({"class": "btn-right Margin-bottom-15"});
			$(dialogBtnDiv).appendTo(dialogCntntsDiv);

			var btnOk = document.createElement("button");
			$(btnOk).attr({"id": "_btnCnfrmOk", "type": "button", "class": "Button dialog-btn Danger Margin-right-5"});
			$(btnOk).html('확인');
			$(btnOk).appendTo(dialogBtnDiv);

			var btnCencel = document.createElement("button");
			$(btnCencel).attr({"id": "_btnCnfrmNo", "type": "button", "class": "Button dialog-btn"});
			$(btnCencel).html('취소');
			$(btnCencel).appendTo(dialogBtnDiv);

			$(dialogElement).convert();

			$("#_confirmMsg").html(msg);
			$(dialogElement).open({
				title: "확인",
				width: "auto",
				height: "auto",
				resizable: false,
				movable: true,
			});
			$("#_btnCnfrmOk").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(!$COM_UTIL.isEmpty(okCallbackFn)) {okCallbackFn(okFnArgObj);}
			});
			$("#_btnCnfrmNo").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(!$COM_UTIL.isEmpty(cancelCallbackFn)) {cancelCallbackFn(cancelFnArgObj);}
			});
		},
		/**
		 * customizing 된 comfirm 창 (버튼 3개)
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @param okCallbackFn : "확인" 시 callback 함수
		 * @param okFnArgObj : ok callback 함수 입력 값
		 * @param noCallbackFn : "신규" 시 callback 함수
		 * @param noFnArgObj : no callback 함수 입력 값
		 * @param cancelCallbackFn : "CANCEL" 시 callback 함수
		 * @param cancelFnArgObj : cancel callback 함수 입력 값
		 * @param inBtnNmArr : 버튼 이름 array
		 * @return 없음
		 */
		confirm3Msg: function(msgId, msgArr, okCallbackFn, okFnArgObj, noCallbackFn, noFnArgObj, cancelCallbackFn, cancelFnArgObj, inBtnNmArr) {
			//var msg = this.getMsg(msgId, msgArr);
			var msg = getUIMessage(msgId, msgArr);
			msg = this.convertBr(msg);

			// set 버튼 명칭
			var btnNmArr = ["추가", "신규", "취소"];
			if($.isArray(inBtnNmArr) && inBtnNmArr.length >= 3) {
				btnNmArr[0] = inBtnNmArr[0];
				btnNmArr[1] = inBtnNmArr[1];
				btnNmArr[2] = inBtnNmArr[2];
			}

			// Dialog 조회 존재하면 제거 후 작성
			var dialogElement = $("#_confirm3WrapDialog");
			if(dialogElement.length) {
				$(dialogElement).remove();
			}

			// Dialog 생성
			dialogElement = document.createElement("div");
			$(dialogElement).attr({
				"id": "_confirm3WrapDialog",
				"class": "Dialog",
				"data-dialog-type": "blank",
				"data-resizable": "true",
				"data-dialog-modal": "true"
			});
			$(dialogElement).appendTo(document.body);

			var dialogCntntsDiv = document.createElement("div");
			$(dialogCntntsDiv).attr({"id": "_confirmDialog", "class": "Dialog-contents"});
			$(dialogCntntsDiv).appendTo(dialogElement);

			var dialogMsgDiv = document.createElement("div");
			$(dialogMsgDiv).attr({"id": "_confirmMsg"});
			$(dialogMsgDiv).appendTo(dialogCntntsDiv);

			var dialogBtnDiv = document.createElement("div");
			$(dialogBtnDiv).attr({"class": "btn-right Margin-bottom-15"});
			$(dialogBtnDiv).appendTo(dialogCntntsDiv);

			var btnCencel = document.createElement("button");
			$(btnCencel).attr({"id": "_btnCnfrmCencel", "type": "button", "class": "Button dialog-btn Margin-right-5"});
			$(btnCencel).html(btnNmArr[2]);
			$(btnCencel).appendTo(dialogBtnDiv);

			var btnNo = document.createElement("button");
			$(btnNo).attr({"id": "_btnCnfrmNo", "type": "button", "class": "Button dialog-btn Danger Margin-right-5"});
			$(btnNo).html(btnNmArr[1]);
			$(btnNo).appendTo(dialogBtnDiv);

			var btnOk = document.createElement("button");
			$(btnOk).attr({"id": "_btnCnfrmOk", "type": "button", "class": "Button dialog-btn Danger"});
			$(btnOk).html(btnNmArr[0]);
			$(btnOk).appendTo(dialogBtnDiv);

			$(dialogElement).convert();

			$("#_confirmMsg").html(msg);
			$(dialogElement).open({
				title: "확인",
				width: "auto",
				height: "auto",
				resizable: false,
				movable: true,
			});
			$("#_btnCnfrmOk").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(!$COM_UTIL.isEmpty(okCallbackFn)) {okCallbackFn(okFnArgObj);}
			});
			$("#_btnCnfrmNo").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(!$COM_UTIL.isEmpty(noCallbackFn)) {noCallbackFn(noFnArgObj);}
			});
			$("#_btnCnfrmCencel").on('click', function(e) {
				e.preventDefault();
				$(dialogElement).close();
				$(dialogElement).remove();
				if(!$COM_UTIL.isEmpty(cancelCallbackFn)) {cancelCallbackFn(cancelFnArgObj);}
			});
		},
		/**
		 * System 오류 출력 창
		 * @param msgStr : 오류 message
		 * @return 출력 창 ID
		 */
		systemMsg: function(msgStr) {
			var msg = this.convertBr(msgStr);

			// Dialog 조회 존재하면 제거 후 작성
			var dialogElement = $("#_amsSystemWrapDialog");
			if(dialogElement.length) {
				$(dialogElement).remove();
			}

			// Dialog 생성
			dialogElement = document.createElement("div");
			$(dialogElement).attr({
				"id": "_amsSystemWrapDialog",
				"class": "Dialog",
				"style": "z-index: 99992;",
				"data-dialog-type": "blank",
				"data-resizable": "false",
				"data-dialog-modal": "true"
			});
			$(dialogElement).appendTo(document.body);

			var dialogCntntsDiv = document.createElement("div");
			$(dialogCntntsDiv).attr({"id": "_systemDialog", "class": "Dialog-contents"});
			$(dialogCntntsDiv).appendTo(dialogElement);
			$(dialogElement).convert();

			$("#_systemDialog").html('<div id="_systemMsg" class="alert-txt"></div>');

			$("#_systemMsg").html(msg);
			$(dialogElement).open({
				title: false,
				top: 50,
				width: "auto",
				height: "auto",
				resizable: false,
				movable: false,
			});

			return '_amsSystemWrapDialog';
		},
		/**
		 * window comfirm 창
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @return : user 선택 결과
		 */
		confirm: function(msgId, msgArr) {
			return confirm(getUIMessage(msgId, msgArr));
			//return confirm(this.getMsg(msgId, msgArr));
		},
		/**
		 * debug용 browser console 메세지
		 * @param msg : console message
		 * @return : 없음
		 */
		debugLog: function(msg) {
			if(_IS_DEBUG) {
				this.consoleLog(msg);
			}
		},
		/**
		 * browser console 메세지
		 * @param msg : console message
		 * @return : 없음
		 */
		consoleLog: function(msg) {
			if(window.console) {
				window.console.log(msg);
			}
		},
		/**
		 * 메세지 id로 정의된 메세지 string 조회
		 * 현재는 미사용
		 * @param msgId : 정의된 message id
		 * @param msgArr : message id 에 추가로 넣을 정보 (현재는 미사용)
		 * @return : 메세지 string
		 */
		getMsg: function(msgId, msgArr) {
			var msgStr = "";
			var pattern = /\{(\d+)\}/g;
			var msgStrArr;
			if($.isArray(msgArr)) {
				msgStrArr = msgArr;
			}
			else {
				msgStrArr = [msgArr];
			}
			if(this.isEmpty(msgId)) {
				return msgStrArr[0];
			}

			for(var idx = 0; idx < _GBL_MESSAGE.length; idx++) {
				if(_GBL_MESSAGE[idx]["ID"] == msgId) {
					msgStr = _GBL_MESSAGE[idx]["MSG"];
					break;
				}
			}
			if(this.isEmpty(msgStr)) {
				if(!this.isEmpty(msgStrArr)) {
					//메시지ID를 못 찾은 경우, 메시지ID에 전달된 문자열을 치환하여 반환
					msgStr = msgId.replace(pattern, function(match, key, value) {return msgStrArr[key];});
				}
				else {
					msgStr = msgId;
				}
				return msgStr;
			}
			if(!this.isEmpty(msgStrArr)) {
				msgStr = msgStr.replace(pattern, function(match, key, value) {return msgStrArr[key];});
			}
			return msgStr;
		},
		/**
		 * 입력된 string 의 줄바꿈을 <br/> 로 변환
		 * @param msgStr : 바꿀 string
		 * @return : 변환한 string
		 */
		convertBr: function(msgStr) {
			var pattern = /\n/g;
			return msgStr.replace(pattern, "<br/>");
		},
		/**
		 * 입력된 객체가 null 또는 빈값이면 true를 반환
		 * @param o : 점검할 object
		 * @return : 점검 결과 (null 또는 빈값이면 true, 그외 false)
		 */
		isEmpty: function(o) {
			if(undefined == o || null == o) {
				return true;
			}
			if($.isArray(o) && o.length < 1) {
				return true;
			}
			if("object" === typeof o && $.isEmptyObject(o)) {
				return true;
			}
			if("string" === typeof o && ("" == o || "undefined" == o)) {
				return true;
			}
			return false;
		},
		/**
		 * isEmpty의 반대 개념
		 * @param o : 점검할 object
		 * @return : 점검 결과 (null 또는 빈값이면 false, 그외 true)
		 */
		isNotEmpty : function(o) {
			return !this.isEmpty(o);
		},
		/**
		 * 폼(또는 어떠한 객체라도)의 내부 입력필드의 값을 객체로 생성하여 반환
		 * 속성에 data-type="dateinput" 인 것이면 하이픈 문자 제거 (날자형식)
		 * @param sFormId : 폼 id
		 * @return : object
		 */
		getFormData: function(sFormId) {
			console.log(sFormId);
			var formdata = {}; //input:text, input:hidden, input:password, input:file
			$("#" + sFormId).find('input:not([type=radio],[type=checkbox]), select, textarea').each(function() {
				var val = $(this).val();
				if(val == null || val == "null"){
					val = "";
				}
				var key = $(this).attr("id");
				if($COM_UTIL.isEmpty(key) || 'undefined' == key || 'null' == key || 0 == key.indexOf("alopex")) {
					key = $(this).attr("name");
				}

				var typeStr = $(this).data("type"); //data-type="dateinput"
				val = (typeStr == "dateinput" ? val.replace(/-/g, "") : val); //dateinput 타입이면 문자 - 를 제거함.

				try {
					typeStr = $(this).data("bind"); //data-bind="maskedCommaValue: urlId"
					if($COM_UTIL.isNotEmpty(typeStr) && typeStr.indexOf("maskedCommaValue") != -1) {
						var dataObj = $(this).getData();
						val = dataObj[key];
					}
				}
				catch(e) {}

				$COM_UTIL.debugLog("<getFormData> id = [" + $(this).attr("id") + "], name = [" + $(this).attr("name") + "], key = [" + key + "], value = [" + val + "]");

				formdata[key] = val;
			});
			$("#" + sFormId).find("input[type='radio']:checked").each(function() {
				$COM_UTIL.debugLog("<getFormData> 라디오 name = [" + $(this).attr("name") + "] = [" + $(this).val() + "]");
				var key = $(this).attr("name");
				var val = $(this).val();
				if($COM_UTIL.isEmpty(key)) {$(this).attr("id");}
				formdata[key] = val;
			});
			$("#" + sFormId).find("input[type='checkbox']").each(function() {
				$COM_UTIL.debugLog("<getFormData> 체크박스 name = [" + $(this).attr("name") + "] = [" + $(this).val() + "] checked = " + $(this).is(':checked'));
				var key = $(this).attr("name");
				var chk = $(this).is(':checked');
				if($COM_UTIL.isEmpty(key)) {$(this).attr("id");}
				var val = (true == chk || "checked" == chk ? $(this).val() : "");
				formdata[key] = val;
			});
			return formdata;
		},
		/**
		 * alopex.request 의 data 에 들어갈 데이터 객체를 생성하여 반환
		 * 속성에 data-bind="grid" 인 것이면 그리드로 인식함.
		 * @param  arg1, arg2, ... : 폼ID, 그리드ID_1, 그리드ID_2, ...
		 * @return : 서버 전송 형식을 따르는 object
		 */
		getRequestData: function() {
			return this.makeRequestData("getRequestData", arguments);
		},
		/**
		 * alopex.request 의 data 에 들어갈 데이터 객체를 생성하여 반환
		 * 속성에 data-bind="grid" 인 것이면 그리드로 인식함.
		 * 폼이 아닌 그리드의 데이터는 추가,수정,삭제된 데이터만 생성
		 * @param  arg1, arg2, ... : 폼ID, 그리드ID_1, 그리드ID_2, ...
		 * @return : 서버 전송 형식을 따르는 object
		 */
		getRequestDataUpdated: function() {
			return this.makeRequestData("getRequestDataUpdated", arguments);
		},
		/**
		 * alopex.request 의 data 에 들어갈 데이터 객체를 생성하여 반환
		 * 속성에 data-bind="grid" 인 것이면 그리드로 인식함.
		 * 폼이 아닌 그리드의 데이터는 선택한 row 데이터만 생성
		 * @param  arg1, arg2, ... : 폼ID, 그리드ID_1, 그리드ID_2, ...
		 * @return : 서버 전송 형식을 따르는 object
		 */
		getRequestDataSelected: function() {
			return this.makeRequestData("getRequestDataSelected", arguments);
		},
		/**
		 * alopex.request 의 data 에 들어갈 데이터 객체를 생성하여 반환
		 * 속성에 data-bind="grid" 인 것이면 그리드로 인식함.
		 * 폼이 아닌 그리드의 데이터는 선택한 row 데이터만 생성
		 * @param  arg1, arg2, ... : 폼ID, 그리드ID_1, 그리드ID_2, ...
		 * @return : 서버 전송 형식을 따르는 object
		 */
		getRequestDataFocused: function() {
			return this.makeRequestData("getRequestDataFocused", arguments);
		},
		/**
		 * alopex.request 의 data 에 들어갈 데이터 객체를 생성하여 반환
		 * 속성에 data-bind="grid" 인 것이면 그리드로 인식함.
		 * @param  typ : 입력 형식 (getRequestData, getRequestDataUpdated, getRequestDataSelected)
		 * @param  arg1, arg2, ... : 폼ID, 그리드ID_1, 그리드ID_2, ...
		 * @return : 서버 전송 형식을 따르는 object
		 */
		makeRequestData: function(typ, args) {
			var fieldsData = {}, recordSetsData = {}, gridData;
			for(var idx = 0; idx < args.length; idx++) {
				var elemId  = args[idx];
				elemId = elemId.replace(/#/, "");
				var bindStr = $("#" + elemId).data("bind");
				this.debugLog("<" + typ + "> elemId = [" + elemId + "], bind = [" + bindStr + "]");
				if(this.isEmpty(bindStr) || bindStr.indexOf("grid") < 0) {
					/*if(!this.isEmpty(fieldsData)) {
						continue;
					}*/
					fieldsData = jQuery.extend(fieldsData, this.getFormData(elemId));
				}
				else {
					/*if(!this.isEmpty(recordSetsData)) {
						continue;
					}*/
					if(typ == "getRequestData") {
						$("#" + elemId).alopexGrid("endEdit");
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: ""});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "E"}, {_state: {edited: true, added: false, deleted: false}});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "A"}, {_state: {added: true}});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "D"}, {_state: {deleted: true}});						
						gridData = {list: AlopexGrid.trimData($("#" + elemId).alopexGrid("dataGet"))};
					}
					else if(typ == "getRequestDataUpdated") {
						$("#" + elemId).alopexGrid("endEdit");
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: ""});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "E"}, {_state: {edited: true, added: false, deleted: false}});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "A"}, {_state: {added: true}});
						$("#" + elemId).alopexGrid("dataEdit", {rowStatusFlag: "D"}, {_state: {deleted: true}});
						var updatedArr = AlopexGrid.trimData(
							//$("#" + elemId).alopexGrid("dataGet", [{rowStatusFlag: 'E'}, {rowStatusFlag: 'A'}, {rowStatusFlag: 'D'}])
							//$("#" + elemId).alopexGrid("dataGet",{_state: {edited: true}},{_state: {added: true}},{_state: {deleted: true}})
							$("#" + elemId).alopexGrid("dataGet",{_state: {edited: true}},{_state: {added: true , deleted: false}},{_state: {deleted: true , added: false}})
						);

						gridData = {list: updatedArr};
					}
					else if(typ == "getRequestDataSelected") {
						$("#" + elemId).alopexGrid("endEdit");
						gridData = {list: AlopexGrid.trimData($("#" + elemId).alopexGrid("dataGet", {_state: {selected: true}}))};
					}
					else if(typ == "getRequestDataFocused") {
						gridData = {list: AlopexGrid.trimData($("#" + elemId).alopexGrid("dataGet", {_state: {focused: true}}))};
					}
					recordSetsData[elemId] = gridData;
				}
			}
			var dataSet = {};
			dataSet["fields"] = fieldsData;
			dataSet["recordSets"] = recordSetsData;

			var rtnData = {};
			rtnData["dataSet"] = dataSet;
			return rtnData;
		},
		/**
		 * 입력된 공통코드를 세션이나 서버에 조회하여 반환
		 * @param codeId : 공통코드 ID
		 * @param groupId : 공통코드 Group ID
		 * @param category : Site Type
		 * @param useSsn : session 사용 여부
		 * @return : object {codeId: , codeName: , attribute01: , ... }
		 */
		getCodeData: function(codeId, groupId, category, useSsn) {
			if(useSsn == undefined) {
				useSsn = true;
			}
			var codeObj, codeKey, ssnCode;
			codeKey = "CMM_CD_SINGLE_" + codeId + "_" + groupId + "_" + category;
			if(useSsn) {
				// session 미사용
//				ssnCode = this.getSsn(codeKey);
			}
			if(ssnCode == null || ssnCode == 'undefined '|| this.isEmpty(ssnCode)) {
				$a.request("cmm/getNsfCodeInfo.json", {
					showProgress: false,
					async: false, //sync mode
					data: {dataSet: {fields: {codeId: codeId, groupId: groupId, category: category} } },
					success: function(res) {
						codeObj = res.dataSet.fields.codeVO;
						$COM_UTIL.setSsn(codeKey, JSON.stringify(codeObj));
					}
				});
			}
			else {
				codeObj = JSON.parse(ssnCode);
			}

			return codeObj;
		},
		/**
		 * 입력된 공통코드를 세션이나 서버에 조회하여 반환
		 * @param arrParam : 공통코드 정보 (groupId, category, elemId, optionValue, optionText, childCode)
		 * @return : object {elemIdA: [], elemIdB: []}
		 */
		getCodeObjs: function(arrParam) {
			var aParam, codeKey, ssnCodeList, arrNoSsnParam = [], rtnObjs = {}, withChild = "";
			var attrKeyNm = "";

			if(this.isEmpty(arrParam)) {return rtnObjs;}

			for(var idx = 0; idx < arrParam.length; idx++) {
				aParam = arrParam[idx];
				if(aParam["childCode"]) {
					withChild = "_withChild";
				}
				else {
					withChild = "";
				}
				codeKey = "CMM_CD_"+ aParam["groupId"] + "_" + aParam["category"];

				for(var attrIdx = 1; attrIdx < 11; attrIdx++) {
					if(attrIdx < 10) {
						attrKeyNm = "attribute0" + attrIdx;
					}
					else {
						attrKeyNm = "attribute" + attrIdx;
					}
					codeKey += "_";
					if(aParam[attrKeyNm]) {
						codeKey += aParam[attrKeyNm];
					}
				}

				codeKey += withChild;

				// session 미사용
				//ssnCodeList = this.getSsn(codeKey);
				if(this.isEmpty(ssnCodeList)) {
					aParam["codeKey"] = codeKey;
					aParam["useFlag"] = "Y";
					arrNoSsnParam.push(aParam);
				}
				else {
					rtnObjs[aParam["elemId"]] = JSON.parse(ssnCodeList);
				}
			}

			if(this.isNotEmpty(arrNoSsnParam)) {
				// get code list from server
				$a.request("cmm/code/getCommonCode4UI.json", {
					showProgress: false,
					async: false, //sync mode
					data: {dataSet: {recordSets: {REQ_COMM_CD_LIST : {list: arrNoSsnParam} } } },
					success: function(res) {
						var rsCodeList = res.dataSet.recordSets;
						if(!rsCodeList) {return;}
						for(var idx = 0; idx < arrNoSsnParam.length; idx++) {
							var _param = arrNoSsnParam[idx];
							var key = _param["elemId"];
							var codeDataSet = rsCodeList[key];
							var codeList = codeDataSet.list;
							if($COM_UTIL.isNotEmpty(codeList)) {
								key = _param["codeKey"];
								$COM_UTIL.setSsn(key, JSON.stringify(codeList));
								rtnObjs[_param["elemId"]] = codeList;
							}
							else {
								rtnObjs[_param["elemId"]] = [];
							}
						}
					}
				});
			}

			return rtnObjs;
		},
		/**
		 * 입력된 공통코드를 조회하여 array 로 반환
		 * @param groupId : 공통코드 group id
		 * @param optionValue : 공통코드 table에서 value를 가져올 필드 명 (default : attribute01)
		 * @param optionText : 공통코드 table에서 text를 가져올 필드 명 (default : codeName)
		 * @param category : 공통코드 category (default : SYS)
		 * @param codeHead : "전체", "선택" 등의 text 가 필요할 경우 사용
		 * @param childCode : 하위 code 검색 여부 (true, false, default false)
		 * @return : array [{value: xxx, text: xxx}, {value: xxx, text: xxx}, ...]
		 */
		getCodeArrData: function(groupId, optionValue, optionText, category, codeHead, childCode) {
			var aParam = {}, arrParam = [], rtnArr = [];

			if(this.isEmpty(groupId)) {return rtnArr;}
			if(this.isEmpty(optionValue)) {optionValue = "attribute01";}
			if(this.isEmpty(optionText)) {optionText = "codeName";}
			if(this.isEmpty(category)) {category = "SYS";}
			if(this.isEmpty(codeHead)) {codeHead = "";}
			if(this.isEmpty(childCode)) {childCode = false;}

			aParam["groupId"] = groupId;
			aParam["elemId"] = groupId;
			aParam["category"] = category;
			aParam["optionValue"] = optionValue;
			aParam["optionText"] = optionText;
			aParam["codeHead"] = codeHead;
			aParam["childCode"] = childCode;
			aParam["useAmsCache"] = "N";

			if(arguments.length > 6) {
				aParam["useAmsCache"] = "Y";
				for(var idx = 6, attrIdx = 1; idx < arguments.length; idx++, attrIdx++) {
					if(arguments[idx]) {
						if(attrIdx < 10) {
							aParam["attribute0" + attrIdx] = arguments[idx];
						}
						else {
							aParam["attribute" + attrIdx] = arguments[idx];
						}
					}
				}
			}

			arrParam.push(aParam);

			if(this.isNotEmpty(codeHead)) {
				rtnArr.push({value: '', text: codeHead});
			}

			var codeObjs = this.getCodeObjs(arrParam);
			var codeList = codeObjs[aParam["elemId"]];
			for(var idx = 0; idx < codeList.length; idx++) {
				var codeObj = {value: codeList[idx][optionValue], text: codeList[idx][optionText]};
				rtnArr.push(codeObj);
			}

			return rtnArr;
		},
		/*getUserCodeArrData : function(url,param,dataId,valueKey,textKey,codeHead){
			var result = [];
			var that = this;
			$a.request(url, {
				data: param,
				async: false,
				success: function(res) {
					if(that.isEmpty(dataId)){
						result = res;
					}else{
						result = $.extend(true,[],res.dataSet.fields[dataId]);
					}
					if(!that.isEmpty(codeHead)){
						var defaultObj = {};
						defaultObj[valueKey] = "";
						defaultObj[textKey] = codeHead;
						result.unshift(defaultObj);
					}
				}
			});
			return result;
		},*/
		getUserCodeArrData : function(url,param,dataId,valueKey,textKey,codeHead){
			var result = [];
			var that = this;
			$a.request(url, {
				data: param,
				async: false,
				success: function(res) {
					if(that.isEmpty(dataId)){
						result = res;
					}else{
						if(valueKey == "text"){
							var tmpResult = [];
							$.each(res.dataSet.fields[dataId],function(idx,itm){
								tmpResult.push({value : itm.text, text : itm.text});
							});
							result = $.extend(true,[],tmpResult);
						}else{
						result = $.extend(true,[],res.dataSet.fields[dataId]);
					}
					}
					if(!that.isEmpty(codeHead)){
						var defaultObj = {};
						if(valueKey == "text"){
							defaultObj['value'] = "";
						}else{
						defaultObj[valueKey] = "";
						}
						
						defaultObj[textKey] = codeHead;
						result.unshift(defaultObj);
					}
				}
			});
			return result;
		},
		/**
		 * 입력된 form 내의 지정된 select 컴포넌트의 option 데이터 or span 컴포넌트를 radio 컴포넌트 공통코드값으로 채우고,
		 * callback 이 있을 경우 해당 함수를 호출함
		 * 예)
		 * <select id="category" class="Select" data-bind="selectedOptions: category"
		 *   data-category="SYS" data-groupId="C002"
		 *   data-optionValue="attribute02" data-optionText="codeName">
		 * </select>
		 * <span id="useFlag" data-groupId="C003" data-optionValue="attribute02" data-optionText="codeName"></span>
		 * @param  sFormId : 폼 id
		 * @param  callback : 처리후 수행할 callback function
		 * @return : 없음
		 */
		setSelectByCode: function(sFormId, callback) {
			if(this.isEmpty(sFormId)) {return;}		//입력되는 파라미터가 없으면 여기서 반환
			sFormId = sFormId.replace(/^#/, "");
			var arrParam = [];
			$("#" + sFormId + " select,span").each(function() {
				var groupId  = $(this).attr("data-groupId"); //코드그룹ID
				var category = $(this).attr("data-category");
				var optionValue = $(this).attr("data-optionValue");
				var optionText = $(this).attr("data-optionText");
				var childCode = $(this).attr("data-childCode");

				if($COM_UTIL.isEmpty(category)) {category = "SYS";}
				if($COM_UTIL.isEmpty(optionValue)) {optionValue = "attribute01";}
				if($COM_UTIL.isEmpty(optionText)) {optionText = "codeName";}
				if($COM_UTIL.isEmpty(childCode)) {childCode = "false";}

				if($COM_UTIL.isNotEmpty(groupId)) {
					var elemId = $(this).prop("id"); //(select)컴포넌트ID
					var aParam = new Object();
					aParam["groupId"] = groupId;
					aParam["category"] = category;
					aParam["elemId"] = elemId;
					aParam["optionValue"] = optionValue;
					aParam["optionText"] = optionText;
					aParam["childCode"] = childCode;
					aParam["codeHead"] = $COM_UTIL.isNotEmpty( $(this).attr("data-codeHead") ) ? $(this).attr("data-codeHead") : "";
					aParam["useAmsCache"] = "N";

					for(var attrIdx = 1; attrIdx < 11; attrIdx++) {
						if(attrIdx < 10) {
							attrKeyNm = "attribute0" + attrIdx;
						}
						else {
							attrKeyNm = "attribute" + attrIdx;
						}
						if($(this).attr("data-" + attrKeyNm)) {
							aParam[attrKeyNm] = $(this).attr("data-" + attrKeyNm);
							aParam["useAmsCache"] = "Y";
						}
					}

					arrParam.push(aParam);
				}
			});

			var codeObjs = this.getCodeObjs(arrParam);
			for(var idx = 0; idx < arrParam.length; idx++) {
				var _param = arrParam[idx];
				var key = _param["elemId"];
				var codeList = codeObjs[key];

				if(this.isEmpty(_param["codeHead"])) {
					if(this.isValueRequired(_param["elemId"])) {
						_param["codeHead"] = '선택';
					}
				}

				var _elemTagname = $('#' + _param["elemId"]).get(0).tagName;
				if("SELECT" == _elemTagname) {
					this.setSelectOptionsByCodeData(_param, codeList);
				}
				else if("SPAN" == _elemTagname) {
					this.setRadioByCodeData(_param, codeList);
				}
			}

			if(this.isNotEmpty(callback) && typeof(callback) == "function") {
				callback.call(arrParam, codeObjs);	//공통코드 데이터를 반환
			}
		},
		/**
		 * id에 해당하는 select 컴포넌트에 option을 생성
		 * 예)
		 * <select id="exampleId"  class="Select"
		 *     data-bind="selectedOptions: option_selected"
		 *     data-codeHead="선택"
		 *     data-optionValue="value" data-optionText="text">
		 * </select>
		 * <span></span>
		 * @param id select 컴포넌트 id
		 * @param optionList 옵션정보배열 [{value: "1", text:"A"}, {value: "2", text:"B"}]
		 * @return
		 */
		setSelectOptions: function(id, optionList, callback) {
			if (this.isEmpty(id)) {return;}
			if ($("#" + id).prop("tagName") != "SELECT") {
				return;
			}
			var param = {};
			var optionValue = $("#" + id).attr("data-optionValue");
			var optionText = $("#" + id).attr("data-optionText");
			optionValue = this.isEmpty(optionValue) ? "value": optionValue;
			optionText = this.isEmpty(optionText) ? "text": optionText;

			param["elemId"] = id;
			param["optionValue"] = optionValue;
			param["optionText"] = optionText;
			param["codeHead"] = $COM_UTIL.isNotEmpty( $("#" + id).attr("data-codeHead") ) ? $("#" + id).attr("data-codeHead") : "";

			$COM_UTIL.setSelectOptionsByCodeData(param, optionList);

			if(this.isNotEmpty(callback) && typeof(callback) == "function") {
				callback.call($("#" + id), optionList);
			}
		},
		/**
		 * 지정된 select 컴포넌트 option 을 코드데이터 이용하여 채움
		 * @param  param : 입력된 공통코드 정보
		 * @param  codeList : 공통코드 데이터
		 * @return : true
		 */
		setSelectOptionsByCodeData : function(param, codeList) {
			var sSelectElemId = param["elemId"].replace(/^#/, "");
			$("#" + sSelectElemId).empty();

			if($COM_UTIL.isNotEmpty(param["codeHead"])) {
				if("none" != param["codeHead"]) {
					$("#" + sSelectElemId).append( $('<option>', { value: "", text: param["codeHead"] }) );
				}
			}

			$.each(codeList, function (index, codeinfo) {
				var codeOpt = new Object();
				codeOpt["value"] = codeinfo[param["optionValue"]];
				codeOpt["text"]  = codeinfo[param["optionText"]];
				$("#" + sSelectElemId).append( $('<option>', codeOpt) );
			});
			return true;
		},

		/**
		 * 지정된 span 컴포넌트에 radio 컴포넌트를 코드데이터 이용하여 채움
		 * @param  param : 입력된 공통코드 정보
		 * @return : true
		 */
		setRadioByCodeData : function(param, codeList) {
			var sSpanElemId = param["elemId"].replace(/^#/, "");
			$("#" + sSpanElemId).empty();

			if($COM_UTIL.isNotEmpty(param["codeHead"])) {
				var s = '<input type="radio" class="Radio" id="' + sSpanElemId + '__" name="' + sSpanElemId + '" value="" data-bind="checked:' + sSpanElemId + '"> ' + param["codeHead"].replace(/^-/, "").replace(/-$/, "");
				$("#" + sSpanElemId).append(s);
			}

			$.each(codeList, function (index, codeinfo) {
				var codeOpt = new Object();
				var val = codeinfo[param["optionValue"]];
				var txt = codeinfo[param["optionText"]];
				var s = '<input type="radio" class="Radio" id="' + sSpanElemId + '_' + val + '" name="' + sSpanElemId + '" value="' + val + '" data-bind="checked:' + sSpanElemId + '"> ' + txt;
				$("#" + sSpanElemId).append(s);
			});

			var sOnchange = $("#" + sSpanElemId).data("onchange"); //onchange 이벤트 핸들러가 지정
			if($COM_UTIL.isNotEmpty(sOnchange)) {
				$("#" + sSpanElemId + " :radio").on("change", eval(sOnchange));
			}
			return true;
		},
		/**
		 * 엘레멘트의 입력값이 필수인지 판단
		 * @param  sElemId : 엘레멘트 id
		 * @return : 엘레멘트가 필수이면 true를 반환, 아니면 false
		 */
		isValueRequired: function(sElemId) {
			sElemId = sElemId.replace(/#/, "");
			var sValidRule = $("#" + sElemId).data("validation-rule");
			var bIsReq = false;
			if($COM_UTIL.isNotEmpty(sValidRule) && sValidRule.indexOf('required') >= 0) {
				bIsReq = true;
			}
			return bIsReq;
		},
		/**
		 * 오늘 날짜를 입력된 구분자로 반환
		 * getToday('-'); 오늘날짜를  yyyy-MM-dd 형태로 반환
		 * @param delimiter
		 * @returns {String}
		 */
		getToday: function(delimiter) {
			var oToday = new Date();
			return this.getStrFormDate(oToday, delimiter);
		},
		/**
		 * 오늘 날짜에 몇일 전후 날짜 반환
		 * getAddDayFromToday(3, '-');  오늘날짜의 3일후 yyyy-MM-dd 형태로 반환
		 * @param addDays
		 * @param delimiter
		 * @returns {String}
		 */
		getAddDayFromToday: function(addDays, delimiter) {
			var oToday = new Date();
			oToday.setDate(oToday.getDate() + addDays);
			return this.getStrFormDate(oToday, delimiter);
		},
		/**
		 * 오늘 날짜에 몇달 전후 날짜 반환
		 * getAddMonthFromToday(3, '-');  오늘날짜의 3달후 yyyy-MM-dd 형태로 반환
		 * @param addMonth
		 * @param delimiter
		 * @returns {String}
		 */
		getAddMonthFromToday: function(addMonth, delimiter) {
			var oToday = new Date();
			oToday.setMonth(oToday.getMonth() + addMonth);
			return this.getStrFormDate(oToday, delimiter);
		},
		/**
		 * 오늘 날짜에 몇달 전후 초일 반환
		 * getAddMonthFromToday(3, '-');  오늘날짜의 3달후 yyyy-MM-dd 형태로 반환
		 * @param addMonth
		 * @param delimiter
		 * @returns {String}
		 */
		getFirstDayAddMonthFromToday: function(addMonth, delimiter) {
			var oToday = new Date();
			oToday.setMonth(oToday.getMonth() + addMonth);
			oToday.setDate('01');
			return this.getStrFormDate(oToday, delimiter);
		},
		/**
		 * 입력된 날짜를 String 형식으로 반환
		 * @param inDate
		 * @param delimiter
		 * @returns {String}
		 */
		getStrFormDate: function(inDate, delimiter) {
			if(!delimiter) {delimiter = "-";}
			var sYear = inDate.getFullYear();
			var sMonth = inDate.getMonth() + 1;
			var sDay = inDate.getDate();

			sMonth = "" + sMonth;
			sMonth = (sMonth.length == 1) ? "0"+sMonth : sMonth;
			sDay = "" + sDay;
			sDay = (sDay.length == 1) ? "0"+sDay : sDay;

			return sYear + delimiter + sMonth + delimiter + sDay;
		},
		/**
		 *입력된 두 날짜 사이의 차이를 리턴(date2 - date1)
		 *@param date1,date2
		 *@param delimiter(년월일 구분자) 없을경우 substr로 대체
		 *@param rtnTyp(day,month,year) 리턴방식(일수,월수,년수)
		 */
		getDateDiff: function(date1,date2,delimiter,type){
			var typObj = {
				day : (1000*60*60*24)
				,month : (1000*60*60*24)*30
				,year : ((1000*60*60*24)*30)*12
			};
			if(this.isEmpty(date1) || this.isEmpty(date1) || this.isEmpty(type) || this.isEmpty(typObj[type])){
				return "";
			}

			var date1Arr = [];
			var date2Arr = [];
			if(this.isEmpty(delimiter)){
				date1Arr.push(date1.toString().substr(0,4));
				date1Arr.push(date1.toString().substr(4,2));
				date1Arr.push(date1.toString().substr(6,2));

				date2Arr.push(date2.toString().substr(0,4));
				date2Arr.push(date2.toString().substr(4,2));
				date2Arr.push(date2.toString().substr(6,2));
			}else{
				date1Arr = date1.split(delimiter);
				date2Arr = date2.split(delimiter);
			}
			if(date1Arr.length < 3 || date2Arr.length < 3){
				return "";
			}

			var dt1 = new Date(date1Arr[0],date1Arr[1],date1Arr[2]);
			var dt2 = new Date(date2Arr[0],date2Arr[1],date2Arr[2]);

			var diff = dt2 - dt1;

			return parseInt(diff/typObj[type]);
		},
		/**
		 * get Tree List
		 * @param srcArr
		 * @param paramObj {keyNm: 'id', pKeyNm: 'groupId', rootVal: 'ROOT'}
		 */
		getTreeList: function(srcArr, paramObj, parentObj) {
			var treeArr = [], defParentObj = {};
			defParentObj[paramObj.keyNm] = paramObj.rootVal;
			parentObj = typeof parentObj !== 'undefined' ? parentObj : defParentObj;

			var childrenArray = srcArr.filter(function(child) {
				return child[paramObj.pKeyNm] == parentObj[paramObj.keyNm];
			});

			if(childrenArray.length > 0) {
				var childArr = [];
				// Transform children into a hash/object keyed on token
				childrenArray.forEach(function(child) {
					childArr.push(child);
				});
				if(parentObj[paramObj.keyNm] == paramObj.rootVal) {
					treeArr = childArr;
				} else {
					parentObj['items'] = childArr;
				}
				childrenArray.forEach(function(child) {
					$COM_UTIL.getTreeList(srcArr, paramObj, child);
				})
			}

			return treeArr;
		},
		/**
		 * 그리드 Scroll Paging 기능
		 * @param  gridId : 그리드ID
		 * @param  frm : Form ID or Form Data Object
		 * @param  url : ajax 호출 url
		 * @param  search : 검색 버튼 호출여부
		 */
		getScrollPagingList : function(gridId,frmId,url,search,frmData,isSync){
			var rowPerPage = 300;
			var async = true;
			if(isSync){
				async = false;
			}

			if(search){
				$('#' + frmId + ' #scrlTotPage').val("1");
				$('#' + frmId + ' #pageNo').val("1");
			}else{
				if( parseInt($('#' + frmId + ' #pageNo').val()) > parseInt($('#' + frmId + ' #scrlTotPage').val())){
					//alert("마지막페이지입니다.");
					return;
				}
			}

			var param = null;
			if(frmData == null){
				param = $COM_UTIL.getRequestData(frmId);
			}else{
				param = frmData;
			}

			param.dataSet.fields.rowPerPage = rowPerPage;

			$a.request(url, {
				data: param,
				//progressInfo: {targetObj: $('#'+gridId)},
				async : async,
				respGridId: gridId,
				success: function(res) {
					var list = res.dataSet.recordSets[gridId].list;
					var totCnt = res.dataSet.recordSets[gridId].totRowCnt;
					//var rowPerPage = $('#rowPerPage').val();
					var scrlTotPage = Math.ceil(totCnt/rowPerPage);

					var serverPageinfo = {
							dataLength: res.dataSet.recordSets[gridId].totRowCnt,	//총 데이터 길이
							current: res.dataSet.recordSets[gridId].pageNo,			//현재 페이지 번호. 서버에서 받아온 현재 페이지 번호를 사용한다.
							perPage: res.dataSet.recordSets[gridId].rowPerPage		//한 페이지에 보일 데이터 갯수
					};

					if(search){
						$('#'+gridId).alopexGrid('dataSet', list , serverPageinfo);
					}else{
						if( parseInt($('#' + frmId + ' #pageNo').val()) > parseInt($('#' + frmId + ' #scrlTotPage').val())){
							//alert("마지막페이지입니다.");
							return;
						}
						$('#'+gridId).alopexGrid('dataAdd', list , serverPageinfo);
					}

					$('#' + frmId + ' #scrlTotPage').val(Math.ceil(totCnt/rowPerPage));
					$('#' + frmId + ' #pageNo').val(parseInt($('#' + frmId + ' #pageNo').val())+1);

					//$('#gr').alopexGrid('dataFlush',  function(editedDataList, deletedDataList){
					$('#'+gridId).alopexGrid('dataFlush',  function(addedDataList,editedDataList, deletedDataList){
						$COM_UTIL.debugLog("##scrollPagingDataFlush");
					});
					$('#'+gridId).alopexGrid('rowSelect', {_state : {selected:true}}, false);
					//$('#'+gridId).alopexGrid('dataSet', list, serverPageinfo);

				}
			});
		},
		/**
		 * 그리드 Scroll Paging 전체페이지 조회 기능
		 * @param  gridId : 그리드ID
		 * @param  frm : Form ID or Form Data Object
		 * @param  url : ajax 호출 url
		 * @param  search : 검색 버튼 호출여부
		 */
		getScrollPagingTotList : function(gridId,frmId,url,search,frmData,isSync){
			var rowPerPage = 10000000;
			var async = true;
			if(isSync){
				async = false;
			}

			if(search){
				$('#' + frmId + ' #scrlTotPage').val("1");
				$('#' + frmId + ' #pageNo').val("1");
			}else{
				if( parseInt($('#' + frmId + ' #pageNo').val()) > parseInt($('#' + frmId + ' #scrlTotPage').val())){
					//alert("마지막페이지입니다.");
					return;
				}
			}

			var param = null;
			if(frmData == null){
				param = $COM_UTIL.getRequestData(frmId);
			}else{
				param = frmData;
			}

			param.dataSet.fields.rowPerPage = rowPerPage;

			$a.request(url, {
				data: param,
				//progressInfo: {targetObj: $('#'+gridId)},
				async : async,
				respGridId: gridId,
				success: function(res) {
					var list = res.dataSet.recordSets[gridId].list;
					var totCnt = res.dataSet.recordSets[gridId].totRowCnt;
					//var rowPerPage = $('#rowPerPage').val();
					var scrlTotPage = Math.ceil(totCnt/rowPerPage);

					var serverPageinfo = {
							dataLength: res.dataSet.recordSets[gridId].totRowCnt,	//총 데이터 길이
							current: res.dataSet.recordSets[gridId].pageNo,			//현재 페이지 번호. 서버에서 받아온 현재 페이지 번호를 사용한다.
							perPage: res.dataSet.recordSets[gridId].rowPerPage		//한 페이지에 보일 데이터 갯수
					};

					if(search){
						$('#'+gridId).alopexGrid('dataSet', list , serverPageinfo);
					}else{
						if( parseInt($('#' + frmId + ' #pageNo').val()) > parseInt($('#' + frmId + ' #scrlTotPage').val())){
							//alert("마지막페이지입니다.");
							return;
						}
						$('#'+gridId).alopexGrid('dataAdd', list , serverPageinfo);
					}

					$('#' + frmId + ' #scrlTotPage').val(Math.ceil(totCnt/rowPerPage));
					$('#' + frmId + ' #pageNo').val(parseInt($('#' + frmId + ' #pageNo').val())+1);

					//$('#gr').alopexGrid('dataFlush',  function(editedDataList, deletedDataList){
					$('#'+gridId).alopexGrid('dataFlush',  function(addedDataList,editedDataList, deletedDataList){
						$COM_UTIL.debugLog("##scrollPagingDataFlush");
					});
					$('#'+gridId).alopexGrid('rowSelect', {_state : {selected:true}}, false);
					//$('#'+gridId).alopexGrid('dataSet', list, serverPageinfo);

				}
			});
		},
		/**
		 * 지정된 select 컴포넌트 option 을 코드데이터 이용하여 채움(상세 검색 전용)
		 * @param  param : 입력된 공통코드 정보
		 * @param  codeList : 공통코드 데이터
		 * @return : true
		 */
		setSelectOptionsByCodeDataSrchDtl : function(param, codeList) {
			var sSelectElemId = param["elemId"].replace(/^#/, "");
			$("#" + sSelectElemId).empty();

			if($COM_UTIL.isNotEmpty(param["codeHead"])) {
				if("none" != param["codeHead"]) {
					$("#" + sSelectElemId).append( $('<option>', { value: "", text: param["codeHead"] }) );
				}
			}
			$.each(codeList, function (index, codeinfo) {
				var codeOpt = new Object();
				codeOpt["value"] = codeinfo[param["optionValue"]];
				codeOpt["text"]  = codeinfo[param["optionText"]];
				$("#" + sSelectElemId).append( $('<option>', codeOpt) );
				$("#" + sSelectElemId + " option:last").attr("data-colId",codeinfo.colId);
				$("#" + sSelectElemId + " option:last").attr("data-colTypCd",codeinfo.colTypCd);
				$("#" + sSelectElemId + " option:last").attr("data-dataTypCd",codeinfo.dataTypCd);
				$("#" + sSelectElemId + " option:last").attr("data-srchTyp",codeinfo.srchTyp);
				$("#" + sSelectElemId + " option:last").attr("data-qryText",codeinfo.qryText);
			});
			return true;
		},
		/**
		 * 지정된 길이만큼 왼쪽 혹은 오른쪽을 지정 문자열로 채운다
		 * @param str : 입력 문자열
		 * @param padStr : 채울 문자열
		 * @param len : 자리수
		 * @param padTyp : LPAD , RPAD 구분
		 */
		getPadStr : function (str,padStr,len,padTyp){
			if(padTyp == "L"){
				if (! str || ! padStr || str.length >= len) {
					return s;
				}
				var max = (len - str.length)/padStr.length;
				for (var i = 0; i < max; i++) {
					str = padStr + str;
				}
				return str;
			}else if(padTyp == "R"){
				if (! str || ! padStr || str.length >= len) {
					return str;
				}
				var max = (len - str.length)/padStr.length;
				for (var i = 0; i < max; i++) {
					str += padStr;
				}
				return str;
			}
		},
		/**
		 * 문자에 comma를 추가.
		 * @param str
		 * @param separator
		 * @returns
		 * setNumberComma('4000') => '4,000'
		 */
		setNumberComma : function(number){
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		/**
		 * 문자에 comma를 제거.
		 * @param str
		 * @param separator
		 * @returns
		 * removeComma('4,000') => '4000'
		 */
		removeComma : function(number){
			return number.toString().replace(/[^\d]+/g, '');
		},
		/**
		 * 숫자의 소수점 이하를 제거하고 3자리마다 comma를 추가하여 반환
		 * @param str
		 * @returns
		 * formatAmt('4000.00') => '4,000'
		 */
		formatAmt: function(num) {
			if (!isNaN(num)) {
				return (new Number(num)).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,');
			} else {
				return '0';
			}
		},
		/**
		 * 의미없는 숫자의 소수점 이하를 제거하고 3자리마다 comma를 추가하여 반환
		 * @param str
		 * @returns
		 * floatAmt('4000.00') => '4,000'
		 * floatAmt('5000.01') => '4,000.01'
		 */
		floatAmt: function(num) {
			if (!this.isEmpty(num) && !isNaN(num)) {
				var tmpValue = parseFloat(num).toString();
				if(tmpValue.indexOf(".") > -1){
					var valueArr = [];
					valueArr = tmpValue.toString().split(".");
					tmpValue = valueArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + valueArr[1].toString();
				}else{
					tmpValue = tmpValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				return tmpValue;
			} else {
				return '';
			}
		},
		/**
		 * get Cookie
		 * @param name
		 * @param byUser
		 * @returns Cookie value
		 */
		getCookie: function(name, byUser) {
			var nameOfCookie = name;
			if(byUser) {
				nameOfCookie += '_' + this.getSsnUserInfo('userId');
			}
			nameOfCookie += '=';
			var x = 0;
			while (x <= document.cookie.length){
				var y = (x + nameOfCookie.length);
				if (document.cookie.substring(x, y) == nameOfCookie) {
					if ((endOfCookie = document.cookie.indexOf(';', y)) == -1) {
						endOfCookie = document.cookie.length;
					}
					return unescape (document.cookie.substring(y, endOfCookie));
				}
				x = document.cookie.indexOf (' ', x) + 1;
				if (x == 0) break;
			}
			return '';
		},
		/**
		 * set Cookie
		 * @param name
		 * @param value
		 * @param expiredays
		 * @param byUser
		 */
		setCookie: function(name, value, expiredays, byUser) {
			var nameOfCookie = name;
			if(byUser) {
				nameOfCookie += '_' + this.getSsnUserInfo('userId');
			}
			var todayDate = new Date();
			todayDate.setDate(todayDate.getDate() + expiredays);

			document.cookie = nameOfCookie + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';';
		},
		/**
		 * 버튼 hide, ROLE_ADMIN만 허용
		 */
		btnAdmControl: function() {
			if(!this.checkUserRole(this.ROLE_ADMIN)) {
				if(arguments.length > 0) {
					for(var idx = 0; idx < arguments.length; idx++) {
						var btnId = arguments[idx].replace(/^#/, "");
						$('#'+btnId).hide();
					}
				}
			}
		},
		/**
		 * 검색폼 엔터 이벤트 등록
		 * @param frmArr [{'frmId','searchFunc'}]
		 */
		setSrchFrmEntEvt : function (frmArr){
			$.each(frmArr,function(idx,itm){
				$("#"+itm.frmId).on("keyup",function(){
					if(event.keyCode==13){
						var dialogElement = $("#_alertWrapDialog");
						//dialog가 있을경우 dialog 처리
						if(dialogElement.length) {
							//단순 동작하지 않게 하기 위해서는 return만 남기면 된다 동작방식 조율된후 수정 요망
							$(dialogElement).close();
							$(dialogElement).remove();
							return;
						}
						eval(itm.frmAction);
					}
				})
			});
		},
		/**
		 * 유저 정의 keyFilter 등록
		 * alopex ui $a.keyfilter.addKeyUpRegexpRule 참조
		 */
		userDefineKeyFilter : function(){
			$a.keyfilter.addKeyUpRegexpRule('userDecimal1', /^-?\d{1,3}(\,?\d{0,3})*\.?\d{0,1}$/);
			$a.keyfilter.addKeyUpRegexpRule('userDecimal2', /^-?\d{1,3}(\,?\d{0,3})*\.?\d{0,2}$/);
			$a.keyfilter.addKeyUpRegexpRule('userDecimal3', /^-?\d{1,3}(\,?\d{0,3})*\.?\d{0,3}$/);
		},
		/**
		 * id로 지정한 영역의 input element의 required 상태를 체크
		 * @param id
		 */
		isAreaRequiredChk : function(id){
			var validate = true;
			$.each($("#"+id).find("input,select"),function(idx,itm){
				var validator = $(this).validator();
				validate = validator.validate();
				var that = this;
				if(!validate){
					$COM_UTIL.alertMsgConfirm("필수값이 누락되었습니다." , null ,function(){
						$(that).focus();
					});
					return false;
				}
			});
			return validate;
		},
		/**
		 * String 으로 입력된 value를 boolean으로 return
		 * @param str
		 */
		stringToBoolean: function(str) {
			if($COM_UTIL.isEmpty(str)) {
				return false;
			}
			if("string" === typeof str) {
				if(str == 'true') {
					return true;
				}
			}
			return false;
		},
		/**
		 * Input box Masking
		 */
		setMaskedInput: function() {
			$(".Textinput").each(function() {
				var databind = $(this).attr("data-bind");
				if($COM_UTIL.isNotEmpty(databind)) {
					if(databind.indexOf('maskedCommaValue') != -1) {
						$(this).focus(function() {
							$(this).val($(this).val().replace(/,/g, ''));
						});
						$(this).blur(function() {
							$(this).val(bindValueFormatToNumber($(this).val()));
						});
					}
				}
			});
		},
		/**
		 * Reset Dateinput Place Holder
		 */
		resetDatePlaceHolder: function() {
			var dateInputArr = document.querySelectorAll("div.Dateinput > input[placeholder]");
			$.each(dateInputArr, function(idx, item) {
				$(this).attr("placeholder", "");		// $(this).attr("placeholder").toUpperCase()
			});
		},
		/**
		 * 보안등급 select box 를 위한 rule array 구함
		 * @param codeHead : "전체", "선택" 등의 text 가 필요할 경우 사용
		 */
		getSecLvArr: function(codeHead) {
			var secLvArr = [];
			if(this.isNotEmpty(codeHead)) {
				secLvArr.push({value: '', text: codeHead});
			}
			for(var idx = 1; idx < 10; idx++) {
				secLvArr.push({value: ''+idx, text: ''+idx});
			}
			return secLvArr;
		},
		/**
		 * 배열에서 필터에 해당하는 값만 구한다.
		 * @param trgArr : 대상이 되는 배열
		 * @param filter : 적용할 필터
		 */
		getArrFilter: function(trgArr, filter) {
			if(this.isEmpty(trgArr) || this.isEmpty(filter)){return "";}
			var filterArr = jQuery.grep(trgArr, function(itm) {
				return (eval(filter));
			});
			return filterArr;
		},
		/**
		 * 그리드에서 특정 Key값의 데이터만 가져온다
		 * @param gridId
		 * @param key
		 */
		getGridDataByKey : function(gridId , key){
			var tmpList = AlopexGrid.trimData($("#" + gridId).alopexGrid("dataGet"));
			var valueArr = [];
			$.each(tmpList,function (idx,itm){
				valueArr.push(itm[key]);
			});
			return valueArr;
		},
		/**
		 * 1차원 배열 중복 여부를 체크한다.
		 * @param srcArr
		 */
		getDupArray : function(srcArr){
			var validArr = [];
			var dupValue = "";
			$.each(srcArr,function(idx,itm){
				if($.inArray(itm,validArr) == -1){
					validArr.push(itm);
				}else{
					dupValue = itm;
					return false;
				}
			});

			return dupValue;
		},
		/**
		 * 그리드의 특정 셀 eidt & focus
		 */
		setGrdFocus : function (gridId ,row , cellName){
			$('#'+gridId).alopexGrid("endEdit");
			var focusInfo = $("#"+gridId).alopexGrid( "focusInfo" );
			$('#'+gridId).alopexGrid( "focusRestore", focusInfo );
			$('#'+gridId).alopexGrid('startRowInlineEdit', {_index : {row : row}});
			$("#"+gridId).alopexGrid( "focusCell", {_index : {row : row}} , cellName );
			var $element = $('#'+gridId).alopexGrid("cellElementGet", {_index:{row:row}}, cellName);
			var $input = $($element.get(0)).find('input');
			if($COM_UTIL.isNotEmpty($input[0])){
				$input.focus();
				if($input.val().length > 0){
					$input[0].select();
				}
			}
		},
		/**
		 * null 이나 빈값을 기본값으로 변경
		 * @param str       입력값
		 * @param defaultVal    기본값(옵션)
		 * @returns {String}    체크 결과값
		 */
		nvl: function(str, defaultVal) {
		    var defaultValue = "";
		    if (typeof defaultVal != 'undefined') {
		        defaultValue = defaultVal;
		    }
		    if (typeof str == "undefined" || str == null || str == '' || str == "undefined") {
		        return defaultValue;
		    }
		    return str;
		},
		
		/**
		 * download CSV file from grid data
		 * @param param : {
		 * url : JSON URL
		 * param : Form Paramerter
		 * gridId : Grid Id
		 * fileNm : File name
		 * sheetNm : Sheet name
		 * }
		 */
		downCsvFromGrid: function(param){
			// 그리드 전체데이터 수
			var pageInfo = $('#' + param.gridId).alopexGrid('pageInfo');
			var dataLength = pageInfo.dataLength;
			
			// 그리드 조회 안내 
			if(dataLength == 0) {
				$COM_UTIL.alertMsg("다운로드 받을 데이터를 먼저 검색하세요.");
				return;
			}
			
			// 다운로드 진행창 팝업
			$COM_UTIL.confirmMsg("총 " + $COM_UTIL.formatAmt(dataLength) + " 건의 데이터를 다운로드 합니다.\n 대용량 엑셀다운로드는 건수에 따라 오랜 시간이 소요될 수 있습니다.\n\n 진행하시겠습니까?",null, function() {
				var downParam = param.param;
				downParam.dataSet.fields.jsonUrl = param.url;
				downParam.dataSet.fields.csvGridId = param.gridId;
				downParam.dataSet.fields.csvFileNm = param.fileNm;
				downParam.dataSet.fields.csvSheetNm = param.sheetNm;
				downParam.dataSet.fields.csvGridReadOption = $('#' + param.gridId).alopexGrid('readOption');
				
				$a.popup({
					url: '/popup/downloadCsvPopup.do'
					,data: downParam
					,windowpopup: true	
					,other: "width=700,height=200,scrollbars=no,resizable=no"
				    ,center: true
				    ,modal: false
				});
			});
		},
		
		openExcelDownloadPopup: function(param) {
			// 그리드 전체데이터 수
			var pageInfo = $('#' + param.gridId).alopexGrid('pageInfo');
			var dataLength = pageInfo.dataLength;
			
			// 그리드 조회 안내 
			if(dataLength == 0) {
				$COM_UTIL.alertMsg("다운로드 받을 데이터를 먼저 검색하세요.");
				return;
			}
			
			// 다운로드 진행창 팝업
			$COM_UTIL.confirmMsg("총 " + $COM_UTIL.formatAmt(dataLength) + " 건의 데이터를 다운로드 합니다.\n 대용량 엑셀다운로드는 건수에 따라 오랜 시간이 소요될 수 있습니다.\n\n 진행하시겠습니까?",null, function() {
				var fields = $.extend({}, param.fields);
				var columnMapping = $('#' + param.gridId).alopexGrid('readOption').columnMapping;
				var headerName = "";
				var columnId = "";
				var width = "";
				var idx = 0;
				for (var i = 0; i < columnMapping.length; i++) {
					if (columnMapping[i].key) {
						if (idx > 0) {
							headerName += ",";
							columnId += ",";
							width += ",";
						}
						headerName += "" + columnMapping[i].title;
						columnId += "" + columnMapping[i].key;
						width += "" + columnMapping[i].width.replace('px', '');
						idx++;
					}
				}
				
				var excelDownloadParam = {};
				var dataSet = {};
				fields['headerName'] = headerName;
				fields['columnId'] = columnId;
				fields['width'] = width;
				fields['fileName'] = $COM_UTIL.clone(param.fileName);
				fields['sheetName'] = $COM_UTIL.clone(param.sheetName);
				fields['url'] = $COM_UTIL.clone(param.url);
				//dataSet['attributes'] = attributes;
				dataSet['fields'] = fields;
				dataSet['recordSets'] = {};
				excelDownloadParam['dataSet'] = dataSet;
				
				$a.popup({
					url: '/popup/downloadExcelPopup.do',
					data: excelDownloadParam,
					windowpopup: true,
					other: "width=700,height=200,scrollbars=no,resizable=no",
					center: true,
					modal: false
				});
			});
		},
		
		downloadExcel: function(p) {
			var form = $COM_UTIL.mkForm('excelDownloadFrm', p.url, 'post');
			var keys = Object.keys(p);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i] != 'url') {
					$COM_UTIL.addFormData(form, keys[i], p[keys[i]]);
				}
			}
			form.submit();
		},
		
		clone: function (obj) {
			if (obj === null || typeof (obj) !== 'object') {
				return obj;
			}
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					copy[attr] = $COM_UTIL.clone(obj[attr]);
				}
			}
			return copy;
		},
		
		mkForm: function (name, action, method) {
			var form = document.createElement('form');
			form.setAttribute('method', method);
			form.setAttribute('action', action);
			form.setAttribute('name', name);
			document.body.appendChild(form);
			return form;
		},
		
		addFormData: function (form, name, value) {
			var el = document.createElement('input');
			el.setAttribute('type', 'hidden');
			el.setAttribute('name', name);
			el.setAttribute('value', value);
			form.appendChild(el);
		}

	};	//end of $COM_UTIL object
})(jQuery);

var _debug = $COM_UTIL.debugLog;
var _console = $COM_UTIL.consoleLog;