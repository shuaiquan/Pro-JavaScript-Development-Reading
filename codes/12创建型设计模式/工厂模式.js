// 定义一个工厂，它会基于我们传入的内容，使用最合适的类来为我们创建出相应的表单域对象
var FormFieldFactory = {
	makeField: function(options){
		var options = options || {},
			type = options.type || 'text',
			displayText = options.displayText || '',
			field;

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
			//其他类型全部返回text,根据个人需要自己扩展
			default:
				field = new TextField(displayText);
				break;
		}

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
	}
};