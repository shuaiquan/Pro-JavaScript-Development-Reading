//定义一个生成器类，用于构建的简单的表单元素
function FormBuilder(){}

FormBuilder.prototype = {

	//定一个属性，用于保存所创建的各个表单域
	fields: [],

	//定义一个方法，用于向表单添加表单域
	addField: function(type, displayText){	//这里参数设置方式我更喜欢使用工厂模式中对象方式，但书上是这么写的，我也不改了
		var field;

		switch(type){
			case 'text':
				field = new TextField(displayText);
				break;
			case 'email':
				field = new EmailField(displayText);
				break;
			case 'button':
				field = new ButtomField(displayText);
				break;
			default:
				throw new Error('暂时不支持该表单域');
		}

		this.fields.push(field);
	},

	//定义一个方法，用于返回<form>元素
	getForm: function(){
		var form = document.createElement('form'),
			i = 0,
			length = this.fields.length,
			field;

		for(; i<length; i++){
			field = this.fields[i];
			form.appendChild(field);
		}

		return form;
	}
};

//定义各种表单域
function TextField(displayText){
	this.displayText = displayText;
}

TextField.prototype.getElement = function(){
	var textField = document.createElement('input');
	textField.setAttribute('type', 'text');
	textField.setAttribute('placeholder', this.displayText);

	return textField;
};

function EmailField(displayText){
	this.displayText = displayText;
}

EmailField.prototype.getElement = function(){
	var emailField = document.createElement('input');
	emailField.setAttribute('type', 'email');
	emailField.setAttribute('placeholder', this.displayText);

	return emailField;
};

function ButtomField(displayText){
	this.displayText = displayText;
}

ButtomField.prototype.getElement = function(){
	var button = document.createElement('button');
	button.setAttribute('type', 'submit');	//作者的原始代码，个人认为这里局限了，button和submit两种类型应当在区分一下
	button.innerHTML = this.displayText;

	return button;
}