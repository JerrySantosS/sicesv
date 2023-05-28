module.exports = (app) => {
	const controller = app.controllers.vehicleController;

	app.route("/api/vehicles").get(controller.getAll).post(controller.create);

	app
		.route("/api/vehicles/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);
};
