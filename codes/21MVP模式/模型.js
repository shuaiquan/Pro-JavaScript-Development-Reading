//模型表示系统的数据
//定义该模型为一个类，可以创建多个对象实例
function EmailModel(data){
	this.emailAddresses = data || [];
}

EmailModel.prototype = {
	add: funciton(email){
		//添加至数组开始的位置
		this.emailAddresses.unshift(email);
		//广播一个事件到系统,观察者定义的代码参照设计模式
		observer.publish('model.email-address.added', email);
	},

	remove: function(email){
		var index = 0,
			length = this.emailAddresses.length;

		for(; index < length; index++){
			if( this.emailAddresses[index] === email){
				this.emailAddresses.splice(index, 1);

				observer.publish('model.email-address.removed', email);
				break;
			}
		}
	},

	getAll: function(){
		return this.emailAddresses;
	}
};