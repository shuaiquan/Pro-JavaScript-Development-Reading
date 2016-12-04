var elemet = {
	//定义一个通过标签获取元素的方法。如果只有一个元素则返回一个，多个，就返回一个数组
	get: function(tag){
		var elems = document.getElementsByTagName(tag),
			i = 0,
			length = elems.length,
			output = [];

		for(; i<length; i++){
			output.push(elems[i]);
		}

		return output.length === 1 ? output[0] : output;
	},

	//定义一个组合方法，传入一个或者多个元素都可以实现
	addClass: function(elems, newClassName){
		var i = 0,
			length = elems.length,
			elem;

		//判断传入的元素是一个单独的对象还是数组
		if(Object.prototype.toString.call(elems) === '[Object Array]'){

			for(; i<length; i++){
				elem = elems[i];
				elem.className += (elem.className === '' ? '' : ' ') + newClassName;
			}
		}else{
			elems.className += (elem.className === '' ? '' : ' ') + newClassName;
		}
	}
}