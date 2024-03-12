module.exports = (app) => {
  // controller recebe as funções do controlador
  // das rotas de login
  const controller = app.controllers.loginController;

  // rota com o método POST
  // A requisição do cliente deve vir com
  // as informações de nome de usuário e senha
  app.route('/api/login').post(
    // Então a função de autenticação é chamada
    // e verifica se as informações são válidas
    controller.authenticate
  );
};
