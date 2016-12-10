//实例化时，传入一个对象作为第三个参数，此对象包含我们所创建特定类型的表单域的isValid()方法的特定实现。
function FormField(type, displayText, strategy){
	this.type = type || 'text';
	this.displayText = displayText || '';

	this.element = document.createElement('input');
	this.element.setAttribute('type', this.type);

	this.label = document.createElement('label');
	this.label.innerHTML = this.displayText;

	//检查是否传入策略对象，没有则使用默认值
	if(strategy && typeof strategy.isValid === 'function'){
		this.strategy = strategy;
	}else{
		this.strategy = {
			isValid: function(){
				return false;
			}
		};
	}

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
		return this.strategy.isValid.call(this);
	}
};

//我们可以根据需要，定制我们需要的全部策略对象
var textFieldStrategy = {
		isValid: function(){
			isValid = this.getValue() !== '';
		}
	},
	emailFieldStrategy = {
		isValid: function(){
			value = this.element.value;
			isValid = value !== '' && value.indexOf('@') > 0 && value.indexOf('.', value.indexOf('@')) > 0;
		}
	},
	numberFieldStrategy = {
		isValid: function(){
			value = this.element.value;
			isValid = !isNaN(parseInt(value, 10));
		}
	};