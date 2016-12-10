//为我们的代码库定义两个中介者。一个辅助实现表单的功能，另一个辅助是想日志消息的记录功能
var formMediator = new Mediator(),
	loggingMediator = new Mediator();

//定义一个模块，用于Ajax通信。
//当formMdiator发出form-submit事件时，会将数据发送到服务器
(function(formMediator){
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
		}

		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	formMediator.subscribe('form-submit', function(url, formData){
		ajaxPost(url, formData, function(response){
			formMediator.publish('ajax-response', response);
		});
	});

}(formMediator));

//定义另一个模块，处理表单，发出form-submit事件
(function(formMediator){
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

		formMediator.publish('form-submit', action, data.join('&'));
	}

	form.addEventListener('submit', onFormSubmit, false);

	formMediator.subscribe('ajax-response', function(response){
		thankYouMessage.innerHTML = '提交成功，以收到响应';
		form.parentNode.appendChild(thankYouMessage);
	});

}(formMediator));

//定义一个模块，记录系统中的消息
(function(loggingMediator){
	//储蓄日志记录
	var logs = [];

	loggingMediator.subscribe('log', function(message){
		logs.push({
			message: message,
			date: new Date()
		});
	});

	loggingMediator.subscribe('retrieve-log', function(){
		loggingMediator.publish('log-retrieve', logs);
	});

}(loggingMediator));

//定义一个模块，打印日志记录
(function(loggingMediator){

	var button = document.createElement('button');

	button.innerHTML = '打印日志';

	button.addEventListener('click', function(){
		loggingMediator.publish('retrieve-log');
	}, false);

	loggingMediator.subscribe('log-retrieve', function(logs){
		var index = 0,
			length = logs.length,
			ulTag = document.createElement('ul'),
			liTAg = document.createElement('li'),
			listItem;

		for(; index < length; index++){
			listItem = liTAg.cloneNode(false);
			listItem.innerHTML = logs[index].date.toUTCString() + ': ' + logs[index].message;
			ulTag.appendChild(listItem);
		}

		document.body.appendChild(ulTag);
	});

	document.body.appendChild(button);

}(loggingMediator));

//定义一个模块，记录formMediator中发生的事件。这是本例中唯一一个使用频率超过一个中介者的模块
(function(formMediator, loggingMediator){

	formMediator.subscribe('form-submit', function(url){
		loggingMediator.publish('log', '表单提交至：' + url);
	});

	formMediator.subscribe('ajax-response', function(response){
		loggingMediator.publish('log', '收到的响应为：' + response);
	});
	
}(formMediator, loggingMediator));