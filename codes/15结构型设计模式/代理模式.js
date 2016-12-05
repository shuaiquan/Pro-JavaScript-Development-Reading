//对myData.cookies.get()方法实现代理，先把当前方法保存在一个变量中
var proxiedGet = myData.cookies.get;

//使用一个新的函数来重写get()方法，对原来的方法实现代理并增加它的行为
myData.cookies.get = function(){

	//调用被代理的方法来获取它可能产生的值
	var value = proxiedGet.apply(this, arguments);

	value = value.toUpperCase();

	//对于实施了某种操作后的值，类型要与被代理方法相同。
	//使用该值作为返回值，则新方法的使用不会影响到原有的对该方法的调用
	
	return value;
}