var textField,
	emailField;

//定义一个Field类
function Field(type, displayText){
	this.type = type || 'text';
	this.displayText = displayText || '';
}

Field.prototype = {
	getElement: function(){
		var field = document.creatElement('input');
		field.setAttribute('type', this.type);
		field.setAttribute('placeholder', this.displayText);

		return field;
	}
}

textField = new Field('text', '这是一个普通文本表单域');
emailField = new Field('email', '这是一个邮箱表单域');

window.addEventListener('load', function(){
	var body = document.body;

	body.appendChild(textField.getElement());
	body.appendChild(emailField.getElement());
}, false);