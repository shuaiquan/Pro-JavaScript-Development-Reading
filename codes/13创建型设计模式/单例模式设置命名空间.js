//使用对象直接量来创建一个层级划分组的各项属性和方法的结构，称作‘命名空间’
var myProject = {
	data: {
		//每个嵌套的属性表示一个新的，更加深层的命名空间层级
		ajax: {
			get: function(url, callback){
				var xhr = new XMLHttpRequest(),
					STATE_LOADED = 4,
					STATUS_OK = 200;

				xhr.onreadystatechange = function(){
					if (xhr.readyState !== STATE_LOADED ){
						return;
					}

					if( xhr.status === STATUS_OK){
						callback(xhr.responseText);
					}
				}

				xhr.open('GET', url);
				xhr.send();
			}
		}
	}
};

//命名空间创建之后，可以通过使用‘.’标记法来增加命名空间
myProject.data.cookie = {
	get: function(name){
		var output = '',
			escapedName = escape(name),
			start = document.cookie.indexOf(escapedName + '='),
			end = document.cookie.indexOf(";", start);

		...
	}
}