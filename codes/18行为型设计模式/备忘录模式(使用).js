var memento = new Memento(),
	user = {
		name: 'quan',
		age: 20
	};

memento.saveState('user', user);

console.log(memento.storage['user']);	//{"name":"quan", "age":20}		是个字符串

user.name = 'shuaiquan';
user.age = 100;

console.log(JSON.stringify(user));		//{"name":"shuaiquan", "age":100}

user = memento.restoreState('user');

console.log(JSon.stringify(user));		//{"name":"quan", "age":20}