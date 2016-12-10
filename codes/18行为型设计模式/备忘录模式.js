//定义一个简单的类，用来实现备忘录模式。
//某些老式浏览器本身并不支持JSON.stringify()和JSON.parse()。对于这些浏览器，
//我们可以引用Dougla Crockford的库，网址：https://github.com/dougalscrockford/JSON-js
function Memento(){
	this.storage = {};
}

Memento.prototype.saveState = function(key, obj){
	this.storage[key] = JSON.stringify(obj);
};

Memento.prototype.restoreState = function(key){
	var output = {};

	if(this.storage.hasOwnProperty(key)){
		output = this.storage[key];

		output = JSON.parse(output);
	}

	return output;
};