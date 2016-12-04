//假设以下接口深藏在你庞大的代码库中，用于通过HTTP发出Ajax请求
var http = {
	//发起请求
	makeRequest: function(type, url, callback, data){
		var xhr = new XMLHttpRequest(),
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
};

http.makeRequest('get', '/user/12345', function(response){
	console.log('已经收到响应');
});

http.makeRequest('post', '/user/12345', function(response){
	console.log('已经收到响应');
}, 'name=quan&pass=1234');

//现在假设你要对项目进行重构，你决定引入一个新的结构，使用命名空间
//并且把makeRequest()方法划分为两个独立的GET和POST方法
var myProject = {
	data: {
		ajax: (function(){
			function createRequestObj(callback){
				var xhr = new XMLHttpRequest(),
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

				return xhr;
			}

			return {
				get: function(url, callback){
					var requestObj = createRequestObj(callback);

					requestObj.open("GET", url);
					requestObj.send();
				},

				post: function(url, callback, data){
					var requestObj = createRequestObj(callback);

					requestObj.open("POST", url, data);
					requestObj.send(data);
				}
			};
		}())
	}
};


//调用get()和post()方法
myProject.data.ajax.get('/user/12345', function(response){
	console.log(response);
});

myProject.data.ajax.post('/user/12345', function(response){
	console.log(response);
}, 'name=quan&pass=1234');


//为了避免在代码库中的其余部分重写每一个对http.makeRequest()方法的调用，你可以创建一个适配器来映射旧接口到新方法的映射。
//适配器需要使用与所要替换掉的原方法相同的输入参数，并在适配器内部调用新方法。
function httpToAjaxAdapter(type, url, callback, data){
	if(type.toLowerCase() === 'get'){
		myProject.data.ajax.get(url, callback);
	}else if(type.toLowerCase() === 'post'){
		myProject.data.ajax.post(url, callback, data);
	}
}

//最后应用适配器来代替原来的方法
http.makeRequest = httpToAjaxAdapter;


//对外，和就方法使用一样，对内将调用新的方法
http.makeRequest('get', '/user/12345', function(response){
	console.log('已经收到响应');
});

http.makeRequest('post', '/user/12345', function(response){
	console.log('已经收到响应');
}, 'name=quan&pass=1234');