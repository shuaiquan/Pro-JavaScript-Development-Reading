//定义一个基础工厂类，用于创建表单域，其他更明确的表单域创建工厂类将继承与此类
function FormFieldFactory(){

	//定义所支持的表单域类型清单，应用于所有继承与此类的表单域工厂类
	this.availableTypes = {
		TEXT: 'text',
		EMAIL: 'email',
		BUTTOM: 'button'
	};
}

//该方法将被各子类利用多态性进行重写。因此该方法不应该被在此父类中直接调用
FormFieldFactory.prototype.makeField = function(){
	//如果在此父类中直接调用，将抛出一个错误
	return new Error('该方法不应该被直接调用');
};


//定义一个HTML5表单域工厂类，继承于基础工厂类
function Html5FormFieldFactory(){}
Html5FormFieldFactory.prototype = new FormFieldFactory();

//针对此工厂使用名明确的代码重写makeField()方法
Html5FormFieldFactory.prototype.makeField = function(options){
	var options = options || {},
		type = options.type || this.availableTypes.TEXT,
		displayText = options.displayText || '',
		field;

	switch(type){
		case this.availableTypes.TEXT:
			field = new Html5TextField(displayText);
			break;
		case this.availableTypes.EMAIL: 
			field = new Html5EmailField(displayText);
			break;
		case this.availableTypes.BUTTOM:
			field = new ButtonField(displayText);
			break;
		default:
			throw new Error('暂时不支持这种类型表单域');
	}

	return field;
};


//定义一个HTML4表单域工厂类，继承于基础工厂类
function Html4FormFieldFactory(){}
Html4FormFieldFactory.prototype = new FormFieldFactory(){};

//针对此工厂使用名明确的代码重写makeField()方法
Html4FormFieldFactory.prototype.makeField = function(options){
	var options = options || {},
		type = options.type || this.availableTypes.TEXT,
		displayText = options.displayText || '',
		field;

	switch(type){
		case this.availableTypes.TEXT: 
			field = new Html4TextField(displayText);
			break;
		case this.availableTypes.BUTTOM:
			field = new ButtonField(displayText);
			break;
		default:
			throw new Error('暂时不支持这种表单域类型');
	}

	return field;
}


//定义各种表单域的类，区分html5和html4
//html5的text
function Html5TextField(displayText){
	this.displayText = displayText || '';
}

Html5TextField.prototype.getElement = function(){
	var textField = document.createElement('input');
	textField.setAttribute('type', 'text');
	textField.setAttribute('placeholder', this.displayText);

	return textField;
}


//html4的text,不支持placeholder属性
function Html4TextField(displayText){
	this.displayText = displayText || '';
}

Html4TextField.prototype.getElement = function(){
	var wrapper = document.createElement('div'),
		textField = document.createElement('input'),
		textFieldId = 'text-field-' + Math.floor(Math.random()*999),
		label = document.createElement('label'),
		labelText = document.createTextNode(this.displayText);

	textField.setAttribute('type', 'text');
	textField.setAttribute('id', textFieldId);

	label.setAttribute('for', textFieldId);
	label.appendChild(labelText);

	wrapper.appendChild(textField);
	wrapper.appendChild(label);

	return wrapper;
}

//html5的email
function Html5EmailField(displayText){
	this.displayText = displayText || '';
}

Html5EmailField.prototype.getElement = function(){
	var emailField = document.createElement('input');
	emailField.setAttribute('type', 'email');
	emailField.setAttribute('placeholder', this.displayText);

	return emailField;
}


//html5和html4中button没有区别，不做区分
function ButtonField(displayText){
	this.displayText = displayText || '';
}

ButtonField.prototype.getElement = function(){
	var button = document.createElement('button');
	button.setAttribute('type', 'submit');
	button.innerHTML = this.displayText;

	return button;
}