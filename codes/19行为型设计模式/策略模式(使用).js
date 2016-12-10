var textField = new FormField('text', 'First Name', textFieldStrategy),
	emailField = new FormField('email', 'Email', emailFieldStrategy),
	numberField = new FormField('number', 'Age', numberFieldStrategy);

textField.setValue('shuaiquan');
emailField.setValue('test@qq.com');
numberField.setValue(20);


console.log(textField.isValid());	//true
console.log(emailField.isValid());	//true
console.log(numberField.isValid());	//true

textField.setValue();
emailField.setValue('test');
numberField.setValue('quan');

console.log(textField.isValid());	//false
console.log(emailField.isValid());	//false
console.log(numberField.isValid());	//false