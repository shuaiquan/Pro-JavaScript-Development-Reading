//定义一个命名空间，将会把一些模块放入此命名空间
var myData = {};

//添加Ajax模块
myData = (function(myNamespace, undefined){

	myNamespace.ajax = {
		get: function(){

		}
	};

	return myNamespace;
}(myData || {}));

//添加cookie模块
myData = (function(myNamespace, undefined){
	myNamespace.cookie = {
		get: function(name){

		}
	};

	return myNamespace;
}myData || {});