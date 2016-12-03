var formBuilder = new FormBuilder(),
	form;

formBuilder.addField('text', '这是一个普通的文本表单域');
formBuilder.addField('email', '这是一个邮箱表单域');
formBuilder.addField('button', '提交');

form = formBuilder.getForm();

window.addEventListener('load', function(){
	document.body.appendChild(form);
}, false);