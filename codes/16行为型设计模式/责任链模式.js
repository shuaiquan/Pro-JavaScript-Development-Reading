//定义一个对象，列出系统中日志记录的不同级别。
var LogLevel = {
		INFO: 'INFO',
		WARN: 'WARN',
		ERROR: 'ERROR'
	},
	log;

//定义一个类，为不同日志级别的日志消息生成相应的格式化日志消息
function LogFormatter(logLevel){
	this.logLevel = logLevel;
}

LogFormatter.prototype = {
	//定义一个属性，用于保存此对象实例在职责链中的后继者
	nextInChain: null,

	setNextInChain: function(next){
		this.nextInChain = next;
	},

	createLogMessage: function(message, logLevel){
		var returnValue;

		if(this.logLevel === logLevel){

			if(logLevel === LogLevel.ERROR){
				returnValue = logLevel + ': ' + message.toUpperCase();
			}else if(logLevel === logLevel.WARN){
				returnValue = logLevel + ': ' + message;
			}else{
				returnValue = message;
			}

		//当前日志记录级别和传入的参数不同	
		}else if(this.nextInChain){
			returnValue = this.nextInChain.createLogMessage(message, logLevel);
		}

		return returnValue;
	}
};

//定义一个单例，用于保存和输出系统的日志消息
log = (function(){

	var logs = [],
		infoLogger = new LogFormatter(LogLevel.INFO),
		warnLogger = new LogFormatter(LogLevel.WARN),
		errorLogger = new LogFormatter(LogLevel.ERROR),

		//设置“错误消息”为职责链的第一位和最高位置
		logger = errorLogger;

		errorLogger.setNextInChain(warnLogger);
		warnLogger.setNextInChain(infoLogger);

		return {
			getLogs: function(){
				return logs.join('\n');
			},

			message: function(message, logLevel){
				var logMessage = logger.createLogMessage(message, logLevel);

				logs.push(logMessage);
			}
		};

}());

log.message("这是一个错误", LogLevel.ERROR);
log.message('这是一个警告', LogLevel.WARN);
log.message('这是一个消息', LogLevel.INFO);

console.log(log.getLogs());