var emailModel = new EmailModel([
	'shuaiquan@qq.com',
	'shuaiquan@163.com',
	'shuaiquan@gmail.com'
	]);

var emailFormView = new EmailFormView(),
	emailListView = new EmailListView(),
	emailView = new EmailView(emailFormView, emailListView),

	emailPresenter = new EmailPresenter(emailModel, emailView);

emailPresenter.initialize();