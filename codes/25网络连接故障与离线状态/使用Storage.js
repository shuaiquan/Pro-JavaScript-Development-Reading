var name = window.localStorage.getItem('name');

//书上是 !name||name === '', 我发现有误 
if(name === 'null'){
	name = prompt('你的名字是');

	window.localStorage.setItem('name', mame);
}

if(confirm('是否删除你的名字？')){

	window.localStorage.remove('name');
}