module.exports = (app) => {
	const controller = app.controllers.managerController;

	app.route("/api/managers").get(controller.getAll).post(controller.create);

	app
		.route("/api/managers/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);
};
