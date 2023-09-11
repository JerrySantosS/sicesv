module.exports = (app) => {
  const controller = app.controllers.managerController;

  app
    .route('/api/managers/active')
    .get(controller.getAll)
    .post(controller.create);

  app
    .route('/api/managers/active/:id')
    .get(controller.getById)
    .delete(controller.remove)
    .put(controller.update);

  app.route('/api/managers/inactive').get(controller.getInactive);
  app.route('/api/managers/inactive/:id').put(controller.restore);

  app.route('/api/managers/user/:id').get(controller.getByUserId);
};
