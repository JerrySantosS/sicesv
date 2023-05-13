module.exports = app => {
  const controller = app.controllers.managerController;

  app.route('/api/managers')
    .get(controller.getManagers)
    .post(controller.createManager);

  app.route('/api/managers/:id')
    .get(controller.getManagerById)
    .delete(controller.deleteManager)
    .put(controller.updateManager);
}
