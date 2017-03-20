//普通队列
var Queue = function(){

	var items = [];

	return {

		enQueue: function(ele){

			for(var i=0; i<arguments.length; i++){
				items.push(arguments[i]);
			}

			return items.length;
		},

		deQueue: function(){
			return items.length>0 ? items.shift(); throw new Error('Queue is empty!!');
		},

		getFitst: function(){
			return items[0];
		},

		clear: function(){
			items = [];
		}

		isEmpty: function(){
			return items.length === 0;
		},

		size: function(){
			return items.length;
		}
	}
};

