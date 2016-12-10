//定义一个模块，用于ajax通信。
(function(observer){

	function ajaxPost(url, data, callback){
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

		xhr.open("POST", url);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	//注册全局的，自定义的form-submit事件。当该事件由代码库中的其他模块发出时，使用所提供的URL和数据来发出一个请求。
	//完成后，发出ajax-response事件，并把返回的数据传入。
	observer.subscribe('form-submit', function(url, formData){
		ajaxPost(url, formData, function(response){
			observer.publish('ajax-response', response);
		});
	});

}(observer));

//模拟代码库中的另一模块
(function(observer){
	var form = document.getElementById('my-form'),
		//保存url
		action = form.action,
		data = [],
		fields = form.getElementsByTagName('input'),
		index = 0,
		length = fields.length,
		field,
		thankYouMessage = document.createElement('p');

	function onFormSubmit(e){
		e.preventDefault();

		for(; index < length; index++){
			field = fields[index];
			data.push(escape(field.name) + '=' + escape(field.value));
		}

		observer.publish('form-submit', action, data.join('&'));
	}

	form.addEventListener('submit', onFormSubmit, false);

	observer.subscribe('ajax-response', function(response){
		thankYouMessage.innerHTML = '提交成功，以收到响应';
		form.parentNode.appendChild(thankYouMessage);
	});

}(observer));