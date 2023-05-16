module.exports = (app) => {
	const controller = app.controllers.inspectionController;

	app
		.route("/api/inspections")
		.get(controller.getInspections)
		.post(controller.createInspection);

	app
		.route("/api/inspections/:id")
		.get(controller.getInspectionById)
		.delete(controller.deleteInspection)
		.put(controller.updateInspection);
};
