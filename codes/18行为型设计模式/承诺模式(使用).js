var millisecondCount = 0;

function ajaxGet(url){

	return new Promise(function(fulfill, reject){
		var xhr = new XMLHttpRequest(),
			STATE_LOADED = 4,
			STATUS_OK = 200;

		xhr.onreadystatechange = function(){
			if(xhr.readyState !== STATE_LOADED){
				return;
			}

			if(xhr.status === STATUS_OK){
				fulfill(xhr.responseText);
			}else{
				reject('ERROR');
			}
		};

		xhr.open('GET', url);
		xhr.send();
	});
}

function wait(milliseconds){

	return new Promise(function(fulfill, reject){

		if(milliseconds && milliseconds === 'number' && milliseconds > 0){
			setTimeout(function(){
				fulfill(milliseconds);
			}, milliseconds);
		}else{
			reject('millseconds Error');
		}
	});

}

function onSuccess(milliseconds){
	console.log(milliseconds + 'ms passed');
}

function onError(error){
	console.log(error);
}

wait(500).then(onSuccess, onError);

wait(0).then(onSuccess, onError);

wait(1000)
	.then(function(milliseconds){
		millisecondCount += milliseconds;

		return wait(1600);
	})
	.then(function(milliseconds){
		millisecondCount += milliseconds;

		return wait(400);
	})
	.then(function(milliseconds){
		millisecondCount += milliseconds;

		console.log(millisecondCount + 'ms passed');
	});