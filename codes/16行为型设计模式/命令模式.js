var cookie = (function(){
	var allCookie = document.cookie.split(';'),
		cookies = {},
		cookiesIndex = 0,
		cookiesLength = allCookie.length,
		cookie;

	for(; cookiesIndex < cookiesLength; cookiesIndex++){
		cookie = allCookies[cookiesIndex].split('=');

		cookies[unescape(cookie[0])] = unescape(cookie[1]);
	}

	return {
		get: function(name){
			return cookies[name] || '';
		},

		set: function(name, value){
			cookies[name] = value;
			document.cookie = escape(name) + '=' + escape(value);
		},

		remove: function(name){
			delete cookies[name];
			document.cookies = escape(name) + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},

		//提供一个execute()方法，用于对其他方法的调用进行抽象
		execute: function(command, params){
			if(this.hasOwnProperty(command) && typeof this[command] == 'function'){
				return this[command].apply(this, params);
			}
		}
	};
}());


cookie.execute('set', ['name', 'shuaiquan']);

console.log(cookie.execute('get', ['name']));