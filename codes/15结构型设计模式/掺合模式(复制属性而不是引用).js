//更改extendObj()方法来复制基于对象的属性而不是通过引用指向他们
function extendObj(obj1, obj2){
	var obj2Key,
		value;

	for(obj2Key in obj2){
		if(obj2.hasOwnProperty(obj2Key)){
			value = obj2[obj2Key];

			if(Object.prototype.toString.call(value) === '[Object Array]'){
				obj1[obj2Key] = value.slice();
			}else if(typeof value === 'object'){
				obj1[obj2Key] = extendObj({}, value);
			}else{
				obj1[obj2Key] = value;
			}
		}
	}

	return obj1;
}