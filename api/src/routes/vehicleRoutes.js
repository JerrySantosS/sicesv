module.exports = (app) => {
	const controller = app.controllers.vehicleController;

	app
		.route("/api/vehicles/active")
		.get(controller.getAll)
		.post(controller.create);

	app
		.route("/api/vehicles/active/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);

	app.route("/api/vehicles/inactive").get(controller.getInactive);

	app.route("/api/vehicles/inactive/:id").put(controller.restore);
};
