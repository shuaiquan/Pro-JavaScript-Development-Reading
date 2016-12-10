//定义一个表单域，表示HTML页面中的一个表单域
function FormField(type, displayText){
	this.type = type || 'text';
	this.displayText = displayText || '';

	this.element = document.createElement('input');
	this.element.setAttribute('type', this.type);

	this.label = document.createElement('label');
	this.label.innerHTML = this.displayText;

	document.body.appendChild(this.label);
	document.body.appendChild(this.element);
}

FormField.prototype = {
	getValue: function(){
		return this.element.value;
	},
	setValue: function(value){
		this.element.value = value;
	},

	//根据表单域中的值是否有效来返回true或false
	isValid: function(){
		var isValid = false,
			value;

		if(this.type === 'text'){
			isValid = this.getValue() !== '';
		
		}else if(this.type === 'email'){
			value = this.element.value;
			isValid = value !== '' && value.indexOf('@') > 0 && value.indexOf('.', value.indexOf('@')) > 0;

		}else if(this.type === 'number'){
			value = this.element.value;
			isValid = !isNaN(parseInt(value, 10));

		}else{
			//在HTML5中有24种可能的<input>类型，写不完了。。
			//策略模式可以简化这里的代码，使之更加易于理解并且在以后更易于扩展
			....
		}

		return isValid;
	}
};