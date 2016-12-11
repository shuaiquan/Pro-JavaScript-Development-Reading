var emailModel = new EmailModel([
		'demodell@me.com',
		'demodell@gmail.com',
		'demodell@akqa.com,'
	]),

	emailFormView = new EmailFormView(),
	emailListView = new emailListView(),

	emailView = new EmailView(emailFormView, emailListView),

	emailController = new EmailController(emailModel, emailView);

emailController.initialize();