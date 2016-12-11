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
	
	//render()方法和MVC模式中相同
	render: function(){
		this.form.appendChild(this.input);
		this.form.appendChild(this.button);

		document.body.appendChild(this.form);

		this.bingEvents();
	},

	//我们不再订阅从模型中广播发布的事件
	//我们只是发出基于视图的事件，而表示器负责处理模型与视图之间的通信
	bingEvents: function(){

		var that = this;

		this.form.addEventListener('submit', function(e){
			e.preventDefault();

			//广播添加了一个新的邮件地址事件
			observer.publish('view.email-view.add', that.input.value);
		}, false);

	},

	addEmail: function(){
		this.input.value = '';
	},

	removeEmail: function(){

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

	//该方法只是发布基于视图的事件，不在订阅模型的事件，这有表示器进行处理
	bingEvents: function(){
		var that = this;
		
		this.list.addEventListener('click', function(e){
			if(e.target && e.target.tagName === 'BUTTON'){
				observer.publish('view.email-view.remove', e.target.getAttribute('data-email'));
			}
		}, false);
	
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

	//这里不同
	//即使是一般性视图也需要addEmail()和removeEmail()方法.
	//当这些方法被调用的时候，他们必须执行所有子视图的相同名称的方法，传入所提供的email
	addEmail: function(email){
		var index = 0,
			length = this.views.length;

			for(; index < length; index++ ){
				this.views.addEmail(email);
			}
	},

	removeEmail: function(email){
		var index = 0,
			length = this.views.length;

		for(; index < length; index++ ){
			this.views.removeEmail(email);
		}
	}
};