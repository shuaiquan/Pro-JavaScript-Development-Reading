//定义一个类，用于构建一个对象，来表示一个简单表单域
function FormField(type, displayText){
	this.type = type || 'text';
	this.displayText = displayText || '';

	//创建并初始化一个表单域DOM元素
	this.element = document.createElement('input');
	this.element.setAttribute('type', this.type);
	this.element.setAttribute('placeholder', this.displayText);
}

FormField.prototype = {
	getElement: function(){
		return this.element;
	},
	isValid: function(){
		return this.element.value !== '';
	}
};

//现在使用相同的方法代理来替换FormField类。它会延迟调用原来的构造函数，直至这些方法被真正调用。这样节省了内存资源并提高了性能
//根据需要，可使用模块模式来使该代理类的作用域实现局部化，传入原来的FormField类并返回它所经过代理的版本
FormField = (function(FormField){

	//定义代理构造函数
	function FormFieldProxy(type, displayText){
		this.type = type;
		this.displayText = displayText;
	}

	FormFieldProxy.prototype = {
		//定义一个属性，用于在原来的类被实例化之后，保存对该实例的引用
		formField: null,

		initialize: function(){
			if(!this.formField){
				this.formField = new FormField(this.type, this.displayText);
			}
		},

		//使用一些新的方法对原来的各个方法进行代理
		//只有当这些新方法当中某一个被调用时，才会调用initialize()方法来实例化
		getElement: function(){
			this.initialize();
			return this.formField.getElement();
		},

		isValid: function(){
			this.initialize();
			return this.formField.isValid();
		}
	};

	return FormFieldProxy;
}(formField));

//创建实例对象，它们实际调用的都是代理类而不是原来的类。
//这意味着，在此阶段DOM元素并没有创建，节省了内存，提高了性能。
var emailField = new FormField('email', '这是一个邮箱表单域');

window.addEventListener('load', function(){
	document.body.appendChild(emailField.getElement());
}, false);