//定义一个类来实现中介者模式，供以后创建对象实例使用。
//同时还会为每个对象实例初始化一个用于存储事件的数组，以避免所有实例共享内存中的同一数组
//与观察者模式不同，观察者模式直接定义了一个全局的单例

function Mediator(){
	this.events = {};
}

Mediator.prototype.subscribe = function(eventName, callback){
	if(!this.events.hasOwnProperty(eventName)){
		this.events[eventName] = [];
	}

	this.events[eventName].push(callback);
};

Mediator.prototype.unsubscribe = function(eventName, callback){
	var index = 0,
		length = 0;

	if(this.events.hasOwnProperty(eventName)){
		length = this.events[eventName].length;

		for(; index < length; index++ ){
			if(this.events[eventName][index] === callback){
				this.events[eventName].splice(index, 1);
				break;
			}
		}
	}
};

Mediator.prototype.publish = function(eventName){
	var data = Array.prototype.slice.call(arguments, 1),
		index = 0,
		length = 0;

	if(this.events.hasOwnProperty(eventName)){
		length = this.events[eventName].length;

		for(; index < length; index++){
			this.events[eventName][index].apply(this, data);
		}
	}
};