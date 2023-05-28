module.exports = (app) => {
	// const controller = require('../controllers/customerWallets')();
	const controller = app.controllers.userController;

	app.route("/api/users").get(controller.getAll).post(controller.create);

	app
		.route("/api/users/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);
};
