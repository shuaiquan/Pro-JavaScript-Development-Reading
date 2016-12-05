var form = document.createElement('form'),
	formField = new FormField('search', '请输入你的搜索内容');

formField = new MaxLengthFieldDecorator(formField, 255);

form.appendChild(formField.createElement());

form.addEventListener('submit', function(e){

	e.preventDefault();

	//判断表单域是否通过验证
	if(formField.isValid()){
		form.submit();
	}else{
		alert('表单填写不正确');
	}
}, false);

window.addEventListener('load', function(){
	document.body.appendChild(form);
}, false);