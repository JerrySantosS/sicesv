module.exports = (app) => {
	const controller = app.controllers.itemController;

	app.route("/api/items").get(controller.getItems).post(controller.createItem);

	app
		.route("/api/items/:id")
		.get(controller.getItemById)
		.delete(controller.deleteItem)
		.put(controller.updateItem);
};
