module.exports = (app) => {
  // controller recebe as funções do controlador
  // das rotas de usuário
  const controller = app.controllers.userController;

  // rota para consulta e criação de um usuário
  // do sistema
  app
    .route('/api/users/active')
    //se a rota vier acompanhada de um verbo GET
    .get(controller.getAll)
    //se a rota vier acompanhada de um verbo POST
    .post(controller.create);

  // rota para consulta, alteração e exclusão
  // de um usuário no sistema
  app
    .route('/api/users/active/:id')
    .get(controller.getById)
    .delete(controller.remove)
    .put(controller.update);

  // rota para consulta de um usuário  inativo  no sistema
  app.route('/api/users/inactive').get(controller.getInactive);

  // rota para recuperação de um usuário no sistema
  app.route('/api/users/inactive/:id').put(controller.restore);
};
