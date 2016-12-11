//定义添加email地址的视图
function EmailFormView(){

	this.form = document.createElement('form');
	this.input = document.createElement('input');
	this.button = document.createElement('button');

	this.input.setAttribute('type', 'text');
	this.input.setAttribute('placeholder', '填写新的邮件地址');

	this.button.setAttribute('type', 'submit');
	this.button.innerHTML = 'Add';
}

EmailFormView.prototype = {
	
	render: function(){
		this.form.appendChild(this.input);
		this.form.appendChild(this.button);

		document.body.appendChild(this.form);

		this.bingEvents();
	},
	bingEvents: function(){

		var that = this;

		this.form.addEventListener('submit', function(e){
			e.preventDefault();

			//广播添加了一个新的邮件地址事件
			observer.publish('view.email-view.add', that.input.value);
		}, false);

		//订阅一个邮件地址已添加事件，清空<input>
		observer.subscribe('model.email-address.added', function(){
			that.clearInputField();
		});
	},
	clearInputField: function(){
		this.input.value = '';
	}
};

//定义显示email地址列表的视图
function EmailListView(){

	this.list = document.createElement('ul');
	this.listItem = document.createElement('li');
	this.listItemText = document.createElement('span');
	this.listItemRemoveButton = document.createElement('button');

	this.listItemRemoveButton.innerHTML = 'Remove';
}

EmailListView.prototype = {

	render: function(modelData){
		var index = 0,
			length = modelData.length,
			email;

		for(; index < length; index++ ){
			email = modelData[index];
			this.list.appendChild(this.createListItem(email));
		}

		document.body.appendChild(this.list);

		this.bingEvents();
	},

	createListItem: function(email){
		var listItem = this.listItem.cloneNode(false),
			listItemText = this.listItemText.cloneNode(false),
			listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);

		listItem.setAttribute('data-email', email);
		listItemRemoveButton.setAttribute('data-email', email);

		listItemText.innerHTML = email;
		listItem.appendChild(listItemText).appendChild(listItemRemoveButton);

		return listItem;
	},

	bingEvents: function(){
		var that = this;
		
		this.list.addEventListener('click', function(e){
			if(e.target && e.target.tagName === 'BUTTON'){
				observer.publish('view.email-view.remove', e.target.getAttribute('data-email'));
			}
		}, false);
	
		observer.subscribe('model.email-address.added', function(email){
			that.addEmail(email);
		});

		observer.subscribe('model.email-address.removed', function(email){
			that.removeEmail(email);
		});
	},

	addEmail: function(email){
		this.list.insertBefore(this.createListItem(email), this.list.firstChild);
	},

	removeEmail: function(email){
		var listItems = this.list.getElementsByTagName('li'),
			index = 0,
			length = this.listItems.length;

		for(; index < length; index++ ){
			if(listItems[index].getAttribute('data-email') === email){
				this.list.removeChild(listItems[index]);
				break;
			}
		}
	}
};

//定义一个一般性视图
function EmailView(views){
	this.views = views || [];
}

EmailView.prototype = {

	//所有视图都需要有一个render()方法，对于一般性视图，它直接直接执行它的每一个子视图的render()方法
	render: function(modelData){
		var index = 0,
			length = this.views.length;

		for(; index < length; index++ ){
			this.views[index].render(modelData);
		}
	}
};