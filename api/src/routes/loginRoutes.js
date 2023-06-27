module.exports = (app) => {
  // const controller = require('../controllers/customerWallets')();
  const controller = app.controllers.loginController;

  app.route('/api/login').post(controller.authenticate);
};
