//定义视图模型，它连接静态的视图至模型中的所保存的数据
function EmailViewModel(model, view){

	var that = this;

	this.model = model;
	this.view = view;

	this.methods = {
		addEmail: function(email){
			this.model.add(email);
		},
		removeEmail: function(email){
			this.model.remove(email);
		}
	};
}

EmailViewModel.prototype.initialize = function(){
	this.listElememt = this.view.querySelectorAll('[data-loop]')[0];

	this.listItemElement = this.listElememt.getElementsByTagName('li')[0];

	this.bindForm();

	this.bindList();

	this.bingEvents();
};

EmailViewModel.prototype.bindForm = function(){
	var that = this,

		form = this.view.querySelectorAll('[data-submit]')[0],

		formSubmitMethod = form.getAttribute('data-submit');

	form.addEventListener('submit', function(e){
		e.preventDefault();

		var email = form.getElementsByTagName('input')[0].value;

		if(that.methods[methodName] && typeof that.methods[methodName] === 'function'){
			that.methods[methodName](email);
		}
	});
}

EmailViewModel.prototype.bindList = function(){
	var data = this.model.getAll(),
		index = 0,
		length = data.length,
		that = this;

	function makeClickFunction(email){
		return function(e) {
			var methodName = e.target.getAttribute('data-click');

			if(that.methods[methodName] && typeof that.methods[methodName] === 'function'){
				that.methods[methodName](email);
			}
		};
	}

	this.listElement.innerHTML = '';

	for(; index<length; index++){
		email = data[index];

		newListItem = this.listItemElement.cloneNode(true);

		newListItem.querySelectorAll('[data-text]')[0].innerHTML = email;

		newListItem.querySelectorAll('[data-click]')[0].addEventListener('click', function(){
			makeClickFunction(email)
		}, false);

		this.listElement.appendChild(newListItem);
	}
};

EmailViewModel.prototype.clearInputField = function(){
	var textField = this.view.querySelectorAll('input[type=text]')[0];

	textField.value = '';
};

EmailViewModel.prototype.bindEvents = function(){
	var that = this;

	function updateView(){
		that.bindList();

		that.clearInputField();
	}

	observer.subscribe('model.email-address.added', updateView);
	observer.subscribe('model.email-address.removed', updateView);
}