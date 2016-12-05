//定义一个函数，作为facade来简化和帮助是想跨浏览器的Ajax调用
function ajaxCall(type, url, callback, data){

	//根据当前浏览器获取Ajax连接对象的引用
	var	xhr = (function(){
		try {
			//现代浏览器的标准方法
			return new XMLHttpRequest();
		}catch(e){}
	
		try	{
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		}catch(e){}

		try	{
			return new ActiveXObject('Msxml2.XMLHTTP.3.0');
		}catch(e){}
	
		try	{
			return new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){}

		throw new Error('该浏览器不支持Ajax');
	}()),

		STATE_LOADED = 4,
		STATUS_OK = 200;

	xhr.onreadystatechange = function(){
		if(xhr.readyState !== STATE_LOADED){
			return;
		}

		if(xhr.status === STATUS_OK){
			callback(xhr.responseText);
		}
	};

	xhr.open(type.toUpperCase(), url);
	xhr.send(data);
}



//使用
ajaxCall('get', '/user/12345', function(response){
	console.log(response);
});

ajaxCall('post', '/user/12345', function(response){
	console.log(response);
}, 'name=quan&pass=1234');