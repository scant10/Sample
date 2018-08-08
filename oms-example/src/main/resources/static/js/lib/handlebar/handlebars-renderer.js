$('html').hide();

var __hrenderer = {
	serverURL : "resource/dummy/i18n.json",
	default_lang : "kr",
	key_p_i18n : "__i18n",
	key_p_acl : "__acl",
	key_p_lang : "__lang",
	key_s_i18n : "i18n",
	key_s_acl : "acl",
	key_s_lang : "lang",
	event_rendered : "rendered",
	_flag_document : false,
	_flag_controller : false,
	
	render : function(callback) {
		console.log('__hrenderer.render()');
		
		this.registerHelper();
		this.getRenderData(function(context) {
			var bodyElement = document.getElementsByTagName('body')[0];
			var template = Handlebars.compile(bodyElement.innerHTML);
			var html = template(context)
			$(bodyElement).html(html);
			callback();
		});
	},
	
	registerHelper : function() {
		console.log('__hrenderer.registerHelper()');
		
		Handlebars.registerHelper('include', function(items, options) {
			var result;
			
			jQuery.ajax({
				url : items,
				success : function(data) {
					result = Handlebars.compile(data)(options.data.root);
				},
				async : false
			});
			
			return new Handlebars.SafeString(result);
		});
		
		Handlebars.registerHelper('i18n', function(items, options) {
			var keys = items.split('.');
			var data = options.data.root.i18n;
			
			if(data == undefined) {
				return "";
			}
			
			data = data[__hrenderer.default_lang];
			
			if(data == undefined) {
				return "";
			}
			
			for( var i = 0; i < keys.length; i++) {
				data = data[keys[i]]

				if(data == undefined) {
					return "";
				}
			}
			
			return data;
		});
		
		Handlebars.registerHelper('acl', function(items, options) {
			if(items == options.data.root.acl) {
				return options.fn();
			} else {
				return options.inverse();
			}
		});
	},
	
	getRenderData : function(successCallback) {
		this.startWatching();
		
		var renderData = {};
		renderData[this.key_s_i18n] = memoryPreference.get(this.key_p_i18n);
		renderData[this.key_s_acl] = memoryPreference.get(this.key_p_acl);
		
		if(renderData[this.key_s_i18n] == "undefined") {
			console.log('__hrenderer.getRenderData() : request!!');
			$.get(this.serverURL, function(data) {
				memoryPreference.put(__hrenderer.key_p_i18n, data);
				renderData[__hrenderer.key_s_i18n] = JSON.parse(data);
				successCallback(renderData);
			});
		} else {
			renderData[this.key_s_i18n] = JSON.parse(renderData[this.key_s_i18n]);
			successCallback(renderData);
		}
	},
	
	startWatching : function() {
		var lan = this.getUrlParam(this.key_s_lang);
		
		if(lan != "") {
			memoryPreference.put(this.key_p_lang, lan);
			this.default_lang = lan;
		} else {
			var savedLan = memoryPreference.get(this.key_p_lang);
			
			if(savedLan != "undefined") {
				this.default_lang = savedLan;
			}
		}
		
		$(document).one(this.event_rendered, function() {
			console.log('__hrenderer.startWatching()');
			
			$a.request.setup({
				platform : 'NEXCORE.J2EE',
				
				after : function(res) {
					var acl = res[__hrenderer.key_s_acl];
					
					if(acl) {
						memoryPreference.put(__hrenderer.key_p_acl, acl);
					}
				}
			});
		});
	},
	
	renderWithTrigger : function() {
		console.log('__hrenderer.renderWithTrigger() : ' + __hrenderer._flag_document + __hrenderer._flag_controller);
		if(__hrenderer._flag_document && __hrenderer._flag_controller) {
			__hrenderer.render(function() {
				$(document).trigger(__hrenderer.event_rendered);
				$('html').show();
			});
		}
	},
	
	getUrlParam : function(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || ""; 
	}
};

if(_client == "web") {
	$(function() {
		__hrenderer._flag_document = true;
		__hrenderer._flag_controller = true;
		__hrenderer.renderWithTrigger();
	})
} else {
	$(document).one('controllerloaded', function() {
		console.log('__hrenderer controllerloaded');
		__hrenderer._flag_controller = true;
		__hrenderer.renderWithTrigger();
	});
	$(function() {
		console.log('__hrenderer document ready');
		__hrenderer._flag_document = true;
		__hrenderer.renderWithTrigger();
	});
}