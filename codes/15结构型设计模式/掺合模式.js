//定义一个mixin，可以借助它实现调试日志记录
var loggingMixin = {
	//声明一个数组，用于存放各条日志记录
	logs: [],

	log: function(message){
		this.logs.push(message);
	},

	readLog: function(){
		return this.logs.join('\n');
	}
};

var element,
	header,
	textField,
	emailFeild;

//定义一个函数，用于将一个对象中的方法和属性应用到另一个对象中
function extendObj(obj1, obj2){

	var obj2Key;

	for(obj2Key in obj2){
		if(obj2.hasOwnProperty(obj2Key)){
			obj1[obj2Key] = obj2[obj2Key];
		}
	}

	return obj1;
}

//定义一个单例，将mixin应用于其上
element = {
	allElements: [],

	create: function(type){
		var elem = document.createElement(type);
		this.allElements.push(elem);

		//使用该mixin的log()方法，确保该方法存在才调用它
		if( typeof this.log === 'function'){
			this.log("创建了一个" + type + '元素');
		}

		return elem;
	},
	getAllElements: funnction(){
		return this.allElements;
	}
};

//定义一个简单的类，将mixin应用于其上
function Field(type, displayText){

	 this.type = type || 'text';
	 this.displayText = displayText || '';

	 //确保mixin的log()方法存在才调用他
	if( typeof this.log === 'function'){
		this.log("创建了一个表单域接口');
	}
}

Field.prototype = {
	getElement: function(){
		var field = document.createElement('input');
		field.setAttribute('type', this.type);
		field.setAttribute('placeholder', this.displayText);

		if( typeof this.log === 'function'){
			this.log('创建了一个表单域接口');
		}

		return field;
	}
};

//将mixin应用于element
element = extendObj(element, loggingMixin);

Field.prototype = extendObj(Field.prototype, loggingMixin);