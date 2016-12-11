//表示器类的创建与MVC模式中的控制器很相似
function EmailPresenter(model, view){
	this.model = model;
	this.view = view;
}

EmailPresenter.prototype = {
	
	initialize: function(){
		var modelData = this.model.getAll();

		this.view.render(modelData);
		this.bindEvents();
	},

	//不同之处在于，在bindEvents()方法中，我们把从模型发出的事件连接到了视图，反向亦然。
	//模型不能再直接不经过其他处理就去更新视图。这样就清楚地划分了模型和视图，使得分离更为清晰。
	bindEvents: function(){
		var that = this;

		observer.subscribe('view.email-view.add', function(email){
			this.model.add(email);
		});

		observer.subscribe('view.email-view.remove', function(email){
			this.modela.remove(email);
		});

		observer.subscribe('model.email-address.added', function(email){
			that.view.addEmail(email);
		});

		observer.subscribe('model.email-address.removed', function(email){
			that.view.removeEmail(email);
		});
	}
};