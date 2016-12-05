//定义一个类，用于构建一个对象来表示一个表单域
var FormField = function(type, displayText){
	this.type = type || 'text';
	this.displayText = displayText || '';
};


FormField.prototype = {
	createElement: function(){
		this.element = document.createElement('input');
		this.element.setAttribute('type', this.type);
		this.element.setAttribute('placeholder', this.displayText);

		return this.element;
	},

	isValid: function(){
		return this.element.value !== '';
	}
};

//表单域装饰者，它实现了与FormField相同的公共方法
var FormFieldDecorator = function(formField){
	this.formField = formField;
};

FormField.prototype = {
	createElement: function(){
		this.formField.createElement();
	},
	isValid: function(){
		return this.formField.isValid();
	}
};

var MaxLengthFieldDecorator = function(formField, maxLength){
	FormFieldDecorator.call(this, formField);
	this.maxLength = maxLength || 100;
};

MaxLengthFieldDecorator.prototype = new FormFieldDecorator();
MaxLengthFieldDecorator.prototype.createElement = function(){
	var element = this.formField.createElement();
	element.setAttribute('maxLength', this.maxLength);

	return element;
};