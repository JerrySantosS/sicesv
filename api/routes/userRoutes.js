module.exports = app => {
  // const controller = require('../controllers/customerWallets')();
  const controller = app.controllers.userController;

  app.route('/api/users')
    .get(controller.getUsers)
    .post(controller.createUser);

  app.route('/api/users/:id')
    .get(controller.getUserById)
    .delete(controller.deleteUser)
    .put(controller.updateUser);
}
