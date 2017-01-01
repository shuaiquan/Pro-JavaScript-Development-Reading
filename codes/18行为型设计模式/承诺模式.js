//定义代表promise的类，使得我们可以写出可读性高，易于理解的代码，来支持实现执行异步方法以及它们的回调函数
var Promise = (function(){

	//定义promise可能拥有的3种可能状态
	var state = {
		PENDING: 'pendind',		//默认，等待，表示尚未完成处理
		FULFILLED: 'fulfilled',		//成功完成
		REJECTED: 'rejected'	//失败
	};

	//定义表示promise的类，
	//如果在初始化时传入一个异步函数，则此异步函数立即执行
	function Promise(asyncFunction){
		var that = this;

		this.state = state.PENDING;		//该promise对象的当前状态

		this.callbacks = [];		//回调函数列表

		this.value = null;		//异步函数所返回的值

		this.error = null;		//异步函数产生的错误信息

		//异步函数成功时执行
		function success(value){
			that.resolve(value);
		}

		//异步函数失败时执行
		function failure(reason){
			that.reject(reason);
		}

		if(typeof asyncFunction === 'functioin'){
			asyncFunction(success, failure);
		}
	}

	//定义then()方法
	Promise.prototype.then = function(onFulfilled, onRejected){

		var promise = new Promise(),
			callback = {
				promise: promise
			};

		if(typeof onFulfilled === 'function'){
			callback.fulfill = onFulfilled;
		}

		if(typeof onRejected === 'function'){
			callback.reject = onRejected;
		}

		this.callbacks.push(callback);

		this.executeCallbacks();

		return promise;
	};

	Promise.prototype.executeCallbacks = function(){
		var that = this,
			value,
			callback;

		function fulfill(value){
			return value;
		}

		function reject(reason){
			throw reason;
		}

		if(this.state !== state.PENDING){
			setTimeout(function(){
				while(that.callbacks.length){
					callback = that.callbacks.shift();

					try {
						if(that.state === state.FULFILLED){
							value = (callback.fulfill || fulfill)(that.value);
						}else{
							value = (callback.reject || reject)(that.error);
						}

						callback.promise.resolve(value);
					} catch(reason) {
						callback.promise.reject(reason);
					}
				}
			}, 0);
		}
	};

	Promise.prototype.fulfill = function(value){
		if(this.state === state.PENDING && arguments.length){
			this.state = state.FULFILLED;
			this.value = value;

			this.executeCallbacks();
		}
	};

	Pormise.prototype.reject = function(error){
		if(this.state === state.PENDING && arguments.length){
			this.state = state.REJECTED;
			this.error = error;

			this.executeCallbacks();
		}
	};

	Promise.prototype.resolve = function(value){
		var promise = this,
			valueIsThisPromise = promise === value,
			valueIsAPromise = value && value.constructor === Promise,
			valueIsThenable = value && (typeof value === 'object' || typeof value === 'function'),
			isExecuted = false,
			then;

		if(valueIsThisPromise){

			promise.reject(new TypeError());

		}else if(valueIsAPromise){

			if(value.state === state.FULFILLED){

				promise.fulfill(value.value)

			}else if(value.state === state.REJECTED){

				promise.reject(value.error);

			}else{

				value.then(function(value){
					promise.resolce(value);
				}, function(reason){
					promise.reject(reason);
				});
			}

		}else if(valueIsThenable){

			try {
				then = value.then;

				if(typeof then === 'function'){
					then.call(value, function(successValue){
						if(!isExecuted){
							isExecuted = true;
							promise.resolve(successValue);
						}
					}, function(reason){
						if(!isExecuted){
							isExecuted = true;
							promise.reject(reason);
						}
					});
				}else{
					promise.fulfill(value);
				}
			
			}catch(reason){
				promise.fulfill(value);
			}
		}

	};

	Promise.all = function(promise){
		var index = 0,
			promiseCount = promise.length;

		return new Promise(function(fulfill, reject){
			var promise,
				results = [],
				resultsCount = 0;

			function onSuccess(result, index){
				results[index] = result;
				resultsCount++;

				if(resultsCount === promiseCount){
					fulfill(results);
				}
			}

			function onError(error){
				reject(error);
			}

			function resolvePromise(index, promise){
				promise.then(function(value){
					onSuccess(value, index);
				}, onError);
			}

			for(; index < promiseCount; index++ ){
				promise = promises[index];
				resolvePromise(index, promise);
			}
		});
	};

	return Promise;
}());