var user = {
		name: 'quan',
		age: 20,
		sex: 'boy',
	},
	arr = [1, 2, 3, 4, 5, 6, 7];

var userIterator = new Iterator(user),
	arrIterator = new Iterator(arr);

for(; userIterator.hasNext(); ){
	console.log(userIterator.next());
}

while(userIterator.hasNext()){
	console.log(userIterator.next());
}