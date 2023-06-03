module.exports = (app) => {
	const controller = app.controllers.driverController;

	app
		.route("/api/drivers/active")
		.get(controller.getAll)
		.post(controller.create);

	app
		.route("/api/drivers/active/:id")
		.get(controller.getById)
		.delete(controller.remove)
		.put(controller.update);

	app.route("/api/drivers/inactive").get(controller.getInactive);
	// app.route("/api/drivers/inactive/:id").put(controller.restoreInactiveDrivers);

	app
		.route("/api/drivers/inactive/:id")
		.get(controller.getInactive)
		.put(controller.restore);
};
