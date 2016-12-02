var textField = FormFieldFactory.makeField({
	type: 'text',
	displayText: '请输入你的地址'
});

var emailField = FormFieldFactory.makeField({
	type: 'email',
	displayText: '请输入你的邮箱地址'
});

var buttonField = FormFieldFactory.makeField({
	type: 'button',
	displayText: '提交'
});


//将这3个新创建的对象所表示的DOM元素添加值当前页面
window.addEventListener = function('load', function(){
	var body = document.body;

	body.appendChild(textField.getElement());
	body.appendChild(emailField.getElement());
	body.appendChild(buttonField.getElement());
}, false);