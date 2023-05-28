module.exports = (app) => {
	const controller = app.controllers.itemController;

	app.route("/api/items/active").get(controller.getAll).post(controller.create);

	app
		.route("/api/items/active/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);

	app.route("/api/items/inactive").get(controller.getInactive);

	app.route("/api/items/inactive/:id").put(controller.restore);
};
