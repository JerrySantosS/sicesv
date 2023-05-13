module.exports = app => {
  const controller = app.controllers.driverController;

  app.route('/api/drivers')
    .get(controller.getDrivers)
    .post(controller.createDriver);

  app.route('/api/drivers/:id')
    .get(controller.getDriverById)
    .delete(controller.deleteDriver)
    .put(controller.updateDriver);
}
