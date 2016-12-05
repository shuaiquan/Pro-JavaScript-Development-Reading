//模块模式是很有特色的，他综合使用了自执行的匿名函数闭包，作为参数传入的依赖，以及一个可选的return语句
//
var cookie = (function(document, undefined){
	var allCookies = document.cookie.split(';'),
		cookies = {},
		cookiesIndex = 0,
		cookiesLength = allCookies.length,
		cookie;

	for(; cookiesIndex<cookiesLength; cookiesIndex++){
		cookie = allCookies[cookiesIndex].split('=');

		cookies[unescape(cookie[0])] = unescape(cookie[1]);
	}

	//暴露出一些方法，属性，以便在代码库的其余部分进行访问使用。
	return {
		get: function(name){
			return cookies[name] || '';
		},
		set: function(name, value){
			cookies[name] = value;
			document.cookie = escape(name) + '=' + escape(value);
		}
	};
}(document));