/**
 * Alopex UI Custom Config
**/

$a.request.setup({
	url: function(id, option) {
		return id;
	},
	method: 'post',
	platform: 'default',
	timeout: 300000
});