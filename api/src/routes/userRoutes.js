module.exports = (app) => {
	// const controller = require('../controllers/customerWallets')();
	const controller = app.controllers.userController;

	app.route("/api/users/active").get(controller.getAll).post(controller.create);

	app
		.route("/api/users/active/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);

	app.route("/api/users/inactive").get(controller.getInactive);

	app.route("/api/users/inactive/:id").put(controller.restore);
};
