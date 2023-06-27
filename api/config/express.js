const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || 8080);

  //MIDDLEWARES
  app.use(bodyParser.json());
  app.use(cors());

  // require('../api/routes/customerWallets')(app);

  // autoload the scripts from the dependencies
  consign({ cwd: 'src' })
    .then('controllers')
    .then('routes')
    .then('services')
    .then('rules')
    .into(app);

  return app;
};
