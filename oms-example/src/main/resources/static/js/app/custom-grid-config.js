/**
 * Alopex Grid Custom Config
 */
AlopexGrid.setup({
	pager: true,
	fitTableWidth: true,
	paging: {
		pagerTotal : true,
		hidePageList: false,
		pagerSelect: [10, 30, 50]
	},
	numberingColumnFromZero: false,
	cellInlineEdit : false,
	rowSelectOption: {
		singleSelect: true,
		clickSelect: false
	},
	cellSelectable : true,
	rowInlineEdit : true,
	autoColumnIndex: true,
	fitTableWidth: true,
	defaultState: {dataAdd: {selected : true}},
	defaultColumnMapping: {
		defaultValue: '',
		resizing: true,
		align: 'center',
		headerStyleclass:'EXCEL_HRD' 
	},
	height: '10row',
	useClassHovering: true,
	fillUndefinedKey: '',
	enableContextMenu: false,
	enableDefaultContextMenu: false,
	renderMapping: {
		"bizNo" : {
			renderer: function(value, data, render, mapping, grid) {
				return value.replace(/-/g, '').replace(/(\d{3})(\d{2})(\d{5})/g, '$1-$2-$3');
			}
		},
		"inBizNo" : {
			//입력폼 사업자 등록번호 마스크 처리
			renderer: function(value, data, render, mapping) {
				var maskedInput = "<input class='textInput'>"+value+"</input>";
				return maskedInput;
			},
			 postRender: function(cell, value, data, render, mapping, grid) {
					var $cell = $(cell);
					var $maskedInput = $cell.find('.textInput');
					$a.maskedinput($maskedInput[0], "000-00-00000");
			}
		},
		"valueToText" : {
			//render rule의 value에 해당하는 값이 없을 경우 공백값으로 표시하기 위해 추가
			//(* type: string 일 경우 value가 없을 때 value값으로 노출됨)
			renderer: function(value, data, render, mapping) {
				var custComNm = "";
				$.each(render.rule, function(idx, item) {
					if (item.value == value) {
						custComNm = item.text;
						return false;
					}
				});
				return custComNm;
			}
		},
		"floatAmt": {
			renderer: function(value, data, render, mapping, grid) {
				var rule = render.rule;
				var tmpValue = parseFloat(value).toString();
				if (!isNaN(value)) {
					if(tmpValue.indexOf(".") > -1){
						var valueArr = [];
						valueArr = tmpValue.toString().split(".");
						tmpValue = valueArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + valueArr[1].toString();
					}else{
						tmpValue = tmpValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}
					return tmpValue;
				} else {
					data[mapping.key] = 0;
					return data[mapping.key];
				}
			}
		},
		"decimal": {
			renderer: function(value, data) {
				return '<div><input type="text" class="Textinput Width-100" data-keyfilter-rule="decimal" style="text-align:right;" value="'+ parseFloat(value).toString() +'"/></div>'; 
			},
			editedValue: function(cell, data, render, mapping, grid) {
				return $(cell).find('input').val();
			},
		},
		"decimal2": {
			renderer: function(value, data) {
				return '<div><input type="text" class="Textinput Width-100" data-keyfilter-rule="userDecimal2" style="text-align:right;" value="'+ parseFloat(value).toString() +'"/></div>'; 
			},
			editedValue: function(cell, data, render, mapping, grid) {
				return $(cell).find('input').val();
			},
		},
		"decimal3": {
			renderer: function(value, data) {
				return '<div><input type="text" class="Textinput Width-100" data-keyfilter-rule="userDecimal3" style="text-align:right;" value="'+ parseFloat(value).toString() +'"/></div>'; 
			},
			editedValue: function(cell, data, render, mapping, grid) {
				return $(cell).find('input').val();
			},
		},
		"number": {
			renderer: function(value, data) {
				return '<div><input type="text" class="Textinput Width-100" data-keyfilter-rule="digits" style="text-align:right;" value="'+ value +'"/></div>'; 
			},
			editedValue: function(cell, data, render, mapping, grid) {
				return $(cell).find('input').val();
			},
		},
		"amt": {
			renderer: function(value, data, render, mapping, grid) {
				var rule = render.rule;
				if (!isNaN(value)) {
					return (new Number(value)).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,');
				} else {
					data[mapping.key] = 0;
					return data[mapping.key];
				}
			}
		},
		//달력.
		"dateinput" : {
			renderer: function(value, data, render, mapping, grid) {
				var renderValue = "";
				var tmp = "";
				
				if(!$COM_UTIL.isEmpty(value)){
					tmp = value.split("-");
					if(tmp.length  == 3){
						//이미 포멧팅 된경우 skip
						renderValue =  value;
					}
					else if(value.length == 8) {
						renderValue =   value.toString().substr(0,4) + '-' + value.toString().substr(4,2) + '-' + value.toString().substr(6,2);
					} 
					else{
						renderValue = value;
					}
				}else{
					renderValue = value;
				}
				
				var div = document.createElement('div');
				var div2 = document.createElement('div');
				var input = document.createElement('input');
				$(input).val(renderValue.substr(0,10));
				//$(input).attr('disabled', 'disabled');
				$(input).css("width","85%");
				$(div).addClass("Dateinput");
				$(div).attr('data-format','yyyy-MM-dd');
				$(div2).addClass("Calendar");
				$(div).append(input);
				$(div).append(div2);
				
				$(div).convert();
				return div;
			},
			editedValue : function(cell, data, render, mapping, grid) {
				var value = $(cell).find("input").eq(0).val();
				var format = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
				var format2 = /^(19[7-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
				if(!format.test(value)){
					if(!format2.test(value)){
						return $.datepicker.formatDate('yymmdd',new Date());
					}
				}
				return value.replace(/-/g, "");
			},
		},
		//날짜
		"dateTypeYYYY-MM-DD" : {
			renderer: function(value, data, render, mapping, grid) {
				if($COM_UTIL.isEmpty(value)){
					return "";
				}
				var tmp = "";
				tmp = value.split("-");
				if(tmp.length  == 3){
					//이미 포멧팅 된  경우 강제로 10자리 자름
					//return value;
					return value.toString().substr(0,10);
				}else{
					return  value.toString().substr(0,4) + '-' + value.toString().substr(4,2) + '-' + value.toString().substr(6,2);
				}
			}
		},
		"dateTypeYYYY-MM" : {
			renderer: function(value, data, render, mapping, grid) {
				return  value.toString().substr(0,4) + '-' + value.toString().substr(4,2) ;
			}
		},
		//A link.
		"linkText" : {
			renderer:function(value, data, render, mapping, grid) {
				//ams-layout.css에 a:Link 관련 css가 정의되어 있어서 색상을 변경하지 못해 !important를 사용함.
				//linkText는 그리드내에서 이벤트를 감지하기 위해 임의로 선언한 class
				return '<span><div class="linkText" style="cursor:pointer;text-decoration:underline;">' + value + '</div></span>';
			}
		},
		"linkTextA" : {
			renderer:function(value, data, render, mapping, grid) {
				//ams-layout.css에 a:Link 관련 css가 정의되어 있어서 색상을 변경하지 못해 !important를 사용함.
				//linkText는 그리드내에서 이벤트를 감지하기 위해 임의로 선언한 class
				return '<span><a href="#" class="linkText" style="color:RoyalBlue !important;cursor:pointer;text-decoration:underline;">' + value + '</a></span>';
			}
		},
		//Code Arr A link.
		"linkCodeText" : {
			renderer: function(value, data, render, mapping, grid) {
				//ams-layout.css에 a:Link 관련 css가 정의되어 있어서 색상을 변경하지 못해 !important를 사용함.
				//linkText는 그리드내에서 이벤트를 감지하기 위해 임의로 선언한 class
				//rule 로 Code Arr를 가지고 있는 경우 사용
				$.each(render.rule,function(idx,itm){
					if(itm.value == value){
						value = itm.text;
					}
				});
				return '<span><a href="#" class="linkText" style="color:RoyalBlue !important;">' + value + '</a></span>';
			}
		},
		//강조 Text.
		"redText" : {
			renderer:function(value, data, render, mapping, grid) {
				return '<span style="color:Crimson !important;">' + value + '</span>';
			}
		},
		//AutoComplete
		"autocomplete" : {
			renderer: function(value, data, render, mapping, grid) {
				var $autoCmpltDiv = $("<div></div>");
				$autoCmpltDiv.attr({
					"class": "Autocomplete",
					"data-maxheight": "150",
					"style": "width: 100%",
					"data-open-button": "true",
					"data-dynamic-dropdown": "true",
				});
				
				return $autoCmpltDiv;
			},
			postRender: function(cell, value, data, render, mapping, grid) {
				var $cell = $(cell);
				var $autocomplete = $cell.find(".Autocomplete").convert();
				if(render.rule) {
					$autocomplete.setOptions({
						source: render.rule,
						select: function(e) {
						}
					});
					
					$.each(render.rule, function(idx, obj) {
						if(obj.value == value) {
							$autocomplete.select(idx);
							return false;
						}
					});
				}
				return cell;
			},
			editedValue: function(cell, data, render, mapping, grid) {
				var $cell = $(cell);
				var $autocomplete = $cell.find(".Autocomplete");
				var selData = $autocomplete.getSelectedData();
				if($COM_UTIL.isEmpty(selData)) {
					return data[mapping.key];
				}
				return selData.value;
			}
		},
		"fileSize": {
			renderer: function(value, data, render, mapping, grid) {
				var units = ['Byte', 'KB', 'MB', 'GB'];
				var size = value;
				for (var i = 0; i < units.length; i++) {
					unit = units[i];
					if (size < 1000) {
						break;
					}
					size = size / 1024;
				}
				size = size.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return size + " " + unit;
			}
		},
		"datetime": {
			renderer: function(value, data, render, mapping, grid) {
				var d =  new Date(value);
				var result = '';
				var yyyy = d.getFullYear();
				var MM = d.getMonth() + 1;
				var dd = d.getDate();
				var HH = d.getHours();
				var mm = d.getMinutes();
				var ss = d.getSeconds();
				MM = (MM < 10)? '0' + MM: MM;
				dd = (dd < 10)? '0' + dd: dd;
				HH = (HH < 10)? '0' + HH: HH;
				mm = (mm < 10)? '0' + mm: mm;
				ss = (ss < 10)? '0' + ss: ss;
				result += [yyyy, MM, dd].join('-');
				result += ' ' + [HH, mm, ss].join(':');
				return result;
			}
		}
	}
});

/* Grid select column 정의
 * columnMapping: [
 * 		{extend:['selectColumn']},
 * 		...
 * ]
 */
AlopexGrid.define("selectColumn", {
	align: 'center', key: 'check', width: '30',  excludeFitWidth: true, selectorColumn: true
});

/* Grid flag column 정의
 * columnMapping: [
 * 		{extend:['flagColumn']},
 * 		...
 * ]
 */
AlopexGrid.define("flagColumn", {
	key: 'rowStatusFlag', width: '30', title: 'F', excludeFitWidth: true,
	styleclass: function(value, data, mapping) {
		if (data._state.added == true) {
			return 'cell-flag-color-add';
		} else if (data._state.deleted == true) {
			return 'cell-flag-color-del';
		} else if (data._state.edited == true) {
			return 'cell-flag-color-mod';
		}
	},
	render: function(value, data) {
		if (data._state.added == true) {return 'A';}
		else if (data._state.deleted == true) {return 'D';}
		else if (data._state.edited == true) {return 'E';}
	},
	value : function(value, data, render, mapping){
		if (data._state.added == true) {return 'A';}
		else if (data._state.deleted == true) {return 'D';}
		else if (data._state.edited == true) {return 'E';}
		else {return '';}
	}
});