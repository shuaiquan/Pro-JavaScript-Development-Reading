//确认浏览器是否支持HTML5
var supportstHtml5FormFields = (function{

	var field = document.createElement('input');
	field.setAttribute('type', 'email');

	return field.type === 'email';
}());

var formFieldFactory = supportstHtml5FormFields ? new Html5FormFieldFactory() : new Html4FormFieldFactory();

var textField = formFieldFactory.makeField({
	type: 'text',
	displayText: '这是一个文本表单域'
});

window.addEvenetListener('load', function(){
	var body = document.body;

	body.appendChild(textField.getElement());
}, false);