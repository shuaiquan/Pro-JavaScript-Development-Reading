//创建一个单例，它可以执行其他方法并具有回撤这些方法的功能
var commad = (function(){

	//创建一个数组，依次保存回撤命令。
	var undoStack = [];

	return {
		execute: function(command, undoCommand){
			if(command && typeof command === 'function'){
				command();
				undoStack.push(undoCommand);
			}
		},
		//定义一个方法，利用存储回撤命令的栈，来对最后一个执行的命令进行反操作
		undo: function(){

			var undoCommand = undoStack.pop();
			if(undoCommand && typeof undoCommand === 'function'){
				undoCommand();
			}
		}
	};
}());

command.execute(function(){
	cookie.execute('set', ['name', 'shuaiquan']);
}, function(){
	cookie.execute('remove', ['name']);
});

console.log(cookie.execute('get', ['name']));

command.undo();