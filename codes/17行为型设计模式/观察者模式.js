var observer = (function(){

	//定义一个对象。按事件名称保存所注册的事件以及回调函数
	var events = {};

	return {
		//用于保存一个函数以及和该函数相关联的事件名称。
		subscribe: function(eventName, callback){
			//如果该事件还没有被注册过
			if(!events.hasOwnProperty(eventName)){
				events[eventName] = [];
			}

			events[eventName].push(callback);
		},
		//移除指定事件的指定函数
		unsubscribe: function(eventName, callback){
			var index = 0,
				length = 0;

			if(events.hasOwnProperty(eventName)){
				length = events[eventName].length;

				for(; index < length; index++){
					if(events[eventName][index] === callback){
						events[eventName].splice(index, 1);
						break;
					}
				}
			}
		},
		//依次执行指定事件的所有回调函数
		publish: function(eventName){

			//除了第一个参数，把调用publish函数时传入的所有参数保存为一个数组
			var data = Array.prototype.slice.call(arguments, 1),
				index = 0,
				length = 0;

			if(events.hasOwnProperty(eventName)){
				length = events[eventName].length;

				for(; index < length; index++ ){
					events[eventName][index].apply(this, data);
				}
			}
		}
	};
}());