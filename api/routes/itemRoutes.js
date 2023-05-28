module.exports = (app) => {
	const controller = app.controllers.itemController;

	app.route("/api/items").get(controller.getAll).post(controller.create);

	app
		.route("/api/items/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);
};
