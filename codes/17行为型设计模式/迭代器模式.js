//定义一个类，用于迭代/循环数组或有对象特征的数据结构
function Iterator(data){

	var key;

	this.data = data || {};

	this.index = 0;
	this.keys = [];

	//使用一个指示符来表示所提供的数据究竟是数组还是对象
	this.isArray = Object.prototype.toString.call(data) === '[object Array]';

	if(this.isArray){
		//如果是数组
		this.length = data.length;
	}else{
		//如果是对象数据
		for(key in data){
			if(data.hasOwnProperty(key)){
				this.keys.push(key);
			}
		}

		this.length = this.keys.length;
	}
}

//定义一个方法，用于重置序号
Iterator.prototype.rewind = function(){
	this.index = 0;
};

//定义一个方法，用于返回迭代器当前序号位置所保存的值
Iterator.prototype.current = function(){
	return this.isArray ? this.data[this.index] : this.data[this.keys[this.index]];
};

//定义一个方法，用于返回当前序号位置的值，并将序号+1
Iterator.prototype.next = function(){
	var value = this.current();
	this.index++;

	return value;
};

//定义一个方法，用于指出当前位置是否为数据的末置位
Iterator.prototype.hasNext = function(){
	return this.index < this.length;
};

//定义一个方法，重置为起始位置，并返回第一个数据项
Iterator.prototype.first = function(){
	this.rewind();
	return this.current();
}

//迭代循环方法
Iterator.prototype.each = function(callback){
	callback = typeof callback === 'function' ? callback : function(){};

	for( this.rewind; this.hasNext();){
		callback(this.next());
	}
}