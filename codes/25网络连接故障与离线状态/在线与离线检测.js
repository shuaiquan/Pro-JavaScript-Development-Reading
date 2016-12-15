var stack = [];

function ajax(url, callback){
	
	var xhr = new XMLHttpRequest(),
		LOADED_STATE = 4,
		OK_STATUS = 200;

	if(!navigator.onLine){
		stack.push(arguments);
	}else{
		xhr.onreadystatechange = function(){
			if(xhr.readyState !== LOADED_STATE){
				return;
			}

			if(xhr.status === OK_STATUS){
				callback(xhr.responseText);
			}
		};

		xhr.open('GET', url);
		xhr.send();
	}
}

function clearStack(){

	while(stack.length){
		ajax.apply(ajax, stack.shift());
	}

}

window.addEventListener('online', clearStack, false);