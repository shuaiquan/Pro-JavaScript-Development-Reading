var Stack = function(){

	//利用数组保存数据项
	var items = [];

	return {
		/**
		 * 入栈，添加任意个元素到栈顶
		 * @param   ele [要添加的新元素]
		 * @return      [栈的长度]
		 */
		push: function(ele){

			for(var i=0; i<arguments.length; i++){
				items.push(arguments[i]);
			}

			return items.length;
		},

		/**
		 * 出栈，删除栈顶元素
		 */
		pop: function(){
			return items.length>0 ? items.pop() : throw new Error('当前栈为空');
		},

		/**
		 * 返回栈顶元素
		 */
		getTop: function(){
			return items[items.length - 1];
		},

		/**
		 * 将栈清空
		 */
		clear: function(){
			items = [];
		},

		/**
		 * 判断栈是否为空
		 */
		isEmpty: function(){
			return items.length === 0;
		},

		/**
		 * 返回栈的长度
		 */
		size: function(){
			return items.length;
		}
	}
}