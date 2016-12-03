//把相关的属性和方法聚集在一个单独的对象直接量内，我们称之为单例
var element = {
	//创建一个数组，用于存储各个页面元素的引用
	allElements: [],

	//通过元素的ID获取对该元素的引用并保存它
	get: function(id){
		var elem = document.getElementById(id);
		this.allElements.push(elem);
		return elem;
	},

	create: function(type){
		var elem = document.createElement(type);
		this.allElements.push(elem);
		return elem;
	},

	getAllElements: function(){
		return this.allElements;
	}
};

//获取对页面元素的引用
header = element.get('header');

//创建新元素
input = element.create('input');

console.log(element.getAllElements().length);	//2