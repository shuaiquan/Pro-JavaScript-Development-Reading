//定义一个基础工厂类，用于创建表单域，其他更明确的表单域创建工厂类将继承与此类
function FormFieldFactory(){

	//定义所支持的表单域类型清单，应用于所有继承与此类的表单域工厂类
	this.availableTypes = {
		TEXT: 'text',
		EMAIL: 'email',
		BUTTOM: 'button'
	};
}

//该方法将被各子类利用多态性进行重写。因此该方法不应该被在此父类中直接调用
FormFieldFactory.prototype.makeField = function(){
	//如果在此父类中直接调用，将抛出一个错误
	return new Error('该方法不应该被直接调用');
};


//定义一个HTML5表单域工厂类，继承于基础工厂类
function Html5FormFieldFactory(){}
Html5FormFieldFactory.prototype = new FormFieldFactory();

//针对此工厂使用名明确的代码重写makeField()方法
Html5FormFieldFactory.prototype.makeField = function(options){
	var options = options || {},
		type = options.type || this.availableTypes.TEXT,
		displayText = options.displayText || '',
		field;


};


//定义一个HTML4表单域工厂类，继承于基础工厂类
function Html4FormFieldFactory(){}
Html4FormFieldFactory.prototype = new FormFieldFactory(){};

//针对此工厂使用名明确的代码重写makeField()方法
Html4FormFieldFactory.prototype.makeField = function(options){
	var options = options || {},
		type = options.type || this.availableTypes.TEXT,
		displayText = options.displayText || '',
		field;
}
