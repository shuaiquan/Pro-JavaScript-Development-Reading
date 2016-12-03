//定义一个基础对象
var field = {
	type: '',
	displayText: '',

	getElement: function(){
		var field = document.creatElement('input');
		field.setAttribute('type', this.type);
		field.setAttribute('placeholder', this.displayText);

		return field;
	}
};

//这个地方我忘记怎么用了，要回顾一下
var textField = Object.creat(field, {

	type : {
		value : 'text',
		enumerable: true
	},
	displayText : {
		value : '这是一个普通文本表单域',
		enumerable: true
	}
});

window.addEventListener('load', function(){
	document.body.appendChild(textField.getElement());
});