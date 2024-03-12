module.exports = (app) => {
  const controller = app.controllers.inspectionController;

  app.route('/api/inspections').get(controller.getAll).post(controller.create);

  app
    .route('/api/inspections/:id')
    .get(controller.getById)
    .delete(controller.remove)
    .put(controller.update);

  app.route('/api/inspections/open/:id').get(controller.getOpenInspection);

  app.route('/api/inspections/table/view').get(controller.getTableInspection);
  app.route('/api/inspections/view/:id').get(controller.getViewInspection);
};
