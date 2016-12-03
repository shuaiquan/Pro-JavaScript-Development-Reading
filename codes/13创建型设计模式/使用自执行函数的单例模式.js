//定义一个单例，当中包含着与cookie操作相关的方法
//初始化代码是通过自执行函数闭包实现的，这是得这使得在创建单例时所执行的代码不是公共性的，不会被应用程序的其他部分访问
var cookie = (function(){

	//cookie保存在document.cookie字符串中，由“;”分隔
	var allCookies = document.cookie.split(';'),
		cookies = {},
		i = 0,
		length = allCookies.length,
		cookie;

	for(; i<length; i++){
		cookie = allCookies[i].split('=');

		cookies[unescape(cookie[0])] = unescape(cookie[1]);
	}

	return {

		//根据cookie名取得值
		get: function(name){
			return cookies[name] || '';
		},

		set: function(name, value){
			cookies[name] = value;
			//这里直接使用= 原始值怎么没有被覆盖掉？？？？？？
			document.cookie = escape(name) + '=' + escape(value);
		}
	}
}());

cookie.set('name', 'shuaiquan');

console.log(cookie.get('name'));