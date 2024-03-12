const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 8080);

  //MIDDLEWARES
  app.use(bodyParser.json()); // converte todos os dados para JSON
  app.use(cors()); // permite utilizar o localhost

  // carrega automaticamente os scripts das dependencias
  consign({ cwd: 'src' }) // define o diretório raiz
    .then('controllers') // carrega os controllers
    .then('routes') // carrega as rotas HTTP
    .then('services') // carrega os serivços
    .then('rules') // carrega as regras de négocio
    .into(app); // dentro do arquivo app
  // que será compartilhado

  return app;
};
