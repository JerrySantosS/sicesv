module.exports = (app) => {
  const controller = app.controllers.routeController;

  app
    .route('/api/routes/active')
    .get(controller.getAll)
    .post(controller.create);

  app
    .route('/api/routes/active/:id')
    .get(controller.getById)
    .delete(controller.remove)
    .put(controller.update);

  app.route('/api/routes/inactive').get(controller.getInactive);

  app.route('/api/routes/inactive/:id').put(controller.restore);
};
